import {injuryPageContent, type InjuryPageContent} from './injuryPageContent';

const injuryPageContentExtras: Record<string, InjuryPageContent> = {
  cervical_disc_herniation: {
    intro:
      'Cervical disc herniation usually needs symptom-guided neck loading, posture changes, and careful progression rather than panic immobilization. The main goal is to calm arm symptoms, protect function, and build back control gradually.',
    symptoms: [
      'Neck pain that radiates into the arm or shoulder',
      'Pins and needles or numbness into the fingers',
      'Grip weakness or heavier-feeling arm during daily tasks',
      'Symptoms that worsen with coughing, sneezing, or prolonged sitting',
    ],
    rehabNotes: [
      'Early phases often focus on symptom calming, position changes, and pain-limited neck movement.',
      'As irritability settles, deep neck flexor work, scapular support, and upper-quarter control become more important.',
      'Return to training should build through gradual loading, not sudden overhead or high-volume work.',
    ],
    nutritionNotes: [
      'Protein adequacy matters because pain often reduces training quality and upper-body loading.',
      'Omega-3 intake and anti-inflammatory food patterns can support overall recovery quality.',
      'Very restrictive dieting is a poor fit when the aim is nerve recovery and muscle retention.',
    ],
    faq: [
      {
        q: 'Does every cervical disc herniation need surgery?',
        a: 'No. Some cases improve with conservative care, while surgery is considered when neurological loss, severe persistent symptoms, or serious cord signs are present.',
      },
      {
        q: 'Why does the pain go into my arm instead of staying in the neck?',
        a: 'Because the irritated disc can affect a nerve root, so symptoms may follow that nerve pathway down the arm.',
      },
    ],
  },
  whiplash_injury: {
    intro:
      'Whiplash recovery usually improves with calm movement reintroduction, neck control, sleep support, and confidence building. The goal is to avoid turning a sharp event into a long-term guarded pattern.',
    symptoms: [
      'Neck pain and stiffness after a sudden acceleration-deceleration event',
      'Occipital headache or dizziness',
      'Reduced confidence turning the head or driving',
      'Symptoms that worsen with long sitting, stress, or poor sleep',
    ],
    rehabNotes: [
      'Early education matters because fear and overprotection can prolong symptoms.',
      'Active range of motion and progressive neck-shoulder loading usually become more useful than passive care alone.',
      'Later phases should rebuild posture endurance, balance, and upper-quarter tolerance.',
    ],
    nutritionNotes: [
      'Steady hydration and consistent meals help when pain disrupts appetite and sleep.',
      'Magnesium can fit well for patients with muscle guarding if medically appropriate.',
      'Recovery habits often matter as much as supplement choice in whiplash cases.',
    ],
    faq: [
      {
        q: 'Should I keep my neck completely still after whiplash?',
        a: 'Usually no. Short protection can help in some cases, but prolonged total immobility often worsens stiffness and confidence loss.',
      },
      {
        q: 'Why do stress and sleep affect whiplash symptoms so much?',
        a: 'Because muscle guarding, pain sensitivity, and recovery quality are strongly influenced by stress load and sleep disruption.',
      },
    ],
  },
  lumbar_disc_herniation: {
    intro:
      'Lumbar disc herniation often improves best with smart movement selection, graded trunk and hip loading, and a patient return to bending tolerance. The aim is to reduce leg symptoms and rebuild daily function step by step.',
    symptoms: [
      'Low back pain with radiation to the buttock or leg',
      'Tingling, numbness, or burning below the knee',
      'Pain that worsens with bending, sitting, coughing, or sneezing',
      'Loss of confidence with lifting or prolonged sitting',
    ],
    rehabNotes: [
      'Early phases often emphasize directional preference work, walking tolerance, and calming leg symptoms.',
      'As symptoms centralize, trunk endurance, hip strength, and graded bending become more important.',
      'Late return should rebuild lifting, work tasks, and impact gradually rather than all at once.',
    ],
    nutritionNotes: [
      'Protein intake helps protect lean mass when pain reduces training load.',
      'Hydration and fiber matter if pain medication slows appetite or digestion.',
      'Avoid aggressive dieting while trying to restore spinal load tolerance.',
    ],
    faq: [
      {
        q: 'Why does sitting often feel worse than walking?',
        a: 'Because some disc-sensitive cases tolerate repeated low-level walking better than sustained flexed sitting pressure.',
      },
      {
        q: 'Does a disc bulge always explain every symptom?',
        a: 'Not always. Imaging findings and real symptoms do not match perfectly, so the clinical picture still matters.',
      },
    ],
  },
  lumbar_spinal_stenosis: {
    intro:
      'Lumbar spinal stenosis often behaves like a tolerance problem with standing and walking rather than a single pain-only issue. Good plans improve flexion-based comfort, strength, and practical daily pacing.',
    symptoms: [
      'Back or leg symptoms that build during standing or walking',
      'Relief when sitting or bending forward',
      'Heaviness or fatigue in the legs with distance',
      'Shorter comfortable walking tolerance over time',
    ],
    rehabNotes: [
      'Many patients do well with flexion-biased positions, supported cardio, and graded walking plans.',
      'Hip and trunk strength can improve daily capacity even when imaging remains unchanged.',
      'Progress should be judged by function, walking distance, and tolerance, not only pain on one day.',
    ],
    nutritionNotes: [
      'Weight management can help some cases, but severe restriction is rarely the answer.',
      'Protein remains important because walking limitation can reduce general activity and muscle stimulus.',
      'Simple, repeatable meals often work best for older adults managing chronic symptoms.',
    ],
    faq: [
      {
        q: 'Why does leaning on a cart feel easier when walking?',
        a: 'Because a flexed posture can reduce extension-related symptom provocation in some stenosis presentations.',
      },
      {
        q: 'Can exercise still help even if the canal is narrowed?',
        a: 'Often yes. Strength, pacing, and position-specific training can improve function even when anatomy does not fully change.',
      },
    ],
  },
  frozen_shoulder: {
    intro:
      'Frozen shoulder recovery is usually slow and stage-based. The goal is to protect sleep and function early, then gradually rebuild range and confidence without forcing the joint too aggressively.',
    symptoms: [
      'Progressive loss of shoulder motion in multiple directions',
      'Pain with reaching, dressing, or sleeping on the shoulder',
      'Marked stiffness, especially in external rotation',
      'Daily tasks becoming harder over time rather than suddenly',
    ],
    rehabNotes: [
      'Irritable stages usually need pain-aware mobility and sleep protection rather than forceful stretching.',
      'Later phases can tolerate more progressive mobility and cuff-scapular strengthening.',
      'Consistency matters more than occasional very hard stretching sessions.',
    ],
    nutritionNotes: [
      'Stable blood glucose management matters, especially when diabetes is present.',
      'Protein and hydration support recovery quality when activity drops.',
      'Anti-inflammatory food patterns may help overall symptom management.',
    ],
    faq: [
      {
        q: 'Why is frozen shoulder so slow to improve?',
        a: 'Because the capsule becomes stiff and irritable over time, so recovery often follows a longer staged process rather than a quick change.',
      },
      {
        q: 'Should I force the movement through pain?',
        a: 'Usually no. Very aggressive stretching can flare symptoms and make the shoulder harder to use consistently.',
      },
    ],
  },
  femoroacetabular_impingement: {
    intro:
      'Femoroacetabular impingement often needs careful hip loading, movement modification, and gradual return to flexion-heavy tasks. The aim is to reduce front-of-hip irritation while improving strength and control around the joint.',
    symptoms: [
      'Front-of-hip or groin pain with deep sitting or bending',
      'Pinching during squats, car transfers, or direction changes',
      'Limited hip internal rotation or flexion comfort',
      'Symptoms during sport that combines speed and deep hip flexion',
    ],
    rehabNotes: [
      'Irritable cases often improve by modifying depth, position, and total flexion exposure first.',
      'Gluteal strength, trunk control, and hip-specific loading usually matter more than stretching alone.',
      'Late progression should rebuild sport movement tolerance carefully, especially cutting and acceleration.',
    ],
    nutritionNotes: [
      'Consistent protein helps preserve lower-limb strength while training volume is modified.',
      'Large energy deficits can reduce tolerance to rehab and strength rebuilding.',
      'Balanced meals are usually more useful than complex supplement stacks here.',
    ],
    faq: [
      {
        q: 'Why does sitting in the car irritate my hip so quickly?',
        a: 'Because hip flexion and compression are often part of the symptom-provoking position in FAI-type cases.',
      },
      {
        q: 'Can rehab help even if the shape of the hip is part of the problem?',
        a: 'Often yes. Strength, control, and load management can improve function and reduce symptoms in many cases.',
      },
    ],
  },
  de_quervain_tenosynovitis: {
    intro:
      'De Quervain symptoms usually respond to reducing thumb overload, calming irritability, and gradually rebuilding pinch and grip tolerance. The main target is making daily hand use comfortable again.',
    symptoms: [
      'Pain on the thumb side of the wrist',
      'Irritation with gripping, lifting, or picking up a child',
      'Tenderness near the base of the thumb',
      'Pain that builds with repeated thumb positioning',
    ],
    rehabNotes: [
      'Early phases often use splinting or activity modification to reduce repeated thumb stress.',
      'As pain settles, thumb range, grip tolerance, and forearm support work become more useful.',
      'Return should build through manageable hand tasks instead of sudden high-volume use.',
    ],
    nutritionNotes: [
      'Protein and consistent meals help tissue recovery when pain interrupts daily function.',
      'Omega-3 and anti-inflammatory food quality can support overall recovery habits.',
      'Supplements alone will not offset repeated thumb overload if the daily trigger remains unchanged.',
    ],
    faq: [
      {
        q: 'Why does holding my phone or baby make it worse?',
        a: 'Because those positions often keep the thumb tendons under repeated low-level strain for long periods.',
      },
      {
        q: 'Can the pain return after it improves?',
        a: 'Yes, especially if the same repetitive thumb loading returns quickly without better hand pacing.',
      },
    ],
  },
  cubital_tunnel_syndrome: {
    intro:
      'Cubital tunnel symptoms usually improve when elbow position, nerve irritation, and hand-forearm loading are managed together. The aim is to calm tingling and preserve hand function before weakness becomes more established.',
    symptoms: [
      'Numbness or tingling in the ring and little fingers',
      'Symptoms worsening with prolonged elbow bending',
      'Weak grip or clumsier fine hand control',
      'Inner elbow discomfort that can spread down the forearm',
    ],
    rehabNotes: [
      'Night positioning and avoiding long elbow flexion often help early symptom control.',
      'Later phases can include nerve glides, hand strengthening, and posture or workstation changes.',
      'Progress should focus on daily hand use and symptom frequency, not only pain intensity.',
    ],
    nutritionNotes: [
      'Regular protein intake helps when symptoms reduce training and hand use confidence.',
      'B12 adequacy matters in broader nerve-health discussions, but supplementation should be context-aware.',
      'Sleep quality matters because night symptoms often amplify fatigue and pain sensitivity.',
    ],
    faq: [
      {
        q: 'Why is it worse when I sleep with my elbow bent?',
        a: 'Because prolonged flexion can increase pressure on the ulnar nerve around the elbow during the night.',
      },
      {
        q: 'Can gym training continue with cubital tunnel symptoms?',
        a: 'Often yes, but gripping dose, elbow angles, and total upper-limb load may need modification first.',
      },
    ],
  },
  sciatica: {
    intro:
      'Sciatica is usually a nerve-sensitivity presentation rather than just a back-only problem. Good recovery depends on calming the irritated pathway, restoring movement, and avoiding repeated flare patterns.',
    symptoms: [
      'Pain traveling from the low back or buttock into the leg',
      'Pins and needles, burning, or numbness below the knee',
      'Symptoms worsening with sitting or certain bending positions',
      'Reduced confidence with walking, lifting, or long travel',
    ],
    rehabNotes: [
      'Early phases often emphasize symptom reduction, walking tolerance, and position changes that calm the leg.',
      'As irritability settles, nerve mobility, trunk work, and hip strength become more useful.',
      'Long-term success depends on managing recurring triggers, not only waiting for pain to vanish.',
    ],
    nutritionNotes: [
      'Steady meals, hydration, and enough protein can support recovery when movement drops.',
      'Very high supplement dosing is less useful than fixing low sleep, low movement quality, and inconsistent eating.',
      'Fiber and hydration matter if medication side effects affect bowel function.',
    ],
    faq: [
      {
        q: 'Is sciatica always caused by a disc problem?',
        a: 'Not always. Discs are common causes, but other sources can also irritate the nerve pathway or mimic similar leg symptoms.',
      },
      {
        q: 'Why does sitting aggravate it so much?',
        a: 'Because sustained positions can keep the nerve system or the involved spinal tissues under more constant irritation.',
      },
    ],
  },
  rheumatoid_arthritis: {
    intro:
      'Rheumatoid arthritis management is about reducing inflammatory burden while preserving joint function, strength, and independence. Rehab and nutrition work best when they support the medical treatment plan rather than compete with it.',
    symptoms: [
      'Multiple painful and swollen joints',
      'Morning stiffness that lasts a long time',
      'Fatigue and reduced daily energy',
      'Flare patterns that affect function across the week',
    ],
    rehabNotes: [
      'Flare periods often need activity scaling, joint protection, and low-irritation movement.',
      'Between flares, strength, walking tolerance, and hand function work can improve long-term independence.',
      'Pacing matters because pushing too hard on one good day can worsen the next few days.',
    ],
    nutritionNotes: [
      'An anti-inflammatory food pattern is more useful than chasing one “miracle” supplement.',
      'Protein remains important because chronic inflammation and lower activity can reduce muscle reserve.',
      'Medication review matters before adding high-dose supplements.',
    ],
    faq: [
      {
        q: 'Should I stop exercise during a flare?',
        a: 'Usually not completely. The intensity often needs adjustment, but gentle movement and joint protection still matter.',
      },
      {
        q: 'Can food cure rheumatoid arthritis?',
        a: 'No. Nutrition can support symptom management and general health, but it does not replace disease-modifying medical treatment.',
      },
    ],
  },
  gout: {
    intro:
      'Gout flares need symptom control in the short term and uric-acid management in the long term. The practical goal is to reduce flare frequency while protecting joint function and general metabolic health.',
    symptoms: [
      'Sudden severe joint pain, often overnight',
      'Red, hot, swollen joint that is very tender',
      'Flares commonly affecting the big toe but not limited to it',
      'Difficulty walking or tolerating even light contact during a flare',
    ],
    rehabNotes: [
      'During a flare, the priority is symptom calming and joint protection rather than exercise intensity.',
      'Between flares, walking, cycling, and weight-management support may improve overall health and tolerance.',
      'Long-term success depends more on flare prevention than on trying to push through an active attack.',
    ],
    nutritionNotes: [
      'Hydration matters a lot because fluid intake influences uric acid handling.',
      'Reducing high-purine triggers and sugary alcohol-heavy patterns is often more important than supplements.',
      'Steady body-weight management beats aggressive crash dieting in gout-prone patients.',
    ],
    faq: [
      {
        q: 'Why does gout often hit at night?',
        a: 'Several factors can contribute, including hydration status, temperature changes, and concentration of uric acid around the joint.',
      },
      {
        q: 'Should I exercise hard during a flare?',
        a: 'Usually no. Protecting the joint and calming the flare is the priority before returning to more normal training.',
      },
    ],
  },
  fibromyalgia: {
    intro:
      'Fibromyalgia usually improves through pacing, sleep support, gradually scaled movement, and reducing the boom-and-bust cycle. The aim is better function and steadier energy, not chasing pain-free perfection every day.',
    symptoms: [
      'Widespread body pain',
      'Fatigue and unrefreshing sleep',
      'Brain fog or reduced concentration',
      'Symptoms that flare with stress, overexertion, or poor recovery',
    ],
    rehabNotes: [
      'Very gradual activity progression often works better than intense short bursts followed by crashes.',
      'Walking, water exercise, breathing work, and light strength work can all fit when scaled carefully.',
      'Education and pacing are often as important as the exercise menu itself.',
    ],
    nutritionNotes: [
      'Simple, regular meals support energy stability better than long fasting or erratic intake.',
      'Magnesium may fit some patients, but sleep routine and stress load often have a bigger effect.',
      'Caffeine timing and hydration can noticeably change symptom experience in some people.',
    ],
    faq: [
      {
        q: 'Why do I crash after doing too much on a good day?',
        a: 'Because fibromyalgia often punishes large activity spikes, so pacing and consistent volume usually work better than boom-and-bust effort.',
      },
      {
        q: 'Is exercise still useful if it sometimes increases symptoms?',
        a: 'Yes, but the dose has to be small enough to be repeatable. The right amount helps more than complete inactivity.',
      },
    ],
  },
  concussion_recovery: {
    intro:
      'Concussion recovery is about graded return to cognitive and physical activity, not only bed rest. The aim is to let the brain recover while avoiding symptom-spike cycles and missing red flags.',
    symptoms: [
      'Headache, dizziness, or light sensitivity',
      'Mental fog or slower thinking',
      'Nausea, fatigue, or sleep disruption',
      'Symptoms worsening with screens, noise, or exertion',
    ],
    rehabNotes: [
      'Early rest is brief and strategic, then activity is reintroduced in graded steps.',
      'Progress should depend on symptom response, not pressure to “act normal” too soon.',
      'Return to sport or contact should follow a staged protocol with monitoring after each step.',
    ],
    nutritionNotes: [
      'Hydration and regular meals help when appetite, headaches, or nausea disrupt normal routines.',
      'Omega-3 rich foods can fit a generally brain-supportive diet, but they do not replace monitoring and graded return.',
      'Alcohol and sleep disruption usually worsen the recovery process.',
    ],
    faq: [
      {
        q: 'Why not stay in a dark room for a long time?',
        a: 'Because prolonged complete withdrawal can slow functional re-entry for some patients. Recovery usually goes better with staged, tolerable reintroduction.',
      },
      {
        q: 'When is sport return safe?',
        a: 'Only after symptoms settle and each stage of graded exertion is tolerated without next-day setback, ideally with medical guidance.',
      },
    ],
  },
};

export const injuryPageContentCatalog: Record<string, InjuryPageContent> = {
  ...injuryPageContent,
  ...injuryPageContentExtras,
};
