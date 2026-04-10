import type {
  BodyRegion,
  InjuryCategory,
  InjuryPhase,
  InjuryProtocol,
  MealExamples,
} from './injuryDatabase';

type ProtocolFlavor =
  | 'muscle'
  | 'ligament'
  | 'tendon'
  | 'bone'
  | 'joint'
  | 'overuse'
  | 'sports'
  | 'pediatric'
  | 'geriatric'
  | 'postsurgery';

type ProtocolSeed = {
  id: string;
  name: string;
  category: InjuryCategory;
  bodyRegion: BodyRegion;
  flavor: ProtocolFlavor;
  keywords?: string[];
  commonIn?: string[];
  redFlags?: string[];
  overview?: string;
  rehabSummary?: string;
};

const flavorDefaults: Record<
  ProtocolFlavor,
  {
    commonIn: string[];
    redFlags: string[];
    rehabSummary: string;
    medications: string[];
    supplements: string[];
    nutritionFocus: string[];
    recommendedFoods: string[];
    avoidFoods: string[];
    exercises: string[];
    prohibitedMovements: string[];
    shoppingList: string[];
    meals: Omit<MealExamples, 'shoppingList'>;
    proteinPerKg: {min: number; max: number};
    hydrationMlPerKg: number;
    collagenPerKg?: {min: number; max: number};
    omega3Grams?: number;
    creatineGrams?: number;
    calciumMg?: number;
    vitaminCMg?: number;
  }
