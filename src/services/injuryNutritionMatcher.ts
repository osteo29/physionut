import type {InjuryPhase, InjuryProtocol} from './injuryDatabase';

export type NutritionGoalKey =
  | 'anti-inflammatory'
  | 'tendon-healing'
  | 'bone-repair'
  | 'recovery-calories';

export type NutritionGoalMatch = {
  key: NutritionGoalKey;
  label: string;
  reason: string;
  priority: number;
};

function includesAny(value: string, terms: string[]) {
  const normalized = value.toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function phaseText(phase: InjuryPhase) {
  return [
    phase.label,
    phase.duration,
    ...phase.goals,
    ...phase.nutritionFocus,
    ...phase.recommendedFoods,
    ...phase.avoidFoods,
    ...phase.supplements.map((item) => `${item.name} ${item.reason}`),
  ].join(' ');
}

export function getNutritionGoalMatches(injury: InjuryProtocol, phase: InjuryPhase): NutritionGoalMatch[] {
  const injuryText = `${injury.id} ${injury.name} ${injury.category} ${injury.bodyRegion} ${injury.overview} ${injury.rehabSummary}`;
  const combinedText = `${injuryText} ${phaseText(phase)}`;
  const matches: NutritionGoalMatch[] = [];

  if (
    phase.window === 'under_48h' ||
    phase.omega3Grams ||
    includesAny(combinedText, ['inflam', 'swelling', 'pain', 'omega-3', 'omega 3', 'curcumin'])
  ) {
    matches.push({
      key: 'anti-inflammatory',
      label: 'Anti-inflammatory support',
      reason: 'Prioritize omega-3 rich foods, colorful plants, hydration, and fewer alcohol/ultra-processed meals to help calm early irritation without under-fueling repair.',
      priority: phase.window === 'under_48h' ? 95 : 75,
    });
  }

  if (
    injury.category === 'Tendon' ||
    phase.collagenPerKg ||
    includesAny(combinedText, ['tendon', 'tendinopathy', 'collagen', 'ligament', 'connective tissue'])
  ) {
    matches.push({
      key: 'tendon-healing',
      label: 'Tendon and collagen healing',
      reason: 'Connective tissue phases benefit from steady protein and collagen plus vitamin C before loading sessions when tolerated.',
      priority: injury.category === 'Tendon' ? 100 : 82,
    });
  }

  if (
    injury.category === 'Bone' ||
    phase.calciumMg ||
    includesAny(combinedText, ['fracture', 'bone', 'calcium', 'vitamin d', 'stress reaction'])
  ) {
    matches.push({
      key: 'bone-repair',
      label: 'Bone repair nutrients',
      reason: 'Bone recovery depends on enough calories, protein, calcium, vitamin D status, and avoiding prolonged low-energy availability.',
      priority: injury.category === 'Bone' ? 100 : 84,
    });
  }

  matches.push({
    key: 'recovery-calories',
    label: 'Recovery calories',
    reason: 'Keep meals regular and protein distributed so the body has enough energy to rebuild tissue while rehab load increases.',
    priority: includesAny(combinedText, ['return', 'strength', 'sport', 'post-op', 'surgery']) ? 88 : 65,
  });

  return matches
    .filter((item, index, list) => list.findIndex((entry) => entry.key === item.key) === index)
    .sort((left, right) => right.priority - left.priority);
}
