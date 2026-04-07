export const EXERCISE_ROUTE_ALIASES: Record<string, string> = {
  'lower-back': 'lower_back',
};

export function normalizeExerciseUrlSlug(slug: string) {
  return slug === 'lower_back' ? 'lower-back' : slug;
}

export function denormalizeExerciseUrlSlug(slug: string) {
  return EXERCISE_ROUTE_ALIASES[slug] || slug;
}

export const INJURY_CANONICAL_PARENT_MAP: Record<string, string> = {
  ac_joint_sprain: 'ac_joint_injury',
  chronic_ankle_instability: 'ankle_instability',
  neck_muscle_strain: 'neck_pain',
  runners_knee_patellar_tendon: 'patellar_tendinopathy',
  jumpers_knee: 'patellar_tendinopathy',
  swimmer_shoulder_impingement: 'shoulder_impingement',
  overhead_throwers_shoulder: 'shoulder_impingement',
  rotator_cuff_labrum_complex: 'rotator_cuff',
  rotator_cuff_repair: 'rotator_cuff',
};
