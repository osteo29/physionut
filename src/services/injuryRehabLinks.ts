import {navigationPaths} from '../utils/langUrlHelper';
import type {StaticMuscleSlug} from '../components/common/exercise-finder/types';

type Language = 'en' | 'ar';

type RehabSlug = Extract<StaticMuscleSlug, 'neck' | 'hip' | 'wrist-rehab' | 'full-body-rehab'>;

type RehabRecommendationSeed = {
  slug: RehabSlug;
  reason: string;
  reasonAr: string;
};

export type InjuryRehabLink = {
  slug: RehabSlug;
  label: string;
  href: string;
  reason: string;
};

const REHAB_LABELS: Record<RehabSlug, {en: string; ar: string}> = {
  neck: {en: 'Neck rehab', ar: 'تأهيل الرقبة'},
  hip: {en: 'Hip rehab', ar: 'تأهيل الورك'},
  'wrist-rehab': {en: 'Wrist rehab', ar: 'تأهيل الرسغ'},
  'full-body-rehab': {en: 'Full-body rehab', ar: 'تأهيل الجسم بالكامل'},
};

const SPECIFIC_INJURY_MAP: Record<string, RehabRecommendationSeed[]> = {
  neck_pain: [
    {slug: 'neck', reason: 'Useful for graded neck loading, posture support, and shoulder-blade control.', reasonAr: 'مفيدة للتحميل التدريجي للرقبة ودعم الوضعية والتحكم في لوح الكتف.'},
  ],
  neck_muscle_strain: [
    {slug: 'neck', reason: 'Helps reintroduce neck control and low-irritation upper-quarter loading.', reasonAr: 'تساعد على إعادة إدخال التحكم في الرقبة وتحميل الجزء العلوي بشكل منخفض الاستثارة.'},
  ],
  adductor_strain: [
    {slug: 'hip', reason: 'Supports groin-sensitive hip loading and single-leg control progressions.', reasonAr: 'تدعم تحميل الورك الحساس لمنطقة المغبن وتدرجات التحكم على رجل واحدة.'},
  ],
  glute_strain: [
    {slug: 'hip', reason: 'Matches gradual hip loading and pelvic stability rebuilding.', reasonAr: 'تتناسب مع التحميل التدريجي للورك وإعادة بناء ثبات الحوض.'},
  ],
  glute_tendinopathy: [
    {slug: 'hip', reason: 'Useful for hip stability, glute loading, and irritability-aware progression.', reasonAr: 'مفيدة لثبات الورك وتحميل الألوية والتدرج حسب استثارة الأعراض.'},
  ],
  hip_flexor_tendinopathy: [
    {slug: 'hip', reason: 'Supports controlled hip flexion loading and trunk-assisted progressions.', reasonAr: 'تدعم التحميل المنضبط لثني الورك والتدرجات المدعومة بالتحكم في الجذع.'},
  ],
  hamstring_tendon_injury: [
    {slug: 'hip', reason: 'Helps reconnect posterior-chain loading around the hip before higher-speed demands.', reasonAr: 'تساعد على إعادة ربط تحميل السلسلة الخلفية حول الورك قبل متطلبات السرعة الأعلى.'},
  ],
  hip_dysplasia_labral_tear: [
    {slug: 'hip', reason: 'Useful for symptom-guided hip control and range progression.', reasonAr: 'مفيدة للتحكم في الورك وتدرج المدى الحركي حسب استجابة الأعراض.'},
  ],
  it_band_syndrome: [
    {slug: 'hip', reason: 'Often benefits from hip stability and glute control work.', reasonAr: 'تستفيد غالبًا من عمل ثبات الورك والتحكم في الألوية.'},
  ],
  geriatric_hip_fracture: [
    {slug: 'hip', reason: 'Supports conservative hip rebuilding once loading is medically allowed.', reasonAr: 'تدعم إعادة بناء الورك بشكل محافظ عندما يُسمح بالتحميل طبيًا.'},
    {slug: 'full-body-rehab', reason: 'Useful when rebuilding global movement after time off and deconditioning.', reasonAr: 'مفيدة عند إعادة بناء حركة الجسم بالكامل بعد الانقطاع وفقدان اللياقة.'},
  ],
  forearm_strain: [
    {slug: 'wrist-rehab', reason: 'Supports grip tolerance and forearm loading without rushing pressure work.', reasonAr: 'تدعم تحمل القبضة وتحميل الساعد دون التسرع في تحميل الضغط على اليد.'},
  ],
  wrist_instability_tfcc: [
    {slug: 'wrist-rehab', reason: 'Useful for graded wrist stability and cautious return to loading through the hand.', reasonAr: 'مفيدة لثبات الرسغ التدريجي والعودة الحذرة للتحميل عبر اليد.'},
  ],
  carpal_tunnel_syndrome: [
    {slug: 'wrist-rehab', reason: 'Can complement grip and wrist loading when symptoms allow.', reasonAr: 'يمكن أن تكمل عمل القبضة وتحميل الرسغ عندما تسمح الأعراض.'},
  ],
  gymnast_wrist_injury: [
    {slug: 'wrist-rehab', reason: 'Useful before returning to higher wrist extension and bodyweight pressure tasks.', reasonAr: 'مفيدة قبل العودة إلى مد الرسغ العالي ومهام الضغط بوزن الجسم.'},
  ],
  scaphoid_fracture: [
    {slug: 'wrist-rehab', reason: 'Supports cautious wrist and grip reloading after fracture healing progresses.', reasonAr: 'تدعم إعادة تحميل الرسغ والقبضة بحذر بعد تقدم التئام الكسر.'},
  ],
  ankle_sprain: [
    {slug: 'full-body-rehab', reason: 'Useful when rebuilding gait, balance, and confidence after lower-limb injury.', reasonAr: 'مفيدة عند إعادة بناء المشي والتوازن والثقة بعد إصابة الطرف السفلي.'},
  ],
  acl_injury: [
    {slug: 'full-body-rehab', reason: 'Helps bridge local knee rehab toward broader return-to-training demands.', reasonAr: 'تساعد على نقل تأهيل الركبة من الطابع الموضعي إلى العودة الأوسع للتدريب.'},
  ],
  acl_reconstruction: [
    {slug: 'full-body-rehab', reason: 'Useful when progressing from post-op rehab into whole-body training structure.', reasonAr: 'مفيدة عند الانتقال من التأهيل بعد الجراحة إلى هيكل تدريب يشمل الجسم بالكامل.'},
  ],
  low_back_pain: [
    {slug: 'full-body-rehab', reason: 'Supports reintroducing trunk, hip, and gait load in a conservative weekly structure.', reasonAr: 'تدعم إعادة إدخال تحميل الجذع والورك والمشية ضمن هيكل أسبوعي محافظ.'},
  ],
  stress_fracture: [
    {slug: 'full-body-rehab', reason: 'Useful when returning to full-body training after a protected healing window.', reasonAr: 'مفيدة عند العودة لتدريب الجسم بالكامل بعد فترة التئام محمية.'},
  ],
  rotator_cuff: [
    {slug: 'full-body-rehab', reason: 'Useful when transitioning from shoulder-specific rehab into broader training tolerance.', reasonAr: 'مفيدة عند الانتقال من تأهيل الكتف الموضعي إلى تحمل تدريبي أوسع.'},
  ],
  hamstring_strain: [
    {slug: 'full-body-rehab', reason: 'Helps bridge posterior-chain rehab back into running and full-body loading.', reasonAr: 'تساعد على ربط تأهيل السلسلة الخلفية بالعودة للجري وتحميل الجسم بالكامل.'},
    {slug: 'hip', reason: 'Useful when hip control and posterior-chain support are limiting return to speed.', reasonAr: 'مفيدة عندما يكون التحكم في الورك ودعم السلسلة الخلفية عاملًا محددًا للعودة للسرعة.'},
  ],
};

