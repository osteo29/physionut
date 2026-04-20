import path from 'node:path';
import * as dotenv from 'dotenv';
import {buildInjuryDataWorkspace, DEFAULT_INJURY_DATA_PATHS, writeInjuryDataWorkspace} from './injury-data-workspace';

type Args = {
  inputPath: string;
  outputPath: string;
  reportPath: string;
  parsedPath: string;
  manifestPath: string;
  syncSupabase: boolean;
  sourceName?: string;
};

function parseArgs(argv: string[]): Args {
  const args: Args = {
    ...DEFAULT_INJURY_DATA_PATHS,
    syncSupabase: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    if (current === '--sync-supabase') {
      args.syncSupabase = true;
      continue;
    }

    if (!next) continue;

    if (current === '--input' || current === '-i') {
      args.inputPath = path.resolve(process.cwd(), next);
      index += 1;
      continue;
    }

    if (current === '--output' || current === '-o') {
      args.outputPath = path.resolve(process.cwd(), next);
      index += 1;
      continue;
    }

    if (current === '--report' || current === '-r') {
      args.reportPath = path.resolve(process.cwd(), next);
      index += 1;
      continue;
    }

    if (current === '--parsed' || current === '-p') {
      args.parsedPath = path.resolve(process.cwd(), next);
      index += 1;
      continue;
    }

    if (current === '--manifest' || current === '-m') {
      args.manifestPath = path.resolve(process.cwd(), next);
      index += 1;
      continue;
    }

    if (current === '--source-name' || current === '-s') {
      args.sourceName = next;
      index += 1;
    }
  }

  return args;
}

function getWorkspacePaths(args: Args) {
  return {
    inputPath: args.inputPath,
    outputPath: args.outputPath,
    reportPath: args.reportPath,
    parsedPath: args.parsedPath,
    manifestPath: args.manifestPath,
  };
}

async function syncToSupabase(
  rawText: string,
  sourceName: string | undefined,
  parsedInjuries: ReturnType<typeof buildInjuryDataWorkspace>['parsedInjuries'],
) {
  dotenv.config({path: path.resolve(process.cwd(), '.env.local')});
  dotenv.config({path: path.resolve(process.cwd(), '.env')});

  (globalThis as any).import = {
    meta: {
      env: {
        VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
        VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
        VITE_SITE_URL: process.env.VITE_SITE_URL,
      },
    },
  };

  const {importExerciseProtocolsToSupabase} = await import('../src/services/injurySupabaseService');

  return importExerciseProtocolsToSupabase({
    rawText,
    parsedInjuries,
    sourceName: sourceName || 'CLI Bulk Sync',
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const workspacePaths = getWorkspacePaths(args);
  const workspace = buildInjuryDataWorkspace({
    paths: workspacePaths,
    sourceName: args.sourceName,
  });

  writeInjuryDataWorkspace(workspace, workspacePaths);

  console.log(`Organized protocol workspace from ${args.inputPath}`);
  console.log(`Parsed: ${workspace.summary.parsedCount}`);
  console.log(`Matched: ${workspace.summary.matchedCount}`);
  console.log(`Unmatched: ${workspace.summary.unmatchedCount}`);
  console.log(`Overrides: ${args.outputPath}`);
  console.log(`Report: ${args.reportPath}`);
  console.log(`Parsed JSON: ${args.parsedPath}`);
  console.log(`Manifest: ${args.manifestPath}`);

  if (!args.syncSupabase) return;

  console.log('Syncing organized workspace to Supabase...');
  const result = await syncToSupabase(workspace.rawText, args.sourceName, workspace.parsedInjuries);
  console.log(`Supabase import run: ${result.runId}`);
  console.log(`Supabase imported count: ${result.importedCount}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
