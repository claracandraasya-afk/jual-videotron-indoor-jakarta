/* Bangun ulang katalog produk-hikvision.html (3 seri x 3 model) sekaligus
   menyisipkan data modal ke js/main.js dan gaya .series-nav ke css/style.css.
   Sumber data spec: datasheet resmi Hikvision per model (lihat _tmp_pdf/).
   Jalankan: node _tmp_write_hk.mjs   (aman dihapus setelah dipakai) */
import fs from "node:fs";

/* Bullet spesifikasi modal dibentuk dari data ringkas agar konsisten. */
function specsPack(m) {
  return [
    "Pixel pitch " + m.pitch + " (kategori " + m.cat + ") dengan modul " + m.mod,
    "Kabinet die-cast aluminium 600 \u00d7 337,5 \u00d7 " + m.thick + " mm, resolusi " + m.res + " piksel (rasio 16:9), berat 3,4 kg",
    "Kecerahan 600 nits, kontras " + m.contrast + ", sudut pandang 160\u00b0/160\u00b0, refresh rate hingga 3.840 Hz (16-bit)",
    "Konsumsi daya maksimal " + m.pmax + " dan rata-rata " + m.pavg,
    m.extra,
    "Sistem kontrol Hikvision: atur parameter layar lewat remote, tablet, atau platform"
  ];
}

function mdl(o) {
  return Object.assign(o, { specs: specsPack(o.m) });
}