const BODY_REGION_MAP: Partial<Record<string, RehabRecommendationSeed[]>> = {
  Neck: [{slug: 'neck', reason: 'Guided neck rehab is often the best match for this region.', reasonAr: 'تأهيل الرقبة الموجه هو غالبًا الأنسب لهذه المنطقة.'}],
  Hip: [{slug: 'hip', reason: 'Hip rehab offers more symptom-aware loading than general exercise browsing.', reasonAr: 'تأهيل الورك يقدم تحميلًا أكثر مراعاة للأعراض من التصفح العام للتمارين.'}],
  Wrist: [{slug: 'wrist-rehab', reason: 'Wrist rehab usually matches the loading needs of this region better than generic arm work.', reasonAr: 'تأهيل الرسغ يطابق احتياجات التحميل لهذه المنطقة أفضل من تمارين الذراع العامة.'}],
};

function uniqueSeeds(items: RehabRecommendationSeed[]) {
  return items.filter((item, index) => items.findIndex((entry) => entry.slug === item.slug) === index);
}

export function getInjuryRehabLinks({
  injuryId,
  bodyRegion,
  lang,
}: {
  injuryId: string;
  bodyRegion: string;
  lang: Language;
}): InjuryRehabLink[] {
  const seeds = uniqueSeeds([...(SPECIFIC_INJURY_MAP[injuryId] || []), ...(BODY_REGION_MAP[bodyRegion] || [])]).slice(0, 2);

  return seeds.map((item) => ({
    slug: item.slug,
    label: REHAB_LABELS[item.slug][lang],
    href: navigationPaths.exercisesMuscle(lang, item.slug),
    reason: lang === 'ar' ? item.reasonAr : item.reason,
  }));
}
