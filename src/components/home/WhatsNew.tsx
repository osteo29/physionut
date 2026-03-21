import {memo} from 'react';
import {motion} from 'motion/react';
import {Brain, ChevronRight, ClipboardList, Sparkles, Zap} from 'lucide-react';
import {Link} from 'react-router-dom';
import type {Language} from '../../services/translations';

const WhatsNew = memo(({lang}: {lang: Language}) => {
  const updates =
    lang === 'en'
      ? [
          {
            title: 'PhysioNutrition Architect',
            desc: 'An integrated health and recovery dashboard powered by AI.',
            icon: Brain,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
            href: '#architect',
          },
          {
            title: 'Injury Recovery Protocols',
            desc: 'Structured rehab nutrition guidance for common physical therapy injuries.',
            icon: ClipboardList,
            color: 'text-health-green',
            bg: 'bg-health-green/10',
            href: '/injuries',
          },
          {
            title: 'AI Diet Plans',
            desc: 'Generate personalized recovery plans using Gemini AI.',
            icon: Sparkles,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            href: '#architect',
          },
        ]
      : [
          {
            title: 'مهندس التغذية العلاجية',
            desc: 'لوحة تجمع الصحة والتعافي والمتابعة في مكان واحد بدعم من الذكاء الاصطناعي.',
            icon: Brain,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
            href: '#architect',
          },
          {
            title: 'بروتوكولات الإصابات والتعافي',
            desc: 'إرشاد منظم للتغذية العلاجية في إصابات العلاج الطبيعي الشائعة ومراحل التعافي.',
            icon: ClipboardList,
            color: 'text-health-green',
            bg: 'bg-health-green/10',
            href: '/injuries',
          },
          {
            title: 'خطط غذائية ذكية',
            desc: 'أنشئ خطة تعافٍ أو تغذية أكثر تخصيصًا باستخدام الذكاء الاصطناعي.',
            icon: Sparkles,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            href: '#architect',
          },
        ];

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-medical-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-medical-blue">
              <Zap className="h-3 w-3" />
              <span>{lang === 'en' ? "What's New" : 'ما الجديد'}</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {lang === 'en' ? 'Latest Platform Updates' : 'آخر تحديثات المنصة'}
            </h2>
          </div>
          <p className="max-w-md text-slate-500">
            {lang === 'en'
              ? 'We keep refining the platform to make nutrition, rehab, and follow-up tools easier to use.'
              : 'نطوّر المنصة باستمرار لتكون أدوات التغذية والتأهيل والمتابعة أوضح وأسهل في الاستخدام.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {updates.map((update, idx) => (
            <motion.div
              key={idx}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: idx * 0.1}}
              whileHover={{y: -8}}
              className="group block rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50"
            >
              <div
                className={`${update.bg} mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110`}
              >
                <update.icon className={`h-8 w-8 ${update.color}`} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-health-green">
                {update.title}
              </h3>
              <p className="mb-6 leading-relaxed text-slate-600">{update.desc}</p>
              {update.href.startsWith('#') ? (
                <a
                  href={update.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-health-green opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <span>{lang === 'en' ? 'Explore Feature' : 'استكشف الميزة'}</span>
                  <ChevronRight className={`h-4 w-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </a>
              ) : (
                <Link
                  to={update.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-health-green opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <span>{lang === 'en' ? 'Explore Feature' : 'استكشف الميزة'}</span>
                  <ChevronRight className={`h-4 w-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

WhatsNew.displayName = 'WhatsNew';

export default WhatsNew;
