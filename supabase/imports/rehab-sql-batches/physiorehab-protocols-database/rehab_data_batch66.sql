-- rehab_data_batch66.sql
-- الدفعة النهائية لاستكمال كافة المراحل لكافة الإصابات المتبقية (Ankle, Hand, Spine, Pediatrics)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p3_id INTEGER;
    p4_id INTEGER;
BEGIN

-- 1. TFCC Tear (Conservative) - Phase 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'TFCC Tear (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Proprioception & Grip', 'Week 8–16', 
        ARRAY['Maximize grip strength to stabilize the ulnar wrist', 'Increase load in rotation/deviation', 'Return to hand-heavy tasks'],
        ARRAY['Avoid sudden heavy impact (e.g. hitting boxing bag) initially', 'Monitor for ulnar-sided aching'],
        ARRAY['Grip strength > 90% other side', 'Pain-free wrist rotation'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Functional Resilience & Discharge', 'Month 4+', 
        ARRAY['Independent work/sport participation', 'Integrated forearm robustness', 'Zero recurring instability'],
        ARRAY['Maintain eccentric forearm strength'],
        ARRAY['Full functional pain-free ability'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Wrist Stability in Supination (Weighted)', '3 × 15 reps', 'Specific loading for the TFCC ulnar-stabilizers'),
    (p4_id, 'Weight-bearing Holds (Push-up position)', '3 × 30 sec', 'Global wrist axial loading resilience');
END IF;


-- 2. Tibialis Posterior Tendinopathy - Phase 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Tibialis Posterior Tendinopathy' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Impact & Agility Integration', 'Week 12+', 
        ARRAY['Maximize arch support through muscle power', 'Return to running/jumping', 'Address mid-foot stability'],
        ARRAY['Increase mileage slowly', 'Monitor for "medial arch fatigue"'],
        ARRAY['Positive single-leg heel raise x 20', 'Zero pain with jumping'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Conditioning & Maintenance', 'Month 6+', 
        ARRAY['Independent participation', 'Prevention of arch collapse recurrence', 'Lifetime foot health'],
        ARRAY['Maintain arch strengthening routine'],
        ARRAY['Full pain-free sport participation'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Single Leg Hops (Medial focus)', '3 × 10 reps', 'Reactive power for the medial longitudinal arch stabilizers'),
    (p4_id, 'Weighted Heel Raises (Single leg)', '3 × 15 reps (heavy)', 'Maintenance of tendon structural health');
END IF;


-- 3. Cervical Radiculopathy (Conservative) - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Cervical Radiculopathy (Conservative)' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Mobilization & Early Resistance', 'Week 4–8', 
        ARRAY['Centralize symptoms (move from hand to neck)', 'Restore painless cervical ROM', 'Early muscle activation'],
        ARRAY['Avoid positions that increase hand numbness/pain (extension/rotation)', 'No heavy overhead lifting'],
        ARRAY['Symptoms centralized', 'Improved neural mobility'])
    RETURNING id INTO p3_id; -- (using p3_id as temp var)

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Integrated Strength & Nerve Gliding', 'Week 8–16', 
        ARRAY['Build upper limb resistance', 'Restore full neural mobility', 'Address postural endurance'],
        ARRAY['Pace the volume'],
        ARRAY['Zero constant limb pain', 'Neck Disability Index < 20%'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Resilience & Maintenance', 'Month 4+', 
        ARRAY['Independent management', 'Full return to manual tasks/sport', 'Long-term spinal health'],
        ARRAY['Avoid sudden heavy unassisted overhead tasks early morning'],
        ARRAY['Full return to work/activity'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Mid-trap / Rhomboid Rows', '3 × 15 reps', 'Build proximal support for the cervical spine'),
    (p4_id, 'Overhead Shrugs (Maintenance)', '3 × 12 reps', 'Integrated girdle stability');
END IF;


-- 4. Sinding-Larsen-Johansson (Pediatric) - Phase 2, 3 & 4
SELECT id INTO proto_id FROM protocols WHERE name = 'Sinding-Larsen-Johansson Syndrome' LIMIT 1;
IF proto_id IS NOT NULL THEN
    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 2, 'Mobilization & Quadriceps Control', 'Week 4–8', 
        ARRAY['Reduce stress on the inferior patellar pole', 'Improve quad flexibility and control', 'Paced return to school activity'],
        ARRAY['Avoid repetitive impact during growth spurts', 'Ice after sport'],
        ARRAY['Zero pain with stairs', 'Improved quad flexibility'])
    RETURNING id INTO p3_id; -- temp

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 3, 'Advanced Power & Return to Sport', 'Week 8–16', 
        ARRAY['Maximize quad load tolerance', 'Return to competitive youth sport', 'Address jumping biomechanics'],
        ARRAY['Monitor for "tender point" during season spikes'],
        ARRAY['Pain-free jumping', 'Full symmetrical strength'])
    RETURNING id INTO p3_id;

    INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
    VALUES (proto_id, 4, 'Maintenance & Growth Management', 'Ongoing', 
        ARRAY['Maintain flexibility until skeletal maturity', 'Prevent recurrence during training spikes', 'Independent load monitoring'],
        ARRAY['Pacing the load'],
        ARRAY['Successful return to season'])
    RETURNING id INTO p4_id;

    INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
    (p3_id, 'Split Squat Jumps (Control)', '3 × 10 reps', 'Build explosive power while monitoring the patellar tendon load'),
    (p4_id, 'Standing Quad Stretches', 'Daily', 'Crucial during rapid bone growth to reduce tensile force');
END IF;

END $$;
