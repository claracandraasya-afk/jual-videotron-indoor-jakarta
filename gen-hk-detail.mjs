/* Generator halaman detail + gambar produk Hikvision (9 model). */
import { writeFileSync, mkdirSync } from "node:fs";

const PRODUCTS = [
  {
    slug: "hikvision-ultra-p0-9-ds-d4009bw-2fc",
    code: "DS-D4009BW-2FC",
    series: "Hikvision Ultra Series",
    seriesSlug: "ultra-series",
    name: "Hikvision Ultra P0.9",
    pitch: "P0.9",
    accent: "#0b1f4b",
    accent2: "#1157ee",
    spec: "0,9375 mm",
    tech: "Flip-chip COB",
    res: "640 Ã— 360 piksel",
    power: "Maks 360 W/mÂ² Â· Rata-rata 120 W/mÂ²",
    protect: "IP65 (sisi depan)",
    title: "Videotron Indoor Hikvision Ultra P0.9 â€” DS-D4009BW-2FC",
    desc: "Videotron indoor Hikvision Ultra P0.9 (DS-D4009BW-2FC) dengan pixel pitch 0,9375 mm, modul flip-chip COB, dan kontras 15.000:1 untuk jarak pandang dekat.",
    specs: [
      ["Pixel Pitch", "0,9375 mm (kategori P0.9)"],
      ["Teknologi LED", "Modul flip-chip COB 300 Ã— 168,75 mm, resolusi 320 Ã— 160 piksel"],
      ["Kabinet", "Die-cast aluminium 600 Ã— 337,5 Ã— 29,3 mm (rasio 16:9)"],
      ["Resolusi Kabinet", "640 Ã— 360 piksel"],
      ["Kecerahan", "600 nits"],
      ["Kontras", "15.000:1"],
      ["Refresh Rate", "Hingga 3.840 Hz (16-bit)"],
      ["Sudut Pandang", "160Â° / 160Â°"],
      ["Konsumsi Daya", "Maksimal 360 W/mÂ² Â· Rata-rata 120 W/mÂ²"],
      ["Perlindungan", "Depan IP65 Â· Perawatan dari sisi depan"],
      ["Berat Kabinet", "3,4 kg"]
    ]
  },
  {
    slug: "hikvision-ultra-p1-2-ds-d4012bw-2fc",
    code: "DS-D4012BW-2FC",
    series: "Hikvision Ultra Series",
    seriesSlug: "ultra-series",
    name: "Hikvision Ultra P1.2",
    pitch: "P1.2",
    accent: "#0b1f4b",
    accent2: "#1157ee",
    spec: "1,25 mm",
    tech: "Flip-chip COB",
    res: "480 Ã— 270 piksel",
    power: "Maks 300 W/mÂ² Â· Rata-rata 100 W/mÂ²",
    protect: "IP65 (sisi depan)",
    title: "Videotron Indoor Hikvision Ultra P1.2 â€” DS-D4012BW-2FC",
    desc: "Videotron indoor Hikvision Ultra P1.2 (DS-D4012BW-2FC) dengan pixel pitch 1,25 mm, modul flip-chip COB, dan kontras 15.000:1 untuk showroom dan ruang meeting.",
    specs: [
      ["Pixel Pitch", "1,25 mm (kategori P1.2)"],
      ["Teknologi LED", "Modul flip-chip COB 300 Ã— 168,75 mm, resolusi 240 Ã— 135 piksel"],
      ["Kabinet", "Die-cast aluminium 600 Ã— 337,5 Ã— 29,3 mm (rasio 16:9)"],
      ["Resolusi Kabinet", "480 Ã— 270 piksel"],
      ["Kecerahan", "600 nits"],
      ["Kontras", "15.000:1"],
      ["Refresh Rate", "Hingga 3.840 Hz (16-bit)"],
      ["Sudut Pandang", "160Â° / 160Â°"],
      ["Konsumsi Daya", "Maksimal 300 W/mÂ² Â· Rata-rata 100 W/mÂ²"],
      ["Perlindungan", "Depan IP65 Â· Perawatan dari sisi depan"],
      ["Berat Kabinet", "3,4 kg"]
    ]
  },
  {
    slug: "hikvision-ultra-p1-5-ds-d4015bw-2fc",
    code: "DS-D4015BW-2FC",
    series: "Hikvision Ultra Series",
    seriesSlug: "ultra-series",
    name: "Hikvision Ultra P1.5",
    pitch: "P1.5",
    accent: "#0b1f4b",
    accent2: "#1157ee",
    spec: "1,5625 mm",
    tech: "Flip-chip COB",
    res: "384 Ã— 216 piksel",
    power: "Maks 300 W/mÂ² Â· Rata-rata 100 W/mÂ²",
    protect: "IP65 (sisi depan)",
    title: "Videotron Indoor Hikvision Ultra P1.5 â€” DS-D4015BW-2FC",
    desc: "Videotron indoor Hikvision Ultra P1.5 (DS-D4015BW-2FC) dengan pixel pitch 1,5625 mm, modul flip-chip COB, dan konsumsi daya rata-rata 100 W/mÂ² untuk layar besar.",
    specs: [
      ["Pixel Pitch", "1,5625 mm (kategori P1.5)"],
      ["Teknologi LED", "Modul flip-chip COB 300 Ã— 168,75 mm, resolusi 192 Ã— 108 piksel"],
      ["Kabinet", "Die-cast aluminium 600 Ã— 337,5 Ã— 29,3 mm (rasio 16:9)"],
      ["Resolusi Kabinet", "384 Ã— 216 piksel"],
      ["Kecerahan", "600 nits"],
      ["Kontras", "15.000:1"],
      ["Refresh Rate", "Hingga 3.840 Hz (16-bit)"],
      ["Sudut Pandang", "160Â° / 160Â°"],
      ["Konsumsi Daya", "Maksimal 300 W/mÂ² Â· Rata-rata 100 W/mÂ²"],
      ["Perlindungan", "Depan IP65 Â· Perawatan dari sisi depan"],
      ["Berat Kabinet", "3,4 kg"]
    ]
  },
  {
    slug: "hikvision-solid-plus-p1-25-ds-d4012cw-2fq",
    code: "DS-D4012CW-2FQ",
    series: "Hikvision Solid Plus Series",
    seriesSlug: "solid-plus-series",
    name: "Videotron Indoor Hikvision P1.25",
    pitch: "P1.25",
    accent: "#1157ee",
    accent2: "#4d8bff",
    spec: "1,25 mm",
    tech: "SMD triad + GOB",
    res: "480 Ã— 270 piksel",
    power: "Maks 460 W/mÂ² Â· Rata-rata < 160 W/mÂ²",
    protect: "GOB (glue-on-board)",
    title: "Videotron Indoor Hikvision Solid Plus P1.25 â€” DS-D4012CW-2FQ",
    desc: "Videotron indoor Hikvision Solid Plus P1.25 (DS-D4012CW-2FQ) dengan pixel pitch 1,25 mm, enkapsulasi GOB tahan lembap, dan kecerahan 600 nits.",
    specs: [
      ["Pixel Pitch", "1,25 mm (kategori P1.2)"],
      ["Teknologi LED", "Modul SMD triad berlapis GOB 300 Ã— 168,75 mm, resolusi 240 Ã— 135 piksel"],
      ["Kabinet", "Die-cast aluminium 600 Ã— 337,5 Ã— 29,5 mm (rasio 16:9)"],
      ["Resolusi Kabinet", "480 Ã— 270 piksel"],
      ["Kecerahan", "600 nits"],
      ["Kontras", "5.000:1"],
      ["Refresh Rate", "Hingga 3.840 Hz (16-bit)"],
      ["Sudut Pandang", "160Â° / 160Â°"],
      ["Konsumsi Daya", "Maksimal 460 W/mÂ² Â· Rata-rata < 160 W/mÂ²"],
      ["Perlindungan", "Enkapsulasi GOB Â· Perawatan dari sisi depan"],
      ["Berat Kabinet", "3,4 kg"]
    ]
  },
  {
    slug: "hikvision-solid-plus-p1-56-ds-d4015cw-2fq",
    code: "DS-D4015CW-2FQ",
    series: "Hikvision Solid Plus Series",
    seriesSlug: "solid-plus-series",
    name: "Videotron Indoor Hikvision P1.56",
    pitch: "P1.56",
    accent: "#1157ee",
    accent2: "#4d8bff",
    spec: "1,5625 mm",
    tech: "SMD triad + GOB",
    res: "384 Ã— 216 piksel",
    power: "Maks 390 W/mÂ² Â· Rata-rata < 130 W/mÂ²",
    protect: "GOB (glue-on-board)",
    title: "Videotron Indoor Hikvision Solid Plus P1.56 â€” DS-D4015CW-2FQ",
    desc: "Videotron indoor Hikvision Solid Plus P1.56 (DS-D4015CW-2FQ) dengan pixel pitch 1,5625 mm, enkapsulasi GOB, dan refresh rate hingga 3.840 Hz.",
    specs: [
      ["Pixel Pitch", "1,5625 mm (kategori P1.5)"],
      ["Teknologi LED", "Modul SMD triad berlapis GOB 300 Ã— 168,75 mm, resolusi 192 Ã— 108 piksel"],
      ["Kabinet", "Die-cast aluminium 600 Ã— 337,5 Ã— 29,5 mm (rasio 16:9)"],
      ["Resolusi Kabinet", "384 Ã— 216 piksel"],
      ["Kecerahan", "600 nits"],
      ["Kontras", "5.000:1"],
      ["Refresh Rate", "Hingga 3.840 Hz (16-bit)"],
      ["Sudut Pandang", "160Â° / 160Â°"],
      ["Konsumsi Daya", "Maksimal 390 W/mÂ² Â· Rata-rata < 130 W/mÂ²"],
      ["Perlindungan", "Enkapsulasi GOB Â· Perawatan dari sisi depan"],
      ["Berat Kabinet", "3,4 kg"]
    ]
  },
  {
    slug: "hikvision-solid-plus-p1-875-ds-d4018cw-2fq",
    code: "DS-D4018CW-2FQ",
    series: "Hikvision Solid Plus Series",
    seriesSlug: "solid-plus-series",
    name: "Videotron Indoor Hikvision P1.875",
    pitch: "P1.875",
    accent: "#1157ee",
    accent2: "#4d8bff",
    spec: "1,875 mm",
    tech: "SMD triad + GOB",
    res: "320 Ã— 180 piksel",
    power: "Maks 400 W/mÂ² Â· Rata-rata < 140 W/mÂ²",
    protect: "GOB (glue-on-board)",
    title: "Videotron Indoor Hikvision Solid Plus P1.875 â€” DS-D4018CW-2FQ",
    desc: "Videotron indoor Hikvision Solid Plus P1.875 (DS-D4018CW-2FQ) dengan pixel pitch 1,875 mm, enkapsulasi GOB, untuk bentang layar luas seperti aula dan ballroom.",
    specs: [
      ["Pixel Pitch", "1,875 mm (kategori P1.8)"],
      ["Teknologi LED", "Modul SMD triad berlapis GOB 300 Ã— 168,75 mm, resolusi 160 Ã— 90 piksel"],
      ["Kabinet", "Die-cast aluminium 600 Ã— 337,5 Ã— 29,5 mm (rasio 16:9)"],
      ["Resolusi Kabinet", "320 Ã— 180 piksel"],
      ["Kecerahan", "600 nits"],
      ["Kontras", "5.000:1"],
      ["Refresh Rate", "Hingga 3.840 Hz (16-bit)"],
      ["Sudut Pandang", "160Â° / 160Â°"],
      ["Konsumsi Daya", "Maksimal 400 W/mÂ² Â· Rata-rata < 140 W/mÂ²"],
      ["Perlindungan", "Enkapsulasi GOB Â· Perawatan dari sisi depan"],
      ["Berat Kabinet", "3,4 kg"]
    ]
  },
  {
    slug: "hikvision-solid-p1-25-ds-d4012cw-2f",
    code: "DS-D4012CW-2F",
    series: "Hikvision Solid Series",
    seriesSlug: "solid-series",
    name: "Videotron Indoor Hikvision P1.25",
    pitch: "P1.25",
    accent: "#3b82f6",
    accent2: "#7db1ff",
    spec: "1,25 mm",
    tech: "SMD triad",
    res: "480 Ã— 270 piksel",
    power: "Maks 460 W/mÂ² Â· Rata-rata â‰¤ 160 W/mÂ²",
    protect: "Front maintenance",
    title: "Videotron Indoor Hikvision Solid P1.25 â€” DS-D4012CW-2F",
    desc: "Videotron indoor Hikvision Solid P1.25 (DS-D4012CW-2F) dengan pixel pitch 1,25 mm, modul SMD triad ekonomis, dan perawatan dari sisi depan.",
    specs: [
      ["Pixel Pitch", "1,25 mm (kategori P1.2)"],
      ["Teknologi LED", "Modul SMD triad 300 Ã— 168,75 mm, resolusi 240 Ã— 135 piksel"],
      ["Kabinet", "Die-cast aluminium 600 Ã— 337,5 Ã— 29,5 mm (rasio 16:9)"],
      ["Resolusi Kabinet", "480 Ã— 270 piksel"],
      ["Kecerahan", "600 nits"],
      ["Kontras", "5.000:1"],
      ["Refresh Rate", "Hingga 3.840 Hz (16-bit)"],
      ["Sudut Pandang", "160Â° / 160Â°"],
      ["Konsumsi Daya", "Maksimal 460 W/mÂ² Â· Rata-rata â‰¤ 160 W/mÂ²"],
      ["Perlindungan", "Perawatan seluruh komponen dari sisi depan"],
      ["Berat Kabinet", "3,4 kg"]
    ]
  },
  {
    slug: "hikvision-solid-p1-56-ds-d4015cw-2f",
    code: "DS-D4015CW-2F",
    series: "Hikvision Solid Series",
    seriesSlug: "solid-series",
    name: "Videotron Indoor Hikvision P1.56",
    pitch: "P1.56",
    accent: "#3b82f6",
    accent2: "#7db1ff",
    spec: "1,5625 mm",
    tech: "SMD triad",
    res: "384 Ã— 216 piksel",
    power: "Maks 390 W/mÂ² Â· Rata-rata â‰¤ 130 W/mÂ²",
    protect: "Front maintenance",
    title: "Videotron Indoor Hikvision Solid P1.56 â€” DS-D4015CW-2F",
    desc: "Videotron indoor Hikvision Solid P1.56 (DS-D4015CW-2F) dengan pixel pitch 1,5625 mm, modul SMD triad ekonomis untuk ruang meeting dan kampus.",
    specs: [
      ["Pixel Pitch", "1,5625 mm (kategori P1.5)"],
      ["Teknologi LED", "Modul SMD triad 300 Ã— 168,75 mm, resolusi 192 Ã— 108 piksel"],
      ["Kabinet", "Die-cast aluminium 600 Ã— 337,5 Ã— 29,5 mm (rasio 16:9)"],
      ["Resolusi Kabinet", "384 Ã— 216 piksel"],
      ["Kecerahan", "600 nits"],
      ["Kontras", "5.000:1"],
      ["Refresh Rate", "Hingga 3.840 Hz (16-bit)"],
      ["Sudut Pandang", "160Â° / 160Â°"],
      ["Konsumsi Daya", "Maksimal 390 W/mÂ² Â· Rata-rata â‰¤ 130 W/mÂ²"],
      ["Perlindungan", "Perawatan seluruh komponen dari sisi depan"],
      ["Berat Kabinet", "3,4 kg"]
    ]
  },
  {
    slug: "hikvision-solid-p1-875-ds-d4018cw-2f",
    code: "DS-D4018CW-2F",
    series: "Hikvision Solid Series",
    seriesSlug: "solid-series",
    name: "Videotron Indoor Hikvision P1.875",
    pitch: "P1.875",
    accent: "#3b82f6",
    accent2: "#7db1ff",
    spec: "1,875 mm",
    tech: "SMD triad",
    res: "320 Ã— 180 piksel",
    power: "Maks 420 W/mÂ² Â· Rata-rata â‰¤ 140 W/mÂ²",
    protect: "Front maintenance",
    title: "Videotron Indoor Hikvision Solid P1.875 â€” DS-D4018CW-2F",
    desc: "Videotron indoor Hikvision Solid P1.875 (DS-D4018CW-2F) dengan pixel pitch 1,875 mm, varian SMD paling terjangkau untuk ballroom dan aula.",
    specs: [
      ["Pixel Pitch", "1,875 mm (kategori P1.8)"],
      ["Teknologi LED", "Modul SMD triad 300 Ã— 168,75 mm, resolusi 160 Ã— 90 piksel"],
      ["Kabinet", "Die-cast aluminium 600 Ã— 337,5 Ã— 29,5 mm (rasio 16:9)"],
      ["Resolusi Kabinet", "320 Ã— 180 piksel"],
      ["Kecerahan", "600 nits"],
      ["Kontras", "5.000:1"],
      ["Refresh Rate", "Hingga 3.840 Hz (16-bit)"],
      ["Sudut Pandang", "160Â° / 160Â°"],
      ["Konsumsi Daya", "Maksimal 420 W/mÂ² Â· Rata-rata â‰¤ 140 W/mÂ²"],
      ["Perlindungan", "Perawatan seluruh komponen dari sisi depan"],
      ["Berat Kabinet", "3,4 kg"]
    ]
  }
];

