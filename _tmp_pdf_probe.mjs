/* Uji: unduh datasheet resmi Hikvision (PDF) dan ekstrak gambar produk yang tertanam.
   Hasil: file gambar di _tmp_pdf/img + ringkasan di _tmp_pdf_probe_out.txt */
import fs from "node:fs";
import path from "node:path";

const outDir = "_tmp_pdf";
const imgDir = path.join(outDir, "img");
fs.mkdirSync(imgDir, { recursive: true });

const targets = process.argv.slice(2).map((arg) => {
  const [name, url] = arg.split("=");
  return { name, url };
});

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
};

function jpegInfo(buf, start) {
  /* Cari SOF marker untuk mendapatkan dimensi. */
  let i = start + 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2;
      continue;
    }
    const len = buf.readUInt16BE(i + 2);
    const isSOF =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isSOF) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return { h: 0, w: 0 };
}

function extractJpegs(buf, tag) {
  const found = [];
  let i = 0;
  let n = 0;
  while (i < buf.length - 4) {
    if (buf[i] === 0xff && buf[i + 1] === 0xd8 && buf[i + 2] === 0xff) {
      let j = i + 2;
      while (j < buf.length - 2) {
        if (buf[j] === 0xff && buf[j + 1] === 0xd9) break;
        j++;
      }
      const size = j + 2 - i;
      if (size > 8000) {
        const info = jpegInfo(buf, i);
        const file = path.join(imgDir, tag + "-jpeg-" + n + ".jpg");
        fs.writeFileSync(file, buf.subarray(i, j + 2));
        found.push({ file, size, w: info.w, h: info.h });
        n++;
      }
      i = j + 2;
    } else {
      i++;
    }
  }
  return found;
}

const report = [];

for (const t of targets) {
  const entry = { name: t.name, url: t.url };
  try {
    const res = await fetch(t.url, { headers, signal: AbortSignal.timeout(60000) });
    entry.status = res.status;
    const buf = Buffer.from(await res.arrayBuffer());
    entry.bytes = buf.length;
    const pdfPath = path.join(outDir, t.name + ".pdf");
    fs.writeFileSync(pdfPath, buf);
    entry.jpegs = extractJpegs(buf, t.name);
  } catch (e) {
    entry.error = String(e && e.message ? e.message : e);
  }
  report.push(entry);
}

fs.writeFileSync("_tmp_pdf_probe_out.txt", JSON.stringify(report, null, 2), "utf8");
console.log("pdf probe done");
