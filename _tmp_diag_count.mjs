import { readFileSync } from "node:fs";
const files = [
  "hikvision-ultra-p0-9-ds-d4009bw-2fc.html",
  "samsung-the-wall-p0-63-iw006b.html",
  "lg-lmpb-p1-25-lmpb012.html"
];
for (const f of files) {
  const h = readFileSync(f, "utf8");
  const n = (s) => (h.split(s).length - 1);
  console.log(
    f.padEnd(42),
    "li=" + n("<li"),
    "specRow=" + n('class="spec-row"'),
    "specName=" + n('class="spec-name"'),
    "ul=" + n("<ul"),
    "specList=" + n('class="spec-list"')
  );
}
