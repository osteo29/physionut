-- rehab_data_batch61.sql
-- الدفعة النهائية لاستكمال المراحل 3 و 4 للحالات المتخصصة (Spine, Internal, Neuro)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 64. Whiplash Associated Disorder (WAD) - Phase 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Whiplash Associated Disorder (WAD)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Dynamic Neck Stability & Resistance', 'Week 12+', 
        ARRAY['Full cervical endurance', 'Restore multi-planar stability', 'Return to high-load activity'],
        ARRAY['Monitor for dizziness/headache after loading', 'Avoid repetitive forceful jarring of the neck'],
        ARRAY['Neck Disability Index < 10%', 'Full pain-free range'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Functional Resilience & Discharge', 'Month 6+', 
        ARRAY['Independent management', 'Full social/work re-integration', 'Postural robustness'],
        ARRAY['Maintain ergonomic breaks', 'Global fitness integration'],
        ARRAY['Zero activity restrictions'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Resisted Neck Isometric (Band)', '10 × 10 sec', 'Increase threshold for cervical muscle fatigue'),
    (p4_id, 'Shoulder Shrugs (Weighted)', '3 × 15 reps', 'Integrated support for the cervical spine');
END IF;


-- 66. Stroke Recovery (Sub-acute) - Phase 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Stroke Recovery (Sub-acute)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Functional Strength & Gait Optimization', 'Month 3–6', 
        ARRAY['Improve gait speed and quality', 'Maximize upper limb dexterity', 'Integrated ADLs'],
        ARRAY['Monitor for fatigue and fall risk', 'Address cognitive load during movement'],
        ARRAY['Improved Berg Balance Score', 'Safe independent ambulation'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Community Life & Maintenance', 'Month 6+', 
        ARRAY['Maximize community participation', 'Long-term maintenance of motor gains', 'Quality of life improvement'],
        ARRAY['Prevent secondary atrophy', 'Address mood/psychological wellbeing'],
        ARRAY['Successful return to previous life roles'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Obstacle Course Walking', '15 min session', 'Improve reactive balance and gait modulation'),
    (p4_id, 'Group Exercise Class (Community)', '2-3 weekly', 'Social and physical maintenance');
END IF;


-- 68. Parkinson''s Disease (Early Stage) - Phase 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Parkinson''s Disease (Early Stage)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'High Intensity & Complex Move Training', 'Month 3+', 
        ARRAY['Integrated large amplitude movements (LSVT BIG style)', 'Improve dual-tasking capacity', 'Maximize cardiovascular health'],
        ARRAY['Monitor for orthostatic hypotension', 'Prioritize safety during high-velocity moves'],
        ARRAY['Stabilized UPDRS score', 'Improved functional gait'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Maintenance & Lifestyle Integration', 'Ongoing', 
        ARRAY['Maintain current functional level as long as possible', 'Neuroprotection through regular exercise', 'Active social life'],
        ARRAY['Address changes in medication response'],
        ARRAY['Stable motor performance'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Boxing-style Training (Non-contact)', '3 × 10 min', 'Large, explosive moves are effective for reducing bradykinesia'),
    (p4_id, 'Daily Tai Chi / Yoga', '1 session daily', 'Maintenance of balance and axial mobility');
END IF;


-- 10. Fibromyalgia - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Fibromyalgia' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Aerobic Conditioning & Graded Load', 'Week 4–12', 
        ARRAY['Establish consistent low-impact aerobic habit', 'Reduce fear of movement', 'Address sleep/fatigue through activity'],
        ARRAY['Avoid "boom and bust" activity cycles', 'Pace volume carefully'],
        ARRAY['Consistent 3x week movement', 'Stable pain levels during load'])
    RETURNING id INTO p2_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Strength Re-introduction', 'Week 12+', 
        ARRAY['Build global muscular endurance', 'Enhance joint stability', 'Improve central pain processing'],
        ARRAY['Monitor for systemic "flare-ups" longer than 48hrs'],
        ARRAY['Improved FIQ score', 'Higher tolerance for ADLs'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Maintenance & Resilience', 'Ongoing', 
        ARRAY['Independent symptom management', 'Sustained active lifestyle', 'Quality of life'],
        ARRAY['Maintain routine during stress'],
        ARRAY['Low subjective impact of symptoms'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p2_id, 'Brisk Walking (Graduated)', '15-30 min daily', 'Aerobic exercise is highly evidence-based for fibromyalgia symptoms'),
    (p3_id, 'Light Resistance Training', '2 × 12 reps', 'Increase threshold for muscle fatigue and sensitivity'),
    (p4_id, 'Aqua Aerobics', '2 sessions weekly', 'Low impact maintenance in a supportive environment');
END IF;

END $$;
