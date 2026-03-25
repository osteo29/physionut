import {lazy, Suspense, useEffect, useState} from 'react';
import {Navigate, Route, Routes, useLocation, useParams} from 'react-router-dom';
import {getPreferredLanguage} from './services/languagePreference';
import HomeRoute from './pages/HomeRoute';
import {navigationPaths} from './utils/langUrlHelper';

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
const AdminInjuryManager = lazy(() => import('./pages/AdminInjuryManager'));
const DietsRegimensPage = lazy(() => import('./pages/DietsRegimensPage'));
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

function LegacyRouteRedirect() {
  const preferredLang = getPreferredLanguage();
  const location = useLocation();
  return <Navigate to={`/${preferredLang}${location.pathname}${location.search}${location.hash}`} replace />;
}

function InjuryProtocolsRedirect() {
  const {lang = 'en'} = useParams<{lang: 'en' | 'ar'}>();
  return <Navigate to={navigationPaths.injuries(lang)} replace />;
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
        <Route path="/:lang/injury-protocols" element={<InjuryProtocolsRedirect />} />
        <Route path="/:lang/injuries" element={<InjuryProtocolsPage />} />
        <Route path="/:lang/injuries/:slug" element={<InjuryDetailPage />} />
        <Route path="/:lang/admin/injuries" element={<AdminInjuryManager />} />
        <Route path="/admin/injuries" element={<AdminInjuryManager />} />
        <Route path="/:lang/diets" element={<DietsRegimensPage />} />
        <Route path="/:lang/insights/:slug" element={<ArticlePage />} />
        <Route path="/:lang/studio/articles" element={<ArticleStudioPage />} />
        <Route path="/:lang/assistant" element={<AssistantPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/:lang/auth" element={<AuthPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/:lang/dashboard" element={<TrackingDashboardPage />} />

        {/* Legacy routes without language prefix - redirect to language-prefixed versions */}
        <Route path="/calculators" element={<LegacyRouteRedirect />} />
        <Route path="/privacy" element={<LegacyRouteRedirect />} />
        <Route path="/terms" element={<LegacyRouteRedirect />} />
        <Route path="/cookies" element={<LegacyRouteRedirect />} />
        <Route path="/disclaimer" element={<LegacyRouteRedirect />} />
        <Route path="/about" element={<LegacyRouteRedirect />} />
        <Route path="/contact" element={<LegacyRouteRedirect />} />
        <Route path="/insights" element={<LegacyRouteRedirect />} />
        <Route path="/injury-protocols" element={<LegacyRouteRedirect />} />
        <Route path="/injuries" element={<LegacyRouteRedirect />} />
        <Route path="/injuries/:slug" element={<LegacyRouteRedirect />} />
        <Route path="/insights/:slug" element={<LegacyRouteRedirect />} />
        <Route path="/studio/articles" element={<LegacyRouteRedirect />} />
        <Route path="/assistant" element={<LegacyRouteRedirect />} />
        <Route path="/auth" element={<LegacyRouteRedirect />} />
        <Route path="/dashboard" element={<LegacyRouteRedirect />} />
        <Route path="/diets" element={<LegacyRouteRedirect />} />

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
