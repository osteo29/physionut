import {memo} from 'react';
import type {Language} from '../../services/translations';
import {ArrowRight, HeartPulse, ShieldCheck, Target} from 'lucide-react';

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
      title: isEn ? 'Recovery-first structure' : 'ترتيب يبدأ من التعافي',
      desc: isEn
        ? 'The homepage now highlights the actions people usually need first instead of flattening everything into one long scroll.'
        : 'الواجهة الآن تبرز الخطوات التي يحتاجها المستخدم أولًا بدل وضع كل شيء بنفس الوزن البصري.',
    },
    {
      icon: Target,
      title: isEn ? 'Sharper visual hierarchy' : 'أولوية بصرية أوضح',
      desc: isEn
        ? 'Dark-gold brand accents create stronger focus around actions, sections, and transition points.'
        : 'الهوية الداكنة مع اللمسات الذهبية توضح مناطق الحركة والانتقال بين الأقسام بشكل أفضل.',
    },
    {
      icon: ShieldCheck,
      title: isEn ? 'Professional medical tone' : 'طابع مهني أنضف',
      desc: isEn
        ? 'The brand feels more clinical and premium without losing the educational safety framing.'
        : 'الهوية أصبحت أقرب لعلامة احترافية في التأهيل مع الحفاظ على الطابع التعليمي الآمن.',
    },
  ];

  return (
    <section className="section-surface home-band relative overflow-hidden bg-transparent py-16 sm:py-20">
      <div className="absolute right-0 top-0 h-80 w-80 translate-x-1/4 -translate-y-1/4 rounded-full bg-health-green/8 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-health-green">
            {isEn ? 'One clear entry point' : 'بداية واحدة واضحة'}
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {isEn ? 'Everything important is easier to reach from the first screen' : 'كل ما يهم أصبح أقرب من أول شاشة'}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            {isEn
              ? 'Instead of repeating similar blocks, the homepage now routes visitors into the right area with stronger emphasis and calmer spacing.'
              : 'بدل تكرار بطاقات متشابهة، الصفحة الرئيسية توجه الزائر الآن إلى القسم الصحيح بهوية أقوى ومسافات أهدأ.'}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="grid gap-4 md:grid-cols-3">
            {quickSections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="panel-soft group rounded-[2rem] p-6 transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-health-green/30 hover:shadow-lg"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-health-green shadow-sm">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-black tracking-[0.18em] text-slate-400">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{section.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-health-green">
                  <span>{isEn ? 'Open section' : 'افتح القسم'}</span>
                  <ArrowRight className={`h-4 w-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </div>
              </a>
            ))}
          </div>

          <div className="panel-strong rounded-[2rem] p-6 text-white">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-amber-100/80">
              {isEn ? 'Why the new identity works' : 'لماذا الهوية الجديدة أفضل'}
            </div>
            <div className="mt-5 space-y-4">
              {principles.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 text-health-green">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{item.desc}</p>
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
