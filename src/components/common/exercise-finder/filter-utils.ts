import {TRAINING_SYSTEMS} from './data/training-systems';
import {WEEKLY_PLANS} from './data/weekly-plans';
import {
  EXERCISE_FINDER_STATIC_LABELS,
  EXERCISE_FINDER_STATIC_SLUGS,
  INITIAL_FILTERS,
  MUSCLE_TREE,
  STATIC_GROUP_MUSCLES,
} from './constants';
import type {Exercise, FilterState, MainMuscle, StaticMuscleSlug, SubMuscle, TrainingSystem, WeeklyPlan} from './types';

export function normalizeValue(value: string | null | undefined) {
  return (value || '').trim().toLowerCase();
}

export function toTitle(value: string) {
  return value.replace(/_/g, ' ');
}

export function isMainMuscle(value: string): value is MainMuscle {
  return value in MUSCLE_TREE;
}

export function isSubMuscle(value: string): value is SubMuscle {
  return Object.values(MUSCLE_TREE).some((items) => items.includes(value as never));
}

export function isStaticSlug(value: string | null | undefined): value is StaticMuscleSlug {
  return Boolean(value && value in EXERCISE_FINDER_STATIC_LABELS);
}

export function translateBadge(value: string, isAr: boolean): string {
  if (!isAr) return value;
  const map: Record<string, string> = {
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم',
    bodyweight: 'وزن الجسم',
    dumbbell: 'دمبل',
    barbell: 'بار',
    machine: 'جهاز',
    band: 'مطاط',
    strength: 'قوة',
    hypertrophy: 'ضخامة',
    endurance: 'تحمل',
    'multi-muscle': 'متعدد',
  };
  return map[value] || value;
}

export function getStaticSlugFilters(
  slug: StaticMuscleSlug | null | undefined,
): {muscle: MainMuscle | 'all'; staticMuscles: MainMuscle[]} | null {
  if (!slug || !isStaticSlug(slug)) return null;

  const muscles = STATIC_GROUP_MUSCLES[slug];
  return {
    muscle: muscles.length === 1 ? muscles[0] : 'all',
    staticMuscles: muscles,
  };
}

export function readFiltersFromUrl(pathMuscle?: StaticMuscleSlug | null): FilterState {
  const fallback = getStaticSlugFilters(pathMuscle);
  const base: FilterState = {
    ...INITIAL_FILTERS,
    muscle: fallback?.muscle || 'all',
  };

  if (typeof window === 'undefined') return base;

  const params = new URLSearchParams(window.location.search);
  const muscle = normalizeValue(params.get('muscle'));
  const level = normalizeValue(params.get('level'));
  const equipment = normalizeValue(params.get('equipment'));
  const exerciseType = normalizeValue(params.get('type'));
  const search = params.get('search') || '';

  if (isMainMuscle(muscle)) {
    base.muscle = muscle;
  } else if (isSubMuscle(muscle)) {
    base.subMuscle = muscle;
    const parent = (Object.entries(MUSCLE_TREE).find(([, items]) => items.includes(muscle as never))?.[0] ||
      'all') as MainMuscle | 'all';
    base.muscle = parent;
  }

  if (level === 'beginner' || level === 'intermediate' || level === 'advanced') {
    base.level = level;
  }
  if (equipment === 'bodyweight' || equipment === 'dumbbell' || equipment === 'barbell' || equipment === 'machine' || equipment === 'band') {
    base.equipment = equipment;
  }
  if (exerciseType === 'strength' || exerciseType === 'hypertrophy' || exerciseType === 'endurance') {
    base.exerciseType = exerciseType;
  }
  if (search.trim()) {
    base.search = search;
  }

  return base;
}

