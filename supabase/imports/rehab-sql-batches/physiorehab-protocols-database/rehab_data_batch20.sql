-- rehab_data_batch20.sql
-- استكمال النواقص: البروتوكولات 60, 64, 65, 68, 69
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 60. Tibialis Anterior Tendinopathy
INSERT INTO protocols (name, category) VALUES ('Tibialis Anterior Tendinopathy', 'Ankle & Foot') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Load Relief & Isometric Control', 'Week 0–4', 
    ARRAY['Reduce anterior ankle pain', 'Offload the tendon (shoe modifications)', 'Isometric dorsiflexion loading'],
    ARRAY['Avoid tight shoelaces (compression risk over tendon)', 'No aggressive stretching of anterior structures', 'Gait assessment for heel-strike issues'],
    ARRAY['Pain ≤3/10 during isometric loading', 'Minimal morning stiffness', 'Improved gait quality'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Isometric Dorsiflexion', '5 × 45 sec, 70% effort', 'High load isometric prevents further atrophy — painless activation'),
(p1_id, 'Modified Lacing Education', 'Ongoing', 'Skip eyelets over the most sensitive area of the tendon'),
(p1_id, 'Deep Intrinsic Arch Strengthening', '3 × 15 reps', 'Address midfoot collapse which increases TA load');


-- 64. Sciatic Nerve Peripheral Neuropathy
INSERT INTO protocols (name, category) VALUES ('Sciatic Nerve Neuropathy', 'Neurological / Other') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Neural Decompression & Symptom Control', 'Week 0–6', 
    ARRAY['Reduce lancinating leg pain', 'Address potential entrapment sites (e.g. piriformis, hamstring)', 'Neural mobilisation'],
    ARRAY['Avoid sustained end-range SLR (Straight Leg Raise)', 'Monitor for muscle weakness (Foot drop)', 'No aggressive stretching of hamstrings'],
    ARRAY['Neural tension sensitivity reducing', 'Muscle power stable or improving', 'Centralisation of symptoms'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Sciatic Nerve Slider (Supine)', '3 × 15 reps', 'Large amplitude, low tension neural excursion'),
(p1_id, 'Soft Tissue Release (Gluteal region)', '2 min', 'Reduce external compression on nerve path'),
(p1_id, 'Dorsiflexion/Plantarflexion Circles', '3 × 20 reps', 'Maintains neural mobility at the distal end (peroneal/tibial branches)');


-- 65. Cervical Facet Joint Syndrome
INSERT INTO protocols (name, category) VALUES ('Cervical Facet Joint Syndrome', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Pain Control & Range Optimisation', 'Week 0–4', 
    ARRAY['Reduce localised neck pain', 'Restore pain-free rotation and lateral flexion', 'Postural stability'],
    ARRAY['Avoid forceful cervical extension + rotation (closed-packed position)', 'No heavy overhead lifting', 'Address upper thoracic stiffness'],
    ARRAY['Symmetrical rotation ROM', 'Pain ≤3/10', 'Minimal guarding of paraspinal muscles'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Cervical Retraction (Chin tuck)', '3 × 15 reps', 'Open facet joints and reduce focal loading'),
(p1_id, 'Gentle AROM Rotation (Pain-free)', '3 × 10 reps each side', 'Movement as medicine — don''t push into pain'),
(p1_id, 'Thoracic Extension (Foam roller)', '3 × 15 reps', 'Address thoracic stiffness to reduce cervical load');


-- 68. Scheuermann''s Disease (Kyphosis Management)
INSERT INTO protocols (name, category) VALUES ('Scheuermann''s Disease', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Postural Correction & Tissue Length', 'Week 0–8', 
    ARRAY['Reduce thoracic kyphotic curve emphasis', 'Stretch tight anterior structures (Pecs)', 'Strengthen posterior chain', 'Pain management (if present)'],
    ARRAY['Age dependent (bone maturity matters)', 'Avoid extreme end-range flexion loading', 'Monitor for any neurological signs (rare)'],
    ARRAY['Shoulder retraction strength improved', 'Improved postural awareness', 'Reduction in mid-back fatigue'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Pectoralis Doorway Stretch', '3 × 45 sec', 'Address anterior tightness causing rounded shoulders'),
(p1_id, 'Thoracic Extensions (Wall-supported)', '3 × 15 reps', 'Progressive extension range focus'),
(p1_id, 'Prone Y/W Exercise', '3 × 15 reps', 'Strengthen lower/mid traps — postural anchor');


-- 69. Thoracic Disc Herniation
INSERT INTO protocols (name, category) VALUES ('Thoracic Disc Herniation', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Neural Protection & Unloading', 'Week 0–6', 
    ARRAY['Reduce radicular pain (ribcage wrap)', 'Maintain available spine ROM', 'Control abdominal pressure'],
    ARRAY['URGENT: Myelopathy signs (lower limb weakness/balance) = immediate referral', 'Avoid heavy spinal rotation', 'Avoid valsalva maneuvers'],
    ARRAY['Radicular pain resolving', 'No progressive neurological deficit', 'Centralisation of symptoms'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Gentle Cat-Camel (Mid-spine focus)', '3 × 12 reps', 'Neural unloading through gentle cyclic motion'),
(p1_id, 'Deep Core Activation (Dead bug)', '3 × 10 reps', 'Address intra-abdominal pressure control'),
(p1_id, 'Thoracic Neutral Posture Training', 'Ongoing', 'Education on mid-back positioning during sitting');

END $$;
