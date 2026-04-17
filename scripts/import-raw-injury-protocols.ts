import fs from 'node:fs';
import path from 'node:path';
import {getAllInjuries} from '../src/services/injuryDatabase';

type Args = {
  inputPath: string;
  outputPath: string;
  reportPath: string;
};

type ExercisePlanImport = {
  label: string;
  sets?: string;
  cues?: string[];
};

type PhaseImport = {
  phaseNumber: number;
  label?: string;
  duration?: string;
  goals: string[];
  cautions: string[];
  progressionMarkers: string[];
  exercises: string[];
  exercisePlans: ExercisePlanImport[];
};

type InjuryImport = {
  heading: string;
  sourceTitle: string;
  requestedSlug?: string;
  matchedSlug?: string;
  phases: PhaseImport[];
};

type InjuryCandidate = {
  id: string;
  name: string;
  normalizedId: string;
  normalizedName: string;
  tokenSet: Set<string>;
};

const DEFAULT_INPUT = path.resolve(process.cwd(), 'tmp', 'injury-import', 'bulk-protocols.txt');
const DEFAULT_OUTPUT = path.resolve(process.cwd(), 'src', 'services', 'injuryExerciseProtocolOverrides.ts');
const DEFAULT_REPORT = path.resolve(process.cwd(), 'tmp', 'injury-import', 'last-import-report.txt');
const PAGE_NOISE_PATTERN = /physionutrition|evidence-based rehab|\|\s*\d+\s*$/i;
const HEADING_PATTERN = /^(?:[A-Z][A-Z\s/&-]+\s+)?\d+\.\s+.+/;
const STANDALONE_HEADING_NUMBER_PATTERN = /^\d+\.$/;
const SECTION_LABEL_PATTERN = /^(?:[A-Z][A-Z\s/&-]+|[A-Z][A-Z\s/&-]+\s+&\s+[A-Z][A-Z\s/&-]+)$/;
const PHASE_HEADER_PATTERN = /^Phase\s+(\d+)\s*[\u2013\u2014-]\s*(.+)$/i;
const BULLET_PATTERN = /^[\-*\u2022]\s*/;
const CRITERIA_TITLE_PATTERN = /criteria to progress/i;
const GOALS_TITLE_PATTERN = /goals/i;
const PRECAUTIONS_TITLE_PATTERN = /precautions/i;
const REFERENCES_TITLE_PATTERN = /references/i;
const EXERCISE_TITLE_PATTERN = /^exercise parameters/i;
const DOSING_PATTERN = /(\b\d+\s*[x\u00d7]\s*\d+|\b\d+\s*(?:min|mins|minutes|sec|secs|seconds|reps|rep|sets|steps|hours|hour|days|day|weeks|week|months|month)\b|\bstart\s+\d+\s*min)/i;

