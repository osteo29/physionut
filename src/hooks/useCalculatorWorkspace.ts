import {useEffect, useMemo, useState} from 'react';
import {checkEnvironment} from '../services/calculators';
import {foodDatabase, type FoodItem} from '../services/foodData';
import {translations, type Language} from '../services/translations';
import {buildCalculators, buildToolGroups} from '../features/tools/app/config';
import type {CalculatorType, MealItem, ToolGroup} from '../features/tools/app/types';
import {buildResultAnalysisPrompt, calculateCalculatorResult, validateCalculatorInputs} from '../logic/appCalculatorLogic';
import type {BodyType, GoalType, HealthInterpretation} from '../logic/physioNutritionLogic';
import type {HealthProfile} from '../logic/physioNutritionEngine';
import {architectNumberToInput} from './useArchitectProfile';

const CUSTOM_FOODS_STORAGE_KEY = 'physiohub_custom_foods';

type AppTranslations = (typeof translations)[Language];

type CustomFoodDraft = {
  nameEn: string;
  nameAr: string;
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
};

type Options = {
  architectProfile: HealthProfile;
  initialArchitectProfile: HealthProfile;
  initialCalculatorId?: CalculatorType;
  lang: Language;
  setArchitectProfile: React.Dispatch<React.SetStateAction<HealthProfile>>;
  t: AppTranslations;
};

const emptyMealItem = (): MealItem => ({id: Date.now().toString(), name: '', calories: ''});

const emptyFoodDraft = (): CustomFoodDraft => ({
  nameEn: '',
  nameAr: '',
  calories: '',
  protein: '',
  carbs: '',
  fats: '',
});

function loadCustomFoods() {
  const saved = localStorage.getItem(CUSTOM_FOODS_STORAGE_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as FoodItem[]) : [];
  } catch {
    return [];
  }
}

function toPositiveNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export type CalculatorWorkspaceController = ReturnType<typeof useCalculatorWorkspace>;

