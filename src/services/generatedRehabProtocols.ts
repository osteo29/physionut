export type GeneratedRehabProtocol = {
  name: string;
  category: string;
  phases: Array<{
    phaseNumber: number;
    title: string;
    timeline: string;
    goals: string[];
    precautions: string[];
    criteriaToProgress: string[];
    exercises: Array<{
      name: string;
      parameters: string;
      clinicalCueRationale: string;
    }>;
  }>;
};

export const generatedRehabProtocols: GeneratedRehabProtocol[] = [
  {
    "name": "ACL Reconstruction (Hamstring Graft)",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Immediate Post-op",
        "timeline": "Week 0–2",
        "goals": [
          "Control pain & swelling",
          "Achieve full passive knee extension",
          "Quadriceps activation",
          "Independent ambulation with crutches"
        ],
        "precautions": [
          "No active knee extension 0–90°",
          "Avoid hamstring loading (graft protection)",
          "PWB with crutches"
        ],
        "criteriaToProgress": [
          "Full passive extension achieved",
          "SLR without extension lag",
          "Swelling <1+ on effusion scale"
        ],
        "exercises": [
          {
            "name": "Quadriceps Sets (Isometric)",
            "parameters": "3 × 20 reps, 5-sec hold",
            "clinicalCueRationale": "Flatten back of knee to bed, feel VMO contract"
          },
          {
            "name": "Ankle Pumps",
            "parameters": "3 × 30 reps",
            "clinicalCueRationale": "Reduce DVT risk, improve circulation"
          },
          {
            "name": "Straight Leg Raise (SLR)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Lock knee before lifting, no lag allowed"
          },
          {
            "name": "Heel Slides (AAROM Flexion)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Slide heel toward buttocks, hold 2 sec at end range"
          },
          {
            "name": "Passive Knee Extension (prone hang)",
            "parameters": "3 × 5 min",
            "clinicalCueRationale": "Let gravity achieve full extension"
          },
          {
            "name": "Patellar Mobilisation",
            "parameters": "2 × 2 min",
            "clinicalCueRationale": "Medial, lateral, superior glides — pain free"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Early Strengthening",
        "timeline": "Week 2–6",
        "goals": [
          "0–120° ROM",
          "Normalise gait without crutches",
          "Begin CKC loading",
          "Neuromuscular re-education"
        ],
        "precautions": [
          "Avoid OKC knee extension 0–60°",
          "No pivoting or cutting",
          "Monitor effusion with activity"
        ],
        "criteriaToProgress": [
          "Full ROM 0–120°",
          "Single-leg stance ≥30 sec",
          "Normal gait pattern without device"
        ],
        "exercises": [
          {
            "name": "Mini Squats (0–45°)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Knees track over 2nd toe, weight through heels"
          },
          {
            "name": "Step-Ups (10 cm box)",
            "parameters": "3 × 15 reps each leg",
            "clinicalCueRationale": "Lead with affected leg, control descent"
          },
          {
            "name": "Leg Press (60–90°)",
            "parameters": "3 × 15 reps, light load",
            "clinicalCueRationale": "Bilateral then unilateral, avoid locking out"
          },
          {
            "name": "Terminal Knee Extension (band)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Focus on last 20° — VMO activation"
          },
          {
            "name": "Hip Abduction — Side-lying",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain pelvic stability, control return"
          },
          {
            "name": "Calf Raises (bilateral)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Full ROM, slow eccentric phase"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Advanced Strengthening",
        "timeline": "Week 6–12",
        "goals": [
          "Limb Symmetry Index (LSI) >70%",
          "Begin jogging",
          "Develop strength & power",
          "Proprioception training"
        ],
        "precautions": [
          "No change-of-direction sport",
          "Monitor for effusion post-exercise",
          "Gradual plyometric loading"
        ],
        "criteriaToProgress": [
          "LSI ≥80% quad & hamstring strength",
          "Hop test symmetry ≥80%",
          "Jog pain-free 30 min"
        ],
        "exercises": [
          {
            "name": "Bulgarian Split Squat",
            "parameters": "4 × 10 reps each",
            "clinicalCueRationale": "Front foot flat, torso upright, 90° knee flexion"
          },
          {
            "name": "Romanian Deadlift",
            "parameters": "4 × 10 reps",
            "clinicalCueRationale": "Hip hinge pattern, neutral spine, feel hamstring load"
          },
          {
            "name": "Lateral Band Walks",
            "parameters": "3 × 15 steps each direction",
            "clinicalCueRationale": "Maintain squat position, band around ankles"
          },
          {
            "name": "Single-Leg Press",
            "parameters": "4 × 12 reps",
            "clinicalCueRationale": "Progressive loading, track limb symmetry"
          },
          {
            "name": "Box Step-Down",
            "parameters": "3 × 12 reps each",
            "clinicalCueRationale": "Slow 5-sec eccentric, control valgus collapse"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Return to Sport",
        "timeline": "Month 4–9",
        "goals": [
          "LSI ≥90% all hop tests",
          "Sport-specific agility",
          "Psychological readiness",
          "Full return to unrestricted sport"
        ],
        "precautions": [
          "Clear psychological readiness (ACL-RSI score)",
          "Minimum 9 months post-op for contact sport",
          "Gradual reintroduction to team training"
        ],
        "criteriaToProgress": [
          "LSI ≥90% quad/hamstring/hop",
          "ACL-RSI ≥65",
          "Clearance from surgeon + physio"
        ],
        "exercises": [
          {
            "name": "T-Agility Test Drills",
            "parameters": "4–6 sets",
            "clinicalCueRationale": "Progressive speed increase over weeks"
          },
          {
            "name": "Reactive Change-of-Direction",
            "parameters": "3 × 10 reps",
            "clinicalCueRationale": "Controlled, then progress to reactive cues"
          },
          {
            "name": "Plyometric Progression (single-leg)",
            "parameters": "3 × 8 reps",
            "clinicalCueRationale": "Lateral hops, bounding, depth jumps — master each before progressing"
          },
          {
            "name": "Sport-Specific Drills",
            "parameters": "3 × 5 min blocks",
            "clinicalCueRationale": "Cutting, deceleration, sport movement patterns"
          },
          {
            "name": "Strength Maintenance (Gym)",
            "parameters": "3 × week",
            "clinicalCueRationale": "Maintain gains achieved in Phase 3"
          }
        ]
      }
    ]
  },
  {
    "name": "ACL Tear — Conservative Management",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute",
        "timeline": "Week 0–2",
        "goals": [
          "Reduce effusion & pain",
          "Achieve full extension",
          "Restore basic quad activation"
        ],
        "precautions": [
          "Avoid pivoting/cutting",
          "Brace if instability present",
          "No impact loading"
        ],
        "criteriaToProgress": [
          "Full extension",
          "Minimal effusion",
          "SLR without lag"
        ],
        "exercises": [
          {
            "name": "Quad Sets",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Isometric quad contraction, focus on VMO"
          },
          {
            "name": "SLR (Flexion)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Maintain full knee extension throughout"
          },
          {
            "name": "Ankle Pumps",
            "parameters": "3 × 30 reps",
            "clinicalCueRationale": "Circulation and swelling control"
          },
          {
            "name": "Prone Knee Hang (extension)",
            "parameters": "3 × 5 min",
            "clinicalCueRationale": "Achieve neutral 0° extension"
          },
          {
            "name": "Cryotherapy",
            "parameters": "15–20 min every 2h",
            "clinicalCueRationale": "Post-exercise swelling management"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening",
        "timeline": "Week 2–8",
        "goals": [
          "Full ROM",
          "Symmetrical strength",
          "Normalise gait",
          "Functional stability"
        ],
        "precautions": [
          "Avoid high-risk pivot sports without brace",
          "Monitor giving-way episodes"
        ],
        "criteriaToProgress": [
          "Limb symmetry >80%",
          "No giving way with daily activities",
          "Single leg squat with good control"
        ],
        "exercises": [
          {
            "name": "Wall Squat (45–60°)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Isometric hold 5 sec at bottom"
          },
          {
            "name": "Step-ups",
            "parameters": "3 × 15 reps each",
            "clinicalCueRationale": "Step height progresses 10→15→20 cm"
          },
          {
            "name": "Hip Strengthening Circuit",
            "parameters": "3 × 15 reps each",
            "clinicalCueRationale": "Abductors, extensors, external rotators"
          },
          {
            "name": "TKE (band)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Terminal knee extension focus on VMO"
          },
          {
            "name": "Single-leg Balance",
            "parameters": "3 × 30 sec",
            "clinicalCueRationale": "Eyes open then closed, unstable surface progression"
          }
        ]
      }
    ]
  },
  {
    "name": "Facet Joint Dysfunction (Lumbar)",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Control & Mobilisation",
        "timeline": "Week 0–3",
        "goals": [
          "Reduce lumbar facet joint pain",
          "Restore segmental lumbar mobility",
          "Identify directional preference"
        ],
        "precautions": [
          "Avoid end-range lumbar extension and rotation",
          "Rule out red flags",
          "Facet pain is often worse in morning"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 with daily activities",
          "Lumbar ROM improving (flexion)",
          "Morning stiffness under 30 min"
        ],
        "exercises": [
          {
            "name": "Knee-to-Chest Stretches",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Flexion unloads facet joint — primary pain-relief position"
          },
          {
            "name": "Lumbar Rotation Stretch",
            "parameters": "3 × 30 sec each",
            "clinicalCueRationale": "Gentle facet mobilisation — stop at pain barrier"
          },
          {
            "name": "Posterior Pelvic Tilt (standing, wall)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Reduce lumbar lordosis — offload posterior facets"
          },
          {
            "name": "Walking (paced)",
            "parameters": "15–20 min × 2/day",
            "clinicalCueRationale": "Controlled loading — better than rest"
          }
        ]
      }
    ]
  },
  {
    "name": "Sacroiliac Joint Dysfunction",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Control & Joint Stabilisation",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce SIJ pain",
          "SIJ compression via sacral belt",
          "Identify provocative positions"
        ],
        "precautions": [
          "Confirm SIJ diagnosis via 3+ tests",
          "Avoid single-leg stance loading early",
          "SIJ belt worn 24h initially"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 with daily activities",
          "SIJ provocation tests reducing",
          "Able to stand single-leg 10 sec"
        ],
        "exercises": [
          {
            "name": "Posterior Pelvic Tilt (supine)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Transversus abdominis activation — force closure of SIJ"
          },
          {
            "name": "Clamshell (band)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Gluteus medius — reduces SIJ shear via posterior oblique sling"
          },
          {
            "name": "Inner Range Quad (SLR in slight flexion)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "VMO + hip stabiliser activation — reduce pelvic instability"
          }
        ]
      }
    ]
  },
  {
    "name": "Whiplash Associated Disorder (WAD Grade II)",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Management",
        "timeline": "Week 0–3",
        "goals": [
          "Reduce acute cervical pain",
          "Maintain mobility",
          "Screen for yellow flags"
        ],
        "precautions": [
          "WAD Grade III/IV require referral",
          "Avoid hard cervical collar",
          "Early psychological support"
        ],
        "criteriaToProgress": [
          "Pain ≤4/10 with daily activities",
          "Cervical ROM recovering (rotation)",
          "Yellow flags screened"
        ],
        "exercises": [
          {
            "name": "Cervical AROM — all planes (immediate)",
            "parameters": "3 × 10 reps each direction",
            "clinicalCueRationale": "Early movement is the single most important intervention"
          },
          {
            "name": "Cervical Retraction (chin tucks)",
            "parameters": "3 × 15 reps, 5 sec hold",
            "clinicalCueRationale": "Restore natural cervical curve — reduce facet tension"
          },
          {
            "name": "Heat Application",
            "parameters": "15 min × 3–4/day",
            "clinicalCueRationale": "Reduce paraspinal muscle spasm — improve mobility"
          }
        ]
      }
    ]
  },
  {
    "name": "Osteoporotic Vertebral Fracture (Conservative)",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Protection & Pain Management",
        "timeline": "Week 0–6",
        "goals": [
          "Fracture healing via protected activity",
          "Acute pain control",
          "Prevent deconditioning"
        ],
        "precautions": [
          "AVOID all spinal flexion exercises",
          "No lumbar rotation under load",
          "Monitor neurological status"
        ],
        "criteriaToProgress": [
          "Pain ≤4/10 with walking",
          "Fracture clinically stable",
          "Neurological status intact"
        ],
        "exercises": [
          {
            "name": "Breathing Exercises (diaphragmatic)",
            "parameters": "5 min × 4/day",
            "clinicalCueRationale": "Maintain chest expansion — prevents pneumonia"
          },
          {
            "name": "Isometric Gluteal Sets",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain hip extensor activation without spinal loading"
          },
          {
            "name": "Hip Extension in Standing (gentle)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Posterior chain activation — neutral spine maintained"
          }
        ]
      }
    ]
  },
  {
    "name": "Post-Laminectomy Rehabilitation",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Immediate Post-operative",
        "timeline": "Week 0–4",
        "goals": [
          "Wound healing and pain management",
          "Begin controlled ambulation",
          "DVT prevention",
          "Patient education on lifting"
        ],
        "precautions": [
          "No lifting >2 kg",
          "No sustained sitting >30 min",
          "No bending, twisting",
          "Monitor wound for infection/CSF leak"
        ],
        "criteriaToProgress": [
          "Independent ambulation",
          "Wound healed",
          "Pain ≤4/10 with walking"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps",
            "parameters": "10 × every hour",
            "clinicalCueRationale": "DVT prevention — begin in recovery room"
          },
          {
            "name": "Walking (hospital corridors)",
            "parameters": "5–10 min × 3–4/day",
            "clinicalCueRationale": "Early mobilisation is safe and improves outcomes"
          },
          {
            "name": "Log Roll Technique",
            "parameters": "Every position change",
            "clinicalCueRationale": "Protect operative site — engage core before movement"
          },
          {
            "name": "Quad Sets + Ankle Pumps",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain lower limb activation while mobility limited"
          }
        ]
      }
    ]
  },
  {
    "name": "Cubital Tunnel Syndrome",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Conservative Management & Nerve Protection",
        "timeline": "Week 0–6",
        "goals": [
          "Reduce ulnar nerve irritation",
          "Avoid provocative postures",
          "Patient education"
        ],
        "precautions": [
          "Avoid sustained elbow flexion",
          "No resting elbow on hard surfaces",
          "Elbow extension splint at night"
        ],
        "criteriaToProgress": [
          "Tingling symptoms reducing",
          "Elbow flexion test negative",
          "Nighttime splinting tolerated"
        ],
        "exercises": [
          {
            "name": "Elbow Extension Splinting",
            "parameters": "Nightly — 0–30° flexion",
            "clinicalCueRationale": "Reduces cubital tunnel pressure"
          },
          {
            "name": "Nerve Gliding — Ulnar Nerve Slider",
            "parameters": "3 × 10 reps each arm",
            "clinicalCueRationale": "Gentle excursion, NOT if acute"
          },
          {
            "name": "Intrinsic Hand Strengthening",
            "parameters": "3 × 20 reps, light",
            "clinicalCueRationale": "Maintain hand strength — finger abduction/pinch"
          }
        ]
      }
    ]
  },
  {
    "name": "Mallet Finger",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Immobilisation",
        "timeline": "Week 0–8",
        "goals": [
          "Continuous DIP joint extension splinting",
          "Prevent extensor lag",
          "Skin integrity maintained"
        ],
        "precautions": [
          "DIP joint must NOT be allowed to flex",
          "Check skin integrity under splint",
          "Strict splint compliance"
        ],
        "criteriaToProgress": [
          "8 weeks continuous immobilisation completed",
          "No extensor lag at DIP",
          "Ready for graduated flexion"
        ],
        "exercises": [
          {
            "name": "DIP Extension Splinting",
            "parameters": "24 hours/day × 8 weeks",
            "clinicalCueRationale": "Zero flexion tolerance — maintain extension with one hand while changing"
          },
          {
            "name": "PIP Joint AROM",
            "parameters": "5 × 10 reps, hourly",
            "clinicalCueRationale": "Maintain PIP and MCP mobility while DIP immobilised"
          },
          {
            "name": "Oedema Management",
            "parameters": "Continuous + 5 min",
            "clinicalCueRationale": "Reduce swelling — facilitates splint compliance"
          }
        ]
      }
    ]
  },
  {
    "name": "Flexor Tendon Repair (Zone II)",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Early Protected Mobilisation",
        "timeline": "Week 0–4",
        "goals": [
          "Prevent adhesion formation",
          "Early tendon gliding",
          "Wound healing/oedema control"
        ],
        "precautions": [
          "Dorsal blocking splint required",
          "No active finger flexion",
          "No resisted gripping"
        ],
        "criteriaToProgress": [
          "No signs of tendon rupture",
          "Wound healing progressing",
          "Passive composite fist achieved"
        ],
        "exercises": [
          {
            "name": "Passive Finger Flexion (Kleinert)",
            "parameters": "5 × 10 reps, every 2h",
            "clinicalCueRationale": "Rubber band traction flexes finger — patient actively extends"
          },
          {
            "name": "Place-and-Hold (modified Duran)",
            "parameters": "5 × 10 reps, every 2h",
            "clinicalCueRationale": "Passively position finger in flexion — hold 5 sec"
          },
          {
            "name": "Oedema Management",
            "parameters": "Continuous",
            "clinicalCueRationale": "Proximal to distal retrograde massage"
          }
        ]
      }
    ]
  },
  {
    "name": "Proximal Humerus Fracture (Non-operative)",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Protection & Pendular Exercises",
        "timeline": "Week 0–3",
        "goals": [
          "Fracture protection via sling",
          "Reduce pain/muscle spasm",
          "Prevent shoulder stiffness",
          "ROM maintenance"
        ],
        "precautions": [
          "Sling immobilisation required",
          "No active abduction/ER",
          "Vascular injury check",
          "Nerve injury check"
        ],
        "criteriaToProgress": [
          "Pain ≤4/10 at rest",
          "Fracture site not tender",
          "Early callus on X-ray",
          "Ready for assisted motion"
        ],
        "exercises": [
          {
            "name": "Pendular (Codman) Exercises",
            "parameters": "3 × 5 min, 3–4×/day",
            "clinicalCueRationale": "Gravity-assisted — passive glenohumeral motion"
          },
          {
            "name": "Elbow/Wrist/Hand AROM",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Prevent distal stiffness while in sling"
          },
          {
            "name": "Cervical ROM",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Reduce secondary cervical muscle guarding"
          },
          {
            "name": "Ice and Pain Management",
            "parameters": "15 min × 4–6/day",
            "clinicalCueRationale": "Facilitates pendular motion compliance"
          }
        ]
      }
    ]
  },
  {
    "name": "Quadriceps Strain (Grade II)",
    "category": "Sports & Trauma",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Management",
        "timeline": "Day 0–5",
        "goals": [
          "Reduce haematoma and inflammation",
          "Protect partial tear",
          "Maintain baseline strength",
          "Establish baseline measurements"
        ],
        "precautions": [
          "AVOID massage in first 48–72h",
          "Avoid deep heat",
          "No passive stretching into pain"
        ],
        "criteriaToProgress": [
          "Walking pain-free",
          "Knee flexion ≥90°",
          "Swelling stabilised",
          "Ready for loading"
        ],
        "exercises": [
          {
            "name": "Isometric Quadriceps (quad sets)",
            "parameters": "3 × 20 reps, sub-maximal",
            "clinicalCueRationale": "Pain-free activation — reduce atrophy without stress"
          },
          {
            "name": "Ankle Pumps",
            "parameters": "10 reps every hour",
            "clinicalCueRationale": "DVT prophylaxis — maintain circulation"
          },
          {
            "name": "Bike (low resistance)",
            "parameters": "15–20 min",
            "clinicalCueRationale": "Cardiovascular maintenance — avoid if knee flexion painful"
          },
          {
            "name": "PRICE Protocol",
            "parameters": "15 min × 4–6/day",
            "clinicalCueRationale": "Reduce haematoma formation"
          }
        ]
      }
    ]
  },
  {
    "name": "Calf Strain (Gastrocnemius)",
    "category": "Sports & Trauma",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Management",
        "timeline": "Day 0–5",
        "goals": [
          "Reduce haematoma and pain",
          "Protect medial gastrocnemius",
          "Maintain mobility",
          "Cardiovascular fitness"
        ],
        "precautions": [
          "Avoid aggressive stretching",
          "Heel raise in shoe recommended",
          "Crutches if FWB painful",
          "Watch for Homan's sign"
        ],
        "criteriaToProgress": [
          "Walking pain-free",
          "Tenderness reducing",
          "Single-leg raise attempted",
          "Ready for loading"
        ],
        "exercises": [
          {
            "name": "Sub-maximal Isometric Plantarflexion",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Prevent complete atrophy without stressing tear"
          },
          {
            "name": "Ankle Pumps (AROM)",
            "parameters": "10 reps every hour",
            "clinicalCueRationale": "Maintain ankle mobility — DVT prophylaxis"
          },
          {
            "name": "Stationary Bike",
            "parameters": "15–20 min",
            "clinicalCueRationale": "Minimal plantarflexion force"
          },
          {
            "name": "PRICE Protocol",
            "parameters": "Every 4–6h",
            "clinicalCueRationale": "Compression bandage from forefoot to knee"
          }
        ]
      }
    ]
  },
  {
    "name": "Tibial Stress Fracture (Return to Running)",
    "category": "Sports & Trauma",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Rest & Load Reduction",
        "timeline": "Week 0–6",
        "goals": [
          "Eliminate tibial pain",
          "Allow bone healing",
          "Identify predisposing factors",
          "Maintain fitness"
        ],
        "precautions": [
          "High-risk sites need NWB",
          "Posteromedial tibia modification",
          "Rule out RED-S",
          "Bone stress index screening"
        ],
        "criteriaToProgress": [
          "Pain-free weight-bearing",
          "No tibial pain with hop test",
          "MRI/CT evidence of healing",
          "Predisposing factors addressed"
        ],
        "exercises": [
          {
            "name": "Deep Water Running",
            "parameters": "30–45 min daily",
            "clinicalCueRationale": "Zero impact cardiovascular — maintains VO2max"
          },
          {
            "name": "Stationary Bike (no impact)",
            "parameters": "30–40 min daily",
            "clinicalCueRationale": "Low tibial load maintenance"
          },
          {
            "name": "Hip Strengthening (non-impact)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Reduce tibial loading on return"
          }
        ]
      }
    ]
  },
  {
    "name": "Medial Tibial Stress Syndrome (Shin Splints)",
    "category": "Sports & Trauma",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Load Reduction & Bone Stress Protection",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce medial tibial pain",
          "Identify training provocations",
          "Maintain fitness low-impact",
          "Patient education on stress continuum"
        ],
        "precautions": [
          "Exclude tibial stress fracture",
          "Cease running if pinpoint tenderness",
          "Reduce load by 50-80%",
          "Footwear assessment"
        ],
        "criteriaToProgress": [
          "Pain ≤2/10 with walking",
          "Bony point tenderness resolved",
          "Stress fracture excluded"
        ],
        "exercises": [
          {
            "name": "Pool Running / Aqua Jogging",
            "parameters": "30–45 min, 5×/week",
            "clinicalCueRationale": "Zero tibial impact load"
          },
          {
            "name": "Stationary Bike",
            "parameters": "30 min daily",
            "clinicalCueRationale": "Non-weight-bearing cardiovascular maintenance"
          },
          {
            "name": "Calf Raises (bilateral, pain-free)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain soleus/gastroc activation"
          },
          {
            "name": "Tibialis Posterior Strengthening (band)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Key muscle for tibial stress absorption"
          },
          {
            "name": "Walking (pain-free distance only)",
            "parameters": "As tolerated",
            "clinicalCueRationale": "Maintain bone loading stimulus at sub-threshold"
          }
        ]
      }
    ]
  },
  {
    "name": "Stress Reaction (Femoral Neck)",
    "category": "Sports & Trauma",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Protected Weight Bearing & Bone Protection",
        "timeline": "Week 0–8",
        "goals": [
          "Prevent progression to fracture",
          "Non-weight-bearing per orthopaedic guidance",
          "Maintain fitness/strength",
          "Identify RED-S"
        ],
        "precautions": [
          "URGENT: Tension side fracture = emergency",
          "NWB mandatory if tension-side",
          "No single-leg stance",
          "Bone health focus"
        ],
        "criteriaToProgress": [
          "Orthopaedic clearance",
          "MRI evidence of healing",
          "Pain ≤2/10 with protected walking"
        ],
        "exercises": [
          {
            "name": "Pool Walking / Aqua Running",
            "parameters": "30–45 min daily",
            "clinicalCueRationale": "Zero-impact cardiovascular fitness"
          },
          {
            "name": "Stationary Bike (seated)",
            "parameters": "30 min daily",
            "clinicalCueRationale": "Low femoral neck load"
          },
          {
            "name": "Ankle Pumps",
            "parameters": "10 × hourly if NWB",
            "clinicalCueRationale": "DVT prevention during restricted mobility"
          },
          {
            "name": "Hip Abductor Isometrics (side-lying)",
            "parameters": "3 × 20 reps, 5 sec",
            "clinicalCueRationale": "Maintain glute med without femoral neck loading"
          }
        ]
      }
    ]
  },
  {
    "name": "Sever's Disease (Calcaneal Apophysitis)",
    "category": "Paediatric & Special",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Load Management & Pain Reduction",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce apophyseal pain",
          "Identify provocative sport activities",
          "Parent education on self-limiting",
          "Heel lift or cushioned orthotics"
        ],
        "precautions": [
          "Resolves with maturity (13-15 girls, 14-16 boys)",
          "Avoid complete rest",
          "Monitor for stress fracture",
          "Avoid barefoot sport"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 with modified activity",
          "Child comfortable walking",
          "Heel squeeze test improving"
        ],
        "exercises": [
          {
            "name": "Heel Lifts / Cushioned Insoles",
            "parameters": "Wear in all footwear",
            "clinicalCueRationale": "Reduce traction stress at calcaneal apophysis"
          },
          {
            "name": "Calf Stretching (gastrocnemius)",
            "parameters": "3 × 45 sec, twice daily",
            "clinicalCueRationale": "Reduce Achilles traction force on growth plate"
          },
          {
            "name": "Swimming / Cycling",
            "parameters": "30 min, 3–5×/week",
            "clinicalCueRationale": "Low calcaneal impact"
          },
          {
            "name": "Activity Modification",
            "parameters": "Ongoing",
            "clinicalCueRationale": "Reduce running/jumping volume by 50%"
          }
        ]
      }
    ]
  },
  {
    "name": "Peripheral Nerve Injury (Peroneal Nerve Palsy)",
    "category": "Neurological / Other",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Nerve Protection & Functional Maintenance",
        "timeline": "Week 0–6",
        "goals": [
          "Protect recovering nerve from compression",
          "Prevent foot drop complications",
          "Maintain passive joint mobility",
          "Patient education on recovery timeline"
        ],
        "precautions": [
          "Identify and remove causative compression (e.g. fibular head pressure)",
          "AFO mandatory for foot drop",
          "Monitor for pressure sores under AFO"
        ],
        "criteriaToProgress": [
          "Safe ambulation achieved with AFO",
          "No equinus contracture developed",
          "Early motor return signs (trace DF)",
          "Causative factor removed"
        ],
        "exercises": [
          {
            "name": "AFO (Ankle-Foot Orthosis) Provision",
            "parameters": "All weight bearing activities",
            "clinicalCueRationale": "Foot drop correction — prevents falls"
          },
          {
            "name": "Passive Ankle PROM (DF, eversion)",
            "parameters": "3 × 20 reps each",
            "clinicalCueRationale": "Prevent equinus and peroneal contracture"
          },
          {
            "name": "Tibialis Anterior NMES / FES",
            "parameters": "20 min, 2×/day if available",
            "clinicalCueRationale": "Electrical stimulation maintains muscle mass"
          },
          {
            "name": "Proprioception Training (seated)",
            "parameters": "3 × 10 reps",
            "clinicalCueRationale": "Maintain sensory input — eyes-open balance"
          }
        ]
      }
    ]
  },
  {
    "name": "Complex Regional Pain Syndrome (CRPS Type I)",
    "category": "Neurological / Other",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Desensitisation & Gentle Activation",
        "timeline": "Week 0–8",
        "goals": [
          "Desensitise hypersensitive system",
          "Reduce allodynia through graded exposure",
          "Prevent disuse atrophy",
          "Multidisciplinary team engagement"
        ],
        "precautions": [
          "CRPS is sensitised — aggressive exercise WORSENS outcomes",
          "Pain is NOT reliable guide to tissue damage",
          "Avoid forced passive mobilisation"
        ],
        "criteriaToProgress": [
          "Allodynia reducing — touch tolerance improving",
          "GMI stages 1 and 2 tolerated",
          "Engagement with psych support"
        ],
        "exercises": [
          {
            "name": "Graded Motor Imagery — Limb Laterality",
            "parameters": "10 min, 2×/day",
            "clinicalCueRationale": "Normalise cortical body schema"
          },
          {
            "name": "Mirror Therapy",
            "parameters": "10–20 min, daily",
            "clinicalCueRationale": "Cortical reorganisation — watch reflected limb"
          },
          {
            "name": "Desensitisation (graded textures)",
            "parameters": "10 min, 2×/day",
            "clinicalCueRationale": "Cotton wool → washcloth → towel → brush"
          },
          {
            "name": "Graded Activity (pacing)",
            "parameters": "Daily structured",
            "clinicalCueRationale": "Activity pacing program — time-based goals"
          }
        ]
      }
    ]
  },
  {
    "name": "Temporomandibular Joint Dysfunction (TMJ)",
    "category": "Neurological / Other",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Reduction & Joint Protection",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce TMJ pain/clicking/locking",
          "Offload TMJ via dietary modification",
          "Identify parafunctional habits",
          "Patient education on mechanics"
        ],
        "precautions": [
          "Multidisciplinary support needed (dentist)",
          "Avoid: hard foods, large bites, gum",
          "Cervical dysfunction association"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 with daily use",
          "Jaw opening ≥35 mm without pain",
          "Morning jaw pain reducing"
        ],
        "exercises": [
          {
            "name": "Jaw Rest Protocol",
            "parameters": "Ongoing",
            "clinicalCueRationale": "Soft diet, small bites — reduce joint loading"
          },
          {
            "name": "Diaphragmatic Breathing",
            "parameters": "5 min × 3/day",
            "clinicalCueRationale": "Reduce sympathetic activation — key driver of jaw clenching"
          },
          {
            "name": "Tongue-Up Rest Position",
            "parameters": "Conscious habit all day",
            "clinicalCueRationale": "Tongue on palate — reduces TMJ compression"
          },
          {
            "name": "Relaxation Techniques / Stress Management",
            "parameters": "Daily practice",
            "clinicalCueRationale": "Mindfulness, progressive relaxation"
          }
        ]
      }
    ]
  },
  {
    "name": "Frozen Shoulder (Adhesive Capsulitis)",
    "category": "Shoulder",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Painful / Freezing",
        "timeline": "Month 0–9",
        "goals": [
          "Pain management",
          "Maintain available ROM",
          "Prevent further stiffness",
          "Education"
        ],
        "precautions": [
          "Avoid aggressive stretching in painful phase",
          "Corticosteroid injection may be indicated"
        ],
        "criteriaToProgress": [
          "Pain stability (not resolution)",
          "Maintaining available ROM"
        ],
        "exercises": [
          {
            "name": "Pendulums",
            "parameters": "3 × 3 min all directions",
            "clinicalCueRationale": "Pain relief and gentle distraction — key exercise"
          },
          {
            "name": "AAROM Flexion (cane)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Good arm assists — go to comfortable range only"
          },
          {
            "name": "ER Stretching (gentle)",
            "parameters": "3 × 30 sec",
            "clinicalCueRationale": "Elbow at side, cane-assisted — no forcing"
          },
          {
            "name": "Heat before exercise",
            "parameters": "10 min",
            "clinicalCueRationale": "Reduce viscosity of synovial fluid — improve ROM"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Stiffness / Frozen",
        "timeline": "Month 3–12",
        "goals": [
          "Progressively restore ROM",
          "Pain reducing",
          "Restore function for ADL"
        ],
        "precautions": [
          "Progressive stretching appropriate now pain reducing",
          "Gentle but consistent pressure"
        ],
        "criteriaToProgress": [
          "Gaining ROM weekly",
          "Flexion >150°",
          "Functional daily activities improving"
        ],
        "exercises": [
          {
            "name": "Capsular Stretching (ER, IR, flexion)",
            "parameters": "3 × 60 sec each direction",
            "clinicalCueRationale": "End-range hold, gentle over-pressure"
          },
          {
            "name": "Sleeper Stretch",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Key for posterior capsule tightness"
          },
          {
            "name": "Pulleys",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Aggressive ROM — daily consistency is key"
          },
          {
            "name": "Strengthening (pain-free range)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Band ER/IR, scapular exercises"
          }
        ]
      }
    ]
  },
  {
    "name": "Anterior Shoulder Dislocation (First-time)",
    "category": "Shoulder",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Immobilisation",
        "timeline": "Week 0–3",
        "goals": [
          "Tissue healing",
          "Pain & swelling management",
          "Maintain distal function"
        ],
        "precautions": [
          "Sling immobilisation 2–3 weeks",
          "Avoid ER and extension",
          "No overhead movements"
        ],
        "criteriaToProgress": [
          "Pain settling",
          "Week 3 sling removal clearance"
        ],
        "exercises": [
          {
            "name": "Elbow ROM",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain elbow mobility in sling"
          },
          {
            "name": "Wrist and hand strengthening",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Grip strength — prevent distal atrophy"
          },
          {
            "name": "Isometric Rotator Cuff (submaximal)",
            "parameters": "3 × 10 reps, 5 sec hold",
            "clinicalCueRationale": "Maintain cuff activation without stress"
          }
        ]
      }
    ]
  },
  {
    "name": "Plantar Fasciitis",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Pain Management",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce morning pain",
          "Load management",
          "Intrinsic foot strengthening"
        ],
        "precautions": [
          "Avoid barefoot walking on hard surfaces",
          "Night splint if severe",
          "Orthotic support"
        ],
        "criteriaToProgress": [
          "Morning pain <4/10",
          "First-step pain reducing"
        ],
        "exercises": [
          {
            "name": "Plantar Fascia Stretch (intrinsic)",
            "parameters": "3 × 30 sec each foot",
            "clinicalCueRationale": "Pull toes back before stepping — pre-activity"
          },
          {
            "name": "Calf Stretching (gastrocnemius)",
            "parameters": "3 × 45 sec each",
            "clinicalCueRationale": "Knee straight — reduce tension on fascia"
          },
          {
            "name": "Short Foot Exercise",
            "parameters": "3 × 20 reps, 5 sec hold",
            "clinicalCueRationale": "Arch activation — dome the foot without curling toes"
          },
          {
            "name": "Ice Massage",
            "parameters": "5–10 min",
            "clinicalCueRationale": "Frozen water bottle rolling — post activity"
          }
        ]
      }
    ]
  },
  {
    "name": "Cervical Radiculopathy",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Nerve Root Management",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce arm pain",
          "Centralise symptoms",
          "Offload neural structures"
        ],
        "precautions": [
          "URGENT: Myelopathy signs — surgical referral",
          "No cervical manipulation in acute phase",
          "Avoid sustained cervical extension"
        ],
        "criteriaToProgress": [
          "Arm pain centralising",
          "Pain ≤4/10",
          "No progressive neurological deficit"
        ],
        "exercises": [
          {
            "name": "Cervical Retraction (chin tucks)",
            "parameters": "3 × 15 reps, 5 sec hold",
            "clinicalCueRationale": "Unload neural foramen — McKenzie retraction"
          },
          {
            "name": "Neural Mobilisation — Median Nerve Slider",
            "parameters": "3 × 10 reps each",
            "clinicalCueRationale": "Wrist ext/flex with elbow + shoulder movement"
          },
          {
            "name": "Upper Cervical Traction (manual)",
            "parameters": "Per physiotherapist",
            "clinicalCueRationale": "Opens neural foramen — often immediate relief"
          }
        ]
      }
    ]
  },
  {
    "name": "Greater Trochanteric Pain Syndrome",
    "category": "Hip",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Load Modification & Isometric Loading",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce lateral hip pain",
          "Identify and remove compression loads",
          "Isometric gluteal loading"
        ],
        "precautions": [
          "Avoid side-lying on affected side",
          "Avoid crossing legs (adduction compression)",
          "No aggressive IT band stretching"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 during isometrics",
          "Night pain resolving",
          "VISA-G improving"
        ],
        "exercises": [
          {
            "name": "Isometric Hip Abduction (standing)",
            "parameters": "5 × 45 sec, 80% effort",
            "clinicalCueRationale": "Immediate analgesic effect — push foot into wall"
          },
          {
            "name": "Pelvic Leveling (Trendelenburg control)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Gluteus medius activation — maintain level pelvis"
          },
          {
            "name": "Sleep Education (Pillow between knees)",
            "parameters": "Every night",
            "clinicalCueRationale": "Reduces adduction compression on gluteal tendons"
          },
          {
            "name": "Weight-bearing Education (Don't hang on hip)",
            "parameters": "All day reminders",
            "clinicalCueRationale": "Avoid passive hip adduction while standing"
          }
        ]
      }
    ]
  },
  {
    "name": "AC Joint Sprain (Grade I-II)",
    "category": "Shoulder",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Protection & Pain Management",
        "timeline": "Week 0–2",
        "goals": [
          "Protect AC joint ligaments",
          "Reduce pain and inflammation",
          "Maintain pain-free ROM"
        ],
        "precautions": [
          "Sling for comfort if needed",
          "Avoid heavy lifting or carrying",
          "No cross-body adduction"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10",
          "Shoulder AROM improving up to 90° flexion"
        ],
        "exercises": [
          {
            "name": "Shoulder Shrugs (gentle)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain trapezius and levator scapulae activation"
          },
          {
            "name": "Isometric Rotator Cuff (neutral)",
            "parameters": "3 × 10 reps, 5 sec",
            "clinicalCueRationale": "Maintain cuff activation without AC joint stress"
          },
          {
            "name": "Scapular Retraction",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Pull blades back and down — offload anterior AC joint"
          },
          {
            "name": "Elbow and Hand AROM",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Prevent distal stiffness"
          }
        ]
      }
    ]
  },
  {
    "name": "Thoracic Outlet Syndrome",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Desensitisation & Postural Correction",
        "timeline": "Week 0–6",
        "goals": [
          "Reduce neurovascular symptoms",
          "Address muscle imbalances (tight pec minor)",
          "Diaphragmatic breathing focus"
        ],
        "precautions": [
          "Avoid overhead activities if provocative",
          "Avoid heavy carrying",
          "Monitor for vascular change signs"
        ],
        "criteriaToProgress": [
          "Symptoms reducing from distal to proximal",
          "Improving posture and breathing control"
        ],
        "exercises": [
          {
            "name": "Pectoralis Minor Stretch (doorway)",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Open the outlet space — don't force to pain"
          },
          {
            "name": "Diaphragmatic Breathing",
            "parameters": "5 min, 3× daily",
            "clinicalCueRationale": "Reduce scalene activity and upper rib elevation"
          },
          {
            "name": "Scapular Squeeze and Hold",
            "parameters": "3 × 15 reps, 5 sec",
            "clinicalCueRationale": "Address scapular depression/protraction"
          },
          {
            "name": "Nerve Gliding (Brachial Plexus Slider)",
            "parameters": "3 × 10 reps each",
            "clinicalCueRationale": "Gentle neural excursion — avoid \"zinging\" sensation"
          }
        ]
      }
    ]
  },
  {
    "name": "SLAP Lesion (Conservative)",
    "category": "Shoulder",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Control & Range Maintenance",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce biceps tendon/labral irritation",
          "Restore GIRD (Glenohumeral IR Deficit)",
          "Scapular stabilisation"
        ],
        "precautions": [
          "Avoid heavy biceps loading",
          "Avoid combined abduction/ER (painful position)",
          "Address GIRD early"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10",
          "Internal rotation ROM improving",
          "Ready for cuff strengthening"
        ],
        "exercises": [
          {
            "name": "Sleeper Stretch",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Address posterior capsule tightness — critical for SLAP"
          },
          {
            "name": "Cross-body Stretch",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Complementary to sleeper stretch"
          },
          {
            "name": "Isometric ER/IR (neutral)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Rotator cuff activation to stabilise head in socket"
          }
        ]
      }
    ]
  },
  {
    "name": "Posterior Shoulder Instability",
    "category": "Shoulder",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Posterior Protection & Scapular Control",
        "timeline": "Week 0–4",
        "goals": [
          "Protect posterior capsule",
          "Scapular stabilisation",
          "Rotator cuff activation"
        ],
        "precautions": [
          "Avoid horizontal adduction",
          "Avoid internal rotation under load",
          "No push-up positions"
        ],
        "criteriaToProgress": [
          "No posterior subluxation episodes",
          "Scapular control improving"
        ],
        "exercises": [
          {
            "name": "Scapular Retraction and Depression",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Maintain stable base for GH joint"
          },
          {
            "name": "Isometric Rotator Cuff (neutral)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Focus on ER — infraspinatus acts as posterior guard"
          },
          {
            "name": "Rhythmic Stabilisation (supine, 90° flexion)",
            "parameters": "3 × 1 min",
            "clinicalCueRationale": "Neuromuscular control of GH joint"
          }
        ]
      }
    ]
  },
  {
    "name": "Supraspinatus Tendinopathy (Chronic)",
    "category": "Shoulder",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Isometric Loading & Scapular Base",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce tendon pain",
          "Maintain ROM",
          "Establish scapular stability"
        ],
        "precautions": [
          "Avoid impingement positions (overhead)",
          "Isometric loading should be painless",
          "Avoid heavy lifting"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10",
          "VISA-S score improving",
          "Scapular control achieved"
        ],
        "exercises": [
          {
            "name": "Isometric Abduction (hand at side)",
            "parameters": "5 × 45 sec, submaximal",
            "clinicalCueRationale": "Tendon loading policy — analgesia through load"
          },
          {
            "name": "Scapular Setting (Wall slides)",
            "parameters": "3 × 15 reps, slow",
            "clinicalCueRationale": "Control of upward rotation"
          },
          {
            "name": "Sleeper Stretch",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Address GIRD/Posterior capsule — reduced compressive load on cuff"
          }
        ]
      }
    ]
  },
  {
    "name": "Calcific Tendinitis (Acute/Reactive)",
    "category": "Shoulder",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Management & Desensitisation",
        "timeline": "Week 0–2",
        "goals": [
          "Management of severe pain",
          "Decrease muscle spasm",
          "Maintain PROM",
          "Education"
        ],
        "precautions": [
          "Pain can be extremely high — use ice/medication",
          "Avoid any resisted exercise",
          "Sling for comfort only if needed"
        ],
        "criteriaToProgress": [
          "Resting pain manageable",
          "Cessation of acute inflammatory symptoms"
        ],
        "exercises": [
          {
            "name": "Pendulum Exercises",
            "parameters": "3 × 5 min",
            "clinicalCueRationale": "Passive synovial fluid circulation — essential for pain relief"
          },
          {
            "name": "Cervical/Elbow ROM",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Address secondary guarding in neck and elbow"
          },
          {
            "name": "Ice and Position Education",
            "parameters": "15 min, 4× daily",
            "clinicalCueRationale": "Sleep slightly upright to reduce pressure"
          }
        ]
      }
    ]
  },
  {
    "name": "Scaphoid Fracture (Non-operative)",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Immobilisation & Protection",
        "timeline": "Week 0–8+",
        "goals": [
          "Protect fracture site",
          "Custom cast maintenance",
          "Digital/Thumb mobility",
          "Shoulder/Elbow ROM"
        ],
        "precautions": [
          "Strict compliance with casting — blood supply is critical",
          "Avoid lifting or weight-bearing through hand",
          "Monitor for swelling/compartment issues"
        ],
        "criteriaToProgress": [
          "X-ray evidence of healing (bridging)",
          "Thumb CMC joint clear"
        ],
        "exercises": [
          {
            "name": "Digital ROM (Claw/Fist)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain tendon gliding while wrist is casted"
          },
          {
            "name": "Thumb ROM (within cast limits)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Limit CMC stiffness"
          },
          {
            "name": "Shoulder/Elbow AROM",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Address secondary stiffness from \"sling-posture\""
          }
        ]
      }
    ]
  },
  {
    "name": "TFCC Injury",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Immobilisation & Load Management",
        "timeline": "Week 0–6",
        "goals": [
          "Reduce ulnar-sided wrist pain",
          "Splinting (ulnar gutter or wrist brace)",
          "Maintain grip and digital motion"
        ],
        "precautions": [
          "Avoid wrist ulnar deviation + compression",
          "No heavy lifting or wringing clothes",
          "Forceful grip modification"
        ],
        "criteriaToProgress": [
          "Ulnar-sided pain reduced",
          "Pain-free weight bearing starting"
        ],
        "exercises": [
          {
            "name": "Wrist Bracing (night and heavy activity)",
            "parameters": "As needed",
            "clinicalCueRationale": "Stabilise ulnar-sided structures"
          },
          {
            "name": "Digital Tendon Glides",
            "parameters": "3 × 15 reps each position",
            "clinicalCueRationale": "Prevent adhesion while wrist motion restricted"
          },
          {
            "name": "Pain-free Isometric Wrist Stability",
            "parameters": "3 × 10 reps, 5 sec",
            "clinicalCueRationale": "Co-contraction of wrist flexors/extensors"
          }
        ]
      }
    ]
  },
  {
    "name": "Femoroacetabular Impingement (FAI)",
    "category": "Hip",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Load Modification & Deep Hip Stability",
        "timeline": "Week 0–6",
        "goals": [
          "Eliminate pinching/groin pain",
          "Identify provocative postures (deep flexion/IR)",
          "Establish deep hip rotator and gluteal stability"
        ],
        "precautions": [
          "Avoid end-range hip flexion + IR",
          "No deep squats or lunges for now",
          "Avoid prolonged sitting"
        ],
        "criteriaToProgress": [
          "Positive FADIR test improving",
          "Pain ≤3/10",
          "Deep rotators engaging"
        ],
        "exercises": [
          {
            "name": "Clamshells (hip position matters)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Target deep rotators — don't roll pelvis"
          },
          {
            "name": "Bridge with Band (Isometric abduction)",
            "parameters": "3 × 15 reps, 5 sec hold",
            "clinicalCueRationale": "Glute med activation in mid-range"
          },
          {
            "name": "Single-leg Stance (Pelvic level)",
            "parameters": "3 × 60 sec",
            "clinicalCueRationale": "Neuromuscular hip stability during loading"
          }
        ]
      }
    ]
  },
  {
    "name": "Piriformis Syndrome",
    "category": "Hip",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Desensitisation & Neural Unloading",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce sciatic nerve irritation",
          "Address piriformis muscle tension",
          "Modify sitting/loading habits"
        ],
        "precautions": [
          "Avoid prolonged sitting on hard surfaces",
          "No aggressive stretching of piriformis in acute phase",
          "Exclude lumbar disc pathology"
        ],
        "criteriaToProgress": [
          "Sciatic pain centralising",
          "Straight leg raise (SLR) improving",
          "Sitting tolerance >30 min"
        ],
        "exercises": [
          {
            "name": "Sciatic Nerve Slider (Seated)",
            "parameters": "3 × 10 reps",
            "clinicalCueRationale": "Tension-free neural excursion — don't force it"
          },
          {
            "name": "Soft Tissue Release (Tennis ball/Foam roller)",
            "parameters": "2 min gentle",
            "clinicalCueRationale": "Self-massage to piriformis belly — avoid focal nerve pressure"
          },
          {
            "name": "Diaphragmatic Breathing",
            "parameters": "5 min, 3× daily",
            "clinicalCueRationale": "Reduce pelvic floor / deep gluteal guarding"
          },
          {
            "name": "Standing Glute Squeezes",
            "parameters": "3 × 15 reps, 5 sec",
            "clinicalCueRationale": "Neuromuscular resetting of the gluteal group"
          }
        ]
      }
    ]
  },
  {
    "name": "Pes Anserine Bursitis",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Inflammation Control & Mechanical Unloading",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce medial knee pain",
          "Identify causative mechanical factors (valgus)",
          "Maintain quadriceps and hamstring function"
        ],
        "precautions": [
          "Avoid direct pressure on bursa",
          "No aggressive hamstring stretching",
          "Caution with heavy resisted knee flexion"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 during ADLs",
          "Knee flexion ROM full",
          "Medial point tenderness reduced"
        ],
        "exercises": [
          {
            "name": "Isometric Quad Sets",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain knee stability without bursal irritation"
          },
          {
            "name": "Adductor Strengthening (Light)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Address muscle balance around the pes anserine tendons"
          },
          {
            "name": "Hamstring Isometrics (Seated)",
            "parameters": "3 × 15 reps, 5 sec",
            "clinicalCueRationale": "Gentle activation to maintain tone without friction"
          },
          {
            "name": "Ice and Padding Education",
            "parameters": "10 min",
            "clinicalCueRationale": "Reduce focal inflammation"
          }
        ]
      }
    ]
  },
  {
    "name": "Baker's Cyst (Symptomatic)",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Effusion Management & Joint Protection",
        "timeline": "Week 0–4",
        "goals": [
          "Control joint swelling (effusion)",
          "Address primary intra-articular pathology (e.g. meniscus)",
          "Maintain mobility"
        ],
        "precautions": [
          "Cyst itself is often secondary — don't just treat the cyst",
          "Avoid forceful end-range knee flexion",
          "Avoid aggressive impact"
        ],
        "criteriaToProgress": [
          "Knee effusion reduced",
          "Pain-free knee flexion >110°",
          "Ready for weight-bearing progression"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps",
            "parameters": "10 reps every hour",
            "clinicalCueRationale": "Circulation and muscle pump — reduces global leg edema"
          },
          {
            "name": "Heel Slides (pain-free range)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Controlled mobility to manage synovial fluid flow"
          },
          {
            "name": "Quad Sets",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain extension — extension is often lost when effusion is high"
          },
          {
            "name": "Compression Wrap",
            "parameters": "All day",
            "clinicalCueRationale": "Graduated compression from foot to mid-thigh"
          }
        ]
      }
    ]
  },
  {
    "name": "Tibial Plateau Fracture (Post-operative)",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Protection & ROM Initiation",
        "timeline": "Week 0–6",
        "goals": [
          "Protect surgical fixation",
          "Initiate early ROM",
          "Wound healing/edema control",
          "DVT prevention"
        ],
        "precautions": [
          "Strict NWB (Non-Weight Bearing) as per surgeon",
          "Avoid resisted knee extension",
          "Monitor neurovascular status distal to plate"
        ],
        "criteriaToProgress": [
          "Wound healed",
          "Knee flexion ≥90°",
          "Radiological stability confirmed"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps / Circles",
            "parameters": "10 × hourly",
            "clinicalCueRationale": "Critical DVT prophylaxis in NWB phase"
          },
          {
            "name": "Passive/Active-Assisted Knee Flexion",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Gravity-assisted off side of bed or heel slides"
          },
          {
            "name": "Patellar Mobilisation",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Prevent patellofemoral adhesions post-plate application"
          }
        ]
      }
    ]
  },
  {
    "name": "Knee Osteoarthritis",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Control & Functional Loading",
        "timeline": "Week 0–8",
        "goals": [
          "Reduce chronic knee pain",
          "Improve weight-bearing tolerance",
          "Strengthen shock-absorbing muscles (quads)",
          "Weight management education"
        ],
        "precautions": [
          "Avoid high-impact activities in flare-ups",
          "Exercise into mild discomfort (≤3/10) is safe and beneficial",
          "Watch for swelling"
        ],
        "criteriaToProgress": [
          "Knee strength improved by 20%",
          "Walking distance increased",
          "Patient empowered with self-management"
        ],
        "exercises": [
          {
            "name": "Stationary Bike (low resistance)",
            "parameters": "15–30 min daily",
            "clinicalCueRationale": "Cartilage lubrication through cyclic loading"
          },
          {
            "name": "Sit-to-Stand (Functional Strength)",
            "parameters": "3 × 12 reps",
            "clinicalCueRationale": "Builds quadriceps and gluteal strength for ADLs"
          },
          {
            "name": "Terminal Knee Extension (banded)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Focus on VMO and lockout strength"
          },
          {
            "name": "Step-ups / Step-downs (low)",
            "parameters": "3 × 10 reps each leg",
            "clinicalCueRationale": "Neuromuscular control during weight-bearing"
          }
        ]
      }
    ]
  },
  {
    "name": "Knee Meniscectomy (Partial)",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Early Mobilisation & Effusion Control",
        "timeline": "Week 0–2",
        "goals": [
          "Reduce joint swelling",
          "Restore full knee extension",
          "Initiate quadriceps activation",
          "Normalise gait"
        ],
        "precautions": [
          "WBAT (Weight Bearing As Tolerated)",
          "Avoid deep squats >90° initially",
          "Monitor for persistent swelling"
        ],
        "criteriaToProgress": [
          "Knee extension 0°",
          "Knee flexion ≥110°",
          "Minimal effusion",
          "No lag on SLR (Straight Leg Raise)"
        ],
        "exercises": [
          {
            "name": "Heel Slides with Towel",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain mobility — use towel for overpressure"
          },
          {
            "name": "Quadriceps Isometrics (Quad sets)",
            "parameters": "3 × 20 reps, 10 sec hold",
            "clinicalCueRationale": "Bridge the neuro-muscular gap post-op"
          },
          {
            "name": "Straight Leg Raise (SLR)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Maintain proximal hip strength without knee stress"
          },
          {
            "name": "Patellar Mobilisation",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Prevent adhesions in the suprapatellar pouch"
          }
        ]
      }
    ]
  },
  {
    "name": "Sinus Tarsi Syndrome",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Inflammation Control & Stability",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce sinus tarsi pain/swelling",
          "Correct over-pronation mechanics",
          "Proprioceptive retraining"
        ],
        "precautions": [
          "Avoid excessive inversion/eversion during acute pain",
          "Supportive footwear required",
          "Activity modification"
        ],
        "criteriaToProgress": [
          "Pain free on palpation of sinus tarsi",
          "Improving balance on single leg",
          "Ready for functional loading"
        ],
        "exercises": [
          {
            "name": "Ankle Eversion Isometrics",
            "parameters": "3 × 15 reps, 5 sec",
            "clinicalCueRationale": "Strengthen peroneals to support lateral ankle"
          },
          {
            "name": "Short Foot Exercise (Arch lifting)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Provide intrinsic stability — unload sinus tarsi"
          },
          {
            "name": "Single-leg Balance (Level ground)",
            "parameters": "3 × 60 sec",
            "clinicalCueRationale": "Neuromuscular retraining is critical for chronic cases"
          },
          {
            "name": "Calf Stretching (Gentle)",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Reduce equinus load on subtalar joint"
          }
        ]
      }
    ]
  },
  {
    "name": "5th Metatarsal Fracture (Jones/Stress)",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Immobilisation / Protected Loading",
        "timeline": "Week 0–6",
        "goals": [
          "Protect fracture healing",
          "Non-weight bearing or heel-bearing as per surgeon",
          "Prevent calf atrophy"
        ],
        "precautions": [
          "High risk of non-union — do NOT rush loading",
          "Maintain immobilization strictly",
          "Smoking cessation education (bone healing)"
        ],
        "criteriaToProgress": [
          "X-ray evidence of callus formation",
          "No pain at fracture site",
          "Orthopaedic clearance to FWB"
        ],
        "exercises": [
          {
            "name": "Toe Wiggles and Curls",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain intrinsic muscle activation while casted"
          },
          {
            "name": "Knee/Hip ROM (Active)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Address proximal conditioning in NWB phase"
          },
          {
            "name": "Isometric Hip Abduction (Side-lying)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Core and hip stability — preparation for gait return"
          }
        ]
      }
    ]
  },
  {
    "name": "Ankle ORIF (Post-operative)",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Wound Healing & Early ROM",
        "timeline": "Week 0–4",
        "goals": [
          "Protect surgical hardware",
          "Control edema",
          "Early AROM (if stable)",
          "Maintain mobility of distal joints"
        ],
        "precautions": [
          "NWB (Non-Weight Bearing) usually 6 weeks",
          "Monitor wound integrity",
          "DVT prevention focus"
        ],
        "criteriaToProgress": [
          "Incisions healed",
          "Minimal ankle swelling",
          "Dorsiflexion to neutral (0°)"
        ],
        "exercises": [
          {
            "name": "Gentle Ankle AROM (PF/DF)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Maintain joint nutrition — avoid inversion/eversion early"
          },
          {
            "name": "Toe ROM",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Prevent digital stiffness"
          },
          {
            "name": "Quad Sets / Hamstring Sets",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain leg activation while NWB"
          }
        ]
      }
    ]
  },
  {
    "name": "Hallux Valgus (Bunions)",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Management & Alignment Support",
        "timeline": "Week 0–8",
        "goals": [
          "Reduce 1st MTP joint pain",
          "Improve intrinsic foot strength",
          "Footwear education",
          "Toe alignment"
        ],
        "precautions": [
          "Avoid narrow-toebox footwear",
          "Monitor for skin breakdown if using spacers",
          "Rule out gout/RA during flare-ups"
        ],
        "criteriaToProgress": [
          "1st MTP joint pain reduced",
          "Patient using correct footwear",
          "Intrinsic control improved"
        ],
        "exercises": [
          {
            "name": "Toe Spreading (Abductor Hallucis)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Activate muscle that opposes bunion deformity"
          },
          {
            "name": "Short Foot (Arch doming)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Strong arch reduces forefoot splaying"
          },
          {
            "name": "Big Toe AROM (Flexion/Extension)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain joint mobility — prevent hallux rigidus"
          }
        ]
      }
    ]
  },
  {
    "name": "Meniscus Repair (Post-operative)",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Protection",
        "timeline": "Week 0–6",
        "goals": [
          "Protect repair",
          "Control effusion",
          "Maintain quad activation",
          "Toe-touch weight bearing"
        ],
        "precautions": [
          "NWB or TTWB only",
          "No flexion beyond 90°",
          "No squatting or pivoting",
          "Crutches mandatory"
        ],
        "criteriaToProgress": [
          "No effusion increase with activity",
          "Full extension maintained",
          "Week 6 surgeon clearance"
        ],
        "exercises": [
          {
            "name": "Quad Sets",
            "parameters": "4 × 20 reps",
            "clinicalCueRationale": "Critical for preventing quad atrophy during NWB"
          },
          {
            "name": "SLR (4 planes)",
            "parameters": "3 × 15 reps each",
            "clinicalCueRationale": "Flexion, abduction, adduction, extension"
          },
          {
            "name": "Ankle Pumps",
            "parameters": "3 × 30 reps",
            "clinicalCueRationale": "DVT prevention"
          },
          {
            "name": "AAROM Flexion (to 90° only)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Heel slides, stop at 90° — respect repair"
          },
          {
            "name": "Stationary Bike (seat HIGH)",
            "parameters": "15 min",
            "clinicalCueRationale": "Minimal knee flexion, low resistance — after week 4"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Progressive Loading",
        "timeline": "Week 6–12",
        "goals": [
          "Full ROM 0–130°",
          "WBAT progressing to FWB",
          "Functional strength",
          "Normalise gait"
        ],
        "precautions": [
          "Avoid deep squat >90° until week 10",
          "No running yet",
          "Monitor for joint line pain"
        ],
        "criteriaToProgress": [
          "Full ROM achieved",
          "FWB without pain",
          "Normal gait without assistive device"
        ],
        "exercises": [
          {
            "name": "Mini Squats (0–60°)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Progress range weekly, bilateral first"
          },
          {
            "name": "Leg Press (bilateral)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "60–90° range, controlled"
          },
          {
            "name": "Step-ups (forward & lateral)",
            "parameters": "3 × 15 each",
            "clinicalCueRationale": "10 cm → 15 cm box progression"
          },
          {
            "name": "Single-leg Balance",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Stable then unstable surface"
          },
          {
            "name": "Hip Strengthening",
            "parameters": "3 × 15 each",
            "clinicalCueRationale": "Abductors and extensors — key for knee stability"
          },
          {
            "name": "Pool Walking",
            "parameters": "20 min",
            "clinicalCueRationale": "Offload joint while gaining ROM and strength"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Return to Function",
        "timeline": "Month 3–6",
        "goals": [
          "Return to running (month 4)",
          "Sport-specific training",
          "Full symmetrical function"
        ],
        "precautions": [
          "No contact sport before month 6",
          "Avoid deep pivoting positions until month 5"
        ],
        "criteriaToProgress": [
          "LSI >90% strength & hop tests",
          "No pain with sport activity",
          "Surgeon clearance at 6 months"
        ],
        "exercises": [
          {
            "name": "Single-leg Squat",
            "parameters": "4 × 12 reps",
            "clinicalCueRationale": "Full depth, control valgus"
          },
          {
            "name": "Running Program",
            "parameters": "Walk-jog progression",
            "clinicalCueRationale": "Begin month 4 — even surface, build duration"
          },
          {
            "name": "Plyometrics",
            "parameters": "3 × 10 reps",
            "clinicalCueRationale": "Bilateral jumps first, then unilateral hops"
          },
          {
            "name": "Agility Drills",
            "parameters": "3 sets",
            "clinicalCueRationale": "Carioca, T-drill, shuttle runs"
          },
          {
            "name": "Sport-Specific Skills",
            "parameters": "Progressive",
            "clinicalCueRationale": "Full sport return month 6 with surgeon clearance"
          }
        ]
      }
    ]
  },
  {
    "name": "Patellofemoral Pain Syndrome (PFPS)",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Reduction",
        "timeline": "Week 0–3",
        "goals": [
          "Reduce anterior knee pain",
          "Restore pain-free ROM",
          "Patient education on load management"
        ],
        "precautions": [
          "Avoid pain >4/10 with exercise",
          "No deep squatting or stairs initially",
          "Patellar taping as adjunct"
        ],
        "criteriaToProgress": [
          "Pain ≤2/10 with ADLs",
          "Full pain-free ROM",
          "Ready for CKC loading"
        ],
        "exercises": [
          {
            "name": "Straight Leg Raise",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "VMO activation without PFJ stress"
          },
          {
            "name": "Hip Abduction (side-lying)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Key — hip weakness major driver of PFPS"
          },
          {
            "name": "Hip External Rotation (clamshell)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Band around knees, control movement"
          },
          {
            "name": "Quad Sets + Biofeedback",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "VMO focus, biofeedback if available"
          },
          {
            "name": "Stationary Bike (pain-free range)",
            "parameters": "15–20 min",
            "clinicalCueRationale": "High seat to limit flexion load"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening",
        "timeline": "Week 3–8",
        "goals": [
          "Hip and quad strengthening",
          "Neuromuscular control",
          "Load tolerance for stairs & squatting"
        ],
        "precautions": [
          "Monitor for pain increase post-exercise",
          "Avoid OKC exercises if painful"
        ],
        "criteriaToProgress": [
          "Stairs pain-free",
          "Single-leg squat controlled",
          "Running 20 min pain-free"
        ],
        "exercises": [
          {
            "name": "Wall Squat (0–60°)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Focus on hip-knee-foot alignment"
          },
          {
            "name": "Step-down (eccentric focus)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Slow 4-sec descent, control knee valgus"
          },
          {
            "name": "Hip Thrust",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Glute activation and posterior chain loading"
          },
          {
            "name": "Lateral Band Walk",
            "parameters": "3 × 15 steps each",
            "clinicalCueRationale": "Hip external rotator and abductor activation"
          },
          {
            "name": "TKE (band)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "VMO activation in functional position"
          },
          {
            "name": "Running on flat surface",
            "parameters": "Start 10 min",
            "clinicalCueRationale": "Pain-free only — cadence focus"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Return to Sport",
        "timeline": "Week 8–16",
        "goals": [
          "Sport-specific loading",
          "Full return to running and sport",
          "Long-term self-management"
        ],
        "precautions": [
          "Maintain hip strengthening long-term",
          "Manage training load spikes"
        ],
        "criteriaToProgress": [
          "Pain-free with all sport demands",
          "Confident return to training",
          "Self-managed home program"
        ],
        "exercises": [
          {
            "name": "Single-leg Squat Progression",
            "parameters": "4 × 12 reps",
            "clinicalCueRationale": "Add load, depth, and speed progressively"
          },
          {
            "name": "Plyometrics (bilateral → unilateral)",
            "parameters": "3 × 10 reps",
            "clinicalCueRationale": "Ensure pain-free landing mechanics"
          },
          {
            "name": "Running Program",
            "parameters": "Progressive",
            "clinicalCueRationale": "10% rule for weekly mileage increase"
          },
          {
            "name": "Sport-Specific Drills",
            "parameters": "Full sessions",
            "clinicalCueRationale": "Cutting, jumping, sport movement patterns"
          }
        ]
      }
    ]
  },
  {
    "name": "Patellar Tendinopathy",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Load Reduction & Isometrics",
        "timeline": "Week 0–4",
        "goals": [
          "Pain reduction",
          "Tendon loading via isometrics",
          "Reduce reactive tendinopathy"
        ],
        "precautions": [
          "Avoid stretching tendon",
          "Avoid high load eccentric initially if reactive",
          "Manage training load"
        ],
        "criteriaToProgress": [
          "VISA-P score improvement",
          "Pain ≤3/10 with isometrics",
          "Morning stiffness reducing"
        ],
        "exercises": [
          {
            "name": "Isometric Leg Press (70° knee flexion)",
            "parameters": "5 × 45 sec hold, 80% effort",
            "clinicalCueRationale": "Immediate analgesic effect — key exercise"
          },
          {
            "name": "Isometric Wall Squat",
            "parameters": "5 × 45 sec hold",
            "clinicalCueRationale": "Same benefit as leg press if no machine available"
          },
          {
            "name": "Hip Strengthening",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Glutes, hip abductors — reduce tendon load"
          },
          {
            "name": "Upper body & non-painful conditioning",
            "parameters": "As tolerated",
            "clinicalCueRationale": "Maintain fitness without tendon provocation"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Heavy Slow Resistance",
        "timeline": "Week 4–8",
        "goals": [
          "Tendon structural adaptation",
          "Strength gains",
          "Return to light sport-specific loading"
        ],
        "precautions": [
          "Avoid plyometrics",
          "Monitor 24h pain response after loading"
        ],
        "criteriaToProgress": [
          "VISA-P ≥60",
          "Tolerating heavy loading without spike",
          "Ready for plyometric introduction"
        ],
        "exercises": [
          {
            "name": "Leg Press (heavy, slow)",
            "parameters": "4 × 6 reps",
            "clinicalCueRationale": "Heavy slow resistance — gold standard"
          },
          {
            "name": "Hack Squat",
            "parameters": "4 × 6 reps, slow tempo",
            "clinicalCueRationale": "Progressive load increase weekly"
          },
          {
            "name": "Spanish Squat (isometric)",
            "parameters": "4 × 45 sec",
            "clinicalCueRationale": "Band around fixed point, hip hinge position"
          },
          {
            "name": "Step-ups (heavy)",
            "parameters": "3 × 10 reps each",
            "clinicalCueRationale": "High box, controlled eccentric"
          }
        ]
      }
    ]
  },
  {
    "name": "MCL Sprain (Grade II)",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Protection",
        "timeline": "Week 0–2",
        "goals": [
          "Reduce pain and swelling",
          "Protect healing ligament",
          "Maintain quad activation"
        ],
        "precautions": [
          "Valgus stress brace recommended",
          "Avoid valgus loading",
          "Partial weight bearing"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 at rest",
          "Able to FWB with brace"
        ],
        "exercises": [
          {
            "name": "Quad Sets",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Prevent quad atrophy"
          },
          {
            "name": "SLR (4 planes)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Maintain hip and quad strength"
          },
          {
            "name": "Stationary Bike (pain-free)",
            "parameters": "15 min",
            "clinicalCueRationale": "High seat, low resistance, reduce swelling"
          },
          {
            "name": "Cryotherapy",
            "parameters": "15 min × 3–4/day",
            "clinicalCueRationale": "Swelling management"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening",
        "timeline": "Week 2–6",
        "goals": [
          "Full ROM",
          "Valgus control",
          "FWB without brace",
          "CKC strengthening"
        ],
        "precautions": [
          "Avoid valgus collapse in all exercises",
          "Progress load gradually"
        ],
        "criteriaToProgress": [
          "FWB pain-free",
          "No valgus instability with ADL"
        ],
        "exercises": [
          {
            "name": "Mini Squats",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Knees straight, no valgus collapse"
          },
          {
            "name": "Step-ups (forward & lateral)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Control medial knee position"
          },
          {
            "name": "Hip Abductor Strengthening",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Critical to reduce valgus stress on MCL"
          },
          {
            "name": "TKE (band)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Quad activation, controlled alignment"
          },
          {
            "name": "Single-leg Balance",
            "parameters": "3 × 30 sec",
            "clinicalCueRationale": "Progress to unstable surface"
          }
        ]
      }
    ]
  },
  {
    "name": "Total Knee Arthroplasty (TKA)",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Hospital",
        "timeline": "Day 0–3",
        "goals": [
          "Pain management",
          "Achieve 0–90° ROM",
          "Independent mobility",
          "DVT prevention"
        ],
        "precautions": [
          "Monitor for signs of DVT",
          "Weight bearing as tolerated (WBAT)",
          "Follow surgeon precautions"
        ],
        "criteriaToProgress": [
          "90° flexion",
          "Independent ambulation with frame",
          "Safe for discharge"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps",
            "parameters": "10 reps every hour",
            "clinicalCueRationale": "DVT prevention — start immediately post-op"
          },
          {
            "name": "Quad Sets",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Begin day 1 post-op"
          },
          {
            "name": "Heel Slides (AAROM)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Work toward 90° flexion"
          },
          {
            "name": "SLR",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "When quad sets pain-free"
          },
          {
            "name": "Sit-to-Stand",
            "parameters": "5 × per session",
            "clinicalCueRationale": "Use armrests, controlled movement"
          }
        ]
      }
    ]
  },
  {
    "name": "PCL Tear — Conservative",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce effusion",
          "Quad activation",
          "Protect posterior capsule",
          "FWB with brace"
        ],
        "precautions": [
          "PCL brace with 0° extension stop",
          "No posterior tibial stress",
          "Avoid prone knee flexion"
        ],
        "criteriaToProgress": [
          "Effusion resolved",
          "Quad activation full",
          "Pain ≤2/10 with activity"
        ],
        "exercises": [
          {
            "name": "Quad Sets",
            "parameters": "4 × 20 reps",
            "clinicalCueRationale": "Quad dominance is protective for PCL — critical"
          },
          {
            "name": "SLR (flexion & extension)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "No hamstring-loaded SLR"
          },
          {
            "name": "Leg Press (0–60° only)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Quad-dominant, avoid 90° — increases PCL stress"
          },
          {
            "name": "Stationary Bike (low resistance)",
            "parameters": "20 min",
            "clinicalCueRationale": "High seat, low resistance, quad emphasis"
          }
        ]
      }
    ]
  },
  {
    "name": "Tibialis Anterior Tendinopathy",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Load Relief & Isometric Control",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce anterior ankle pain",
          "Offload the tendon (shoe modifications)",
          "Isometric dorsiflexion loading"
        ],
        "precautions": [
          "Avoid tight shoelaces (compression risk over tendon)",
          "No aggressive stretching of anterior structures",
          "Gait assessment for heel-strike issues"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 during isometric loading",
          "Minimal morning stiffness",
          "Improved gait quality"
        ],
        "exercises": [
          {
            "name": "Isometric Dorsiflexion",
            "parameters": "5 × 45 sec, 70% effort",
            "clinicalCueRationale": "High load isometric prevents further atrophy — painless activation"
          },
          {
            "name": "Modified Lacing Education",
            "parameters": "Ongoing",
            "clinicalCueRationale": "Skip eyelets over the most sensitive area of the tendon"
          },
          {
            "name": "Deep Intrinsic Arch Strengthening",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Address midfoot collapse which increases TA load"
          }
        ]
      }
    ]
  },
  {
    "name": "Sciatic Nerve Neuropathy",
    "category": "Neurological / Other",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Neural Decompression & Symptom Control",
        "timeline": "Week 0–6",
        "goals": [
          "Reduce lancinating leg pain",
          "Address potential entrapment sites (e.g. piriformis, hamstring)",
          "Neural mobilisation"
        ],
        "precautions": [
          "Avoid sustained end-range SLR (Straight Leg Raise)",
          "Monitor for muscle weakness (Foot drop)",
          "No aggressive stretching of hamstrings"
        ],
        "criteriaToProgress": [
          "Neural tension sensitivity reducing",
          "Muscle power stable or improving",
          "Centralisation of symptoms"
        ],
        "exercises": [
          {
            "name": "Sciatic Nerve Slider (Supine)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Large amplitude, low tension neural excursion"
          },
          {
            "name": "Soft Tissue Release (Gluteal region)",
            "parameters": "2 min",
            "clinicalCueRationale": "Reduce external compression on nerve path"
          },
          {
            "name": "Dorsiflexion/Plantarflexion Circles",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintains neural mobility at the distal end (peroneal/tibial branches)"
          }
        ]
      }
    ]
  },
  {
    "name": "Cervical Facet Joint Syndrome",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Control & Range Optimisation",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce localised neck pain",
          "Restore pain-free rotation and lateral flexion",
          "Postural stability"
        ],
        "precautions": [
          "Avoid forceful cervical extension + rotation (closed-packed position)",
          "No heavy overhead lifting",
          "Address upper thoracic stiffness"
        ],
        "criteriaToProgress": [
          "Symmetrical rotation ROM",
          "Pain ≤3/10",
          "Minimal guarding of paraspinal muscles"
        ],
        "exercises": [
          {
            "name": "Cervical Retraction (Chin tuck)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Open facet joints and reduce focal loading"
          },
          {
            "name": "Gentle AROM Rotation (Pain-free)",
            "parameters": "3 × 10 reps each side",
            "clinicalCueRationale": "Movement as medicine — don't push into pain"
          },
          {
            "name": "Thoracic Extension (Foam roller)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Address thoracic stiffness to reduce cervical load"
          }
        ]
      }
    ]
  },
  {
    "name": "Scheuermann's Disease",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Postural Correction & Tissue Length",
        "timeline": "Week 0–8",
        "goals": [
          "Reduce thoracic kyphotic curve emphasis",
          "Stretch tight anterior structures (Pecs)",
          "Strengthen posterior chain",
          "Pain management (if present)"
        ],
        "precautions": [
          "Age dependent (bone maturity matters)",
          "Avoid extreme end-range flexion loading",
          "Monitor for any neurological signs (rare)"
        ],
        "criteriaToProgress": [
          "Shoulder retraction strength improved",
          "Improved postural awareness",
          "Reduction in mid-back fatigue"
        ],
        "exercises": [
          {
            "name": "Pectoralis Doorway Stretch",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Address anterior tightness causing rounded shoulders"
          },
          {
            "name": "Thoracic Extensions (Wall-supported)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Progressive extension range focus"
          },
          {
            "name": "Prone Y/W Exercise",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Strengthen lower/mid traps — postural anchor"
          }
        ]
      }
    ]
  },
  {
    "name": "Thoracic Disc Herniation",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Neural Protection & Unloading",
        "timeline": "Week 0–6",
        "goals": [
          "Reduce radicular pain (ribcage wrap)",
          "Maintain available spine ROM",
          "Control abdominal pressure"
        ],
        "precautions": [
          "URGENT: Myelopathy signs (lower limb weakness/balance) = immediate referral",
          "Avoid heavy spinal rotation",
          "Avoid valsalva maneuvers"
        ],
        "criteriaToProgress": [
          "Radicular pain resolving",
          "No progressive neurological deficit",
          "Centralisation of symptoms"
        ],
        "exercises": [
          {
            "name": "Gentle Cat-Camel (Mid-spine focus)",
            "parameters": "3 × 12 reps",
            "clinicalCueRationale": "Neural unloading through gentle cyclic motion"
          },
          {
            "name": "Deep Core Activation (Dead bug)",
            "parameters": "3 × 10 reps",
            "clinicalCueRationale": "Address intra-abdominal pressure control"
          },
          {
            "name": "Thoracic Neutral Posture Training",
            "parameters": "Ongoing",
            "clinicalCueRationale": "Education on mid-back positioning during sitting"
          }
        ]
      }
    ]
  },
  {
    "name": "Radial Tunnel Syndrome",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Neural Unloading & Activity Modification",
        "timeline": "Week 0–6",
        "goals": [
          "Reduce posterior interosseous nerve (PIN) irritation",
          "Address forearm muscle tension (supinator)",
          "Patient education on biomechanics"
        ],
        "precautions": [
          "Avoid forceful forearm supination + wrist extension",
          "No heavy gripping or wringing clothes",
          "Exclude lateral epicondylitis"
        ],
        "criteriaToProgress": [
          "Lateral forearm pain reducing",
          "Radial nerve tension test improving",
          "Improved grip comfort"
        ],
        "exercises": [
          {
            "name": "Radial Nerve Slider",
            "parameters": "3 × 10 reps",
            "clinicalCueRationale": "Gently glide the nerve — avoid tingling/numbness"
          },
          {
            "name": "Supinator Gentle Stretching",
            "parameters": "3 × 30 sec",
            "clinicalCueRationale": "Elbow extended, forearm pronated — open the tunnel"
          },
          {
            "name": "Wrist Extension Isometrics (Painless)",
            "parameters": "3 × 15 reps, 5 sec",
            "clinicalCueRationale": "Maintain tendon tone without aggressive nerve stimulation"
          }
        ]
      }
    ]
  },
  {
    "name": "Trigger Finger (Conservative)",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Inflammation Control & Tendon Protection",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce tendon sheath inflammation (A1 pulley)",
          "Prevent snapping/locking episodes",
          "Maintain joint mobility"
        ],
        "precautions": [
          "No forceful repetitive gripping",
          "Splinting recommended for night or heavy activity",
          "Avoid \"testing\" the snap"
        ],
        "criteriaToProgress": [
          "Triggering frequency reduced",
          "Reduced tenderness over A1 pulley",
          "Ready for graduated loading"
        ],
        "exercises": [
          {
            "name": "Splinting (MCP joint block)",
            "parameters": "Nightly + heavy work",
            "clinicalCueRationale": "Prevents pulley irritation — allows tendon volume to reduce"
          },
          {
            "name": "Tendon Gliding Exercises (Blocking)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "DIP/PIP isolate motion to move tendon within sheath without full snap"
          },
          {
            "name": "Passive Digital ROM",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain range without active pulley stress"
          }
        ]
      }
    ]
  },
  {
    "name": "Boutonniere Deformity",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "PIP Immobilisation & Extension Restore",
        "timeline": "Week 0–6",
        "goals": [
          "Restore central slip integrity",
          "Achieve full passive PIP extension",
          "Maintain DIP joint mobility"
        ],
        "precautions": [
          "PIP joint MUST be splinted in full extension 24/7",
          "No PIP flexion allowed for 6 weeks",
          "Monitor skin integrity"
        ],
        "criteriaToProgress": [
          "6 weeks continuous immobilisation completed",
          "Zero degree PIP extension achieved",
          "DIP flexion full"
        ],
        "exercises": [
          {
            "name": "PIP Neutral Splinting",
            "parameters": "Continuous (24/7)",
            "clinicalCueRationale": "Zero tolerance for flexion — allows central slip healing"
          },
          {
            "name": "DIP Joint Active Flexion",
            "parameters": "5 × 10 reps hourly",
            "clinicalCueRationale": "Pull lateral bands distally — prevents fixed deformity"
          },
          {
            "name": "Hand/Wrist ROM (except PIP)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain general hand function while PIP isolated"
          }
        ]
      }
    ]
  },
  {
    "name": "Extensor Tendon Repair (Hand)",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Early Protected Motion (EPM)",
        "timeline": "Week 0–4",
        "goals": [
          "Tendon protection",
          "Early controlled gliding",
          "Edema management",
          "Wound healing"
        ],
        "precautions": [
          "Strict follow of splint regime (SAM or Kleinert)",
          "No active extension against resistance",
          "No passive flexion beyond splint stop"
        ],
        "criteriaToProgress": [
          "No signs of tendon rupture",
          "Minimal adhesions",
          "Wound closed"
        ],
        "exercises": [
          {
            "name": "Controlled Passive Flexion within Splint",
            "parameters": "5 × 10 reps every 2h",
            "clinicalCueRationale": "Allows tendon excursion without high tension"
          },
          {
            "name": "Active Extension to Splint Stop",
            "parameters": "5 × 10 reps every 2h",
            "clinicalCueRationale": "Low tension activation to prevent adhesions"
          },
          {
            "name": "Digital Edema Massage",
            "parameters": "10 min",
            "clinicalCueRationale": "Proximal to distal — reduce bulk in tendon path"
          }
        ]
      }
    ]
  },
  {
    "name": "Dupuytren's (Post-operative)",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Wound Healing & Early Extension",
        "timeline": "Week 0–4",
        "goals": [
          "Maintain surgical extension gains",
          "Wound care",
          "Edema management",
          "Neural monitoring"
        ],
        "precautions": [
          "Night splint mandatory in full extension",
          "Avoid aggressive forceful flexion early",
          "Monitor for \"flare reaction\" (sudden pain/stiffness)"
        ],
        "criteriaToProgress": [
          "Wound healed",
          "Extension gains maintained",
          "Active fist possible"
        ],
        "exercises": [
          {
            "name": "Digital Extension Splinting (Static)",
            "parameters": "Nightly (6 months)",
            "clinicalCueRationale": "Prevent scar contracture from returning"
          },
          {
            "name": "Tendon Gliding - Full Fist",
            "parameters": "3 × 15 reps each position",
            "clinicalCueRationale": "Prevent adhesions to surgical scar"
          },
          {
            "name": "Scar Massage (after wound closure)",
            "parameters": "5 min heavy pressure",
            "clinicalCueRationale": "Remodel fibrous tissue — key for long term mobility"
          }
        ]
      }
    ]
  },
  {
    "name": "Thumb UCL Sprain",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Immobilisation & Protection",
        "timeline": "Week 0–6",
        "goals": [
          "Allow UCL ligament healing",
          "Protect MCP joint from valgus stress",
          "Maintain digital and wrist mobility"
        ],
        "precautions": [
          "High risk of Stener lesion (if grade III) — needs surgery",
          "No pinch-grip or thumb abduction",
          "Splint mandatory 24/7"
        ],
        "criteriaToProgress": [
          "6 weeks immobilisation completed",
          "Stability confirmed on stress test",
          "No pain at joint line"
        ],
        "exercises": [
          {
            "name": "Thumb Spica Splinting",
            "parameters": "24 hours/day (6 weeks)",
            "clinicalCueRationale": "Strict protection of the ulnar collateral ligament"
          },
          {
            "name": "Finger ROM",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain hand function while thumb isolated"
          },
          {
            "name": "Wrist AROM (Gentle)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Maintain wrist mobility — avoid thumb pull"
          }
        ]
      }
    ]
  },
  {
    "name": "Rectus Femoris Strain",
    "category": "Sports & Trauma",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Management & Protection",
        "timeline": "Week 0–2",
        "goals": [
          "Reduce hematoma/edema",
          "Protect healing muscle fibers",
          "Maintain knee and hip joint mobility"
        ],
        "precautions": [
          "Avoid aggressive stretching into hip extension + knee flexion",
          "No resisted hip flexion",
          "Avoid deep heat in first 72h"
        ],
        "criteriaToProgress": [
          "Pain-free walking",
          "Knee flexion ≥90°",
          "Minimal tenderness on palpation"
        ],
        "exercises": [
          {
            "name": "Quadriceps Isometrics (Sub-maximal)",
            "parameters": "5 × 10 reps, 5 sec",
            "clinicalCueRationale": "Painless activation — prevents atrophy"
          },
          {
            "name": "Heel Slides (Knee ROM)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Gentle mobility within comfort zone"
          },
          {
            "name": "Gluteal Sets / Bridge (Mid-range)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Establish posterior chain support"
          }
        ]
      }
    ]
  },
  {
    "name": "Gluteal Strain",
    "category": "Sports & Trauma",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Protection & Early Loading",
        "timeline": "Week 0–3",
        "goals": [
          "Protect healing gluteal fibers",
          "Reduce focal pain",
          "Normalise gait"
        ],
        "precautions": [
          "Avoid aggressive internal rotation or adduction stretching",
          "No heavy resisted abduction",
          "Modify sleep position (pillow between legs)"
        ],
        "criteriaToProgress": [
          "Pain-free gait without Trendelenburg",
          "Slightly resisted abduction is painless"
        ],
        "exercises": [
          {
            "name": "Isometric Hip Abduction (Supine)",
            "parameters": "5 × 45 sec, 50% effort",
            "clinicalCueRationale": "Activation without muscle lengthening stress"
          },
          {
            "name": "Standing Gluteal Squeezes",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Establish pelvic stability"
          },
          {
            "name": "Short Foot Exercise",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Foot-hip connection for stability during gait"
          }
        ]
      }
    ]
  },
  {
    "name": "Pectoralis Major Rupture",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Protection & Tissue Healing",
        "timeline": "Week 0–4",
        "goals": [
          "Protect healing muscle/tendon",
          "Reduce pain and hematoma",
          "Maintain scapular and distal mobility"
        ],
        "precautions": [
          "Sling for 3–4 weeks",
          "No active horizontal adduction or abduction/ER",
          "Avoid heavy lifting"
        ],
        "criteriaToProgress": [
          "Pain resolving",
          "Pendulum exercises tolerated",
          "Passive abduction up to 90°"
        ],
        "exercises": [
          {
            "name": "Sling Immobilisation",
            "parameters": "Continuous",
            "clinicalCueRationale": "Necessary for large muscle tear protection"
          },
          {
            "name": "Pendulum Exercises",
            "parameters": "3 × 5 min",
            "clinicalCueRationale": "Passive synovial fluid movement — pain relief"
          },
          {
            "name": "Elbow/Wrist AROM",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Prevent distal stiffness"
          }
        ]
      }
    ]
  },
  {
    "name": "Distal Biceps Rupture (Post-op)",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Splinting & Early ROM",
        "timeline": "Week 0–4",
        "goals": [
          "Protect surgical repair",
          "Controlled early mobility",
          "Wound management",
          "Edema control"
        ],
        "precautions": [
          "Hinged elbow brace with extension block (usually -30°)",
          "No active elbow flexion or supination",
          "No resisted elbow extension"
        ],
        "criteriaToProgress": [
          "Extension to -30° achieved",
          "Wound healed",
          "Minimal forearm/elbow swelling"
        ],
        "exercises": [
          {
            "name": "Passive Elbow Flexion/Extension (within brace limits)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Restore ROM without tendon stress"
          },
          {
            "name": "Active Grip Strengthening",
            "parameters": "3 × 20 reps, light balls",
            "clinicalCueRationale": "Maintain forearm muscle activation"
          },
          {
            "name": "Shoulder AROM (Sling used for support)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Prevent secondary frozen shoulder"
          }
        ]
      }
    ]
  },
  {
    "name": "Triceps Rupture (Post-operative)",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Protection & Passive Loading",
        "timeline": "Week 0–6",
        "goals": [
          "Protect healing triceps tendon",
          "Controlled ROM restoration",
          "Edema management"
        ],
        "precautions": [
          "Hinged elbow brace with limited flexion block",
          "No active elbow extension",
          "Avoid forceful passive flexion beyond limits"
        ],
        "criteriaToProgress": [
          "Wound healed",
          "Extension full",
          "Flexion gain appropriate for protocol"
        ],
        "exercises": [
          {
            "name": "Hinged Elbow Brace (-30° extension block)",
            "parameters": "Full time",
            "clinicalCueRationale": "Protects from end-range flexion stretch"
          },
          {
            "name": "Active Grip Strength",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain forearm engagement"
          },
          {
            "name": "Shoulder AROM (Sling used)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Prevent shoulder stiffness"
          }
        ]
      }
    ]
  },
  {
    "name": "Little Leaguer's Shoulder",
    "category": "Paediatric & Special",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Complete Rest & Protection",
        "timeline": "Week 0–6+",
        "goals": [
          "Allow growth plate healing",
          "Identify biomechanical errors",
          "Maintain cuff and scapular endurance without throwing"
        ],
        "precautions": [
          "NO throwing or overhead loading",
          "Educate parents on growth plate continuum",
          "Exclude humerus fracture"
        ],
        "criteriaToProgress": [
          "Zero pain at rest and with AROM",
          "X-ray evidence of physis narrowing/healing",
          "Strong scapular base"
        ],
        "exercises": [
          {
            "name": "No Throwing / Overhead Lifting",
            "parameters": "Daily",
            "clinicalCueRationale": "Mandatory for growth plate bone healing"
          },
          {
            "name": "Scapular Stability Exercises",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Build the foundation for future throwing return"
          },
          {
            "name": "Internal Rotation Stretch (GIRD focus)",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Address loss of IR common in overhead athletes"
          }
        ]
      }
    ]
  },
  {
    "name": "Juvenile Osgood-Schlatter",
    "category": "Paediatric & Special",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Management & Tissue Length",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce tibial tuberosity pain",
          "Identify provocative sports",
          "Long-term load management education"
        ],
        "precautions": [
          "Avoid complete rest — keep child active within pain tolerance",
          "No aggressive quad stretching during flare-up",
          "Bone maturation resolves the condition"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 with daily activity",
          "Reduced swelling at tuberosity"
        ],
        "exercises": [
          {
            "name": "Isometrics (Mid-range quad sets)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Maintain muscle tone without high patellar traction"
          },
          {
            "name": "Hamstring Stretching",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Reduced posterior tension increases knee efficiency"
          },
          {
            "name": "Activity Pacing Program",
            "parameters": "Ongoing",
            "clinicalCueRationale": "Reduce jumping/running volume by 30-50% during peaks"
          }
        ]
      }
    ]
  },
  {
    "name": "Sinding-Larsen-Johansson",
    "category": "Paediatric & Special",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Load Modification & Patellar Protection",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce inferior patellar pole pain",
          "Offload patellar tendon traction",
          "Parental education"
        ],
        "precautions": [
          "Similar to Osgood-Schlatter but at the lower pole of patella",
          "Avoid deep squatting and jumping",
          "Avoid aggressive quad stretching"
        ],
        "criteriaToProgress": [
          "Pain-free walking",
          "Minimal tenderness at inferior pole"
        ],
        "exercises": [
          {
            "name": "Quadriceps Isometrics",
            "parameters": "5 × 45 sec, submaximal",
            "clinicalCueRationale": "Tendon/bone load policy — reduces pain"
          },
          {
            "name": "Calf Stretching",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Reduce general lower limb tension"
          },
          {
            "name": "Hip Strengthening (Glutes)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Address proximal power to unload the knee"
          }
        ]
      }
    ]
  },
  {
    "name": "Perthes Disease",
    "category": "Paediatric & Special",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Joint Protection & ROM Maintenance",
        "timeline": "Week 0–12+",
        "goals": [
          "Maintain hip ROM (especially Abduction)",
          "Pain control",
          "Prevent femoral head deformity"
        ],
        "precautions": [
          "NWB or PWB often required per orthopaedic plan",
          "Avoid high impact or repetitive heavy loading",
          "Regular X-ray monitoring"
        ],
        "criteriaToProgress": [
          "Hip abduction >35°",
          "Minimal pain during gait",
          "Radiological stability"
        ],
        "exercises": [
          {
            "name": "Passive Hip Abduction (Supine)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Ensures femoral head seating in acetabulum"
          },
          {
            "name": "Stationary Bike (Low resistance)",
            "parameters": "20 min daily",
            "clinicalCueRationale": "Cartilage nutrition and joint mobility"
          },
          {
            "name": "Pool Exercises (Buoyancy supported)",
            "parameters": "30 min",
            "clinicalCueRationale": "Ideal environment for mobility in Perthes"
          }
        ]
      }
    ]
  },
  {
    "name": "PCL Reconstruction",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Maximum Protection",
        "timeline": "Week 0–6",
        "goals": [
          "Protect graft from posterior tibial translation",
          "Control effusion",
          "Wound healing",
          "Maintain ROM (0-90°)"
        ],
        "precautions": [
          "Sling/Brace locked in extension for 2-4 weeks",
          "No active hamstring contraction (at least 6-8 weeks)",
          "No posterior tibial loading"
        ],
        "criteriaToProgress": [
          "Minimal effusion",
          "Full extension 0°",
          "Flexion up to 90°",
          "No lag on SLR"
        ],
        "exercises": [
          {
            "name": "Quadriceps Isometrics (Quad sets)",
            "parameters": "3 × 20 reps, 10 sec",
            "clinicalCueRationale": "Active anterior translation of tibia supports the graft"
          },
          {
            "name": "Patellar Mobilisation",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Prevent adhesions in the patellofemoral joint"
          },
          {
            "name": "Ankle Pumps",
            "parameters": "10 × hourly",
            "clinicalCueRationale": "DVT prophylaxis"
          },
          {
            "name": "Passive Knee ROM (Prone is best)",
            "parameters": "3 × 15 reps, 0-90°",
            "clinicalCueRationale": "Gravity assists flexion without posterior tibial sag"
          }
        ]
      }
    ]
  },
  {
    "name": "Brachial Plexus Injury",
    "category": "Neurological / Other",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Joint Preservation & Neural Protection",
        "timeline": "Week 0–8",
        "goals": [
          "Protect healing nerve roots",
          "Maintain passive range of all upper limb joints",
          "Patient education on sensory loss"
        ],
        "precautions": [
          "Prevent subluxation of the shoulder (use sling/support)",
          "Avoid aggressive nerve pulling/stretching",
          "Monitor for pressure sores in anaesthetic areas"
        ],
        "criteriaToProgress": [
          "Safe joint mobility maintained",
          "No secondary contractures developed",
          "Management plan established"
        ],
        "exercises": [
          {
            "name": "Passive ROM - Shoulder/Elbow/Wrist/Hand",
            "parameters": "3 × 15 reps each, twice daily",
            "clinicalCueRationale": "Mandatory to prevent frozen joints during paralysis"
          },
          {
            "name": "Shoulder Support (Slings/Bracing)",
            "parameters": "Ongoing",
            "clinicalCueRationale": "Prevent inferior subluxation from weight of limb"
          },
          {
            "name": "Sensory Education (Visual inspection of skin)",
            "parameters": "Daily",
            "clinicalCueRationale": "Patient must check for injuries in areas without feeling"
          }
        ]
      }
    ]
  },
  {
    "name": "Thoracic Hyperkyphosis",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Postural Awareness & Anterior Length",
        "timeline": "Week 0–8",
        "goals": [
          "Improve thoracic extension range",
          "Strengthen postural extensors",
          "Open anterior chest wall"
        ],
        "precautions": [
          "Assess for bone density (Osteoporosis in elderly)",
          "Avoid forceful sustained flexion",
          "Monitor for rib pain"
        ],
        "criteriaToProgress": [
          "Improved height measurement",
          "Reduction in mid-back pain",
          "Improved respiratory capacity"
        ],
        "exercises": [
          {
            "name": "Thoracic Extension over Bolster",
            "parameters": "3 × 1 min",
            "clinicalCueRationale": "Passive remodeling of thoracic curvature"
          },
          {
            "name": "Wall Angels",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Neuromuscular retraining of scapular stabilisers"
          },
          {
            "name": "Deep Breathing Exercises",
            "parameters": "5 min, twice daily",
            "clinicalCueRationale": "Increase rib cage expansion and lung volume"
          }
        ]
      }
    ]
  },
  {
    "name": "Spondylolisthesis (Conservative)",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Control & Stabilisation",
        "timeline": "Week 0–6",
        "goals": [
          "Symptom reduction",
          "Neutral spine awareness",
          "Core activation without extension"
        ],
        "precautions": [
          "Avoid lumbar extension (arching back)",
          "No heavy lifting",
          "Avoid high-impact activities"
        ],
        "criteriaToProgress": [
          "Pain reduction >50%",
          "Ability to hold neutral spine during ADLs",
          "Strong transverse abdominis activation"
        ],
        "exercises": [
          {
            "name": "Pelvic Tilts (Pain-free range)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Dissociate hip movement from lumbar spine"
          },
          {
            "name": "Transverse Abdominis Bracing",
            "parameters": "10 × 10 sec",
            "clinicalCueRationale": "Create an internal corset to support the vertebrae"
          },
          {
            "name": "Hamstring Stretching (Supine with strap)",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Reduce posterior pelvic pull"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Early Strengthening",
        "timeline": "Week 2–6",
        "goals": [
          "Restore full extension (0°)",
          "Flexion to 120°",
          "Normalise gait",
          "Single leg balance > 30 sec"
        ],
        "precautions": [
          "No open chain extension 90-45°",
          "Avoid tibial rotation during loaded exercise"
        ],
        "criteriaToProgress": [
          "Full extension",
          "Flexion > 125°",
          "Minimal effusion",
          "No lag on SLR"
        ],
        "exercises": [
          {
            "name": "Mini-Squats (0-60°)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Closed chain quadriceps activation"
          },
          {
            "name": "Static Cycling (Low resistance)",
            "parameters": "15-20 min",
            "clinicalCueRationale": "Improve ROM and aerobic capacity"
          },
          {
            "name": "Heel Raises (Bilateral)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Gastrocnemius strengthening for knee stability"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Weight Bearing Transition",
        "timeline": "Week 4–8",
        "goals": [
          "Progress to full weight bearing",
          "Eliminate crutches",
          "Restore full ROM"
        ],
        "precautions": [
          "Limit weighted squats to < 60° flexion",
          "No twisting/pivoting",
          "No deep lunges"
        ],
        "criteriaToProgress": [
          "Normal gait without assistive device",
          "Symmetrical knee ROM",
          "No pain with WB"
        ],
        "exercises": [
          {
            "name": "Wall Slides (Limited range 60°)",
            "parameters": "3 × 12 reps",
            "clinicalCueRationale": "Controlled eccentric Loading"
          },
          {
            "name": "Step-ups (Forward)",
            "parameters": "3 × 15 reps (4-inch step)",
            "clinicalCueRationale": "Functional quadriceps control"
          },
          {
            "name": "Single Leg Stance (Eyes open)",
            "parameters": "3 × 30 sec",
            "clinicalCueRationale": "Proprioceptive retraining of the joint capitals"
          }
        ]
      }
    ]
  },
  {
    "name": "Rotator Cuff Repair (Post-operative)",
    "category": "Shoulder",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Passive Motion",
        "timeline": "Week 0–6",
        "goals": [
          "Protect repair",
          "Prevent stiffness",
          "PROM: 140° flexion, 40° ER",
          "Pain management"
        ],
        "precautions": [
          "Sling at all times except exercise",
          "No AROM",
          "No lifting or pushing",
          "No internal rotation stress"
        ],
        "criteriaToProgress": [
          "PROM: 140° flexion, 40° ER at neutral",
          "Pain controlled at rest",
          "Surgeon clearance at 6 weeks"
        ],
        "exercises": [
          {
            "name": "Pendulum (Codman's) Exercises",
            "parameters": "3 × 2 min all planes",
            "clinicalCueRationale": "Gravity-assisted distraction — no muscle activation"
          },
          {
            "name": "PROM Shoulder Flexion (supine)",
            "parameters": "3 × 15 reps to tolerance",
            "clinicalCueRationale": "Therapist-assisted, pain-free range"
          },
          {
            "name": "PROM ER (0° abduction)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Elbow at side, cane-assisted to 40°"
          },
          {
            "name": "Elbow ROM & grip strength",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain distal function while in sling"
          },
          {
            "name": "Scapular Retraction (isometric)",
            "parameters": "3 × 10 reps, 5 sec hold",
            "clinicalCueRationale": "Maintain scapular function"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Active Assisted & Early Active",
        "timeline": "Week 6–12",
        "goals": [
          "AAROM → AROM",
          "Rotator cuff activation",
          "Scapular stabilisation",
          "Progress to 150° flexion"
        ],
        "precautions": [
          "No lifting >1 kg",
          "No reaching behind back",
          "Avoid painful arcs"
        ],
        "criteriaToProgress": [
          "AROM: 150° flexion",
          "ER to 60°",
          "No painful arc"
        ],
        "exercises": [
          {
            "name": "Pulleys (AAROM flexion)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Good arm assists — gradual range increase"
          },
          {
            "name": "Supine Active Flexion",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Gravity-eliminated initially, progress to against gravity"
          },
          {
            "name": "ER with band (light resistance)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Elbow at side, slow controlled — infraspinatus/teres minor"
          },
          {
            "name": "Scapular Push-up (wall)",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Serratus anterior — critical for scapular upward rotation"
          },
          {
            "name": "Side-lying ER",
            "parameters": "3 × 15 reps",
            "clinicalCueRationale": "Light weight, focus on external rotators"
          },
          {
            "name": "Prone Y/T/W",
            "parameters": "3 × 12 reps",
            "clinicalCueRationale": "Scapular stabilisers — no weight initially"
          }
        ]
      }
    ]
  },
  {
    "name": "Shoulder Impingement Syndrome",
    "category": "Shoulder",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Reduction",
        "timeline": "Week 0–3",
        "goals": [
          "Reduce subacromial inflammation",
          "Improve scapular positioning",
          "Pain ≤3/10"
        ],
        "precautions": [
          "Avoid overhead reaching",
          "No painful arc activities",
          "Correct posture deficits"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 with daily activities",
          "Scapular resting position improved"
        ],
        "exercises": [
          {
            "name": "Pendulums",
            "parameters": "3 × 2 min",
            "clinicalCueRationale": "Gentle distraction — reduce subacromial pressure"
          },
          {
            "name": "Scapular Retraction (sitting)",
            "parameters": "3 × 20 reps, 5 sec hold",
            "clinicalCueRationale": "Pull shoulder blades together and down"
          },
          {
            "name": "Chin Tucks",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Correct forward head — affects scapular position"
          },
          {
            "name": "ER with band (low resistance)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Elbow at side — infraspinatus and teres minor"
          },
          {
            "name": "Posture correction exercises",
            "parameters": "Hourly reminders",
            "clinicalCueRationale": "Thoracic extension — key modifiable factor"
          }
        ]
      }
    ]
  },
  {
    "name": "Lateral Ankle Sprain (Grade I-II)",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "PEACE",
        "timeline": "Day 0–3",
        "goals": [
          "Reduce swelling and pain",
          "Protect injured ligaments",
          "Begin early weight bearing"
        ],
        "precautions": [
          "PEACE protocol: Protect, Elevate, Avoid anti-inflammatories, Compress, Educate",
          "No passive stretching in first 72h"
        ],
        "criteriaToProgress": [
          "Swelling reducing",
          "Pain ≤4/10 with WB",
          "Ready for LOVE phase"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps",
            "parameters": "10 reps every hour",
            "clinicalCueRationale": "Reduce swelling — start immediately"
          },
          {
            "name": "Toe Curls / Marble pickups",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Intrinsic foot muscle activation"
          },
          {
            "name": "RICE",
            "parameters": "20 min every 2h",
            "clinicalCueRationale": "Elevate above heart level"
          },
          {
            "name": "Partial Weight Bearing (crutches if needed)",
            "parameters": "As tolerated",
            "clinicalCueRationale": "Pain-free loading is better than rest"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "LOVE & Early Rehab",
        "timeline": "Day 3–Week 4",
        "goals": [
          "FWB pain-free",
          "Restore ROM",
          "Begin proprioception training",
          "Normal gait"
        ],
        "precautions": [
          "Brace or taping for support",
          "Avoid inversion loading",
          "Pain guide"
        ],
        "criteriaToProgress": [
          "FWB pain-free",
          "Normal gait",
          "Good balance on involved side"
        ],
        "exercises": [
          {
            "name": "Calf Raises (bilateral)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Full ROM, slow and controlled"
          },
          {
            "name": "Resistance Band Eversion",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Peroneal strengthening — critical for lateral stability"
          },
          {
            "name": "Alphabet Tracing (AROM)",
            "parameters": "2 × each letter",
            "clinicalCueRationale": "Full ankle ROM in all planes"
          },
          {
            "name": "Single-leg Balance",
            "parameters": "3 × 30 sec",
            "clinicalCueRationale": "Proprioception — eyes open then closed"
          }
        ]
      }
    ]
  },
  {
    "name": "Achilles Tendinopathy",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Isometric Loading",
        "timeline": "Week 0–4",
        "goals": [
          "Pain reduction",
          "Tendon loading tolerance",
          "Identify and modify contributing factors"
        ],
        "precautions": [
          "Avoid stretching Achilles in reactive phase",
          "Modify training load",
          "Heel raise in shoe"
        ],
        "criteriaToProgress": [
          "Pain ≤4/10 during isometrics",
          "Morning stiffness <10 min",
          "VISA-A improving"
        ],
        "exercises": [
          {
            "name": "Isometric Calf Holds (knee straight)",
            "parameters": "5 × 45 sec, 70–80% effort",
            "clinicalCueRationale": "Standing calf raise held — immediate analgesic effect"
          },
          {
            "name": "Isometric Calf Holds (knee bent 30°)",
            "parameters": "5 × 45 sec",
            "clinicalCueRationale": "Loads soleus predominantly"
          },
          {
            "name": "Bike / Swimming",
            "parameters": "30 min",
            "clinicalCueRationale": "Maintain cardiovascular fitness without Achilles load"
          }
        ]
      }
    ]
  },
  {
    "name": "Ankle Fracture (Post-immobilisation)",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Post-Cast Restoration",
        "timeline": "Week 0–4 post-cast",
        "goals": [
          "Restore ankle ROM",
          "Reduce oedema",
          "Begin WB progression",
          "Gait retraining"
        ],
        "precautions": [
          "Follow surgeon WB status",
          "Monitor wound if ORIF",
          "No inversion loading if fibula fracture"
        ],
        "criteriaToProgress": [
          "FWB pain-free",
          "Dorsiflexion improving",
          "No significant oedema"
        ],
        "exercises": [
          {
            "name": "Ankle ROM (AROM all planes)",
            "parameters": "3 × 20 reps each direction",
            "clinicalCueRationale": "Alphabet tracing — restore dorsiflexion priority"
          },
          {
            "name": "Ankle Pumps",
            "parameters": "Every hour, 20 reps",
            "clinicalCueRationale": "Oedema management — elevation between sessions"
          },
          {
            "name": "Calf Raises (bilateral, seated)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Begin gravity-eliminated, progress"
          },
          {
            "name": "Pool Walking",
            "parameters": "20 min",
            "clinicalCueRationale": "Offloaded WB — excellent early rehabilitation"
          }
        ]
      }
    ]
  },
  {
    "name": "Non-specific Low Back Pain (Acute)",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Pain Management",
        "timeline": "Week 0–2",
        "goals": [
          "Reduce pain and muscle guarding",
          "Maintain mobility and avoid deconditioning",
          "Patient education — reassurance and self-management"
        ],
        "precautions": [
          "Screen for red flags: cauda equina, fracture, malignancy",
          "Avoid prolonged bed rest",
          "No heavy lifting or sustained flexion loading"
        ],
        "criteriaToProgress": [
          "Pain ≤4/10 with daily activities",
          "Able to walk 20 min without significant pain increase",
          "Red flags excluded"
        ],
        "exercises": [
          {
            "name": "Walking (paced, flat surface)",
            "parameters": "10–20 min × 2/day",
            "clinicalCueRationale": "Best evidence for acute LBP — maintain normal spinal loading"
          },
          {
            "name": "Knee-to-Chest Stretch (lumbar flexion)",
            "parameters": "3 × 30 sec each",
            "clinicalCueRationale": "Gentle lumbar flexion mobilisation — symptom-guide"
          },
          {
            "name": "Cat-Camel (lumbar flexion/extension)",
            "parameters": "3 × 10 reps",
            "clinicalCueRationale": "Segmental lumbar mobility — promotes synovial fluid circulation"
          },
          {
            "name": "Prone Lying (extension bias if centralising)",
            "parameters": "3 × 5 min",
            "clinicalCueRationale": "McKenzie extension if pain peripheralises with flexion"
          },
          {
            "name": "Diaphragmatic Breathing",
            "parameters": "5 min × 3/day",
            "clinicalCueRationale": "Reduce sympathetic nervous system activation — pain modulation"
          }
        ]
      }
    ]
  },
  {
    "name": "Lumbar Disc Herniation with Radiculopathy",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Radicular Pain Management",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce radicular pain and neurological symptoms",
          "Centralisation of symptoms",
          "Patient education",
          "Maintain mobility"
        ],
        "precautions": [
          "URGENT: Cauda equina signs — emergency referral",
          "Progressive neurological deficit requires urgent review",
          "Avoid sustained lumbar flexion"
        ],
        "criteriaToProgress": [
          "Symptoms centralising",
          "Pain ≤4/10 with walking",
          "No progressive neurological deficit"
        ],
        "exercises": [
          {
            "name": "Prone Lying / Press-ups (extension)",
            "parameters": "3 × 10 reps / 3 × 5 min",
            "clinicalCueRationale": "McKenzie extension — centralise leg symptoms"
          },
          {
            "name": "Walking (short, frequent bouts)",
            "parameters": "10 min × 3–4/day",
            "clinicalCueRationale": "Avoid sustained sitting — intermittent loading best"
          },
          {
            "name": "Neural Mobilisation (sciatic nerve slider)",
            "parameters": "3 × 10 reps each",
            "clinicalCueRationale": "Ankle DF/PF with straight leg — gentle nerve gliding"
          },
          {
            "name": "Sleeping Posture Education",
            "parameters": "Daily cue",
            "clinicalCueRationale": "Side-lying with pillow between knees — reduce disc pressure"
          }
        ]
      }
    ]
  },
  {
    "name": "Hip Labral Tear (Conservative)",
    "category": "Hip",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Reduction & Activity Modification",
        "timeline": "Week 0–6",
        "goals": [
          "Reduce intra-articular pain and inflammation",
          "Identify provocative loading positions",
          "Restore pain-free ROM within safe arcs"
        ],
        "precautions": [
          "Avoid deep hip flexion beyond 90°",
          "No pivoting or cutting",
          "Avoid hip ER combined with extension (prone)"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 with daily activities",
          "No clicking, locking, or giving way with walking",
          "Hip AROM improving"
        ],
        "exercises": [
          {
            "name": "Supine Hip AROM (pain-free arcs)",
            "parameters": "3 × 20 reps each direction",
            "clinicalCueRationale": "Maintain synovial fluid circulation — avoid impingement zone"
          },
          {
            "name": "Isometric Hip Abduction (side-lying)",
            "parameters": "3 × 10 reps, 10 sec hold",
            "clinicalCueRationale": "Activate gluteus medius without joint compression"
          },
          {
            "name": "Isometric Hip Extension (prone, neutral)",
            "parameters": "3 × 10 reps, 10 sec hold",
            "clinicalCueRationale": "Gluteus maximus activation — avoid extension past neutral"
          },
          {
            "name": "Stationary Bike (seat height high)",
            "parameters": "20–30 min",
            "clinicalCueRationale": "Low hip flexion arc — cardiovascular maintenance without provocation"
          }
        ]
      }
    ]
  },
  {
    "name": "Total Hip Arthroplasty (THA)",
    "category": "Hip",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Post-operative",
        "timeline": "Week 0–6",
        "goals": [
          "Safe mobilisation with assistive device",
          "Wound healing and oedema management",
          "DVT prevention",
          "Patient education — THA precautions"
        ],
        "precautions": [
          "POSTERIOR APPROACH: No hip flexion >90°, no IR, no adduction past midline",
          "ANTERIOR APPROACH: No hip extension past neutral, no ER in extended position",
          "No pivoting on operative leg"
        ],
        "criteriaToProgress": [
          "FWB with single assistive device",
          "Wound healed — sutures removed",
          "Hip ROM improving within limits"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps",
            "parameters": "10 reps every hour",
            "clinicalCueRationale": "DVT prevention — begin immediately post-op"
          },
          {
            "name": "Quad Sets (isometric)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain quadriceps activation while NWB or PWB"
          },
          {
            "name": "Heel Slides (supine)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Restore hip and knee flexion within precaution limits"
          },
          {
            "name": "Hip Abduction (supine, within limits)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Gluteus medius activation — avoid adduction past midline"
          },
          {
            "name": "Stair Training (one step at a time)",
            "parameters": "Supervised daily",
            "clinicalCueRationale": "Good leg up first, bad leg down first — patient must know this rule"
          }
        ]
      }
    ]
  },
  {
    "name": "Lateral Epicondylalgia (Tennis Elbow)",
    "category": "Elbow & Wrist",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Isometric Loading & Load Management",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce lateral elbow pain",
          "Isometric wrist extension for analgesia",
          "Identify and modify provocative activities"
        ],
        "precautions": [
          "Avoid stretching wrist flexors in reactive phase",
          "Reduce grip-intensive activity by 50%",
          "Avoid painful movements"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 during isometrics",
          "Morning stiffness <15 min",
          "Provocative activities identified"
        ],
        "exercises": [
          {
            "name": "Isometric Wrist Extension (table edge)",
            "parameters": "5 × 45 sec, 70–80% effort",
            "clinicalCueRationale": "Immediate analgesic effect — elbow at 90°, forearm pronated"
          },
          {
            "name": "Isometric Grip",
            "parameters": "5 × 45 sec",
            "clinicalCueRationale": "Maintain hand and forearm activation without provocation"
          },
          {
            "name": "Nerve Mobilisation (radial nerve slider)",
            "parameters": "3 × 10 reps each",
            "clinicalCueRationale": "Radial nerve often sensitised in Tennis Elbow"
          },
          {
            "name": "Bike / Swimming",
            "parameters": "20–30 min",
            "clinicalCueRationale": "Cardiovascular maintenance — minimal forearm loading"
          }
        ]
      }
    ]
  },
  {
    "name": "Distal Radius Fracture (Post-immobilisation)",
    "category": "Elbow & Wrist",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Post-immobilisation Mobilisation",
        "timeline": "Week 0–4 post-cast removal",
        "goals": [
          "Restore wrist ROM",
          "Reduce post-immobilisation oedema",
          "Restore grip strength"
        ],
        "precautions": [
          "Avoid aggressive passive wrist stretching for first 4 weeks",
          "Monitor for CRPS signs",
          "No resistive loading until AROM is 50%+ of other side"
        ],
        "criteriaToProgress": [
          "Wrist AROM >50% of contralateral side",
          "Oedema significantly reduced",
          "Grip strength beginning to improve"
        ],
        "exercises": [
          {
            "name": "Wrist AROM — all planes",
            "parameters": "3 × 20 reps each direction",
            "clinicalCueRationale": "Flexion, extension, radial and ulnar deviation — gentle"
          },
          {
            "name": "Forearm Rotation (pronation/supination)",
            "parameters": "3 × 20 reps each",
            "clinicalCueRationale": "Often most restricted post-cast — critical for hand function"
          },
          {
            "name": "Tendon Gliding Exercises (hand)",
            "parameters": "3 × 10 reps each position",
            "clinicalCueRationale": "Maintain finger tendon mobility in cast"
          },
          {
            "name": "Contrast Bathing (warm/cold)",
            "parameters": "2 × daily",
            "clinicalCueRationale": "Reduce stiffness and pain — thermal circulation"
          }
        ]
      }
    ]
  },
  {
    "name": "Hamstring Strain (Grade II)",
    "category": "Hip",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Protection & Early Loading",
        "timeline": "Week 0–2",
        "goals": [
          "Reduce pain and haematoma formation",
          "Maintain tissue mobility",
          "Early pain-free active ROM"
        ],
        "precautions": [
          "DO NOT aggressively stretch hamstring in first 2 weeks",
          "Monitor for proximal avulsion",
          "Crutches if antalgic gait"
        ],
        "criteriaToProgress": [
          "Walking pain-free without antalgic gait",
          "Isometric strength 70% or greater of other side",
          "Pain ≤3/10 during exercises"
        ],
        "exercises": [
          {
            "name": "Prone Knee Flexion (AROM)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain hamstring muscle activation without tension on tear"
          }
        ]
      }
    ]
  },
  {
    "name": "Iliotibial Band Syndrome",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Reduce Irritation",
        "timeline": "Week 0–3",
        "goals": [
          "Reduce lateral knee pain",
          "Modify training load",
          "Address contributing factors"
        ],
        "precautions": [
          "Avoid 30° knee flexion range (impingement zone)",
          "Reduce running mileage 50%",
          "Avoid downhill running"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 with walking",
          "Reduce provocative running"
        ],
        "exercises": [
          {
            "name": "Foam Roll IT Band / Glutes",
            "parameters": "2 × 2 min",
            "clinicalCueRationale": "Release TFL and proximal IT band — not directly over knee"
          },
          {
            "name": "Hip Abductor Strengthening (standing)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Key driver — weak glute med increases ITB tension"
          },
          {
            "name": "Clamshell (band)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Hip ER strengthening"
          }
        ]
      }
    ]
  },
  {
    "name": "Quadriceps Tendinopathy",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Isometric Loading",
        "timeline": "Week 0–4",
        "goals": [
          "Pain reduction",
          "Tendon loading via isometrics",
          "Load management"
        ],
        "precautions": [
          "Avoid jumping and plyometrics",
          "Reduce training load",
          "Avoid deep knee flexion"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 during isometrics",
          "VISA-P improving"
        ],
        "exercises": [
          {
            "name": "Isometric Leg Press (70° knee flexion)",
            "parameters": "5 × 45 sec, 80% effort",
            "clinicalCueRationale": "Immediate analgesic effect for quadriceps tendon"
          },
          {
            "name": "Isometric Wall Squat (60°)",
            "parameters": "5 × 45 sec",
            "clinicalCueRationale": "Alternative to leg press — same analgesic principle"
          }
        ]
      }
    ]
  },
  {
    "name": "Biceps Tendinopathy (Long Head)",
    "category": "Shoulder",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute / Protection",
        "timeline": "Week 0-2 (varies)",
        "goals": [
          "Reduce pain and inflammation",
          "Protect injured structure",
          "Maintain adjacent joint mobility"
        ],
        "precautions": [
          "Avoid aggravating movements",
          "Respect tissue healing timeline",
          "Monitor for red flags"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 at rest",
          "Swelling resolving",
          "Ready for progressive loading"
        ],
        "exercises": [
          {
            "name": "Isometric Activation (primary muscles)",
            "parameters": "3 × 10 reps, 5–10 sec hold",
            "clinicalCueRationale": "Sub-maximal — maintain activation without loading injury"
          },
          {
            "name": "Adjacent Joint ROM",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain mobility in joints proximal and distal to injury"
          },
          {
            "name": "Gentle Aerobic Conditioning",
            "parameters": "20 min",
            "clinicalCueRationale": "Bike, pool, or arm ergometer — based on injury site"
          },
          {
            "name": "Cryotherapy / Compression",
            "parameters": "15–20 min × 3–4/day",
            "clinicalCueRationale": "Oedema and pain management"
          }
        ]
      }
    ]
  },
  {
    "name": "Medial Epicondylalgia (Golfer's Elbow)",
    "category": "Elbow & Wrist",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Isometric Loading & Load Management",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce medial elbow pain at common flexor origin",
          "Isometric wrist flexion for analgesia",
          "Identify provocative activities"
        ],
        "precautions": [
          "Assess for ulnar nerve involvement",
          "Reduce gripping and loading by 50%",
          "Avoid stretching wrist extensors"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 during isometrics",
          "Morning stiffness <15 min",
          "Ulnar nerve symptoms reducing"
        ],
        "exercises": [
          {
            "name": "Isometric Wrist Flexion (table edge)",
            "parameters": "5 × 45 sec, 70–80% effort",
            "clinicalCueRationale": "Immediate analgesic effect — elbow at 90°, forearm supinated"
          },
          {
            "name": "Isometric Grip (ball/putty)",
            "parameters": "5 × 45 sec",
            "clinicalCueRationale": "Flexor-pronator activation without provocative movement"
          },
          {
            "name": "Isometric Pronation (resistance)",
            "parameters": "3 × 10 reps, 10 sec hold",
            "clinicalCueRationale": "Pronator teres component — important in throwing/golf"
          },
          {
            "name": "Ulnar Nerve Slider",
            "parameters": "3 × 10 reps each",
            "clinicalCueRationale": "Elbow flex/ext with wrist and shoulder — neural mobility"
          }
        ]
      }
    ]
  },
  {
    "name": "UCL Sprain — Elbow (Ulnar Collateral Ligament)",
    "category": "Elbow & Wrist",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Protection & Early Mobilisation",
        "timeline": "Week 0–4",
        "goals": [
          "Protect medial elbow from valgus stress",
          "Reduce pain and inflammation",
          "Maintain elbow ROM within safe range"
        ],
        "precautions": [
          "ABSOLUTE: No throwing or valgus loading",
          "Monitor for ulnar nerve symptoms",
          "Hinged elbow brace may be used"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 at rest and with AROM",
          "Full elbow AROM within brace limits",
          "No ulnar nerve symptoms"
        ],
        "exercises": []
      }
    ]
  },
  {
    "name": "Carpal Tunnel Syndrome (Conservative)",
    "category": "Elbow & Wrist",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Neural Desensitisation & Symptom Control",
        "timeline": "Week 0–6",
        "goals": [
          "Reduce median nerve symptoms",
          "Wrist splinting in neutral",
          "Identify provocative postures"
        ],
        "precautions": [
          "Urgent referral if muscle atrophy",
          "Splint MUST be in neutral (0°)",
          "Avoid prolonged wrist flexion"
        ],
        "criteriaToProgress": [
          "Night symptoms improving",
          "Daytime numbness reducing",
          "No progression of thenar weakness"
        ],
        "exercises": [
          {
            "name": "Neutral Wrist Splinting",
            "parameters": "Nightly + provocative activities",
            "clinicalCueRationale": "Keeps carpal tunnel volume maximal"
          },
          {
            "name": "Median Nerve Slider",
            "parameters": "3 × 10 reps each",
            "clinicalCueRationale": "Wrist neutral, extend fingers, oppose thumb — gentle neural gliding"
          },
          {
            "name": "Tendon Gliding Exercises",
            "parameters": "3 × 10 reps each position",
            "clinicalCueRationale": "Reduces adhesions around flexor tendons in canal"
          },
          {
            "name": "Workplace Ergonomic Assessment",
            "parameters": "Once",
            "clinicalCueRationale": "Keyboard height, mouse position — major modifiable risk"
          }
        ]
      }
    ]
  },
  {
    "name": "De Quervain's Tenosynovitis",
    "category": "Elbow & Wrist",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Load Reduction & Isometric Loading",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce radial wrist and thumb pain",
          "Isometric thumb abduction/extension",
          "Thumb spica splint"
        ],
        "precautions": [
          "AVOID Finkelstein's test position as exercise",
          "Thumb spica splint nightly/provocative",
          "Corticosteroid highly effective early"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 during isometrics",
          "Morning stiffness <15 min",
          "Finkelstein's sign reducing"
        ],
        "exercises": [
          {
            "name": "Isometric Thumb Abduction (against fixed surface)",
            "parameters": "5 × 45 sec, 70–80% effort",
            "clinicalCueRationale": "APL + EPB activation — immediate analgesia"
          },
          {
            "name": "Thumb and Wrist AROM (pain-free)",
            "parameters": "3 × 20 reps each",
            "clinicalCueRationale": "Maintain mobility — avoid ulnar deviation at end-range"
          },
          {
            "name": "Cryotherapy",
            "parameters": "15 min × 3–4/day",
            "clinicalCueRationale": "Reduce first dorsal compartment inflammation"
          }
        ]
      }
    ]
  },
  {
    "name": "Hip Flexor Strain (Iliopsoas)",
    "category": "Hip",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Management",
        "timeline": "Week 0–2",
        "goals": [
          "Reduce pain and muscle guarding",
          "Maintain hip ROM",
          "Early pain-free activation"
        ],
        "precautions": [
          "Avoid passive hip extension stretch early",
          "Avoid resisted hip flexion above 90°",
          "Rule out avulsion in adolescents"
        ],
        "criteriaToProgress": [
          "Walking pain-free without antalgic gait",
          "Pain ≤3/10 during isometrics",
          "No pain at rest"
        ],
        "exercises": [
          {
            "name": "Isometric Hip Flexion (submaximal)",
            "parameters": "3 × 10 reps, 10 sec",
            "clinicalCueRationale": "Maintain muscle activation without excessive tension"
          },
          {
            "name": "Supine Hip AROM (flexion)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Prevent muscle shortening and maintain joint mobility"
          },
          {
            "name": "Core Activation (TrA drawing-in)",
            "parameters": "3 × 10 reps, 10 sec hold",
            "clinicalCueRationale": "Stabilise lumbar spine — reduce iliopsoas overload"
          },
          {
            "name": "Stationary Bike (low resistance, low seat)",
            "parameters": "15–20 min",
            "clinicalCueRationale": "Maintain cardiovascular fitness — low-load hip flexion arc"
          }
        ]
      }
    ]
  },
  {
    "name": "Adductor / Groin Strain",
    "category": "Hip",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Phase & Isometric Loading",
        "timeline": "Week 0–2",
        "goals": [
          "Reduce medial groin pain",
          "Early pain-free isometric loading",
          "Patient education — groin vs hernia"
        ],
        "precautions": [
          "Avoid aggressive passive stretching in reactive phase",
          "Crutches if antalgic gait",
          "Rule out pubic stress fracture"
        ],
        "criteriaToProgress": [
          "Walking pain-free without antalgic gait",
          "Isometric adduction strength ≥60% symmetry"
        ],
        "exercises": [
          {
            "name": "Isometric Adduction (Copenhagen, submaximal)",
            "parameters": "3 × 10 reps, 10 sec",
            "clinicalCueRationale": "Pain-free adductor activation — analgesic and anti-atrophy"
          },
          {
            "name": "Supine Hip Adduction (squeeze pillow)",
            "parameters": "3 × 20 reps, 5 sec hold",
            "clinicalCueRationale": "Isolated adductor loading without weight-bearing stress"
          },
          {
            "name": "Stationary Bike (low resistance)",
            "parameters": "15–20 min",
            "clinicalCueRationale": "Cardiovascular maintenance — low adductor load"
          }
        ]
      }
    ]
  },
  {
    "name": "Hip Osteoarthritis (Conservative)",
    "category": "Hip",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Management & Education",
        "timeline": "Weeks 0–8",
        "goals": [
          "Reduce pain and improve quality of life",
          "OA is manageable education",
          "Identify and modify pain-provoking activities"
        ],
        "precautions": [
          "Avoid high-impact loading during flares",
          "Manage patient expectations",
          "Orthopaedic referral if severe Grade III-IV"
        ],
        "criteriaToProgress": [
          "Pain controlled to ≤4/10",
          "Walking 20 min without significant pain",
          "Patient engaged with education"
        ],
        "exercises": [
          {
            "name": "Hydrotherapy / Aquatic Exercise",
            "parameters": "30 min, 3× per week",
            "clinicalCueRationale": "Offloaded exercise — ideal for high pain-severity OA"
          },
          {
            "name": "Stationary Bike",
            "parameters": "20–30 min",
            "clinicalCueRationale": "Low-impact cardiovascular — hip ROM maintenance"
          },
          {
            "name": "Seated Hip AROM",
            "parameters": "3 × 20 reps each direction",
            "clinicalCueRationale": "Maintain synovial fluid circulation and prevent joint stiffening"
          },
          {
            "name": "Gentle Walking (paced)",
            "parameters": "20–30 min daily",
            "clinicalCueRationale": "Best evidence for hip OA — graded activity"
          }
        ]
      }
    ]
  },
  {
    "name": "Snapping Hip Syndrome (Coxa Saltans)",
    "category": "Hip",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Reduction & Load Modification",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce pain associated with snapping",
          "Identify type of snapping (Internal/External)",
          "Modify provocative activities"
        ],
        "precautions": [
          "Intra-articular snapping with locking needs urgent review",
          "Avoid provocative hip movements",
          "Reduce repetitive hip flexion"
        ],
        "criteriaToProgress": [
          "Painful snapping episodes reduced in frequency",
          "Pain ≤3/10 during daily activities"
        ],
        "exercises": [
          {
            "name": "Hip AROM (pain-free arcs, slow)",
            "parameters": "3 × 20 reps each",
            "clinicalCueRationale": "Controlled movement through range — identify and avoid snap arc"
          },
          {
            "name": "Iliopsoas Isometric (for internal type)",
            "parameters": "3 × 10 reps, 10 sec hold",
            "clinicalCueRationale": "Maintain muscle activation without provocative snap movement"
          },
          {
            "name": "IT Band / Hip Abductor Stretching",
            "parameters": "3 × 45 sec each",
            "clinicalCueRationale": "Reduce IT band tension over greater trochanter"
          }
        ]
      }
    ]
  },
  {
    "name": "Osgood-Schlatter Disease",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute / Protection",
        "timeline": "Week 0-4 (typical)",
        "goals": [
          "Reduce pain and inflammation",
          "Protect injured structure",
          "Maintain adjacent joint mobility"
        ],
        "precautions": [
          "Avoid aggravating movements",
          "Respect tissue healing timeline",
          "Monitor for worsening"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 at rest",
          "Swelling resolving",
          "Ready for progressive loading"
        ],
        "exercises": [
          {
            "name": "Isometric Activation",
            "parameters": "3 × 10 reps, 5–10 sec",
            "clinicalCueRationale": "Sub-maximal — maintain activation without loading injured tissue"
          },
          {
            "name": "Adjacent Joint ROM",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Maintain mobility in joints proximal and distal to injury"
          },
          {
            "name": "Gentle Aerobic Conditioning",
            "parameters": "20 min",
            "clinicalCueRationale": "Bike, pool, or arm ergometer — based on injury site"
          }
        ]
      }
    ]
  },
  {
    "name": "Peroneal Tendinopathy",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Isometric Loading & Load Reduction",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce lateral ankle and peroneal pain",
          "Tendon loading via isometrics",
          "Identify provocative activities"
        ],
        "precautions": [
          "Avoid stretching peroneal tendons in reactive phase",
          "Reduce running mileage by 50%",
          "Avoid inversion stress loading"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 during isometrics",
          "Morning stiffness <15 min",
          "VISA-P improving"
        ],
        "exercises": [
          {
            "name": "Isometric Eversion (band, mid-range)",
            "parameters": "5 × 45 sec, 70–80% effort",
            "clinicalCueRationale": "Foot on floor, push outward — immediate analgesic effect"
          },
          {
            "name": "Isometric Plantarflexion (wall)",
            "parameters": "5 × 45 sec",
            "clinicalCueRationale": "Maintain tendon activation without provoking pain"
          },
          {
            "name": "Single-leg Balance (stable surface)",
            "parameters": "3 × 45 sec",
            "clinicalCueRationale": "Proprioceptive loading with minimal tendon stress"
          }
        ]
      }
    ]
  },
  {
    "name": "Posterior Tibial Tendon Dysfunction (PTTD)",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute / Offloading",
        "timeline": "Week 0–4",
        "goals": [
          "Reduce pain and inflammation along medial ankle",
          "Support arch via orthotic or CAM boot",
          "Maintain tibialis posterior activation"
        ],
        "precautions": [
          "Stage II+: CAM boot or UCBL orthosis required",
          "Avoid barefoot walking on hard surfaces",
          "No heel raises in reactive phase"
        ],
        "criteriaToProgress": [
          "Pain ≤3/10 with weight bearing",
          "Swelling resolving",
          "Ready for progressive loading"
        ],
        "exercises": [
          {
            "name": "Isometric Tibialis Posterior (arch doming)",
            "parameters": "3 × 10 reps, 10 sec hold",
            "clinicalCueRationale": "Short foot exercise — dome arch without curling toes"
          },
          {
            "name": "Seated Calf Raises (bilateral)",
            "parameters": "3 × 20 reps",
            "clinicalCueRationale": "Low load — avoid full single-leg load in acute phase"
          },
          {
            "name": "Pool Walking / Hydrotherapy",
            "parameters": "20 min",
            "clinicalCueRationale": "Offloaded functional walking — excellent early option"
          }
        ]
      }
    ]
  },
  {
    "name": "Spinal Stenosis (Lumbar — Conservative)",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Symptom Management & Flexion-Based Mobility",
        "timeline": "Week 0–6",
        "goals": [
          "Reduce neurogenic claudication",
          "Identify directional preference (flexion)",
          "Improve walking tolerance"
        ],
        "precautions": [
          "Avoid lumbar extension — narrows spinal canal further",
          "Monitor for progressive neurological deficit",
          "Cauda equina symptoms = emergency"
        ],
        "criteriaToProgress": [
          "Walking tolerance improving (>10 min)",
          "Pain ≤4/10 with daily activities",
          "Understanding of symptom-relief positions"
        ],
        "exercises": []
      }
    ]
  }
];
