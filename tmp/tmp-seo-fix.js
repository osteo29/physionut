const fs = require('fs');

function replaceExact(path, search, replacement) {
  const text = fs.readFileSync(path, 'utf8');
  if (!text.includes(search)) {
    throw new Error(`Pattern not found in ${path}: ${search}`);
  }
  fs.writeFileSync(path, text.replace(search, replacement), 'utf8');
}

replaceExact(
  'scripts/generate-sitemap.ts',
  "  {path: '/assistant', changefreq: 'weekly', priority: '0.7', lastmod: GENERATED_LASTMOD},\n",
  ''
);

replaceExact(
  'public/robots.txt',
  "Disallow: /assistant/\n",
  "Disallow: /assistant/\nDisallow: /en/admin/\nDisallow: /ar/admin/\nDisallow: /en/auth\nDisallow: /ar/auth\nDisallow: /en/dashboard\nDisallow: /ar/dashboard\nDisallow: /en/studio/\nDisallow: /ar/studio/\nDisallow: /en/assistant\nDisallow: /ar/assistant\n"
);

replaceExact(
  'src/pages/AssistantPage.tsx',
  '        canonicalPath="/assistant"\n      />',
  '        canonicalPath="/assistant"\n        noIndex\n      />'
);

replaceExact(
  'src/pages/AuthPage.tsx',
  '        canonicalPath="/auth"\n      />',
  '        canonicalPath="/auth"\n        noIndex\n      />'
);

replaceExact(
  'src/pages/TrackingDashboardPage.tsx',
  '        canonicalPath="/dashboard"\n      />',
  '        canonicalPath="/dashboard"\n        noIndex\n      />'
);

replaceExact(
  'vercel.json',
  '  "headers": [\n',
  '  "headers": [\n    {\n      "source": "/(assistant|auth|dashboard)(/.*)?",\n      "headers": [\n        {\n          "key": "X-Robots-Tag",\n          "value": "noindex, nofollow"\n        }\n      ]\n    },\n    {\n      "source": "/(en|ar)/(assistant|auth|dashboard)(/.*)?",\n      "headers": [\n        {\n          "key": "X-Robots-Tag",\n          "value": "noindex, nofollow"\n        }\n      ]\n    },\n    {\n      "source": "/(admin|studio)(/.*)?",\n      "headers": [\n        {\n          "key": "X-Robots-Tag",\n          "value": "noindex, nofollow"\n        }\n      ]\n    },\n    {\n      "source": "/(en|ar)/(admin|studio)(/.*)?",\n      "headers": [\n        {\n          "key": "X-Robots-Tag",\n          "value": "noindex, nofollow"\n        }\n      ]\n    },\n'
);