export function useCalculatorWorkspace({
  architectProfile,
  initialArchitectProfile,
  initialCalculatorId = null,
  lang,
  setArchitectProfile,
  t,
}: Options) {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(null);
  const [activeToolGroup, setActiveToolGroup] = useState<ToolGroup>('all');

  const [weight, setWeight] = useState(() => architectNumberToInput(initialArchitectProfile.weight));
  const [height, setHeight] = useState(() => architectNumberToInput(initialArchitectProfile.height));
  const [age, setAge] = useState(() => architectNumberToInput(initialArchitectProfile.age));
  const [gender, setGender] = useState<'male' | 'female'>(initialArchitectProfile.gender);
  const [activity, setActivity] = useState(() => String(initialArchitectProfile.activityLevel));
  const [waist, setWaist] = useState(() => architectNumberToInput(initialArchitectProfile.waist));
  const [neck, setNeck] = useState(() => architectNumberToInput(initialArchitectProfile.neck));
  const [hip, setHip] = useState('');
  const [goal, setGoal] = useState<GoalType>(initialArchitectProfile.goal as GoalType);
  const [bodyType, setBodyType] = useState<BodyType>('mesomorph');
  const [pace, setPace] = useState(500);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [knowBodyFat, setKnowBodyFat] = useState(false);
  const [bodyFatInput, setBodyFatInput] = useState('');
  const [hotClimate, setHotClimate] = useState(false);
  const [pregnancy, setPregnancy] = useState(false);

  const [mealItems, setMealItems] = useState<MealItem[]>([{id: '1', name: '', calories: ''}]);
  const [foodSearch, setFoodSearch] = useState('');
  const [foodCategory, setFoodCategory] = useState('all');
  const [customFoods, setCustomFoods] = useState<FoodItem[]>(() => loadCustomFoods());
  const [newFood, setNewFood] = useState<CustomFoodDraft>(() => emptyFoodDraft());

  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isWristModalOpen, setIsWristModalOpen] = useState(false);
  const [isTooltipModalOpen, setIsTooltipModalOpen] = useState(false);
  const [showFoodTable, setShowFoodTable] = useState(false);
  const [tooltipData, setTooltipData] = useState({title: '', text: ''});

  const [result, setResult] = useState<unknown>(null);
  const [healthInterpretation, setHealthInterpretation] = useState<HealthInterpretation | null>(null);
  const [error, setError] = useState('');
  const [justCalculated, setJustCalculated] = useState(false);
  const [analysisPrompt, setAnalysisPrompt] = useState<string | null>(null);

  const calculators = useMemo(() => buildCalculators(t), [t]);
  const toolGroups = useMemo(() => buildToolGroups(lang), [lang]);
  const visibleCalculators = activeToolGroup === 'all'
    ? calculators
    : calculators.filter((calculator) => calculator.group === activeToolGroup);
  const activeCalculatorMeta = calculators.find((calculator) => calculator.id === activeCalculator);

  const filteredFoods = useMemo(() => {
    const allFoods = [...customFoods, ...foodDatabase];
    return allFoods.filter((food) => {
      const matchesSearch =
        food.name.en.toLowerCase().includes(foodSearch.toLowerCase()) ||
        food.name.ar.includes(foodSearch);
      const matchesCategory = foodCategory === 'all' || food.category === foodCategory;
      return matchesSearch && matchesCategory;
    });
  }, [customFoods, foodCategory, foodSearch]);

  useEffect(() => {
    checkEnvironment();
  }, []);

  useEffect(() => {
    localStorage.setItem(CUSTOM_FOODS_STORAGE_KEY, JSON.stringify(customFoods));
  }, [customFoods]);

  useEffect(() => {
    const updates: Partial<HealthProfile> = {};

    const nextWeight = toPositiveNumber(weight);
    if (nextWeight > 0 && architectProfile.weight !== nextWeight) updates.weight = nextWeight;

    const nextHeight = toPositiveNumber(height);
    if (nextHeight > 0 && architectProfile.height !== nextHeight) updates.height = nextHeight;

    const nextAge = toPositiveNumber(age);
    if (nextAge > 0 && architectProfile.age !== nextAge) updates.age = nextAge;

    const nextWaist = toPositiveNumber(waist);
    if (nextWaist > 0 && (architectProfile.waist || 0) !== nextWaist) updates.waist = nextWaist;

    const nextNeck = toPositiveNumber(neck);
    if (nextNeck > 0 && (architectProfile.neck || 0) !== nextNeck) updates.neck = nextNeck;

    const nextActivity = toPositiveNumber(activity);
    if (nextActivity > 0 && architectProfile.activityLevel !== nextActivity) updates.activityLevel = nextActivity;

    if (architectProfile.gender !== gender) updates.gender = gender;
    if (architectProfile.goal !== goal) updates.goal = goal;

    if (Object.keys(updates).length > 0) {
      setArchitectProfile((previous) => ({...previous, ...updates}));
    }
  }, [
    activity,
    age,
    architectProfile.activityLevel,
    architectProfile.age,
    architectProfile.gender,
    architectProfile.goal,
    architectProfile.height,
    architectProfile.neck,
    architectProfile.waist,
    architectProfile.weight,
    gender,
    goal,
    height,
    neck,
    setArchitectProfile,
    waist,
    weight,
  ]);

  useEffect(() => {
    if (!justCalculated) return;

    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        (navigator as Navigator & {vibrate?: (pattern: number) => void}).vibrate?.(15);
      }

      const AudioCtx = window.AudioContext || (window as typeof window & {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 880;
        gain.gain.value = 0.0001;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        osc.stop(ctx.currentTime + 0.13);
        setTimeout(() => ctx.close(), 250);
      }
    } catch {
      // Ignore best-effort feedback failures.
    }

    const timer = setTimeout(() => setJustCalculated(false), 0);
    return () => clearTimeout(timer);
  }, [justCalculated]);

  useEffect(() => {
    if (!activeCalculator) return;

    const timer = setTimeout(() => {
      document.getElementById('calculator-workspace')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 180);

    return () => clearTimeout(timer);
  }, [activeCalculator]);

  useEffect(() => {
    if (!initialCalculatorId) return;

    const nextCalculator = calculators.find((item) => item.id === initialCalculatorId);
    if (!nextCalculator) return;

    setActiveCalculator(nextCalculator.id);
    setActiveToolGroup(nextCalculator.group);
    resetForm();
  }, [calculators, initialCalculatorId]);

  function resetForm() {
    setWeight('');
    setHeight('');
    setAge('');
    setWaist('');
    setNeck('');
    setHip('');
    setGoal('maintain');
    setBodyType('mesomorph');
    setPace(500);
    setKnowBodyFat(false);
    setBodyFatInput('');
    setHotClimate(false);
    setPregnancy(false);
    setMealItems([{id: '1', name: '', calories: ''}]);
    setResult(null);
    setHealthInterpretation(null);
    setError('');
    setAnalysisPrompt(null);
  }

  function handleCalculate() {
    const values = {
      activeCalculator,
      weight,
      height,
      age,
      gender,
      activity,
      waist,
      neck,
      hip,
      goal,
      bodyType,
      pace,
      unitSystem,
      knowBodyFat,
      bodyFatInput,
      hotClimate,
      pregnancy,
      mealItems,
    };

    const validationError = validateCalculatorInputs({values, lang, t});
    if (validationError) {
      setError(validationError);
      return;
    }

    const next = calculateCalculatorResult({values, lang, t});
    setError('');
    setResult(next.result);
    setHealthInterpretation(next.healthInterpretation);
    setJustCalculated(true);
  }

  function showTooltip(title: string, text: string) {
    setTooltipData({title, text});
    setIsTooltipModalOpen(true);
  }

  function addMealItem() {
    setMealItems((previous) => [...previous, emptyMealItem()]);
  }

  function clearAllMealItems() {
    setMealItems([emptyMealItem()]);
    setResult(null);
    setHealthInterpretation(null);
  }

  function removeMealItem(id: string) {
    setMealItems((previous) => previous.length > 1 ? previous.filter((item) => item.id !== id) : previous);
  }

  function updateMealItem(id: string, field: 'name' | 'calories', value: string) {
    setMealItems((previous) => previous.map((item) => item.id === id ? {...item, [field]: value} : item));
  }

  function addFoodToMeal(food: FoodItem) {
    const newItem: MealItem = {
      id: Date.now().toString(),
      name: food.name[lang],
      calories: food.calories.toString(),
    };

    setMealItems((previous) => (
      previous.length === 1 && !previous[0].name && !previous[0].calories
        ? [newItem]
        : [...previous, newItem]
    ));

    document.getElementById('calculators')?.scrollIntoView({behavior: 'smooth'});
    setActiveCalculator('Meal');
  }

  function saveCustomFood() {
    if (!newFood.nameEn || !newFood.calories) {
      setError(lang === 'en' ? 'Please fill in required fields' : 'يرجى ملء الحقول المطلوبة');
      return;
    }

    const food: FoodItem = {
      id: `custom-${Date.now()}`,
      name: {
        en: newFood.nameEn,
        ar: newFood.nameAr || newFood.nameEn,
      },
      category: 'cooked',
      calories: Number(newFood.calories),
      protein: Number(newFood.protein) || 0,
      carbs: Number(newFood.carbs) || 0,
      fats: Number(newFood.fats) || 0,
    };

    setCustomFoods((previous) => [food, ...previous]);
    setIsCustomModalOpen(false);
    setNewFood(emptyFoodDraft());
    setError('');
  }

  function openResultAnalysis() {
    setAnalysisPrompt(buildResultAnalysisPrompt(activeCalculator, lang));
    document.getElementById('result-ai-panel')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return {
    activeCalculator,
    activeCalculatorMeta,
    activeToolGroup,
    activity,
    age,
    analysisPrompt,
    bodyFatInput,
    bodyType,
    calculators,
    clearAllMealItems,
    customFoods,
    error,
    filteredFoods,
    foodCategory,
    foodSearch,
    gender,
    goal,
    handleCalculate,
    height,
    hip,
    hotClimate,
    isCustomModalOpen,
    isTooltipModalOpen,
    isWristModalOpen,
    justCalculated,
    knowBodyFat,
    mealItems,
    neck,
    newFood,
    openResultAnalysis,
    pace,
    pregnancy,
    removeMealItem,
    resetForm,
    result,
    healthInterpretation,
    saveCustomFood,
    setActiveCalculator,
    setActiveToolGroup,
    setActivity,
    setAge,
    setAnalysisPrompt,
    setBodyFatInput,
    setBodyType,
    setFoodCategory,
    setFoodSearch,
    setGender,
    setGoal,
    setHeight,
    setHip,
    setHotClimate,
    setIsCustomModalOpen,
    setIsTooltipModalOpen,
    setIsWristModalOpen,
    setKnowBodyFat,
    setMealItems,
    setNeck,
    setNewFood,
    setPace,
    setPregnancy,
    setShowFoodTable,
    setUnitSystem,
    setWaist,
    setWeight,
    showFoodTable,
    showTooltip,
    toolGroups,
    tooltipData,
    unitSystem,
    updateMealItem,
    visibleCalculators,
    waist,
    weight,
    addFoodToMeal,
    addMealItem,
  };
}
