import type {Language} from '../translations';

export type InjuryTaxonomyKey =
  | 'Muscle'
  | 'Ligament'
  | 'Tendon'
  | 'Bone'
  | 'Joint'
  | 'Overuse'
  | 'Sports'
  | 'Pediatric'
  | 'Geriatric'
  | 'Post-surgery'
  | 'Spine'
  | 'Back'
  | 'Chest'
  | 'Pelvis'
  | 'Thigh'
  | 'General';

export type BodyRegionKey =
  | 'Knee'
  | 'Shoulder'
  | 'Hip'
  | 'Wrist'
  | 'Jaw'
  | 'Elbow'
  | 'Hand'
  | 'Ankle'
  | 'Foot'
  | 'Neck'
  | 'Spine'
  | 'Back'
  | 'Chest'
  | 'Pelvis'
  | 'Thigh'
  | 'Arm'
  | 'Whole body'
  | 'Ankle & Foot'
  | 'Elbow & Wrist'
  | 'Upper Limb'
  | 'Lower Limb'
  | 'General';

const CATEGORY_LABELS: Record<InjuryTaxonomyKey, {en: string; ar: string}> = {
  Muscle: {en: 'Muscle Injury', ar: 'إصابة عضلية'},
  Ligament: {en: 'Ligament Injury', ar: 'إصابة أربطة'},
  Tendon: {en: 'Tendon Disorder', ar: 'اضطراب الأوتار'},
  Bone: {en: 'Bone Injury', ar: 'إصابة عظمية'},
  Joint: {en: 'Joint Disorder', ar: 'اضطراب مفصلي'},
  Overuse: {en: 'Overuse Condition', ar: 'إصابة إجهاد تكراري'},
  Sports: {en: 'Sports Injury', ar: 'إصابة رياضية'},
  Pediatric: {en: 'Pediatric Condition', ar: 'حالة للأطفال'},
  Geriatric: {en: 'Geriatric Condition', ar: 'حالة لكبار السن'},
  'Post-surgery': {en: 'Post-surgical Rehabilitation', ar: 'تأهيل ما بعد الجراحة'},
  Spine: {en: 'Spine', ar: 'العمود الفقري'},
  Back: {en: 'Back', ar: 'الظهر'},
  Chest: {en: 'Chest', ar: 'الصدر'},
  Pelvis: {en: 'Pelvis', ar: 'الحوض'},
  Thigh: {en: 'Thigh', ar: 'الفخذ'},
  General: {en: 'General', ar: 'عام'},
};

const BODY_REGION_LABELS: Record<BodyRegionKey, {en: string; ar: string}> = {
  Knee: {en: 'Knee', ar: 'الركبة'},
  Shoulder: {en: 'Shoulder', ar: 'الكتف'},
  Hip: {en: 'Hip', ar: 'الورك'},
  Wrist: {en: 'Wrist', ar: 'الرسغ'},
  Jaw: {en: 'Jaw', ar: 'الفك'},
  Elbow: {en: 'Elbow', ar: 'الكوع'},
  Hand: {en: 'Hand', ar: 'اليد'},
  Ankle: {en: 'Ankle', ar: 'الكاحل'},
  Foot: {en: 'Foot', ar: 'القدم'},
  Neck: {en: 'Neck', ar: 'الرقبة'},
  Spine: {en: 'Spine', ar: 'العمود الفقري'},
  Back: {en: 'Back', ar: 'الظهر'},
  Chest: {en: 'Chest', ar: 'الصدر'},
  Pelvis: {en: 'Pelvis', ar: 'الحوض'},
  Thigh: {en: 'Thigh', ar: 'الفخذ'},
  Arm: {en: 'Arm', ar: 'الذراع'},
  'Whole body': {en: 'Whole Body', ar: 'الجسم بالكامل'},
  'Ankle & Foot': {en: 'Ankle & Foot', ar: 'الكاحل والقدم'},
  'Elbow & Wrist': {en: 'Elbow & Wrist', ar: 'الكوع والرسغ'},
  'Upper Limb': {en: 'Upper Limb', ar: 'الطرف العلوي'},
  'Lower Limb': {en: 'Lower Limb', ar: 'الطرف السفلي'},
  General: {en: 'General', ar: 'عام'},
};

const ACTIVITY_LABELS: Record<string, {en: string; ar: string}> = {
  Football: {en: 'Football', ar: 'كرة القدم'},
  Basketball: {en: 'Basketball', ar: 'كرة السلة'},
  'Pivoting sports': {en: 'Pivoting sports', ar: 'الرياضات التي تعتمد على اللف وتغيير الاتجاه'},
  Running: {en: 'Running', ar: 'الجري'},
  'Daily activity': {en: 'Daily activity', ar: 'الأنشطة اليومية'},
  'Field sports': {en: 'Field sports', ar: 'الرياضات الميدانية'},
  'Overhead sports': {en: 'Overhead sports', ar: 'الرياضات فوق الرأس'},
  'Gym training': {en: 'Gym training', ar: 'تدريبات الجيم'},
  'Manual work': {en: 'Manual work', ar: 'الأعمال اليدوية'},
  Sprinting: {en: 'Sprinting', ar: 'العدو السريع'},
  Track: {en: 'Track', ar: 'ألعاب المضمار'},
  Dance: {en: 'Dance', ar: 'الرقص'},
  'Rapid load spikes': {en: 'Rapid load spikes', ar: 'الزيادة المفاجئة في الحمل'},
  'Cutting sports': {en: 'Cutting sports', ar: 'رياضات التغيير الحاد للاتجاه'},
  'Falls': {en: 'Falls', ar: 'السقوط'},
  'Contact play': {en: 'Contact play', ar: 'اللعب بالتلامس'},
  'Overuse': {en: 'Overuse', ar: 'الإجهاد التكراري'},
  'Plyometric training': {en: 'Plyometric training', ar: 'التدريب البليوومتري'},
  'Repeated sport loading': {en: 'Repeated sport loading', ar: 'التحميل الرياضي المتكرر'},
  'Competitive sport': {en: 'Competitive sport', ar: 'الرياضة التنافسية'},
  'Youth sport': {en: 'Youth sport', ar: 'رياضة الشباب'},
  'School activity': {en: 'School activity', ar: 'النشاط المدرسي'},
};

export function translateCategory(category: string, lang: Language): string {
  const entry = CATEGORY_LABELS[category as InjuryTaxonomyKey];
  if (entry) return entry[lang];
  return category;
}

export function translateBodyRegion(region: string, lang: Language): string {
  const entry = BODY_REGION_LABELS[region as BodyRegionKey];
  if (entry) return entry[lang];
  return region;
}

export function translateActivityContext(item: string, lang: Language): string {
  if (lang !== 'ar') return item;
  return ACTIVITY_LABELS[item]?.ar || item;
}

export function inferBodyRegionFromProtocolRegion(region: string): BodyRegionKey {
  const normalized = region.trim();
  if (BODY_REGION_LABELS[normalized as BodyRegionKey]) {
    return normalized as BodyRegionKey;
  }

  const lower = normalized.toLowerCase();
  if (lower.includes('knee')) return 'Knee';
  if (lower.includes('shoulder')) return 'Shoulder';
  if (lower.includes('ankle') || lower.includes('foot')) return 'Ankle & Foot';
  if (lower.includes('spine')) return 'Spine';
  if (lower.includes('hip')) return 'Hip';
  if (lower.includes('elbow') || lower.includes('wrist')) return 'Elbow & Wrist';
  if (lower.includes('upper')) return 'Upper Limb';
  if (lower.includes('lower')) return 'Lower Limb';

  return 'General';
}
