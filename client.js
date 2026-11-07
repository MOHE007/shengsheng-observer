window.__ModuleLoader__.load({
  id: 'dsh-shengsheng-observer',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const EN = {
      'panel.title': 'Sonic Observer',
      'panel.label': 'Sonic Observer',
      'panel.sub': 'Upload a dry vocal take — clean singing, no backing track. Everything is analyzed locally in your browser.',
      'drop': 'Drop an audio file here, or click to choose',
      'drop.hint': 'wav / mp3 / m4a / ogg · dry vocal recommended',
      'meta.duration': 'Duration',
      'meta.sampleRate': 'Sample rate',
      'meta.channels': 'Channels',
      'meta.peak': 'Peak',
      'tab.fit': 'Fit',
      'tab.health': 'Voice Health',
      'tab.mix': 'Production',
      'fit.soon': 'Vocal range, band energy and tonal colour land here. The analysis engine is being wired up.',
      'health.soon': 'jitter / shimmer / HNR / CPP and breathiness land here.',
      'health.note': 'Objective indicators only — not a medical diagnosis. If something looks off, see a laryngologist.',
      'mix.soon': 'Spectrum balance, EQ, dynamics and de-essing suggestions land here.',
      'decode.error': 'Could not decode this file',
    };
    const ZH = {
      'panel.title': '声生观察台',
      'panel.label': '声生观察台',
      'panel.sub': '上传一段清唱干声（不带伴奏）。所有分析都在你的浏览器本地完成。',
      'drop': '把音频文件拖到这里，或点击选择',
      'drop.hint': 'wav / mp3 / m4a / ogg · 建议清唱干声',
      'meta.duration': '时长',
      'meta.sampleRate': '采样率',
      'meta.channels': '声道',
      'meta.peak': '峰值',
      'tab.fit': '适配',
      'tab.health': '嗓况',
      'tab.mix': '制作',
      'fit.soon': '音域、频段能量与音色倾向将显示在这里，分析引擎正在接入。',
      'health.soon': 'jitter / shimmer / HNR / CPP 与气声比例将显示在这里。',
      'health.note': '仅为客观指标，不是医疗诊断；如有异常，请找嗓音科/耳鼻喉科医生。',
      'mix.soon': '频谱平衡、EQ、动态与齿音处理建议将显示在这里。',
      'decode.error': '这个文件无法解码',
    };

    const CSS = `
.ss-root{display:flex;flex-direction:column;height:100%;min-height:0;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary)}
.ss-header{display:flex;align-items:baseline;gap:10px;padding:16px 20px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);flex:none}
.ss-title{font-size:16px;font-weight:600}
.ss-sub{font-size:12px;color:var(--dsw-alias-label-secondary);padding:10px 20px 0;flex:none}
.ss-body{flex:1;overflow:auto;padding:14px 20px 24px;min-height:0}
.ss-drop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border:1px dashed var(--dsw-alias-border-l2);border-radius:12px;padding:26px 16px;cursor:pointer;background:var(--dsw-alias-bg-layer-1);transition:border-color .15s,background .15s}
.ss-drop.is-over{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2)}
.ss-drop b{font-size:13px;font-weight:600}
.ss-drop span{font-size:12px;color:var(--dsw-alias-label-secondary)}
.ss-meta{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px}
.ss-meta-cell{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:10px 12px}
.ss-meta-cell label{display:block;font-size:11px;color:var(--dsw-alias-label-secondary);margin-bottom:4px}
.ss-meta-cell b{font-size:14px;font-weight:600;font-variant-numeric:tabular-nums;word-break:break-all}
.ss-wave{display:block;width:100%;height:110px;margin-top:14px;color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:10px}
.ss-tabs{display:flex;gap:6px;margin-top:18px;border-bottom:1px solid var(--dsw-alias-border-l1);padding-bottom:0}
.ss-tab{border:0;background:transparent;color:var(--dsw-alias-label-secondary);font-size:13px;padding:8px 12px;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px}
.ss-tab.is-on{color:var(--dsw-alias-label-primary);border-bottom-color:var(--dsw-alias-brand-primary);font-weight:600}
.ss-pane{margin-top:14px}
.ss-card{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:14px 16px;font-size:13px;line-height:1.6;color:var(--dsw-alias-label-secondary)}
.ss-card b{color:var(--dsw-alias-label-primary)}
.ss-err{color:var(--dsw-alias-state-error-primary);font-size:12px;margin-top:10px}
.ss-hint{font-size:12px;color:var(--dsw-alias-label-secondary);margin-top:10px}
`;

    function Icon(props) {
      const size = props.size || 20;
      return h('svg', { viewBox: '0 0 64 64', width: size, height: size, 'aria-hidden': true, style: { display: 'block' } },
        h('path', {
          d: 'M8 32h6l4-12 6 24 6-32 6 40 6-24 4 4h10', fill: 'none', stroke: 'currentColor',
          strokeWidth: 4, strokeLinecap: 'round', strokeLinejoin: 'round',
        }),
      );
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        const disposers = [];
        let t;
        try {
          ctx.locale.register('shengsheng-observer', 'en', EN);
          ctx.locale.register('shengsheng-observer', 'zh', ZH);
          t = ctx.locale.bind('shengsheng-observer');
        } catch (err) {
          t = (k) => EN[k] || k;
        }

        function Panel() {
          const [tab, setTab] = React.useState('fit');
          const [meta, setMeta] = React.useState(null);
          const [buffer, setBuffer] = React.useState(null);
          const [error, setError] = React.useState('');
          const [dragging, setDragging] = React.useState(false);
          const canvasRef = React.useRef(null);
          const inputRef = React.useRef(null);
          const styleEl = React.useMemo(() => h('style', null, CSS), []);

          const loadFile = React.useCallback(async (file) => {
            if (!file) return;
            setError('');
            try {
              const arrayBuf = await file.arrayBuffer();
              const AC = window.AudioContext || window.webkitAudioContext;
              const actx = new AC();
              const audioBuffer = await actx.decodeAudioData(arrayBuf.slice(0));
              let peak = 0;
              for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
                const data = audioBuffer.getChannelData(ch);
                for (let i = 0; i < data.length; i++) {
                  const v = Math.abs(data[i]);
                  if (v > peak) peak = v;
                }
              }
              setBuffer(audioBuffer);
              setMeta({
                name: file.name,
                duration: audioBuffer.duration,
                sampleRate: audioBuffer.sampleRate,
                channels: audioBuffer.numberOfChannels,
                peak,
              });
              try { await actx.close(); } catch (e) {}
            } catch (e) {
              setError(t('decode.error') + ' — ' + (e && e.message ? e.message : String(e)));
            }
          }, [t]);

          React.useEffect(() => {
            if (!buffer || !canvasRef.current) return;
            const canvas = canvasRef.current;
            const dpr = window.devicePixelRatio || 1;
            const w = canvas.clientWidth || 600;
            const ht = 110;
            canvas.width = Math.max(1, Math.round(w * dpr));
            canvas.height = Math.round(ht * dpr);
            const g = canvas.getContext('2d');
            if (!g) return;
            g.setTransform(dpr, 0, 0, dpr, 0, 0);
            g.clearRect(0, 0, w, ht);
            const color = window.getComputedStyle(canvas).color || '#7aa7ff';
            const data = buffer.getChannelData(0);
            const step = Math.max(1, Math.floor(data.length / w));
            g.strokeStyle = color;
            g.lineWidth = 1;
            g.beginPath();
            for (let x = 0; x < w; x++) {
              let min = 1, max = -1;
              const start = x * step;
              const end = Math.min(start + step, data.length);
              for (let i = start; i < end; i++) {
                const v = data[i];
                if (v < min) min = v;
                if (v > max) max = v;
              }
              if (max < min) { min = 0; max = 0; }
              const y1 = (1 - max) * ht / 2;
              const y2 = (1 - min) * ht / 2;
              g.moveTo(x + 0.5, y1);
              g.lineTo(x + 0.5, y2);
            }
            g.stroke();
          }, [buffer]);

          const onPick = () => inputRef.current && inputRef.current.click();

          const onDrop = (e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
            if (f) loadFile(f);
          };

          const tabs = [
            { id: 'fit', label: t('tab.fit') },
            { id: 'health', label: t('tab.health') },
            { id: 'mix', label: t('tab.mix') },
          ];

          const pane = () => {
            if (tab === 'fit') return h('div', { className: 'ss-card' }, h('b', null, t('tab.fit')), ' — ', t('fit.soon'));
            if (tab === 'health') return h('div', { className: 'ss-card' }, h('b', null, t('tab.health')), ' — ', t('health.soon'), h('div', { className: 'ss-hint' }, t('health.note')));
            return h('div', { className: 'ss-card' }, h('b', null, t('tab.mix')), ' — ', t('mix.soon'));
          };

          return h(React.Fragment, null,
            styleEl,
            h('div', { className: 'ss-root' },
              h('div', { className: 'ss-header' }, h('div', { className: 'ss-title' }, t('panel.title'))),
              h('div', { className: 'ss-sub' }, t('panel.sub')),
              h('div', { className: 'ss-body' },
                h('div', {
                  className: 'ss-drop' + (dragging ? ' is-over' : ''),
                  role: 'button',
                  tabIndex: 0,
                  onClick: onPick,
                  onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(); } },
                  onDragOver: (e) => { e.preventDefault(); setDragging(true); },
                  onDragLeave: () => setDragging(false),
                  onDrop,
                },
                  h('b', null, t('drop')),
                  h('span', null, t('drop.hint')),
                ),
                h('input', {
                  ref: inputRef, type: 'file', accept: 'audio/*', style: { display: 'none' },
                  onChange: (e) => { const f = e.target.files && e.target.files[0]; if (f) loadFile(f); e.target.value = ''; },
                }),
                error ? h('div', { className: 'ss-err' }, error) : null,
                meta ? h('div', { className: 'ss-meta' },
                  h('div', { className: 'ss-meta-cell' }, h('label', null, t('meta.duration')), h('b', null, meta.duration.toFixed(2) + ' s')),
                  h('div', { className: 'ss-meta-cell' }, h('label', null, t('meta.sampleRate')), h('b', null, (meta.sampleRate / 1000).toFixed(1) + ' kHz')),
                  h('div', { className: 'ss-meta-cell' }, h('label', null, t('meta.channels')), h('b', null, meta.channels === 1 ? 'Mono' : meta.channels + ' ch')),
                  h('div', { className: 'ss-meta-cell' }, h('label', null, t('meta.peak')), h('b', null, (20 * Math.log10(Math.max(meta.peak, 1e-6))).toFixed(1) + ' dBFS')),
                ) : null,
                buffer ? h('canvas', { ref: canvasRef, className: 'ss-wave' }) : null,
                h('div', { className: 'ss-tabs' },
                  tabs.map((tb) => h('button', {
                    key: tb.id, type: 'button',
                    className: 'ss-tab' + (tab === tb.id ? ' is-on' : ''),
                    onClick: () => setTab(tb.id),
                  }, tb.label)),
                ),
                h('div', { className: 'ss-pane' }, pane()),
              ),
            ),
          );
        }

        disposers.push(ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist', id: 'voice-lab', order: 15, label: () => t('panel.label'),
        }, Icon)));

        disposers.push(ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main', key: 'voice-lab',
        }, Panel)));

        return () => { disposers.forEach((d) => { try { d(); } catch (e) {} }); };
      },
    };
  },
});
