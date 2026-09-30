/* Pemeriksa sementara: deteksi akhir baris (CRLF/LF) dan hitungan spec-row/spec-pill. Aman dihapus. */
const fs = require("fs");

const files = ["produk-hikvision.html", "css/style.css", "index.html", "artikel.html"];
const out = files.map(function (f) {
  const s = fs.readFileSync(f, "utf8");
  return {
    file: f,
    crlf: (s.match(/\r\n/g) || []).length,
    loneLf: (s.match(/(^|[^\r])\n/g) || []).length,
    specRow: (s.match(/class="spec-row"/g) || []).length,
    specPill: (s.match(/class="spec-pill"/g) || []).length,
    hasBom: s.charCodeAt(0) === 0xfeff,
  };
});

fs.writeFileSync("_tmp_eol.txt", JSON.stringify(out, null, 2), "utf8");
console.log(JSON.stringify(out, null, 2));
