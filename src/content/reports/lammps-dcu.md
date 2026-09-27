---
title: LAMMPS 海光 DCU 双平台编译与性能验证
titleEn: LAMMPS Build and Performance Validation on Two Hygon DCU Platforms
summary: 融合 gfx936 与 gfx906/Z100 的 Kokkos/HIP 构建、正确性、多卡扩展、热点优化和 DTK 兼容性验证。
summaryEn: Build and correctness results, multi-GPU scaling, hotspot optimization, and DTK compatibility for Kokkos/HIP on gfx936 and gfx906/Z100.
date: 2026-08-18
tags: [LAMMPS, HPC, HIP, Kokkos]
tagsZh: [LAMMPS, 高性能计算, HIP, Kokkos]
href: /reports/lammps-dcu-report.html
hrefEn: /reports/en/lammps-dcu-report.html
featured: true
homeOrder: 3
metric: 4.6–6.3×
metricLabel: Kokkos 相对测试 GPU 路径
metricLabelEn: Kokkos speedup over GPU package
---

本报告记录 LAMMPS 在 gfx936/BW 与 gfx906/Z100 两套海光 DCU 环境下的构建、兼容性、正确性和性能验证过程。
