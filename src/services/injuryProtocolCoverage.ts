import {getAllInjuries} from './injuryDatabase';
import {injuryExerciseProtocolOverrides} from './injuryExerciseProtocolOverrides';

export function getInjuriesMissingImportedExerciseProtocols() {
  const covered = new Set(Object.keys(injuryExerciseProtocolOverrides));

  return getAllInjuries()
    .filter((injury) => !covered.has(injury.id))
    .sort((left, right) => left.name.localeCompare(right.name));
}
