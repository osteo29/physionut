-- rehab_data_batch14_final.sql
-- Batch 14 (FINAL): Protocols 94 to 100 (Paediatric & Neurological)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 96. Peripheral Nerve Injury (Peroneal Nerve Palsy)
INSERT INTO protocols (name, category) VALUES ('Peripheral Nerve Injury (Peroneal Nerve Palsy)', 'Neurological / Other') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Nerve Protection & Functional Maintenance', 'Week 0–6', 
    ARRAY['Protect recovering nerve from compression', 'Prevent foot drop complications', 'Maintain passive joint mobility', 'Patient education on recovery timeline'],
    ARRAY['Identify and remove causative compression (e.g. fibular head pressure)', 'AFO mandatory for foot drop', 'Monitor for pressure sores under AFO'],
    ARRAY['Safe ambulation achieved with AFO', 'No equinus contracture developed', 'Early motor return signs (trace DF)', 'Causative factor removed'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'AFO (Ankle-Foot Orthosis) Provision', 'All weight bearing activities', 'Foot drop correction — prevents falls'),
(p1_id, 'Passive Ankle PROM (DF, eversion)', '3 × 20 reps each', 'Prevent equinus and peroneal contracture'),
(p1_id, 'Tibialis Anterior NMES / FES', '20 min, 2×/day if available', 'Electrical stimulation maintains muscle mass'),
(p1_id, 'Proprioception Training (seated)', '3 × 10 reps', 'Maintain sensory input — eyes-open balance');


-- 97. Complex Regional Pain Syndrome (CRPS Type I)
INSERT INTO protocols (name, category) VALUES ('Complex Regional Pain Syndrome (CRPS Type I)', 'Neurological / Other') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Desensitisation & Gentle Activation', 'Week 0–8', 
    ARRAY['Desensitise hypersensitive system', 'Reduce allodynia through graded exposure', 'Prevent disuse atrophy', 'Multidisciplinary team engagement'],
    ARRAY['CRPS is sensitised — aggressive exercise WORSENS outcomes', 'Pain is NOT reliable guide to tissue damage', 'Avoid forced passive mobilisation'],
    ARRAY['Allodynia reducing — touch tolerance improving', 'GMI stages 1 and 2 tolerated', 'Engagement with psych support'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Graded Motor Imagery — Limb Laterality', '10 min, 2×/day', 'Normalise cortical body schema'),
(p1_id, 'Mirror Therapy', '10–20 min, daily', 'Cortical reorganisation — watch reflected limb'),
(p1_id, 'Desensitisation (graded textures)', '10 min, 2×/day', 'Cotton wool → washcloth → towel → brush'),
(p1_id, 'Graded Activity (pacing)', 'Daily structured', 'Activity pacing program — time-based goals');


-- 100. Temporomandibular Joint Dysfunction (TMJ)
INSERT INTO protocols (name, category) VALUES ('Temporomandibular Joint Dysfunction (TMJ)', 'Neurological / Other') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Reduction & Joint Protection', 'Week 0–4', 
    ARRAY['Reduce TMJ pain/clicking/locking', 'Offload TMJ via dietary modification', 'Identify parafunctional habits', 'Patient education on mechanics'],
    ARRAY['Multidisciplinary support needed (dentist)', 'Avoid: hard foods, large bites, gum', 'Cervical dysfunction association'],
    ARRAY['Pain ≤3/10 with daily use', 'Jaw opening ≥35 mm without pain', 'Morning jaw pain reducing'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Jaw Rest Protocol', 'Ongoing', 'Soft diet, small bites — reduce joint loading'),
(p1_id, 'Diaphragmatic Breathing', '5 min × 3/day', 'Reduce sympathetic activation — key driver of jaw clenching'),
(p1_id, 'Tongue-Up Rest Position', 'Conscious habit all day', 'Tongue on palate — reduces TMJ compression'),
(p1_id, 'Relaxation Techniques / Stress Management', 'Daily practice', 'Mindfulness, progressive relaxation');

END $$;
