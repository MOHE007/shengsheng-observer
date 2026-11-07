# 开源算法与库选型

目标：在浏览器里对一段**清唱干声**做声学分析，尽量用成熟、许可宽松的开源实现，少造轮子。

## 结论：推荐组合

| 层 | 选型 | 许可 | 理由 |
|---|---|---|---|
| 解码 | Web Audio `AudioContext.decodeAudioData` | 浏览器内置 | 原生支持 wav/mp3/m4a/ogg，无需 ffmpeg |
| 音高检测 | [`pitchy`](https://github.com/ianprime0509/pitchy) | MIT | 纯 JS、无依赖、YIN/McLeod 算法成熟，适合音域与音准 |
| 特征提取（可选） | [`meyda`](https://github.com/meyda/meyda) | MIT | RMS、spectral centroid/flatness/rolloff、MFCC 等现成实现 |
| 波形/频谱可视化 | 原生 Canvas（首选）或 [`wavesurfer.js`](https://wavesurfer.xyz) | BSD-3 | Canvas 零依赖最轻；wavesurfer 省事但引入依赖 |
| 嗓音指标 | 自写（参考 Praat 定义） | 自研 | jitter/shimmer/HNR/CPP 没有成熟的 JS 现成库，算法不复杂 |

> 许可以各项目仓库的 LICENSE 为准；引用前请再核对一次版本。

## 嗓音指标参考（Praat 定义）

这些是嗓音学/语音学里常用的客观量，Praat 的 Voice Report 有明确公式，可据此自研：

- **jitter**（基频周期扰动）：local、rap、ppq5
- **shimmer**（振幅扰动）：local、apq3、apq5、apq11
- **HNR**（谐噪比，Boersma 方法）
- **CPP**（倒谱峰突出度，cepstral peak prominence）
- **气声比例 / 颗粒感（rasp）**：用谐波噪声比、频谱不规则性、次谐波与调制分析综合出参考指数

> 这些指标能提示“嗓音质量偏离”，但不能诊断声带病变。

## 已有可参考实现

- **Praat**（GPL，桌面软件）：公式与算法参考；`parselmouth` 是其 Python 封装。
- **librosa**（ISC）：Python，音高、MFCC、频谱特征；可作算法对照。
- **essentia.js**（AGPL，WASM）：功能强、偏音乐信息检索，体积大，注意 AGPL 传染性。
- **aubio**（GPL）：pitch/onset/tempo，有 JS 编译版，注意 GPL。

## 备选与取舍

- 若要“更强、更医学化”的指标，第二版把 PCM 交给 Host 端 **numpy/scipy**（本机已可用；ffmpeg 需另装）实现 LPC 共振峰、CPP 等。
- 若追求零依赖，全部用原生 Web Audio + 自写 FFT/自相关，体积最小、隐私最好。
