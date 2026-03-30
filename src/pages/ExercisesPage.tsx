import {Navigate, useParams} from 'react-router-dom';
import ExerciseFinder, {
  EXERCISE_FINDER_STATIC_LABELS,
  EXERCISE_FINDER_STATIC_SLUGS,
  type StaticMuscleSlug,
} from '../components/common/ExerciseFinder';
import usePreferredLang from './usePreferredLang';

function isStaticMuscleSlug(value: string | undefined): value is StaticMuscleSlug {
  return Boolean(value && EXERCISE_FINDER_STATIC_SLUGS.includes(value as StaticMuscleSlug));
}

export default function ExercisesPage() {
  const lang = usePreferredLang();
  const params = useParams<{muscle?: string}>();

  if (params.muscle && !isStaticMuscleSlug(params.muscle)) {
    return <Navigate to={`/${lang}/exercises`} replace />;
  }

  const pathMuscle = isStaticMuscleSlug(params.muscle) ? params.muscle : null;

  return (
    <ExerciseFinder
      canonicalBasePath="/exercises"
      enableSeo
      pathMuscle={pathMuscle}
      key={pathMuscle || 'all-exercises'}
    />
  );
}

export const EXERCISE_ROUTE_LABELS = EXERCISE_FINDER_STATIC_LABELS;
