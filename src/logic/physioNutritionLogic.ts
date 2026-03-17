export type StatusColor = 'success' | 'warning' | 'danger';

export type GoalType = 'lose' | 'maintain' | 'gain';
export type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';

export type Gender = 'male' | 'female';

export type HealthInterpretation = {
  message: string;
  status: StatusColor;
};

export type MacroResult = {
  protein: number;
  carbs: number;
  fats: number;
  totalCalories: number;
};

export type DeficitResult = {
  tdee: number;
  deficit: number; // target calories after adjustment
  warning: boolean;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const round1 = (v: number) => Math.round(v * 10) / 10;

const safeLog10 = (v: number) => {
  if (v <= 0) return Number.NaN;
  return Math.log10(v);
};

export const ClinicalCalculators = {
  // 1) BMI (kg/m^2)
  bmi(weightKg: number, heightCm: number): number {
    if (weightKg <= 0 || heightCm <= 0) return 0;
    const m = heightCm / 100;
    return round1(weightKg / (m * m));
  },

  interpretBMI(bmi: number, lang: 'en' | 'ar' = 'en'): HealthInterpretation & {category: string} {
    if (!Number.isFinite(bmi) || bmi <= 0) {
      return {
        category: lang === 'en' ? '—' : '—',
        message: lang === 'en' ? 'Enter valid values to calculate BMI.' : 'أدخل قيمًا صحيحة لحساب مؤشر كتلة الجسم.',
        status: 'warning',
      };
    }

    // WHO adult classification
    if (bmi < 18.5) {
      return {
        category: lang === 'en' ? 'Underweight' : 'نقص وزن',
        message: lang === 'en' ? 'Your BMI is below the healthy range.' : 'مؤشر كتلة الجسم أقل من النطاق الصحي.',
        status: 'warning',
      };
    }
    if (bmi < 25) {
      return {
        category: lang === 'en' ? 'Normal' : 'طبيعي',
        message: lang === 'en' ? 'Your BMI is within the healthy range.' : 'مؤشر كتلة الجسم ضمن النطاق الصحي.',
        status: 'success',
      };
    }
    if (bmi < 30) {
      return {
        category: lang === 'en' ? 'Overweight' : 'وزن زائد',
        message: lang === 'en' ? 'Your BMI is above the healthy range.' : 'مؤشر كتلة الجسم أعلى من النطاق الصحي.',
        status: 'warning',
      };
    }
    return {
      category: lang === 'en' ? 'Obese' : 'سمنة',
      message: lang === 'en' ? 'Your BMI is in the obesity range. Consider clinical guidance.' : 'مؤشر كتلة الجسم في نطاق السمنة. يُفضّل مراجعة مختص.',
      status: 'danger',
    };
  },

  // 2) BMR (Mifflin–St Jeor)
  bmrMifflinStJeor(params: {weightKg: number; heightCm: number; ageYears: number; gender: Gender}): number {
    const {weightKg, heightCm, ageYears, gender} = params;
    if (weightKg <= 0 || heightCm <= 0 || ageYears <= 0) return 0;
    const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
    return Math.round(gender === 'male' ? base + 5 : base - 161);
  },

  interpretBMR(bmr: number, lang: 'en' | 'ar' = 'en'): HealthInterpretation {
    if (!Number.isFinite(bmr) || bmr <= 0) {
      return {message: lang === 'en' ? 'Enter valid values to calculate BMR.' : 'أدخل قيمًا صحيحة لحساب BMR.', status: 'warning'};
    }
    return {
      message:
        lang === 'en'
          ? 'BMR is your estimated resting energy needs. Use TDEE for daily targets.'
          : 'BMR هو تقدير لاحتياجك أثناء الراحة. استخدم TDEE لتحديد السعرات اليومية.',
      status: 'success',
    };
  },

  // 3) TDEE (BMR * activity factor)
  tdee(bmr: number, activityFactor: number): number {
    if (bmr <= 0 || activityFactor <= 0) return 0;
    return Math.round(bmr * activityFactor);
  },

  interpretTDEE(tdee: number, lang: 'en' | 'ar' = 'en'): HealthInterpretation {
    if (!Number.isFinite(tdee) || tdee <= 0) {
      return {message: lang === 'en' ? 'Enter valid values to calculate TDEE.' : 'أدخل قيمًا صحيحة لحساب TDEE.', status: 'warning'};
    }
    return {
      message:
        lang === 'en'
          ? 'TDEE is your estimated daily energy needs based on activity.'
          : 'TDEE هو تقدير لاحتياجك اليومي من الطاقة بناءً على مستوى النشاط.',
      status: 'success',
    };
  },

  // 4) Ideal Body Weight (Devine)
  idealBodyWeightDevine(heightCm: number, gender: Gender): number {
    if (heightCm <= 0) return 0;
    const inches = heightCm / 2.54;
    const inchesOver60 = inches - 60;
    const base = gender === 'male' ? 50 : 45.5;
    return round1(base + 2.3 * inchesOver60);
  },

  interpretIBW(ibwKg: number, lang: 'en' | 'ar' = 'en'): HealthInterpretation {
    if (!Number.isFinite(ibwKg) || ibwKg <= 0) {
      return {message: lang === 'en' ? 'Enter valid values to calculate IBW.' : 'أدخل قيمًا صحيحة لحساب الوزن المثالي.', status: 'warning'};
    }
    return {
      message:
        lang === 'en'
          ? 'IBW is a clinical baseline estimate and may not fit high-muscle individuals.'
          : 'الوزن المثالي تقدير سريري أساسي وقد لا يناسب أصحاب الكتلة العضلية العالية.',
      status: 'success',
    };
  },

  // 5) Macro split (goal-based)
  macrosFromGoal(tdee: number, goal: GoalType): MacroResult {
    if (tdee <= 0) return {protein: 0, carbs: 0, fats: 0, totalCalories: 0};

    // Safe, commonly used clinical-style targets:
    // Cutting: ~20% deficit, Maintenance: 0, Bulking: ~8% surplus (capped)
    const targetCalories =
      goal === 'lose'
        ? Math.round(tdee * 0.8)
        : goal === 'gain'
          ? Math.round(tdee * 1.08)
          : Math.round(tdee);

    // Ratios by goal
    const ratio =
      goal === 'lose'
        ? {p: 0.3, c: 0.4, f: 0.3}
        : goal === 'gain'
          ? {p: 0.25, c: 0.5, f: 0.25}
          : {p: 0.25, c: 0.45, f: 0.3};

    return {
      protein: Math.round((targetCalories * ratio.p) / 4),
      carbs: Math.round((targetCalories * ratio.c) / 4),
      fats: Math.round((targetCalories * ratio.f) / 9),
      totalCalories: targetCalories,
    };
  },

  interpretMacros(goal: GoalType, lang: 'en' | 'ar' = 'en'): HealthInterpretation {
    return {
      message:
        goal === 'lose'
          ? lang === 'en'
            ? 'Cutting split emphasizes protein to support lean mass.'
            : 'تقسيمة التنشيف تركز على البروتين لدعم الكتلة الخالية من الدهون.'
          : goal === 'gain'
            ? lang === 'en'
              ? 'Bulking split prioritizes carbs for training performance.'
              : 'تقسيمة التضخيم ترفع الكربوهيدرات لدعم الأداء التدريبي.'
            : lang === 'en'
              ? 'Maintenance split supports stable energy and adherence.'
              : 'تقسيمة الثبات تساعد على استقرار الطاقة والالتزام.',
      status: 'success',
    };
  },

  // 6) Water intake (ml/day)
  waterIntakeMl(weightKg: number, activityFactor: number, options?: {hotClimate?: boolean; pregnancy?: boolean}): number {
    if (weightKg <= 0) return 0;
    // baseline: 35 ml/kg/day (common sports-med baseline)
    let ml = weightKg * 35;

    // activity adjustment (coarse, factor-based)
    if (activityFactor >= 1.375) ml += 300;
    if (activityFactor >= 1.55) ml += 600;
    if (activityFactor >= 1.725) ml += 900;
    if (activityFactor >= 1.9) ml += 1200;

    if (options?.hotClimate) ml += 500;
    if (options?.pregnancy) ml += 700;

    return Math.round(ml);
  },

  interpretWater(ml: number, lang: 'en' | 'ar' = 'en'): HealthInterpretation {
    if (!Number.isFinite(ml) || ml <= 0) {
      return {message: lang === 'en' ? 'Enter valid values to estimate water intake.' : 'أدخل قيمًا صحيحة لتقدير احتياج الماء.', status: 'warning'};
    }
    return {
      message:
        lang === 'en'
          ? 'Hydration needs vary with climate, sweat rate, and medical conditions.'
          : 'احتياج الماء يختلف حسب الجو ومعدل التعرق والحالات الطبية.',
      status: 'success',
    };
  },

  // 7) Body fat % (U.S. Navy method, metric; height/waist/neck/hip in cm)
  bodyFatUSNavy(params: {gender: Gender; heightCm: number; waistCm: number; neckCm: number; hipCm?: number}): number {
    const {gender, heightCm, waistCm, neckCm, hipCm} = params;
    if (heightCm <= 0 || waistCm <= 0 || neckCm <= 0) return 0;

    if (gender === 'male') {
      const a = waistCm - neckCm;
      const logA = safeLog10(a);
      const logH = safeLog10(heightCm);
      if (!Number.isFinite(logA) || !Number.isFinite(logH)) return 0;
      const bf = 495 / (1.0324 - 0.19077 * logA + 0.15456 * logH) - 450;
      return round1(clamp(bf, 0, 70));
    }

    if (!hipCm || hipCm <= 0) return 0;
    const a = waistCm + hipCm - neckCm;
    const logA = safeLog10(a);
    const logH = safeLog10(heightCm);
    if (!Number.isFinite(logA) || !Number.isFinite(logH)) return 0;
    const bf = 495 / (1.29579 - 0.35004 * logA + 0.221 * logH) - 450;
    return round1(clamp(bf, 0, 70));
  },

  interpretBodyFat(bf: number, gender: Gender, lang: 'en' | 'ar' = 'en'): HealthInterpretation & {category: string} {
    if (!Number.isFinite(bf) || bf <= 0) {
      return {
        category: lang === 'en' ? '—' : '—',
        message: lang === 'en' ? 'Enter valid measurements to estimate body fat.' : 'أدخل قياسات صحيحة لتقدير نسبة الدهون.',
        status: 'warning',
      };
    }

    // ACE categories (commonly referenced)
    const thresholds =
      gender === 'male'
        ? {essential: 5, athlete: 13, fitness: 17, average: 24}
        : {essential: 13, athlete: 20, fitness: 24, average: 31};

    const category =
      bf <= thresholds.essential
        ? lang === 'en'
          ? 'Essential Fat'
          : 'دهون أساسية'
        : bf <= thresholds.athlete
          ? lang === 'en'
            ? 'Athletes'
            : 'رياضي'
          : bf <= thresholds.fitness
            ? lang === 'en'
              ? 'Fitness'
              : 'لياقة'
            : bf <= thresholds.average
              ? lang === 'en'
                ? 'Average'
                : 'متوسط'
              : lang === 'en'
                ? 'Obese'
                : 'سمنة';

    const status: StatusColor =
      category === (lang === 'en' ? 'Fitness' : 'لياقة') || category === (lang === 'en' ? 'Athletes' : 'رياضي')
        ? 'success'
        : category === (lang === 'en' ? 'Average' : 'متوسط')
          ? 'warning'
          : category === (lang === 'en' ? 'Essential Fat' : 'دهون أساسية')
            ? 'warning'
            : 'danger';

    const message =
      status === 'success'
        ? lang === 'en'
          ? 'Your estimated body fat is within a favorable range.'
          : 'نسبة الدهون التقديرية ضمن نطاق جيد.'
        : status === 'warning'
          ? lang === 'en'
            ? 'Your estimated body fat may be outside the optimal range.'
            : 'قد تكون نسبة الدهون التقديرية خارج النطاق الأمثل.'
          : lang === 'en'
            ? 'Your estimated body fat is high. Consider clinical guidance.'
            : 'نسبة الدهون التقديرية مرتفعة. يُفضّل مراجعة مختص.';

    return {category, message, status};
  },

  // 8) Protein needs (g/day) based on training intensity (factor in g/kg)
  proteinNeedsG(weightKg: number, factorGPerKg: number): number {
    if (weightKg <= 0 || factorGPerKg <= 0) return 0;
    return Math.round(weightKg * factorGPerKg);
  },

  interpretProtein(factor: number, lang: 'en' | 'ar' = 'en'): HealthInterpretation {
    if (!Number.isFinite(factor) || factor <= 0) {
      return {message: lang === 'en' ? 'Select an intensity to estimate protein needs.' : 'اختر شدة النشاط لتقدير احتياج البروتين.', status: 'warning'};
    }
    return {
      message:
        lang === 'en'
          ? 'Protein needs depend on training load, goals, and medical conditions.'
          : 'احتياج البروتين يعتمد على الحمل التدريبي والأهداف والحالات الطبية.',
      status: 'success',
    };
  },

  // 9) Calorie deficit/surplus safe ranges
  calorieAdjustmentFromTDEE(tdee: number, deltaKcalPerDay: number): DeficitResult {
    const target = Math.round(tdee - deltaKcalPerDay);
    const isDeficit = deltaKcalPerDay > 0;
    const safe = isDeficit ? deltaKcalPerDay >= 250 && deltaKcalPerDay <= 750 : deltaKcalPerDay >= -500 && deltaKcalPerDay <= -200;
    const warning = target < 1200 || !safe;
    return {tdee, deficit: Math.max(0, target), warning};
  },

  interpretCalorieAdjustment(deltaKcalPerDay: number, lang: 'en' | 'ar' = 'en'): HealthInterpretation {
    const isDeficit = deltaKcalPerDay > 0;
    const abs = Math.abs(deltaKcalPerDay);
    const safe = isDeficit ? abs >= 250 && abs <= 750 : abs >= 200 && abs <= 500;
    if (!safe) {
      return {
        message:
          lang === 'en'
            ? 'This adjustment is outside commonly recommended safe ranges.'
            : 'هذا التعديل خارج النطاقات الآمنة الشائعة.',
        status: 'warning',
      };
    }
    return {
      message:
        isDeficit
          ? lang === 'en'
            ? 'A moderate deficit is generally safer and more sustainable.'
            : 'العجز المعتدل غالبًا أكثر أمانًا واستدامة.'
          : lang === 'en'
            ? 'A modest surplus supports lean gains with less fat gain risk.'
            : 'الفائض البسيط يدعم زيادة الكتلة مع تقليل زيادة الدهون.',
      status: 'success',
    };
  },

  // 10) Meal calories (sum)
  mealCalories(items: Array<{calories: number | string}>): number {
    return items.reduce((sum, it) => sum + (Number(it.calories) || 0), 0);
  },

  interpretMeal(totalCalories: number, lang: 'en' | 'ar' = 'en'): HealthInterpretation {
    if (!Number.isFinite(totalCalories) || totalCalories <= 0) {
      return {message: lang === 'en' ? 'Add ingredients to sum meal calories.' : 'أضف مكونات لحساب سعرات الوجبة.', status: 'warning'};
    }
    return {
      message: lang === 'en' ? 'Meal calories are a sum of entered ingredients.' : 'سعرات الوجبة هي مجموع سعرات المكونات المدخلة.',
      status: 'success',
    };
  },
};

export function statusToTextClass(status: StatusColor): string {
  switch (status) {
    case 'success':
      return 'text-health-green';
    case 'warning':
      return 'text-amber-500';
    case 'danger':
      return 'text-rose-500';
  }
}

