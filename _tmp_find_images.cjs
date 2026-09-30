/* Scratch: inventaris file gambar lokal di folder umum pengguna. */
var fs = require("fs");
var path = require("path");

var roots = [
  path.join(process.env.USERPROFILE, "OneDrive", "Desktop"),
  path.join(process.env.USERPROFILE, "Desktop"),
  path.join(process.env.USERPROFILE, "Downloads"),
  path.join(process.env.USERPROFILE, "Pictures")
];

var ext = { ".png": 1, ".jpg": 1, ".jpeg": 1, ".webp": 1, ".svg": 1, ".gif": 1, ".avif": 1, ".bmp": 1 };
var out = [];
var seen = Object.create(null);

function walk(dir, depth) {
  if (depth > 4) return;
  var real;
  try {
    real = fs.realpathSync(dir);
  } catch (e) {
    return;
  }
  if (seen[real]) return;
  seen[real] = 1;

  var entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return;
  }

  entries.forEach(function (entry) {
    if (entry.name === "node_modules" || entry.name === ".git") return;
    var full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, depth + 1);
      return;
    }
    if (!ext[path.extname(entry.name).toLowerCase()]) return;
    var kb;
    try {
      kb = Math.round(fs.statSync(full).size / 1024);
    } catch (e) {
      kb = -1;
    }
    out.push(kb + " KB\t" + full);
  });
}

roots.forEach(function (root) {
  walk(root, 0);
});

fs.writeFileSync(
  "_tmp_find_images.txt",
  "total=" + out.length + "\r\n" + out.join("\r\n") + "\r\n",
  "utf8"
);
