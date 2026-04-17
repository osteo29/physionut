import {injuryExerciseProtocolOverrides} from './injuryExerciseProtocolOverrides';
import type {InjuryProtocol} from './injuryDatabase';

function mergeUniqueTextList(base: string[], incoming?: string[]) {
  if (!incoming?.length) return base;
  return [...incoming];
}

export function applyInjuryExerciseProtocolOverrides(injuries: InjuryProtocol[]): InjuryProtocol[] {
  return injuries.map((injury) => {
    const override = injuryExerciseProtocolOverrides[injury.id];
    if (!override?.phases?.length) return injury;

    const phases = injury.phases.map((phase, index) => {
      const phaseOverride = override.phases.find((item) => item.phaseNumber === index + 1);
      if (!phaseOverride) return phase;

      return {
        ...phase,
        label: phaseOverride.label ?? phase.label,
        duration: phaseOverride.duration ?? phase.duration,
        goals: mergeUniqueTextList(phase.goals, phaseOverride.goals),
        cautions: mergeUniqueTextList(phase.cautions ?? [], phaseOverride.cautions),
        progressionMarkers: mergeUniqueTextList(phase.progressionMarkers ?? [], phaseOverride.progressionMarkers),
        exercises: mergeUniqueTextList(phase.exercises, phaseOverride.exercises),
        exercisePlans: phaseOverride.exercisePlans?.length ? phaseOverride.exercisePlans : phase.exercisePlans,
      };
    });

    return {
      ...injury,
      phases,
    };
  });
}
