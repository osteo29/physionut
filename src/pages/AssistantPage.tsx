import Seo from '../components/seo/Seo';
import ChatPanel from '../components/ai/ChatPanel';
import usePreferredLang from './usePreferredLang';

export default function AssistantPage() {
  const lang = usePreferredLang();
  return (
    <div className="min-h-screen bg-soft-blue">
      <Seo
        title={lang === 'en' ? 'PhysioHub Assistant' : 'مساعد PhysioHub'}
        description={
          lang === 'en'
            ? 'Ask a Senior Physical Therapist and Clinical Nutritionist about clinical calculators, recovery nutrition, and training.'
            : 'اسأل مساعدًا متخصصًا في العلاج الطبيعي والتغذية العلاجية عن نتائج الحاسبات والتعافي والتغذية.'
        }
        canonicalPath="/assistant"
      />

      <div className="min-h-screen flex flex-col">
        <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              {lang === 'en' ? 'PhysioHub Assistant' : 'مساعد PhysioHub'}
            </h1>
            <p className="text-slate-600 mt-2 max-w-2xl">
              {lang === 'en'
                ? 'Chat with a senior Physical Therapist and Clinical Nutritionist. Ask about recovery, training, nutrition, and how to interpret your results.'
                : 'تحدث مع مساعد متخصص في العلاج الطبيعي والتغذية العلاجية. اسأل عن التعافي، التدريب، التغذية، وكيفية تفسير نتائجك.'}
            </p>
          </div>

          <ChatPanel
            title={lang === 'en' ? 'Standalone Assistant' : 'مساعد مستقل'}
            systemPrompt="You are a Senior Physical Therapist and Clinical Nutritionist. Provide evidence-based, practical guidance. Do not diagnose. Ask clarifying questions when needed."
            disclaimer={
              lang === 'en'
                ? 'This AI is for educational purposes. Consult a doctor for medical decisions.'
                : 'هذا الذكاء الاصطناعي لأغراض تعليمية فقط. استشر طبيبًا لاتخاذ قرارات طبية.'
            }
            className="flex-1"
            initialMessage={
              lang === 'en'
                ? 'Hi—ask me anything about physical therapy and clinical nutrition. If you share your calculator results, I can help interpret them.'
                : 'مرحبًا—اسألني أي شيء عن العلاج الطبيعي والتغذية العلاجية. إذا شاركت نتائج الحاسبات، يمكنني مساعدتك في تفسيرها.'
            }
            analyticsMeta={{source: 'assistant_page'}}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}

