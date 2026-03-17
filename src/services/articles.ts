/**
 * Evidence-Based Medical Articles for PhysioHub
 * Topics: Physical Therapy, Rehabilitation, and Nutrition
 */

import { Language } from './translations';

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
  const articles = {
    en: [
      {
        id: 1,
        title: "ACL Injury Prevention in Athletes",
        excerpt: "Discover the latest neuromuscular training protocols to reduce ACL injury risk in high-impact sports.",
        content: "Anterior Cruciate Ligament (ACL) injuries are among the most common and devastating injuries in sports. Modern research emphasizes the importance of neuromuscular training, focusing on landing mechanics, deceleration, and core stability to protect the knee joint...",
        category: "Orthopedics",
        date: "March 15, 2026",
        icon: "ShieldAlert"
      },
      {
        id: 2,
        title: "Nutrition for Muscle Recovery",
        excerpt: "The science of protein synthesis and micronutrients in post-exercise tissue repair.",
        content: "Muscle recovery is a complex physiological process. Beyond protein intake, micronutrients like Vitamin C, Zinc, and Magnesium play vital roles in collagen synthesis and reducing oxidative stress after intensive training sessions...",
        category: "Nutrition",
        date: "March 14, 2026",
        icon: "Utensils"
      },
      {
        id: 3,
        title: "Managing Chronic Low Back Pain",
        excerpt: "Moving beyond rest: Why active rehabilitation is the gold standard for chronic spinal health.",
        content: "Chronic low back pain (CLBP) is no longer treated with prolonged bed rest. Evidence suggests that progressive loading, core stabilization, and cognitive functional therapy are essential for long-term recovery and pain management...",
        category: "Rehabilitation",
        date: "March 13, 2026",
        icon: "Activity"
      },
      {
        id: 4,
        title: "Resistance Training for the Elderly",
        excerpt: "Combating sarcopenia and improving bone density through progressive overload in seniors.",
        content: "Sarcopenia, the age-related loss of muscle mass, can be significantly mitigated through resistance training. Studies show that even in the 8th decade of life, the body responds positively to weight-bearing exercises...",
        category: "Geriatrics",
        date: "March 12, 2026",
        icon: "Zap"
      },
      {
        id: 5,
        title: "Post-Surgical Rehab Protocols",
        excerpt: "Understanding the phases of healing after orthopedic surgery for optimal outcomes.",
        content: "Successful surgery is only half the battle. The rehabilitation phase—divided into protection, load introduction, and return-to-sport phases—is critical for restoring full function and preventing secondary complications...",
        category: "Surgery",
        date: "March 11, 2026",
        icon: "Stethoscope"
      },
      {
        id: 6,
        title: "Sleep and Physical Performance",
        excerpt: "How circadian rhythms and deep sleep cycles influence athletic recovery and cognitive focus.",
        content: "Sleep is the ultimate recovery tool. During deep sleep, the body releases growth hormones essential for tissue repair. Chronic sleep deprivation is linked to increased injury rates and decreased reaction times in athletes...",
        category: "Performance",
        date: "March 10, 2026",
        icon: "Brain"
      },
      {
        id: 7,
        title: "Ergonomics for Office Workers",
        excerpt: "Preventing 'Tech Neck' and repetitive strain injuries in the modern digital workspace.",
        content: "Prolonged sitting and poor monitor placement lead to significant musculoskeletal strain. Simple adjustments in chair height, screen level, and frequent 'movement snacks' can prevent chronic neck and shoulder issues...",
        category: "Occupational",
        date: "March 9, 2026",
        icon: "Info"
      },
      {
        id: 8,
        title: "Plant-Based Diets for Athletes",
        excerpt: "Evaluating the efficacy of vegan and vegetarian protocols for high-performance sports.",
        content: "Can athletes thrive on plants? Research indicates that with proper planning for B12, Iron, and complete protein profiles, plant-based diets can support high-level performance while potentially reducing systemic inflammation...",
        category: "Nutrition",
        date: "March 8, 2026",
        icon: "Flame"
      },
      {
        id: 9,
        title: "Proprioception and Ankle Stability",
        excerpt: "Advanced balance training to prevent recurrent sprains and improve joint awareness.",
        content: "Ankle sprains often lead to chronic instability. Proprioceptive training—using wobble boards and single-leg drills—retrains the nervous system to react faster to sudden changes in terrain, reducing future injury risk...",
        category: "Sports Medicine",
        date: "March 7, 2026",
        icon: "HeartPulse"
      },
      {
        id: 10,
        title: "Static vs. Dynamic Stretching",
        excerpt: "The science of warming up: When to use each method for maximum efficiency.",
        content: "The debate over stretching continues. Current evidence suggests that dynamic stretching is superior for pre-exercise warm-ups, while static stretching is best reserved for post-exercise cooling to improve long-term flexibility...",
        category: "Physiology",
        date: "March 6, 2026",
        icon: "Scale"
      }
    ],
    ar: [
      {
        id: 1,
        title: "الوقاية من إصابات الرباط الصليبي",
        excerpt: "اكتشف أحدث بروتوكولات التدريب العصبي العضلي لتقليل مخاطر إصابة الرباط الصليبي في الرياضات العنيفة.",
        content: "تعد إصابات الرباط الصليبي الأمامي (ACL) من أكثر الإصابات شيوعاً وتأثيراً في الرياضة. تؤكد الأبحاث الحديثة على أهمية التدريب العصبي العضلي، مع التركيز على ميكانيكا الهبوط، والتباطؤ، واستقرار الجذع لحماية مفصل الركبة...",
        category: "جراحة العظام",
        date: "١٥ مارس ٢٠٢٦",
        icon: "ShieldAlert"
      },
      {
        id: 2,
        title: "التغذية واستشفاء العضلات",
        excerpt: "علم تخليق البروتين والمغذيات الدقيقة في إصلاح الأنسجة بعد التمرين.",
        content: "استشفاء العضلات عملية فسيولوجية معقدة. بعيداً عن تناول البروتين، تلعب المغذيات الدقيقة مثل فيتامين C والزنك والمغنيسيوم أدواراً حيوية في تخليق الكولاجين وتقليل الإجهاد التأكسدي بعد جلسات التدريب المكثفة...",
        category: "التغذية",
        date: "١٤ مارس ٢٠٢٦",
        icon: "Utensils"
      },
      {
        id: 3,
        title: "إدارة آلام أسفل الظهر المزمنة",
        excerpt: "ما وراء الراحة: لماذا يعد التأهيل النشط هو المعيار الذهبي لصحة العمود الفقري.",
        content: "لم يعد يتم علاج آلام أسفل الظهر المزمنة (CLBP) بالراحة الطويلة في الفراش. تشير الأدلة إلى أن التحميل التدريجي، واستقرار الجذع، والعلاج الوظيفي المعرفي ضرورية للتعافي على المدى الطويل وإدارة الألم...",
        category: "إعادة التأهيل",
        date: "١٣ مارس ٢٠٢٦",
        icon: "Activity"
      },
      {
        id: 4,
        title: "تدريبات المقاومة لكبار السن",
        excerpt: "مكافحة ضمور العضلات وتحسين كثافة العظام من خلال التحميل التدريجي للمسنين.",
        content: "يمكن التخفيف من ضمور العضلات (Sarcopenia) المرتبط بالعمر بشكل كبير من خلال تدريبات المقاومة. تظهر الدراسات أنه حتى في العقد الثامن من العمر، يستجيب الجسم بشكل إيجابي لتمارين تحمل الوزن...",
        category: "طب المسنين",
        date: "١٢ مارس ٢٠٢٦",
        icon: "Zap"
      },
      {
        id: 5,
        title: "بروتوكولات التأهيل بعد الجراحة",
        excerpt: "فهم مراحل الشفاء بعد جراحات العظام لتحقيق أفضل النتائج.",
        content: "الجراحة الناجحة هي نصف المعركة فقط. مرحلة التأهيل - المقسمة إلى مراحل الحماية، وإدخال الحمل، والعودة إلى الرياضة - حاسمة لاستعادة الوظيفة الكاملة ومنع المضاعفات الثانوية...",
        category: "الجراحة",
        date: "١١ مارس ٢٠٢٦",
        icon: "Stethoscope"
      },
      {
        id: 6,
        title: "النوم والأداء البدني",
        excerpt: "كيف تؤثر الإيقاعات الحيوية ودورات النوم العميق على الاستشفاء الرياضي والتركيز الذهني.",
        content: "النوم هو أداة الاستشفاء القصوى. خلال النوم العميق، يفرز الجسم هرمونات النمو الضرورية لإصلاح الأنسجة. يرتبط الحرمان المزمن من النوم بزيادة معدلات الإصابة وانخفاض أوقات الاستجابة لدى الرياضيين...",
        category: "الأداء البدني",
        date: "١٠ مارس ٢٠٢٦",
        icon: "Brain"
      },
      {
        id: 7,
        title: "أرغونوميا المكاتب للموظفين",
        excerpt: "الوقاية من آلام الرقبة وإصابات الإجهاد المتكرر في مساحة العمل الرقمية الحديثة.",
        content: "يؤدي الجلوس لفترات طويلة ووضع الشاشة السيئ إلى إجهاد عضلي هيكلي كبير. التعديلات البسيطة في ارتفاع الكرسي ومستوى الشاشة و'وجبات الحركة' المتكررة يمكن أن تمنع مشاكل الرقبة والكتف المزمنة...",
        category: "الصحة المهنية",
        date: "٩ مارس ٢٠٢٦",
        icon: "Info"
      },
      {
        id: 8,
        title: "الأنظمة الغذائية النباتية للرياضيين",
        excerpt: "تقييم فعالية البروتوكولات النباتية للرياضات عالية الأداء.",
        content: "هل يمكن للرياضيين الازدهار على النباتات؟ تشير الأبحاث إلى أنه مع التخطيط السليم لـ B12 والحديد وملفات البروتين الكاملة، يمكن للأنظمة النباتية دعم الأداء العالي مع تقليل الالتهابات الجهازية...",
        category: "التغذية",
        date: "٨ مارس ٢٠٢٦",
        icon: "Flame"
      },
      {
        id: 9,
        title: "الاستقبال الحسي واستقرار الكاحل",
        excerpt: "تدريبات توازن متقدمة لمنع الالتواءات المتكررة وتحسين الوعي بالمفاصل.",
        content: "غالباً ما تؤدي التواءات الكاحل إلى عدم استقرار مزمن. تدريب الاستقبال الحسي (Proprioception) يعيد تدريب الجهاز العصبي للتفاعل بشكل أسرع مع التغيرات المفاجئة في التضاريس، مما يقلل من مخاطر الإصابة المستقبلية...",
        category: "الطب الرياضي",
        date: "٧ مارس ٢٠٢٦",
        icon: "HeartPulse"
      },
      {
        id: 10,
        title: "الإطالة الثابتة مقابل الديناميكية",
        excerpt: "علم الإحماء: متى تستخدم كل طريقة لتحقيق أقصى قدر من الكفاءة.",
        content: "يستمر الجدل حول الإطالات. تشير الأدلة الحالية إلى أن الإطالة الديناميكية متفوقة للإحماء قبل التمرين، بينما يفضل ترك الإطالة الثابتة للتبريد بعد التمرين لتحسين المرونة على المدى الطويل...",
        category: "فسيولوجيا الجهد البدني",
        date: "٦ مارس ٢٠٢٦",
        icon: "Scale"
      }
    ]
  };

  return articles[lang];
};
