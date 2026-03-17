// src/services/physioNutritionLogic.ts

export interface HealthProfile {
  age: number;
  weight: number; // in kg
  height: number; // in cm
  gender: 'male' | 'female';
  activityLevel: number;
  goal: 'weight_loss' | 'maintenance' | 'muscle_gain' | 'recovery' | 'maintain' | 'lose' | 'gain';
  waist?: number;
  neck?: number;
  injuryType: string | null;
  recoveryWeek: number;
  sleepHours: number;
  waterIntake: number; // in ml
  proteinCompliance: number; // 0 to 1
}

export interface HealthMetrics {
  bmi: number;
  bmiCategory: string;
  whtr: number;
  whtrCategory: string;
  bmr: number;
  tdee: number;
  macros: {
    protein: number;
    fats: number;
    carbs: number;
    totalCalories: number;
  };
  healthScore: number;
  hydrationTarget: number;
  recoveryStage: string;
  recoveryFocus: string;
  suggestedNutrients: any[];
  suggestedFoods: string[];
}

import { getInjuryById } from './injuryDatabase';

export const PhysioNutritionLogic = {
  calculateAllMetrics: (profile: HealthProfile): HealthMetrics => {
    const { age, weight, height, gender, activityLevel, goal, sleepHours, waterIntake, proteinCompliance, injuryType, recoveryWeek } = profile;

    // 1. BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    let bmiCategory = '';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi < 25) bmiCategory = 'Normal';
    else if (bmi < 30) bmiCategory = 'Overweight';
    else if (bmi < 35) bmiCategory = 'Obese Class I';
    else if (bmi < 40) bmiCategory = 'Obese Class II';
    else bmiCategory = 'Obese Class III';

    // 1b. WHtR (Waist to Height Ratio)
    let whtr = 0;
    let whtrCategory = 'N/A';
    if (profile.waist && profile.waist > 0) {
      whtr = profile.waist / height;
      if (whtr < 0.4) whtrCategory = 'Extremely Slim';
      else if (whtr <= 0.5) whtrCategory = 'Healthy / Low Risk';
      else if (whtr <= 0.6) whtrCategory = 'Overweight / Increased Risk';
      else whtrCategory = 'Obese / High Risk';
    }

    // 2. BMR (Mifflin-St Jeor Equation)
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (gender === 'male') bmr += 5;
    else bmr -= 161;

    // 3. TDEE
    const tdee = bmr * activityLevel;

    // 4. Macros based on Goal
    let targetCalories = tdee;
    const normalizedGoal = goal === 'weight_loss' || goal === 'lose' ? 'lose' : 
                          goal === 'muscle_gain' || goal === 'gain' ? 'gain' : 
                          goal === 'recovery' ? 'recovery' : 'maintain';

    if (normalizedGoal === 'lose') targetCalories -= 500;
    if (normalizedGoal === 'gain') targetCalories += 300;
    if (normalizedGoal === 'recovery') targetCalories += 100;

    // Protein requirement
    let proteinPerKg = 1.6;
    if (normalizedGoal === 'gain') proteinPerKg = 2.0;
    if (normalizedGoal === 'lose') proteinPerKg = 1.8;
    if (injuryType && injuryType !== 'none') proteinPerKg = Math.max(proteinPerKg, 2.0);

    const protein = weight * proteinPerKg;
    const fats = (targetCalories * 0.25) / 9;
    const carbs = (targetCalories - (protein * 4 + fats * 9)) / 4;

    // 5. Hydration Target (ml)
    const hydrationTarget = (weight * 33) + (activityLevel > 1.5 ? 500 : 0);

    // 6. Injury Specifics
    let recoveryStage = 'General Health';
    let recoveryFocus = 'Maintenance & Longevity';
    let suggestedNutrients: any[] = [];
    let suggestedFoods: string[] = [];

    if (injuryType && injuryType !== 'none') {
      const injury = getInjuryById(injuryType);
      if (injury) {
        // Determine stage based on week
        let stageKey = 'week1-2';
        if (recoveryWeek > 2 && recoveryWeek <= 6) stageKey = 'week3-6';
        if (recoveryWeek > 6) stageKey = 'week7+';
        
        // Handle injuries with different stage keys
        if (injury.stages[stageKey]) {
          const stage = injury.stages[stageKey];
          recoveryStage = stage.phase;
          recoveryFocus = stage.focus;
          suggestedNutrients = stage.nutrients;
          suggestedFoods = stage.foods;
        } else {
          // Fallback to first stage if key doesn't match exactly
          const firstStage = Object.values(injury.stages)[0];
          recoveryStage = firstStage.phase;
          recoveryFocus = firstStage.focus;
          suggestedNutrients = firstStage.nutrients;
          suggestedFoods = firstStage.foods;
        }
      }
    }

    // 7. Health Score (out of 100)
    let bmiScore = 0;
    if (bmi >= 18.5 && bmi <= 24.9) bmiScore = 25;
    else if (bmi >= 25 && bmi <= 29.9) bmiScore = 15;
    else bmiScore = 5;

    const activityScore = Math.min(((activityLevel - 1.2) / (1.9 - 1.2)) * 20, 20);
    const proteinScore = (proteinCompliance) * 20; // Assuming 0-1
    const waterScore = Math.min((waterIntake / hydrationTarget) * 15, 15);
    const sleepScore = Math.min((sleepHours / 8) * 20, 20);

    const healthScore = Math.round(bmiScore + activityScore + proteinScore + waterScore + sleepScore);

    return {
      bmi: parseFloat(bmi.toFixed(1)),
      bmiCategory,
      whtr: parseFloat(whtr.toFixed(2)),
      whtrCategory,
      bmr: Math.round(bmr),
      tdee: Math.round(targetCalories),
      macros: {
        protein: Math.round(protein),
        fats: Math.round(fats),
        carbs: Math.round(carbs),
        totalCalories: Math.round(targetCalories)
      },
      healthScore,
      hydrationTarget: Math.round(hydrationTarget),
      recoveryStage,
      recoveryFocus,
      suggestedNutrients,
      suggestedFoods
    };
  }
};

export const saveProfile = (profile: HealthProfile) => {
  localStorage.setItem('physio_health_profile', JSON.stringify(profile));
};

export const loadProfile = (): HealthProfile | null => {
  const data = localStorage.getItem('physio_health_profile');
  return data ? JSON.parse(data) : null;
};
