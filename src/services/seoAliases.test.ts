import {describe, expect, it} from 'vitest';
import {
  denormalizeExerciseUrlSlug,
  EXERCISE_ROUTE_ALIASES,
  INJURY_CANONICAL_PARENT_MAP,
  normalizeExerciseUrlSlug,
} from './seoAliases';

describe('seoAliases', () => {
  it('normalizes and denormalizes exercise route aliases', () => {
    expect(EXERCISE_ROUTE_ALIASES['lower-back']).toBe('lower_back');
    expect(normalizeExerciseUrlSlug('lower_back')).toBe('lower-back');
    expect(denormalizeExerciseUrlSlug('lower-back')).toBe('lower_back');
    expect(denormalizeExerciseUrlSlug('hamstrings')).toBe('hamstrings');
  });

  it('keeps canonical injury parent mappings stable for known redirects', () => {
    expect(INJURY_CANONICAL_PARENT_MAP.jumpers_knee).toBe('patellar_tendinopathy');
    expect(INJURY_CANONICAL_PARENT_MAP.rotator_cuff_repair).toBe('rotator_cuff');
  });
});
