---
title: 海光 DCU 大模型适配与吞吐调优实测
titleEn: LLM Porting and Throughput Tuning on Hygon DCU
summary: 20 个开源模型在 gfx936 上的移植与调优记录，含跨引擎六档基准对比、两项长期误判的根因分析，以及 59 项可复现的工程约束。
summaryEn: Porting and tuning 20 open-source models on gfx936, with cross-engine benchmarks, root-cause analyses of two long-misattributed failures, and 59 reproducible engineering constraints.
date: 2026-11-15
tags: [DCU, gfx936, vLLM, SGLang, Inference]
tagsZh: [海光 DCU, gfx936, vLLM, SGLang, 推理优化]
href: /reports/dcu-model-zoo-report.html
featured: true
homeOrder: 2
metric: +10.5%
metricLabel: 长上下文吞吐提升 · 20 个条目
metricLabelEn: long-context throughput gain · 20 models
---

本报告记录 20 个开源模型在单一代国产加速卡上的移植、基准测试与调优过程。

覆盖三类负载：文本生成与理解、图像与视频生成、语音识别与对齐。核心结论包括：
跨引擎性能差距依负载档位而定且方向相反；长上下文高并发崩溃源于进程累计状态而非配置；
单流性能差距可归因为每解码步的固定开销。
