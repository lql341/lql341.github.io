---
title: vLLM 0.27.x 移植成功：DeepSeek V4 Flash FP4 海光 DCU
titleEn: vLLM 0.27.x Ported to Hygon DCU for DeepSeek V4 Flash FP4
summary: vLLM 0.27.x 经 gfx936/DTK 定向适配后，使用真实 FP4 权重完成 TP=4/8 端到端推理；完整记录根因、补丁时间线、验证证据、性能与 batch 边界。
date: 2026-08-26
tags: [DeepSeek, DCU, vLLM, FP4]
tagsZh: [DeepSeek, DCU, vLLM, FP4]
href: /reports/dsv4-dcu-report.html
featured: true
homeOrder: 4
metric: vLLM 0.27.x
metricLabel: gfx936 移植成功 · TP=4/8
---

本报告记录 DeepSeek V4 Flash FP4 从软件原型推进到 vLLM V1 端到端推理的过程；公开版已移除集群、账户、作业、路径和内部资源信息。
