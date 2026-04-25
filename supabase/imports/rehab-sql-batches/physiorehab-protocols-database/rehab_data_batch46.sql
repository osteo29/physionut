-- rehab_data_batch46.sql
-- استكمال البيانات للمراحل المتوسطة (5th Metatarsal, Sinus Tarsi, Tibialis Anterior, Sciatic Nerve)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 75. 5th Metatarsal Fracture (Jones/Stress) - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = '5th Metatarsal Fracture (Jones/Stress)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Non-Weight Bearing & Protection', 'Week 0–6', 
        ARRAY['Protect the poorly vascularized zone', 'Minimize calf atrophy', 'Improve intrinsic foot mobility'],
        ARRAY['STRICT: No weight bearing unless cleared by X-ray', 'Avoid inversion of the foot'],
        ARRAY['Radiographic evidence of early callus', 'Minimal surgical/injury pain'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Open Chain Toe Curls', '3 × 20 reps', 'Maintain intrinsic muscle activation without loading the bone'),
    (p1_id, 'Active Ankle ROM (Dorsiflexion/Eversion only)', '3 × 15 reps', 'Maintain mobility of the ankle joint'),
    (p1_id, 'Quadriceps/Hip Strengthening (Seated)', '3 × 15 reps', 'Maintain global limb conditioning during non-WB phase');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Progressive Loading & Balance', 'Week 6–12', 
        ARRAY['Full WB in walking boot/shoe', 'Restore gait symmetry', 'Initiate balance training'],
        ARRAY['Avoid repetitive lateral impact', 'Monitor for "aching" at fracture site'],
        ARRAY['Full pain-free WB', 'Radiographic union confirmed'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Seated Calf Raises', '3 × 15 reps', 'Gentle loading of the gastroc/soleus complex'),
    (p2_id, 'Tandem Standing (Supported)', '3 × 30 sec', 'Re-educate balance on fixed base'),
    (p2_id, 'Resistance Band Eversion (Gentle)', '3 × 15 reps', 'Strengthen peroneus brevis - be careful with high tension');
END IF;


-- 101. Sciatic Nerve Neuropathy - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Sciatic Nerve Neuropathy' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Neural Protection & Symptom Control', 'Week 0–4', 
        ARRAY['Calm neural irritability', 'Identify site of compression', 'Maintain general fitness'],
        ARRAY['Avoid aggressive stretching (no Slump/SLR stretches)', 'Avoid prolonged sitting on hard surfaces'],
        ARRAY['Reduced neural hypersensitivity', 'Negative tension signs at rest'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Sciatic Nerve Sliders (Lying)', '3 × 10 reps', 'Tension-free nerve gliding to improve mobility'),
    (p1_id, 'Gentle Gluteal Mobility (No stretch)', '3 × 30 sec', 'Promote blood flow to the surrounding muscle bed'),
    (p1_id, 'Transverse Abdominis Bracing', '10 × 10 sec', 'Stabilize the lumbar spine to reduce proximal irritation');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Nerve Gliding & Functional Strength', 'Week 4–12', 
        ARRAY['Improve nerve excursion', 'Address gluteal/hip weakness', 'Return to safe loaded ADLs'],
        ARRAY['Monitor for neuropathic "flare-ups" post-exercise', 'Ensure spine neutral during loading'],
        ARRAY['Negative Slump test', 'Full pain-free lower limb strength'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Herman (Sciatic) Gliders (Active)', '3 × 15 reps', 'Active nerve mobility through functional ranges'),
    (p2_id, 'Bird-Dog', '3 × 12 reps', 'Core-hip integration'),
    (p2_id, 'Deadlifts (Light/Technique)', '3 × 12 reps', 'Teach hip hinge to offload the nerve path');
END IF;

END $$;
