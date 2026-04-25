-- rehab_data_batch41_final.sql
-- استكمال البيانات للمراحل النهائية (Tennis Elbow, Hamstring, ITB, Quad Tendon, Adductor)
-- Final Data Batch for Functional Return

DO $$ 
DECLARE 
    proto_id INTEGER;
    p3_id INTEGER;
BEGIN

-- 23. Lateral Epicondylalgia (Tennis Elbow) - Phase 3: Return to Play
-- Timeline: Week 8–16
SELECT id INTO proto_id FROM protocols WHERE name = 'Lateral Epicondylalgia (Tennis Elbow)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Functional Return & Sport Specificity', 'Week 8–16', 
        ARRAY['Full sports/work re-integration', 'Maximal grip strength recovery', 'Integrated upper limb power'],
        ARRAY['Monitor for "flare-ups" during repetitive eccentric tasks', 'Gradual re-introduction of manual tools/rackets'],
        ARRAY['Symmetrical grip strength', 'Pain-free full speed task execution'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Shadow Swings (Tennis/Golf)', '3 × 20 reps', 'Sport-specific motor re-education'),
    (p3_id, 'Plyometric wrist flips (Light ball)', '3 × 15 reps', 'High rate-of-force development for tendon resilience'),
    (p3_id, 'Weighted Carries (Farmer''s walks)', '3 × 30 meters', 'Integrated grip and scapular stability under fatigue');
END IF;


-- 25. Hamstring Strain (Grade II) - Phase 3: Return to Sprint & Play
-- Timeline: Week 6–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Hamstring Strain (Grade II)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Return to Sprint & Competition', 'Week 6–12', 
        ARRAY['Full maximal sprint speed (100%)', 'Safe reactive deceleration', 'Sport-specific positional work'],
        ARRAY['No maximal sprints until hop tests > 95%', 'Monitor for proximal hamstring "tightness"'],
        ARRAY['Symmetrical Nordic strength', 'Pain-free maximal contraction at end-range flexion'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Sprint Starts (75% → 100%)', '5-8 reps, 20 meters', 'Specific loading of the hamstrings in high-velocity lengthening'),
    (p3_id, 'Nordic Hamstring Curls (Full)', '3 × 5 reps', 'Maintenance of peak eccentric capacity'),
    (p3_id, 'Sliding Hamstring Curls (Single leg)', '3 × 12 reps', 'Core-hamstring integrated stability');
END IF;


-- 27. Iliotibial Band Syndrome - Phase 3: Return to Running/Cycling
-- Timeline: Week 8+
SELECT id INTO proto_id FROM protocols WHERE name = 'Iliotibial Band Syndrome' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Full Return to Running & Performance', 'Week 8+', 
        ARRAY['Full return to previous mileage/intensity', 'Manage hill loading and speed work', 'Long-term maintenance of hip power'],
        ARRAY['Avoid sudden jumps in weekly mileage (> 10% rule)', 'Ensure equipment (shoes/bike fit) is optimized'],
        ARRAY['Pain-free running for 60 min', 'Symmetrical hip abduction strength (> 20% BW in testing)'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Single-leg Bounding (controlled)', '3 × 15 meters', 'Reactive lateral stability and impact attenuation'),
    (p3_id, 'Crossover Drills (Karaoke)', '3 × 20 meters', 'Integrated frontal plane mobility and stability'),
    (p3_id, 'Hip Trust (Weighted)', '3 × 10 reps', 'Gluteal power development to offload the TFL/ITB');
END IF;


-- 44. Adductor / Groin Strain - Phase 3: High-Intensity Agility
-- Timeline: Week 6–12
SELECT id INTO proto_id FROM protocols WHERE name = 'Adductor / Groin Strain' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Return to High-Intensity Sport', 'Week 6–12', 
        ARRAY['Full agility and reactive cutting', 'Safe return to kicking and maximal sprinting', 'Integrated pelvic/core power'],
        ARRAY['Monitor for groin pain during rapid cross-over steps', 'Avoid excessive volume of kicking early'],
        ARRAY['HAGOS score improvement', 'Pain-free reactive multidirectional drills'])
    RETURNING id INTO p3_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Crossover Sprints (Change of direction)', '3 × 10 reps', 'Specific adductor loading during rapid directional change'),
    (p3_id, 'Kicking Drills (Short → Long range)', 'Graded session', 'Functional sports demand re-integration'),
    (p3_id, 'Copenhagen Plank (Integrated with movement)', '10 reps each side', 'Maintain peak adductor resilience');
END IF;

END $$;
