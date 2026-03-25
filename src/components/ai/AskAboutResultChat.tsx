import ChatPanel from './ChatPanel';
import {decodeMojibake} from '../../services/textEncoding';

function ar(text: string) {
  return decodeMojibake(text);
}

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
            label: lang === 'en' ? 'How to improve?' : ar('ÙƒÙŠÙ Ø£Ø­Ø³Ù† Ø§Ù„Ù†ØªÙŠØ¬Ø©ØŸ'),
            prompt:
              lang === 'en'
                ? 'How can I improve this result safely based on my current profile?'
                : ar('ÙƒÙŠÙ ÙŠÙ…ÙƒÙ†Ù†ÙŠ ØªØ­Ø³ÙŠÙ† Ù‡Ø°Ù‡ Ø§Ù„Ù†ØªÙŠØ¬Ø© Ø¨Ø´ÙƒÙ„ Ø¢Ù…Ù† Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø¨ÙŠØ§Ù†Ø§ØªÙŠ Ø§Ù„Ø­Ø§Ù„ÙŠØ©ØŸ'),
          },
          {
            label: lang === 'en' ? 'Risk factors?' : ar('Ø¹ÙˆØ§Ù…Ù„ Ø§Ù„Ø®Ø·Ø±ØŸ'),
            prompt:
              lang === 'en'
                ? 'What are the main risk factors related to this result in my case?'
                : ar('Ù…Ø§ Ø£Ù‡Ù… Ø¹ÙˆØ§Ù…Ù„ Ø§Ù„Ø®Ø·Ø± Ø§Ù„Ù…Ø±ØªØ¨Ø·Ø© Ø¨Ù‡Ø°Ù‡ Ø§Ù„Ù†ØªÙŠØ¬Ø© ÙÙŠ Ø­Ø§Ù„ØªÙŠØŸ'),
          },
          {
            label: lang === 'en' ? 'Next steps' : ar('Ø§Ù„Ø®Ø·ÙˆØ§Øª Ø§Ù„ØªØ§Ù„ÙŠØ©'),
            prompt:
              lang === 'en'
                ? 'What are the most practical next steps for me?'
                : ar('Ù…Ø§ Ø£ÙƒØ«Ø± Ø§Ù„Ø®Ø·ÙˆØ§Øª Ø§Ù„Ø¹Ù…Ù„ÙŠØ© Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø© Ù„ÙŠ Ø§Ù„Ø¢Ù†ØŸ'),
          },
        ]
      : calculatorName === 'Macros'
        ? [
            {
              label: lang === 'en' ? 'Meal ideas' : ar('Ø£ÙÙƒØ§Ø± ÙˆØ¬Ø¨Ø§Øª'),
              prompt:
                lang === 'en'
                  ? 'Suggest meal ideas that match my macros and recovery goal.'
                  : ar('Ø§Ù‚ØªØ±Ø­ Ø£ÙÙƒØ§Ø± ÙˆØ¬Ø¨Ø§Øª ØªÙ†Ø§Ø³Ø¨ Ø§Ù„Ù…Ø§ÙƒØ±ÙˆØ² ÙˆÙ‡Ø¯Ù Ø§Ù„ØªØ¹Ø§ÙÙŠ Ø§Ù„Ø®Ø§Øµ Ø¨ÙŠ.'),
            },
            {
              label: lang === 'en' ? 'Adjust for training' : ar('ØªØ¹Ø¯ÙŠÙ„ Ù„Ù„ØªÙ…Ø±ÙŠÙ†'),
              prompt:
                lang === 'en'
                  ? 'How should I adjust carbs and protein on training versus rest days?'
                  : ar('ÙƒÙŠÙ Ø£Ø¹Ø¯Ù‘Ù„ Ø§Ù„ÙƒØ±Ø¨ÙˆÙ‡ÙŠØ¯Ø±Ø§Øª ÙˆØ§Ù„Ø¨Ø±ÙˆØªÙŠÙ† ÙÙŠ Ø£ÙŠØ§Ù… Ø§Ù„ØªÙ…Ø±ÙŠÙ† Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ø£ÙŠØ§Ù… Ø§Ù„Ø±Ø§Ø­Ø©ØŸ'),
            },
          ]
        : calculatorName === 'TDEE' || calculatorName === 'BMR'
          ? [
              {
                label: lang === 'en' ? 'Weight loss plan' : ar('Ø®Ø·Ø© Ù†Ø²ÙˆÙ„ ÙˆØ²Ù†'),
                prompt:
                  lang === 'en'
                    ? 'Based on this, what is a safe calorie target for fat loss in my case?'
                    : ar('Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ù‡Ø°Ù‡ Ø§Ù„Ù†ØªÙŠØ¬Ø©ØŒ Ù…Ø§ Ù‡Ø¯Ù Ø§Ù„Ø³Ø¹Ø±Ø§Øª Ø§Ù„Ø¢Ù…Ù† Ù„Ù†Ø²ÙˆÙ„ Ø§Ù„Ø¯Ù‡ÙˆÙ† ÙÙŠ Ø­Ø§Ù„ØªÙŠØŸ'),
              },
              {
                label: lang === 'en' ? 'Maintenance' : ar('Ø«Ø¨Ø§Øª Ø§Ù„ÙˆØ²Ù†'),
                prompt:
                  lang === 'en'
                    ? 'How do I maintain my weight with this estimate and my activity level?'
                    : ar('ÙƒÙŠÙ Ø£Ø­Ø§ÙØ¸ Ø¹Ù„Ù‰ ÙˆØ²Ù†ÙŠ Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù… Ù‡Ø°Ø§ Ø§Ù„ØªÙ‚Ø¯ÙŠØ± ÙˆÙ…Ø³ØªÙˆÙ‰ Ù†Ø´Ø§Ø·ÙŠØŸ'),
              },
            ]
          : [
              {
                label: lang === 'en' ? 'Explain result' : ar('Ø§Ø´Ø±Ø­ Ø§Ù„Ù†ØªÙŠØ¬Ø©'),
                prompt:
                  lang === 'en'
                    ? 'Explain this result in simple terms using my profile.'
                    : ar('Ø§Ø´Ø±Ø­ Ù‡Ø°Ù‡ Ø§Ù„Ù†ØªÙŠØ¬Ø© Ø¨Ø·Ø±ÙŠÙ‚Ø© Ø¨Ø³ÙŠØ·Ø© Ø¨Ø§Ù„Ø§Ø¹ØªÙ…Ø§Ø¯ Ø¹Ù„Ù‰ Ø¨ÙŠØ§Ù†Ø§ØªÙŠ.'),
              },
              {
                label: lang === 'en' ? 'Safety notes' : ar('Ù…Ù„Ø§Ø­Ø¸Ø§Øª Ø£Ù…Ø§Ù†'),
                prompt:
                  lang === 'en'
                    ? 'Any safety considerations or signs that mean I should consult a clinician?'
                    : ar('Ù‡Ù„ ØªÙˆØ¬Ø¯ Ø§Ø¹ØªØ¨Ø§Ø±Ø§Øª Ø£Ù…Ø§Ù† Ø£Ùˆ Ø¹Ù„Ø§Ù…Ø§Øª ØªØ³ØªØ¯Ø¹ÙŠ Ù…Ø±Ø§Ø¬Ø¹Ø© Ù…Ø®ØªØµØŸ'),
              },
            ];

  return (
    <ChatPanel
      title={lang === 'en' ? 'Ask about your result' : ar('Ø§Ø³Ø£Ù„ Ø¹Ù† Ù†ØªÙŠØ¬ØªÙƒ')}
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
          : ar('Ù‡Ø°Ø§ Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ù„Ø£ØºØ±Ø§Ø¶ ØªØ¹Ù„ÙŠÙ…ÙŠØ© ÙÙ‚Ø·. Ø§Ø³ØªØ´Ø± Ù…Ø®ØªØµÙ‹Ø§ Ù„Ø§ØªØ®Ø§Ø° Ù‚Ø±Ø§Ø±Ø§Øª Ø·Ø¨ÙŠØ©.')}
      analyticsMeta={{source: 'calculator_chat', calculator: calculatorName}}
      lang={lang}
      quickActions={quickActions}
      autoPrompt={autoPrompt}
      cacheScope={`result:${calculatorName}`}
    />
  );
}
