import {type ReactNode, useEffect, useId, useMemo, useState} from 'react';
import {Dumbbell, Search, Share2, SlidersHorizontal, Target} from 'lucide-react';
import {Link} from 'react-router-dom';
import Seo from '../seo/Seo';
import type {Language} from '../../services/translations';
import {buildHreflangs, navigationPaths} from '../../utils/langUrlHelper';

const MUSCLE_TREE = {
  chest: ['upper_chest', 'middle_chest', 'lower_chest'],
  back: ['lats', 'traps', 'rhomboids', 'erector_spinae'],
  shoulders: ['front_delts', 'side_delts', 'rear_delts'],
  biceps: ['biceps'],
  triceps: ['triceps'],
  forearms: ['forearms'],
  abs: ['upper_abs', 'lower_abs'],
  obliques: ['obliques'],
  lower_back: ['lower_back'],
  glutes: ['glute_max', 'glute_med', 'glute_min'],
  quadriceps: ['rectus_femoris', 'vastus_lateralis', 'vastus_medialis'],
  hamstrings: ['biceps_femoris', 'semitendinosus', 'semimembranosus'],
  calves: ['gastrocnemius', 'soleus'],
} as const;

type MainMuscle = keyof typeof MUSCLE_TREE;
type SubMuscle = (typeof MUSCLE_TREE)[MainMuscle][number];
type Level = 'beginner' | 'intermediate' | 'advanced';
type Equipment = 'bodyweight' | 'dumbbell' | 'barbell' | 'machine' | 'band';
type ExerciseType = 'strength' | 'hypertrophy' | 'endurance';
export type StaticMuscleSlug = MainMuscle | 'arms' | 'core' | 'legs';

type Exercise = {
  name: string;
  mainMuscle: MainMuscle;
  muscles: string[];
  level: Level;
  equipment: Equipment;
  exerciseType: ExerciseType;
  description: string;
  tips: string;
  rehabTip?: string;
  videoUrl?: string;
};

type FilterState = {
  muscle: MainMuscle | 'all';
  subMuscle: SubMuscle | 'all';
  level: Level | 'all';
  equipment: Equipment | 'all';
  exerciseType: ExerciseType | 'all';
  search: string;
};

export type ExerciseFinderProps = {
  canonicalBasePath?: string;
  enableSeo?: boolean;
  lang?: Language;
  pathMuscle?: StaticMuscleSlug | null;
};

type Option = {value: string; label: string};

const MAIN_MUSCLE_OPTIONS: Option[] = [
  {value: 'all', label: 'All muscle groups'},
  {value: 'chest', label: 'Chest'},
  {value: 'back', label: 'Back'},
  {value: 'shoulders', label: 'Shoulders'},
  {value: 'biceps', label: 'Biceps'},
  {value: 'triceps', label: 'Triceps'},
  {value: 'forearms', label: 'Forearms'},
  {value: 'abs', label: 'Abs'},
  {value: 'obliques', label: 'Obliques'},
  {value: 'lower_back', label: 'Lower back'},
  {value: 'glutes', label: 'Glutes'},
  {value: 'quadriceps', label: 'Quadriceps'},
  {value: 'hamstrings', label: 'Hamstrings'},
  {value: 'calves', label: 'Calves'},
];

const LEVEL_OPTIONS: Option[] = [
  {value: 'all', label: 'All levels'},
  {value: 'beginner', label: 'Beginner'},
  {value: 'intermediate', label: 'Intermediate'},
  {value: 'advanced', label: 'Advanced'},
];

const EQUIPMENT_OPTIONS: Option[] = [
  {value: 'all', label: 'All equipment'},
  {value: 'bodyweight', label: 'Bodyweight'},
  {value: 'dumbbell', label: 'Dumbbell'},
  {value: 'barbell', label: 'Barbell'},
  {value: 'machine', label: 'Machine'},
  {value: 'band', label: 'Band'},
];

const EXERCISE_TYPE_OPTIONS: Option[] = [
  {value: 'all', label: 'All goals'},
  {value: 'strength', label: 'Strength'},
  {value: 'hypertrophy', label: 'Hypertrophy'},
  {value: 'endurance', label: 'Endurance'},
];

export const EXERCISE_FINDER_STATIC_LABELS: Record<StaticMuscleSlug, string> = {
  chest: 'Chest',
  back: 'Back',
  shoulders: 'Shoulders',
  biceps: 'Biceps',
  triceps: 'Triceps',
  forearms: 'Forearms',
  abs: 'Abs',
  obliques: 'Obliques',
  lower_back: 'Lower back',
  glutes: 'Glutes',
  quadriceps: 'Quadriceps',
  hamstrings: 'Hamstrings',
  calves: 'Calves',
  arms: 'Arms',
  core: 'Core',
  legs: 'Legs',
};

const EXERCISE_FINDER_STATIC_ARABIC_LABELS: Record<StaticMuscleSlug, string> = {
  chest: 'الصدر',
  back: 'الظهر',
  shoulders: 'الكتف',
  biceps: 'البايسبس',
  triceps: 'الترايسبس',
  forearms: 'الساعد',
  abs: 'البطن',
  obliques: 'الخواصر',
  lower_back: 'أسفل الظهر',
  glutes: 'المقعدة',
  quadriceps: 'العضلة الأمامية',
  hamstrings: 'العضلة الخلفية',
  calves: 'السمانة',
  arms: 'الذراع',
  core: 'الجذع',
  legs: 'الرجل',
};

const STATIC_GROUP_MUSCLES: Record<StaticMuscleSlug, MainMuscle[]> = {
  chest: ['chest'],
  back: ['back'],
  shoulders: ['shoulders'],
  biceps: ['biceps'],
  triceps: ['triceps'],
  forearms: ['forearms'],
  abs: ['abs'],
  obliques: ['obliques'],
  lower_back: ['lower_back'],
  glutes: ['glutes'],
  quadriceps: ['quadriceps'],
  hamstrings: ['hamstrings'],
  calves: ['calves'],
  arms: ['biceps', 'triceps', 'forearms'],
  core: ['abs', 'obliques', 'lower_back'],
  legs: ['glutes', 'quadriceps', 'hamstrings', 'calves'],
};

const INITIAL_FILTERS: FilterState = {
  muscle: 'all',
  subMuscle: 'all',
  level: 'all',
  equipment: 'all',
  exerciseType: 'all',
  search: '',
};

export const EXERCISE_FINDER_STATIC_SLUGS = Object.keys(EXERCISE_FINDER_STATIC_LABELS) as StaticMuscleSlug[];

function normalizeValue(value: string | null | undefined) {
  return (value || '').trim().toLowerCase();
}

function toTitle(value: string) {
  return value.replace(/_/g, ' ');
}

function isMainMuscle(value: string): value is MainMuscle {
  return value in MUSCLE_TREE;
}

function isSubMuscle(value: string): value is SubMuscle {
  return Object.values(MUSCLE_TREE).some((items) => items.includes(value as never));
}

