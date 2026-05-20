import {memo} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, BarChart3, Bot, ClipboardList, Sparkles} from 'lucide-react';
import type {Language} from '../../services/translations';
import {navigationPaths} from '../../utils/langUrlHelper';

const Hero = memo(({lang}: {lang: Language}) => {
  const isAr = lang === 'ar';

  const proofPoints = isAr
    ? ['بروتوكولات إصابات عملية', 'تغذية وتأهيل في نفس المسار', 'متابعة أوضح بعد كل خطوة']
    : ['Practical injury protocols', 'Nutrition and rehab in one flow', 'Clearer follow-up after each step'];

  const spotlightCards = isAr
    ? [
        {
          title: 'ابدأ من البروتوكول المناسب',
          description: 'صفحات إصابات مرتبة حسب التعافي بدل التشتت بين أدوات كثيرة.',
          href: navigationPaths.injuries(lang),
          icon: ClipboardList,
        },
        {
          title: 'راجع تقدمك بسرعة',
          description: 'لوحة متابعة أخف بصريًا وتخليك تعرف أنت وصلت لفين.',
          href: navigationPaths.dashboard(lang),
          icon: BarChart3,
        },
      ]
    : [
        {
          title: 'Start from the right protocol',
          description: 'Recovery pages are organized around the injury journey, not scattered tools.',
          href: navigationPaths.injuries(lang),
          icon: ClipboardList,
        },
        {
          title: 'Check progress faster',
          description: 'A lighter tracking view helps you see what changed at a glance.',
          href: navigationPaths.dashboard(lang),
          icon: BarChart3,
        },
      ];

  return (
    <section className="hero-surface home-band relative overflow-hidden pb-14 pt-10 text-white sm:pb-18 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,172,86,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_18%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 translate-x-1/4 -translate-y-1/4 rounded-full bg-health-green/18 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 -translate-x-1/4 translate-y-1/4 rounded-full bg-white/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-center">
          <div className={`max-w-3xl ${isAr ? 'lg:text-right' : 'lg:text-left'}`}>
            <div className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-100 sm:text-xs">
              <Sparkles className="h-4 w-4 text-health-green" />
              <span>{isAr ? 'هوية جديدة وتجربة أوضح للتعافي' : 'Refined identity for recovery-first care'}</span>
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:text-[4.2rem]">
              {isAr ? 'التعافي بواجهة' : 'Recovery with a'}{' '}
              <span className="brand-metal-text">{isAr ? 'أقوى وأوضح' : 'sharper identity'}</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              {isAr
                ? 'Active Rehab الآن أقرب لشخصية اللوجو الجديد: واجهة أنضف، حضور بصري أقوى، ومسار واضح يبدأ من الإصابة ثم ينتقل للتغذية والمتابعة بدون ازدحام.'
                : 'Active Rehab now feels closer to the new logo: cleaner structure, stronger visual presence, and a homepage that guides people from injury support into nutrition and follow-up without clutter.'}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {proofPoints.map((point) => (
                <div
                  key={point}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3.5 py-2 text-xs font-semibold text-slate-100 backdrop-blur sm:text-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-health-green" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={navigationPaths.injuries(lang)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-health-green px-5 py-3.5 text-sm font-bold text-slate-950 shadow-[0_18px_36px_rgba(196,154,66,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-[#d3aa54]"
              >
                <ClipboardList className="h-5 w-5" />
                <span>{isAr ? 'ابدأ ببروتوكولات الإصابات' : 'Explore injury protocols'}</span>
              </Link>
              <a
                href="#calculators"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/16"
              >
                <ArrowRight className={`h-5 w-5 ${isAr ? 'rotate-180' : ''}`} />
                <span>{isAr ? 'افتح الحاسبات' : 'Open calculators'}</span>
              </a>
            </div>

            <div className="mt-5">
              <Link
                to={navigationPaths.assistant(lang)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-100 transition-colors hover:text-white"
              >
                <Bot className="h-4 w-4 text-health-green" />
                <span>{isAr ? 'أو اسأل المساعد السريري مباشرة' : 'Or jump straight into the clinical assistant'}</span>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="panel-strong overflow-hidden rounded-[2.4rem] p-4">
              <div className="overflow-hidden rounded-[1.9rem] border border-white/8">
                <img
                  src="/brand-cover.jpg"
                  alt="Active Rehab brand cover"
                  className="h-full min-h-[280px] w-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="brand-divider my-4" />
              <div className="grid gap-3 sm:grid-cols-2">
                {spotlightCards.map((card) => (
                  <Link
                    key={card.title}
                    to={card.href}
                    className="rounded-[1.6rem] border border-white/10 bg-white/6 p-4 transition-colors hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-health-green">
                        <card.icon className="h-5 w-5" />
                      </div>
                      <ArrowRight className={`h-4 w-4 text-white/35 ${isAr ? 'rotate-180' : ''}`} />
                    </div>
                    <div className="mt-4 text-base font-bold text-white">{card.title}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{card.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
