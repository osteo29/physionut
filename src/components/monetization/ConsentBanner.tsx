import {useEffect, useState} from 'react';
import {Cookie, ShieldCheck} from 'lucide-react';

type ConsentState = 'accepted' | 'rejected' | null;

export function getStoredConsent(): ConsentState {
  const saved = localStorage.getItem('physiohub_cookie_consent');
  return saved === 'accepted' || saved === 'rejected' ? saved : null;
}

export default function ConsentBanner({lang}: {lang: 'en' | 'ar'}) {
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  if (consent) return null;

  const accept = () => {
    localStorage.setItem('physiohub_cookie_consent', 'accepted');
    setConsent('accepted');
    window.dispatchEvent(new Event('physiohub-consent-change'));
  };

  const reject = () => {
    localStorage.setItem('physiohub_cookie_consent', 'rejected');
    setConsent('rejected');
    window.dispatchEvent(new Event('physiohub-consent-change'));
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[90]">
      <div className="max-w-5xl mx-auto rounded-[2rem] border border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl p-5">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-soft-blue text-health-green flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 mb-1">
                {lang === 'en' ? 'Cookies and ad consent' : 'الموافقة على الكوكيز والإعلانات'}
              </div>
              <p className="text-sm text-slate-600 leading-6">
                {lang === 'en'
                  ? 'We use essential cookies for site preferences and may enable advertising or analytics cookies only with your permission.'
                  : 'نستخدم ملفات ضرورية لتفضيلات الموقع، وقد نفعّل ملفات الإعلانات أو التحليلات فقط بعد موافقتك.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-health-green" />
              <span>
                {lang === 'en'
                  ? 'Educational site, privacy-first'
                  : 'موقع تعليمي مع مراعاة الخصوصية'}
              </span>
            </div>
            <button
              onClick={reject}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:border-slate-300 transition-all"
            >
              {lang === 'en' ? 'Reject non-essential' : 'رفض غير الضروري'}
            </button>
            <button
              onClick={accept}
              className="px-4 py-3 rounded-xl bg-health-green text-white font-bold text-sm hover:bg-health-green-dark transition-all"
            >
              {lang === 'en' ? 'Accept and continue' : 'موافقة ومتابعة'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
