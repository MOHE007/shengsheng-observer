# 声生观察台 · Sonic Observer

DeepSeek Harness 的一个插件：上传一段**清唱干声**，拿到客观的声学画像，帮你回答三件事。

| 板块 | 回答的问题 | 你会看到 |
|---|---|---|
| **适配** | 我适合唱什么 | 音域（最低/最高/舒适区）、频段能量分布、音色倾向、风格方向 |
| **嗓况** | 我的嗓子状态如何 | jitter、shimmer、HNR、CPP、气声比例、颗粒感参考指数 + 护嗓/就医提示 |
| **制作** | 编曲混音怎么调 | 频谱平衡、EQ 建议、动态/压缩、齿音与呼吸声、频段冲突 |

> 嗓况板块只提供**客观指标与就医提示**，不是医疗诊断，也不能替代嗓音科/耳鼻喉科检查。

## 当前状态

`v0.3` — `适配` 板块（波形 / 频谱 / 音高 / 音域 / 频段能量 / 动态）可用；`嗓况` 板块上线 jitter、shimmer、HNR 与气声 / 颗粒感 / 稳定度参考指数。
`制作` 板块仍在实现。详见 [`docs/ROADMAP.md`](docs/ROADMAP.md)。

## 设计原则

- **本地优先**：v1 的音频解码与分析全部在浏览器完成，音频不出本机。
- **客观先行**：先给可复现的数值（音域、频段能量、jitter/shimmer/HNR 等），再给方向性建议。
- **边界清晰**：声带健康只做筛查提示，不做诊断。

## 安装（本地开发）

在 DeepSeek Harness 的「插件 → 添加插件」里选择本地目录，或在 profile 中 link 安装：

```sh
dsh plugin --profile desktop add link:/Users/mac/Downloads/声生观察台
```

> 具体以当前 DSH 版本的插件管理界面为准。

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
