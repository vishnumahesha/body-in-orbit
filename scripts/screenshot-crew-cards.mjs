import puppeteer from 'puppeteer';
import os from 'os';
import path from 'path';

const outPath = path.join(os.homedir(), 'Desktop', 'crew-cards-diagnostic.png');

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

// Click BEGIN to show crew cards
await page.evaluate(() => {
  const button = Array.from(document.querySelectorAll('button')).find(
    (b) => b.textContent?.includes('BEGIN')
  );
  if (button) button.click();
});

await new Promise(r => setTimeout(r, 2000));

// Scroll to crew selector
await page.evaluate(() => {
  const heading = Array.from(document.querySelectorAll('h2')).find(
    (h) => h.textContent?.includes('Four civilians')
  );
  if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'start' });
});

// Wait for WebGL to paint
await new Promise(r => setTimeout(r, 12000));

// Also dump DOM structure of first crew card
const cardStructure = await page.evaluate(() => {
  const cards = document.querySelectorAll('button[type="button"]');
  const firstCard = Array.from(cards).find((c) =>
    c.querySelector('[data-us-project]')
  );

  if (!firstCard) return { error: 'No crew card found' };

  // Get all children
  const dumpElement = (el, depth = 0) => {
    if (depth > 5) return '...';
    const children = Array.from(el.children).map(child => ({
      tag: child.tagName,
      class: child.className,
      id: child.id,
      dataAttrs: Array.from(child.attributes)
        .filter(a => a.name.startsWith('data-'))
        .map(a => `${a.name}="${a.value}"`),
      text: child.textContent?.trim().substring(0, 50),
      children: dumpElement(child, depth + 1)
    }));
    return children;
  };

  return {
    tag: firstCard.tagName,
    class: firstCard.className,
    structure: dumpElement(firstCard, 0)
  };
});

console.log('=== CREW CARD STRUCTURE ===');
console.log(JSON.stringify(cardStructure, null, 2));

await page.screenshot({ path: outPath, fullPage: false });
await browser.close();

console.log('\n=== Screenshot saved to:', outPath, '===');
