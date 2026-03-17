import { 
  Activity, Calculator, BookOpen, Menu, X, ChevronRight, Stethoscope, HeartPulse, 
  ClipboardList, GraduationCap, Info, Droplets, Scale, Percent, Flame, Utensils, 
  Plus, Trash2, Globe, Calendar, Tag, Search, Filter, HelpCircle, Sparkles, Brain, 
  Zap, ShieldAlert, Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin,
  ArrowUpRight, ExternalLink
} from 'lucide-react';
import { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { checkEnvironment } from './services/calculators';
import { PhysioNutritionLogic, HealthProfile, HealthMetrics } from './services/physioNutritionLogic';
import { injuryDatabase, getInjuryById } from './services/injuryDatabase';
import { GoogleGenAI } from "@google/genai";
import { translations, Language } from './services/translations';
import { getArticles, Article } from './services/articles';
import { foodDatabase, FoodItem } from './services/foodData';
import {ClinicalCalculators, statusToTextClass, type HealthInterpretation, type GoalType, type BodyType} from './logic/physioNutritionLogic';
import Hero from './components/home/Hero';
import WhatsNew from './components/home/WhatsNew';
import Footer from './components/layout/Footer';
import Navigation from './components/layout/Navigation';
import AboutSection from './components/home/AboutSection';
import NewsletterSection from './components/home/NewsletterSection';
import BlogSection from './components/home/BlogSection';
import AskAboutResultChat from './components/ai/AskAboutResultChat';
import DrugNutrientChecker from './components/ai/DrugNutrientChecker';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

type CalculatorType = 'BMI' | 'WHtR' | 'BMR' | 'TDEE' | 'Macros' | 'Protein' | 'IdealWeight' | 'BodyFat' | 'Water' | 'Deficit' | 'Meal' | null;

interface MealItem {
  id: string;
  name: string;
  calories: string;
}

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, any> = {
    Activity, Calculator, BookOpen, Menu, X, ChevronRight, Stethoscope, HeartPulse, ClipboardList, GraduationCap, Info, Droplets, Scale, Percent, Flame, Utensils, Plus, Trash2, Globe, Calendar, Tag, Search, Filter, HelpCircle, Sparkles, Brain, Zap, ShieldAlert
  };
  const Icon = icons[name] || HelpCircle;
  return <Icon className={className} />;
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(null);
  const [activeToolGroup, setActiveToolGroup] = useState<'all' | 'assessment' | 'metabolism' | 'nutrition' | 'planning'>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('physiohub_lang');
    return (saved as Language) || 'en';
  });

  const t = translations[lang];
  
  // Form States
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<string>('1.2');
  const [waist, setWaist] = useState<string>('');
  const [neck, setNeck] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [goal, setGoal] = useState<GoalType>('maintain');
  const [bodyType, setBodyType] = useState<BodyType>('mesomorph');
  const [pace, setPace] = useState(500);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [knowBodyFat, setKnowBodyFat] = useState(false);
  const [bodyFatInput, setBodyFatInput] = useState('');
  const [hotClimate, setHotClimate] = useState(false);
  const [pregnancy, setPregnancy] = useState(false);
  
  // PhysioNutrition Architect State
  const [architectProfile, setArchitectProfile] = useState<HealthProfile>(() => {
    const saved = localStorage.getItem('physiohub_architect_profile');
    return saved ? JSON.parse(saved) : {
      age: 25,
      weight: 70,
      height: 175,
      gender: 'male',
      activityLevel: 1.2,
      goal: 'maintain',
      waist: 80,
      neck: 38,
      injuryType: null,
      recoveryWeek: 1,
      sleepHours: 8,
      waterIntake: 2500,
      proteinCompliance: 0.8
    };
  });

  const [architectMetrics, setArchitectMetrics] = useState<HealthMetrics | null>(null);
  const [aiDietPlan, setAiDietPlan] = useState<string | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  useEffect(() => {
    localStorage.setItem('physiohub_architect_profile', JSON.stringify(architectProfile));
    const metrics = PhysioNutritionLogic.calculateAllMetrics(architectProfile);
    setArchitectMetrics(metrics);
  }, [architectProfile]);

  const generateAIDietPlan = async () => {
    if (!architectMetrics) return;
    setIsGeneratingPlan(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a Senior Clinical Nutritionist and Physiotherapist. Generate a highly professional and evidence-based Physio-Nutrition Diet Plan for the following user:
          
          USER PROFILE:
          - Age: ${architectProfile.age}
          - Weight: ${architectProfile.weight}kg
          - Height: ${architectProfile.height}cm
          - Gender: ${architectProfile.gender}
          - Activity Level: ${architectProfile.activityLevel}
          - Health Goal: ${architectProfile.goal}
          - Current Injury: ${architectProfile.injuryType || 'None'}
          - Recovery Week: ${architectProfile.recoveryWeek}
          
          CALCULATED METRICS:
          - BMI: ${architectMetrics.bmi} (${architectMetrics.bmiCategory})
          - Target Calories: ${architectMetrics.macros.totalCalories} kcal
          - Protein: ${architectMetrics.macros.protein}g
          - Carbs: ${architectMetrics.macros.carbs}g
          - Fats: ${architectMetrics.macros.fats}g
          - Hydration Target: ${architectMetrics.hydrationTarget}ml
          
          RECOVERY CONTEXT:
          - Stage: ${architectMetrics.recoveryStage}
          - Focus: ${architectMetrics.recoveryFocus}
          
          INSTRUCTIONS:
          1. Provide a 1-day sample meal plan (Breakfast, Lunch, Dinner, 2 Snacks).
          2. Focus on anti-inflammatory foods and specific nutrients for ${architectMetrics.recoveryFocus}.
          3. Suggest 2-3 evidence-based supplements (with dosages) relevant to the injury or goal.
          4. Include 2-3 specific lifestyle tips for recovery (e.g., sleep, stress, mobility).
          5. Use a professional, encouraging tone.
          
          FORMAT:
          - Use clean Markdown with bold headers.
          - Use bullet points for lists.
          - Language: ${lang === 'en' ? 'English' : 'Arabic'}.`,
      });
      const response = await model;
      setAiDietPlan(response.text || "Failed to generate plan.");
    } catch (err) {
      console.error(err);
      setAiDietPlan("Error connecting to AI service. Please check your API key.");
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  // Meal Calculator State
  const [mealItems, setMealItems] = useState<MealItem[]>([{ id: '1', name: '', calories: '' }]);
  
  // Food Database State
  const [foodSearch, setFoodSearch] = useState('');
  const [foodCategory, setFoodCategory] = useState('all');
  const [customFoods, setCustomFoods] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem('physiohub_custom_foods');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [showFoodTable, setShowFoodTable] = useState(false);
  const [isWristModalOpen, setIsWristModalOpen] = useState(false);
  const [isTooltipModalOpen, setIsTooltipModalOpen] = useState(false);
  const [tooltipData, setTooltipData] = useState({ title: '', text: '' });
  const [newFood, setNewFood] = useState({
    nameEn: '',
    nameAr: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const [result, setResult] = useState<any>(null);
  const [healthInterpretation, setHealthInterpretation] = useState<HealthInterpretation | null>(null);
  const [error, setError] = useState<string>('');
  const [justCalculated, setJustCalculated] = useState(false);

  useEffect(() => {
    checkEnvironment();
  }, []);

  useEffect(() => {
    localStorage.setItem('physiohub_custom_foods', JSON.stringify(customFoods));
  }, [customFoods]);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('physiohub_lang', lang);
  }, [lang]);

  useEffect(() => {
    if (!justCalculated) return;

    // Gentle “success” feedback: small haptic + subtle beep (best effort)
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        (navigator as any).vibrate?.(15);
      }

      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
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
      // ignore
    }

    const t = setTimeout(() => setJustCalculated(false), 0);
    return () => clearTimeout(t);
  }, [justCalculated]);

  useEffect(() => {
    if (!activeCalculator) return;

    const t = setTimeout(() => {
      document.getElementById('calculator-workspace')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 180);

    return () => clearTimeout(t);
  }, [activeCalculator]);

  const resetForm = () => {
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
    setMealItems([{ id: '1', name: '', calories: '' }]);
    setResult(null);
    setHealthInterpretation(null);
    setError('');
  };

  const validate = () => {
    if (activeCalculator === 'Meal') return null;
    if (!weight && activeCalculator !== 'IdealWeight') return t.errors.weight;
    if (['BMI', 'BMR', 'TDEE', 'Macros', 'IdealWeight', 'BodyFat', 'Deficit'].includes(activeCalculator!) && (!height || Number(height) <= 0)) return t.errors.height;
    if (['BMR', 'TDEE', 'Macros', 'Deficit'].includes(activeCalculator!) && (!age || Number(age) <= 0)) return t.errors.age;
    if (['BodyFat', 'WHtR'].includes(activeCalculator!)) {
      if (!waist || Number(waist) <= 0) return t.errors.waist;
      if (!neck || Number(neck) <= 0) return t.errors.neck;
      if (gender === 'female' && activeCalculator === 'BodyFat' && (!hip || Number(hip) <= 0)) return t.errors.hip;
    }
    if (knowBodyFat && (!bodyFatInput || Number(bodyFatInput) <= 0)) return lang === 'en' ? 'Please enter body fat percentage' : 'يرجى إدخال نسبة الدهون';
    return null;
  };

  const handleCalculate = () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setHealthInterpretation(null);

    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);
    const wa = Number(waist);
    const ne = Number(neck);
    const hi = Number(hip);
    const bf = Number(bodyFatInput);

    switch (activeCalculator) {
      case 'BMI':
        {
          const bmi = ClinicalCalculators.bmi(w, h);
          setResult(bmi);
          setHealthInterpretation(ClinicalCalculators.interpretBMI(bmi, lang));
        }
        break;
      case 'BMR':
        {
          const bmr = ClinicalCalculators.bmrMifflinStJeor({
            weightKg: w,
            heightCm: h,
            ageYears: a,
            gender,
          });
          setResult(bmr);
          setHealthInterpretation(ClinicalCalculators.interpretBMR(bmr, lang));
        }
        break;
      case 'TDEE':
        {
          const bmr = ClinicalCalculators.bmrMifflinStJeor({
            weightKg: w,
            heightCm: h,
            ageYears: a,
            gender,
          });
          const tdee = ClinicalCalculators.tdee(bmr, Number(activity));
          setResult(tdee);
          setHealthInterpretation(ClinicalCalculators.interpretTDEE(tdee, lang));
        }
        break;
      case 'Macros':
        {
          const bmr = ClinicalCalculators.bmrMifflinStJeor({
            weightKg: w,
            heightCm: h,
            ageYears: a,
            gender,
          });
          const tdee = ClinicalCalculators.tdee(bmr, Number(activity));
          const macros = ClinicalCalculators.macrosFromGoal(tdee, goal);
          setResult(macros);
          setHealthInterpretation(ClinicalCalculators.interpretMacros(goal, lang));
        }
        break;
      case 'Protein':
        {
          const g = ClinicalCalculators.proteinNeedsG(w, Number(activity));
          setResult(g);
          setHealthInterpretation(ClinicalCalculators.interpretProtein(Number(activity), lang));
        }
        break;
      case 'IdealWeight':
        {
          const ibw = ClinicalCalculators.idealBodyWeightDevine(h, gender);
          setResult(ibw);
          setHealthInterpretation(ClinicalCalculators.interpretIBW(ibw, lang));
        }
        break;
      case 'WHtR':
        let calcWaist = wa;
        let calcHeightW = h;
        if (unitSystem === 'imperial') {
          calcWaist = wa * 2.54;
          calcHeightW = h * 2.54;
        }
        // Kept as legacy (not part of the 10 requested clinical calculators)
        {
          const ratio = calcWaist > 0 && calcHeightW > 0 ? Number((calcWaist / calcHeightW).toFixed(2)) : 0;
          const category =
            ratio <= 0
              ? '-'
              : ratio < 0.5
                ? lang === 'en'
                  ? 'Healthy'
                  : 'صحي'
                : ratio < 0.6
                  ? lang === 'en'
                    ? 'Increased Risk'
                    : 'مخاطر متزايدة'
                  : lang === 'en'
                    ? 'High Risk'
                    : 'مخاطر عالية';
          setResult({ ratio, category });
        }
        break;
      case 'BodyFat':
        // Convert imperial to metric if needed for calculation
        let calcW = wa;
        let calcN = ne;
        let calcH = hi;
        let calcHeight = h;
        if (unitSystem === 'imperial') {
          calcW = wa * 2.54;
          calcN = ne * 2.54;
          calcH = hi * 2.54;
          calcHeight = h * 2.54;
        }
        {
          const bodyFat = ClinicalCalculators.bodyFatUSNavy({
            gender,
            heightCm: calcHeight,
            waistCm: calcW,
            neckCm: calcN,
            hipCm: gender === 'female' ? calcH : undefined,
          });
          setResult(bodyFat);
          setHealthInterpretation(ClinicalCalculators.interpretBodyFat(bodyFat, gender, lang));
        }
        break;
      case 'Water':
        {
          const ml = ClinicalCalculators.waterIntakeMl(w, Number(activity), {
            hotClimate,
            pregnancy,
          });
          setResult(ml);
          setHealthInterpretation(ClinicalCalculators.interpretWater(ml, lang));
        }
        break;
      case 'Deficit':
        {
          const bmr = ClinicalCalculators.bmrMifflinStJeor({
            weightKg: w,
            heightCm: h,
            ageYears: a,
            gender,
          });
          const tdee = ClinicalCalculators.tdee(bmr, Number(activity));
          const deficit = ClinicalCalculators.calorieAdjustmentFromTDEE(tdee, pace);
          setResult(deficit);
          setHealthInterpretation(ClinicalCalculators.interpretCalorieAdjustment(pace, lang));
        }
        break;
      case 'Meal':
        {
          const total = ClinicalCalculators.mealCalories(mealItems);
          setResult(total);
          setHealthInterpretation(ClinicalCalculators.interpretMeal(total, lang));
        }
        break;
    }
    setJustCalculated(true);
  };

  const showTooltip = (title: string, text: string) => {
    setTooltipData({ title, text });
    setIsTooltipModalOpen(true);
  };

  const addMealItem = () => {
    setMealItems([...mealItems, { id: Date.now().toString(), name: '', calories: '' }]);
  };

  const clearAllMealItems = () => {
    setMealItems([{ id: Date.now().toString(), name: '', calories: '' }]);
    setResult(null);
    setHealthInterpretation(null);
  };

  const removeMealItem = (id: string) => {
    if (mealItems.length > 1) {
      setMealItems(mealItems.filter(item => item.id !== id));
    }
  };

  const updateMealItem = (id: string, field: 'name' | 'calories', value: string) => {
    setMealItems(mealItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addFoodToMeal = (food: FoodItem) => {
    const newItem: MealItem = {
      id: Date.now().toString(),
      name: food.name[lang],
      calories: food.calories.toString()
    };
    
    // If the first item is empty, replace it
    if (mealItems.length === 1 && !mealItems[0].name && !mealItems[0].calories) {
      setMealItems([newItem]);
    } else {
      setMealItems([...mealItems, newItem]);
    }
    
    // Scroll to calculator
    const calcElement = document.getElementById('calculators');
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveCalculator('Meal');
  };

  const saveCustomFood = () => {
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
      category: 'cooked', // Default category for custom entries
      calories: Number(newFood.calories),
      protein: Number(newFood.protein) || 0,
      carbs: Number(newFood.carbs) || 0,
      fats: Number(newFood.fats) || 0,
    };

    setCustomFoods([food, ...customFoods]);
    setIsCustomModalOpen(false);
    setNewFood({ nameEn: '', nameAr: '', calories: '', protein: '', carbs: '', fats: '' });
    setError('');
  };

  const filteredFoods = useMemo(() => {
    const allFoods = [...customFoods, ...foodDatabase];
    return allFoods.filter(food => {
      const matchesSearch = food.name.en.toLowerCase().includes(foodSearch.toLowerCase()) || 
                            food.name.ar.includes(foodSearch);
      const matchesCategory = foodCategory === 'all' || food.category === foodCategory;
      return matchesSearch && matchesCategory;
    });
  }, [foodSearch, foodCategory, customFoods]);

  const calculators = [
    { id: 'BMI', group: 'assessment', title: t.calculators.bmi.title, icon: <Activity className="w-6 h-6" />, desc: t.calculators.bmi.desc, hint: t.calculators.bmi.hint },
    { id: 'WHtR', group: 'assessment', title: t.calculators.whtr.title, icon: <Scale className="w-6 h-6" />, desc: t.calculators.whtr.desc, hint: t.calculators.whtr.hint },
    { id: 'BodyFat', group: 'assessment', title: t.calculators.bodyFat.title, icon: <Percent className="w-6 h-6" />, desc: t.calculators.bodyFat.desc, hint: t.calculators.bodyFat.hint },
    { id: 'IdealWeight', group: 'assessment', title: t.calculators.idealWeight.title, icon: <Scale className="w-6 h-6" />, desc: t.calculators.idealWeight.desc, hint: t.calculators.idealWeight.hint },
    { id: 'BMR', group: 'metabolism', title: t.calculators.bmr.title, icon: <Calculator className="w-6 h-6" />, desc: t.calculators.bmr.desc, hint: t.calculators.bmr.hint },
    { id: 'TDEE', group: 'metabolism', title: t.calculators.tdee.title, icon: <ClipboardList className="w-6 h-6" />, desc: t.calculators.tdee.desc, hint: t.calculators.tdee.hint },
    { id: 'Deficit', group: 'metabolism', title: t.calculators.deficit.title, icon: <Flame className="w-6 h-6" />, desc: t.calculators.deficit.desc, hint: t.calculators.deficit.hint },
    { id: 'Macros', group: 'nutrition', title: t.calculators.macros.title, icon: <HeartPulse className="w-6 h-6" />, desc: t.calculators.macros.desc, hint: t.calculators.macros.hint },
    { id: 'Protein', group: 'nutrition', title: t.calculators.protein.title, icon: <Stethoscope className="w-6 h-6" />, desc: t.calculators.protein.desc, hint: t.calculators.protein.hint },
    { id: 'Water', group: 'nutrition', title: t.calculators.water.title, icon: <Droplets className="w-6 h-6" />, desc: t.calculators.water.desc, hint: t.calculators.water.hint },
    { id: 'Meal', group: 'planning', title: t.calculators.meal.title, icon: <Utensils className="w-6 h-6" />, desc: t.calculators.meal.desc, hint: t.calculators.meal.hint },
  ];

  const toolGroups = [
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
  ] as const;

  const visibleCalculators = activeToolGroup === 'all'
    ? calculators
    : calculators.filter((calc) => calc.group === activeToolGroup);

  const activeCalculatorMeta = calculators.find((c) => c.id === activeCalculator);

  const quickSections = [
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

  const articles = getArticles(lang);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation
        t={t}
        lang={lang}
        setLang={setLang}
        calculators={calculators}
        setActiveCalculator={(id) => setActiveCalculator(id as CalculatorType)}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Hero Section */}
      <Hero t={t} />

      <section className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 hover:bg-white hover:border-health-green/30 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-2xl bg-soft-blue text-health-green flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <section.icon className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-slate-900 mb-1">{section.title}</h2>
                <p className="text-sm text-slate-600 leading-6">{section.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* What's New Section */}
      <WhatsNew lang={lang} />

      {/* PhysioNutrition Architect Section */}
      <section id="architect" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-medical-blue/10 text-medical-blue text-sm font-bold mb-4"
            >
              <Brain className="w-4 h-4" />
              <span>{t.architect.title}</span>
            </motion.div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.architect.subtitle}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="medical-card p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-medical-blue" />
                  {t.architect.formTitle}
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">{t.forms.age}</label>
                      <input 
                        type="number" 
                        value={architectProfile.age}
                        onChange={(e) => setArchitectProfile({...architectProfile, age: Number(e.target.value)})}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-medical-blue outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">{t.forms.weight}</label>
                      <input 
                        type="number" 
                        value={architectProfile.weight}
                        onChange={(e) => setArchitectProfile({...architectProfile, weight: Number(e.target.value)})}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-medical-blue outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">{t.forms.height}</label>
                    <input 
                      type="number" 
                      value={architectProfile.height}
                      onChange={(e) => setArchitectProfile({...architectProfile, height: Number(e.target.value)})}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-medical-blue outline-none text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">{t.architect.gender}</label>
                      <select 
                        value={architectProfile.gender}
                        onChange={(e) => setArchitectProfile({...architectProfile, gender: e.target.value as 'male' | 'female'})}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-medical-blue outline-none text-sm bg-white"
                      >
                        <option value="male">{t.forms.male}</option>
                        <option value="female">{t.forms.female}</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">{t.architect.goal}</label>
                      <select 
                        value={architectProfile.goal}
                        onChange={(e) => setArchitectProfile({...architectProfile, goal: e.target.value as any})}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-medical-blue outline-none text-sm bg-white"
                      >
                        <option value="maintain">{t.forms.maintain}</option>
                        <option value="lose">{t.forms.lose}</option>
                        <option value="gain">{t.forms.gain}</option>
                        <option value="recovery">{lang === 'en' ? 'Recovery' : 'تعافي'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">{t.architect.activityLevel}</label>
                    <select 
                      value={architectProfile.activityLevel}
                      onChange={(e) => setArchitectProfile({...architectProfile, activityLevel: Number(e.target.value)})}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-medical-blue outline-none text-sm bg-white"
                    >
                      <option value="1.2">{t.forms.sedentary}</option>
                      <option value="1.375">{t.forms.lightly}</option>
                      <option value="1.55">{t.forms.moderately}</option>
                      <option value="1.725">{t.forms.very}</option>
                      <option value="1.9">{t.forms.extra}</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">{t.architect.injuryType}</label>
                    <select 
                      value={architectProfile.injuryType || ''}
                      onChange={(e) => setArchitectProfile({...architectProfile, injuryType: e.target.value || null})}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-medical-blue outline-none text-sm bg-white"
                    >
                      <option value="">{t.architect.noInjury}</option>
                      {Object.keys(injuryDatabase).map(id => (
                        <option key={id} value={id}>{id}</option>
                      ))}
                    </select>
                  </div>

                  {architectProfile.injuryType && (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">{t.architect.recoveryWeek}</label>
                      <input 
                        type="number" 
                        min="1"
                        max="52"
                        value={architectProfile.recoveryWeek}
                        onChange={(e) => setArchitectProfile({...architectProfile, recoveryWeek: Number(e.target.value)})}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-medical-blue outline-none text-sm"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">{t.forms.waist} (cm)</label>
                    <input 
                      type="number" 
                      value={architectProfile.waist || ''}
                      onChange={(e) => setArchitectProfile({...architectProfile, waist: Number(e.target.value)})}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-medical-blue outline-none text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">{t.forms.neck} (cm)</label>
                    <input 
                      type="number" 
                      value={architectProfile.neck || ''}
                      onChange={(e) => setArchitectProfile({...architectProfile, neck: Number(e.target.value)})}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-medical-blue outline-none text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">{t.architect.sleep}</label>
                    <input 
                      type="range" 
                      min="4"
                      max="12"
                      step="0.5"
                      value={architectProfile.sleepHours}
                      onChange={(e) => setArchitectProfile({...architectProfile, sleepHours: Number(e.target.value)})}
                      className="w-full accent-medical-blue"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>4h</span>
                      <span className="text-medical-blue">{architectProfile.sleepHours}h</span>
                      <span>12h</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">{t.architect.water}</label>
                    <input 
                      type="number" 
                      value={architectProfile.waterIntake}
                      onChange={(e) => setArchitectProfile({...architectProfile, waterIntake: Number(e.target.value)})}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-medical-blue outline-none text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">{t.architect.proteinComp}</label>
                    <input 
                      type="range" 
                      min="0"
                      max="1"
                      step="0.1"
                      value={architectProfile.proteinCompliance}
                      onChange={(e) => setArchitectProfile({...architectProfile, proteinCompliance: Number(e.target.value)})}
                      className="w-full accent-medical-blue"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>0%</span>
                      <span className="text-medical-blue">{Math.round(architectProfile.proteinCompliance * 100)}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Column */}
            <div className="lg:col-span-8 space-y-8">
              {architectMetrics && (
                <>
                  {/* Top Row: Score & Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="medical-card p-6 flex flex-col items-center justify-center text-center">
                      <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">{t.architect.scoreTitle}</h4>
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-slate-100"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={364.4}
                            strokeDashoffset={364.4 - (364.4 * architectMetrics.healthScore) / 100}
                            className="text-medical-blue transition-all duration-1000"
                          />
                        </svg>
                        <span className="absolute text-3xl font-black text-slate-900">{architectMetrics.healthScore}</span>
                      </div>
                    </div>

                    <div className="md:col-span-2 medical-card p-6">
                      <h4 className="text-sm font-bold text-slate-500 uppercase mb-6">{t.architect.metricsTitle}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">BMI</span>
                          <div className="flex flex-col">
                            <span className="text-lg font-black text-slate-900">{architectMetrics.bmi}</span>
                            <span className="text-[9px] font-bold text-medical-blue leading-tight">{architectMetrics.bmiCategory}</span>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">WHtR</span>
                          <div className="flex flex-col">
                            <span className="text-lg font-black text-slate-900">{architectMetrics.whtr}</span>
                            <span className={`text-[9px] font-bold leading-tight ${
                              architectMetrics.whtrCategory.includes('Healthy') ? 'text-health-green' : 
                              architectMetrics.whtrCategory.includes('Risk') ? 'text-amber-500' : 'text-rose-500'
                            }`}>
                              {architectMetrics.whtrCategory}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Calories</span>
                          <span className="text-lg font-black text-slate-900">{architectMetrics.macros.totalCalories}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Protein</span>
                          <span className="text-lg font-black text-slate-900">{architectMetrics.macros.protein}g</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{lang === 'en' ? 'Water' : 'الماء'}</span>
                          <span className="text-lg font-black text-slate-900">{architectMetrics.hydrationTarget}ml</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recovery Timeline */}
                  <div className="medical-card p-6">
                    <h4 className="text-sm font-bold text-slate-500 uppercase mb-6 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-medical-blue" />
                      {t.architect.recoveryTimeline}
                    </h4>
                    
                    <div className="relative">
                      {architectProfile.injuryType ? (
                        <>
                          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2" />
                          <div className="relative flex justify-between">
                            {['week1-2', 'week3-6', 'week7+'].map((stage, idx) => {
                              const isCurrent = (architectProfile.recoveryWeek <= 2 && idx === 0) || 
                                                (architectProfile.recoveryWeek > 2 && architectProfile.recoveryWeek <= 6 && idx === 1) ||
                                                (architectProfile.recoveryWeek > 6 && idx === 2);
                              return (
                                <div key={stage} className="flex flex-col items-center relative z-10">
                                  <div className={`w-4 h-4 rounded-full border-4 border-white shadow-sm ${isCurrent ? 'bg-medical-blue scale-125' : 'bg-slate-300'}`} />
                                  <span className={`mt-2 text-[10px] font-bold uppercase ${isCurrent ? 'text-medical-blue' : 'text-slate-400'}`}>
                                    {stage.replace('week', 'W')}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center py-4 text-slate-400 text-sm font-medium italic">
                          {lang === 'en' ? 'General Health & Longevity Mode' : 'وضع الصحة العامة وطول العمر'}
                        </div>
                      )}
                    </div>

                    <div className="mt-8 p-4 rounded-2xl bg-medical-blue/5 border border-medical-blue/10">
                      <div className="flex items-start gap-4">
                        <div className="bg-medical-blue p-2 rounded-lg text-white">
                          <Activity className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 mb-1">{architectMetrics.recoveryStage}</h5>
                          <p className="text-sm text-slate-600 mb-4"><span className="font-bold text-medical-blue">{t.architect.focus}:</span> {architectMetrics.recoveryFocus}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h6 className="text-[10px] font-bold text-slate-400 uppercase mb-2">{t.architect.nutrients}</h6>
                              <div className="flex flex-wrap gap-2">
                                {architectMetrics.suggestedNutrients.map((n, i) => (
                                  <span key={i} className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[10px] font-medium text-slate-700">
                                    {n.name} ({n.dosage})
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h6 className="text-[10px] font-bold text-slate-400 uppercase mb-2">{t.architect.foods}</h6>
                              <div className="flex flex-wrap gap-2">
                                {architectMetrics.suggestedFoods.map((f, i) => (
                                  <span key={i} className="px-2 py-1 rounded-md bg-health-green/10 text-health-green text-[10px] font-bold">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {architectProfile.injuryType && getInjuryById(architectProfile.injuryType)?.contraindications && (
                            <div className="mt-6 pt-6 border-t border-slate-200">
                              <h6 className="text-[10px] font-bold text-red-500 uppercase mb-3 flex items-center gap-1">
                                <ShieldAlert className="w-3 h-3" />
                                {t.architect.contraindications}
                              </h6>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <span className="text-[10px] font-bold text-slate-500 block mb-1">{t.architect.meds}</span>
                                  <ul className="text-xs text-slate-600 list-disc list-inside">
                                    {getInjuryById(architectProfile.injuryType!)?.contraindications?.medications.map((m, i) => (
                                      <li key={i}>{m}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold text-slate-500 block mb-1">{t.architect.supps}</span>
                                  <ul className="text-xs text-slate-600 list-disc list-inside">
                                    {getInjuryById(architectProfile.injuryType!)?.contraindications?.supplements.map((s, i) => (
                                      <li key={i}>{s}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Diet Preview */}
                  <div className="medical-card p-6 overflow-hidden relative">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        {t.architect.aiDietTitle}
                      </h4>
                      <button 
                        onClick={generateAIDietPlan}
                        disabled={isGeneratingPlan}
                        className="bg-medical-blue text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2"
                      >
                        {isGeneratingPlan ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Brain className="w-3 h-3" />}
                        {t.architect.generatePlan}
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {aiDietPlan ? (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="prose prose-sm max-w-none text-slate-600 bg-slate-50 p-6 rounded-2xl border border-slate-100 max-h-96 overflow-y-auto"
                        >
                          <div dangerouslySetInnerHTML={{ __html: aiDietPlan.replace(/\n/g, '<br/>') }} />
                        </motion.div>
                      ) : (
                        <div className="h-48 flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                          <Sparkles className="w-8 h-8 text-slate-200 mb-4" />
                          <p className="text-sm text-slate-400">{lang === 'en' ? 'Click the button to generate your personalized AI diet plan based on your recovery stage.' : 'انقر على الزر لإنشاء خطتك الغذائية المخصصة بالذكاء الاصطناعي بناءً على مرحلة تعافيك.'}</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section id="calculators" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-health-green/10 text-health-green text-xs font-bold uppercase tracking-[0.18em] mb-4">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Tool hub' : 'مركز الأدوات'}</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">{t.calculators.sectionTitle}</h2>
                <p className="text-slate-600 max-w-2xl">
                  {lang === 'en'
                    ? 'Choose a tool category first, then open the calculator that matches your goal.'
                    : 'اختر فئة الأداة أولاً، ثم افتح الحاسبة المناسبة لهدفك.'}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 lg:max-w-sm">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-2">
                  {lang === 'en' ? 'Selected tool' : 'الأداة المختارة'}
                </div>
                <div className="font-bold text-slate-900 mb-1">
                  {activeCalculatorMeta?.title || (lang === 'en' ? 'No tool selected yet' : 'لم يتم اختيار أداة بعد')}
                </div>
                <p className="text-sm text-slate-600 leading-6">
                  {activeCalculatorMeta?.desc || (lang === 'en' ? 'Pick a calculator to see only the inputs you need.' : 'اختر حاسبة لعرض الحقول المطلوبة فقط.')}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {toolGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setActiveToolGroup(group.id)}
                  className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                    activeToolGroup === group.id
                      ? 'border-health-green bg-soft-blue text-health-green shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-health-green/30'
                  }`}
                >
                  <div className="font-bold text-sm">{group.label}</div>
                  <div className="text-xs mt-1 opacity-80">{group.desc}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-12">
            {visibleCalculators.map((calc) => (
              <button 
                key={calc.id}
                onClick={() => {
                  setActiveCalculator(calc.id as CalculatorType);
                  resetForm();
                }}
                aria-label={calc.title}
                className={`medical-card p-5 md:p-6 flex flex-col items-start text-left transition-all relative group ${activeCalculator === calc.id ? 'ring-2 ring-health-green bg-soft-blue' : ''}`}
              >
                <div className="flex items-start justify-between w-full gap-3 mb-4">
                  <div className={`p-3 rounded-2xl ${activeCalculator === calc.id ? 'bg-health-green text-white' : 'bg-soft-blue text-health-green'}`}>
                    {calc.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    {toolGroups.find((group) => group.id === calc.group)?.label}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-base flex items-center gap-2">
                  {calc.title}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <HelpCircle className="w-3 h-3 text-slate-400" />
                  </div>
                </h3>
                <p className="text-sm text-slate-600 leading-6 mb-3">{calc.desc}</p>
                <div className="text-xs font-medium text-slate-400">
                  {calc.hint}
                </div>
                <div className="absolute inset-0 rounded-2xl ring-0 ring-health-green/10 group-hover:ring-4 pointer-events-none transition-all" />
              </button>
            ))}
          </div>

          {!activeCalculator && (
            <div className="mb-10 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
              <div className="font-bold text-slate-900 mb-2">
                {lang === 'en' ? 'Pick a calculator to continue' : 'اختر حاسبة للمتابعة'}
              </div>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                {lang === 'en'
                  ? 'The form below adapts automatically based on the selected tool, so you only see the relevant inputs.'
                  : 'النموذج بالأسفل يتغير تلقائيًا حسب الأداة المختارة، حتى ترى فقط الحقول المهمة.'}
              </p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {activeCalculator && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                id="calculator-workspace"
                className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200"
              >
                <div className="max-w-2xl mx-auto">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-health-green mb-2">
                        {toolGroups.find((group) => group.id === activeCalculatorMeta?.group)?.label}
                      </div>
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        {activeCalculatorMeta?.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 leading-6">
                        {activeCalculatorMeta?.desc}
                      </p>
                    </div>
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:border-health-green hover:text-health-green transition-all text-sm font-bold"
                    >
                      {lang === 'en' ? 'Clear inputs' : 'مسح الحقول'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2 sm:col-span-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-slate-700">{t.forms.weight}</label>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Required</div>
                      </div>
                      <input 
                        type="number" 
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder={t.forms.placeholderWeight}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                      />
                    </div>

                    {['BMI', 'WHtR', 'BMR', 'TDEE', 'Macros', 'IdealWeight', 'BodyFat', 'Deficit'].includes(activeCalculator!) && (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                          {t.forms.height}
                          {activeCalculator === 'IdealWeight' && (
                            <button onClick={() => showTooltip(t.forms.height, t.tooltips.ideal)}>
                              <Info className="w-3 h-3 text-slate-400" />
                            </button>
                          )}
                        </label>
                        <input 
                          type="number" 
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder={t.forms.placeholderHeight}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                        />
                      </div>
                    )}

                    {['BMR', 'TDEE', 'Macros', 'Deficit'].includes(activeCalculator!) && (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                          {t.forms.age}
                          {activeCalculator === 'BMR' && (
                            <button onClick={() => showTooltip(t.forms.age, t.tooltips.bmr)}>
                              <Info className="w-3 h-3 text-slate-400" />
                            </button>
                          )}
                        </label>
                        <input 
                          type="number" 
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder={t.forms.placeholderAge}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                        />
                      </div>
                    )}

                    {['BMR', 'TDEE', 'Macros', 'IdealWeight', 'BodyFat', 'Deficit', 'WHtR'].includes(activeCalculator!) && (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">{t.forms.gender}</label>
                        <div className="flex p-1 bg-slate-200 rounded-xl">
                          <button
                            onClick={() => setGender('male')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${gender === 'male' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'}`}
                          >
                            {t.forms.male}
                          </button>
                          <button
                            onClick={() => setGender('female')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${gender === 'female' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'}`}
                          >
                            {t.forms.female}
                          </button>
                        </div>
                      </div>
                    )}

                    {['BodyFat', 'WHtR'].includes(activeCalculator!) && (
                      <>
                        <div className="space-y-2 sm:col-span-2">
                          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                            {t.forms.unitSystem}
                            <button onClick={() => showTooltip(t.forms.unitSystem, t.tooltips.navy)}>
                              <Info className="w-3 h-3 text-slate-400" />
                            </button>
                          </label>
                          <div className="flex p-1 bg-slate-200 rounded-xl">
                            <button
                              onClick={() => setUnitSystem('metric')}
                              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${unitSystem === 'metric' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'}`}
                            >
                              {t.forms.metric}
                            </button>
                            <button
                              onClick={() => setUnitSystem('imperial')}
                              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${unitSystem === 'imperial' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'}`}
                            >
                              {t.forms.imperial}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">{t.forms.waist} ({unitSystem === 'metric' ? 'cm' : 'in'})</label>
                          <input 
                            type="number" 
                            value={waist}
                            onChange={(e) => setWaist(e.target.value)}
                            placeholder={t.forms.placeholderWaist}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">{t.forms.neck} ({unitSystem === 'metric' ? 'cm' : 'in'})</label>
                          <input 
                            type="number" 
                            value={neck}
                            onChange={(e) => setNeck(e.target.value)}
                            placeholder={t.forms.placeholderNeck}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                          />
                        </div>
                        {gender === 'female' && (
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">{t.forms.hip} ({unitSystem === 'metric' ? 'cm' : 'in'})</label>
                            <input 
                              type="number" 
                              value={hip}
                              onChange={(e) => setHip(e.target.value)}
                              placeholder={t.forms.placeholderHip}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                            />
                          </div>
                        )}
                      </>
                    )}

                    {['TDEE', 'Macros', 'Water', 'Deficit'].includes(activeCalculator!) && (
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                          {t.forms.activityLevel}
                          {['TDEE', 'Macros'].includes(activeCalculator!) && (
                            <button onClick={() => showTooltip(t.forms.activityLevel, t.tooltips.tdee)}>
                              <Info className="w-3 h-3 text-slate-400" />
                            </button>
                          )}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2">
                          {[
                            { val: '1.2', label: t.forms.sedentary.split('(')[0] },
                            { val: '1.375', label: t.forms.lightly.split('(')[0] },
                            { val: '1.55', label: t.forms.moderately.split('(')[0] },
                            { val: '1.725', label: t.forms.very.split('(')[0] },
                            { val: '1.9', label: t.forms.extra.split('(')[0] },
                          ].map(opt => (
                            <button
                              key={opt.val}
                              onClick={() => setActivity(opt.val)}
                              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${activity === opt.val ? 'bg-health-green text-white border-health-green shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-health-green'}`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {['BMR', 'TDEE', 'Macros', 'Deficit'].includes(activeCalculator!) && (
                      <div className="space-y-4 sm:col-span-2">
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            id="knowBF"
                            checked={knowBodyFat}
                            onChange={(e) => setKnowBodyFat(e.target.checked)}
                            className="w-4 h-4 accent-health-green"
                          />
                          <label htmlFor="knowBF" className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                            {t.forms.knowBodyFat}
                            <button onClick={() => showTooltip(t.forms.knowBodyFat, t.tooltips.katch)}>
                              <Info className="w-3 h-3 text-slate-400" />
                            </button>
                          </label>
                        </div>
                        {knowBodyFat && (
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">{t.forms.bodyFat}</label>
                            <input 
                              type="number" 
                              value={bodyFatInput}
                              onChange={(e) => setBodyFatInput(e.target.value)}
                              placeholder="e.g. 15"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {['Macros'].includes(activeCalculator!) && (
                      <>
                        <div className="space-y-2 sm:col-span-2">
                          <label className="text-sm font-semibold text-slate-700">{t.forms.goal}</label>
                          <div className="flex p-1 bg-slate-200 rounded-xl">
                            {[
                              { id: 'lose', label: t.forms.lose },
                              { id: 'maintain', label: t.forms.maintain },
                              { id: 'gain', label: t.forms.gain },
                            ].map(g => (
                              <button
                                key={g.id}
                                onClick={() => setGoal(g.id as GoalType)}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${goal === g.id ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'}`}
                              >
                                {g.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            {t.somatotype.title}
                            <button onClick={() => setIsWristModalOpen(true)}>
                              <HelpCircle className="w-3 h-3 text-health-green" />
                            </button>
                          </label>
                          <div className="flex p-1 bg-slate-200 rounded-xl">
                            {[
                              { id: 'ectomorph', label: t.somatotype.ecto },
                              { id: 'mesomorph', label: t.somatotype.meso },
                              { id: 'endomorph', label: t.somatotype.endo },
                            ].map(b => (
                              <button
                                key={b.id}
                                onClick={() => setBodyType(b.id as BodyType)}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${bodyType === b.id ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'}`}
                              >
                                {b.label}
                              </button>
                            ))}
                          </div>
                          <p className="text-[10px] text-health-green font-medium italic">
                            {bodyType === 'ectomorph' ? t.somatotype.ectoTip : bodyType === 'mesomorph' ? t.somatotype.mesoTip : t.somatotype.endoTip}
                          </p>
                        </div>
                      </>
                    )}

                    {activeCalculator === 'Deficit' && (
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">{t.forms.pace}</label>
                        <div className="flex p-1 bg-slate-200 rounded-xl">
                          {[
                            { id: 250, label: t.forms.conservative },
                            { id: 500, label: t.forms.normal },
                            { id: 1000, label: t.forms.aggressive },
                          ].map(p => (
                            <button
                              key={p.id}
                              onClick={() => setPace(p.id)}
                              className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all ${pace === p.id ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'}`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {['BodyFat', 'WHtR'].includes(activeCalculator!) && (
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">{t.forms.unitSystem}</label>
                        <div className="flex p-1 bg-slate-200 rounded-xl">
                          <button
                            onClick={() => setUnitSystem('metric')}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${unitSystem === 'metric' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'}`}
                          >
                            {t.forms.metric}
                          </button>
                          <button
                            onClick={() => setUnitSystem('imperial')}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${unitSystem === 'imperial' ? 'bg-white text-health-green shadow-sm' : 'text-slate-500'}`}
                          >
                            {t.forms.imperial}
                          </button>
                        </div>
                      </div>
                    )}

                    {activeCalculator === 'Water' && (
                      <div className="space-y-4 sm:col-span-2">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              id="hotClimate"
                              checked={hotClimate}
                              onChange={(e) => setHotClimate(e.target.checked)}
                              className="w-4 h-4 accent-health-green"
                            />
                            <label htmlFor="hotClimate" className="text-sm font-semibold text-slate-700">{t.forms.hotClimate}</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              id="pregnancy"
                              checked={pregnancy}
                              onChange={(e) => setPregnancy(e.target.checked)}
                              className="w-4 h-4 accent-health-green"
                            />
                            <label htmlFor="pregnancy" className="text-sm font-semibold text-slate-700">{t.forms.pregnancy}</label>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeCalculator === 'Protein' && (
                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">{t.forms.activityGoal}</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
                          {[
                            { val: '0.8', label: t.forms.proteinSedentary.split('(')[0] },
                            { val: '1.2', label: t.forms.proteinModerate.split('(')[0] },
                            { val: '1.6', label: t.forms.proteinStrength.split('(')[0] },
                            { val: '2.0', label: t.forms.proteinAthlete.split('(')[0] },
                            { val: '1.8', label: t.forms.proteinInjury.split('(')[0] },
                          ].map(opt => (
                            <button
                              key={opt.val}
                              onClick={() => setActivity(opt.val)}
                              className={`px-3 py-2 rounded-xl text-[10px] font-bold border transition-all ${activity === opt.val ? 'bg-health-green text-white border-health-green shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-health-green'}`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeCalculator === 'Meal' && (
                      <div className="sm:col-span-2 space-y-4">
                        <label className="text-sm font-semibold text-slate-700">{t.forms.mealIngredients}</label>
                        {mealItems.map((item) => (
                          <div key={item.id} className="flex gap-2 items-center">
                            <input 
                              type="text" 
                              placeholder={t.forms.ingredientName}
                              value={item.name}
                              onChange={(e) => updateMealItem(item.id, 'name', e.target.value)}
                              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                            />
                            <input 
                              type="number" 
                              placeholder={t.forms.calories}
                              value={item.calories}
                              onChange={(e) => updateMealItem(item.id, 'calories', e.target.value)}
                              className="w-24 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                            />
                            <button 
                              onClick={() => removeMealItem(item.id)}
                              className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200">
                          <button 
                            onClick={addMealItem}
                            className="flex items-center gap-2 text-health-green font-bold text-sm hover:underline"
                          >
                            <Plus className="w-4 h-4" /> {t.forms.addIngredient}
                          </button>
                          
                          <button 
                            onClick={clearAllMealItems}
                            className="flex items-center gap-2 text-red-500 font-bold text-sm hover:underline"
                          >
                            <Trash2 className="w-4 h-4" /> {t.ux.clearAll}
                          </button>
                        </div>
                        
                        <div className="pt-4">
                          <a 
                            href="#food-db" 
                            className="flex items-center gap-2 text-slate-500 hover:text-health-green transition-colors text-sm font-medium"
                          >
                            <Search className="w-4 h-4" />
                            {t.forms.browseFoodDb}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <button 
                    onClick={handleCalculate}
                    className="w-full bg-health-green text-white py-4 rounded-2xl font-bold text-lg hover:bg-health-green-dark transition-all shadow-lg shadow-health-green/20"
                  >
                    {t.forms.calculate}
                  </button>

                  {result !== null && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                      className="mt-10 p-8 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-health-green to-medical-blue" />
                      <div className="text-center relative z-10">
                        <span className="text-sm font-bold text-health-green uppercase tracking-widest mb-2 block">{t.results.yourResult}</span>
                        <div className="text-5xl font-bold text-slate-900 mb-4">
                          {typeof result === 'object' && activeCalculator === 'WHtR' ? (
                            <div className="space-y-2">
                              <div className="text-5xl font-bold text-slate-900">{result.ratio}</div>
                              <div className={`text-lg font-bold uppercase ${
                                result.category.includes('Healthy') || result.category.includes('صحي') ? 'text-health-green' : 
                                result.category.includes('Risk') || result.category.includes('مخاطر') ? 'text-amber-500' : 'text-rose-500'
                              }`}>
                                {result.category}
                              </div>
                            </div>
                          ) : typeof result === 'object' && activeCalculator === 'Macros' ? (
                            <div className="space-y-8">
                              <div className="grid grid-cols-3 gap-4 text-2xl">
                                <div>
                                  <div className="text-health-green">{result.protein}g</div>
                                  <div className="text-xs text-slate-400 uppercase">{t.results.protein}</div>
                                </div>
                                <div>
                                  <div className="text-medical-blue">{result.carbs}g</div>
                                  <div className="text-xs text-slate-400 uppercase">{t.results.carbs}</div>
                                </div>
                                <div>
                                  <div className="text-orange-500">{result.fats}g</div>
                                  <div className="text-xs text-slate-400 uppercase">{t.results.fats}</div>
                                </div>
                              </div>

                              <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Target Calories' : 'السعرات المستهدفة'}</div>
                                <div className="text-3xl font-bold text-health-green">{result.totalCalories} <span className="text-sm">kcal</span></div>
                              </div>
                              
                              <div className="max-w-[250px] mx-auto">
                                <Pie 
                                  data={{
                                    labels: [t.charts.protein, t.charts.carbs, t.charts.fats],
                                    datasets: [{
                                      data: [result.protein * 4, result.carbs * 4, result.fats * 9],
                                      backgroundColor: ['#10B981', '#3B82F6', '#F97316'],
                                      borderWidth: 0,
                                    }]
                                  }}
                                  options={{
                                    plugins: {
                                      legend: { position: 'bottom', labels: { font: { family: 'Inter' } } }
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          ) : typeof result === 'object' && activeCalculator === 'Deficit' ? (
                            <div className="space-y-8">
                              <div>
                                {result.deficit} <span className="text-2xl">{lang === 'en' ? 'kcal' : 'سعرة'}</span>
                                {result.warning && (
                                  <div className="mt-4 p-3 bg-amber-50 text-amber-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                                    <Info className="w-4 h-4" /> {pace >= 1000 ? t.results.aggressiveWarning : t.results.warning}
                                  </div>
                                )}
                              </div>

                              <div className="max-w-[400px] mx-auto h-[200px] mb-8">
                                <Bar 
                                  data={{
                                    labels: [t.charts.maintenance, t.charts.deficit],
                                    datasets: [{
                                      label: t.forms.calories,
                                      data: [result.tdee, result.deficit],
                                      backgroundColor: ['#3B82F6', '#10B981'],
                                      borderRadius: 8,
                                    }]
                                  }}
                                  options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                      legend: { display: false }
                                    },
                                    scales: {
                                      y: { beginAtZero: true, grid: { display: false } },
                                      x: { grid: { display: false } }
                                    }
                                  }}
                                />
                              </div>

                              <div className="max-w-[400px] mx-auto">
                                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                                  <span>{t.charts.deficit}</span>
                                  <span>{Math.round((result.deficit / result.tdee) * 100)}%</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(result.deficit / result.tdee) * 100}%` }}
                                    className="h-full bg-health-green"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : activeCalculator === 'BodyFat' ? (
                            <div className="space-y-2">
                              <div className="text-5xl font-bold text-slate-900">{result}%</div>
                              {'category' in (healthInterpretation || ({} as any)) ? (
                                <div className={`text-lg font-bold uppercase ${statusToTextClass((healthInterpretation as any).status)}`}>
                                  {(healthInterpretation as any).category}
                                </div>
                              ) : null}
                            </div>
                          ) : activeCalculator === 'BMI' ? (
                            <div className="space-y-2">
                              <div className="text-5xl font-bold text-slate-900">{result}</div>
                              {'category' in (healthInterpretation || ({} as any)) ? (
                                <div className={`text-lg font-bold uppercase ${statusToTextClass((healthInterpretation as any).status)}`}>
                                  {(healthInterpretation as any).category}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            `${result}${activeCalculator === 'Water' ? (lang === 'en' ? ' ml' : ' مل') : activeCalculator === 'IdealWeight' ? (lang === 'en' ? ' kg' : ' كجم') : (lang === 'en' ? ' kcal' : ' سعرة')}`
                          )}
                          {activeCalculator === 'Protein' && (lang === 'en' ? 'g/day' : 'جم/يوم')}
                        </div>

                        {healthInterpretation?.message && (
                          <div className={`mt-3 text-sm font-bold ${statusToTextClass(healthInterpretation.status)}`}>
                            {healthInterpretation.message}
                          </div>
                        )}
                        
                        <div className="flex items-start gap-3 text-left bg-soft-blue p-4 rounded-2xl mt-6">
                          <Info className="w-5 h-5 text-health-green shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-600 leading-relaxed italic">
                            <strong>{t.results.note}</strong> {
                              activeCalculator === 'BMI' ? t.results.bmiNote :
                              activeCalculator === 'WHtR' ? t.results.whtrNote :
                              activeCalculator === 'BMR' ? t.results.bmrNote :
                              activeCalculator === 'TDEE' ? t.results.tdeeNote :
                              activeCalculator === 'Macros' ? t.results.macrosNote :
                              activeCalculator === 'Protein' ? t.results.proteinNote :
                              activeCalculator === 'IdealWeight' ? t.results.idealWeightNote :
                              activeCalculator === 'BodyFat' ? t.results.bodyFatNote :
                              activeCalculator === 'Water' ? t.results.waterNote :
                              activeCalculator === 'Deficit' ? t.results.deficitNote :
                              t.results.mealNote
                            }
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {result !== null && activeCalculator && (
                    <div className="mt-8">
                      <AskAboutResultChat
                        calculatorName={activeCalculator}
                        lang={lang}
                        hiddenContext={JSON.stringify(
                          {
                            calculator: activeCalculator,
                            result,
                            interpretation: healthInterpretation,
                            inputs: {
                              weight,
                              height,
                              age,
                              gender,
                              activity,
                              goal,
                              bodyType,
                              unitSystem,
                            },
                            language: lang,
                          },
                          null,
                          2,
                        )}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Food Database Section */}
      <section id="food-db" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 mb-12">
            <h2 className="text-3xl font-bold text-slate-900">{t.foodDb.title}</h2>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-2">
                {['all', 'protein', 'fruit', 'grain', 'cooked', 'dairy', 'vegetable', 'fat'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFoodCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${foodCategory === cat ? 'bg-health-green text-white shadow-lg shadow-health-green/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {cat === 'all' ? t.foodDb.categoryAll : 
                     cat === 'protein' ? t.foodDb.categoryProtein :
                     cat === 'fruit' ? t.foodDb.categoryFruit :
                     cat === 'grain' ? t.foodDb.categoryGrain :
                     cat === 'cooked' ? t.foodDb.categoryCooked :
                     cat === 'dairy' ? t.foodDb.categoryDairy :
                     cat === 'vegetable' ? t.foodDb.categoryVegetable :
                     t.foodDb.categoryFat}
                  </button>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <button 
                  onClick={() => setShowFoodTable(!showFoodTable)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all border-2 whitespace-nowrap w-full sm:w-auto justify-center ${showFoodTable ? 'bg-medical-blue border-medical-blue text-white shadow-lg shadow-medical-blue/20' : 'border-medical-blue text-medical-blue hover:bg-medical-blue/5'}`}
                >
                  <Sparkles className="w-5 h-5" /> {t.foodDb.suggestedFoods}
                </button>

                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rtl:left-auto rtl:right-4" />
                  <input 
                    type="text"
                    placeholder={t.foodDb.searchPlaceholder}
                    value={foodSearch}
                    onChange={(e) => {
                      setFoodSearch(e.target.value);
                      if (e.target.value.length > 0) setShowFoodTable(true);
                    }}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none rtl:pr-12 rtl:pl-4"
                  />
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showFoodTable && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mb-8 flex justify-center">
                  <button 
                    onClick={() => setIsCustomModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-soft-blue text-health-green font-bold hover:bg-health-green hover:text-white transition-all shadow-sm"
                  >
                    <Plus className="w-5 h-5" /> {t.ux.cantFindFood}
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm mb-12">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left rtl:text-right">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4 text-sm font-bold text-slate-900">{t.foodDb.colName}</th>
                          <th className="px-6 py-4 text-sm font-bold text-slate-900">{t.foodDb.colCals}</th>
                          <th className="px-6 py-4 text-sm font-bold text-slate-900">{t.foodDb.colProtein}</th>
                          <th className="px-6 py-4 text-sm font-bold text-slate-900">{t.foodDb.colCarbs}</th>
                          <th className="px-6 py-4 text-sm font-bold text-slate-900">{t.foodDb.colFats}</th>
                          <th className="px-6 py-4 text-sm font-bold text-slate-900"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredFoods.map(food => (
                          <tr key={food.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-bold text-slate-900">{food.name[lang]}</div>
                              <div className="text-xs text-slate-400 capitalize">{food.category}</div>
                            </td>
                            <td className="px-6 py-4 text-slate-600 font-medium">{food.calories}</td>
                            <td className="px-6 py-4 text-health-green font-bold">{food.protein}g</td>
                            <td className="px-6 py-4 text-medical-blue font-bold">{food.carbs}g</td>
                            <td className="px-6 py-4 text-orange-500 font-bold">{food.fats}g</td>
                            <td className="px-6 py-4 text-right rtl:text-left">
                              <button 
                                onClick={() => addFoodToMeal(food)}
                                className="p-2 bg-soft-blue text-health-green rounded-xl hover:bg-health-green hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
                              >
                                <Plus className="w-4 h-4" /> {t.foodDb.addAction}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <BlogSection
        t={t}
        lang={lang}
        articles={articles}
        selectedArticle={selectedArticle}
        setSelectedArticle={setSelectedArticle}
        IconComponent={IconComponent}
      />

      <DrugNutrientChecker lang={lang} />

      {/* Custom Food Modal */}
      <AnimatePresence>
        {isCustomModalOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCustomModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{t.customFood.title}</h3>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">{t.customFood.nameLabel}</label>
                  <input 
                    type="text"
                    value={newFood.nameEn}
                    onChange={(e) => setNewFood({...newFood, nameEn: e.target.value})}
                    placeholder={t.customFood.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">{t.customFood.calsLabel}</label>
                    <input 
                      type="number"
                      value={newFood.calories}
                      onChange={(e) => setNewFood({...newFood, calories: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">{t.customFood.proteinLabel}</label>
                    <input 
                      type="number"
                      value={newFood.protein}
                      onChange={(e) => setNewFood({...newFood, protein: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">{t.customFood.carbsLabel}</label>
                    <input 
                      type="number"
                      value={newFood.carbs}
                      onChange={(e) => setNewFood({...newFood, carbs: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">{t.customFood.fatsLabel}</label>
                    <input 
                      type="number"
                      value={newFood.fats}
                      onChange={(e) => setNewFood({...newFood, fats: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-health-green outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setIsCustomModalOpen(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all"
                >
                  {t.ux.cancel}
                </button>
                <button 
                  onClick={saveCustomFood}
                  className="flex-1 py-3 rounded-xl font-bold bg-health-green text-white hover:bg-health-green-dark transition-all shadow-lg shadow-health-green/20"
                >
                  {t.ux.saveFood}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Wrist Test Modal */}
      <AnimatePresence>
        {isWristModalOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWristModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">{t.somatotype.wristTest}</h3>
                <button onClick={() => setIsWristModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-soft-blue rounded-2xl border border-health-green/10">
                  <h4 className="font-bold text-health-green mb-2">{t.somatotype.ecto}</h4>
                  <p className="text-sm text-slate-600">{t.somatotype.ectoWrist}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-medical-blue mb-2">{t.somatotype.meso}</h4>
                  <p className="text-sm text-slate-600">{t.somatotype.mesoWrist}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <h4 className="font-bold text-orange-500 mb-2">{t.somatotype.endo}</h4>
                  <p className="text-sm text-slate-600">{t.somatotype.endoWrist}</p>
                </div>
              </div>

              <button 
                onClick={() => setIsWristModalOpen(false)}
                className="w-full mt-8 py-4 rounded-xl font-bold bg-health-green text-white hover:bg-health-green-dark transition-all"
              >
                {t.ux.cancel}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tooltip Modal */}
      <AnimatePresence>
        {isTooltipModalOpen && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTooltipModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-soft-blue rounded-lg text-health-green">
                  <Info className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{tooltipData.title}</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {tooltipData.text}
              </p>
              <button 
                onClick={() => setIsTooltipModalOpen(false)}
                className="w-full py-3 rounded-xl font-bold text-health-green hover:bg-soft-blue transition-all"
              >
                {lang === 'en' ? 'Got it' : 'فهمت'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* About Us Section */}
      <AboutSection lang={lang} />

      {/* Newsletter Section */}
      <NewsletterSection lang={lang} />

      {/* Footer */}
      <Footer t={t} lang={lang} />
    </div>
  );
}