const SERIES = [
  {
    id: "ultra-series",
    comment: "3. ULTRA SERIES",
    eyebrow: "Seri 1 dari 3 &middot; Ultra Series",
    title: "Hikvision Ultra Series",
    chips: "COB flip-chip &middot; P0.9 &ndash; P1.5 &middot; kontras 15.000:1",
    brand: "Hikvision Ultra Series",
    desc:
      "Seri dengan ketajaman tertinggi: modul flip-chip COB tanpa kabel permukaan, perlindungan depan IP65, kontras 15.000:1, dan kabinet ultra-tipis 29,3 mm. Konsumsi daya rata-rata hanya 100&ndash;120 W/m&sup2; pada kecerahan 600 nits sehingga panas kerja layar lebih rendah &mdash; pas untuk lobby, reception, dan studio dengan jarak pandang dekat.",
    models: [
      mdl({
        key: "hk-ultra-ds-d4009bw-2fc",
        code: "DS-D4009BW-2FC",
        h3: "Videotron Indoor Hikvision P0.9",
        alt: "Videotron indoor Hikvision Ultra Series P0.9 model DS-D4009BW-2FC",
        blurb:
          "pitch 0,9375 mm dengan modul flip-chip COB dan perlindungan depan IP65, pilihan paling detail untuk jarak pandang sekitar 1&ndash;2 meter.",
        pills: ["Pitch <b>0,9375 mm</b>", "Resolusi <b>640 &times; 360 px</b>", "Kontras <b>15.000:1</b>"],
        m: {
          pitch: "0,9375 mm",
          cat: "P0.9",
          mod: "flip-chip COB 300 \u00d7 168,75 mm resolusi 320 \u00d7 160 piksel",
          thick: "29,3",
          res: "640 \u00d7 360",
          contrast: "15.000:1",
          pmax: "360 W/m\u00b2",
          pavg: "120 W/m\u00b2",
          extra: "Perlindungan depan IP65 dengan perawatan seluruh komponen dari sisi depan (front maintenance)",
          desc:
            "Model pixel pitch paling rapat pada lini LED indoor Hikvision. Modul flip-chip COB tanpa kabel permukaan membuat layar lebih rapat dan tahan terhadap sentuhan, sementara kontras 15.000:1 serta perlindungan depan IP65 menjaga ketajaman gambar di ruangan dengan pencahayaan campuran. Cocok untuk lobby, reception, dan studio dengan jarak pandang sekitar 1-2 meter."
        }
      }),
      mdl({
        key: "hk-ultra-ds-d4012bw-2fc",
        code: "DS-D4012BW-2FC",
        h3: "Videotron Indoor Hikvision P1.2",
        alt: "Videotron indoor Hikvision Ultra Series P1.2 model DS-D4012BW-2FC",
        blurb:
          "pitch 1,25 mm dengan modul flip-chip COB, titik seimbang antara ketajaman dan efisiensi biaya untuk showroom serta ruang meeting dengan jarak pandang mulai 2 meter.",
        pills: ["Pitch <b>1,25 mm</b>", "Resolusi <b>480 &times; 270 px</b>", "Kontras <b>15.000:1</b>"],
        m: {
          pitch: "1,25 mm",
          cat: "P1.2",
          mod: "flip-chip COB 300 \u00d7 168,75 mm resolusi 240 \u00d7 135 piksel",
          thick: "29,3",
          res: "480 \u00d7 270",
          contrast: "15.000:1",
          pmax: "300 W/m\u00b2",
          pavg: "100 W/m\u00b2",
          extra: "Perlindungan depan IP65 dengan perawatan seluruh komponen dari sisi depan (front maintenance)",
          desc:
            "Varian COB dengan pitch 1,25 mm, pilihan populer untuk showroom dan ruang meeting karena menyatukan ketajaman gambar dan efisiensi daya. Modul flip-chip COB memudahkan perawatan, sedangkan refresh rate hingga 3.840 Hz menjaga tampilan tetap mulus saat direkam kamera atau tampil di video conference."
        }
      }),
      mdl({
        key: "hk-ultra-ds-d4015bw-2fc",
        code: "DS-D4015BW-2FC",
        h3: "Videotron Indoor Hikvision P1.5",
        alt: "Videotron indoor Hikvision Ultra Series P1.5 model DS-D4015BW-2FC",
        blurb:
          "pitch 1,5625 mm dengan konsumsi daya rata-rata 100 W/m&sup2;, andalan untuk auditorium, ruang rapat besar, dan lobby dengan jarak pandang mulai 3 meter.",
        pills: ["Pitch <b>1,5625 mm</b>", "Resolusi <b>384 &times; 216 px</b>", "Kontras <b>15.000:1</b>"],
        m: {
          pitch: "1,5625 mm",
          cat: "P1.5",
          mod: "flip-chip COB 300 \u00d7 168,75 mm resolusi 192 \u00d7 108 piksel",
          thick: "29,3",
          res: "384 \u00d7 216",
          contrast: "15.000:1",
          pmax: "300 W/m\u00b2",
          pavg: "100 W/m\u00b2",
          extra: "Perlindungan depan IP65 dengan perawatan seluruh komponen dari sisi depan (front maintenance)",
          desc:
            "Model COB dengan pitch 1,5625 mm untuk layar berukuran besar, seperti auditorium dan ruang rapat utama. Kabinet die-cast aluminium 29,3 mm membuat rangkaian modul tetap rata, sementara konsumsi daya rata-rata 100 W/m\u00b2 membantu menekan biaya operasional layar yang menyala panjang setiap hari."
        }
      })
    ]
  },
  {
    id: "solid-plus-series",
    comment: "4. SOLID PLUS SERIES",
    eyebrow: "Seri 2 dari 3 &middot; Solid Plus Series",
    title: "Hikvision Solid Plus Series",
    chips: "Enkapsulasi GOB &middot; P1.2 &ndash; P1.8 &middot; tahan lembap",
    brand: "Hikvision Solid Plus Series",
    desc:
      "Seri SMD dengan enkapsulasi GOB (glue-on-board) yang melapisi permukaan modul, sehingga lebih tahan kelembapan, debu, dan gesekan ringan &mdash; pilihan aman untuk ruang ber-AC dengan kelembapan berubah, restoran, dan area publik. Kecerahan 600 nits, kontras 5.000:1, refresh rate hingga 3.840 Hz, dan kabinet die-cast 29,5 mm.",
    models: [
      mdl({
        key: "hk-solid-plus-ds-d4012cw-2fq",
        code: "DS-D4012CW-2FQ",
        h3: "Videotron Indoor Hikvision P1.2 GOB",
        alt: "Videotron indoor Hikvision Solid Plus Series P1.2 GOB model DS-D4012CW-2FQ",
        blurb:
          "pitch 1,25 mm dengan enkapsulasi GOB yang melindungi modul dari kelembapan dan debu, cocok untuk restoran, lobby, dan area publik dengan jarak pandang mulai 2 meter.",
        pills: ["Pitch <b>1,25 mm</b>", "Resolusi <b>480 &times; 270 px</b>", "Enkapsulasi <b>GOB</b>"],
        m: {
          pitch: "1,25 mm",
          cat: "P1.2",
          mod: "SMD triad berlapis GOB 300 \u00d7 168,75 mm resolusi 240 \u00d7 135 piksel",
          thick: "29,5",
          res: "480 \u00d7 270",
          contrast: "5.000:1",
          pmax: "460 W/m\u00b2",
          pavg: "< 160 W/m\u00b2",
          extra: "Enkapsulasi GOB (glue-on-board) melindungi modul dari kelembapan dan debu, dengan perawatan seluruh komponen dari sisi depan",
          desc:
            "Varian GOB dari keluarga SMD Hikvision: permukaan modul dilapisi resin sehingga lebih tahan lembap, debu, dan gesekan ringan. Kecerahan 600 nits, kontras 5.000:1, dan refresh rate hingga 3.840 Hz menjaga tampilan tetap tajam di ruang dengan pencahayaan campuran. Cocok untuk lobby, restoran, dan showroom dengan jarak pandang mulai 2 meter."
        }
      }),
      mdl({
        key: "hk-solid-plus-ds-d4015cw-2fq",
        code: "DS-D4015CW-2FQ",
        h3: "Videotron Indoor Hikvision P1.5 GOB",
        alt: "Videotron indoor Hikvision Solid Plus Series P1.5 GOB model DS-D4015CW-2FQ",
        blurb:
          "pitch 1,5625 mm dengan perlindungan GOB, pas untuk ruang meeting dan ruang publik berjarak pandang mulai 3 meter yang perlu perawatan mudah.",
        pills: ["Pitch <b>1,5625 mm</b>", "Resolusi <b>384 &times; 216 px</b>", "Enkapsulasi <b>GOB</b>"],
        m: {
          pitch: "1,5625 mm",
          cat: "P1.5",
          mod: "SMD triad berlapis GOB 300 \u00d7 168,75 mm resolusi 192 \u00d7 108 piksel",
          thick: "29,5",
          res: "384 \u00d7 216",
          contrast: "5.000:1",
          pmax: "390 W/m\u00b2",
          pavg: "< 130 W/m\u00b2",
          extra: "Enkapsulasi GOB (glue-on-board) melindungi modul dari kelembapan dan debu, dengan perawatan seluruh komponen dari sisi depan",
          desc:
            "Model GOB dengan pitch 1,5625 mm untuk layar sedang hingga besar, misalnya ruang meeting, aula kampus, dan area publik indoor. Lapisan glue-on-board membuat modul lebih aman dibersihkan, sedangkan dynamic brightness engine menyesuaikan kecerahan per zona agar konsumsi daya lebih hemat."
        }
      }),
      mdl({
        key: "hk-solid-plus-ds-d4018cw-2fq",
        code: "DS-D4018CW-2FQ",
        h3: "Videotron Indoor Hikvision P1.8 GOB",
        alt: "Videotron indoor Hikvision Solid Plus Series P1.8 GOB model DS-D4018CW-2FQ",
        blurb:
          "pitch 1,875 mm dengan perlindungan GOB untuk layar berukuran luas seperti aula dan ballroom, jarak pandang nyaman mulai 4 meter.",
        pills: ["Pitch <b>1,875 mm</b>", "Resolusi <b>320 &times; 180 px</b>", "Enkapsulasi <b>GOB</b>"],
        m: {
          pitch: "1,875 mm",
          cat: "P1.8",
          mod: "SMD triad berlapis GOB 300 \u00d7 168,75 mm resolusi 160 \u00d7 90 piksel",
          thick: "29,5",
          res: "320 \u00d7 180",
          contrast: "5.000:1",
          pmax: "400 W/m\u00b2",
          pavg: "< 140 W/m\u00b2",
          extra: "Enkapsulasi GOB (glue-on-board) melindungi modul dari kelembapan dan debu, dengan perawatan seluruh komponen dari sisi depan",
          desc:
            "Pilihan GOB paling ekonomis untuk bentang layar lebar: pitch 1,875 mm tetap menampilkan teks dan video dengan jelas pada jarak pandang 4 meter ke atas. Konfigurasi 16:9 tanpa celah membuatnya pas untuk ballroom, aula, dan dinding pameran indoor."
        }
      })
    ]
  },
  {
    id: "solid-series",
    comment: "5. SOLID SERIES",
    eyebrow: "Seri 3 dari 3 &middot; Solid Series",
    title: "Hikvision Solid Series",
    chips: "SMD hemat biaya &middot; P1.2 &ndash; P1.8 &middot; perawatan depan",
    brand: "Hikvision Solid Series",
    desc:
      "Seri paling ekonomis dari keluarga LED indoor Hikvision. Modul SMD triad dengan kabinet die-cast 29,5 mm, perawatan penuh dari sisi depan, serta dynamic brightness engine yang menyesuaikan kecerahan tiap zona agar konsumsi daya lebih efisien. Pas untuk kantor, ruang meeting, kampus, dan showroom dengan jarak pandang 2&ndash;5 meter.",
    models: [
      mdl({
        key: "hk-solid-ds-d4012cw-2f",
        code: "DS-D4012CW-2F",
        h3: "Videotron Indoor Hikvision P1.2",
        alt: "Videotron indoor Hikvision Solid Series P1.2 model DS-D4012CW-2F",
        blurb:
          "pitch 1,25 mm varian SMD paling ekonomis, pilihan hemat untuk ruang meeting dan showroom dengan jarak pandang mulai 2 meter.",
        pills: ["Pitch <b>1,25 mm</b>", "Resolusi <b>480 &times; 270 px</b>", "Kontras <b>5.000:1</b>"],
        m: {
          pitch: "1,25 mm",
          cat: "P1.2",
          mod: "SMD triad 300 \u00d7 168,75 mm resolusi 240 \u00d7 135 piksel",
          thick: "29,5",
          res: "480 \u00d7 270",
          contrast: "5.000:1",
          pmax: "460 W/m\u00b2",
          pavg: "\u2264 160 W/m\u00b2",
          extra: "Perawatan seluruh komponen dari sisi depan (front maintenance) dengan modul SMD triad standar Hikvision",
          desc:
            "Titik masuk keluarga LED indoor Hikvision dengan ketajaman yang sudah sangat baik untuk kebutuhan dalam ruangan. Modul SMD triad dan receiving card Hikvision mudah diganti dari sisi depan, sedangkan dynamic brightness engine menurunkan konsumsi daya saat gambar tidak membutuhkan kecerahan penuh."
        }
      }),
      mdl({
        key: "hk-solid-ds-d4015cw-2f",
        code: "DS-D4015CW-2F",
        h3: "Videotron Indoor Hikvision P1.5",
        alt: "Videotron indoor Hikvision Solid Series P1.5 model DS-D4015CW-2F",
        blurb:
          "pitch 1,5625 mm varian SMD ekonomis untuk ruang meeting, kampus, dan hall dengan jarak pandang mulai 3 meter.",
        pills: ["Pitch <b>1,5625 mm</b>", "Resolusi <b>384 &times; 216 px</b>", "Kontras <b>5.000:1</b>"],
        m: {
          pitch: "1,5625 mm",
          cat: "P1.5",
          mod: "SMD triad 300 \u00d7 168,75 mm resolusi 192 \u00d7 108 piksel",
          thick: "29,5",
          res: "384 \u00d7 216",
          contrast: "5.000:1",
          pmax: "390 W/m\u00b2",
          pavg: "\u2264 130 W/m\u00b2",
          extra: "Perawatan seluruh komponen dari sisi depan (front maintenance) dengan modul SMD triad standar Hikvision",
          desc:
            "Varian pitch 1,5625 mm yang menyeimbangkan ketajaman dan kebutuhan jumlah modul per meter persegi, sehingga biaya pengadaan lebih terkendali. Cocok untuk kantor, kampus, dan hall dengan jarak pandang 3 meter ke atas."
        }
      }),
      mdl({
        key: "hk-solid-ds-d4018cw-2f",
        code: "DS-D4018CW-2F",
        h3: "Videotron Indoor Hikvision P1.8",
        alt: "Videotron indoor Hikvision Solid Series P1.8 model DS-D4018CW-2F",
        blurb:
          "pitch 1,875 mm varian SMD paling terjangkau untuk bentang layar luas seperti ballroom dan aula, jarak pandang mulai 4 meter.",
        pills: ["Pitch <b>1,875 mm</b>", "Resolusi <b>320 &times; 180 px</b>", "Kontras <b>5.000:1</b>"],
        m: {
          pitch: "1,875 mm",
          cat: "P1.8",
          mod: "SMD triad 300 \u00d7 168,75 mm resolusi 160 \u00d7 90 piksel",
          thick: "29,5",
          res: "320 \u00d7 180",
          contrast: "5.000:1",
          pmax: "420 W/m\u00b2",
          pavg: "\u2264 140 W/m\u00b2",
          extra: "Perawatan seluruh komponen dari sisi depan (front maintenance) dengan modul SMD triad standar Hikvision",
          desc:
            "Model paling ekonomis pada katalog videotron indoor Hikvision. Dengan pitch 1,875 mm, jumlah modul per meter persegi lebih sedikit sehingga biaya proyek lebih ringan, sementara kualitas gambar tetap rapi pada jarak pandang 4 meter ke atas."
        }
      })
    ]
  }
];

