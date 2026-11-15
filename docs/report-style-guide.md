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


## Bilingual pages and collection metadata

Every report exists as a Chinese page at `public/reports/<name>.html` and, where an English edition exists, at `public/reports/en/<name>.html`. The two files share a filename; only the directory differs. English pages are full translations, not excerpts: a reader who lands on one should not encounter Chinese body text.

### Navigation links

The language link appears in one direction only.

| Page | `report-site-nav` language slot |
| --- | --- |
| Chinese `public/reports/<name>.html` | none |
| English `public/reports/en/<name>.html` | `<a href="/reports/<name>.html">Chinese</a>`, appended after `About` |

Do not add an `English` link to the Chinese page. Visitors reach the English edition through the report card on `/reports/`, which links to it directly. The one exception is `latex-bilingual-toolchain-report.html`, which predates this rule and links both ways.

### Collection entry

Each report needs a Markdown entry in `src/content/reports/` that supplies the card shown on `/reports/`. Set both `href` and `hrefEn` whenever an English edition exists:

```yaml
href: /reports/<name>.html
hrefEn: /reports/en/<name>.html
```

`ReportCard.astro` renders `<a href={hrefEn ?? href}>`. Omitting `hrefEn` does not fail the build; the card silently falls back to `href`, so the English listing opens a Chinese page. This is the most common way a bilingual report goes wrong, and no automated check catches it. Verify by opening `/reports/` and confirming the card points at `/reports/en/`.

Also provide `titleEn` and `summaryEn`; both are rendered on the English listing in place of the Chinese fields.

### CSS comments

The English page is checked only for text content, but keep comments in English too so the file has no Chinese outside the language slot.

## Layout scaffold the theme does not supply

`report-theme.css` sets `max-width` on `.layout` but does not define its grid. The two-column shell is therefore each report's local responsibility. Without it the sidebar and the main column stack vertically and the page collapses into one narrow strip.

Copy this block into the report's `<style>` and keep it consistent across reports:

```css
.layout {
  display: grid;
  grid-template-columns: minmax(220px, 300px) minmax(0, 980px);
  gap: 28px;
  max-width: 1380px;
  margin: 0 auto;
  padding: 28px;
}
aside {
  position: sticky;
  top: 20px;
  align-self: start;
  max-height: calc(100vh - 40px);
  overflow: auto;
  background: var(--report-surface);
  border: 1px solid var(--report-line);
  border-radius: 12px;
  padding: 18px 18px 14px;
}
main {
  min-width: 0;
  background: var(--report-surface);
  border: 1px solid var(--report-line);
  border-radius: 12px;
  padding: 44px 54px 64px;
}
@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; padding: 14px; gap: 16px; }
  aside { position: static; max-height: none; }
  main { padding: 28px 22px 40px; }
}
```

Structure: `<div class="report-site-nav">`, then `<div class="layout">` containing `<aside>` with the chapter list and `<main>` with the banner and body. Do not wrap chapters in `.section` cards; the theme styles bare headings and paragraphs inside `main`.

Two details the checker enforces indirectly:

- The `<aside>` label must not be an `<h2>`. Every `h2` is read as a chapter and must carry a two-digit number, and the exemption list for older reports does not extend to new files. Use a `<div class="report-outline-label">`.
- Heading numbering must be in the heading text itself, not in a `<span>`. The checker reads text content with tags stripped, so a numbered span leaves the heading unnumbered.

### Blockquote

The theme gives `blockquote` a 3px accent border and no horizontal padding, so text touches the bar. If the report opens with a standfirst quote, add local padding:

```css
main blockquote { margin: 1.5rem 0 !important; padding: 14px 20px !important; line-height: 1.75 !important; }
```

Keep blockquotes to one or two short lead paragraphs. A blockquote is not a container for a chapter: wrapping a whole section in one puts the accent bar across body text.

## Checking a report before publishing

`scripts/check-report-style.mjs` runs in CI before the build and fails the deploy, so a report that violates it never reaches the site. Run it locally first:

```bash
node scripts/check-report-style.mjs   # style contract
npm run build                          # Astro build, then open dist/reports/...
```

The checker covers the theme link, the shared nav, exactly one `.report-banner`, keyword count and uniqueness, title separators, and chapter numbering for files not in the legacy exemption list. It does **not** cover the bilingual nav convention, `hrefEn`, the `.layout` grid, or blockquote padding, so verify those by opening the built page.

## Prose and evidence

- Use concise, neutral technical prose. State the configuration and workload, report measured values and conditions, then distinguish interpretation from observation.
- Identify whether a claim is measured, inferred from source/runtime behavior, or not yet verified. State limitations where they affect the conclusion.
- Replace colloquial process narration and promotional language with reproducible descriptions. Preserve commands, logs, identifiers, measurements, and evidence links verbatim when they are source material.
- Define abbreviations at first use when they are not standard for the intended technical audience. Use product names, hardware identifiers, versions, units, and capitalization consistently.

These conventions follow the concise descriptive title guidance and standard research-report structure recommended by the [IEEE Author Center](https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/create-the-text-of-your-article/structure-your-article/) and [IEEE Professional Communication Society](https://procomm.ieee.org/communication-resources-for-engineers/written-reports/write-effective-reports/). Test reports also retain scope, environment, methods, conclusions, results analysis, limitations, and recommendations as specified in the [CSRC software testing specification](https://www.csrc.gov.cn/csrc/c101950/c1048030/1048030/files/%E9%99%84%E4%BB%B6%EF%BC%9A%E3%80%8A%E8%AF%81%E5%88%B8%E6%9C%9F%E8%B4%A7%E4%B8%9A%E8%BD%AF%E4%BB%B6%E6%B5%8B%E8%AF%95%E8%A7%84%E8%8C%83%E3%80%8B.pdf).
