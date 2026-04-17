export type ExercisePlanOverride = {
  label: string;
  sets?: string;
  reps?: string;
  rest?: string;
  equipment?: string;
  alternatives?: string[];
  cues?: string[];
};

export type InjuryExercisePhaseOverride = {
  phaseNumber: number;
  label?: string;
  duration?: string;
  goals?: string[];
  cautions?: string[];
  progressionMarkers?: string[];
  exercises?: string[];
  exercisePlans?: ExercisePlanOverride[];
};

export type InjuryExerciseProtocolOverride = {
  sourceTitle: string;
  phases: InjuryExercisePhaseOverride[];
};

export const injuryExerciseProtocolOverrides: Record<string, InjuryExerciseProtocolOverride> = {
  "acl_reconstruction": {
    "sourceTitle": "ACL Reconstruction (Hamstring Graft)",
    "phases": [
      {
        "phaseNumber": 1,
        "label": "Immediate Post-op",
        "duration": "Week 0-2",
        "goals": [
          "Control pain & swelling",
          "Achieve full passive knee extension",
          "Quadriceps activation",
          "Independent ambulation with crutches"
        ],
        "cautions": [
          "No active knee extension 0-90�",
          "Avoid hamstring loading (graft protection)",
          "PWB with crutches"
        ],
        "progressionMarkers": [
          "Full passive extension achieved",
          "SLR without extension lag",
          "Swelling <1+ on effusion scale"
        ],
        "exercises": [
          "Quadriceps Sets (Isometric)",
          "Ankle Pumps",
          "Straight Leg Raise (SLR)",
          "Heel Slides (AAROM Flexion)",
          "Passive Knee Extension (prone hang)",
          "Patellar Mobilisation"
        ],
        "exercisePlans": [
          {
            "label": "Quadriceps Sets (Isometric)",
            "sets": "3 x 20 reps, 5-sec hold Flatten back of knee to bed, feel VMO contract"
          },
          {
            "label": "Ankle Pumps",
            "sets": "3 x 30 reps Reduce DVT risk, improve circulation"
          },
          {
            "label": "Straight Leg Raise (SLR)",
            "sets": "3 x 15 reps Lock knee before lifting, no lag allowed"
          },
          {
            "label": "Heel Slides (AAROM Flexion)",
            "sets": "3 x 15 reps Slide heel toward buttocks, hold 2 sec at end range"
          },
          {
            "label": "Passive Knee Extension (prone hang)",
            "sets": "3 x 5 min Let gravity achieve full extension"
          },
          {
            "label": "Patellar Mobilisation",
            "sets": "2 x 2 min Medial, lateral, superior glides - pain-free"
          }
        ]
      },
      {
        "phaseNumber": 2,
        "label": "Early Strengthening",
        "duration": "Week 2-6",
        "goals": [
          "0-120� ROM",
          "Normalise gait without crutches",
          "Begin CKC loading",
          "Neuromuscular re-education"
        ],
        "cautions": [
          "Avoid OKC knee extension 0-60�",
          "No pivoting or cutting",
          "Monitor effusion with activity"
        ],
        "progressionMarkers": [
          "Full ROM 0-120�",
          "Single-leg stance >=30 sec",
          "Normal gait pattern without device"
        ],
        "exercises": [
          "Mini Squats (0-45�)",
          "Step-Ups (10 cm box)",
          "Leg Press (60-90�)",
          "Terminal Knee Extension (band)",
          "Hip Abduction - Side-lying",
          "Calf Raises (bilateral)",
          "Stationary Bike (low resistance)"
        ],
        "exercisePlans": [
          {
            "label": "Mini Squats (0-45�)",
            "sets": "3 x 15 reps Knees track over 2nd toe, weight through heels"
          },
          {
            "label": "Step-Ups (10 cm box)",
            "sets": "3 x 15 reps each leg Lead with affected leg, control descent"
          },
          {
            "label": "Leg Press (60-90�)",
            "sets": "3 x 15 reps, light load Bilateral then unilateral, avoid locking out"
          },
          {
            "label": "Terminal Knee Extension (band)",
            "sets": "3 x 20 reps Focus on last 20� - VMO activation"
          },
          {
            "label": "Hip Abduction - Side-lying",
            "sets": "3 x 20 reps Maintain pelvic stability, control return"
          },
          {
            "label": "Calf Raises (bilateral)",
            "sets": "3 x 20 reps Full ROM, slow eccentric phase"
          },
          {
            "label": "Stationary Bike (low resistance)",
            "sets": "20 min ROM & cardiovascular - no pain"
          }
        ]
      },
      {
        "phaseNumber": 3,
        "label": "Advanced Strengthening",
        "duration": "Week 6-12",
        "goals": [
          "Limb Symmetry Index (LSI) >70%",
          "Begin jogging",
          "Develop strength & power",
          "Proprioception training"
        ],
        "cautions": [
          "No change-of-direction sport",
          "Monitor for effusion post-exercise",
          "Gradual plyometric loading"
        ],
        "progressionMarkers": [
          "LSI >=80% quad & hamstring strength",
          "Hop test symmetry >=80%",
          "Jog pain-free 30 min"
        ],
        "exercises": [
          "Bulgarian Split Squat",
          "Romanian Deadlift",
          "Lateral Band Walks",
          "Single-Leg Press",
          "Box Step-Down",
          "Double-leg Squat Jump",
          "Forward Hop (non-reactive)",
          "Linear Jog Program"
        ],
        "exercisePlans": [
          {
            "label": "Bulgarian Split Squat",
            "sets": "4 x 10 reps each Front foot flat, torso upright, 90� knee flexion"
          },
          {
            "label": "Romanian Deadlift",
            "sets": "4 x 10 reps Hip hinge pattern, neutral spine, feel hamstring load"
          },
          {
            "label": "Lateral Band Walks",
            "sets": "3 x 15 steps each direction Maintain squat position, band around ankles"
          },
          {
            "label": "Single-Leg Press",
            "sets": "4 x 12 reps Progressive loading, track limb symmetry"
          },
          {
            "label": "Box Step-Down",
            "sets": "3 x 12 reps each Slow 5-sec eccentric, control valgus collapse"
          },
          {
            "label": "Double-leg Squat Jump",
            "sets": "3 x 10 reps Soft landing, absorb force through hips and knees"
          },
          {
            "label": "Forward Hop (non-reactive)",
            "sets": "3 x 8 reps Stick landing 3 sec before next hop"
          },
          {
            "label": "Linear Jog Program",
            "sets": "Start 10 min, progress weekly Even surface, no cutting - pain-free"
          }
        ]
      },
      {
        "phaseNumber": 4,
        "label": "Return to Sport",
        "duration": "Month 4-9",
        "goals": [
          "LSI >=90% all hop tests",
          "Sport-specific agility",
          "Psychological readiness",
          "Full return to unrestricted sport"
        ],
        "cautions": [
          "Clear psychological readiness (ACL-RSI score)",
          "Minimum 9 months post-op for contact sport",
          "Gradual reintroduction to team training"
        ],
        "progressionMarkers": [
          "LSI >=90% quad/hamstring/hop",
          "ACL-RSI >=65",
          "Clearance from surgeon + physio"
        ],
        "exercises": [
          "T-Agility Test Drills 4-",
          "Reactive Change-of-Direction",
          "Plyometric Progression (single-leg)",
          "Sport-Specific Drills"
        ],
        "exercisePlans": [
          {
            "label": "T-Agility Test Drills 4-",
            "sets": "6 sets Progressive speed increase over weeks"
          },
          {
            "label": "Reactive Change-of-Direction",
            "sets": "3 x 10 reps Controlled, then progress to reactive cues"
          },
          {
            "label": "Plyometric Progression (single-leg)",
            "sets": "3 x 8 reps Lateral hops, bounding, depth jumps - master each before progressing"
          },
          {
            "label": "Sport-Specific Drills",
            "sets": "3 x 5 min blocks Cutting, deceleration, sport movement patterns Strength Maintenance (Gym) 3 x week Maintain gains achieved in Phase 3"
          }
        ]
      }
    ]
  }
};
