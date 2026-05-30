# Active Rehab Quick Reference

## Current Facts

- Domain: `https://activerehab.vercel.app`
- URLs in sitemap: `348`
- Published injury protocols: `100`
- Internal injury records: `138`
- Articles: `13`
- Diet plans: `10`
- Calculators: `11`

## Key Pages

- Home: `/`
- English: `/en/*`
- Arabic: `/ar/*`
- Injuries: `/injuries`
- Insights: `/insights`
- Calculators: `/calculators`
- Diets: `/diets`
- Exercises: `/exercises`
- Assistant: `/assistant`
- Dashboard: `/dashboard`

## Useful Files

- [README](./README.md)
- [System Summary](./000_START_HERE.md)
- [Implementation Guide](./IMPLEMENTATION_GUIDE.md)
- `src/services/site.ts`
- `scripts/generate-sitemap.ts`
- `vercel.json`

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## SEO Notes

- Use `https://activerehab.vercel.app` for canonical URLs.
- Keep sitemap output and site URL in sync.
- The published injury set is smaller than the internal injury library by design.
