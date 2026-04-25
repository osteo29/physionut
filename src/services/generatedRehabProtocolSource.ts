import type {TableRow} from '../lib/supabaseDatabase';
import type {InjuryPhase, InjuryProtocol, RecoveryWindow} from './injuryDatabase';
import {getAllInjuries} from './injuryDatabase';
import {generatedRehabProtocols} from './generatedRehabProtocols';
import {decodeMojibake} from './textEncoding';
import type {Language} from './translations';

export type RehabProtocolRow = TableRow<'protocols'>;
export type RehabPhaseRow = TableRow<'phases'>;
export type RehabExerciseRow = TableRow<'exercises'>;

type LocalNutritionMatch = InjuryProtocol & {
  score: number;
};

function cleanText(value: string | null | undefined) {
  return value ? decodeMojibake(value).trim() : '';
}

function cleanList(value: string[] | null | undefined) {
  return (value || []).map((item) => cleanText(item)).filter(Boolean);
}

export function getGeneratedRehabProtocolSlug(name: string) {
  return cleanText(name)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/["']/g, '')
    .replace(/[()]/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeForMatch(value: string) {
  return cleanText(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[()'".,]/g, ' ')
    .replace(/[^a-z0-9\s]+/g, ' ')
    .replace(/\b(post|postoperative|post-operative|conservative|grade|first|time|management|repair|reconstruction|rehabilitation|rehab|syndrome|injury)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value: string) {
  return normalizeForMatch(value)
    .split(' ')
    .filter((token) => token.length > 2);
}

export function inferGeneratedBodyRegion(category: string, fallback?: string) {
  const cleanCategory = cleanText(category) || cleanText(fallback);
  const normalized = cleanCategory.toLowerCase();

  if (normalized.includes('knee')) return 'Knee';
  if (normalized.includes('shoulder')) return 'Shoulder';
  if (normalized.includes('ankle')) return 'Ankle';
  if (normalized.includes('foot')) return 'Foot';
  if (normalized.includes('spine')) return 'Spine';
  if (normalized.includes('back')) return 'Back';
  if (normalized.includes('hip')) return 'Hip';
  if (normalized.includes('elbow')) return 'Elbow';
  if (normalized.includes('wrist')) return 'Wrist';
  if (normalized.includes('upper limb')) return 'Arm';
  if (normalized.includes('paediatric')) return 'Whole body';
  if (normalized.includes('neurological')) return 'Whole body';
  if (normalized.includes('sports')) return 'Whole body';

  return cleanCategory || 'Whole body';
}

export function inferGeneratedRecoveryWindow(timeline: string, phaseNumber: number, phaseCount: number): RecoveryWindow {
  const normalized = cleanText(timeline).toLowerCase();

  if (/0\s*[-–]?\s*(2|3)\s*(day|days)/.test(normalized) || normalized.includes('immediate') || normalized.includes('acute')) {
    return 'under_48h';
  }

  if (/week\s*0/.test(normalized) || /week\s*1/.test(normalized) || /week\s*2/.test(normalized) || /day\s*3/.test(normalized)) {
    return 'days_3_14';
  }

  if (/week\s*(3|4|5|6|7|8)/.test(normalized) || normalized.includes('month 2') || normalized.includes('early strengthening')) {
    return 'weeks_2_6';
  }

  if (/month/.test(normalized) || /week\s*(9|10|11|12)/.test(normalized) || normalized.includes('return to sport')) {
    return 'over_6_weeks';
  }

  if (phaseNumber <= 1) return 'under_48h';
  if (phaseNumber === phaseCount) return 'over_6_weeks';
  if (phaseNumber >= Math.ceil(phaseCount / 2)) return 'weeks_2_6';
  return 'days_3_14';
}

function findBestLocalNutritionMatch(name: string, category: string) {
  const remoteName = cleanText(name);
  const remoteTokens = new Set(tokenize(remoteName));
  const remoteBodyRegion = inferGeneratedBodyRegion(category);

  let bestMatch: LocalNutritionMatch | null = null;

  for (const local of getAllInjuries()) {
    const localName = cleanText(local.name);
    const localTokens = tokenize(localName);
    const localIdTokens = tokenize(local.id.replace(/_/g, ' '));
    const comparableTokens = new Set([...localTokens, ...localIdTokens]);

    let score = 0;
    if (normalizeForMatch(remoteName) === normalizeForMatch(localName)) score += 10;
    if (normalizeForMatch(remoteName) === normalizeForMatch(local.id.replace(/_/g, ' '))) score += 8;
    if (inferGeneratedBodyRegion(category) === local.bodyRegion) score += 2;

    for (const token of remoteTokens) {
      if (comparableTokens.has(token)) score += 1;
    }

    if (remoteBodyRegion === local.bodyRegion && comparableTokens.size > 0) score += 1;

    if (!bestMatch || score > bestMatch.score) {
      bestMatch = {...local, score};
    }
  }

  return bestMatch && bestMatch.score >= 3 ? bestMatch : null;
}

function getLocalizedNutritionArray(lang: Language, englishValues: string[], fallbackValues: string[]) {
  return lang === 'ar' && fallbackValues.length ? fallbackValues : englishValues;
}

function mapPhaseNutrition(phaseNumber: number, localMatch: InjuryProtocol | null, lang: Language) {
  const localPhase = localMatch?.phases[Math.min(Math.max(phaseNumber - 1, 0), (localMatch?.phases.length || 1) - 1)];

  if (!localPhase) {
    return {
      nutritionFocus: [],
      recommendedFoods: [],
      avoidFoods: [],
      supplements: [],
      prohibitedMovements: [],
      nutritionNotes: [],
      meals: {
        breakfast: '',
        lunch: '',
        dinner: '',
        shoppingList: [],
      },
      proteinPerKg: undefined,
      hydrationMlPerKg: undefined,
      omega3Grams: undefined,
      creatineGrams: undefined,
      collagenPerKg: undefined,
      vitaminCMg: undefined,
      calciumMg: undefined,
    };
  }

  return {
    nutritionFocus: getLocalizedNutritionArray(lang, localPhase.nutritionFocus, localPhase.nutritionFocus),
    recommendedFoods: getLocalizedNutritionArray(lang, localPhase.recommendedFoods, localPhase.recommendedFoods),
    avoidFoods: getLocalizedNutritionArray(lang, localPhase.avoidFoods, localPhase.avoidFoods),
    supplements: localPhase.supplements,
    prohibitedMovements: localPhase.prohibitedMovements,
    nutritionNotes: localPhase.nutritionNotes || [],
    meals: localPhase.meals,
    proteinPerKg: localPhase.proteinPerKg,
    hydrationMlPerKg: localPhase.hydrationMlPerKg,
    omega3Grams: localPhase.omega3Grams,
    creatineGrams: localPhase.creatineGrams,
    collagenPerKg: localPhase.collagenPerKg,
    vitaminCMg: localPhase.vitaminCMg,
    calciumMg: localPhase.calciumMg,
  };
}

function buildOverview(name: string, category: string, phaseCount: number) {
  const region = inferGeneratedBodyRegion(category);
  return `${cleanText(name)} is a structured rehab protocol for the ${region.toLowerCase()} with ${phaseCount} staged rehab phase${phaseCount === 1 ? '' : 's'}.`;
}

export function getGeneratedRehabProtocolRows(): RehabProtocolRow[] {
  return generatedRehabProtocols.map((protocol, index) => ({
    id: index + 1,
    name: cleanText(protocol.name),
    category: cleanText(protocol.category),
    description: null,
    created_at: null,
  }));
}

export function getGeneratedRehabPhaseRows(protocolId: number): RehabPhaseRow[] {
  const protocol = generatedRehabProtocols[protocolId - 1];
  if (!protocol) return [];

  return protocol.phases.map((phase, index) => ({
    id: protocolId * 100 + index + 1,
    protocol_id: protocolId,
    phase_number: phase.phaseNumber,
    title: cleanText(phase.title),
    timeline: cleanText(phase.timeline),
    goals: cleanList(phase.goals),
    precautions: cleanList(phase.precautions),
    criteria_to_progress: cleanList(phase.criteriaToProgress),
    created_at: null,
  }));
}

export function getGeneratedRehabExerciseRows(phaseIds: number[]): RehabExerciseRow[] {
  const wanted = new Set(phaseIds);
  const rows: RehabExerciseRow[] = [];

  generatedRehabProtocols.forEach((protocol, protocolIndex) => {
    protocol.phases.forEach((phase, phaseIndex) => {
      const phaseId = (protocolIndex + 1) * 100 + phaseIndex + 1;
      if (!wanted.has(phaseId)) return;

      phase.exercises.forEach((exercise, exerciseIndex) => {
        rows.push({
          id: phaseId * 1000 + exerciseIndex + 1,
          phase_id: phaseId,
          name: cleanText(exercise.name),
          parameters: cleanText(exercise.parameters) || null,
          clinical_cue_rationale: cleanText(exercise.clinicalCueRationale) || null,
          created_at: null,
        });
      });
    });
  });

  return rows;
}

function mapGeneratedProtocol(protocolId: number, lang: Language): InjuryProtocol | null {
  const protocol = generatedRehabProtocols[protocolId - 1];
  if (!protocol) return null;

  const localNutritionMatch = findBestLocalNutritionMatch(protocol.name, protocol.category);
  const bodyRegion = localNutritionMatch?.bodyRegion || inferGeneratedBodyRegion(protocol.category);
  const category = localNutritionMatch?.category || cleanText(protocol.category) || bodyRegion;

  const mappedPhases: InjuryPhase[] = protocol.phases.map((phase, index) => {
    const nutrition = mapPhaseNutrition(phase.phaseNumber, localNutritionMatch, lang);

    return {
      id: `protocol-${protocolId}-phase-${phase.phaseNumber}`,
      label: cleanText(phase.title),
      duration: cleanText(phase.timeline),
      window: inferGeneratedRecoveryWindow(cleanText(phase.timeline), phase.phaseNumber, protocol.phases.length),
      goals: cleanList(phase.goals),
      nutritionFocus: nutrition.nutritionFocus,
      recommendedFoods: nutrition.recommendedFoods,
      avoidFoods: nutrition.avoidFoods,
      supplements: nutrition.supplements,
      exercises: phase.exercises.map((exercise) => cleanText(exercise.name)),
      prohibitedMovements: nutrition.prohibitedMovements,
      exercisePlans: phase.exercises.map((exercise) => ({
        label: cleanText(exercise.name),
        sets: cleanText(exercise.parameters) || undefined,
        cues: cleanText(exercise.clinicalCueRationale) ? [cleanText(exercise.clinicalCueRationale)] : [],
      })),
      focus: index === 0 ? buildOverview(protocol.name, protocol.category, protocol.phases.length) : undefined,
      progressionMarkers: cleanList(phase.criteriaToProgress),
      cautions: cleanList(phase.precautions),
      nutritionNotes: nutrition.nutritionNotes,
      meals: nutrition.meals,
      proteinPerKg: nutrition.proteinPerKg,
      hydrationMlPerKg: nutrition.hydrationMlPerKg,
      omega3Grams: nutrition.omega3Grams,
      creatineGrams: nutrition.creatineGrams,
      collagenPerKg: nutrition.collagenPerKg,
      vitaminCMg: nutrition.vitaminCMg,
      calciumMg: nutrition.calciumMg,
    };
  });

  return {
    id: getGeneratedRehabProtocolSlug(protocol.name).replace(/-/g, '_'),
    name: cleanText(protocol.name),
    category: category as InjuryProtocol['category'],
    bodyRegion: bodyRegion as InjuryProtocol['bodyRegion'],
    commonIn: [],
    overview: buildOverview(protocol.name, protocol.category, mappedPhases.length),
    rehabSummary: mappedPhases.length
      ? `Structured ${mappedPhases.length}-phase rehab progression with goals, precautions, criteria to progress, and exercise cues.`
      : 'Structured rehab progression.',
    redFlags: [],
    relatedCalculators: ['Protein intake', 'Water intake'],
    safetyNotes: localNutritionMatch?.safetyNotes || {medications: [], supplements: []},
    contraindications: localNutritionMatch?.contraindications || {medications: [], supplements: []},
    phases: mappedPhases,
    pageContent: localNutritionMatch?.pageContent
      ? {
          nutritionNotes: localNutritionMatch.pageContent.nutritionNotes,
        }
      : undefined,
  };
}

export function getGeneratedInjuryProtocolBySlug(slug: string, lang: Language): InjuryProtocol | null {
  const protocolId = getGeneratedRehabProtocolRows().find((row) => getGeneratedRehabProtocolSlug(row.name) === slug)?.id;
  return protocolId ? mapGeneratedProtocol(protocolId, lang) : null;
}

export function getGeneratedInjuryProtocols(lang: Language): InjuryProtocol[] {
  return getGeneratedRehabProtocolRows()
    .map((row) => mapGeneratedProtocol(row.id, lang))
    .filter((protocol): protocol is InjuryProtocol => Boolean(protocol));
}
