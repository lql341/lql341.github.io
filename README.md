# opensource_community personal site

这是一个基于 Astro、TypeScript 与 GitHub Pages 的个人技术站点骨架，聚焦 HPC、GPU 软件适配、性能工程和开源实践。

## 发布

1. GitHub 个人主页仓库：`lql341/lql341.github.io`。
2. 安装依赖并执行 `pnpm build`。
3. 将本目录推送到仓库的 `main` 分支。
4. GitHub Actions 会构建并部署站点。

访问地址：

- 线上地址：`https://lql341.github.io/`

## 本地开发

```bash
pnpm install
pnpm dev
pnpm build
```

## 添加新报告

在 `src/content/reports/` 增加 Markdown 元数据。当前两份完整报告暂存于 `public/reports/`，后续可逐步迁移为 MDX。

> GitHub Pages 是公开网站。发布前请清除报告中的密码、Token、内网地址或其他敏感信息。
