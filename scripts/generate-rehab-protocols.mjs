import {readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const rootDir = process.cwd();
const newSourcePath = resolve(rootDir, 'physiorehab-protocols-database', 'full_protocols.json');
const legacySourcePath = resolve(rootDir, 'src', 'services', 'generatedRehabProtocols.ts');
const mergedJsonPath = resolve(rootDir, 'physiorehab-protocols-database', 'merged_protocols.json');
const outputTsPath = resolve(rootDir, 'src', 'services', 'generatedRehabProtocols.ts');

function decodeText(value) {
  return String(value ?? '')
    .replace(/''/g, "'")
    .replace(/â€”/g, '—')
    .replace(/â€“/g, '–')
    .replace(/â‰¥/g, '≥')
    .replace(/â‰¤/g, '≤')
    .replace(/â†’/g, '→')
    .replace(/Ã—/g, '×')
    .replace(/Â°/g, '°')
    .replace(/Â/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanList(values) {
  return (Array.isArray(values) ? values : []).map((value) => decodeText(value)).filter(Boolean);
}

function normalizeName(value) {
  return decodeText(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[“”"'`]/g, '')
    .replace(/[()]/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(
      /\b(post|postoperative|post operative|post op|conservative|grade|management|repair|reconstruction|rehabilitation|rehab|syndrome|injury|first|time|graft|generic|surgical|operative)\b/g,
      ' ',
    )
    .replace(/\s+/g, ' ')
    .trim();
}

function extractLegacyProtocols() {
  const source = readFileSync(legacySourcePath, 'utf8');
  const match = source.match(/export const generatedRehabProtocols: GeneratedRehabProtocol\[] = (\[[\s\S]*\]);\s*$/);
  if (!match) {
    throw new Error('Could not parse legacy rehab protocol source.');
  }

  return JSON.parse(match[1]);
}

function toProtocolShape(protocol) {
  return {
    name: decodeText(protocol.name),
    category: decodeText(protocol.category),
    phases: (Array.isArray(protocol.phases) ? protocol.phases : [])
      .map((phase, index) => ({
        phaseNumber: Number(phase.phaseNumber ?? phase.number ?? index + 1),
        title: decodeText(phase.title),
        timeline: decodeText(phase.timeline),
        goals: cleanList(phase.goals),
        precautions: cleanList(phase.precautions),
        criteriaToProgress: cleanList(phase.criteriaToProgress ?? phase.criteria),
        exercises: (Array.isArray(phase.exercises) ? phase.exercises : []).map((exercise) => ({
          name: decodeText(exercise.name),
          parameters: decodeText(exercise.parameters),
          clinicalCueRationale: decodeText(exercise.clinicalCueRationale ?? exercise.cue),
        })),
      }))
      .filter((phase) => phase.title || phase.timeline || phase.goals.length || phase.exercises.length),
  };
}

const aliasEntries = [
  ['ACL Tear Conservative Management', 'ACL Strain (Grade I-II - Conservative)'],
  ['Meniscus Repair (Post-operative)', 'Meniscus Repair (Surgical)'],
  ['Patellar Tendinopathy', "Patellar Tendinopathy (Jumper's Knee)"],
  ['MCL Sprain (Grade II)', 'MCL Tear (Grade II - Conservative)'],
  ['Total Knee Arthroplasty (TKA)', 'Total Knee Replacement (Arthroplasty)'],
  ['PCL Tear Conservative', 'PCL Reconstruction'],
  ['Rotator Cuff Repair (Post-operative)', 'Rotator Cuff Repair (Surgical)'],
  ['Shoulder Impingement Syndrome', 'Subacromial Pain Syndrome (Impingement)'],
  ['Frozen Shoulder (Adhesive Capsulitis)', 'Adhesive Capsulitis (Frozen Shoulder)'],
  ['Ankle Fracture (Post-immobilisation)', 'Ankle Fracture ORIF (Post-op)'],
  ['Spondylolisthesis (Grade I-II Conservative)', 'Spondylolysis / Spondylolisthesis'],
  ['Total Hip Arthroplasty (THA)', 'Total Hip Replacement (Arthroplasty)'],
  ['Distal Radius Fracture (Post-immobilisation)', 'Distal Radius Fracture (Post-operative)'],
  ['Greater Trochanteric Pain Syndrome', 'Greater Trochanteric Pain Syndrome (GTPS)'],
  ['Posterior Tibial Tendon Dysfunction', 'Tibialis Posterior Tendinopathy'],
  ["Baker's Cyst", "Popliteal Cyst (Baker's Cyst)"],
  ['Hallux Valgus (Post-surgical)', 'Hallux Valgus (Bunions)'],
  ['Whiplash Associated Disorder (WAD Grade II)', 'Whiplash Associated Disorder (WAD)'],
  ['Thoracic Outlet Syndrome', 'Thoracic Outlet Syndrome (TOS)'],
  ['TFCC Injury (Conservative)', 'TFCC Tear (Conservative)'],
  ['Scaphoid Fracture (Post-immobilisation)', 'Scaphoid Fracture (Non-operative)'],
];

const aliasMap = new Map(
  aliasEntries.map(([from, to]) => [normalizeName(from), normalizeName(to)]),
);

const newProtocols = JSON.parse(readFileSync(newSourcePath, 'utf8')).map(toProtocolShape);
const legacyProtocols = extractLegacyProtocols().map(toProtocolShape);

const newByNormalizedName = new Map(newProtocols.map((protocol) => [normalizeName(protocol.name), protocol]));

for (const legacyProtocol of legacyProtocols) {
  const normalizedLegacyName = normalizeName(legacyProtocol.name);
  const normalizedAliasName = aliasMap.get(normalizedLegacyName);
  const targetKey =
    normalizedLegacyName && newByNormalizedName.has(normalizedLegacyName)
      ? normalizedLegacyName
      : normalizedAliasName && newByNormalizedName.has(normalizedAliasName)
        ? normalizedAliasName
        : null;

  if (targetKey) {
    continue;
  }

  newByNormalizedName.set(normalizedLegacyName, legacyProtocol);
}

const mergedProtocols = [...newByNormalizedName.values()].sort((left, right) => left.name.localeCompare(right.name));

const tsOutput = `export type GeneratedRehabProtocol = {
  name: string;
  category: string;
  phases: Array<{
    phaseNumber: number;
    title: string;
    timeline: string;
    goals: string[];
    precautions: string[];
    criteriaToProgress: string[];
    exercises: Array<{
      name: string;
      parameters: string;
      clinicalCueRationale: string;
    }>;
  }>;
};

export const generatedRehabProtocols: GeneratedRehabProtocol[] = ${JSON.stringify(mergedProtocols, null, 2)};
`;

writeFileSync(mergedJsonPath, `${JSON.stringify(mergedProtocols, null, 2)}\n`, 'utf8');
writeFileSync(outputTsPath, `${tsOutput}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      newProtocols: newProtocols.length,
      legacyProtocols: legacyProtocols.length,
      mergedProtocols: mergedProtocols.length,
      mergedJsonPath,
      outputTsPath,
    },
    null,
    2,
  ),
);
