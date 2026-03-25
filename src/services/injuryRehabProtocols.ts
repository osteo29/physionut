import type {InjuryPhase, InjuryProtocol, RecoveryWindow} from './injuryDatabase';

type Language = 'en' | 'ar';

export interface RehabStagePlan {
  phaseId: string;
  phaseLabel: string;
  duration: string;
  focus: string;
  exercises: string[];
  progressionMarkers: string[];
  cautions: string[];
}

type StageTemplate = {
  focus: string;
  exercises: string[];
  progressionMarkers: string[];
  cautions: string[];
};

// Notes:
// - We start from `defaultEn/defaultAr` which always provide a full `StageTemplate`.
// - Then we "override" with category / specific / regional templates.
// - Those overrides are intentionally partial (some windows may only define `exercises`, etc.),
//   so the type here must allow missing fields.
type TemplateMap = Partial<Record<RecoveryWindow, Partial<StageTemplate>>>;

function uniqueItems(items: string[]) {
  return Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)));
}

const defaultEn: Record<RecoveryWindow, StageTemplate> = {
  under_48h: {
    focus: 'Calm symptoms, protect the injured tissue, and keep gentle movement without provoking a flare.',
    exercises: [
      'Pain-limited range of motion drills within a comfortable range',
      'Light isometric contractions to keep muscle activity',
      'Easy circulation work and supported daily movement',
    ],
    progressionMarkers: [
      'Pain and swelling are no longer climbing day after day',
      'Basic movement is easier and better controlled',
    ],
    cautions: ['Do not force stretch into pain', 'Avoid fast impact, twisting, or aggressive loading'],
  },
  days_3_14: {
    focus: 'Restore movement quality and begin structured loading without losing symptom control.',
    exercises: [
      'Mobility drills to recover range progressively',
      'Low-to-moderate strength work with controlled tempo',
      'Balance or control drills matched to the injured area',
    ],
    progressionMarkers: [
      'You tolerate rehab loading without a strong next-day flare',
      'Strength and confidence are improving in simple tasks',
    ],
    cautions: ['Do not jump several load levels at once', 'Avoid movements that reproduce sharp instability or locking'],
  },
  weeks_2_6: {
    focus: 'Build strength, coordination, and tissue tolerance for larger functional demands.',
    exercises: [
      'Progressive strengthening through larger ranges',
      'Single-limb or control-based drills when appropriate',
      'Introductory functional drills for work or sport demands',
    ],
    progressionMarkers: [
      'Daily activity is comfortable and stable',
      'You can complete strength work with good form and recover well',
    ],
    cautions: ['Do not return to full sport only because time passed', 'Avoid high-speed loading before control is ready'],
  },
  over_6_weeks: {
    focus: 'Return to full function with repeatable strength, confidence, and higher-speed tolerance.',
    exercises: [
      'Advanced strengthening and endurance circuits',
      'Reactive, plyometric, or speed-based drills when relevant',
      'Task-specific return-to-work or return-to-sport progressions',
    ],
    progressionMarkers: [
      'You tolerate repeated sessions without symptom spikes',
      'Movement quality stays solid under speed or fatigue',
    ],
    cautions: ['Do not skip testing of function and control', 'Back off if instability, swelling, or sharp pain returns'],
  },
};

