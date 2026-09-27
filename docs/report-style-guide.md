# Report presentation standard

Every HTML report in `public/reports/` uses the shared visual system from the homepage. The standard covers presentation only; report wording, measurements, conclusions, and source material remain the author's content.

## Page frame

- Load `/reports/report-theme.css` after any legacy inline stylesheet.
- When the shared stylesheet changes, bump the `?v=` value on every report link to prevent browsers reusing a stale cached theme.
- Include the shared `.report-site-nav` navigation shell.
- Mark exactly one report title block with `.report-banner`.
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
