export type DietRegimen = {
  id: string;
  title: {en: string; ar: string};
  summary: {en: string; ar: string};
  goals: {en: string[]; ar: string[]};
  keyPrinciples: {en: string[]; ar: string[]};
  practicalGuide: {en: string[]; ar: string[]};
  exampleDay: {
    breakfast: {en: string; ar: string};
    lunch: {en: string; ar: string};
    dinner: {en: string; ar: string};
    snack?: {en: string; ar: string};
  };
  cautions: {en: string[]; ar: string[]};
};

export const dietRegimensCatalog: DietRegimen[] = [
  {
    id: 'anti-inflammatory',
    title: {en: 'Anti-Inflammatory Diet', ar: 'الدايت المضاد للالتهاب'},
    summary: {
      en: 'A recovery-focused way of eating that targets inflammation triggers and supports tissue repair with protein, micronutrients, and fiber.',
      ar: 'أسلوب غذائي موجّه للتعافي يقلل محفزات الالتهاب ويدعم إصلاح الأنسجة عبر البروتين والفيتامينات والألياف.',
    },
    goals: {
      en: ['Injury recovery support', 'Reduce swelling and soreness', 'Support sleep and stress resilience'],
      ar: ['دعم التعافي من الإصابات', 'تقليل التورم والوجع', 'تحسين النوم ومقاومة التوتر'],
    },
    keyPrinciples: {
      en: ['Prioritize protein at each meal', 'Use colorful plants (berries, leafy greens, crucifers)', 'Choose omega-3 rich foods (salmon/sardines/chia/flax)', 'Limit ultra-processed foods and added sugars'],
      ar: ['ركز على البروتين في كل وجبة', 'أضف خضار وفواكه متنوعة الألوان', 'اعتمد أطعمة غنية بالأوميغا-3', 'قلل الأطعمة شديدة التصنيع والسكر المضاف'],
    },
    practicalGuide: {
      en: ['Aim for 3–5 whole-food meals daily', 'Add 1–2 servings of omega-3 sources most days', 'Balance carbs around rehab sessions to prevent under-fueling', 'Hydrate steadily throughout the day'],
      ar: ['استهدف 3–5 وجبات من أطعمة كاملة', 'أضف مصدر أوميغا-3 1–2 مرة يوميًا أو أغلب الأيام', 'وازن الكربوهيدرات حول جلسات التأهيل لمنع نقص الطاقة', 'اشرب سوائل على مدار اليوم'],
    },
    exampleDay: {
      breakfast: {en: 'Greek yogurt + berries + oats', ar: 'زبادي يوناني + توت + شوفان'},
      lunch: {en: 'Salmon bowl with rice, peppers, and leafy greens', ar: 'صحن سمك السلمون مع أرز وفلفل وخضار ورقية'},
      dinner: {en: 'Chicken soup with potatoes and spinach', ar: 'شوربة فراخ مع بطاطس وسبانخ'},
      snack: {en: 'Orange + kefir', ar: 'برتقال + كفير'},
    },
    cautions: {
      en: ['If you have kidney disease or medication interactions, adjust protein and supplements with a clinician.', 'Avoid starting aggressive supplements if you’re in the early irritable phase—prioritize food first.'],
      ar: ['لو عندك مرض في الكلى أو تداخلات دوائية، عدّل البروتين والمكملات مع مختص.', 'في البداية لو المرحلة “متهيجة”، تجنب المكملات الثقيلة؛ ابدأ بالأكل أولًا.'],
    },
  },
  {
    id: 'high-protein',
    title: {en: 'High-Protein Rehab Nutrition', ar: 'تغذية عالية البروتين للتأهيل'},
    summary: {
      en: 'A phase-aware approach that prioritizes protein adequacy to preserve lean mass and speed recovery when training volume drops.',
      ar: 'نهج يركز على كفاية البروتين حسب المرحلة لحماية الكتلة الخالية من الدهون وتسريع التعافي عندما تقل شدة التمرين.',
    },
    goals: {
      en: ['Muscle preservation', 'Tissue repair support', 'Better recovery when appetite drops'],
      ar: ['حماية العضلات', 'دعم إصلاح الأنسجة', 'تعافي أفضل عندما تقل الشهية'],
    },
    keyPrinciples: {
      en: ['Split protein into 3–4 feedings', 'Target protein based on phase (recovery windows)', 'Include leucine-rich sources (dairy, poultry, eggs)', 'Add carbs strategically to restore training tolerance'],
      ar: ['قسّم البروتين على 3–4 وجبات', 'استهدف البروتين حسب مرحلة التعافي', 'استخدم مصادر غنية بالليوسين', 'أضف كربوهيدرات بذكاء لتحمل التدريب'],
    },
    practicalGuide: {
      en: ['Use a simple rule: protein at breakfast, lunch, dinner (and snack if needed).', 'If you struggle to eat, use liquid protein or easy-to-digest meals.', 'Hydrate + electrolytes around rehab sessions to reduce fatigue.', 'Keep energy intake adequate—protein alone doesn’t fix under-eating.'],
      ar: ['قاعدة بسيطة: بروتين في الفطار والغداء والعشاء (وزيادة سناك لو احتجت).', 'لو الأكل صعب، استخدم بروتين سائل أو وجبات سهلة الهضم.', 'اشرب سوائل وأملاح حول جلسات التأهيل لتقليل الإجهاد.', 'لا تعتمد على البروتين فقط؛ لازم طاقة كافية حتى لو قلّ النشاط.'],
    },
    exampleDay: {
      breakfast: {en: 'Omelet + toast + fruit', ar: 'أومليت + توست + فاكهة'},
      lunch: {en: 'Chicken/rice bowl + yogurt', ar: 'طبق فراخ وأرز + زبادي'},
      dinner: {en: 'Turkey or beans + potatoes + vegetables', ar: 'ديك رومي أو باقوليات + بطاطس + خضار'},
      snack: {en: 'Protein shake after rehab', ar: 'شيك بروتين بعد التأهيل'},
    },
    cautions: {
      en: ['High-protein is not a substitute for medical care or proper loading progression.', 'If you’re on anticoagulants or have conditions affected by vitamin K, review foods and supplements.'],
      ar: ['البروتين العالي مش بديل عن العلاج الطبي أو عن التدرّج الصحيح في الأحمال.', 'لو بتستخدم مميعات الدم أو عندك حالات تتأثر بفيتامين K راجع الأكل والمكملات.'],
    },
  },
  {
    id: 'calorie-deficit',
    title: {en: 'Calorie Deficit (Weight Loss)', ar: 'عجز سعرات (تنزيل الوزن)'},
    summary: {
      en: 'A controlled calorie reduction to support fat loss while protecting performance and recovery quality.',
      ar: 'تقليل سعرات بشكل منضبط لدعم حرق الدهون مع حماية الأداء وجودة التعافي.',
    },
    goals: {
      en: ['Fat loss', 'Improve body composition', 'Reduce low-energy drag during rehab'],
      ar: ['حرق الدهون', 'تحسين تركيب الجسم', 'تقليل بطء التعافي بسبب قلة الطاقة'],
    },
    keyPrinciples: {
      en: ['Use a moderate deficit (often 15–25%)', 'Keep protein high enough', 'Don’t cut carbs to zero—reserve them for rehab/training', 'Track progress and adjust if recovery worsens'],
      ar: ['استخدم عجز معتدل (غالبًا 15–25%)', 'حافظ على بروتين كافي', 'لا تمنع الكربوهيدرات بالكامل؛ اجعلها حول جلسات التأهيل', 'تابع التحسن وعدّل لو التعافي ساء'],
    },
    practicalGuide: {
      en: ['Start with a mild deficit for 2 weeks.', 'If strength and sleep drop, reduce the deficit.', 'Increase fiber and hydration to manage hunger.', 'Use meal timing to support training sessions.'],
      ar: ['ابدأ بعجز خفيف لمدة أسبوعين.', 'لو القوة والنوم قلوا، قلل العجز.', 'زود ألياف وسوائل للتحكم في الجوع.', 'نظم توقيت الوجبات لدعم جلسات التدريب.'],
    },
    exampleDay: {
      breakfast: {en: 'Greek yogurt + berries', ar: 'زبادي + توت'},
      lunch: {en: 'Lean protein + rice/potatoes + salad', ar: 'بروتين قليل الدهن + أرز/بطاطس + سلطة'},
      dinner: {en: 'Tofu/chicken + vegetables + small grain portion', ar: 'توفر/فراخ + خضار + جزء حبوب صغير'},
      snack: {en: 'Fruit + kefir', ar: 'فاكهة + كفير'},
    },
    cautions: {
      en: ['Aggressive deficits during injury rehab can increase muscle loss and fatigue.', 'If you have diabetes, eating disorders, pregnancy, or medical conditions, seek professional supervision.'],
      ar: ['العجز القوي أثناء التأهيل قد يزيد فقدان العضلات والتعب.', 'لو عندك سكر/اضطرابات أكل/حمل أو حالات طبية لازم متابعة مختص.'],
    },
  },
  {
    id: 'recomp',
    title: {en: 'Maintenance / Recomposition', ar: 'ثبات / إعادة تشكيل الجسم (Recomp)'},
    summary: {
      en: 'A diet strategy that focuses on maintaining energy enough to train/recover while slowly improving body composition.',
      ar: 'استراتيجية تغذية تضمن طاقة كافية للتدريب والتعافي وتحسين تركيب الجسم تدريجيًا.',
    },
    goals: {
      en: ['Maintain strength during rehab', 'Reduce fat slowly', 'Support consistent appetite and sleep'],
      ar: ['حفظ القوة أثناء التأهيل', 'تقليل دهون تدريجي', 'دعم الشهية والنوم بشكل أفضل'],
    },
    keyPrinciples: {
      en: ['Use near-maintenance calories', 'Keep protein high for lean mass', 'Include fiber for fullness', 'Prefer consistent meal timing over extremes'],
      ar: ['سعرات قريبة من الثبات', 'بروتين عالي لحماية العضلات', 'ألياف عالية للشبع', 'توقيت وجبات ثابت بدل التطرف'],
    },
    practicalGuide: {
      en: ['Adjust calories only if weight trend and recovery change.', 'If training volume is reduced, prioritize protein and quality foods.', 'Keep hydration stable—don’t fluctuate too aggressively.'],
      ar: ['عدّل السعرات فقط لو اتجاه الوزن أو التعافي تغيّر.', 'لو حجم التمرين قلّ، ركز على البروتين والأكل عالي الجودة.', 'ثبّت السوائل ولا تذبذبها بقوة.'],
    },
    exampleDay: {
      breakfast: {en: 'Oats + milk/soy + banana', ar: 'شوفان + حليب/بديل + موز'},
      lunch: {en: 'Chicken wraps + rice + vegetables', ar: 'ساندويتش فراخ + أرز + خضار'},
      dinner: {en: 'Rice bowl with tofu/turkey + salad', ar: 'طبق رز مع توف/ديك رومي + سلطة'},
      snack: {en: 'Yogurt or protein snack', ar: 'زبادي أو سناك بروتين'},
    },
    cautions: {
      en: ['If appetite is suppressed by pain, don’t “push” with willpower—use easy-to-eat foods.', 'Recomp still needs loading progression to create adaptation.'],
      ar: ['لو الألم قلّل الشهية لا “تجاهد” للأكل بصعوبة؛ استخدم أطعمة سهلة.', 'إعادة التشكيل لا تعمل بدون تدرّج تدريبي مناسب.'],
    },
  },
  {
    id: 'bulking',
    title: {en: 'Bulking / Muscle Gain Nutrition', ar: 'تغذية للتضخيم وبناء العضلات'},
    summary: {
      en: 'A controlled surplus to support training quality and lean mass gain while limiting unwanted fat gain.',
      ar: 'زيادة سعرات منضبطة لدعم جودة التدريب ونمو الكتلة الخالية من الدهون وتقليل زيادة الدهون غير المرغوبة.',
    },
    goals: {
      en: ['Build lean mass', 'Support strength progression', 'Improve training performance'],
      ar: ['بناء كتلة خالية من الدهون', 'دعم تقدم القوة', 'رفع أداء التدريب'],
    },
    keyPrinciples: {
      en: ['Use a small surplus (~5–10%)', 'Prioritize protein and carbs for training', 'Time carbs around workouts', 'Add calories slowly and monitor body changes'],
      ar: ['زيادة صغيرة (~5–10%)', 'بروتين وكربوهيدرات لدعم التدريب', 'كربوهيدرات حول التمرين', 'زود السعرات تدريجيًا وراقب التغيّر'],
    },
    practicalGuide: {
      en: ['Choose high-quality carbs (rice, potatoes, oats) instead of only sugar.', 'Use creatine if appropriate and tolerated.', 'Increase meal frequency if appetite is low.'],
      ar: ['اختر كربوهيدرات عالية الجودة (رز/بطاطس/شوفان) بدل السكريات فقط.', 'استخدم كرياتين إذا مناسب ومحتمل.', 'وزّع الوجبات لو الشهية قليلة.'],
    },
    exampleDay: {
      breakfast: {en: 'Oats + eggs + fruit', ar: 'شوفان + بيض + فاكهة'},
      lunch: {en: 'Chicken wrap + rice + veggies', ar: 'لفّة فراخ + رز + خضار'},
      dinner: {en: 'Lean beef/turkey + potatoes + vegetables', ar: 'لحم قليل الدهن/ديك رومي + بطاطس + خضار'},
      snack: {en: 'Milk + banana or yogurt', ar: 'حليب + موز أو زبادي'},
    },
    cautions: {
      en: ['Bulking should be slower during injury rehab unless your clinician supports it.', 'Excessive surplus increases fat gain and can worsen recovery if sleep suffers.'],
      ar: ['التضخيم يكون أبطأ أثناء التأهيل إلا إذا مختص وافق.', 'زيادة كبيرة قد ترفع الدهون وتقلل جودة التعافي لو النوم تدهور.'],
    },
  },
  {
    id: 'mediterranean',
    title: {en: 'Mediterranean Diet', ar: 'الدايت المتوسطي'},
    summary: {
      en: 'A heart-healthy and recovery-supportive pattern built on vegetables, olive oil, fish, legumes, and whole grains.',
      ar: 'نمط غذائي يدعم القلب والتعافي مبني على الخضار وزيت الزيتون والسمك والبقول والحبوب الكاملة.',
    },
    goals: {
      en: ['General recovery support', 'Anti-inflammatory foundation', 'Long-term adherence'],
      ar: ['دعم تعافٍ عام', 'أساس مضاد للالتهاب', 'سهولة الالتزام على المدى الطويل'],
    },
    keyPrinciples: {
      en: ['Olive oil as main fat source', 'Fish 2–3 times/week', 'Legumes and whole grains daily', 'Limit refined carbs and processed meats'],
      ar: ['زيت زيتون كمصدر الدهون الأساسي', 'سمك 2–3 مرات أسبوعيًا', 'بقول وحبوب كاملة يوميًا', 'قلل السكريات والكربوهيدرات المكررة واللحوم المصنعة'],
    },
    practicalGuide: {
      en: ['Build plates: half vegetables, quarter protein, quarter whole grains.', 'Add nuts/seeds for extra healthy fats.', 'Keep hydration steady.'],
      ar: ['ابنِ الطبق: نصف خضار، ربع بروتين، ربع حبوب كاملة.', 'أضف مكسرات/بذور لدهون صحية إضافية.', 'ثبّت السوائل.'],
    },
    exampleDay: {
      breakfast: {en: 'Greek yogurt + nuts + fruit', ar: 'زبادي يوناني + مكسرات + فاكهة'},
      lunch: {en: 'Tuna salad + olive oil + whole grain bread', ar: 'سلطة تونة + زيت زيتون + خبز حبوب كاملة'},
      dinner: {en: 'Lentil stew + vegetables + rice portion', ar: 'شوربة عدس + خضار + جزء رز'},
      snack: {en: 'Olives or fruit + kefir', ar: 'زيتون أو فاكهة + كفير'},
    },
    cautions: {
      en: ['If you need higher protein for rehab, adjust portions and ensure adequate total intake.', 'Consider medical constraints (kidney, gout, anticoagulants).'],
      ar: ['لو تحتاج بروتين أعلى للتأهيل، زود الحصص واتأكد من كفاية إجمالي السعرات.', 'راعي القيود الطبية (كلى/نقرس/مميعات الدم).'],
    },
  },
  {
    id: 'low-carb-keto',
    title: {en: 'Low-Carb / Keto', ar: 'دايت منخفض الكربوهيدرات / كيتو'},
    summary: {
      en: 'A carbohydrate-restricted approach that may support weight loss for some people, but it must be used carefully during rehab.',
      ar: 'نهج يقلل الكربوهيدرات وقد يساعد البعض في نزول الوزن، لكن يلزم الحذر خصوصًا أثناء التأهيل.',
    },
    goals: {
      en: ['Weight management', 'Improved glucose control (for some cases)', 'Anti-inflammatory food selection'],
      ar: ['إدارة الوزن', 'تحسين التحكم بالسكر (في حالات معينة)', 'اختيارات أكل تقلل الالتهاب'],
    },
    keyPrinciples: {
      en: ['Reduce carbohydrates significantly', 'Prioritize protein and healthy fats', 'Use electrolytes to prevent cramps/headaches', 'Avoid “zero-carb” extremes if your rehab depends on energy'],
      ar: ['قلل الكربوهيدرات بشكل كبير', 'ركز على بروتين ودهون صحية', 'استخدم أملاح/إلكترولايت لمنع التشنجات', 'تجنب التطرف بالصفر إذا كانت طاقتك للجلسات مهمة'],
    },
    practicalGuide: {
      en: ['Start with a moderate low-carb phase before strict keto.', 'Plan carbs around critical rehab/training days if needed.', 'Monitor energy, mood, and sleep quality.', 'Don’t ignore fiber—use non-starchy vegetables.'],
      ar: ['ابدأ بكارب أقل بشكل معتدل قبل كيتو صارم.', 'لو احتجت طاقة، اجعل كارب حول أيام تأهيل/تمرين مهمة.', 'راقب الطاقة والمزاج والنوم.', 'لا تهمل الألياف—اعتمد على خضار غير نشوية.'],
    },
    exampleDay: {
      breakfast: {en: 'Omelet + avocado', ar: 'أومليت + أفوكادو'},
      lunch: {en: 'Chicken + olive oil salad', ar: 'فراخ + سلطة بزيت زيتون'},
      dinner: {en: 'Salmon + roasted vegetables', ar: 'سلمون + خضار مشوية'},
      snack: {en: 'Greek yogurt (unsweetened) or nuts', ar: 'زبادي غير محلى أو مكسرات'},
    },
    cautions: {
      en: ['Keto may reduce performance during early rehab due to low glycogen.', 'Consult a clinician if you have diabetes, kidney issues, or medication constraints.'],
      ar: ['الكيتو قد يقلل الأداء في بداية التأهيل بسبب انخفاض الجلايكوجين.', 'استشر مختص إذا عندك سكر/كلى أو تداخلات دوائية.'],
    },
  },
  {
    id: 'dash',
    title: {en: 'DASH Diet', ar: 'دايت داش (DASH)'},
    summary: {
      en: 'A diet style originally designed to help lower blood pressure, also useful for long-term cardiovascular recovery.',
      ar: 'نمط غذائي مصمم أساسًا للمساعدة في خفض ضغط الدم ويدعم التعافي القلبي الوعائي على المدى الطويل.',
    },
    goals: {
      en: ['Support heart health', 'Reduce sodium sensitivity', 'Improve diet quality'],
      ar: ['دعم صحة القلب', 'تقليل حساسية الصوديوم', 'تحسين جودة النظام الغذائي'],
    },
    keyPrinciples: {
      en: ['Lower sodium and processed foods', 'Increase vegetables, fruits, and whole grains', 'Choose lean proteins and low-fat dairy if tolerated', 'Prioritize potassium-rich foods'],
      ar: ['قلل الصوديوم والأطعمة المصنعة', 'زود الخضار والفاكهة والحبوب الكاملة', 'اختر بروتين قليل الدهن ومشتقات قليلة الدسم', 'اعتمد أطعمة غنية بالبوتاسيوم'],
    },
    practicalGuide: {
      en: ['Use herbs/spices instead of salt for flavor.', 'Build meals around vegetables plus a protein portion.', 'If you have injury rehab needs, ensure enough calories and protein despite lower sodium.'],
      ar: ['استخدم بهارات وأعشاب بدل الملح للتذوق.', 'ابنِ الوجبة حول خضار مع حصة بروتين.', 'رغم تقليل الصوديوم، تأكد من سعرات وبروتين كافين للتأهيل.'],
    },
    exampleDay: {
      breakfast: {en: 'Oatmeal + fruit + yogurt', ar: 'شوفان + فاكهة + زبادي'},
      lunch: {en: 'Turkey/beans + rice + salad', ar: 'ديك رومي/بقول + رز + سلطة'},
      dinner: {en: 'Grilled fish + vegetables + potatoes', ar: 'سمك مشوي + خضار + بطاطس'},
      snack: {en: 'Fruit or nuts', ar: 'فاكهة أو مكسرات'},
    },
    cautions: {
      en: ['DASH is not automatically “anti-inflammatory”—pair it with rehab fueling and adequate protein.', 'If you’re on blood pressure medications, review potassium intake with a clinician if needed.'],
      ar: ['دايت داش ليس تلقائيًا مضاد التهاب—لازم تقترن بالتغذية لدعم التأهيل والبروتين الكافي.', 'لو بتاخد أدوية ضغط، راجع البوتاسيوم لو احتجت مع مختص.'],
    },
  },
  {
    id: 'intermittent-fasting',
    title: {en: 'Intermittent Fasting (IF)', ar: 'الصيام المتقطع (IF)'},
    summary: {
      en: 'Timing meals inside an eating window to improve metabolic flexibility for some people.',
      ar: 'توقيت الوجبات داخل نافذة أكل لتحقيق مرونة أيضية أفضل لبعض الأشخاص.',
    },
    goals: {
      en: ['Weight control', 'Metabolic flexibility', 'Simpler routine'],
      ar: ['التحكم في الوزن', 'مرونة أيضية', 'روتين أبسط'],
    },
    keyPrinciples: {
      en: ['Choose an IF window you can sustain', 'Keep protein adequate during the eating window', 'Hydrate and control electrolytes', 'Avoid IF during irritable early rehab if appetite drops too much'],
      ar: ['اختر نافذة تناسبك وتقدر تلتزم بها', 'حافظ على بروتين كافي داخل نافذة الأكل', 'اشرب سوائل وانتبه للأملاح', 'تجنب الصيام في بداية تأهيل “متهيّج” لو الشهية تقل جدًا'],
    },
    practicalGuide: {
      en: ['Start with a mild schedule (e.g., 12:12 or 14:10).', 'During rehab, prioritize energy and protein first.', 'If you feel fatigue or poor recovery, stop IF and switch to regular meals.'],
      ar: ['ابدأ بجدول خفيف (مثلا 12:12 أو 14:10).', 'أثناء التأهيل: الأولوية للطاقة والبروتين.', 'لو حسيت بإرهاق أو تعافي ضعيف، أوقف IF وارجع لوجبات منتظمة.'],
    },
    exampleDay: {
      breakfast: {en: 'If eating window starts: protein yogurt + berries', ar: 'لو نافذة الأكل بدأت: زبادي بروتين + توت'},
      lunch: {en: 'Chicken + rice + vegetables', ar: 'فراخ + رز + خضار'},
      dinner: {en: 'Tofu/salmon + salad + potatoes', ar: 'توفر/سلمون + سلطة + بطاطس'},
      snack: {en: 'Fruit or kefir (if needed for protein)', ar: 'فاكهة أو كفير (لو محتاج بروتين)'},
    },
    cautions: {
      en: ['IF is not suitable for everyone—pregnancy, underweight, eating disorders, or some medical conditions need clinician guidance.', 'During injury rehab, under-eating harms recovery.'],
      ar: ['الصيام المتقطع مش مناسب للجميع—الحمل، النحافة، اضطرابات الأكل، أو حالات طبية تحتاج توجيه مختص.', 'في التأهيل، نقص الأكل يضر التعافي.'],
    },
  },
  {
    id: 'plant-based',
    title: {en: 'Vegetarian / Plant-Based', ar: 'نباتي / Plant-Based'},
    summary: {
      en: 'A plant-forward approach with evidence-aligned protein planning for recovery and everyday health.',
      ar: 'نهج نباتي مع تخطيط بروتين مناسب (يدعمه العلم) لدعم التعافي وصحة يومية جيدة.',
    },
    goals: {
      en: ['Support recovery with adequate protein', 'Increase fiber and micronutrients', 'Improve long-term adherence'],
      ar: ['دعم التعافي ببروتين كافي', 'زيادة الألياف والميكرونيوترينتس', 'سهولة الالتزام طويل الأمد'],
    },
    keyPrinciples: {
      en: ['Plan protein sources (tofu, tempeh, legumes, dairy/eggs)', 'Use whole grains for energy', 'Include omega-3 (chia/flax/walnuts) if not eating fish', 'Watch B12 and iron intake if needed'],
      ar: ['خطط لمصادر بروتين (توفر/تمبيه/بقوليات/لبن أو بيض حسبك)', 'استخدم حبوب كاملة للطاقة', 'اعتمد أوميغا-3 (شيا/كتان/جوز) لو مش بتاكل سمك', 'راقب B12 والحديد لو احتجت'],
    },
    practicalGuide: {
      en: ['Distribute protein across meals.', 'If appetite is low after injury, choose easy meals (soups, yogurt, smoothies).', 'Keep calories adequate—vegetarian diets can be low-energy if portions are small.'],
      ar: ['وزع البروتين على الوجبات.', 'لو الشهية قليلة بعد إصابة، اختر وجبات سهلة (شوربة، زبادي، سموثي).', 'حافظ على سعرات كافية—النباتي ممكن يبقى قليل طاقة لو الحصص صغيرة.'],
    },
    exampleDay: {
      breakfast: {en: 'Oats + soy milk + banana', ar: 'شوفان + حليب صويا + موز'},
      lunch: {en: 'Lentil bowl + olive oil salad', ar: 'طبق عدس + سلطة بزيت زيتون'},
      dinner: {en: 'Tofu/tempeh + rice + vegetables', ar: 'توفر/تمبيه + رز + خضار'},
      snack: {en: 'Greek yogurt or kefir + fruit', ar: 'زبادي/كفير + فاكهة'},
    },
    cautions: {
      en: ['Ensure protein adequacy for rehab—use legumes + dairy/eggs or fortified options.', 'Some vitamins/minerals may require monitoring with a clinician (B12, iron, omega-3).'],
      ar: ['تأكد من كفاية البروتين للتأهيل—استخدم بقوليات + لبن/بيض أو بدائل مدعمة.', 'بعض الفيتامينات/المعادن تحتاج متابعة (B12، الحديد، أوميغا-3).'],
    },
  },
];