const defaultAr: Record<RecoveryWindow, StageTemplate> = {
  under_48h: {
    focus: 'تهدئة الأعراض وحماية النسيج المصاب مع الحفاظ على حركة خفيفة بدون زيادة التهيج.',
    exercises: [
      'تمارين مدى حركي خفيفة داخل النطاق المريح',
      'انقباضات ثابتة خفيفة للحفاظ على تنشيط العضلات',
      'حركات بسيطة لتحسين الدورة الدموية والنشاط اليومي المدعوم',
    ],
    progressionMarkers: ['الألم والتورم لم يعودا يزدادان يومًا بعد يوم', 'الحركة الأساسية أصبحت أسهل وأكثر تحكمًا'],
    cautions: ['لا تجبر المفصل أو العضلة على مط قوي مؤلم', 'تجنب الصدمات السريعة واللف والحمل العنيف'],
  },
  days_3_14: {
    focus: 'استعادة جودة الحركة وبدء تحميل منظم بدون فقدان السيطرة على الأعراض.',
    exercises: [
      'تمارين حركة لاسترجاع المدى بشكل تدريجي',
      'تمارين قوة خفيفة إلى متوسطة بسرعة متحكم فيها',
      'تمارين اتزان أو تحكم مناسبة للمنطقة المصابة',
    ],
    progressionMarkers: ['يمكنك أداء جلسة التأهيل بدون انتكاسة قوية في اليوم التالي', 'القوة والثقة تتحسنان في المهام البسيطة'],
    cautions: ['لا تنتقل عدة درجات في الحمل مرة واحدة', 'تجنب الحركات التي تعيد الإحساس بعدم الثبات أو القفل الحاد'],
  },
  weeks_2_6: {
    focus: 'بناء القوة والتناسق وتحمل الأنسجة لمتطلبات وظيفية أكبر.',
    exercises: [
      'تقوية تدريجية خلال مدى حركي أكبر',
      'تمارين طرف واحد أو تمارين تحكم عند الحاجة',
      'بداية التمارين الوظيفية المناسبة للعمل أو الرياضة',
    ],
    progressionMarkers: ['النشاط اليومي أصبح مريحًا وأكثر ثباتًا', 'يمكنك إكمال تمارين القوة بشكل جيد والتعافي بعدها مناسب'],
    cautions: ['لا تعتمد على مرور الوقت فقط للعودة الكاملة', 'تجنب الأحمال السريعة قبل استعادة التحكم'],
  },
  over_6_weeks: {
    focus: 'العودة الكاملة للوظيفة مع قوة متكررة وثقة وتحمل أعلى للسرعة.',
    exercises: [
      'تمارين قوة متقدمة وتحمل عضلي',
      'تمارين تفاعلية أو بلومترية أو سرعة عند اللزوم',
      'تدرج خاص بالعودة للعمل أو الرياضة',
    ],
    progressionMarkers: ['تتحمل الحصص المتكررة بدون زيادة ملحوظة في الأعراض', 'جودة الحركة تبقى جيدة مع السرعة أو التعب'],
    cautions: ['لا تتخطَّ اختبارات الوظيفة والتحكم', 'خفف الحمل إذا عاد عدم الثبات أو التورم أو الألم الحاد'],
  },
};

function mergeTemplate(base: StageTemplate, override?: Partial<StageTemplate>): StageTemplate {
  if (!override) return base;
  return {
    focus: override.focus ?? base.focus,
    exercises: override.exercises ?? base.exercises,
    progressionMarkers: override.progressionMarkers ?? base.progressionMarkers,
    cautions: override.cautions ?? base.cautions,
  };
}

function templateFor(lang: Language, window: RecoveryWindow) {
  return lang === 'ar' ? defaultAr[window] : defaultEn[window];
}

