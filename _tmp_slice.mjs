// Pemotong file sementara (aman dihapus)
import fs from 'fs';

function slice(src, from, to, out) {
  const lines = fs.readFileSync(src, 'utf8').split(/\r?\n/);
  const body = lines.slice(from - 1, to).map((l, i) => String(from + i) + ': ' + l).join('\n');
  fs.writeFileSync(out, body, 'utf8');
}

slice('produk-hikvision.html', 60, 235, '_tmp_hk_cards.txt');
slice('js/main.js', 335, 470, '_tmp_hk_data.txt');

const files = fs.readdirSync('images');
fs.writeFileSync('_tmp_images.txt', files.join('\n') + '\n\ntotal=' + files.length, 'utf8');

fs.writeFileSync('_tmp_done.txt', 'SLICE_DONE', 'utf8');
