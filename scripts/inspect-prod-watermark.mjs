import puppeteer from 'puppeteer';
import os from 'os';
import path from 'path';

const outPath = path.join(os.homedir(), 'Desktop', 'prod-crew-diagnostic.png');

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

// Go to production
await page.goto('https://body-in-orbit.vercel.app/', { waitUntil: 'networkidle2', timeout: 60000 });

// Wait a bit for initial render
await new Promise(r => setTimeout(r, 3000));

// Click BEGIN if present
try {
  await page.evaluate(() => {
    const button = Array.from(document.querySelectorAll('button')).find(
      (b) => b.textContent?.includes('BEGIN')
    );
    if (button) button.click();
  });
  console.log('Clicked BEGIN button');
} catch (e) {
  console.log('No BEGIN button found');
}

await new Promise(r => setTimeout(r, 3000));

// Scroll to crew selector
await page.evaluate(() => {
  const heading = Array.from(document.querySelectorAll('h2')).find(
    (h) => h.textContent?.includes('Four civilians') || h.textContent?.includes('Crew')
  );
  if (heading) {
    heading.scrollIntoView({ behavior: 'instant', block: 'center' });
    console.log('Scrolled to crew section');
  }
});

// Wait for WebGL
await new Promise(r => setTimeout(r, 15000));

// Find all elements that might be watermarks
const elements = await page.evaluate(() => {
  const all = [];

  // Get all links
  document.querySelectorAll('a').forEach(el => {
    const href = el.href || '';
    const text = el.textContent?.trim() || '';
    if (href.includes('unicorn') || text.toLowerCase().includes('unicorn') || text.toLowerCase().includes('made with')) {
      const rect = el.getBoundingClientRect();
      const styles = window.getComputedStyle(el);
      all.push({
        type: 'link',
        href,
        text,
        position: styles.position,
        top: styles.top,
        right: styles.right,
        bottom: styles.bottom,
        left: styles.left,
        zIndex: styles.zIndex,
        rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height }
      });
    }
  });

  // Get all divs/spans with position absolute or fixed
  document.querySelectorAll('div, span, a').forEach(el => {
    const styles = window.getComputedStyle(el);
    if (styles.position === 'absolute' || styles.position === 'fixed') {
      const rect = el.getBoundingClientRect();
      const text = el.textContent?.trim() || '';
      if (rect.width > 0 && rect.height > 0 && rect.width < 300 && rect.height < 100) {
        all.push({
          type: 'positioned',
          tag: el.tagName,
          class: el.className,
          text: text.substring(0, 100),
          position: styles.position,
          top: styles.top,
          right: styles.right,
          bottom: styles.bottom,
          left: styles.left,
          zIndex: styles.zIndex,
          rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height }
        });
      }
    }
  });

  return all;
});

console.log('=== ELEMENTS FOUND ===');
console.log(JSON.stringify(elements, null, 2));

await page.screenshot({ path: outPath, fullPage: false });
await browser.close();

console.log('Screenshot saved to:', outPath);
