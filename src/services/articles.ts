/**
 * Evidence-based medical articles for PhysioHub
 * Topics: physical therapy, rehabilitation, and nutrition
 */

import {type Language} from './translations';

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  icon: string;
  image?: string;
}

export const getArticles = (lang: Language): Article[] => {
  if (lang === 'ar') {
    return [
      {
        id: 1,
        title: 'كيف تحسب البروتين بعد جراحة الرباط الصليبي؟',
        excerpt:
          'التعافي بعد ACL لا يعتمد فقط على التمرين. البروتين الكافي ضروري للحفاظ على الكتلة العضلية ودعم التئام الأنسجة.',
        content:
          'بعد جراحة الرباط الصليبي، يقل النشاط البدني في البداية بينما تزيد حاجة الجسم إلى الإصلاح والتعافي. لهذا السبب يكون البروتين عنصرًا أساسيًا في الخطة الغذائية. الهدف العملي ليس رقمًا عشوائيًا، بل نطاق مناسب يمكن توزيعه على اليوم بحيث يدعم الحفاظ على العضلات ويقلل الهدر العضلي خلال فترات قلة الحركة.\n\nغالبًا يكون من الأفضل توزيع البروتين على 3 إلى 5 وجبات بدل جمعه في وجبة واحدة. هذا يجعل الاستفادة أفضل، خاصة في مراحل التعافي المبكر. كما أن دمج البروتين مع نوم كافٍ وتحميل تدريجي داخل برنامج العلاج الطبيعي يحسن الصورة الكاملة بدل الاعتماد على عنصر واحد فقط.\n\nمرجع إرشادي: راجع PubMed للأبحاث المتعلقة بـ ACL reconstruction nutrition و muscle protein synthesis during immobilization.',
        category: 'Recovery Nutrition',
        date: '2026-03-18',
        icon: 'HeartPulse',
      },
      {
        id: 2,
        title: 'لماذا متابعة القياسات أهم من النتيجة الواحدة؟',
        excerpt:
          'القياس الواحد قد يكون مفيدًا، لكن القيمة الحقيقية تظهر عند متابعة التغير عبر الوقت داخل rehab أو إدارة الوزن.',
        content:
          'في الممارسة السريرية، لقطة واحدة لا تكفي دائمًا. قد تكون نتيجة اليوم متأثرة بالنوم، السوائل، أو النشاط السابق. لكن عند حفظ القياسات ومقارنتها عبر عدة أيام أو أسابيع، تبدأ الاتجاهات الحقيقية في الظهور. لهذا السبب يعتبر سجل المتابعة عنصرًا أساسيًا في أي نظام علاجي أو تغذوي جاد.\n\nلوحة المتابعة تساعد المستخدم أو الأخصائي على رؤية التطور بدل الاعتماد على الانطباع. هل هناك تحسن؟ هل الهدف ثابت؟ هل الاحتياج الغذائي أو التدريبي يجب أن يُراجع؟ هذه الأسئلة لا يجيب عنها رقم واحد بقدر ما يجيب عنها التسلسل الزمني.\n\nمرجع إرشادي: WHO و NIH يركزان باستمرار على أهمية المتابعة الدورية والقياسات المتكررة بدل الحكم من قراءة منفردة.',
        category: 'Clinical Tracking',
        date: '2026-03-18',
        icon: 'ClipboardList',
      },
      {
        id: 3,
        title: 'التغذية العلاجية بعد الإصابة: ما الذي يهم فعلاً؟',
        excerpt:
          'المغذيات لا تعوض العلاج الطبيعي، لكنها قد تدعم التعافي عندما تكون الخطة متوازنة وتحفظية.',
        content:
          'بعد الإصابات، يميل بعض المستخدمين للتركيز على المكملات أكثر من الأساسيات. لكن الحقيقة أن أهم العوامل عادة تكون: كفاية الطاقة، توزيع البروتين، جودة النوم، شرب الماء، ثم التفاصيل الدقيقة لاحقًا. هذا الترتيب مهم لأنه يمنع القفز إلى حلول شكلية قبل تثبيت الأساس.\n\nالنهج الآمن هو أن تُستخدم الأدوات الرقمية لتوضيح الاتجاه العام: هل يوجد نقص واضح؟ هل الاحتياج الغذائي منخفض؟ هل العجز السعري مبالغ فيه؟ بعد ذلك تأتي مراجعة الأخصائي إذا كانت هناك إصابة حقيقية أو دواء أو أعراض مستمرة.\n\nمرجع إرشادي: PubMed و NIH يوفران قاعدة قوية للمفاهيم المتعلقة بـ injury recovery nutrition, protein timing, and hydration.',
        category: 'Rehab Nutrition',
        date: '2026-03-18',
        icon: 'Sparkles',
      },
    ];
  }

  return [
    {
      id: 1,
      title: 'How to estimate protein after ACL reconstruction',
      excerpt:
        'Recovery after ACL surgery is not only about exercises. Adequate protein intake helps support tissue repair and preserve muscle mass.',
      content:
        'After ACL reconstruction, activity usually drops while the body is still under higher recovery demand. That mismatch is one reason protein matters. The practical goal is not a random high number, but a reasonable range that supports tissue repair and helps protect lean mass during the lower-activity phase.\n\nA useful strategy is to spread protein across 3 to 5 meals instead of concentrating it in one large meal. This pattern is often easier to apply and aligns better with the idea of consistent recovery support. Nutrition should also be viewed alongside sleep quality, rehab load progression, and overall energy intake.\n\nReference direction: review PubMed literature on ACL reconstruction nutrition and muscle protein synthesis during immobilization.',
      category: 'Recovery Nutrition',
      date: '2026-03-18',
      icon: 'HeartPulse',
    },
    {
      id: 2,
      title: 'Why tracking measurements beats a single result',
      excerpt:
        'One result can be helpful, but the real clinical value often appears when you track change over time.',
      content:
        'In rehab and weight management, a single reading can be influenced by hydration, sleep, stress, and recent activity. Trends are usually more informative than isolated values. That is why a follow-up log changes the user experience from “one-time calculator” to something closer to clinical tracking.\n\nA dashboard lets users and clinicians review whether progress is stable, whether recovery is moving in the right direction, and whether nutrition targets still fit the situation. This type of visibility usually increases engagement because the user now has a reason to come back, compare, and reflect.\n\nReference direction: WHO and NIH materials consistently support repeated observation and pattern-based review rather than decisions based on a single snapshot.',
      category: 'Clinical Tracking',
      date: '2026-03-18',
      icon: 'ClipboardList',
    },
    {
      id: 3,
      title: 'What actually matters in nutrition after injury?',
      excerpt:
        'Supplements are not the foundation. Energy intake, protein distribution, hydration, and recovery habits usually matter first.',
      content:
        'Many users jump straight to supplements, but the stronger starting point is usually much simpler: enough total calories, enough protein across the day, consistent hydration, and sleep that supports recovery. Those basics tend to matter more than advanced additions when the main goal is repair and gradual return to function.\n\nDigital tools are most useful when they make these basics easier to understand. Is the calorie target too low? Is protein spread poorly? Is hydration inconsistent? Once those questions are clearer, a clinician can step in where needed for a more individual medical decision.\n\nReference direction: PubMed and NIH provide a useful base for injury recovery nutrition, protein timing, and hydration-related guidance.',
      category: 'Rehab Nutrition',
      date: '2026-03-18',
      icon: 'Sparkles',
    },
  ];
};