mkdirSync("images/hikvision", { recursive: true });

/* ---------- Gambar produk unik per model (SVG) ---------- */
function productImage(p) {
  const steps = 42; // jumlah "piksel" dekoratif per baris
  let pixels = "";
  const cellW = 640 / steps;
  for (let r = 0; r < 24; r++) {
    for (let c = 0; c < steps; c++) {
      const x = 80 + c * cellW;
      const y = 118 + r * 15;
      const on = (r * 7 + c * 13 + p.slug.length) % 5 !== 0;
      const color = on
        ? r % 3 === 0 ? "#e8f0ff" : r % 3 === 1 ? "#bcd2ff" : "#9fc0ff"
        : "rgba(255,255,255,0.06)";
      pixels += `<rect x="${x.toFixed(1)}" y="${y}" width="${(cellW - 3).toFixed(1)}" height="10" rx="2" fill="${color}"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${p.series} ${p.name} ${p.code}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f5f8ff"/><stop offset="1" stop-color="#e6eeff"/>
    </linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.accent}"/><stop offset="1" stop-color="#060d1f"/>
    </linearGradient>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="${p.accent}" flood-opacity="0.22"/>
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <circle cx="700" cy="90" r="150" fill="${p.accent2}" opacity="0.10"/>
  <circle cx="70" cy="540" r="110" fill="${p.accent}" opacity="0.08"/>
  <g filter="url(#sh)">
    <rect x="72" y="110" width="656" height="372" rx="14" fill="#0c1526"/>
    <rect x="80" y="118" width="640" height="356" rx="8" fill="url(#screen)"/>
    ${pixels}
    <rect x="80" y="118" width="640" height="356" rx="8" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
  </g>
  <g font-family="Poppins, Manrope, Arial, sans-serif" text-anchor="middle">
    <rect x="220" y="190" width="360" height="170" rx="12" fill="rgba(6,13,31,0.55)"/>
    <text x="400" y="252" fill="#ffffff" font-size="50" font-weight="700">${p.pitch}</text>
    <text x="400" y="298" fill="rgba(255,255,255,0.88)" font-size="19" letter-spacing="4">${p.code}</text>
    <text x="400" y="336" fill="rgba(255,255,255,0.68)" font-size="15" letter-spacing="4">${p.tech.toUpperCase()}</text>
  </g>
  <rect x="330" y="482" width="140" height="26" rx="6" fill="#0c1526"/>
  <rect x="372" y="508" width="56" height="34" rx="4" fill="#0c1526"/>
  <rect x="300" y="542" width="200" height="10" rx="5" fill="#0c1526"/>
  <g font-family="Poppins, Manrope, Arial, sans-serif">
    <text x="400" y="580" text-anchor="middle" fill="#33415f" font-size="15" font-weight="600">${p.series}</text>
  </g>
</svg>`;
}

for (const p of PRODUCTS) {
  writeFileSync(`images/hikvision/${p.code}.svg`, productImage(p));
}

/* ---------- Halaman detail ---------- */
const HEADER = `<!DOCTYPE html>
<html lang="id" class="no-js">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>__TITLE__ | Jual Videotron Indoor Jakarta</title>
  <meta name="description" content="__DESC__">
  <meta name="theme-color" content="#1157ee">
  <meta name="robots" content="index, follow">
  <link rel="icon" href="images/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <a class="skip-link" href="#konten">Lewati ke konten utama</a>

  <header class="site-header">
    <div class="container">
      <div class="header-main">
        <a class="brand" href="index.html" aria-label="Jual Videotron Indoor Jakarta">
          <img class="brand-logo" src="images/logo-header.png" alt="Jual Videotron Indoor Jakarta" width="250" height="64" decoding="async">
        </a>

        <nav class="nav" id="nav-utama" aria-label="Navigasi utama">
          <ul class="nav-list">
            <li class="nav-item"><a class="nav-link" href="index.html#beranda">Beranda</a></li>
            <li class="nav-item has-dropdown">
              <a class="nav-link" href="index.html#produk" aria-haspopup="true" aria-expanded="false">
                Produk
                <svg class="caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>
              </a>
              <ul class="dropdown">
                <li><a href="produk-hikvision.html">Videotron Indoor Hikvision</a></li>
                <li><a href="produk-samsung.html">Videotron Indoor Samsung</a></li>
                <li><a href="produk-lg.html">Videotron Indoor LG</a></li>
              </ul>
            </li>
            <li class="nav-item"><a class="nav-link" href="index.html#solusi">Portofolio</a></li>
            <li class="nav-item"><a class="nav-link" href="artikel.html">Artikel</a></li>
            <li class="nav-item"><a class="nav-link" href="kontak-kami.html">Kontak Kami</a></li>
          </ul>
          <a class="btn btn-primary btn-sm" href="index.html#konsultasi">Konsultasikan Sekarang</a>
        </nav>

        <div class="header-actions">
          <button class="nav-toggle" type="button" aria-label="Buka menu" aria-controls="nav-utama" aria-expanded="false">
            <span class="nav-toggle-bars" aria-hidden="true"><i></i><i></i><i></i></span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <main id="konten">
    <section class="section product-detail-section">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ul class="breadcrumb breadcrumb-detail">
            <li><a href="index.html">Beranda</a></li>
            <li><a href="produk-hikvision.html">Videotron Indoor Hikvision</a></li>
            <li><a href="produk-hikvision.html#__SERIES_ANCHOR__">__SERIES__</a></li>
            <li><span aria-current="page">__CODE__</span></li>
          </ul>
        </nav>

        <div class="product-detail-grid">
          <div class="product-detail-media">
            <img src="images/hikvision/__CODE__.svg" alt="__ALT__" width="800" height="600" decoding="async">
          </div>

          <div class="product-detail-info">
            <span class="product-brand">__SERIES__</span>
            <h1>__NAME__</h1>
            <p class="product-detail-code">Model: <strong>__CODE__</strong></p>

            <h2 class="product-detail-spec-title">Spesifikasi Utama</h2>
            <ul class="spec-list">
__SPEC_ROWS__
            </ul>

            <div class="product-detail-cta">
              <a class="btn btn-primary btn-lg" href="index.html#konsultasi">
                Konsultasikan Sekarang
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand" data-reveal>
          <a class="brand" href="index.html" aria-label="Jual Videotron Indoor Jakarta">
            <img class="brand-logo" src="images/logo-footer.png" alt="Jual Videotron Indoor Jakarta" width="250" height="64" decoding="async">
          </a>
          <p class="footer-about">Penyedia videotron indoor untuk kebutuhan bisnis, institusi, dan ruang publik di Jakarta &amp; Jabodetabek &mdash; mulai dari konsultasi spesifikasi, instalasi, hingga layanan purna jual.</p>
        </div>

        <div class="footer-col" data-reveal data-delay="1">
          <h3>Informasi Perusahaan</h3>
          <ul class="footer-links">
            <li><a href="index.html">Beranda</a></li>
            <li><a href="index.html#produk">Produk</a></li>
            <li><a href="artikel.html">Artikel</a></li>
            <li><a href="kontak-kami.html">Kontak Kami</a></li>
          </ul>
        </div>

        <div class="footer-col" data-reveal data-delay="2">
          <h3>Kontak</h3>
          <ul class="footer-contact">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h3l2 5-2 1a12 12 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/></svg>
              <span>
                <strong>Telepon / WhatsApp</strong>
                <a href="tel:+6281210002020">+62 812-1000-2020</a>
              </span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
              <span>
                <strong>Alamat</strong>
                <span class="value">Jl. Mangga Dua Raya No. 88, Jakarta Utara 14430</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom" data-reveal data-delay="1">
        <p>&copy; <span data-year>2026</span> Jual Videotron Indoor Jakarta. Seluruh hak cipta dilindungi.</p>
        <div class="footer-bottom-links">
          <a href="index.html">Beranda</a>
          <a href="produk-hikvision.html">Produk Hikvision</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
`;

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

for (const p of PRODUCTS) {
  const rows = p.specs
    .map(
      ([k, v]) =>
        `              <li class="spec-row">\n                <span class="spec-name">${esc(k)}</span>\n                <span class="spec-value">${esc(v)}</span>\n              </li>`
    )
    .join("\n");
  let html = HEADER
    .replace(/__TITLE__/g, p.title)
    .replace(/__DESC__/g, esc(p.desc))
    .replace(/__SERIES_ANCHOR__/g, p.seriesSlug)
    .replace(/__SERIES__/g, p.series)
    .replace(/__CODE__/g, p.code)
    .replace(/__ALT__/g, esc(`${p.series} ${p.name} model ${p.code}`))
    .replace(/__NAME__/g, esc(p.name))
    .replace(/__SPEC_ROWS__/g, rows);
  writeFileSync(`${p.slug}.html`, html);
}

console.log("OK:", PRODUCTS.length, "halaman + gambar dibuat");
