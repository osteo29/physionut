import Seo from '../components/seo/Seo';
import ChatPanel from '../components/ai/ChatPanel';
import usePreferredLang from './usePreferredLang';
import {Link} from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  HeartPulse,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function AssistantPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';

  const quickActions = isAr
    ? [
        {
          label: 'خطة تعافي',
          prompt: 'أعطني خطوات عملية للتعافي بعد إصابة رياضية خفيفة مع نصائح تغذية.',
        },
        {
          label: 'تحليل نتيجة',
          prompt: 'اشرح لي نتيجة BMI أو السعرات اليومية بطريقة بسيطة وما الذي أفعله بعدها.',
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
            'Give me a practical recovery plan for a mild sports injury with nutrition tips.',
        },
        {
          label: 'Explain a result',
          prompt:
            'Explain a BMI or daily calorie result in simple terms and what to do next.',
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
          title: 'إجابات أسرع',
          desc: 'ابدأ من سؤال جاهز بدل الكتابة من الصفر.',
        },
        {
          icon: ShieldCheck,
          title: 'لغة آمنة',
          desc: 'الإجابات موجهة للتوعية وليست للتشخيص.',
        },
        {
          icon: ClipboardList,
          title: 'أكثر عملية',
          desc: 'اطلب خطوات يومية، وجبات، أو تفسير نتائجك مباشرة.',
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
          title: 'Safer framing',
          desc: 'Answers are educational and not intended as diagnosis.',
        },
        {
          icon: ClipboardList,
          title: 'More practical',
          desc: 'Ask for day-to-day actions, meals, or result interpretation.',
        },
      ];

  return (
    <div className="min-h-screen bg-soft-blue flex flex-col">
      <Seo
        title={isAr ? 'مساعد PhysioHub الذكي' : 'PhysioHub AI Assistant'}
        description={
          isAr
            ? 'اسأل مساعدًا متخصصًا في العلاج الطبيعي والتغذية العلاجية عن نتائج الحاسبات والتعافي والتغذية.'
            : 'Ask a Senior Physical Therapist and Clinical Nutritionist about clinical calculators, recovery nutrition, and training.'
        }
        canonicalPath="/assistant"
      />

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-health-green p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Physio<span className="text-health-green">Hub</span>
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-health-green transition-colors"
          >
            {isAr ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {isAr ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase rounded-full border border-amber-200">
                {isAr ? 'نسخة تجريبية' : 'Beta Version'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              {isAr ? 'مساعد PhysioHub' : 'PhysioHub Assistant'}
            </h1>
            <p className="text-slate-600 mt-2 max-w-2xl text-sm sm:text-base">
              {isAr
                ? 'تحدث مع مساعد متخصص في العلاج الطبيعي والتغذية العلاجية. اسأل عن التعافي، التدريب، والتغذية.'
                : 'Chat with a senior Physical Therapist and Clinical Nutritionist. Ask about recovery, training, and nutrition.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-2xl bg-soft-blue text-health-green flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-slate-900 mb-1">{item.title}</h2>
                <p className="text-sm text-slate-600 leading-6">{item.desc}</p>
              </div>
            ))}
          </div>

          <ChatPanel
            title={isAr ? 'المساعد الذكي' : 'AI Assistant'}
            systemPrompt="You are a Senior Physical Therapist and Clinical Nutritionist. Provide evidence-based, practical guidance. Do not diagnose. Ask clarifying questions when needed."
            disclaimer={
              isAr
                ? 'هذا الذكاء الاصطناعي لأغراض تعليمية فقط. استشر طبيبًا لاتخاذ قرارات طبية.'
                : 'This AI is for educational purposes. Consult a doctor for medical decisions.'
            }
            className="flex-1 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden border border-slate-100"
            initialMessage={
              isAr
                ? 'مرحبًا، أنا هنا لمساعدتك في أسئلة العلاج الطبيعي والتغذية. كيف يمكنني دعمك اليوم؟'
                : 'Hi, I am here to help with physical therapy and nutrition questions. How can I assist you today?'
            }
            analyticsMeta={{source: 'assistant_page'}}
            lang={lang}
            quickActions={quickActions}
          />
        </div>
      </div>
    </div>
  );
}