function isStaticSlug(value: string | null | undefined): value is StaticMuscleSlug {
  return Boolean(value && value in EXERCISE_FINDER_STATIC_LABELS);
}

function getSubMuscleOptions(mainMuscle: MainMuscle | 'all') {
  const options: Option[] = [{value: 'all', label: 'All sub-muscles'}];

  if (mainMuscle !== 'all') {
    return [
      ...options,
      ...MUSCLE_TREE[mainMuscle].map((item) => ({value: item, label: toTitle(item)})),
    ];
  }

  return [
    ...options,
    ...Object.entries(MUSCLE_TREE).flatMap(([group, items]) =>
      items.map((item) => ({value: item, label: `${toTitle(item)} (${toTitle(group)})`})),
    ),
  ];
}

function getStaticSlugFilters(slug: StaticMuscleSlug | null | undefined) {
  if (!slug || !isStaticSlug(slug)) return null;

  const muscles = STATIC_GROUP_MUSCLES[slug];
  return {
    muscle: muscles.length === 1 ? muscles[0] : 'all',
    staticMuscles: muscles,
  };
}

function readFiltersFromUrl(pathMuscle?: StaticMuscleSlug | null): FilterState {
  const fallback = getStaticSlugFilters(pathMuscle);
  const base: FilterState = {
    ...INITIAL_FILTERS,
    muscle: fallback?.muscle || 'all',
  };

  if (typeof window === 'undefined') return base;

  const params = new URLSearchParams(window.location.search);
  const muscle = normalizeValue(params.get('muscle'));
  const level = normalizeValue(params.get('level'));
  const equipment = normalizeValue(params.get('equipment'));
  const exerciseType = normalizeValue(params.get('type'));
  const search = params.get('search') || '';

  if (isMainMuscle(muscle)) {
    base.muscle = muscle;
  } else if (isSubMuscle(muscle)) {
    base.subMuscle = muscle;
    const parent = (Object.entries(MUSCLE_TREE).find(([, items]) => items.includes(muscle as never))?.[0] ||
      'all') as MainMuscle | 'all';
    base.muscle = parent;
  }

  if (level === 'beginner' || level === 'intermediate' || level === 'advanced') {
    base.level = level;
  }
  if (equipment === 'bodyweight' || equipment === 'dumbbell' || equipment === 'barbell' || equipment === 'machine' || equipment === 'band') {
    base.equipment = equipment;
  }
  if (exerciseType === 'strength' || exerciseType === 'hypertrophy' || exerciseType === 'endurance') {
    base.exerciseType = exerciseType;
  }
  if (search.trim()) {
    base.search = search;
  }

  return base;
}

function syncFiltersToUrl(filters: FilterState, pathMuscle?: StaticMuscleSlug | null) {
  if (typeof window === 'undefined') return;

  const nextUrl = new URL(window.location.href);
  const staticContext = getStaticSlugFilters(pathMuscle);
  const defaultMainMuscle = staticContext?.muscle || 'all';

  if (filters.subMuscle !== 'all') {
    nextUrl.searchParams.set('muscle', filters.subMuscle);
  } else if (filters.muscle !== 'all' && filters.muscle !== defaultMainMuscle) {
    nextUrl.searchParams.set('muscle', filters.muscle);
  } else {
    nextUrl.searchParams.delete('muscle');
  }

  if (filters.level !== 'all') nextUrl.searchParams.set('level', filters.level);
  else nextUrl.searchParams.delete('level');

  if (filters.equipment !== 'all') nextUrl.searchParams.set('equipment', filters.equipment);
  else nextUrl.searchParams.delete('equipment');

  if (filters.exerciseType !== 'all') nextUrl.searchParams.set('type', filters.exerciseType);
  else nextUrl.searchParams.delete('type');

  if (filters.search.trim()) nextUrl.searchParams.set('search', filters.search.trim());
  else nextUrl.searchParams.delete('search');

  window.history.replaceState({}, '', nextUrl.toString());
}

function createStructuredData(title: string, description: string, canonicalPath: string, exercises: Exercise[]) {
  return [
    {
      id: 'exercise-finder-page',
      json: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description,
        url: canonicalPath,
      },
    },
    {
      id: 'exercise-finder-item-list',
      json: {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: exercises.slice(0, 24).map((exercise, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: exercise.name,
          description: exercise.description,
        })),
      },
    },
  ];
}

