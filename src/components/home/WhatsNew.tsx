import {memo} from 'react';
import {motion} from 'motion/react';
import {
  Brain,
  ChevronRight,
  ClipboardList,
  Sparkles,
  Zap,
} from 'lucide-react';
import type {Language} from '../../services/translations';

const WhatsNew = memo(({lang}: {lang: Language}) => {
  const updates =
    lang === 'en'
      ? [
          {
            title: 'PhysioNutrition Architect',
            desc: 'New integrated health and recovery dashboard powered by AI.',
            icon: Brain,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
            href: '#architect',
          },
          {
            title: 'Injury Database',
            desc: 'Detailed nutrition protocols for common physical therapy injuries.',
            icon: ClipboardList,
            color: 'text-health-green',
            bg: 'bg-health-green/10',
            href: '#architect',
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
            desc: 'لوحة تحكم متكاملة للصحة والتعافي مدعومة بالذكاء الاصطناعي.',
            icon: Brain,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
            href: '#architect',
          },
          {
            title: 'قاعدة بيانات الإصابات',
            desc: 'بروتوكولات تغذية مفصلة لإصابات العلاج الطبيعي الشائعة.',
            icon: ClipboardList,
            color: 'text-health-green',
            bg: 'bg-health-green/10',
            href: '#architect',
          },
          {
            title: 'خطط غذائية ذكية',
            desc: 'أنشئ خطط تعافٍ مخصصة باستخدام ذكاء Gemini الاصطناعي.',
            icon: Sparkles,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            href: '#architect',
          },
        ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-blue/10 text-medical-blue text-xs font-bold mb-4 uppercase tracking-wider">
              <Zap className="w-3 h-3" />
              <span>{lang === 'en' ? "What's New" : 'ما الجديد'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {lang === 'en' ? 'Latest Platform Updates' : 'آخر تحديثات المنصة'}
            </h2>
          </div>
          <p className="text-slate-500 max-w-md">
            {lang === 'en'
              ? 'We are constantly evolving to provide the best tools for clinical excellence.'
              : 'نحن نتطور باستمرار لتوفير أفضل الأدوات للتميز السريري.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {updates.map((update, idx) => (
            <motion.a
              key={idx}
              href={update.href}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: idx * 0.1}}
              whileHover={{y: -8}}
              className="group block p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div
                className={`${update.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
              >
                <update.icon className={`w-8 h-8 ${update.color}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-health-green transition-colors">
                {update.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {update.desc}
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-health-green opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{lang === 'en' ? 'Explore Feature' : 'استكشف الميزة'}</span>
                <ChevronRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
});

WhatsNew.displayName = 'WhatsNew';

export default WhatsNew;
