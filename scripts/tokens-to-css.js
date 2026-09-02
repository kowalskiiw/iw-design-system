import { readFileSync, writeFileSync } from 'node:fs';

const tokens = JSON.parse(readFileSync('tokens/semantic.json', 'utf8'));
const lines = [];

function walk(node, path) {
  if (node && typeof node === 'object' && '$value' in node) {
    const v = node.$value;
    let out;
    if (v && typeof v === 'object' && 'hex' in v) {
      if (typeof v.alpha === 'number' && v.alpha < 1 && Array.isArray(v.components)) {
        const [r, g, b] = v.components.map((c) => Math.round(c * 255));
        out = `rgba(${r}, ${g}, ${b}, ${v.alpha})`;
      } else {
        out = v.hex;
      }
    } else if (typeof v === 'number' || typeof v === 'string') {
      out = String(v);
    } else {
      out = JSON.stringify(v);
    }
    lines.push(`  --${path.join('-')}: ${out};`);
    return;
  }
  if (node && typeof node === 'object') {
    for (const [k, child] of Object.entries(node)) {
      if (k.startsWith('$')) continue;
      walk(child, [...path, k]);
    }
  }
}

walk(tokens, []);
writeFileSync('tokens/semantic.css', `:root {\n${lines.join('\n')}\n}\n`);
console.log(`Wrote tokens/semantic.css with ${lines.length} variables`);
