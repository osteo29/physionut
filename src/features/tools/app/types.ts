export type CalculatorType =
  | 'BMI'
  | 'WHtR'
  | 'BMR'
  | 'TDEE'
  | 'Macros'
  | 'Protein'
  | 'IdealWeight'
  | 'BodyFat'
  | 'Water'
  | 'Deficit'
  | 'Meal'
  | null;

export type ToolGroup = 'all' | 'assessment' | 'metabolism' | 'nutrition' | 'planning';

export interface MealItem {
  id: string;
  name: string;
  calories: string;
}
