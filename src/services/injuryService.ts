import type {InjuryProtocol} from './injuryDatabase';
import {
  getLocalizedBodyRegion,
  getLocalizedCategory,
  getLocalizedInjuryName,
  getLocalizedInjuryOverview,
} from './injuryLocalization';
import {
  fetchCompleteRehabProtocol,
  fetchRehabProtocolsFromSupabase,
  getRehabProtocolSlug,
  type RehabProtocolRow,
} from './rehabProtocolSupabaseService';
import type {Language} from './translations';

export type InjuryCatalogSource = 'supabase' | 'local';

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

function mapSupabaseInjury(row: RehabProtocolRow, lang: Language): InjuryCatalogEntry {
  const slug = getRehabProtocolSlug(row.name);
  const localizedName = getLocalizedInjuryName(slug.replace(/-/g, '_'), row.name, lang) || row.name;
  const bodyRegion = row.category || 'General';
  const overview =
    row.description ||
    `${row.name} rehab protocol with phased goals, precautions, and progression criteria.`;

  return {
    id: slug.replace(/-/g, '_'),
    slug,
    name: localizedName,
    category: getLocalizedCategory(bodyRegion, lang),
    bodyRegion: getLocalizedBodyRegion(bodyRegion, lang),
    overview: getLocalizedInjuryOverview(localizedName, bodyRegion, bodyRegion, overview, lang),
    commonIn: [],
    source: 'supabase',
    remoteRef: row,
  };
}

export function getLocalCatalogInjuries(_lang: Language): InjuryCatalogEntry[] {
  return [];
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

export async function getCatalogInjuries(lang: Language): Promise<{injuries: InjuryCatalogEntry[]; source: InjuryCatalogSource}> {
  try {
    const rows = await getRemoteInjuryRows();
    return {
      injuries: rows.map((row) => mapSupabaseInjury(row, lang)),
      source: 'supabase',
    };
  } catch {
    return {
      injuries: [],
      source: 'local',
    };
  }
}

export async function getInjuryProtocolBySlugWithFallback(
  slug: string,
  lang: Language,
): Promise<{injury: InjuryProtocol | null; source: InjuryCatalogSource; remoteIds: string[]}> {
  try {
    const [protocol, rows] = await Promise.all([
      fetchCompleteRehabProtocol(slug, lang),
      getRemoteInjuryRows(),
    ]);

    return {
      injury: protocol ?? null,
      source: protocol ? 'supabase' : 'local',
      remoteIds: rows.map((row) => getRehabProtocolSlug(row.name).replace(/-/g, '_')),
    };
  } catch {
    return {
      injury: null,
      source: 'local',
      remoteIds: [],
    };
  }
}

export async function getRelatedCatalogInjuriesByIds(
  ids: string[],
  lang: Language,
): Promise<InjuryCatalogEntry[]> {
  const normalizedIds = [...new Set(ids.filter(Boolean))];
  if (!normalizedIds.length) return [];

  try {
    const rows = await getRemoteInjuryRows();
    const remoteById = new Map(rows.map((row) => [getRehabProtocolSlug(row.name).replace(/-/g, '_'), row]));

    return normalizedIds
      .map((id) => {
        const remote = remoteById.get(id);
        return remote ? mapSupabaseInjury(remote, lang) : null;
      })
      .filter((item): item is InjuryCatalogEntry => Boolean(item));
  } catch {
    return [];
  }
}
