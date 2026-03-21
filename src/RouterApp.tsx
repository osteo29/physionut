import {lazy, Suspense, useEffect, useState} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {getPreferredLanguage} from './services/languagePreference';
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

/**
 * Redirect root to preferred language
 */
function RootRedirect() {
  const preferredLang = getPreferredLanguage();
  return <Navigate to={`/${preferredLang}/`} replace />;
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
        {/* Root redirect to preferred language */}
        <Route path="/" element={<RootRedirect />} />

        {/* Language-prefixed routes: /en/* and /ar/* */}
        <Route path="/:lang" element={<HomeRoute theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/:lang/calculators" element={<HomeRoute scrollToId="calculators" theme={theme} onToggleTheme={toggleTheme} />} />
        
        {/* Public pages with language prefix */}
        <Route path="/:lang/privacy" element={<PrivacyPolicy />} />
        <Route path="/:lang/terms" element={<TermsOfService />} />
        <Route path="/:lang/cookies" element={<CookiePolicy />} />
        <Route path="/:lang/disclaimer" element={<MedicalDisclaimer />} />
        <Route path="/:lang/about" element={<AboutPage />} />
        <Route path="/:lang/contact" element={<ContactPage />} />
        <Route path="/:lang/insights" element={<InsightsPage />} />
        <Route path="/:lang/injury-protocols" element={<Navigate to="/:lang/injuries" replace />} />
        <Route path="/:lang/injuries" element={<InjuryProtocolsPage />} />
        <Route path="/:lang/injuries/:slug" element={<InjuryDetailPage />} />
        <Route path="/:lang/insights/:slug" element={<ArticlePage />} />
        <Route path="/:lang/studio/articles" element={<ArticleStudioPage />} />
        <Route path="/:lang/assistant" element={<AssistantPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/:lang/auth" element={<AuthPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/:lang/dashboard" element={<TrackingDashboardPage />} />

        {/* Legacy routes without language prefix - redirect to language-prefixed versions */}
        <Route path="/calculators" element={<Navigate to={`/${getPreferredLanguage()}/calculators`} replace />} />
        <Route path="/privacy" element={<Navigate to={`/${getPreferredLanguage()}/privacy`} replace />} />
        <Route path="/terms" element={<Navigate to={`/${getPreferredLanguage()}/terms`} replace />} />
        <Route path="/cookies" element={<Navigate to={`/${getPreferredLanguage()}/cookies`} replace />} />
        <Route path="/disclaimer" element={<Navigate to={`/${getPreferredLanguage()}/disclaimer`} replace />} />
        <Route path="/about" element={<Navigate to={`/${getPreferredLanguage()}/about`} replace />} />
        <Route path="/contact" element={<Navigate to={`/${getPreferredLanguage()}/contact`} replace />} />
        <Route path="/insights" element={<Navigate to={`/${getPreferredLanguage()}/insights`} replace />} />
        <Route path="/injuries" element={<Navigate to={`/${getPreferredLanguage()}/injuries`} replace />} />
        <Route path="/injuries/:slug" element={<Navigate to={`/${getPreferredLanguage()}/injuries/:slug`} replace />} />
        <Route path="/insights/:slug" element={<Navigate to={`/${getPreferredLanguage()}/insights/:slug`} replace />} />
        <Route path="/studio/articles" element={<Navigate to={`/${getPreferredLanguage()}/studio/articles`} replace />} />
        <Route path="/assistant" element={<Navigate to={`/${getPreferredLanguage()}/assistant`} replace />} />
        <Route path="/auth" element={<Navigate to={`/${getPreferredLanguage()}/auth`} replace />} />
        <Route path="/dashboard" element={<Navigate to={`/${getPreferredLanguage()}/dashboard`} replace />} />

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
