import {memo} from 'react';
import {motion} from 'motion/react';
import {BookOpenCheck, ExternalLink, ShieldCheck, TriangleAlert} from 'lucide-react';
import type {Language} from '../../services/translations';

const TrustSection = memo(({lang}: {lang: Language}) => {
  const isAr = lang === 'ar';

  const sources = [
    {
      name: 'World Health Organization',
      short: 'WHO',
      href: 'https://www.who.int',
      desc: isAr
        ? 'مرجع للصحة العامة، النشاط البدني، وسلامة التوصيات.'
        : 'Reference point for public health, physical activity, and safety framing.',
    },
    {
      name: 'National Institutes of Health',
      short: 'NIH',
      href: 'https://www.nih.gov',
      desc: isAr
        ? 'مرجع موثوق للمعلومات الصحية والأبحاث الطبية.'
        : 'Trusted source for medical research and health information.',
    },
    {
      name: 'PubMed',
      short: 'PubMed',
      href: 'https://pubmed.ncbi.nlm.nih.gov',
      desc: isAr
        ? 'قاعدة أبحاث نستخدمها لبناء المحتوى والتحقق من الاتجاهات العلمية.'
        : 'Research database used to ground content and review scientific direction.',
    },
  ];

  const principles = isAr
    ? [
        'هذا الموقع تعليمي وإرشادي ولا يغني عن الاستشارة الطبية.',
        'النتائج تحفظية وتهدف للمساعدة على الفهم والتخطيط، لا للتشخيص.',
        'أي توصية مهمة يجب مراجعتها مع طبيب أو أخصائي علاج طبيعي أو تغذية.',
      ]
    : [
        'This website is educational and does not replace medical advice.',
        'Results are intentionally conservative to support planning, not diagnosis.',
        'Important decisions should still be reviewed with a doctor, physio, or dietitian.',
      ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-8">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-health-green/10 text-health-green text-xs font-bold uppercase tracking-[0.18em] mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'الأمان والموثوقية' : 'Safety and trust'}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              {isAr ? 'مصمم ليكون أوضح وأكثر أمانًا' : 'Designed to be clear and medically safer'}
            </h2>
            <p className="text-slate-600 leading-7 mb-5">
              {isAr
                ? 'نبني الحاسبات والمحتوى على مراجع معروفة، ونصيغ النتائج بشكل تحفظي مع تأكيد واضح على أن الأدوات للتوعية وليست للتشخيص.'
                : 'The calculators and educational content are framed around established references, conservative outputs, and clear reminders that the tools are educational rather than diagnostic.'}
            </p>
            <div className="space-y-3">
              {principles.map((item, index) => (
                <div key={item} className="flex items-start gap-3 text-sm text-slate-700 leading-6">
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-xs font-black text-health-green">
                    {index + 1}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sources.map((source, idx) => (
              <motion.a
                key={source.name}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                initial={{opacity: 0, y: 14}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: idx * 0.08}}
                className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-health-green/30 transition-all group"
              >
                <div className="w-11 h-11 rounded-2xl bg-soft-blue text-health-green flex items-center justify-center mb-4">
                  <BookOpenCheck className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="font-bold text-slate-900">{source.short}</div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-health-green transition-colors" />
                </div>
                <div className="text-sm font-semibold text-slate-700 mb-2">{source.name}</div>
                <p className="text-sm text-slate-600 leading-6">{source.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-amber-200 bg-amber-50 p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-amber-600 border border-amber-200 shrink-0">
            <TriangleAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">
              {isAr ? 'تنبيه مهم' : 'Important disclaimer'}
            </h3>
            <p className="text-sm text-slate-700 leading-6">
              {isAr
                ? 'This tool is for educational purposes only and does not replace medical advice. إذا كانت لديك إصابة، أعراض مستمرة، أو دواء يؤثر على التغذية، فالأفضل مراجعة مختص.'
                : 'This tool is for educational purposes only and does not replace medical advice. If you have an injury, persistent symptoms, or medication-related concerns, review the result with a qualified clinician.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

TrustSection.displayName = 'TrustSection';

export default TrustSection;
