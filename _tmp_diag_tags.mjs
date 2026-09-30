/* Bandingkan jumlah tiap jenis tag antara template Hikvision dan hasil generator. */
import { readFileSync } from "node:fs";

const ref = readFileSync("hikvision-ultra-p0-9-ds-d4009bw-2fc.html", "utf8");
const gen = readFileSync("samsung-the-wall-p0-63-iw006b.html", "utf8");

const COUNT = /<\/?([a-z0-9]+)\b[^>]*>/gi;
function tally(html) {
  const t = {};
  for (const m of html.match(COUNT)) {
    const name = m.replace(/[</>]/g, "").split(/\s|\//)[0].toLowerCase();
    t[name] = (t[name] || 0) + 1;
  }
  return t;
}
const a = tally(ref);
const b = tally(gen);
const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
console.log("tag        REF  GEN  selisih");
for (const k of keys) {
  const x = a[k] || 0;
  const y = b[k] || 0;
  if (x !== y) console.log(`${k.padEnd(10)} ${String(x).padStart(3)}  ${String(y).padStart(3)}  ${y - x > 0 ? "+" : ""}${y - x}`);
}
console.log("\nTotal tag:", Object.values(a).reduce((p, c) => p + c, 0), "vs", Object.values(b).reduce((p, c) => p + c, 0));
