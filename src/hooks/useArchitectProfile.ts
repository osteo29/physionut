import {useEffect, useMemo, useRef, useState} from 'react';
import {HealthProfile, type HealthMetrics, PhysioNutritionLogic} from '../services/physioNutritionLogic';

const ARCHITECT_STORAGE_KEY = 'physiohub_architect_profile';

const LEGACY_DEMO_PROFILE = {
  age: 25,
  weight: 70,
  height: 175,
  gender: 'male',
  activityLevel: 1.2,
  goal: 'maintain',
  waist: 80,
  neck: 38,
  injuryType: null,
  recoveryWeek: 1,
  sleepHours: 8,
  waterIntake: 2500,
  proteinCompliance: 0.8,
} satisfies HealthProfile;

const getEmptyArchitectProfile = (): HealthProfile => ({
  age: 0,
  weight: 0,
  height: 0,
  gender: 'male',
  activityLevel: 1.2,
  goal: 'maintain',
  waist: 0,
  neck: 0,
  injuryType: null,
  recoveryWeek: 1,
  sleepHours: 8,
  waterIntake: 0,
  proteinCompliance: 0,
});

const isLegacyDemoProfile = (profile: Partial<HealthProfile>) =>
  profile.age === LEGACY_DEMO_PROFILE.age &&
  profile.weight === LEGACY_DEMO_PROFILE.weight &&
  profile.height === LEGACY_DEMO_PROFILE.height &&
  profile.gender === LEGACY_DEMO_PROFILE.gender &&
  profile.activityLevel === LEGACY_DEMO_PROFILE.activityLevel &&
  profile.goal === LEGACY_DEMO_PROFILE.goal &&
  profile.waist === LEGACY_DEMO_PROFILE.waist &&
  profile.neck === LEGACY_DEMO_PROFILE.neck &&
  profile.injuryType === LEGACY_DEMO_PROFILE.injuryType &&
  profile.recoveryWeek === LEGACY_DEMO_PROFILE.recoveryWeek &&
  profile.sleepHours === LEGACY_DEMO_PROFILE.sleepHours &&
  profile.waterIntake === LEGACY_DEMO_PROFILE.waterIntake &&
  profile.proteinCompliance === LEGACY_DEMO_PROFILE.proteinCompliance;

const hasMeaningfulArchitectData = (profile: HealthProfile) =>
  Boolean(
    profile.age > 0 ||
      profile.weight > 0 ||
      profile.height > 0 ||
      (profile.waist || 0) > 0 ||
      (profile.neck || 0) > 0 ||
      (profile.waterIntake || 0) > 0 ||
      profile.proteinCompliance > 0 ||
      profile.injuryType,
  );

const parseArchitectNumber = (value: string) => {
  if (!value.trim()) return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const architectNumberToInput = (value: number | undefined | null) =>
  value && value > 0 ? String(value) : '';

const loadStoredArchitectProfile = (): HealthProfile => {
  const emptyProfile = getEmptyArchitectProfile();
  const saved = localStorage.getItem(ARCHITECT_STORAGE_KEY);
  if (!saved) return emptyProfile;

  try {
    const parsed = JSON.parse(saved) as HealthProfile;
    return isLegacyDemoProfile(parsed) ? emptyProfile : {...emptyProfile, ...parsed};
  } catch {
    return emptyProfile;
  }
};

export type ArchitectDraft = {
  age: string;
  weight: string;
  height: string;
  recoveryWeek: string;
  waist: string;
  neck: string;
  waterIntake: string;
};

const createArchitectDraft = (profile: HealthProfile): ArchitectDraft => ({
  age: architectNumberToInput(profile.age),
  weight: architectNumberToInput(profile.weight),
  height: architectNumberToInput(profile.height),
  recoveryWeek: String(profile.recoveryWeek || 1),
  waist: architectNumberToInput(profile.waist),
  neck: architectNumberToInput(profile.neck),
  waterIntake: architectNumberToInput(profile.waterIntake),
});

export function useArchitectProfile() {
  const initialArchitectProfile = useMemo<HealthProfile>(() => loadStoredArchitectProfile(), []);
  const [architectProfile, setArchitectProfile] = useState<HealthProfile>(initialArchitectProfile);
  const [architectDraft, setArchitectDraft] = useState<ArchitectDraft>(() => createArchitectDraft(initialArchitectProfile));
  const architectResultsRef = useRef<HTMLDivElement | null>(null);

  const architectMetrics = useMemo<HealthMetrics | null>(() => {
    if (architectProfile.age <= 0 || architectProfile.weight <= 0 || architectProfile.height <= 0) {
      return null;
    }

    return PhysioNutritionLogic.calculateAllMetrics(architectProfile);
  }, [architectProfile]);

  useEffect(() => {
    if (hasMeaningfulArchitectData(architectProfile)) {
      localStorage.setItem(ARCHITECT_STORAGE_KEY, JSON.stringify(architectProfile));
    } else {
      localStorage.removeItem(ARCHITECT_STORAGE_KEY);
    }
  }, [architectProfile]);

  const updateArchitectDraft = (
    field: keyof ArchitectDraft,
    value: string,
    sync?: {
      profileKey: keyof HealthProfile;
      min?: number;
    },
  ) => {
    setArchitectDraft((prev) => ({...prev, [field]: value}));

    if (!sync) return;

    const parsedValue = parseArchitectNumber(value);
    const minValue = sync.min ?? 0;
    const nextValue = parsedValue > 0 ? Math.max(parsedValue, minValue) : 0;

    setArchitectProfile((prev) => {
      if (prev[sync.profileKey] === nextValue) return prev;
      return {...prev, [sync.profileKey]: nextValue};
    });
  };

  const calculateArchitectProfile = () => {
    const nextProfile = {
      ...architectProfile,
      age: Math.max(parseArchitectNumber(architectDraft.age), 0),
      weight: Math.max(parseArchitectNumber(architectDraft.weight), 0),
      height: Math.max(parseArchitectNumber(architectDraft.height), 0),
      recoveryWeek: Math.max(parseArchitectNumber(architectDraft.recoveryWeek), 1),
      waist: Math.max(parseArchitectNumber(architectDraft.waist), 0),
      neck: Math.max(parseArchitectNumber(architectDraft.neck), 0),
      waterIntake: Math.max(parseArchitectNumber(architectDraft.waterIntake), 0),
    };

    setArchitectProfile(nextProfile);
    setArchitectDraft(createArchitectDraft(nextProfile));
    architectResultsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return {
    architectDraft,
    architectMetrics,
    architectProfile,
    architectResultsRef,
    calculateArchitectProfile,
    initialArchitectProfile,
    setArchitectProfile,
    updateArchitectDraft,
  };
}
