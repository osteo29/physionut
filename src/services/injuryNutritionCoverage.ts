import {getAllInjuries} from './injuryDatabase';

export function getInjuriesMissingNutritionPlans() {
  return getAllInjuries()
    .filter((injury) =>
      injury.phases.some(
        (phase) =>
          !phase.nutritionFocus?.length ||
          !phase.recommendedFoods?.length ||
          !phase.avoidFoods?.length ||
          !phase.supplements?.length ||
          !phase.meals?.breakfast ||
          !phase.meals?.lunch ||
          !phase.meals?.dinner,
      ),
    )
    .sort((left, right) => left.name.localeCompare(right.name));
}
