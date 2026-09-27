import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const reportDir = new URL('../public/reports/', import.meta.url);
const themePath = new URL('../public/reports/report-theme.css', import.meta.url);
const globalPath = new URL('../src/styles/global.css', import.meta.url);
const guidePath = new URL('../docs/report-style-guide.md', import.meta.url);
const files = (await readdir(reportDir)).filter((file) => file.endsWith('.html')).sort();
const theme = await readFile(themePath, 'utf8');
const global = await readFile(globalPath, 'utf8');
const guide = await readFile(guidePath, 'utf8');
const outlineScript = await readFile(new URL('../public/reports/report-theme.js', import.meta.url), 'utf8');
const failures = [];
const existingReports = new Set([
  'dsv4-dcu-report.html',
  'gradient-based-limiter-fr-cpr.html',
  'gromacs-z100-report.html',
  'hashcat-dtk-hip-report.html',
  'lammps-dcu-report.html',
  'latex-bilingual-toolchain-report.html',
  'mineru-cluster-build-report-archive.html',
  'mineru-cluster-build-report.html',
  'paddleocr-z100-transformers-report.html',
]);

if (files.length === 0) failures.push('No report HTML files were found.');

for (const file of files) {
  const html = await readFile(join(reportDir.pathname, file), 'utf8');
  if (!/href="\/reports\/report-theme\.css(?:\?[^\"]*)?"/.test(html)) {
    failures.push(`${file}: must load /reports/report-theme.css`);
  }
  if (!/src="\/reports\/report-theme\.js(?:\?[^\"]*)?"/.test(html)) {
    failures.push(`${file}: must load the shared outline/navigation script`);
  }
  if (!/class="[^"]*report-site-nav/.test(html)) {
    failures.push(`${file}: must use the shared report-site-nav shell`);
  }
  if (!/<title>\s*[^<]+\s*<\/title>/i.test(html)) {
    failures.push(`${file}: must define a document title`);
  }
  const banners = html.match(/class="[^"]*report-banner[^"]*"/g) ?? [];
  if (banners.length !== 1) {
    failures.push(`${file}: must mark exactly one title block with .report-banner (found ${banners.length})`);
  }
  if (!/class="[^"]*report-banner[\s\S]{0,3000}<h1\b/i.test(html)) {
    failures.push(`${file}: the report title must be inside its shared banner`);
  }
  if (!existingReports.has(file)) {
    const title = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ?? '';
    const headingText = (tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi'))]
      .map((match) => match[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim());
    const titlePattern = /^zh/i.test(html.match(/<html\b[^>]*lang="([^"]+)/i)?.[1] ?? '') ? /｜/ : / — /;
    if (!titlePattern.test(title)) failures.push(`${file}: new report title must follow the language-specific title pattern in docs/report-style-guide.md`);
    for (const heading of headingText('h2')) {
      if (!/^\d{2}\s/.test(heading)) failures.push(`${file}: top-level chapter must start with a two-digit number: ${heading}`);
    }
    for (const heading of headingText('h3')) {
      if (!/^\d{2}\.\d+\s/.test(heading)) failures.push(`${file}: subsection must use decimal numbering: ${heading}`);
    }
  }
}

for (const contract of ['--report-title-size', '--report-h2-size', '--report-h3-size', '--report-banner']) {
  if (!theme.includes(`${contract}:`)) failures.push(`Shared theme is missing ${contract}.`);
  if (!guide.includes(contract)) failures.push(`Style guide is missing ${contract}.`);
}
for (const namingRule of ['项目/软件｜平台/版本', '01 摘要', '02 环境与范围', 'decimal numbering']) {
  if (!guide.includes(namingRule)) failures.push(`Style guide is missing the title/chapter naming rule: ${namingRule}.`);
}
for (const selector of ['.report-banner.report-banner', '.report-banner.report-banner h1', 'body > header.report-banner.report-banner', 'body .content-inner > section']) {
  if (!theme.includes(selector)) failures.push(`Shared theme is missing the ${selector} layout rule.`);
}
for (const outlineContract of ['report-outline', 'legacy-report-toc', 'report-no-sidebar']) {
  if (!outlineScript.includes(outlineContract) && !theme.includes(outlineContract)) {
    failures.push(`Shared report outline is missing ${outlineContract}.`);
  }
}
for (const required of ['1040 px', '15 px', '34–52 px', '22–28 px']) {
  if (!guide.includes(required)) failures.push(`Style guide is missing the ${required} standard.`);
}

const tokens = [
  ['--bg', '--report-bg'],
  ['--surface', '--report-surface'],
  ['--surface-strong', '--report-surface-2'],
  ['--line', '--report-line'],
  ['--text', '--report-text'],
  ['--muted', '--report-muted'],
  ['--accent', '--report-accent'],
];
const valueFor = (css, token) => {
  const match = css.match(new RegExp(`${token}:\\s*([^;]+);`));
  return match?.[1].trim().replace(/\s+/g, '');
};

for (const [siteToken, reportToken] of tokens) {
  const siteValue = valueFor(global, siteToken);
  const reportValue = valueFor(theme, reportToken);
  if (!siteValue || !reportValue || siteValue !== reportValue) {
    failures.push(`Palette drift: ${siteToken} (${siteValue ?? 'missing'}) != ${reportToken} (${reportValue ?? 'missing'})`);
  }
}

if (failures.length) {
  console.error('Report style checks failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Report style checks passed for ${files.length} HTML reports; banner, type scale, navigation, and palette match the shared standard.`);
}
