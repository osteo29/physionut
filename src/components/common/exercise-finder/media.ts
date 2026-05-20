import type {StaticMuscleSlug} from './types';

export const REGION_ANATOMY_ART: Partial<Record<StaticMuscleSlug, string>> = {
  chest: '/anatomy/chest.svg',
  back: '/anatomy/back.svg',
  shoulders: '/anatomy/shoulders.svg',
};

export const EXERCISE_MEDIA_BUCKET = 'exercise-media';
export const EXERCISE_FALLBACK_THUMBNAIL = '/exercises/thumbnails/exercise-thumb-fallback.svg';
