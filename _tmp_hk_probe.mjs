/* Probe halaman resmi Hikvision untuk 9 model videotron indoor.
   Output ditulis ke _tmp_hk_probe_out.txt agar mudah dibaca. */
import fs from "node:fs";

const base = "https://pro-av.hikvision.com/en/products/led-displays/indoor-led/";

const models = [
  { series: "ultra", slug: "ultra-series/ds-d4009bw-2fc" },
  { series: "ultra", slug: "ultra-series/ds-d4012bw-2fc" },
  { series: "ultra", slug: "ultra-series/ds-d4015bw-2fc" },
  { series: "solidplus", slug: "solid-plus-series/ds-d4012cw-2fq" },
  { series: "solidplus", slug: "solid-plus-series/ds-d4015cw-2fq" },
  { series: "solidplus", slug: "solid-plus-series/ds-d4018cw-2fq" },
  { series: "solid", slug: "solid-series/ds-d4012cw-2f" },
  { series: "solid", slug: "solid-series/ds-d4015cw-2f" },
  { series: "solid", slug: "solid-series/ds-d4018cw-2f" }
];

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9"
};

function stripTags(s) {
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

const report = [];

for (const m of models) {
  const url = base + m.slug + "/";
  const entry = { slug: m.slug, url };
  try {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(45000) });
    entry.status = res.status;
    const html = await res.text();
    entry.len = html.length;

    const og = html.match(/property="og:image"[^>]*content="([^"]+)"/i);
    entry.ogImage = og ? og[1] : null;

    const title = html.match(/<title>([\s\S]*?)<\/title>/i);
    entry.title = title ? stripTags(title[1]) : null;

    const dam = [
      ...new Set(
        [...html.matchAll(/["'(]([^"'()\s]*\/content\/dam\/[^"'()\s]+\.(?:png|jpg|jpeg|webp))["')]/gi)].map(
          (x) => x[1]
        )
      )
    ].filter((p) => /led|display/i.test(p));
    entry.damImages = dam.slice(0, 40);

    /* Slice HTML sekitar tabel spesifikasi untuk dibaca manual. */
    const idx = html.search(/pixel\s*pitch/i);
    if (idx > -1) entry.specSlice = stripTags(html.slice(idx, idx + 4000)).slice(0, 2500);
    else entry.specSlice = null;
  } catch (e) {
    entry.error = String(e && e.message ? e.message : e);
  }
  report.push(entry);
}

fs.writeFileSync("_tmp_hk_probe_out.txt", JSON.stringify(report, null, 2), "utf8");
console.log("probe done:", report.map((r) => r.slug + "=" + (r.status || r.error)).join(" | "));
