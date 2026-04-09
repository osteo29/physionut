import {describe, expect, it} from 'vitest';
import {ClinicalCalculators, statusToTextClass} from './physioNutritionLogic';

describe('ClinicalCalculators', () => {
  it('calculates BMI with stable rounding and interpretation', () => {
    const bmi = ClinicalCalculators.bmi(70, 175);
    const interpretation = ClinicalCalculators.interpretBMI(bmi, 'en');

    expect(bmi).toBe(22.9);
    expect(interpretation.category).toBe('Normal');
    expect(interpretation.status).toBe('success');
  });

  it('builds goal-based macros from TDEE', () => {
    expect(ClinicalCalculators.macrosFromGoal(2500, 'lose')).toEqual({
      protein: 150,
      carbs: 200,
      fats: 67,
      totalCalories: 2000,
    });

    expect(ClinicalCalculators.macrosFromGoal(2500, 'gain')).toEqual({
      protein: 169,
      carbs: 338,
      fats: 75,
      totalCalories: 2700,
    });
  });

  it('uses the U.S. Navy body-fat formula and guards invalid female input', () => {
    expect(
      ClinicalCalculators.bodyFatUSNavy({
        gender: 'male',
        heightCm: 180,
        waistCm: 85,
        neckCm: 40,
      }),
    ).toBe(14.5);

    expect(
      ClinicalCalculators.bodyFatUSNavy({
        gender: 'female',
        heightCm: 165,
        waistCm: 75,
        neckCm: 32,
      }),
    ).toBe(0);
  });

  it('flags unsafe calorie adjustments while keeping the target non-negative', () => {
    expect(ClinicalCalculators.calorieAdjustmentFromTDEE(2500, 500)).toEqual({
      tdee: 2500,
      deficit: 2000,
      warning: false,
    });

    expect(ClinicalCalculators.calorieAdjustmentFromTDEE(1500, 900)).toEqual({
      tdee: 1500,
      deficit: 600,
      warning: true,
    });
  });

  it('maps statuses to the expected text classes', () => {
    expect(statusToTextClass('success')).toBe('text-health-green');
    expect(statusToTextClass('warning')).toBe('text-amber-500');
    expect(statusToTextClass('danger')).toBe('text-rose-500');
  });
});