> = {
  muscle: {
    commonIn: ['Sprinting', 'Gym training', 'Field sports'],
    redFlags: ['Major bruising with severe weakness', 'Suspected avulsion', 'Loss of function worsening rapidly'],
    rehabSummary: 'Calm symptoms first, then rebuild tissue tolerance with progressive loading and regular protein feedings.',
    medications: ['Review fish oil, curcumin, or pain medication timing if bruising risk is high.'],
    supplements: ['Supplements help only when loading, sleep, and total energy are in place.'],
    nutritionFocus: ['Higher protein', 'Vitamin C', 'Structured hydration', 'No alcohol around the early healing phase'],
    recommendedFoods: ['Greek yogurt', 'Eggs', 'Salmon', 'Berries', 'Potatoes'],
    avoidFoods: ['Alcohol', 'Heavy fast food', 'Long gaps without eating'],
    exercises: ['Pain-limited isometrics', 'Range of motion work', 'Progressive strengthening'],
    prohibitedMovements: ['Explosive return before strength tolerance', 'Aggressive stretching into pain'],
    shoppingList: ['Greek yogurt', 'Eggs', 'Salmon', 'Potatoes', 'Berries', 'Rice'],
    meals: {
      breakfast: 'Greek yogurt, oats, and berries',
      lunch: 'Chicken or tofu with rice and vegetables',
      dinner: 'Salmon or lentils with potatoes and greens',
      snack: 'Protein shake and fruit',
    },
    proteinPerKg: {min: 1.8, max: 2.3},
    hydrationMlPerKg: 38,
    collagenPerKg: {min: 0.12, max: 0.18},
    omega3Grams: 2,
    creatineGrams: 5,
    vitaminCMg: 500,
  },
  ligament: {
    commonIn: ['Cutting sports', 'Falls', 'Contact play'],
    redFlags: ['Mechanical instability', 'Rapid swelling with severe pain', 'Inability to bear load'],
    rehabSummary: 'Protect the joint early, then build stiffness, confidence, and repeatable loading capacity.',
    medications: ['Check bleeding risk around surgery or procedures before using fish oil or curcumin.'],
    supplements: ['Collagen support should sit beside structured rehab, not replace it.'],
    nutritionFocus: ['Protein adequacy', 'Collagen plus vitamin C before rehab', 'Hydration'],
    recommendedFoods: ['Eggs', 'Citrus fruit', 'Greek yogurt', 'Lean meat', 'Beans'],
    avoidFoods: ['Skipping rehab fuel', 'Low-protein snacking all day'],
    exercises: ['Protected range of motion', 'Balance drills', 'Progressive strength work'],
    prohibitedMovements: ['Uncleared cutting or pivoting', 'High-speed loading before control returns'],
    shoppingList: ['Eggs', 'Greek yogurt', 'Oranges', 'Lean meat', 'Beans', 'Rice'],
    meals: {
      breakfast: 'Eggs, toast, and kiwi',
      lunch: 'Lean meat or tofu rice bowl',
      dinner: 'Bean pasta with vegetables',
      snack: 'Collagen drink and orange before rehab',
    },
    proteinPerKg: {min: 1.8, max: 2.2},
    hydrationMlPerKg: 36,
    collagenPerKg: {min: 0.12, max: 0.18},
    vitaminCMg: 500,
  },
  tendon: {
    commonIn: ['Overuse', 'Plyometric training', 'Repeated sport loading'],
    redFlags: ['Sudden rupture symptoms', 'Sharp weakness after a pop', 'Persistent swelling with loss of function'],
    rehabSummary: 'Tendon recovery improves with graded loading, enough energy, and good timing around rehab sessions.',
    medications: ['Medication review matters if combining supplements with injections, surgery, or anticoagulants.'],
    supplements: ['Avoid treating supplements as a shortcut around slow tendon loading progressions.'],
    nutritionFocus: ['Collagen plus vitamin C before loading', 'High-quality protein', 'Carbs around heavy rehab'],
    recommendedFoods: ['Greek yogurt', 'Citrus fruit', 'Rice', 'Chicken', 'Kiwi'],
    avoidFoods: ['Crash dieting', 'Long under-fueled training days'],
    exercises: ['Isometrics', 'Heavy slow resistance', 'Progressive plyometric loading'],
    prohibitedMovements: ['Fast elastic loading before baseline strength returns'],
    shoppingList: ['Greek yogurt', 'Oranges', 'Rice', 'Chicken', 'Kiwi', 'Beans'],
    meals: {
      breakfast: 'Greek yogurt with oats and kiwi',
      lunch: 'Chicken or tofu rice bowl',
      dinner: 'Lentil curry with potatoes',
      snack: 'Collagen and orange before rehab',
    },
    proteinPerKg: {min: 1.8, max: 2.2},
    hydrationMlPerKg: 36,
    collagenPerKg: {min: 0.12, max: 0.18},
    creatineGrams: 5,
    vitaminCMg: 500,
  },
  bone: {
    commonIn: ['Falls', 'Contact trauma', 'Load spikes'],
    redFlags: ['Night pain', 'Deformity', 'Neurovascular symptoms', 'Pain worsening at rest'],
    rehabSummary: 'Bone healing needs adequate energy, protein, calcium support, and respect for protected loading timelines.',
    medications: ['Calcium timing can affect absorption of thyroid, iron, or some antibiotics.'],
    supplements: ['Check vitamin D dosing against clinician guidance when possible.'],
    nutritionFocus: ['Protein', 'Calcium', 'Vitamin D', 'Consistent overall energy intake'],
    recommendedFoods: ['Milk or fortified soy milk', 'Yogurt', 'Eggs', 'Beans', 'Leafy greens'],
    avoidFoods: ['Very low-calorie cutting', 'Smoking', 'Alcohol excess'],
    exercises: ['Protected mobility', 'Strength work for uninvolved areas', 'Cross-training if cleared'],
    prohibitedMovements: ['Impact or loading progression before medical clearance'],
    shoppingList: ['Milk or soy milk', 'Yogurt', 'Eggs', 'Beans', 'Potatoes', 'Leafy greens'],
    meals: {
      breakfast: 'Fortified oats with milk and fruit',
      lunch: 'Beans and rice with yogurt',
      dinner: 'Fish or tofu with potatoes and greens',
      snack: 'Cheese and fruit',
    },
    proteinPerKg: {min: 1.8, max: 2.2},
    hydrationMlPerKg: 35,
    calciumMg: 1200,
    vitaminCMg: 500,
  },
  joint: {
    commonIn: ['Cutting sports', 'Falls', 'Repetitive joint loading'],
    redFlags: ['Locking', 'Repeated giving way', 'Joint deformity', 'Neurological symptoms'],
    rehabSummary: 'Joint and cartilage problems need swelling control, symptom-guided loading, and patient progression back to impact.',
    medications: ['Review anti-inflammatory use and bleeding-risk supplements with clinicians when appropriate.'],
    supplements: ['Food and supplements support joint rehab, but mechanics and load progression still drive outcomes.'],
    nutritionFocus: ['Protein adequacy', 'Hydration', 'Weight management without under-eating', 'Collagen support before loading'],
    recommendedFoods: ['Greek yogurt', 'Berries', 'Beans', 'Fish', 'Olive oil'],
    avoidFoods: ['High alcohol intake', 'Under-eating during rehab', 'Very salty processed food'],
    exercises: ['Mobility work', 'Strengthening', 'Balance and control drills'],
    prohibitedMovements: ['Twisting under pain', 'Full-intensity sport before control returns'],
    shoppingList: ['Greek yogurt', 'Berries', 'Beans', 'Fish', 'Olive oil', 'Rice'],
    meals: {
      breakfast: 'Greek yogurt, berries, and oats',
      lunch: 'Rice bowl with fish or tofu',
      dinner: 'Bean stew with vegetables and olive oil',
      snack: 'Fruit and cottage cheese',
    },
    proteinPerKg: {min: 1.6, max: 2.1},
    hydrationMlPerKg: 35,
    collagenPerKg: {min: 0.12, max: 0.18},
    omega3Grams: 2,
    vitaminCMg: 500,
  },
  overuse: {
    commonIn: ['Repetitive training', 'Desk work', 'Load accumulation'],
    redFlags: ['Pain that is spreading', 'Persistent neurological symptoms', 'Night pain or unexplained weakness'],
    rehabSummary: 'Chronic irritation usually improves with load management, sleep, recovery nutrition, and a slower build back up.',
    medications: ['Medication interactions matter if adding curcumin, fish oil, or high-dose magnesium.'],
    supplements: ['Do not stack many supplements while ignoring sleep, stress, and load management.'],
    nutritionFocus: ['Steady protein intake', 'Hydration', 'Anti-inflammatory food pattern', 'Adequate carbs for training tolerance'],
    recommendedFoods: ['Fruit', 'Olive oil', 'Beans', 'Greek yogurt', 'Fatty fish'],
    avoidFoods: ['Meal skipping', 'Alcohol binges', 'Long low-energy days'],
    exercises: ['Load management', 'Mobility work', 'Progressive strengthening', 'Gradual return to volume'],
    prohibitedMovements: ['Volume spikes', 'Repeated painful technique work without recovery'],
    shoppingList: ['Fruit', 'Olive oil', 'Beans', 'Greek yogurt', 'Fatty fish', 'Rice'],
    meals: {
      breakfast: 'Overnight oats with yogurt and fruit',
      lunch: 'Bean and rice bowl with olive oil',
      dinner: 'Fish or tofu with potatoes and vegetables',
      snack: 'Yogurt and banana',
    },
    proteinPerKg: {min: 1.6, max: 2},
    hydrationMlPerKg: 37,
    omega3Grams: 2,
    creatineGrams: 5,
    vitaminCMg: 500,
  },
  sports: {
    commonIn: ['Competitive sport', 'High-speed change of direction', 'High-volume practice'],
    redFlags: ['Combined instability', 'Fast swelling with loss of function', 'Symptoms worsening when sport resumes'],
    rehabSummary: 'Complex sport injuries need enough energy, enough protein, and careful return-to-play fueling around longer rehab blocks.',
    medications: ['Medication and supplement review is more important when surgery or injections are involved.'],
    supplements: ['Use supplements to support training blocks, not to rush return-to-play decisions.'],
    nutritionFocus: ['High protein', 'Creatine', 'Carbs around rehab and skill work', 'Collagen around connective tissue loading'],
    recommendedFoods: ['Rice', 'Yogurt', 'Lean meat', 'Fruit', 'Milk or fortified soy milk'],
    avoidFoods: ['Under-fueling on double-session days', 'Crash dieting during rehab'],
    exercises: ['Strength work', 'Field or skill progressions', 'Power reintroduction'],
    prohibitedMovements: ['Return to play before passing objective criteria'],
    shoppingList: ['Rice', 'Yogurt', 'Lean meat', 'Fruit', 'Milk or soy milk', 'Oats'],
    meals: {
      breakfast: 'Oats with milk, fruit, and protein',
      lunch: 'Lean meat or tofu rice bowl',
      dinner: 'Salmon or beans with potatoes',
      snack: 'Yogurt, banana, and a sports drink around rehab',
    },
    proteinPerKg: {min: 1.8, max: 2.3},
    hydrationMlPerKg: 40,
    collagenPerKg: {min: 0.12, max: 0.18},
    creatineGrams: 5,
    omega3Grams: 2,
    vitaminCMg: 500,
  },
  pediatric: {
    commonIn: ['Youth sport', 'Growth spurts', 'School activity'],
    redFlags: ['Growth plate tenderness', 'Inability to use the limb', 'Night pain or systemic symptoms'],
    rehabSummary: 'Pediatric cases need symptom-guided protection, age-appropriate loading, and enough total calories for growth plus healing.',
    medications: ['Parents should review any supplement plan with pediatric clinicians.'],
    supplements: ['Avoid adult-style high-dose supplementation without professional guidance.'],
    nutritionFocus: ['Adequate total calories', 'Protein spread across meals', 'Calcium-rich foods', 'Hydration'],
    recommendedFoods: ['Milk or fortified soy milk', 'Eggs', 'Yogurt', 'Beans', 'Fruit'],
    avoidFoods: ['Skipping breakfast', 'Energy drink dependence', 'Low-calorie restriction during growth'],
    exercises: ['Protected activity', 'Technique work', 'Gradual return to play'],
    prohibitedMovements: ['Playing through pain', 'Aggressive loading on open growth plates'],
    shoppingList: ['Milk or soy milk', 'Eggs', 'Yogurt', 'Beans', 'Fruit', 'Oats'],
    meals: {
      breakfast: 'Milk, oats, and fruit',
      lunch: 'Egg or chicken wrap with yogurt',
      dinner: 'Beans or fish with rice and vegetables',
      snack: 'Yogurt and banana',
    },
    proteinPerKg: {min: 1.5, max: 1.9},
    hydrationMlPerKg: 35,
    calciumMg: 1200,
    vitaminCMg: 500,
  },
  geriatric: {
    commonIn: ['Falls', 'Bone fragility', 'Low reserve during illness'],
    redFlags: ['Confusion', 'Rapid mobility decline', 'Inability to transfer', 'Chest symptoms after a fall'],
    rehabSummary: 'Older adults benefit from protein-dense meals, hydration support, and strength-focused nutrition during recovery.',
    medications: ['Check supplement plans against osteoporosis, heart, and anticoagulant medications.'],
    supplements: ['Keep supplement plans simple and clinician-reviewed when many prescriptions are present.'],
    nutritionFocus: ['Protein density', 'Calcium', 'Vitamin D', 'Hydration and appetite support'],
    recommendedFoods: ['Greek yogurt', 'Milk or fortified soy milk', 'Eggs', 'Soft beans', 'Fruit'],
    avoidFoods: ['Meal skipping', 'Very low protein soups only', 'Alcohol excess'],
    exercises: ['Sit-to-stand progressions', 'Walking if cleared', 'Balance and strength work'],
    prohibitedMovements: ['Unsupervised progression after major fracture or flare'],
    shoppingList: ['Greek yogurt', 'Milk or soy milk', 'Eggs', 'Beans', 'Fruit', 'Oats'],
    meals: {
      breakfast: 'Greek yogurt, oats, and berries',
      lunch: 'Soft rice bowl with eggs or chicken',
      dinner: 'Fish or lentils with potatoes and greens',
      snack: 'Milk and fruit',
    },
    proteinPerKg: {min: 1.6, max: 2},
    hydrationMlPerKg: 34,
    calciumMg: 1200,
    vitaminCMg: 500,
  },
  postsurgery: {
    commonIn: ['Structured rehab', 'Athletic return', 'Orthopedic follow-up'],
    redFlags: ['Post-op calf swelling', 'Fever or wound changes', 'Unexpected pain spike with function drop'],
    rehabSummary: 'After surgery, appetite, hydration, protein timing, and wound-healing support matter from day one through late rehab.',
    medications: ['Medication review is essential because analgesics, anticoagulants, and antibiotics may change supplement safety.'],
    supplements: ['Supplement use should fit the surgeon and physio plan, especially near procedures.'],
    nutritionFocus: ['Protein at each meal', 'Collagen and vitamin C where appropriate', 'Hydration', 'Carbs around rehab'],
    recommendedFoods: ['Greek yogurt', 'Soup with chicken', 'Rice', 'Eggs', 'Citrus fruit'],
    avoidFoods: ['Alcohol', 'Smoking', 'Low-protein snack-only eating'],
    exercises: ['Protected mobility', 'Surgeon-guided strengthening', 'Phase-based rehab progression'],
    prohibitedMovements: ['Jumping ahead of protocol milestones', 'Uncleared loading'],
    shoppingList: ['Greek yogurt', 'Chicken', 'Rice', 'Eggs', 'Oranges', 'Oats'],
    meals: {
      breakfast: 'Overnight oats with yogurt and berries',
      lunch: 'Chicken soup with rice and carrots',
      dinner: 'Fish or tofu with potatoes and greens',
      snack: 'Cottage cheese and kiwi',
    },
    proteinPerKg: {min: 1.9, max: 2.3},
    hydrationMlPerKg: 36,
    collagenPerKg: {min: 0.12, max: 0.18},
    creatineGrams: 5,
    vitaminCMg: 500,
  },
};

