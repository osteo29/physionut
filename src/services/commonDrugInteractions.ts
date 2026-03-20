export type DrugInteractionStatus = 'Danger' | 'Caution' | 'Safe';

export type CommonDrugInteraction = {
  id: string;
  matchTerms: string[];
  title: {
    en: string;
    ar: string;
  };
  status: DrugInteractionStatus;
  summary: {
    en: string;
    ar: string;
  };
  interactions: {
    en: string[];
    ar: string[];
  };
  practicalAdvice: {
    en: string[];
    ar: string[];
  };
};

const commonDrugInteractions: CommonDrugInteraction[] = [
  {
    id: 'warfarin-vitamin-k',
    matchTerms: ['warfarin', 'coumadin', 'vitamin k', 'kale', 'spinach', 'وارفارين', 'فيتامين k'],
    title: {en: 'Warfarin with vitamin K rich foods', ar: 'الوارفارين مع الأطعمة الغنية بفيتامين K'},
    status: 'Caution',
    summary: {
      en: 'Vitamin K does not need to be eliminated completely, but large day-to-day changes may affect warfarin response.',
      ar: 'لا يلزم منع فيتامين K تمامًا، لكن التغيرات الكبيرة اليومية في تناوله قد تؤثر على استجابة الوارفارين.',
    },
    interactions: {
      en: ['Large swings in leafy green intake may affect INR stability.', 'Some supplements may also affect bleeding risk with warfarin.'],
      ar: ['التغير الكبير في تناول الخضروات الورقية قد يربك ثبات INR.', 'بعض المكملات قد ترفع أيضًا خطر النزف مع الوارفارين.'],
    },
    practicalAdvice: {
      en: ['Keep vitamin K intake consistent.', 'Review vitamin E, garlic, ginkgo, and omega-3 supplements with a clinician.', 'Do not change dose or diet aggressively without follow-up.'],
      ar: ['حافظ على تناول ثابت لفيتامين K.', 'راجع مكملات مثل فيتامين E أو الثوم أو الجنكو أو أوميجا 3 مع مختص.', 'لا تغيّر الجرعة أو النظام الغذائي بعنف بدون متابعة.'],
    },
  },
  {
    id: 'statins-grapefruit',
    matchTerms: ['statin', 'simvastatin', 'atorvastatin', 'grapefruit', 'ستاتين', 'جريب فروت'],
    title: {en: 'Statins with grapefruit', ar: 'أدوية الستاتين مع الجريب فروت'},
    status: 'Danger',
    summary: {
      en: 'Grapefruit may raise levels of some statins and increase side effect risk.',
      ar: 'الجريب فروت قد يرفع مستوى بعض أدوية الستاتين ويزيد احتمال الأعراض الجانبية.',
    },
    interactions: {
      en: ['The interaction is more relevant with simvastatin and atorvastatin.', 'Higher exposure may increase muscle-related side effects.'],
      ar: ['التداخل أوضح مع سيمفاستاتين وأتورفاستاتين.', 'زيادة التعرض قد ترفع احتمال الأعراض المرتبطة بالعضلات.'],
    },
    practicalAdvice: {
      en: ['Avoid grapefruit unless your prescriber says it is acceptable.', 'Report muscle pain or weakness promptly.'],
      ar: ['تجنب الجريب فروت ما لم يوضح الطبيب أن ذلك مناسب.', 'بلّغ سريعًا عن ألم العضلات أو ضعفها.'],
    },
  },
  {
    id: 'levothyroxine-calcium-iron',
    matchTerms: ['levothyroxine', 'thyroxine', 'calcium', 'iron', 'ليفوثيروكسين', 'كالسيوم', 'حديد'],
    title: {en: 'Levothyroxine with calcium or iron', ar: 'ليفوثيروكسين مع الكالسيوم أو الحديد'},
    status: 'Caution',
    summary: {
      en: 'Calcium and iron may reduce levothyroxine absorption if taken too close together.',
      ar: 'الكالسيوم والحديد قد يقللان امتصاص ليفوثيروكسين إذا أُخذا قريبًا من بعض.',
    },
    interactions: {
      en: ['This may lead to less consistent thyroid hormone replacement.'],
      ar: ['قد يؤدي ذلك إلى ضعف أو عدم ثبات تعويض هرمون الغدة الدرقية.'],
    },
    practicalAdvice: {
      en: ['Take levothyroxine on an empty stomach with water.', 'Separate calcium or iron by several hours.'],
      ar: ['خذ ليفوثيروكسين على معدة فارغة مع الماء.', 'افصل بينه وبين الكالسيوم أو الحديد عدة ساعات.'],
    },
  },
  {
    id: 'metformin-b12',
    matchTerms: ['metformin', 'vitamin b12', 'b12', 'ميتفورمين', 'فيتامين ب12'],
    title: {en: 'Metformin and vitamin B12', ar: 'الميتفورمين وفيتامين B12'},
    status: 'Caution',
    summary: {
      en: 'Long-term metformin use may contribute to lower vitamin B12 levels in some people.',
      ar: 'استخدام الميتفورمين لفترة طويلة قد يساهم في انخفاض فيتامين B12 لدى بعض الأشخاص.',
    },
    interactions: {
      en: ['Low B12 may overlap with fatigue, neuropathy, or anemia symptoms.'],
      ar: ['انخفاض B12 قد يتداخل مع أعراض مثل الإرهاق أو التنميل أو الأنيميا.'],
    },
    practicalAdvice: {
      en: ['Ask about periodic B12 review if you use metformin long term.', 'Do not start high-dose supplements blindly if symptoms need medical workup.'],
      ar: ['اسأل عن مراجعة دورية لمستوى B12 إذا كنت تستخدم الميتفورمين لفترة طويلة.', 'لا تبدأ جرعات عالية من المكملات بشكل عشوائي إذا كانت الأعراض تحتاج تقييمًا طبيًا.'],
    },
  },
  {
    id: 'tetracycline-dairy',
    matchTerms: ['tetracycline', 'doxycycline', 'minocycline', 'dairy', 'milk', 'ألبان', 'دوكسيسيكلين'],
    title: {en: 'Tetracycline antibiotics with dairy', ar: 'بعض المضادات الحيوية التتراسيكلينية مع الألبان'},
    status: 'Caution',
    summary: {
      en: 'Dairy products may reduce absorption of some tetracycline antibiotics.',
      ar: 'منتجات الألبان قد تقلل امتصاص بعض المضادات الحيوية من مجموعة التتراسيكلين.',
    },
    interactions: {
      en: ['Calcium in dairy can bind the medication and reduce effectiveness.'],
      ar: ['الكالسيوم في الألبان قد يرتبط بالدواء ويقلل فعاليته.'],
    },
    practicalAdvice: {
      en: ['Check the exact antibiotic instructions and separate from dairy when advised.'],
      ar: ['راجع تعليمات المضاد الحيوي نفسه وافصل بينه وبين الألبان عندما تكون هذه هي التوصية.'],
    },
  },
];

export function findCommonDrugInteraction(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;

  return commonDrugInteractions.find((item) =>
    item.matchTerms.some((term) => normalized.includes(term.toLowerCase())),
  ) || null;
}

export {commonDrugInteractions};
