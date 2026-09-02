import { readFileSync, writeFileSync, existsSync } from 'node:fs';

// Each token JSON gets its own CSS file. Colours stay in semantic.css exactly
// as before; typography lands in type.css.
const INPUTS = [
  { json: 'tokens/semantic.json', css: 'tokens/semantic.css' },
  { json: 'tokens/type.json',     css: 'tokens/type.css' },
];

function formatValue(node) {
  const type = node.$type;
  const v = node.$value;

  // Colour: object carrying a ready-made hex (Figma DTCG export)
  if (v && typeof v === 'object' && 'hex' in v) {
    if (typeof v.alpha === 'number' && v.alpha < 1 && Array.isArray(v.components)) {
      const [r, g, b] = v.components.map((c) => Math.round(c * 255));
      return `rgba(${r}, ${g}, ${b}, ${v.alpha})`;
    }
    return v.hex;
  }

  // Dimension: {value, unit} object, or a bare number (assume px)
  if (type === 'dimension') {
    if (v && typeof v === 'object' && 'value' in v) return `${v.value}${v.unit || 'px'}`;
    if (typeof v === 'number') return `${v}px`;
    return String(v);
  }

  // Font family: array or string; quote any name containing spaces
  if (type === 'fontFamily') {
    const q = (f) => (/\s/.test(f) ? `"${f}"` : f);
    return Array.isArray(v) ? v.map(q).join(', ') : q(String(v));
  }

  // Font weight, plain numbers, plain strings
  if (type === 'fontWeight' || typeof v === 'number' || typeof v === 'string') {
    return String(v);
  }

  // Composite tokens (a whole typography object) can't be a single CSS var — skip
  return null;
}

function convert({ json, css }) {
  if (!existsSync(json)) { console.log(`skip: ${json} not found`); return; }
  const tokens = JSON.parse(readFileSync(json, 'utf8'));
  const lines = [];
  let skipped = 0;

  (function walk(node, path) {
    if (node && typeof node === 'object' && '$value' in node) {
      const out = formatValue(node);
      if (out === null) { skipped++; return; }
      lines.push(`  --${path.join('-')}: ${out};`);
      return;
    }
    if (node && typeof node === 'object') {
      for (const [k, child] of Object.entries(node)) {
        if (k.startsWith('$')) continue;
        walk(child, [...path, k]);
      }
    }
  })(tokens, []);

  writeFileSync(css, `:root {\n${lines.join('\n')}\n}\n`);
  console.log(`Wrote ${css} with ${lines.length} variables${skipped ? ` (skipped ${skipped} composite)` : ''}`);
}

INPUTS.forEach(convert);