/* ------------------------- Pembangun HTML katalog ------------------------- */
const ARROW =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>';

function cardHtml(series, m, i) {
  const delay = i === 0 ? "" : ' data-reveal-delay="' + i + '"';
  const pills = m.pills
    .map(function (p) {
      return '                <span class="spec-pill">' + p + "</span>";
    })
    .join("\n");

  return [
    '          <article class="product-card" data-reveal' + delay + ">",
    '            <div class="product-media">',
    '              <img src="images/videotron-hikvision.png" alt="' + m.alt + '" width="800" height="600" loading="lazy" decoding="async">',
    "            </div>",
    '            <div class="product-body">',
    '              <span class="product-brand">' + series.brand + "</span>",
    "              <h3>" + m.h3 + "</h3>",
    "              <p><strong>" + m.code + "</strong> &ndash; " + m.blurb + "</p>",
    '              <div class="spec-row">',
    pills,
    "              </div>",
    '              <div class="product-foot">',
    '                <a class="btn btn-outline btn-sm btn-block" href="#' + series.id + '" data-product-detail="' + m.key + '">',
    "                  Lihat Detail",
    "                  " + ARROW,
    "                </a>",
    "              </div>",
    "            </div>",
    "          </article>"
  ].join("\n");
}

function seriesHtml(s, idx) {
  const tone = idx % 2 === 0 ? " section-soft" : "";
  const cards = s.models
    .map(function (m, i) {
      return cardHtml(s, m, i);
    })
    .join("\n\n");

  return [
    "    <!-- " + s.comment + " -->",
    '    <section class="section' + tone + ' section-line-top" id="' + s.id + '">',
    '      <div class="container">',
    '        <div class="section-head" data-reveal>',
    '          <span class="eyebrow">' + s.eyebrow + "</span>",
    "          <h2>" + s.title + "</h2>",
    "          <p>" + s.desc + "</p>",
    "        </div>",
    "",
    '        <div class="product-grid">',
    cards,
    "        </div>",
    "      </div>",
    "    </section>"
  ].join("\n");
}

