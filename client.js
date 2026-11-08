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
    };

    const CSS = `
.ss-root{display:flex;flex-direction:column;height:100%;min-height:0;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary)}
.ss-header{display:flex;align-items:baseline;gap:10px;padding:16px 20px 10px;border-bottom:1px solid var(--dsw-alias-border-l1);flex:none}
.ss-title{font-size:16px;font-weight:600}
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
        { name: 'Low 20–250', lo: 20, hi: 250 },
        { name: 'Low-mid 250–500', lo: 250, hi: 500 },
        { name: 'Mid 500–2k', lo: 500, hi: 2000 },
        { name: 'High-mid 2k–4k', lo: 2000, hi: 4000 },
        { name: 'High 4k–8k', lo: 4000, hi: 8000 },
        { name: 'Air 8k–16k', lo: 8000, hi: 16000 },
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
            pitches.push({ t: start / sr, f0: p.f0, midi: midiOf(p.f0) });
          }
        }
      }

      const total = Math.max(1, frameCount);
      const bandMax = Math.max(1e-12, ...bandAccum.map((x) => x / total));
      const bands = bandsDef.map((bd, i) => {
        const v = bandAccum[i] / total;
        return { name: bd.name, lo: bd.lo, hi: bd.hi, pct: Math.round((v / bandMax) * 100) };
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

      return {
        sr, frameCount, bins, hop, spec,
        bands, range, pitches,
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

        function Panel() {
          const [tab, setTab] = React.useState('fit');
          const [meta, setMeta] = React.useState(null);
          const [buffer, setBuffer] = React.useState(null);
          const [analysis, setAnalysis] = React.useState(null);
          const [analyzing, setAnalyzing] = React.useState(false);
          const [error, setError] = React.useState('');
          const [dragging, setDragging] = React.useState(false);
          const canvasRef = React.useRef(null);
          const specRef = React.useRef(null);
          const pitchRef = React.useRef(null);
          const inputRef = React.useRef(null);
          const styleEl = React.useMemo(() => h('style', null, CSS), []);

          const loadFile = React.useCallback(async (file) => {
            if (!file) return;
            setError('');
            setAnalysis(null);
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
            const tone = (() => {
              if (!analysis.bands) return '';
              const top = analysis.bands
                .filter((b) => !(b.hi <= 40 || b.lo > 16000))
                .slice()
                .sort((a, b) => b.pct - a.pct)[0];
              if (!top) return '';
              if (top.lo < 250) return 'energy sits low — chesty, warm';
              if (top.lo < 2000) return 'energy sits in the mids — present, forward';
              return 'energy sits high — bright, airy';
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
                analysis.bands.map((b) => h('div', { className: 'ss-band', key: b.name },
                  h('div', { className: 'ss-band-top' }, h('span', null, b.name), h('span', null, b.pct + '%')),
                  h('div', { className: 'ss-band-track' }, h('div', { className: 'ss-band-fill', style: { width: b.pct + '%' } })),
                )),
              ),
            );
          };

          const healthPane = () => h('div', { className: 'ss-card' },
            h('b', null, t('tab.health')), ' — ', t('health.soon'),
            h('div', { className: 'ss-hint' }, t('health.note')),
          );

          const mixPane = () => h('div', { className: 'ss-card' }, h('b', null, t('tab.mix')), ' — ', t('mix.soon'));

          return h(React.Fragment, null,
            styleEl,
            h('div', { className: 'ss-root' },
              h('div', { className: 'ss-header' }, h('div', { className: 'ss-title' }, t('panel.title'))),
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
                buffer ? h('canvas', { ref: canvasRef, className: 'ss-wave' }) : null,
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