const EXPLICIT_SLUG_ALIASES: Record<string, string> = {
  'acl tear conservative management': 'acl_injury',
  'pcl tear conservative': 'pcl_injury',
  'iliotibial band syndrome': 'it_band_syndrome',
  'knee osteoarthritis conservative': 'osteoarthritis_flare',
  'hip osteoarthritis conservative': 'osteoarthritis_flare',
  'anterior shoulder dislocation first time': 'glenohumeral_dislocation',
  'posterior shoulder instability': 'glenohumeral_dislocation',
  'calcific tendinitis': 'shoulder_impingement',
  'slap lesion conservative': 'labrum_tear',
  'supraspinatus tear partial conservative': 'rotator_cuff',
  'lateral ankle sprain grade i ii': 'ankle_sprain',
  'hip labral tear conservative': 'hip_dysplasia_labral_tear',
  'lateral epicondylalgia tennis elbow': 'lateral_epicondylitis',
  'medial epicondylalgia golfers elbow': 'medial_epicondylitis',
  'medial epicondylalgia golfer s elbow': 'medial_epicondylitis',
  'ucl sprain elbow ulnar collateral ligament': 'ucl_injury',
  'de quervains tenosynovitis': 'de_quervain_tenosynovitis',
  'de quervain s tenosynovitis': 'de_quervain_tenosynovitis',
  'tfcc injury triangular fibrocartilage complex conservative': 'wrist_instability_tfcc',
  'thumb ucl sprain skiers thumb': 'thumb_collateral_ligament',
  'thumb ucl sprain skier s thumb': 'thumb_collateral_ligament',
  'distal radius fracture post immobilisation': 'distal_radius_fracture_rehab',
  'ankle fracture post immobilisation': 'ankle_fracture_rehab',
  'hip flexor strain iliopsoas': 'hip_flexor_tendinopathy',
  'adductor groin strain': 'adductor_strain',
  'gluteal muscle strain': 'glute_strain',
  'rectus femoris strain': 'quadriceps_strain',
  'pectoralis major tear conservative': 'pectoral_strain',
  'stress reaction femoral neck': 'stress_fracture',
  'piriformis syndrome': 'sciatica',
  'proximal humerus fracture non operative': 'humeral_head_fracture',
  'temporomandibular joint dysfunction tmj': 'tmj_disorder',
  'cervical radiculopathy': 'cervical_disc_herniation',
  'thoracic outlet syndrome tos': 'thoracic_outlet_syndrome',
  'spinal stenosis lumbar conservative': 'lumbar_spinal_stenosis',
  'facet joint dysfunction lumbar': 'lumbar_facet_joint_dysfunction',
  'sacroiliac joint dysfunction': 'sacroiliac_joint_dysfunction',
  'piriformis syndrome sciatic nerve compression': 'sciatica',
  'cervical facet joint pain': 'cervical_facet_joint_pain',
  'scheuermann s kyphosis conservative': 'scheuermanns_kyphosis',
  'thoracic disc herniation': 'thoracic_disc_herniation',
  'peroneal tendinopathy': 'peroneal_tendinopathy',
  'posterior tibial tendon dysfunction pttd': 'posterior_tibial_tendon_dysfunction',
  'sinus tarsi syndrome': 'sinus_tarsi_syndrome',
  '5th metatarsal fracture jones fracture': 'jones_fracture_rehab',
  'ankle fracture orif post operative': 'ankle_fracture_orif_rehab',
  'hallux valgus post surgical rehabilitation': 'hallux_valgus_rehab',
  'tibialis anterior tendinopathy': 'tibialis_anterior_tendinopathy',
  'total knee arthroplasty tka': 'total_knee_arthroplasty',
  'quadriceps tendinopathy': 'quadriceps_tendinopathy',
  'baker s cyst': 'bakers_cyst',
  'tibial plateau fracture post op': 'tibial_plateau_fracture_rehab',
  'meniscectomy post operative': 'meniscectomy_rehab',
  'spondylolisthesis grade i ii conservative': 'spondylolisthesis',
  'post laminectomy rehabilitation': 'post_laminectomy_rehab',
  'total hip arthroplasty tha': 'total_hip_arthroplasty',
  'snapping hip syndrome coxa saltans': 'snapping_hip_syndrome',
  'radial tunnel syndrome': 'radial_tunnel_syndrome',
  'trigger finger post injection post op': 'trigger_finger',
  'mallet finger': 'mallet_finger',
  'boutonniere deformity': 'boutonniere_deformity',
  'flexor tendon repair zone ii': 'flexor_tendon_repair_zone_ii',
  'extensor tendon repair': 'extensor_tendon_repair',
  'dupuytren s contracture post surgical': 'dupuytrens_contracture',
  'biceps rupture distal post op': 'distal_biceps_rupture_rehab',
  'triceps tendinopathy': 'triceps_tendinopathy',
  'little leaguer s shoulder proximal humeral epiphysiolysis': 'little_leaguers_shoulder',
  'sinding larsen johansson syndrome': 'sinding_larsen_johansson',
  'perthes disease rehabilitation': 'perthes_disease',
  'peripheral nerve injury peroneal nerve palsy': 'peroneal_nerve_palsy',
  'complex regional pain syndrome crps type i': 'crps_type_i',
  'brachial plexus neuropraxia burner stinger': 'brachial_plexus_neuropraxia',
  'thoracic hyperkyphosis postural': 'thoracic_hyperkyphosis'
};

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

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[()[\]{}]/g, ' ')
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(' ')
    .map((item) => item.trim())
    .filter((item) => item.length > 1);
}

function buildCandidates() {
  return getAllInjuries().map<InjuryCandidate>((protocol) => ({
    id: protocol.id,
    name: protocol.name,
    normalizedId: normalizeText(protocol.id.replace(/_/g, ' ')),
    normalizedName: normalizeText(protocol.name),
    tokenSet: new Set([...tokenize(protocol.id.replace(/_/g, ' ')), ...tokenize(protocol.name)]),
  }));
}