function makePhase(seed: ProtocolSeed, label: string, duration: string, window: InjuryPhase['window']): InjuryPhase {
  const defaults = flavorDefaults[seed.flavor];
  const isEarly = window === 'under_48h' || window === 'days_3_14';
  const isLate = window === 'weeks_2_6' || window === 'over_6_weeks';

  return {
    id: label.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
    label,
    duration,
    window,
    goals: [
      isEarly ? `Reduce irritability in ${seed.name}` : `Progress loading tolerance for ${seed.name}`,
      isEarly ? 'Protect tissue quality and appetite' : 'Restore movement confidence and function',
      isLate ? 'Prepare for return to work, sport, or daily activity' : 'Build the next rehab step safely',
    ],
    nutritionFocus: defaults.nutritionFocus,
    recommendedFoods: defaults.recommendedFoods,
    avoidFoods: defaults.avoidFoods,
    supplements: [
      ...(defaults.collagenPerKg
        ? [
            {
              name: 'Collagen peptides',
              dose: '10-15 g',
              reason: 'May support connective tissue loading',
              timing: '30-60 min before rehab',
            },
          ]
        : []),
      ...(defaults.omega3Grams
        ? [{name: 'Omega-3', dose: `${defaults.omega3Grams} g/day`, reason: 'Supports inflammation control and food quality'}]
        : []),
      ...(defaults.creatineGrams && isLate
        ? [{name: 'Creatine monohydrate', dose: `${defaults.creatineGrams} g/day`, reason: 'Supports strength and lean mass during rehab'}]
        : []),
      ...(defaults.calciumMg
        ? [{name: 'Calcium', dose: `${defaults.calciumMg} mg/day`, reason: 'Supports bone health and remodeling'}]
        : []),
      ...(defaults.vitaminCMg
        ? [{name: 'Vitamin C', dose: `${defaults.vitaminCMg} mg/day`, reason: 'Supports collagen building and tissue healing'}]
        : []),
    ],
    exercises: defaults.exercises,
    prohibitedMovements: defaults.prohibitedMovements,
    meals: {
      ...defaults.meals,
      shoppingList: defaults.shoppingList,
    },
    timing: {
      collagen: defaults.collagenPerKg ? 'Use collagen before loading sessions if it fits the rehab plan.' : undefined,
      protein: 'Spread protein across 3-4 meals instead of one large meal.',
      hydration: 'Keep fluids regular through the day, especially when pain meds or stress reduce appetite.',
      carbs: isLate ? 'Add more carbs around demanding rehab, training, or return-to-play sessions.' : undefined,
    },
    proteinPerKg: defaults.proteinPerKg,
    hydrationMlPerKg: defaults.hydrationMlPerKg,
    collagenPerKg: defaults.collagenPerKg,
    omega3Grams: defaults.omega3Grams,
    creatineGrams: isLate ? defaults.creatineGrams : undefined,
    calciumMg: defaults.calciumMg,
    vitaminCMg: defaults.vitaminCMg,
  };
}

