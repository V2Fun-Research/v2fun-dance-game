const fs = require('fs');
const path = require('path');
const root = fs.realpathSync(__dirname);
const out = path.join(root, 'dist');
const files = JSON.parse(fs.readFileSync(path.join(root, 'public-files.json'), 'utf8'));
if (!Array.isArray(files) || !files.length) throw Error('public-files.json must list public files');
// Validate the complete explicit allowlist before creating output.
for (const name of files) {
  if (typeof name !== 'string' || path.isAbsolute(name) || name.split(/[\\/]/).some(x => x === '..' || x.startsWith('.')) || name.startsWith('dist/')) throw Error('Unsafe public path: ' + name);
  const full = path.resolve(root, name);
  if (!fs.realpathSync(full).startsWith(root + path.sep) || !fs.statSync(full).isFile()) throw Error('Invalid public file: ' + name);
}
if (fs.existsSync(out)) throw Error('dist already exists; review and move the previous output before rebuilding');
fs.mkdirSync(out);
for (const name of files) {
  const target = path.join(out, name);
  fs.mkdirSync(path.dirname(target), {recursive:true});
  fs.copyFileSync(path.join(root, name), target);
}
console.log('Static game built in dist from public-files.json');