const chips = SERIES.map(function (s) {
  return [
    '          <a href="#' + s.id + '">',
    "            <strong>" + s.title.replace("Hikvision ", "") + "</strong>",
    "            <span>" + s.chips + "</span>",
    "          </a>"
  ].join("\n");
}).join("\n");

const INTRO = [
  "    <!-- 2. RINGKASAN KATALOG + NAVIGASI SERI -->",
  '    <section class="section section-line-top" id="produk">',
  '      <div class="container">',
  '        <div class="section-head center" data-reveal>',
  '          <span class="eyebrow">Katalog Produk</span>',
  "          <h2>9 Model Videotron Indoor Hikvision</h2>",
  "          <p>",
  "            Lini videotron indoor Hikvision terbagi menjadi tiga seri &mdash; Ultra, Solid Plus, dan Solid. Seluruh",
  "            model memakai kabinet die-cast aluminium 600 &times; 337,5 mm dengan rasio 16:9, kecerahan 600 nits, dan",
  "            refresh rate hingga 3.840 Hz, sehingga mudah dikombinasikan mengikuti jarak pandang serta anggaran proyek.",
  "            Klik &ldquo;Lihat Detail&rdquo; pada setiap produk untuk melihat spesifikasi lengkapnya.",
  "          </p>",
  "        </div>",
  "",
  '        <div class="series-nav" data-reveal>',
  chips,
  "        </div>",
  "      </div>",
  "    </section>"
].join("\n");

