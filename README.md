# PhysioNutrition - Recovery Protocol Platform

> **Injury Recovery Made Smart**: Clinical protocols + personalized nutrition + AI assistant  
> بروتوكولات الإصابات الطبية + خطط تغذية مخصصة + مساعد ذكي

<div align="center">
  
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Languages](https://img.shields.io/badge/Languages-English%20%7C%20Arabic-blue)

[Live App](https://physionutrition.vercel.app) • [Documentation](./IMPLEMENTATION_GUIDE.md) • [Quick Reference](./QUICK_REFERENCE.md)

</div>

---

## 🎯 What is PhysioNutrition?

PhysioNutrition is a comprehensive web platform that combines:

- **📚 95+ Medical Injury Protocols** - Evidence-based recovery plans for musculoskeletal injuries
- **🥗 AI-Powered Nutrition Plans** - Personalized dietary guidance based on injury type, phase, and profile
- **🧮 Clinical Calculators** - BMI, calorie needs, protein requirements, recovery timeline
- **🤖 AI Assistant** - Powered by Google Gemini for medical Q&A
- **📊 Progress Tracking** - Monitor measurements, pain levels, and recovery milestones
- **📄 PDF Reports** - Professional printable recovery plans
- **🌐 Full Bilingual Support** - Complete English & Arabic interface

---

## ✨ Key Features

### 🏥 Injury Protocol Library
- **13 Muscle Strains** | **8 Ligament Injuries** | **9 Tendon Issues** | **9 Bone Fractures** | **12 Joint Disorders** | **6+ Overuse Conditions**
- Each protocol includes:
  - 5-phase recovery roadmap
  - Detailed exercises & prohibited movements  
  - Professional medical terminology
  - Arabic medical translations

### 🎯 Smart Customization
Personalize recovery plans by:
- Activity Profile (General, Athlete, Senior, Post-Op)
- Recovery Goals (Anti-inflammation, Mobility, Strength, Sport Return)
- Timeline (0-48h, 3-14 days, 2-6 weeks, 6+ weeks)
- Diet Style (Omnivore or Vegetarian)

### 📱 Progressive Web App (PWA)
- Works offline after first load
- Install as standalone app
- Mobile-optimized interface
- Fast loading (< 2.3s)

### 🔍 Advanced SEO
- 202 indexed URLs (Sitemap)
- Hreflang tags for multi-language
- JSON-LD structured data
- Medical schema markup
- Google recommended headers

### 🛡️ Security First
- HTTPS/HSTS enforcement
- XSS & MIME-sniffing protection
- Content Security Policy
- No data sold or shared

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm
- Vercel account (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/physionutrition.git
cd physionutrition

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys:
# VITE_GEMINI_API_KEY=your_google_gemini_key
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_key

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Access Locally
- **English**: http://localhost:5173/en
- **Arabic**: http://localhost:5173/ar

---

## 📁 Project Structure

```
src/
├── App.tsx                          # Main app component
├── RouterApp.tsx                    # Language-aware routing
├── pages/
│   ├── InjuryProtocolsPage.tsx     # 95+ injury protocols
│   ├── InjuryDetailPage.tsx        # Detailed protocol view
│   ├── HomeRoute.tsx               # Landing page
│   └── [other pages]
├── components/
│   ├── seo/                        # SEO & schema generation
│   ├── charts/                     # Data visualization
│   ├── calculators/                # BMI, calories, protein
│   ├── ai/                         # Gemini AI integration
│   └── [other components]
├── services/
│   ├── injuryDatabase.ts           # Injury protocols
│   ├── injuryLocalization.ts       # Arabic translations (95+)
│   ├── medicalTerminology.ts       # Professional terms
│   ├── supabase.ts                 # Supabase client
│   └── [other services]
└── utils/
    ├── langUrlHelper.ts            # Language-aware URL generation
    └── [other utilities]

public/
├── robots.txt                      # SEO crawler rules
├── _headers                        # Vercel security headers
├── .htaccess                       # Apache configuration
├── ads.txt & app-ads.txt          # Ad network authorization
├── sitemap.xml                     # All 202 URLs
├── manifest.json                   # PWA configuration
└── .well-known/security.txt       # Security policy
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **React Router v6** | Language-aware routing (/en/*, /ar/*) |
| **Vite** | Build & Development |
| **Tailwind CSS** | Styling |
| **Supabase** | Backend & Auth |
| **Google Gemini** | AI Assistant |
| **html2canvas & jsPDF** | PDF generation |
| **Chart.js** | Data visualization |

---

## 📚 Documentation

- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Complete setup & SEO guide
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - API & component reference

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Go to: Project Settings → Environment Variables
```

**Vercel optimizations** (auto-enabled):
- Edge caching for static assets
- Automatic compression
- Security headers via `_headers`
- URL rewriting for SPA via `vercel.json`

---

## 🔐 Security Checklist

- ✅ HTTPS/HSTS enforced
- ✅ XSS protection headers
- ✅ MIME-type sniffing prevention
- ✅ Clickjacking protection (X-Frame-Options)
- ✅ Content Security Policy
- ✅ Permissions Policy (camera, microphone disabled)
- ✅ Sensitive files blocked (.env, .sql, etc)
- ✅ Rate limiting configured
- ✅ CORS properly configured
- ✅ No credentials in public files

---

## 📊 SEO Status

| Metric | Value |
|--------|-------|
| Total URLs | 202 |
| Languages | 2 (English, Arabic) |
| Injury Protocols | 95+ |
| Articles | 7 |
| Hreflang Support | ✅ |
| JSON-LD Schemas | ✅ |
| Sitemap | ✅ |
| Robots.txt | ✅ |
| Mobile Friendly | ✅ |
| Core Web Vitals | ✅ |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support & Contact

- **Email**: ahmed@physionutrition.vercel.app
- **Issues**: GitHub Issues
- **Discussion**: GitHub Discussions

---

## 🙏 Acknowledgments

- Medical content reviewed by rehabilitation specialists
- Arabic translations by medical terminology experts
- Icons from Lucide React
- Hosting & deployment by Vercel

---

## 🗺️ Roadmap

- [ ] Video demonstrations for exercises
- [ ] Wearable device integration (Apple Health, Google Fit)
- [ ] Telemedicine integration
- [ ] Mobile app (React Native)
- [ ] Offline-first database
- [ ] Community forum

---

<div align="center">

**Made with ❤️ by the PhysioNutrition Team**

If this project was helpful, please consider giving it a ⭐

</div>

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Pages (Routes)

- `/`: Main application (home)
- `/privacy`: Privacy Policy
- `/terms`: Terms of Service
- `/cookies`: Cookie Policy
