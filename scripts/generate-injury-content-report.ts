import {buildInjuryContentReport} from '../src/services/injuryContentReport';

function printSection(title: string, lines: string[]) {
  console.log(`\n${title}`);
  console.log('-'.repeat(title.length));
  if (!lines.length) {
    console.log('None found.');
    return;
  }
  lines.forEach((line) => console.log(line));
}

const report = buildInjuryContentReport();

console.log(`Injury content report`);
console.log(`Generated: ${report.generatedAt}`);
console.log(`Injuries: ${report.totals.injuries}`);
console.log(`Phases: ${report.totals.phases}`);
console.log(`Imported exercise protocols: ${report.totals.importedExerciseProtocols}`);
console.log(`Missing nutrition plans: ${report.totals.missingNutritionPlans}`);
console.log(`Missing imported exercise protocols: ${report.totals.missingImportedExerciseProtocols}`);
console.log(`Possible duplicate groups: ${report.totals.possibleDuplicateGroups}`);
console.log(`Short protocols in top list: ${report.totals.shortProtocols}`);
console.log(`Unlinked exercise refs: ${report.totals.unlinkedExercises}`);

printSection(
  'Top 20 missing content',
  report.topMissingContent.map(
    (item, index) => `${index + 1}. ${item.name} (${item.id}) - ${item.reasons.slice(0, 4).join('; ')}`,
  ),
);

printSection(
  'Possible duplicates',
  report.possibleDuplicates.slice(0, 20).map(
    (group, index) => `${index + 1}. ${group.key}: ${group.injuries.map((injury) => `${injury.name} (${injury.id})`).join(', ')}`,
  ),
);

printSection(
  'Short protocols',
  report.shortProtocols.map(
    (item, index) => `${index + 1}. ${item.name} (${item.id}) - ${item.reasons.join('; ')}`,
  ),
);

printSection(
  'Unlinked exercise refs',
  report.unlinkedExercises.slice(0, 50).map(
    (item, index) =>
      `${index + 1}. ${item.exerciseRef} - ${item.protocolTitle} / ${item.phaseTitle} (${item.protocolSlug})`,
  ),
);
