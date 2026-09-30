/* Verifikasi sementara katalog produk-hikvision.html setelah badge dihapus. Aman dihapus.
   Jalankan: node _tmp_verify_hk.cjs */
const fs = require("fs");

const html = fs.readFileSync("produk-hikvision.html", "utf8");
const css = fs.readFileSync("css/style.css", "utf8");

const report = {};
report.crlf = (html.match(/\r\n/g) || []).length;
report.loneLf = (html.match(/(^|[^\r])\n/g) || []).length;
report.specRowInHtml = (html.match(/spec-row/g) || []).length;
report.specPillInHtml = (html.match(/spec-pill/g) || []).length;
report.specRowInCss = (css.match(/\.spec-row\b/g) || []).length;
report.specPillInCss = (css.match(/\.spec-pill\b/g) || []).length;
report.hashSpecRow = (html.match(/#spec-row/g) || []).length;

/* Pecah per kartu produk dan pastikan urutan elemennya tetap benar. */
const cardRe = /<article class="product-card"[\s\S]*?<\/article>/g;
const cards = html.match(cardRe) || [];
report.cardCount = cards.length;
report.cards = cards.map(function (c) {
  const body = (c.match(/<div class="product-body">[\s\S]*?<\/div>\s*<\/div>/) || [""])[0];
  const brand = (c.match(/class="product-brand">([^<]*)</) || [])[1] || "";
  const title = (c.match(/<h3>([^<]*)<\/h3>/) || [])[1] || "";
  const img = (c.match(/src="(images\/[^"]+)"/) || [])[1] || "";
  const model = (c.match(/<strong>([^<]*)<\/strong>/) || [])[1] || "";
  const desc = (c.match(/<p><strong>[\s\S]*?<\/p>/) || [""])[0];
  const detail = (c.match(/data-product-detail="([^"]+)"/) || [])[1] || "";
  const hasFoot = c.indexOf('class="product-foot"') !== -1;
  /* Urutan tag di dalam product-body harus: brand -> h3 -> p -> product-foot */
  const order = ["product-brand", "<h3>", "<p>", "product-foot"].map(function (t) {
    return c.indexOf(t);
  });
  const orderOk =
    order[0] > -1 &&
    order[1] > order[0] &&
    order[2] > order[1] &&
    order[3] > order[2] &&
    c.indexOf('class="spec-row"') === -1;
  return {
    title: title,
    brand: brand,
    img: img,
    model: model,
    hasDescription: desc.length > 0,
    detailBtn: detail,
    hasFoot: hasFoot,
    orderOk: orderOk,
    leftoverEmptyDivAfterP: /<\/p>\s*<div\s*>\s*<\/div>/.test(c),
  };
});
report.expectedTitles = [
  "Videotron Indoor Hikvision P0.9",
  "Videotron Indoor Hikvision P1.2",
  "Videotron Indoor Hikvision P1.5",
  "Videotron Indoor Hikvision P1.2 GOB",
  "Videotron Indoor Hikvision P1.5 GOB",
  "Videotron Indoor Hikvision P1.8 GOB",
  "Videotron Indoor Hikvision P1.2",
  "Videotron Indoor Hikvision P1.5",
  "Videotron Indoor Hikvision P1.8",
];

fs.writeFileSync("_tmp_verify_hk.json", JSON.stringify(report, null, 2), "utf8");
console.log(JSON.stringify(report, null, 2));
