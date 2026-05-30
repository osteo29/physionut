# Active Rehab

> AI-powered rehabilitation and recovery platform for injury protocols, nutrition planning, clinical calculators, exercise guidance, and progress tracking.

<div align="center">

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Languages](https://img.shields.io/badge/Languages-English%20%7C%20Arabic-blue)

[Live App](https://activerehab.vercel.app) | [Documentation](./IMPLEMENTATION_GUIDE.md) | [Quick Reference](./QUICK_REFERENCE.md)

</div>

---

## What is Active Rehab?

Active Rehab is a bilingual recovery platform that combines:

- Evidence-based injury recovery protocols
- Clinical nutrition guidance and diet plans
- Rehab and fitness calculators
- Exercise libraries and training systems
- AI assistant support
- Progress tracking and PDF-ready outputs

The site is designed for rehabilitation, movement education, and nutrition support in both English and Arabic.

---

## Current Content Snapshot

| Content Type | Current Count | Notes |
|---|---:|---|
| Total indexed URLs | 348 | Current sitemap total across all public sections |
| Published injury protocols | 100 | Public injury protocol set used in sitemap generation |
| Internal injury library | 138 | Full local clinical injury catalog |
| Articles | 13 | Bilingual insights content |
| Diet plans | 10 | Nutrition regimen guides |
| Calculators | 11 | BMI, BMR, TDEE, macros, protein, water, and more |
| Exercise categories | 20 | Muscle-region and rehab exercise pages |
| Training systems | 7 | Structured workout system pages |

---

## Core Features

### Injury Recovery Library
- Public injury protocols with multilingual routing
- Internal clinical injury catalog for broader coverage
- Phase-based recovery guidance
- Related exercises, rehab pages, and nutrition notes
- Safety notes and FAQ content

### Nutrition Tools
- Anti-inflammatory and recovery-focused diet plans
- High-protein rehab nutrition
- Calorie deficit and recomposition guidance
- Mediterranean, DASH, intermittent fasting, low-carb, and plant-based plans

### Calculators
- BMI
- Waist-to-height ratio
- Body fat
- Ideal body weight
- BMR
- TDEE
- Calorie deficit
- Macros
- Protein intake
- Water intake
- Meal calories

### Exercise Content
- Muscle-region exercise pages
- Rehab-oriented exercise categories
- Training systems for different goals and equipment levels
- Internal links between exercises and injury protocols

### Platform Features
- Bilingual routing: `/en/*` and `/ar/*`
- AI assistant
- Dashboard and tracking pages
- Authentication flow
- SEO metadata, canonical URLs, hreflang, and structured data
- Sitemap generation and prerendered output

---

## Routes

### Public Routes
- `/`
- `/en/*`
- `/ar/*`

### Main Sections
- `/calculators`
- `/injuries`
- `/insights`
- `/diets`
- `/exercises`
- `/assistant`
- `/dashboard`

### Policy and Info Pages
- `/about`
- `/contact`
- `/privacy`
- `/terms`
- `/cookies`
- `/disclaimer`

### Auth
- `/auth`
- `/auth/callback`

### Admin
- `/admin`
- `/admin/content`
- `/admin/homepage`
- `/admin/injuries`
- `/admin/articles`
- `/admin/exercises`
- `/admin/media`
- `/admin/seo`
- `/admin/users`

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React | UI framework |
| TypeScript | Type safety |
| Vite | Build and development |
| React Router | Language-aware routing |
| Tailwind CSS | Styling |
| Supabase | Backend and auth |
| Google Gemini | AI assistant |
| Chart.js | Data visualization |
| html2canvas + jsPDF | PDF export |

---

## Project Structure

```text
src/
|-- components/   # UI, SEO, charts, exercise finder, AI tools
|-- pages/        # Public pages, admin pages, auth, dashboard
|-- services/     # Content catalogs, injury data, calculators, SEO, Supabase
|-- router/       # Route definitions
|-- utils/        # URL helpers and shared utilities
`-- lib/          # Supabase and app integration helpers

public/
|-- sitemap.xml
|-- sitemap-articles.xml
|-- sitemap-injuries.xml
|-- sitemap-diets.xml
|-- robots.txt
`-- _headers
```

---

## SEO and Indexing

- Canonical site URL: `https://activerehab.vercel.app`
- Bilingual hreflang support
- Prerendered HTML output for public routes
- Route-level sitemap generation
- Robots.txt configured for public sections and admin exclusions

---

## Development

### Prerequisites
- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview build

```bash
npm run preview
```

---

## Environment Variables

Create a `.env.local` file based on `.env.example`.

Key values include:

- `GEMINI_API_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SITE_URL`

For SEO and canonical URLs, the current public domain should be:

```bash
VITE_SITE_URL="https://activerehab.vercel.app"
```

---

## Notes

- The internal injury library is larger than the published injury set.
- Sitemap generation uses the generated/public protocol source, not every internal record.
- Update the README whenever the published content set changes.

---

## License

MIT
