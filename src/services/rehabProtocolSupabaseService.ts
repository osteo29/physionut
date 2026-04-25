import type {InjuryProtocol} from './injuryDatabase';
import type {Language} from './translations';
import {
  getGeneratedInjuryProtocolBySlug,
  getGeneratedRehabExerciseRows,
  getGeneratedRehabPhaseRows,
  getGeneratedRehabProtocolRows,
  getGeneratedRehabProtocolSlug,
  type RehabExerciseRow,
  type RehabPhaseRow,
  type RehabProtocolRow,
} from './generatedRehabProtocolSource';

export type {RehabProtocolRow, RehabPhaseRow, RehabExerciseRow};

export function getRehabProtocolSlug(name: string) {
  return getGeneratedRehabProtocolSlug(name);
}

export async function fetchRehabProtocolsFromSupabase(): Promise<RehabProtocolRow[]> {
  return getGeneratedRehabProtocolRows();
}

export async function fetchRehabProtocolBySlug(slug: string): Promise<RehabProtocolRow | null> {
  const rows = getGeneratedRehabProtocolRows();
  return rows.find((row) => getGeneratedRehabProtocolSlug(row.name) === slug) || null;
}

export async function fetchRehabPhasesByProtocolId(protocolId: number): Promise<RehabPhaseRow[]> {
  return getGeneratedRehabPhaseRows(protocolId);
}

export async function fetchRehabExercisesByPhaseIds(phaseIds: number[]): Promise<RehabExerciseRow[]> {
  return getGeneratedRehabExerciseRows(phaseIds);
}

export async function fetchCompleteRehabProtocol(
  slug: string,
  lang: Language = 'en',
): Promise<InjuryProtocol | null> {
  return getGeneratedInjuryProtocolBySlug(slug, lang);
}
