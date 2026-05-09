import puppeteer from 'puppeteer';
import os from 'os';
import path from 'path';

const outPath = path.join(os.homedir(), 'Desktop', 'watermark-fix-verify.png');

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
await page.setViewport({ width: 1440, height: 1200 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 60000 });

// Wait for initial load
await new Promise(r => setTimeout(r, 2000));

// Click BEGIN button if present
await page.waitForSelector('button', { timeout: 10000 });
await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button'));
  const beginBtn = btns.find(b => b.textContent?.includes('BEGIN'));
  if (beginBtn) beginBtn.click();
});

console.log('Clicked BEGIN, waiting for crew cards...');
await new Promise(r => setTimeout(r, 3000));

// Scroll to crew section
await page.evaluate(() => {
  const headings = Array.from(document.querySelectorAll('h2'));
  const crewHeading = headings.find(h =>
    h.textContent?.includes('Four civilians') ||
    h.textContent?.includes('Crew')
  );
  if (crewHeading) {
    crewHeading.scrollIntoView({ behavior: 'instant', block: 'center' });
  }
});

console.log('Scrolled to crew section, waiting for WebGL...');
await new Promise(r => setTimeout(r, 12000));

await page.screenshot({ path: outPath, fullPage: false });
await browser.close();

console.log('Screenshot saved to:', outPath);
