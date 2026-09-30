/* Cari endpoint API / JSON dan referensi model pada HTML halaman Hikvision.
   Output: _tmp_grep_out.txt */
import fs from "node:fs";

const html = fs.readFileSync(process.argv[2] || "_tmp_hk_p1.html", "utf8");
const lines = [];

function collect(label, re) {
  const set = new Set();
  for (const m of html.matchAll(re)) set.add(m[0].slice(0, 220));
  lines.push("=== " + label + " (" + set.size + ") ===");
  [...set].slice(0, 60).forEach((s) => lines.push("  " + s));
  lines.push("");
}

collect("json-urls", /[^"'()\s]{0,120}\.json(?:\?[^"'()\s]{0,80})?/gi);
collect("api-paths", /["'][^"']{0,140}\/api\/[^"']{0,140}["']/gi);
collect("bin-paths", /["'][^"']{0,120}\/bin\/[^"']{0,140}["']/gi);
collect("model-refs", /[^"'()\s]{0,130}DS-D40[0-9A-Za-z-]{2,20}[^"'()\s]{0,60}/g);
collect("product-detail-links", /["'][^"']{0,140}product[^"']{0,140}["']/gi);

fs.writeFileSync("_tmp_grep_out.txt", lines.join("\n"), "utf8");
console.log("grep done, lines:", lines.length);
