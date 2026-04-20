import path from 'node:path';
import {buildInjuryDataWorkspace, DEFAULT_INJURY_DATA_PATHS, writeInjuryDataWorkspace} from './injury-data-workspace';

type Args = {
  inputPath: string;
  outputPath: string;
  reportPath: string;
};

const DEFAULT_INPUT = DEFAULT_INJURY_DATA_PATHS.inputPath;
const DEFAULT_OUTPUT = DEFAULT_INJURY_DATA_PATHS.outputPath;
const DEFAULT_REPORT = DEFAULT_INJURY_DATA_PATHS.reportPath;

function parseArgs(argv: string[]): Args {
  const args: Args = {
    inputPath: DEFAULT_INPUT,
    outputPath: DEFAULT_OUTPUT,
    reportPath: DEFAULT_REPORT,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];
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
    }
  }

  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const workspace = buildInjuryDataWorkspace({
    paths: {
      inputPath: args.inputPath,
      outputPath: args.outputPath,
      reportPath: args.reportPath,
    },
  });

  writeInjuryDataWorkspace(workspace, {
    inputPath: args.inputPath,
    outputPath: args.outputPath,
    reportPath: args.reportPath,
  });

  console.log(workspace.report);
}

main();
