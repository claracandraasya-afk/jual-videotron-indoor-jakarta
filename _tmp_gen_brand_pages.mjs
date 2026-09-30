/* Generator gambar produk + halaman katalog + halaman detail untuk
   videotron indoor Samsung & LG, meniru persis pola halaman Hikvision.
   Jalankan: node _tmp_gen_brand_pages.mjs
   Aman dihapus setelah dipakai (bersama _tmp_brand_data.mjs). */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { BRANDS } from "./_tmp_brand_data.mjs";

const CRLF = "\r\n";
const catalogSrc = readFileSync("produk-hikvision.html", "utf8");
const detailSrc = readFileSync("hikvision-ultra-p0-9-ds-d4009bw-2fc.html", "utf8");
const CATALOG_EOL = catalogSrc.includes(CRLF) ? CRLF : "\n";
const DETAIL_EOL = detailSrc.includes(CRLF) ? CRLF : "\n";

/* Ambil isi antara dua penanda (tanpa menyertakan penandanya). */
function between(src, startMark, endMark) {
  const i = src.indexOf(startMark);
  const j = src.indexOf(endMark, i + startMark.length);
  if (i < 0 || j < 0) throw new Error("Penanda tidak ditemukan: " + startMark);
  return src.slice(i + startMark.length, j);
}

function replaceBetween(src, startMark, endMark, body) {
  const i = src.indexOf(startMark);
  const j = src.indexOf(endMark, i + startMark.length);
  if (i < 0 || j < 0) throw new Error("Penanda tidak ditemukan: " + startMark);
  return src.slice(0, i + startMark.length) + body + src.slice(j);
}

/* --------------------------------------------------------------------------
   1. Gambar produk (SVG) — pola visual sama dengan images/hikvision/*.svg
   -------------------------------------------------------------------------- */
