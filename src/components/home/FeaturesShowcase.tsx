import { memo } from 'react';
import type { Language } from '../../services/translations';
import { ShieldCheck, Target, HeartPulse } from 'lucide-react';

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

const FeaturesShowcase = memo(({ lang, quickSections }: FeaturesShowcaseProps) => {
  const isEn = lang === 'en';

  const features = [
    {
      icon: HeartPulse,
      title: isEn ? 'Built for rehab and recovery' : 'مصمم للتعافي وإعادة التأهيل',
      desc: isEn
        ? 'The positioning is now centered around injured users, recovery, and physio workflows.'
        : 'تم توجيه الرسالة لتناسب المصابين، التعافي، وسيناريوهات العلاج الطبيعي.',
    },
    {
      icon: Target,
      title: isEn ? 'Clinical formulas + context' : 'معادلات سريرية + سياق',
      desc: isEn
        ? 'Results are based on established formulas, then translated into easier next actions.'
        : 'النتائج مبنية على معادلات معروفة، ثم تتحول إلى خطوات أوضح وأسهل.',
    },
    {
      icon: ShieldCheck,
      title: isEn ? 'Educational, not diagnostic' : 'إرشادي وليس تشخيصيًا',
      desc: isEn
        ? 'Useful for planning and education, while medical decisions should still involve professionals.'
        : 'مفيد للتخطيط والتوعية، مع بقاء القرارات الطبية عند المختصين.',
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-slate-50/50 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-health-green/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-medical-blue/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Quick Sections Bento Grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">
              {isEn ? 'Core Tools' : 'الأدوات الأساسية'}
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
              {isEn 
                ? 'Everything you need for precise tracking and recovery.'
                : 'كل ما تحتاجه لتتبع دقيق وتعافي أسرع.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickSections.map((section, idx) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-sm border border-slate-100 hover:border-health-green/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <section.icon className="w-32 h-32 text-health-green" />
                </div>
                
                <div>
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-soft-blue to-health-green/10 text-health-green shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{section.title}</h3>
                  <p className="text-base leading-relaxed text-slate-600 relative z-10">{section.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Philosophy Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item) => (
            <div 
              key={item.title} 
              className="relative overflow-hidden rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <item.icon className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

FeaturesShowcase.displayName = 'FeaturesShowcase';

export default FeaturesShowcase;