function cleanLine(line: string) {
  return line
    .replace(/\t/g, ' ')
    .replace(/\u2014/g, ' - ')
    .replace(/\u2013/g, ' - ')
    .replace(/\u00d7/g, ' x ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isHeadingLine(line: string) {
  return HEADING_PATTERN.test(line);
}

function extractRequestedSlug(line: string) {
  const match = line.match(/^\[slug:\s*([a-z0-9_-]+)\s*\]$/i);
  return match?.[1]?.trim().toLowerCase();
}

function prepareLines(rawText: string) {
  const originalLines = rawText.split(/\r?\n/);
  const prepared: string[] = [];

  for (let index = 0; index < originalLines.length; index += 1) {
    const line = cleanLine(originalLines[index]);
    if (!line) continue;
    if (PAGE_NOISE_PATTERN.test(line)) continue;
    if (SECTION_LABEL_PATTERN.test(line) && !isHeadingLine(line)) continue;

    if (STANDALONE_HEADING_NUMBER_PATTERN.test(line)) {
      let lookaheadIndex = index + 1;
      let titleLine = '';

      while (lookaheadIndex < originalLines.length) {
        const nextLine = cleanLine(originalLines[lookaheadIndex]);
        if (!nextLine) {
          lookaheadIndex += 1;
          continue;
        }

        if (PAGE_NOISE_PATTERN.test(nextLine) || SECTION_LABEL_PATTERN.test(nextLine)) {
          lookaheadIndex += 1;
          continue;
        }

        titleLine = nextLine;
        break;
      }

      if (titleLine) {
        prepared.push(`${line} ${titleLine}`);
        index = lookaheadIndex;
        continue;
      }
    }

    prepared.push(line);
  }

  return prepared;
}

function splitInjuryBlocks(rawText: string) {
  const lines = prepareLines(rawText);
  const blocks: Array<{requestedSlug?: string; lines: string[]}> = [];
  let currentLines: string[] = [];
  let pendingSlug: string | undefined;

  for (const line of lines) {
    const requestedSlug = extractRequestedSlug(line);
    if (requestedSlug) {
      pendingSlug = requestedSlug;
      continue;
    }

    if (isHeadingLine(line)) {
      if (currentLines.length) blocks.push({requestedSlug: pendingSlug, lines: currentLines});
      currentLines = [line];
      pendingSlug = undefined;
      continue;
    }

    if (!currentLines.length) continue;
    currentLines.push(line);
  }

  if (currentLines.length) blocks.push({requestedSlug: pendingSlug, lines: currentLines});
  return blocks;
}

function parseSourceTitle(heading: string) {
  const withoutPrefix = heading.replace(/^(?:[A-Z][A-Z\s/&-]+\s+)?\d+\.\s+/i, '').trim();
  return withoutPrefix.replace(/\s+Phase\s+1\b.*$/i, '').trim();
}

function scoreCandidate(sourceTitle: string, candidate: InjuryCandidate) {
  const normalizedSource = normalizeText(sourceTitle);
  if (!normalizedSource) return 0;
  if (normalizedSource === candidate.normalizedName || normalizedSource === candidate.normalizedId) return 1000;

  let score = 0;
  if (normalizedSource.includes(candidate.normalizedName)) score += 300;
  if (normalizedSource.includes(candidate.normalizedId)) score += 250;
  if (candidate.normalizedName.includes(normalizedSource)) score += 120;

  const sourceTokens = new Set(tokenize(sourceTitle));
  for (const token of sourceTokens) {
    if (candidate.tokenSet.has(token)) score += 30;
  }

  return score;
}

function resolveSlug(sourceTitle: string, requestedSlug: string | undefined, candidates: InjuryCandidate[]) {
  if (requestedSlug) return candidates.find((candidate) => candidate.id === requestedSlug)?.id;

  const aliasMatch = EXPLICIT_SLUG_ALIASES[normalizeText(sourceTitle)];
  if (aliasMatch) return aliasMatch;

  const ranked = candidates
    .map((candidate) => ({id: candidate.id, score: scoreCandidate(sourceTitle, candidate)}))
    .sort((left, right) => right.score - left.score);

  return ranked[0] && ranked[0].score >= 120 ? ranked[0].id : undefined;
}

function findSectionIndex(lines: string[], matcher: RegExp) {
  return lines.findIndex((line) => matcher.test(line));
}

function sliceSection(lines: string[], startIndex: number, endIndex: number) {
  if (startIndex === -1) return [];
  return lines.slice(startIndex + 1, endIndex === -1 ? lines.length : endIndex).filter(Boolean);
}

function extractBulletItems(lines: string[]) {
  return lines
    .map((line) => cleanLine(line.replace(BULLET_PATTERN, '')))
    .filter((line) => Boolean(line) && !/^(exercise|parameters|clinical cue|rationale)$/i.test(line));
}

function buildExerciseRows(lines: string[]) {
  const filtered = lines.filter((line) => {
    if (!line) return false;
    if (/^exercise parameters/i.test(line)) return false;
    if (GOALS_TITLE_PATTERN.test(line) || PRECAUTIONS_TITLE_PATTERN.test(line) || CRITERIA_TITLE_PATTERN.test(line)) return false;
    return true;
  });

  const rows: string[] = [];

  for (let index = 0; index < filtered.length; index += 1) {
    const line = filtered[index];
    const next = filtered[index + 1];
    const wordCount = line.split(' ').filter(Boolean).length;
    const looksLikeExerciseLabel = line.includes('(') || wordCount <= 5;

    if (DOSING_PATTERN.test(line)) {
      rows.push(line);
      continue;
    }

    if (next && DOSING_PATTERN.test(next) && looksLikeExerciseLabel) {
      rows.push(`${line} ${next}`);
      index += 1;
      continue;
    }

    if (rows.length) {
      rows[rows.length - 1] = `${rows[rows.length - 1]} ${line}`.replace(/\s+/g, ' ').trim();
    }
  }

  return rows;
}

function parseExerciseRow(row: string): ExercisePlanImport | null {
  const cleaned = cleanLine(row);
  const match = cleaned.match(DOSING_PATTERN);
  if (!match || match.index == null) return null;

  const label = cleanLine(cleaned.slice(0, match.index));
  const details = cleanLine(cleaned.slice(match.index));
  if (!label || !details) return null;

  return {
    label,
    sets: details,
  };
}

function parsePhaseLines(lines: string[]) {
  const phaseHeaders = lines
    .map((line, index) => {
      const match = line.match(PHASE_HEADER_PATTERN);
      if (!match) return null;
      return {index, phaseNumber: Number(match[1]), headerText: match[2].trim()};
    })
    .filter((value): value is {index: number; phaseNumber: number; headerText: string} => Boolean(value));

  const phases: PhaseImport[] = [];

  for (let index = 0; index < phaseHeaders.length; index += 1) {
    const current = phaseHeaders[index];
    const next = phaseHeaders[index + 1];
    const phaseLines = lines.slice(current.index, next ? next.index : lines.length);
    const phaseEndIndex = findSectionIndex(phaseLines, REFERENCES_TITLE_PATTERN);
    const usableLines = phaseEndIndex === -1 ? phaseLines : phaseLines.slice(0, phaseEndIndex);

    const goalsIndex = findSectionIndex(usableLines, GOALS_TITLE_PATTERN);
    const precautionsIndex = findSectionIndex(usableLines, PRECAUTIONS_TITLE_PATTERN);
    const exerciseIndex = findSectionIndex(usableLines, EXERCISE_TITLE_PATTERN);
    const criteriaIndex = findSectionIndex(usableLines, CRITERIA_TITLE_PATTERN);
    const goalEndIndex = precautionsIndex !== -1 ? precautionsIndex : exerciseIndex !== -1 ? exerciseIndex : criteriaIndex;
    const cautionEndIndex = exerciseIndex !== -1 ? exerciseIndex : criteriaIndex;
    const exercisesLines = sliceSection(usableLines, exerciseIndex, criteriaIndex);

    const phaseLabelMatch = current.headerText.match(/^(.*?)(?:\(([^)]+)\))?$/);
    const phaseLabel = cleanLine(phaseLabelMatch?.[1] || current.headerText);
    const phaseDuration = cleanLine(phaseLabelMatch?.[2] || '');
    const exerciseRows = buildExerciseRows(exercisesLines);
    const exercisePlans = exerciseRows.map(parseExerciseRow).filter((value): value is ExercisePlanImport => Boolean(value));

    phases.push({
      phaseNumber: current.phaseNumber,
      label: phaseLabel || undefined,
      duration: phaseDuration || undefined,
      goals: extractBulletItems(sliceSection(usableLines, goalsIndex, goalEndIndex)),
      cautions: extractBulletItems(sliceSection(usableLines, precautionsIndex, cautionEndIndex)),
      progressionMarkers: extractBulletItems(sliceSection(usableLines, criteriaIndex, -1)),
      exercises: exercisePlans.map((plan) => plan.label),
      exercisePlans,
    });
  }

  return phases;
}

