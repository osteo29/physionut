import fs from 'node:fs';
import path from 'node:path';

const CP1252_EXTRA = new Map([
  [0x20ac, 0x80],
  [0x201a, 0x82],
  [0x0192, 0x83],
  [0x201e, 0x84],
  [0x2026, 0x85],
  [0x2020, 0x86],
  [0x2021, 0x87],
  [0x02c6, 0x88],
  [0x2030, 0x89],
  [0x0160, 0x8a],
  [0x2039, 0x8b],
  [0x0152, 0x8c],
  [0x017d, 0x8e],
  [0x2018, 0x91],
  [0x2019, 0x92],
  [0x201c, 0x93],
  [0x201d, 0x94],
  [0x2022, 0x95],
  [0x2013, 0x96],
  [0x2014, 0x97],
  [0x02dc, 0x98],
  [0x2122, 0x99],
  [0x0161, 0x9a],
  [0x203a, 0x9b],
  [0x0153, 0x9c],
  [0x017e, 0x9e],
  [0x0178, 0x9f],
]);

function looksMojibake(value) {
  return /[\u00c0-\u00ff]/.test(value) || /Ø|Ù|Ã/.test(value);
}

function hasArabic(value) {
  return /[\u0600-\u06ff]/.test(value);
}

function decodeMojibake(value) {
  if (!value || hasArabic(value) || !looksMojibake(value)) return value;

  let decoded = value;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    if (!looksMojibake(decoded) && hasArabic(decoded)) break;

    const bytes = [];
    for (const char of decoded) {
      const code = char.charCodeAt(0);
      if (code <= 0xff) {
        bytes.push(code);
        continue;
      }
      const mapped = CP1252_EXTRA.get(code);
      if (mapped !== undefined) {
        bytes.push(mapped);
        continue;
      }
      return value;
    }

    try {
      const next = new TextDecoder('utf-8', {fatal: false}).decode(new Uint8Array(bytes));
      if (!next || next === decoded) break;
      decoded = next;
    } catch {
      break;
    }
  }

  return hasArabic(decoded) ? decoded : value;
}

function fixFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  const next = original.replace(/'([^'\\]|\\.)*'|"([^"\\]|\\.)*"/g, (literal) => {
    const quote = literal[0];
    const inner = literal.slice(1, -1);
    if (!looksMojibake(inner)) return literal;
    const fixed = decodeMojibake(inner);
    if (fixed === inner) return literal;
    changed = true;
    const escaped = fixed
      .replace(/\\/g, '\\\\')
      .replace(/\r/g, '\\r')
      .replace(/\n/g, '\\n')
      .replace(new RegExp(quote, 'g'), `\\${quote}`);
    return `${quote}${escaped}${quote}`;
  });

  if (changed) {
    fs.writeFileSync(filePath, next, 'utf8');
    console.log('fixed', filePath);
  }
}

const targets = [
  'src/services/injuryLocalization.ts',
  'src/pages/PageLayout.tsx',
  'src/pages/InjuryProtocolsPage.tsx',
  'src/components/common/exercise-finder/content.ts',
  'src/lib/notifications.ts',
];

for (const rel of targets) {
  fixFile(path.join(process.cwd(), rel));
}
