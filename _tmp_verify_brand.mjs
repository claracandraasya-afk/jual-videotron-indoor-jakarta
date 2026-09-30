/* Verifikasi hasil generator: tautan, gambar, anchor, jumlah kartu, sisa teks
   Hikvision, dan kesamaan struktur dengan halaman Hikvision. */
import { readFileSync, existsSync } from "node:fs";
import { BRANDS } from "./_tmp_brand_data.mjs";

const refCatalog = readFileSync("produk-hikvision.html", "utf8");
const refDetail = readFileSync("hikvision-ultra-p0-9-ds-d4009bw-2fc.html", "utf8");
const out = [];
const fail = [];
const ok = (m) => out.push("OK   " + m);
const bad = (m) => { fail.push("FAIL " + m); };
const count = (s, needle) => s.split(needle).length - 1;

function checkPage(file, kind) {
  const html = readFileSync(file, "utf8");

  /* tautan internal .html — hanya tautan baru yang dicurigai rusak. Referensi
     halaman Hikvision dipakai sebagai pembanding karena sebagian tautan
     (mis. portofolio.html) memang belum ada di website ini. */
  const hrefs = [...new Set([...html.matchAll(/href="([^"#]+\.html)(#[^"]*)?"/g)].map((m) => m[1]))];
  const refLinks = new Set([
    ...[...refCatalog.matchAll(/href="([^"#]+\.html)(#[^"]*)?"/g)].map((m) => m[1]),
    ...[...refDetail.matchAll(/href="([^"#]+\.html)(#[^"]*)?"/g)].map((m) => m[1])
  ]);
  const missing = hrefs.filter((h) => !existsSync(h) && !refLinks.has(h));
  const knownMissing = hrefs.filter((h) => !existsSync(h) && refLinks.has(h));
  if (missing.length) bad(`${file}: tautan baru hilang -> ${missing.join(", ")}`);
  else ok(`${file}: ${hrefs.length} tautan internal (${knownMissing.length} tautan lama yang juga belum ada di halaman Hikvision: ${knownMissing.join(", ") || "-"})`);

  /* gambar */
  const imgs = [...new Set([...html.matchAll(/src="(images\/[^"]+)"/g)].map((m) => m[1]))];
  const missImg = imgs.filter((i) => !existsSync(i));
  if (missImg.length) bad(`${file}: gambar hilang -> ${missImg.join(", ")}`);
  else ok(`${file}: ${imgs.length} gambar semuanya ada`);

  /* anchor internal harus punya id tujuan */
  const anchors = [...new Set([...html.matchAll(/href="#([a-z0-9-]+)"/g)].map((m) => m[1]))];
  const missAnchor = anchors.filter((a) => !html.includes(`id="${a}"`));
  if (missAnchor.length) bad(`${file}: anchor tanpa id -> ${missAnchor.join(", ")}`);
  else ok(`${file}: ${anchors.length} anchor internal cocok dengan id section`);

  /* sisa kata Hikvision hanya boleh pada tautan menu / halaman Hikvision */
  const lines = html.split(/\r?\n/);
  const hik = lines
    .map((l, i) => [i + 1, l])
    .filter(([, l]) => /Hikvision/.test(l))
    .filter(([, l]) => !/href="produk-hikvision.html"/.test(l))
    .filter(([, l]) => !/Videotron Indoor Hikvision<\/a>/.test(l));
  if (hik.length) bad(`${file}: masih ada teks Hikvision -> ${JSON.stringify(hik.slice(0, 4))}`);
  else ok(`${file}: tidak ada sisa teks Hikvision`);

  if (kind === "catalog") {
    const cards = count(html, 'class="product-card"');
    if (cards !== 9) bad(`${file}: jumlah kartu produk = ${cards} (harus 9)`);
    else ok(`${file}: 9 kartu produk, ${count(html, 'class="product-grid"')} grid, ${count(html, 'class="series-nav"')} series-nav`);
  }

  /* Tidak boleh ada nilai yang gagal terisi. */
  if (/undefined|null/.test(html)) bad(`${file}: terdapat teks "undefined"/"null"`);
  else ok(`${file}: tidak ada nilai yang gagal terisi`);

  /* Menu dropdown harus tetap memuat ketiga halaman produk. */
  const dd = /<ul class="dropdown">([\s\S]*?)<\/ul>/.exec(html);
  const ddHrefs = dd ? [...dd[1].matchAll(/href="([^"]+)"/g)].map((m) => m[1]) : [];
  const wantDd = ["produk-hikvision.html", "produk-samsung.html", "produk-lg.html"];
  if (ddHrefs.join(",") !== wantDd.join(",")) bad(`${file}: menu dropdown -> ${ddHrefs.join(", ")}`);
  else ok(`${file}: menu dropdown memuat ketiga halaman produk`);

  /* EOL harus sama dengan halaman referensi (katalog CRLF, detail LF) */
  const wrongLf = kind === "catalog" ? (html.match(/(?<!\r)\n/g) || []).length : 0;
  const wrongCrlf = kind === "detail" ? (html.match(/\r\n/g) || []).length : 0;
  if (wrongLf > 0 || wrongCrlf > 0) bad(`${file}: line ending tidak sama dengan halaman referensi (LF=${wrongLf} CRLF=${wrongCrlf})`);
  else ok(`${file}: line ending sama dengan halaman referensi`);

  /* elemen wajib */
  const must = ['class="site-header"', 'class="site-footer"', 'data-reveal', 'class="breadcrumb', 'js/main.js', 'css/style.css'];
  const miss = must.filter((m) => !html.includes(m));
  if (miss.length) bad(`${file}: elemen hilang -> ${miss.join(", ")}`);
  else ok(`${file}: header, footer, breadcrumb, reveal, css & js terpasang`);

  return html;
}

function structureOf(html) {
  const sections = [...html.matchAll(/<section class="([^"]+)"/g)].map((m) => m[1]).join("|");
  /* Isi daftar spesifikasi diabaikan agar perbedaan jumlah baris spec antar
     model tidak dianggap sebagai perbedaan struktur halaman. */
  const withoutSpecs = html.replace(/<ul class="spec-list">[\s\S]*?<\/ul>/, '<ul class="spec-list"></ul>');
  const tags = [...withoutSpecs.matchAll(/<\/?(section|article|div|h2|h3|p|ul|li|a|img|span)\b/g)].length;
  return { sections, tagCount: tags };
}

/* --- dua halaman katalog baru dibandingkan halaman Hikvision --- */
const refStruct = structureOf(refCatalog);
out.push(`REF  katalog Hikvision: sections=${refStruct.sections}`);

for (const brand of Object.values(BRANDS)) {
  const file = `produk-${brand.key}.html`;
  const html = checkPage(file, "catalog");
  const st = structureOf(html);
  if (st.sections !== refStruct.sections) bad(`${file}: susunan section beda -> ${st.sections}`);
  else ok(`${file}: susunan section identik dengan halaman Hikvision`);
  if (!html.includes(`<h1>${brand.h1}</h1>`)) bad(`${file}: h1 brand tidak ditemukan`);
  for (const s of brand.series) {
    if (!html.includes(`id="${s.id}"`)) bad(`${file}: section seri ${s.id} tidak ada`);
    if (!html.includes(`<h2>${s.title}</h2>`)) bad(`${file}: judul seri ${s.title} tidak ada`);
    for (const m of s.models) {
      if (!html.includes(`href="${m.slug}"`)) bad(`${file}: tombol Lihat Detail ${m.code} salah`);
    }
  }
}

/* --- 18 halaman detail dibandingkan halaman detail Hikvision --- */
const refDetailStruct = structureOf(refDetail);
out.push(`REF  detail Hikvision: sections=${refDetailStruct.sections}`);
let detailChecked = 0;
for (const brand of Object.values(BRANDS)) {
  for (const series of brand.series) {
    for (const model of series.models) {
      const html = checkPage(model.slug, "detail");
      const st = structureOf(html);
      if (st.sections !== refDetailStruct.sections) bad(`${model.slug}: susunan section beda`);
      if (st.tagCount !== refDetailStruct.tagCount) bad(`${model.slug}: jumlah elemen ${st.tagCount} beda dari referensi ${refDetailStruct.tagCount}`);
      if (!html.includes(`<h1>${model.name}</h1>`)) bad(`${model.slug}: h1 salah`);
      if (!html.includes(`<strong>${model.code}</strong>`)) bad(`${model.slug}: kode model salah`);
      if (count(html, 'class="spec-row"') !== model.specs.length) bad(`${model.slug}: baris spesifikasi tidak sesuai`);
      if (!html.includes(`produk-${brand.key}.html#${series.id}`)) bad(`${model.slug}: breadcrumb seri salah`);
      if (!html.includes(`<span class="product-brand">${series.title}</span>`)) bad(`${model.slug}: label seri produk salah`);
      if (!html.includes(`<li><a href="produk-${brand.key}.html">${brand.h1}</a></li>`)) bad(`${model.slug}: breadcrumb brand salah`);
      detailChecked++;
    }
  }
}
ok(`Halaman detail diperiksa: ${detailChecked}`);

console.log(out.join("\n"));
if (fail.length) {
  console.log("\n--- MASALAH ---");
  console.log(fail.join("\n"));
  process.exitCode = 1;
} else {
  console.log("\nSemua pemeriksaan lulus.");
}

