import fs from 'node:fs';
import path from 'node:path';
import {jsPDF} from 'jspdf';

const repoRoot = process.cwd();
const outputDir = path.join(repoRoot, 'output', 'pdf');
const tmpDir = path.join(repoRoot, 'tmp', 'pdfs');
const outputPath = path.join(outputDir, 'physionutrition-app-summary.pdf');

fs.mkdirSync(outputDir, {recursive: true});
fs.mkdirSync(tmpDir, {recursive: true});

const pdf = new jsPDF({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
  compress: true,
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 12;
const gutter = 6;
const contentWidth = pageWidth - margin * 2;
const usableHeight = pageHeight - margin * 2;
const colWidth = (contentWidth - gutter) / 2;
const leftX = margin;
const rightX = margin + colWidth + gutter;

const palette = {
  ink: [23, 37, 84],
  text: [51, 65, 85],
  muted: [100, 116, 139],
  line: [203, 213, 225],
  accent: [21, 128, 61],
  accentFill: [240, 253, 244],
  panel: [248, 250, 252],
};

function setColor(rgb) {
  pdf.setTextColor(...rgb);
}

function setDraw(rgb) {
  pdf.setDrawColor(...rgb);
}

function setFill(rgb) {
  pdf.setFillColor(...rgb);
}

function textBlock(text, x, y, width, options = {}) {
  const {
    font = 'helvetica',
    style = 'normal',
    size = 9.2,
    color = palette.text,
    leading = 1.33,
  } = options;
  pdf.setFont(font, style);
  pdf.setFontSize(size);
  setColor(color);
  const lines = pdf.splitTextToSize(text, width);
  pdf.text(lines, x, y, {baseline: 'top'});
  const lineHeight = (size * leading) / 2.834645669;
  return {
    lines,
    height: lines.length * lineHeight,
    lineHeight,
  };
}

function bulletList(items, x, y, width, options = {}) {
  const {
    size = 8.8,
    leading = 1.28,
    bulletIndent = 3.2,
    gap = 1.2,
    color = palette.text,
  } = options;
  let cursor = y;
  let used = 0;

  for (const item of items) {
    pdf.setFillColor(...palette.accent);
    pdf.circle(x + 1.3, cursor + 1.8, 0.6, 'F');
    const block = textBlock(item, x + bulletIndent, cursor, width - bulletIndent, {
      size,
      leading,
      color,
    });
    cursor += block.height + gap;
    used += block.height + gap;
  }

  return used;
}

function sectionTitle(title, x, y, width) {
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10.2);
  setColor(palette.ink);
  pdf.text(title.toUpperCase(), x, y, {baseline: 'top'});
  setDraw(palette.line);
  pdf.setLineWidth(0.35);
  pdf.line(x, y + 5.2, x + width, y + 5.2);
  return 8;
}

setFill(palette.panel);
pdf.roundedRect(margin, margin, contentWidth, usableHeight, 5, 5, 'F');

setFill(palette.accentFill);
setDraw(palette.line);
pdf.roundedRect(margin + 4, margin + 4, contentWidth - 8, 38, 4, 4, 'FD');

pdf.setFont('helvetica', 'bold');
pdf.setFontSize(19);
setColor(palette.ink);
pdf.text('PhysioNutrition App Summary', margin + 8, margin + 11, {baseline: 'top'});

pdf.setFont('helvetica', 'bold');
pdf.setFontSize(8.5);
setColor(palette.accent);
pdf.text('Repo-based one-page overview', margin + 8, margin + 21, {baseline: 'top'});

const whatIs =
  'PhysioNutrition is a React/Vite web app for injury-recovery education and nutrition support. It combines calculators, structured injury protocols, tracking, bilingual content, and an AI assistant in a PWA-style experience.';
const persona =
  'Primary persona: people managing rehab, recovery, or performance goals who want injury-aware nutrition guidance and self-tracking. Dedicated clinician workflow: Not found in repo.';

textBlock(whatIs, margin + 8, margin + 26, contentWidth - 16, {
  size: 9.1,
  leading: 1.25,
});
textBlock(`Who it is for: ${persona}`, margin + 8, margin + 33.5, contentWidth - 16, {
  size: 8.4,
  leading: 1.2,
  color: palette.muted,
});

let leftY = margin + 48;
let rightY = margin + 48;

leftY += sectionTitle('What it does', leftX, leftY, colWidth);
leftY += bulletList(
  [
    'Clinical calculators for BMI, BMR, TDEE, macros, protein, water, deficit, body fat, and meal planning.',
    'Localized injury library with protocol pages, recovery phases, nutrition guidance, and safety notes.',
    'AI assistant powered by Google Gemini with profile-aware prompts and local response caching.',
    'Account-linked tracking dashboard for saved assessments, timeline history, trend charts, and PDF export.',
    'English/Arabic routing and content, plus persisted language and theme preferences.',
    'PWA and SEO support through a service worker, manifest, sitemap generation, and article pages.',
  ],
  leftX,
  leftY,
  colWidth,
  {size: 8.55, leading: 1.24},
);

leftY += 2;
leftY += sectionTitle('How to run', leftX, leftY, colWidth);
leftY += bulletList(
  [
    'Run `npm install`.',
    'Copy `.env.example` to `.env.local`.',
    'Set `VITE_GEMINI_API_KEY`; add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if you need auth, saved tracking, or published articles.',
    'Start with `npm run dev`.',
    'Open `http://localhost:3000/en` or `http://localhost:3000/ar`.',
  ],
  leftX,
  leftY,
  colWidth,
  {size: 8.55, leading: 1.24},
);

rightY += sectionTitle('How it works', rightX, rightY, colWidth);
rightY += bulletList(
  [
    '`src/main.tsx` boots a React 19 app inside `BrowserRouter`; it also registers `public/sw.js` after load.',
    '`src/RouterApp.tsx` redirects `/` to the saved language and lazy-loads home, injuries, assistant, auth, dashboard, article, and admin routes.',
    'Domain logic and content live in `src/services` and `src/logic`, including calculators, injury protocol data, translations, article content, and PDF helpers.',
    '`src/lib/supabase.ts` creates the client when env vars are present and handles auth, saved assessments, and published articles.',
    '`src/ai/gemini.ts` sends assistant prompts through `@google/genai` using `VITE_GEMINI_API_KEY`, with user context and localStorage-backed cache keys.',
    'Local state and preferences flow through browser storage for language, theme, profiles, custom foods, and some AI context. Dedicated backend API service: Not found in repo.',
    '`vercel.json` rewrites all paths to `index.html` and applies cache/security headers for deployment.',
  ],
  rightX,
  rightY,
  colWidth,
  {size: 8.35, leading: 1.21},
);

const footerY = pageHeight - 18;
setDraw(palette.line);
pdf.setLineWidth(0.3);
pdf.line(margin + 4, footerY - 3, pageWidth - margin - 4, footerY - 3);
textBlock(
  'Evidence sources used: package.json, README.md, .env.example, vercel.json, public/sw.js, and app code under src/.',
  margin + 4,
  footerY,
  contentWidth - 8,
  {size: 7.7, leading: 1.18, color: palette.muted},
);

if (leftY > pageHeight - 26 || rightY > pageHeight - 26) {
  throw new Error(`Content overflow detected (leftY=${leftY.toFixed(2)}, rightY=${rightY.toFixed(2)}).`);
}

pdf.save(outputPath);
console.log(outputPath);
