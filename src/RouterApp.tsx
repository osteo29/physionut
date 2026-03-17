import {Route, Routes} from 'react-router-dom';
import HomeRoute from './pages/HomeRoute';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import MedicalDisclaimer from './pages/MedicalDisclaimer';
import NotFound from './pages/NotFound';

export default function RouterApp() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/calculators" element={<HomeRoute scrollToId="calculators" />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/cookies" element={<CookiePolicy />} />
      <Route path="/disclaimer" element={<MedicalDisclaimer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

