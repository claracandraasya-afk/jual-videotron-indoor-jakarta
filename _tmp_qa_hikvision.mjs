// QA sementara untuk halaman produk-hikvision.html (aman dihapus)
import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import { resolve } from 'path';
import fs from 'fs';

const url = pathToFileURL(resolve('produk-hikvision.html')).href;
const browser = await chromium.launch();
const out = {};
const errors = [];

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
page.on('requestfailed', (r) => errors.push('requestfailed: ' + r.url()));

await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(1500);

out.title = await page.title();
out.h1 = await page.textContent('h1');
out.sectionOrder = await page.$$eval('main > section', (els) => els.map((e) => (e.id || e.className)));
out.headerNav = await page.$$eval('.site-header .nav-list a', (a) => a.map((x) => x.textContent.trim() + ' -> ' + x.getAttribute('href')));
out.dropdown = await page.$$eval('.dropdown a', (a) => a.map((x) => x.textContent.trim() + ' -> ' + x.getAttribute('href')));
out.heroCta = await page.$$eval('.page-hero .btn-group a', (a) => a.map((x) => x.textContent.trim() + ' -> ' + x.getAttribute('href')));
out.productCards = await page.$$eval('#produk .product-card', (els) => els.map((e) => e.querySelector('h3').textContent.trim()));
out.productCardKinds = await page.$$eval('#produk .product-card', (els) => els.map((e) => ({ brand: e.querySelector('.product-brand').textContent.trim(), img: e.querySelector('img').getAttribute('src'), pills: e.querySelectorAll('.spec-pill').length, detail: e.querySelector('.link-arrow').getAttribute('data-product-detail') })));
out.specRows = await page.$$eval('#spesifikasi .spec-table tbody tr', (trs) => trs.map((tr) => tr.querySelector('th').textContent.trim() + ': ' + tr.querySelector('td').textContent.trim()));
out.advantageItems = await page.$$eval('#keunggulan .advantage-item h3', (els) => els.map((e) => e.textContent.trim()));
out.ctaId = await page.$eval('.cta', (el) => el.id);
out.ctaButton = await page.$$eval('.cta .btn-group a', (a) => a.map((x) => x.textContent.trim() + ' -> ' + x.getAttribute('href')));
out.footerCols = await page.$$eval('.site-footer .footer-col h3', (els) => els.map((e) => e.textContent.trim()));
out.footerBottom = await page.$$eval('.footer-bottom-links a', (a) => a.map((x) => x.getAttribute('href')));
out.imgCount = await page.$$eval('img', (imgs) => imgs.length);
out.imgBroken = await page.$$eval('img', (imgs) => imgs.filter((i) => i.getAttribute('src') && i.naturalWidth === 0).map((i) => i.getAttribute('src')));
out.h1Font = await page.$eval('h1', (el) => getComputedStyle(el).fontFamily);
out.h1Color = await page.$eval('h1', (el) => getComputedStyle(el).color);
out.bodyFont = await page.$eval('body', (el) => getComputedStyle(el).fontFamily);
out.sectionsBg = await page.$$eval('main > section', (els) => els.map((e) => getComputedStyle(e).backgroundColor));
out.overflow1440 = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
out.productGridCols = await page.$eval('#produk .product-grid', (el) => getComputedStyle(el).gridTemplateColumns);

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1500);
out.revealStillHidden = await page.$$eval('[data-reveal]', (els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
out.revealTotal = await page.$$eval('[data-reveal]', (els) => els.length);

// Modal "Lihat Detail"
await page.evaluate(() => document.getElementById('produk').scrollIntoView());
await page.click('#produk .product-card .link-arrow');
await page.waitForTimeout(600);
out.modalOpen = await page.$eval('#product-modal', (el) => !el.hidden);
out.modalTitle = await page.textContent('#product-modal-title');
out.modalSpecCount = await page.$$eval('#product-modal-specs li', (lis) => lis.length);
out.modalLink = await page.getAttribute('#product-modal-link', 'href');
await page.screenshot({ path: '_tmp_qa_hikvision_desktop.png', fullPage: false });
await page.click('.product-modal-close');
await page.waitForTimeout(500);
out.modalClosed = await page.$eval('#product-modal', (el) => el.hidden);

// Mobile
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(url, { waitUntil: 'load' });
await mobile.waitForTimeout(800);
out.mobileOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
out.mobileProductCols = await mobile.$eval('#produk .product-grid', (el) => getComputedStyle(el).gridTemplateColumns);
out.mobileHeroCols = await mobile.$eval('.page-hero-grid', (el) => getComputedStyle(el).gridTemplateColumns);
out.mobileToggleDisplay = await mobile.$eval('.nav-toggle', (el) => getComputedStyle(el).display);
await mobile.screenshot({ path: '_tmp_qa_hikvision_mobile.png', fullPage: false });

out.errors = errors;
fs.writeFileSync('_tmp_qa_result.json', JSON.stringify(out, null, 2));
await browser.close();
console.log('QA_DONE');
