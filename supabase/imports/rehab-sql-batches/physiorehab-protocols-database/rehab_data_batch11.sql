-- rehab_data_batch11.sql
-- Batch 11: Protocols 70 to 77 (Post-op & Hand)
-- Run this in your Supabase SQL Editor AFTER schema.sql

DO $$ 
DECLARE 
    proto_id INTEGER;
    p1_id INTEGER;
BEGIN

-- 70. Post-Laminectomy Rehabilitation
INSERT INTO protocols (name, category) VALUES ('Post-Laminectomy Rehabilitation', 'Spine') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Immediate Post-operative', 'Week 0–4', 
    ARRAY['Wound healing and pain management', 'Begin controlled ambulation', 'DVT prevention', 'Patient education on lifting'],
    ARRAY['No lifting >2 kg', 'No sustained sitting >30 min', 'No bending, twisting', 'Monitor wound for infection/CSF leak'],
    ARRAY['Independent ambulation', 'Wound healed', 'Pain ≤4/10 with walking'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Ankle Pumps', '10 × every hour', 'DVT prevention — begin in recovery room'),
(p1_id, 'Walking (hospital corridors)', '5–10 min × 3–4/day', 'Early mobilisation is safe and improves outcomes'),
(p1_id, 'Log Roll Technique', 'Every position change', 'Protect operative site — engage core before movement'),
(p1_id, 'Quad Sets + Ankle Pumps', '3 × 20 reps', 'Maintain lower limb activation while mobility limited');


-- 71. Cubital Tunnel Syndrome
INSERT INTO protocols (name, category) VALUES ('Cubital Tunnel Syndrome', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Conservative Management & Nerve Protection', 'Week 0–6', 
    ARRAY['Reduce ulnar nerve irritation', 'Avoid provocative postures', 'Patient education'],
    ARRAY['Avoid sustained elbow flexion', 'No resting elbow on hard surfaces', 'Elbow extension splint at night'],
    ARRAY['Tingling symptoms reducing', 'Elbow flexion test negative', 'Nighttime splinting tolerated'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Elbow Extension Splinting', 'Nightly — 0–30° flexion', 'Reduces cubital tunnel pressure'),
(p1_id, 'Nerve Gliding — Ulnar Nerve Slider', '3 × 10 reps each arm', 'Gentle excursion, NOT if acute'),
(p1_id, 'Intrinsic Hand Strengthening', '3 × 20 reps, light', 'Maintain hand strength — finger abduction/pinch');


-- 74. Mallet Finger
INSERT INTO protocols (name, category) VALUES ('Mallet Finger', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Immobilisation', 'Week 0–8', 
    ARRAY['Continuous DIP joint extension splinting', 'Prevent extensor lag', 'Skin integrity maintained'],
    ARRAY['DIP joint must NOT be allowed to flex', 'Check skin integrity under splint', 'Strict splint compliance'],
    ARRAY['8 weeks continuous immobilisation completed', 'No extensor lag at DIP', 'Ready for graduated flexion'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'DIP Extension Splinting', '24 hours/day × 8 weeks', 'Zero flexion tolerance — maintain extension with one hand while changing'),
(p1_id, 'PIP Joint AROM', '5 × 10 reps, hourly', 'Maintain PIP and MCP mobility while DIP immobilised'),
(p1_id, 'Oedema Management', 'Continuous + 5 min', 'Reduce swelling — facilitates splint compliance');


-- 76. Flexor Tendon Repair (Zone II)
INSERT INTO protocols (name, category) VALUES ('Flexor Tendon Repair (Zone II)', 'Upper Limb') RETURNING id INTO proto_id;

INSERT INTO phases (protocol_id, phase_number, title, timeline, goals, precautions, criteria_to_progress)
VALUES (proto_id, 1, 'Early Protected Mobilisation', 'Week 0–4', 
    ARRAY['Prevent adhesion formation', 'Early tendon gliding', 'Wound healing/oedema control'],
    ARRAY['Dorsal blocking splint required', 'No active finger flexion', 'No resisted gripping'],
    ARRAY['No signs of tendon rupture', 'Wound healing progressing', 'Passive composite fist achieved'])
RETURNING id INTO p1_id;

INSERT INTO exercises (phase_id, name, parameters, clinical_cue_rationale) VALUES
(p1_id, 'Passive Finger Flexion (Kleinert)', '5 × 10 reps, every 2h', 'Rubber band traction flexes finger — patient actively extends'),
(p1_id, 'Place-and-Hold (modified Duran)', '5 × 10 reps, every 2h', 'Passively position finger in flexion — hold 5 sec'),
(p1_id, 'Oedema Management', 'Continuous', 'Proximal to distal retrograde massage');

END $$;
