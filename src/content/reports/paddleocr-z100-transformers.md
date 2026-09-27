---
title: "PaddleOCR 海光 Z100 兼容性、性能与生产复现"
titleEn: "PaddleOCR on Hygon Z100: Compatibility, Performance & Production Reproduction"
summary: PaddleOCR 3.7.0 / PaddleX 3.7.2 通过 Transformers/PyTorch 路线在单卡 gfx906 上端到端跑通；23 页 PDF 稳定态吞吐 0.49 页/s，并与 MinerU 做同文档对比。
summaryEn: PaddleOCR 3.7.0 and PaddleX 3.7.2 run end to end on one gfx906 card through Transformers/PyTorch, with a same-document performance comparison against MinerU.
date: 2026-09-27
tags: [PaddleOCR, Z100, Transformers, OCR]
tagsZh: [PaddleOCR, Z100, Transformers, OCR]
href: /reports/paddleocr-z100-transformers-report.html
featured: true
homeOrder: 1
metric: 0.49 pages/s
metricLabel: 23-page stable OCR throughput
metricLabelEn: steady-state OCR throughput across 23 pages
---

The report documents compatibility, steady-state latency, production deployment, and reproducibility boundaries for PaddleOCR on Hygon Z100.
