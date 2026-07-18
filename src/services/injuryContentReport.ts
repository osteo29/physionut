import rehabExerciseLibrary from '../../json/library_v3.json';
import rehabProtocolsJson from '../../json/protocols_v3.json';
import {getAllInjuries, getInjurySlug, type InjuryProtocol} from './injuryDatabase';
import {getInjuryExerciseLinks} from './injuryExerciseLinks';
import {injuryExerciseProtocolOverrides} from './injuryExerciseProtocolOverrides';
import {getInjuryRehabLinks} from './injuryRehabLinks';

type JsonExerciseLibraryEntry = {
  id: string;
  canonical_name?: string;
};

type JsonProtocolExercise = {
  exercise_ref: string;
};

type JsonProtocolPhase = {
  title?: string;
  exercises?: JsonProtocolExercise[];
};

type JsonProtocol = {
  slug: string;
  title: string;
  phases?: JsonProtocolPhase[];
};

export type InjuryReportItem = {
  id: string;
  name: string;
  slug: string;
  category: string;
  bodyRegion: string;
  score?: number;
  reasons: string[];
};

export type DuplicateInjuryCandidate = {
  key: string;
  injuries: InjuryReportItem[];
};

export type UnlinkedExerciseItem = {
  protocolSlug: string;
  protocolTitle: string;
  phaseTitle: string;
  exerciseRef: string;
};

export type InjuryContentReport = {
  generatedAt: string;
  totals: {
    injuries: number;
    phases: number;
    importedExerciseProtocols: number;
    missingNutritionPlans: number;
    missingImportedExerciseProtocols: number;
    possibleDuplicateGroups: number;
    shortProtocols: number;
    unlinkedExercises: number;
  };
  topMissingContent: InjuryReportItem[];
  possibleDuplicates: DuplicateInjuryCandidate[];
  shortProtocols: InjuryReportItem[];
  unlinkedExercises: UnlinkedExerciseItem[];
};

const rehabProtocols = rehabProtocolsJson as JsonProtocol[];
const rehabLibrary = rehabExerciseLibrary as JsonExerciseLibraryEntry[];

