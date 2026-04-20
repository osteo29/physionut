import fs from 'node:fs';
import path from 'node:path';
import {
  parseInjuryProtocolText,
  renderInjuryProtocolImportReport,
  renderInjuryProtocolOverridesTS,
  summarizeImportedProtocols,
  type ImportedInjuryProtocol,
  type ProtocolImportSummary,
} from '../src/services/injuryProtocolImport';
import {getAllInjuries} from '../src/services/injuryDatabase';

export type InjuryDataWorkspacePaths = {
  inputPath: string;
  outputPath: string;
  reportPath: string;
  parsedPath: string;
  manifestPath: string;
};

export type InjuryDataWorkspace = {
  rawText: string;
  parsedInjuries: ImportedInjuryProtocol[];
  summary: ProtocolImportSummary;
  overridesFile: string;
  report: string;
  parsedJson: string;
  manifestJson: string;
  manifest: ReturnType<typeof buildManifest>;
};

export const DEFAULT_INJURY_DATA_PATHS: InjuryDataWorkspacePaths = {
  inputPath: path.resolve(process.cwd(), 'tmp', 'injury-import', 'bulk-protocols.txt'),
  outputPath: path.resolve(process.cwd(), 'src', 'services', 'injuryExerciseProtocolOverrides.ts'),
  reportPath: path.resolve(process.cwd(), 'tmp', 'injury-import', 'last-import-report.txt'),
  parsedPath: path.resolve(process.cwd(), 'tmp', 'injury-import', 'parsed-protocols.json'),
  manifestPath: path.resolve(process.cwd(), 'tmp', 'injury-import', 'import-manifest.json'),
};

function buildManifest(params: {
  paths: InjuryDataWorkspacePaths;
  parsedInjuries: ImportedInjuryProtocol[];
  summary: ProtocolImportSummary;
  sourceName?: string;
}) {
  const localInjuries = getAllInjuries();
  const matchedSlugs = new Set(
    params.parsedInjuries.map((item) => item.matchedSlug).filter((item): item is string => Boolean(item)),
  );
  const localCoverageMissing = localInjuries
    .filter((injury) => !matchedSlugs.has(injury.id))
    .map((injury) => ({id: injury.id, name: injury.name}))
    .sort((left, right) => left.name.localeCompare(right.name));

  return {
    generatedAt: new Date().toISOString(),
    source: {
      name: params.sourceName || path.basename(params.paths.inputPath),
      inputPath: params.paths.inputPath,
    },
    files: {
      input: params.paths.inputPath,
      overridesTs: params.paths.outputPath,
      reportTxt: params.paths.reportPath,
      parsedJson: params.paths.parsedPath,
      manifestJson: params.paths.manifestPath,
    },
    summary: {
      parsedCount: params.summary.parsedCount,
      matchedCount: params.summary.matchedCount,
      unmatchedCount: params.summary.unmatchedCount,
    },
    matched: params.summary.matched.map((injury) => ({
      sourceTitle: injury.sourceTitle,
      matchedSlug: injury.matchedSlug,
      phaseCount: injury.phases.length,
    })),
    unmatched: params.summary.unmatched.map((injury) => ({
      heading: injury.heading,
      sourceTitle: injury.sourceTitle,
      requestedSlug: injury.requestedSlug || null,
    })),
    localLibraryCoverage: {
      totalInjuries: localInjuries.length,
      importedCoverageCount: matchedSlugs.size,
      missingCoverageCount: localCoverageMissing.length,
      missingCoverage: localCoverageMissing,
    },
    supabaseSync: {
      tablesTouched: [
        'injuries',
        'injury_phases',
        'supplements',
        'meal_examples',
        'safety_notes',
        'injury_page_content',
        'injury_protocol_import_runs',
      ],
      recommendedCommand: 'npm run protocols:sync',
    },
  };
}

export function buildInjuryDataWorkspace(params?: {
  rawText?: string;
  paths?: Partial<InjuryDataWorkspacePaths>;
  sourceName?: string;
}) {
  const paths = {...DEFAULT_INJURY_DATA_PATHS, ...(params?.paths || {})};
  const rawText =
    params?.rawText ??
    (() => {
      if (!fs.existsSync(paths.inputPath)) {
        throw new Error(`Input file not found: ${paths.inputPath}`);
      }
      return fs.readFileSync(paths.inputPath, 'utf8');
    })();

  const parsedInjuries = parseInjuryProtocolText(rawText);
  const summary = summarizeImportedProtocols(parsedInjuries);
  const overridesFile = renderInjuryProtocolOverridesTS(parsedInjuries);
  const report = renderInjuryProtocolImportReport(parsedInjuries, paths.outputPath);
  const manifest = buildManifest({
    paths,
    parsedInjuries,
    summary,
    sourceName: params?.sourceName,
  });

  return {
    rawText,
    parsedInjuries,
    summary,
    overridesFile,
    report,
    parsedJson: `${JSON.stringify(parsedInjuries, null, 2)}\n`,
    manifestJson: `${JSON.stringify(manifest, null, 2)}\n`,
    manifest,
  } satisfies InjuryDataWorkspace;
}

export function writeInjuryDataWorkspace(
  workspace: InjuryDataWorkspace,
  paths: Partial<InjuryDataWorkspacePaths> = {},
) {
  const resolvedPaths = {...DEFAULT_INJURY_DATA_PATHS, ...paths};

  for (const targetPath of Object.values(resolvedPaths)) {
    fs.mkdirSync(path.dirname(targetPath), {recursive: true});
  }

  fs.writeFileSync(resolvedPaths.outputPath, workspace.overridesFile, 'utf8');
  fs.writeFileSync(resolvedPaths.reportPath, workspace.report, 'utf8');
  fs.writeFileSync(resolvedPaths.parsedPath, workspace.parsedJson, 'utf8');
  fs.writeFileSync(resolvedPaths.manifestPath, workspace.manifestJson, 'utf8');
}
