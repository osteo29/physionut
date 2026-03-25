import type {Language} from './translations';
import {formatBodyRegion, formatConditionName, formatMedicalCategory} from './medicalTerminology';

const injuryNameMap: Record<string, {ar: string; en?: string}> = {
  // Muscle injuries
  quadriceps_strain: {ar: 'إجهاد عضلة الفخذ الرباعية'},
  calf_strain: {ar: 'إجهاد عضلات الساق (الفتيليس والسمانة)'},
  biceps_strain: {ar: 'إجهاد العضلة ذات الرأسين'},
  triceps_strain: {ar: 'إجهاد عضلة ثلاثية الرؤوس'},
  pectoral_strain: {ar: 'إجهاد عضلات الصدر'},
  deltoid_strain: {ar: 'إجهاد عضلة الكتف الدالية'},
  forearm_strain: {ar: 'إجهاد عضلات الساعد (المرنة والباسطة)'},
  glute_strain: {ar: 'إجهاد عضلات الأرداف (العريضة والوسطى)'},
  oblique_strain: {ar: 'إجهاد عضلات البطن المائلة'},
  erector_spinae_strain: {ar: 'إجهاد عضلات الظهر الفاردة للعمود الفقري'},
  neck_muscle_strain: {ar: 'إجهاد عضلات الرقبة'},
  adductor_strain: {ar: 'إجهاد عضلات الفخذ الداخلية (شد الفخذ)'},
  tibialis_anterior_strain: {ar: 'إجهاد عضلة أمام الساق'},
  hamstring_strain: {ar: 'إجهاد عضلات الفخذ الخلفية'},

  // Ligament injuries
  pcl_injury: {ar: 'إصابة الرباط الصليبي الخلفي'},
  mcl_sprain: {ar: 'التواء الرباط الجانبي الإنسي للركبة'},
  lcl_sprain: {ar: 'التواء الرباط الجانبي الوحشي للركبة'},
  ucl_injury: {ar: 'إصابة الرباط الزندي الجانبي (كوع الرامي)'},
  thumb_collateral_ligament: {ar: 'إصابة الرباط الجانبي للإبهام'},
  ac_joint_sprain: {ar: 'التواء مفصل الأخرم والترقوة'},
  knee_multiligament_injury: {ar: 'إصابة متعددة الأربطة في الركبة'},
  spine_ligament_strain: {ar: 'إجهاد أربطة العمود الفقري'},
  acl_injury: {ar: 'إصابة الرباط الصليبي الأمامي'},

  // Tendon injuries
  achilles_tendinopathy: {ar: 'اعتلال وتر أخيل (وتر العرقوب)'},
  patellar_tendinopathy: {ar: 'اعتلال وتر الرضفة'},
  biceps_tendinopathy: {ar: 'اعتلال أو تمزق وتر العضلة ذات الرأسين'},
  lateral_epicondylitis: {ar: 'التهاب الأوتار الجانبي للكوع (كوع لاعب التنس)'},
  medial_epicondylitis: {ar: 'التهاب الأوتار الإنسي للكوع (كوع لاعب الجولف)'},
  glute_tendinopathy: {ar: 'اعتلال أوتار عضلات الأرداف'},
  hip_flexor_tendinopathy: {ar: 'اعتلال أوتار عضلات مرونة الورك'},
  hamstring_tendon_injury: {ar: 'تمزق أو اعتلال أوتار الفخذ الخلفية'},
  plantar_achilles_insertion_tendinopathy: {ar: 'اعتلال وتر أخيل في نقطة الالتقاء'},
  rotator_cuff: {ar: 'إصابة الكفة المدورة'},
  overhead_throwers_shoulder: {ar: 'كتف الرامي'},
  swimmer_shoulder_impingement: {ar: 'انحشار كتف السباح'},
  tendinosis: {ar: 'تنكس الأوتار المزمن'},

  // Bone injuries
  bone_fracture_long_bone: {ar: 'كسر العظام الطويلة'},
  vertebral_fracture: {ar: 'كسر الفقرات (الضغط أو الانفجار)'},
  rib_fracture: {ar: 'كسر الضلع'},
  scaphoid_fracture: {ar: 'كسر العظم الزورقي (كسر الرسغ)'},
  calcaneus_fracture: {ar: 'كسر عظم العقب (الكعب)'},
  patella_fracture: {ar: 'كسر عظم الرضفة'},
  talus_fracture: {ar: 'كسر عظم التالوس'},
  humeral_head_fracture: {ar: 'كسر رأس عظم العضد'},
  pelvic_avulsion_fracture: {ar: 'كسر الحوض بالانفصال'},
  stress_fracture: {ar: 'كسر الإجهاد'},

  // Joint injuries
  meniscus_tear: {ar: 'تمزق الغضروف الهلالي'},
  labrum_tear: {ar: 'تمزق الشفا الحقية'},
  ac_joint_injury: {ar: 'إصابة مفصل الأخرم والترقوة'},
  patellofemoral_pain: {ar: 'متلازمة الألم الرضفي الفخذي'},
  ankle_instability: {ar: 'عدم استقرار الكاحل'},
  osteoarthritis_flare: {ar: 'هشاشة (خشونة) المفاصل'},
  tmj_disorder: {ar: 'اضطراب المفصل الصدغي الفكي'},
  elbow_instability: {ar: 'عدم استقرار الكوع / الخلع الجزئي'},
  shoulder_impingement: {ar: 'متلازمة انحشار الكتف'},
  glenohumeral_dislocation: {ar: 'خلع أو تحت خلع مفصل الكتف'},
  hip_dysplasia_labral_tear: {ar: 'خلل التنسج الوركي أو تمزق الشفا الحقية'},
  wrist_instability_tfcc: {ar: 'عدم استقرار الرسغ / إصابة الغضروف المثلث'},

  // Overuse injuries
  low_back_pain: {ar: 'آلام أسفل الظهر / إجهاد */الفقرات القطنية'},
  neck_pain: {ar: 'آلام الرقبة / الإجهاد العنقي'},
  plantar_fasciitis: {ar: 'التهاب اللفافة الأخمصية'},
  it_band_syndrome: {ar: 'متلازمة الرباط الحرقفي الظنبوبي'},
  shin_splints: {ar: 'التهاب عظام الساق (متلازمة الإجهاد الإنسي للقصبة)'},
  bursitis: {ar: 'التهاب الجراب'},
};

