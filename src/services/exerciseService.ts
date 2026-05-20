import {
  MAIN_MUSCLE_TO_STATIC_GROUP,
  STATIC_GROUP_MUSCLES,
} from '../components/common/exercise-finder/constants';
import {
  EXERCISES as STATIC_EXERCISES,
  POPULAR_BY_MUSCLE,
} from '../components/common/exercise-finder/data/exercises';
import type {
  Exercise,
  MainMuscle,
  StaticMuscleSlug,
} from '../components/common/exercise-finder/types';
import {
  fetchExerciseLibraryEntriesFromSupabase,
  type ExerciseLibraryRow,
} from './exerciseSupabaseService';

export type ExerciseSource = 'static' | 'supabase';
export type ExerciseDataSource = 'static' | 'supabase';

export type ExerciseRecord = Exercise & {
  slug: string;
  region: StaticMuscleSlug;
  source: ExerciseSource;
};

type ExerciseProvider = {
  listExercises: () => Promise<ExerciseRecord[]>;
};

type ExerciseCatalogDriftSummary = {
  comparedRegions: StaticMuscleSlug[];
  staticCount: number;
  hydratedCount: number;
  missingSlugs: string[];
  unexpectedSlugs: string[];
  missingThumbnails: string[];
  invalidRegions: string[];
};

function normalizeExerciseSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function createExerciseRecord(
  exercise: Exercise,
  slug: string,
  source: ExerciseSource = 'static',
): ExerciseRecord {
  return {
    ...exercise,
    slug,
    region: MAIN_MUSCLE_TO_STATIC_GROUP[exercise.mainMuscle],
    source,
  };
}

function buildStaticExerciseRecords(exercises: Exercise[]) {
  const usedSlugs = new Set<string>();

  return exercises.map((exercise) => {
    const baseSlug = normalizeExerciseSlug(exercise.name);
    let nextSlug = baseSlug;

    if (usedSlugs.has(nextSlug)) {
      nextSlug = `${baseSlug}-${normalizeExerciseSlug(exercise.mainMuscle.replace(/_/g, '-'))}`;
    }

    usedSlugs.add(nextSlug);
    return createExerciseRecord(exercise, nextSlug);
  });
}

function buildRegionIndex(exercises: ExerciseRecord[]) {
  return new Map<StaticMuscleSlug, ExerciseRecord[]>(
    Object.entries(STATIC_GROUP_MUSCLES).map(([region, muscles]) => [
      region as StaticMuscleSlug,
      exercises.filter((exercise) =>
        (muscles as MainMuscle[]).includes(exercise.mainMuscle),
      ),
    ]),
  );
}

function createIndexes(exercises: ExerciseRecord[]) {
  return {
    bySlug: new Map(exercises.map((exercise) => [exercise.slug, exercise])),
    byRegion: buildRegionIndex(exercises),
  };
}

function getRegionScopedExercises(
  exercises: ExerciseRecord[],
  regions: StaticMuscleSlug[],
) {
  const allowedRegions = new Set(regions);
  return exercises.filter((exercise) => allowedRegions.has(exercise.region));
}

function applySupabaseOverlay(
  staticExercise: ExerciseRecord,
  remoteExercise: ExerciseLibraryRow,
): ExerciseRecord {
  const nextName = remoteExercise.name?.trim() || staticExercise.name;
  const normalizedSlug = normalizeExerciseSlug(remoteExercise.slug || staticExercise.slug);

  return createExerciseRecord(
    {
      ...staticExercise,
      name: nextName,
      description: remoteExercise.description?.trim() || staticExercise.description,
      level:
        remoteExercise.difficulty === 'beginner' ||
        remoteExercise.difficulty === 'intermediate' ||
        remoteExercise.difficulty === 'advanced'
          ? remoteExercise.difficulty
          : staticExercise.level,
      videoUrl: remoteExercise.video_url?.trim() || staticExercise.videoUrl,
      imageUrl: remoteExercise.thumbnail_path?.trim() || staticExercise.imageUrl,
      imageAlt: staticExercise.imageAlt || `${nextName} exercise thumbnail`,
    },
    normalizedSlug,
    'supabase',
  );
}

const STATIC_EXERCISE_RECORDS = buildStaticExerciseRecords(STATIC_EXERCISES);
const STATIC_INDEXES = createIndexes(STATIC_EXERCISE_RECORDS);

let currentExercisesCache = STATIC_EXERCISE_RECORDS;
let currentIndexes = STATIC_INDEXES;
let currentDataSource: ExerciseDataSource = 'static';
let activeLoadPromise: Promise<ExerciseRecord[]> | null = null;