function normalizeKey(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\b(acute|chronic|grade|post|postoperative|post-operative|conservative|rehab|rehabilitation|injury|syndrome)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getMissingNutritionReasons(injury: InjuryProtocol) {
  const reasons = new Set<string>();

  injury.phases.forEach((phase, index) => {
    const label = phase.label || `Phase ${index + 1}`;
    if (!phase.nutritionFocus?.length) reasons.add(`${label}: missing nutrition focus`);
    if (!phase.recommendedFoods?.length) reasons.add(`${label}: missing recommended foods`);
    if (!phase.avoidFoods?.length) reasons.add(`${label}: missing avoid-food guidance`);
    if (!phase.supplements?.length) reasons.add(`${label}: missing supplement notes`);
    if (!phase.meals?.breakfast || !phase.meals?.lunch || !phase.meals?.dinner) reasons.add(`${label}: incomplete meal examples`);
  });

  return [...reasons];
}

function countDetailedExercisePlans(injury: InjuryProtocol) {
  return injury.phases.reduce((total, phase) => total + (phase.exercisePlans?.length || 0), 0);
}

function hasPublicExerciseLinks(injury: InjuryProtocol) {
  return (
    getInjuryExerciseLinks({injuryId: injury.id, bodyRegion: injury.bodyRegion, lang: 'en'}).length > 0 ||
    getInjuryRehabLinks({injuryId: injury.id, bodyRegion: injury.bodyRegion, lang: 'en'}).length > 0
  );
}

function toReportItem(injury: InjuryProtocol, reasons: string[], score?: number): InjuryReportItem {
  return {
    id: injury.id,
    name: injury.name,
    slug: getInjurySlug(injury),
    category: injury.category,
    bodyRegion: injury.bodyRegion,
    score,
    reasons,
  };
}

function buildTopMissingContent(injuries: InjuryProtocol[], importedIds: Set<string>) {
  return injuries
    .map((injury) => {
      const reasons = getMissingNutritionReasons(injury);
      const detailedExercisePlans = countDetailedExercisePlans(injury);

      if (!importedIds.has(injury.id)) reasons.push('Missing imported exercise protocol');
      if (detailedExercisePlans === 0) reasons.push('No detailed exercise plans on phases');
      if (!hasPublicExerciseLinks(injury)) reasons.push('No public exercise or rehab links');
      if (!injury.pageContent?.intro) reasons.push('Missing page intro content');
      if (!injury.pageContent?.faq?.length) reasons.push('Missing FAQ content');

      return toReportItem(injury, reasons, reasons.length);
    })
    .filter((item) => (item.score || 0) > 0)
    .sort((left, right) => (right.score || 0) - (left.score || 0) || left.name.localeCompare(right.name))
    .slice(0, 20);
}

function buildDuplicateCandidates(injuries: InjuryProtocol[]) {
  const groups = new Map<string, InjuryProtocol[]>();

  for (const injury of injuries) {
    const key = normalizeKey(injury.name);
    if (!key) continue;
    groups.set(key, [...(groups.get(key) || []), injury]);
  }

  return [...groups.entries()]
    .filter(([, group]) => group.length > 1)
    .map(([key, group]) => ({
      key,
      injuries: group.map((injury) => toReportItem(injury, ['Similar normalized injury title'])),
    }))
    .sort((left, right) => right.injuries.length - left.injuries.length || left.key.localeCompare(right.key));
}

function buildShortProtocols(injuries: InjuryProtocol[], importedIds: Set<string>) {
  return injuries
    .map((injury) => {
      const reasons: string[] = [];
      const detailedExercisePlans = countDetailedExercisePlans(injury);
      const phaseCount = injury.phases.length;

      if (phaseCount < 3) reasons.push(`Only ${phaseCount} phase${phaseCount === 1 ? '' : 's'}`);
      if (detailedExercisePlans < 3) reasons.push(`Only ${detailedExercisePlans} detailed exercise plan${detailedExercisePlans === 1 ? '' : 's'}`);
      if (!importedIds.has(injury.id)) reasons.push('No imported exercise protocol');

      return toReportItem(injury, reasons, reasons.length);
    })
    .filter((item) => (item.score || 0) > 0)
    .sort((left, right) => (right.score || 0) - (left.score || 0) || left.name.localeCompare(right.name))
    .slice(0, 20);
}

function buildUnlinkedExercises() {
  const libraryIds = new Set(rehabLibrary.map((entry) => entry.id));
  const items: UnlinkedExerciseItem[] = [];

  for (const protocol of rehabProtocols) {
    for (const phase of protocol.phases || []) {
      for (const exercise of phase.exercises || []) {
        if (!libraryIds.has(exercise.exercise_ref)) {
          items.push({
            protocolSlug: protocol.slug,
            protocolTitle: protocol.title,
            phaseTitle: phase.title || 'Untitled phase',
            exerciseRef: exercise.exercise_ref,
          });
        }
      }
    }
  }

  return items.sort((left, right) => left.protocolTitle.localeCompare(right.protocolTitle));
}

export function buildInjuryContentReport(now = new Date()): InjuryContentReport {
  const injuries = getAllInjuries();
  const importedIds = new Set(Object.keys(injuryExerciseProtocolOverrides));
  const topMissingContent = buildTopMissingContent(injuries, importedIds);
  const possibleDuplicates = buildDuplicateCandidates(injuries);
  const shortProtocols = buildShortProtocols(injuries, importedIds);
  const unlinkedExercises = buildUnlinkedExercises();
  const missingNutritionPlans = injuries.filter((injury) => getMissingNutritionReasons(injury).length > 0).length;
  const missingImportedExerciseProtocols = injuries.filter((injury) => !importedIds.has(injury.id)).length;

  return {
    generatedAt: now.toISOString(),
    totals: {
      injuries: injuries.length,
      phases: injuries.reduce((total, injury) => total + injury.phases.length, 0),
      importedExerciseProtocols: importedIds.size,
      missingNutritionPlans,
      missingImportedExerciseProtocols,
      possibleDuplicateGroups: possibleDuplicates.length,
      shortProtocols: shortProtocols.length,
      unlinkedExercises: unlinkedExercises.length,
    },
    topMissingContent,
    possibleDuplicates,
    shortProtocols,
    unlinkedExercises,
  };
}
