import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const sourceDir = resolve(process.cwd(), 'supabase/imports/rehab-sql-batches/physiorehab-protocols-database');
const outputPath = resolve(process.cwd(), 'src/services/generatedRehabProtocols.ts');
const indexPath = resolve(sourceDir, 'protocol_index.json');

function decodeSqlText(value) {
  return value
    .replace(/''/g, "'")
    .replace(/â€”/g, '—')
    .replace(/â€“/g, '–')
    .replace(/â‰¥/g, '=')
    .replace(/â‰¤/g, '=')
    .replace(/â†’/g, '?')
    .replace(/Â°/g, '°')
    .replace(/Ã—/g, '×')
    .replace(/Â/g, '')
    .trim();
}

function parseArrayItems(raw) {
  return [...raw.matchAll(/'((?:''|[^'])*)'/g)].map((match) => decodeSqlText(match[1]));
}

function parseExerciseTuples(raw) {
  const tuples = [];
  const regex = /\((p\d+_id),\s*'((?:''|[^'])*)',\s*'((?:''|[^'])*)',\s*'((?:''|[^'])*)'\)/g;
  for (const match of raw.matchAll(regex)) {
    tuples.push({
      phaseVar: match[1],
      name: decodeSqlText(match[2]),
      parameters: decodeSqlText(match[3]),
      clinicalCueRationale: decodeSqlText(match[4]),
    });
  }
  return tuples;
}

