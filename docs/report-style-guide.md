# Report presentation standard

Every HTML report in `public/reports/` uses the shared visual system from the homepage. The standard covers presentation only; report wording, measurements, conclusions, and source material remain the author's content.

## Page frame

- Load `/reports/report-theme.css` after any legacy inline stylesheet.
- When the shared stylesheet changes, bump the `?v=` value on every report link to prevent browsers reusing a stale cached theme.
- Include the shared `.report-site-nav` navigation shell.
- Mark exactly one report title block with `.report-banner`.
- Put chapter navigation in the shared collapsed outline immediately below the banner; left-side TOCs and duplicate in-body TOCs are hidden.
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

## Title and chapter naming

- New Chinese report titles follow `项目/软件｜平台/版本｜主题或结论`; English titles follow `Project on Platform — Scope or Result`.
- Use one primary report title. Keep dates, authors, software versions, and test environment in the metadata line rather than appending them as a second title.
- Top-level chapters use two-digit order and a concise noun phrase: `01 摘要`, `02 环境与范围`, `03 方法与实现`, `04 结果与验证`, `05 限制与复现`.
- Subsections use decimal numbering (`03.1`, `03.2`) and remain nested under their parent chapter. Use the same language and punctuation style throughout a report.
- CI enforces the title separators and heading numbering for new report files. Existing report title and chapter wording is preserved during this formatting pass; these naming rules govern new reports and any separately authorized editorial revision.
