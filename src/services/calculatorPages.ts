export const CALCULATOR_PAGE_CONFIGS = [
  {
    slug: 'bmi',
    calculatorId: 'BMI',
    titleEn: 'BMI calculator',
    titleAr: 'حاسبة BMI',
    descriptionEn: 'Estimate body mass index for a fast screening view before deeper nutrition or rehab planning.',
    descriptionAr: 'احسب مؤشر كتلة الجسم بسرعة كخطوة أولى قبل التخطيط الغذائي أو التأهيلي.',
  },
  {
    slug: 'whtr',
    calculatorId: 'WHtR',
    titleEn: 'Waist-to-height ratio calculator',
    titleAr: 'حاسبة نسبة الخصر للطول',
    descriptionEn: 'Use waist-to-height ratio to review central fat distribution alongside other screening markers.',
    descriptionAr: 'احسب نسبة الخصر إلى الطول لمراجعة توزيع الدهون المركزي مع مؤشرات التقييم الأخرى.',
  },
  {
    slug: 'body-fat',
    calculatorId: 'BodyFat',
    titleEn: 'Body fat calculator',
    titleAr: 'حاسبة دهون الجسم',
    descriptionEn: 'Estimate body-fat percentage with practical anthropometric inputs for follow-up and goal setting.',
    descriptionAr: 'قدّر نسبة دهون الجسم بمدخلات بسيطة تساعد في المتابعة وتحديد الهدف.',
  },
  {
    slug: 'ideal-weight',
    calculatorId: 'IdealWeight',
    titleEn: 'Ideal body weight calculator',
    titleAr: 'حاسبة الوزن المثالي',
    descriptionEn: 'Review a reference ideal-weight estimate and compare it with your actual training or recovery context.',
    descriptionAr: 'راجع تقديرًا مرجعيًا للوزن المثالي وقارنه بسياقك الفعلي في التدريب أو التعافي.',
  },
  {
    slug: 'bmr',
    calculatorId: 'BMR',
    titleEn: 'BMR calculator',
    titleAr: 'حاسبة BMR',
    descriptionEn: 'Estimate basal metabolic rate to understand foundational energy needs before activity is added.',
    descriptionAr: 'احسب معدل الأيض الأساسي لفهم احتياجك الطاقي الأساسي قبل إضافة النشاط اليومي.',
  },
  {
    slug: 'tdee',
    calculatorId: 'TDEE',
    titleEn: 'TDEE calculator',
    titleAr: 'حاسبة TDEE',
    descriptionEn: 'Estimate total daily energy expenditure for maintenance, recovery fueling, and nutrition planning.',
    descriptionAr: 'احسب إجمالي احتياجك اليومي من الطاقة للصيانة أو التعافي أو تخطيط التغذية.',
  },
  {
    slug: 'calorie-deficit',
    calculatorId: 'Deficit',
    titleEn: 'Calorie deficit calculator',
    titleAr: 'حاسبة عجز السعرات',
    descriptionEn: 'Set a more controlled calorie deficit target without relying on aggressive cuts or guesswork.',
    descriptionAr: 'حدد هدفًا أكثر اتزانًا لعجز السعرات بدل الاعتماد على التخمين أو الخفض العنيف.',
  },
  {
    slug: 'macros',
    calculatorId: 'Macros',
    titleEn: 'Macro calculator',
    titleAr: 'حاسبة الماكروز',
    descriptionEn: 'Split calories into protein, carbs, and fats for body-composition goals and rehab support.',
    descriptionAr: 'قسّم السعرات إلى بروتين وكربوهيدرات ودهون بما يناسب الهدف الجسدي ودعم التعافي.',
  },
  {
    slug: 'protein',
    calculatorId: 'Protein',
    titleEn: 'Protein needs calculator',
    titleAr: 'حاسبة البروتين',
    descriptionEn: 'Estimate daily protein intake for muscle retention, rehab, recovery, and performance support.',
    descriptionAr: 'احسب احتياجك اليومي من البروتين لدعم العضلات والتعافي والأداء.',
  },
  {
    slug: 'water',
    calculatorId: 'Water',
    titleEn: 'Water intake calculator',
    titleAr: 'حاسبة الماء',
    descriptionEn: 'Estimate daily hydration needs with activity and climate context for practical follow-up.',
    descriptionAr: 'احسب احتياجك اليومي من الماء مع مراعاة النشاط والحرارة في الاستخدام العملي.',
  },
  {
    slug: 'meal-calories',
    calculatorId: 'Meal',
    titleEn: 'Meal calories calculator',
    titleAr: 'حاسبة سعرات الوجبة',
    descriptionEn: 'Build a meal item by item and total the calories for quick meal-planning checks.',
    descriptionAr: 'ابنِ الوجبة عنصرًا عنصرًا واحسب سعراتها بسرعة لتسهيل تخطيط الوجبات.',
  },
] as const;

export type CalculatorPageSlug = (typeof CALCULATOR_PAGE_CONFIGS)[number]['slug'];
export type CalculatorPageId = (typeof CALCULATOR_PAGE_CONFIGS)[number]['calculatorId'];

export function getCalculatorPageBySlug(slug?: string | null) {
  return CALCULATOR_PAGE_CONFIGS.find((item) => item.slug === slug) || null;
}

export function getCalculatorPageById(id?: string | null) {
  return CALCULATOR_PAGE_CONFIGS.find((item) => item.calculatorId === id) || null;
}
