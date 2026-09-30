/* QA sementara katalog 3 seri produk-hikvision.html (aman dihapus).
   Jalankan: node _tmp_qa_hk2.mjs */
import { chromium } from "playwright";
import { pathToFileURL } from "url";
import { resolve } from "path";
import fs from "fs";

const url = pathToFileURL(resolve("produk-hikvision.html")).href;
const browser = await chromium.launch();
const out = { errors: [] };

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => out.errors.push("pageerror: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") out.errors.push("console: " + m.text());
});
page.on("requestfailed", (r) => out.errors.push("requestfailed: " + r.url()));

await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(1200);

out.title = await page.title();
out.h1 = await page.textContent("h1");
out.sections = await page.$$eval("main > section", (els) => els.map((e) => e.id || e.className));
out.seriesHeads = await page.$$eval(
  "#ultra-series h2, #solid-plus-series h2, #solid-series h2",
  (els) => els.map((e) => e.textContent.trim())
);
out.cardCount = await page.$$eval(".product-grid .product-card", (els) => els.length);
out.cardsPerSeries = {};
for (const id of ["ultra-series", "solid-plus-series", "solid-series"]) {
  out.cardsPerSeries[id] = await page.$$eval("#" + id + " .product-card", (els) =>
    els.map(
      (e) =>
        e.querySelector(".product-brand").textContent.trim() +
        " >> " +
        e.querySelector("h3").textContent.trim() +
        " >> " +
        e.querySelector("strong").textContent.trim() +
        " >> pills=" +
        e.querySelectorAll(".spec-pill").length
    )
  );
}
out.seriesNavLinks = await page.$$eval(".series-nav a", (a) =>
  a.map((x) => x.getAttribute("href"))
);
out.gridCols1440 = await page.$eval("#ultra-series .product-grid", (el) =>
  getComputedStyle(el).gridTemplateColumns.split(" ").length
);
out.seriesNavCols1440 = await page.$eval(".series-nav", (el) =>
  getComputedStyle(el).gridTemplateColumns.split(" ").length
);
out.overflow1440 = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
out.imgBroken = await page.$$eval("img", (imgs) =>
  imgs.filter((i) => i.getAttribute("src") && i.naturalWidth === 0).map((i) => i.getAttribute("src"))
);

/* Uji setiap tombol "Lihat Detail" pada 9 kartu. */
out.modals = [];
const triggers = await page.$$(".product-card [data-product-detail]");
out.triggers = triggers.length;
for (const t of triggers) {
  const key = await t.getAttribute("data-product-detail");
  await t.scrollIntoViewIfNeeded();
  await t.click();
  await page.waitForTimeout(400);
  const data = await page.evaluate(() => ({
    hidden: document.getElementById("product-modal").hidden,
    brand: document.getElementById("product-modal-brand").textContent,
    title: document.getElementById("product-modal-title").textContent,
    specs: document.querySelectorAll("#product-modal-specs li").length,
    link: document.getElementById("product-modal-link").getAttribute("href"),
    linkText: document.getElementById("product-modal-link").textContent.trim(),
    img: document.getElementById("product-modal-img").getAttribute("src")
  }));
  out.modals.push(Object.assign({ key }, data));
  await page.click(".product-modal-close");
  await page.waitForTimeout(300);
}

/* Reveal setelah scroll penuh. */
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1600);
out.revealHidden = await page.$$eval("[data-reveal]", (els) =>
  els.filter((e) => getComputedStyle(e).opacity !== "1").length
);
out.revealTotal = await page.$$eval("[data-reveal]", (els) => els.length);

/* Responsif: jumlah kolom + overflow. */
async function probe(w) {
  const p = await browser.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(url, { waitUntil: "load" });
  await p.waitForTimeout(700);
  const r = {
    overflow: await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth),
    grid: await p.$eval("#solid-series .product-grid", (el) =>
      getComputedStyle(el).gridTemplateColumns.split(" ").length
    ),
    nav: await p.$eval(".series-nav", (el) =>
      getComputedStyle(el).gridTemplateColumns.split(" ").length
    )
  };
  await p.close();
  return r;
}
out.bp1280 = await probe(1280);
out.bp900 = await probe(900);
out.bp390 = await probe(390);

/* Halaman lain tetap normal (data lama hikvision/samsung/lg di main.js). */
const home = await browser.newPage({ viewport: { width: 1440, height: 900 } });
home.on("pageerror", (e) => out.errors.push("home pageerror: " + e.message));
await home.goto(pathToFileURL(resolve("index.html")).href, { waitUntil: "load" });
await home.waitForTimeout(900);
await home.click('[data-product-detail="hikvision"]');
await home.waitForTimeout(400);
out.homeModal = await home.evaluate(() => ({
  brand: document.getElementById("product-modal-brand").textContent,
  title: document.getElementById("product-modal-title").textContent,
  link: document.getElementById("product-modal-link").getAttribute("href"),
  linkText: document.getElementById("product-modal-link").textContent.trim(),
  specs: document.querySelectorAll("#product-modal-specs li").length
}));
await home.close();

await page.screenshot({ path: "_tmp_qa_hk2_top.png" });
fs.writeFileSync("_tmp_qa_hk2_out.json", JSON.stringify(out, null, 2), "utf8");
await browser.close();
console.log("QA2_DONE");
