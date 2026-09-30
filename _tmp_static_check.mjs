// Pemeriksa statis sementara untuk produk-hikvision.html (aman dihapus)
import fs from 'fs';

const html = fs.readFileSync('produk-hikvision.html', 'utf8');
const css = fs.readFileSync('css/style.css', 'utf8');
const report = {};

// 1. Saldo tag
const voids = new Set(['img', 'meta', 'link', 'input', 'br', 'hr', 'source', 'path', 'circle', 'ellipse', 'rect', 'polyline', 'stop', 'use', 'i']);
const tagRe = /<(\/?)([a-zA-Z0-9]+)([^>]*)>/g;
const selfClosing = /\/\s*>$/;
const counts = {};
let m;
while ((m = tagRe.exec(html))) {
  const closing = m[1] === '/';
  const name = m[2].toLowerCase();
  if (voids.has(name) || (!closing && selfClosing.test(m[3]))) continue;
  counts[name] = (counts[name] || 0) + (closing ? -1 : 1);
}
report.tagBalanceOff = Object.entries(counts).filter(([, v]) => v !== 0).map(([k, v]) => k + ':' + v);

// 2. Link & gambar lokal
const localRefs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((x) => x[1]);
const checked = localRefs.filter((r) => !/^(https?:|mailto:|tel:|#|data:)/.test(r));
report.brokenRefs = checked
  .map((r) => r.split('#')[0])
  .filter((r) => r && !fs.existsSync(r))
  .filter((v, i, a) => a.indexOf(v) === i);
report.localRefs = [...new Set(checked)].length;

// 3. Kelas yang dipakai ada di CSS
const usedClasses = new Set();
[...html.matchAll(/class="([^"]+)"/g)].forEach((x) => x[1].split(/\s+/).forEach((c) => c && usedClasses.add(c)));
report.classesNotInCss = [...usedClasses].filter((c) => !css.includes('.' + c.replace(/([^\w-])/g, '\\$1')) && !css.includes('.' + c)).sort();

// 4. Sisa jejak section spesifikasi
report.leftoverSpecs = ['spesifikasi', 'spec-table', 'spec-pill', 'note-card', 'data-reveal-delay', 'informasi produk Hikvision'].filter((needle) => html.includes(needle));

// 5. Ringkasan struktur
report.structure = [...html.matchAll(/<section class="([^"]*)"(?: id="([^"]*)")?/g)].map((x) => (x[2] || '-') + ' [' + x[1] + ']');
report.productCardCount = (html.match(/class="product-card"/g) || []).length;
report.productNames = [...html.matchAll(/<h3>(Videotron Indoor Hikvision[^<]*)<\/h3>/g)].map((x) => x[1]);
report.detailButtons = (html.match(/data-product-detail="hikvision"/g) || []).length;
report.navDropdown = [...html.matchAll(/<ul class="dropdown">([\s\S]*?)<\/ul>/g)][0][1].match(/href="([^"]+)"/g);
report.gridCss = {
  base: /\.product-grid \{[^}]*grid-template-columns: repeat\(3/.test(css),
  tablet1024: /\.product-grid \{ grid-template-columns: repeat\(2/.test(css),
  mobile768: /\.product-grid \{ grid-template-columns: minmax\(0, 1fr\)/.test(css)
};
report.headerSameAsIndex = fs.readFileSync('index.html', 'utf8').includes(html.slice(html.indexOf('<header class="site-header">'), html.indexOf('</header>') + 9));
report.footerSameAsIndex = fs.readFileSync('index.html', 'utf8').includes(html.slice(html.indexOf('<footer class="site-footer">'), html.indexOf('</footer>') + 10));

fs.writeFileSync('_tmp_static_check.json', JSON.stringify(report, null, 2));
console.log('CHECK_DONE');
