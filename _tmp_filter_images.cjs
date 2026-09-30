/* Scratch: saring hasil _tmp_find_images.txt untuk kata kunci LED/videotron/hikvision. */
var fs = require("fs");
var path = require("path");

var lines = fs.readFileSync("_tmp_find_images.txt", "utf8").split(/\r?\n/);
var rx = /hikvision|videotron|led|ds-|p1\.|p2\.|panel|display|modul|lobby|indoor|screen/i;

var hits = [];
var dirs = Object.create(null);

lines.forEach(function (line, i) {
  if (i === 0 || !line.trim()) return;
  var parts = line.split("\t");
  var full = parts[1] || "";
  if (!full) return;
  dirs[path.dirname(full)] = (dirs[path.dirname(full)] || 0) + 1;
  if (rx.test(full)) hits.push(line);
});

var dirList = Object.keys(dirs)
  .sort()
  .map(function (d) {
    return dirs[d] + " files\t" + d;
  });

fs.writeFileSync(
  "_tmp_find_hits.txt",
  "HITS=" + hits.length + "\r\n" + hits.join("\r\n") + "\r\n\r\n== DIRS ==\r\n" + dirList.join("\r\n") + "\r\n",
  "utf8"
);
