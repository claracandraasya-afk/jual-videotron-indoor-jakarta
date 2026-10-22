// File: qa-run.mjs — runner sederhana: node qa-run.mjs <script.mjs>
import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import { resolve } from 'path';

const file = resolve(process.argv[2]);
const mod = await import(pathToFileURL(file).href);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
try {
  await page.goto('http://localhost:8081/index.html', { waitUntil: 'networkidle' });
  const result = await mod.default(page);
  console.log(JSON.stringify(result, null, 2));
} catch (e) {
  console.error('ERROR:', e.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
