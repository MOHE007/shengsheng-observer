window.__ModuleLoader__.load({
  id: 'dsh-shengsheng-observer',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const FFT_SIZE = 2048;
    const MAX_FRAMES = 600;
    const PITCH_EVERY = 6; // analyze pitch on every Nth frame

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
      'fit.soon': 'Vocal range, band energy and tonal colour land here.',
      'health.soon': 'jitter / shimmer / HNR / CPP and breathiness land here.',
      'health.note': 'Objective indicators only — not a medical diagnosis. If something looks off, see a laryngologist.',
      'mix.soon': 'Spectrum balance, EQ, dynamics and de-essing suggestions land here.',
      'decode.error': 'Could not decode this file',
      'analyzing': 'Analyzing…',
      'range.title': 'Vocal range',
      'range.low': 'Lowest',
      'range.high': 'Highest',
      'range.comfort': 'Comfort zone',
      'range.none': 'No stable pitch detected',
      'bands.title': 'Band energy',
      'dyn.title': 'Dynamics',
      'dyn.peak': 'Peak',
      'dyn.rms': 'RMS',
      'dyn.range': 'Range',
      'spec.title': 'Spectrogram',
      'pitch.title': 'Pitch (F0)',
      'fit.tone': 'Tonal character',
      'health.title': 'Voice quality',
      'health.jitter': 'Jitter (period)',
      'health.shimmer': 'Shimmer (amplitude)',
      'health.hnr': 'HNR (harmonics/noise)',
      'health.cpp': 'CPP (cepstral peak)',
      'health.samples': 'Samples',
      'health.indices': 'Reference indices (0–100)',
      'health.stability': 'Stability',
      'health.breath': 'Breathiness',
      'health.grit': 'Grit',
      'health.none': 'Not enough stable pitch to measure voice quality.',
      'health.advice.ok': 'Indicators are in a common range. Keep warming up and hydrate.',
      'health.advice.breathy': 'High breathiness — could be style or fatigue. Rest and try a supported tone.',
      'health.advice.rough': 'Elevated perturbation / noise. If it persists, see a laryngologist.',
      'band.low': 'Low 20–250',
      'band.lowmid': 'Low-mid 250–500',
      'band.mid': 'Mid 500–2k',
      'band.highmid': 'High-mid 2k–4k',
      'band.high': 'High 4k–8k',
      'band.air': 'Air 8k–16k',
      'tone.low': 'Energy sits low — chesty, warm.',
      'tone.mid': 'Energy sits in the mids — present, forward.',
      'tone.high': 'Energy sits high — bright, airy.',
      'mix.title': 'Mix suggestions',
      'mix.low': 'Low / low-mid looks heavy — high-pass around 80–100 Hz or cut 200–400 Hz to clear mud.',
      'mix.deess': 'High-mid is strong — watch sibilance; try a de-esser around 5–8 kHz.',
      'mix.bright': 'High band is strong — the take may be bright; tame 6–10 kHz if it feels sharp.',
      'mix.air': 'Air band is light — a gentle 10 kHz+ shelf can add openness.',
      'mix.compress': 'Wide dynamics — a light compressor (≈2:1, 3–6 dB gain reduction) will even it out.',
      'mix.flat': 'Dynamics are already flat — avoid stacking more compression.',
      'mix.ok': 'Spectrum and dynamics look balanced; no obvious corrective move needed.',
      'fit.adviceTitle': 'Style & singing tips',
      'fit.styles': 'Fits these genres',
      'fit.dos': 'How to sing it',
      'fit.donts': 'What to avoid',
      'feat.wide': 'wide range',
      'feat.low': 'solid low end',
      'feat.high': 'strong highs',
      'feat.chest': 'warm, chesty',
      'feat.forward': 'forward mids',
      'feat.bright': 'bright top',
      'feat.clean': 'clean tone',
      'feat.breathy': 'breathy',
      'feat.gritty': 'gritty',
      'feat.unstable': 'needs stability',
      'feat.neutral': 'balanced tone',
      'style.folk': 'folk / narrative pop',
      'style.ballad': 'emotional ballads',
      'style.rock': 'rock / blues',
      'style.blues': 'blues',
      'style.rnb': 'R&B / soul',
      'style.jazz': 'jazz / smooth jazz',
      'style.pop': 'pop / electro-pop',
      'style.acg': 'anime / ACG songs',
      'style.musical': 'musical theatre',
      'do.chest': 'Use chest support; keep the larynx stable.',
      'do.grit': 'Use controlled grit; never press the throat for long.',
      'do.breath': 'Keep the breathy detail, but control air leakage.',
      'do.warm': 'Warm up before highs; bridge with mixed voice.',
      'do.range': 'Use your range for emotional dynamics.',
      'do.longtone': 'Practice long tones and support to steady it.',
      'do.clean': 'Lean into the clean, focused tone.',
      'dont.shout': 'Do not shout or force high notes for long.',
      'dont.airy': 'Do not over-air it — pitch will drift.',
      'dont.push': 'Do not press the larynx low just for weight.',
      'dont.thin': 'Do not squeeze the top thin.',
      'dont.strain': 'Do not strain past your comfort zone.',
      'dont.fast': 'Avoid fast, showy songs until stable.',
      'prod.title': 'Arrangement ideas',
      'prod.inst': 'Instrument ideas',
      'prod.arr': 'Arrangement moves',
      'prod.avoid': 'Avoid',
      'inst.acoustic': 'acoustic guitar / piano / strings',
      'inst.synth': 'synth pads / electronic drums',
      'inst.ambient': 'fingerpicked guitar / ambient pads / light percussion',
      'inst.rock': 'distorted guitar / live drums / bass',
      'arr.leave-low': 'Leave low-end room for the voice.',
      'arr.high-space': 'Add high-end sparkle without masking the vocal.',
      'arr.short-reverb': 'Use short reverb/delay to keep breath detail.',
      'arr.rock': 'Let drums and bass carry the groove; build to full in the chorus.',
      'arr.dynamic': 'Arrange dynamics by section (verse down, chorus up).',
      'arr.sparse': 'Keep it sparse to feature the clean voice.',
      'arr.breath': 'Leave breathing room; do not fill every bar.',
      'arr.leave-mid': 'Carve a mid-range pocket (500–2k) for the vocal.',
      'arr.avoid-bass': 'Avoid stacking too much low end (bass/kick).',
      'arr.avoid-harsh': 'Avoid harsh, piercing high-end timbres.',
      'arr.avoid-long-reverb': 'Avoid long reverb that smears the breathy detail.',
      'arr.avoid-density': 'Avoid dense arrangements that make grit sound noisy.',
      'arr.avoid-flat': 'Avoid flat, single-level arrangements.',
      'arr.avoid-dense': 'Avoid wall-to-wall arrangements with no air.',
      'skill.title': 'Style skill',
      'skill.hint': 'Import a style-teaching skill (.md/.txt). It will be used as reference in the Production tab.',
      'skill.loaded': 'Skill loaded.',
      'skill.import': 'Import skill',
      'skill.importFolder': 'Import folder',
      'skill.loadedName': 'Loaded from {name}',
      'skill.clear': 'Remove',
      'skill.chars': '{n} characters',
      'skill.error': 'Could not read the skill file',
      'skill.refTitle': 'From your style skill',
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
      'fit.soon': '音域、频段能量与音色倾向将显示在这里。',
      'health.soon': 'jitter / shimmer / HNR / CPP 与气声比例将显示在这里。',
      'health.note': '仅为客观指标，不是医疗诊断；如有异常，请找嗓音科/耳鼻喉科医生。',
      'mix.soon': '频谱平衡、EQ、动态与齿音处理建议将显示在这里。',
      'decode.error': '这个文件无法解码',
      'analyzing': '分析中…',
      'range.title': '音域',
      'range.low': '最低',
      'range.high': '最高',
      'range.comfort': '舒适区',
      'range.none': '没有检测到稳定音高',
      'bands.title': '频段能量',
      'dyn.title': '动态',
      'dyn.peak': '峰值',
      'dyn.rms': 'RMS',
      'dyn.range': '动态范围',
      'spec.title': '频谱图',
      'pitch.title': '音高 (F0)',
      'fit.tone': '音色倾向',
      'health.title': '嗓音质量',
      'health.jitter': 'Jitter（周期扰动）',
      'health.shimmer': 'Shimmer（振幅扰动）',
      'health.hnr': 'HNR（谐噪比）',
      'health.cpp': 'CPP（倒谱峰突出度）',
      'health.samples': '样本数',
      'health.indices': '参考指数（0–100）',
      'health.stability': '稳定度',
      'health.breath': '气声',
      'health.grit': '颗粒感',
      'health.none': '稳定音高太少，无法测量嗓音质量。',
      'health.advice.ok': '各项指标在常见范围内。记得热嗓、多喝水。',
      'health.advice.breathy': '气声偏多——可能是风格，也可能是疲劳；先休息，用有支撑的声音再试。',
      'health.advice.rough': '扰动偏高、噪声偏多；若持续，建议找嗓音科做专业评估。',
      'band.low': '低频 20–250',
      'band.lowmid': '中低 250–500',
      'band.mid': '中 500–2k',
      'band.highmid': '中高 2k–4k',
      'band.high': '高频 4k–8k',
      'band.air': '空气 8k–16k',
      'tone.low': '能量偏低频——厚实、温暖。',
      'tone.mid': '能量集中在中频——靠前、有存在感。',
      'tone.high': '能量偏高频——明亮、通透。',
      'mix.title': '混音建议',
      'mix.low': '低频/中低偏多，容易浑浊——可高通 80–100Hz，或减 200–400Hz。',
      'mix.deess': '中高频偏强，注意齿音——可在 5–8kHz 用 de-esser。',
      'mix.bright': '高频偏亮，若听着刺耳，可压 6–10kHz。',
      'mix.air': '空气感偏少——可在 10kHz 以上轻微提升，增加通透感。',
      'mix.compress': '动态范围较大——可加轻度压缩（约 2:1，衰减 3–6dB）。',
      'mix.flat': '动态已经比较平——不建议再叠压缩。',
      'mix.ok': '频谱和动态比较均衡，没有明显的修正必要。',
      'fit.adviceTitle': '风格与演唱建议',
      'fit.styles': '适合的曲风',
      'fit.dos': '可以这样唱',
      'fit.donts': '不要这样唱',
      'feat.wide': '音域较宽',
      'feat.low': '低音扎实',
      'feat.high': '高音能力好',
      'feat.chest': '中低频厚实',
      'feat.forward': '中频靠前',
      'feat.bright': '高频明亮',
      'feat.clean': '嗓音干净',
      'feat.breathy': '气声感明显',
      'feat.gritty': '颗粒感强',
      'feat.unstable': '稳定性待加强',
      'feat.neutral': '音色均衡',
      'style.folk': '民谣 / 叙事型流行（像抱着吉他讲故事）',
      'style.ballad': '抒情慢歌（情感铺陈、长音为主）',
      'style.rock': '摇滚 / 蓝调（有力量的颗粒与嘶吼）',
      'style.blues': '蓝调（摇摆、有故事感）',
      'style.rnb': 'R&B / 灵魂乐（细腻转音、气声）',
      'style.jazz': '爵士 / 轻爵士（摇摆、即兴）',
      'style.pop': '流行 / 电子流行（旋律抓耳）',
      'style.acg': 'ACG / 动画歌曲（高音与情绪起伏）',
      'style.musical': '音乐剧（戏剧化表达、大动态）',
      'do.chest': '多用胸腔支撑，保持喉位稳定。',
      'do.grit': '用可控的颗粒，别长期压嗓。',
      'do.breath': '保留气声的细腻，但控制漏气。',
      'do.warm': '高音前先热嗓，用混声过渡。',
      'do.range': '利用音域优势做情绪起伏。',
      'do.longtone': '慢练长音和气息支撑，提升稳定度。',
      'do.clean': '发挥干净、集中的音色。',
      'dont.shout': '不要长时间嘶吼、硬喊高音。',
      'dont.airy': '不要过度气声导致音准发飘。',
      'dont.push': '不要一味压低喉位制造厚重。',
      'dont.thin': '不要挤高位置把声音挤薄。',
      'dont.strain': '不要勉强够超出舒适区的高音。',
      'dont.fast': '不稳定时先别挑战快歌炫技。',
      'prod.title': '配器与编曲建议',
      'prod.inst': '乐器/音色推荐',
      'prod.arr': '编曲与频段安排',
      'prod.avoid': '避免',
      'inst.acoustic': '木吉他 / 钢琴 / 弦乐等原声乐器',
      'inst.synth': '合成器铺底 / 电子鼓点缀',
      'inst.ambient': '指弹吉他 / 氛围 pad / 轻打击',
      'inst.rock': '失真吉他 / 实鼓 / 贝斯',
      'arr.leave-low': '伴奏低频让位，给人声留出胸腔空间。',
      'arr.high-space': '高频适当点缀，别盖住人声的亮度。',
      'arr.short-reverb': '用短混响/延迟，保留气声细节。',
      'arr.rock': '鼓和贝斯撑节奏，副歌再进满。',
      'arr.dynamic': '按段落做动态（主歌收、副歌放）。',
      'arr.sparse': '编曲精简，突出干净的人声。',
      'arr.breath': '给换气留空，别把每一小节都铺满。',
      'arr.leave-mid': '中频（500–2k）给伴奏做避让。',
      'arr.avoid-bass': '避免低频乐器堆太满（贝斯/大鼓）。',
      'arr.avoid-harsh': '避免刺耳的高频音色。',
      'arr.avoid-long-reverb': '避免长混响把气声糊掉。',
      'arr.avoid-density': '避免编曲过密，颗粒会变吵。',
      'arr.avoid-flat': '避免全程一个力度平铺。',
      'arr.avoid-dense': '避免编曲塞满、没有呼吸。',
      'skill.title': '风格 skill',
      'skill.hint': '导入一个风格教学 skill（.md/.txt），会在「制作」里作为参考。',
      'skill.loaded': '已导入风格 skill。',
      'skill.import': '导入 skill',
      'skill.importFolder': '导入文件夹',
      'skill.loadedName': '已导入：{name}',
      'skill.clear': '移除',
      'skill.chars': '{n} 字',
      'skill.error': '读取 skill 文件失败',
      'skill.refTitle': '来自你的风格 skill',
    };

    const CSS = `
.ss-root{display:flex;flex-direction:column;height:100%;min-height:0;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary)}
.ss-header{display:flex;align-items:baseline;gap:10px;padding:16px 20px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);flex:none}
.ss-title{font-size:16px;font-weight:600}
.ss-lang{margin-left:auto;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);font-size:11px;padding:3px 8px;border-radius:6px;cursor:pointer}
.ss-lang:hover{color:var(--dsw-alias-label-primary)}
.ss-sub{font-size:12px;color:var(--dsw-alias-label-secondary);padding:10px 20px 0;flex:none}
.ss-body{flex:1;overflow:auto;padding:14px 20px 24px;min-height:0}
.ss-drop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border:1px dashed var(--dsw-alias-border-l2);border-radius:12px;padding:24px 16px;cursor:pointer;background:var(--dsw-alias-bg-layer-1);transition:border-color .15s,background .15s}
.ss-drop.is-over{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2)}
.ss-drop b{font-size:13px;font-weight:600}
.ss-drop span{font-size:12px;color:var(--dsw-alias-label-secondary)}
.ss-meta{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px}
.ss-meta-cell{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:10px 12px}
.ss-meta-cell label{display:block;font-size:11px;color:var(--dsw-alias-label-secondary);margin-bottom:4px}
.ss-meta-cell b{font-size:14px;font-weight:600;font-variant-numeric:tabular-nums;word-break:break-all}
.ss-wave{display:block;width:100%;height:110px;margin-top:14px;color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:10px}
.ss-player{display:flex;align-items:center;gap:10px;margin-top:14px}
.ss-play{width:36px;height:36px;border-radius:50%;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);cursor:pointer;font-size:14px;line-height:1;display:flex;align-items:center;justify-content:center}
.ss-seek{flex:1;accent-color:var(--dsw-alias-brand-primary)}
.ss-time{font-size:12px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;min-width:96px;text-align:right}
.ss-wavewrap{position:relative;margin-top:14px}
.ss-wavewrap .ss-wave{margin-top:0}
.ss-head{position:absolute;top:0;bottom:0;width:1px;background:#ff5c7a;pointer-events:none}
.ss-chartwrap{margin-top:14px;background:#0b0d14;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:6px;overflow:hidden}
.ss-chart{display:block;width:100%;border-radius:6px}
.ss-chart-cap{font-size:11px;color:var(--dsw-alias-label-secondary);padding:4px 4px 2px}
.ss-tabs{display:flex;gap:6px;margin-top:18px;border-bottom:1px solid var(--dsw-alias-border-l1);padding-bottom:0}
.ss-tab{border:0;background:transparent;color:var(--dsw-alias-label-secondary);font-size:13px;padding:8px 12px;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px}
.ss-tab.is-on{color:var(--dsw-alias-label-primary);border-bottom-color:var(--dsw-alias-brand-primary);font-weight:600}
.ss-pane{margin-top:14px}
.ss-card{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:14px 16px;font-size:13px;line-height:1.6;color:var(--dsw-alias-label-secondary)}
.ss-card b{color:var(--dsw-alias-label-primary)}
.ss-card + .ss-card{margin-top:12px}
.ss-chips{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 4px}
.ss-chip{font-size:11px;padding:3px 8px;border-radius:999px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);color:var(--dsw-alias-label-secondary)}
.ss-adv{margin-top:10px}
.ss-adv b{display:block;margin-bottom:4px}
.ss-skill-actions{display:flex;gap:8px;margin-top:8px}
.ss-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ss-kv{display:flex;justify-content:space-between;gap:10px;padding:4px 0;font-size:12px}
.ss-kv span{color:var(--dsw-alias-label-secondary)}
.ss-kv b{color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums}
.ss-band{margin:8px 0}
.ss-band-top{display:flex;justify-content:space-between;font-size:11px;color:var(--dsw-alias-label-secondary);margin-bottom:3px}
.ss-band-track{height:6px;background:var(--dsw-alias-bg-layer-2);border-radius:3px;overflow:hidden}
.ss-band-fill{height:100%;background:var(--dsw-alias-brand-primary);border-radius:3px}
.ss-err{color:var(--dsw-alias-state-error-primary);font-size:12px;margin-top:10px}
.ss-hint{font-size:12px;color:var(--dsw-alias-label-secondary);margin-top:10px}
.ss-loading{font-size:12px;color:var(--dsw-alias-label-secondary);margin-top:12px}
`;

    // ------------------------------------------------------------------
    // DSP (pure functions, no React)
    // ------------------------------------------------------------------
    function hann(n) {
      const w = new Float64Array(n);
      for (let i = 0; i < n; i++) w[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (n - 1)));
      return w;
    }

    function fftInPlace(re, im) {
      const n = re.length;
      for (let i = 1, j = 0; i < n; i++) {
        let bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) {
          let t = re[i]; re[i] = re[j]; re[j] = t;
          t = im[i]; im[i] = im[j]; im[j] = t;
        }
      }
      for (let len = 2; len <= n; len <<= 1) {
        const ang = (-2 * Math.PI) / len;
        const wRe = Math.cos(ang);
        const wIm = Math.sin(ang);
        for (let i = 0; i < n; i += len) {
          let curRe = 1, curIm = 0;
          const half = len >> 1;
          for (let j = 0; j < half; j++) {
            const uRe = re[i + j], uIm = im[i + j];
            const vRe = re[i + j + half] * curRe - im[i + j + half] * curIm;
            const vIm = re[i + j + half] * curIm + im[i + j + half] * curRe;
            re[i + j] = uRe + vRe; im[i + j] = uIm + vIm;
            re[i + j + half] = uRe - vRe; im[i + j + half] = uIm - vIm;
            const nRe = curRe * wRe - curIm * wIm;
            curIm = curRe * wIm + curIm * wRe;
            curRe = nRe;
          }
        }
      }
    }

    function yinF0(frame, sampleRate) {
      const n = frame.length;
      const half = n >> 1;
      const minTau = Math.max(2, Math.floor(sampleRate / 1200));
      const maxTau = Math.min(half - 1, Math.floor(sampleRate / 80));
      if (maxTau <= minTau) return { f0: 0, conf: 0 };
      const d = new Float64Array(maxTau + 1);
      for (let tau = 1; tau <= maxTau; tau++) {
        let sum = 0;
        for (let i = 0; i < half; i++) {
          const delta = frame[i] - frame[i + tau];
          sum += delta * delta;
        }
        d[tau] = sum;
      }
      const cmnd = new Float64Array(maxTau + 1);
      let running = 0;
      cmnd[0] = 1;
      for (let tau = 1; tau <= maxTau; tau++) {
        running += d[tau];
        cmnd[tau] = running === 0 ? 1 : (d[tau] * tau) / running;
      }
      const threshold = 0.15;
      let tauEst = -1;
      for (let tau = minTau; tau <= maxTau; tau++) {
        if (cmnd[tau] < threshold) {
          while (tau + 1 <= maxTau && cmnd[tau + 1] < cmnd[tau]) tau++;
          tauEst = tau;
          break;
        }
      }
      if (tauEst < 0) {
        let best = Infinity;
        for (let tau = minTau; tau <= maxTau; tau++) {
          if (cmnd[tau] < best) { best = cmnd[tau]; tauEst = tau; }
        }
      }
      if (tauEst < 0) return { f0: 0, conf: 0 };
      let better = tauEst;
      if (tauEst > 1 && tauEst < maxTau) {
        const s0 = cmnd[tauEst - 1], s1 = cmnd[tauEst], s2 = cmnd[tauEst + 1];
        const denom = 2 * (2 * s1 - s2 - s0);
        if (denom !== 0) better = tauEst + (s2 - s0) / denom;
      }
      if (better < 1) better = 1;
      const f0 = sampleRate / better;
      const conf = Math.max(0, Math.min(1, 1 - cmnd[tauEst]));
      if (f0 < 50 || f0 > 1200) return { f0: 0, conf: 0 };
      return { f0, conf };
    }

    function midiOf(f0) { return 69 + 12 * Math.log2(f0 / 440); }
    function freqOf(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }
    const NAME = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    function noteName(f0) {
      if (!f0 || f0 <= 0) return '—';
      const m = Math.round(midiOf(f0));
      return NAME[((m % 12) + 12) % 12] + (Math.floor(m / 12) - 1);
    }

    function mixDown(buffer) {
      const ch = buffer.numberOfChannels;
      if (ch === 1) return buffer.getChannelData(0);
      const len = buffer.length;
      const out = new Float32Array(len);
      for (let c = 0; c < ch; c++) {
        const d = buffer.getChannelData(c);
        for (let i = 0; i < len; i++) out[i] += d[i] / ch;
      }
      return out;
    }

    function ifftInPlace(re, im) {
      const n = re.length;
      for (let i = 0; i < n; i++) im[i] = -im[i];
      fftInPlace(re, im);
      for (let i = 0; i < n; i++) { re[i] /= n; im[i] = -im[i] / n; }
    }

    function hnrOf(frame, sampleRate, f0) {
      const tau0 = Math.round(sampleRate / f0);
      if (tau0 < 2 || tau0 >= frame.length / 2) return 0;
      let r0 = 0, rT = 0;
      const n = frame.length - tau0;
      for (let i = 0; i < n; i++) {
        r0 += frame[i] * frame[i];
        rT += frame[i] * frame[i + tau0];
      }
      if (r0 <= 0) return 0;
      const r = rT / r0;
      if (r <= 0) return 0;
      if (r >= 0.9999) return 60;
      return 10 * Math.log10(r / (1 - r));
    }

    function cppOf(frame, sampleRate, win) {
      const N = frame.length;
      const re = new Float64Array(N);
      const im = new Float64Array(N);
      for (let i = 0; i < N; i++) { re[i] = frame[i] * win[i]; im[i] = 0; }
      fftInPlace(re, im);
      const half = N >> 1;
      const logMag = new Float64Array(N);
      for (let b = 0; b <= half; b++) {
        logMag[b] = Math.log(Math.sqrt(re[b] * re[b] + im[b] * im[b]) + 1e-12);
      }
      const cre = new Float64Array(N);
      const cim = new Float64Array(N);
      for (let b = 0; b < N; b++) cre[b] = logMag[b < half ? b : N - b];
      ifftInPlace(cre, cim);
      const qMin = Math.max(2, Math.floor(sampleRate / 500));
      const qMax = Math.min(half, Math.floor(sampleRate / 60));
      let peak = -Infinity, peakQ = -1;
      for (let q = qMin; q <= qMax; q++) if (cre[q] > peak) { peak = cre[q]; peakQ = q; }
      if (peakQ < 0) return 0;
      let sum = 0, cnt = 0;
      for (let q = qMin; q <= qMax; q++) if (Math.abs(q - peakQ) > 2) { sum += cre[q]; cnt++; }
      const base = cnt ? sum / cnt : 0;
      return (peak - base) * 8.6858;
    }

    const clamp100 = (v) => Math.max(0, Math.min(100, v));

    function computeVoice(pitches) {
      const ok = pitches.filter((p) => p.conf > 0.5 && p.f0 > 0);
      if (ok.length < 8) return null;
      const jitterPairs = [];
      const shimmerPairs = [];
      for (let i = 1; i < ok.length; i++) {
        const a = ok[i - 1], b = ok[i];
        if (Math.abs(a.midi - b.midi) > 0.7) continue;
        if (b.t - a.t > 0.2) continue;
        const Ta = 1 / a.f0, Tb = 1 / b.f0;
        jitterPairs.push(Math.abs(Ta - Tb) / ((Ta + Tb) / 2));
        const Aa = Math.max(a.amp, 1e-9), Ab = Math.max(b.amp, 1e-9);
        shimmerPairs.push(Math.abs(Aa - Ab) / ((Aa + Ab) / 2));
      }
      const mean = (arr) => (arr.length ? arr.reduce((s, x) => s + x, 0) / arr.length : 0);
      const jitter = mean(jitterPairs) * 100;
      const shimmer = mean(shimmerPairs) * 100;
      const hnr = mean(ok.map((p) => p.hnr));
      const cpp = mean(ok.map((p) => p.cpp));
      const breath = clamp100(100 - (hnr - 3) * 3.2);
      const grit = clamp100(shimmer * 3.5 + jitter * 3);
      const stability = clamp100(100 - (jitter * 30 + shimmer * 10));
      return { jitter, shimmer, hnr, cpp, breath, grit, stability, samples: ok.length, pairs: jitterPairs.length };
    }

    function buildFitAdvice(a) {
      const feats = [];
      const styles = [];
      const dos = [];
      const donts = [];
      const add = (arr, k) => { if (arr.indexOf(k) === -1) arr.push(k); };
      if (a.range) {
        const span = 12 * Math.log2(a.range.high / a.range.low);
        if (span >= 18) add(feats, 'feat.wide');
        if (a.range.low < 110) add(feats, 'feat.low');
        if (a.range.high > 500) add(feats, 'feat.high');
      }
      const pct = {};
      (a.bands || []).forEach((b) => { pct[b.id] = b.pct; });
      const low = (pct['band.low'] || 0) + (pct['band.lowmid'] || 0);
      const mid = pct['band.mid'] || 0;
      const bright = (pct['band.highmid'] || 0) + (pct['band.air'] || 0);
      if (low > 150) add(feats, 'feat.chest');
      if (mid > 80) add(feats, 'feat.forward');
      if (bright > 120) add(feats, 'feat.bright');
      const v = a.voice;
      if (v) {
        if (v.hnr >= 20) add(feats, 'feat.clean');
        if (v.breath >= 60) add(feats, 'feat.breathy');
        if (v.grit >= 45) add(feats, 'feat.gritty');
        if (v.jitter > 2 || v.shimmer > 8) add(feats, 'feat.unstable');
      }
      if (feats.length === 0) add(feats, 'feat.neutral');

      const has = (k) => feats.indexOf(k) >= 0;
      if (has('feat.gritty')) { add(styles, 'style.rock'); add(styles, 'style.blues'); add(dos, 'do.grit'); add(donts, 'dont.shout'); }
      if (has('feat.breathy')) { add(styles, 'style.rnb'); add(styles, 'style.jazz'); add(dos, 'do.breath'); add(donts, 'dont.airy'); }
      if (has('feat.chest') || has('feat.low')) { add(styles, 'style.folk'); add(styles, 'style.ballad'); add(dos, 'do.chest'); add(donts, 'dont.push'); }
      if (has('feat.bright') || has('feat.high')) { add(styles, 'style.pop'); add(styles, 'style.acg'); add(dos, 'do.warm'); add(donts, 'dont.thin'); }
      if (has('feat.wide')) { add(styles, 'style.musical'); add(dos, 'do.range'); add(donts, 'dont.strain'); }
      if (has('feat.clean')) add(dos, 'do.clean');
      if (has('feat.unstable')) { add(dos, 'do.longtone'); add(donts, 'dont.fast'); }
      if (!styles.length) add(styles, 'style.pop');
      if (!dos.length) add(dos, 'do.chest');
      if (!donts.length) add(donts, 'dont.strain');
      return { feats, styles, dos, donts };
    }

    function buildProductionAdvice(a) {
      const feats = [];
      const add = (arr, k) => { if (arr.indexOf(k) === -1) arr.push(k); };
      const pct = {};
      (a.bands || []).forEach((b) => { pct[b.id] = b.pct; });
      const low = (pct['band.low'] || 0) + (pct['band.lowmid'] || 0);
      const mid = pct['band.mid'] || 0;
      const bright = (pct['band.highmid'] || 0) + (pct['band.air'] || 0);
      const v = a.voice || {};
      if (low > 150) add(feats, 'feat.chest');
      if (mid > 80) add(feats, 'feat.forward');
      if (bright > 120) add(feats, 'feat.bright');
      if (v.breath >= 60) add(feats, 'feat.breathy');
      if (v.grit >= 45) add(feats, 'feat.gritty');
      if (v.hnr && v.hnr >= 20) add(feats, 'feat.clean');
      if (v.jitter > 2 || v.shimmer > 8) add(feats, 'feat.unstable');
      if (a.range) {
        const span = 12 * Math.log2(a.range.high / a.range.low);
        if (span >= 18) add(feats, 'feat.wide');
      }

      const inst = [];
      const arr = [];
      const avoid = [];
      const has = (k) => feats.indexOf(k) >= 0;
      if (has('feat.chest')) { add(inst, 'inst.acoustic'); add(arr, 'arr.leave-low'); add(avoid, 'arr.avoid-bass'); }
      if (has('feat.bright')) { add(inst, 'inst.synth'); add(arr, 'arr.high-space'); add(avoid, 'arr.avoid-harsh'); }
      if (has('feat.breathy')) { add(inst, 'inst.ambient'); add(arr, 'arr.short-reverb'); add(avoid, 'arr.avoid-long-reverb'); }
      if (has('feat.gritty')) { add(inst, 'inst.rock'); add(arr, 'arr.rock'); add(avoid, 'arr.avoid-density'); }
      if (has('feat.wide')) { add(arr, 'arr.dynamic'); add(avoid, 'arr.avoid-flat'); }
      if (has('feat.clean')) add(arr, 'arr.sparse');
      if (has('feat.unstable')) { add(arr, 'arr.breath'); add(avoid, 'arr.avoid-dense'); }
      if (mid > 80) add(arr, 'arr.leave-mid');
      if (!inst.length) add(inst, 'inst.acoustic');
      if (!arr.length) add(arr, 'arr.leave-mid');
      if (!avoid.length) add(avoid, 'arr.avoid-harsh');
      return { inst, arr, avoid, feats };
    }

    function skillHints(text) {
      if (!text) return [];
      const lines = text.split(/\r?\n/).map((s) => s.trim()).filter((s) => s.length > 8 && s.length < 160);
      const kw = ['配器', '乐器', '频段', '混音', '编曲', '风格', '和弦', '鼓', '贝斯', '吉他', '钢琴', '人声', 'arrange', 'mix', 'instrument'];
      const hits = lines.filter((l) => kw.some((k) => l.toLowerCase().indexOf(k) !== -1));
      return hits.slice(0, 4);
    }

    function analyzeBuffer(buffer) {
      const sr = buffer.sampleRate;
      const data = mixDown(buffer);
      const len = data.length;
      const hop = Math.max(256, Math.floor((len - FFT_SIZE) / MAX_FRAMES) || 256);
      const frameCount = Math.max(1, Math.floor((len - FFT_SIZE) / hop) + 1);
      const bins = FFT_SIZE >> 1;
      const win = hann(FFT_SIZE);
      const re = new Float64Array(FFT_SIZE);
      const im = new Float64Array(FFT_SIZE);
      const spec = new Float32Array(frameCount * bins);
      const binHz = sr / FFT_SIZE;

      const bandsDef = [
        { id: 'band.low', lo: 20, hi: 250 },
        { id: 'band.lowmid', lo: 250, hi: 500 },
        { id: 'band.mid', lo: 500, hi: 2000 },
        { id: 'band.highmid', lo: 2000, hi: 4000 },
        { id: 'band.high', lo: 4000, hi: 8000 },
        { id: 'band.air', lo: 8000, hi: 16000 },
      ];
      const bandAccum = bandsDef.map(() => 0);
      let frameDbMax = -120;
      let rmsSum = 0;
      let peak = 0;
      let samples = 0;
      const pitches = [];

      for (let f = 0; f < frameCount; f++) {
        const start = f * hop;
        let rms = 0;
        for (let i = 0; i < FFT_SIZE; i++) {
          const idx = start + i;
          const v = idx < len ? data[idx] : 0;
          re[i] = v * win[i];
          im[i] = 0;
          rms += v * v;
          const a = v < 0 ? -v : v;
          if (a > peak) peak = a;
        }
        rmsSum += rms;
        samples += FFT_SIZE;

        fftInPlace(re, im);
        // magnitude dB normalized to the loudest bin of this frame
        let maxMag = 1e-12;
        const mags = new Float32Array(bins);
        for (let b = 0; b < bins; b++) {
          const mag = Math.sqrt(re[b] * re[b] + im[b] * im[b]);
          mags[b] = mag;
          if (mag > maxMag) maxMag = mag;
        }
        const base = f * bins;
        const logMax = Math.log10(maxMag + 1e-12);
        for (let b = 0; b < bins; b++) {
          const db = 20 * Math.log10((mags[b] + 1e-12) / maxMag);
          spec[base + b] = Math.max(0, Math.min(1, (db + 80) / 80));
          if (db > frameDbMax) frameDbMax = db;
        }
        // band energy (relative to frame max)
        for (let bi = 0; bi < bandsDef.length; bi++) {
          const bd = bandsDef[bi];
          let sum = 0;
          const b0 = Math.max(0, Math.floor(bd.lo / binHz));
          const b1 = Math.min(bins - 1, Math.floor(bd.hi / binHz));
          for (let b = b0; b <= b1; b++) sum += mags[b] * mags[b];
          bandAccum[bi] += Math.sqrt(sum);
        }
        // pitch on sampled frames
        if (f % PITCH_EVERY === 0) {
          const raw = new Float32Array(FFT_SIZE);
          for (let i = 0; i < FFT_SIZE; i++) {
            const idx = start + i;
            raw[i] = idx < len ? data[idx] : 0;
          }
          const p = yinF0(raw, sr);
          if (p.f0 > 0 && p.conf > 0.3) {
            let amp = 0;
            for (let i = 0; i < FFT_SIZE; i++) amp += raw[i] * raw[i];
            amp = Math.sqrt(amp / FFT_SIZE);
            pitches.push({
              t: start / sr, f0: p.f0, midi: midiOf(p.f0), conf: p.conf, amp,
              hnr: hnrOf(raw, sr, p.f0), cpp: cppOf(raw, sr, win),
            });
          }
        }
      }

      const total = Math.max(1, frameCount);
      const bandMax = Math.max(1e-12, ...bandAccum.map((x) => x / total));
      const bands = bandsDef.map((bd, i) => {
        const v = bandAccum[i] / total;
        return { id: bd.id, lo: bd.lo, hi: bd.hi, pct: Math.round((v / bandMax) * 100) };
      });

      let range = null;
      if (pitches.length >= 5) {
        const midis = pitches.map((p) => p.midi).sort((a, b) => a - b);
        const q = (p) => midis[Math.min(midis.length - 1, Math.max(0, Math.floor(p * (midis.length - 1))))];
        const low = freqOf(q(0.05));
        const high = freqOf(q(0.95));
        const cLow = freqOf(q(0.25));
        const cHigh = freqOf(q(0.75));
        range = { low, high, cLow, cHigh, notes: pitches.length };
      }

      const rms = Math.sqrt(rmsSum / Math.max(1, samples));
      const peakDb = 20 * Math.log10(Math.max(peak, 1e-6));
      const rmsDb = 20 * Math.log10(Math.max(rms, 1e-6));

      const voice = computeVoice(pitches);
      return {
        sr, frameCount, bins, hop, spec,
        bands, range, pitches, voice,
        peakDb, rmsDb, dynamicRange: peakDb - rmsDb,
        duration: len / sr,
      };
    }

    // ------------------------------------------------------------------
    // rendering helpers
    // ------------------------------------------------------------------
    function heat(v) {
      v = Math.max(0, Math.min(1, v));
      const r = Math.round(255 * Math.pow(v, 0.85));
      const g = Math.round(255 * Math.pow(v, 2.0) * 0.95);
      const b = Math.round(255 * Math.pow(v, 0.4) * 0.95);
      return [r, g, b];
    }

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
        let defaultLang = 'zh';
        try {
          const snap = ctx.locale.getLocale();
          if (snap && snap.active && !String(snap.active).toLowerCase().startsWith('zh')) defaultLang = 'en';
        } catch (e) {}

        function Panel() {
          const [lang, setLang] = React.useState(defaultLang);
          const t = (k) => {
            const v = lang === 'zh' ? ZH[k] : EN[k];
            if (v !== undefined) return v;
            return EN[k] !== undefined ? EN[k] : k;
          };
          const [tab, setTab] = React.useState('fit');
          const [meta, setMeta] = React.useState(null);
          const [buffer, setBuffer] = React.useState(null);
          const [analysis, setAnalysis] = React.useState(null);
          const [analyzing, setAnalyzing] = React.useState(false);
          const [error, setError] = React.useState('');
          const [dragging, setDragging] = React.useState(false);
          const [skillText, setSkillText] = React.useState(() => { try { return window.localStorage.getItem('ss-skill-text') || ''; } catch (e) { return ''; } });
          const [skillName, setSkillName] = React.useState(() => { try { return window.localStorage.getItem('ss-skill-name') || ''; } catch (e) { return ''; } });
          const skillInputRef = React.useRef(null);
          const skillFolderRef = React.useRef(null);
          const canvasRef = React.useRef(null);
          const specRef = React.useRef(null);
          const pitchRef = React.useRef(null);
          const inputRef = React.useRef(null);
          const styleEl = React.useMemo(() => h('style', null, CSS), []);

          const audioCtxRef = React.useRef(null);
          const sourceRef = React.useRef(null);
          const startRef = React.useRef({ startedAt: 0, offset: 0 });
          const [playing, setPlaying] = React.useState(false);
          const [playTime, setPlayTime] = React.useState(0);

          const stopSource = () => {
            const s = sourceRef.current;
            if (s) { try { s.onended = null; s.stop(); } catch (e) {} sourceRef.current = null; }
          };
          const ensureCtx = () => {
            if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
              const AC = window.AudioContext || window.webkitAudioContext;
              audioCtxRef.current = new AC();
            }
            if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
            return audioCtxRef.current;
          };
          const fmtTime = (s) => {
            if (!isFinite(s) || s < 0) s = 0;
            const m = Math.floor(s / 60);
            const sec = s - m * 60;
            return m + ':' + (sec < 10 ? '0' : '') + sec.toFixed(1);
          };
          const doPlay = () => {
            if (!buffer) return;
            const ctx = ensureCtx();
            stopSource();
            let offset = startRef.current.offset;
            if (offset >= buffer.duration - 0.01) offset = 0;
            const src = ctx.createBufferSource();
            src.buffer = buffer;
            src.connect(ctx.destination);
            src.onended = () => {
              if (sourceRef.current === src) {
                sourceRef.current = null;
                startRef.current = { startedAt: 0, offset: buffer.duration };
                setPlaying(false);
                setPlayTime(buffer.duration);
              }
            };
            src.start(0, offset);
            sourceRef.current = src;
            startRef.current = { startedAt: ctx.currentTime, offset };
            setPlaying(true);
            setPlayTime(offset);
          };
          const doPause = () => {
            const ctx = audioCtxRef.current;
            if (!ctx) return;
            startRef.current.offset += ctx.currentTime - startRef.current.startedAt;
            stopSource();
            setPlaying(false);
          };
          const togglePlay = () => { if (playing) doPause(); else doPlay(); };
          const seekTo = (t) => {
            if (!buffer) return;
            const clamped = Math.max(0, Math.min(buffer.duration, t));
            if (playing) {
              stopSource();
              setPlaying(false);
              startRef.current = { startedAt: 0, offset: clamped };
              doPlay();
            } else {
              startRef.current.offset = clamped;
              setPlayTime(clamped);
            }
          };

          React.useEffect(() => {
            if (!playing) return undefined;
            const id = setInterval(() => {
              const ctx = audioCtxRef.current;
              if (!ctx) return;
              const tNow = startRef.current.offset + (ctx.currentTime - startRef.current.startedAt);
              setPlayTime(Math.min(buffer ? buffer.duration : 0, tNow));
            }, 100);
            return () => clearInterval(id);
          }, [playing, buffer]);

          React.useEffect(() => () => {
            stopSource();
            if (audioCtxRef.current) { try { audioCtxRef.current.close(); } catch (e) {} }
          }, []);

          const loadFile = React.useCallback(async (file) => {
            if (!file) return;
            setError('');
            setAnalysis(null);
            stopSource();
            startRef.current = { startedAt: 0, offset: 0 };
            setPlaying(false);
            setPlayTime(0);
            try {
              const arrayBuf = await file.arrayBuffer();
              const AC = window.AudioContext || window.webkitAudioContext;
              const actx = new AC();
              const audioBuffer = await actx.decodeAudioData(arrayBuf.slice(0));
              let peak = 0;
              for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
                const d = audioBuffer.getChannelData(ch);
                for (let i = 0; i < d.length; i++) {
                  const v = d[i] < 0 ? -d[i] : d[i];
                  if (v > peak) peak = v;
                }
              }
              setBuffer(audioBuffer);
              setMeta({ name: file.name, duration: audioBuffer.duration, sampleRate: audioBuffer.sampleRate, channels: audioBuffer.numberOfChannels, peak });
              try { await actx.close(); } catch (e) {}
              setAnalyzing(true);
              setTimeout(() => {
                try {
                  const res = analyzeBuffer(audioBuffer);
                  setAnalysis(res);
                } catch (e) {
                  setError('分析失败：' + (e && e.message ? e.message : String(e)));
                } finally {
                  setAnalyzing(false);
                }
              }, 30);
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
            const d = buffer.getChannelData(0);
            const step = Math.max(1, Math.floor(d.length / w));
            g.strokeStyle = color;
            g.lineWidth = 1;
            g.beginPath();
            for (let x = 0; x < w; x++) {
              let min = 1, max = -1;
              const start = x * step;
              const end = Math.min(start + step, d.length);
              for (let i = start; i < end; i++) {
                const v = d[i];
                if (v < min) min = v;
                if (v > max) max = v;
              }
              if (max < min) { min = 0; max = 0; }
              g.moveTo(x + 0.5, (1 - max) * ht / 2);
              g.lineTo(x + 0.5, (1 - min) * ht / 2);
            }
            g.stroke();
          }, [buffer]);

          React.useEffect(() => {
            if (!analysis || !specRef.current) return;
            const canvas = specRef.current;
            const dpr = window.devicePixelRatio || 1;
            const w = canvas.clientWidth || 600;
            const ht = 180;
            canvas.width = Math.max(1, Math.round(w * dpr));
            canvas.height = Math.round(ht * dpr);
            const g = canvas.getContext('2d');
            if (!g) return;
            const img = g.createImageData(canvas.width, canvas.height);
            const data = img.data;
            const { spec, frameCount, bins, sr } = analysis;
            const fMin = 40;
            const fMax = Math.min(16000, sr / 2);
            for (let px = 0; px < canvas.width; px++) {
              const frame = Math.min(frameCount - 1, Math.floor((px / canvas.width) * frameCount));
              const base = frame * bins;
              for (let py = 0; py < canvas.height; py++) {
                const yFrac = 1 - py / canvas.height;
                const freq = fMin * Math.pow(fMax / fMin, yFrac);
                const bin = Math.min(bins - 1, Math.round((freq / (sr / 2)) * bins));
                const v = spec[base + bin] || 0;
                const [r, gc, b] = heat(v);
                const o = (py * canvas.width + px) * 4;
                data[o] = r; data[o + 1] = gc; data[o + 2] = b; data[o + 3] = 255;
              }
            }
            g.putImageData(img, 0, 0);
          }, [analysis]);

          React.useEffect(() => {
            if (!analysis || !pitchRef.current) return;
            const canvas = pitchRef.current;
            const dpr = window.devicePixelRatio || 1;
            const w = canvas.clientWidth || 600;
            const ht = 130;
            canvas.width = Math.max(1, Math.round(w * dpr));
            canvas.height = Math.round(ht * dpr);
            const g = canvas.getContext('2d');
            if (!g) return;
            g.setTransform(dpr, 0, 0, dpr, 0, 0);
            g.clearRect(0, 0, w, ht);
            const pts = analysis.pitches;
            if (!pts.length) return;
            let lo = Infinity, hi = -Infinity;
            for (const p of pts) { if (p.midi < lo) lo = p.midi; if (p.midi > hi) hi = p.midi; }
            if (hi - lo < 2) { const mid = (hi + lo) / 2; lo = mid - 1; hi = mid + 1; }
            const pad = 1;
            lo -= pad; hi += pad;
            const dur = analysis.duration || 1;
            const yOf = (midi) => ht - ((midi - lo) / (hi - lo)) * ht;
            g.strokeStyle = 'rgba(160,170,190,0.35)';
            g.lineWidth = 1;
            g.beginPath();
            for (let m = Math.ceil(lo); m <= Math.floor(hi); m++) {
              const y = yOf(m);
              g.moveTo(0, y + 0.5); g.lineTo(w, y + 0.5);
            }
            g.stroke();
            g.strokeStyle = '#5fd0ff';
            g.lineWidth = 2;
            g.beginPath();
            let started = false;
            for (const p of pts) {
              const x = (p.t / dur) * w;
              const y = yOf(p.midi);
              if (!started) { g.moveTo(x, y); started = true; } else g.lineTo(x, y);
            }
            g.stroke();
          }, [analysis]);

          const onSkillFile = async (f) => {
            if (!f) return;
            try {
              const txt = await f.text();
              setSkillText(txt);
              try { window.localStorage.setItem('ss-skill-text', txt); } catch (e) {}
            } catch (e) {
              setError(t('skill.error') + ' — ' + (e && e.message ? e.message : String(e)));
            }
          };
          const onSkillFolder = async (files) => {
            const list = Array.from(files || []);
            if (!list.length) return;
            const isText = (f) => /\.(md|markdown|txt)$/i.test(f.name);
            let target = list.find((f) => /(^|\/)SKILL\.md$/i.test(f.webkitRelativePath || f.name));
            if (!target) target = list.find((f) => /(^|\/)README\.md$/i.test(f.webkitRelativePath || f.name));
            if (!target) target = list.find(isText);
            if (!target) { setError(t('skill.error')); return; }
            try {
              const txt = await target.text();
              setSkillText(txt);
              const folder = (target.webkitRelativePath || '').split('/')[0] || target.name;
              setSkillName(folder);
              try { window.localStorage.setItem('ss-skill-text', txt); window.localStorage.setItem('ss-skill-name', folder); } catch (e) {}
            } catch (e) {
              setError(t('skill.error') + ' — ' + (e && e.message ? e.message : String(e)));
            }
          };
          const clearSkill = () => {
            setSkillText('');
            setSkillName('');
            try { window.localStorage.removeItem('ss-skill-text'); window.localStorage.removeItem('ss-skill-name'); } catch (e) {}
          };

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

          const fitPane = () => {
            if (!analysis) return h('div', { className: 'ss-card' }, t('fit.soon'));
            const r = analysis.range;
            const advice = buildFitAdvice(analysis);
            const tone = (() => {
              if (!analysis.bands) return '';
              const top = analysis.bands
                .filter((b) => !(b.hi <= 40 || b.lo > 16000))
                .slice()
                .sort((a, b) => b.pct - a.pct)[0];
              if (!top) return '';
              if (top.lo < 250) return t('tone.low');
              if (top.lo < 2000) return t('tone.mid');
              return t('tone.high');
            })();
            return h('div', null,
              h('div', { className: 'ss-grid2' },
                h('div', { className: 'ss-card' },
                  h('b', null, t('range.title')),
                  r
                    ? h('div', null,
                      h('div', { className: 'ss-kv' }, h('span', null, t('range.low')), h('b', null, noteName(r.low) + ' · ' + Math.round(r.low) + ' Hz')),
                      h('div', { className: 'ss-kv' }, h('span', null, t('range.high')), h('b', null, noteName(r.high) + ' · ' + Math.round(r.high) + ' Hz')),
                      h('div', { className: 'ss-kv' }, h('span', null, t('range.comfort')), h('b', null, noteName(r.cLow) + ' – ' + noteName(r.cHigh))),
                      h('div', { className: 'ss-hint' }, r.notes + ' 个稳定音高样本'),
                    )
                    : h('div', { className: 'ss-hint' }, t('range.none')),
                ),
                h('div', { className: 'ss-card' },
                  h('b', null, t('dyn.title')),
                  h('div', { className: 'ss-kv' }, h('span', null, t('dyn.peak')), h('b', null, analysis.peakDb.toFixed(1) + ' dBFS')),
                  h('div', { className: 'ss-kv' }, h('span', null, t('dyn.rms')), h('b', null, analysis.rmsDb.toFixed(1) + ' dBFS')),
                  h('div', { className: 'ss-kv' }, h('span', null, t('dyn.range')), h('b', null, analysis.dynamicRange.toFixed(1) + ' dB')),
                  h('div', { className: 'ss-hint' }, tone),
                ),
              ),
              h('div', { className: 'ss-card' },
                h('b', null, t('bands.title')),
                analysis.bands.map((b) => h('div', { className: 'ss-band', key: b.id },
                  h('div', { className: 'ss-band-top' }, h('span', null, t(b.id)), h('span', null, b.pct + '%')),
                  h('div', { className: 'ss-band-track' }, h('div', { className: 'ss-band-fill', style: { width: b.pct + '%' } })),
                )),
              ),
              h('div', { className: 'ss-card' },
                h('b', null, t('fit.adviceTitle')),
                h('div', { className: 'ss-chips' }, (advice.feats || []).map((k) => h('span', { className: 'ss-chip', key: k }, t(k)))),
                h('div', { className: 'ss-adv' }, h('b', null, t('fit.styles')), (advice.styles || []).map((k) => h('div', { className: 'ss-hint', key: k }, '• ' + t(k)))),
                h('div', { className: 'ss-adv' }, h('b', null, t('fit.dos')), (advice.dos || []).map((k) => h('div', { className: 'ss-hint', key: k }, '✓ ' + t(k)))),
                h('div', { className: 'ss-adv' }, h('b', null, t('fit.donts')), (advice.donts || []).map((k) => h('div', { className: 'ss-hint', key: k }, '✕ ' + t(k)))),
              ),
            );
          };

          const healthPane = () => {
            const v = analysis && analysis.voice;
            if (!v) {
              return h('div', { className: 'ss-card' },
                h('b', null, t('tab.health')), ' — ', t('health.none'),
                h('div', { className: 'ss-hint' }, t('health.note')),
              );
            }
            let adviceKey = 'health.advice.ok';
            if (v.hnr < 10 || v.jitter > 2) adviceKey = 'health.advice.rough';
            else if (v.breath > 60) adviceKey = 'health.advice.breathy';
            const row = (label, value) => h('div', { className: 'ss-kv' }, h('span', null, label), h('b', null, value));
            return h('div', null,
              h('div', { className: 'ss-card' },
                h('b', null, t('health.title')),
                row(t('health.jitter'), v.jitter.toFixed(2) + ' %'),
                row(t('health.shimmer'), v.shimmer.toFixed(2) + ' %'),
                row(t('health.hnr'), v.hnr.toFixed(1) + ' dB'),
                row(t('health.samples'), String(v.samples)),
              ),
              h('div', { className: 'ss-card' },
                h('b', null, t('health.indices')),
                row(t('health.stability'), Math.round(v.stability) + '/100'),
                row(t('health.breath'), Math.round(v.breath) + '/100'),
                row(t('health.grit'), Math.round(v.grit) + '/100'),
              ),
              h('div', { className: 'ss-hint' }, t(adviceKey)),
              h('div', { className: 'ss-hint' }, t('health.note')),
            );
          };

          const skillCard = () => h('div', { className: 'ss-card' },
            h('b', null, t('skill.title')),
            h('div', { className: 'ss-hint' }, skillText ? (skillName ? t('skill.loadedName').replace('{name}', skillName) : t('skill.loaded')) : t('skill.hint')),
            h('div', { className: 'ss-skill-actions' },
              h('button', { type: 'button', className: 'ss-lang', onClick: () => skillInputRef.current && skillInputRef.current.click() }, t('skill.import')),
              h('button', { type: 'button', className: 'ss-lang', onClick: () => skillFolderRef.current && skillFolderRef.current.click() }, t('skill.importFolder')),
              skillText ? h('button', { type: 'button', className: 'ss-lang', onClick: clearSkill }, t('skill.clear')) : null,
            ),
            h('input', {
              ref: skillInputRef, type: 'file', accept: '.md,.txt,.json,.markdown', style: { display: 'none' },
              onChange: (e) => { const f = e.target.files && e.target.files[0]; if (f) onSkillFile(f); e.target.value = ''; },
            }),
            h('input', {
              ref: skillFolderRef, type: 'file', webkitdirectory: '', directory: '', multiple: true, style: { display: 'none' },
              onChange: (e) => { const fs = e.target.files; if (fs && fs.length) onSkillFolder(fs); e.target.value = ''; },
            }),
            skillText ? h('div', { className: 'ss-hint' }, t('skill.chars').replace('{n}', String(skillText.length))) : null,
          );

          const mixPane = () => {
            if (!analysis) {
              return h('div', null,
                h('div', { className: 'ss-card' }, h('b', null, t('tab.mix')), ' — ', t('mix.soon')),
                skillCard(),
              );
            }
            const get = (id) => { const b = analysis.bands.find((x) => x.id === id); return b ? b.pct : 0; };
            const low = get('band.low');
            const lowmid = get('band.lowmid');
            const highmid = get('band.highmid');
            const high = get('band.high');
            const air = get('band.air');
            const recs = [];
            if (low + lowmid > 150) recs.push(t('mix.low'));
            if (highmid > 70) recs.push(t('mix.deess'));
            if (high > 70) recs.push(t('mix.bright'));
            if (air < 25) recs.push(t('mix.air'));
            if (analysis.dynamicRange > 18) recs.push(t('mix.compress'));
            else if (analysis.dynamicRange < 6) recs.push(t('mix.flat'));
            if (!recs.length) recs.push(t('mix.ok'));
            const prod = buildProductionAdvice(analysis);
            const hints = skillHints(skillText);
            return h('div', null,
              h('div', { className: 'ss-card' },
                h('b', null, t('mix.title')),
                recs.map((r, i) => h('div', { className: 'ss-hint', key: i }, '• ' + r)),
              ),
              h('div', { className: 'ss-card' },
                h('b', null, t('prod.title')),
                h('div', { className: 'ss-adv' }, h('b', null, t('prod.inst')), prod.inst.map((k) => h('div', { className: 'ss-hint', key: k }, '• ' + t(k)))),
                h('div', { className: 'ss-adv' }, h('b', null, t('prod.arr')), prod.arr.map((k) => h('div', { className: 'ss-hint', key: k }, '✓ ' + t(k)))),
                h('div', { className: 'ss-adv' }, h('b', null, t('prod.avoid')), prod.avoid.map((k) => h('div', { className: 'ss-hint', key: k }, '✕ ' + t(k)))),
              ),
              skillCard(),
              hints.length ? h('div', { className: 'ss-card' },
                h('b', null, t('skill.refTitle')),
                hints.map((line, i) => h('div', { className: 'ss-hint', key: i }, '• ' + line)),
              ) : null,
            );
          };

          return h(React.Fragment, null,
            styleEl,
            h('div', { className: 'ss-root' },
              h('div', { className: 'ss-header' },
                h('div', { className: 'ss-title' }, t('panel.title')),
                h('button', {
                  type: 'button', className: 'ss-lang',
                  title: lang === 'zh' ? 'Switch to English' : '切换到中文',
                  onClick: () => setLang(lang === 'zh' ? 'en' : 'zh'),
                }, lang === 'zh' ? 'EN' : '中文'),
              ),
              h('div', { className: 'ss-sub' }, t('panel.sub')),
              h('div', { className: 'ss-body' },
                h('div', {
                  className: 'ss-drop' + (dragging ? ' is-over' : ''),
                  role: 'button', tabIndex: 0,
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
                analyzing ? h('div', { className: 'ss-loading' }, t('analyzing')) : null,
                meta ? h('div', { className: 'ss-meta' },
                  h('div', { className: 'ss-meta-cell' }, h('label', null, t('meta.duration')), h('b', null, meta.duration.toFixed(2) + ' s')),
                  h('div', { className: 'ss-meta-cell' }, h('label', null, t('meta.sampleRate')), h('b', null, (meta.sampleRate / 1000).toFixed(1) + ' kHz')),
                  h('div', { className: 'ss-meta-cell' }, h('label', null, t('meta.channels')), h('b', null, meta.channels === 1 ? 'Mono' : meta.channels + ' ch')),
                  h('div', { className: 'ss-meta-cell' }, h('label', null, t('meta.peak')), h('b', null, (20 * Math.log10(Math.max(meta.peak, 1e-6))).toFixed(1) + ' dBFS')),
                ) : null,
                buffer ? h('div', { className: 'ss-player' },
                  h('button', {
                    type: 'button', className: 'ss-play',
                    'aria-label': playing ? 'Pause' : 'Play',
                    onClick: togglePlay,
                  }, playing ? '⏸' : '▶'),
                  h('input', {
                    type: 'range', className: 'ss-seek', min: 0, max: buffer.duration, step: 0.01,
                    value: Math.min(playTime, buffer.duration),
                    onChange: (e) => seekTo(parseFloat(e.target.value)),
                  }),
                  h('span', { className: 'ss-time' }, fmtTime(playTime) + ' / ' + fmtTime(buffer.duration)),
                ) : null,
                buffer ? h('div', { className: 'ss-wavewrap' },
                  h('canvas', { ref: canvasRef, className: 'ss-wave' }),
                  h('div', { className: 'ss-head', style: { left: (buffer.duration ? (playTime / buffer.duration) * 100 : 0) + '%' } }),
                ) : null,
                analysis ? h('div', { className: 'ss-chartwrap' },
                  h('div', { className: 'ss-chart-cap' }, t('spec.title')),
                  h('canvas', { ref: specRef, className: 'ss-chart', style: { height: 180 } }),
                ) : null,
                analysis ? h('div', { className: 'ss-chartwrap' },
                  h('div', { className: 'ss-chart-cap' }, t('pitch.title')),
                  h('canvas', { ref: pitchRef, className: 'ss-chart', style: { height: 130 } }),
                ) : null,
                h('div', { className: 'ss-tabs' },
                  tabs.map((tb) => h('button', {
                    key: tb.id, type: 'button',
                    className: 'ss-tab' + (tab === tb.id ? ' is-on' : ''),
                    onClick: () => setTab(tb.id),
                  }, tb.label)),
                ),
                h('div', { className: 'ss-pane' },
                  tab === 'fit' ? fitPane() : tab === 'health' ? healthPane() : mixPane(),
                ),
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
