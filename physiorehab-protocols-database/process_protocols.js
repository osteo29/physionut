import fs from 'fs';

const files = fs.readdirSync('.').filter(f => f.startsWith('protocols_') && f.endsWith('.sql'));
const protocols = [];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Better splitting to handle entire protocol definitions in one block
    const protocolBlocks = content.split(/---------------------------------------------------------------------------------------/);
    
    protocolBlocks.forEach(block => {
        // Find the protocol name and category
        const protocolMatch = block.match(/INSERT INTO protocols \(name, category\) VALUES \('(.*?)', '(.*?)'\)/);
        
        if (protocolMatch) {
            const protocol = {
                name: protocolMatch[1].trim(),
                category: protocolMatch[2].trim(),
                phases: []
            };

            const phaseVarMap = {};
            
            // Regex for phases. Use non-greedy match for the content between ARRAY[...]
            // We need to be careful with the commas between arrays.
            // Values: (proto_id, phase_num, title, timeline, goals_array, precautions_array, criteria_array)
            const phaseRegex = /INSERT INTO phases \(protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress\)\s*VALUES \(proto_id,\s*(\d+),\s*'(.*?)',\s*'(.*?)',\s*ARRAY\[([\s\S]*?)\]\s*,\s*ARRAY\[([\s\S]*?)\]\s*,\s*ARRAY\[([\s\S]*?)\]\s*\)\s*RETURNING id INTO (p\d+_id);/gs;
            
            let phaseMatch;
            while ((phaseMatch = phaseRegex.exec(block)) !== null) {
                const phaseNum = parseInt(phaseMatch[1]);
                const title = phaseMatch[2];
                const timeline = phaseMatch[3];
                const goalsRaw = phaseMatch[4];
                const precautionsRaw = phaseMatch[5];
                const criteriaRaw = phaseMatch[6];
                const phaseVar = phaseMatch[7];
                
                const parseSqlArray = (raw) => {
                    if (!raw) return [];
                    // Split by ', ' but only if not inside quotes (simplified for this case as we expect standard SQL)
                    // Match: 'item 1', 'item 2'
                    const matches = raw.match(/'(.*?)'(?=\s*,|\s*$)/gs);
                    if (!matches) return [];
                    return matches.map(m => m.trim().replace(/^'|'$/g, '').replace(/''/g, "'").trim()).filter(s => s.length > 0);
                };

                const phase = {
                    number: phaseNum,
                    title: title,
                    timeline: timeline,
                    goals: parseSqlArray(goalsRaw),
                    precautions: parseSqlArray(precautionsRaw),
                    criteria: parseSqlArray(criteriaRaw),
                    exercises: []
                };
                
                protocol.phases.push(phase);
                phaseVarMap[phaseVar] = protocol.phases.length - 1;
            }
            
            // Match exercises
            const exerciseRegex = /INSERT INTO exercises \(phase_id, name, parameters, clinical_cue_rationale\) VALUES\s*([\s\S]*?);/gs;
            let exerciseMatch;
            while ((exerciseMatch = exerciseRegex.exec(block)) !== null) {
                const valuesBlock = exerciseMatch[1];
                // Extract rows: (p1_id, 'Name', 'Params', 'Cue')
                const rowRegex = /\((p\d+_id),\s*'(.*?)',\s*'(.*?)',\s*'(.*?)'\)/gs;
                let row;
                while ((row = rowRegex.exec(valuesBlock)) !== null) {
                    const phaseVar = row[1];
                    const phaseIdx = phaseVarMap[phaseVar];
                    if (phaseIdx !== undefined) {
                        protocol.phases[phaseIdx].exercises.push({
                            name: row[2].replace(/''/g, "'"),
                            parameters: row[3].replace(/''/g, "'"),
                            cue: row[4].replace(/''/g, "'")
                        });
                    }
                }
            }
            
            protocols.push(protocol);
        }
    });
});

// Final check: Filter out empty protocols if any
const finalProtocols = protocols.filter(p => p.phases.length > 0);

fs.writeFileSync('full_protocols.json', JSON.stringify(finalProtocols, null, 2));
console.log(`Successfully processed ${finalProtocols.length} protocols with clean details (Warnings, Criteria, and Cues).`);
