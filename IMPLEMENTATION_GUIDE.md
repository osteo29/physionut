# Active Rehab Implementation Guide

This guide reflects the current project state.

## Platform Overview

Active Rehab is a bilingual rehabilitation and recovery platform with:

- Injury recovery protocols
- Nutrition and diet plans
- Clinical calculators
- Exercise libraries and training systems
- AI assistant, dashboard, auth, and admin pages

## Current Production URL

`https://activerehab.vercel.app`

## Current Content Counts

| Content Type | Count |
|---|---:|
| Indexed URLs | 348 |
| Published injury protocols | 100 |
| Internal injury library | 138 |
| Articles | 13 |
| Diet plans | 10 |
| Calculators | 11 |
| Exercise categories | 20 |
| Training systems | 7 |

## Routing

- Public root: `/`
- English pages: `/en/*`
- Arabic pages: `/ar/*`
- Main sections: `injuries`, `insights`, `calculators`, `diets`, `exercises`
- Support sections: `assistant`, `dashboard`, `auth`, `admin`

## SEO And Sitemap

- Canonical site URL is `https://activerehab.vercel.app`
- Sitemap generation uses the public/generated injury set
- Internal injury records are not all published as sitemap entries
- `vercel.json`, `src/services/site.ts`, and `README.md` should stay aligned

## Local Development

```bash
npm install
npm run dev
npm run build
```

## Source Of Truth

- [README](./README.md)
- `src/services/site.ts`
- `scripts/generate-sitemap.ts`
- `vercel.json`
