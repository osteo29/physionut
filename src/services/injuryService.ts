import {getAllInjuries, getInjuryBySlug, type InjuryProtocol} from './injuryDatabase';
import {
  getLocalizedBodyRegion,
  getLocalizedCategory,
  getLocalizedCommonInjuryContext,
  getLocalizedInjuryName,
  getLocalizedInjuryOverview,
} from './injuryLocalization';
import {
  fetchCompleteInjuryProtocol,
  fetchInjuriesFromSupabase,
  type InjuryRow,
} from './injurySupabaseService';
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
  localRef?: InjuryProtocol;
  remoteRef?: InjuryRow;
};

let remoteInjuryRowsCache: InjuryRow[] | null = null;
let remoteInjuryRowsPromise: Promise<InjuryRow[]> | null = null;

function mapSupabaseInjury(row: InjuryRow, lang: Language): InjuryCatalogEntry {
  const localizedName =
    lang === 'ar'
      ? (row.name_ar && row.name_ar.trim() ? row.name_ar : null) ||
        getLocalizedInjuryName(row.injury_id_slug, row.name_en, lang) ||
        row.name_en
      : getLocalizedInjuryName(row.injury_id_slug, row.name_en, lang) || row.name_en;

  const overviewText =
    lang === 'ar'
      ? (row.overview_ar && row.overview_ar.trim() ? row.overview_ar : null) ||
        getLocalizedInjuryOverview(localizedName, row.category, row.body_region_en, row.overview_en, lang)
      : row.overview_en;

  const bodyRegionText =
    lang === 'ar'
      ? (row.body_region_ar && row.body_region_ar.trim() ? row.body_region_ar : null) ||
        getLocalizedBodyRegion(row.body_region_en, lang)
      : row.body_region_en;

  return {
    id: row.injury_id_slug,
    slug: row.injury_id_slug.replace(/_/g, '-'),
    name: localizedName,
    category: getLocalizedCategory(row.category, lang),
    bodyRegion: bodyRegionText,
    overview: overviewText,
    commonIn: (row.common_in || []).map((item) => getLocalizedCommonInjuryContext(item, lang)),
    source: 'supabase',
    remoteRef: row,
  };
}

function mapLocalInjury(injury: InjuryProtocol, lang: Language): InjuryCatalogEntry {
  const localizedName = getLocalizedInjuryName(injury.id, injury.name, lang);

  return {
    id: injury.id,
    slug: injury.id.replace(/_/g, '-'),
    name: localizedName,
    category: getLocalizedCategory(injury.category, lang),
    bodyRegion: getLocalizedBodyRegion(injury.bodyRegion, lang),
    overview: getLocalizedInjuryOverview(localizedName, injury.category, injury.bodyRegion, injury.overview, lang),
    commonIn: injury.commonIn.map((item) => getLocalizedCommonInjuryContext(item, lang)),
    source: 'local',
    localRef: injury,
  };
}

export function getLocalCatalogInjuries(lang: Language): InjuryCatalogEntry[] {
  return getAllInjuries().map((injury) => mapLocalInjury(injury, lang));
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
    remoteInjuryRowsPromise = fetchInjuriesFromSupabase()
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
    if (rows.length) {
      return {
        injuries: rows.map((row) => mapSupabaseInjury(row, lang)),
        source: 'supabase',
      };
    }
  } catch {
    // Fall back to the local catalog when Supabase is unavailable.
  }

  return {
    injuries: getLocalCatalogInjuries(lang),
    source: 'local',
  };
}

export async function getInjuryProtocolBySlugWithFallback(
  slug: string,
  lang: Language,
): Promise<{injury: InjuryProtocol | null; source: InjuryCatalogSource; remoteIds: string[]}> {
  const fallbackInjury = getInjuryBySlug(slug);

  try {
    const [protocol, rows] = await Promise.all([
      fetchCompleteInjuryProtocol(slug, lang),
      getRemoteInjuryRows(),
    ]);

    return {
      injury: protocol ?? fallbackInjury ?? null,
      source: protocol ? 'supabase' : 'local',
      remoteIds: rows.map((row) => row.injury_id_slug),
    };
  } catch {
    return {
      injury: fallbackInjury ?? null,
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
    const remoteById = new Map(rows.map((row) => [row.injury_id_slug, row]));

    return normalizedIds
      .map((id) => {
        const remote = remoteById.get(id);
        if (remote) return mapSupabaseInjury(remote, lang);

        const local = getAllInjuries().find((injury) => injury.id === id);
        return local ? mapLocalInjury(local, lang) : null;
      })
      .filter((item): item is InjuryCatalogEntry => Boolean(item));
  } catch {
    return getLocalCatalogInjuries(lang).filter((injury) => normalizedIds.includes(injury.id));
  }
}
