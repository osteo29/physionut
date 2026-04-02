import {MUSCLE_TREE, SUB_MUSCLE_AR_LABELS} from './constants';
import {toTitle} from './filter-utils';
import type {MainMuscle, Option} from './types';

export function getLevelOptions(isAr: boolean): Option[] {
  return [
    {value: 'all', label: isAr ? 'كل المستويات' : 'All levels'},
    {value: 'beginner', label: isAr ? 'مبتدئ' : 'Beginner'},
    {value: 'intermediate', label: isAr ? 'متوسط' : 'Intermediate'},
    {value: 'advanced', label: isAr ? 'متقدم' : 'Advanced'},
  ];
}

export function getEquipmentOptions(isAr: boolean): Option[] {
  return [
    {value: 'all', label: isAr ? 'كل المعدات' : 'All equipment'},
    {value: 'bodyweight', label: isAr ? 'وزن الجسم' : 'Bodyweight'},
    {value: 'dumbbell', label: isAr ? 'دمبل' : 'Dumbbell'},
    {value: 'barbell', label: isAr ? 'بار' : 'Barbell'},
    {value: 'machine', label: isAr ? 'جهاز' : 'Machine'},
    {value: 'band', label: isAr ? 'مطاط' : 'Band'},
  ];
}

export function getExerciseTypeOptions(isAr: boolean): Option[] {
  return [
    {value: 'all', label: isAr ? 'كل الأهداف' : 'All goals'},
    {value: 'strength', label: isAr ? 'قوة' : 'Strength'},
    {value: 'hypertrophy', label: isAr ? 'ضخامة' : 'Hypertrophy'},
    {value: 'endurance', label: isAr ? 'تحمل' : 'Endurance'},
  ];
}

export function getMainMuscleOptions(isAr: boolean): Option[] {
  return [
    {value: 'all', label: isAr ? 'كل العضلات' : 'All muscle groups'},
    {value: 'chest', label: isAr ? 'الصدر' : 'Chest'},
    {value: 'back', label: isAr ? 'الظهر' : 'Back'},
    {value: 'shoulders', label: isAr ? 'الكتف' : 'Shoulders'},
    {value: 'biceps', label: isAr ? 'البايسبس' : 'Biceps'},
    {value: 'triceps', label: isAr ? 'الترايسبس' : 'Triceps'},
    {value: 'forearms', label: isAr ? 'الساعد' : 'Forearms'},
    {value: 'abs', label: isAr ? 'البطن' : 'Abs'},
    {value: 'obliques', label: isAr ? 'الخواصر' : 'Obliques'},
    {value: 'lower_back', label: isAr ? 'أسفل الظهر' : 'Lower back'},
    {value: 'glutes', label: isAr ? 'المقعدة' : 'Glutes'},
    {value: 'quadriceps', label: isAr ? 'الكوادز' : 'Quadriceps'},
    {value: 'hamstrings', label: isAr ? 'الهامسترنج' : 'Hamstrings'},
    {value: 'calves', label: isAr ? 'السمانة' : 'Calves'},
  ];
}

export function getSubMuscleOptions(mainMuscle: MainMuscle | 'all', isAr: boolean): Option[] {
  const allLabel = isAr ? 'كل العضلات الفرعية' : 'All sub-muscles';
  const options: Option[] = [{value: 'all', label: allLabel}];
  const getLabel = (item: string, group?: string) => {
    if (isAr) return SUB_MUSCLE_AR_LABELS[item] || toTitle(item);
    return group ? `${toTitle(item)} (${toTitle(group)})` : toTitle(item);
  };

  if (mainMuscle !== 'all') {
    return [
      ...options,
      ...MUSCLE_TREE[mainMuscle].map((item) => ({value: item, label: getLabel(item)})),
    ];
  }

  return [
    ...options,
    ...Object.entries(MUSCLE_TREE).flatMap(([group, items]) =>
      items.map((item) => ({value: item, label: getLabel(item, group)})),
    ),
  ];
}
