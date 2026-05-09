import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'figures');

const url = process.env.EXPORT_URL || 'http://localhost:3000';

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 2500));

const el = await page.$('[data-testid="signature-slope-chart"]');
if (!el) {
  console.error('Could not find signature-slope-chart element');
  await browser.close();
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
await el.screenshot({ path: join(outDir, 'living-baseline.png') });
console.log('Saved public/figures/living-baseline.png');
await browser.close();