function parseBlocks(rawText: string, candidates: InjuryCandidate[]) {
  return splitInjuryBlocks(rawText)
    .map<InjuryImport>((block) => {
      const heading = block.lines[0];
      const sourceTitle = parseSourceTitle(heading);
      const firstPhaseHeader = heading.match(/(Phase\s+1\s*[\u2013\u2014-]\s*.+)$/i)?.[1];
      const phaseLines = firstPhaseHeader ? [cleanLine(firstPhaseHeader), ...block.lines.slice(1)] : block.lines.slice(1);

      return {
        heading,
        sourceTitle,
        requestedSlug: block.requestedSlug,
        matchedSlug: resolveSlug(sourceTitle, block.requestedSlug, candidates),
        phases: parsePhaseLines(phaseLines),
      };
    })
    .filter((injury) => injury.phases.length > 0);
}

function renderOverridesFile(injuries: InjuryImport[]) {
  const matched = injuries.filter((injury) => injury.matchedSlug && injury.phases.length);
  const records = matched.map((injury) => [
    injury.matchedSlug,
    {
      sourceTitle: injury.sourceTitle,
      phases: injury.phases.map((phase) => ({
        phaseNumber: phase.phaseNumber,
        ...(phase.label ? {label: phase.label} : {}),
        ...(phase.duration ? {duration: phase.duration} : {}),
        ...(phase.goals.length ? {goals: phase.goals} : {}),
        ...(phase.cautions.length ? {cautions: phase.cautions} : {}),
        ...(phase.progressionMarkers.length ? {progressionMarkers: phase.progressionMarkers} : {}),
        ...(phase.exercises.length ? {exercises: phase.exercises} : {}),
        ...(phase.exercisePlans.length ? {exercisePlans: phase.exercisePlans} : {}),
      })),
    },
  ]);

  const objectLiteral = JSON.stringify(Object.fromEntries(records), null, 2);

  return `export type ExercisePlanOverride = {\n  label: string;\n  sets?: string;\n  reps?: string;\n  rest?: string;\n  equipment?: string;\n  alternatives?: string[];\n  cues?: string[];\n};\n\nexport type InjuryExercisePhaseOverride = {\n  phaseNumber: number;\n  label?: string;\n  duration?: string;\n  goals?: string[];\n  cautions?: string[];\n  progressionMarkers?: string[];\n  exercises?: string[];\n  exercisePlans?: ExercisePlanOverride[];\n};\n\nexport type InjuryExerciseProtocolOverride = {\n  sourceTitle: string;\n  phases: InjuryExercisePhaseOverride[];\n};\n\nexport const injuryExerciseProtocolOverrides: Record<string, InjuryExerciseProtocolOverride> = ${objectLiteral};\n`;
}