function getCategoryTemplate(injury: InjuryProtocol, lang: Language, window: RecoveryWindow): Partial<StageTemplate> | undefined {
  const isAr = lang === 'ar';

  const categoryMap: Partial<Record<InjuryProtocol['category'], TemplateMap>> = {
    Muscle: {
      under_48h: {
        focus: isAr
          ? 'تهدئة الألم وحماية الألياف المصابة مع الحفاظ على انقباض عضلي خفيف بدون شد زائد.'
          : 'Calm pain, protect the strained fibers, and keep low-load muscle activity without overstretching.',
        exercises: isAr
          ? ['انقباضات ثابتة خفيفة للعضلة المصابة', 'مدى حركي مريح بدون مط قوي', 'مشية أو حركة يومية خفيفة حسب التحمل']
          : ['Gentle isometric holds for the injured muscle', 'Comfortable range of motion without hard stretching', 'Light walking or daily movement as tolerated'],
      },
      days_3_14: {
        exercises: isAr
          ? ['تمارين تحميل تدريجي للعضلة', 'تمارين إطالة خفيفة فقط إذا كانت مريحة', 'تقوية متحكم فيها بسرعة بطيئة']
          : ['Progressive loading for the injured muscle', 'Gentle mobility only if it stays comfortable', 'Controlled strengthening with slower tempo'],
      },
      weeks_2_6: {
        exercises: isAr
          ? ['تقوية خلال مدى كامل تدريجيًا', 'تمارين رجل أو ذراع واحدة عند الحاجة', 'إعادة إدخال السرعة أو التسارع بالتدرج']
          : ['Fuller-range strengthening as tolerated', 'Single-limb work when relevant', 'Gradual reintroduction of speed or acceleration'],
      },
    },
    Tendon: {
      under_48h: {
        focus: isAr
          ? 'تقليل تهيج الوتر مع إبقاء تحميل بسيط ومنتظم بدل الراحة الكاملة.'
          : 'Reduce tendon irritability while keeping some simple, regular loading instead of full rest.',
        exercises: isAr
          ? ['ثباتات متوسطة للوتر حسب التحمل', 'حركة خفيفة للمنطقة المحيطة', 'تقليل الحركات الارتدادية السريعة']
          : ['Mid-range isometric loading as tolerated', 'Gentle motion for the surrounding region', 'Reduce springy or reactive loading early'],
      },
      days_3_14: {
        exercises: isAr
          ? ['مقاومة بطيئة ثقيلة تدريجيًا', 'تمارين تحكم في الوضعية والمحور', 'إكمال جلسات التحميل مع مراقبة ألم اليوم التالي']
          : ['Progressive heavy-slow resistance', 'Position and alignment control drills', 'Monitor next-day tendon response after loading'],
      },
      weeks_2_6: {
        exercises: isAr
          ? ['زيادة الحمل والمقاومة تدريجيًا', 'إعادة إدخال المرونة الارتدادية عند الحاجة', 'تدرج العودة للجري أو القفز أو الرمي']
          : ['Increase load and resistance gradually', 'Reintroduce elastic loading when appropriate', 'Build back to running, jumping, or throwing progressively'],
      },
    },
    Bone: {
      under_48h: {
        focus: isAr
          ? 'احترام الحماية الطبية للعظم المصاب مع الحفاظ على حركة وتمارين آمنة للمناطق غير المتأثرة.'
          : 'Respect bone protection rules while keeping safe movement and training for unaffected areas.',
        exercises: isAr
          ? ['حركة مسموحة حسب التوجيه الطبي', 'تقوية للمناطق غير المصابة', 'تنفس ومشي أو نشاط آمن إذا كان مسموحًا']
          : ['Allowed motion per medical restrictions', 'Strength work for unaffected regions', 'Breathing, walking, or safe activity if cleared'],
        cautions: isAr
          ? ['لا تتدرج في التحميل قبل السماح الطبي', 'تجنب الصدمات أو الضغط المباشر على العظم المصاب']
          : ['Do not progress loading before medical clearance', 'Avoid impact or direct stress through the healing bone'],
      },
      days_3_14: {
        exercises: isAr
          ? ['تمارين حركة محمية', 'تحميل جزئي أو وظيفي إذا تم السماح', 'تمارين اتزان وتحكم تدريجية']
          : ['Protected mobility drills', 'Partial or functional loading if cleared', 'Gradual balance and control drills'],
      },
      weeks_2_6: {
        exercises: isAr
          ? ['تقوية تدريجية حول المنطقة المصابة', 'زيادة التحمل الوظيفي', 'العودة التدريجية للنشاط بعد التأكد من الالتئام']
          : ['Progressive strengthening around the region', 'Build functional tolerance', 'Gradual return to activity after healing milestones'],
      },
    },
    Joint: {
      under_48h: {
        exercises: isAr
          ? ['حركة مريحة للمفصل بدون ضغط زائد', 'تنشيط العضلات الداعمة', 'تحميل يومي بسيط حسب التحمل']
          : ['Comfortable joint motion without excess compression', 'Activation of supporting muscles', 'Simple daily loading as tolerated'],
      },
      days_3_14: {
        exercises: isAr
          ? ['تقوية حول المفصل', 'تمارين تحكم واتزان', 'استعادة النمط الحركي بدون لف مزعج']
          : ['Strength work around the joint', 'Control and balance drills', 'Restore movement pattern without provocative twisting'],
      },
    },
    'Post-surgery': {
      under_48h: {
        focus: isAr
          ? 'اتباع قيود الجراحة بدقة مع تقليل التورم والحفاظ على التنشيط الأساسي.'
          : 'Follow surgical restrictions closely while controlling swelling and keeping basic activation.',
        cautions: isAr
          ? ['اتبع تعليمات الجرّاح والعلاج الطبيعي أولًا', 'لا تتجاوز حدود التحميل أو المدى المحددة']
          : ['Prioritize surgeon and physio restrictions first', 'Do not exceed prescribed loading or range limits'],
      },
      days_3_14: {
        exercises: isAr
          ? ['استعادة المدى المسموح تدريجيًا', 'تنشيط العضلات حسب البروتوكول', 'تدريب المشي أو الوظيفة إذا كان مسموحًا']
          : ['Restore allowed range gradually', 'Muscle activation within the protocol', 'Gait or function practice if cleared'],
      },
    },
    Overuse: {
      under_48h: {
        focus: isAr
          ? 'تقليل الحمل المسبب للتهيج مع إبقاء الحركة المفيدة بدلاً من الإيقاف الكامل.'
          : 'Reduce the aggravating load while keeping useful movement instead of stopping completely.',
      },
      days_3_14: {
        exercises: isAr
          ? ['تعديل الحمل أو الحجم', 'تقوية تدريجية', 'تمارين تحكم في الميكانيكا أو الوضعية']
          : ['Load or volume modification', 'Progressive strengthening', 'Mechanics or posture-focused drills'],
      },
    },
  };

  return categoryMap[injury.category]?.[window];
}

