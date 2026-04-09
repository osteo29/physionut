import {Activity, Brain, Calculator, ClipboardList, Droplets, Flame, HeartPulse, Percent, Scale, Search, Stethoscope, Utensils} from 'lucide-react';
import type {ComponentType, ReactNode} from 'react';

import {translations, type Language} from '../../../services/translations';
import type {CalculatorType, ToolGroup} from './types';

type AppTranslations = (typeof translations)[Language];

export type CalculatorConfig = {
  id: Exclude<CalculatorType, null>;
  group: Exclude<ToolGroup, 'all'>;
  title: string;
  icon: ReactNode;
  desc: string;
  hint: string;
};

export type ToolGroupConfig = {
  id: ToolGroup;
  label: string;
  desc: string;
};

export type QuickSectionConfig = {
  id: 'calculators' | 'architect' | 'food-db';
  title: string;
  desc: string;
  icon: ComponentType<{className?: string}>;
};

export function buildCalculators(t: AppTranslations): CalculatorConfig[] {
  return [
    {id: 'BMI', group: 'assessment', title: t.calculators.bmi.title, icon: <Activity className="w-6 h-6" />, desc: t.calculators.bmi.desc, hint: t.calculators.bmi.hint},
    {id: 'WHtR', group: 'assessment', title: t.calculators.whtr.title, icon: <Scale className="w-6 h-6" />, desc: t.calculators.whtr.desc, hint: t.calculators.whtr.hint},
    {id: 'BodyFat', group: 'assessment', title: t.calculators.bodyFat.title, icon: <Percent className="w-6 h-6" />, desc: t.calculators.bodyFat.desc, hint: t.calculators.bodyFat.hint},
    {id: 'IdealWeight', group: 'assessment', title: t.calculators.idealWeight.title, icon: <Scale className="w-6 h-6" />, desc: t.calculators.idealWeight.desc, hint: t.calculators.idealWeight.hint},
    {id: 'BMR', group: 'metabolism', title: t.calculators.bmr.title, icon: <Calculator className="w-6 h-6" />, desc: t.calculators.bmr.desc, hint: t.calculators.bmr.hint},
    {id: 'TDEE', group: 'metabolism', title: t.calculators.tdee.title, icon: <ClipboardList className="w-6 h-6" />, desc: t.calculators.tdee.desc, hint: t.calculators.tdee.hint},
    {id: 'Deficit', group: 'metabolism', title: t.calculators.deficit.title, icon: <Flame className="w-6 h-6" />, desc: t.calculators.deficit.desc, hint: t.calculators.deficit.hint},
    {id: 'Macros', group: 'nutrition', title: t.calculators.macros.title, icon: <HeartPulse className="w-6 h-6" />, desc: t.calculators.macros.desc, hint: t.calculators.macros.hint},
    {id: 'Protein', group: 'nutrition', title: t.calculators.protein.title, icon: <Stethoscope className="w-6 h-6" />, desc: t.calculators.protein.desc, hint: t.calculators.protein.hint},
    {id: 'Water', group: 'nutrition', title: t.calculators.water.title, icon: <Droplets className="w-6 h-6" />, desc: t.calculators.water.desc, hint: t.calculators.water.hint},
    {id: 'Meal', group: 'planning', title: t.calculators.meal.title, icon: <Utensils className="w-6 h-6" />, desc: t.calculators.meal.desc, hint: t.calculators.meal.hint},
  ];
}

export function buildToolGroups(lang: Language): ToolGroupConfig[] {
  return [
    {
      id: 'all',
      label: lang === 'en' ? 'All tools' : 'كل الأدوات',
      desc: lang === 'en' ? 'Browse everything' : 'عرض كل الأدوات',
    },
    {
      id: 'assessment',
      label: lang === 'en' ? 'Body assessment' : 'تقييم الجسم',
      desc: lang === 'en' ? 'BMI, fat, waist metrics' : 'BMI والدهون والخصر',
    },
    {
      id: 'metabolism',
      label: lang === 'en' ? 'Calories & energy' : 'السعرات والطاقة',
      desc: lang === 'en' ? 'BMR, TDEE, deficit' : 'BMR و TDEE والعجز',
    },
    {
      id: 'nutrition',
      label: lang === 'en' ? 'Nutrition targets' : 'أهداف التغذية',
      desc: lang === 'en' ? 'Macros, protein, water' : 'الماكروز والبروتين والماء',
    },
    {
      id: 'planning',
      label: lang === 'en' ? 'Meal planning' : 'تخطيط الوجبات',
      desc: lang === 'en' ? 'Build and total a meal' : 'ابنِ وجبة واحسبها',
    },
  ];
}

export function buildQuickSections(lang: Language, t: AppTranslations): QuickSectionConfig[] {
  return [
    {
      id: 'calculators',
      title: lang === 'en' ? 'Clinical calculators' : 'الحاسبات السريرية',
      desc: lang === 'en' ? 'Start with the right tool.' : 'ابدأ بالأداة المناسبة.',
      icon: Calculator,
    },
    {
      id: 'architect',
      title: t.architect.title,
      desc: lang === 'en' ? 'Get a broader recovery dashboard.' : 'احصل على لوحة تعافٍ أشمل.',
      icon: Brain,
    },
    {
      id: 'food-db',
      title: t.foodDb.title,
      desc: lang === 'en' ? 'Search foods and add them quickly.' : 'ابحث عن الأطعمة وأضفها بسرعة.',
      icon: Search,
    },
  ];
}
