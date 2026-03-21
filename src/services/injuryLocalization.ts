import type {Language} from './translations';

const injuryNameMap: Record<string, {ar: string; en?: string}> = {
  osteoarthritis_flare: {ar: 'خشونة الركبة والمفصل التنكسي', en: 'Knee osteoarthritis'},
  ucl_injury: {ar: 'إصابة الرباط الزندي الجانبي في الكوع'},
  thumb_collateral_ligament: {ar: 'إصابة الرباط الجانبي للإبهام'},
  ac_joint_sprain: {ar: 'التواء مفصل الأخرم والترقوة'},
  knee_multiligament_injury: {ar: 'إصابة متعددة الأربطة في الركبة'},
  biceps_tendinopathy: {ar: 'اعتلال أو تمزق وتر العضلة ذات الرأسين'},
  ac_joint_injury: {ar: 'إصابة مفصل الأخرم والترقوة'},
  tendinosis: {ar: 'تنكس الأوتار المزمن'},
  overhead_throwers_shoulder: {ar: 'كتف الرامي فوق الرأس'},
  swimmer_shoulder_impingement: {ar: 'انحشار كتف السباح'},
  mcl_sprain: {ar: 'التواء الرباط الجانبي الإنسي للركبة'},
  lcl_sprain: {ar: 'التواء الرباط الجانبي الوحشي للركبة'},
  glenohumeral_dislocation: {ar: 'خلع أو تحت خلع مفصل الكتف'},
  bursitis: {ar: 'التهاب الجراب'},
  tmj_disorder: {ar: 'اضطراب المفصل الصدغي الفكي'},
  scaphoid_fracture: {ar: 'كسر العظم الزورقي في الرسغ'},
  hip_dysplasia_labral_tear: {ar: 'خلل التنسج الوركي أو تمزق الشفا الحقية'},
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
  if (!translated) return fallback;
  return lang === 'ar' ? translated.ar : translated.en || fallback;
}

export function getLocalizedCategory(category: string, lang: Language) {
  return lang === 'ar' ? categoryMap[category]?.ar || category : category;
}

export function getLocalizedBodyRegion(bodyRegion: string, lang: Language) {
  return lang === 'ar' ? bodyRegionMap[bodyRegion]?.ar || bodyRegion : bodyRegion;
}