function getSpecificTemplates(id: string, lang: Language): TemplateMap | undefined {
  const en: Record<string, TemplateMap> = {
    ankle_sprain: {
      under_48h: {
        focus: 'Control ankle swelling, restore safe motion, and keep the calf and foot gently active.',
        exercises: ['Ankle alphabet or circles', 'Calf pumping and toe flexion', 'Supported weight shifts and short balance holds'],
      },
      days_3_14: {
        focus: 'Rebuild ankle mobility, calf strength, and single-leg control.',
        exercises: ['Band-resisted ankle inversion and eversion', 'Double- then single-leg calf raises', 'Single-leg stance with reach or perturbation'],
        progressionMarkers: ['Walking is comfortable without a limp', 'Single-leg balance and calf work are controlled'],
      },
      weeks_2_6: {
        exercises: ['Lateral step-downs and split squats', 'Hops in place and line hops', 'Return-to-run progression with landing control'],
      },
    },
    acl_injury: {
      under_48h: {
        focus: 'Regain knee extension, reduce swelling, and wake the quadriceps up early.',
        exercises: ['Heel props or passive extension hangs', 'Quadriceps sets with towel under the knee', 'Straight-leg raise only if there is no extension lag'],
      },
      days_3_14: {
        exercises: ['Heel slides and terminal knee extension', 'Sit-to-stand or supported split squat', 'Single-leg balance with controlled knee alignment'],
        progressionMarkers: ['Swelling is settling and extension is improving', 'Quadriceps activation is clearly better'],
      },
      weeks_2_6: {
        exercises: ['Leg press or squat pattern to tolerance', 'Step-downs and split squats', 'Running preparation drills and low-level deceleration'],
      },
      over_6_weeks: {
        exercises: ['Single-leg strength and hop progressions', 'Change-of-direction mechanics', 'Sport-specific acceleration and deceleration drills'],
      },
    },
    meniscus_tear: {
      under_48h: {
        focus: 'Settle swelling, restore comfortable extension, and avoid twisting or deep compressive positions.',
        exercises: ['Heel slides in a pain-free arc', 'Quadriceps setting and straight-leg raise if tolerated', 'Gait drills and gentle weight shifts'],
      },
      days_3_14: {
        exercises: ['Mini squats and supported sit-to-stand', 'Step-ups with controlled knee position', 'Stationary bike or closed-chain range work if tolerated'],
      },
      weeks_2_6: {
        exercises: ['Split squats and controlled lunges', 'Single-leg Romanian deadlift pattern', 'Rotation tolerance drills introduced gradually'],
      },
    },
    rotator_cuff: {
      under_48h: {
        exercises: ['Pendulum drills and pain-limited assisted elevation', 'Scapular setting and posture reset work', 'Light cuff isometrics into external rotation or abduction'],
      },
      days_3_14: {
        exercises: ['Sidelying or band external rotation', 'Scaption raises within a tolerable range', 'Wall slides with serratus control'],
      },
      weeks_2_6: {
        exercises: ['Rowing variations and landmine press pattern', 'Overhead loading progressions', 'Endurance circuits for cuff and scapular control'],
      },
    },
    low_back_pain: {
      under_48h: {
        focus: 'Reduce guarding, restore confidence with basic movement, and avoid prolonged stiff positions.',
        exercises: ['Breathing with abdominal bracing', 'Repeated movement drill that feels relieving', 'Short walks and gentle hip mobility'],
      },
      days_3_14: {
        exercises: ['Hip hinge drill with dowel', 'McGill-style trunk endurance basics', 'Glute bridge and supported squat pattern'],
      },
      weeks_2_6: {
        exercises: ['Loaded hinge or deadlift pattern progression', 'Carry variations and anti-rotation core work', 'Return to lifting and bending volume gradually'],
      },
    },
    patellar_tendinopathy: {
      under_48h: {
        exercises: ['Spanish squat isometric holds', 'Wall sit holds', 'Pain-guided bike or easy blood-flow work'],
      },
      days_3_14: {
        exercises: ['Heavy slow squat pattern', 'Split squat or leg press', 'Decline squat or tendon-loading variation if tolerated'],
      },
      weeks_2_6: {
        exercises: ['Pogo jumps and landing mechanics', 'Bounding or jump progression', 'Sport-specific court or field loading'],
      },
    },
    plantar_fasciitis: {
      under_48h: {
        exercises: ['Toe yoga and intrinsic foot activation', 'Calf mobility and plantar fascia gentle loading', 'Easy calf isometric holds'],
      },
      days_3_14: {
        exercises: ['Heel raises with big toe pressure', 'Short-foot drill and single-leg balance', 'Step calf raise progression'],
      },
      weeks_2_6: {
        exercises: ['Loaded calf strengthening', 'Walking or running volume progression', 'Hopping tolerance when symptoms allow'],
      },
    },
    achilles_tendinopathy: {
      under_48h: {
        exercises: ['Mid-range calf isometric holds', 'Seated calf raises', 'Easy ankle mobility between loading bouts'],
      },
      days_3_14: {
        exercises: ['Standing and seated heavy calf raises', 'Slow heel raise eccentrics', 'Single-leg balance with calf demand'],
      },
      weeks_2_6: {
        exercises: ['Single-leg calf endurance work', 'Pogo jumps and skipping progression', 'Return-to-run progression'],
      },
    },
    glenohumeral_dislocation: {
      under_48h: {
        exercises: ['Protected pendulum work and supported flexion', 'Gentle cuff and deltoid isometrics', 'Scapular setting with pain-free range'],
      },
      days_3_14: {
        exercises: ['Band external rotation and row', 'Closed-chain shoulder stability at wall height', 'Scapular control through assisted elevation'],
      },
      weeks_2_6: {
        exercises: ['Dynamic stability drills', 'Farmer carry or bottoms-up carry variations', 'Gradual overhead and throwing preparation'],
      },
    },
    acl_reconstruction: {
      under_48h: {
        focus: 'Follow the post-op protection rules while restoring extension, reducing swelling, and reactivating the quadriceps.',
        exercises: ['Heel prop for extension', 'Quadriceps sets with frequent short bouts', 'Straight-leg raise only when the knee stays controlled'],
        cautions: ['Respect surgeon restrictions for weight-bearing and brace use', 'Do not chase flexion at the expense of swelling or extension'],
      },
      days_3_14: {
        exercises: ['Heel slides and terminal knee extension', 'Gait retraining and supported sit-to-stand', 'Step-up or split-squat pattern when cleared'],
      },
      over_6_weeks: {
        exercises: ['Heavy lower-body strength progressions', 'Hop and landing progression', 'Return-to-run and change-of-direction blocks'],
      },
    },
    meniscus_repair: {
      under_48h: {
        focus: 'Protect the repair, manage swelling, and keep muscle activity without breaking loading restrictions.',
        exercises: ['Quadriceps setting and assisted straight-leg raise if allowed', 'Gentle range work within the allowed arc', 'Hip and trunk strengthening around the protected knee'],
        cautions: ['Respect flexion and weight-bearing restrictions exactly', 'Avoid loaded deep knee bending early'],
      },
      days_3_14: {
        exercises: ['Controlled closed-chain drills within allowed range', 'Stationary bike when cleared', 'Gradual gait and step-loading progressions'],
      },
    },
    rotator_cuff_repair: {
      under_48h: {
        focus: 'Protect the repair and maintain comfortable passive movement and scapular control.',
        exercises: ['Pendulum drills and passive range as prescribed', 'Hand, wrist, and elbow mobility', 'Scapular setting and posture work'],
        cautions: ['Do not load active cuff work before clearance', 'Respect sling and repair-specific restrictions'],
      },
      days_3_14: {
        exercises: ['Assisted elevation and external rotation within limits', 'Scapular motor-control drills', 'Gentle isometrics only when cleared'],
      },
      over_6_weeks: {
        exercises: ['Progressive cuff strengthening', 'Overhead reach and endurance progressions', 'Return to lifting or sport-specific shoulder work'],
      },
    },
  };

  const ar: Record<string, TemplateMap> = {
    ankle_sprain: {
      under_48h: {
        focus: 'تقليل تورم الكاحل واستعادة الحركة الآمنة مع تنشيط بسيط للسمانة والقدم.',
        exercises: ['كتابة الحروف بالكاحل أو دوائر خفيفة', 'ضخ السمانة وثني أصابع القدم', 'نقل وزن مدعوم واتزان قصير'],
      },
      days_3_14: {
        focus: 'إعادة بناء حركة الكاحل وقوة السمانة والتحكم على رجل واحدة.',
        exercises: ['مقاومة بالكاحل للداخل والخارج باستخدام شريط', 'رفع سمانة بالقدمين ثم بقدم واحدة', 'اتزان على رجل واحدة مع لمس أو مقاومة خفيفة'],
      },
      weeks_2_6: {
        exercises: ['نزول من خطوة جانبي وتمرين split squat', 'نط خفيف في المكان أو على خط', 'تدرج العودة للجري مع التحكم في الهبوط'],
      },
    },
    acl_injury: {
      under_48h: {
        focus: 'استعادة فرد الركبة وتقليل التورم وتنشيط العضلة الأمامية مبكرًا.',
        exercises: ['تمرين فرد الركبة مع وسادة تحت الكعب', 'شد العضلة الأمامية مع فوطة تحت الركبة', 'رفع مستقيم للرجل فقط إذا لم يوجد ضعف في الفرد'],
      },
      days_3_14: {
        exercises: ['سحب الكعب وثني الركبة تدريجيًا', 'فرد نهائي للركبة وتمرين جلوس وقيام مدعوم', 'اتزان على رجل واحدة مع الحفاظ على محور الركبة'],
      },
      weeks_2_6: {
        exercises: ['سكوات أو leg press حسب التحمل', 'step-down وsplit squat', 'تحضير للجري والإبطاء البسيط'],
      },
      over_6_weeks: {
        exercises: ['قوة رجل واحدة واختبارات هوب تدريجية', 'ميكانيكا تغيير الاتجاه', 'تدرج السرعة والتباطؤ الخاص بالرياضة'],
      },
    },
    meniscus_tear: {
      under_48h: {
        focus: 'تهدئة التورم واستعادة الفرد المريح وتجنب اللف أو الثني العميق الضاغط.',
        exercises: ['سحب الكعب داخل مدى مريح', 'شد العضلة الأمامية ورفع الرجل المستقيمة عند التحمل', 'تدريب المشي ونقل الوزن الخفيف'],
      },
      days_3_14: {
        exercises: ['mini squat وجلوس وقيام مدعوم', 'step-up مع تحكم جيد في الركبة', 'عجلة ثابتة أو تمارين مغلقة السلسلة عند التحمل'],
      },
      weeks_2_6: {
        exercises: ['split squat ولانج متحكم', 'نمط single-leg RDL', 'إدخال تدريجي لتحمل الدوران'],
      },
    },
    rotator_cuff: {
      under_48h: {
        exercises: ['تمارين pendulum ورفع مساعد ضمن المدى المريح', 'تنشيط لوح الكتف وتحسين الوضعية', 'انقباضات ثابتة خفيفة للدوران الخارجي أو الإبعاد'],
      },
      days_3_14: {
        exercises: ['دوران خارجي بالرباط أو على الجانب', 'رفع scaption داخل مدى متحمل', 'wall slides مع تحكم serratus'],
      },
      weeks_2_6: {
        exercises: ['تمارين سحب وlandmine press', 'تدرج التحميل فوق الرأس', 'دوائر تحمل للكفة ولوح الكتف'],
      },
    },
    low_back_pain: {
      under_48h: {
        focus: 'تقليل الشد الدفاعي واستعادة الثقة بالحركة الأساسية وتجنب الثبات الطويل المؤلم.',
        exercises: ['تنفس مع شد خفيف لجدار البطن', 'حركة متكررة تشعر معها براحة', 'مشي قصير وحركة خفيفة للحوض والفخذ'],
      },
      days_3_14: {
        exercises: ['تدريب hip hinge بعصا', 'تمارين تحمل الجذع الأساسية', 'glute bridge ونمط سكوات مدعوم'],
      },
      weeks_2_6: {
        exercises: ['تدرج hinge أو deadlift خفيف', 'حمل farmer carry ومقاومة الدوران', 'تدرج العودة للانحناء والرفع'],
      },
    },
    patellar_tendinopathy: {
      under_48h: {
        exercises: ['ثبات Spanish squat', 'wall sit', 'دراجة أو نشاط دموي خفيف حسب الألم'],
      },
      days_3_14: {
        exercises: ['سكوات بطيء ثقيل تدريجي', 'split squat أو leg press', 'decline squat أو تحميل مناسب للوتر عند التحمل'],
      },
      weeks_2_6: {
        exercises: ['نط خفيف pogo وتحكم في الهبوط', 'تدرج القفز والوثب', 'تحميل خاص بالملعب أو الرياضة'],
      },
    },
    plantar_fasciitis: {
      under_48h: {
        exercises: ['تمارين أصابع القدم وتنشيط عضلات القدم الداخلية', 'مط وتحميل خفيف للسمانة واللفافة الأخمصية', 'ثبات سمانة خفيف'],
      },
      days_3_14: {
        exercises: ['رفع سمانة مع ضغط إصبع القدم الكبير', 'short-foot واتزان على رجل واحدة', 'تدرج رفع السمانة على درجة'],
      },
      weeks_2_6: {
        exercises: ['تقوية سمانة محملة', 'تدرج المشي أو الجري', 'تحمل النط عند السماح'],
      },
    },
  };

  return (lang === 'ar' ? ar : en)[id];
}