function buildPhases(seed: ProtocolSeed): InjuryPhase[] {
  switch (seed.flavor) {
    case 'bone':
    case 'pediatric':
    case 'geriatric':
      return [
        makePhase(seed, 'Protected healing', '0-6 weeks', 'days_3_14'),
        makePhase(seed, 'Reload and return', '6+ weeks', 'over_6_weeks'),
      ];
    case 'postsurgery':
      return [
        makePhase(seed, 'Immediate post-op', '0-14 days', 'under_48h'),
        makePhase(seed, 'Protected rebuild', '2-8 weeks', 'days_3_14'),
        makePhase(seed, 'Late rehab and return', '8+ weeks', 'over_6_weeks'),
      ];
    default:
      return [
        makePhase(seed, 'Acute support', '0-5 days', 'under_48h'),
        makePhase(seed, 'Repair and reload', '5 days to 6 weeks', 'days_3_14'),
        makePhase(seed, 'Return phase', '6+ weeks', 'over_6_weeks'),
      ];
  }
}

function createGeneratedProtocol(seed: ProtocolSeed): InjuryProtocol {
  const defaults = flavorDefaults[seed.flavor];

  return {
    id: seed.id,
    name: seed.name,
    category: seed.category,
    bodyRegion: seed.bodyRegion,
    commonIn: [...new Set([...(seed.commonIn || defaults.commonIn), ...(seed.keywords || []), seed.bodyRegion, seed.category])],
    overview:
      seed.overview ||
      `${seed.name} needs a staged plan that matches tissue healing, pain behavior, and progressive rehab loading in the ${seed.bodyRegion.toLowerCase()}.`,
    rehabSummary: seed.rehabSummary || defaults.rehabSummary,
    redFlags: seed.redFlags || defaults.redFlags,
    relatedCalculators: ['Protein intake', 'Water intake', ...(seed.flavor === 'bone' || seed.flavor === 'sports' || seed.flavor === 'postsurgery' ? ['Macro calculator'] : [])],
    safetyNotes: {
      medications: defaults.medications,
      supplements: defaults.supplements,
    },
    phases: buildPhases(seed),
  };
}

