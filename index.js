/**
 * Host half of 声生观察台 (Sonic Observer).
 *
 * Exposes one local endpoint, POST /shengsheng-observer/api/chat, that answers
 * the user's questions with the profile's default model, using the style skill
 * imported in the browser panel as reference. Audio analysis stays in the
 * Client half; nothing here sees the audio.
 */
const BASE = '/shengsheng-observer';
const MAX_BODY = 64 * 1024;
const MAX_SKILL = 20000;
const MAX_HISTORY = 12;

function sendJson(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const origin = req.headers.origin;
    if (req.method !== 'POST') return reject(Object.assign(new Error('method'), { status: 405 }));
    if (!/^application\/json\b/.test(req.headers['content-type'] || '')) return reject(Object.assign(new Error('type'), { status: 415 }));
    if (origin && origin.replace(/^https?:\/\//, '') !== req.headers.host) return reject(Object.assign(new Error('origin'), { status: 403 }));
    let size = 0;
    const chunks = [];
    req.on('data', (c) => { size += c.length; if (size > MAX_BODY) req.destroy(); else chunks.push(c); });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); } catch (e) { reject(Object.assign(e, { status: 400 })); }
    });
    req.on('error', reject);
  });
}

function pickSelection(sel) {
  if (!sel) return null;
  const provider = sel.provider || (sel.entry && sel.entry.provider);
  const model = sel.model || (sel.entry && sel.entry.model);
  const reasoningEffort = sel.reasoningEffort || (sel.entry && sel.entry.reasoningEffort);
  if (!provider || !model) return null;
  return { provider, model, reasoningEffort };
}

export const inject = ['webServer'];

export function apply(ctx) {
  ctx.effect(() =>
    ctx.webServer.register({
      kind: 'prefix',
      path: BASE,
      async handler(req, res) {
        const url = new URL(req.url || '/', 'http://x');
        const rest = decodeURIComponent(url.pathname.slice(BASE.length)) || '/';
        if (rest !== '/api/chat') return sendJson(res, 404, { error: 'not found' });

        let body;
        try {
          body = await readJson(req);
        } catch (e) {
          return sendJson(res, e.status || 400, { error: e.message || 'bad request' });
        }

        const skill = typeof body.skill === 'string' ? body.skill.slice(0, MAX_SKILL) : '';
        const question = typeof body.question === 'string' ? body.question.trim() : '';
        if (!question) return sendJson(res, 400, { error: 'empty question' });

        const llm = ctx.get('llm');
        if (!llm) return sendJson(res, 503, { error: 'llm service unavailable' });
        let selection = null;
        try {
          const adm = ctx.get('agentDefaultModel');
          selection = adm && adm.currentSelection ? adm.currentSelection() : null;
        } catch (e) { /* keep null */ }
        const sel = pickSelection(selection);
        if (!sel) return sendJson(res, 503, { error: 'no default model configured' });

        const system = [
          '你是一位专业的声乐与音乐制作顾问。用户上传了自己的一段清唱，并做过了声学分析。',
          skill ? '下面是用户导入的风格教学 skill，请把它当作你的知识参考来回答：\n\n' + skill : '',
          '回答要具体、可执行，用中文，条理清晰，控制在 300 字以内。',
        ].filter(Boolean).join('\n\n');

        const history = Array.isArray(body.history) ? body.history.slice(-MAX_HISTORY) : [];
        const messages = history
          .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
          .map((m) => ({ role: m.role, content: [{ type: 'text', text: String(m.text || '') }] }));
        messages.push({ role: 'user', content: [{ type: 'text', text: question }] });

        try {
          let text = '';
          for await (const chunk of llm.stream({ provider: sel.provider, model: sel.model, reasoningEffort: sel.reasoningEffort, system, messages })) {
            if (chunk.type === 'text-delta') text += chunk.text;
            else if (chunk.type === 'finish' && chunk.reason && chunk.reason.kind === 'error') {
              return sendJson(res, 502, { error: 'model error: ' + ((chunk.reason.failure && chunk.reason.failure.message) || 'unknown') });
            }
          }
          return sendJson(res, 200, { reply: text.trim() || '(空回答)' });
        } catch (e) {
          return sendJson(res, 500, { error: String((e && e.message) || e) });
        }
      },
    }),
  );
}
