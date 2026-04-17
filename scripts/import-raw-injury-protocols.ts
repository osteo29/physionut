import fs from 'node:fs';
import path from 'node:path';
import {
  parseInjuryProtocolText,
  renderInjuryProtocolImportReport,
  renderInjuryProtocolOverridesTS,
} from '../src/services/injuryProtocolImport';

type Args = {
  inputPath: string;
  outputPath: string;
  reportPath: string;
};

const DEFAULT_INPUT = path.resolve(process.cwd(), 'tmp', 'injury-import', 'bulk-protocols.txt');
const DEFAULT_OUTPUT = path.resolve(process.cwd(), 'src', 'services', 'injuryExerciseProtocolOverrides.ts');
const DEFAULT_REPORT = path.resolve(process.cwd(), 'tmp', 'injury-import', 'last-import-report.txt');

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

  if (!fs.existsSync(args.inputPath)) {
    throw new Error(`Input file not found: ${args.inputPath}`);
  }

  const rawText = fs.readFileSync(args.inputPath, 'utf8');
  const injuries = parseInjuryProtocolText(rawText);
  const overridesFile = renderInjuryProtocolOverridesTS(injuries);
  const report = renderInjuryProtocolImportReport(injuries, args.outputPath);

  fs.mkdirSync(path.dirname(args.outputPath), {recursive: true});
  fs.mkdirSync(path.dirname(args.reportPath), {recursive: true});
  fs.writeFileSync(args.outputPath, overridesFile, 'utf8');
  fs.writeFileSync(args.reportPath, report, 'utf8');

  console.log(report);
}

main();
