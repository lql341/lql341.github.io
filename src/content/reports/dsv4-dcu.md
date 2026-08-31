---
title: DeepSeek V4 Flash FP4 海光 DCU vLLM 移植
titleEn: DeepSeek V4 Flash FP4 vLLM Port on Hygon DCU
summary: vLLM V1 TP=4/8 端到端移植、Sparse MLA 与 MoE 优化，以及 batch 正确性边界分析。
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
