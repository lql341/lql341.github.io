---
title: vLLM 0.27.x 移植成功：DeepSeek V4 Flash FP4 海光 DCU
titleEn: vLLM 0.27.x Ported to Hygon DCU for DeepSeek V4 Flash FP4
summary: vLLM 0.27.x 经 gfx936/DTK 定向适配后，V1 Engine 使用真实 FP4 权重完成 TP=4/8 端到端推理。
date: 2026-08-26
tags: [DeepSeek, DCU, vLLM, FP4]
tagsZh: [DeepSeek, DCU, vLLM, FP4]
href: /reports/dsv4-dcu-report.html
featured: true
homeOrder: 4
metric: 0.99 tok/s
metricLabel: TP=4 固定 32 token
---

本报告记录 DeepSeek V4 Flash FP4 从软件原型推进到 vLLM V1 端到端推理的过程；公开版已移除集群、账户、作业、路径和内部资源信息。
