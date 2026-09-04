import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const parts = [];
for (const f of ['tokens/semantic.css', 'tokens/type.css']) parts.push(readFileSync(f, 'utf8'));
for (const f of readdirSync('components').filter(n => n.endsWith('.css')).sort()) parts.push(readFileSync(`components/${f}`, 'utf8'));
writeFileSync('prototype/iw-design-system.css', parts.join('\n\n'));
console.log('Bundled → prototype/iw-design-system.css');
