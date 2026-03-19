import {memo} from 'react';
import {Link} from 'react-router-dom';
import {Facebook, HeartPulse, Instagram, Mail, MapPin, ShieldAlert} from 'lucide-react';
import type {Language} from '../../services/translations';

const Footer = memo(({t, lang}: {t: any; lang: Language}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-slate-900 pb-12 pt-24">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-10">
        <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-health-green blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-medical-blue blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-health-green shadow-lg shadow-health-green/20">
                <HeartPulse className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">PhysioHub</span>
            </div>
            <p className="max-w-xs leading-relaxed text-slate-400">
              {lang === 'en'
                ? 'Educational tools and clinical insights for recovery, nutrition, and safer decision support.'
                : 'أدوات تعليمية ورؤى عملية للتعافي والتغذية ودعم القرار الصحي بشكل أوضح وأكثر أمانًا.'}
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                {lang === 'en' ? 'Follow PhysioNutrition' : 'تابع PhysioNutrition'}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.facebook.com/Physionutrition.official/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-300 transition-colors hover:text-health-green"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/physionutrition.official/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-300 transition-colors hover:text-health-green"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-8 text-lg font-bold text-white">{t.footer.categories.product}</h3>
            <ul className="space-y-4">
              {[
                {label: t.footer.links.calculators, href: '#calculators'},
                {label: t.footer.links.insights, href: '#blog'},
                {label: t.footer.links.architect, href: '#architect'},
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-slate-400 transition-colors hover:text-health-green"
                  >
                    <div className="h-1.5 w-1.5 scale-0 rounded-full bg-health-green transition-transform group-hover:scale-100" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-8 text-lg font-bold text-white">{t.footer.categories.company}</h3>
            <ul className="space-y-4">
              {[
                {label: t.footer.links.about, href: '/about'},
                {label: t.footer.links.contact, href: '/contact'},
                {label: t.footer.links.privacy, href: '/privacy'},
                {label: t.footer.links.terms, href: '/terms'},
                {
                  label: lang === 'en' ? 'Medical Disclaimer' : 'إخلاء المسؤولية الطبي',
                  href: '/disclaimer',
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-2 text-slate-400 transition-colors hover:text-health-green"
                  >
                    <div className="h-1.5 w-1.5 scale-0 rounded-full bg-health-green transition-transform group-hover:scale-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-8 text-lg font-bold text-white">{t.footer.categories.contact}</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-health-green">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="mb-1 text-xs uppercase tracking-widest text-slate-500">
                    {lang === 'en' ? 'Email' : 'البريد الإلكتروني'}
                  </div>
                  <a
                    href="mailto:physionutritionofficial@gmail.com"
                    className="text-slate-300 transition-colors hover:text-health-green"
                  >
                    physionutritionofficial@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-purple-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="mb-1 text-xs uppercase tracking-widest text-slate-500">
                    {lang === 'en' ? 'Availability' : 'التواجد'}
                  </div>
                  <span className="text-slate-300">{lang === 'en' ? 'Remote / Online' : 'عن بعد / أونلاين'}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 py-10">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:p-8">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-500/10">
              <ShieldAlert className="h-8 w-8 text-amber-500" />
            </div>
            <div className="text-center md:text-left">
              <h4 className="mb-2 font-bold text-white">{t.footer.disclaimerTitle}</h4>
              <p className="text-sm leading-relaxed text-slate-400">{t.footer.disclaimerText}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-12 md:flex-row">
          <p className="text-sm text-slate-500">
            © {currentYear} PhysioHub. {t.footer.rights}
          </p>
          <div className="flex items-center gap-8">
            <Link replace to="/privacy" className="text-sm text-slate-500 transition-colors hover:text-white">
              {t.footer.links.privacy}
            </Link>
            <Link replace to="/terms" className="text-sm text-slate-500 transition-colors hover:text-white">
              {t.footer.links.terms}
            </Link>
            <Link replace to="/cookies" className="text-sm text-slate-500 transition-colors hover:text-white">
              {lang === 'en' ? 'Cookie Policy' : 'سياسة الكوكيز'}
            </Link>
            <Link replace to="/disclaimer" className="text-sm text-slate-500 transition-colors hover:text-white">
              {lang === 'en' ? 'Medical Disclaimer' : 'إخلاء المسؤولية الطبي'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
