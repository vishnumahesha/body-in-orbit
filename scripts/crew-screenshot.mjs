import puppeteer from 'puppeteer';
import os from 'os';
import path from 'path';

const outPath = path.join(os.homedir(), 'Desktop', 'crew-verify.png');

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

// Scroll to the crew selector section
await page.evaluate(() => {
  const heading = Array.from(document.querySelectorAll('h2')).find(
    (h) => h.textContent?.includes('Select Crew Member')
  );
  if (heading) heading.scrollIntoView({ behavior: 'instant', block: 'start' });
});

// Wait for WebGL scenes to paint
await new Promise(r => setTimeout(r, 5000));

await page.screenshot({ path: outPath, fullPage: false });
await browser.close();
console.log(outPath);