function getConfiguredExerciseDataSource(): ExerciseDataSource {
  const rawValue =
    typeof import.meta !== 'undefined' && import.meta.env
      ? import.meta.env.VITE_EXERCISE_DATA_SOURCE
      : typeof process !== 'undefined'
        ? process.env.VITE_EXERCISE_DATA_SOURCE
        : '';

  return String(rawValue || '').trim().toLowerCase() === 'supabase'
    ? 'supabase'
    : 'static';
}

function replaceCache(nextExercises: ExerciseRecord[], source: ExerciseDataSource) {
  currentExercisesCache = nextExercises;
  currentIndexes = createIndexes(nextExercises);
  currentDataSource = source;
}

const staticProvider: ExerciseProvider = {
  async listExercises() {
    return STATIC_EXERCISE_RECORDS;
  },
};

const supabaseProvider: ExerciseProvider = {
  async listExercises() {
    const remoteRows = await fetchExerciseLibraryEntriesFromSupabase();
    if (!remoteRows.length) {
      return STATIC_EXERCISE_RECORDS;
    }

    const remoteBySlug = new Map(
      remoteRows.map((row) => [normalizeExerciseSlug(row.slug), row]),
    );

    return STATIC_EXERCISE_RECORDS.map((exercise) => {
      const remote = remoteBySlug.get(exercise.slug);
      return remote ? applySupabaseOverlay(exercise, remote) : exercise;
    });
  },
};

function getActiveProvider(source: ExerciseDataSource): ExerciseProvider {
  return source === 'supabase' ? supabaseProvider : staticProvider;
}

export function getExerciseSlug(name: string) {
  return normalizeExerciseSlug(name);
}

export function getExerciseDataSource() {
  return currentDataSource;
}

export async function refreshExercises(options?: {source?: ExerciseDataSource}) {
  const source = options?.source || getConfiguredExerciseDataSource();
  activeLoadPromise = getActiveProvider(source)
    .listExercises()
    .then((exercises) => {
      replaceCache(exercises, source);
      activeLoadPromise = null;
      return exercises;
    })
    .catch((error) => {
      replaceCache(STATIC_EXERCISE_RECORDS, 'static');
      activeLoadPromise = null;
      throw error;
    });

  return activeLoadPromise;
}

export async function ensureExercisesLoaded(options?: {source?: ExerciseDataSource}) {
  if (activeLoadPromise) {
    return activeLoadPromise;
  }

  return refreshExercises(options);
}

export function getExercises(): ExerciseRecord[] {
  return currentExercisesCache;
}

export function getStaticExercises(): ExerciseRecord[] {
  return STATIC_EXERCISE_RECORDS;
}

export function getExerciseBySlug(slug: string): ExerciseRecord | null {
  return currentIndexes.bySlug.get(normalizeExerciseSlug(slug)) ?? null;
}

export function getExercisesByRegion(region: StaticMuscleSlug): ExerciseRecord[] {
  return currentIndexes.byRegion.get(region) ?? [];
}

export function getPopularExercisesByMuscle(
  muscle: MainMuscle,
): ExerciseRecord[] {
  const allowedNames = new Set(POPULAR_BY_MUSCLE[muscle] || []);
  return currentExercisesCache.filter((exercise) =>
    allowedNames.has(exercise.name),
  );
}

export function compareExerciseCatalogs(
  staticExercises: ExerciseRecord[],
  hydratedExercises: ExerciseRecord[],
  regions: StaticMuscleSlug[] = ['chest', 'back', 'shoulders'],
): ExerciseCatalogDriftSummary {
  const staticSubset = getRegionScopedExercises(staticExercises, regions);
  const hydratedSubset = getRegionScopedExercises(hydratedExercises, regions);
  const staticSlugs = new Set(staticSubset.map((exercise) => exercise.slug));
  const hydratedSlugs = new Set(hydratedSubset.map((exercise) => exercise.slug));

  return {
    comparedRegions: regions,
    staticCount: staticSubset.length,
    hydratedCount: hydratedSubset.length,
    missingSlugs: [...staticSlugs].filter((slug) => !hydratedSlugs.has(slug)),
    unexpectedSlugs: [...hydratedSlugs].filter((slug) => !staticSlugs.has(slug)),
    missingThumbnails: hydratedSubset
      .filter((exercise) => !exercise.imageUrl?.trim())
      .map((exercise) => exercise.slug),
    invalidRegions: hydratedSubset
      .filter((exercise) => !regions.includes(exercise.region))
      .map((exercise) => exercise.slug),
  };
}
