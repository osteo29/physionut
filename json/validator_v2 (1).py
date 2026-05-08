import json
import os

def run_validation():
    protocols_path = '/home/ubuntu/production/protocols_v3.json'
    library_path = '/home/ubuntu/production/library_v3.json'
    
    if not os.path.exists(protocols_path) or not os.path.exists(library_path):
        return "Files not found."

    with open(protocols_path, 'r') as f:
        protocols = json.load(f)
    with open(library_path, 'r') as f:
        library = json.load(f)
        
    lib_dict = {ex['id']: ex for ex in library}
    report = {
        "critical_errors": [],
        "clinical_warnings": [],
        "stats": {
            "total_protocols": len(protocols),
            "total_exercises_in_lib": len(library),
            "protocols_with_4_phases": 0
        }
    }

    for p in protocols:
        p_id = p.get('id')
        p_title = p.get('title')
        
        # 1. Consistency: Phase Count
        if len(p.get('phases', [])) == 4:
            report['stats']['protocols_with_4_phases'] += 1
        else:
            report['critical_errors'].append(f"Protocol '{p_title}' has {len(p.get('phases', []))} phases instead of 4.")

        # 2. References Quality
        for ref in p.get('references', []):
            if not ref.get('year') or len(ref.get('title', '')) < 10:
                report['clinical_warnings'].append(f"Broken Ref in '{p_title}': {ref.get('raw')[:40]}...")

        for phase in p.get('phases', []):
            ph_num = phase.get('phase_number')
            
            for ex in phase.get('exercises', []):
                ex_ref = ex.get('exercise_ref')
                dosage = ex.get('dosage', {})
                tags = ex.get('tags', [])
                
                # 3. Library Linkage
                if ex_ref not in lib_dict:
                    report['critical_errors'].append(f"Missing Library Entry: '{ex_ref}' in '{p_title}' Phase {ph_num}")
                    continue
                
                # 4. Clinical Logic: Early Plyo
                if ph_num <= 2 and "plyometric" in tags:
                    report['critical_errors'].append(f"Clinical Risk: Early Plyo in '{p_title}' Phase {ph_num} for '{ex_ref}'")

                # 5. Dosage Consistency
                freq = dosage.get('frequency_per_week')
                if freq and not isinstance(freq, (int, float)):
                    report['critical_errors'].append(f"Dosage Format Error: Freq '{freq}' in '{p_title}' for '{ex_ref}'")

                # 6. Type Consistency
                raw_instr = dosage.get('raw', '').lower()
                ex_type = dosage.get('exercise_type')
                if ("min" in raw_instr or "sec" in raw_instr) and "reps" not in raw_instr:
                    if ex_type != "hold":
                        report['clinical_warnings'].append(f"Type Mismatch: '{ex_ref}' in '{p_title}' is time-based but marked as '{ex_type}'")

    # 7. Library Garbage Check
    for ex_id, ex_data in lib_dict.items():
        if not ex_data.get('clinical_cue') or len(ex_data['clinical_cue']) < 3:
            report['clinical_warnings'].append(f"Empty Cue in Library: '{ex_id}'")

    return report

if __name__ == "__main__":
    res = run_validation()
    print(f"Validation Finished.")
    print(f"Protocols: {res['stats']['total_protocols']} | Lib: {res['stats']['total_exercises_in_lib']}")
    print(f"Consistency: {res['stats']['protocols_with_4_phases']}/{res['stats']['total_protocols']} protocols have 4 phases.")
    
    print(f"\nCritical Errors: {len(res['critical_errors'])}")
    for err in res['critical_errors'][:10]: print(f" - {err}")
    
    print(f"\nClinical Warnings: {len(res['clinical_warnings'])}")
    for warn in res['clinical_warnings'][:10]: print(f" - {warn}")
