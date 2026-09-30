/* Scratch: daftar isi folder gambar videotron kandidat di Downloads. */
var fs = require("fs");
var path = require("path");

var D = path.join(process.env.USERPROFILE, "Downloads");
var targets = [
  "Jual Videotron Indoor Jakarta _ Hikvision, Samsung & LG_files",
  "Jual-videotron-indoor-jakarta-clean\\images",
  "MENTAHAN VIDEOTRON\\MENTAHAN VIDEOTRON",
  "VIDEO WALL SMART BOARD",
  "VIDWALL VIDEOTRON JUNI",
  "Video wall DIGITAL SIGNAGE (1)"
];

var out = [];

targets.forEach(function (rel) {
  var dir = path.join(D, rel);
  var names;
  try {
    names = fs.readdirSync(dir);
  } catch (e) {
    out.push("!! MISSING: " + dir);
    return;
  }
  out.push("== " + dir + " (" + names.length + ") ==");
  names.forEach(function (n) {
    var kb = "";
    try {
      kb = String(Math.round(fs.statSync(path.join(dir, n)).size / 1024)) + " KB";
    } catch (e) {}
    out.push("   " + n + "  [" + kb + "]");
  });
  out.push("");
});

fs.writeFileSync("_tmp_list_dirs.txt", out.join("\r\n") + "\r\n", "utf8");
