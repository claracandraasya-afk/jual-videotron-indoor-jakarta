/* Diagnosa perbedaan struktur halaman detail baru vs template Hikvision. */
import { readFileSync } from "node:fs";

const ref = readFileSync("hikvision-ultra-p0-9-ds-d4009bw-2fc.html", "utf8");
const gen = readFileSync("samsung-the-wall-p0-63-iw006b.html", "utf8");

const crlfRef = (ref.match(/\r\n/g) || []).length;
const lfRef = (ref.match(/(?<!\r)\n/g) || []).length;
console.log(`REF   detail Hikvision: CRLF=${crlfRef} loneLF=${lfRef}`);
console.log(`GEN   detail Samsung  : CRLF=${(gen.match(/\r\n/g) || []).length} loneLF=${(gen.match(/(?<!\r)\n/g) || []).length}`);

const catalogCrlf = (readFileSync("produk-samsung.html", "utf8").match(/\r\n/g) || []).length;
console.log(`GEN   katalog Samsung : CRLF=${catalogCrlf}`);

/* Bandingkan urutan tag untuk menemukan perbedaan struktur. */
const RE = /<\/?(?:section|article|div|h2|h3|p|ul|li|a|img|span)\b[^>]*>/g;
const tagsOf = (html) => (html.match(RE) || []);
const a = tagsOf(ref);
const b = tagsOf(gen);
console.log(`jumlah tag: ref=${a.length} gen=${b.length}`);

let i = 0;
while (i < Math.min(a.length, b.length) && a[i] === b[i]) i++;
console.log(`\nPerbedaan pertama pada indeks tag ${i}`);
for (let k = Math.max(0, i - 4); k < Math.min(Math.max(a.length, b.length), i + 8); k++) {
  const mark = k === i ? " <<<" : "";
  console.log(`  [${k}] REF ${a[k] ?? "-"}`);
  console.log(`       GEN ${b[k] ?? "-"}${mark}`);
}
