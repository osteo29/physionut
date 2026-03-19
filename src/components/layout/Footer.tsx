import {memo} from 'react';
import {Link} from 'react-router-dom';
import {HeartPulse, Mail, MapPin, ShieldAlert} from 'lucide-react';
import type {Language} from '../../services/translations';

const Footer = memo(({t, lang}: {t: any; lang: Language}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-slate-900 pb-12 pt-24">
      <div className="absolute left-0 top-0 h-full w-full pointer-events-none opacity-10">
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
              <span className="text-2xl font-black tracking-tighter text-white">
                PhysioHub
              </span>
            </div>
            <p className="max-w-xs leading-relaxed text-slate-400">
              {lang === 'en'
                ? 'Educational tools and clinical insights for recovery, nutrition, and safer decision support.'
                : 'Ø£Ø¯ÙˆØ§Øª ØªØ¹Ù„ÙŠÙ…ÙŠØ© ÙˆØ±Ø¤Ù‰ Ø³Ø±ÙŠØ±ÙŠØ© Ù„Ù„ØªØ¹Ø§ÙÙŠ ÙˆØ§Ù„ØªØºØ°ÙŠØ© ÙˆØ¯Ø¹Ù… Ø§Ù„Ù‚Ø±Ø§Ø± Ø¨ØµÙŠØ§ØºØ© Ø£ÙƒØ«Ø± Ø£Ù…Ø§Ù†Ù‹Ø§.'}
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">
              {lang === 'en'
                ? 'Official Facebook, Instagram, and TikTok links will be added after the profiles are published.'
                : 'Ø³ÙŠØªÙ… Ø¥Ø¶Ø§ÙØ© Ø±ÙˆØ§Ø¨Ø· ÙÙŠØ³Ø¨ÙˆÙƒ ÙˆØ¥Ù†Ø³ØªØ¬Ø±Ø§Ù… ÙˆØªÙŠÙƒ ØªÙˆÙƒ Ø¨Ø¹Ø¯ Ù†Ø´Ø± Ø§Ù„ØµÙØ­Ø§Øª Ø§Ù„Ø±Ø³Ù…ÙŠØ©.'}
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
                  label: lang === 'en' ? 'Medical Disclaimer' : 'Ø¥Ø®Ù„Ø§Ø¡ Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ© Ø§Ù„Ø·Ø¨ÙŠ',
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
                    {lang === 'en' ? 'Email' : 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ'}
                  </div>
                  <a
                    href="mailto:contact@physiohub.com"
                    className="text-slate-300 transition-colors hover:text-health-green"
                  >
                    contact@physiohub.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-purple-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="mb-1 text-xs uppercase tracking-widest text-slate-500">
                    {lang === 'en' ? 'Availability' : 'Ø§Ù„ØªÙˆØ§Ø¬Ø¯'}
                  </div>
                  <span className="text-slate-300">
                    {lang === 'en' ? 'Remote / Online' : 'Ø¹Ù† Ø¨ÙØ¹Ø¯ / Ø£ÙˆÙ†Ù„Ø§ÙŠÙ†'}
                  </span>
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
              {lang === 'en' ? 'Cookie Policy' : 'Ø³ÙŠØ§Ø³Ø© Ù…Ù„ÙØ§Øª Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø·'}
            </Link>
            <Link replace to="/disclaimer" className="text-sm text-slate-500 transition-colors hover:text-white">
              {lang === 'en' ? 'Medical Disclaimer' : 'Ø¥Ø®Ù„Ø§Ø¡ Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ© Ø§Ù„Ø·Ø¨ÙŠ'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