function normalizeName(value) {
  return decodeSqlText(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[“”"']/g, '')
    .replace(/[()]/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const aliasMap = new Map([
  ['Spondylolisthesis (Conservative)', 'Spondylolisthesis (Grade I-II Conservative)'],
  ['Supraspinatus Tendinopathy (Chronic)', 'Supraspinatus Tear (Partial — Conservative)'],
  ['Calcific Tendinitis (Acute/Reactive)', 'Calcific Tendinitis'],
  ['UCL Sprain — Elbow (Ulnar Collateral Ligament)', 'UCL Sprain (Elbow)'],
  ['Carpal Tunnel Syndrome (Conservative)', 'Carpal Tunnel Syndrome'],
  ['Scaphoid Fracture (Non-operative)', 'Scaphoid Fracture (Post-immobilisation)'],
  ['TFCC Injury', 'TFCC Injury (Conservative)'],
  ['TFCC Tear (Conservative)', 'TFCC Injury (Conservative)'],
  ['Femoroacetabular Impingement (FAI)', 'Femoroacetabular Impingement (FAI) Conservative'],
  ['Adductor / Groin Strain', 'Adductor/Groin Strain'],
  ["Baker's Cyst (Symptomatic)", "Baker's Cyst"],
  ['Tibial Plateau Fracture (Post-operative)', 'Tibial Plateau Fracture (Post-op)'],
  ['Knee Osteoarthritis', 'Knee Osteoarthritis (Conservative)'],
  ['Knee Meniscectomy (Partial)', 'Meniscectomy (Post-operative)'],
  ['Posterior Tibial Tendon Dysfunction (PTTD)', 'Posterior Tibial Tendon Dysfunction'],
  ['Tibialis Posterior Tendinopathy', 'Posterior Tibial Tendon Dysfunction'],
  ['5th Metatarsal Fracture (Jones/Stress)', '5th Metatarsal Fracture (Jones Fracture)'],
  ['Ankle ORIF (Post-operative)', 'Ankle Fracture ORIF (Post-op)'],
  ['Hallux Valgus (Bunions)', 'Hallux Valgus (Post-surgical)'],
  ['Sciatic Nerve Neuropathy', 'Piriformis / Sciatic Nerve Compression'],
  ['Cervical Facet Joint Syndrome', 'Cervical Facet Joint Pain'],
  ["Scheuermann's Disease", "Scheuermann's Kyphosis (Conservative)"],
  ['Trigger Finger (Conservative)', 'Trigger Finger (Post-injection / Post-op)'],
  ['Extensor Tendon Repair (Hand)', 'Extensor Tendon Repair'],
  ["Dupuytren's (Post-operative)", "Dupuytren's Contracture (Post-surgical)"],
  ['Thumb UCL Sprain', "Thumb UCL Sprain (Skier's Thumb)"],
  ['Gluteal Strain', 'Gluteal Muscle Strain'],
  ['Pectoralis Major Rupture', 'Pectoralis Major Tear (Conservative)'],
  ['Distal Biceps Rupture (Post-op)', 'Biceps Rupture — Distal (Post-op)'],
  ['Triceps Rupture (Post-operative)', 'Triceps Tendinopathy'],
  ['Sinding-Larsen-Johansson', 'Sinding-Larsen-Johansson Syndrome'],
  ['Perthes Disease', 'Perthes Disease (Rehabilitation)'],
  ['Peripheral Nerve Injury (Peroneal Nerve Palsy)', 'Peripheral Nerve Injury (Peronal Nerve Palsy)'],
  ['Brachial Plexus Injury', 'Brachial Plexus Neuropraxia (Burner/Stinger)'],
  ['Thoracic Hyperkyphosis', 'Thoracic Hyperkyphosis (Postural)'],
  ["De Quervain's Tenosynovitis (Conservative)", "De Quervain's Tenosynovitis"],
  ['Cervical Radiculopathy (Conservative)', 'Cervical Radiculopathy'],
]);

const canonicalIndex = JSON.parse(readFileSync(indexPath, 'utf8')).map((item) => ({
  name: decodeSqlText(item.name),
  category: decodeSqlText(item.category),
}));

const canonicalByName = new Map(canonicalIndex.map((item) => [item.name, { ...item, phases: [] }]));
const canonicalByNormalized = new Map(canonicalIndex.map((item) => [normalizeName(item.name), item.name]));

function resolveCanonicalName(rawName) {
  const decoded = decodeSqlText(rawName);
  const alias = aliasMap.get(decoded) || decoded;
  if (canonicalByName.has(alias)) return alias;
  const normalized = normalizeName(alias);
  if (canonicalByNormalized.has(normalized)) return canonicalByNormalized.get(normalized);

  let best = null;
  let bestScore = 0;
  const rawTokens = new Set(normalized.split(' ').filter((token) => token.length > 2));
  for (const item of canonicalIndex) {
    const targetNormalized = normalizeName(item.name);
    const targetTokens = new Set(targetNormalized.split(' ').filter((token) => token.length > 2));
    let score = 0;
    for (const token of rawTokens) {
      if (targetTokens.has(token)) score += 1;
    }
    if (targetNormalized.includes(normalized) || normalized.includes(targetNormalized)) score += 2;
    if (score > bestScore) {
      best = item.name;
      bestScore = score;
    }
  }

  return bestScore >= 3 ? best : null;
}

function getOrCreatePhase(protocol, phaseData) {
  const existing = protocol.phases.find((phase) => phase.phaseNumber === phaseData.phaseNumber && phase.title === phaseData.title && phase.timeline === phaseData.timeline);
  if (existing) {
    if (!existing.goals.length && phaseData.goals.length) existing.goals = phaseData.goals;
    if (!existing.precautions.length && phaseData.precautions.length) existing.precautions = phaseData.precautions;
    if (!existing.criteriaToProgress.length && phaseData.criteriaToProgress.length) existing.criteriaToProgress = phaseData.criteriaToProgress;
    return existing;
  }

  const created = {
    phaseNumber: phaseData.phaseNumber,
    title: phaseData.title,
    timeline: phaseData.timeline,
    goals: phaseData.goals,
    precautions: phaseData.precautions,
    criteriaToProgress: phaseData.criteriaToProgress,
    exercises: [],
  };
  protocol.phases.push(created);
  return created;
}

const files = readdirSync(sourceDir)
  .filter((file) => /^rehab_data(.*)\.sql$/i.test(file))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const sectionStartRegex = /INSERT INTO protocols \(name, category\) VALUES \('((?:''|[^'])*)', '((?:''|[^'])*)'\) RETURNING id INTO proto_id;|SELECT id INTO proto_id FROM protocols WHERE name = '((?:''|[^'])*)' LIMIT 1;/g;
const phaseRegex = /INSERT INTO phases \(protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress\)\s*VALUES \(proto_id,\s*(\d+),\s*'((?:''|[^'])*)',\s*'((?:''|[^'])*)',\s*ARRAY\[([\s\S]*?)\],\s*ARRAY\[([\s\S]*?)\],\s*ARRAY\[([\s\S]*?)\]\)\s*RETURNING id INTO (p\d+_id);/g;
const exerciseBlockRegex = /INSERT INTO exercises \(phase_id, name, parameters, clinical_cue_rationale\) VALUES\s*([\s\S]*?);/g;

for (const file of files) {
  const content = readFileSync(join(sourceDir, file), 'utf8');
  const sections = [...content.matchAll(sectionStartRegex)];

  for (let index = 0; index < sections.length; index += 1) {
    const match = sections[index];
    const rawName = match[1] || match[3];
    const rawCategory = match[2] ? decodeSqlText(match[2]) : '';
    const sectionStart = match.index ?? 0;
    const sectionEnd = index + 1 < sections.length ? (sections[index + 1].index ?? content.length) : content.length;
    const section = content.slice(sectionStart, sectionEnd);
    const canonicalName = resolveCanonicalName(rawName);
    if (!canonicalName) continue;

    const protocol = canonicalByName.get(canonicalName);
    if (!protocol) continue;
    if (!protocol.category && rawCategory) protocol.category = rawCategory;

    const phaseVarMap = new Map();
    for (const phaseMatch of section.matchAll(phaseRegex)) {
      const phase = getOrCreatePhase(protocol, {
        phaseNumber: Number(phaseMatch[1]),
        title: decodeSqlText(phaseMatch[2]),
        timeline: decodeSqlText(phaseMatch[3]),
        goals: parseArrayItems(phaseMatch[4]),
        precautions: parseArrayItems(phaseMatch[5]),
        criteriaToProgress: parseArrayItems(phaseMatch[6]),
      });
      phaseVarMap.set(phaseMatch[7], phase);
    }

    for (const exerciseBlock of section.matchAll(exerciseBlockRegex)) {
      for (const tuple of parseExerciseTuples(exerciseBlock[1])) {
        const phase = phaseVarMap.get(tuple.phaseVar);
        if (!phase) continue;
        const duplicate = phase.exercises.find((exercise) => exercise.name === tuple.name && exercise.parameters === tuple.parameters && exercise.clinicalCueRationale === tuple.clinicalCueRationale);
        if (!duplicate) {
          phase.exercises.push({
            name: tuple.name,
            parameters: tuple.parameters,
            clinicalCueRationale: tuple.clinicalCueRationale,
          });
        }
      }
    }
  }
}

const protocols = canonicalIndex.map((item) => {
  const protocol = canonicalByName.get(item.name);
  protocol.phases.sort((a, b) => {
    if (a.phaseNumber !== b.phaseNumber) return a.phaseNumber - b.phaseNumber;
    return a.title.localeCompare(b.title);
  });
  return protocol;
});

const output = `export type GeneratedRehabProtocol = {
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

export const generatedRehabProtocols: GeneratedRehabProtocol[] = ${JSON.stringify(protocols, null, 2)};
`;

writeFileSync(outputPath, output, 'utf8');
const withPhases = protocols.filter((protocol) => protocol.phases.length > 0).length;
console.log(`Generated ${protocols.length} canonical rehab protocols (${withPhases} with phases) to ${outputPath}`);
