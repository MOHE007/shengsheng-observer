# 声生观察台 · Sonic Observer

DeepSeek Harness 的一个插件：上传一段**清唱干声**，拿到客观的声学画像，帮你回答三件事。

| 板块 | 回答的问题 | 你会看到 |
|---|---|---|
| **适配** | 我适合唱什么 | 音域（最低/最高/舒适区）、频段能量分布、音色倾向、风格方向 |
| **嗓况** | 我的嗓子状态如何 | jitter、shimmer、HNR、气声 / 颗粒感 / 稳定度参考指数 + 护嗓/就医提示 |
| **制作** | 编曲混音怎么调 | 频谱平衡、EQ 建议、动态/压缩、齿音与呼吸声、频段冲突 |

> 嗓况板块只提供**客观指标与就医提示**，不是医疗诊断，也不能替代嗓音科/耳鼻喉科检查。

## 当前状态

`v0.5` — 三个板块都有内容：`适配`（波形 / 频谱 / 音高 / 音域 / 频段能量 / 动态）、`嗓况`（jitter / shimmer / HNR + 气声 / 颗粒感 / 稳定度）、`制作`（频谱平衡、EQ、动态与齿音建议）。
支持上传后**试听**：播放 / 暂停、拖动进度、波形上的播放头；面板右上角可切换中文 / English。

## 设计原则

- **本地优先**：v1 的音频解码与分析全部在浏览器完成，音频不出本机。
- **客观先行**：先给可复现的数值（音域、频段能量、jitter/shimmer/HNR 等），再给方向性建议。
- **边界清晰**：声带健康只做筛查提示，不做诊断。

## 安装（试用）

**方式一：下载安装包（推荐）**

1. 到 [Releases](https://github.com/MOHE007/shengsheng-observer/releases) 下载最新版 `dsh-shengsheng-observer-0.5.0.tgz`；
2. 打开 DeepSeek Harness → 插件 → 添加插件，选择这个 tgz 安装；
3. 左侧栏出现「声生观察台」后，刷新页面即可使用。

**方式二：命令行**

```sh
dsh plugin --profile <你的 profile> add file:/下载目录/dsh-shengsheng-observer-0.5.0.tgz
```

**方式三：从源码本地安装**

```sh
dsh plugin --profile desktop add link:/path/to/声生观察台
```

> 欢迎试用后在本仓库的 Issues 里反馈问题或建议。

## 目录

```
声生观察台/
├── client.js          # 浏览器半片：面板 UI、音频解码、波形与后续 DSP
├── index.js           # Host 半片：预留给 Python/numpy 重分析
├── cordis.patch.yml   # bundle patch
├── locale/            # 插件显示名与描述
├── docs/
│   ├── ALGORITHMS.md  # 开源算法与库选型
│   └── ROADMAP.md     # 阶段计划
└── package.json
```

## 隐私

v1 音频解码与分析在浏览器本地完成，不上传服务器。

## License

MIT
