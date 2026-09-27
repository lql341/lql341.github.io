# Report presentation standard

Every HTML report in `public/reports/` uses the shared visual system from the homepage. The standard covers presentation only; report wording, measurements, conclusions, and source material remain the author's content.

## Page frame

- Load `/reports/report-theme.css` after any legacy inline stylesheet.
- When the shared stylesheet changes, bump the `?v=` value on every report link to prevent browsers reusing a stale cached theme.
- Include the shared `.report-site-nav` navigation shell.
- Mark exactly one report title block with `.report-banner`.
- Use the shared chapter index: it appears as a fixed, scrollable left rail on wide screens and as a collapsible panel on smaller screens. Legacy duplicate TOCs are hidden.
- Number index entries independently of legacy heading text: top-level headings display `01`, `02`, … and subsections display `01.1`, `01.2`, …; page-image readers display `P01`, `P02`, …. The index strips duplicated old numbering and decorative emoji while preserving each heading's wording and anchor.
- Keep the reading column at a maximum width of 1040 px. A table of contents may sit beside that column on wide screens.
- Use the shared dark background, `--report-banner` muted green gradient, fine borders, and lime accent defined by the theme tokens.

## Type scale and rhythm

- Body text: 15 px with a 1.72 line height.
- Report title (`--report-title-size`): responsive 34–52 px, 1.08 line height, semibold, tight tracking.
- Section title (`--report-h2-size`): responsive 22–28 px, semibold, 1.3 line height.
- Subsection title (`--report-h3-size`): 19 px, semibold, 1.4 line height.
- Fourth-level title: 16 px, 1.45 line height.
- Banner padding: responsive 26–48 px; 25 px vertical / 22 px horizontal on narrow screens.
- Body section surfaces, tables, callouts, code blocks, and links use the shared theme components and palette.

Legacy report-specific CSS may arrange specialized content such as a TOC or page-image reader. It must not redefine the shared banner, title scale, body scale, or homepage palette.

## Title, chapter, and keyword naming

- New Chinese report titles follow `项目/软件｜平台/版本｜主题或结论`; English titles follow `Project on Platform — Scope or Result`. Keep the browser `<title>` and visible H1 aligned.
- Keep titles concise, specific, and descriptive. Omit rhetorical phrasing, decorative emoji, dates, author names, and secondary metadata from the title.
- Use one primary report title. Keep dates, authors, software versions, and test environment in the metadata line rather than appending them as a second title.
- Use an evidence-oriented section flow, adapting to the report: `摘要` → `目标与范围` → `测试环境与方法` → `结果与分析` → `结论与适用边界` → `复现材料/附录`.
- Top-level chapters use two-digit order and a concise noun phrase: `01 摘要`, `02 目标与范围`, `03 测试环境与方法`, `04 结果与分析`, `05 结论与适用边界`. Subsections use decimal numbering (`03.1`, `03.2`) and remain under their parent. The shared theme applies the same visible numbering to legacy headings and the index.
- Name chapters by subject or measured result. Avoid rhetorical questions (`为什么选择…`), diary language (`接手时…`), hype, unexplained superlatives, and conversational labels such as `踩坑`, `走死的路径`, or `真因`. Prefer neutral terms such as `技术依据`, `问题分析`, `验证结果`, `未采用方案`, and `根因分析`.
- Keep chapter names short, parallel, and specific to the report; prefer noun phrases and use consistent punctuation. The shared index normalizes numbering, while the report headings remain the source of the chapter wording.
- Add one `<meta name="keywords">` list with 4–8 comma-separated entries. Order entries from project/software, platform/version, method or workload, then measured topic; use canonical product spelling, avoid duplicates, hashtags, and generic terms such as “report” or “technology”.
- CI checks title separators and chapter numbering for new report files and checks keyword metadata for every report.

## Prose and evidence

- Use concise, neutral technical prose. State the configuration and workload, report measured values and conditions, then distinguish interpretation from observation.
- Identify whether a claim is measured, inferred from source/runtime behavior, or not yet verified. State limitations where they affect the conclusion.
- Replace colloquial process narration and promotional language with reproducible descriptions. Preserve commands, logs, identifiers, measurements, and evidence links verbatim when they are source material.
- Define abbreviations at first use when they are not standard for the intended technical audience. Use product names, hardware identifiers, versions, units, and capitalization consistently.

These conventions follow the concise descriptive title guidance and standard research-report structure recommended by the [IEEE Author Center](https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/create-the-text-of-your-article/structure-your-article/) and [IEEE Professional Communication Society](https://procomm.ieee.org/communication-resources-for-engineers/written-reports/write-effective-reports/). Test reports also retain scope, environment, methods, conclusions, results analysis, limitations, and recommendations as specified in the [CSRC software testing specification](https://www.csrc.gov.cn/csrc/c101950/c1048030/1048030/files/%E9%99%84%E4%BB%B6%EF%BC%9A%E3%80%8A%E8%AF%81%E5%88%B8%E6%9C%9F%E8%B4%A7%E4%B8%9A%E8%BD%AF%E4%BB%B6%E6%B5%8B%E8%AF%95%E8%A7%84%E8%8C%83%E3%80%8B.pdf).
