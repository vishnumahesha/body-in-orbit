import puppeteer from 'puppeteer';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000 });

const fs = await import('fs');
if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');

const existing = fs.readdirSync('./screenshots').filter(f => f.endsWith('.png'));
const num = existing.length + 1;
const filename = label ? `screenshot-${num}-${label}.png` : `screenshot-${num}.png`;

await page.screenshot({ path: `./screenshots/${filename}`, fullPage: false });
console.log(`Screenshot saved: screenshots/${filename}`);
await browser.close();
