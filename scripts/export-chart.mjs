/**
 * Export the Living Baseline signature figure at R+82 phase as a 1920×1080 PNG.
 * Requires: npm run dev running on localhost:3000
 * Usage:    node scripts/export-chart.mjs
 */

import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", "public", "figures");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "living-baseline.png");

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });

console.log("Navigating …");
await page.goto("http://localhost:3000", { waitUntil: "networkidle2", timeout: 60000 });
await page.waitForSelector("svg", { timeout: 30000 });
await new Promise((r) => setTimeout(r, 2500)); // wait for hydration + fonts

// Scroll through entire page so whileInView animations all fire
const pageHeight = await page.evaluate(() => document.body.scrollHeight);
const step = 450;
for (let y = 0; y <= pageHeight; y += step) {
  await page.evaluate((sy) => window.scrollTo({ top: sy, behavior: "instant" }), y);
  await new Promise((r) => setTimeout(r, 80));
}
await new Promise((r) => setTimeout(r, 800)); // let all springs settle

// Scroll radial section to top of viewport
await page.evaluate(() => {
  const el = document.querySelector("[data-export='radial-section']");
  if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
});
await new Promise((r) => setTimeout(r, 600));

// Click the R+82 phase button
await page.evaluate(() => {
  const buttons = Array.from(document.querySelectorAll("button"));
  const btn = buttons.find((b) => b.textContent?.trim().startsWith("R+82"));
  if (btn) btn.click();
});
await new Promise((r) => setTimeout(r, 1400)); // let spring animation settle

if (!existsSync(OUTPUT_DIR)) await mkdir(OUTPUT_DIR, { recursive: true });

// Capture exactly the 1920×1080 viewport — section is at the top after scrollIntoView
await page.screenshot({ path: OUTPUT_PATH });
console.log(`Exported → ${OUTPUT_PATH}`);

await browser.close();