export function syncFiltersToUrl(filters: FilterState, pathMuscle?: StaticMuscleSlug | null) {
  if (typeof window === 'undefined') return;

  const nextUrl = new URL(window.location.href);
  const staticContext = getStaticSlugFilters(pathMuscle);
  const defaultMainMuscle = staticContext?.muscle || 'all';

  if (filters.subMuscle !== 'all') {
    nextUrl.searchParams.set('muscle', filters.subMuscle);
  } else if (filters.muscle !== 'all' && filters.muscle !== defaultMainMuscle) {
    nextUrl.searchParams.set('muscle', filters.muscle);
  } else {
    nextUrl.searchParams.delete('muscle');
  }

  if (filters.level !== 'all') nextUrl.searchParams.set('level', filters.level);
  else nextUrl.searchParams.delete('level');

  if (filters.equipment !== 'all') nextUrl.searchParams.set('equipment', filters.equipment);
  else nextUrl.searchParams.delete('equipment');

  if (filters.exerciseType !== 'all') nextUrl.searchParams.set('type', filters.exerciseType);
  else nextUrl.searchParams.delete('type');

  if (filters.search.trim()) nextUrl.searchParams.set('search', filters.search.trim());
  else nextUrl.searchParams.delete('search');

  window.history.replaceState({}, '', nextUrl.toString());
}

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function createStructuredData(
  title: string,
  description: string,
  canonicalPath: string,
  exercises: Exercise[],
  siteOrigin = 'https://www.physionutrition.com',
) {
  const pageUrl = `${siteOrigin}${canonicalPath}`;

  return [
    {
      id: 'exercise-finder-page',
      json: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description,
        url: pageUrl,
        numberOfItems: exercises.length,
      },
    },
    {
      id: 'exercise-finder-item-list',
      json: {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: title,
        description,
        url: pageUrl,
        numberOfItems: exercises.length,
        itemListElement: exercises.slice(0, 24).map((exercise, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: exercise.name,
          description: exercise.description,
          url: `${pageUrl}/${toSlug(exercise.name)}`,
        })),
      },
    },
    {
      id: 'exercise-finder-faq',
      json: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I find exercises for a specific muscle group?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Use the muscle group filter on the left to select your target muscle. You can further narrow results by sub-muscle, difficulty level, equipment available, and training goal (strength, hypertrophy, or endurance).',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I find exercises without gym equipment?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Select "Bodyweight" or "Band" in the equipment filter to see exercises that require no gym machines or barbells.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between strength, hypertrophy, and endurance exercises?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Strength exercises use heavy loads for low reps (1-5) to build maximal force. Hypertrophy exercises use moderate loads for medium reps (8-12) to build muscle size. Endurance exercises use lighter loads for high reps (15+) to build stamina and work capacity.',
            },
          },
        ],
      },
    },
  ];
}

export function getRecommendedSystems({
  filters,
  selectedStaticGroup,
}: {
  filters: FilterState;
  selectedStaticGroup: StaticMuscleSlug | null;
}) {
  const matches = TRAINING_SYSTEMS.filter((system) => {
    const matchesLevel = filters.level === 'all' || system.levels.includes(filters.level);
    const matchesEquipment =
      filters.equipment === 'all' || system.equipment === 'mixed' || system.equipment === filters.equipment;
    const matchesFocus =
      filters.exerciseType === 'all' || system.focus === 'mixed' || system.focus === filters.exerciseType;
    const matchesMuscle = !selectedStaticGroup || system.muscleGroups.includes(selectedStaticGroup);

    return matchesLevel && matchesEquipment && matchesFocus && matchesMuscle;
  });

  return (matches.length > 0 ? matches : TRAINING_SYSTEMS).slice(0, 4);
}

export function getWeeklyPlans(systems: TrainingSystem[]) {
  return systems
    .map((system) => {
      const plan = WEEKLY_PLANS.find((item) => item.systemId === system.id);
      if (!plan) return null;

      return {
        system,
        plan,
      };
    })
    .filter((item): item is {system: TrainingSystem; plan: WeeklyPlan} => Boolean(item))
    .slice(0, 2);
}

export {EXERCISE_FINDER_STATIC_SLUGS};
