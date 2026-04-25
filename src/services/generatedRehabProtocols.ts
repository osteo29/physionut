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
        "timeline": "Week 02",
        "goals": [
          "Control pain & swelling",
          "Achieve full passive knee extension",
          "Quadriceps activation",
          "Independent ambulation with crutches"
        ],
        "precautions": [
          "No active knee extension 090",
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
            "parameters": "3  20 reps, 5-sec hold",
            "clinicalCueRationale": "Flatten back of knee to bed, feel VMO contract"
          },
          {
            "name": "Ankle Pumps",
            "parameters": "3  30 reps",
            "clinicalCueRationale": "Reduce DVT risk, improve circulation"
          },
          {
            "name": "Straight Leg Raise (SLR)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Lock knee before lifting, no lag allowed"
          },
          {
            "name": "Heel Slides (AAROM Flexion)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Slide heel toward buttocks, hold 2 sec at end range"
          },
          {
            "name": "Passive Knee Extension (prone hang)",
            "parameters": "3  5 min",
            "clinicalCueRationale": "Let gravity achieve full extension"
          },
          {
            "name": "Patellar Mobilisation",
            "parameters": "2  2 min",
            "clinicalCueRationale": "Medial, lateral, superior glides  pain free"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Early Strengthening",
        "timeline": "Week 26",
        "goals": [
          "Restore full extension (0)",
          "Flexion to 120",
          "Normalise gait",
          "Single leg balance > 30 sec"
        ],
        "precautions": [
          "No open chain extension 90-45",
          "Avoid tibial rotation during loaded exercise"
        ],
        "criteriaToProgress": [
          "Full extension",
          "Flexion > 125",
          "Minimal effusion",
          "No lag on SLR"
        ],
        "exercises": [
          {
            "name": "Mini-Squats (0-60)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Closed chain quadriceps activation"
          },
          {
            "name": "Static Cycling (Low resistance)",
            "parameters": "15-20 min",
            "clinicalCueRationale": "Improve ROM and aerobic capacity"
          },
          {
            "name": "Heel Raises (Bilateral)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Gastrocnemius strengthening for knee stability"
          },
          {
            "name": "Mini Squats (045)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Knees track over 2nd toe, weight through heels"
          },
          {
            "name": "Step-Ups (10 cm box)",
            "parameters": "3  15 reps each leg",
            "clinicalCueRationale": "Lead with affected leg, control descent"
          },
          {
            "name": "Leg Press (6090)",
            "parameters": "3  15 reps, light load",
            "clinicalCueRationale": "Bilateral then unilateral, avoid locking out"
          },
          {
            "name": "Terminal Knee Extension (band)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Focus on last 20  VMO activation"
          },
          {
            "name": "Hip Abduction  Side-lying",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain pelvic stability, control return"
          },
          {
            "name": "Calf Raises (bilateral)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Full ROM, slow eccentric phase"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Advanced Strengthening",
        "timeline": "Week 612",
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
          "LSI =80% quad & hamstring strength",
          "Hop test symmetry =80%",
          "Jog pain-free 30 min"
        ],
        "exercises": [
          {
            "name": "Bulgarian Split Squat",
            "parameters": "4  10 reps each",
            "clinicalCueRationale": "Front foot flat, torso upright, 90 knee flexion"
          },
          {
            "name": "Romanian Deadlift",
            "parameters": "4  10 reps",
            "clinicalCueRationale": "Hip hinge pattern, neutral spine, feel hamstring load"
          },
          {
            "name": "Lateral Band Walks",
            "parameters": "3  15 steps each direction",
            "clinicalCueRationale": "Maintain squat position, band around ankles"
          },
          {
            "name": "Single-Leg Press",
            "parameters": "4  12 reps",
            "clinicalCueRationale": "Progressive loading, track limb symmetry"
          },
          {
            "name": "Box Step-Down",
            "parameters": "3  12 reps each",
            "clinicalCueRationale": "Slow 5-sec eccentric, control valgus collapse"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Plyometrics & Dynamic Control",
        "timeline": "Week 1224",
        "goals": [
          "Symmetrical quad strength (>90%)",
          "Safe landing mechanics",
          "Initiate straight line running"
        ],
        "precautions": [
          "No contact sports yet",
          "Monitor for \"rotational instability\""
        ],
        "criteriaToProgress": [
          "Hop test symmetry > 90%",
          "Pain-free running",
          "Psychological readiness (ACL-RSI scale)"
        ],
        "exercises": [
          {
            "name": "Double-Leg Box Jumps (Landing focus)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Soft landing, avoid valgus, emphasize attenuation"
          },
          {
            "name": "Linear Running (Intervals)",
            "parameters": "10 min walk/run mix",
            "clinicalCueRationale": "Gradual re-introduction of impact forces"
          },
          {
            "name": "Agility Ladders (Basic)",
            "parameters": "5 min",
            "clinicalCueRationale": "Improve neuromuscular footwork speed"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Return to Performance & Injury Prevention",
        "timeline": "Month 9+",
        "goals": [
          "Full unrestricted return to sport",
          "Maintain > 100% limb symmetry in power",
          "Psychological readiness for contact"
        ],
        "precautions": [
          "Avoid sudden massive volume spikes in training",
          "Continue ACL prevention drills twice weekly"
        ],
        "criteriaToProgress": [
          "LSI > 100% (Limb Symmetry Index)",
          "Successful return to match play",
          "No fear of re-injury (ACL-RSI)"
        ],
        "exercises": [
          {
            "name": "Contact Simulation Drills",
            "parameters": "20-30 min",
            "clinicalCueRationale": "Prepare the knee for unpredictable external forces"
          },
          {
            "name": "Plyometric Depth Jumps (Advanced)",
            "parameters": "3  8 reps",
            "clinicalCueRationale": "Maximal power and force attenuation training"
          },
          {
            "name": "FIFA 11+ Prevention Program",
            "parameters": "Integrated 20 min",
            "clinicalCueRationale": "Evidence-based maintenance to prevent second ACL rupture"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Return to Sport",
        "timeline": "Month 49",
        "goals": [
          "LSI =90% all hop tests",
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
          "LSI =90% quad/hamstring/hop",
          "ACL-RSI =65",
          "Clearance from surgeon + physio"
        ],
        "exercises": [
          {
            "name": "T-Agility Test Drills",
            "parameters": "46 sets",
            "clinicalCueRationale": "Progressive speed increase over weeks"
          },
          {
            "name": "Reactive Change-of-Direction",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Controlled, then progress to reactive cues"
          },
          {
            "name": "Plyometric Progression (single-leg)",
            "parameters": "3  8 reps",
            "clinicalCueRationale": "Lateral hops, bounding, depth jumps  master each before progressing"
          },
          {
            "name": "Sport-Specific Drills",
            "parameters": "3  5 min blocks",
            "clinicalCueRationale": "Cutting, deceleration, sport movement patterns"
          },
          {
            "name": "Strength Maintenance (Gym)",
            "parameters": "3  week",
            "clinicalCueRationale": "Maintain gains achieved in Phase 3"
          }
        ]
      }
    ]
  },
  {
    "name": "ACL Tear  Conservative Management",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute",
        "timeline": "Week 02",
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
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Isometric quad contraction, focus on VMO"
          },
          {
            "name": "SLR (Flexion)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain full knee extension throughout"
          },
          {
            "name": "Ankle Pumps",
            "parameters": "3  30 reps",
            "clinicalCueRationale": "Circulation and swelling control"
          },
          {
            "name": "Prone Knee Hang (extension)",
            "parameters": "3  5 min",
            "clinicalCueRationale": "Achieve neutral 0 extension"
          },
          {
            "name": "Cryotherapy",
            "parameters": "1520 min every 2h",
            "clinicalCueRationale": "Post-exercise swelling management"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening",
        "timeline": "Week 28",
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
            "name": "Wall Squat (4560)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Isometric hold 5 sec at bottom"
          },
          {
            "name": "Step-ups",
            "parameters": "3  15 reps each",
            "clinicalCueRationale": "Step height progresses 10?15?20 cm"
          },
          {
            "name": "Hip Strengthening Circuit",
            "parameters": "3  15 reps each",
            "clinicalCueRationale": "Abductors, extensors, external rotators"
          },
          {
            "name": "TKE (band)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Terminal knee extension focus on VMO"
          },
          {
            "name": "Single-leg Balance",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Eyes open then closed, unstable surface progression"
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
        "timeline": "Week 06",
        "goals": [
          "Protect repair",
          "Control effusion",
          "Maintain quad activation",
          "Toe-touch weight bearing"
        ],
        "precautions": [
          "NWB or TTWB only",
          "No flexion beyond 90",
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
            "parameters": "4  20 reps",
            "clinicalCueRationale": "Critical for preventing quad atrophy during NWB"
          },
          {
            "name": "SLR (4 planes)",
            "parameters": "3  15 reps each",
            "clinicalCueRationale": "Flexion, abduction, adduction, extension"
          },
          {
            "name": "Ankle Pumps",
            "parameters": "3  30 reps",
            "clinicalCueRationale": "DVT prevention"
          },
          {
            "name": "AAROM Flexion (to 90 only)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Heel slides, stop at 90  respect repair"
          },
          {
            "name": "Stationary Bike (seat HIGH)",
            "parameters": "15 min",
            "clinicalCueRationale": "Minimal knee flexion, low resistance  after week 4"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Progressive Loading",
        "timeline": "Week 612",
        "goals": [
          "Full ROM 0130",
          "WBAT progressing to FWB",
          "Functional strength",
          "Normalise gait"
        ],
        "precautions": [
          "Avoid deep squat >90 until week 10",
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
            "name": "Mini Squats (060)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Progress range weekly, bilateral first"
          },
          {
            "name": "Leg Press (bilateral)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "6090 range, controlled"
          },
          {
            "name": "Step-ups (forward & lateral)",
            "parameters": "3  15 each",
            "clinicalCueRationale": "10 cm ? 15 cm box progression"
          },
          {
            "name": "Single-leg Balance",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Stable then unstable surface"
          },
          {
            "name": "Hip Strengthening",
            "parameters": "3  15 each",
            "clinicalCueRationale": "Abductors and extensors  key for knee stability"
          },
          {
            "name": "Pool Walking",
            "parameters": "20 min",
            "clinicalCueRationale": "Offload joint while gaining ROM and strength"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Weight Bearing Transition",
        "timeline": "Week 48",
        "goals": [
          "Progress to full weight bearing",
          "Eliminate crutches",
          "Restore full ROM"
        ],
        "precautions": [
          "Limit weighted squats to < 60 flexion",
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
            "name": "Wall Slides (Limited range 60)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Controlled eccentric Loading"
          },
          {
            "name": "Step-ups (Forward)",
            "parameters": "3  15 reps (4-inch step)",
            "clinicalCueRationale": "Functional quadriceps control"
          },
          {
            "name": "Single Leg Stance (Eyes open)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Proprioceptive retraining of the joint capitals"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Return to Function",
        "timeline": "Month 36",
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
            "parameters": "4  12 reps",
            "clinicalCueRationale": "Full depth, control valgus"
          },
          {
            "name": "Running Program",
            "parameters": "Walk-jog progression",
            "clinicalCueRationale": "Begin month 4  even surface, build duration"
          },
          {
            "name": "Plyometrics",
            "parameters": "3  10 reps",
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
        "timeline": "Week 03",
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
          "Pain =2/10 with ADLs",
          "Full pain-free ROM",
          "Ready for CKC loading"
        ],
        "exercises": [
          {
            "name": "Straight Leg Raise",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "VMO activation without PFJ stress"
          },
          {
            "name": "Hip Abduction (side-lying)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Key  hip weakness major driver of PFPS"
          },
          {
            "name": "Hip External Rotation (clamshell)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Band around knees, control movement"
          },
          {
            "name": "Quad Sets + Biofeedback",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "VMO focus, biofeedback if available"
          },
          {
            "name": "Stationary Bike (pain-free range)",
            "parameters": "1520 min",
            "clinicalCueRationale": "High seat to limit flexion load"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Functional Strength & Alignment",
        "timeline": "Week 48",
        "goals": [
          "Correct lower limb kinematics",
          "Proximal (hip) strengthening",
          "Increase quad torque without pain"
        ],
        "precautions": [
          "Limit deep squats if symptomatic",
          "Ensure no valgus collapse during movement"
        ],
        "criteriaToProgress": [
          "Pain-free step down (8-inch)",
          "Negative patellar tilt on palpation",
          "Ability to lunge without pain"
        ],
        "exercises": [
          {
            "name": "Clamshells (Resistance band)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Gluteus medius strength controls femoral internal rotation"
          },
          {
            "name": "Weighted Glute Bridges",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Posterior chain recruitment to offload the anterior knee"
          },
          {
            "name": "Split Squats (Controlled)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Functional loading with focus on knee-over-toe alignment"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening",
        "timeline": "Week 38",
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
            "name": "Wall Squat (060)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Focus on hip-knee-foot alignment"
          },
          {
            "name": "Step-down (eccentric focus)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Slow 4-sec descent, control knee valgus"
          },
          {
            "name": "Hip Thrust",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Glute activation and posterior chain loading"
          },
          {
            "name": "Lateral Band Walk",
            "parameters": "3  15 steps each",
            "clinicalCueRationale": "Hip external rotator and abductor activation"
          },
          {
            "name": "TKE (band)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "VMO activation in functional position"
          },
          {
            "name": "Running on flat surface",
            "parameters": "Start 10 min",
            "clinicalCueRationale": "Pain-free only  cadence focus"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Advanced Loading & Impact",
        "timeline": "Week 12+",
        "goals": [
          "Full return to running/jumping",
          "Correct lower limb mechanics under fatigue",
          "Symmetrical hip/quad power"
        ],
        "precautions": [
          "Ensure no medial knee collapse during landing",
          "Gradual increase in running volume"
        ],
        "criteriaToProgress": [
          "Hop test symmetry > 90%",
          "Pain-free full squat with load"
        ],
        "exercises": [
          {
            "name": "Single-leg Bounding",
            "parameters": "3  15 meters",
            "clinicalCueRationale": "Functional force attenuation"
          },
          {
            "name": "Sprint Drills",
            "parameters": "5 reps, 20 meters",
            "clinicalCueRationale": "Integrated athletic gait mechanics"
          },
          {
            "name": "Curtsy Lunges (Weighted)",
            "parameters": "3  12 reps each side",
            "clinicalCueRationale": "Integrated hip/knee stabilization in the frontal plane"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Return to Sport",
        "timeline": "Week 816",
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
            "parameters": "4  12 reps",
            "clinicalCueRationale": "Add load, depth, and speed progressively"
          },
          {
            "name": "Plyometrics (bilateral ? unilateral)",
            "parameters": "3  10 reps",
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
        "timeline": "Week 04",
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
          "Pain =3/10 with isometrics",
          "Morning stiffness reducing"
        ],
        "exercises": [
          {
            "name": "Isometric Leg Press (70 knee flexion)",
            "parameters": "5  45 sec hold, 80% effort",
            "clinicalCueRationale": "Immediate analgesic effect  key exercise"
          },
          {
            "name": "Isometric Wall Squat",
            "parameters": "5  45 sec hold",
            "clinicalCueRationale": "Same benefit as leg press if no machine available"
          },
          {
            "name": "Hip Strengthening",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Glutes, hip abductors  reduce tendon load"
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
        "timeline": "Week 48",
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
          "VISA-P =60",
          "Tolerating heavy loading without spike",
          "Ready for plyometric introduction"
        ],
        "exercises": [
          {
            "name": "Leg Press (heavy, slow)",
            "parameters": "4  6 reps",
            "clinicalCueRationale": "Heavy slow resistance  gold standard"
          },
          {
            "name": "Hack Squat",
            "parameters": "4  6 reps, slow tempo",
            "clinicalCueRationale": "Progressive load increase weekly"
          },
          {
            "name": "Spanish Squat (isometric)",
            "parameters": "4  45 sec",
            "clinicalCueRationale": "Band around fixed point, hip hinge position"
          },
          {
            "name": "Step-ups (heavy)",
            "parameters": "3  10 reps each",
            "clinicalCueRationale": "High box, controlled eccentric"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Energy Storage & Plyometrics",
        "timeline": "Week 816",
        "goals": [
          "Improve tendon power and acceleration",
          "Symmetrical jump performance",
          "Return to sport-specific drills"
        ],
        "precautions": [
          "Monitor for morning-after pain (Reactive response)",
          "Ensure perfect landing mechanics (soft)"
        ],
        "criteriaToProgress": [
          "Single leg hop symmetry > 90%",
          "Pain-free full speed change of direction",
          "VISA-P > 85"
        ],
        "exercises": [
          {
            "name": "Split Jumps",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "High intensity eccentric to concentric switch - loads the tendon energy mechanism"
          },
          {
            "name": "Box Jumps (Landing focus)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Vertical power and attenuation - soft landing is priority"
          },
          {
            "name": "Agility Drills (T-test)",
            "parameters": "3 sets",
            "clinicalCueRationale": "Sport-specific acceleration and deceleration"
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
        "timeline": "Week 02",
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
          "Pain =3/10 at rest",
          "Able to FWB with brace"
        ],
        "exercises": [
          {
            "name": "Quad Sets",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Prevent quad atrophy"
          },
          {
            "name": "SLR (4 planes)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain hip and quad strength"
          },
          {
            "name": "Stationary Bike (pain-free)",
            "parameters": "15 min",
            "clinicalCueRationale": "High seat, low resistance, reduce swelling"
          },
          {
            "name": "Cryotherapy",
            "parameters": "15 min  34/day",
            "clinicalCueRationale": "Swelling management"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening",
        "timeline": "Week 26",
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
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Knees straight, no valgus collapse"
          },
          {
            "name": "Step-ups (forward & lateral)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Control medial knee position"
          },
          {
            "name": "Hip Abductor Strengthening",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Critical to reduce valgus stress on MCL"
          },
          {
            "name": "TKE (band)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Quad activation, controlled alignment"
          },
          {
            "name": "Single-leg Balance",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Progress to unstable surface"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Return to Play / Competition",
        "timeline": "Week 612",
        "goals": [
          "Full agility speed",
          "Safe cutting and pivoting",
          "Confident contact play"
        ],
        "precautions": [
          "Avoid non-contact pivoting during recovery spikes",
          "Monitor for \"medial opening\" during contact"
        ],
        "criteriaToProgress": [
          "Full symmetrical strength",
          "Negative Valgus Stress Test at 30 flexion"
        ],
        "exercises": [
          {
            "name": "45 Cutting Drills",
            "parameters": "3  10 reps each side",
            "clinicalCueRationale": "Functional loading of the MCL in sport plane"
          },
          {
            "name": "Single-leg Bounding",
            "parameters": "3  15 meters",
            "clinicalCueRationale": "Explosive stability of the medial knee line"
          },
          {
            "name": "Suicide Sprints (Change of direction)",
            "parameters": "5 rounds",
            "clinicalCueRationale": "Endurance and reactive cutting"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Maintenance & Valgus Resilience",
        "timeline": "Month 4+",
        "goals": [
          "Zero recurring medial joint pain",
          "Maintain peak adductor and gluteal strength",
          "Unrestricted sports"
        ],
        "precautions": [
          "Maintain neuromuscular control during fatigue",
          "Avoid sudden volume spikes initially"
        ],
        "criteriaToProgress": [
          "Full symmetric power",
          "Confidence in contact"
        ],
        "exercises": [
          {
            "name": "Lateral Bounding with Resistance",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Specific training for the medial knee constraints"
          },
          {
            "name": "Crossover Lunges",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Integrated athletic movement with frontal plane challenge"
          },
          {
            "name": "Agility Drills (Reactive T-test)",
            "parameters": "5 rounds",
            "clinicalCueRationale": "Test the MCL reactive stability under speed"
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
        "timeline": "Day 03",
        "goals": [
          "Pain management",
          "Achieve 090 ROM",
          "Independent mobility",
          "DVT prevention"
        ],
        "precautions": [
          "Monitor for signs of DVT",
          "Weight bearing as tolerated (WBAT)",
          "Follow surgeon precautions"
        ],
        "criteriaToProgress": [
          "90 flexion",
          "Independent ambulation with frame",
          "Safe for discharge"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps",
            "parameters": "10 reps every hour",
            "clinicalCueRationale": "DVT prevention  start immediately post-op"
          },
          {
            "name": "Quad Sets",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Begin day 1 post-op"
          },
          {
            "name": "Heel Slides (AAROM)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Work toward 90 flexion"
          },
          {
            "name": "SLR",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "When quad sets pain-free"
          },
          {
            "name": "Sit-to-Stand",
            "parameters": "5  per session",
            "clinicalCueRationale": "Use armrests, controlled movement"
          }
        ]
      }
    ]
  },
  {
    "name": "PCL Tear  Conservative",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute",
        "timeline": "Week 04",
        "goals": [
          "Reduce effusion",
          "Quad activation",
          "Protect posterior capsule",
          "FWB with brace"
        ],
        "precautions": [
          "PCL brace with 0 extension stop",
          "No posterior tibial stress",
          "Avoid prone knee flexion"
        ],
        "criteriaToProgress": [
          "Effusion resolved",
          "Quad activation full",
          "Pain =2/10 with activity"
        ],
        "exercises": [
          {
            "name": "Quad Sets",
            "parameters": "4  20 reps",
            "clinicalCueRationale": "Quad dominance is protective for PCL  critical"
          },
          {
            "name": "SLR (flexion & extension)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "No hamstring-loaded SLR"
          },
          {
            "name": "Leg Press (060 only)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Quad-dominant, avoid 90  increases PCL stress"
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
    "name": "Rotator Cuff Repair (Post-operative)",
    "category": "Shoulder",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Passive Motion",
        "timeline": "Week 06",
        "goals": [
          "Protect repair",
          "Prevent stiffness",
          "PROM: 140 flexion, 40 ER",
          "Pain management"
        ],
        "precautions": [
          "Sling at all times except exercise",
          "No AROM",
          "No lifting or pushing",
          "No internal rotation stress"
        ],
        "criteriaToProgress": [
          "PROM: 140 flexion, 40 ER at neutral",
          "Pain controlled at rest",
          "Surgeon clearance at 6 weeks"
        ],
        "exercises": [
          {
            "name": "Pendulum (Codman's) Exercises",
            "parameters": "3  2 min all planes",
            "clinicalCueRationale": "Gravity-assisted distraction  no muscle activation"
          },
          {
            "name": "PROM Shoulder Flexion (supine)",
            "parameters": "3  15 reps to tolerance",
            "clinicalCueRationale": "Therapist-assisted, pain-free range"
          },
          {
            "name": "PROM ER (0 abduction)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Elbow at side, cane-assisted to 40"
          },
          {
            "name": "Elbow ROM & grip strength",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain distal function while in sling"
          },
          {
            "name": "Scapular Retraction (isometric)",
            "parameters": "3  10 reps, 5 sec hold",
            "clinicalCueRationale": "Maintain scapular function"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Active Assisted & Early Active",
        "timeline": "Week 612",
        "goals": [
          "AAROM ? AROM",
          "Rotator cuff activation",
          "Scapular stabilisation",
          "Progress to 150 flexion"
        ],
        "precautions": [
          "No lifting >1 kg",
          "No reaching behind back",
          "Avoid painful arcs"
        ],
        "criteriaToProgress": [
          "AROM: 150 flexion",
          "ER to 60",
          "No painful arc"
        ],
        "exercises": [
          {
            "name": "Pulleys (AAROM flexion)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Good arm assists  gradual range increase"
          },
          {
            "name": "Supine Active Flexion",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Gravity-eliminated initially, progress to against gravity"
          },
          {
            "name": "ER with band (light resistance)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Elbow at side, slow controlled  infraspinatus/teres minor"
          },
          {
            "name": "Scapular Push-up (wall)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Serratus anterior  critical for scapular upward rotation"
          },
          {
            "name": "Side-lying ER",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Light weight, focus on external rotators"
          },
          {
            "name": "Prone Y/T/W",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Scapular stabilisers  no weight initially"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Active-Assisted ROM & Early Activation",
        "timeline": "Week 612",
        "goals": [
          "Full PROM",
          "Gradual AAROM progress",
          "Scapular stability",
          "Decrease use of sling"
        ],
        "precautions": [
          "No heavy lifting/pulling",
          "Avoid sudden reaching",
          "No weight bearing through arm"
        ],
        "criteriaToProgress": [
          "Pain-free AAROM to 140 elevation",
          "Good scapular control",
          "Minimal resting pain"
        ],
        "exercises": [
          {
            "name": "Pulley Exercises (Elevation)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Assisted range without high muscular demand"
          },
          {
            "name": "Scapular Isometrics (Squeezes)",
            "parameters": "3  10 reps, 5s hold",
            "clinicalCueRationale": "Foundation for rotator cuff function"
          },
          {
            "name": "Table Slides (Flexion)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Gravity-assisted rhythmic initiation"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Advanced Strength & Sport Integration",
        "timeline": "Month 612",
        "goals": [
          "Full return to sport/heavy labor",
          "Maximise rotator cuff power",
          "Long term maintenance program"
        ],
        "precautions": [
          "Avoid excessive overhead volume spikes",
          "Monitor for anterior shoulder fatigue"
        ],
        "criteriaToProgress": [
          "Symmetrical rotator cuff strength",
          "Confident participation in previous high-load tasks"
        ],
        "exercises": [
          {
            "name": "Plyometric Medicine Ball Toss (Chest/Side)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "High rate-of-force capacity for the shoulder complex"
          },
          {
            "name": "Overhead Dumbbell Press (Controlled)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Functional integrated power"
          },
          {
            "name": "Pull-ups or Heavily Weighted Rows",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Global upper body power"
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
        "timeline": "Week 03",
        "goals": [
          "Reduce subacromial inflammation",
          "Improve scapular positioning",
          "Pain =3/10"
        ],
        "precautions": [
          "Avoid overhead reaching",
          "No painful arc activities",
          "Correct posture deficits"
        ],
        "criteriaToProgress": [
          "Pain =3/10 with daily activities",
          "Scapular resting position improved"
        ],
        "exercises": [
          {
            "name": "Pendulums",
            "parameters": "3  2 min",
            "clinicalCueRationale": "Gentle distraction  reduce subacromial pressure"
          },
          {
            "name": "Scapular Retraction (sitting)",
            "parameters": "3  20 reps, 5 sec hold",
            "clinicalCueRationale": "Pull shoulder blades together and down"
          },
          {
            "name": "Chin Tucks",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Correct forward head  affects scapular position"
          },
          {
            "name": "ER with band (low resistance)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Elbow at side  infraspinatus and teres minor"
          },
          {
            "name": "Posture correction exercises",
            "parameters": "Hourly reminders",
            "clinicalCueRationale": "Thoracic extension  key modifiable factor"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strength & Scapular Integration",
        "timeline": "Week 48",
        "goals": [
          "Address muscle imbalances",
          "Improve rotator cuff endurance",
          "Normalize scapulohumeral rhythm"
        ],
        "precautions": [
          "Avoid repetitive overhead work",
          "Stop if \"pinching\" sensation returns",
          "Monitor pectoralis tightness"
        ],
        "criteriaToProgress": [
          "Full AROM without compensation",
          "Stable scapula during elevation",
          "Negative Hawkins-Kennedy test"
        ],
        "exercises": [
          {
            "name": "Side-lying External Rotation",
            "parameters": "3  15 reps (v. light weight)",
            "clinicalCueRationale": "Isolate infraspinatus and teres minor"
          },
          {
            "name": "Serratus Punch (Supine)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Critical for dynamic scapular upward rotation"
          },
          {
            "name": "Prone Rows",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Strengthen mid-traps and rhomboids for postural balance"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Functional Strength & Maintenance",
        "timeline": "Week 12+",
        "goals": [
          "Full power in sport plane",
          "Stable shoulder during high-velocity moves",
          "Address any remaining kinetic chain deficits"
        ],
        "precautions": [
          "Gradual return to overhead sports (Tennis/Swimming)",
          "Maintain thoracic mobility"
        ],
        "criteriaToProgress": [
          "Full pain-free overhead range",
          "Cuff strength > 90% other side"
        ],
        "exercises": [
          {
            "name": "Bodyweight Dips",
            "parameters": "3  10-15 reps",
            "clinicalCueRationale": "Integrated shoulder and triceps power"
          },
          {
            "name": "Shoulder 90/90 External Rotation (Band)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Specific stability for throwing athletes"
          },
          {
            "name": "Farmers Walk (Uneven load)",
            "parameters": "3  30 meters",
            "clinicalCueRationale": "Scapular stability under dynamic postural challenge"
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
        "timeline": "Month 09",
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
            "parameters": "3  3 min all directions",
            "clinicalCueRationale": "Pain relief and gentle distraction  key exercise"
          },
          {
            "name": "AAROM Flexion (cane)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Good arm assists  go to comfortable range only"
          },
          {
            "name": "ER Stretching (gentle)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Elbow at side, cane-assisted  no forcing"
          },
          {
            "name": "Heat before exercise",
            "parameters": "10 min",
            "clinicalCueRationale": "Reduce viscosity of synovial fluid  improve ROM"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Stiffness / Frozen",
        "timeline": "Month 312",
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
          "Flexion >150",
          "Functional daily activities improving"
        ],
        "exercises": [
          {
            "name": "Capsular Stretching (ER, IR, flexion)",
            "parameters": "3  60 sec each direction",
            "clinicalCueRationale": "End-range hold, gentle over-pressure"
          },
          {
            "name": "Sleeper Stretch",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Key for posterior capsule tightness"
          },
          {
            "name": "Pulleys",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Aggressive ROM  daily consistency is key"
          },
          {
            "name": "Strengthening (pain-free range)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Band ER/IR, scapular exercises"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Thawing & Progressive ROM",
        "timeline": "Month 49",
        "goals": [
          "Restore active shoulder ROM",
          "Normalize scapular mechanics",
          "Return to pain-free daily reaching"
        ],
        "precautions": [
          "Avoid aggressive passive stretching that causes long-lasting pain",
          "Respect the inflammatory phase if still present"
        ],
        "criteriaToProgress": [
          "Significant improvement in ROM (> 50%)",
          "Low baseline pain"
        ],
        "exercises": [
          {
            "name": "Climbing Wall (Vertical)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Active-assisted elevation using gravity and target"
          },
          {
            "name": "Internal Rotation Stretch (Behind back with towel)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Commonly most restricted range in Frozen Shoulder"
          },
          {
            "name": "Serratus Wall Slides",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Normalize scapulohumeral rhythm"
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
        "timeline": "Week 03",
        "goals": [
          "Tissue healing",
          "Pain & swelling management",
          "Maintain distal function"
        ],
        "precautions": [
          "Sling immobilisation 23 weeks",
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
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain elbow mobility in sling"
          },
          {
            "name": "Wrist and hand strengthening",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Grip strength  prevent distal atrophy"
          },
          {
            "name": "Isometric Rotator Cuff (submaximal)",
            "parameters": "3  10 reps, 5 sec hold",
            "clinicalCueRationale": "Maintain cuff activation without stress"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Dynamic Stabilization",
        "timeline": "Week 412",
        "goals": [
          "Address rotator cuff deficits",
          "Improve proprioception in the \"apprehension\" position",
          "Maintain scapular control"
        ],
        "precautions": [
          "Avoid end-range ER in abducted position (90/90)",
          "No high-velocity pulling early"
        ],
        "criteriaToProgress": [
          "Full symmetrical cuff strength",
          "Negative Apprehension Test"
        ],
        "exercises": [
          {
            "name": "Active External Rotation at 45",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Progressive loading of the infraspinatus in functional ranges"
          },
          {
            "name": "Wall Rhythmic Initialisations (Swaying on arm)",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Neuromuscular reactive stability of the humeral head"
          },
          {
            "name": "Bear Crawls (Modified)",
            "parameters": "3  5 meters",
            "clinicalCueRationale": "Closed chain stability for the anterior capsule"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Return to Contact / Collision Sport",
        "timeline": "Month 612",
        "goals": [
          "Full return to contact sport",
          "Maximize reactive stability in vulnerable positions",
          "Integrated upper body power"
        ],
        "precautions": [
          "Monitor for \"apprehension\" during heavy collisions",
          "Maintain cuff endurance"
        ],
        "criteriaToProgress": [
          "Neg Apprehension/Relocation tests",
          "WOSI score > 85%",
          "Full symmetrical strength"
        ],
        "exercises": [
          {
            "name": "Plyometric Push-ups (Clapping)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "High rate-of-force capacity for the anterior shoulder"
          },
          {
            "name": "Overhead Med-Ball Slam",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Explosive stability during rapid elevation"
          },
          {
            "name": "Contact Simulation (Tackling/Grappling)",
            "parameters": "Graded session",
            "clinicalCueRationale": "Specific sport demand re-integration"
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
        "timeline": "Day 03",
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
          "Pain =4/10 with WB",
          "Ready for LOVE phase"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps",
            "parameters": "10 reps every hour",
            "clinicalCueRationale": "Reduce swelling  start immediately"
          },
          {
            "name": "Toe Curls / Marble pickups",
            "parameters": "3  20 reps",
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
        "title": "Early Proprioception & Loading",
        "timeline": "Week 24",
        "goals": [
          "Full weight bearing with normal gait",
          "Basic balance stability",
          "Eccentric strength initiation"
        ],
        "precautions": [
          "Avoid aggressive inversion on uneven ground",
          "Monitor for \"giving way\" sensations"
        ],
        "criteriaToProgress": [
          "Able to SLS for 30s",
          "Pain-free calf raise",
          "Normal dorsiflexion ROM"
        ],
        "exercises": [
          {
            "name": "Single Leg Stance (Firm surface)",
            "parameters": "3  30-45 sec",
            "clinicalCueRationale": "Static balance and peroneal activation"
          },
          {
            "name": "Ankle Eversion (Band resistance)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Strengthen primary lateral stabilisers (Peroneals)"
          },
          {
            "name": "Toe Walks (Short distance)",
            "parameters": "3  10 meters",
            "clinicalCueRationale": "Dynamic stability of the midfoot/ankle complex"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "LOVE & Early Rehab",
        "timeline": "Day 3Week 4",
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
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Full ROM, slow and controlled"
          },
          {
            "name": "Resistance Band Eversion",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Peroneal strengthening  critical for lateral stability"
          },
          {
            "name": "Alphabet Tracing (AROM)",
            "parameters": "2  each letter",
            "clinicalCueRationale": "Full ankle ROM in all planes"
          },
          {
            "name": "Single-leg Balance",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Proprioception  eyes open then closed"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Return to Sport / Play",
        "timeline": "Week 48",
        "goals": [
          "Full agility speed",
          "Confident cutting movements",
          "Brace weaning (if applicable)"
        ],
        "precautions": [
          "Avoid uneven surfaces without support initially",
          "Ice after high intensity sessions"
        ],
        "criteriaToProgress": [
          "Figure-of-8 run (Pain-free)",
          "Star Excursion Balance Test within 5% of other side",
          "No subjective instability"
        ],
        "exercises": [
          {
            "name": "Plyometric Skater Hops",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Develop lateral explosive power and control"
          },
          {
            "name": "Cutting Drills (Change of direction)",
            "parameters": "3  10 reps (45)",
            "clinicalCueRationale": "Functional sport-specific simulation"
          },
          {
            "name": "Reactive Balance (Toss ball while on one leg)",
            "parameters": "5 min",
            "clinicalCueRationale": "Neurocognitive demand while stabilizing"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Maintenance & Recurrence Prevention",
        "timeline": "Week 12+",
        "goals": [
          "Zero recurrence of sprains",
          "Maximal peroneal reaction time",
          "Integrated lower limb power"
        ],
        "precautions": [
          "Ensure appropriate footwear for sport",
          "Taping/Bracing weaning (if appropriate)"
        ],
        "criteriaToProgress": [
          "Zero subjective instability",
          "Full seasonal participation without issue"
        ],
        "exercises": [
          {
            "name": "Unstable Surface Reactive Balance",
            "parameters": "10 min",
            "clinicalCueRationale": "Train the ankle to react to quick perturbations"
          },
          {
            "name": "Hopping Agility Circuits",
            "parameters": "3 rounds",
            "clinicalCueRationale": "integrated foot-eye coordination under fatigue"
          },
          {
            "name": "Peroneal Power Loading",
            "parameters": "3  15 reps (heavy)",
            "clinicalCueRationale": "Dynamic lateral protection capacity"
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
        "timeline": "Week 04",
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
          "Pain =4/10 during isometrics",
          "Morning stiffness <10 min",
          "VISA-A improving"
        ],
        "exercises": [
          {
            "name": "Isometric Calf Holds (knee straight)",
            "parameters": "5  45 sec, 7080% effort",
            "clinicalCueRationale": "Standing calf raise held  immediate analgesic effect"
          },
          {
            "name": "Isometric Calf Holds (knee bent 30)",
            "parameters": "5  45 sec",
            "clinicalCueRationale": "Loads soleus predominantly"
          },
          {
            "name": "Bike / Swimming",
            "parameters": "30 min",
            "clinicalCueRationale": "Maintain cardiovascular fitness without Achilles load"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Heavy Slow Resistance (HSR)",
        "timeline": "Week 412",
        "goals": [
          "Increase tendon stiffness",
          "Progressive hypertrophy of calf complex",
          "Maintain pain-free loading"
        ],
        "precautions": [
          "Avoid sudden explosive movements",
          "Monitor 24-hour pain response",
          "Ensure 3s eccentric phase"
        ],
        "criteriaToProgress": [
          "Able to perform 15 single leg calf raises",
          "VISA-A score > 60",
          "Pain = 3/10 with daily activity"
        ],
        "exercises": [
          {
            "name": "Slow Weighted Calf Raise (Standing)",
            "parameters": "3  8-12 reps (3s up, 3s down)",
            "clinicalCueRationale": "HSR induces collagen synthesis and improves mechanical properties"
          },
          {
            "name": "Seated Calf Raise (Soleus focus)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "High torque load for the soleus which takes 6-8x BW during running"
          },
          {
            "name": "Single Leg Stance on Foam",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Proprioceptive challenge during strengthening phase"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Energy Storage & Return to Impact",
        "timeline": "Week 12+",
        "goals": [
          "Restore tendon stiffness and power",
          "Full return to running/jumping",
          "Symmetrical calf volume"
        ],
        "precautions": [
          "Monitor for \"morning after\" pain",
          "Soft landing mechanics in plyometrics"
        ],
        "criteriaToProgress": [
          "Symmetrical single-leg calf raise",
          "Pain-free high speed skipping"
        ],
        "exercises": [
          {
            "name": "Single-leg Pogo Hops",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Tendon elastic capacity development"
          },
          {
            "name": "Box Jumps",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Explosive vertical power"
          },
          {
            "name": "Calf Raises with heavy load",
            "parameters": "3  8 reps (Slow)",
            "clinicalCueRationale": "Maintain tendon structural integrity"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Sport-Specific Performance & Maintenance",
        "timeline": "Month 6+",
        "goals": [
          "Maximize vertical power and speed",
          "Tendon maintenance loading",
          "Prevent recurrence"
        ],
        "precautions": [
          "Monitor 24-hour tendon reaction to high load",
          "Gradual shoe type transitions"
        ],
        "criteriaToProgress": [
          "Symmetrical power tests",
          "VISA-A score > 90"
        ],
        "exercises": [
          {
            "name": "Maximal Velocity Sprints",
            "parameters": "5-8 reps",
            "clinicalCueRationale": "Highest level of tendon elastic loading"
          },
          {
            "name": "Heavy Slow Resistance (HSR Maintenance)",
            "parameters": "1  weekly (heavy)",
            "clinicalCueRationale": "Maintain tendon structural integrity"
          },
          {
            "name": "Plyometric Jump Squats",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Global power integration"
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
        "timeline": "Week 04",
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
            "parameters": "3  30 sec each foot",
            "clinicalCueRationale": "Pull toes back before stepping  pre-activity"
          },
          {
            "name": "Calf Stretching (gastrocnemius)",
            "parameters": "3  45 sec each",
            "clinicalCueRationale": "Knee straight  reduce tension on fascia"
          },
          {
            "name": "Short Foot Exercise",
            "parameters": "3  20 reps, 5 sec hold",
            "clinicalCueRationale": "Arch activation  dome the foot without curling toes"
          },
          {
            "name": "Ice Massage",
            "parameters": "510 min",
            "clinicalCueRationale": "Frozen water bottle rolling  post activity"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Load Progression & Stretching",
        "timeline": "Week 48",
        "goals": [
          "Increase windlass mechanism tolerance",
          "Improve gastroc/soleus flexibility",
          "Normalize gait"
        ],
        "precautions": [
          "Avoid barefoot walking on hard floors",
          "Monitor for \"first step\" pain in morning"
        ],
        "criteriaToProgress": [
          "Morning pain < 3/10",
          "Full weight bearing tolerance"
        ],
        "exercises": [
          {
            "name": "Rathleff Protocol (Weighted Heel Raises)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Evidence-based loading for plantar fascia thickening and strength"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening & Loading",
        "timeline": "Week 48",
        "goals": [
          "Increase load tolerance of the plantar fascia",
          "Strengthen intrinsic foot muscles",
          "Improve calf flexibility"
        ],
        "precautions": [
          "Avoid barefoot walking on hard surfaces",
          "Progress loading based on morning pain"
        ],
        "criteriaToProgress": [
          "Minimal pain with first steps in the morning",
          "Able to walk 30 mins without flare-up"
        ],
        "exercises": [
          {
            "name": "Rathleff Protocol (Heel raise with toe towel)",
            "parameters": "3  12 reps (every second day)",
            "clinicalCueRationale": "Winlass mechanism - creates high tension to stimulate remodeling"
          },
          {
            "name": "Towel Curls (Weighted)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Strengthen flexor digitorum brevis to support the arch"
          },
          {
            "name": "Dynamic Calf Stretch (Wall lunges)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Improve functional dorsiflexion range"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Functional Strength & Impact",
        "timeline": "Week 816",
        "goals": [
          "Full return to running/sport",
          "Maximize intrinsic foot strength",
          "Long-term load management"
        ],
        "precautions": [
          "Gradual return to high-volume impact",
          "Wear appropriate footwear"
        ],
        "criteriaToProgress": [
          "Zero recurring symptoms with activity"
        ],
        "exercises": [
          {
            "name": "Jump Rope (Short sessions)",
            "parameters": "3  2 min",
            "clinicalCueRationale": "Gradual impact tolerance"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Maintenance & Prevention",
        "timeline": "Month 4+",
        "goals": [
          "Prevent recurrence",
          "Integrated lower limb robustness",
          "Independent management"
        ],
        "precautions": [
          "Independent load monitoring"
        ],
        "criteriaToProgress": [
          "Zero activity restrictions"
        ],
        "exercises": [
          {
            "name": "Intrinsics Maintenance",
            "parameters": "Daily",
            "clinicalCueRationale": "Support the medial longitudinal arch"
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
        "timeline": "Week 04 post-cast",
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
            "parameters": "3  20 reps each direction",
            "clinicalCueRationale": "Alphabet tracing  restore dorsiflexion priority"
          },
          {
            "name": "Ankle Pumps",
            "parameters": "Every hour, 20 reps",
            "clinicalCueRationale": "Oedema management  elevation between sessions"
          },
          {
            "name": "Calf Raises (bilateral, seated)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Begin gravity-eliminated, progress"
          },
          {
            "name": "Pool Walking",
            "parameters": "20 min",
            "clinicalCueRationale": "Offloaded WB  excellent early rehabilitation"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Dynamic Stability & Initial Proprioception",
        "timeline": "Week 48 post-cast",
        "goals": [
          "Full ROM symmetry",
          "Single leg balance stability",
          "Preparation for impact loading"
        ],
        "precautions": [
          "Avoid forced end-range inversion",
          "Ensure hardware is stable (if ORIF)"
        ],
        "criteriaToProgress": [
          "Full pain-free ROM",
          "Symmetrical WB during squat",
          "Good balance control"
        ],
        "exercises": [
          {
            "name": "Star Excursion Balance Test (Modified)",
            "parameters": "3 rounds), 3 directions",
            "clinicalCueRationale": "Dynamic balance training and postural control"
          },
          {
            "name": "Single Leg Calf Raise",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Restore push-off power and lateral ankle stability"
          },
          {
            "name": "Lateral Step-overs",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Frontal plane control - crucial for fall prevention"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Return to Sport & Impact",
        "timeline": "Week 12+",
        "goals": [
          "Safe landing mechanics",
          "Full sport-specific agility",
          "Confident multi-plane loading"
        ],
        "precautions": [
          "Ensure radiographic union is 100% confirmed",
          "Ice after initial high-impact sessions"
        ],
        "criteriaToProgress": [
          "Hop symmetry > 90%",
          "Running pain-free for 30 min",
          "Functional confidence (FAAM score)"
        ],
        "exercises": [
          {
            "name": "Double-leg Jump to Single-leg Land",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Training force attenuation and lateral stability upon landing"
          },
          {
            "name": "Ladder Drills (High speed)",
            "parameters": "5 min",
            "clinicalCueRationale": "Integrated ankle and lower limb neuromuscular speed"
          },
          {
            "name": "Box Step-downs (Weighted)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Eccentric capacity for decelerating the body weight"
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
        "timeline": "Week 02",
        "goals": [
          "Reduce pain and muscle guarding",
          "Maintain mobility and avoid deconditioning",
          "Patient education  reassurance and self-management"
        ],
        "precautions": [
          "Screen for red flags: cauda equina, fracture, malignancy",
          "Avoid prolonged bed rest",
          "No heavy lifting or sustained flexion loading"
        ],
        "criteriaToProgress": [
          "Pain =4/10 with daily activities",
          "Able to walk 20 min without significant pain increase",
          "Red flags excluded"
        ],
        "exercises": [
          {
            "name": "Walking (paced, flat surface)",
            "parameters": "1020 min  2/day",
            "clinicalCueRationale": "Best evidence for acute LBP  maintain normal spinal loading"
          },
          {
            "name": "Knee-to-Chest Stretch (lumbar flexion)",
            "parameters": "3  30 sec each",
            "clinicalCueRationale": "Gentle lumbar flexion mobilisation  symptom-guide"
          },
          {
            "name": "Cat-Camel (lumbar flexion/extension)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Segmental lumbar mobility  promotes synovial fluid circulation"
          },
          {
            "name": "Prone Lying (extension bias if centralising)",
            "parameters": "3  5 min",
            "clinicalCueRationale": "McKenzie extension if pain peripheralises with flexion"
          },
          {
            "name": "Diaphragmatic Breathing",
            "parameters": "5 min  3/day",
            "clinicalCueRationale": "Reduce sympathetic nervous system activation  pain modulation"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Core Stability & Functional Load",
        "timeline": "Week 26",
        "goals": [
          "Eliminate fear-avoidance beliefs",
          "Increase spinal load tolerance",
          "Return to full ADLs"
        ],
        "precautions": [
          "Progress intensity gradually",
          "Avoid extreme repetitive end-range bending"
        ],
        "criteriaToProgress": [
          "Pain-free lumbar ROM",
          "Safe lifting of 10kg with good form",
          "No neurological symptoms"
        ],
        "exercises": [
          {
            "name": "Bird-Dog (Controlled level)",
            "parameters": "3  12 reps each side",
            "clinicalCueRationale": "Spine stabilization against rotational force"
          },
          {
            "name": "Deadlift Technique (Dowels or light weight)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Restore hip hinge pattern  offload the back"
          },
          {
            "name": "Brisk Walking",
            "parameters": "30 min daily",
            "clinicalCueRationale": "Movement is medicine for disc nutrition and muscle tone"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Spinal Resilience & Weight Loading",
        "timeline": "Week 8+",
        "goals": [
          "Full return to occupational/sport tasks",
          "Confident lifting/bending mechanics",
          "Long-term spinal health"
        ],
        "precautions": [
          "Maintain neutral spine under fatigue",
          "Avoid sudden heavy rotational loads initially"
        ],
        "criteriaToProgress": [
          "Full pain-free spine ROM",
          "Oswestry Disability Index < 10%"
        ],
        "exercises": [
          {
            "name": "Deadlifts (Kettlebell or Barbell)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Integrated posterior chain and core strength"
          },
          {
            "name": "Turkish Get-ups (Partial)",
            "parameters": "3  8 reps each side",
            "clinicalCueRationale": "Multi-planar core and limb stability"
          },
          {
            "name": "Pallof Press (Rotational stability)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Core anti-rotation strength"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Lifetime Prevention & Advanced Load",
        "timeline": "Month 4+",
        "goals": [
          "Consistent spinal load tolerance",
          "Integrated core/hip strength",
          "Zero fear-avoidance behavior"
        ],
        "precautions": [
          "Maintain active lifestyle",
          "Pace volume during high stress periods"
        ],
        "criteriaToProgress": [
          "Zero activity restrictions",
          "Confidence in managing minor flare-ups"
        ],
        "exercises": [
          {
            "name": "Heavy Deadlifts / Squats (Maintenance)",
            "parameters": "3  8 reps",
            "clinicalCueRationale": "Building a high threshold for spinal tolerance"
          },
          {
            "name": "Multi-planar Core Rotations",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Stability against complex directional forces"
          },
          {
            "name": "Compound Lifting (Cleans/Snatch basics)",
            "parameters": "3  5 reps",
            "clinicalCueRationale": "Integrated power and movement quality"
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
        "timeline": "Week 04",
        "goals": [
          "Reduce radicular pain and neurological symptoms",
          "Centralisation of symptoms",
          "Patient education",
          "Maintain mobility"
        ],
        "precautions": [
          "URGENT: Cauda equina signs  emergency referral",
          "Progressive neurological deficit requires urgent review",
          "Avoid sustained lumbar flexion"
        ],
        "criteriaToProgress": [
          "Symptoms centralising",
          "Pain =4/10 with walking",
          "No progressive neurological deficit"
        ],
        "exercises": [
          {
            "name": "Prone Lying / Press-ups (extension)",
            "parameters": "3  10 reps / 3  5 min",
            "clinicalCueRationale": "McKenzie extension  centralise leg symptoms"
          },
          {
            "name": "Walking (short, frequent bouts)",
            "parameters": "10 min  34/day",
            "clinicalCueRationale": "Avoid sustained sitting  intermittent loading best"
          },
          {
            "name": "Neural Mobilisation (sciatic nerve slider)",
            "parameters": "3  10 reps each",
            "clinicalCueRationale": "Ankle DF/PF with straight leg  gentle nerve gliding"
          },
          {
            "name": "Sleeping Posture Education",
            "parameters": "Daily cue",
            "clinicalCueRationale": "Side-lying with pillow between knees  reduce disc pressure"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Functional Stabilization",
        "timeline": "Week 48",
        "goals": [
          "Restore core endurance",
          "Normalize hip mobility",
          "Safe return to light lifting"
        ],
        "precautions": [
          "Avoid combined flexion and rotation under load",
          "Monitor for peripheralization of symptoms"
        ],
        "criteriaToProgress": [
          "Negative Slump test",
          "Centralized symptoms",
          "Improved functional capacity (ODI score)"
        ],
        "exercises": [
          {
            "name": "Dead Bug (Level 2 - arm/leg move)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Deep core stabilization with limb movement dissociation"
          },
          {
            "name": "Side Plank (Knees or feet)",
            "parameters": "3  30-45 sec",
            "clinicalCueRationale": "Quadratus lumborum and obliques stabilization"
          },
          {
            "name": "Hip Hinge Training (Wall touch)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Teach lifting from hips to spare the lumbar discs"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "High Level Function & Sport",
        "timeline": "Week 12+",
        "goals": [
          "Full return to previous sport/work demands",
          "Spinal resilience during multi-planar moves",
          "Integrated lower limb and core power"
        ],
        "precautions": [
          "Gradual return to contact sport",
          "Ensure good lifting mechanics under fatigue"
        ],
        "criteriaToProgress": [
          "Negative Slump/SLR tests",
          "No residual neurological signs",
          "Full load tolerance (Deadlift technique good)"
        ],
        "exercises": [
          {
            "name": "Modified Burpees (Linear)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Dynamic transition between loaded positions with core control"
          },
          {
            "name": "Kettlebell Swings (Light to Moderate)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Explosive posterior chain work with spinal neutral priority"
          },
          {
            "name": "Medicine Ball Lateral Toss",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Core stability against rotational inertia"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Performance Resilience & Maintenance",
        "timeline": "Month 6+",
        "goals": [
          "Maximize spinal load capacity",
          "Return to high-impact sport/manual labor",
          "Lifetime maintenance plan"
        ],
        "precautions": [
          "Monitor for neurological signs during fatigue",
          "Avoid sudden heavy unassisted forward bending early morning"
        ],
        "criteriaToProgress": [
          "Oswestry score < 5%",
          "Full confidence in heavy lifting"
        ],
        "exercises": [
          {
            "name": "Kettlebell Swings (High volume)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Build explosive posterior chain endurance"
          },
          {
            "name": "Farmers Walk (Heavy)",
            "parameters": "3  40 meters",
            "clinicalCueRationale": "Global postural stabilization under load"
          },
          {
            "name": "Barbell Cleans (Basic)",
            "parameters": "3  5 reps",
            "clinicalCueRationale": "Integrated athletic movement with spinal neutral priority"
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
        "timeline": "Week 04",
        "goals": [
          "Reduce arm pain",
          "Centralise symptoms",
          "Offload neural structures"
        ],
        "precautions": [
          "URGENT: Myelopathy signs  surgical referral",
          "No cervical manipulation in acute phase",
          "Avoid sustained cervical extension"
        ],
        "criteriaToProgress": [
          "Arm pain centralising",
          "Pain =4/10",
          "No progressive neurological deficit"
        ],
        "exercises": [
          {
            "name": "Cervical Retraction (chin tucks)",
            "parameters": "3  15 reps, 5 sec hold",
            "clinicalCueRationale": "Unload neural foramen  McKenzie retraction"
          },
          {
            "name": "Neural Mobilisation  Median Nerve Slider",
            "parameters": "3  10 reps each",
            "clinicalCueRationale": "Wrist ext/flex with elbow + shoulder movement"
          },
          {
            "name": "Upper Cervical Traction (manual)",
            "parameters": "Per physiotherapist",
            "clinicalCueRationale": "Opens neural foramen  often immediate relief"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Mobilization & Early Resistance",
        "timeline": "Week 48",
        "goals": [
          "Centralize symptoms (move from hand to neck)",
          "Restore painless cervical ROM",
          "Early muscle activation"
        ],
        "precautions": [
          "Avoid positions that increase hand numbness/pain (extension/rotation)",
          "No heavy overhead lifting"
        ],
        "criteriaToProgress": [
          "Symptoms centralized",
          "Improved neural mobility"
        ],
        "exercises": []
      },
      {
        "phaseNumber": 3,
        "title": "Integrated Strength & Nerve Gliding",
        "timeline": "Week 816",
        "goals": [
          "Build upper limb resistance",
          "Restore full neural mobility",
          "Address postural endurance"
        ],
        "precautions": [
          "Pace the volume"
        ],
        "criteriaToProgress": [
          "Zero constant limb pain",
          "Neck Disability Index < 20%"
        ],
        "exercises": [
          {
            "name": "Mid-trap / Rhomboid Rows",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Build proximal support for the cervical spine"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Resilience & Maintenance",
        "timeline": "Month 4+",
        "goals": [
          "Independent management",
          "Full return to manual tasks/sport",
          "Long-term spinal health"
        ],
        "precautions": [
          "Avoid sudden heavy unassisted overhead tasks early morning"
        ],
        "criteriaToProgress": [
          "Full return to work/activity"
        ],
        "exercises": [
          {
            "name": "Overhead Shrugs (Maintenance)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Integrated girdle stability"
          }
        ]
      }
    ]
  },
  {
    "name": "Spondylolisthesis (Grade I-II Conservative)",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Control & Stabilisation",
        "timeline": "Week 06",
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
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Dissociate hip movement from lumbar spine"
          },
          {
            "name": "Transverse Abdominis Bracing",
            "parameters": "10  10 sec",
            "clinicalCueRationale": "Create an internal corset to support the vertebrae"
          },
          {
            "name": "Hamstring Stretching (Supine with strap)",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Reduce posterior pelvic pull"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Resilience & Strengthening",
        "timeline": "Week 612",
        "goals": [
          "Address global core endurance",
          "Strengthen posterior chain (Glutes/Hams)",
          "Improve hip mobility to spare the back"
        ],
        "precautions": [
          "Limit extreme end-range lumbar extension",
          "Monitor for \"slippage\" sensation"
        ],
        "criteriaToProgress": [
          "Hold neutral spine under moderate load",
          "Negative prone instability test"
        ],
        "exercises": [
          {
            "name": "Stir the Pot (Plank on ball)",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Dynamic core endurance in neutral positions"
          },
          {
            "name": "Hip Hinge Training (Dowel)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Minimize lumbar load during forward bending"
          },
          {
            "name": "Glute Bridges (Weighted)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Strong glutes prevent excessive anterior pelvic tilt"
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
        "timeline": "Week 06",
        "goals": [
          "Reduce intra-articular pain and inflammation",
          "Identify provocative loading positions",
          "Restore pain-free ROM within safe arcs"
        ],
        "precautions": [
          "Avoid deep hip flexion beyond 90",
          "No pivoting or cutting",
          "Avoid hip ER combined with extension (prone)"
        ],
        "criteriaToProgress": [
          "Pain =3/10 with daily activities",
          "No clicking, locking, or giving way with walking",
          "Hip AROM improving"
        ],
        "exercises": [
          {
            "name": "Supine Hip AROM (pain-free arcs)",
            "parameters": "3  20 reps each direction",
            "clinicalCueRationale": "Maintain synovial fluid circulation  avoid impingement zone"
          },
          {
            "name": "Isometric Hip Abduction (side-lying)",
            "parameters": "3  10 reps, 10 sec hold",
            "clinicalCueRationale": "Activate gluteus medius without joint compression"
          },
          {
            "name": "Isometric Hip Extension (prone, neutral)",
            "parameters": "3  10 reps, 10 sec hold",
            "clinicalCueRationale": "Gluteus maximus activation  avoid extension past neutral"
          },
          {
            "name": "Stationary Bike (seat height high)",
            "parameters": "2030 min",
            "clinicalCueRationale": "Low hip flexion arc  cardiovascular maintenance without provocation"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Progressive Strengthening",
        "timeline": "Week 612",
        "goals": [
          "Strengthen hip stabilizers (Glutes/Rotators)",
          "Pelvic control during dynamic moves",
          "Improve hip endurance"
        ],
        "precautions": [
          "Avoid impingement positions (Flexion/Adduction/IR)",
          "Pain-free range only"
        ],
        "criteriaToProgress": [
          "Full pain-free gain",
          "No mechanical symptoms (clicking) with exercise",
          "Good pelvic stability during SLS"
        ],
        "exercises": [
          {
            "name": "Lateral Band Walks",
            "parameters": "3  15 steps each way",
            "clinicalCueRationale": "Gluteus medius/minimus activation for pelvis level control"
          },
          {
            "name": "Single Leg Deadlift (B-stance)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Posterior chain loading with minimal hip flexion compression"
          },
          {
            "name": "Copenhagen Plank (Short lever)",
            "parameters": "3  20 sec",
            "clinicalCueRationale": "Adductor strength - often neglected in hip rehab"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Advanced Strength & Return to Sport",
        "timeline": "Week 12+",
        "goals": [
          "Safe pivoting and cutting mechanics",
          "Sport-specific power development",
          "Long term maintenance program"
        ],
        "precautions": [
          "Avoid repetitive hip internal rotation under heavy axial load",
          "Manage volume spikes"
        ],
        "criteriaToProgress": [
          "Full pain-free sport participation",
          "Positive Trendelenburg test absent",
          "Hop test symmetry > 90%"
        ],
        "exercises": [
          {
            "name": "Crossover Steps (Lateral mobility)",
            "parameters": "3  15 meters",
            "clinicalCueRationale": "Functional integration of the hip rotators"
          },
          {
            "name": "Lunge into High Knee (explosive)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Integrated athletic movement with hip stability"
          },
          {
            "name": "Single-leg Rotational Drills (Band)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Controlling the femoral head during pelvic rotation"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Independent Care & Life Integration",
        "timeline": "Week 20+",
        "goals": [
          "Maintain structural stability of the hip joint",
          "Prevent irritation during extreme ranges",
          "Support general athleticism"
        ],
        "precautions": [
          "Avoid repetitive heavy impact if hip feels \"catchy\"",
          "Maintain core-glute endurance"
        ],
        "criteriaToProgress": [
          "Zero activity limitations",
          "Confident management of hip load"
        ],
        "exercises": [
          {
            "name": "Plyometric Box Step-ups",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Develop explosive power while controlling the hip joint"
          },
          {
            "name": "Deep Goblet Squats (Controlled)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Maintain joint mobility and strength throughout full range"
          },
          {
            "name": "Lateral Speed Skaters",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Frontal plane stability and explosive propulsion"
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
        "timeline": "Week 06",
        "goals": [
          "Safe mobilisation with assistive device",
          "Wound healing and oedema management",
          "DVT prevention",
          "Patient education  THA precautions"
        ],
        "precautions": [
          "POSTERIOR APPROACH: No hip flexion >90, no IR, no adduction past midline",
          "ANTERIOR APPROACH: No hip extension past neutral, no ER in extended position",
          "No pivoting on operative leg"
        ],
        "criteriaToProgress": [
          "FWB with single assistive device",
          "Wound healed  sutures removed",
          "Hip ROM improving within limits"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps",
            "parameters": "10 reps every hour",
            "clinicalCueRationale": "DVT prevention  begin immediately post-op"
          },
          {
            "name": "Quad Sets (isometric)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain quadriceps activation while NWB or PWB"
          },
          {
            "name": "Heel Slides (supine)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Restore hip and knee flexion within precaution limits"
          },
          {
            "name": "Hip Abduction (supine, within limits)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Gluteus medius activation  avoid adduction past midline"
          },
          {
            "name": "Stair Training (one step at a time)",
            "parameters": "Supervised daily",
            "clinicalCueRationale": "Good leg up first, bad leg down first  patient must know this rule"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening & Functional Balance",
        "timeline": "Week 612",
        "goals": [
          "Full weight bearing with normal gait/no limp",
          "Strengthen hip abductors and extensors",
          "Improve balance on operative leg"
        ],
        "precautions": [
          "Maintain hip precautions (if applicable)",
          "Avoid high-impact jumping",
          "Ensure symmetrical movement"
        ],
        "criteriaToProgress": [
          "No Trendelenburg gait",
          "Single leg stance > 15 sec",
          "Walk 20-30 min without aid"
        ],
        "exercises": [
          {
            "name": "Standing Hip Abduction",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Lateral stability for the pelvis during gait"
          },
          {
            "name": "Step-ups (Forward & Lateral)",
            "parameters": "3  12 reps each",
            "clinicalCueRationale": "Functional eccentric/concentric control"
          },
          {
            "name": "Tandem Standing",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Static balance training for fall prevention"
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
        "timeline": "Week 04",
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
          "Pain =3/10 during isometrics",
          "Morning stiffness <15 min",
          "Provocative activities identified"
        ],
        "exercises": [
          {
            "name": "Isometric Wrist Extension (table edge)",
            "parameters": "5  45 sec, 7080% effort",
            "clinicalCueRationale": "Immediate analgesic effect  elbow at 90, forearm pronated"
          },
          {
            "name": "Isometric Grip",
            "parameters": "5  45 sec",
            "clinicalCueRationale": "Maintain hand and forearm activation without provocation"
          },
          {
            "name": "Nerve Mobilisation (radial nerve slider)",
            "parameters": "3  10 reps each",
            "clinicalCueRationale": "Radial nerve often sensitised in Tennis Elbow"
          },
          {
            "name": "Bike / Swimming",
            "parameters": "2030 min",
            "clinicalCueRationale": "Cardiovascular maintenance  minimal forearm loading"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Isotonic Loading",
        "timeline": "Week 48",
        "goals": [
          "Increase load tolerance of the tendon",
          "Address scapular/proximal weakness",
          "Full pain-free extension"
        ],
        "precautions": [
          "Avoid large increases in load suddenly",
          "Monitor for \"latched\" sensation"
        ],
        "criteriaToProgress": [
          "Pain-free grip strength > 80% other side",
          "Symmetrical wrist extension strength"
        ],
        "exercises": [
          {
            "name": "Eccentric Wrist Extension (Weighted)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Gradual tendon remodel through eccentric strain"
          },
          {
            "name": "Hammer Curls (Forearm neutral)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Loads brachioradialis - offloads common extensor origin"
          },
          {
            "name": "Towel twists",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Combined rotation and grip strength"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Functional Return & Sport Specificity",
        "timeline": "Week 816",
        "goals": [
          "Full sports/work re-integration",
          "Maximal grip strength recovery",
          "Integrated upper limb power"
        ],
        "precautions": [
          "Monitor for \"flare-ups\" during repetitive eccentric tasks",
          "Gradual re-introduction of manual tools/rackets"
        ],
        "criteriaToProgress": [
          "Symmetrical grip strength",
          "Pain-free full speed task execution"
        ],
        "exercises": [
          {
            "name": "Shadow Swings (Tennis/Golf)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Sport-specific motor re-education"
          },
          {
            "name": "Plyometric wrist flips (Light ball)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "High rate-of-force development for tendon resilience"
          },
          {
            "name": "Weighted Carries (Farmer's walks)",
            "parameters": "3  30 meters",
            "clinicalCueRationale": "Integrated grip and scapular stability under fatigue"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Conditioning & Prevention",
        "timeline": "Month 4+",
        "goals": [
          "Maintain tendon resilience",
          "Increase forearm endurance for high volume",
          "Optimize kinetic chain (Shoulder/Core)"
        ],
        "precautions": [
          "Monitor for overuse during tournament/heavy work spikes",
          "Ensure ergonomic setup remains optimal"
        ],
        "criteriaToProgress": [
          "Zero recurring pain after high volume",
          "PRTEE score improvement stable"
        ],
        "exercises": [
          {
            "name": "Heavy Slow Forearm Extensions",
            "parameters": "1  weekly (heavy)",
            "clinicalCueRationale": "Maintenance of tendon health"
          },
          {
            "name": "Grip Endurance Holds (Timed)",
            "parameters": "3  60 sec",
            "clinicalCueRationale": "Functional endurance for manual tasks"
          },
          {
            "name": "Rotator Cuff/Scapular Power Drills",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Offload the elbow through proximal strength"
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
        "timeline": "Week 04 post-cast removal",
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
            "name": "Wrist AROM  all planes",
            "parameters": "3  20 reps each direction",
            "clinicalCueRationale": "Flexion, extension, radial and ulnar deviation  gentle"
          },
          {
            "name": "Forearm Rotation (pronation/supination)",
            "parameters": "3  20 reps each",
            "clinicalCueRationale": "Often most restricted post-cast  critical for hand function"
          },
          {
            "name": "Tendon Gliding Exercises (hand)",
            "parameters": "3  10 reps each position",
            "clinicalCueRationale": "Maintain finger tendon mobility in cast"
          },
          {
            "name": "Contrast Bathing (warm/cold)",
            "parameters": "2  daily",
            "clinicalCueRationale": "Reduce stiffness and pain  thermal circulation"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening & Functional Loading",
        "timeline": "Week 48 post-cast removal",
        "goals": [
          "Full functional ROM",
          "Restore grip strength to 80%",
          "Safe return to weight bearing through hand"
        ],
        "precautions": [
          "Avoid heavy sudden lifting",
          "Gradual progression into extension loading (push-ups)"
        ],
        "criteriaToProgress": [
          "Grip strength > 75% other side",
          "Full pain-free extension AROM",
          "Stable joint - no clicking"
        ],
        "exercises": [
          {
            "name": "Wrist Extension with Dumbbell",
            "parameters": "3  15 reps (0.5-1kg)",
            "clinicalCueRationale": "Target wrist extensors - often weak post-immobilisation"
          },
          {
            "name": "Squeezing Power Putty",
            "parameters": "5 min activity",
            "clinicalCueRationale": "Functional grip and intrinsic muscle work"
          },
          {
            "name": "Wall Push-ups (Hands flat)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Early weight bearing through the radius and ulna"
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
        "timeline": "Week 02",
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
          "Pain =3/10 during exercises"
        ],
        "exercises": [
          {
            "name": "Prone Knee Flexion (AROM)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain hamstring muscle activation without tension on tear"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Eccentric Loading & Dynamic Movement",
        "timeline": "Week 26",
        "goals": [
          "Restore eccentric strength",
          "Normalize running mechanics",
          "Full pain-free lengthening"
        ],
        "precautions": [
          "Limit end-range stretching if symptomatic",
          "Avoid maximal sprints yet"
        ],
        "criteriaToProgress": [
          "Symmetrical eccentric strength",
          "Hop test symmetry > 85%",
          "Pain-free jog"
        ],
        "exercises": [
          {
            "name": "Nordic Hamstring Curls (Assisted)",
            "parameters": "3  5-8 reps",
            "clinicalCueRationale": "The gold standard for eccentric hamstring capacity"
          },
          {
            "name": "Romanian Deadlift (B-stance)",
            "parameters": "3  12-15 reps",
            "clinicalCueRationale": "Loaded lengthening of the hamstring fibers"
          },
          {
            "name": "High-knee Marches",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Dynamic neuromuscular control at high hip flexion"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Return to Sprint & Competition",
        "timeline": "Week 612",
        "goals": [
          "Full maximal sprint speed (100%)",
          "Safe reactive deceleration",
          "Sport-specific positional work"
        ],
        "precautions": [
          "No maximal sprints until hop tests > 95%",
          "Monitor for proximal hamstring \"tightness\""
        ],
        "criteriaToProgress": [
          "Symmetrical Nordic strength",
          "Pain-free maximal contraction at end-range flexion"
        ],
        "exercises": [
          {
            "name": "Sprint Starts (75% ? 100%)",
            "parameters": "5-8 reps, 20 meters",
            "clinicalCueRationale": "Specific loading of the hamstrings in high-velocity lengthening"
          },
          {
            "name": "Nordic Hamstring Curls (Full)",
            "parameters": "3  5 reps",
            "clinicalCueRationale": "Maintenance of peak eccentric capacity"
          },
          {
            "name": "Sliding Hamstring Curls (Single leg)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Core-hamstring integrated stability"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Elite Performance & Injury Prevention",
        "timeline": "Month 3+",
        "goals": [
          "Maintain maximal sprint velocity without fear",
          "High-level eccentric strength maintenance",
          "Integrated athletic robustness"
        ],
        "precautions": [
          "Monitor for \"tightness\" during cold weather/early season",
          "Zero skipping of maintenance drills"
        ],
        "criteriaToProgress": [
          "Symmetry in Isokinetic testing (if available)",
          "Full confidence during competitive matches"
        ],
        "exercises": [
          {
            "name": "Nordic Hamstring Curls (Maintenance)",
            "parameters": "3  5 reps (1x week)",
            "clinicalCueRationale": "Evidence-based gold standard for preventing recurrence"
          },
          {
            "name": "Maximal Speed Change-of-direction",
            "parameters": "5-8 sets",
            "clinicalCueRationale": "Train the muscle to handle deceleration at high force"
          },
          {
            "name": "Isometric Hamstring Bridges (High load)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Tendon and muscle junction structural health"
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
        "timeline": "Week 04",
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
          "Pain =3/10 during isometrics",
          "Night pain resolving",
          "VISA-G improving"
        ],
        "exercises": [
          {
            "name": "Isometric Hip Abduction (standing)",
            "parameters": "5  45 sec, 80% effort",
            "clinicalCueRationale": "Immediate analgesic effect  push foot into wall"
          },
          {
            "name": "Pelvic Leveling (Trendelenburg control)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Gluteus medius activation  maintain level pelvis"
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
      },
      {
        "phaseNumber": 2,
        "title": "Progressive Loading",
        "timeline": "Week 410",
        "goals": [
          "Address gluteal medius/minimus tendinopathy",
          "Improve lateral hip stability",
          "Enhance lower limb kinematics"
        ],
        "precautions": [
          "Avoid side-lying on affected side",
          "No \"hanging\" on the hip - avoid adduction past neutral"
        ],
        "criteriaToProgress": [
          "Able to climb stairs without lateral hip pain",
          "Symmetrical hip abduction strength"
        ],
        "exercises": [
          {
            "name": "Standing Hip Abduction (Resistance band)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Functional loading in weight bearing"
          },
          {
            "name": "Bridging with Band (Hip abduction focus)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Gluteal activation without excessive bursa compression"
          },
          {
            "name": "Step-ups (Mirror feedback)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Pelvic stability - keep pelvis level during the entire move"
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
        "timeline": "Week 03",
        "goals": [
          "Reduce lateral knee pain",
          "Modify training load",
          "Address contributing factors"
        ],
        "precautions": [
          "Avoid 30 knee flexion range (impingement zone)",
          "Reduce running mileage 50%",
          "Avoid downhill running"
        ],
        "criteriaToProgress": [
          "Pain =3/10 with walking",
          "Reduce provocative running"
        ],
        "exercises": [
          {
            "name": "Foam Roll IT Band / Glutes",
            "parameters": "2  2 min",
            "clinicalCueRationale": "Release TFL and proximal IT band  not directly over knee"
          },
          {
            "name": "Hip Abductor Strengthening (standing)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Key driver  weak glute med increases ITB tension"
          },
          {
            "name": "Clamshell (band)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Hip ER strengthening"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Functional Hip Loading",
        "timeline": "Week 38",
        "goals": [
          "Symmetrical hip strength",
          "Dynamic knee alignment control",
          "Re-introduction of running intervals"
        ],
        "precautions": [
          "Monitor for \"snapping\" during hill repeats",
          "No sudden mileage jumps"
        ],
        "criteriaToProgress": [
          "Pain-free single leg squat",
          "Run 15 min without lateral knee pain"
        ],
        "exercises": [
          {
            "name": "Side-Lying Leg Lifts (Hip extension focus)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Target Gluteus Medius without TFL dominance"
          },
          {
            "name": "Speed Skaters (Low impact)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Frontal plane control during lateral movement"
          },
          {
            "name": "Step-downs (Mirror control)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Ensure no valgus or pelvic drop"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Full Return to Running & Performance",
        "timeline": "Week 8+",
        "goals": [
          "Full return to previous mileage/intensity",
          "Manage hill loading and speed work",
          "Long-term maintenance of hip power"
        ],
        "precautions": [
          "Avoid sudden jumps in weekly mileage (> 10% rule)",
          "Ensure equipment (shoes/bike fit) is optimized"
        ],
        "criteriaToProgress": [
          "Pain-free running for 60 min",
          "Symmetrical hip abduction strength (> 20% BW in testing)"
        ],
        "exercises": [
          {
            "name": "Single-leg Bounding (controlled)",
            "parameters": "3  15 meters",
            "clinicalCueRationale": "Reactive lateral stability and impact attenuation"
          },
          {
            "name": "Crossover Drills (Karaoke)",
            "parameters": "3  20 meters",
            "clinicalCueRationale": "Integrated frontal plane mobility and stability"
          },
          {
            "name": "Hip Trust (Weighted)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Gluteal power development to offload the TFL/ITB"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Performance Mileage & Prevention",
        "timeline": "Month 4+",
        "goals": [
          "Maintain high-volume running without biomechanical breakdown",
          "Improve vertical and lateral power",
          "Independent load monitoring"
        ],
        "precautions": [
          "Avoid sudden jumps in vertical gain (hills) > 15% per wk",
          "Monitor for shoe wear patterns"
        ],
        "criteriaToProgress": [
          "Consistent running mileage (pre-injury levels)",
          "Zero ITB tenderness after long runs"
        ],
        "exercises": [
          {
            "name": "Lateral Bounding into Sprint",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Reactive hip stability during dynamic propulsion"
          },
          {
            "name": "Single-leg Kettlebell Swings",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Integrated gluteal/core power"
          },
          {
            "name": "Slope Running (Graduated)",
            "parameters": "15-20 min",
            "clinicalCueRationale": "Specific loading for ITB shear stress tolerance"
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
        "timeline": "Week 02",
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
          "Pain =3/10",
          "Shoulder AROM improving up to 90 flexion"
        ],
        "exercises": [
          {
            "name": "Shoulder Shrugs (gentle)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain trapezius and levator scapulae activation"
          },
          {
            "name": "Isometric Rotator Cuff (neutral)",
            "parameters": "3  10 reps, 5 sec",
            "clinicalCueRationale": "Maintain cuff activation without AC joint stress"
          },
          {
            "name": "Scapular Retraction",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Pull blades back and down  offload anterior AC joint"
          },
          {
            "name": "Elbow and Hand AROM",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Prevent distal stiffness"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Cuff Strengthening & Initial Loading",
        "timeline": "Week 48",
        "goals": [
          "Restore rotator cuff stability",
          "Initial resistance above 90 elevation",
          "Address scapular dyskinesis"
        ],
        "precautions": [
          "No heavy unassisted overhead lifting initially",
          "Avoid horizontal adduction"
        ],
        "criteriaToProgress": [
          "Pain-free elevation to 150",
          "Negative Paxinos test"
        ],
        "exercises": [
          {
            "name": "Shoulder External Rotation (Band)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Offload the AC joint through dynamic centering of the humeral head"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Early Strengthening & Stability",
        "timeline": "Week 38",
        "goals": [
          "Full pain-free AROM",
          "Scapular control during movement",
          "Restore rotator cuff strength"
        ],
        "precautions": [
          "Avoid heavy push movements",
          "No contact sports",
          "Avoid painful overhead reaches"
        ],
        "criteriaToProgress": [
          "Full ROM without compensation",
          "Stable scapula during elevation",
          "No pain with resisted internal rotation"
        ],
        "exercises": [
          {
            "name": "Scapular Pushes (Wall)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Serratus anterior focus - critical for overhead control"
          },
          {
            "name": "Shoulder Rows (Band)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Strengthen posterior stabilizers and deltoids"
          },
          {
            "name": "External Rotation (Sidelying)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Isolate rotator cuff to provide humeral head stability"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Advanced Strength & Sport Drills",
        "timeline": "Week 816",
        "goals": [
          "Full return to heavy lifting/sport",
          "Maximize explosive shoulder power",
          "Stability during contact"
        ],
        "precautions": [
          "Monitor for \"clicking\" or local pain during heavy push exercises"
        ],
        "criteriaToProgress": [
          "Negative Cross-arm test",
          "Full symmetrical strength"
        ],
        "exercises": [
          {
            "name": "Push-up into Plank Plus",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Integrated scapular and girdle stability"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Conditioning & Prevention",
        "timeline": "Month 4+",
        "goals": [
          "Maintenance of AC joint stability",
          "Global upper body robustness",
          "Long-term shoulder health"
        ],
        "precautions": [
          "Gradual return to contact (Rugby/Judo)"
        ],
        "criteriaToProgress": [
          "Zero activity restrictions"
        ],
        "exercises": [
          {
            "name": "Dumbbell Snatch (Light-to-Moderate)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "High level coordinated power"
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
        "timeline": "Week 06",
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
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Open the outlet space  don't force to pain"
          },
          {
            "name": "Diaphragmatic Breathing",
            "parameters": "5 min, 3 daily",
            "clinicalCueRationale": "Reduce scalene activity and upper rib elevation"
          },
          {
            "name": "Scapular Squeeze and Hold",
            "parameters": "3  15 reps, 5 sec",
            "clinicalCueRationale": "Address scapular depression/protraction"
          },
          {
            "name": "Nerve Gliding (Brachial Plexus Slider)",
            "parameters": "3  10 reps each",
            "clinicalCueRationale": "Gentle neural excursion  avoid \"zinging\" sensation"
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
        "timeline": "Week 04",
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
          "Pain =3/10 during isometrics",
          "VISA-P improving"
        ],
        "exercises": [
          {
            "name": "Isometric Leg Press (70 knee flexion)",
            "parameters": "5  45 sec, 80% effort",
            "clinicalCueRationale": "Immediate analgesic effect for quadriceps tendon"
          },
          {
            "name": "Isometric Wall Squat (60)",
            "parameters": "5  45 sec",
            "clinicalCueRationale": "Alternative to leg press  same analgesic principle"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Isotonic Strengthening",
        "timeline": "Week 412",
        "goals": [
          "Progressive hypertrophy of the quadriceps",
          "Load the tendon through functional range",
          "Address kinetic chain deficits"
        ],
        "precautions": [
          "Avoid explosive jumping",
          "Monitor pain levels (should stay < 3/10 during exercise)"
        ],
        "criteriaToProgress": [
          "Able to perform 15 single leg squats (partial range)",
          "VISA-P > 70"
        ],
        "exercises": [
          {
            "name": "Slow Leg Press (Single leg focus)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Controlled loading to encourage collagen synthesis"
          },
          {
            "name": "Bulgarian Split Squats",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "High torque functional load for the quadriceps and glutes"
          },
          {
            "name": "Spanish Squat (Belt/Band)",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "High isometric and tension component for patellar/quad tendon"
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
          "Pain =3/10 at rest",
          "Swelling resolving",
          "Ready for progressive loading"
        ],
        "exercises": [
          {
            "name": "Isometric Activation (primary muscles)",
            "parameters": "3  10 reps, 510 sec hold",
            "clinicalCueRationale": "Sub-maximal  maintain activation without loading injury"
          },
          {
            "name": "Adjacent Joint ROM",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain mobility in joints proximal and distal to injury"
          },
          {
            "name": "Gentle Aerobic Conditioning",
            "parameters": "20 min",
            "clinicalCueRationale": "Bike, pool, or arm ergometer  based on injury site"
          },
          {
            "name": "Cryotherapy / Compression",
            "parameters": "1520 min  34/day",
            "clinicalCueRationale": "Oedema and pain management"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Moderate Loading & Scapular Stability",
        "timeline": "Week 38",
        "goals": [
          "Address proximal mechanics",
          "Improve biceps tendon load tolerance",
          "Normalize shoulder rhythm"
        ],
        "precautions": [
          "Avoid heavy eccentric bicep work initially",
          "Stop if sharp pain in bicipital groove"
        ],
        "criteriaToProgress": [
          "Full AROM without shrug sign",
          "Pain-free isometric bicep contraction at 90"
        ],
        "exercises": [
          {
            "name": "Hammers Curls (Slow)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Load the distal/proximal bicep in a neutral, stable position"
          },
          {
            "name": "Scapular Squeezes with Resistance",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Provide a stable foundation for the humeral head"
          },
          {
            "name": "Serratus Wall Slides",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Ensure proper upward rotation of the scapula to offload the bicep"
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
        "timeline": "Week 04",
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
          "Pain =3/10",
          "Internal rotation ROM improving",
          "Ready for cuff strengthening"
        ],
        "exercises": [
          {
            "name": "Sleeper Stretch",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Address posterior capsule tightness  critical for SLAP"
          },
          {
            "name": "Cross-body Stretch",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Complementary to sleeper stretch"
          },
          {
            "name": "Isometric ER/IR (neutral)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Rotator cuff activation to stabilise head in socket"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening & Labral Protection",
        "timeline": "Week 612",
        "goals": [
          "Strengthen rotator cuff with arm in neutral",
          "Improve dynamic humeral head stability",
          "Gentle increase in biceps loading"
        ],
        "precautions": [
          "Avoid repetitive overhead reaching",
          "No sudden pulling movements"
        ],
        "criteriaToProgress": [
          "Pain-free AROM to 150",
          "Stable labrum during testing",
          "Symmetrical strength in rotator cuff"
        ],
        "exercises": [
          {
            "name": "PNF Patterns (Diagonals)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Neuromuscular coordination and integrated shoulder strength"
          },
          {
            "name": "Internal Rotation at 0 (Band)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Subscapularis activation for anterior stabilization"
          },
          {
            "name": "Bicep Isometric holds (Short lever)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Conditioning the labral attachment without high strain"
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
        "timeline": "Week 04",
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
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain stable base for GH joint"
          },
          {
            "name": "Isometric Rotator Cuff (neutral)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Focus on ER  infraspinatus acts as posterior guard"
          },
          {
            "name": "Rhythmic Stabilisation (supine, 90 flexion)",
            "parameters": "3  1 min",
            "clinicalCueRationale": "Neuromuscular control of GH joint"
          }
        ]
      }
    ]
  },
  {
    "name": "Supraspinatus Tear (Partial  Conservative)",
    "category": "Shoulder",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Isometric Loading & Scapular Base",
        "timeline": "Week 04",
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
          "Pain =3/10",
          "VISA-S score improving",
          "Scapular control achieved"
        ],
        "exercises": [
          {
            "name": "Isometric Abduction (hand at side)",
            "parameters": "5  45 sec, submaximal",
            "clinicalCueRationale": "Tendon loading policy  analgesia through load"
          },
          {
            "name": "Scapular Setting (Wall slides)",
            "parameters": "3  15 reps, slow",
            "clinicalCueRationale": "Control of upward rotation"
          },
          {
            "name": "Sleeper Stretch",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Address GIRD/Posterior capsule  reduced compressive load on cuff"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Symptom Inhibition & Initial Load",
        "timeline": "Week 04",
        "goals": [
          "Reduce pain during reaching",
          "Establish rotator cuff activation (submax)",
          "Correct scapular posture"
        ],
        "precautions": [
          "Avoid repetitive overhead lifting early",
          "Monitor for night pain"
        ],
        "criteriaToProgress": [
          "VAS pain < 3/10 during ADLs",
          "Negative painful arc range"
        ],
        "exercises": [
          {
            "name": "Shoulder External Rotation Isometrics",
            "parameters": "10  10 sec",
            "clinicalCueRationale": "Safe initiation of cuff tension without joint shear"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Isotonic Loading & Scapular Stability",
        "timeline": "Week 412",
        "goals": [
          "Gradual loading of the rotator cuff",
          "Improve scapulohumeral rhythm",
          "Incorporate eccentric work"
        ],
        "precautions": [
          "Maintain movement quality over resistance weight",
          "Avoid compensations with upper trapezius"
        ],
        "criteriaToProgress": [
          "Full ROM with 2kg resistance",
          "Symmetrical scapular control during descent"
        ],
        "exercises": [
          {
            "name": "Scapular Pushes (Wall)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Improve serratus anterior recruitment for stability"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Power & Sport Specificity",
        "timeline": "Week 12+",
        "goals": [
          "Full return to overhead tasks/sport",
          "Increase upper limb rate of force development",
          "Long-term tendon health"
        ],
        "precautions": [
          "Gradual return to high-volume throwing/hitting",
          "Pace volume spikes"
        ],
        "criteriaToProgress": [
          "Symmetrical rotator cuff strength",
          "Confident performance in sport-specific tests"
        ],
        "exercises": [
          {
            "name": "Plyometric Ball Throws (Floor)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Explosive cuff stabilization"
          }
        ]
      }
    ]
  },
  {
    "name": "Calcific Tendinitis",
    "category": "Shoulder",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Management & Desensitisation",
        "timeline": "Week 02",
        "goals": [
          "Management of severe pain",
          "Decrease muscle spasm",
          "Maintain PROM",
          "Education"
        ],
        "precautions": [
          "Pain can be extremely high  use ice/medication",
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
            "parameters": "3  5 min",
            "clinicalCueRationale": "Passive synovial fluid circulation  essential for pain relief"
          },
          {
            "name": "Cervical/Elbow ROM",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Address secondary guarding in neck and elbow"
          },
          {
            "name": "Ice and Position Education",
            "parameters": "15 min, 4 daily",
            "clinicalCueRationale": "Sleep slightly upright to reduce pressure"
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
        "timeline": "Week 04",
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
          "Pain =3/10 during isometrics",
          "Morning stiffness <15 min",
          "Ulnar nerve symptoms reducing"
        ],
        "exercises": [
          {
            "name": "Isometric Wrist Flexion (table edge)",
            "parameters": "5  45 sec, 7080% effort",
            "clinicalCueRationale": "Immediate analgesic effect  elbow at 90, forearm supinated"
          },
          {
            "name": "Isometric Grip (ball/putty)",
            "parameters": "5  45 sec",
            "clinicalCueRationale": "Flexor-pronator activation without provocative movement"
          },
          {
            "name": "Isometric Pronation (resistance)",
            "parameters": "3  10 reps, 10 sec hold",
            "clinicalCueRationale": "Pronator teres component  important in throwing/golf"
          },
          {
            "name": "Ulnar Nerve Slider",
            "parameters": "3  10 reps each",
            "clinicalCueRationale": "Elbow flex/ext with wrist and shoulder  neural mobility"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Isotonic Loading & Grip Strength",
        "timeline": "Week 48",
        "goals": [
          "Load the common flexor origin eccentrically",
          "Improve grip power",
          "Establishing neutral wrist mechanics"
        ],
        "precautions": [
          "Avoid repetitive throwing motions initially",
          "Monitor for pain over medial elbow"
        ],
        "criteriaToProgress": [
          "Pain-free grip > 70% other side"
        ],
        "exercises": [
          {
            "name": "Eccentric Wrist Flexion",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Load the tendon to promote remodeling"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Isotonic Strengthening",
        "timeline": "Week 48",
        "goals": [
          "Restore flexor-pronator strength",
          "Increase tendon load tolerance",
          "Return to functional activities"
        ],
        "precautions": [
          "Avoid heavy grip during acute flair-ups",
          "Ensure proper grip mechanics during exercise"
        ],
        "criteriaToProgress": [
          "Pain-free wrist flexion with 2kg",
          "No morning stiffness > 10 min"
        ],
        "exercises": [
          {
            "name": "Wrist Flexion (Eccentric focus)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Load the common flexor origin - stimulate remodeling"
          },
          {
            "name": "Forearm Pronation (Hammer or weighted bar)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Target pronator teres - key component of medial elbow pain"
          },
          {
            "name": "Finger Squeezes (Elastic band around fingers)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Intrinsic muscle endurance supports the medial joint line"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Functional Power & Return to Sport",
        "timeline": "Week 816",
        "goals": [
          "Return to golf/tennis/manual work",
          "Integrated upper limb power",
          "Maximal grip resilience"
        ],
        "precautions": [
          "Monitor for \"flare-ups\" during high-velocity swings"
        ],
        "criteriaToProgress": [
          "Full pain-free sport participation"
        ],
        "exercises": [
          {
            "name": "Hammer Rotations (Slow)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Integrated supinator/pronator loading"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Conditioning & Prevention",
        "timeline": "Month 4+",
        "goals": [
          "Maintenance of tendon health",
          "Prevention of recurrence through global arm strength",
          "Independent care"
        ],
        "precautions": [
          "Pacing the load"
        ],
        "criteriaToProgress": [
          "Zero activity restrictions"
        ],
        "exercises": [
          {
            "name": "Farmer's Walk",
            "parameters": "3  30 meters",
            "clinicalCueRationale": "Global grip and shoulder stability"
          }
        ]
      }
    ]
  },
  {
    "name": "UCL Sprain (Elbow)",
    "category": "Elbow & Wrist",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Protection & Early Mobilisation",
        "timeline": "Week 04",
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
          "Pain =3/10 at rest and with AROM",
          "Full elbow AROM within brace limits",
          "No ulnar nerve symptoms"
        ],
        "exercises": []
      },
      {
        "phaseNumber": 2,
        "title": "Dynamic Loading & Stability",
        "timeline": "Week 412",
        "goals": [
          "Full ROM restoration",
          "Strengthen flexor-pronator mass for dynamic support",
          "Progressive loading of the UCL"
        ],
        "precautions": [
          "STRICT: No valgus stress (no throwing)",
          "Monitor for medial joint line opening"
        ],
        "criteriaToProgress": [
          "Full pain-free extension and flexion",
          "Strong flexor-pronator muscle group"
        ],
        "exercises": [
          {
            "name": "Wrist Flexion with resistance",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Flexor muscles provide 30-40% of valgus stability"
          },
          {
            "name": "Weighted Forearm Rotation",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Rotatory stability of the ulnohumeral joint"
          },
          {
            "name": "Bicep Curls (Neutral spine)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "General upper limb stability"
          }
        ]
      }
    ]
  },
  {
    "name": "Carpal Tunnel Syndrome",
    "category": "Elbow & Wrist",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Neural Desensitisation & Symptom Control",
        "timeline": "Week 06",
        "goals": [
          "Reduce median nerve symptoms",
          "Wrist splinting in neutral",
          "Identify provocative postures"
        ],
        "precautions": [
          "Urgent referral if muscle atrophy",
          "Splint MUST be in neutral (0)",
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
            "parameters": "3  10 reps each",
            "clinicalCueRationale": "Wrist neutral, extend fingers, oppose thumb  gentle neural gliding"
          },
          {
            "name": "Tendon Gliding Exercises",
            "parameters": "3  10 reps each position",
            "clinicalCueRationale": "Reduces adhesions around flexor tendons in canal"
          },
          {
            "name": "Workplace Ergonomic Assessment",
            "parameters": "Once",
            "clinicalCueRationale": "Keyboard height, mouse position  major modifiable risk"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening & Functional Integration",
        "timeline": "Week 612",
        "goals": [
          "Restore grip and pinch strength",
          "Full neural mobility",
          "Safe return to loaded tasks"
        ],
        "precautions": [
          "Monitor for return of night symptoms",
          "Avoid repetitive end-range wrist flexion during heavy work"
        ],
        "criteriaToProgress": [
          "No numbness at rest",
          "Grip strength > 90% other side",
          "Negative Phalen's test"
        ],
        "exercises": [
          {
            "name": "Pinch Strength (Putty or clip)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Thenar muscle conditioning - compensate for median nerve fatigue"
          },
          {
            "name": "Median Nerve Tensioning (Gentle)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Progress from sliders to mild tensioning for full neural mobility"
          },
          {
            "name": "Wrist Extension with Light Weight",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Antagonist strengthening helps maintain a neutral channel position"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Advanced Strengthening & ADL Integration",
        "timeline": "Week 816",
        "goals": [
          "Return to full work/manual tasks",
          "Address global upper limb deficits",
          "Maintain neural mobility"
        ],
        "precautions": [
          "Monitor for return of night-time tingling",
          "Avoid heavy vibratory tool use initially"
        ],
        "criteriaToProgress": [
          "Pinch/Grip strength symmetry > 90%",
          "Zero constant numbness"
        ],
        "exercises": [
          {
            "name": "Weighted Wrist Extension/Flexion",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Load tolerance for the forearm muscles"
          },
          {
            "name": "Precision Pinch Drills (Fine items)",
            "parameters": "5 min daily",
            "clinicalCueRationale": "Fine motor coordination"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Ergonomic Resilience & Maintenance",
        "timeline": "Month 4+",
        "goals": [
          "Lifetime management of symptoms",
          "Optimize ergonomic posture",
          "Wrist resilience"
        ],
        "precautions": [
          "Maintain frequent micro-breaks during typing",
          "Regular neural gliding"
        ],
        "criteriaToProgress": [
          "Full functional ability at work/sport"
        ],
        "exercises": [
          {
            "name": "Median Nerve Sliders (Integrated into warm-up)",
            "parameters": "10 reps daily",
            "clinicalCueRationale": "Prevent chronic adhesion"
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
        "title": "Immobilization & Calming",
        "timeline": "Week 0-3",
        "goals": [
          "Reduce pain at radial styloid",
          "Protect APL/EPB tendons",
          "Establish pain-free ROM"
        ],
        "precautions": [
          "Avoid repetitive thumb abduction/extension",
          "Wear spica splint for resting"
        ],
        "criteriaToProgress": [
          "Neg Finkelstein test",
          "Pain VAS < 2/10"
        ],
        "exercises": []
      },
      {
        "phaseNumber": 1,
        "title": "Load Reduction & Isometric Loading",
        "timeline": "Week 04",
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
          "Pain =3/10 during isometrics",
          "Morning stiffness <15 min",
          "Finkelstein's sign reducing"
        ],
        "exercises": [
          {
            "name": "Isometric Thumb Abduction (against fixed surface)",
            "parameters": "5  45 sec, 7080% effort",
            "clinicalCueRationale": "APL + EPB activation  immediate analgesia"
          },
          {
            "name": "Thumb and Wrist AROM (pain-free)",
            "parameters": "3  20 reps each",
            "clinicalCueRationale": "Maintain mobility  avoid ulnar deviation at end-range"
          },
          {
            "name": "Cryotherapy",
            "parameters": "15 min  34/day",
            "clinicalCueRationale": "Reduce first dorsal compartment inflammation"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Mobilization & Early Loading",
        "timeline": "Week 3-8",
        "goals": [
          "Active ROM without pain",
          "Early isometric activation",
          "ADL integration"
        ],
        "precautions": [
          "Stop if sharp pain returns over tendons",
          "No heavy lifting/grip"
        ],
        "criteriaToProgress": [
          "Full active ROM thumb/wrist"
        ],
        "exercises": []
      },
      {
        "phaseNumber": 2,
        "title": "Progressive Loading & Mobilisation",
        "timeline": "Week 48",
        "goals": [
          "Full pain-free thumb and wrist ROM",
          "Progress from isometrics to concentric/eccentric loading",
          "Normalize lifting mechanics"
        ],
        "precautions": [
          "Stop if sharp pain returns over the radial styloid",
          "Avoid excessive hammering movements initially"
        ],
        "criteriaToProgress": [
          "Pain-free resisted thumb abduction",
          "Negative Finkelstein test",
          "Full radial deviation AROM"
        ],
        "exercises": [
          {
            "name": "Eccentric Thumb Abduction (Weighted)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Stimulate tendon repair in the first dorsal compartment"
          },
          {
            "name": "Radial Deviation Strengthening",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Target APL and EPB muscles in their functional plane"
          },
          {
            "name": "Tennis Ball Squeezes",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Integrated grip and thumb stability"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Advanced Strength & Return to Activity",
        "timeline": "Week 8-16",
        "goals": [
          "Restore full grip/pinch power",
          "Tendon loading into extension",
          "Return to manual sport/work"
        ],
        "precautions": [
          "Gradual return to repetitive tasks",
          "Monitor for swelling"
        ],
        "criteriaToProgress": [
          "Grip strength symmetry > 90%"
        ],
        "exercises": [
          {
            "name": "Resisted Thumb Abduction (Rubber band)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Load the APL/EPB tendons in a controlled manner"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Discharge & High Level Function",
        "timeline": "Month 4+",
        "goals": [
          "Independent management",
          "Ergonomic optimization",
          "Maintenance of strength"
        ],
        "precautions": [
          "Pacing the load",
          "Maintain flexibility"
        ],
        "criteriaToProgress": [
          "Full pain-free sport participation"
        ],
        "exercises": [
          {
            "name": "Wrist Stability in Neutral (Holding weights)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Static stability for daily tasks"
          }
        ]
      }
    ]
  },
  {
    "name": "Scaphoid Fracture (Post-immobilisation)",
    "category": "Elbow & Wrist",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Immobilisation & Protection",
        "timeline": "Week 08+",
        "goals": [
          "Protect fracture site",
          "Custom cast maintenance",
          "Digital/Thumb mobility",
          "Shoulder/Elbow ROM"
        ],
        "precautions": [
          "Strict compliance with casting  blood supply is critical",
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
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain tendon gliding while wrist is casted"
          },
          {
            "name": "Thumb ROM (within cast limits)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Limit CMC stiffness"
          },
          {
            "name": "Shoulder/Elbow AROM",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Address secondary stiffness from \"sling-posture\""
          }
        ]
      }
    ]
  },
  {
    "name": "TFCC Injury (Conservative)",
    "category": "Elbow & Wrist",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Immobilisation & Load Management",
        "timeline": "Week 06",
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
            "parameters": "3  15 reps each position",
            "clinicalCueRationale": "Prevent adhesion while wrist motion restricted"
          },
          {
            "name": "Pain-free Isometric Wrist Stability",
            "parameters": "3  10 reps, 5 sec",
            "clinicalCueRationale": "Co-contraction of wrist flexors/extensors"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Advanced Proprioception & Grip",
        "timeline": "Week 816",
        "goals": [
          "Maximize grip strength to stabilize the ulnar wrist",
          "Increase load in rotation/deviation",
          "Return to hand-heavy tasks"
        ],
        "precautions": [
          "Avoid sudden heavy impact (e.g. hitting boxing bag) initially",
          "Monitor for ulnar-sided aching"
        ],
        "criteriaToProgress": [
          "Grip strength > 90% other side",
          "Pain-free wrist rotation"
        ],
        "exercises": [
          {
            "name": "Wrist Stability in Supination (Weighted)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Specific loading for the TFCC ulnar-stabilizers"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Functional Resilience & Discharge",
        "timeline": "Month 4+",
        "goals": [
          "Independent work/sport participation",
          "Integrated forearm robustness",
          "Zero recurring instability"
        ],
        "precautions": [
          "Maintain eccentric forearm strength"
        ],
        "criteriaToProgress": [
          "Full functional pain-free ability"
        ],
        "exercises": [
          {
            "name": "Weight-bearing Holds (Push-up position)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Global wrist axial loading resilience"
          }
        ]
      }
    ]
  },
  {
    "name": "Femoroacetabular Impingement (FAI) Conservative",
    "category": "Hip",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Load Modification & Deep Hip Stability",
        "timeline": "Week 06",
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
          "Pain =3/10",
          "Deep rotators engaging"
        ],
        "exercises": [
          {
            "name": "Clamshells (hip position matters)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Target deep rotators  don't roll pelvis"
          },
          {
            "name": "Bridge with Band (Isometric abduction)",
            "parameters": "3  15 reps, 5 sec hold",
            "clinicalCueRationale": "Glute med activation in mid-range"
          },
          {
            "name": "Single-leg Stance (Pelvic level)",
            "parameters": "3  60 sec",
            "clinicalCueRationale": "Neuromuscular hip stability during loading"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strength & Dynamic Control",
        "timeline": "Week 616",
        "goals": [
          "Enhance proximal (core/hip) stability",
          "Safe increase in athletic loading",
          "Improve pelvic control"
        ],
        "precautions": [
          "Avoid combined Flexion/Internal Rotation (FADIR position)",
          "Monitor for groin \"catching\""
        ],
        "criteriaToProgress": [
          "Negative FADIR test for pain",
          "Symmetrical hip rotation strength",
          "Stable squat to 90"
        ],
        "exercises": [
          {
            "name": "Single Leg Squats (Partial range)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Develop neuromuscular control of the hip/knee/ankle axis"
          },
          {
            "name": "Copenhagen Plank (Short lever)",
            "parameters": "3  20 sec",
            "clinicalCueRationale": "Adductor endurance is protective for FAI and groin pain"
          },
          {
            "name": "Bird-Dog (Advanced)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Cross-body core stability to support pelvic tilt"
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
        "timeline": "Week 02",
        "goals": [
          "Reduce pain and muscle guarding",
          "Maintain hip ROM",
          "Early pain-free activation"
        ],
        "precautions": [
          "Avoid passive hip extension stretch early",
          "Avoid resisted hip flexion above 90",
          "Rule out avulsion in adolescents"
        ],
        "criteriaToProgress": [
          "Walking pain-free without antalgic gait",
          "Pain =3/10 during isometrics",
          "No pain at rest"
        ],
        "exercises": [
          {
            "name": "Isometric Hip Flexion (submaximal)",
            "parameters": "3  10 reps, 10 sec",
            "clinicalCueRationale": "Maintain muscle activation without excessive tension"
          },
          {
            "name": "Supine Hip AROM (flexion)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Prevent muscle shortening and maintain joint mobility"
          },
          {
            "name": "Core Activation (TrA drawing-in)",
            "parameters": "3  10 reps, 10 sec hold",
            "clinicalCueRationale": "Stabilise lumbar spine  reduce iliopsoas overload"
          },
          {
            "name": "Stationary Bike (low resistance, low seat)",
            "parameters": "1520 min",
            "clinicalCueRationale": "Maintain cardiovascular fitness  low-load hip flexion arc"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Initial Healing & Muscle Activation",
        "timeline": "Week 02",
        "goals": [
          "Protect the injury site",
          "Pain-free active movement",
          "Normalisation of pelvic alignment"
        ],
        "precautions": [
          "Avoid forced end-range hip extension stretching",
          "No high-impact running"
        ],
        "criteriaToProgress": [
          "Pain-free walking",
          "Full hip flexion AROM",
          "Negative SLR lag"
        ],
        "exercises": [
          {
            "name": "Seated Hip Flexion Isometrics",
            "parameters": "10  10 sec",
            "clinicalCueRationale": "Safe initiation of psoas activation"
          },
          {
            "name": "Pelvic Tilts (Supine)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Core-hip integration and postural reset"
          },
          {
            "name": "Supine Heel Slides",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintenance of mobility"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening & Functional Loading",
        "timeline": "Week 26",
        "goals": [
          "Restore full psoas torque",
          "Maintain core support during movement",
          "Safe return to linear jogging"
        ],
        "precautions": [
          "Monitor for \"groin tugging\" during sprints",
          "Progress load based on 24hr pain"
        ],
        "criteriaToProgress": [
          "Symmetrical strength during testing",
          "Pain-free jog/run"
        ],
        "exercises": [
          {
            "name": "Standing Hip Flexion with Resistance",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Functional loading of the hip flexors in standing"
          },
          {
            "name": "Dead-bugs (Level 2)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Core stability during moving hip loads"
          },
          {
            "name": "Lunge with Overhead Reach",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Dynamic functional lengthening"
          }
        ]
      }
    ]
  },
  {
    "name": "Adductor/Groin Strain",
    "category": "Hip",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Phase & Isometric Loading",
        "timeline": "Week 02",
        "goals": [
          "Reduce medial groin pain",
          "Early pain-free isometric loading",
          "Patient education  groin vs hernia"
        ],
        "precautions": [
          "Avoid aggressive passive stretching in reactive phase",
          "Crutches if antalgic gait",
          "Rule out pubic stress fracture"
        ],
        "criteriaToProgress": [
          "Walking pain-free without antalgic gait",
          "Isometric adduction strength =60% symmetry"
        ],
        "exercises": [
          {
            "name": "Isometric Adduction (Copenhagen, submaximal)",
            "parameters": "3  10 reps, 10 sec",
            "clinicalCueRationale": "Pain-free adductor activation  analgesic and anti-atrophy"
          },
          {
            "name": "Supine Hip Adduction (squeeze pillow)",
            "parameters": "3  20 reps, 5 sec hold",
            "clinicalCueRationale": "Isolated adductor loading without weight-bearing stress"
          },
          {
            "name": "Stationary Bike (low resistance)",
            "parameters": "1520 min",
            "clinicalCueRationale": "Cardiovascular maintenance  low adductor load"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening & Eccentric Load",
        "timeline": "Week 26",
        "goals": [
          "Progressively load the adductor complex",
          "Improve pelvic stability under load",
          "Begin linear running"
        ],
        "precautions": [
          "No sudden lateral changes of direction",
          "Monitor for \"tugging\" sensation in groin"
        ],
        "criteriaToProgress": [
          "Full pain-free eccentric adduction",
          "Symmetrical adductor strength",
          "Pain-free jog/run"
        ],
        "exercises": [
          {
            "name": "Copenhagen Adduction (Long lever/Level 2)",
            "parameters": "3  8 reps",
            "clinicalCueRationale": "High intensity adductor loading - evidence based for injury prevention"
          },
          {
            "name": "Lateral Lunges (Partial depth)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Frontal plane strength and eccentric control"
          },
          {
            "name": "Slider Adduction (Eccentric)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Controlled lengthening of the adductor fibers"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Return to High-Intensity Sport",
        "timeline": "Week 612",
        "goals": [
          "Full agility and reactive cutting",
          "Safe return to kicking and maximal sprinting",
          "Integrated pelvic/core power"
        ],
        "precautions": [
          "Monitor for groin pain during rapid cross-over steps",
          "Avoid excessive volume of kicking early"
        ],
        "criteriaToProgress": [
          "HAGOS score improvement",
          "Pain-free reactive multidirectional drills"
        ],
        "exercises": [
          {
            "name": "Crossover Sprints (Change of direction)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Specific adductor loading during rapid directional change"
          },
          {
            "name": "Kicking Drills (Short ? Long range)",
            "parameters": "Graded session",
            "clinicalCueRationale": "Functional sports demand re-integration"
          },
          {
            "name": "Copenhagen Plank (Integrated with movement)",
            "parameters": "10 reps each side",
            "clinicalCueRationale": "Maintain peak adductor resilience"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Match Play & Pelvic Robustness",
        "timeline": "12+ Weeks",
        "goals": [
          "Full return to competitive contact sport",
          "Maximal power during kick/shoot",
          "Pelvic-core resilience"
        ],
        "precautions": [
          "Avoid cumulative fatigue in the adductors during pre-season",
          "Maintain adductor flexibility"
        ],
        "criteriaToProgress": [
          "HAGOS Score > 90",
          "Grip strength (adductor squeeze) symmetry"
        ],
        "exercises": [
          {
            "name": "Copenhagen Plank (Level 3 - Propped)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Maintenance of peak adductor strength"
          },
          {
            "name": "Reactive Cutting Drills (Chaos)",
            "parameters": "10 min",
            "clinicalCueRationale": "Address neural response during rapid directional changes"
          },
          {
            "name": "Full Sprints with Kicking",
            "parameters": "Graded session",
            "clinicalCueRationale": "integrated high-velocity specific task loading"
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
        "timeline": "Week 04",
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
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Tension-free neural excursion  don't force it"
          },
          {
            "name": "Soft Tissue Release (Tennis ball/Foam roller)",
            "parameters": "2 min gentle",
            "clinicalCueRationale": "Self-massage to piriformis belly  avoid focal nerve pressure"
          },
          {
            "name": "Diaphragmatic Breathing",
            "parameters": "5 min, 3 daily",
            "clinicalCueRationale": "Reduce pelvic floor / deep gluteal guarding"
          },
          {
            "name": "Standing Glute Squeezes",
            "parameters": "3  15 reps, 5 sec",
            "clinicalCueRationale": "Neuromuscular resetting of the gluteal group"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening & Sciatic Glide",
        "timeline": "Week 412",
        "goals": [
          "Address underlying hip weakness",
          "Normalize nerve mobility",
          "Safe return to prolonged sitting"
        ],
        "precautions": [
          "Avoid aggressive direct pressure on the piriformis",
          "Stop if leg numbing increases"
        ],
        "criteriaToProgress": [
          "Pain-free prolonged sitting (30 min)",
          "Negative SLR test for neural tension",
          "Strong gluteal group"
        ],
        "exercises": [
          {
            "name": "Glute Bridge with Band",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Strengthen Glute Max/Med to offload the Piriformis - which often overworks as a stabilizer"
          },
          {
            "name": "Sciatic Nerve Sliders (Seated)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Tensioning/Sliding the nerve through the piriformis canal"
          },
          {
            "name": "Hip External Rotation (Isometric to Isotonic)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Re-train the deep rotators for dynamic stability"
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
        "timeline": "Weeks 08",
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
          "Pain controlled to =4/10",
          "Walking 20 min without significant pain",
          "Patient engaged with education"
        ],
        "exercises": [
          {
            "name": "Hydrotherapy / Aquatic Exercise",
            "parameters": "30 min, 3 per week",
            "clinicalCueRationale": "Offloaded exercise  ideal for high pain-severity OA"
          },
          {
            "name": "Stationary Bike",
            "parameters": "2030 min",
            "clinicalCueRationale": "Low-impact cardiovascular  hip ROM maintenance"
          },
          {
            "name": "Seated Hip AROM",
            "parameters": "3  20 reps each direction",
            "clinicalCueRationale": "Maintain synovial fluid circulation and prevent joint stiffening"
          },
          {
            "name": "Gentle Walking (paced)",
            "parameters": "2030 min daily",
            "clinicalCueRationale": "Best evidence for hip OA  graded activity"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Joint Loading & Global Strength",
        "timeline": "Week 612",
        "goals": [
          "Increase walking distance without limp",
          "Strengthen glutes and quads",
          "Improve joint lubrication"
        ],
        "precautions": [
          "Avoid high-impact jumping",
          "Use anti-inflammatories if flare-ups occur"
        ],
        "criteriaToProgress": [
          "Walk 20 min without increased pain",
          "Positive trend in WOMAC score",
          "Improved balance and gait"
        ],
        "exercises": [
          {
            "name": "Standing Hip Abduction (Band)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Improve lateral stability for gait"
          },
          {
            "name": "Water Aerobics (Walking/leg lifts)",
            "parameters": "30 min session",
            "clinicalCueRationale": "Low-impact resisted exercise  buoyant relief"
          },
          {
            "name": "Stair Step-downs (Controlled)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Eccentric control of the knee/hip complex"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "High Level Function & Maintenance",
        "timeline": "Week 12+",
        "goals": [
          "Maximise muscle power",
          "Independent management of flares",
          "Return to desired hobbies (Golf, Hiking, etc.)"
        ],
        "precautions": [
          "Monitor for \"bone-on-bone\" grinding during high load",
          "Continue weight management if applicable"
        ],
        "criteriaToProgress": [
          "Full participation in hobbies",
          "High confidence in joint stability"
        ],
        "exercises": [
          {
            "name": "Weighted Goblet Squats (To tolerance)",
            "parameters": "3  8 reps",
            "clinicalCueRationale": "Building peak strength to support the degenerate joint surface"
          },
          {
            "name": "Farmer's Walks",
            "parameters": "3  30 meters",
            "clinicalCueRationale": "Integrated core and hip stability under load"
          },
          {
            "name": "Single Leg Mini-Squats",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Proprioceptive and strength maintenance for daily tasks"
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
        "timeline": "Week 04",
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
          "Pain =3/10 during daily activities"
        ],
        "exercises": [
          {
            "name": "Hip AROM (pain-free arcs, slow)",
            "parameters": "3  20 reps each",
            "clinicalCueRationale": "Controlled movement through range  identify and avoid snap arc"
          },
          {
            "name": "Iliopsoas Isometric (for internal type)",
            "parameters": "3  10 reps, 10 sec hold",
            "clinicalCueRationale": "Maintain muscle activation without provocative snap movement"
          },
          {
            "name": "IT Band / Hip Abductor Stretching",
            "parameters": "3  45 sec each",
            "clinicalCueRationale": "Reduce IT band tension over greater trochanter"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Kinematic Control & Strengthening",
        "timeline": "Week 412",
        "goals": [
          "Restore normal hip mechanics",
          "Strengthen stabilizing muscles",
          "Pain-free return to high-flexion tasks"
        ],
        "precautions": [
          "Control pelvic tilt during squats",
          "No sudden ballistic high kicks"
        ],
        "criteriaToProgress": [
          "Abolition of the painful snap",
          "Symmetrical hip strength in all planes"
        ],
        "exercises": [
          {
            "name": "Dead-bugs (Stability focus)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Control the iliopsoas attachment on the spine and femur"
          },
          {
            "name": "Side-lying Leg Circles (Large and Small)",
            "parameters": "3  10 reps each",
            "clinicalCueRationale": "Target gluteal control through full circumduction"
          },
          {
            "name": "Eccentric Hip Flexion (Standing with band)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Target the psoas component - especially for internal snapping"
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
        "timeline": "Week 04",
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
          "Pain =3/10 during ADLs",
          "Knee flexion ROM full",
          "Medial point tenderness reduced"
        ],
        "exercises": [
          {
            "name": "Isometric Quad Sets",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain knee stability without bursal irritation"
          },
          {
            "name": "Adductor Strengthening (Light)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Address muscle balance around the pes anserine tendons"
          },
          {
            "name": "Hamstring Isometrics (Seated)",
            "parameters": "3  15 reps, 5 sec",
            "clinicalCueRationale": "Gentle activation to maintain tone without friction"
          },
          {
            "name": "Ice and Padding Education",
            "parameters": "10 min",
            "clinicalCueRationale": "Reduce focal inflammation"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Symptom Inhibition & Biomechanical Correction",
        "timeline": "Week 03",
        "goals": [
          "Reduce inflammation of the bursa",
          "Correct valgus loading patterns",
          "Maintain knee ROM"
        ],
        "precautions": [
          "Avoid repetitive weighted knee flexion past 90",
          "No heavy running on canted surfaces"
        ],
        "criteriaToProgress": [
          "Reduced medial joint line tenderness",
          "Full pain-free extension"
        ],
        "exercises": [
          {
            "name": "Hamstring Stretch (Medial focus)",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Reduce direct pressure on the bursa from the sartorius/gracilis/semitendinosus"
          },
          {
            "name": "Hip Abduction (Resistance band)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Correct medial knee collapse (valgus)"
          },
          {
            "name": "Terminal Knee Extension (TKE)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Quad control in last 15 degrees of extension"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Load Progressive & Functional Strength",
        "timeline": "Week 38",
        "goals": [
          "Strengthen medial knee stabilizers",
          "Integrated hip/knee power",
          "Return to full ADLs/Running"
        ],
        "precautions": [
          "漸進的 Monitor volume spikes in running",
          "No painful lateral cutting moves"
        ],
        "criteriaToProgress": [
          "Symmetrical lower limb strength",
          "Pain-free run > 15 min"
        ],
        "exercises": [
          {
            "name": "Lateral Lunges (Controlled)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Frontal plane strength and control"
          },
          {
            "name": "Weighted Glute Bridges",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Posterior chain recruitment to offload the knee"
          },
          {
            "name": "Step-ups (Lateral step)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Functional control for ADLs"
          }
        ]
      }
    ]
  },
  {
    "name": "Baker's Cyst",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Effusion Control & Mobility",
        "timeline": "Week 03",
        "goals": [
          "Reduce posterior knee pressure",
          "Address primary knee pathology (Meniscus/OA)",
          "Improve ROM"
        ],
        "precautions": [
          "Avoid extreme end-range flexion (knee-to-chest)",
          "No aggressive posterior compression"
        ],
        "criteriaToProgress": [
          "Reduced swelling/cyst size",
          "Improved flexion AROM"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps",
            "parameters": "20 reps every hour",
            "clinicalCueRationale": "Fluid drainage and circulatory health"
          },
          {
            "name": "Quad Sets (Towel roll)",
            "parameters": "10  10 sec",
            "clinicalCueRationale": "Promote joint pumping without high flexion"
          },
          {
            "name": "Gentle Heel Slides (Pain-free range)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Restore ROM without compressing the cyst"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Effusion Management & Joint Protection",
        "timeline": "Week 04",
        "goals": [
          "Control joint swelling (effusion)",
          "Address primary intra-articular pathology (e.g. meniscus)",
          "Maintain mobility"
        ],
        "precautions": [
          "Cyst itself is often secondary  don't just treat the cyst",
          "Avoid forceful end-range knee flexion",
          "Avoid aggressive impact"
        ],
        "criteriaToProgress": [
          "Knee effusion reduced",
          "Pain-free knee flexion >110",
          "Ready for weight-bearing progression"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps",
            "parameters": "10 reps every hour",
            "clinicalCueRationale": "Circulation and muscle pump  reduces global leg edema"
          },
          {
            "name": "Heel Slides (pain-free range)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Controlled mobility to manage synovial fluid flow"
          },
          {
            "name": "Quad Sets",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain extension  extension is often lost when effusion is high"
          },
          {
            "name": "Compression Wrap",
            "parameters": "All day",
            "clinicalCueRationale": "Graduated compression from foot to mid-thigh"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening & Underlying Pathology",
        "timeline": "Week 38",
        "goals": [
          "Strengthen quads and glutes to offload the knee joint",
          "Functional ROM restoration",
          "Improve gait"
        ],
        "precautions": [
          "Avoid sudden heavy impact",
          "Ensure no clicking/locking if meniscus is involved"
        ],
        "criteriaToProgress": [
          "Normal gait mechanics",
          "No recurring swelling with activity",
          "Symmetrical strength"
        ],
        "exercises": [
          {
            "name": "Straight Leg Raises",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Quad strength without joint compression"
          },
          {
            "name": "Glute Bridges",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Proximal support for the knee joint"
          },
          {
            "name": "Calf Stretching (Gentle)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Reduce tightness contributing to posterior pressure"
          }
        ]
      }
    ]
  },
  {
    "name": "Tibial Plateau Fracture (Post-op)",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Protection & Immobilization",
        "timeline": "Week 06",
        "goals": [
          "Protect the tibial articular surface",
          "Maintain knee ROM (Locked brace)",
          "Circulatory health"
        ],
        "precautions": [
          "STRICT: Non-weight bearing (NWB) or touch-WB only",
          "Avoid active knee extension against resistance"
        ],
        "criteriaToProgress": [
          "Stable hardware visible on X-ray",
          "Surgical site healed"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps",
            "parameters": "20 reps every hour",
            "clinicalCueRationale": "Essential DVT prophylaxis during NWB phase"
          },
          {
            "name": "Passive Knee ROM (In brace)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Prevent arthrofibrosis"
          },
          {
            "name": "Upper Body Conditioning",
            "parameters": "3 sessions per week",
            "clinicalCueRationale": "Maintain general fitness during immobilization"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Protection & ROM Initiation",
        "timeline": "Week 06",
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
          "Knee flexion =90",
          "Radiological stability confirmed"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps / Circles",
            "parameters": "10  hourly",
            "clinicalCueRationale": "Critical DVT prophylaxis in NWB phase"
          },
          {
            "name": "Passive/Active-Assisted Knee Flexion",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Gravity-assisted off side of bed or heel slides"
          },
          {
            "name": "Patellar Mobilisation",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Prevent patellofemoral adhesions post-plate application"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Mobilisation & Weight Bearing Transitions",
        "timeline": "Week 612",
        "goals": [
          "Progress from PWB to FWB (as per surgeon)",
          "Restore full ROM",
          "Symmetrical quad activation"
        ],
        "precautions": [
          "Monitor for \"weight-bearing pain\" - reporting joint collapse",
          "Avoid impact jumping"
        ],
        "criteriaToProgress": [
          "Full WB without significant pain",
          "Negative Trendelenburg test during PWB"
        ],
        "exercises": [
          {
            "name": "Mini-Squats (Assisted)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Controlled shared-axial loading"
          },
          {
            "name": "Leg Press (Very light)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Safe resistance training through functional arc"
          },
          {
            "name": "Step-ups (Low step)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Functional control for gait re-education"
          }
        ]
      }
    ]
  },
  {
    "name": "Knee Osteoarthritis (Conservative)",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Control & Functional Loading",
        "timeline": "Week 08",
        "goals": [
          "Reduce chronic knee pain",
          "Improve weight-bearing tolerance",
          "Strengthen shock-absorbing muscles (quads)",
          "Weight management education"
        ],
        "precautions": [
          "Avoid high-impact activities in flare-ups",
          "Exercise into mild discomfort (=3/10) is safe and beneficial",
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
            "parameters": "1530 min daily",
            "clinicalCueRationale": "Cartilage lubrication through cyclic loading"
          },
          {
            "name": "Sit-to-Stand (Functional Strength)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Builds quadriceps and gluteal strength for ADLs"
          },
          {
            "name": "Terminal Knee Extension (banded)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Focus on VMO and lockout strength"
          },
          {
            "name": "Step-ups / Step-downs (low)",
            "parameters": "3  10 reps each leg",
            "clinicalCueRationale": "Neuromuscular control during weight-bearing"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strength & Functional Loading",
        "timeline": "Week 816",
        "goals": [
          "Strengthen quadriceps and hamstrings",
          "Improve joint lubrication through movement",
          "Restore gait mechanics"
        ],
        "precautions": [
          "Avoid deep impact (jumping)",
          "Monitor for effusion after session"
        ],
        "criteriaToProgress": [
          "Improved KOOS/WOMAC score",
          "Walk 30 min with ease",
          "Stable knee during stairs"
        ],
        "exercises": [
          {
            "name": "Wall Squats with Ball",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Develop quad strength with supported spine and controlled range"
          },
          {
            "name": "Step-downs (Mirror biofeedback)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Critical for stair navigation and patellar tracking"
          },
          {
            "name": "Leg Press (Moderate weight)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Multi-joint strengthening with minimal joint shear compared to open chain"
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
          "Pain =3/10 at rest",
          "Swelling resolving",
          "Ready for progressive loading"
        ],
        "exercises": [
          {
            "name": "Isometric Activation",
            "parameters": "3  10 reps, 510 sec",
            "clinicalCueRationale": "Sub-maximal  maintain activation without loading injured tissue"
          },
          {
            "name": "Adjacent Joint ROM",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain mobility in joints proximal and distal to injury"
          },
          {
            "name": "Gentle Aerobic Conditioning",
            "parameters": "20 min",
            "clinicalCueRationale": "Bike, pool, or arm ergometer  based on injury site"
          }
        ]
      }
    ]
  },
  {
    "name": "Meniscectomy (Post-operative)",
    "category": "Knee",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Early Mobilisation & Effusion Control",
        "timeline": "Week 02",
        "goals": [
          "Reduce joint swelling",
          "Restore full knee extension",
          "Initiate quadriceps activation",
          "Normalise gait"
        ],
        "precautions": [
          "WBAT (Weight Bearing As Tolerated)",
          "Avoid deep squats >90 initially",
          "Monitor for persistent swelling"
        ],
        "criteriaToProgress": [
          "Knee extension 0",
          "Knee flexion =110",
          "Minimal effusion",
          "No lag on SLR (Straight Leg Raise)"
        ],
        "exercises": [
          {
            "name": "Heel Slides with Towel",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain mobility  use towel for overpressure"
          },
          {
            "name": "Quadriceps Isometrics (Quad sets)",
            "parameters": "3  20 reps, 10 sec hold",
            "clinicalCueRationale": "Bridge the neuro-muscular gap post-op"
          },
          {
            "name": "Straight Leg Raise (SLR)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain proximal hip strength without knee stress"
          },
          {
            "name": "Patellar Mobilisation",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Prevent adhesions in the suprapatellar pouch"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening & Functional Loading",
        "timeline": "Week 26",
        "goals": [
          "Full ROM",
          "Normal gait without assistive device",
          "Symmetrical quadriceps activation"
        ],
        "precautions": [
          "Avoid deep impact jumping initially",
          "Monitor for swelling after loading sessions"
        ],
        "criteriaToProgress": [
          "Full flexion/extension",
          "Able to perform 20 bodyweight squats",
          "No joint line tenderness"
        ],
        "exercises": [
          {
            "name": "Mini-Squats with Stability",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Closed chain muscle work with proprioceptive focus"
          },
          {
            "name": "Single-leg Balance (Level 2)",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Dynamic terminal knee stability"
          },
          {
            "name": "Step-ups (Mirror feedback)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Functional control for stairs"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Return to Sport / High Impact",
        "timeline": "Week 612",
        "goals": [
          "Full return to previous activity levels",
          "Maximise lower limb power",
          "Prevent recurring effusion"
        ],
        "precautions": [
          "Monitor joint for swelling after agility work",
          "Soft landing mechanics in plyometrics"
        ],
        "criteriaToProgress": [
          "Step-down test perfection",
          "Hop test symmetry > 90%"
        ],
        "exercises": [
          {
            "name": "Shuttle Sprints",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Linear agility and deceleration control"
          },
          {
            "name": "Single-leg Box Jumps",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Peak explosive power"
          },
          {
            "name": "Skipping (Double under focus)",
            "parameters": "3  2 min",
            "clinicalCueRationale": "Neuromuscular stiffness and conditioning"
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
        "timeline": "Week 04",
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
          "Pain =3/10 during isometrics",
          "Morning stiffness <15 min",
          "VISA-P improving"
        ],
        "exercises": [
          {
            "name": "Isometric Eversion (band, mid-range)",
            "parameters": "5  45 sec, 7080% effort",
            "clinicalCueRationale": "Foot on floor, push outward  immediate analgesic effect"
          },
          {
            "name": "Isometric Plantarflexion (wall)",
            "parameters": "5  45 sec",
            "clinicalCueRationale": "Maintain tendon activation without provoking pain"
          },
          {
            "name": "Single-leg Balance (stable surface)",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Proprioceptive loading with minimal tendon stress"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Isotonic Loading & Stability",
        "timeline": "Week 412",
        "goals": [
          "Increase tendon load tolerance",
          "Improve lateral ankle stability",
          "Address biomechanical factors"
        ],
        "precautions": [
          "No sudden lateral changes of direction",
          "Avoid excessive inversion on uneven ground"
        ],
        "criteriaToProgress": [
          "Pain-free resisted eversion",
          "Stable single leg stance"
        ],
        "exercises": [
          {
            "name": "Eccentric Eversion (Band)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "The gold standard for peroneal remodeling"
          },
          {
            "name": "Lateral Skaters (Low impact)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Frontal plane control during lateral movement"
          },
          {
            "name": "Single Leg Stance on Airex Pad",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Challenge the eversors for reactive stabilization"
          }
        ]
      }
    ]
  },
  {
    "name": "Posterior Tibial Tendon Dysfunction",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute / Offloading",
        "timeline": "Week 04",
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
          "Pain =3/10 with weight bearing",
          "Swelling resolving",
          "Ready for progressive loading"
        ],
        "exercises": [
          {
            "name": "Isometric Tibialis Posterior (arch doming)",
            "parameters": "3  10 reps, 10 sec hold",
            "clinicalCueRationale": "Short foot exercise  dome arch without curling toes"
          },
          {
            "name": "Seated Calf Raises (bilateral)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Low load  avoid full single-leg load in acute phase"
          },
          {
            "name": "Pool Walking / Hydrotherapy",
            "parameters": "20 min",
            "clinicalCueRationale": "Offloaded functional walking  excellent early option"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Impact & Agility Integration",
        "timeline": "Week 12+",
        "goals": [
          "Maximize arch support through muscle power",
          "Return to running/jumping",
          "Address mid-foot stability"
        ],
        "precautions": [
          "Increase mileage slowly",
          "Monitor for \"medial arch fatigue\""
        ],
        "criteriaToProgress": [
          "Positive single-leg heel raise x 20",
          "Zero pain with jumping"
        ],
        "exercises": [
          {
            "name": "Single Leg Hops (Medial focus)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Reactive power for the medial longitudinal arch stabilizers"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Conditioning & Maintenance",
        "timeline": "Month 6+",
        "goals": [
          "Independent participation",
          "Prevention of arch collapse recurrence",
          "Lifetime foot health"
        ],
        "precautions": [
          "Maintain arch strengthening routine"
        ],
        "criteriaToProgress": [
          "Full pain-free sport participation"
        ],
        "exercises": [
          {
            "name": "Weighted Heel Raises (Single leg)",
            "parameters": "3  15 reps (heavy)",
            "clinicalCueRationale": "Maintenance of tendon structural health"
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
        "timeline": "Week 04",
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
            "parameters": "3  15 reps, 5 sec",
            "clinicalCueRationale": "Strengthen peroneals to support lateral ankle"
          },
          {
            "name": "Short Foot Exercise (Arch lifting)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Provide intrinsic stability  unload sinus tarsi"
          },
          {
            "name": "Single-leg Balance (Level ground)",
            "parameters": "3  60 sec",
            "clinicalCueRationale": "Neuromuscular retraining is critical for chronic cases"
          },
          {
            "name": "Calf Stretching (Gentle)",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Reduce equinus load on subtalar joint"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Protection & Stabilisation",
        "timeline": "Week 04",
        "goals": [
          "Control subtalar joint inflammation",
          "Improve lateral ankle stability",
          "Establish neutral foot alignment"
        ],
        "precautions": [
          "Avoid forced inversion and eversion movements",
          "Limit duration of standing on hard surfaces"
        ],
        "criteriaToProgress": [
          "Minimal pain over sinus tarsi",
          "Normal gait without compensation"
        ],
        "exercises": [
          {
            "name": "Single Leg Stance (Firm ground)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Neuromuscular stabilization of the subtalar joint"
          },
          {
            "name": "Intrinsic Foot Curls (Towel)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Strengthen small muscles to support the arch and sinus tarsi area"
          },
          {
            "name": "Ankle Eversion Isometrics",
            "parameters": "10  10 sec",
            "clinicalCueRationale": "Establish peroneal control without joint shear"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Dynamic Stability & Initial Loading",
        "timeline": "Week 412",
        "goals": [
          "Full functional loading",
          "Proprioceptive challenge on unstable surfaces",
          "Preparation for impact"
        ],
        "precautions": [
          "Monitor for \"locking\" or sharp pain on uneven ground",
          "No high-speed lateral agility yet"
        ],
        "criteriaToProgress": [
          "Able to stand on one leg on foam for 30 sec",
          "Pain-free walking > 30 min"
        ],
        "exercises": [
          {
            "name": "Single Leg Stance on Airex Pad",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "High-level proprioceptive training"
          },
          {
            "name": "Heel Raises (Unilateral)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Functional strength for push-off"
          },
          {
            "name": "Slow Walking on uneven surfaces (Grass)",
            "parameters": "5 min activity",
            "clinicalCueRationale": "Challenge the subtalar joint in a safe environment"
          }
        ]
      }
    ]
  },
  {
    "name": "5th Metatarsal Fracture (Jones Fracture)",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Immobilisation / Protected Loading",
        "timeline": "Week 06",
        "goals": [
          "Protect fracture healing",
          "Non-weight bearing or heel-bearing as per surgeon",
          "Prevent calf atrophy"
        ],
        "precautions": [
          "High risk of non-union  do NOT rush loading",
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
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain intrinsic muscle activation while casted"
          },
          {
            "name": "Knee/Hip ROM (Active)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Address proximal conditioning in NWB phase"
          },
          {
            "name": "Isometric Hip Abduction (Side-lying)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Core and hip stability  preparation for gait return"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Non-Weight Bearing & Protection",
        "timeline": "Week 06",
        "goals": [
          "Protect the poorly vascularized zone",
          "Minimize calf atrophy",
          "Improve intrinsic foot mobility"
        ],
        "precautions": [
          "STRICT: No weight bearing unless cleared by X-ray",
          "Avoid inversion of the foot"
        ],
        "criteriaToProgress": [
          "Radiographic evidence of early callus",
          "Minimal surgical/injury pain"
        ],
        "exercises": [
          {
            "name": "Open Chain Toe Curls",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain intrinsic muscle activation without loading the bone"
          },
          {
            "name": "Active Ankle ROM (Dorsiflexion/Eversion only)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain mobility of the ankle joint"
          },
          {
            "name": "Quadriceps/Hip Strengthening (Seated)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain global limb conditioning during non-WB phase"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Progressive Loading & Balance",
        "timeline": "Week 612",
        "goals": [
          "Full WB in walking boot/shoe",
          "Restore gait symmetry",
          "Initiate balance training"
        ],
        "precautions": [
          "Avoid repetitive lateral impact",
          "Monitor for \"aching\" at fracture site"
        ],
        "criteriaToProgress": [
          "Full pain-free WB",
          "Radiographic union confirmed"
        ],
        "exercises": [
          {
            "name": "Seated Calf Raises",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Gentle loading of the gastroc/soleus complex"
          },
          {
            "name": "Tandem Standing (Supported)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Re-educate balance on fixed base"
          },
          {
            "name": "Resistance Band Eversion (Gentle)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Strengthen peroneus brevis - be careful with high tension"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Return to Play & Impact",
        "timeline": "Week 12+",
        "goals": [
          "Full return to sport/running mileage",
          "Maximal power at push-off",
          "Long-term bone health maintenance"
        ],
        "precautions": [
          "Monitor for \"aching\" after sports spikes",
          "Ensure shoe cushioning is adequate"
        ],
        "criteriaToProgress": [
          "Full pain-free sport participation",
          "Symmetry in hopping tests > 95%"
        ],
        "exercises": [
          {
            "name": "Single-leg Pogo Hops",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Tendon stiffness and elastic energy development"
          },
          {
            "name": "Suicide Sprints",
            "parameters": "5 rounds",
            "clinicalCueRationale": "Linear acceleration/deceleration under load"
          },
          {
            "name": "Ladder Drills (Agility)",
            "parameters": "5 min",
            "clinicalCueRationale": "Integrated footwork and coordination"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Performance Resilience & Maintenance",
        "timeline": "Month 6+",
        "goals": [
          "Maintain peak bone mineral density",
          "Integrated lower limb power",
          "Zero recurring aching"
        ],
        "precautions": [
          "Gradual return to high-volume lateral sports (Soccer/Tennis)",
          "Monitor for focal pain"
        ],
        "criteriaToProgress": [
          "Full unrestricted season play",
          "Hop symmetry > 95%"
        ],
        "exercises": [
          {
            "name": "Lateral Speed Skaters",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "High intensity frontal plane load to test the 5th metatarsal resilience"
          },
          {
            "name": "Weighted Heel Raises (Single leg)",
            "parameters": "3  12 reps (heavy)",
            "clinicalCueRationale": "Maintenance of calf power"
          },
          {
            "name": "Agility Ladders (Cross-over focus)",
            "parameters": "5 min",
            "clinicalCueRationale": "Integrated foot speed and lateral stability"
          }
        ]
      }
    ]
  },
  {
    "name": "Ankle Fracture ORIF (Post-op)",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Wound Healing & Early ROM",
        "timeline": "Week 04",
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
          "Dorsiflexion to neutral (0)"
        ],
        "exercises": [
          {
            "name": "Gentle Ankle AROM (PF/DF)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain joint nutrition  avoid inversion/eversion early"
          },
          {
            "name": "Toe ROM",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Prevent digital stiffness"
          },
          {
            "name": "Quad Sets / Hamstring Sets",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain leg activation while NWB"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Progressive Loading & Mobilisation",
        "timeline": "Week 612",
        "goals": [
          "Full weight bearing pain-free",
          "Restore dorsiflexion ROM",
          "Normalization of gait"
        ],
        "precautions": [
          "Follow official weight-bearing restrictions religiously",
          "Avoid impact until bony union confirmed by X-ray"
        ],
        "criteriaToProgress": [
          "Full pain-free WB with no limp",
          "Dorsiflexion > 15"
        ],
        "exercises": [
          {
            "name": "Weight-bearing Dorsiflexion Stretch (Knee to wall)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Improve functional ankle mobility for gait"
          },
          {
            "name": "Calf Raises (Bilateral to Unilateral)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Restore push-off power post immobilization"
          },
          {
            "name": "Tandem Walking",
            "parameters": "3  10 meters",
            "clinicalCueRationale": "Dynamic balance on a narrow base of support"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Impact & Agility Integration",
        "timeline": "Week 12+",
        "goals": [
          "Full sport-specific agility",
          "Confident multi-planar loading",
          "Full impact tolerance"
        ],
        "precautions": [
          "Monitor for \"aching\" after sports",
          "Ensure hardware isn't causing focal tenderness with shoes"
        ],
        "criteriaToProgress": [
          "Full pain-free sport participation",
          "Symmetrical hop test results"
        ],
        "exercises": [
          {
            "name": "Ladder Drills (High speed)",
            "parameters": "5 min daily",
            "clinicalCueRationale": "Speed and coordination integration"
          },
          {
            "name": "Figure-8 Runs",
            "parameters": "5 rounds",
            "clinicalCueRationale": "Rotational and lateral loading of the ankle hardware"
          },
          {
            "name": "Weighted Single-leg Hops",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Maximal force attenuation capacity"
          }
        ]
      }
    ]
  },
  {
    "name": "Hallux Valgus (Post-surgical)",
    "category": "Ankle & Foot",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Management & Alignment Support",
        "timeline": "Week 08",
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
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Activate muscle that opposes bunion deformity"
          },
          {
            "name": "Short Foot (Arch doming)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Strong arch reduces forefoot splaying"
          },
          {
            "name": "Big Toe AROM (Flexion/Extension)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain joint mobility  prevent hallux rigidus"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Functional Strength & Foot Control",
        "timeline": "Week 612",
        "goals": [
          "Normalize gait cycle (Big toe push-off)",
          "Strengthen intrinsic foot muscles",
          "Full ROM of the MTP joint"
        ],
        "precautions": [
          "Ensure surgical site is fully healed",
          "Avoid narrow footwear during rehab"
        ],
        "criteriaToProgress": [
          "Pain-free big toe flexion",
          "Stable gait without compensation"
        ],
        "exercises": [
          {
            "name": "Short Foot Exercises (Arch lift)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Strengthen intrinsic muscles to support the medial arch"
          },
          {
            "name": "Big Toe Isolations (Lifting toe alone)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Neuromuscular control of the hallux"
          },
          {
            "name": "Towel Curls",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Global foot intrinsic and extrinsic flexibility"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Functional Loading & Return to Sport",
        "timeline": "Week 8-12+",
        "goals": [
          "Normal push-off power during running",
          "Return to sport-specific footwear",
          "Integrated balance"
        ],
        "precautions": [
          "Monitor for great toe joint pain with high impact",
          "Avoid narrow-toebox shoes initially"
        ],
        "criteriaToProgress": [
          "Full pain-free transition to all shoes",
          "Stable great toe joint on movement"
        ],
        "exercises": [
          {
            "name": "Toe Walks (Impact focus)",
            "parameters": "3  20 meters",
            "clinicalCueRationale": "Functional strengthening of the great toe under load"
          },
          {
            "name": "Single-leg Stance (Unstable surface)",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Neuromuscular support for the medial arch"
          },
          {
            "name": "Short Foot in dynamic squat",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Incorporate intrinsic support into global movement"
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
        "timeline": "Week 04",
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
          "Pain =3/10 during isometric loading",
          "Minimal morning stiffness",
          "Improved gait quality"
        ],
        "exercises": [
          {
            "name": "Isometric Dorsiflexion",
            "parameters": "5  45 sec, 70% effort",
            "clinicalCueRationale": "High load isometric prevents further atrophy  painless activation"
          },
          {
            "name": "Modified Lacing Education",
            "parameters": "Ongoing",
            "clinicalCueRationale": "Skip eyelets over the most sensitive area of the tendon"
          },
          {
            "name": "Deep Intrinsic Arch Strengthening",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Address midfoot collapse which increases TA load"
          }
        ]
      }
    ]
  },
  {
    "name": "Spinal Stenosis (Lumbar  Conservative)",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Symptom Management & Flexion-Based Mobility",
        "timeline": "Week 06",
        "goals": [
          "Reduce neurogenic claudication",
          "Identify directional preference (flexion)",
          "Improve walking tolerance"
        ],
        "precautions": [
          "Avoid lumbar extension  narrows spinal canal further",
          "Monitor for progressive neurological deficit",
          "Cauda equina symptoms = emergency"
        ],
        "criteriaToProgress": [
          "Walking tolerance improving (>10 min)",
          "Pain =4/10 with daily activities",
          "Understanding of symptom-relief positions"
        ],
        "exercises": []
      },
      {
        "phaseNumber": 2,
        "title": "Endurance & Stability",
        "timeline": "Week 612",
        "goals": [
          "Improve walking tolerance",
          "Strengthen core and hip stabilizers",
          "Maximize functional flexion range"
        ],
        "precautions": [
          "Avoid prolonged lumbar extension",
          "Monitor for claudication symptoms",
          "No heavy lifting"
        ],
        "criteriaToProgress": [
          "Able to walk 20 min without stopping",
          "Symmetrical hip flexion strength"
        ],
        "exercises": [
          {
            "name": "Knee-to-Chest with Core Bracing",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Open the intervertebral canal while activating the transverse abdominis"
          },
          {
            "name": "Glute Bridges (Maintain posterior tilt)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Strengthen glutes to help reduce anterior pelvic tilt during walking"
          },
          {
            "name": "Seated Forward Fold (Gentle)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Decompress the posterior neural structures"
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
        "timeline": "Week 03",
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
          "Pain =3/10 with daily activities",
          "Lumbar ROM improving (flexion)",
          "Morning stiffness under 30 min"
        ],
        "exercises": [
          {
            "name": "Knee-to-Chest Stretches",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Flexion unloads facet joint  primary pain-relief position"
          },
          {
            "name": "Lumbar Rotation Stretch",
            "parameters": "3  30 sec each",
            "clinicalCueRationale": "Gentle facet mobilisation  stop at pain barrier"
          },
          {
            "name": "Posterior Pelvic Tilt (standing, wall)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Reduce lumbar lordosis  offload posterior facets"
          },
          {
            "name": "Walking (paced)",
            "parameters": "1520 min  2/day",
            "clinicalCueRationale": "Controlled loading  better than rest"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Load Progressive & Dynamic Stability",
        "timeline": "Week 38",
        "goals": [
          "Restore pain-free rotation and extension",
          "Increase spinal load tolerance",
          "Integrated core/pelvic control"
        ],
        "precautions": [
          "Stop if \"locking\" sensation returns",
          "Avoid explosive twists"
        ],
        "criteriaToProgress": [
          "Full pain-free spine ROM",
          "Able to hold plank for 45 sec",
          "No sharp pain with quadrant testing"
        ],
        "exercises": [
          {
            "name": "Bird-Dog (With resistance level 2)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Rotational stability challenge for the multifidus"
          },
          {
            "name": "Side Plank with Leg Abduction",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "High demand on lateral stabilizers to offload facet joints"
          },
          {
            "name": "Thoracic Rotations (Seated)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Ensure mobility is not all coming from the lumbar segments"
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
        "timeline": "Week 04",
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
          "Pain =3/10 with daily activities",
          "SIJ provocation tests reducing",
          "Able to stand single-leg 10 sec"
        ],
        "exercises": [
          {
            "name": "Posterior Pelvic Tilt (supine)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Transversus abdominis activation  force closure of SIJ"
          },
          {
            "name": "Clamshell (band)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Gluteus medius  reduces SIJ shear via posterior oblique sling"
          },
          {
            "name": "Inner Range Quad (SLR in slight flexion)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "VMO + hip stabiliser activation  reduce pelvic instability"
          }
        ]
      }
    ]
  },
  {
    "name": "Piriformis / Sciatic Nerve Compression",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Neural Decompression & Symptom Control",
        "timeline": "Week 06",
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
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Large amplitude, low tension neural excursion"
          },
          {
            "name": "Soft Tissue Release (Gluteal region)",
            "parameters": "2 min",
            "clinicalCueRationale": "Reduce external compression on nerve path"
          },
          {
            "name": "Dorsiflexion/Plantarflexion Circles",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintains neural mobility at the distal end (peroneal/tibial branches)"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Neural Protection & Symptom Control",
        "timeline": "Week 04",
        "goals": [
          "Calm neural irritability",
          "Identify site of compression",
          "Maintain general fitness"
        ],
        "precautions": [
          "Avoid aggressive stretching (no Slump/SLR stretches)",
          "Avoid prolonged sitting on hard surfaces"
        ],
        "criteriaToProgress": [
          "Reduced neural hypersensitivity",
          "Negative tension signs at rest"
        ],
        "exercises": [
          {
            "name": "Sciatic Nerve Sliders (Lying)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Tension-free nerve gliding to improve mobility"
          },
          {
            "name": "Gentle Gluteal Mobility (No stretch)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Promote blood flow to the surrounding muscle bed"
          },
          {
            "name": "Transverse Abdominis Bracing",
            "parameters": "10  10 sec",
            "clinicalCueRationale": "Stabilize the lumbar spine to reduce proximal irritation"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Nerve Gliding & Functional Strength",
        "timeline": "Week 412",
        "goals": [
          "Improve nerve excursion",
          "Address gluteal/hip weakness",
          "Return to safe loaded ADLs"
        ],
        "precautions": [
          "Monitor for neuropathic \"flare-ups\" post-exercise",
          "Ensure spine neutral during loading"
        ],
        "criteriaToProgress": [
          "Negative Slump test",
          "Full pain-free lower limb strength"
        ],
        "exercises": [
          {
            "name": "Herman (Sciatic) Gliders (Active)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Active nerve mobility through functional ranges"
          },
          {
            "name": "Bird-Dog",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Core-hip integration"
          },
          {
            "name": "Deadlifts (Light/Technique)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Teach hip hinge to offload the nerve path"
          }
        ]
      }
    ]
  },
  {
    "name": "Cervical Facet Joint Pain",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Pain Control & Range Optimisation",
        "timeline": "Week 04",
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
          "Pain =3/10",
          "Minimal guarding of paraspinal muscles"
        ],
        "exercises": [
          {
            "name": "Cervical Retraction (Chin tuck)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Open facet joints and reduce focal loading"
          },
          {
            "name": "Gentle AROM Rotation (Pain-free)",
            "parameters": "3  10 reps each side",
            "clinicalCueRationale": "Movement as medicine  don't push into pain"
          },
          {
            "name": "Thoracic Extension (Foam roller)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Address thoracic stiffness to reduce cervical load"
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
        "timeline": "Week 03",
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
          "Pain =4/10 with daily activities",
          "Cervical ROM recovering (rotation)",
          "Yellow flags screened"
        ],
        "exercises": [
          {
            "name": "Cervical AROM  all planes (immediate)",
            "parameters": "3  10 reps each direction",
            "clinicalCueRationale": "Early movement is the single most important intervention"
          },
          {
            "name": "Cervical Retraction (chin tucks)",
            "parameters": "3  15 reps, 5 sec hold",
            "clinicalCueRationale": "Restore natural cervical curve  reduce facet tension"
          },
          {
            "name": "Heat Application",
            "parameters": "15 min  34/day",
            "clinicalCueRationale": "Reduce paraspinal muscle spasm  improve mobility"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Sensomotor Control & Proprioception",
        "timeline": "Week 38",
        "goals": [
          "Improve deep neck flexor endurance",
          "Restore cervico-cephalic proprioception",
          "Normalize scapular control"
        ],
        "precautions": [
          "Avoid heavy strength training for the neck too early",
          "Stop if dizziness or visual changes occur"
        ],
        "criteriaToProgress": [
          "Deep Neck Flexor Endurance (Cranio-cervical flexion) > 26mmHg/30sec",
          "Joint Position Sense (Laser tracking) accuracy improved"
        ],
        "exercises": [
          {
            "name": "Cranio-cervical Flexion (Pressure biofeedback)",
            "parameters": "10  10 sec holds",
            "clinicalCueRationale": "Re-educate the Longus Capitus/Colli - which are often inhibited post-WAD"
          },
          {
            "name": "Gaze Stability (VOR) Exercises",
            "parameters": "3  1 min",
            "clinicalCueRationale": "Essential for dizziness management and vestibular-neck coordination"
          },
          {
            "name": "Shoulder Blade Retraction/Depression",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Scapular set - reduce upper trap overactivity"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Dynamic Neck Stability & Resistance",
        "timeline": "Week 12+",
        "goals": [
          "Full cervical endurance",
          "Restore multi-planar stability",
          "Return to high-load activity"
        ],
        "precautions": [
          "Monitor for dizziness/headache after loading",
          "Avoid repetitive forceful jarring of the neck"
        ],
        "criteriaToProgress": [
          "Neck Disability Index < 10%",
          "Full pain-free range"
        ],
        "exercises": [
          {
            "name": "Resisted Neck Isometric (Band)",
            "parameters": "10  10 sec",
            "clinicalCueRationale": "Increase threshold for cervical muscle fatigue"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Functional Resilience & Discharge",
        "timeline": "Month 6+",
        "goals": [
          "Independent management",
          "Full social/work re-integration",
          "Postural robustness"
        ],
        "precautions": [
          "Maintain ergonomic breaks",
          "Global fitness integration"
        ],
        "criteriaToProgress": [
          "Zero activity restrictions"
        ],
        "exercises": [
          {
            "name": "Shoulder Shrugs (Weighted)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Integrated support for the cervical spine"
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
        "timeline": "Week 06",
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
          "Pain =4/10 with walking",
          "Fracture clinically stable",
          "Neurological status intact"
        ],
        "exercises": [
          {
            "name": "Breathing Exercises (diaphragmatic)",
            "parameters": "5 min  4/day",
            "clinicalCueRationale": "Maintain chest expansion  prevents pneumonia"
          },
          {
            "name": "Isometric Gluteal Sets",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain hip extensor activation without spinal loading"
          },
          {
            "name": "Hip Extension in Standing (gentle)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Posterior chain activation  neutral spine maintained"
          }
        ]
      }
    ]
  },
  {
    "name": "Scheuermann's Kyphosis (Conservative)",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Postural Correction & Tissue Length",
        "timeline": "Week 08",
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
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Address anterior tightness causing rounded shoulders"
          },
          {
            "name": "Thoracic Extensions (Wall-supported)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Progressive extension range focus"
          },
          {
            "name": "Prone Y/W Exercise",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Strengthen lower/mid traps  postural anchor"
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
        "timeline": "Week 06",
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
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Neural unloading through gentle cyclic motion"
          },
          {
            "name": "Deep Core Activation (Dead bug)",
            "parameters": "3  10 reps",
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
    "name": "Post-Laminectomy Rehabilitation",
    "category": "Spine",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Immediate Post-operative",
        "timeline": "Week 04",
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
          "Pain =4/10 with walking"
        ],
        "exercises": [
          {
            "name": "Ankle Pumps",
            "parameters": "10  every hour",
            "clinicalCueRationale": "DVT prevention  begin in recovery room"
          },
          {
            "name": "Walking (hospital corridors)",
            "parameters": "510 min  34/day",
            "clinicalCueRationale": "Early mobilisation is safe and improves outcomes"
          },
          {
            "name": "Log Roll Technique",
            "parameters": "Every position change",
            "clinicalCueRationale": "Protect operative site  engage core before movement"
          },
          {
            "name": "Quad Sets + Ankle Pumps",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain lower limb activation while mobility limited"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Stabilization & Functional Loading",
        "timeline": "Week 612",
        "goals": [
          "Improve core musculature",
          "Dynamic spinal stability",
          "Increase walking endurance to 45 min"
        ],
        "precautions": [
          "Follow surgeon specific weight lifting restrictions",
          "Avoid combined flexion/rotation under load"
        ],
        "criteriaToProgress": [
          "Incision fully healed",
          "Increased neural mobility (SLR improve)",
          "Pain-free simple ADLs"
        ],
        "exercises": [
          {
            "name": "Dead Bug (Level 1)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Anti-extension core control - protecting the posterior surgical site"
          },
          {
            "name": "Walking (Graded Program)",
            "parameters": "30-45 min daily",
            "clinicalCueRationale": "Aerobic fitness and neural gliding"
          },
          {
            "name": "Neural Glide (Slump slider)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Prevent post-op scar tissue adhesions around the nerve root"
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
        "timeline": "Week 06",
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
            "parameters": "Nightly  030 flexion",
            "clinicalCueRationale": "Reduces cubital tunnel pressure"
          },
          {
            "name": "Nerve Gliding  Ulnar Nerve Slider",
            "parameters": "3  10 reps each arm",
            "clinicalCueRationale": "Gentle excursion, NOT if acute"
          },
          {
            "name": "Intrinsic Hand Strengthening",
            "parameters": "3  20 reps, light",
            "clinicalCueRationale": "Maintain hand strength  finger abduction/pinch"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Neural Mobility & Strengthening",
        "timeline": "Week 612",
        "goals": [
          "Restore ulnar nerve glide",
          "Address elbow and wrist weakness",
          "Reduce nocturnal symptoms"
        ],
        "precautions": [
          "Avoid prolonged elbow flexion (> 90)",
          "Monitor for intrinsic muscle wasting"
        ],
        "criteriaToProgress": [
          "Full pain-free AROM",
          "Negative Tinel's at elbow",
          "Grip strength > 75% other side"
        ],
        "exercises": [
          {
            "name": "Ulnar Nerve Slider (Waiters Tray)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Gentle gliding of the nerve through the cubital tunnel"
          },
          {
            "name": "Intrinsic Muscle Strengthen (Lumbrical hold)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintenance of the small muscles of the hand affected by ulnar neuropathy"
          },
          {
            "name": "Wrist Flexion with resistance",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Strengthen the flexor carpi ulnaris (FCU) - common site of compression"
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
        "title": "Nerve Protection & Desensitization",
        "timeline": "Week 04",
        "goals": [
          "Reduce mechanosensitivity of radial nerve",
          "Address myofascial tightness in supinator",
          "Pain-free ADLs"
        ],
        "precautions": [
          "Avoid repetitive forceful pronation/supination",
          "No heavy lifting/grip"
        ],
        "criteriaToProgress": [
          "Reduced tenderness over radial tunnel",
          "Improved neural sliders ROM"
        ],
        "exercises": [
          {
            "name": "Radial Nerve Sliders",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Tension-free gliding to reduce intraneural edema"
          },
          {
            "name": "Forearm Extensor Stretch (Gentle)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Decompress the common extensor origin"
          },
          {
            "name": "Soft Tissue Release (Myofascial)",
            "parameters": "Daily 5 min",
            "clinicalCueRationale": "Relax the supinator muscle where the nerve exits"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Neural Unloading & Activity Modification",
        "timeline": "Week 06",
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
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Gently glide the nerve  avoid tingling/numbness"
          },
          {
            "name": "Supinator Gentle Stretching",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Elbow extended, forearm pronated  open the tunnel"
          },
          {
            "name": "Wrist Extension Isometrics (Painless)",
            "parameters": "3  15 reps, 5 sec",
            "clinicalCueRationale": "Maintain tendon tone without aggressive nerve stimulation"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Gradual Loading & Stability",
        "timeline": "Week 412",
        "goals": [
          "Increase forearm load tolerance",
          "Improve grip strength",
          "Integrated elbow/wrist stability"
        ],
        "precautions": [
          "Monitor for \"burning\" nerve pain after loading",
          "Progress rotation speed slowly"
        ],
        "criteriaToProgress": [
          "Pain-free grip strength > 80%",
          "Negative radial nerve tension test"
        ],
        "exercises": [
          {
            "name": "Wrist Extension with Band",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Gradual loading of the extensor carpi radialis brevis"
          },
          {
            "name": "Pronation/Supination (Hammer rotation)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Isotonic loading of the supinator complex"
          },
          {
            "name": "Power Putty Isometric Grip",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Static load to build endurance"
          }
        ]
      }
    ]
  },
  {
    "name": "Trigger Finger (Post-injection / Post-op)",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "A1 Pulley Protection & ROM",
        "timeline": "Week 04",
        "goals": [
          "Reduce inflammation at A1 pulley",
          "Maintain DIP/PIP joint mobility",
          "Prevent locking"
        ],
        "precautions": [
          "Avoid repetitive \"clicking\" or locking",
          "No heavy gripping"
        ],
        "criteriaToProgress": [
          "Reduced frequency of locking",
          "Pain-free morning ROM"
        ],
        "exercises": [
          {
            "name": "Blocking Exercises (DIP/PIP)",
            "parameters": "5 reps every 2h",
            "clinicalCueRationale": "Ensure individual joint gliding without high tension"
          },
          {
            "name": "Passive extension stretch",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Maintain tendon length"
          },
          {
            "name": "Tendon Glides (Hook fist only)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Minimize excursion through A1 pulley while moving"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Inflammation Control & Tendon Protection",
        "timeline": "Week 04",
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
            "clinicalCueRationale": "Prevents pulley irritation  allows tendon volume to reduce"
          },
          {
            "name": "Tendon Gliding Exercises (Blocking)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "DIP/PIP isolate motion to move tendon within sheath without full snap"
          },
          {
            "name": "Passive Digital ROM",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain range without active pulley stress"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening & Functional Use",
        "timeline": "Week 48",
        "goals": [
          "Restore full grip power",
          "Symmetrical manual dexterity",
          "Maintenance of symptoms"
        ],
        "precautions": [
          "Stop if \"clicking\" persists with resistance",
          "Avoid high volume repetitive finger work"
        ],
        "criteriaToProgress": [
          "No locking for 2 weeks",
          "Grip strength symmetry > 90%"
        ],
        "exercises": [
          {
            "name": "Rubber Band Finger Opening",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Strengthen extensors to help counter flexor tightness"
          },
          {
            "name": "Light Putty Grasp",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Integrated functional grip"
          },
          {
            "name": "Dexterity Drills (Coin sorting)",
            "parameters": "5 min daily",
            "clinicalCueRationale": "Fine motor coordination training"
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
        "timeline": "Week 08",
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
            "parameters": "24 hours/day  8 weeks",
            "clinicalCueRationale": "Zero flexion tolerance  maintain extension with one hand while changing"
          },
          {
            "name": "PIP Joint AROM",
            "parameters": "5  10 reps, hourly",
            "clinicalCueRationale": "Maintain PIP and MCP mobility while DIP immobilised"
          },
          {
            "name": "Oedema Management",
            "parameters": "Continuous + 5 min",
            "clinicalCueRationale": "Reduce swelling  facilitates splint compliance"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Immobilisation & Protection",
        "timeline": "Week 08",
        "goals": [
          "Maintain terminal extensor tendon healing",
          "Prevent DIP joint lag",
          "Active PIP/MP mobility"
        ],
        "precautions": [
          "STRICT: No DIP flexion (Avoid even briefly during splint changes)",
          "Keep skin dry under splint"
        ],
        "criteriaToProgress": [
          "Full healing of the tendon/bone",
          "No extension lag at 8 weeks"
        ],
        "exercises": [
          {
            "name": "Active PIP Flexion (While DIP is splinted)",
            "parameters": "10 reps every 2h",
            "clinicalCueRationale": "Maintenance of proximal finger and hand mobility"
          },
          {
            "name": "Active Web Space Opener",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Intrinsic muscle maintenance"
          },
          {
            "name": "Wrist ROM",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain global hand function"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Gradual Mobilisation",
        "timeline": "Week 812",
        "goals": [
          "Initiate active DIP flexion",
          "Monitor extensor lag",
          "Functional use of finger"
        ],
        "precautions": [
          "Avoid heavy lifting with the fingertip",
          "If lag returns, re-splint immediately"
        ],
        "criteriaToProgress": [
          "Active DIP flexion > 40",
          "Stable extension"
        ],
        "exercises": [
          {
            "name": "Gentle Active DIP Flexion",
            "parameters": "10 reps every 4h",
            "clinicalCueRationale": "Start with very light, controlled range"
          },
          {
            "name": "Light Pinch (Putty)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Integrated tip-to-tip coordination"
          },
          {
            "name": "Pick-up small items (dexterity)",
            "parameters": "5 min daily",
            "clinicalCueRationale": "Fine motor functional re-education"
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
        "timeline": "Week 06",
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
            "clinicalCueRationale": "Zero tolerance for flexion  allows central slip healing"
          },
          {
            "name": "DIP Joint Active Flexion",
            "parameters": "5  10 reps hourly",
            "clinicalCueRationale": "Pull lateral bands distally  prevents fixed deformity"
          },
          {
            "name": "Hand/Wrist ROM (except PIP)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain general hand function while PIP isolated"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Splinting & Protection",
        "timeline": "Week 06",
        "goals": [
          "Protect the central slip repair/injury",
          "Maintain DIP joint mobility",
          "Prevent fixed PIP flexion"
        ],
        "precautions": [
          "STRICT: No active PIP flexion",
          "Must wear extension splint 24/7"
        ],
        "criteriaToProgress": [
          "DIP joint full passive extension",
          "No lag at PIP with splint removed briefly"
        ],
        "exercises": [
          {
            "name": "Active DIP Flexion (With PIP splinted)",
            "parameters": "10 reps every 2h",
            "clinicalCueRationale": "Tightens the lateral bands and improves central slip excursion"
          },
          {
            "name": "Active Finger Extension (DIP/MP)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain general finger mobility"
          },
          {
            "name": "Spider Walks on Table (MP only)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "MP mobility without stressing PIP"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Gradual PIP Flexion & Strengthening",
        "timeline": "Week 612",
        "goals": [
          "Restore active PIP flexion",
          "Maintain full PIP extension",
          "Functional grip re-education"
        ],
        "precautions": [
          "Avoid forced passive flexion",
          "Monitor for return of \"lag\""
        ],
        "criteriaToProgress": [
          "Active PIP flexion to 90",
          "Full active extension maintained"
        ],
        "exercises": [
          {
            "name": "Active PIP Flexion (Unassisted)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Gentle initiation of flexor digitorum superficialis"
          },
          {
            "name": "Finger Squeezes (Foam ball)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Integrated functional grip"
          },
          {
            "name": "Tendon Gliding (Full Fist)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Full finger range coordination"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Advanced Strength & Hand Dexterity",
        "timeline": "Week 12+",
        "goals": [
          "Maximize grip and pinch power",
          "Stable hand function during high tasks",
          "Restore full finger coordination"
        ],
        "precautions": [
          "Avoid forced end-range flexion if extensor lag returns",
          "Monitor for swelling"
        ],
        "criteriaToProgress": [
          "Full functional use of hand",
          "Total AROM > pre-injury levels"
        ],
        "exercises": [
          {
            "name": "Weighted Finger Extensions",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Strengthen the extensor mechanism against load"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Discharge & Maintenance",
        "timeline": "Month 4+",
        "goals": [
          "Independent maintenance of range",
          "Functional resilience for work/hobby",
          "Prevention of recurrence"
        ],
        "precautions": [
          "Use protective splint for contact sports/impact",
          "Maintain intrinsic flexibility"
        ],
        "criteriaToProgress": [
          "Successful return to previous level of hand function"
        ],
        "exercises": [
          {
            "name": "Hand Grip (Heavy Putty)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Global hand power maintenance"
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
        "timeline": "Week 04",
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
            "parameters": "5  10 reps, every 2h",
            "clinicalCueRationale": "Rubber band traction flexes finger  patient actively extends"
          },
          {
            "name": "Place-and-Hold (modified Duran)",
            "parameters": "5  10 reps, every 2h",
            "clinicalCueRationale": "Passively position finger in flexion  hold 5 sec"
          },
          {
            "name": "Oedema Management",
            "parameters": "Continuous",
            "clinicalCueRationale": "Proximal to distal retrograde massage"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Active Motion & Early Gliding",
        "timeline": "Week 48",
        "goals": [
          "Initiate active flexion",
          "Maintain passive ROM",
          "Prevent dense adhesions"
        ],
        "precautions": [
          "NO RESISTANCE: No lifting or pulling",
          "Maintain protective splint as per therapist instruction"
        ],
        "criteriaToProgress": [
          "Differential tendon gliding achieved",
          "Active flexion to 50% of range"
        ],
        "exercises": [
          {
            "name": "Tendon Glides (Hook, Flat, Fist)",
            "parameters": "10 reps every 2h",
            "clinicalCueRationale": "Essential to prevent sticking of the tendon repair to the sheath"
          },
          {
            "name": "Active Finger Extension (In splint)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain extensor mechanism while protecting the flexor repair"
          },
          {
            "name": "Passive Finger Flexion (Blocking exercises)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Ensure individual joint mobility (DIP/PIP)"
          }
        ]
      }
    ]
  },
  {
    "name": "Extensor Tendon Repair",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Early Protected Motion (EPM)",
        "timeline": "Week 04",
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
            "parameters": "5  10 reps every 2h",
            "clinicalCueRationale": "Allows tendon excursion without high tension"
          },
          {
            "name": "Active Extension to Splint Stop",
            "parameters": "5  10 reps every 2h",
            "clinicalCueRationale": "Low tension activation to prevent adhesions"
          },
          {
            "name": "Digital Edema Massage",
            "parameters": "10 min",
            "clinicalCueRationale": "Proximal to distal  reduce bulk in tendon path"
          }
        ]
      }
    ]
  },
  {
    "name": "Dupuytren's Contracture (Post-surgical)",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Wound Healing & Early Extension",
        "timeline": "Week 04",
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
            "parameters": "3  15 reps each position",
            "clinicalCueRationale": "Prevent adhesions to surgical scar"
          },
          {
            "name": "Scar Massage (after wound closure)",
            "parameters": "5 min heavy pressure",
            "clinicalCueRationale": "Remodel fibrous tissue  key for long term mobility"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "ROM & Scar Management",
        "timeline": "Week 2-8",
        "goals": [
          "Maintain surgical correction",
          "Maximize finger extension",
          "Desensitize the surgical scar"
        ],
        "precautions": [
          "Must wear extension splint (especially at night)",
          "Monitor for skin breakdown over scar"
        ],
        "criteriaToProgress": [
          "Full active extension",
          "Healed wound",
          "Stable grip"
        ],
        "exercises": [
          {
            "name": "Composite Finger Extension Stretch",
            "parameters": "3  1 min",
            "clinicalCueRationale": "Counteract the contracture tendency post-operatively"
          },
          {
            "name": "Scar Massage (Gentle circular)",
            "parameters": "5 min daily",
            "clinicalCueRationale": "Softens the scar and prevents adherence to underlying tendons"
          },
          {
            "name": "Towel Grasp (Intrinsic work)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Functional grip re-education"
          }
        ]
      }
    ]
  },
  {
    "name": "Thumb UCL Sprain (Skier's Thumb)",
    "category": "Upper Limb",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Immobilisation & Protection",
        "timeline": "Week 06",
        "goals": [
          "Allow UCL ligament healing",
          "Protect MCP joint from valgus stress",
          "Maintain digital and wrist mobility"
        ],
        "precautions": [
          "High risk of Stener lesion (if grade III)  needs surgery",
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
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain hand function while thumb isolated"
          },
          {
            "name": "Wrist AROM (Gentle)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain wrist mobility  avoid thumb pull"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Immobilisation & Protection",
        "timeline": "Week 04",
        "goals": [
          "Protect the ulnar collateral ligament",
          "Maintain MP joint stability",
          "Wrist/Finger mobility"
        ],
        "precautions": [
          "Avoid any radial deviation force (valgus stress) on the thumb",
          "Must wear splint/spica as instructed"
        ],
        "criteriaToProgress": [
          "Reduced pain at the MCP joint",
          "No inflammation"
        ],
        "exercises": [
          {
            "name": "Active Tendon Gliding (Fingers 2-5)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Maintain hand function while thumb is protected"
          },
          {
            "name": "Wrist ROM (Within splint)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain proximal mobility"
          },
          {
            "name": "Gentle Thumb IP Flexion",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain distal thumb mobility"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Mobilisation & Early Grip",
        "timeline": "Week 412",
        "goals": [
          "Restore active thumb ROM",
          "Initiate early pinch and grip strength",
          "Functional use of the hand"
        ],
        "precautions": [
          "Avoid forceful \"key pinch\" initially",
          "Monitor for joint line tenderness"
        ],
        "criteriaToProgress": [
          "Pain-free grip strength > 70%",
          "Stable UCL on stress testing"
        ],
        "exercises": [
          {
            "name": "Thumb Opposition (Touch each fingertip)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Restore functional dexterity"
          },
          {
            "name": "Light Pinch (Putty)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Integrated thumb stability during load"
          },
          {
            "name": "Wrist extension with resistance",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintenance of hand-wrist complex stability"
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
        "timeline": "Week 03",
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
          "Pain =4/10 at rest",
          "Fracture site not tender",
          "Early callus on X-ray",
          "Ready for assisted motion"
        ],
        "exercises": [
          {
            "name": "Pendular (Codman) Exercises",
            "parameters": "3  5 min, 34/day",
            "clinicalCueRationale": "Gravity-assisted  passive glenohumeral motion"
          },
          {
            "name": "Elbow/Wrist/Hand AROM",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Prevent distal stiffness while in sling"
          },
          {
            "name": "Cervical ROM",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Reduce secondary cervical muscle guarding"
          },
          {
            "name": "Ice and Pain Management",
            "parameters": "15 min  46/day",
            "clinicalCueRationale": "Facilitates pendular motion compliance"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "AAROM & Early Strengthening",
        "timeline": "Week 410",
        "goals": [
          "Restore active shoulder ROM",
          "Introduce isometric strengthening",
          "Begin to wean from sling"
        ],
        "precautions": [
          "Avoid heavy lifting across body",
          "No forceful pushing/pulling"
        ],
        "criteriaToProgress": [
          "AAROM flexion > 140",
          "Stable healing visible on X-ray"
        ],
        "exercises": [
          {
            "name": "Cane Exercises (Flexion/ER)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Assisted range of motion with gradual effort"
          },
          {
            "name": "Shoulder Isometric Squeezes",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Early activation of the deltoid and rotator cuff without joint shear"
          },
          {
            "name": "Wall Slides (AAROM)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Gravity assisted elevation"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Mobilization & Muscle Recruitment",
        "timeline": "Week 612",
        "goals": [
          "Restore full passive and active ROM",
          "Early concentric resistance",
          "Normalise scapular motion"
        ],
        "precautions": [
          "Avoid heavy lifting (> 2kg) until clinical union confirmed",
          "No contact sports"
        ],
        "criteriaToProgress": [
          "Full active ROM in all planes",
          "X-ray showing callus formation"
        ],
        "exercises": [
          {
            "name": "Shoulder Pulley Extension",
            "parameters": "10 reps",
            "clinicalCueRationale": "Maintain joint mobility safely"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Resistance & Load Re-introduction",
        "timeline": "Week 1220",
        "goals": [
          "Return to previous strength levels",
          "Address global upper body deficits",
          "Initial explosive drills"
        ],
        "precautions": [
          "Monitor for focal pain over fracture site during loading"
        ],
        "criteriaToProgress": [
          "DASH Score < 10%",
          "Clinical union fully confirmed"
        ],
        "exercises": [
          {
            "name": "Dumbbell Rows",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Build posterior girdle strength to support the clavicle"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Functional Return & Maintenance",
        "timeline": "Month 5+",
        "goals": [
          "Full competitive return to sports",
          "Maintenance of shoulder health",
          "Fracture site resilience"
        ],
        "precautions": [
          "Zero pain with maximal loading"
        ],
        "criteriaToProgress": [
          "Full return to competition"
        ],
        "exercises": [
          {
            "name": "Overhead Press (Progressive)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Final check for bone and muscle loading capacity"
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
        "timeline": "Day 05",
        "goals": [
          "Reduce haematoma and inflammation",
          "Protect partial tear",
          "Maintain baseline strength",
          "Establish baseline measurements"
        ],
        "precautions": [
          "AVOID massage in first 4872h",
          "Avoid deep heat",
          "No passive stretching into pain"
        ],
        "criteriaToProgress": [
          "Walking pain-free",
          "Knee flexion =90",
          "Swelling stabilised",
          "Ready for loading"
        ],
        "exercises": [
          {
            "name": "Isometric Quadriceps (quad sets)",
            "parameters": "3  20 reps, sub-maximal",
            "clinicalCueRationale": "Pain-free activation  reduce atrophy without stress"
          },
          {
            "name": "Ankle Pumps",
            "parameters": "10 reps every hour",
            "clinicalCueRationale": "DVT prophylaxis  maintain circulation"
          },
          {
            "name": "Bike (low resistance)",
            "parameters": "1520 min",
            "clinicalCueRationale": "Cardiovascular maintenance  avoid if knee flexion painful"
          },
          {
            "name": "PRICE Protocol",
            "parameters": "15 min  46/day",
            "clinicalCueRationale": "Reduce haematoma formation"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening & Functional Loading",
        "timeline": "Week 24",
        "goals": [
          "Incorporate eccentric loading",
          "Restore full pain-free ROM",
          "Symmetrical strength during bodyweight exercises"
        ],
        "precautions": [
          "Avoid maximal knee extension early",
          "No ballistic kicking"
        ],
        "criteriaToProgress": [
          "Pain-free single leg squat (Partial)",
          "Able to jog 10 min without pain",
          "Symmetrical quad muscle bulk"
        ],
        "exercises": [
          {
            "name": "Slow Bodyweight Squats",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Load the quadriceps through functional range"
          },
          {
            "name": "Terminal Knee Extension (TKE) with band",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Isolate VMO activation for patellar tracking and stability"
          },
          {
            "name": "Single Leg Deadlift (B-Stance)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Core and hip stability while loading the lower limb"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "High Intensity Sport & Running",
        "timeline": "Week 48+",
        "goals": [
          "Full maximal sprint speed (100%)",
          "Safe reactive kicking",
          "Integrated lower limb power"
        ],
        "precautions": [
          "Monitor for quad \"tightness\" during maximal deceleration",
          "Gradual re-introduction of high-volume pivoting"
        ],
        "criteriaToProgress": [
          "Symmetrical quad strength",
          "Pain-free maximal kicking/striking",
          "Hop test symmetry > 95%"
        ],
        "exercises": [
          {
            "name": "Sprint Starts",
            "parameters": "5-8 reps, 20 meters",
            "clinicalCueRationale": "Specific loading in high-velocity lengthening"
          },
          {
            "name": "Agility Ladders (High speed)",
            "parameters": "5 min drils",
            "clinicalCueRationale": "Neuromuscular footwork speed and coordination"
          },
          {
            "name": "Broad Jumps into Sprint",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Explosive power and rapid transition to linear gait"
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
        "timeline": "Day 05",
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
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Prevent complete atrophy without stressing tear"
          },
          {
            "name": "Ankle Pumps (AROM)",
            "parameters": "10 reps every hour",
            "clinicalCueRationale": "Maintain ankle mobility  DVT prophylaxis"
          },
          {
            "name": "Stationary Bike",
            "parameters": "1520 min",
            "clinicalCueRationale": "Minimal plantarflexion force"
          },
          {
            "name": "PRICE Protocol",
            "parameters": "Every 46h",
            "clinicalCueRationale": "Compression bandage from forefoot to knee"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Isotonic Loading & Power Progress",
        "timeline": "Week 26",
        "goals": [
          "Restore full ankle dorsiflexion ROM",
          "Progression to single leg calf raise",
          "Begin linear gait speed increases"
        ],
        "precautions": [
          "Avoid sudden explosive push-offs",
          "Monitor for nocturnal calf cramping"
        ],
        "criteriaToProgress": [
          "3  15 single leg calf raises with 0 pain",
          "Pain-free skipping/low-intensity hopping"
        ],
        "exercises": [
          {
            "name": "Single Leg Calf Raise (Slow)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Restore push-off power and muscle endurance"
          },
          {
            "name": "Wall Calf Stretches",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Ensure flexibility of the gastroc/soleus complex to prevent re-injury"
          },
          {
            "name": "Toe Walks",
            "parameters": "3  20 meters",
            "clinicalCueRationale": "Dynamic stability and intrinsic foot loading"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "High Level Function & Sport",
        "timeline": "Week 612",
        "goals": [
          "Full sprint capacity",
          "Safe reactive hopping",
          "Confident multi-planer agility"
        ],
        "precautions": [
          "Monitor for nocturnal cramping",
          "No maximal sprints until hop tests > 95%"
        ],
        "criteriaToProgress": [
          "Symmetrical calf raise capacity",
          "VISA-A score/equivalent symmetry"
        ],
        "exercises": [
          {
            "name": "Pogo Hops (Stiff ankle)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Develop reactive stiffness and elastic energy storage in the achilles/gastroc"
          },
          {
            "name": "Suicide Sprints",
            "parameters": "5 rounds",
            "clinicalCueRationale": "Linear acceleration/deceleration under fatigue"
          },
          {
            "name": "Box Jumps (Plyometric)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Explosive power development"
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
        "timeline": "Week 02",
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
          "Knee flexion =90",
          "Minimal tenderness on palpation"
        ],
        "exercises": [
          {
            "name": "Quadriceps Isometrics (Sub-maximal)",
            "parameters": "5  10 reps, 5 sec",
            "clinicalCueRationale": "Painless activation  prevents atrophy"
          },
          {
            "name": "Heel Slides (Knee ROM)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Gentle mobility within comfort zone"
          },
          {
            "name": "Gluteal Sets / Bridge (Mid-range)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Establish posterior chain support"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Initial Healing & Muscle Activation",
        "timeline": "Week 02",
        "goals": [
          "Protect the injury site",
          "Pain-free active movement",
          "Establish initial quad control"
        ],
        "precautions": [
          "No explosive kicking or sprinting",
          "Avoid deep pain-inducing stretching"
        ],
        "criteriaToProgress": [
          "Pain-free walking",
          "Full extension AROM",
          "Negative SLR lag"
        ],
        "exercises": [
          {
            "name": "Quad Sets (Superior glide)",
            "parameters": "10  10 sec",
            "clinicalCueRationale": "Safe isometric recruitment"
          },
          {
            "name": "Hip Flexion (Gravity-eliminated)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Pain-free mobility"
          },
          {
            "name": "Static Glute Bridges",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Core support for the anterior hip"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Progressive Loading & Eccentric Load",
        "timeline": "Week 26",
        "goals": [
          "Restore full quad torque",
          "Initiate eccentric loading",
          "Improve running kinematics"
        ],
        "precautions": [
          "Monitor for \"tugging\" during push-offs",
          "Slow progress with ballistic moves"
        ],
        "criteriaToProgress": [
          "Pain-free jogging",
          "Symmetrical quad girth",
          "Full hip/knee ROM"
        ],
        "exercises": [
          {
            "name": "Eccentric Knee Extension (Controlled)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Gradual tissue remodeling through strain"
          },
          {
            "name": "Lunge into High Knee",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Functional integrated movement"
          },
          {
            "name": "Split Squats",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "High intensity quad loading"
          }
        ]
      }
    ]
  },
  {
    "name": "Gluteal Muscle Strain",
    "category": "Sports & Trauma",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Acute Protection & Early Loading",
        "timeline": "Week 03",
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
            "parameters": "5  45 sec, 50% effort",
            "clinicalCueRationale": "Activation without muscle lengthening stress"
          },
          {
            "name": "Standing Gluteal Squeezes",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Establish pelvic stability"
          },
          {
            "name": "Short Foot Exercise",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Foot-hip connection for stability during gait"
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
        "title": "Bone Healing & Unloaded Movement",
        "timeline": "Week 06",
        "goals": [
          "Achieve painless ADLs",
          "Optimize vitamin D/calcium intake",
          "Maintain calf/quad endurance (unloaded)"
        ],
        "precautions": [
          "No running or jumping",
          "Avoid walking on hard surfaces if painful"
        ],
        "criteriaToProgress": [
          "Pain-free palpation of the tibia",
          "Pain-free weight bearing"
        ],
        "exercises": [
          {
            "name": "Pool Running (Deep water)",
            "parameters": "3 sessions per wk",
            "clinicalCueRationale": "Maintain cardiovascular fitness and running mechanics without impact"
          },
          {
            "name": "Seated Calf Raises",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintenance of muscle volume without weight-bearing force"
          },
          {
            "name": "Quad Sets & SLR",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain global limb power"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Rest & Load Reduction",
        "timeline": "Week 06",
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
            "parameters": "3045 min daily",
            "clinicalCueRationale": "Zero impact cardiovascular  maintains VO2max"
          },
          {
            "name": "Stationary Bike (no impact)",
            "parameters": "3040 min daily",
            "clinicalCueRationale": "Low tibial load maintenance"
          },
          {
            "name": "Hip Strengthening (non-impact)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Reduce tibial loading on return"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Gradual Impact Loading",
        "timeline": "Week 612",
        "goals": [
          "Begin run/walk progression",
          "Improve impact attenuation mechanics",
          "Symmetrical lower limb strength"
        ],
        "precautions": [
          "Must follow a \"reloading\" schedule (e.g. Alter-G or 1-min walk/run)",
          "Stop immediately if aching persists for > 1hr"
        ],
        "criteriaToProgress": [
          "Able to run 30 min at 70% intensity pain-free",
          "Negative vibration test (tuning fork)"
        ],
        "exercises": [
          {
            "name": "Weighted Wall Squats",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Improve axial load tolerance through the tibia"
          },
          {
            "name": "Double-leg Pogo Hops",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Introduce controlled impact under high stiffness"
          },
          {
            "name": "Modified Step-downs",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Neuromuscular control of the lower limb axis"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Graduated Loading & Impact Intro",
        "timeline": "Week 612",
        "goals": [
          "Initial impact tolerance (Walking/Light pogo)",
          "Improve lower limb muscle mass",
          "Establish healthy biomechanics"
        ],
        "precautions": [
          "Stop at any focal pain over the bone",
          "Avoid fast running initially"
        ],
        "criteriaToProgress": [
          "Zero pain with walking 30 min",
          "Heel raise test painless"
        ],
        "exercises": [
          {
            "name": "Double Leg Pogo Hops",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Gradual re-introduction of elastic energy and bone loading"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Full Return to High-Intensity Running",
        "timeline": "Week 12+",
        "goals": [
          "Full return to mileage/sport",
          "Long term monitoring of load spikes",
          "Bone health maintenance"
        ],
        "precautions": [
          "Avoid sudden jumps in weekly mileage (> 10%)",
          "Ice after initial high-volume sessions"
        ],
        "criteriaToProgress": [
          "Running mileage symmetric to pre-injury levels",
          "Symmetry in single-leg bounding"
        ],
        "exercises": [
          {
            "name": "Single-leg Bounding",
            "parameters": "3  15 meters",
            "clinicalCueRationale": "High level force attenuation"
          },
          {
            "name": "Sprint Starts",
            "parameters": "5 reps, 20 meters",
            "clinicalCueRationale": "Peak tibial loading through vertical ground reaction forces"
          },
          {
            "name": "Plyometric Box Landings",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Force absorption training"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Return to Running & Agility",
        "timeline": "Week 1224",
        "goals": [
          "Graduated return to running mileage",
          "Sport-specific agility drills",
          "Maximize bone mineral density through load"
        ],
        "precautions": [
          "Use \"Run/Walk\" intervals initially",
          "Monitor recovery 24-hours after impact"
        ],
        "criteriaToProgress": [
          "Completion of return-to-run program without pain"
        ],
        "exercises": [
          {
            "name": "Interval Running (1:1 ratio)",
            "parameters": "15 min session",
            "clinicalCueRationale": "Tolerate repetitive load cycles"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Maintenance & Prevention",
        "timeline": "Month 6+",
        "goals": [
          "Independent mileage management",
          "Integrated global robustness",
          "Fracture site resilience"
        ],
        "precautions": [
          "Zero focal bone pain allowed"
        ],
        "criteriaToProgress": [
          "Full return to competition"
        ],
        "exercises": [
          {
            "name": "Maximal Velocity Sprints",
            "parameters": "5 reps, 30m",
            "clinicalCueRationale": "High level stimulus for bone adaptation"
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
        "timeline": "Week 04",
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
          "Pain =2/10 with walking",
          "Bony point tenderness resolved",
          "Stress fracture excluded"
        ],
        "exercises": [
          {
            "name": "Pool Running / Aqua Jogging",
            "parameters": "3045 min, 5/week",
            "clinicalCueRationale": "Zero tibial impact load"
          },
          {
            "name": "Stationary Bike",
            "parameters": "30 min daily",
            "clinicalCueRationale": "Non-weight-bearing cardiovascular maintenance"
          },
          {
            "name": "Calf Raises (bilateral, pain-free)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain soleus/gastroc activation"
          },
          {
            "name": "Tibialis Posterior Strengthening (band)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Key muscle for tibial stress absorption"
          },
          {
            "name": "Walking (pain-free distance only)",
            "parameters": "As tolerated",
            "clinicalCueRationale": "Maintain bone loading stimulus at sub-threshold"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Biomechanical Support & Strength",
        "timeline": "Week 412",
        "goals": [
          "Strengthen deep foot flexors and tibialis posterior",
          "Improve calf endurance",
          "Correct proximal hip instability"
        ],
        "precautions": [
          "Avoid running on hard surfaces (concrete) initially",
          "Gradual introduction of impact loading"
        ],
        "criteriaToProgress": [
          "Pain-free palpation of the medial tibial border",
          "Run 15 min without pain"
        ],
        "exercises": [
          {
            "name": "Resisted Ankle Inversion (Elastic band)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Target Tibialis Posterior - key dynamic supporter of the arch"
          },
          {
            "name": "Single Leg Squat (Knee alignment focus)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Ensure neutral knee/hip axis to reduce tibial shear stress"
          },
          {
            "name": "Arch Lifts (Short foot)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Intrinsic muscle support for the longitudinal arch"
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
        "timeline": "Week 08",
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
          "Pain =2/10 with protected walking"
        ],
        "exercises": [
          {
            "name": "Pool Walking / Aqua Running",
            "parameters": "3045 min daily",
            "clinicalCueRationale": "Zero-impact cardiovascular fitness"
          },
          {
            "name": "Stationary Bike (seated)",
            "parameters": "30 min daily",
            "clinicalCueRationale": "Low femoral neck load"
          },
          {
            "name": "Ankle Pumps",
            "parameters": "10  hourly if NWB",
            "clinicalCueRationale": "DVT prevention during restricted mobility"
          },
          {
            "name": "Hip Abductor Isometrics (side-lying)",
            "parameters": "3  20 reps, 5 sec",
            "clinicalCueRationale": "Maintain glute med without femoral neck loading"
          }
        ]
      }
    ]
  },
  {
    "name": "Pectoralis Major Tear (Conservative)",
    "category": "Sports & Trauma",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Protection & ROM",
        "timeline": "Week 04",
        "goals": [
          "Protect the repair/injury",
          "Maintain ROM (Limit ER/Elevation)",
          "Hand/Wrist mobility"
        ],
        "precautions": [
          "NO RESISTANCE: No pushing or lifting",
          "Limit elevation to 90 initially"
        ],
        "criteriaToProgress": [
          "Surgical site healed",
          "Minimal resting pain"
        ],
        "exercises": [
          {
            "name": "Pendulum Swings",
            "parameters": "3  1 min",
            "clinicalCueRationale": "Passive mobilization into safe ranges"
          },
          {
            "name": "Scapular Pushes",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Proximal stability without pecs demand"
          },
          {
            "name": "Grip Strenghening (Ball)",
            "parameters": "Daily",
            "clinicalCueRationale": "Maintain distal limb function"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Protection & Tissue Healing",
        "timeline": "Week 04",
        "goals": [
          "Protect healing muscle/tendon",
          "Reduce pain and hematoma",
          "Maintain scapular and distal mobility"
        ],
        "precautions": [
          "Sling for 34 weeks",
          "No active horizontal adduction or abduction/ER",
          "Avoid heavy lifting"
        ],
        "criteriaToProgress": [
          "Pain resolving",
          "Pendulum exercises tolerated",
          "Passive abduction up to 90"
        ],
        "exercises": [
          {
            "name": "Sling Immobilisation",
            "parameters": "Continuous",
            "clinicalCueRationale": "Necessary for large muscle tear protection"
          },
          {
            "name": "Pendulum Exercises",
            "parameters": "3  5 min",
            "clinicalCueRationale": "Passive synovial fluid movement  pain relief"
          },
          {
            "name": "Elbow/Wrist AROM",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Prevent distal stiffness"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Early Activation & Strengthening",
        "timeline": "Week 412",
        "goals": [
          "Restore full AROM",
          "Introduce submaximal isometrics",
          "Normalization of scapular rhythm"
        ],
        "precautions": [
          "No heavy bench press or flyes",
          "Monitor for anterior shoulder instability"
        ],
        "criteriaToProgress": [
          "Full symmetrical ROM",
          "Stable scapula during elevation"
        ],
        "exercises": [
          {
            "name": "Pec Isometric Squeezes (Submax)",
            "parameters": "3  10 sec",
            "clinicalCueRationale": "Safe initiation of muscular tension"
          },
          {
            "name": "Shoulder Shrugs & Rows",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Integrated upper limb support"
          },
          {
            "name": "Wall Slides (Flexion)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Active ROM re-education"
          }
        ]
      }
    ]
  },
  {
    "name": "Biceps Rupture  Distal (Post-op)",
    "category": "Sports & Trauma",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Splinting & Early ROM",
        "timeline": "Week 04",
        "goals": [
          "Protect surgical repair",
          "Controlled early mobility",
          "Wound management",
          "Edema control"
        ],
        "precautions": [
          "Hinged elbow brace with extension block (usually -30)",
          "No active elbow flexion or supination",
          "No resisted elbow extension"
        ],
        "criteriaToProgress": [
          "Extension to -30 achieved",
          "Wound healed",
          "Minimal forearm/elbow swelling"
        ],
        "exercises": [
          {
            "name": "Passive Elbow Flexion/Extension (within brace limits)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Restore ROM without tendon stress"
          },
          {
            "name": "Active Grip Strengthening",
            "parameters": "3  20 reps, light balls",
            "clinicalCueRationale": "Maintain forearm muscle activation"
          },
          {
            "name": "Shoulder AROM (Sling used for support)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Prevent secondary frozen shoulder"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Active Motion & Early Loading",
        "timeline": "Week 612",
        "goals": [
          "Full active elbow extension",
          "Unrestricted forearm rotation (AROM)",
          "Submaximal isometric activation"
        ],
        "precautions": [
          "NO RESISTIVE ELBOW FLEXION until Week 10-12",
          "Avoid heavy carrying",
          "No forceful supination"
        ],
        "criteriaToProgress": [
          "Full AROM flexion and extension",
          "Full supination AROM",
          "Stable repair on assessment"
        ],
        "exercises": [
          {
            "name": "Active Elbow Flex/Ext (Standing)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Restore active range without load"
          },
          {
            "name": "Forearm Rotations (Pencil or screwdriver motion)",
            "parameters": "3  20 reps each",
            "clinicalCueRationale": "Functional re-education of supinator/pronator muscles"
          },
          {
            "name": "Scapular Sets",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintenance of proximal stability"
          }
        ]
      }
    ]
  },
  {
    "name": "Triceps Tendinopathy",
    "category": "Sports & Trauma",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Protection & Passive Loading",
        "timeline": "Week 06",
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
            "name": "Hinged Elbow Brace (-30 extension block)",
            "parameters": "Full time",
            "clinicalCueRationale": "Protects from end-range flexion stretch"
          },
          {
            "name": "Active Grip Strength",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Maintain forearm engagement"
          },
          {
            "name": "Shoulder AROM (Sling used)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Prevent shoulder stiffness"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Protection & ROM",
        "timeline": "Week 04",
        "goals": [
          "Protect the triceps repair",
          "Gradual restoration of elbow flexion",
          "Hand/Wrist mobility"
        ],
        "precautions": [
          "STRICT: No active elbow extension (no triceps use)",
          "Limit flexion as per surgeon instruction (usually 0-60)"
        ],
        "criteriaToProgress": [
          "Surgical site healed",
          "Minimal pain"
        ],
        "exercises": [
          {
            "name": "Passive Elbow Flexion/Extension",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Safe mobilization through the allowed arc"
          },
          {
            "name": "Wrist/Hand Isometrics",
            "parameters": "Daily",
            "clinicalCueRationale": "Circulatory and muscular health of the distal limb"
          },
          {
            "name": "Shoulder Shrugs",
            "parameters": "3  11 reps",
            "clinicalCueRationale": "Maintenance of proximal stability"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Active Motion & Early Loading",
        "timeline": "Week 412",
        "goals": [
          "Active elbow extension (gravity-eliminated)",
          "Full elbow flexion ROM",
          "Initiate submaximal isometrics"
        ],
        "precautions": [
          "Avoid heavy pushing or lifting",
          "No explosive triceps work until 12+ weeks"
        ],
        "criteriaToProgress": [
          "Full AROM flexion/extension",
          "Stable repair on assessment"
        ],
        "exercises": [
          {
            "name": "Active Elbow Extension (Side-lying)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Restore active range without high gravitational demand"
          },
          {
            "name": "Triceps Isometrics (Submax)",
            "parameters": "3  10 sec",
            "clinicalCueRationale": "Safe initiation of muscular tension"
          },
          {
            "name": "Weighted Forearm Rotations",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Dynamic elbow stability"
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
        "timeline": "Week 04",
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
          "Pain =3/10 with modified activity",
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
            "parameters": "3  45 sec, twice daily",
            "clinicalCueRationale": "Reduce Achilles traction force on growth plate"
          },
          {
            "name": "Swimming / Cycling",
            "parameters": "30 min, 35/week",
            "clinicalCueRationale": "Low calcaneal impact"
          },
          {
            "name": "Activity Modification",
            "parameters": "Ongoing",
            "clinicalCueRationale": "Reduce running/jumping volume by 50%"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Load Management & Strength",
        "timeline": "Week 48",
        "goals": [
          "Improve calf flexibility",
          "Strengthen foot intrinsics",
          "Safe return to sport"
        ],
        "precautions": [
          "Avoid barefoot walking on hard floors",
          "Monitor pain during jumping"
        ],
        "criteriaToProgress": [
          "Pain-free daily activities",
          "Able to perform 20 bilateral calf raises",
          "Morning stiffness absent"
        ],
        "exercises": [
          {
            "name": "Gastrocnemius Stretch (Wall)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Reduce traction load of the Achilles on the calcaneal apophysis"
          },
          {
            "name": "Short Foot Exercises",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Intrinsics help offload the posterior heel"
          },
          {
            "name": "Controlled Landings",
            "parameters": "3  10 reps (Low jump)",
            "clinicalCueRationale": "Teach proper force attenuation to protect the heel"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Impact Tolerance & Performance",
        "timeline": "Week 816",
        "goals": [
          "Full return to impact sport",
          "Improve calf/achilles power",
          "Address jumping mechanics"
        ],
        "precautions": [
          "Monitor for heel pain during high-volume tournaments",
          "Soft landings are key"
        ],
        "criteriaToProgress": [
          "Zero pain with jumping",
          "Symmetrical calf strength"
        ],
        "exercises": [
          {
            "name": "Plyometric Box Jumps",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Build reactive power in the posterior chain"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Growth Phase Maintenance",
        "timeline": "Until Skeletal Maturity",
        "goals": [
          "Maintain flexibility during growth spurts",
          "Symptom-free development",
          "Continued athletic development"
        ],
        "precautions": [
          "Re-screen flexibility every 3 months",
          "Use heel cups if needed during heavy loads"
        ],
        "criteriaToProgress": [
          "Completion of growth with zero chronic pain"
        ],
        "exercises": [
          {
            "name": "Maintenance Gastroc/Soleus Stretches",
            "parameters": "Daily",
            "clinicalCueRationale": "Crucial during periods of rapid bone growth"
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
        "timeline": "Week 06+",
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
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Build the foundation for future throwing return"
          },
          {
            "name": "Internal Rotation Stretch (GIRD focus)",
            "parameters": "3  45 sec",
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
        "timeline": "Week 04",
        "goals": [
          "Reduce tibial tuberosity pain",
          "Identify provocative sports",
          "Long-term load management education"
        ],
        "precautions": [
          "Avoid complete rest  keep child active within pain tolerance",
          "No aggressive quad stretching during flare-up",
          "Bone maturation resolves the condition"
        ],
        "criteriaToProgress": [
          "Pain =3/10 with daily activity",
          "Reduced swelling at tuberosity"
        ],
        "exercises": [
          {
            "name": "Isometrics (Mid-range quad sets)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintain muscle tone without high patellar traction"
          },
          {
            "name": "Hamstring Stretching",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Reduced posterior tension increases knee efficiency"
          },
          {
            "name": "Activity Pacing Program",
            "parameters": "Ongoing",
            "clinicalCueRationale": "Reduce jumping/running volume by 30-50% during peaks"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Symptom Inhibition & Load Management",
        "timeline": "Week 04",
        "goals": [
          "Reduce traction on the tibial tubercle",
          "Address quad/hamstring tightness",
          "Load management for sport"
        ],
        "precautions": [
          "Limit high-impact jumping and explosive sprinting",
          "No deep weighted squats if painful"
        ],
        "criteriaToProgress": [
          "Reduced tibial tubercle tenderness",
          "Pain-free daily activities"
        ],
        "exercises": [
          {
            "name": "Quadriceps Stretch (Gentle)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Decrease the \"pull\" on the growth plate"
          },
          {
            "name": "Hamstring Stretch",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Address global tightness in the growth phase"
          },
          {
            "name": "Static Quad Sets",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Safe maintenance of quad activation"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Resilience & Sport Return",
        "timeline": "Week 412",
        "goals": [
          "Build load tolerance in the quad tendon",
          "Correct biomechanical landing deficits",
          "Safe return to full sport"
        ],
        "precautions": [
          "Monitor for \"growth flare-ups\"",
          "Ensure footwear is appropriate and cushioned"
        ],
        "criteriaToProgress": [
          "Full pain-free sport participation",
          "Symmetrical lower limb strength"
        ],
        "exercises": [
          {
            "name": "Step-downs (Focus on knee alignment)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Neuromuscular control of the patellar axis"
          },
          {
            "name": "Wall Squats with Stability Ball",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Lower impact quad strengthening"
          },
          {
            "name": "Single-leg Balance (Dynamic)",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Proprioceptive support for the joint capitals"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Advanced Power & Agility",
        "timeline": "Week 12+",
        "goals": [
          "Full sport-specific speed/agility",
          "Maximal quad load tolerance",
          "Safe return to competition"
        ],
        "precautions": [
          "Avoid sudden load spikes after periods of rest",
          "Ice after matches"
        ],
        "criteriaToProgress": [
          "Zero pain with maximal acceleration",
          "Good landing mechanics"
        ],
        "exercises": [
          {
            "name": "Linear Sprints with Deceleration",
            "parameters": "5 reps, 20m",
            "clinicalCueRationale": "Specific load for the patellar tendon energy storage"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Prevention & Maintenance",
        "timeline": "Ongoing",
        "goals": [
          "Maintain quadriceps length during growth",
          "Prevent recurrence of apophysitis",
          "Independent load monitoring"
        ],
        "precautions": [
          "Continue flexibility training",
          "Monitor footwear"
        ],
        "criteriaToProgress": [
          "Skeletal maturity achieved without disability"
        ],
        "exercises": [
          {
            "name": "Standing Quad Stretches (Maintenance)",
            "parameters": "Daily",
            "clinicalCueRationale": "Reduce tensile load on the tibial tubercle during growth/sport"
          }
        ]
      }
    ]
  },
  {
    "name": "Sinding-Larsen-Johansson Syndrome",
    "category": "Paediatric & Special",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Load Modification & Patellar Protection",
        "timeline": "Week 04",
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
            "parameters": "5  45 sec, submaximal",
            "clinicalCueRationale": "Tendon/bone load policy  reduces pain"
          },
          {
            "name": "Calf Stretching",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Reduce general lower limb tension"
          },
          {
            "name": "Hip Strengthening (Glutes)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Address proximal power to unload the knee"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Protection & Load Management",
        "timeline": "Week 04",
        "goals": [
          "Reduce traction at the patellar apex",
          "Address soft tissue tightness",
          "Maintain pain-free ADLs"
        ],
        "precautions": [
          "No explosive jumping or high-load knee extension",
          "Avoid kneeling on hard surfaces"
        ],
        "criteriaToProgress": [
          "Reduced tenderness at the inferior patellar pole",
          "Pain-free daily mobility"
        ],
        "exercises": [
          {
            "name": "Quadriceps Stretch (Floor)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Reduce tension on the apophysis"
          },
          {
            "name": "Quad Sets (Submaximal)",
            "parameters": "10  10 sec",
            "clinicalCueRationale": "Safe activation without high tensile load"
          },
          {
            "name": "Hip Abductor Strengthening (Clamshells)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Proximal stability to reduce distal knee shear"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Load Tolerance & Return to Movement",
        "timeline": "Week 412",
        "goals": [
          "Increase load tolerance of the patellar tendon",
          "Improve landing mechanics",
          "Safe return to sport"
        ],
        "precautions": [
          "Monitor for \"flare-ups\" during PE/Sport",
          "Avoid mileage spikes in running"
        ],
        "criteriaToProgress": [
          "Pain-free single leg squat (partial)",
          "Hop tests symmetry > 85%"
        ],
        "exercises": [
          {
            "name": "Step-downs (Mirror biofeedback)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Improve neuromuscular control of the knee/hip track"
          },
          {
            "name": "Bulgarian Split Squats (Partial range)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "High intensity loading of the extensor mechanism"
          },
          {
            "name": "Double-leg Jumps (Soft landing focus)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Address force attenuation mechanics"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Mobilization & Quadriceps Control",
        "timeline": "Week 48",
        "goals": [
          "Reduce stress on the inferior patellar pole",
          "Improve quad flexibility and control",
          "Paced return to school activity"
        ],
        "precautions": [
          "Avoid repetitive impact during growth spurts",
          "Ice after sport"
        ],
        "criteriaToProgress": [
          "Zero pain with stairs",
          "Improved quad flexibility"
        ],
        "exercises": []
      },
      {
        "phaseNumber": 3,
        "title": "Advanced Power & Return to Sport",
        "timeline": "Week 816",
        "goals": [
          "Maximize quad load tolerance",
          "Return to competitive youth sport",
          "Address jumping biomechanics"
        ],
        "precautions": [
          "Monitor for \"tender point\" during season spikes"
        ],
        "criteriaToProgress": [
          "Pain-free jumping",
          "Full symmetrical strength"
        ],
        "exercises": [
          {
            "name": "Split Squat Jumps (Control)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Build explosive power while monitoring the patellar tendon load"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Maintenance & Growth Management",
        "timeline": "Ongoing",
        "goals": [
          "Maintain flexibility until skeletal maturity",
          "Prevent recurrence during training spikes",
          "Independent load monitoring"
        ],
        "precautions": [
          "Pacing the load"
        ],
        "criteriaToProgress": [
          "Successful return to season"
        ],
        "exercises": [
          {
            "name": "Standing Quad Stretches",
            "parameters": "Daily",
            "clinicalCueRationale": "Crucial during rapid bone growth to reduce tensile force"
          }
        ]
      }
    ]
  },
  {
    "name": "Perthes Disease (Rehabilitation)",
    "category": "Paediatric & Special",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Hip Protection & Motion Maintenance",
        "timeline": "Phase: Fragmentation",
        "goals": [
          "Maintain hip abduction range",
          "Control pain and synovitis",
          "Prevent femoral head collapse"
        ],
        "precautions": [
          "Avoid forced high-impact sports initially (as per orthopaedist)",
          "Limit activities that cause deep groin pain"
        ],
        "criteriaToProgress": [
          "Stable hip ROM",
          "Low baseline pain"
        ],
        "exercises": [
          {
            "name": "Passive Hip Abduction (Supine)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Keeps the femoral head seated in the acetabulum"
          },
          {
            "name": "Active Quad Sets",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintenance of muscle bulk without joint shear"
          },
          {
            "name": "Swimming (Non-impact activity)",
            "parameters": "3 sessions per wk",
            "clinicalCueRationale": "Maintain fitness without axial loading"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Joint Protection & ROM Maintenance",
        "timeline": "Week 012+",
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
          "Hip abduction >35",
          "Minimal pain during gait",
          "Radiological stability"
        ],
        "exercises": [
          {
            "name": "Passive Hip Abduction (Supine)",
            "parameters": "3  20 reps",
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
      },
      {
        "phaseNumber": 2,
        "title": "Mobilisation & Progressive WB",
        "timeline": "Phase: Re-ossification",
        "goals": [
          "Improve functional gait",
          "Strengthen gluteus medius/maximus",
          "Return to daily pediatric activities"
        ],
        "precautions": [
          "Monitor for a \"limping\" gait - indicating need to offload",
          "Avoid sudden heavy falls on the hip"
        ],
        "criteriaToProgress": [
          "Negative Trendelenburg sign",
          "Full weight bearing allowed"
        ],
        "exercises": [
          {
            "name": "Side-lying Leg Raises",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Strengthen abduction - vital for pelvic stability"
          },
          {
            "name": "Supported Single-leg Stance",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "Neuromuscular stability retraining"
          },
          {
            "name": "Mini-Squats (Bodyweight)",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Core-hip integration"
          }
        ]
      }
    ]
  },
  {
    "name": "Peripheral Nerve Injury (Peronal Nerve Palsy)",
    "category": "Neurological / Other",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Nerve Protection & Functional Maintenance",
        "timeline": "Week 06",
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
            "clinicalCueRationale": "Foot drop correction  prevents falls"
          },
          {
            "name": "Passive Ankle PROM (DF, eversion)",
            "parameters": "3  20 reps each",
            "clinicalCueRationale": "Prevent equinus and peroneal contracture"
          },
          {
            "name": "Tibialis Anterior NMES / FES",
            "parameters": "20 min, 2/day if available",
            "clinicalCueRationale": "Electrical stimulation maintains muscle mass"
          },
          {
            "name": "Proprioception Training (seated)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Maintain sensory input  eyes-open balance"
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
        "timeline": "Week 08",
        "goals": [
          "Desensitise hypersensitive system",
          "Reduce allodynia through graded exposure",
          "Prevent disuse atrophy",
          "Multidisciplinary team engagement"
        ],
        "precautions": [
          "CRPS is sensitised  aggressive exercise WORSENS outcomes",
          "Pain is NOT reliable guide to tissue damage",
          "Avoid forced passive mobilisation"
        ],
        "criteriaToProgress": [
          "Allodynia reducing  touch tolerance improving",
          "GMI stages 1 and 2 tolerated",
          "Engagement with psych support"
        ],
        "exercises": [
          {
            "name": "Graded Motor Imagery  Limb Laterality",
            "parameters": "10 min, 2/day",
            "clinicalCueRationale": "Normalise cortical body schema"
          },
          {
            "name": "Mirror Therapy",
            "parameters": "1020 min, daily",
            "clinicalCueRationale": "Cortical reorganisation  watch reflected limb"
          },
          {
            "name": "Desensitisation (graded textures)",
            "parameters": "10 min, 2/day",
            "clinicalCueRationale": "Cotton wool ? washcloth ? towel ? brush"
          },
          {
            "name": "Graded Activity (pacing)",
            "parameters": "Daily structured",
            "clinicalCueRationale": "Activity pacing program  time-based goals"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "GMI & Functional Desensitization",
        "timeline": "Week 4+",
        "goals": [
          "Graded Motor Imagery (GMI)",
          "Normalization of limb perception",
          "Introduction of active movement"
        ],
        "precautions": [
          "Avoid pushing into extreme \"flare-up\" pain",
          "Patience with the central nervous system response"
        ],
        "criteriaToProgress": [
          "Reduced allodynia",
          "Ability to touch and move limb without severe distress",
          "Improved autonomic signs (color/temp)"
        ],
        "exercises": [
          {
            "name": "Mirror Box Therapy",
            "parameters": "10 min daily",
            "clinicalCueRationale": "Re-train brain perception of the affected limb using the visual of the healthy limb"
          },
          {
            "name": "Tactile Discrimination (Various textures)",
            "parameters": "5 min daily",
            "clinicalCueRationale": "Fine-tune the sensory cortex to reduce allodynia"
          },
          {
            "name": "Gentle Active ROM (Within tolerance)",
            "parameters": "Short frequent sessions",
            "clinicalCueRationale": "Maintain joint mobility and promote blood flow"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "High Intensity Graded Loading",
        "timeline": "Month 3+",
        "goals": [
          "Integrated limb use in ADLs",
          "Improve muscle strength and bulk",
          "Address sympathetic tone"
        ],
        "precautions": [
          "Monitor for \"flare-ups\" longer than 24hrs",
          "Use positive reinforcement"
        ],
        "criteriaToProgress": [
          "Reduced limb color/temp changes",
          "Grip/Limb strength symmetry > 75%"
        ],
        "exercises": [
          {
            "name": "Weighted ADL Tasks (Lifting/Carrying)",
            "parameters": "Daily 30 min",
            "clinicalCueRationale": "Normalizing the sensory experience of load"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "title": "Social & Physical Re-integration",
        "timeline": "Month 6+",
        "goals": [
          "Full return to previous social/physical life",
          "Independent pain management skills",
          "Strength maintenance"
        ],
        "precautions": [
          "Address emotional resilience",
          "Prevent avoidant behavior"
        ],
        "criteriaToProgress": [
          "Full return to work/activity"
        ],
        "exercises": [
          {
            "name": "Global Gym Conditioning",
            "parameters": "3 sessions wkly",
            "clinicalCueRationale": "Integrated whole-body robustnes to reduce central sensitization"
          }
        ]
      }
    ]
  },
  {
    "name": "Brachial Plexus Neuropraxia (Burner/Stinger)",
    "category": "Neurological / Other",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Joint Preservation & Neural Protection",
        "timeline": "Week 08",
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
            "parameters": "3  15 reps each, twice daily",
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
      },
      {
        "phaseNumber": 2,
        "title": "Nerve Gliding & Stability",
        "timeline": "Week 612",
        "goals": [
          "Promote neutral healing of the nerve roots",
          "Minimize muscle atrophy in affected limb",
          "Restore scapular stability"
        ],
        "precautions": [
          "Avoid forced end-range neck lateral flexion away from injury",
          "Monitor for progressive weakness"
        ],
        "criteriaToProgress": [
          "Stabilization of strength grades",
          "Reduced neural sensitivity to stretch"
        ],
        "exercises": [
          {
            "name": "Brachial Plexus Sliders",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Promote intraneural blood flow and reduce tethering"
          },
          {
            "name": "Shoulder Shrugs (Active)",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Maintenance of the upper trapezius and levator scapulae"
          },
          {
            "name": "Passive Hand/Finger ROM",
            "parameters": "Daily",
            "clinicalCueRationale": "Prevent joint stiffness while waiting for motor re-innervation"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Functional Integration",
        "timeline": "Month 4+",
        "goals": [
          "Maximise multi-joint coordination",
          "Return to heavy lifting/overhead tasks",
          "Neuromuscular fatigue management"
        ],
        "precautions": [
          "Avoid repetitive heavy overhead reaches if scapula is unstable",
          "Pace activity based on neurological fatigue"
        ],
        "criteriaToProgress": [
          "Stable strength in all key muscle groups",
          "Improved DASH functional score"
        ],
        "exercises": [
          {
            "name": "Overhead Carry (Waiter walk)",
            "parameters": "3  15 meters",
            "clinicalCueRationale": "Dynamic shoulder stability under static load"
          },
          {
            "name": "Wall Ball Taps (Light)",
            "parameters": "3  30 sec",
            "clinicalCueRationale": "High-frequency proprioceptive feed-back"
          },
          {
            "name": "PNF Diagonals with resistance",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Integrated athletic functional movement patterns"
          }
        ]
      }
    ]
  },
  {
    "name": "Thoracic Hyperkyphosis (Postural)",
    "category": "Neurological / Other",
    "phases": [
      {
        "phaseNumber": 1,
        "title": "Postural Awareness & Anterior Length",
        "timeline": "Week 08",
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
            "parameters": "3  1 min",
            "clinicalCueRationale": "Passive remodeling of thoracic curvature"
          },
          {
            "name": "Wall Angels",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Neuromuscular retraining of scapular stabilisers"
          },
          {
            "name": "Deep Breathing Exercises",
            "parameters": "5 min, twice daily",
            "clinicalCueRationale": "Increase rib cage expansion and lung volume"
          }
        ]
      },
      {
        "phaseNumber": 1,
        "title": "Postural Awareness & Mobility",
        "timeline": "Week 04",
        "goals": [
          "Address thoracic stiffness",
          "Improve respiratory capacity",
          "Correction of forward head posture"
        ],
        "precautions": [
          "Avoid forced end-range extension if pain is sharp",
          "Monitor for rib pain"
        ],
        "criteriaToProgress": [
          "Improved thoracic extension ROM",
          "Reduced visual forward head angle"
        ],
        "exercises": [
          {
            "name": "Thoracic Foam Rolling (Extension)",
            "parameters": "3  1 min",
            "clinicalCueRationale": "Focal mobilization into extension segments"
          },
          {
            "name": "Pectoralis Doorway Stretch",
            "parameters": "3  45 sec",
            "clinicalCueRationale": "Open the anterior chest to allow better upright posture"
          },
          {
            "name": "Scapular Squeezes",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Activate middle/lower traps"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Strengthening & Endurance",
        "timeline": "Week 412",
        "goals": [
          "Strengthen posterior chain",
          "Maintain upright posture during activity",
          "Integrated core/spinal stability"
        ],
        "precautions": [
          "Ensure neutral spine during lifting",
          "Avoid excessive neck strain"
        ],
        "criteriaToProgress": [
          "Able to maintain tall posture for 30 min",
          "Symmetrical strength in rows"
        ],
        "exercises": [
          {
            "name": "Prone Y-Raise",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Target lower trapezius - key for upright posture"
          },
          {
            "name": "Wall Angels",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Neuromuscular re-education of shoulder/thoracic rhythm"
          },
          {
            "name": "Kettlebell Sumo Deadlift",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Global posterior chain strengthening"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "title": "Postural Power & Resilience",
        "timeline": "Week 12+",
        "goals": [
          "Stabilize posture under high load",
          "Full functional thoracic mobility",
          "Prevent recurrence during fatigue"
        ],
        "precautions": [
          "Monitor for shoulder/neck strain during heavy lifting",
          "Maintain core support at all times"
        ],
        "criteriaToProgress": [
          "Symmetrical back endurance (Biering-Sorensen score)",
          "Reduced visual postural drift"
        ],
        "exercises": [
          {
            "name": "Overhead Barbell Carries",
            "parameters": "3  20 meters",
            "clinicalCueRationale": "Peak postural stability under load"
          },
          {
            "name": "Renegade Rows",
            "parameters": "3  12 reps",
            "clinicalCueRationale": "Core and thoracic integration"
          },
          {
            "name": "T-Spine Mobility with Breathing",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "integrated respiratory/spinal health"
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
        "timeline": "Week 04",
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
          "Pain =3/10 with daily use",
          "Jaw opening =35 mm without pain",
          "Morning jaw pain reducing"
        ],
        "exercises": [
          {
            "name": "Jaw Rest Protocol",
            "parameters": "Ongoing",
            "clinicalCueRationale": "Soft diet, small bites  reduce joint loading"
          },
          {
            "name": "Diaphragmatic Breathing",
            "parameters": "5 min  3/day",
            "clinicalCueRationale": "Reduce sympathetic activation  key driver of jaw clenching"
          },
          {
            "name": "Tongue-Up Rest Position",
            "parameters": "Conscious habit all day",
            "clinicalCueRationale": "Tongue on palate  reduces TMJ compression"
          },
          {
            "name": "Relaxation Techniques / Stress Management",
            "parameters": "Daily practice",
            "clinicalCueRationale": "Mindfulness, progressive relaxation"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "title": "Coordination & Strengthening",
        "timeline": "Week 38",
        "goals": [
          "Normalize dental occlusion during movement",
          "Strengthen jaw openers and stabilizers",
          "Correct cervical posture"
        ],
        "precautions": [
          "Avoid hard foods (nuts, tough meats)",
          "No wide yawning initially",
          "Avoid gum chewing"
        ],
        "criteriaToProgress": [
          "Pain-free opening > 3 fingers width",
          "Stable jaw movement without clicking",
          "Reduced facial tension"
        ],
        "exercises": [
          {
            "name": "Jaw Opening with Tongue on Palate",
            "parameters": "3  15 reps",
            "clinicalCueRationale": "Ensures rotation of the condyle before translation - reducing joint impingement"
          },
          {
            "name": "Resisted Mandibular Opening (Partial)",
            "parameters": "3  10 reps",
            "clinicalCueRationale": "Isotonic strengthening of the suprahyoid muscles"
          },
          {
            "name": "Cervical Retreats (Chin tucks)",
            "parameters": "3  20 reps",
            "clinicalCueRationale": "Head position directly influences TMJ mechanics"
          }
        ]
      }
    ]
  }
];