const CATALOG = [INTRO]
  .concat(
    SERIES.map(function (s, i) {
      return seriesHtml(s, i);
    })
  )
  .join("\n\n");

const HERO_LEAD = [
  '            <p class="hero-lead">',
  "              Lini videotron indoor Hikvision dibagi ke dalam tiga seri &mdash; Ultra (COB), Solid Plus (GOB), dan",
  "              Solid (SMD) dengan pilihan pitch P0.9 hingga P1.8. Semua model memakai kabinet die-cast",
  "              600 &times; 337,5 mm, ideal untuk lobby, showroom, dan ruang meeting di Jakarta &amp; Jabodetabek.",
  "            </p>"
].join("\n");

/* ----------------------------- 1. Halaman HTML ----------------------------- */
const pageFile = "produk-hikvision.html";
let page = fs.readFileSync(pageFile, "utf8");

const startMark = "    <!-- 2. KATALOG PRODUK HIKVISION -->";
const endMark = "    <!-- 3. CTA KONSULTASI -->";
const startIdx = page.indexOf(startMark);
const endIdx = page.indexOf(endMark);
if (startIdx < 0 || endIdx < startIdx) throw new Error("penanda katalog tidak ditemukan di " + pageFile);

const pageEol = page.indexOf("\r\n") > -1 ? "\r\n" : "\n";
const withEol = function (text) {
  return pageEol === "\n" ? text : text.split("\n").join(pageEol);
};

