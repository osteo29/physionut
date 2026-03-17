import ChatPanel from './ChatPanel';

export default function AskAboutResultChat({
  hiddenContext,
  calculatorName,
  lang,
}: {
  hiddenContext: string;
  calculatorName: string;
  lang: 'en' | 'ar';
}) {
  const quickActions =
    calculatorName === 'BMI'
      ? [
          {
            label: lang === 'en' ? 'How to improve?' : 'كيف أحسّن النتيجة؟',
            prompt: lang === 'en' ? 'How can I improve this result safely?' : 'كيف يمكنني تحسين هذه النتيجة بشكل آمن؟',
          },
          {
            label: lang === 'en' ? 'Risk factors?' : 'عوامل الخطر؟',
            prompt: lang === 'en' ? 'What are common risk factors related to this result?' : 'ما هي عوامل الخطر الشائعة المرتبطة بهذه النتيجة؟',
          },
          {
            label: lang === 'en' ? 'Next steps' : 'الخطوات التالية',
            prompt: lang === 'en' ? 'What are practical next steps for me?' : 'ما هي الخطوات العملية التالية التي تنصح بها؟',
          },
        ]
      : calculatorName === 'Macros'
        ? [
            {
              label: lang === 'en' ? 'Meal ideas' : 'أفكار وجبات',
              prompt: lang === 'en' ? 'Suggest meal ideas that match my macros.' : 'اقترح أفكار وجبات تناسب الماكروز الخاصة بي.',
            },
            {
              label: lang === 'en' ? 'Adjust for training' : 'تعديل للتدريب',
              prompt: lang === 'en' ? 'How should I adjust carbs/protein on training vs rest days?' : 'كيف أعدّل الكارب/البروتين في أيام التمرين مقابل الراحة؟',
            },
          ]
        : calculatorName === 'TDEE' || calculatorName === 'BMR'
          ? [
              {
                label: lang === 'en' ? 'Weight loss plan' : 'خطة نزول وزن',
                prompt: lang === 'en' ? 'Based on this, what is a safe calorie target for fat loss?' : 'بناءً على ذلك، ما هو هدف سعرات آمن لنزول الدهون؟',
              },
              {
                label: lang === 'en' ? 'Maintenance' : 'ثبات الوزن',
                prompt: lang === 'en' ? 'How do I maintain my weight with this estimate?' : 'كيف أحافظ على وزني بناءً على هذا التقدير؟',
              },
            ]
          : [
              {
                label: lang === 'en' ? 'Explain result' : 'اشرح النتيجة',
                prompt: lang === 'en' ? 'Explain this result in simple terms.' : 'اشرح هذه النتيجة بطريقة مبسطة.',
              },
              {
                label: lang === 'en' ? 'Safety notes' : 'ملاحظات أمان',
                prompt: lang === 'en' ? 'Any safety considerations or when to consult a clinician?' : 'هل توجد اعتبارات أمان أو متى أراجع مختص؟',
              },
            ];

  return (
    <ChatPanel
      title={lang === 'en' ? 'Ask about your result' : 'اسأل عن نتيجتك'}
      systemPrompt="You are a Senior Physical Therapist and Clinical Nutritionist. Explain the result clearly, clinically, and safely. Do not diagnose."
      hiddenContext={hiddenContext}
      disclaimer={lang === 'en' ? 'This AI is for educational purposes. Consult a doctor for medical decisions.' : 'هذا الذكاء الاصطناعي لأغراض تعليمية فقط. استشر طبيبًا لاتخاذ قرارات طبية.'}
      analyticsMeta={{source: 'calculator_chat', calculator: calculatorName}}
      lang={lang}
      quickActions={quickActions}
    />
  );
}