const generatedProtocolSeeds: ProtocolSeed[] = [
  {id: 'quadriceps_strain', name: 'Quadriceps strain', category: 'Muscle', bodyRegion: 'Thigh', flavor: 'muscle'},
  {id: 'calf_strain', name: 'Calf strain (Gastrocnemius / Soleus)', category: 'Muscle', bodyRegion: 'Ankle', flavor: 'muscle'},
  {id: 'biceps_strain', name: 'Biceps strain', category: 'Muscle', bodyRegion: 'Arm', flavor: 'muscle'},
  {id: 'triceps_strain', name: 'Triceps strain', category: 'Muscle', bodyRegion: 'Arm', flavor: 'muscle'},
  {id: 'pectoral_strain', name: 'Pectoral strain', category: 'Muscle', bodyRegion: 'Chest', flavor: 'muscle'},
  {id: 'deltoid_strain', name: 'Deltoid strain', category: 'Muscle', bodyRegion: 'Shoulder', flavor: 'muscle'},
  {id: 'forearm_strain', name: 'Forearm flexor/extensor strain', category: 'Muscle', bodyRegion: 'Wrist', flavor: 'muscle'},
  {id: 'glute_strain', name: 'Gluteus maximus / medius strain', category: 'Muscle', bodyRegion: 'Hip', flavor: 'muscle'},
  {id: 'oblique_strain', name: 'Oblique strain', category: 'Muscle', bodyRegion: 'Whole body', flavor: 'muscle'},
  {id: 'erector_spinae_strain', name: 'Erector spinae strain', category: 'Muscle', bodyRegion: 'Back', flavor: 'muscle'},
  {id: 'neck_muscle_strain', name: 'Neck muscles strain (Sternocleidomastoid, Trapezius)', category: 'Muscle', bodyRegion: 'Neck', flavor: 'muscle'},
  {id: 'adductor_strain', name: 'Adductor strain (Groin pull)', category: 'Muscle', bodyRegion: 'Hip', flavor: 'muscle'},
  {id: 'tibialis_anterior_strain', name: 'Tibialis anterior strain', category: 'Muscle', bodyRegion: 'Foot', flavor: 'muscle'},

  {id: 'pcl_injury', name: 'PCL tear / sprain', category: 'Ligament', bodyRegion: 'Knee', flavor: 'ligament'},
  {id: 'mcl_sprain', name: 'MCL sprain (Medial collateral ligament)', category: 'Ligament', bodyRegion: 'Knee', flavor: 'ligament'},
  {id: 'lcl_sprain', name: 'LCL sprain (Lateral collateral ligament)', category: 'Ligament', bodyRegion: 'Knee', flavor: 'ligament'},
  {id: 'ucl_injury', name: "UCL injury (Elbow, Thrower’s elbow)", category: 'Ligament', bodyRegion: 'Elbow', flavor: 'ligament'},
  {id: 'thumb_collateral_ligament', name: 'Thumb collateral ligament injury', category: 'Ligament', bodyRegion: 'Hand', flavor: 'ligament'},
  {id: 'ac_joint_sprain', name: 'AC joint sprain (Shoulder)', category: 'Ligament', bodyRegion: 'Shoulder', flavor: 'ligament'},
  {id: 'knee_multiligament_injury', name: 'Knee multiligament injury', category: 'Ligament', bodyRegion: 'Knee', flavor: 'ligament'},
  {id: 'spine_ligament_strain', name: 'Spine ligament strain (Ligamentum flavum, Interspinous ligaments)', category: 'Ligament', bodyRegion: 'Spine', flavor: 'ligament'},

  {id: 'achilles_tendinopathy', name: 'Achilles tendinopathy', category: 'Tendon', bodyRegion: 'Ankle', flavor: 'tendon'},
  {id: 'patellar_tendinopathy', name: 'Patellar tendinopathy', category: 'Tendon', bodyRegion: 'Knee', flavor: 'tendon'},
  {id: 'biceps_tendinopathy', name: 'Biceps tendinopathy / tear', category: 'Tendon', bodyRegion: 'Shoulder', flavor: 'tendon'},
  {id: 'lateral_epicondylitis', name: 'Wrist extensor tendinopathy (Tennis elbow / Lateral epicondylitis)', category: 'Tendon', bodyRegion: 'Elbow', flavor: 'tendon'},
  {id: 'medial_epicondylitis', name: 'Wrist flexor tendinopathy (Golfer’s elbow / Medial epicondylitis)', category: 'Tendon', bodyRegion: 'Elbow', flavor: 'tendon'},
  {id: 'glute_tendinopathy', name: 'Gluteus medius / minimus tendinopathy', category: 'Tendon', bodyRegion: 'Hip', flavor: 'tendon'},
  {id: 'hip_flexor_tendinopathy', name: 'Hip flexor tendinopathy (Iliopsoas)', category: 'Tendon', bodyRegion: 'Hip', flavor: 'tendon'},
  {id: 'hamstring_tendon_injury', name: 'Hamstring tendon tear / tendinopathy', category: 'Tendon', bodyRegion: 'Hip', flavor: 'tendon'},
  {id: 'plantar_achilles_insertion_tendinopathy', name: 'Plantar fascia / Achilles insertion tendonopathy', category: 'Tendon', bodyRegion: 'Foot', flavor: 'tendon'},

  {id: 'bone_fracture_long_bone', name: 'Bone fracture (Radius, Ulna, Humerus, Clavicle, Femur, Pelvis)', category: 'Bone', bodyRegion: 'Whole body', flavor: 'bone'},
  {id: 'vertebral_fracture', name: 'Vertebral fracture (Compression, Burst)', category: 'Bone', bodyRegion: 'Spine', flavor: 'bone'},
  {id: 'rib_fracture', name: 'Rib fracture', category: 'Bone', bodyRegion: 'Chest', flavor: 'bone'},
  {id: 'scaphoid_fracture', name: 'Scaphoid fracture (Wrist)', category: 'Bone', bodyRegion: 'Wrist', flavor: 'bone'},
  {id: 'calcaneus_fracture', name: 'Calcaneus fracture', category: 'Bone', bodyRegion: 'Foot', flavor: 'bone'},
  {id: 'patella_fracture', name: 'Patella fracture', category: 'Bone', bodyRegion: 'Knee', flavor: 'bone'},
  {id: 'talus_fracture', name: 'Talus fracture', category: 'Bone', bodyRegion: 'Ankle', flavor: 'bone'},
  {id: 'humeral_head_fracture', name: 'Humeral head fracture', category: 'Bone', bodyRegion: 'Shoulder', flavor: 'bone'},
  {id: 'pelvic_avulsion_fracture', name: 'Pelvic avulsion fracture', category: 'Bone', bodyRegion: 'Pelvis', flavor: 'bone'},

  {id: 'meniscus_tear', name: 'Meniscus tear (Knee, Medial/Lateral)', category: 'Joint', bodyRegion: 'Knee', flavor: 'joint'},
  {id: 'labrum_tear', name: 'Labrum tear (Shoulder / Hip)', category: 'Joint', bodyRegion: 'Shoulder', flavor: 'joint'},
  {id: 'ac_joint_injury', name: 'AC joint injury', category: 'Joint', bodyRegion: 'Shoulder', flavor: 'joint'},
  {id: 'patellofemoral_pain', name: 'Patellofemoral pain syndrome', category: 'Joint', bodyRegion: 'Knee', flavor: 'joint'},
  {id: 'ankle_instability', name: 'Ankle instability', category: 'Joint', bodyRegion: 'Ankle', flavor: 'joint'},
  {id: 'osteoarthritis_flare', name: 'Osteoarthritis flare (Knee, Hip, Shoulder)', category: 'Joint', bodyRegion: 'Whole body', flavor: 'joint'},
  {id: 'tmj_disorder', name: 'TMJ disorder', category: 'Joint', bodyRegion: 'Jaw', flavor: 'joint'},
  {id: 'elbow_instability', name: 'Elbow instability / subluxation', category: 'Joint', bodyRegion: 'Elbow', flavor: 'joint'},
  {id: 'shoulder_impingement', name: 'Shoulder impingement syndrome', category: 'Joint', bodyRegion: 'Shoulder', flavor: 'joint'},
  {id: 'glenohumeral_dislocation', name: 'Glenohumeral dislocation / subluxation', category: 'Joint', bodyRegion: 'Shoulder', flavor: 'joint'},
  {id: 'hip_dysplasia_labral_tear', name: 'Hip dysplasia / labral tear', category: 'Joint', bodyRegion: 'Hip', flavor: 'joint'},
  {id: 'wrist_instability_tfcc', name: 'Wrist instability / TFCC injury', category: 'Joint', bodyRegion: 'Wrist', flavor: 'joint'},
  {id: 'frozen_shoulder', name: 'Frozen shoulder (Adhesive capsulitis)', category: 'Joint', bodyRegion: 'Shoulder', flavor: 'joint'},
  {id: 'femoroacetabular_impingement', name: 'Femoroacetabular impingement (FAI)', category: 'Joint', bodyRegion: 'Hip', flavor: 'joint'},

  {id: 'low_back_pain', name: 'Low back pain / lumbar strain', category: 'Overuse', bodyRegion: 'Back', flavor: 'overuse'},
  {id: 'neck_pain', name: 'Neck pain / cervical strain', category: 'Overuse', bodyRegion: 'Neck', flavor: 'overuse'},
  {id: 'plantar_fasciitis', name: 'Plantar fasciitis', category: 'Overuse', bodyRegion: 'Foot', flavor: 'overuse'},
  {id: 'it_band_syndrome', name: 'IT band syndrome', category: 'Overuse', bodyRegion: 'Hip', flavor: 'overuse'},
  {id: 'shin_splints', name: 'Shin splints (Medial tibial stress syndrome)', category: 'Overuse', bodyRegion: 'Foot', flavor: 'overuse'},
  {id: 'carpal_tunnel_syndrome', name: 'Carpal tunnel syndrome', category: 'Overuse', bodyRegion: 'Wrist', flavor: 'overuse'},
  {id: 'tendinosis', name: 'Tendinosis (elbow, shoulder, knee)', category: 'Overuse', bodyRegion: 'Whole body', flavor: 'overuse'},
  {id: 'bursitis', name: 'Bursitis (Shoulder / Hip / Knee / Elbow)', category: 'Overuse', bodyRegion: 'Whole body', flavor: 'overuse'},
  {id: 'myofascial_pain', name: 'Myofascial pain syndrome', category: 'Overuse', bodyRegion: 'Whole body', flavor: 'overuse'},
  {id: 'chronic_ankle_instability', name: 'Chronic ankle instability', category: 'Overuse', bodyRegion: 'Ankle', flavor: 'overuse'},
  {id: 'cervical_disc_herniation', name: 'Cervical disc herniation', category: 'Overuse', bodyRegion: 'Neck', flavor: 'overuse'},
  {id: 'whiplash_injury', name: 'Whiplash-associated disorder', category: 'Overuse', bodyRegion: 'Neck', flavor: 'overuse'},
  {id: 'lumbar_disc_herniation', name: 'Lumbar disc herniation', category: 'Overuse', bodyRegion: 'Back', flavor: 'overuse'},
  {id: 'lumbar_spinal_stenosis', name: 'Lumbar spinal stenosis', category: 'Overuse', bodyRegion: 'Back', flavor: 'overuse'},
  {id: 'de_quervain_tenosynovitis', name: 'De Quervain tenosynovitis', category: 'Overuse', bodyRegion: 'Wrist', flavor: 'overuse'},
  {id: 'greater_trochanteric_pain_syndrome', name: 'Greater trochanteric pain syndrome', category: 'Overuse', bodyRegion: 'Hip', flavor: 'overuse'},
  {id: 'cubital_tunnel_syndrome', name: 'Cubital tunnel syndrome', category: 'Overuse', bodyRegion: 'Elbow', flavor: 'overuse'},
  {id: 'sciatica', name: 'Sciatica / lumbar radicular pain', category: 'Overuse', bodyRegion: 'Back', flavor: 'overuse'},

  {id: 'acl_meniscus_combined', name: 'ACL + Meniscus combined injury', category: 'Sports', bodyRegion: 'Knee', flavor: 'sports'},
  {id: 'rotator_cuff_labrum_complex', name: 'Rotator cuff + Labrum complex shoulder injury', category: 'Sports', bodyRegion: 'Shoulder', flavor: 'sports'},
  {id: 'overhead_throwers_shoulder', name: 'Overhead thrower’s shoulder (internal impingement)', category: 'Sports', bodyRegion: 'Shoulder', flavor: 'sports'},
  {id: 'runners_knee_patellar_tendon', name: 'Runner’s knee / Patellar tendinopathy', category: 'Sports', bodyRegion: 'Knee', flavor: 'sports'},
  {id: 'jumpers_knee', name: 'Jumper’s knee', category: 'Sports', bodyRegion: 'Knee', flavor: 'sports'},
  {id: 'gymnast_wrist_injury', name: 'Gymnast wrist injury', category: 'Sports', bodyRegion: 'Wrist', flavor: 'sports'},
  {id: 'swimmer_shoulder_impingement', name: 'Swimmer shoulder impingement', category: 'Sports', bodyRegion: 'Shoulder', flavor: 'sports'},

  {id: 'growth_plate_fracture', name: 'Growth plate fractures', category: 'Pediatric', bodyRegion: 'Whole body', flavor: 'pediatric'},
  {id: 'osgood_schlatter', name: 'Osgood-Schlatter', category: 'Pediatric', bodyRegion: 'Knee', flavor: 'pediatric'},
  {id: 'severs_disease', name: 'Sever’s disease', category: 'Pediatric', bodyRegion: 'Foot', flavor: 'pediatric'},

  {id: 'geriatric_vertebral_compression_fracture', name: 'Geriatric vertebral compression fracture', category: 'Geriatric', bodyRegion: 'Spine', flavor: 'geriatric'},
  {id: 'geriatric_hip_fracture', name: 'Geriatric hip fracture', category: 'Geriatric', bodyRegion: 'Hip', flavor: 'geriatric'},
  {id: 'geriatric_osteoarthritis_flare', name: 'Geriatric osteoarthritis flare', category: 'Geriatric', bodyRegion: 'Whole body', flavor: 'geriatric'},

  {id: 'acl_reconstruction', name: 'ACL reconstruction', category: 'Post-surgery', bodyRegion: 'Knee', flavor: 'postsurgery'},
  {id: 'rotator_cuff_repair', name: 'Rotator cuff repair', category: 'Post-surgery', bodyRegion: 'Shoulder', flavor: 'postsurgery'},
  {id: 'meniscus_repair', name: 'Meniscus repair', category: 'Post-surgery', bodyRegion: 'Knee', flavor: 'postsurgery'},
  {id: 'growing_pains', name: 'Growing pains', category: 'Pediatric', bodyRegion: 'Whole body', flavor: 'pediatric'},
  {id: 'rheumatoid_arthritis', name: 'Rheumatoid arthritis', category: 'Geriatric', bodyRegion: 'Whole body', flavor: 'geriatric'},
  {id: 'gout', name: 'Gout flare', category: 'Geriatric', bodyRegion: 'Foot', flavor: 'geriatric'},
  {id: 'fibromyalgia', name: 'Fibromyalgia', category: 'Geriatric', bodyRegion: 'Whole body', flavor: 'geriatric'},
  {id: 'clavicle_fracture_rehab', name: 'Clavicle fracture rehab', category: 'Post-surgery', bodyRegion: 'Shoulder', flavor: 'postsurgery'},
  {id: 'distal_radius_fracture_rehab', name: 'Distal radius fracture rehab', category: 'Post-surgery', bodyRegion: 'Wrist', flavor: 'postsurgery'},
  {id: 'ankle_fracture_rehab', name: 'Ankle fracture rehab', category: 'Post-surgery', bodyRegion: 'Ankle', flavor: 'postsurgery'},
  {id: 'concussion_recovery', name: 'Concussion recovery', category: 'Post-surgery', bodyRegion: 'Whole body', flavor: 'postsurgery'},
];

export const generatedInjuryProtocols: InjuryProtocol[] = generatedProtocolSeeds.map(createGeneratedProtocol);
