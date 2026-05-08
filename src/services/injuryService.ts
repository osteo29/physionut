import {
  fetchCompleteRehabProtocol,
  fetchRehabProtocolsFromSupabase,
  getGeneratedRehabProtocolRows,
  getLastRehabProtocolSource,
  getRehabProtocolSlug,
  type RehabProtocolRow,
} from './rehabProtocolSupabaseService';
import {
  getLocalizedBodyRegion,
  getLocalizedCategory,
  getLocalizedInjuryOverview,
  getLocalizedInjuryName,
} from './injuryLocalization';
import type {InjuryProtocol} from './injuryDatabase';
import {decodeMojibakeDeep} from './textEncoding';
import type {Language} from './translations';

export type InjuryCatalogSource = 'supabase' | 'generated' | 'local';

export type InjuryCatalogEntry = {
  id: string;
  slug: string;
  name: string;
  category: string;
  bodyRegion: string;
  overview: string;
  commonIn: string[];
  source: InjuryCatalogSource;
  remoteRef?: RehabProtocolRow;
};

let remoteInjuryRowsCache: RehabProtocolRow[] | null = null;
let remoteInjuryRowsPromise: Promise<RehabProtocolRow[]> | null = null;

function mapGeneratedInjury(row: RehabProtocolRow, lang: Language, source: InjuryCatalogSource): InjuryCatalogEntry {
  const slug = getRehabProtocolSlug(row.name);
  const localizedName = getLocalizedInjuryName(slug.replace(/-/g, '_'), row.name, lang) || row.name;
  const category = row.category || 'General';
  const bodyRegion = row.category || 'General';
  const overview =
    row.description ||
    `${row.name} rehab protocol with phased goals, precautions, and progression criteria.`;

  return decodeMojibakeDeep({
    id: slug.replace(/-/g, '_'),
    slug,
    name: localizedName,
    category: getLocalizedCategory(category, lang),
    bodyRegion: getLocalizedBodyRegion(bodyRegion, lang),
    overview: getLocalizedInjuryOverview(localizedName, category, bodyRegion, overview, lang),
    commonIn: [],
    source,
    remoteRef: row,
  });
}

export async function getRemoteInjuryRows(options?: {force?: boolean}) {
  if (options?.force) {
    remoteInjuryRowsCache = null;
    remoteInjuryRowsPromise = null;
  }

  if (remoteInjuryRowsCache) {
    return remoteInjuryRowsCache;
  }

  if (!remoteInjuryRowsPromise) {
    remoteInjuryRowsPromise = fetchRehabProtocolsFromSupabase()
      .then((rows) => {
        remoteInjuryRowsCache = rows;
        return rows;
      })
      .catch((error) => {
        remoteInjuryRowsPromise = null;
        throw error;
      });
  }

  return remoteInjuryRowsPromise;
}

export async function getCatalogInjuries(
  lang: Language,
): Promise<{injuries: InjuryCatalogEntry[]; source: InjuryCatalogSource}> {
  const rows = await getRemoteInjuryRows();
  const source = getLastRehabProtocolSource() === 'supabase' ? 'supabase' : 'generated';

  return {
    injuries: rows.map((row) => mapGeneratedInjury(row, lang, source)).sort((left, right) => left.name.localeCompare(right.name)),
    source,
  };
}

export function getLocalCatalogInjuries(lang: Language): InjuryCatalogEntry[] {
  return getGeneratedProtocolCatalog(lang);
}

export async function getInjuryProtocolBySlugWithFallback(
  slug: string,
  lang: Language,
): Promise<{injury: InjuryProtocol | null; source: InjuryCatalogSource; remoteIds: string[]}> {
  const [protocol, rows] = await Promise.all([fetchCompleteRehabProtocol(slug, lang), getRemoteInjuryRows()]);
  const source = getLastRehabProtocolSource() === 'supabase' ? 'supabase' : 'generated';

  return {
    injury: protocol,
    source,
    remoteIds: rows.map((row) => getRehabProtocolSlug(row.name).replace(/-/g, '_')),
  };
}

export async function getRelatedCatalogInjuriesByIds(
  ids: string[],
  lang: Language,
): Promise<InjuryCatalogEntry[]> {
  const normalizedIds = [...new Set(ids.filter(Boolean))];
  if (!normalizedIds.length) return [];

  const rows = await getRemoteInjuryRows();
  const source = getLastRehabProtocolSource() === 'supabase' ? 'supabase' : 'generated';
  const remoteById = new Map(rows.map((row) => [getRehabProtocolSlug(row.name).replace(/-/g, '_'), row]));

  return normalizedIds
    .map((id) => {
      const remote = remoteById.get(id);
      return remote ? mapGeneratedInjury(remote, lang, source) : null;
    })
    .filter((item): item is InjuryCatalogEntry => Boolean(item));
}

function getGeneratedProtocolCatalog(lang: Language) {
  return remoteInjuryRowsCache
    ? remoteInjuryRowsCache.map((row) => mapGeneratedInjury(row, lang, 'generated')).sort((left, right) => left.name.localeCompare(right.name))
    : getGeneratedRowsSnapshot(lang);
}

function getGeneratedRowsSnapshot(lang: Language) {
  return getGeneratedRehabProtocolRows()
    .map((row) => mapGeneratedInjury(row, lang, 'generated'))
    .sort((left, right) => left.name.localeCompare(right.name));
}
