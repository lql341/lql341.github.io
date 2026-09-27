import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const reportDir = new URL('../public/reports/', import.meta.url);
const themePath = new URL('../public/reports/report-theme.css', import.meta.url);
const globalPath = new URL('../src/styles/global.css', import.meta.url);
const files = (await readdir(reportDir)).filter((file) => file.endsWith('.html')).sort();
const theme = await readFile(themePath, 'utf8');
const global = await readFile(globalPath, 'utf8');
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
  console.log(`Report style checks passed for ${files.length} HTML reports; shared palette matches the homepage.`);
}
