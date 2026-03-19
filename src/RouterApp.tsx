import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import HomeRoute from './pages/HomeRoute';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import MedicalDisclaimer from './pages/MedicalDisclaimer';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ArticlePage from './pages/ArticlePage';
import InsightsPage from './pages/InsightsPage';
import AssistantPage from './pages/AssistantPage';
import NotFound from './pages/NotFound';
import TrackingDashboardPage from './pages/TrackingDashboardPage';
import AuthPage from './pages/AuthPage';

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
      <Route path="/insights/:slug" element={<ArticlePage />} />
      <Route
        path="/assistant"
        element={<AssistantPage theme={theme} onToggleTheme={toggleTheme} />}
      />
      <Route path="/auth" element={<AuthPage theme={theme} onToggleTheme={toggleTheme} />} />
      <Route path="/dashboard" element={<TrackingDashboardPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
