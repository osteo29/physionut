import {memo} from 'react';
import {Link} from 'react-router-dom';
import {
  Facebook,
  Github,
  HeartPulse,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  Twitter,
} from 'lucide-react';
import type {Language} from '../../services/translations';

const Footer = memo(({t, lang}: {t: any; lang: Language}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-health-green rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-medical-blue rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-health-green rounded-2xl flex items-center justify-center shadow-lg shadow-health-green/20">
                <HeartPulse className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                PhysioHub
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              {lang === 'en'
                ? 'Empowering healthcare professionals with precision clinical tools and evidence-based insights.'
                : 'تمكين ممارسي الرعاية الصحية بأدوات سريرية دقيقة ورؤى قائمة على الأدلة.'}
            </p>
            <div className="flex items-center gap-4">
              {[
                {icon: Facebook, href: '#', label: 'Facebook'},
                {icon: Twitter, href: '#', label: 'Twitter'},
                {icon: Instagram, href: '#', label: 'Instagram'},
                {icon: Linkedin, href: '#', label: 'LinkedIn'},
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-health-green hover:text-white hover:border-health-green transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8">
              {t.footer.categories.product}
            </h3>
            <ul className="space-y-4">
              {[
                {label: t.footer.links.calculators, href: '#calculators'},
                {label: t.footer.links.insights, href: '#insights'},
                {label: t.footer.links.architect, href: '#architect'},
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-health-green transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-health-green scale-0 group-hover:scale-100 transition-transform" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8">
              {t.footer.categories.company}
            </h3>
            <ul className="space-y-4">
              {[
                {label: t.footer.links.about, href: '#about'},
                {label: t.footer.links.contact, href: '#contact'},
                {label: t.footer.links.privacy, href: '/privacy', isRoute: true},
                {label: t.footer.links.terms, href: '/terms', isRoute: true},
                {
                  label: lang === 'en' ? 'Medical Disclaimer' : 'إخلاء المسؤولية الطبي',
                  href: '/disclaimer',
                  isRoute: true,
                },
              ].map((link, idx) => (
                <li key={idx}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-health-green transition-colors flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-health-green scale-0 group-hover:scale-100 transition-transform" />
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-health-green transition-colors flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-health-green scale-0 group-hover:scale-100 transition-transform" />
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8">
              {t.footer.categories.contact}
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-health-green group-hover:bg-health-green group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">
                    {lang === 'en' ? 'Email Us' : 'راسلنا'}
                  </div>
                  <a
                    href="mailto:contact@physiohub.com"
                    className="text-slate-300 hover:text-health-green transition-colors"
                  >
                    contact@physiohub.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-medical-blue group-hover:bg-medical-blue group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">
                    {lang === 'en' ? 'Call Us' : 'اتصل بنا'}
                  </div>
                  <a
                    href="tel:+1234567890"
                    className="text-slate-300 hover:text-medical-blue transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">
                    {lang === 'en' ? 'Location' : 'الموقع'}
                  </div>
                  <span className="text-slate-300">
                    {lang === 'en' ? 'Remote / Online' : 'عن بعد / أونلاين'}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="py-10 border-t border-white/5">
          <div className="bg-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 border border-white/10">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-8 h-8 text-amber-500" />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold mb-2">
                {t.footer.disclaimerTitle}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.footer.disclaimerText}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {currentYear} PhysioHub. {t.footer.rights}
          </p>
          <div className="flex items-center gap-8">
            <Link
              replace
              to="/privacy"
              className="text-slate-500 hover:text-white text-sm transition-colors"
            >
              {t.footer.links.privacy}
            </Link>
            <Link
              replace
              to="/terms"
              className="text-slate-500 hover:text-white text-sm transition-colors"
            >
              {t.footer.links.terms}
            </Link>
            <Link
              replace
              to="/cookies"
              className="text-slate-500 hover:text-white text-sm transition-colors"
            >
              {lang === 'en' ? 'Cookie Policy' : 'سياسة ملفات الارتباط'}
            </Link>
            <Link
              replace
              to="/disclaimer"
              className="text-slate-500 hover:text-white text-sm transition-colors"
            >
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