const categoryMapWithAdditional: Record<string, {ar: string}> = {
  'Spine': {ar: 'العمود الفقري'},
  'Back': {ar: 'الظهر'},
  'Chest': {ar: 'الصدرة'},
  'Pelvis': {ar: 'الحوض'},
  'Thigh': {ar: 'الفخذ'},
};

const categoryMap: Record<string, {ar: string}> = {
  Muscle: {ar: 'عضلات'},
  Ligament: {ar: 'أربطة'},
  Tendon: {ar: 'أوتار'},
  Bone: {ar: 'عظام'},
  Joint: {ar: 'مفاصل'},
  Overuse: {ar: 'إجهاد مزمن'},
  Sports: {ar: 'إصابات رياضية'},
  Pediatric: {ar: 'أطفال'},
  Geriatric: {ar: 'كبار السن'},
  'Post-surgery': {ar: 'ما بعد الجراحة'},
};

const bodyRegionMap: Record<string, {ar: string}> = {
  Knee: {ar: 'الركبة'},
  Shoulder: {ar: 'الكتف'},
  'Whole body': {ar: 'الجسم بالكامل'},
  Hip: {ar: 'الورك'},
  Wrist: {ar: 'الرسغ'},
  Jaw: {ar: 'الفك'},
  Elbow: {ar: 'الكوع'},
  Hand: {ar: 'اليد'},
  Ankle: {ar: 'الكاحل'},
  Foot: {ar: 'القدم'},
  Neck: {ar: 'الرقبة'},
};

export function getLocalizedInjuryName(id: string, fallback: string, lang: Language) {
  const translated = injuryNameMap[id];
  if (translated) {
    return lang === 'ar' ? translated.ar : translated.en || formatConditionName(fallback, 'en');
  }
  return formatConditionName(fallback, lang);
}

export function getLocalizedCategory(category: string, lang: Language) {
  const direct = {...categoryMapWithAdditional, ...categoryMap}[category]?.ar;
  if (lang === 'ar') return direct || formatMedicalCategory(category, 'ar');
  return formatMedicalCategory(category, 'en');
}

export function getLocalizedBodyRegion(bodyRegion: string, lang: Language) {
  const direct = bodyRegionMap[bodyRegion]?.ar;
  if (lang === 'ar') return direct || formatBodyRegion(bodyRegion, 'ar');
  return formatBodyRegion(bodyRegion, 'en');
}

const activityContextMap: Record<string, string> = {
  Football: 'كرة القدم',
  Basketball: 'كرة السلة',
  'Pivoting sports': 'الرياضات التي تعتمد على اللف وتغيير الاتجاه',
  Running: 'الجري',
  'Daily activity': 'الأنشطة اليومية',
  'Field sports': 'الرياضات الميدانية',
  'Overhead sports': 'الرياضات فوق الرأس',
  'Gym training': 'تدريبات الجيم',
  'Manual work': 'الأعمال اليدوية',
  Sprinting: 'العدو السريع',
  Track: 'ألعاب المضمار',
  Dance: 'الرقص',
  'Rapid load spikes': 'الزيادة المفاجئة في الحمل',
};

function hasArabicText(value: string) {
  return /[\u0600-\u06FF]/.test(value);
}

export function getLocalizedCommonInjuryContext(item: string, lang: Language) {
  if (lang !== 'ar') return item;
  return activityContextMap[item] || item;
}

export function getLocalizedInjuryOverview(
  injuryName: string,
  category: string,
  bodyRegion: string,
  fallback: string,
  lang: Language,
) {
  if (lang !== 'ar') return fallback;
  if (hasArabicText(fallback)) return fallback;

  const localizedCategory = getLocalizedCategory(category, 'ar');
  const localizedBodyRegion = getLocalizedBodyRegion(bodyRegion, 'ar');
  return `${injuryName} من إصابات ${localizedCategory} التي تؤثر على ${localizedBodyRegion}، وتحتاج إلى تدرج جيد في العلاج والتغذية والعودة للنشاط.`;
}

export function textLooksArabic(value: string) {
  return hasArabicText(value);
}
