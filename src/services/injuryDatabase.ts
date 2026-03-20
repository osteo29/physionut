// src/services/injuryDatabase.ts
// قاعدة بيانات الإصابات الشائعة في العلاج الطبيعي

import {decodeMojibake} from './textEncoding';

export interface Nutrient {
  name: string;
  dosage: string;
  purpose: string;
  evidence: string;
}

export interface RecoveryStage {
  phase: string;
  focus: string;
  nutrients: Nutrient[];
  foods?: string[];
  avoid?: string[];
  proteinRequirement?: string;
  waterRequirement?: string;
  exercises?: string[];
  protocol?: string;
  position?: string;
}

export interface Injury {
  id: string;
  name: string;
  category: string;
  recoveryWeeks: number;
  stages: {
    [key: string]: RecoveryStage;
  };
  contraindications?: {
    medications: string[];
    supplements: string[];
  };
}

const rawInjuryDatabase: { [key: string]: Injury } = {
  "ACL tear": {
    id: "acl_tear",
    name: "ACL tear",
    category: "Knee Injuries",
    recoveryWeeks: 24,
    stages: {
      "week1-2": {
        phase: "Acute / Inflammatory",
        focus: "تقليل الالتهاب وحماية الرباط",
        nutrients: [
          { name: "Omega-3", dosage: "2-3g/day", purpose: "مضاد للالتهابات", evidence: "Level A" },
          { name: "Vitamin C", dosage: "500mg/day", purpose: "يدعم تكوين الكولاجين", evidence: "Level B" },
          { name: "Bromelain", dosage: "500mg/day", purpose: "إنزيم مضاد للالتهاب", evidence: "Level B" }
        ],
        foods: ["السلمون", "التوت", "البروكلي", "الأناناس"],
        avoid: ["الأطعمة المصنعة", "السكريات المكررة"]
      },
      "week3-6": {
        phase: "Proliferative / Repair",
        focus: "إعادة بناء الأنسجة",
        nutrients: [
          { name: "Collagen Peptides", dosage: "10-15g/day", purpose: "لبناء الرباط", evidence: "Level A" },
          { name: "Zinc", dosage: "15mg/day", purpose: "تخليق البروتين", evidence: "Level B" },
          { name: "Vitamin D3", dosage: "2000IU/day", purpose: "دعم المناعة", evidence: "Level A" }
        ],
        foods: ["البيض", "الدجاج", "البقوليات", "المكسرات"],
        proteinRequirement: "1.6-2.0 g/kg"
      },
      "week7+": {
        phase: "Remodeling / Strengthening",
        focus: "تقوية العضلات المحيطة",
        nutrients: [
          { name: "Creatine", dosage: "5g/day", purpose: "زيادة القوة العضلية", evidence: "Level A" },
          { name: "Magnesium", dosage: "400mg/day", purpose: "انقباض العضلات", evidence: "Level B" },
          { name: "BCAAs", dosage: "10g/day", purpose: "تقليل وجع العضلات", evidence: "Level B" }
        ],
        foods: ["اللحوم الخالية من الدهون", "الموز", "البطاطا", "السبانخ"],
        exercises: ["تمارين تقوية", "تحمل تدريجي"]
      }
    },
    contraindications: {
      medications: ["NSAIDs لفترات طويلة قد تؤخر الشفاء في المراحل المتأخرة"],
      supplements: ["تجنب فيتامين E بجرعات عالية (مضاد تخثر)"]
    }
  },
  "Rotator cuff tear": {
    id: "rotator_cuff_tear",
    name: "Rotator cuff tear",
    category: "Shoulder Injuries",
    recoveryWeeks: 16,
    stages: {
      "week1-2": {
        phase: "Protection Phase",
        focus: "حماية الكتف وتقليل الألم",
        nutrients: [
          { name: "Turmeric/Curcumin", dosage: "500mg twice/day", purpose: "مضاد التهاب طبيعي", evidence: "Level B" },
          { name: "Vitamin C", dosage: "1000mg/day", purpose: "الكولاجين", evidence: "Level B" }
        ],
        foods: ["الكركم", "الزنجبيل", "الأسماك الدهنية"],
        position: "تجنب رفع الذراع فوق الرأس"
      },
      "week3-6": {
        phase: "Repair Phase",
        focus: "إصلاح الأوتار",
        nutrients: [
          { name: "Collagen Type I & III", dosage: "15g/day", purpose: "لبناء الوتر", evidence: "Level A" },
          { name: "Manganese", dosage: "5mg/day", purpose: "تخليق البروتيوغليكان", evidence: "Level C" }
        ],
        foods: ["مرق العظام", "الحمضيات", "الخضروات الورقية"]
      },
      "week7+": {
        phase: "Functional Phase",
        focus: "العودة للوظيفة الطبيعية",
        nutrients: [
          { name: "Glucosamine", dosage: "1500mg/day", purpose: "صحة الأوتار", evidence: "Level B" },
          { name: "Vitamin B12", dosage: "500mcg/day", purpose: "تجديد الأعصاب", evidence: "Level B" }
        ],
        exercises: ["تمارين المقاومة التدريجية"]
      }
    }
  },
  "Herniated disc": {
    id: "herniated_disc_lumbar",
    name: "Herniated disc",
    category: "Spine Injuries",
    recoveryWeeks: 12,
    stages: {
      "week1-2": {
        phase: "Acute Pain Management",
        focus: "تقليل الضغط على العصب",
        nutrients: [
          { name: "Magnesium Glycinate", dosage: "400mg at night", purpose: "ارتخاء العضلات", evidence: "Level A" },
          { name: "Boswellia", dosage: "300mg/day", purpose: "مضاد التهاب للأعصاب", evidence: "Level B" },
          { name: "Vitamin B Complex", dosage: "High potency", purpose: "صحة الأعصاب", evidence: "Level B" }
        ],
        foods: ["المكسرات", "البذور", "الخضروات الورقية الداكنة"],
        avoid: ["الجلوس الطويل", "رفع الأوزان"]
      },
      "week3-6": {
        phase: "Disc Hydration",
        focus: "ترطيب وتغذية القرص",
        nutrients: [
          { name: "Hyaluronic Acid", dosage: "200mg/day", purpose: "ترطيب الأقراص", evidence: "Level C" },
          { name: "Chondroitin", dosage: "800mg/day", purpose: "مرونة النسيج", evidence: "Level B" },
          { name: "Water", dosage: "3L/day", purpose: "محوري للغاية", evidence: "Level A" }
        ],
        waterRequirement: "زيادة 30% عن المعدل الطبيعي"
      },
      "week7+": {
        phase: "Core Strengthening",
        focus: "دعم العمود الفقري",
        nutrients: [
          { name: "Protein", dosage: "1.5-1.8 g/kg", purpose: "بناء العضلات الداعمة", evidence: "Level A" },
          { name: "Calcium", dosage: "1000mg/day", purpose: "صحة الفقرات", evidence: "Level B" }
        ],
        exercises: ["تمارين البلانك", "السباحة"]
      }
    }
  },
  "Ankle sprain (Grade 2)": {
    id: "ankle_sprain_grade2",
    name: "Ankle sprain (Grade 2)",
    category: "Ankle Injuries",
    recoveryWeeks: 6,
    stages: {
      "week1": {
        phase: "Acute / RICE",
        focus: "Protection & Swelling Control",
        nutrients: [
          { name: "Arnica", dosage: "Topical/homeopathic", purpose: "تقليل الكدمات", evidence: "Level B" },
          { name: "Quercetin", dosage: "500mg/day", purpose: "تثبيت الخلايا البدينة", evidence: "Level B" },
          { name: "Vitamin C", dosage: "1000mg/day", purpose: "إصلاح الأربطة", evidence: "Level B" }
        ],
        protocol: "RICE (Rest, Ice, Compression, Elevation)"
      },
      "week2-4": {
        phase: "Sub-acute / Mobility",
        focus: "استعادة الحركة",
        nutrients: [
          { name: "Collagen", dosage: "10g with Vitamin C", purpose: "إصلاح الرباط", evidence: "Level A" },
          { name: "Copper", dosage: "2mg/day", purpose: "تكوين الإيلاستين", evidence: "Level C" }
        ],
        foods: ["المحار", "الكبد", "المكسرات البرازيلية"]
      },
      "week5-6": {
        phase: "Rehabilitation",
        focus: "استقرار الكاحل",
        nutrients: [
          { name: "Vitamin D3/K2", dosage: "5000IU/100mcg", purpose: "صحة العظام", evidence: "Level A" },
          { name: "MSM", dosage: "3000mg/day", purpose: "مرونة النسيج", evidence: "Level B" }
        ],
        exercises: ["تمارين التوازن", "تقوية الكاحل"]
      }
    }
  },
  "Hamstring strain (Grade 2)": {
    id: "hamstring_strain_grade2",
    name: "Hamstring strain (Grade 2)",
    category: "Muscle Injuries",
    recoveryWeeks: 4,
    stages: {
      "week1": {
        phase: "Immediate Care",
        focus: "منع النزيف الداخلي",
        nutrients: [
          { name: "Vitamin K", dosage: "90mcg/day", purpose: "تجلط الدم", evidence: "Level B" },
          { name: "Curcumin", dosage: "1000mg/day", purpose: "تقليل الالتهاب", evidence: "Level A" }
        ],
        foods: ["الخضروات الورقية", "الكركم"]
      },
      "week2-3": {
        phase: "Repair Phase",
        focus: "إعادة بناء الألياف",
        nutrients: [
          { name: "Leucine", dosage: "3g/meal", purpose: "تحفيز تخليق البروتين", evidence: "Level A" },
          { name: "Glutamine", dosage: "10g/day", purpose: "إصلاح العضلات", evidence: "Level B" },
          { name: "Vitamin E", dosage: "15mg/day", purpose: "حماية الغشاء الخلوي", evidence: "Level B" }
        ],
        proteinRequirement: "2.0g/kg"
      },
      "week4": {
        phase: "Return to Sport",
        focus: "منع إعادة الإصابة",
        nutrients: [
          { name: "Beta-alanine", dosage: "3.2g/day", purpose: "تحمل العضلة", evidence: "Level A" },
          { name: "CoQ10", dosage: "200mg/day", purpose: "طاقة الميتوكوندريا", evidence: "Level B" }
        ],
        exercises: ["تمارين الـ eccentric"]
      }
    }
  },
  "Post-surgical (General)": {
    id: "post_surgical_general",
    name: "Post-surgical (General)",
    category: "Surgical Recovery",
    recoveryWeeks: 8,
    stages: {
      "week1": {
        phase: "Immediate Post-op",
        focus: "التئام الجرح ومنع العدوى",
        nutrients: [
          { name: "Zinc", dosage: "30mg/day (limited time)", purpose: "التئام الجروح", evidence: "Level A" },
          { name: "Vitamin A", dosage: "5000IU/day", purpose: "تكوين الظهارة", evidence: "Level B" },
          { name: "Vitamin C", dosage: "2000mg/day", purpose: "تخليق الكولاجين", evidence: "Level A" }
        ],
        foods: ["البروتين سهل الهضم", "السوائل الدافئة"],
        avoid: ["التدخين", "الكحول"]
      },
      "week2-4": {
        phase: "Tissue Proliferation",
        focus: "بناء الأنسجة الجديدة",
        nutrients: [
          { name: "Arginine", dosage: "15g/day", purpose: "توسيع الأوعية وتغذية الأنسجة", evidence: "Level A" },
          { name: "Glutamine", dosage: "10g/day", purpose: "وظيفة المناعة", evidence: "Level A" },
          { name: "HMB", dosage: "3g/day", purpose: "منع هدم العضلات", evidence: "Level A" }
        ],
        proteinRequirement: "1.8-2.2g/kg"
      },
      "week5+": {
        phase: "Maturation",
        focus: "استعادة القوة",
        nutrients: [
          { name: "Creatine", dosage: "5g/day", purpose: "استعادة القوة", evidence: "Level A" },
          { name: "Vitamin D3", dosage: "2000IU/day", purpose: "المناعة وصحة العظام", evidence: "Level A" }
        ],
        exercises: ["إعادة التأهيل التدريجي"]
      }
    }
  },
  "Tennis Elbow": {
    id: "tennis_elbow",
    name: "Tennis Elbow (Lateral Epicondylitis)",
    category: "Elbow Injuries",
    recoveryWeeks: 12,
    stages: {
      "week1-2": {
        phase: "Reactive Phase",
        focus: "تقليل الحمل والألم",
        nutrients: [
          { name: "Nitric Oxide Boosters", dosage: "Beetroot juice", purpose: "تحسين تدفق الدم للوتر", evidence: "Level B" },
          { name: "Vitamin C", dosage: "1000mg/day", purpose: "إصلاح الأنسجة", evidence: "Level B" }
        ],
        foods: ["البنجر", "الفلفل الألوان", "البرتقال"],
        avoid: ["الحركات المتكررة المجهدة"]
      },
      "week3-8": {
        phase: "Dysrepair Phase",
        focus: "تحفيز إعادة بناء الوتر",
        nutrients: [
          { name: "Collagen Peptides", dosage: "15g/day", purpose: "بناء ألياف الوتر", evidence: "Level A" },
          { name: "Leucine", dosage: "3g/meal", purpose: "تخليق البروتين", evidence: "Level B" }
        ],
        foods: ["اللحوم", "الأسماك", "البيض"]
      },
      "week9+": {
        phase: "Degenerative Phase",
        focus: "التحميل التدريجي",
        nutrients: [
          { name: "Glucosamine/Chondroitin", dosage: "1500mg/800mg", purpose: "صحة المفاصل والأوتار", evidence: "Level B" }
        ],
        exercises: ["تمارين الـ eccentric للساعد"]
      }
    }
  },
  "Achilles Tendonitis": {
    id: "achilles_tendonitis",
    name: "Achilles Tendonitis",
    category: "Ankle Injuries",
    recoveryWeeks: 12,
    stages: {
      "week1-2": {
        phase: "Inflammatory Phase",
        focus: "تقليل التورم والألم",
        nutrients: [
          { name: "Omega-3", dosage: "3g/day", purpose: "مضاد التهاب", evidence: "Level A" },
          { name: "Vitamin C", dosage: "500mg/day", purpose: "دعم الكولاجين", evidence: "Level B" }
        ],
        foods: ["السردين", "بذور الكتان", "الجوز"]
      },
      "week3-8": {
        phase: "Remodeling Phase",
        focus: "تحسين مرونة الوتر",
        nutrients: [
          { name: "Collagen", dosage: "15g with Vit C", purpose: "قوة الوتر", evidence: "Level A" },
          { name: "Silicon", dosage: "10mg/day", purpose: "مرونة الأنسجة", evidence: "Level C" }
        ],
        foods: ["الشوفان", "الخيار", "الفاصوليا"]
      },
      "week9+": {
        phase: "Return to Activity",
        focus: "القفز والجري التدريجي",
        nutrients: [
          { name: "Creatine", dosage: "5g/day", purpose: "قوة الدفع", evidence: "Level B" }
        ]
      }
    }
  },
  "Plantar Fasciitis": {
    id: "plantar_fasciitis",
    name: "Plantar Fasciitis",
    category: "Foot Injuries",
    recoveryWeeks: 12,
    stages: {
      "week1-4": {
        phase: "Acute Phase",
        focus: "تقليل التهاب اللفافة الأخمصية",
        nutrients: [
          { name: "Bromelain", dosage: "500mg/day", purpose: "تقليل التورم", evidence: "Level B" },
          { name: "Magnesium", dosage: "400mg/day", purpose: "ارتخاء العضلات", evidence: "Level A" }
        ],
        foods: ["الأناناس", "السبانخ", "الموز"]
      },
      "week5+": {
        phase: "Strengthening Phase",
        focus: "دعم قوس القدم",
        nutrients: [
          { name: "Vitamin D", dosage: "2000IU/day", purpose: "صحة العظام والأربطة", evidence: "Level A" },
          { name: "Calcium", dosage: "1000mg/day", purpose: "قوة العظام", evidence: "Level B" }
        ],
        exercises: ["تمارين تقوية عضلات القدم الداخلية"]
      }
    }
  },
  "Meniscus Tear": {
    id: "meniscus_tear",
    name: "Meniscus Tear",
    category: "Knee Injuries",
    recoveryWeeks: 12,
    stages: {
      "week1-4": {
        phase: "Protection Phase",
        focus: "حماية الغضروف وتقليل التورم",
        nutrients: [
          { name: "Glucosamine Sulfate", dosage: "1500mg/day", purpose: "صحة الغضاريف", evidence: "Level A" },
          { name: "Chondroitin Sulfate", dosage: "1200mg/day", purpose: "مرونة الغضروف", evidence: "Level A" }
        ],
        foods: ["مرق العظام", "الأسماك", "الخضروات الصليبية"]
      },
      "week5-8": {
        phase: "Loading Phase",
        focus: "تحمل الوزن التدريجي",
        nutrients: [
          { name: "Hyaluronic Acid", dosage: "100mg/day", purpose: "تزييت المفصل", evidence: "Level B" },
          { name: "Vitamin C", dosage: "500mg/day", purpose: "دعم الأنسجة الضامة", evidence: "Level B" }
        ]
      },
      "week9+": {
        phase: "Functional Phase",
        focus: "العودة للنشاط الكامل",
        nutrients: [
          { name: "Omega-3", dosage: "2g/day", purpose: "صحة المفاصل طويلة الأمد", evidence: "Level A" }
        ]
      }
    }
  }
};

