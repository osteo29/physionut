import Seo from '../components/seo/Seo';
import ChatPanel from '../components/ai/ChatPanel';
import usePreferredLang from './usePreferredLang';
import { Link } from 'react-router-dom';
import { HeartPulse, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AssistantPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';

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

      {/* Navigation Header */}
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
          {/* Page Title Section */}
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

          {/* Chat Interface */}
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
                ? 'مرحبًا دكتور—أنا هنا لمساعدتك في أي استفسار يخص العلاج الطبيعي والتغذية. كيف يمكنني دعمك اليوم؟'
                : 'Hi—I am here to help with any physical therapy or nutrition queries. How can I assist you today?'
            }
            analyticsMeta={{source: 'assistant_page'}}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}