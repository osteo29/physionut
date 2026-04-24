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
  const {getCurrentUser, signInWithEmail, supabase} = await import('../src/lib/supabase');

  const adminEmail = process.env.SUPABASE_ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.SUPABASE_ADMIN_PASSWORD?.trim();
  const configuredArticleAdmin = process.env.VITE_ARTICLE_ADMIN_EMAIL?.trim().toLowerCase();

  if (adminEmail && adminPassword) {
    console.log(`Signing in to Supabase as ${adminEmail}...`);
    await signInWithEmail(adminEmail, adminPassword);

    const user = await getCurrentUser();
    if (user?.email?.trim().toLowerCase() === configuredArticleAdmin && supabase) {
      const {data: existingAdmin, error: existingAdminError} = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', adminEmail)
        .maybeSingle();

      if (existingAdminError) {
        console.warn(`Could not verify admin_users row: ${existingAdminError.message}`);
      } else if (!existingAdmin) {
        console.log(`Bootstrapping admin_users row for ${adminEmail}...`);
        const {error: bootstrapError} = await supabase.from('admin_users').insert([
          {
            user_id: user.id,
            email: adminEmail,
            full_name:
              typeof user.user_metadata?.full_name === 'string' && user.user_metadata.full_name.trim()
                ? user.user_metadata.full_name.trim()
                : adminEmail.split('@')[0],
            role: 'admin',
            can_edit_injuries: true,
            can_edit_phases: true,
            can_edit_supplements: true,
            can_delete: true,
          },
        ]);

        if (bootstrapError) {
          console.warn(`Could not bootstrap admin_users row automatically: ${bootstrapError.message}`);
        } else {
          console.log('Admin bootstrap completed.');
        }
      }
    }
  } else {
    console.log('No CLI admin credentials found. Sync will use the current Supabase session only.');
  }

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
