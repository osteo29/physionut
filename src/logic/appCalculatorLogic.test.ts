import {describe, expect, it} from 'vitest';
import {buildResultAnalysisPrompt, calculateCalculatorResult, type CalculatorFormValues, validateCalculatorInputs} from './appCalculatorLogic';
import {translations} from '../services/translations';

function makeValues(overrides: Partial<CalculatorFormValues> = {}): CalculatorFormValues {
  return {
    activeCalculator: 'BMI',
    weight: '70',
    height: '175',
    age: '30',
    gender: 'male',
    activity: '1.55',
    waist: '80',
    neck: '38',
    hip: '95',
    goal: 'maintain',
    bodyType: 'mesomorph',
    pace: 500,
    unitSystem: 'metric',
    knowBodyFat: false,
    bodyFatInput: '',
    hotClimate: false,
    pregnancy: false,
    mealItems: [],
    ...overrides,
  };
}

describe('appCalculatorLogic', () => {
  it('validates required fields based on the active calculator', () => {
    expect(
      validateCalculatorInputs({
        values: makeValues({weight: ''}),
        lang: 'en',
        t: translations.en,
      }),
    ).toBe(translations.en.errors.weight);

    expect(
      validateCalculatorInputs({
        values: makeValues({
          activeCalculator: 'BodyFat',
          gender: 'female',
          hip: '',
        }),
        lang: 'en',
        t: translations.en,
      }),
    ).toBe(translations.en.errors.hip);
  });

  it('calculates WHtR in imperial mode using metric conversion', () => {
    const {result, healthInterpretation} = calculateCalculatorResult({
      values: makeValues({
        activeCalculator: 'WHtR',
        unitSystem: 'imperial',
        waist: '30',
        height: '70',
      }),
      lang: 'en',
      t: translations.en,
    });

    expect(result).toEqual({ratio: 0.43, category: 'Healthy'});
    expect(healthInterpretation).toBeNull();
  });

  it('totals meal calories from mixed numeric strings', () => {
    const {result} = calculateCalculatorResult({
      values: makeValues({
        activeCalculator: 'Meal',
        mealItems: [
          {id: '1', name: 'Chicken', calories: '200'},
          {id: '2', name: 'Rice', calories: '150.5'},
          {id: '3', name: 'Salad', calories: '0'},
        ],
      }),
      lang: 'en',
      t: translations.en,
    });

    expect(result).toBe(350.5);
  });

  it('builds calculator-specific analysis prompts and returns null without a calculator', () => {
    expect(buildResultAnalysisPrompt('BMI', 'en')).toContain('BMI');
    expect(buildResultAnalysisPrompt(null, 'en')).toBeNull();
  });
});