function productSvg(brand, series, model) {
  const accent = brand.accent;
  const accent2 = brand.accent2;
  const aria = `${series.title} ${model.name} ${model.code}`;

  /* Baris "sambungan modul" pada bagian atas layar, seperti pada gambar
     Hikvision (setiap sambungan kelima diberi nada lebih gelap). */
  let seams = "";
  const seamCount = 42;
  const seamW = 12.2;
  const step = 15.24;
  for (let i = 0; i < seamCount; i++) {
    const x = (80 + i * step).toFixed(1);
    const fill = i % 5 === 0 ? "rgba(255,255,255,0.06)" : "#e8f0ff";
    seams += `<rect x="${x}" y="118" width="${seamW}" height="10" rx="2" fill="${fill}"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${aria}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f5f8ff"/><stop offset="1" stop-color="#e6eeff"/>
    </linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b1f4b"/><stop offset="1" stop-color="#060d1f"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${accent2}" stop-opacity="0.35"/><stop offset="1" stop-color="${accent2}" stop-opacity="0"/>
    </linearGradient>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#0b1f4b" flood-opacity="0.22"/>
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <circle cx="700" cy="90" r="150" fill="${accent}" opacity="0.14"/>
  <circle cx="70" cy="540" r="110" fill="#0b1f4b" opacity="0.08"/>
  <g filter="url(#sh)">
    <rect x="72" y="110" width="656" height="372" rx="14" fill="#0c1526"/>
    <rect x="80" y="118" width="640" height="356" rx="8" fill="url(#screen)"/>
    ${seams}
    <rect x="80" y="118" width="640" height="356" rx="8" fill="url(#glow)"/>
    <rect x="80" y="118" width="640" height="356" rx="8" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
  </g>
  <g font-family="Poppins, Manrope, Arial, sans-serif" text-anchor="middle">
    <rect x="200" y="186" width="400" height="176" rx="12" fill="rgba(6,13,31,0.55)"/>
    <text x="400" y="250" fill="#ffffff" font-size="50" font-weight="700">${model.pitch}</text>
    <text x="400" y="296" fill="rgba(255,255,255,0.88)" font-size="19" letter-spacing="4">${model.code}</text>
    <text x="400" y="334" fill="rgba(255,255,255,0.68)" font-size="15" letter-spacing="4">${model.tech}</text>
  </g>
  <rect x="330" y="482" width="140" height="26" rx="6" fill="#0c1526"/>
  <rect x="372" y="508" width="56" height="34" rx="4" fill="#0c1526"/>
  <rect x="300" y="542" width="200" height="10" rx="5" fill="#0c1526"/>
  <g font-family="Poppins, Manrope, Arial, sans-serif" text-anchor="middle">
    <text x="400" y="580" fill="#33415f" font-size="15" font-weight="600">${series.title}</text>
  </g>
</svg>
`;
}

for (const brand of Object.values(BRANDS)) {
  if (!existsSync(brand.imgDir)) mkdirSync(brand.imgDir, { recursive: true });
  for (const series of brand.series) {
    for (const model of series.models) {
      writeFileSync(`${brand.imgDir}/${model.code}.svg`, productSvg(brand, series, model));
    }
  }
}
console.log("Gambar produk selesai dibuat.");

/* --------------------------------------------------------------------------
   2. Halaman katalog per brand (produk-samsung.html / produk-lg.html)
   -------------------------------------------------------------------------- */
const SVG_BTN =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>';

function cardHtml(brand, series, model, index) {
  const E = CATALOG_EOL;
  const reveal = index === 0 ? " data-reveal" : ` data-reveal data-reveal-delay="${index}"`;
  return [
    `          <article class="product-card"${reveal}>`,
    `            <div class="product-media">`,
    `              <img src="${brand.imgDir}/${model.code}.svg" alt="Videotron indoor ${series.title} ${model.name} model ${model.code}" width="800" height="600" loading="lazy" decoding="async">`,
    `            </div>`,
    `            <div class="product-body">`,
    `              <span class="product-brand">${series.title}</span>`,
    `              <h3>${model.cardH3}</h3>`,
    `              <p><strong>${model.code}</strong> &ndash; ${model.blurb}</p>`,
    `              <div class="product-foot">`,
    `                <a class="btn btn-outline btn-sm btn-block" href="${model.slug}">`,
    `                  Lihat Detail`,
    `                  ${SVG_BTN}`,
    `                </a>`,
    `              </div>`,
    `            </div>`,
    `          </article>`
  ].join(E);
}

function seriesSectionHtml(brand, series, idx) {
  const E = CATALOG_EOL;
  const cls = series.soft ? "section section-soft section-line-top" : "section section-line-top";
  const cards = series.models.map((m, i) => cardHtml(brand, series, m, i)).join(E + E);
  return [
    `    <!-- ${idx + 3}. ${series.title.toUpperCase()} -->`,
    `    <section class="${cls}" id="${series.id}">`,
    `      <div class="container">`,
    `        <div class="section-head" data-reveal>`,
    `          <span class="eyebrow">${series.eyebrow}</span>`,
    `          <h2>${series.title}</h2>`,
    `          <p>${series.p}</p>`,
    `        </div>`,
    ``,
    `        <div class="product-grid">`,
    cards,
    `        </div>`,
    `      </div>`,
    `    </section>`,
    ``
  ].join(E);
}

function seriesNavHtml(brand) {
  const E = CATALOG_EOL;
  const items = brand.series
    .map((s) => [`          <a href="#${s.id}">`, `            <strong>${s.navLabel}</strong>`, `          </a>`].join(E))
    .join(E);
  return E + items + E + "        ";
}

function buildCatalog(brand) {
  const E = CATALOG_EOL;
  let html = catalogSrc;

  html = html.replace(
    "<title>Videotron Indoor Hikvision Jakarta | Jual Videotron Indoor Jakarta</title>",
    `<title>${brand.pageTitle}</title>`
  );
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${brand.metaDesc}">`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${brand.ogTitle}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${brand.ogDesc}">`
  );

  /* Hero: breadcrumb, judul, dan paragraf pengantar. */
  html = html.replace(
    '<li><span aria-current="page">Videotron Indoor Hikvision</span></li>',
    `<li><span aria-current="page">${brand.h1}</span></li>`
  );
  html = html.replace("<h1>Videotron Indoor Hikvision</h1>", `<h1>${brand.h1}</h1>`);
  html = replaceBetween(html, '<p class="hero-lead">', "</p>", E + "              " + brand.heroLead + E + "            ");

  /* Ringkasan katalog + navigasi seri. */
  html = html.replace("<h2>9 Model Videotron Indoor Hikvision</h2>", `<h2>${brand.catalogH2}</h2>`);
  html = replaceBetween(
    html,
    `<h2>${brand.catalogH2}</h2>`,
    "</p>",
    E + "          <p>" + brand.catalogP + E + "        "
  );
  html = replaceBetween(html, '<div class="series-nav" data-reveal>', "</div>", seriesNavHtml(brand));

  /* Tiga section seri beserta kartu produknya. */
  const sections = brand.series.map((s, i) => seriesSectionHtml(brand, s, i));
  html = replaceBetween(html, "    <!-- 3. ULTRA SERIES -->", "    <!-- 3. CTA KONSULTASI -->", E + sections.join(E) + E);

  /* CTA penutup. */
  html = html.replace(
    "<h2>Konsultasikan Kebutuhan Videotron Indoor Hikvision Anda</h2>",
    `<h2>${brand.ctaH2}</h2>`
  );
  html = replaceBetween(html, `<h2>${brand.ctaH2}</h2>`, "</p>", E + "          <p>" + brand.ctaP + E + "        ");

  /* Penanda halaman katalog: dipakai css/style.css untuk penyegaran tampilan
     (judul terpusat, card dan spacing yang lebih lega). */
  html = html.replace("<body>", '<body class="page-katalog">');

  return html;
}

for (const brand of Object.values(BRANDS)) {
  writeFileSync(`produk-${brand.key}.html`, buildCatalog(brand));
}
console.log("Halaman katalog Samsung & LG selesai dibuat.");

/* --------------------------------------------------------------------------
   3. Halaman detail per model (pola sama dengan halaman detail Hikvision)
   -------------------------------------------------------------------------- */
function specRowsHtml(model) {
  const E = DETAIL_EOL;
  return model.specs
    .map(([k, v]) =>
      [
        `              <li class="spec-row">`,
        `                <span class="spec-name">${k}</span>`,
        `                <span class="spec-value">${v}</span>`,
        `              </li>`
      ].join(E)
    )
    .join(E);
}

function buildDetail(brand, series, model) {
  const E = DETAIL_EOL;
  let html = detailSrc;

  html = html.replace(
    "<title>Videotron Indoor Hikvision Ultra P0.9 — DS-D4009BW-2FC | Jual Videotron Indoor Jakarta</title>",
    `<title>${model.title} | Jual Videotron Indoor Jakarta</title>`
  );
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${model.desc}">`
  );

  /* Breadcrumb (baris 12 spasi, dihitung sejak awal baris) — teks menu di
     header sengaja tidak disentuh agar tetap memuat tautan ketiga brand. */
  html = html.replace(
    '\n            <li><a href="produk-hikvision.html">Videotron Indoor Hikvision</a></li>',
    `\n            <li><a href="produk-${brand.key}.html">${brand.h1}</a></li>`
  );
  html = html.replace(
    '\n            <li><a href="produk-hikvision.html#ultra-series">Hikvision Ultra Series</a></li>',
    `\n            <li><a href="produk-${brand.key}.html#${series.id}">${series.title}</a></li>`
  );
  html = html.replace(
    '<li><span aria-current="page">DS-D4009BW-2FC</span></li>',
    `<li><span aria-current="page">${model.code}</span></li>`
  );

  /* Gambar + identitas produk. */
  html = html.replace(
    '<img src="images/hikvision/DS-D4009BW-2FC.svg" alt="Hikvision Ultra Series Hikvision Ultra P0.9 model DS-D4009BW-2FC" width="800" height="600" decoding="async">',
    `<img src="${brand.imgDir}/${model.code}.svg" alt="Videotron indoor ${series.title} ${model.name} model ${model.code}" width="800" height="600" decoding="async">`
  );
  html = html.replace(
    '<span class="product-brand">Hikvision Ultra Series</span>',
    `<span class="product-brand">${series.title}</span>`
  );
  html = html.replace("<h1>Hikvision Ultra P0.9</h1>", `<h1>${model.name}</h1>`);
  html = html.replace(
    '<p class="product-detail-code">Model: <strong>DS-D4009BW-2FC</strong></p>',
    `<p class="product-detail-code">Model: <strong>${model.code}</strong></p>`
  );

  /* Daftar spesifikasi. */
  html = replaceBetween(html, '<ul class="spec-list">', "</ul>", E + specRowsHtml(model) + E + "            ");

  /* Tautan di footer mengarah ke halaman brand yang sesuai. */
  html = html.replace(
    '<a href="produk-hikvision.html">Produk Hikvision</a>',
    `<a href="produk-${brand.key}.html">${brand.detailFooter}</a>`
  );

  return html;
}

let detailCount = 0;
for (const brand of Object.values(BRANDS)) {
  for (const series of brand.series) {
    for (const model of series.models) {
      writeFileSync(model.slug, buildDetail(brand, series, model));
      detailCount++;
    }
  }
}
console.log(`Halaman detail selesai dibuat: ${detailCount} halaman.`);


