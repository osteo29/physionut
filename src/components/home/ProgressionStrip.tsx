import type {Language} from '../../services/translations';
import type {ProgressionStep} from '../../services/progression';

const stepOrder: ProgressionStep[] = ['assess', 'understand', 'save', 'follow_up'];

export default function ProgressionStrip({
  lang,
  activeStep = 'assess',
}: {
  lang: Language;
  activeStep?: ProgressionStep;
}) {
  const activeIndex = stepOrder.indexOf(activeStep);
  const labels =
    lang === 'ar'
      ? [
          {id: 'assess', title: '1. قيّم', desc: 'ابدأ بالحسابات الأساسية'},
          {id: 'understand', title: '2. افهم', desc: 'حوّل النتيجة إلى معنى عملي'},
          {id: 'save', title: '3. احفظ', desc: 'أمّن النتيجة داخل حسابك'},
          {id: 'follow_up', title: '4. تابع', desc: 'ارجع للخطة والتقدم'},
        ]
      : [
          {id: 'assess', title: '1. Assess', desc: 'Start with the core calculators'},
          {id: 'understand', title: '2. Understand', desc: 'Translate the result into action'},
          {id: 'save', title: '3. Save', desc: 'Secure the result in your account'},
          {id: 'follow_up', title: '4. Track recovery', desc: 'Return to your plan and progress'},
        ];

  return (
    <div className="grid gap-3 md:grid-cols-4">
      {labels.map((step, index) => {
        const isActive = index === activeIndex;
        const isComplete = index < activeIndex;

        return (
          <div
            key={step.id}
            className={`rounded-[1.5rem] border p-4 transition-all ${
              isActive
                ? 'border-health-green bg-health-green/10 shadow-sm'
                : isComplete
                  ? 'border-health-green/20 bg-white'
                  : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className={`text-xs font-black uppercase tracking-[0.16em] ${isActive || isComplete ? 'text-health-green-dark' : 'text-slate-400'}`}>
              {step.title}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