function normalizeStage(stage: RecoveryStage): RecoveryStage {
  return {
    ...stage,
    phase: decodeMojibake(stage.phase),
    focus: decodeMojibake(stage.focus),
    nutrients: stage.nutrients.map((nutrient) => ({
      ...nutrient,
      purpose: decodeMojibake(nutrient.purpose),
    })),
    foods: stage.foods?.map((item) => decodeMojibake(item)),
    avoid: stage.avoid?.map((item) => decodeMojibake(item)),
    proteinRequirement: decodeMojibake(stage.proteinRequirement),
    waterRequirement: decodeMojibake(stage.waterRequirement),
    exercises: stage.exercises?.map((item) => decodeMojibake(item)),
    protocol: decodeMojibake(stage.protocol),
    position: decodeMojibake(stage.position),
  };
}

function normalizeInjury(injury: Injury): Injury {
  return {
    ...injury,
    name: decodeMojibake(injury.name),
    category: decodeMojibake(injury.category),
    stages: Object.fromEntries(
      Object.entries(injury.stages).map(([key, stage]) => [key, normalizeStage(stage)]),
    ),
    contraindications: injury.contraindications
      ? {
          medications: injury.contraindications.medications.map((item) => decodeMojibake(item)),
          supplements: injury.contraindications.supplements.map((item) => decodeMojibake(item)),
        }
      : undefined,
  };
}

export const injuryDatabase: { [key: string]: Injury } = Object.fromEntries(
  Object.entries(rawInjuryDatabase).map(([key, injury]) => [key, normalizeInjury(injury)]),
);

export const getInjuryById = (id: string): Injury | undefined => {
  return Object.values(injuryDatabase).find(injury => injury.id === id);
};

export const getInjuriesByCategory = (category: string): Injury[] => {
  return Object.values(injuryDatabase).filter(injury => injury.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(Object.values(injuryDatabase).map(injury => injury.category))];
};
