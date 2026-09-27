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

  const headings = [...main.querySelectorAll('h2, h3')];
  const paperPages = [...main.querySelectorAll('.paper-page')];
  let sectionNumber = 0;
  let subsectionNumber = 0;
  const cleanHeadingLabel = (heading) => {
    const copy = heading.cloneNode(true);
    copy.querySelectorAll('.badge, .status, [aria-hidden="true"]').forEach((element) => element.remove());
    return copy.textContent.trim()
    .replace(/^[\p{Extended_Pictographic}\uFE0F\u200D\s]+/u, '')
    .replace(/^\s*(?:(?:\d{1,2}\.\d+|\d{1,2})[、.)\s]+|[一二三四五六七八九十]+[、.])\s*/, '')
    .replace(/^\s*第\s*\d+\s*[章节层]\s*[：:、.]?\s*/, '')
    .trim();
  };
  const standardizeHeadingNumber = (heading, number) => {
    const adjacentIndex = heading.previousElementSibling?.matches('.idx')
      ? heading.previousElementSibling
      : heading.parentElement?.querySelector(':scope > .idx');
    if (adjacentIndex && !heading.contains(adjacentIndex)) {
      adjacentIndex.textContent = number;
      return;
    }
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    let firstText = walker.nextNode();
    while (firstText && !firstText.data.trim()) firstText = walker.nextNode();
    if (firstText) {
      firstText.data = firstText.data
        .replace(/^[\p{Extended_Pictographic}\uFE0F\u200D\s]+/u, '')
        .replace(/^\s*(?:(?:\d{1,2}\.\d+|\d{1,2})[、.)\s]+|[一二三四五六七八九十]+[、.])\s*/, '')
        .replace(/^\s*第\s*\d+\s*[章节层]\s*[：:、.]?\s*/, '');
    }
    const marker = document.createElement('span');
    marker.className = 'report-heading-number';
    marker.setAttribute('aria-hidden', 'true');
    marker.textContent = number;
    heading.insertBefore(marker, heading.firstChild);
  };
  const entries = headings.map((heading, index) => {
    if (!heading.id) heading.id = `report-section-${String(index + 1).padStart(2, '0')}`;
    if (heading.tagName === 'H2') {
      sectionNumber += 1;
      subsectionNumber = 0;
      const number = String(sectionNumber).padStart(2, '0');
      const label = cleanHeadingLabel(heading);
      standardizeHeadingNumber(heading, number);
      return { id: heading.id, label, number, kind: 'h2' };
    }
    if (!sectionNumber) sectionNumber = 1;
    subsectionNumber += 1;
    const number = `${String(sectionNumber).padStart(2, '0')}.${subsectionNumber}`;
    const label = cleanHeadingLabel(heading);
    standardizeHeadingNumber(heading, number);
    return { id: heading.id, label, number, kind: 'h3' };
  });

  if (!entries.length && paperPages.length) {
    paperPages.forEach((page, index) => {
      page.id = `report-page-${String(index + 1).padStart(2, '0')}`;
      entries.push({ id: page.id, label: page.querySelector('figcaption')?.textContent.trim() || '', number: `P${String(index + 1).padStart(2, '0')}`, kind: 'page' });
    });
  }
  if (!entries.length) return;

  const isChinese = document.documentElement.lang.toLowerCase().startsWith('zh');
  const wideIndex = window.matchMedia('(min-width: 1200px)').matches;
  document.body.classList.toggle('report-has-left-index', wideIndex);
  const outline = document.createElement('details');
  outline.className = 'report-outline';
  outline.open = wideIndex;
  const summary = document.createElement('summary');
  summary.innerHTML = `<span>${isChinese ? '报告导航' : 'REPORT NAVIGATION'}</span><strong>${isChinese ? '章节索引' : 'Section index'}</strong><small>${entries.length} ${isChinese ? '项' : 'entries'}</small><b aria-hidden="true">＋</b>`;
  const list = document.createElement('nav');
  list.setAttribute('aria-label', isChinese ? '报告章节索引' : 'Report section index');

  entries.forEach(({ id, label, number, kind }) => {
    const link = document.createElement('a');
    link.href = `#${id}`;
    const numberLabel = document.createElement('span');
    numberLabel.className = 'report-outline-number';
    numberLabel.textContent = number;
    const titleLabel = document.createElement('span');
    titleLabel.className = 'report-outline-label';
    titleLabel.textContent = label || (isChinese ? '未命名章节' : 'Untitled section');
    link.append(numberLabel, titleLabel);
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
