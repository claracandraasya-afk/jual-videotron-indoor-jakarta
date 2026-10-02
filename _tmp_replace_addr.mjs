/* Ganti semua alamat lama menjadi alamat baru di seluruh .html (bukan _tmp*).
   Aman dihapus. Jalankan: node _tmp_replace_addr.mjs */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const OLD_SPAN = 'Jl. Mangga Dua Raya No. 88, Jakarta Utara 14430';
const NEW_SPAN = 'Jl. Penjernihan II No.7, RT.11/RW.6, Bend. Hilir, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10210';
const OLD_LD = 'Jl. Mangga Dua Raya No. 88';
const NEW_LD = 'Jl. Penjernihan II No.7, RT.11/RW.6, Bend. Hilir';
const OLD_LOCALITY = 'Jakarta Utara';
const NEW_LOCALITY = 'Kota Jakarta Pusat';
const OLD_ZIP = '14430';
const NEW_ZIP = '10210';

const files = readdirSync(root).filter(f => f.endsWith('.html') && !f.startsWith('_tmp') && !f.includes('bak'));
let total = 0;
for (const f of files) {
  const p = join(root, f);
  let src = readFileSync(p, 'utf8');
  let count = 0;
  const rep = (from, to) => {
    const parts = src.split(from);
    count += parts.length - 1;
    src = parts.join(to);
  };
  rep(OLD_SPAN, NEW_SPAN);
  // JSON-LD address di index.html: streetAddress locality postalCode
  rep(`"streetAddress": "${OLD_LD}",\n      "addressLocality": "${OLD_LOCALITY}",\n      "postalCode": "${OLD_ZIP}",`,
    `"streetAddress": "${NEW_LD}",\n      "addressLocality": "${NEW_LOCALITY}",\n      "postalCode": "${NEW_ZIP}",`);
  if (count) { writeFileSync(p, src); console.log(`${f}: ${count} replaced`); total += count; }
}
console.log('TOTAL:', total);