function getRegionalTemplate(injury: InjuryProtocol, lang: Language, window: RecoveryWindow): Partial<StageTemplate> | undefined {
  const isAr = lang === 'ar';
  const kneeMap: TemplateMap = {
    under_48h: {
      exercises: isAr
        ? ['شد العضلة الأمامية للركبة', 'سحب الكعب أو فرد الركبة داخل مدى مريح', 'نقل وزن بسيط أو مشي مدعوم']
        : ['Quadriceps setting', 'Heel slides or extension work within tolerance', 'Supported weight shifts or gait drills'],
    },
    days_3_14: {
      exercises: isAr
        ? ['mini squat أو sit-to-stand', 'step-up خفيف', 'اتزان وتحكم في محور الركبة']
        : ['Mini squats or sit-to-stand', 'Low step-up progression', 'Balance drills with knee alignment control'],
    },
    weeks_2_6: {
      exercises: isAr
        ? ['split squat أو step-down', 'قوة رجل واحدة تدريجيًا', 'تمارين هبوط ووظيفة خاصة بالنشاط']
        : ['Split squats or step-downs', 'Progressive single-leg strengthening', 'Landing or functional drills for activity demands'],
    },
  };

  const shoulderMap: TemplateMap = {
    under_48h: {
      exercises: isAr
        ? ['Pendulum وتمارين مساعدة خفيفة', 'تنشيط لوح الكتف', 'ثباتات بسيطة للكفة أو الدالية']
        : ['Pendulum and assisted shoulder motion', 'Scapular control work', 'Light cuff or deltoid isometrics'],
    },
    days_3_14: {
      exercises: isAr
        ? ['سحب بالرباط', 'دوران خارجي متدرج', 'رفع أمامي أو جانبي متحكم فيه']
        : ['Band rows', 'Progressive external rotation work', 'Controlled elevation work'],
    },
    weeks_2_6: {
      exercises: isAr
        ? ['تمارين ثبات ديناميكي للكتف', 'ضغط أو حمل تدريجي', 'تدرج فوق الرأس حسب التحمل']
        : ['Dynamic shoulder stability drills', 'Progressive pressing or carrying', 'Overhead progression as tolerated'],
    },
  };

  const ankleFootMap: TemplateMap = {
    under_48h: {
      exercises: isAr
        ? ['حركة كاحل بسيطة', 'تنشيط السمانة والقدم', 'اتزان مدعوم قصير']
        : ['Gentle ankle mobility', 'Calf and foot activation', 'Supported balance drills'],
    },
    days_3_14: {
      exercises: isAr
        ? ['رفع سمانة تدريجي', 'مقاومة بالكاحل أو القدم', 'اتزان على رجل واحدة']
        : ['Progressive calf raises', 'Band resistance for ankle or foot control', 'Single-leg balance work'],
    },
    weeks_2_6: {
      exercises: isAr
        ? ['step-down أو split squat', 'نط خفيف أو هبوط متحكم', 'تدرج العودة للمشي السريع أو الجري']
        : ['Step-downs or split squats', 'Light hopping or landing control', 'Walk-to-run progression'],
    },
  };

  const backSpineMap: TemplateMap = {
    under_48h: {
      exercises: isAr
        ? ['تنفس وتحكم بالجذع', 'حركة مريحة متكررة للظهر', 'مشي قصير ومتكرر']
        : ['Breathing and trunk control drills', 'Repeated relieving movement pattern', 'Short frequent walks'],
    },
    days_3_14: {
      exercises: isAr
        ? ['hip hinge', 'تحمل الجذع', 'bridge أو bird-dog حسب التحمل']
        : ['Hip hinge practice', 'Trunk endurance work', 'Bridge or bird-dog variations as tolerated'],
    },
    weeks_2_6: {
      exercises: isAr
        ? ['حمل مقاومة تدريجي', 'مقاومة الدوران', 'تدرج العودة للرفع والالتفاف']
        : ['Progressive loaded strengthening', 'Anti-rotation core work', 'Gradual return to lifting and rotation'],
    },
  };

  const bodyRegionMap: Partial<Record<InjuryProtocol['bodyRegion'], TemplateMap>> = {
    Knee: kneeMap,
    Shoulder: shoulderMap,
    Ankle: ankleFootMap,
    Foot: ankleFootMap,
    Back: backSpineMap,
    Spine: backSpineMap,
  };

  return bodyRegionMap[injury.bodyRegion]?.[window];
}

export function getRehabStagePlans(injury: InjuryProtocol, lang: Language): RehabStagePlan[] {
  const specific = getSpecificTemplates(injury.id, lang);

  return injury.phases.map((phase: InjuryPhase) => {
    const base = templateFor(lang, phase.window);
    const regional = getRegionalTemplate(injury, lang, phase.window);
    const override = specific?.[phase.window];
    const merged = mergeTemplate(mergeTemplate(base, regional), override);
    const exerciseLabelsFromPlans = phase.exercisePlans?.map((p) => p.label).filter(Boolean) ?? [];

    return {
      phaseId: phase.id,
      phaseLabel: phase.label,
      duration: phase.duration,
      focus: phase.focus && phase.focus.trim() ? phase.focus : merged.focus,
      exercises: phase.exercises?.length ? phase.exercises : exerciseLabelsFromPlans.length ? exerciseLabelsFromPlans : merged.exercises,
      progressionMarkers: phase.progressionMarkers?.length ? phase.progressionMarkers : merged.progressionMarkers,
      cautions: phase.cautions?.length
        ? phase.cautions
        : merged.cautions.length
          ? merged.cautions
          : phase.prohibitedMovements,
    };
  });
}
