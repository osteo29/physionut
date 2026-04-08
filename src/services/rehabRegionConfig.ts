import type {StaticMuscleSlug} from '../components/common/exercise-finder/types';

export type RehabRegionConfig = {
  summaryEn: string;
  summaryAr: string;
  medicalNotesEn: string[];
  medicalNotesAr: string[];
  redFlagNotesEn: string[];
  redFlagNotesAr: string[];
  relatedInjuryIds: string[];
};

export const REHAB_REGION_CONFIG: Partial<Record<StaticMuscleSlug, RehabRegionConfig>> = {
  neck: {
    summaryEn:
      'This page is best used for symptom-calmed neck loading, posture support, and graded return to upper-body training when sharp or spreading symptoms are absent.',
    summaryAr:
      'تفيد هذه الصفحة عند تهدئة الأعراض والبدء في تحميل الرقبة تدريجيًا، مع تحسين وضعية الرقبة ودعم العودة الآمنة لتدريب الجزء العلوي عندما لا توجد أعراض حادة أو ممتدة.',
    medicalNotesEn: [
      'Start with low-irritation control drills before adding pulling or shoulder loading.',
      'Scapular control, breathing, and thoracic position often change neck tolerance more than direct neck effort alone.',
      'Neck rehab should feel repeatable across the week, not exhausting in one session.',
    ],
    medicalNotesAr: [
      'ابدأ بتمارين التحكم منخفضة الاستثارة قبل إضافة السحب أو تحميل الكتف.',
      'التحكم في لوح الكتف والتنفس ووضع الفقرات الصدرية يؤثر غالبًا في تحمل الرقبة أكثر من إجهاد الرقبة المباشر وحده.',
      'تأهيل الرقبة ينبغي أن يكون قابلًا للتكرار خلال الأسبوع، لا جلسة مرهقة واحدة.',
    ],
    redFlagNotesEn: [
      'Stop and seek medical review if pain shoots into the arm, numbness progresses, or strength suddenly drops.',
      'Do not push through dizziness, severe headache, or loss of balance during neck loading.',
    ],
    redFlagNotesAr: [
      'أوقف التمرين واطلب تقييمًا طبيًا إذا امتد الألم إلى الذراع، أو زاد التنميل، أو حدث ضعف مفاجئ في القوة.',
      'لا تواصل التحميل إذا ظهر دوار أو صداع شديد أو اختلال واضح في التوازن أثناء التمرين.',
    ],
    relatedInjuryIds: ['neck_pain', 'neck_muscle_strain'],
  },
  hip: {
    summaryEn:
      'This page supports gradual hip loading, single-leg control, and rebuilding pelvic stability before faster running, cutting, or heavy lower-body work.',
    summaryAr:
      'تدعم هذه الصفحة التحميل التدريجي للورك، والتحكم في الرجل الواحدة، وإعادة بناء ثبات الحوض قبل الجري السريع أو تغيير الاتجاه أو تحميل الجزء السفلي بشكل ثقيل.',
    medicalNotesEn: [
      'Hip rehab usually progresses better when glute strength, trunk control, and single-leg balance are trained together.',
      'Use tolerable range first, then expand range and load gradually rather than forcing end range early.',
      'Symptoms around the groin, outer hip, or posterior hip may need slightly different exercise emphasis, so stay guided by symptom response.',
    ],
    medicalNotesAr: [
      'يتحسن تأهيل الورك غالبًا عندما يتدرب ثبات الجذع وقوة الألوية والتوازن على رجل واحدة معًا.',
      'ابدأ بمدى حركي محتمل ثم وسّع المدى والحمل تدريجيًا بدل فرض المدى الكامل مبكرًا.',
      'ألم المغبن أو الجانب الخارجي للورك أو المنطقة الخلفية قد يحتاج اختلافًا بسيطًا في التركيز، لذلك وجّه التقدم حسب استجابة الأعراض.',
    ],
    redFlagNotesEn: [
      'Seek medical review if hip pain is constant at rest, associated with locking, or prevents normal weight bearing.',
      'Reduce loading if limping worsens the next day or if pelvic control clearly collapses with every rep.',
    ],
    redFlagNotesAr: [
      'اطلب تقييمًا طبيًا إذا كان ألم الورك مستمرًا في الراحة، أو مصحوبًا بعلق مفصلي، أو يمنع تحميل الوزن بشكل طبيعي.',
      'خفف الحمل إذا زاد العرج في اليوم التالي أو ظهر فقدان واضح لثبات الحوض مع كل تكرار.',
    ],
    relatedInjuryIds: [
      'adductor_strain',
      'glute_strain',
      'glute_tendinopathy',
      'hip_flexor_tendinopathy',
      'hamstring_tendon_injury',
      'hip_dysplasia_labral_tear',
      'it_band_syndrome',
      'geriatric_hip_fracture',
    ],
  },
  'wrist-rehab': {
    summaryEn:
      'This page is designed for graded wrist and forearm loading, grip restoration, and return to pressing or carrying after irritation settles.',
    summaryAr:
      'صُممت هذه الصفحة للتحميل التدريجي للرسغ والساعد، واستعادة قوة القبضة، والعودة للضغط أو الحمل بعد هدوء التهيج.',
    medicalNotesEn: [
      'Forearm strength and grip tolerance often support the wrist better than stretching alone.',
      'Neutral wrist positions usually tolerate early loading better than aggressive extension.',
      'Progress from supported holds into carries, curls, and pressure-bearing work step by step.',
    ],
    medicalNotesAr: [
      'قوة الساعد وتحمل القبضة يدعمان الرسغ غالبًا بشكل أفضل من الإطالات وحدها.',
      'الوضع المحايد للرسغ يتحمل التحميل المبكر عادةً أفضل من المد العنيف.',
      'تدرج من الثبات المدعوم إلى الحمل والكيرلز والتحميل على اليد خطوة بخطوة.',
    ],
    redFlagNotesEn: [
      'Stop and seek medical review if swelling rises quickly, grip strength drops sharply, or numbness becomes persistent.',
      'Avoid forcing loaded extension if the wrist cannot hold neutral alignment comfortably.',
    ],
    redFlagNotesAr: [
      'أوقف التمرين واطلب تقييمًا طبيًا إذا زاد التورم سريعًا، أو هبطت قوة القبضة بشكل واضح، أو أصبح التنميل مستمرًا.',
      'تجنب فرض المد المحمل إذا كان الرسغ لا يستطيع الحفاظ على وضع محايد بشكل مريح.',
    ],
    relatedInjuryIds: ['forearm_strain', 'wrist_instability_tfcc', 'carpal_tunnel_syndrome', 'gymnast_wrist_injury', 'scaphoid_fracture'],
  },
  'full-body-rehab': {
    summaryEn:
      'This page helps reconnect whole-body movement after injury, time off, or rehab discharge through conservative strength, control, and conditioning exposure.',
    summaryAr:
      'تساعد هذه الصفحة على إعادة ربط حركة الجسم بالكامل بعد الإصابة أو الانقطاع أو الخروج من التأهيل، عبر جرعات محافظة من القوة والتحكم والتحمل.',
    medicalNotesEn: [
      'Choose exercises that calm symptoms during the session and stay manageable the following day.',
      'A return-to-training week should rebuild tolerance across the trunk, hips, shoulders, and gait, not chase peak performance immediately.',
      'Leave room for recovery so total weekly load rises gradually rather than jumping back to pre-injury volume.',
    ],
    medicalNotesAr: [
      'اختر تمارين تهدئ الأعراض أثناء الجلسة وتبقى محتملة في اليوم التالي.',
      'أسبوع العودة للتدريب يجب أن يعيد بناء تحمل الجذع والورك والكتف والمشية، لا أن يطارد الأداء الأقصى مباشرة.',
      'اترك مساحة للاستشفاء حتى يرتفع الحمل الأسبوعي تدريجيًا بدل القفز السريع إلى الحجم السابق للإصابة.',
    ],
    redFlagNotesEn: [
      'Scale back if symptoms flare for more than 24 hours, sleep worsens, or fatigue accumulates faster than expected.',
      'If multiple regions are irritable at once, prioritize medical follow-up over pushing through a generic return plan.',
    ],
    redFlagNotesAr: [
      'خفف البرنامج إذا استمر تهيج الأعراض أكثر من 24 ساعة، أو ساء النوم، أو تراكم الإجهاد أسرع من المتوقع.',
      'إذا كانت عدة مناطق متهيجة في الوقت نفسه، فالأولوية للمتابعة الطبية لا لدفع برنامج عودة عام بالقوة.',
    ],
    relatedInjuryIds: ['ankle_sprain', 'acl_injury', 'acl_reconstruction', 'low_back_pain', 'stress_fracture', 'rotator_cuff', 'hamstring_strain'],
  },
};
