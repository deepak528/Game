#!/usr/bin/env node
/**
 * Inlines Leaflet's CSS and JS into src/index.template.html and writes index.html.
 *
 * The result is a single self-contained file with no CDN dependency — open it
 * straight off disk and it runs. The only network it needs is OpenStreetMap
 * map tiles.
 *
 *   npm install && node build.js
 */
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'node_modules', 'leaflet', 'dist');
if (!fs.existsSync(dist)) {
  console.error('Leaflet not found. Run `npm install` first.');
  process.exit(1);
}

const read = f => fs.readFileSync(f, 'utf8');
// `$` is special in String.replace patterns; a function replacer avoids that.
const put = (src, token, payload) => {
  if (!src.includes(token)) throw new Error('missing placeholder: ' + token);
  return src.replace(token, () => payload);
};

let html = read(path.join(__dirname, 'src', 'index.template.html'));
html = put(html, '/*__LEAFLET_CSS__*/', read(path.join(dist, 'leaflet.css')));
html = put(html, '/*__LEAFLET_JS__*/',  read(path.join(dist, 'leaflet.js')));

const out = path.join(__dirname, 'index.html');
fs.writeFileSync(out, html);
console.log('wrote %s (%d KB)', path.relative(__dirname, out), Math.round(html.length / 1024));
