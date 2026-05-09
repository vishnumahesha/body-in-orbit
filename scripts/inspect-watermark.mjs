import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--enable-webgl',
    '--use-gl=swiftshader',
    '--enable-accelerated-2d-canvas',
    '--disable-gpu-vsync'
  ]
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });

// Click BEGIN MISSION BRIEFING to trigger crew selector
await page.evaluate(() => {
  const button = Array.from(document.querySelectorAll('button')).find(
    (b) => b.textContent?.includes('BEGIN')
  );
  if (button) button.click();
});

// Wait for crew selector to render
await new Promise(r => setTimeout(r, 2000));

// Scroll to crew selector
await page.evaluate(() => {
  const heading = Array.from(document.querySelectorAll('h2')).find(
    (h) => h.textContent?.includes('Four civilians')
  );
  if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'start' });
});

// Wait for WebGL scenes to paint
await new Promise(r => setTimeout(r, 10000));

// Find watermark elements
const watermarks = await page.evaluate(() => {
  const results = [];

  // 1. Search for text containing "unicorn" or "Made with"
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) {
    const text = node.textContent?.toLowerCase() || '';
    if (text.includes('unicorn') || text.includes('made with')) {
      textNodes.push(node);
    }
  }

  textNodes.forEach((textNode) => {
    let el = textNode.parentElement;
    if (!el) return;

    const styles = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    const parents = [];
    let p = el;
    while (p && p !== document.body) {
      parents.push({
        tag: p.tagName,
        class: p.className,
        id: p.id
      });
      p = p.parentElement;
    }

    results.push({
      type: 'text',
      text: textNode.textContent?.trim(),
      tag: el.tagName,
      className: el.className,
      id: el.id,
      position: styles.position,
      top: styles.top,
      right: styles.right,
      bottom: styles.bottom,
      left: styles.left,
      transform: styles.transform,
      zIndex: styles.zIndex,
      rect: {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      },
      parents: parents.slice(0, 5)
    });
  });

  // 2. Search for links with href containing "unicorn"
  const links = document.querySelectorAll('a[href*="unicorn"]');
  links.forEach((el) => {
    const styles = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    const parents = [];
    let p = el.parentElement;
    while (p && p !== document.body) {
      parents.push({
        tag: p.tagName,
        class: p.className,
        id: p.id
      });
      p = p.parentElement;
    }

    results.push({
      type: 'link',
      text: el.textContent?.trim(),
      href: el.href,
      tag: el.tagName,
      className: el.className,
      id: el.id,
      position: styles.position,
      top: styles.top,
      right: styles.right,
      bottom: styles.bottom,
      left: styles.left,
      transform: styles.transform,
      zIndex: styles.zIndex,
      rect: {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      },
      parents: parents.slice(0, 5)
    });
  });

  // 3. Search for images/SVGs with unicorn in src/href
  const imgs = document.querySelectorAll('img[src*="unicorn"], svg[href*="unicorn"]');
  imgs.forEach((el) => {
    const styles = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    results.push({
      type: 'image',
      src: el.src || el.href?.baseVal || '',
      tag: el.tagName,
      className: el.className,
      id: el.id,
      position: styles.position,
      rect: {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      }
    });
  });

  return results;
});

console.log('=== WATERMARK ELEMENTS FOUND ===');
console.log(JSON.stringify(watermarks, null, 2));
console.log('=== Total:', watermarks.length, '===');

await browser.close();
