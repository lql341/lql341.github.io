(() => {
  const banner = document.querySelector('.report-banner');
  const main = document.querySelector('main, .container, .wrap, .content') || document.body;
  if (!banner || !main) return;

  document.querySelectorAll('nav, aside, .menu-btn').forEach((element) => {
    if (element.closest('.report-site-nav')) return;
    if (element.classList.contains('reader-nav-links')) return;
    element.classList.add('legacy-report-toc');
  });

  document.querySelectorAll('a[href="./"]').forEach((link) => {
    const label = link.textContent.trim();
    if (/返回|back/i.test(label) && !link.closest('main')) {
      link.parentElement?.classList.add('legacy-report-toc');
    }
  });

  document.querySelectorAll('.layout, .shell').forEach((layout) => {
    if (layout.querySelector(':scope > aside, :scope > .sidebar')) {
      layout.classList.add('report-no-sidebar');
    }
  });

  const headings = [...main.querySelectorAll('h2')];
  const paperPages = [...main.querySelectorAll('.paper-page')];
  const entries = headings.map((heading, index) => {
    if (!heading.id) heading.id = `report-section-${String(index + 1).padStart(2, '0')}`;
    return { id: heading.id, label: heading.textContent.trim(), kind: 'section' };
  });

  if (!entries.length && paperPages.length) {
    paperPages.forEach((page, index) => {
      page.id = `report-page-${String(index + 1).padStart(2, '0')}`;
      entries.push({ id: page.id, label: page.querySelector('figcaption')?.textContent.trim() || `Page ${index + 1}`, kind: 'page' });
    });
  }
  if (!entries.length) return;

  const isChinese = document.documentElement.lang.toLowerCase().startsWith('zh');
  const outline = document.createElement('details');
  outline.className = 'report-outline';
  const summary = document.createElement('summary');
  summary.innerHTML = `<span>${isChinese ? '报告导航' : 'REPORT NAVIGATION'}</span><strong>${isChinese ? '章节目录' : 'Contents'}</strong><small>${entries.length} ${isChinese ? '项' : 'sections'}</small><b aria-hidden="true">＋</b>`;
  const list = document.createElement('nav');
  list.setAttribute('aria-label', isChinese ? '报告章节' : 'Report sections');

  entries.forEach(({ id, label, kind }) => {
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = label;
    link.className = `report-outline-link report-outline-${kind}`;
    list.append(link);
  });

  outline.append(summary, list);
  banner.insertAdjacentElement('afterend', outline);

  if (headings.length && !main.querySelector('section, .section') && !paperPages.length) {
    let group = null;
    [...main.children].forEach((child) => {
      if (child.matches('.report-banner, .report-outline')) return;
      if (child.matches('h2')) {
        group = document.createElement('section');
        group.className = 'report-generated-section';
        child.before(group);
      }
      if (!group) {
        group = document.createElement('section');
        group.className = 'report-generated-section';
        child.before(group);
      }
      group.append(child);
    });
  }
})();