page = page.slice(0, startIdx) + withEol(CATALOG) + pageEol + pageEol + page.slice(endIdx);

page = page.replace(
  /<meta name="description" content="[^"]*">/,
  '<meta name="description" content="Jual videotron indoor Hikvision di Jakarta: 9 model LED indoor dari tiga seri &mdash; Ultra (COB), Solid Plus (GOB), dan Solid (SMD) dengan pitch P0.9 sampai P1.8, kecerahan 600 nits, serta refresh rate 3.840 Hz, lengkap dengan konsultasi, instalasi, dan layanan purna jual.">'
);
page = page.replace(
  /<meta property="og:description" content="[^"]*">/,
  '<meta property="og:description" content="9 model videotron indoor Hikvision &mdash; Ultra (COB), Solid Plus (GOB), dan Solid (SMD) &mdash; untuk lobby, showroom, hingga area event di Jakarta &amp; Jabodetabek.">'
);
page = page.replace(/<p class="hero-lead">[\s\S]*?<\/p>/, withEol(HERO_LEAD));

fs.writeFileSync(pageFile, page, "utf8");

/* --------------------------- 2. Data modal (JS) --------------------------- */
const jsFile = "js/main.js";
let js = fs.readFileSync(jsFile, "utf8");
const jsGuard = "Katalog videotron indoor Hikvision per seri";
const jsEol = js.indexOf("\r\n") > -1 ? "\r\n" : "\n";

if (js.indexOf(jsGuard) === -1) {
  const entries = [];
  SERIES.forEach(function (s) {
    s.models.forEach(function (m) {
      entries.push(
        '    "' + m.key + '": {',
        '      brand: "' + s.brand + '",',
        '      title: "' + m.h3 + ' (' + m.code + ')",',
        "      desc:",
        '        "' + m.m.desc + '",',
        "      specs: [",
        m.specs
          .map(function (spec) {
            return '        "' + spec + '"';
          })
          .join(",\n"),
        "      ],",
        '      image: "images/videotron-hikvision.png",',
        '      link: "index.html#konsultasi",',
        '      linkText: "Konsultasikan Model Ini"',
        "    },"
      );
    });
  });

  const samsungAnchor = "    samsung: {";
  if (js.indexOf(samsungAnchor) === -1) throw new Error("entri samsung tidak ditemukan di " + jsFile);

  js = js.replace(
    samsungAnchor,
    "    /* --- " + jsGuard + " (9 model, dari datasheet resmi) --- */" + jsEol +
      entries.join(jsEol) +
      jsEol + jsEol +
      samsungAnchor
  );
}

