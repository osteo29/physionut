import {Navigate, useParams} from 'react-router-dom';
import ExerciseFinder, {
  EXERCISE_FINDER_STATIC_LABELS,
  EXERCISE_FINDER_STATIC_SLUGS,
  type StaticMuscleSlug,
} from '../components/common/ExerciseFinder';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';

function isStaticMuscleSlug(value: string | undefined): value is StaticMuscleSlug {
  return Boolean(value && EXERCISE_FINDER_STATIC_SLUGS.includes(value as StaticMuscleSlug));
}

export default function ExercisesPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const params = useParams<{muscle?: string}>();

  if (params.muscle && !isStaticMuscleSlug(params.muscle)) {
    return <Navigate to={`/${lang}/exercises`} replace />;
  }

  const pathMuscle = isStaticMuscleSlug(params.muscle) ? params.muscle : null;
  const title = isAr ? 'دليل التمارين' : 'Exercise Finder';

  return (
    <PageLayout title={title}>
      <div className="not-prose">
        <ExerciseFinder
          canonicalBasePath="/exercises"
          enableSeo
          lang={lang}
          pathMuscle={pathMuscle}
          key={pathMuscle || 'all-exercises'}
        />
      </div>
    </PageLayout>
  );
}

export const EXERCISE_ROUTE_LABELS = EXERCISE_FINDER_STATIC_LABELS;
