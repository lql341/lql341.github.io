---
title: "PaddleOCR 海光 Z100 兼容性、性能与生产复现"
titleEn: "PaddleOCR on Hygon Z100: Compatibility, Performance & Production Reproduction"
summary: PaddleOCR 3.7.0 / PaddleX 3.7.2 在单卡 gfx906 上完成端到端验证；23 页 PDF 稳态吞吐为 0.49 页/s，并与 MinerU 进行同文档比较。
summaryEn: PaddleOCR 3.7.0 and PaddleX 3.7.2 complete end-to-end validation on one gfx906 card; the 23-page PDF runs at 0.49 pages/s in steady state.
date: 2026-09-27
tags: [PaddleOCR, Z100, Transformers, OCR]
tagsZh: [PaddleOCR, Z100, Transformers, OCR]
href: /reports/paddleocr-z100-transformers-report.html
hrefEn: /reports/en/paddleocr-z100.html
featured: true
homeOrder: 1
metric: 0.49 pages/s
metricLabel: 23 页 PDF 稳态吞吐
metricLabelEn: steady-state OCR throughput across 23 pages
---

The report documents compatibility, steady-state latency, production deployment, and reproducibility boundaries for PaddleOCR on Hygon Z100.
