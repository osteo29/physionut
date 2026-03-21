import {lazy, Suspense, useEffect, useState} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import HomeRoute from './pages/HomeRoute';
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const MedicalDisclaimer = lazy(() => import('./pages/MedicalDisclaimer'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const InsightsPage = lazy(() => import('./pages/InsightsPage'));
const InjuryProtocolsPage = lazy(() => import('./pages/InjuryProtocolsPage'));
const InjuryDetailPage = lazy(() => import('./pages/InjuryDetailPage'));
const ArticleStudioPage = lazy(() => import('./pages/ArticleStudioPage'));
const AssistantPage = lazy(() => import('./pages/AssistantPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const TrackingDashboardPage = lazy(() => import('./pages/TrackingDashboardPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-slate-50 px-4">
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-600 shadow-sm">
        Loading...
      </div>
    </div>
  );
}

export default function RouterApp() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('physiohub_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('physiohub_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<HomeRoute theme={theme} onToggleTheme={toggleTheme} />} />
        <Route
          path="/calculators"
          element={<HomeRoute scrollToId="calculators" theme={theme} onToggleTheme={toggleTheme} />}
        />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/disclaimer" element={<MedicalDisclaimer />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/injury-protocols" element={<Navigate to="/injuries" replace />} />
        <Route path="/injuries" element={<InjuryProtocolsPage />} />
        <Route path="/injuries/:slug" element={<InjuryDetailPage />} />
        <Route path="/insights/:slug" element={<ArticlePage />} />
        <Route path="/studio/articles" element={<ArticleStudioPage />} />
        <Route
          path="/assistant"
          element={<AssistantPage theme={theme} onToggleTheme={toggleTheme} />}
        />
        <Route path="/auth" element={<AuthPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/dashboard" element={<TrackingDashboardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