const hrefAnchor = "      modalLink.href = data.link;" + jsEol;
if (js.indexOf(hrefAnchor) > -1 && js.indexOf("data.linkText") === -1) {
  js = js.replace(
    hrefAnchor,
    [
      "      modalLink.href = data.link;",
      "",
      "      /* Label tautan modal: pakai data.linkText bila ada (mis. ajakan konsultasi),",
      '         jika tidak tetap "Halaman Produk Lengkap" seperti sebelumnya. */',
      '      var modalLinkLabel = data.linkText || "Halaman Produk Lengkap";',
      "      while (modalLink.firstChild) modalLink.removeChild(modalLink.firstChild);",
      '      modalLink.appendChild(document.createTextNode(modalLinkLabel + " "));',
      '      var modalLinkArrow = document.createElement("span");',
      '      modalLinkArrow.setAttribute("aria-hidden", "true");',
      '      modalLinkArrow.textContent = "\\u2192";',
      "      modalLink.appendChild(modalLinkArrow);",
      ""
    ].join(jsEol)
  );
}

fs.writeFileSync(jsFile, js, "utf8");

/* ------------------------------ 3. Gaya CSS ------------------------------ */
const cssFile = "css/style.css";
let css = fs.readFileSync(cssFile, "utf8");
const cssEol = css.indexOf("\r\n") > -1 ? "\r\n" : "\n";
const cssGuard = "8b. Katalog per seri";

if (css.indexOf(cssGuard) === -1) {
  const footLine =
    ".product-foot { margin-top: auto; padding-top: 20px; border-top: 1px solid var(--line-soft); }";
  if (css.indexOf(footLine) === -1) throw new Error("baris .product-foot tidak ditemukan di " + cssFile);

  const seriesCss = [
    "/* --------------------------------------------------------------------------",
    "   8b. Katalog per seri (halaman produk Hikvision)",
    "   Navigasi ringkas antar seri pada halaman katalog. Memakai selector baru,",
    "   tidak mengubah gaya yang sudah ada, jadi halaman lain tidak terpengaruh.",
    "   -------------------------------------------------------------------------- */",
    ".series-nav {",
    "  display: grid;",
    "  grid-template-columns: repeat(3, minmax(0, 1fr));",
    "  gap: 18px;",
    "}",
    "",
    ".series-nav a {",
    "  display: flex;",
    "  flex-direction: column;",
    "  gap: 6px;",
    "  padding: 20px 22px;",
    "  border: 1px solid var(--line);",
    "  border-radius: var(--radius-lg);",
    "  background: #fff;",
    "  box-shadow: var(--shadow-xs);",
    "  transition: transform var(--dur) var(--ease), border-color var(--dur) var(--ease),",
    "    box-shadow var(--dur) var(--ease);",
    "}",
    ".series-nav a:hover {",
    "  transform: translateY(-4px);",
    "  border-color: var(--blue-200);",
    "  box-shadow: var(--shadow-md);",
    "}",
    ".series-nav strong {",
    "  color: var(--ink);",
    "  font-family: var(--font-head);",
    "  font-size: 1.02rem;",
    "}",
    ".series-nav span { color: var(--muted); font-size: 0.82rem; line-height: 1.5; }"
  ].join(cssEol);

  css = css.replace(footLine, footLine + cssEol + cssEol + seriesCss);

  const mqAnchor = "  .section { padding: 72px 0; }" + cssEol + "  .section-head { margin-bottom: 40px; }";
  if (css.indexOf(mqAnchor) === -1) throw new Error("blok @media 768px tidak ditemukan di " + cssFile);
  css = css.replace(
    mqAnchor,
    mqAnchor + cssEol + "  .series-nav { grid-template-columns: minmax(0, 1fr); }"
  );
}

fs.writeFileSync(cssFile, css, "utf8");

const modelCount = SERIES.reduce(function (n, s) {
  return n + s.models.length;
}, 0);
console.log("katalog diperbarui: " + SERIES.length + " seri, " + modelCount + " model");