function renderReport(injuries: InjuryImport[], outputPath: string) {
  const matched = injuries.filter((injury) => injury.matchedSlug);
  const unmatched = injuries.filter((injury) => !injury.matchedSlug);
  const lines = [
    `Parsed injuries: ${injuries.length}`,
    `Matched injuries: ${matched.length}`,
    `Unmatched injuries: ${unmatched.length}`,
    `Output: ${outputPath}`,
    '',
    'Matched:',
    ...matched.map((injury) => `- ${injury.sourceTitle} -> ${injury.matchedSlug} (${injury.phases.length} phases)`),
    '',
    'Unmatched:',
    ...unmatched.map((injury) => `- ${injury.heading}`),
  ];

  return `${lines.join('\n')}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const candidates = buildCandidates();

  if (!fs.existsSync(args.inputPath)) {
    throw new Error(`Input file not found: ${args.inputPath}`);
  }

  const rawText = fs.readFileSync(args.inputPath, 'utf8');
  const injuries = parseBlocks(rawText, candidates);
  const overridesFile = renderOverridesFile(injuries);
  const report = renderReport(injuries, args.outputPath);

  fs.mkdirSync(path.dirname(args.outputPath), {recursive: true});
  fs.mkdirSync(path.dirname(args.reportPath), {recursive: true});
  fs.writeFileSync(args.outputPath, overridesFile, 'utf8');
  fs.writeFileSync(args.reportPath, report, 'utf8');

  console.log(report);
}

main();















