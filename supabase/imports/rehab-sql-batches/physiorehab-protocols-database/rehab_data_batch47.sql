-- rehab_data_batch47.sql
-- استكمال البيانات للمراحل الاحترافية لليد والأصابع (Boutonniere, Extensor Tendon Hand, Thumb UCL, Mallet Finger)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 85. Boutonniere Deformity - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Boutonniere Deformity' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Splinting & Protection', 'Week 0–6', 
        ARRAY['Protect the central slip repair/injury', 'Maintain DIP joint mobility', 'Prevent fixed PIP flexion'],
        ARRAY['STRICT: No active PIP flexion', 'Must wear extension splint 24/7'],
        ARRAY['DIP joint full passive extension', 'No lag at PIP with splint removed briefly'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Active DIP Flexion (With PIP splinted)', '10 reps every 2h', 'Tightens the lateral bands and improves central slip excursion'),
    (p1_id, 'Active Finger Extension (DIP/MP)', '3 × 15 reps', 'Maintain general finger mobility'),
    (p1_id, 'Spider Walks on Table (MP only)', '3 × 10 reps', 'MP mobility without stressing PIP');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Gradual PIP Flexion & Strengthening', 'Week 6–12', 
        ARRAY['Restore active PIP flexion', 'Maintain full PIP extension', 'Functional grip re-education'],
        ARRAY['Avoid forced passive flexion', 'Monitor for return of "lag"'],
        ARRAY['Active PIP flexion to 90°', 'Full active extension maintained'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Active PIP Flexion (Unassisted)', '3 × 15 reps', 'Gentle initiation of flexor digitorum superficialis'),
    (p2_id, 'Finger Squeezes (Foam ball)', '3 × 15 reps', 'Integrated functional grip'),
    (p2_id, 'Tendon Gliding (Full Fist)', '3 × 10 reps', 'Full finger range coordination');
END IF;


-- 42. Mallet Finger - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Mallet Finger' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Immobilisation & Protection', 'Week 0–8', 
        ARRAY['Maintain terminal extensor tendon healing', 'Prevent DIP joint lag', 'Active PIP/MP mobility'],
        ARRAY['STRICT: No DIP flexion (Avoid even briefly during splint changes)', 'Keep skin dry under splint'],
        ARRAY['Full healing of the tendon/bone', 'No extension lag at 8 weeks'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Active PIP Flexion (While DIP is splinted)', '10 reps every 2h', 'Maintenance of proximal finger and hand mobility'),
    (p1_id, 'Active Web Space Opener', '3 × 15 reps', 'Intrinsic muscle maintenance'),
    (p1_id, 'Wrist ROM', '3 × 15 reps', 'Maintain global hand function');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Gradual Mobilisation', 'Week 8–12', 
        ARRAY['Initiate active DIP flexion', 'Monitor extensor lag', 'Functional use of finger'],
        ARRAY['Avoid heavy lifting with the fingertip', 'If lag returns, re-splint immediately'],
        ARRAY['Active DIP flexion > 40°', 'Stable extension'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Gentle Active DIP Flexion', '10 reps every 4h', 'Start with very light, controlled range'),
    (p2_id, 'Light Pinch (Putty)', '3 × 12 reps', 'Integrated tip-to-tip coordination'),
    (p2_id, 'Pick-up small items (dexterity)', '5 min daily', 'Fine motor functional re-education');
END IF;

END $$;
