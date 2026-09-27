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
const failures = [];

if (files.length === 0) failures.push('No report HTML files were found.');

for (const file of files) {
  const html = await readFile(join(reportDir.pathname, file), 'utf8');
  if (!html.includes('href="/reports/report-theme.css"')) {
    failures.push(`${file}: must load /reports/report-theme.css`);
  }
  if (!/class="[^"]*report-site-nav/.test(html)) {
    failures.push(`${file}: must use the shared report-site-nav shell`);
  }
  if (!/<title>\s*[^<]+\s*<\/title>/i.test(html)) {
    failures.push(`${file}: must define a document title`);
  }
  if (!/class="[^"]*report-banner/.test(html)) {
    failures.push(`${file}: must mark its title block with .report-banner`);
  }
  if (!/class="[^"]*report-banner[\s\S]{0,3000}<h1\b/i.test(html)) {
    failures.push(`${file}: the report title must be inside its shared banner`);
  }
}

for (const contract of ['--report-title-size', '--report-h2-size', '--report-h3-size', '--report-banner']) {
  if (!theme.includes(`${contract}:`)) failures.push(`Shared theme is missing ${contract}.`);
  if (!guide.includes(contract)) failures.push(`Style guide is missing ${contract}.`);
}
for (const selector of ['.report-banner h1', 'body > header.report-banner', 'body .content-inner > section']) {
  if (!theme.includes(selector)) failures.push(`Shared theme is missing the ${selector} layout rule.`);
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
