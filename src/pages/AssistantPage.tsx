import Seo from '../components/seo/Seo';
import ChatPanel from '../components/ai/ChatPanel';
import usePreferredLang from './usePreferredLang';
import {Link} from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  HeartPulse,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
} from 'lucide-react';

export default function AssistantPage({
  theme,
  onToggleTheme,
}: {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}) {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';

  const quickActions = isAr
    ? [
        {
          label: 'خطة تعافي',
          prompt: 'أعطني خطوات عملية للتعافي بعد إصابة رياضية خفيفة مع نصائح تغذية تناسب حالتي.',
        },
        {
          label: 'تحليل نتيجة',
          prompt: 'اشرح لي نتيجة BMI أو السعرات اليومية بطريقة بسيطة وما الذي أفعله بعدها في حالتي.',
        },
        {
          label: 'قبل التمرين',
          prompt: 'ما أفضل وجبة قبل التمرين وبعده إذا كان هدفي تحسين الأداء والتعافي؟',
        },
      ]
    : [
        {
          label: 'Recovery plan',
          prompt:
            'Give me a practical recovery plan for a mild sports injury with nutrition tips tailored to my case.',
        },
        {
          label: 'Explain a result',
          prompt:
            'Explain a BMI or daily calorie result in simple terms and what I should do next in my case.',
        },
        {
          label: 'Pre/post workout',
          prompt:
            'What should I eat before and after training for better performance and recovery?',
        },
      ];

  const highlights = isAr
    ? [
        {
          icon: Sparkles,
          title: 'بداية أسرع',
          desc: 'ابدأ من سؤال جاهز بدل الكتابة من الصفر.',
        },
        {
          icon: ShieldCheck,
          title: 'سياق آمن',
          desc: 'الإجابات تربط الكلام ببياناتك ولا تتعامل معك كنموذج عام.',
        },
        {
          icon: ClipboardList,
          title: 'أكثر عملية',
          desc: 'اسأل عن التعافي، التغذية، أو الخطوات التالية مباشرة.',
        },
      ]
    : [
        {
          icon: Sparkles,
          title: 'Faster start',
          desc: 'Use a suggested prompt instead of starting from scratch.',
        },
        {
          icon: ShieldCheck,
          title: 'Safer context',
          desc: 'Answers are tied to your profile instead of being generic.',
        },
        {
          icon: ClipboardList,
          title: 'More practical',
          desc: 'Ask about recovery, nutrition, or the best next step directly.',
        },
      ];

  return (
    <div className="flex min-h-screen flex-col bg-soft-blue">
      <Seo
        title={isAr ? 'مساعد PhysioHub الذكي' : 'PhysioHub AI Assistant'}
        description={
          isAr
            ? 'اسأل مساعدًا متخصصًا في العلاج الطبيعي والتغذية العلاجية عن التعافي، التدريب، ونتائج الحاسبات.'
            : 'Ask a Senior Physical Therapist and Clinical Nutritionist about recovery, rehab, nutrition, and calculator results.'
        }
        canonicalPath="/assistant"
      />

      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="rounded-lg bg-health-green p-1.5 transition-transform group-hover:scale-110">
              <HeartPulse className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Physio<span className="text-health-green">Hub</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 transition-all hover:border-health-green/30"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden text-xs font-bold sm:inline">
                {theme === 'dark'
                  ? isAr
                    ? 'الوضع الفاتح'
                    : 'Light mode'
                  : isAr
                    ? 'الوضع الداكن'
                    : 'Dark mode'}
              </span>
            </button>

            <Link
              to="/"
              className="flex items-center gap-1 text-sm font-bold text-slate-500 transition-colors hover:text-health-green"
            >
              {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              {isAr ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-5 sm:px-6 lg:px-8">
          <div className="mb-6 rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-sm sm:p-6">
            <div className="mb-3 inline-flex items-center rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-[10px] font-black uppercase text-amber-700">
              {isAr ? 'نسخة تجريبية' : 'Beta version'}
            </div>
            <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
              {isAr ? 'مساعد PhysioHub' : 'PhysioHub Assistant'}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              {isAr
                ? 'مساعد علاجي وغذائي يربط الإجابة بسياق المستخدم قدر الإمكان، مع لغة مهنية آمنة وغير تشخيصية.'
                : 'A recovery-focused assistant that ties answers to the user context whenever possible, with a safe non-diagnostic tone.'}
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white/85 p-4 shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-soft-blue text-health-green">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="mb-1 font-bold text-slate-900">{item.title}</h2>
                <p className="text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <ChatPanel
            title={isAr ? 'المساعد الذكي' : 'AI Assistant'}
            systemPrompt={`You are a Physio-Nutrition Expert. Give personalized educational guidance, not generic advice.

Rules:
1. Tie every answer to the user's weight, age, goal, and injury context when available.
2. Avoid exercise suggestions that conflict with the user's injury.
3. Use a professional and encouraging tone, and address the user by name if available.
4. Do not diagnose or prescribe treatment.
5. End each reply with a short educational disclaimer that it does not replace clinical assessment.`}
            disclaimer={
              isAr
                ? 'هذا الذكاء الاصطناعي لأغراض تعليمية فقط. استشر مختصًا لاتخاذ قرارات طبية.'
                : 'This AI is for educational purposes. Consult a clinician for medical decisions.'
            }
            className="flex-1 overflow-hidden rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50"
            initialMessage={
              isAr
                ? 'مرحبًا، أنا هنا لمساعدتك في أسئلة العلاج الطبيعي والتغذية. كيف يمكنني دعمك اليوم؟'
                : 'Hi, I am here to help with physical therapy and nutrition questions. How can I assist you today?'
            }
            analyticsMeta={{source: 'assistant_page'}}
            lang={lang}
            quickActions={quickActions}
            cacheScope="assistant-page"
          />
        </div>
      </div>
    </div>
  );
}
