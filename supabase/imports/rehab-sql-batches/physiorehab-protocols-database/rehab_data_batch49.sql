-- rehab_data_batch49.sql
-- استكمال البيانات للمراحل الاحترافية (Sinding-Larsen-Johansson, Perthes, Pes Anserine, Sinus Tarsi, Tibialis Anterior)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
    p2_id INTEGER;
BEGIN

-- 96. Sinding-Larsen-Johansson - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Sinding-Larsen-Johansson' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Protection & Load Management', 'Week 0–4', 
        ARRAY['Reduce traction at the patellar apex', 'Address soft tissue tightness', 'Maintain pain-free ADLs'],
        ARRAY['No explosive jumping or high-load knee extension', 'Avoid kneeling on hard surfaces'],
        ARRAY['Reduced tenderness at the inferior patellar pole', 'Pain-free daily mobility'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Quadriceps Stretch (Floor)', '3 × 30 sec', 'Reduce tension on the apophysis'),
    (p1_id, 'Quad Sets (Submaximal)', '10 × 10 sec', 'Safe activation without high tensile load'),
    (p1_id, 'Hip Abductor Strengthening (Clamshells)', '3 × 15 reps', 'Proximal stability to reduce distal knee shear');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Load Tolerance & Return to Movement', 'Week 4–12', 
        ARRAY['Increase load tolerance of the patellar tendon', 'Improve landing mechanics', 'Safe return to sport'],
        ARRAY['Monitor for "flare-ups" during PE/Sport', 'Avoid mileage spikes in running'],
        ARRAY['Pain-free single leg squat (partial)', 'Hop tests symmetry > 85%'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Step-downs (Mirror biofeedback)', '3 × 15 reps', 'Improve neuromuscular control of the knee/hip track'),
    (p2_id, 'Bulgarian Split Squats (Partial range)', '3 × 12 reps', 'High intensity loading of the extensor mechanism'),
    (p2_id, 'Double-leg Jumps (Soft landing focus)', '3 × 10 reps', 'Address force attenuation mechanics');
END IF;


-- 69. Pes Anserine Bursitis - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Pes Anserine Bursitis' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Symptom Inhibition & Biomechanical Correction', 'Week 0–3', 
        ARRAY['Reduce inflammation of the bursa', 'Correct valgus loading patterns', 'Maintain knee ROM'],
        ARRAY['Avoid repetitive weighted knee flexion past 90°', 'No heavy running on canted surfaces'],
        ARRAY['Reduced medial joint line tenderness', 'Full pain-free extension'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Hamstring Stretch (Medial focus)', '3 × 45 sec', 'Reduce direct pressure on the bursa from the sartorius/gracilis/semitendinosus'),
    (p1_id, 'Hip Abduction (Resistance band)', '3 × 15 reps', 'Correct medial knee collapse (valgus)'),
    (p1_id, 'Terminal Knee Extension (TKE)', '3 × 15 reps', 'Quad control in last 15 degrees of extension');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Load Progressive & Functional Strength', 'Week 3–8', 
        ARRAY['Strengthen medial knee stabilizers', 'Integrated hip/knee power', 'Return to full ADLs/Running'],
        ARRAY['漸進的 Monitor volume spikes in running', 'No painful lateral cutting moves'],
        ARRAY['Symmetrical lower limb strength', 'Pain-free run > 15 min'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Lateral Lunges (Controlled)', '3 × 12 reps', 'Frontal plane strength and control'),
    (p2_id, 'Weighted Glute Bridges', '3 × 15 reps', 'Posterior chain recruitment to offload the knee'),
    (p2_id, 'Step-ups (Lateral step)', '3 × 12 reps', 'Functional control for ADLs');
END IF;


-- 74. Sinus Tarsi Syndrome - Phase 1 & 2
SELECT id INTO proto_id FROM protocols WHERE name = 'Sinus Tarsi Syndrome' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 1, 'Protection & Stabilisation', 'Week 0–4', 
        ARRAY['Control subtalar joint inflammation', 'Improve lateral ankle stability', 'Establish neutral foot alignment'],
        ARRAY['Avoid forced inversion and eversion movements', 'Limit duration of standing on hard surfaces'],
        ARRAY['Minimal pain over sinus tarsi', 'Normal gait without compensation'])
    RETURNING id INTO p1_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p1_id, 'Single Leg Stance (Firm ground)', '3 × 30 sec', 'Neuromuscular stabilization of the subtalar joint'),
    (p1_id, 'Intrinsic Foot Curls (Towel)', '3 × 20 reps', 'Strengthen small muscles to support the arch and sinus tarsi area'),
    (p1_id, 'Ankle Eversion Isometrics', '10 × 10 sec', 'Establish peroneal control without joint shear');

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Dynamic Stability & Initial Loading', 'Week 4–12', 
        ARRAY['Full functional loading', 'Proprioceptive challenge on unstable surfaces', 'Preparation for impact'],
        ARRAY['Monitor for "locking" or sharp pain on uneven ground', 'No high-speed lateral agility yet'],
        ARRAY['Able to stand on one leg on foam for 30 sec', 'Pain-free walking > 30 min'])
    RETURNING id INTO p2_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Single Leg Stance on Airex Pad', '3 × 45 sec', 'High-level proprioceptive training'),
    (p2_id, 'Heel Raises (Unilateral)', '3 × 15 reps', 'Functional strength for push-off'),
    (p2_id, 'Slow Walking on uneven surfaces (Grass)', '5 min activity', 'Challenge the subtalar joint in a safe environment');
END IF;

END $$;
