import {memo} from 'react';
import type {Language} from '../../services/translations';
import {HeartPulse, ShieldCheck, Target} from 'lucide-react';

interface QuickSection {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}

interface FeaturesShowcaseProps {
  lang: Language;
  quickSections: QuickSection[];
}

const FeaturesShowcase = memo(({lang, quickSections}: FeaturesShowcaseProps) => {
  const isEn = lang === 'en';

  const principles = [
    {
      icon: HeartPulse,
      title: isEn ? 'Recovery first' : 'التعافي أولًا',
      desc: isEn
        ? 'The layout now emphasizes recovery use-cases instead of scattering attention.'
        : 'الترتيب يركز على استخدامات التعافي بدل توزيع الانتباه على أكثر من اتجاه.',
    },
    {
      icon: Target,
      title: isEn ? 'Clearer priorities' : 'أولويات أوضح',
      desc: isEn
        ? 'Each section now has a cleaner role: start, calculate, explore, then follow up.'
        : 'كل قسم له دور أوضح: ابدأ، احسب، استكشف، ثم تابع.',
    },
    {
      icon: ShieldCheck,
      title: isEn ? 'Safer guidance' : 'إرشاد أكثر أمانًا',
      desc: isEn
        ? 'Educational framing stays visible without dominating the whole page.'
        : 'التأطير التعليمي يظل حاضرًا بدون أن يهيمن على الصفحة بالكامل.',
    },
  ];

  return (
    <section className="section-surface home-band relative overflow-hidden bg-slate-50/70 py-16 sm:py-20">
      <div className="absolute right-0 top-0 h-80 w-80 translate-x-1/4 -translate-y-1/4 rounded-full bg-health-green/5 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-health-green">
            {isEn ? 'Core workflow' : 'المسار الأساسي'}
          </div>
          <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
            {isEn ? 'The homepage now leads with the essentials' : 'الواجهة تبدأ الآن بالأساسيات فعلًا'}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            {isEn
              ? 'Jump into the right area faster, with fewer oversized panels and less duplicated messaging.'
              : 'وصل إلى القسم المناسب أسرع، مع بطاقات أقل ازدحامًا ورسائل أقل تكرارًا.'}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
          <div className="grid gap-4 md:grid-cols-3">
            {quickSections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="panel-soft group rounded-[2rem] p-6 transition-[box-shadow,border-color] hover:border-health-green/30 hover:shadow-lg"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-health-green/10 text-health-green">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-black tracking-[0.18em] text-slate-400">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{section.desc}</p>
                <div className="mt-5 text-sm font-semibold text-health-green">
                  {isEn ? 'Open section' : 'افتح القسم'}
                </div>
              </a>
            ))}
          </div>

          <div className="panel-soft rounded-[2rem] p-6">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              {isEn ? 'Why it feels better' : 'لماذا الشكل أفضل'}
            </div>
            <div className="mt-5 space-y-4">
              {principles.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200/80 bg-white/85 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-health-green">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FeaturesShowcase.displayName = 'FeaturesShowcase';

export default FeaturesShowcase;