function FilterField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-health-green focus:ring-2 focus:ring-health-green/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Badge({children, tone = 'neutral'}: {children: ReactNode; tone?: 'neutral' | 'green' | 'blue'}) {
  const classes =
    tone === 'green'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : tone === 'blue'
        ? 'border-health-green/20 bg-health-green/10 text-health-green-dark'
        : 'border-slate-200 bg-slate-50 text-slate-600';

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${classes}`}>
      {children}
    </span>
  );
}

const EXERCISES: Exercise[] = [
  {
    name: 'Incline Bench Press',
    mainMuscle: 'chest',
    muscles: ['upper_chest', 'front_delts', 'triceps'],
    level: 'intermediate',
    equipment: 'barbell',
    exerciseType: 'strength',
    description: 'Emphasizes the upper chest with a stable incline pressing angle.',
    tips: 'Keep the shoulder blades tucked and avoid turning it into a high-shoulder press.',
    rehabTip: 'Useful when horizontal pressing is tolerated but heavy flat pressing still feels irritable.',
    videoUrl: '',
  },
  {
    name: 'Low Incline Dumbbell Press',
    mainMuscle: 'chest',
    muscles: ['upper_chest', 'front_delts', 'triceps'],
    level: 'beginner',
    equipment: 'dumbbell',
    exerciseType: 'hypertrophy',
    description: 'Builds upper-chest strength with a friendlier range than a steep incline.',
    tips: 'Use a 15 to 30 degree bench instead of chasing a near-overhead angle.',
    rehabTip: 'A useful bridge when shoulder tolerance is improving but barbell work still feels stiff.',
    videoUrl: '',
  },
  {
    name: 'Flat Dumbbell Bench Press',
    mainMuscle: 'chest',
    muscles: ['middle_chest', 'front_delts', 'triceps'],
    level: 'beginner',
    equipment: 'dumbbell',
    exerciseType: 'hypertrophy',
    description: 'A classic chest builder with more arm freedom than a barbell bench.',
    tips: 'Lower with control and stop short of painful shoulder stretch if needed.',
    rehabTip: 'Dumbbells let users find a more joint-friendly pressing path than a fixed bar.',
    videoUrl: '',
  },
  {
    name: 'Push-Up',
    mainMuscle: 'chest',
    muscles: ['middle_chest', 'triceps', 'front_delts', 'upper_abs'],
    level: 'beginner',
    equipment: 'bodyweight',
    exerciseType: 'endurance',
    description: 'Develops chest strength and trunk stiffness with easy scaling options.',
    tips: 'Elevate the hands if full-floor reps turn into sagging or shoulder shrugging.',
    rehabTip: 'Incline push-ups are often a smart entry point before returning to heavier pressing.',
    videoUrl: '',
  },
  {
    name: 'Chest Dip',
    mainMuscle: 'chest',
    muscles: ['lower_chest', 'triceps', 'front_delts'],
    level: 'advanced',
    equipment: 'bodyweight',
    exerciseType: 'strength',
    description: 'Biases the lower chest through deep shoulder extension and bodyweight loading.',
    tips: 'Lean slightly forward and control the bottom instead of bouncing into range.',
    videoUrl: '',
  },
  {
    name: 'Decline Push-Up',
    mainMuscle: 'chest',
    muscles: ['lower_chest', 'front_delts', 'triceps', 'upper_abs'],
    level: 'intermediate',
    equipment: 'bodyweight',
    exerciseType: 'hypertrophy',
    description: 'A bodyweight press that increases chest loading by elevating the feet.',
    tips: 'Keep the ribs tucked so the movement stays chest-dominant instead of lumbar-heavy.',
    videoUrl: '',
  },
  {
    name: 'Pull-Up',
    mainMuscle: 'back',
    muscles: ['lats', 'rhomboids', 'biceps', 'rear_delts'],
    level: 'advanced',
    equipment: 'bodyweight',
    exerciseType: 'strength',
    description: 'A high-value vertical pull for upper-back and lat strength.',
    tips: 'Initiate with the shoulder blades instead of yanking with the neck and elbows only.',
    videoUrl: '',
  },
  {
    name: 'Neutral-Grip Lat Pulldown',
    mainMuscle: 'back',
    muscles: ['lats', 'biceps', 'rhomboids'],
    level: 'beginner',
    equipment: 'machine',
    exerciseType: 'hypertrophy',
    description: 'Builds the lats through a guided vertical pull with easier load control.',
    tips: 'Pull to the upper chest and keep the torso mostly tall instead of leaning back hard.',
    rehabTip: 'Often easier to tolerate than pull-ups when shoulder control is still improving.',
    videoUrl: '',
  },
  {
    name: 'Straight-Arm Band Pulldown',
    mainMuscle: 'back',
    muscles: ['lats', 'traps', 'upper_abs'],
    level: 'beginner',
    equipment: 'band',
    exerciseType: 'endurance',
    description: 'Teaches lat engagement without heavy elbow flexion or body swing.',
    tips: 'Keep the rib cage quiet and think about pulling from the armpits.',
    videoUrl: '',
  },
  {
    name: 'Barbell Row',
    mainMuscle: 'back',
    muscles: ['lats', 'rhomboids', 'traps', 'erector_spinae', 'biceps'],
    level: 'intermediate',
    equipment: 'barbell',
    exerciseType: 'strength',
    description: 'Loads the entire posterior chain while building upper-back density.',
    tips: 'Set the torso angle first and row without turning the hinge into a shrug.',
    rehabTip: 'If trunk tolerance is limited, chest-supported rows are usually the smarter entry point.',
    videoUrl: '',
  },
  {
    name: 'Chest-Supported Dumbbell Row',
    mainMuscle: 'back',
    muscles: ['rhomboids', 'traps', 'lats', 'rear_delts', 'biceps'],
    level: 'beginner',
    equipment: 'dumbbell',
    exerciseType: 'hypertrophy',
    description: 'Targets the upper back without asking the lower back to hold a hinge.',
    tips: 'Drive the elbows back and pause briefly without craning the neck.',
    rehabTip: 'A good option when users want back work without extra spinal fatigue.',
    videoUrl: '',
  },
  {
    name: 'Band Face Pull',
    mainMuscle: 'back',
    muscles: ['rear_delts', 'traps', 'rhomboids'],
    level: 'beginner',
    equipment: 'band',
    exerciseType: 'endurance',
    description: 'Improves scapular control and posterior shoulder endurance.',
    tips: 'Finish with the hands high and wide rather than letting the elbows drop.',
    videoUrl: '',
  },
  {
    name: 'Barbell Shrug',
    mainMuscle: 'back',
    muscles: ['traps', 'forearms'],
    level: 'beginner',
    equipment: 'barbell',
    exerciseType: 'hypertrophy',
    description: 'Direct trap work with simple loading and easy progression.',
    tips: 'Lift straight up and down instead of rolling the shoulders around.',
    videoUrl: '',
  },
  {
    name: 'Prone Y Raise',
    mainMuscle: 'back',
    muscles: ['traps', 'rear_delts', 'rhomboids'],
    level: 'beginner',
    equipment: 'dumbbell',
    exerciseType: 'endurance',
    description: 'Targets the lower traps and scapular upward-rotation pattern.',
    tips: 'Use very light load and focus on clean motion instead of height.',
    rehabTip: 'Helpful for lifters who lose upper-back control during pressing and overhead work.',
    videoUrl: '',
  },
  {
    name: 'Back Extension',
    mainMuscle: 'back',
    muscles: ['erector_spinae', 'glute_max', 'hamstrings'],
    level: 'intermediate',
    equipment: 'bodyweight',
    exerciseType: 'endurance',
    description: 'Builds spinal extensor endurance with a simple setup.',
    tips: 'Move from the hips and stop before the low back hinges into end-range extension.',
    rehabTip: 'Start with shorter ranges and tempo control before adding load.',
    videoUrl: '',
  },
  {
    name: 'Seated Dumbbell Overhead Press',
    mainMuscle: 'shoulders',
    muscles: ['front_delts', 'side_delts', 'triceps'],
    level: 'intermediate',
    equipment: 'dumbbell',
    exerciseType: 'strength',
    description: 'A direct shoulder strength builder that also challenges trunk control.',
    tips: 'Press in a smooth arc and avoid leaning back to force the last few degrees.',
    videoUrl: '',
  },
  {
    name: 'Landmine Press',
    mainMuscle: 'shoulders',
    muscles: ['front_delts', 'upper_chest', 'triceps', 'upper_abs'],
    level: 'beginner',
    equipment: 'barbell',
    exerciseType: 'strength',
    description: 'Offers a shoulder-friendly pressing path between flat and overhead.',
    tips: 'Press forward and up while keeping the ribs stacked over the pelvis.',
    rehabTip: 'Often a cleaner return-to-pressing option than strict overhead work.',
    videoUrl: '',
  },
  {
    name: 'Dumbbell Lateral Raise',
    mainMuscle: 'shoulders',
    muscles: ['side_delts', 'traps'],
    level: 'beginner',
    equipment: 'dumbbell',
    exerciseType: 'hypertrophy',
    description: 'A simple isolation drill for side-delt size and shoulder shape.',
    tips: 'Lift in the scapular plane and stop before shrugging takes over.',
    videoUrl: '',
  },
  {
    name: 'Cable Rear Delt Fly',
    mainMuscle: 'shoulders',
    muscles: ['rear_delts', 'rhomboids', 'traps'],
    level: 'intermediate',
    equipment: 'machine',
    exerciseType: 'hypertrophy',
    description: 'Keeps tension on the rear delts through a long arc.',
    tips: 'Move from the shoulder and keep the torso still instead of yanking with momentum.',
    videoUrl: '',
  },
  {
    name: 'Band External Rotation',
    mainMuscle: 'shoulders',
    muscles: ['rear_delts', 'traps', 'rhomboids'],
    level: 'beginner',
    equipment: 'band',
    exerciseType: 'endurance',
    description: 'Supports shoulder control and cuff endurance around pressing volume.',
    tips: 'Keep the elbow anchored and rotate without letting the chest spin open.',
    rehabTip: 'Useful as accessory work for lifters who need cleaner shoulder mechanics.',
    videoUrl: '',
  },
  {
    name: 'EZ-Bar Curl',
    mainMuscle: 'biceps',
    muscles: ['biceps', 'forearms'],
    level: 'beginner',
    equipment: 'barbell',
    exerciseType: 'hypertrophy',
    description: 'A classic arm builder that loads the biceps heavily without extreme wrist supination.',
    tips: 'Keep the elbows slightly forward of the ribs and avoid swinging the torso.',
    videoUrl: '',
  },
  {
    name: 'Incline Dumbbell Curl',
    mainMuscle: 'biceps',
    muscles: ['biceps', 'forearms'],
    level: 'intermediate',
    equipment: 'dumbbell',
    exerciseType: 'hypertrophy',
    description: 'Trains the biceps in a lengthened position for strong hypertrophy stimulus.',
    tips: 'Keep the shoulder from drifting forward as the dumbbell lowers.',
    videoUrl: '',
  },
  {
    name: 'Alternating Hammer Curl',
    mainMuscle: 'biceps',
    muscles: ['biceps', 'forearms'],
    level: 'beginner',
    equipment: 'dumbbell',
    exerciseType: 'strength',
    description: 'Builds elbow flexor strength with a neutral grip and extra forearm demand.',
    tips: 'Move with a steady tempo and do not let the wrists fold inward.',
    videoUrl: '',
  },
  {
    name: 'Band Curl Burnout',
    mainMuscle: 'biceps',
    muscles: ['biceps', 'forearms'],
    level: 'beginner',
    equipment: 'band',
    exerciseType: 'endurance',
    description: 'A high-rep biceps finisher that is easy to set up almost anywhere.',
    tips: 'Stay tall and keep constant tension instead of resting at the bottom.',
    videoUrl: '',
  },
  {
    name: 'Close-Grip Bench Press',
    mainMuscle: 'triceps',
    muscles: ['triceps', 'middle_chest', 'front_delts'],
    level: 'intermediate',
    equipment: 'barbell',
    exerciseType: 'strength',
    description: 'A compound press that heavily loads the triceps through the lockout.',
    tips: 'Keep the grip just inside shoulder width rather than forcing a very narrow hand position.',
    videoUrl: '',
  },
  {
    name: 'Overhead Dumbbell Triceps Extension',
    mainMuscle: 'triceps',
    muscles: ['triceps', 'upper_abs'],
    level: 'intermediate',
    equipment: 'dumbbell',
    exerciseType: 'hypertrophy',
    description: 'Loads the long head of the triceps through a larger shoulder-flexed range.',
    tips: 'Keep the elbows mostly in and lower only as far as shoulder comfort allows.',
    videoUrl: '',
  },
  {
    name: 'Cable Pressdown',
    mainMuscle: 'triceps',
    muscles: ['triceps', 'front_delts'],
    level: 'beginner',
    equipment: 'machine',
    exerciseType: 'hypertrophy',
    description: 'A stable, joint-friendly way to train the triceps through moderate to high volume.',
    tips: 'Pin the elbows near the ribs and finish by fully straightening without shoulder roll.',
    videoUrl: '',
  },
  {
    name: 'Band Triceps Kickback',
    mainMuscle: 'triceps',
    muscles: ['triceps', 'rear_delts'],
    level: 'beginner',
    equipment: 'band',
    exerciseType: 'endurance',
    description: 'A lighter triceps option that works well for controlled pump work.',
    tips: 'Lock the upper arm in place before extending the elbow.',
    videoUrl: '',
  },
  {
    name: 'Wrist Curl',
    mainMuscle: 'forearms',
    muscles: ['forearms'],
    level: 'beginner',
    equipment: 'dumbbell',
    exerciseType: 'hypertrophy',
    description: 'Directly trains forearm flexors for grip support and arm balance.',
    tips: 'Support the forearm on a bench and move only at the wrist.',
    videoUrl: '',
  },
  {
    name: 'Reverse Curl',
    mainMuscle: 'forearms',
    muscles: ['forearms', 'biceps'],
    level: 'beginner',
    equipment: 'barbell',
    exerciseType: 'strength',
    description: 'Builds forearm strength and elbow flexors with a pronated grip.',
    tips: 'Keep the elbows quiet and accept lighter loads than a standard curl.',
    videoUrl: '',
  },
  {
    name: 'Plate Pinch Hold',
    mainMuscle: 'forearms',
    muscles: ['forearms'],
    level: 'beginner',
    equipment: 'bodyweight',
    exerciseType: 'endurance',
    description: 'Challenges grip endurance with simple isometric loading.',
    tips: 'Stay tall and keep the shoulders relaxed while you hold.',
    videoUrl: '',
  },
  {
    name: 'Band Finger Extension',
    mainMuscle: 'forearms',
    muscles: ['forearms'],
    level: 'beginner',
    equipment: 'band',
    exerciseType: 'endurance',
    description: 'Balances gripping volume by training the hand and forearm extensors.',
    tips: 'Open the fingers fully and pause for a clean squeeze each rep.',
    rehabTip: 'Helpful for desk workers and lifters who accumulate a lot of gripping fatigue.',
    videoUrl: '',
  },
  {
    name: 'Crunch',
    mainMuscle: 'abs',
    muscles: ['upper_abs'],
    level: 'beginner',
    equipment: 'bodyweight',
    exerciseType: 'endurance',
    description: 'A simple trunk-flexion drill for upper-abdominal fatigue and control.',
    tips: 'Curl the rib cage gently instead of yanking the head forward with the hands.',
    videoUrl: '',
  },
  {
    name: 'Cable Crunch',
    mainMuscle: 'abs',
    muscles: ['upper_abs', 'lower_abs'],
    level: 'intermediate',
    equipment: 'machine',
    exerciseType: 'hypertrophy',
    description: 'Adds meaningful load to trunk flexion when basic crunches are too easy.',
    tips: 'Think ribs to pelvis instead of hinging through the hips.',
    videoUrl: '',
  },
  {
    name: 'Reverse Crunch',
    mainMuscle: 'abs',
    muscles: ['lower_abs', 'upper_abs'],
    level: 'beginner',
    equipment: 'bodyweight',
    exerciseType: 'endurance',
    description: 'Biases lower-abdominal control through posterior pelvic tilt.',
    tips: 'Roll the pelvis up slowly instead of swinging the legs.',
    videoUrl: '',
  },
  {
    name: 'Hanging Knee Raise',
    mainMuscle: 'abs',
    muscles: ['lower_abs', 'upper_abs', 'lats'],
    level: 'intermediate',
    equipment: 'bodyweight',
    exerciseType: 'strength',
    description: 'Trains lower-abdominal strength and hip control while hanging.',
    tips: 'Posteriorly tilt the pelvis at the top instead of just lifting the knees.',
    videoUrl: '',
  },
  {
    name: 'Russian Twist',
    mainMuscle: 'obliques',
    muscles: ['obliques', 'upper_abs'],
    level: 'beginner',
    equipment: 'bodyweight',
    exerciseType: 'endurance',
    description: 'A dynamic trunk-rotation drill for oblique endurance.',
    tips: 'Rotate through the thorax and keep the feet grounded if balance steals the movement.',
    videoUrl: '',
  },
  {
    name: 'Cable Wood Chop',
    mainMuscle: 'obliques',
    muscles: ['obliques', 'upper_abs', 'glute_med'],
    level: 'intermediate',
    equipment: 'machine',
    exerciseType: 'strength',
    description: 'Builds rotational power and control with scalable resistance.',
    tips: 'Turn through the ribs and hips together instead of twisting only the low back.',
    videoUrl: '',
  },
  {
    name: 'Suitcase Carry',
    mainMuscle: 'obliques',
    muscles: ['obliques', 'forearms', 'glute_med', 'quadratus_lumborum'],
    level: 'intermediate',
    equipment: 'dumbbell',
    exerciseType: 'endurance',
    description: 'Challenges anti-side-bending control while walking under asymmetrical load.',
    tips: 'Stay tall and avoid leaning into or away from the weight.',
    rehabTip: 'A strong option for gym-goers who want trunk work that transfers to daily movement.',
    videoUrl: '',
  },
  {
    name: 'Bird Dog',
    mainMuscle: 'lower_back',
    muscles: ['lower_back', 'glute_max', 'upper_abs'],
    level: 'beginner',
    equipment: 'bodyweight',
    exerciseType: 'endurance',
    description: 'Builds low-load spinal stability while coordinating hips and shoulders.',
    tips: 'Reach long rather than high and keep the pelvis quiet.',
    rehabTip: 'A useful low-irritation trunk accessory for users returning from back stiffness.',
    videoUrl: '',
  },
  {
    name: 'Back Extension',
    mainMuscle: 'lower_back',
    muscles: ['lower_back', 'glute_max', 'hamstrings'],
    level: 'beginner',
    equipment: 'machine',
    exerciseType: 'hypertrophy',
    description: 'Strengthens the spinal extensors through a guided hip-hinge pattern.',
    tips: 'Move through the hips first and stop before hinging into aggressive extension.',
    videoUrl: '',
  },
  {
    name: 'Good Morning',
    mainMuscle: 'lower_back',
    muscles: ['lower_back', 'glute_max', 'hamstrings'],
    level: 'advanced',
    equipment: 'barbell',
    exerciseType: 'strength',
    description: 'A demanding hinge pattern that loads the posterior chain heavily.',
    tips: 'Start light and maintain a braced torso instead of searching for extra depth.',
    videoUrl: '',
  },
  {
    name: 'Glute Bridge',
    mainMuscle: 'glutes',
    muscles: ['glute_max', 'hamstrings', 'upper_abs'],
    level: 'beginner',
    equipment: 'bodyweight',
    exerciseType: 'strength',
    description: 'A foundational glute drill that teaches hip extension without much setup.',
    tips: 'Finish with the hips, not by arching the lower back.',
    rehabTip: 'A strong entry point before moving to heavier hinge and thrust patterns.',
    videoUrl: '',
  },
  {
    name: 'Barbell Hip Thrust',
    mainMuscle: 'glutes',
    muscles: ['glute_max', 'hamstrings', 'glute_med'],
    level: 'intermediate',
    equipment: 'barbell',
    exerciseType: 'strength',
    description: 'Provides high glute loading with relatively low knee demand.',
    tips: 'Pause at the top and keep the chin tucked instead of hyperextending over the bench.',
    videoUrl: '',
  },
  {
    name: 'Mini-Band Lateral Walk',
    mainMuscle: 'glutes',
    muscles: ['glute_med', 'glute_min', 'glute_max'],
    level: 'beginner',
    equipment: 'band',
    exerciseType: 'endurance',
    description: 'Targets lateral hip control and frontal-plane stability.',
    tips: 'Keep the toes forward and do not let the knees collapse inward.',
    rehabTip: 'Useful accessory work for lifters who lose pelvic control during lower-body training.',
    videoUrl: '',
  },
  {
    name: 'Single-Leg Hip Thrust',
    mainMuscle: 'glutes',
    muscles: ['glute_max', 'glute_med', 'hamstrings'],
    level: 'intermediate',
    equipment: 'bodyweight',
    exerciseType: 'hypertrophy',
    description: 'Raises unilateral glute demand without very heavy external loading.',
    tips: 'Keep the pelvis level and slow the lowering phase.',
    videoUrl: '',
  },
  {
    name: 'Goblet Squat',
    mainMuscle: 'quadriceps',
    muscles: ['rectus_femoris', 'vastus_lateralis', 'vastus_medialis', 'glute_max'],
    level: 'beginner',
    equipment: 'dumbbell',
    exerciseType: 'strength',
    description: 'A simple squat pattern that builds quad strength with good torso control.',
    tips: 'Keep the weight close to the chest and sit between the hips, not onto the toes only.',
    rehabTip: 'Box depth can be used to control range when users are rebuilding squat tolerance.',
    videoUrl: '',
  },
  {
    name: 'Front Squat',
    mainMuscle: 'quadriceps',
    muscles: ['rectus_femoris', 'vastus_lateralis', 'vastus_medialis', 'upper_abs'],
    level: 'advanced',
    equipment: 'barbell',
    exerciseType: 'strength',
    description: 'A quad-dominant squat that rewards mobility and upright positioning.',
    tips: 'Lift the elbows, brace hard, and avoid rushing the bottom position.',
    videoUrl: '',
  },
  {
    name: 'Leg Press',
    mainMuscle: 'quadriceps',
    muscles: ['rectus_femoris', 'vastus_lateralis', 'vastus_medialis', 'glute_max'],
    level: 'beginner',
    equipment: 'machine',
    exerciseType: 'hypertrophy',
    description: 'Lets users load the quads heavily with simpler balance demands.',
    tips: 'Control the bottom depth and keep the heels planted as the sled lowers.',
    videoUrl: '',
  },
  {
    name: 'Spanish Squat',
    mainMuscle: 'quadriceps',
    muscles: ['vastus_medialis', 'rectus_femoris', 'vastus_lateralis'],
    level: 'beginner',
    equipment: 'band',
    exerciseType: 'endurance',
    description: 'A quad-focused squat variation that keeps the torso upright and tension high.',
    tips: 'Sit back into the strap and stay tall rather than folding forward.',
    rehabTip: 'Commonly useful when gym-goers want quad work without jumping straight into heavier squats.',
    videoUrl: '',
  },
  {
    name: 'Romanian Deadlift',
    mainMuscle: 'hamstrings',
    muscles: ['biceps_femoris', 'semitendinosus', 'semimembranosus', 'glute_max'],
    level: 'intermediate',
    equipment: 'barbell',
    exerciseType: 'strength',
    description: 'A staple posterior-chain lift for strength and lengthened hamstring loading.',
    tips: 'Keep the bar close and hinge from the hips while maintaining a long spine.',
    videoUrl: '',
  },
  {
    name: 'Swiss Ball Hamstring Curl',
    mainMuscle: 'hamstrings',
    muscles: ['biceps_femoris', 'semitendinosus', 'semimembranosus', 'glute_max'],
    level: 'intermediate',
    equipment: 'bodyweight',
    exerciseType: 'endurance',
    description: 'Combines hamstring flexion with bridge control in a closed-chain setup.',
    tips: 'Own the bridge first, then add curls without losing pelvic position.',
    rehabTip: 'A good progression before higher-load eccentric hamstring work.',
    videoUrl: '',
  },
  {
    name: 'Seated Leg Curl',
    mainMuscle: 'hamstrings',
    muscles: ['biceps_femoris', 'semitendinosus', 'semimembranosus'],
    level: 'beginner',
    equipment: 'machine',
    exerciseType: 'hypertrophy',
    description: 'Direct hamstring work with stable setup and easy load progression.',
    tips: 'Control the lowering phase instead of bouncing out of the bottom.',
    videoUrl: '',
  },
  {
    name: 'Band Hamstring Curl',
    mainMuscle: 'hamstrings',
    muscles: ['biceps_femoris', 'semitendinosus', 'semimembranosus'],
    level: 'beginner',
    equipment: 'band',
    exerciseType: 'endurance',
    description: 'A portable option for lighter hamstring volume and warm-up work.',
    tips: 'Keep the hips quiet and squeeze through the full curl.',
    videoUrl: '',
  },
  {
    name: 'Standing Calf Raise',
    mainMuscle: 'calves',
    muscles: ['gastrocnemius', 'soleus'],
    level: 'beginner',
    equipment: 'bodyweight',
    exerciseType: 'endurance',
    description: 'Builds ankle plantarflexor strength with a simple bodyweight setup.',
    tips: 'Pause at the top and lower fully instead of bouncing through short reps.',
    videoUrl: '',
  },
  {
    name: 'Seated Calf Raise',
    mainMuscle: 'calves',
    muscles: ['soleus', 'gastrocnemius'],
    level: 'beginner',
    equipment: 'machine',
    exerciseType: 'hypertrophy',
    description: 'Biases the soleus through a bent-knee position and stable support.',
    tips: 'Use a smooth tempo and keep pressure through the big toe as you rise.',
    videoUrl: '',
  },
  {
    name: 'Single-Leg Calf Raise',
    mainMuscle: 'calves',
    muscles: ['gastrocnemius', 'soleus'],
    level: 'intermediate',
    equipment: 'bodyweight',
    exerciseType: 'strength',
    description: 'Adds unilateral calf loading and foot control without extra equipment.',
    tips: 'Use fingertip support as needed so you can fully own the range.',
    rehabTip: 'Hand support helps users train the calf without balance becoming the limiter.',
    videoUrl: '',
  },
];

const POPULAR_BY_MUSCLE: Record<MainMuscle, string[]> = {
  chest: ['Incline Bench Press', 'Flat Dumbbell Bench Press', 'Push-Up'],
  back: ['Pull-Up', 'Chest-Supported Dumbbell Row', 'Neutral-Grip Lat Pulldown'],
  shoulders: ['Landmine Press', 'Dumbbell Lateral Raise', 'Cable Rear Delt Fly'],
  biceps: ['EZ-Bar Curl', 'Incline Dumbbell Curl', 'Alternating Hammer Curl'],
  triceps: ['Close-Grip Bench Press', 'Cable Pressdown', 'Overhead Dumbbell Triceps Extension'],
  forearms: ['Reverse Curl', 'Plate Pinch Hold', 'Band Finger Extension'],
  abs: ['Cable Crunch', 'Reverse Crunch', 'Hanging Knee Raise'],
  obliques: ['Suitcase Carry', 'Cable Wood Chop', 'Russian Twist'],
  lower_back: ['Bird Dog', 'Back Extension', 'Good Morning'],
  glutes: ['Barbell Hip Thrust', 'Glute Bridge', 'Mini-Band Lateral Walk'],
  quadriceps: ['Front Squat', 'Leg Press', 'Goblet Squat'],
  hamstrings: ['Romanian Deadlift', 'Swiss Ball Hamstring Curl', 'Seated Leg Curl'],
  calves: ['Standing Calf Raise', 'Seated Calf Raise', 'Single-Leg Calf Raise'],
};

function ExerciseCard({exercise}: {exercise: Exercise}) {
  const isMultiMuscle = new Set(exercise.muscles.map((item) => item.split('_')[0])).size > 1;

  return (
    <article className="medical-card h-full p-5 sm:p-6">
      <div className="flex h-full flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{exercise.name}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="blue">{toTitle(exercise.mainMuscle)}</Badge>
              <Badge>{exercise.level}</Badge>
              <Badge>{exercise.equipment}</Badge>
              <Badge tone="green">{exercise.exerciseType}</Badge>
              {isMultiMuscle ? <Badge>multi-muscle</Badge> : null}
            </div>
          </div>
        </div>

        <p className="text-sm leading-7 text-slate-600">{exercise.description}</p>

        <div className="space-y-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Targets</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {exercise.muscles.map((muscle) => (
                <span key={muscle} className="rounded-full bg-soft-blue px-3 py-1 text-xs font-semibold text-health-green-dark">
                  {toTitle(muscle)}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Coaching cue</div>
            <p className="mt-1 text-sm text-slate-700">{exercise.tips}</p>
          </div>

          {exercise.rehabTip ? (
            <div className="rounded-2xl border border-health-green/15 bg-health-green/5 px-4 py-3">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-health-green-dark">Gym-friendly rehab note</div>
              <p className="mt-1 text-sm text-slate-700">{exercise.rehabTip}</p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ExerciseFinder({
  canonicalBasePath = '/exercises',
  enableSeo = true,
  lang = 'en',
  pathMuscle = null,
}: ExerciseFinderProps) {
  const isAr = lang === 'ar';
  const searchId = useId();
  const muscleId = useId();
  const subMuscleId = useId();
  const levelId = useId();
  const equipmentId = useId();
  const typeId = useId();
  const [filters, setFilters] = useState<FilterState>(() => readFiltersFromUrl(pathMuscle));

  useEffect(() => {
    setFilters(readFiltersFromUrl(pathMuscle));
  }, [pathMuscle]);

  useEffect(() => {
    syncFiltersToUrl(filters, pathMuscle);
  }, [filters, pathMuscle]);

  useEffect(() => {
    const handlePopState = () => setFilters(readFiltersFromUrl(pathMuscle));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [pathMuscle]);

  const staticContext = useMemo(() => getStaticSlugFilters(pathMuscle), [pathMuscle]);
  const subMuscleOptions = useMemo(() => getSubMuscleOptions(filters.muscle), [filters.muscle]);

  const filteredExercises = useMemo(() => {
    const scopedExercises =
      staticContext?.staticMuscles?.length
        ? EXERCISES.filter((exercise) => staticContext.staticMuscles.includes(exercise.mainMuscle))
        : EXERCISES;

    const search = normalizeValue(filters.search);

    return scopedExercises.filter((exercise) => {
      const matchesSearch = search.length === 0 || normalizeValue(exercise.name).includes(search);
      const matchesMainMuscle = filters.muscle === 'all' || exercise.mainMuscle === filters.muscle;
      const matchesSubMuscle = filters.subMuscle === 'all' || exercise.muscles.includes(filters.subMuscle);
      const matchesLevel = filters.level === 'all' || exercise.level === filters.level;
      const matchesEquipment = filters.equipment === 'all' || exercise.equipment === filters.equipment;
      const matchesType = filters.exerciseType === 'all' || exercise.exerciseType === filters.exerciseType;

      return matchesSearch && matchesMainMuscle && matchesSubMuscle && matchesLevel && matchesEquipment && matchesType;
    });
  }, [filters, staticContext]);

  const selectedMainMuscle = filters.muscle !== 'all' ? filters.muscle : staticContext?.staticMuscles?.[0] || null;
  const anatomyList = selectedMainMuscle ? MUSCLE_TREE[selectedMainMuscle] : [];
  const popularExercises = selectedMainMuscle
    ? filteredExercises.filter((exercise) => POPULAR_BY_MUSCLE[selectedMainMuscle].includes(exercise.name)).slice(0, 3)
    : filteredExercises.slice(0, 3);

  const headingLabel = selectedMainMuscle
    ? isAr
      ? `تمارين ${EXERCISE_FINDER_STATIC_ARABIC_LABELS[selectedMainMuscle]}`
      : `${EXERCISE_FINDER_STATIC_LABELS[selectedMainMuscle]} exercises`
    : pathMuscle && isStaticSlug(pathMuscle)
      ? isAr
        ? `تمارين ${EXERCISE_FINDER_STATIC_ARABIC_LABELS[pathMuscle]}`
        : `${EXERCISE_FINDER_STATIC_LABELS[pathMuscle]} exercises`
      : isAr
        ? 'دليل التمارين'
        : 'Exercise Finder';

  const canonicalPath = pathMuscle && isStaticSlug(pathMuscle) ? `${canonicalBasePath}/${pathMuscle}` : canonicalBasePath;
  const pageTitle = isAr ? `${headingLabel} | دليل تمارين الجيم` : `${headingLabel} | Gym Exercise Finder`;
  const pageDescription = selectedMainMuscle
    ? isAr
      ? `استعرض تمارين ${EXERCISE_FINDER_STATIC_ARABIC_LABELS[selectedMainMuscle]} مع فلاتر للعضلات الفرعية والمعدات والمستوى وهدف التمرين.`
      : `Browse ${EXERCISE_FINDER_STATIC_LABELS[selectedMainMuscle].toLowerCase()} exercises with filters for sub-muscles, equipment, level, and training goal.`
    : isAr
      ? 'ابحث عن تمارين الجيم حسب العضلة والعضلات الفرعية والمستوى والمعدات وهدف التمرين داخل دليل مرتب وسهل الاستخدام.'
      : 'Find gym exercises by muscle, sub-muscle, level, equipment, and training goal in a physiotherapy-aware exercise finder.';

  const activeFilterCount = [
    filters.muscle !== 'all',
    filters.subMuscle !== 'all',
    filters.level !== 'all',
    filters.equipment !== 'all',
    filters.exerciseType !== 'all',
    filters.search.trim().length > 0,
  ].filter(Boolean).length;

  const quickGroups = [
    {slug: 'chest' as StaticMuscleSlug, accent: 'bg-rose-50 text-rose-700 border-rose-200'},
    {slug: 'back' as StaticMuscleSlug, accent: 'bg-sky-50 text-sky-700 border-sky-200'},
    {slug: 'shoulders' as StaticMuscleSlug, accent: 'bg-amber-50 text-amber-700 border-amber-200'},
    {slug: 'arms' as StaticMuscleSlug, accent: 'bg-violet-50 text-violet-700 border-violet-200'},
    {slug: 'core' as StaticMuscleSlug, accent: 'bg-emerald-50 text-emerald-700 border-emerald-200'},
    {slug: 'legs' as StaticMuscleSlug, accent: 'bg-orange-50 text-orange-700 border-orange-200'},
  ];

  return (
    <>
      {enableSeo ? (
        <Seo
          title={pageTitle}
          description={pageDescription}
          canonicalPath={canonicalPath}
          hreflangs={buildHreflangs(canonicalPath)}
          structuredData={createStructuredData(pageTitle, pageDescription, canonicalPath, filteredExercises)}
        />
      ) : null}

      <section aria-labelledby="exercise-finder-title" className="py-2 sm:py-4">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-[linear-gradient(135deg,rgba(244,239,231,0.9),rgba(255,255,255,0.96))] px-5 py-8 sm:px-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-4xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-health-green/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-health-green">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>{isAr ? 'دليل تمارين الجيم' : 'Gym Exercise Finder'}</span>
                  </div>
                  <h1 id="exercise-finder-title" className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                    {headingLabel}
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                    {isAr
                      ? 'استعرض التمارين حسب العضلة الرئيسية أو الفرعية، ثم فلتر النتائج حسب المستوى والمعدات وهدف التمرين. الصفحة منظمة لتخدم الجيم بشكل واضح مع ملاحظات عملية تساعدك على الاختيار.'
                      : 'Explore gym exercises by muscle and sub-muscle, then narrow the list by level, equipment, and training goal. This finder stays fitness-focused while still using coaching cues that are sensible for physically active users.'}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-slate-600" aria-live="polite">
                  <div className="font-semibold text-slate-900">
                    {isAr ? `${filteredExercises.length} تمرين ظاهر الآن` : `${filteredExercises.length} exercises shown`}
                  </div>
                  <div className="mt-1">
                    {activeFilterCount > 0
                      ? isAr
                        ? `${activeFilterCount} فلتر مفعل`
                        : `${activeFilterCount} active filters`
                      : isAr
                        ? 'يمكن مشاركة الرابط الحالي بنفس الفلاتر'
                        : 'Shareable and query-param ready'}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-8 p-5 sm:p-8 xl:grid-cols-[0.95fr_2.05fr]">
              <aside className="space-y-6">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm font-bold text-slate-900">
                    {isAr ? 'ابدأ من أقسام سريعة' : 'Start from quick groups'}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {quickGroups.map((item) => (
                      <Link
                        key={item.slug}
                        to={navigationPaths.exercisesMuscle(lang, item.slug)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition hover:scale-[1.01] ${item.accent}`}
                      >
                        {isAr ? EXERCISE_FINDER_STATIC_ARABIC_LABELS[item.slug] : EXERCISE_FINDER_STATIC_LABELS[item.slug]}
                      </Link>
                    ))}
                  </div>
                </div>

                <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
                  <div className="space-y-2">
                    <label htmlFor={searchId} className="block text-sm font-semibold text-slate-700">
                      {isAr ? 'ابحث عن تمرين' : 'Search exercise'}
                    </label>
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        id={searchId}
                        type="search"
                        value={filters.search}
                        onChange={(event) => setFilters((current) => ({...current, search: event.target.value}))}
                        placeholder={isAr ? 'ابحث باسم التمرين' : 'Search by exercise name'}
                        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-health-green focus:ring-2 focus:ring-health-green/20"
                      />
                    </div>
                  </div>

                  <FilterField
                    id={muscleId}
                    label={isAr ? 'العضلة الرئيسية' : 'Main muscle'}
                    value={filters.muscle}
                    onChange={(value) =>
                      setFilters((current) => ({
                        ...current,
                        muscle: value as MainMuscle | 'all',
                        subMuscle: 'all',
                      }))
                    }
                    options={MAIN_MUSCLE_OPTIONS}
                  />

                  <FilterField
                    id={subMuscleId}
                    label={isAr ? 'العضلة الفرعية' : 'Sub-muscle'}
                    value={filters.subMuscle}
                    onChange={(value) => setFilters((current) => ({...current, subMuscle: value as SubMuscle | 'all'}))}
                    options={subMuscleOptions}
                  />

                  <FilterField
                    id={levelId}
                    label={isAr ? 'المستوى' : 'Level'}
                    value={filters.level}
                    onChange={(value) => setFilters((current) => ({...current, level: value as Level | 'all'}))}
                    options={LEVEL_OPTIONS}
                  />

                  <FilterField
                    id={equipmentId}
                    label={isAr ? 'المعدات' : 'Equipment'}
                    value={filters.equipment}
                    onChange={(value) => setFilters((current) => ({...current, equipment: value as Equipment | 'all'}))}
                    options={EQUIPMENT_OPTIONS}
                  />

                  <FilterField
                    id={typeId}
                    label={isAr ? 'نوع التمرين' : 'Exercise type'}
                    value={filters.exerciseType}
                    onChange={(value) =>
                      setFilters((current) => ({...current, exerciseType: value as ExerciseType | 'all'}))
                    }
                    options={EXERCISE_TYPE_OPTIONS}
                  />
                </form>

                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Target className="h-4 w-4 text-health-green" />
                    <span>{isAr ? 'التركيز العضلي' : 'Target anatomy'}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {anatomyList.length > 0 ? (
                      anatomyList.map((muscle) => <Badge key={muscle}>{toTitle(muscle)}</Badge>)
                    ) : (
                      <span className="text-sm text-slate-600">
                        {isAr ? 'اختر مجموعة عضلية لتظهر لك العضلات الفرعية المرتبطة بها.' : 'Select a muscle group to focus the anatomy view.'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Dumbbell className="h-4 w-4 text-health-green" />
                    <span>{isAr ? 'تمارين شائعة' : 'Popular exercises'}</span>
                  </div>
                  <div className="mt-3 space-y-3">
                    {popularExercises.map((exercise) => (
                      <div key={exercise.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <div className="font-semibold text-slate-900">{exercise.name}</div>
                        <div className="mt-1 text-sm text-slate-600">{exercise.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Share2 className="h-4 w-4 text-health-green" />
                    <span>{isAr ? 'الروابط والمشاركة' : 'Sharing and SEO'}</span>
                  </div>
                  <p className="mt-2 leading-7">
                    {isAr
                      ? 'يمكنك مشاركة الرابط الحالي للاحتفاظ بنفس العضلة والفلاتر المختارة. كما أن المسارات الثابتة مثل '
                      : 'Share the current URL to preserve the selected muscle and active filters. Static page contexts like '}
                    <span className="font-semibold text-slate-900">/exercises/chest</span>
                    {isAr ? ' أو ' : ' or '}
                    <span className="font-semibold text-slate-900">/exercises/legs</span>
                    {isAr
                      ? ' تسهّل الوصول المباشر إلى قسم عضلي محدد.'
                      : ' can use the `pathMuscle` prop in this same component.'}
                  </p>
                </div>
              </aside>

              <div className="space-y-6">
                <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    {isAr ? 'نتائج التمارين المفلترة' : 'Filtered exercise results'}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {isAr
                      ? 'ابدأ بالعضلة المستهدفة أولًا، ثم ضيّق النتائج حسب الهدف والمعدات حتى تبقى القائمة مناسبة وسهلة المراجعة.'
                      : 'Filter by anatomy first, then refine by training goal and equipment so the list stays relevant for both general gym use and movement-aware coaching.'}
                  </p>
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                  <Link
                    to={navigationPaths.dashboard(lang)}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-health-green/30 hover:bg-health-green/5"
                  >
                    <div className="text-sm font-bold text-slate-900">{isAr ? 'تابع تقدمك' : 'Track your progress'}</div>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {isAr ? 'اربط تمارينك بالنتائج والقياسات داخل لوحة المتابعة.' : 'Connect your exercise choices to your saved results in the dashboard.'}
                    </p>
                  </Link>
                  <Link
                    to={navigationPaths.injuries(lang)}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-health-green/30 hover:bg-health-green/5"
                  >
                    <div className="text-sm font-bold text-slate-900">{isAr ? 'راجع الإصابات' : 'Review injury protocols'}</div>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {isAr ? 'إذا كان عندك ألم أو مرحلة تأهيل، افتح بروتوكولات الإصابات قبل اختيار التمرين.' : 'If you are managing pain or rehab, open the injury library before choosing exercises.'}
                    </p>
                  </Link>
                  <Link
                    to={navigationPaths.diets(lang)}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-health-green/30 hover:bg-health-green/5"
                  >
                    <div className="text-sm font-bold text-slate-900">{isAr ? 'ادعم التمرين بالتغذية' : 'Support training with nutrition'}</div>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {isAr ? 'اختيار النظام الغذائي المناسب يساعدك على الاستشفاء والأداء.' : 'Pair your training with the right diet strategy for recovery and performance.'}
                    </p>
                  </Link>
                </section>

                {filteredExercises.length === 0 ? (
                  <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
                    <h2 className="text-2xl font-bold text-slate-900">
                      {isAr ? 'لا توجد تمارين مطابقة' : 'No exercises found'}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {isAr
                        ? 'جرّب توسيع الفلاتر قليلًا مثل العضلة أو المستوى أو المعدات. أحيانًا الدمج الضيق جدًا يقلل النتائج بشكل مقصود.'
                        : 'Try broadening the muscle, sub-muscle, level, or equipment filters. Very narrow combinations are useful, but they can intentionally reduce the list.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2">
                    {filteredExercises.map((exercise) => (
                      <ExerciseCard key={`${exercise.mainMuscle}-${exercise.name}`} exercise={exercise} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
