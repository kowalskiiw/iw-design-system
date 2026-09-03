import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const INPUTS = [
  { json: 'tokens/semantic.json', css: 'tokens/semantic.css' },
  { json: 'tokens/type.json',     css: 'tokens/type.css' },
];

// "intent/brand/bg" -> "intent-brand-bg"; "Font Size/24" -> "font-size-24"
const toVarName = (name) =>
  name.trim().replace(/[/\s]+/g, '-').toLowerCase();

const ch = (x) => Math.round(x * 255);

function colorToCss(v) {
  const r = ch(v.r), g = ch(v.g), b = ch(v.b);
  const a = typeof v.a === 'number' ? v.a : 1;
  if (a < 1) return `rgba(${r}, ${g}, ${b}, ${a})`;
  const hex = [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
  return `#${hex.toUpperCase()}`;
}

function formatValue(variable, value) {
  if (variable.type === 'COLOR' && value && typeof value === 'object' && 'r' in value) {
    return colorToCss(value);
  }
  if (variable.type === 'STRING') {
    return /\s/.test(value) ? `"${value}"` : String(value);
  }
  if (variable.type === 'FLOAT') {
    // font weights are unitless; every other numeric token is a px length
    return /font\s*weight/i.test(variable.name) ? String(value) : `${value}px`;
  }
  return String(value);
}

function convert({ json, css }) {
  if (!existsSync(json)) { console.log(`skip: ${json} not found`); return; }
  const data = JSON.parse(readFileSync(json, 'utf8'));
  if (!Array.isArray(data.variables)) {
    console.error(`ERROR: ${json} has no "variables" array — unexpected format`);
    return;
  }

  const lines = [];
  for (const v of data.variables) {
    // Prefer the resolved value (handles aliases); fall back to the raw mode value
    const resolved = v.resolvedValuesByMode || {};
    const modeKey = Object.keys(resolved)[0] ?? Object.keys(v.valuesByMode || {})[0];
    const value = resolved[modeKey]?.resolvedValue ?? v.valuesByMode?.[modeKey];
    if (value === undefined) continue;
    lines.push(`  --${toVarName(v.name)}: ${formatValue(v, value)};`);
  }

  writeFileSync(css, `:root {\n${lines.join('\n')}\n}\n`);
  console.log(`Wrote ${css} with ${lines.length} variables`);
}

INPUTS.forEach(convert);
