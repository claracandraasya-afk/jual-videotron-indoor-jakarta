/* Salin halaman menjadi halaman uji dengan probe QA tersisip.
   produk-hikvision.html -> _tmp_hk_qa_page.html (probe katalog)
   index.html            -> _tmp_hk_qa_index.html (probe modal halaman lain) */
const fs = require("fs");

const targets = [
  { src: "produk-hikvision.html", out: "_tmp_hk_qa_page.html", probe: "_tmp_hk_qa_probe.js" },
  { src: "index.html", out: "_tmp_hk_qa_index.html", probe: "_tmp_hk_qa_index.js" }
];

targets.forEach(function (t) {
  const html = fs.readFileSync(t.src, "utf8");
  const tag = '<script src="' + t.probe + '"></script>\n</body>';
  const out = html.indexOf("</body>") > -1 ? html.replace("</body>", tag) : html + tag;
  fs.writeFileSync(t.out, out, "utf8");
  console.log(t.out, out.length, "bytes");
});

