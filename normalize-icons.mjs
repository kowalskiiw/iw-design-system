#!/usr/bin/env node
/**
 * normalize-icons.mjs
 * One-pass cleanup for the IW Design Library icon SVGs.
 *
 * Fixes the two problems left by earlier hand-edits:
 *   1. Hardcoded fills/strokes on UI icons that won't inherit colour.
 *   2. Stray solid <rect> elements (leftover clip masks) that paint over
 *      the glyph — the "icon renders as a blank/white box" bug.
 *
 * SAFETY:
 *   - Backs up every file it touches to assets/_icon-backup/<category>/ first.
 *   - Only converts colours to currentColor for UI icons (assets/icons/).
 *   - NEVER recolours payment/ or sports/ (brand + sport art keep colours).
 *   - Removes stray white/opaque full-size <rect> masks everywhere (safe).
 *   - Prints a report of exactly what changed per file. Changes nothing
 *     silently.
 *
 * Usage (from repo root):
 *   node normalize-icons.mjs          # apply changes
 *   node normalize-icons.mjs --dry    # preview only, write nothing
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const DRY = process.argv.includes('--dry');

// category -> whether its icons should be recoloured to currentColor
const DIRS = [
  { dir: 'assets/icons',        recolor: true  },  // UI icons: monochrome, inherit colour
  { dir: 'assets/payment',      recolor: false },  // brand logos: keep own colours
  { dir: 'assets/sports',       recolor: false },  // sport icons: keep own colours
  { dir: 'assets/verification', recolor: false },  // (usually raster, but safe to include)
];

const BACKUP_ROOT = 'assets/_icon-backup';

function listSvgs(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.svg'));
}

/**
 * Remove stray solid <rect> mask elements: a <rect> that (a) has no x/y or
 * x=0/y=0, spans the full viewBox, and (b) has a solid fill (white/#fff/black)
 * — i.e. a leftover clip mask now drawn on top. We keep rects that are clearly
 * part of the artwork (partial size, positioned, or non-solid).
 */
function stripStrayRects(svg) {
  let removed = 0;
  const out = svg.replace(/<rect\b[^>]*\/?>(?:<\/rect>)?/gi, (tag) => {
    const hasFullWidth = /width="16"|width="100%"|width="24"|width="12"/.test(tag);
    const solidFill = /fill="(#fff(?:fff)?|white|#000(?:000)?|black)"/i.test(tag);
    const atOrigin = !/\bx="(?!0")[^"]/.test(tag) && !/\by="(?!0")[^"]/.test(tag);
    if (hasFullWidth && solidFill && atOrigin) {
      removed++;
      return ''; // drop it
    }
    return tag;
  });
  return { svg: out, removed };
}

/** Convert real fills/strokes to currentColor (UI icons only). */
function toCurrentColor(svg) {
  let changed = 0;
  let out = svg
    // protect fill/stroke = none so we don't recolour them
    .replace(/fill="none"/gi, 'fill="__NONE__"')
    .replace(/stroke="none"/gi, 'stroke="__NONE__"');

  const before = out;
  out = out
    .replace(/fill="[^"]*"/gi, 'fill="currentColor"')
    .replace(/stroke="[^"]*"/gi, 'stroke="currentColor"');
  if (out !== before) changed++;

  // give any <path> with no fill an explicit currentColor one
  const before2 = out;
  out = out.replace(/<path (?![^>]*\bfill=)/gi, '<path fill="currentColor" ');
  if (out !== before2) changed++;

  // restore protected none values
  out = out.replace(/"__NONE__"/g, '"none"');
  return { svg: out, changed };
}

function backup(category, file, contents) {
  const dir = join(BACKUP_ROOT, category);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, file), contents);
}

let totalTouched = 0;
const report = [];

for (const { dir, recolor } of DIRS) {
  const category = dir.split('/').pop();
  for (const file of listSvgs(dir)) {
    const path = join(dir, file);
    const original = readFileSync(path, 'utf8');
    let svg = original;
    const notes = [];

    const rectResult = stripStrayRects(svg);
    if (rectResult.removed > 0) {
      svg = rectResult.svg;
      notes.push(`removed ${rectResult.removed} stray rect(s)`);
    }

    if (recolor) {
      const colorResult = toCurrentColor(svg);
      if (colorResult.changed > 0) {
        svg = colorResult.svg;
        notes.push('→ currentColor');
      }
    }

    if (svg !== original) {
      totalTouched++;
      report.push(`  ${category}/${file}: ${notes.join(', ')}`);
      if (!DRY) {
        backup(category, file, original);
        writeFileSync(path, svg);
      }
    }
  }
}

console.log(DRY ? '\n[DRY RUN — no files written]\n' : '\n[Applied changes]\n');
if (report.length) {
  console.log(report.join('\n'));
} else {
  console.log('  Nothing needed changing — all icons already clean.');
}
console.log(`\n${totalTouched} file(s) ${DRY ? 'would be' : 'were'} changed.`);
if (!DRY && totalTouched > 0) {
  console.log(`Originals backed up to ${BACKUP_ROOT}/  (delete once you've verified).`);
}
