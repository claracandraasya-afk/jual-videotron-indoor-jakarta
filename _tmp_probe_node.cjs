// Temporary QA helper: injects the probe script into a copy of index.html
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const probe = fs.readFileSync('_tmp_probe_script.html', 'utf8');
fs.writeFileSync('_tmp_probe.html', html.replace('</body>', probe + '\n</body>'));
console.log('probe page written');
