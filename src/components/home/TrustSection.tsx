import {memo} from 'react';
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
    <section className="border-b border-amber-100/60 bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(248,242,232,0.92))] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1.4fr]">
          <div className="panel-soft rounded-[2rem] p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-health-green">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{isAr ? 'الأمان والموثوقية' : 'Safety and trust'}</span>
            </div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900">
              {isAr ? 'مصمم ليكون أوضح وأكثر أمانًا' : 'Designed to be clear and medically safer'}
            </h2>
            <p className="mb-5 leading-7 text-slate-600">
              {isAr
                ? 'نبني الحاسبات والمحتوى على مراجع معروفة، ونصيغ النتائج بشكل تحفظي مع تأكيد واضح على أن الأدوات للتوعية وليست للتشخيص.'
                : 'The calculators and educational content are framed around established references, conservative outputs, and clear reminders that the tools are educational rather than diagnostic.'}
            </p>
            <div className="space-y-3">
              {principles.map((item, index) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-health-green/20 bg-white text-xs font-black text-health-green">
                    {index + 1}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {sources.map((source) => (
              <a
                key={source.name}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[2rem] border border-health-green/12 bg-white/90 p-5 shadow-sm transition-[box-shadow,border-color,transform] hover:-translate-y-1 hover:border-health-green/30 hover:shadow-md"
              >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-health-green">
                  <BookOpenCheck className="h-5 w-5" />
                </div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="font-bold text-slate-900">{source.short}</div>
                  <ExternalLink className="h-4 w-4 text-slate-400 transition-colors group-hover:text-health-green" />
                </div>
                <div className="mb-2 text-sm font-semibold text-slate-700">{source.name}</div>
                <p className="text-sm leading-6 text-slate-600">{source.desc}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-start gap-4 rounded-[2rem] border border-health-green/20 bg-[#fff6e4] p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-health-green/20 bg-white text-health-green">
            <TriangleAlert className="h-5 w-5" />
          </div>
          <div>
            <h3 className="mb-1 font-bold text-slate-900">
              {isAr ? 'تنبيه مهم' : 'Important disclaimer'}
            </h3>
            <p className="text-sm leading-6 text-slate-700">
              {isAr
                ? 'هذه الأداة تعليمية فقط ولا تغني عن الاستشارة الطبية. إذا كانت لديك إصابة، أعراض مستمرة، أو دواء يؤثر على التغذية، فالأفضل مراجعة مختص.'
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
