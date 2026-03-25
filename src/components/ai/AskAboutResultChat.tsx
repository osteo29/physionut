import ChatPanel from './ChatPanel';

export default function AskAboutResultChat({
  hiddenContext,
  calculatorName,
  lang,
  autoPrompt,
}: {
  hiddenContext: string;
  calculatorName: string;
  lang: 'en' | 'ar';
  autoPrompt?: string | null;
}) {
  const quickActions =
    calculatorName === 'BMI'
      ? [
          {
            label: lang === 'en' ? 'How to improve?' : 'كيف أحسن النتيجة؟',
            prompt:
              lang === 'en'
                ? 'How can I improve this result safely based on my current profile?'
                : 'كيف يمكنني تحسين هذه النتيجة بشكل آمن بناءً على بياناتي الحالية؟',
          },
          {
            label: lang === 'en' ? 'Risk factors?' : 'عوامل الخطر؟',
            prompt:
              lang === 'en'
                ? 'What are the main risk factors related to this result in my case?'
                : 'ما أهم عوامل الخطر المرتبطة بهذه النتيجة في حالتي؟',
          },
          {
            label: lang === 'en' ? 'Next steps' : 'الخطوات التالية',
            prompt:
              lang === 'en'
                ? 'What are the most practical next steps for me?'
                : 'ما أكثر الخطوات العملية المناسبة لي الآن؟',
          },
        ]
      : calculatorName === 'Macros'
        ? [
            {
              label: lang === 'en' ? 'Meal ideas' : 'أفكار وجبات',
              prompt:
                lang === 'en'
                  ? 'Suggest meal ideas that match my macros and recovery goal.'
                  : 'اقترح أفكار وجبات تناسب الماكروز وهدف التعافي الخاص بي.',
            },
            {
              label: lang === 'en' ? 'Adjust for training' : 'تعديل للتمرين',
              prompt:
                lang === 'en'
                  ? 'How should I adjust carbs and protein on training versus rest days?'
                  : 'كيف أعدّل الكربوهيدرات والبروتين في أيام التمرين مقارنة بأيام الراحة؟',
            },
          ]
        : calculatorName === 'TDEE' || calculatorName === 'BMR'
          ? [
              {
                label: lang === 'en' ? 'Weight loss plan' : 'خطة نزول وزن',
                prompt:
                  lang === 'en'
                    ? 'Based on this, what is a safe calorie target for fat loss in my case?'
                    : 'بناءً على هذه النتيجة، ما هدف السعرات الآمن لنزول الدهون في حالتي؟',
              },
              {
                label: lang === 'en' ? 'Maintenance' : 'ثبات الوزن',
                prompt:
                  lang === 'en'
                    ? 'How do I maintain my weight with this estimate and my activity level?'
                    : 'كيف أحافظ على وزني باستخدام هذا التقدير ومستوى نشاطي؟',
              },
            ]
          : [
              {
                label: lang === 'en' ? 'Explain result' : 'اشرح النتيجة',
                prompt:
                  lang === 'en'
                    ? 'Explain this result in simple terms using my profile.'
                    : 'اشرح هذه النتيجة بطريقة بسيطة بالاعتماد على بياناتي.',
              },
              {
                label: lang === 'en' ? 'Safety notes' : 'ملاحظات أمان',
                prompt:
                  lang === 'en'
                    ? 'Any safety considerations or signs that mean I should consult a clinician?'
                    : 'هل توجد اعتبارات أمان أو علامات تستدعي مراجعة مختص؟',
              },
            ];

  return (
    <ChatPanel
      title={lang === 'en' ? 'Ask about your result' : 'اسأل عن نتيجتك'}
      systemPrompt={`You are a Physio-Nutrition Expert. Your role is to give personalized educational guidance, not generic advice.

Rules:
1. Tie every answer to the user's profile, weight, age, goal, and injury context when available.
2. Do not give unsafe exercise suggestions that conflict with the injury context.
3. Use a professional, supportive tone and mention the user by name if the context includes one.
4. Do not diagnose or prescribe treatment.
5. End every reply with a short note that this is educational guidance and does not replace clinical assessment.`}
      hiddenContext={hiddenContext}
      disclaimer={
        lang === 'en'
          ? 'This AI is for educational purposes. Consult a doctor for medical decisions.'
          : 'هذا الذكاء الاصطناعي لأغراض تعليمية فقط. استشر مختصًا لاتخاذ قرارات طبية.'
      }
      analyticsMeta={{source: 'calculator_chat', calculator: calculatorName}}
      lang={lang}
      quickActions={quickActions}
      autoPrompt={autoPrompt}
      cacheScope={`result:${calculatorName}`}
    />
  );
}
