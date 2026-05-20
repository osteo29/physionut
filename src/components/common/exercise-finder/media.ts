import type {StaticMuscleSlug} from './types';

export const REGION_VISUAL_ACCENTS: Partial<Record<StaticMuscleSlug, string>> = {
  chest: 'from-rose-100 via-white to-rose-50',
  back: 'from-sky-100 via-white to-cyan-50',
  shoulders: 'from-amber-100 via-white to-orange-50',
};

export const EXERCISE_MEDIA_BUCKET = 'exercise-media';
export const EXERCISE_FALLBACK_THUMBNAIL = '/exercises/thumbnails/exercise-thumb-fallback.svg';
