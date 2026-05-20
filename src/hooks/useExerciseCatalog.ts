import {useEffect, useState} from 'react';

import {
  compareExerciseCatalogs,
  ensureExercisesLoaded,
  getExerciseDataSource,
  getExercises,
  getStaticExercises,
  type ExerciseDataSource,
  type ExerciseRecord,
} from '../services/exerciseService';

type UseExerciseCatalogResult = {
  exercises: ExerciseRecord[];
  loading: boolean;
  error: string | null;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return 'Could not hydrate exercise catalog.';
}

export function useExerciseCatalog(
  options?: {source?: ExerciseDataSource},
): UseExerciseCatalogResult {
  const [exercises, setExercises] = useState<ExerciseRecord[]>(() => getExercises());
  const [loading, setLoading] = useState(() => getExerciseDataSource() === 'supabase');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const source = options?.source;

    setExercises(getExercises());
    setLoading((source || getExerciseDataSource()) === 'supabase');

    void ensureExercisesLoaded({source})
      .then((nextExercises) => {
        if (!active) return;
        setExercises(nextExercises);
        setLoading(false);
        setError(null);

        const summary = compareExerciseCatalogs(getStaticExercises(), nextExercises);
        if (
          summary.missingSlugs.length ||
          summary.unexpectedSlugs.length ||
          summary.missingThumbnails.length ||
          summary.invalidRegions.length
        ) {
          console.warn('Exercise catalog drift detected during hydration.', summary);
        }
      })
      .catch((nextError) => {
        if (!active) return;
        setExercises(getStaticExercises());
        setLoading(false);
        setError(getErrorMessage(nextError));
      });

    return () => {
      active = false;
    };
  }, [options?.source]);

  return {
    exercises,
    loading,
    error,
  };
}
