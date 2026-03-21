export type InjuryPageContent = {
  intro: string;
  symptoms: string[];
  faq: Array<{q: string; a: string}>;
  rehabNotes: string[];
  nutritionNotes: string[];
};

export const injuryPageContent: Record<string, InjuryPageContent> = {
  acl_injury: {
    intro:
      'ACL injuries usually need a longer rehab timeline than patients expect. The big priorities are swelling control, quadriceps retention, enough total calories, and a clear progression from prehab to strength and finally return-to-play.',
    symptoms: [
      'A pop during pivoting, landing, or contact',
      'Rapid knee swelling in the first hours after injury',
      'Instability or loss of trust in cutting and deceleration',
      'Quadriceps inhibition and weakness even when pain is settling',
    ],
    rehabNotes: [
      'Early work often focuses on extension range, swelling control, and quadriceps activation.',
      'Mid rehab usually shifts toward single-leg strength, rate of force development, and running progressions.',
      'Late rehab should include hop testing, change-of-direction prep, and sport-specific loading before return.',
    ],
    nutritionNotes: [
      'High-quality protein matters throughout the entire rehab timeline because muscle loss can happen early.',
      'Creatine is especially useful when training volume is reduced or after surgery.',
      'Carbohydrate timing becomes more important again once heavy strength work and field sessions return.',
    ],
    faq: [
      {
        q: 'Why does ACL rehab take so long?',
        a: 'Because the knee is not only healing tissue. You also need to restore strength, landing confidence, deceleration control, and sport tolerance before return becomes realistic.',
      },
      {
        q: 'What nutrition mistake hurts ACL rehab most?',
        a: 'Under-eating after activity drops. Many people move less, eat far less, and then lose more muscle than expected during rehab.',
      },
      {
        q: 'Is collagen enough for ACL recovery?',
        a: 'No. Collagen can be a useful add-on around rehab sessions, but it does not replace protein adequacy, strength work, or good loading progressions.',
      },
    ],
  },
  meniscus_tear: {
    intro:
      'Meniscus tears vary a lot. Some patients mainly struggle with swelling and twisting pain, while others have catching, locking, or surgery-related restrictions. The rehab plan should match the exact irritability and loading tolerance of the knee.',
    symptoms: [
      'Joint line pain when squatting or twisting',
      'Swelling after training or long walking',
      'Locking, catching, or a blocked feeling in the knee',
      'Reduced confidence with stairs, pivots, and deep flexion',
    ],
    rehabNotes: [
      'Early goals are usually symptom calming, restoring extension, and avoiding irritated twisting positions.',
      'As the knee settles, loading builds through controlled squats, split-stance work, and rotation tolerance.',
      'Return to sport depends more on symptom-free loading, hopping, and cutting tolerance than on time alone.',
    ],
    nutritionNotes: [
      'Protein distribution matters because the knee often limits training volume and muscle stimulus early on.',
      'Collagen plus vitamin C can fit well before planned rehab sessions if tolerated.',
      'Large energy deficits are a bad idea when the goal is to retain quad and calf strength.',
    ],
    faq: [
      {
        q: 'Should I rest completely with a meniscus tear?',
        a: 'Usually no. Most patients do better with symptom-guided loading than with prolonged total rest, unless a clinician has given strict protection instructions.',
      },
      {
        q: 'Why does twisting hurt more than straight-line walking?',
        a: 'Because the meniscus helps manage rotation and compression together. Twisting often loads the irritated tissue more than straight-line activity.',
      },
      {
        q: 'Does every meniscus tear need surgery?',
        a: 'No. Some tears are managed conservatively, while others are repaired or trimmed depending on symptoms, location, and mechanical issues like locking.',
      },
    ],
  },
  ankle_sprain: {
    intro:
      'A good ankle sprain plan does more than reduce swelling. It should rebuild balance, calf strength, landing control, and confidence for change of direction so the same ankle does not keep getting reinjured.',
    symptoms: [
      'Outer or inner ankle pain after rolling the foot',
      'Swelling and tenderness around the ligaments',
      'Fear of stepping, cutting, or landing on the injured side',
      'Loss of balance confidence on one leg',
    ],
    rehabNotes: [
      'Range of motion and swelling management matter early, but calf strength and balance quickly become key.',
      'Mid rehab should include single-leg stability, calf work, and direction-change preparation.',
      'Late rehab must restore hopping, landing, and reactive balance, not just walking without pain.',
    ],
    nutritionNotes: [
      'Protein adequacy and hydration help when appetite and daily movement both dip after injury.',
      'Vitamin C and collagen can fit especially well during the loading phase of ligament rehab.',
      'Alcohol often worsens recovery quality in the first few days by hurting hydration and sleep.',
    ],
    faq: [
      {
        q: 'Why do ankle sprains keep coming back?',
        a: 'Because many people stop rehab once swelling improves. The ankle still needs calf strength, balance retraining, and confidence under faster movement.',
      },
      {
        q: 'When can I run again?',
        a: 'Usually after walking is comfortable, hopping is controlled, and you can tolerate single-leg loading without next-day flare.',
      },
      {
        q: 'Does taping replace rehab?',
        a: 'No. It may help short-term support, but it does not replace strength, proprioception, and progressive return-to-sport work.',
      },
    ],
  },
  rotator_cuff: {
    intro:
      'Rotator cuff problems often behave like load-management problems as much as tissue problems. Good outcomes usually come from better shoulder loading, enough protein, and patience with overhead progressions.',
    symptoms: [
      'Pain when reaching overhead or away from the body',
      'Night discomfort or pain lying on the shoulder',
      'Weakness or heaviness with pressing or lifting',
      'Irritation after repeated overhead sets or throwing volume',
    ],
    rehabNotes: [
      'Early rehab usually emphasizes pain-limited loading, scapular control, and restoring tolerance rather than full rest.',
      'Mid rehab builds cuff strength, overhead capacity, and movement quality under load.',
      'Late phases should restore repeated overhead output, not just one pain-free rep.',
    ],
    nutritionNotes: [
      'Collagen timing before rehab can fit well with shoulder tendon loading sessions.',
      'Protein becomes more important when gym volume drops and muscle retention is harder.',
      'Under-fueling is a frequent reason overhead athletes plateau during rehab.',
    ],
    faq: [
      {
        q: 'Should I stop all shoulder training?',
        a: 'Usually no. Most people do better with modified shoulder loading than with total inactivity, as long as painful volume and exercise selection are managed well.',
      },
      {
        q: 'Why does it hurt more at night?',
        a: 'Night pain is common when the shoulder is irritable and compressed positions stay too long without support or movement.',
      },
      {
        q: 'Can I keep pressing during rehab?',
        a: 'Sometimes yes, but exercise choice, range, tempo, and volume often need to change first so the cuff can tolerate the work.',
      },
    ],
  },
  low_back_pain: {
    intro:
      'Low back pain is rarely only a “rest and wait” problem. For many people it improves faster when movement is adjusted intelligently, trunk capacity is rebuilt, and recovery habits stop making the area more irritable.',
    symptoms: [
      'Pain or stiffness after sitting, lifting, or waking up',
      'Loss of confidence with bending or prolonged standing',
      'Pain that builds with repeated loading or long static posture',
      'Episodes that settle and then flare again with load spikes',
    ],
    rehabNotes: [
      'Early rehab often focuses on calming sensitive movements, improving tolerance, and restoring confidence in basic positions.',
      'Strength work usually returns through hinging, trunk endurance, and hip contribution rather than endless stretching alone.',
      'Long-term success depends on managing training spikes, sleep, and repeated life stressors as well as exercise choice.',
    ],
    nutritionNotes: [
      'Nutrition is rarely the only driver, but poor hydration, low protein, and very low energy intake can reduce tissue tolerance and recovery.',
      'If body composition is part of the problem, use a mild deficit rather than aggressive cutting while pain is high.',
      'Regular protein feedings often help when back pain reduces gym volume and daily movement quality.',
    ],
    faq: [
      {
        q: 'Should I rest in bed when my back hurts?',
        a: 'Usually not for long. Short relief can help in acute flare-ups, but prolonged bed rest often worsens stiffness, deconditioning, and fear of movement.',
      },
      {
        q: 'Why does my back pain keep recurring?',
        a: 'Because the trigger is often not one event. Repeated load spikes, poor sleep, low movement variety, and inconsistent trunk capacity all contribute.',
      },
      {
        q: 'Is stretching enough?',
        a: 'Usually no. Flexibility may help some patients, but trunk strength, hip contribution, movement confidence, and load management are often more important.',
      },
    ],
  },
  patellar_tendinopathy: {
    intro:
      'Patellar tendon pain often needs a long enough loading plan, not random rest. The key is to rebuild tolerance from pain-calming isometrics toward heavy slow resistance and eventually jumping or sport elasticity.',
    symptoms: [
      'Pain at the bottom of the kneecap during jumping or landing',
      'Stiffness when starting training that may warm up later',
      'Pain after repeated squats, stairs, or court sessions',
      'Reduced tolerance for explosive knee-dominant work',
    ],
    rehabNotes: [
      'Isometrics can help settle pain early, but long-term progress usually needs progressive tendon loading.',
      'Heavy slow resistance and split-stance work often become core parts of rehab.',
      'Jumping must return gradually, not all at once, because the tendon needs repeated exposure to rebuild spring tolerance.',
    ],
    nutritionNotes: [
      'Collagen plus vitamin C before tendon loading can fit well here.',
      'Athletes often under-fuel on lower-volume days and then expect good tendon adaptation anyway.',
      'Protein and carbohydrate timing matter more when court or field sessions come back in.',
    ],
    faq: [
      {
        q: 'Why does the tendon hurt most with jumping?',
        a: 'Because jumping loads the tendon quickly and elastically. A painful tendon often loses tolerance for those high-rate forces before slower strength work.',
      },
      {
        q: 'Should I stop sports completely?',
        a: 'Not always. Some athletes can keep part of training if the total tendon load is managed well and symptoms stay within acceptable limits.',
      },
      {
        q: 'Do knee straps fix patellar tendinopathy?',
        a: 'They may help symptoms in some cases, but they do not replace a real loading plan.',
      },
    ],
  },
  plantar_fasciitis: {
    intro:
      'Plantar fasciitis often behaves like a foot-loading problem rather than a simple inflammation problem. The best plans usually combine calf-foot strength, smarter load progression, and enough recovery support for tissue adaptation.',
    symptoms: [
      'Sharp heel pain with first steps in the morning',
      'Pain after long standing or walking volume',
      'Foot soreness that spikes after runs or jumps',
      'Reduced confidence barefoot or on hard floors',
    ],
    rehabNotes: [
      'Calf strength, foot intrinsic control, and progressive loading usually matter more than passive treatments alone.',
      'Morning pain often improves more slowly than daytime function, so progress should be judged across the whole week.',
      'Return to running should build through controlled exposure, not by waiting for zero symptoms forever.',
    ],
    nutritionNotes: [
      'Protein, hydration, and sensible energy intake support tissue remodeling when foot pain lowers activity quality.',
      'Collagen timing can fit well before calf raises or foot loading sessions.',
      'Sudden body-weight or training-volume changes often matter more than supplement choice alone.',
    ],
    faq: [
      {
        q: 'Why is the first step in the morning the worst?',
        a: 'Because the fascia and surrounding calf-foot system stiffen overnight, then get loaded suddenly when you stand up.',
      },
      {
        q: 'Do I need complete rest from walking?',
        a: 'Usually no. Most patients do better with smarter volume and footwear management than with trying to eliminate walking completely.',
      },
      {
        q: 'Are massage and ice enough?',
        a: 'They may reduce symptoms temporarily, but long-term improvement usually needs loading progression and foot-calf capacity work.',
      },
    ],
  },
  shoulder_impingement: {
    intro:
      'Shoulder impingement symptoms usually improve when overhead mechanics, cuff strength, and training dose all get addressed together. The goal is not only pain relief, but better repeated shoulder tolerance.',
    symptoms: [
      'Pinching when lifting the arm overhead',
      'Pain with pressing, reaching, or sleeping on the shoulder',
      'Loss of confidence in upper-range movement',
      'Symptoms that build with repeated overhead volume',
    ],
    rehabNotes: [
      'Early rehab often focuses on reducing irritability and rebuilding pain-free overhead patterns.',
      'Rotator cuff and scapular strength become more important as volume tolerance returns.',
      'Late rehab should expose the shoulder to repeated overhead work, not just controlled clinic-style movements.',
    ],
    nutritionNotes: [
      'Protein and overall calories matter because shoulder pain often reduces upper-body training dose quickly.',
      'Collagen may be helpful around tendon-focused shoulder rehab sessions.',
      'Low sleep quality often keeps shoulder symptoms more reactive, so recovery habits matter here too.',
    ],
    faq: [
      {
        q: 'Is impingement only a structural problem?',
        a: 'Usually not. Symptoms often reflect a mix of load tolerance, cuff capacity, scapular control, and training volume, not just one piece of anatomy.',
      },
      {
        q: 'Can I still train chest and shoulders?',
        a: 'Often yes, but exercise choice, grip, range, and weekly volume may need adjustment until the shoulder calms down.',
      },
      {
        q: 'Why does it return when I increase volume again?',
        a: 'Because the shoulder may tolerate one hard session before it tolerates repeated weekly exposure. Capacity has to be rebuilt over time.',
      },
    ],
  },
  stress_fracture: {
    intro:
      'Stress fractures are often as much about load history and energy availability as they are about pain. Recovery usually depends on respecting bone-healing time, correcting under-fueling, and rebuilding impact in a patient progression.',
    symptoms: [
      'Pain that starts with loading and can become more constant later',
      'Tenderness over a specific bone area',
      'Pain that worsens with impact or repeated training days',
      'A history of rapid volume increase, low intake, or repeated overuse',
    ],
    rehabNotes: [
      'Healing phases must respect protected loading first; trying to “push through” bone symptoms often prolongs recovery.',
      'Return to impact should build through strength and carefully graded running or jumping exposure.',
      'Repeated stress fractures should trigger a wider review of sleep, menstrual health, body composition pressure, or low energy availability.',
    ],
    nutritionNotes: [
      'Adequate total calories are not optional here. Many stress fractures are harder to heal when energy intake stays too low.',
      'Calcium and vitamin D matter, but they work best when the overall diet is sufficient.',
      'Protein supports both tissue repair and muscle retention while activity is restricted.',
    ],
    faq: [
      {
        q: 'Why do stress fractures happen even in fit athletes?',
        a: 'Because fitness does not fully protect against rapid load spikes, poor recovery, low energy availability, or repeated biomechanical stress.',
      },
      {
        q: 'Can I cross-train while it heals?',
        a: 'Often yes, if the chosen activity does not aggravate symptoms and has been cleared for the specific injury site.',
      },
      {
        q: 'Is calcium alone enough to fix a stress fracture?',
        a: 'No. Calcium helps bone health, but healing also depends on adequate energy intake, vitamin D status, load management, and time.',
      },
    ],
  },
  acl_reconstruction: {
    intro:
      'ACL reconstruction is a post-surgical marathon, not a short block. Nutrition and rehab need to support wound healing early, preserve lean mass through restrictions, and later power high-quality strength and field work.',
    symptoms: [
      'Post-op swelling, stiffness, and appetite disruption',
      'Quadriceps inhibition and weakness after surgery',
      'Fatigue during early rehab because loading capacity drops fast',
      'Loss of confidence with running, deceleration, and direction changes later on',
    ],
    rehabNotes: [
      'The first phase is about extension, swelling control, wound healing, and reducing early muscle loss.',
      'Mid rehab usually builds strength symmetry, single-leg loading, and running tolerance.',
      'Late rehab must restore explosive confidence, hop quality, and sport-specific endurance before return.',
    ],
    nutritionNotes: [
      'Post-op appetite loss makes protein planning even more important in the first weeks.',
      'Creatine fits well once regular rehab and strength work are underway.',
      'Collagen may be useful before tendon or jumping sessions in later phases, but it is not the main driver.',
    ],
    faq: [
      {
        q: 'Why is protein so important after ACL reconstruction?',
        a: 'Because surgery plus reduced loading creates a strong environment for muscle loss, especially in the quadriceps, unless protein and rehab are handled well.',
      },
      {
        q: 'When does nutrition matter most after surgery?',
        a: 'Immediately. Appetite, hydration, protein quality, and total calorie intake matter from the first week onward, not only later in rehab.',
      },
      {
        q: 'Can I diet aggressively after surgery?',
        a: 'Usually that is a bad tradeoff. Aggressive restriction can worsen muscle retention, energy, and rehab quality in the early post-op period.',
      },
    ],
  },
  achilles_tendinopathy: {
    intro:
      'Achilles pain usually responds best to a patient loading plan, not random stretching and hoping. Good outcomes come from rebuilding calf strength, tendon stiffness tolerance, and running elasticity step by step.',
    symptoms: [
      'Pain or stiffness in the Achilles during the first steps of the day',
      'Tenderness after running, jumping, or hill work',
      'Reduced tolerance for calf raises, skipping, or sprinting',
      'A tendon that feels better when warmed up but worse later',
    ],
    rehabNotes: [
      'Most plans start by settling irritability and improving pain tolerance during simple calf loading.',
      'Heavy slow calf work usually becomes a core part of tendon rebuilding.',
      'Running and jumping must come back gradually because the tendon needs repeated elastic exposure to adapt.',
    ],
    nutritionNotes: [
      'Collagen with vitamin C can fit well before tendon loading sessions.',
      'Protein and total calories matter because tendon adaptation is poorer when recovery is under-fueled.',
      'Carbohydrate timing matters more once running volume begins to rise again.',
    ],
    faq: [
      {
        q: 'Should I stretch my Achilles more when it hurts?',
        a: 'Not always. Many people need better loading tolerance first. Stretching alone rarely solves the problem if calf strength and tendon capacity stay low.',
      },
      {
        q: 'Why does it feel better after warming up?',
        a: 'That is common in tendinopathy. Symptoms often ease during a session, but that does not mean the tendon is ready for unlimited load.',
      },
      {
        q: 'Can I keep running with Achilles pain?',
        a: 'Sometimes yes, if the total load is managed well and symptoms do not keep escalating across the week.',
      },
    ],
  },
  patellofemoral_pain: {
    intro:
      'Patellofemoral pain often reflects how the whole lower limb is handling load, not only what the kneecap itself is doing. The strongest plans usually rebuild tolerance through hip strength, quad strength, and smarter volume management.',
    symptoms: [
      'Pain around or behind the kneecap',
      'Symptoms with stairs, squats, running, or long sitting',
      'Irritation after sudden increases in knee-heavy training',
      'Reduced confidence in deep knee bending or downhill loading',
    ],
    rehabNotes: [
      'Hip and quadriceps capacity are often more important than passive treatments alone.',
      'Early progress usually comes from reducing aggravating volume and improving controlled knee loading.',
      'Return to harder running or jumping should wait until repeated knee-dominant work is tolerable.',
    ],
    nutritionNotes: [
      'Weight management can matter here, but large deficits often reduce rehab quality.',
      'Consistent protein supports quadriceps retention when knee loading is limited.',
      'Hydration and regular fueling help when training load is being rebuilt.',
    ],
    faq: [
      {
        q: 'Why does sitting too long make the knee hurt?',
        a: 'Because the patellofemoral joint can become more sensitive in flexed positions for long periods, especially when overall knee load tolerance is low.',
      },
      {
        q: 'Is it only a kneecap tracking issue?',
        a: 'Usually not. Hip control, training volume, quadriceps capacity, and overall lower-limb loading all matter.',
      },
      {
        q: 'Can I still squat with patellofemoral pain?',
        a: 'Often yes, but depth, tempo, range, and total volume may need adjustment until the knee becomes less reactive.',
      },
    ],
  },
  neck_pain: {
    intro:
      'Neck pain is often driven by posture tolerance, stress, sleep quality, and movement habits more than one single tissue injury. A good plan usually reduces sensitivity, improves movement confidence, and builds tolerance for daily positions again.',
    symptoms: [
      'Stiffness when turning or tilting the head',
      'Pain after desk work, stress, or poor sleep',
      'Tightness spreading into the upper trapezius or shoulder blade area',
      'Headaches or fatigue during long static postures',
    ],
    rehabNotes: [
      'Frequent small movement breaks often matter more than one long stretching session.',
      'Deep neck flexor work, thoracic mobility, and shoulder-blade control often support better outcomes.',
      'Stress and sleep management are often overlooked even though they strongly affect flare-ups.',
    ],
    nutritionNotes: [
      'Hydration and regular meals help because fatigue and low recovery often increase pain sensitivity.',
      'Protein and total calorie adequacy matter if gym volume has dropped because of recurring pain.',
      'Caffeine, poor sleep timing, and stress can aggravate symptom sensitivity more than people expect.',
    ],
    faq: [
      {
        q: 'Is my neck pain only because of bad posture?',
        a: 'Usually not. Posture matters, but tolerance, stress, sleep, work setup, and movement variety all contribute.',
      },
      {
        q: 'Should I avoid moving my neck when it hurts?',
        a: 'Usually gentle movement is better than total guarding, unless a clinician has ruled otherwise.',
      },
      {
        q: 'Why do symptoms return during stressful weeks?',
        a: 'Because stress often increases muscle guarding, worsens sleep, and lowers movement quality at the same time.',
      },
    ],
  },
  carpal_tunnel_syndrome: {
    intro:
      'Carpal tunnel symptoms often need a mix of load modification, wrist positioning changes, and smarter recovery habits rather than only rest. The aim is to calm nerve irritation while preserving hand and forearm function.',
    symptoms: [
      'Numbness or tingling in the thumb, index, or middle fingers',
      'Night symptoms or waking with hand discomfort',
      'Weak grip or hand fatigue with repeated tasks',
      'Irritation during keyboard, phone, or gripping work',
    ],
    rehabNotes: [
      'Night splinting and wrist position changes often help settle symptoms early.',
      'Forearm and upper-limb loading sometimes needs adjustment while nerve irritability calms down.',
      'Long-term improvement often depends on reducing repeated compression patterns, not only resting the wrist for a day or two.',
    ],
    nutritionNotes: [
      'Nutrition is not the main treatment, but hydration, body-weight management, and sleep quality can influence symptom sensitivity.',
      'If overall activity is down because of hand pain, protein still matters for retaining training quality elsewhere.',
      'Large inflammatory swings from poor sleep and inconsistent meals can make symptoms feel worse.',
    ],
    faq: [
      {
        q: 'Why are symptoms worse at night?',
        a: 'Wrist position during sleep can increase pressure in the carpal tunnel, especially when the nerve is already irritated.',
      },
      {
        q: 'Do I need to stop using my hand completely?',
        a: 'Usually no. Most people do better with modified exposure than with trying to avoid all hand use entirely.',
      },
      {
        q: 'Can gym training continue with carpal tunnel symptoms?',
        a: 'Often yes, but wrist positions, gripping volume, and exercise choices may need adjustment temporarily.',
      },
    ],
  },
  labrum_tear: {
    intro:
      'Labral injuries can be very different depending on whether the shoulder or hip is involved, but in both cases the plan should improve joint control, loading confidence, and tolerance to repeated motion instead of chasing pain only.',
    symptoms: [
      'Deep joint pain in the shoulder or hip',
      'Clicking, catching, or instability sensations',
      'Pain in end-range positions or under repeated sport loading',
      'Loss of confidence with rotation, pivoting, or overhead work',
    ],
    rehabNotes: [
      'Movement quality and strength around the joint often matter more than passive rest alone.',
      'The program should match whether symptoms are more instability-driven, compression-driven, or surgery-related.',
      'Return to sport or hard training needs repeated high-quality exposure, not just one good session.',
    ],
    nutritionNotes: [
      'Protein is especially important when shoulder or hip pain reduces normal training volume.',
      'Collagen and vitamin C may fit around connective tissue loading sessions in later rehab.',
      'Avoid very low-energy dieting while trying to rebuild stability and strength around a labral injury.',
    ],
    faq: [
      {
        q: 'Does every labral tear need surgery?',
        a: 'No. Some patients respond well to rehabilitation, while others need surgery depending on instability, locking, sport demands, or persistent symptoms.',
      },
      {
        q: 'Why does the joint click even if pain is not constant?',
        a: 'Clicking can happen when the joint is irritated or less stable, but the sound itself matters less than whether it is painful or limiting.',
      },
      {
        q: 'Can I still train around a labral injury?',
        a: 'Often yes, but exercise selection, depth, speed, and weekly volume usually need more careful management.',
      },
    ],
  },
  hamstring_tendon_injury: {
    intro:
      'Hamstring tendon problems are often slower and more stubborn than a simple muscle strain. The recovery plan has to rebuild tendon tolerance under lengthened load and eventually prepare for speed and hip-dominant power again.',
    symptoms: [
      'Deep pain near the sit bone or upper hamstring',
      'Irritation with sprinting, hinging, or long sitting',
      'Stiffness that increases with repeated hip flexion under load',
      'Loss of confidence in high-speed running or explosive hinging',
    ],
    rehabNotes: [
      'Early progress often comes from reducing irritable compression positions and rebuilding controlled tendon loading.',
      'Hip-dominant strength and eccentric tolerance become key in mid rehab.',
      'Late rehab must expose the tendon to speed and force again before return to sprinting is realistic.',
    ],
    nutritionNotes: [
      'Collagen plus vitamin C can be useful before planned tendon loading sessions.',
      'Protein adequacy matters because glute and hamstring strength loss often sneaks in when running volume drops.',
      'Carbohydrate support becomes more important again when sprint and field work return.',
    ],
    faq: [
      {
        q: 'Why does sitting irritate the hamstring tendon?',
        a: 'Because the tendon can be compressed near its attachment when you sit for long periods, especially if it is already reactive.',
      },
      {
        q: 'Is stretching the answer?',
        a: 'Usually not by itself. Many tendon cases need smarter loading more than aggressive stretching.',
      },
      {
        q: 'When can sprinting come back?',
        a: 'Usually after hinging, single-leg loading, and progressive speed exposures are tolerated without next-day flare.',
      },
    ],
  },
  gymnast_wrist_injury: {
    intro:
      'Gymnast wrist injuries usually reflect repeated high-volume compression through an immature or overloaded wrist. The best plans reduce irritability, protect growth-related tissue when relevant, and rebuild loading tolerance gradually.',
    symptoms: [
      'Wrist pain during hand support, vaulting, or tumbling',
      'Irritation after repeated extension loading',
      'Reduced confidence in weight-bearing through the hands',
      'Tenderness or stiffness that worsens with practice volume',
    ],
    rehabNotes: [
      'Early management often includes reducing loaded wrist extension volume and modifying practice.',
      'Forearm, shoulder, and hand support strength become more important as symptoms settle.',
      'A full return should rebuild impact and hand-loading tolerance step by step, not session by session.',
    ],
    nutritionNotes: [
      'Young athletes especially need enough total calories to support both training and tissue healing.',
      'Protein and calcium-rich foods matter more when growth and recovery are happening at the same time.',
      'Low-energy availability can make repeated wrist overload much harder to recover from.',
    ],
    faq: [
      {
        q: 'Why are gymnast wrist injuries so common?',
        a: 'Because gymnastics loads the wrist like a weight-bearing joint repeatedly, often under high volume and high extension angles.',
      },
      {
        q: 'Can wrist supports fix the problem alone?',
        a: 'No. They may help symptoms, but practice modification and progressive reloading still matter.',
      },
      {
        q: 'Should young athletes keep training through wrist pain?',
        a: 'Usually that is risky, especially if growth-related tissue is involved. Symptoms should be assessed and training modified early.',
      },
    ],
  },
  runners_knee_patellar_tendon: {
    intro:
      'Runner’s knee and patellar tendon irritation often happen when training load rises faster than tissue tolerance. Good results usually come from better load planning, lower-limb strength, and enough fuel to support adaptation.',
    symptoms: [
      'Anterior knee pain during runs, stairs, or hills',
      'Pain that builds with mileage or speed work',
      'Stiffness around the kneecap or tendon after sessions',
      'Reduced confidence in downhill, tempo, or jump work',
    ],
    rehabNotes: [
      'Running load often needs adjustment first, but strength work usually drives the long-term fix.',
      'Quadriceps, calf, and hip capacity all matter in returning the knee to regular mileage.',
      'The return to speed should be layered in after steady easy running and strength are tolerable.',
    ],
    nutritionNotes: [
      'Under-fueling is common in runners and can quietly slow tendon and joint adaptation.',
      'Protein supports strength retention while run volume is modified.',
      'Carbohydrates are especially important if symptoms started during higher mileage or intensity blocks.',
    ],
    faq: [
      {
        q: 'Should I stop running completely?',
        a: 'Not always. Some runners can stay running with smart mileage changes, while others need a short reset before building back up.',
      },
      {
        q: 'Why do hills make it worse?',
        a: 'Because they increase knee loading and often raise demand on the patellofemoral joint or tendon beyond current tolerance.',
      },
      {
        q: 'Does foam rolling fix runner’s knee?',
        a: 'It may help symptoms temporarily, but long-term progress usually needs better strength and better run-load management.',
      },
    ],
  },
  mcl_sprain: {
    intro:
      'MCL sprains usually recover better than people expect when valgus stress is calmed early and strength is rebuilt without rushing pivots. The main priorities are swelling control, medial knee confidence, and gradual return to cutting or contact.',
    symptoms: [
      'Pain on the inner side of the knee after twisting or contact',
      'Tenderness along the medial ligament and discomfort with side-to-side stress',
      'Swelling or stiffness after walking, cutting, or stairs',
      'Loss of trust when planting or changing direction',
    ],
    rehabNotes: [
      'Early rehab usually protects the knee from repeated valgus stress while restoring comfortable motion and gait.',
      'Mid phases focus on quadriceps, adductor, and single-leg control so the knee tolerates frontal-plane load again.',
      'Return to sport should include cutting, deceleration, and contact confidence rather than straight-line running only.',
    ],
    nutritionNotes: [
      'Protein adequacy matters because knee injuries can reduce lower-limb loading quickly and lead to strength loss.',
      'Collagen plus vitamin C can fit before planned ligament-loading sessions if tolerated.',
      'Avoid large calorie cuts while you are trying to regain knee strength and confidence.',
    ],
    faq: [
      {
        q: 'Why does the knee feel unstable even if I can walk?',
        a: 'Because walking demands much less frontal-plane control than pivoting, cutting, or side-step loading on an irritated MCL.',
      },
      {
        q: 'Do braces replace rehab for MCL sprains?',
        a: 'No. A brace may help early protection, but real recovery still depends on strength, control, and progressive loading.',
      },
      {
        q: 'When can side-to-side drills return?',
        a: 'Usually after straight-line loading is calm, single-leg control is solid, and lateral stress does not trigger next-day flare.',
      },
    ],
  },
  lcl_sprain: {
    intro:
      'LCL sprains can feel deceptively mild in daily walking yet become obvious when lateral knee stability is challenged. Rehab works best when it rebuilds confidence for side loading, pivoting, and uneven-ground control.',
    symptoms: [
      'Pain on the outer side of the knee after twisting or a side impact',
      'Tenderness with lateral knee pressure or side-step stress',
      'Instability during cutting, pivoting, or uneven surfaces',
      'Reduced trust in fast deceleration or direction change',
    ],
    rehabNotes: [
      'Early loading should respect lateral knee irritability while restoring basic gait and extension tolerance.',
      'Single-leg balance, lateral chain strength, and frontal-plane control become central in mid rehab.',
      'Late rehab needs true lateral reactivity, not just pain-free squats in a straight line.',
    ],
    nutritionNotes: [
      'Regular protein feedings help limit muscle loss when running and field work are reduced.',
      'Hydration and sleep quality often matter more than supplements in the first few reactive days.',
      'Once heavier lower-body work returns, carbohydrate intake supports better output and tissue loading tolerance.',
    ],
    faq: [
      {
        q: 'Why does the outer knee feel worse on uneven ground?',
        a: 'Because uneven surfaces demand faster lateral stabilization, which exposes lingering LCL irritability more than flat walking does.',
      },
      {
        q: 'Can I train legs while an LCL sprain settles?',
        a: 'Often yes, but exercise choice usually needs to bias controlled bilateral and single-leg work before aggressive cutting drills return.',
      },
      {
        q: 'Is soreness after side steps normal?',
        a: 'Some mild response can be acceptable, but repeated next-day flare means lateral loading is still ahead of current tolerance.',
      },
    ],
  },
  glenohumeral_dislocation: {
    intro:
      'Shoulder dislocation rehab is about more than getting the joint back in place. The longer-term goals are restoring cuff control, overhead confidence, and stability under speed so the shoulder is less likely to slip again.',
    symptoms: [
      'A clear episode of the shoulder shifting out or feeling partially out',
      'Apprehension with overhead or abducted-external rotation positions',
      'Weakness or loss of trust during pressing, reaching, or contact',
      'Pain and guarding after sudden shoulder movement',
    ],
    rehabNotes: [
      'Early phases often focus on calming irritation, regaining safe range, and reintroducing cuff activation.',
      'Mid rehab builds dynamic shoulder stability, scapular control, and tolerance in vulnerable positions.',
      'Return to sport should include speed, perturbation, and repeated overhead or contact exposure if relevant.',
    ],
    nutritionNotes: [
      'Protein intake is important because upper-body unloading can lead to quick muscle loss around the shoulder.',
      'Creatine can be useful when gym training is reduced or after immobilization periods.',
      'Aggressive dieting often makes it harder to rebuild shoulder strength and confidence after instability episodes.',
    ],
    faq: [
      {
        q: 'Why does the shoulder still feel unstable after pain improves?',
        a: 'Because pain can settle before the cuff, scapular control, and position-specific confidence are fully restored.',
      },
      {
        q: 'Do first-time dislocations always need surgery?',
        a: 'Not always. Management depends on age, sport demands, recurrence risk, associated damage, and how instability behaves during rehab.',
      },
      {
        q: 'When can overhead lifting return?',
        a: 'Usually after lower-range control is solid, apprehension drops, and repeated shoulder loading is tolerated without instability symptoms.',
      },
    ],
  },
  osteoarthritis_flare: {
    intro:
      'An osteoarthritis flare, especially knee OA, is usually a load-tolerance problem rather than a signal to stop moving forever. The best plans calm the flare, maintain daily function, and then rebuild joint confidence with steady strength work, walking tolerance, and pacing.',
    symptoms: [
      'Joint stiffness after rest or in the morning',
      'Pain that rises after too much standing, walking, or heavy loading',
      'Swelling or aching in a knee, hip, or shoulder during flare periods',
      'Reduced confidence with stairs, carrying, or longer activity blocks',
    ],
    rehabNotes: [
      'Short-term calming often depends on pacing, symptom-guided movement, and avoiding sudden volume spikes.',
      'Long-term progress usually comes from strength work, walking tolerance, and consistent daily loading rather than inactivity, especially in knee OA where quadriceps strength matters a lot.',
      'A flare should be used to adjust dose, not to abandon all movement unless a clinician has said otherwise.',
    ],
    nutritionNotes: [
      'Weight management can help many patients, but aggressive restriction during a painful flare often worsens energy and function.',
      'Protein remains important because lower activity can quickly reduce muscle quality around the affected joint.',
      'Regular meals, hydration, and sleep quality often influence flare tolerance more than people expect.',
    ],
    faq: [
      {
        q: 'Should I rest completely during an arthritis flare?',
        a: 'Usually no. Gentle, tolerable movement often helps more than complete rest, as long as the total dose is scaled down.',
      },
      {
        q: 'What helps knee OA most in the long run?',
        a: 'For many people, the biggest wins come from better quadriceps strength, steady walking tolerance, body-weight management when relevant, and avoiding big activity spikes.',
      },
      {
        q: 'Why does stiffness improve once I get moving?',
        a: 'Because joints often feel less stiff after circulation, temperature, and repeated motion improve, even when the joint is still sensitive.',
      },
      {
        q: 'Is pain during a flare the same as more damage?',
        a: 'Not necessarily. Flares often reflect temporary irritability and overload rather than a sudden large structural change.',
      },
    ],
  },
  bursitis: {
    intro:
      'Bursitis often becomes stubborn when compression and repeated friction stay high. Good rehab reduces the irritant first, then rebuilds the surrounding strength and movement quality so the area is not repeatedly provoked.',
    symptoms: [
      'Localized swelling or tenderness near a joint',
      'Pain with compression, kneeling, leaning, or repeated rubbing',
      'Irritation when lifting, reaching, or lying on the affected side',
      'Symptoms that calm with unloading but return with repeated exposure',
    ],
    rehabNotes: [
      'Early management often centers on reducing the exact compression or friction pattern that keeps irritating the bursa.',
      'Strength and motor control around the joint become more important as pain settles.',
      'Return to normal training should address why the overload kept recurring, not only the painful spot itself.',
    ],
    nutritionNotes: [
      'Protein and sensible calorie intake help when pain is limiting normal training volume.',
      'Sleep quality matters because poor sleep often amplifies sensitivity around already irritated tissue.',
      'Hydration and general recovery habits support better tolerance when activity is reintroduced.',
    ],
    faq: [
      {
        q: 'Why does lying on the area make bursitis worse?',
        a: 'Because direct compression can mechanically irritate the bursa even when other movements are relatively tolerable.',
      },
      {
        q: 'Is injection the only fix?',
        a: 'Not always. Some cases improve well with load modification and rehab, while others need medical treatment depending on severity and persistence.',
      },
      {
        q: 'Can I still train around bursitis?',
        a: 'Often yes, but you need to reduce the exact movements or positions that keep compressing the irritated area.',
      },
    ],
  },
  tmj_disorder: {
    intro:
      'TMJ symptoms often sit at the intersection of jaw loading, stress, sleep, and muscle guarding. A practical plan usually reduces chewing overload, calms sensitivity, and restores more comfortable jaw movement over time.',
    symptoms: [
      'Jaw pain with chewing, clenching, or wide opening',
      'Clicking, tightness, or fatigue around the jaw',
      'Headaches, facial tension, or ear-area discomfort',
      'Morning soreness after nighttime clenching or poor sleep',
    ],
    rehabNotes: [
      'Early progress often starts with reducing clenching, gum chewing, and repeated high-load jaw use.',
      'Gentle mobility, relaxation strategies, and neck-posture support can all matter in persistent cases.',
      'Stress reduction is often part of treatment, not just an extra suggestion, because many flares are stress-driven.',
    ],
    nutritionNotes: [
      'Short-term softer foods can reduce jaw irritability without under-eating if meals are still protein-rich and balanced.',
      'Caffeine and stress-related sleep disruption can worsen clenching patterns in some patients.',
      'Regular meals help avoid long gaps that sometimes increase jaw tension or compensatory chewing habits later.',
    ],
    faq: [
      {
        q: 'Why does my jaw hurt more in stressful weeks?',
        a: 'Because stress often increases clenching, neck tension, and poor sleep, all of which can amplify TMJ symptoms.',
      },
      {
        q: 'Should I avoid opening my mouth wide at all?',
        a: 'Usually you should avoid provoking extremes early, but gentle controlled movement is often still part of recovery.',
      },
      {
        q: 'Can neck posture affect jaw pain?',
        a: 'Yes. Neck tension and posture habits can influence jaw mechanics and symptom sensitivity more than many people expect.',
      },
    ],
  },
  scaphoid_fracture: {
    intro:
      'Scaphoid fractures deserve respect because they can look mild at first yet heal slowly if missed or under-protected. The priorities are early recognition, proper immobilization when needed, and maintaining the rest of the upper limb while healing progresses.',
    symptoms: [
      'Pain in the thumb-side wrist after a fall on the hand',
      'Tenderness in the anatomical snuffbox area',
      'Pain with gripping, pushing up from a chair, or wrist extension',
      'Persistent wrist discomfort despite a seemingly minor injury',
    ],
    rehabNotes: [
      'Protection and medical follow-up matter early because healing decisions are often imaging-driven here.',
      'Once cleared, wrist range, grip strength, and forearm control should return progressively rather than all at once.',
      'The shoulder and elbow should stay as active as possible during wrist protection to limit overall deconditioning.',
    ],
    nutritionNotes: [
      'Adequate calories, protein, calcium-rich foods, and vitamin D support fracture healing better than restrictive dieting.',
      'Smoking and poor sleep can quietly work against bone healing quality.',
      'Protein intake still matters even if the main injury is bone because overall upper-limb muscle loss can happen during immobilization.',
    ],
    faq: [
      {
        q: 'Why can a scaphoid fracture be missed at first?',
        a: 'Because early swelling may be limited and initial symptoms can resemble a simple wrist sprain despite a real fracture.',
      },
      {
        q: 'Should I keep training lower body while the wrist heals?',
        a: 'Often yes, as long as exercises do not stress the healing wrist and your clinician has not restricted overall loading.',
      },
      {
        q: 'When can gripping work return?',
        a: 'Only after healing status and medical clearance support progressive wrist loading, because the scaphoid can heal slowly.',
      },
    ],
  },
  hip_dysplasia_labral_tear: {
    intro:
      'Hip dysplasia and labral-related pain often improve most when the program targets hip control, irritability management, and repeated movement quality rather than forcing deep painful positions. The aim is to restore loading confidence without repeatedly pinching the joint.',
    symptoms: [
      'Deep groin or front-of-hip pain with flexion or rotation',
      'Clicking, catching, or instability sensations around the hip',
      'Pain with long sitting, pivoting, running, or deep squatting',
      'Loss of trust in single-leg stance or change-of-direction work',
    ],
    rehabNotes: [
      'Early rehab often reduces irritable flexion-compression positions while rebuilding basic hip and trunk control.',
      'Glute strength, pelvic control, and gradual single-leg loading usually matter more than stretching harder into pain.',
      'Late rehab needs repeated running, rotation, and sport-specific exposure if high-demand activity is the goal.',
    ],
    nutritionNotes: [
      'Protein intake is important because hip pain often reduces normal lower-body training volume.',
      'Avoid aggressive weight cuts while trying to rebuild stability, strength, and tolerance around the joint.',
      'Consistent fueling helps when symptoms are worsened by long activity days, travel, or sport practice blocks.',
    ],
    faq: [
      {
        q: 'Why does deep sitting or squatting irritate the hip more?',
        a: 'Because those positions can increase joint compression and pinching in a hip that is already sensitive or structurally challenged.',
      },
      {
        q: 'Is stretching the main answer for this kind of hip pain?',
        a: 'Usually no. Many patients improve more from better strength and movement control than from forcing extra range.',
      },
      {
        q: 'Can I keep training legs with a labral-related hip problem?',
        a: 'Often yes, but depth, stance, speed, and exercise selection usually need temporary adjustment.',
      },
    ],
  },
  ucl_injury: {
    intro:
      'UCL injuries in the elbow usually matter most in throwers and overhead athletes because the tissue is stressed repeatedly under high speed. Good recovery depends on calming medial elbow irritation, restoring shoulder-scapular support, and rebuilding throwing load gradually.',
    symptoms: [
      'Inner elbow pain during throwing or hard overhead effort',
      'Loss of velocity or confidence late in sessions',
      'Tenderness around the medial elbow after repeated throws',
      'A feeling that the elbow cannot tolerate full throwing intent',
    ],
    rehabNotes: [
      'Early management often reduces throwing volume and controls irritability while preserving general upper-body strength.',
      'Mid rehab should include forearm, cuff, scapular, and trunk contributions, not just isolated elbow work.',
      'Return to throwing needs a real interval progression rather than jumping straight back into competitive volume.',
    ],
    nutritionNotes: [
      'Protein intake matters because throwers often lose upper-body training quality quickly when pain starts.',
      'Carbohydrate support becomes more important once throwing progressions and lifting volume increase again.',
      'Under-recovering between throwing sessions often hurts progress more than supplement choice alone.',
    ],
    faq: [
      {
        q: 'Why does the elbow hurt more when I throw hard?',
        a: 'Because the UCL helps resist valgus stress, and high-velocity throwing places much greater stress on the medial elbow than easy daily activity.',
      },
      {
        q: 'Can shoulder weakness affect a UCL injury?',
        a: 'Yes. Poor cuff, scapular, or trunk contribution can shift more stress toward the elbow during repeated throwing.',
      },
      {
        q: 'Do I need to stop all upper-body training?',
        a: 'Usually no, but exercise choice and total throwing stress need to be managed carefully while the elbow settles.',
      },
    ],
  },
  thumb_collateral_ligament: {
    intro:
      'Thumb collateral ligament injuries can feel small but become very limiting because grip, pinching, and hand confidence depend on them. The rehab plan should protect pinch stress early, then rebuild stable hand use gradually.',
    symptoms: [
      'Pain around the base of the thumb after a twist or forced stretch',
      'Weakness with gripping, pinching, or opening objects',
      'Swelling and tenderness on one side of the thumb joint',
      'Loss of trust in sport, lifting, or hand-supported tasks',
    ],
    rehabNotes: [
      'Early phases often protect the ligament with bracing or taping while swelling and pain calm down.',
      'Grip and pinch strength should return gradually after the ligament can tolerate controlled hand loading.',
      'Return to sport should include realistic gripping and reactive hand demands, not just isolated squeezing drills.',
    ],
    nutritionNotes: [
      'Protein remains useful because upper-limb unloading can reduce forearm and hand training quality quickly.',
      'Hydration and sleep support better symptom control during the early protected phase.',
      'Very low-calorie intake is unhelpful when tissue healing and grip restoration are the priorities.',
    ],
    faq: [
      {
        q: 'Why does a thumb ligament injury affect so many daily tasks?',
        a: 'Because the thumb is central to pinch, grip, and fine hand control, so even a small loss of stability becomes obvious quickly.',
      },
      {
        q: 'Can I still lift with this injury?',
        a: 'Sometimes yes, but gripping-heavy exercises usually need modification until the thumb tolerates load again.',
      },
      {
        q: 'Is pain-free squeezing enough before I return to sport?',
        a: 'Usually not. The thumb also needs dynamic stability in real gripping, catching, or contact situations.',
      },
    ],
  },
  ac_joint_sprain: {
    intro:
      'AC joint sprains often improve well when overhead and cross-body irritation are managed early and shoulder support strength is rebuilt. The goal is to restore load tolerance without keeping the top of the shoulder chronically sensitive.',
    symptoms: [
      'Pain on the top of the shoulder after a fall or direct contact',
      'Discomfort with cross-body reach or pressing',
      'Tenderness at the AC joint and pain lying on that side',
      'Reduced confidence in upper-body training or contact positions',
    ],
    rehabNotes: [
      'Early rehab usually focuses on calming compression and cross-body irritation while keeping the shoulder moving safely.',
      'Scapular support, cuff strength, and gradual pressing tolerance become more important in mid rehab.',
      'Late return should include repeated upper-body loading and contact readiness if sport demands it.',
    ],
    nutritionNotes: [
      'Protein and total calories matter when shoulder training volume is reduced because of pain.',
      'Creatine can help support upper-body strength retention during reduced pressing phases.',
      'Good sleep often matters because AC joint pain is commonly aggravated at night or by side-lying.',
    ],
    faq: [
      {
        q: 'Why does cross-body movement hurt so much?',
        a: 'Because it compresses the AC joint, which is often one of the most irritated positions after a sprain.',
      },
      {
        q: 'Can I keep bench pressing?',
        a: 'Sometimes, but range, grip, bar path, or exercise selection usually need modification first.',
      },
      {
        q: 'Do shoulder shrugs alone fix an AC sprain?',
        a: 'No. Recovery usually needs broader shoulder strength and movement tolerance, not one exercise alone.',
      },
    ],
  },
  knee_multiligament_injury: {
    intro:
      'Knee multiligament injuries are higher-complexity cases because stability, swelling, confidence, and protection rules are all bigger concerns. Rehab has to respect the exact structures involved while still preserving as much muscle and function as possible.',
    symptoms: [
      'Major instability or inability to trust the knee after trauma',
      'Significant swelling and difficulty with weight-bearing',
      'Pain across multiple parts of the knee with direction change or pivoting',
      'Marked weakness and fear during basic walking or transfers',
    ],
    rehabNotes: [
      'Early phases are often more protection-driven than simpler sprains and may follow surgical or bracing restrictions closely.',
      'Muscle retention, extension range, gait quality, and swelling control become major early priorities.',
      'Return-to-sport timelines are usually longer because the knee must restore multidirectional stability, not just one ligament function.',
    ],
    nutritionNotes: [
      'High-quality protein is especially important because quadriceps loss can be rapid in these injuries.',
      'Creatine can be useful when lower-limb loading is restricted or after surgery.',
      'Aggressive dieting is a poor fit here because tissue healing and muscle preservation are already difficult enough.',
    ],
    faq: [
      {
        q: 'Why is rehab so different from a single-ligament sprain?',
        a: 'Because multiple stabilizers are involved, so the knee has bigger demands for protection, strength restoration, and confidence rebuilding.',
      },
      {
        q: 'Is walking enough as rehab early on?',
        a: 'Usually no. Walking is only one part of recovery, and many patients also need targeted swelling, range, and strength work.',
      },
      {
        q: 'What is the biggest early nutrition priority?',
        a: 'Enough total energy and protein to reduce muscle loss while the knee is not tolerating normal training.',
      },
    ],
  },
  biceps_tendinopathy: {
    intro:
      'Biceps tendon pain often reflects repeated overload in pressing, pulling, or overhead work rather than a need for total rest. The best plans reduce irritation, improve shoulder mechanics, and then rebuild tensile tolerance progressively.',
    symptoms: [
      'Front-of-shoulder pain with lifting, pulling, or overhead work',
      'Tenderness in the bicipital groove area',
      'Pain with repeated elbow flexion or shoulder flexion under load',
      'Irritation after gym volume, throwing, or long upper-body sessions',
    ],
    rehabNotes: [
      'Early progress often comes from reducing painful volume while keeping shoulder movement and basic loading present.',
      'Scapular control, cuff support, and progressive tendon loading usually matter more than passive treatments alone.',
      'Late rehab should restore repeated upper-body effort, not just one pain-free set.',
    ],
    nutritionNotes: [
      'Collagen plus vitamin C can fit well before tendon loading sessions if tolerated.',
      'Protein helps protect shoulder and arm muscle mass when upper-body training volume drops.',
      'Under-fueling often slows progress once heavier lifting returns.',
    ],
    faq: [
      {
        q: 'Why does the front of the shoulder hurt more than the arm itself?',
        a: 'Because the long head of the biceps tendon crosses the shoulder, so overload often shows up near the front shoulder groove first.',
      },
      {
        q: 'Should I stop all pulling exercises?',
        a: 'Usually not, but grip, angle, and total dose often need adjustment while tendon irritability settles.',
      },
      {
        q: 'Can pressing continue with biceps tendon pain?',
        a: 'Sometimes yes, but shoulder position and range often need temporary modification.',
      },
    ],
  },
  ac_joint_injury: {
    intro:
      'AC joint injuries often behave like persistent top-of-shoulder load intolerance. Good outcomes usually come from smarter pressing progressions, scapular support, and reducing repeated compression rather than forcing through every upper-body session.',
    symptoms: [
      'Top-of-shoulder pain with pressing or reaching across the body',
      'Tenderness at the AC joint after contact or overload',
      'Pain lying on the shoulder or carrying heavy objects',
      'Reduced tolerance for dips, benching, or overhead volume',
    ],
    rehabNotes: [
      'The early priority is usually to reduce painful compression while restoring comfortable shoulder motion.',
      'Mid rehab works best when it rebuilds cuff and scapular strength alongside gradual pressing tolerance.',
      'Late return needs repeated upper-body loading and sport-specific shoulder confidence if relevant.',
    ],
    nutritionNotes: [
      'Protein intake helps protect upper-body muscle when pressing and overhead volume are temporarily reduced.',
      'Creatine can support shoulder strength retention during modified training blocks.',
      'Sleep and pillow position can matter because top-of-shoulder compression often worsens nighttime symptoms.',
    ],
    faq: [
      {
        q: 'Why do benching and dips irritate the AC joint so easily?',
        a: 'Because those positions often increase shoulder compression and stress at the top of the joint.',
      },
      {
        q: 'Is full rest the best plan for AC joint pain?',
        a: 'Usually no. Modified loading often works better than total inactivity once the most painful positions are identified.',
      },
      {
        q: 'Can I return to contact sport with a previous AC issue?',
        a: 'Often yes, but repeated loading and contact readiness should be rebuilt gradually.',
      },
    ],
  },
  tendinosis: {
    intro:
      'Tendinosis is usually a chronic tendon capacity problem more than a short-term inflammation problem. The main goal is to rebuild tissue tolerance with steady loading, realistic timelines, and enough recovery support to let adaptation happen.',
    symptoms: [
      'Persistent tendon pain that lingers for weeks or months',
      'Morning stiffness or pain at the start of activity',
      'Symptoms that warm up but return after higher load days',
      'Reduced tolerance for repeated force, jumping, gripping, or overhead work',
    ],
    rehabNotes: [
      'Random rest often stalls progress because chronic tendons usually need better loading, not complete avoidance forever.',
      'Heavy slow resistance, isometrics, and graded elastic work are often layered based on the tendon involved.',
      'The loading plan usually matters more than passive treatment if the goal is durable progress.',
    ],
    nutritionNotes: [
      'Collagen plus vitamin C can fit well before planned tendon-loading sessions.',
      'Protein adequacy supports muscle retention and better force production around the painful tendon.',
      'Low energy availability is a common reason athletes plateau in chronic tendon rehab.',
    ],
    faq: [
      {
        q: 'Why has this tendon pain lasted so long?',
        a: 'Because chronic tendon problems often reflect a mismatch between tendon capacity and repeated load, not a quick issue that resolves with a few rest days.',
      },
      {
        q: 'Does tendinosis mean the tendon is inflamed all the time?',
        a: 'Not exactly. Chronic tendon pain often involves degeneration and altered load tolerance more than classic short-term inflammation alone.',
      },
      {
        q: 'Can I still train with tendinosis?',
        a: 'Often yes, but the training dose and loading pattern need to be structured much more carefully.',
      },
    ],
  },
  overhead_throwers_shoulder: {
    intro:
      'Thrower’s shoulder usually reflects a high-speed overload problem across the cuff, labrum, scapula, and trunk, not just one painful structure. The right plan reduces irritability first, then rebuilds shoulder output and throwing tolerance in stages.',
    symptoms: [
      'Pain during late cocking or acceleration while throwing',
      'Loss of velocity, command, or shoulder trust',
      'Posterior shoulder tightness or deep joint discomfort',
      'Symptoms that appear after higher throw volume or intensity blocks',
    ],
    rehabNotes: [
      'Early management often reduces throwing dose while restoring cuff and scapular control.',
      'Thoracic mobility, trunk contribution, and lower-body sequencing often matter as much as the shoulder itself.',
      'Return to full throwing needs a structured interval plan and workload monitoring, not guesswork.',
    ],
    nutritionNotes: [
      'Throwers need enough total energy and carbohydrate to recover from repeated high-output sessions when volume increases again.',
      'Protein supports shoulder and trunk strength retention during reduced-throw periods.',
      'Poor recovery between bullpen or throwing days often slows progress more than any single supplement choice.',
    ],
    faq: [
      {
        q: 'Why does my shoulder hurt mainly when I throw hard?',
        a: 'Because maximal throwing exposes high-speed shoulder positions and forces that normal gym work may not reproduce.',
      },
      {
        q: 'Can mechanics really change symptoms that much?',
        a: 'Yes. Scapular control, trunk timing, and lower-body contribution can all influence how much stress reaches the shoulder and elbow.',
      },
      {
        q: 'Should I stop lifting while returning to throw?',
        a: 'Usually no, but the lifting plan should support throwing recovery rather than compete with it.',
      },
    ],
  },
  swimmer_shoulder_impingement: {
    intro:
      'Swimmer’s shoulder tends to build when overhead volume stays high but cuff and scapular support cannot keep up. The plan should improve shoulder mechanics, manage stroke volume, and restore repeated overhead tolerance without constant flare-ups.',
    symptoms: [
      'Shoulder pain during pull-through or higher swim volume',
      'Pinching overhead or when reaching forward repeatedly',
      'Fatigue and loss of shoulder control late in sessions',
      'Irritation that spikes with paddles, sprint sets, or poor recovery',
    ],
    rehabNotes: [
      'Training volume and stroke irritability usually need adjustment early while strength and control are rebuilt.',
      'Cuff endurance, scapular support, and thoracic mobility often become major priorities in rehab.',
      'A good return to swimming should rebuild repeated overhead capacity, not just one pain-free practice.',
    ],
    nutritionNotes: [
      'Swimmers often need more carbohydrate support than they realize once volume climbs again.',
      'Protein intake helps preserve shoulder strength when pool volume is temporarily reduced.',
      'Poor fueling between sessions can make repeated overhead tolerance much worse.',
    ],
    faq: [
      {
        q: 'Why does the shoulder hurt more late in swim sessions?',
        a: 'Because fatigue reduces cuff and scapular control, so the shoulder can tolerate repeated overhead strokes less efficiently.',
      },
      {
        q: 'Do paddles make swimmer’s shoulder worse?',
        a: 'They can, because they often increase shoulder loading quickly if irritability is already present.',
      },
      {
        q: 'Is dry-land strength really that important for swimmers?',
        a: 'Yes. Better cuff, scapular, and trunk strength often improves swim tolerance and reduces recurring shoulder overload.',
      },
    ],
  },
  acl_meniscus_combined: {
    intro:
      'Combined ACL and meniscus injuries need a more careful plan than either injury alone because swelling, range limits, quad inhibition, and rotational confidence all overlap. The rehab timeline usually depends on both stability demands and the exact meniscus management.',
    symptoms: [
      'A twisting knee injury followed by swelling and instability',
      'Joint line pain or catching alongside ligament-related giving way',
      'Reduced confidence with pivoting, stairs, or deceleration',
      'Persistent quadriceps weakness and limited loaded knee flexion',
    ],
    rehabNotes: [
      'Early rehab often balances swelling control, extension range, quadriceps activation, and any meniscus-related protection rules.',
      'Mid rehab should rebuild single-leg strength and movement quality without rushing rotation-heavy drills.',
      'Late return to sport needs both ligament confidence and good tolerance to compression, landing, and change of direction.',
    ],
    nutritionNotes: [
      'High-quality protein is crucial because muscle loss can be significant when both stability and joint symptoms reduce loading.',
      'Creatine is often a useful support when strength work is limited early or after surgery.',
      'Avoid large calorie deficits while trying to rebuild knee function and muscle mass.',
    ],
    faq: [
      {
        q: 'Why does this injury usually take longer than a simple knee sprain?',
        a: 'Because the knee has to recover both rotational stability and joint tolerance, not just calm pain or swelling.',
      },
      {
        q: 'Can I progress strength if the meniscus is still irritable?',
        a: 'Usually yes, but exercise depth, rotation, and loading angles often need more careful adjustment.',
      },
      {
        q: 'What is the main early nutrition priority?',
        a: 'Enough energy and protein to reduce muscle loss while the knee is not tolerating normal training.',
      },
    ],
  },
  rotator_cuff_labrum_complex: {
    intro:
      'Complex shoulder injuries involving both the rotator cuff and labrum usually need a bigger focus on stability, repeated overhead tolerance, and movement quality under fatigue. The goal is to rebuild a dependable shoulder, not just a temporarily quiet one.',
    symptoms: [
      'Deep shoulder pain with overhead loading or repeated throwing',
      'Weakness, instability, or clicking in high-range positions',
      'Loss of trust during pressing, catching, or overhead sport work',
      'Symptoms that return under fatigue or repeated sets',
    ],
    rehabNotes: [
      'Early rehab often blends pain-limited cuff loading with stability-focused movement control.',
      'Mid phases need cuff strength, scapular support, and progressive overhead exposure together.',
      'Return to sport should include repeated high-quality overhead output, not only clinic-style exercises.',
    ],
    nutritionNotes: [
      'Protein and total calories matter because upper-body deconditioning happens quickly when shoulder load drops.',
      'Creatine can support strength retention during reduced training phases.',
      'Under-fueling is a common reason complex shoulder rehab stalls once harder training is reintroduced.',
    ],
    faq: [
      {
        q: 'Why does the shoulder feel okay in the gym but unstable in sport?',
        a: 'Because sport often adds speed, fatigue, and repeated overhead force that simple gym movements may not reproduce.',
      },
      {
        q: 'Do I need complete rest from all shoulder work?',
        a: 'Usually no. Most athletes do better with modified loading than with total inactivity.',
      },
      {
        q: 'What matters most before return to play?',
        a: 'Repeated strength, overhead tolerance, and position-specific confidence under real sport demands.',
      },
    ],
  },
  geriatric_osteoarthritis_flare: {
    intro:
      'Geriatric osteoarthritis flares often need a practical plan centered on daily function, walking tolerance, and confidence rather than aggressive exercise complexity. The aim is to reduce flare intensity while preserving independence and strength.',
    symptoms: [
      'Morning stiffness and slower movement after sitting',
      'Pain with longer walks, stairs, or standing tasks',
      'Reduced confidence carrying groceries or getting up from a chair',
      'Flares after unusually active days or poor recovery',
    ],
    rehabNotes: [
      'Chair rises, walking tolerance, balance, and manageable lower-body strengthening are often key priorities.',
      'Pacing matters a lot because older adults may flare after doing too much on a good day.',
      'Consistency usually matters more than intensity spikes in osteoarthritis management.',
    ],
    nutritionNotes: [
      'Protein becomes especially important for preserving muscle and function in older adults.',
      'Hydration, regular meals, and vitamin D adequacy can support better day-to-day tolerance.',
      'Severe calorie restriction is usually a poor fit when the main goal is preserving mobility and independence.',
    ],
    faq: [
      {
        q: 'What helps older adults with knee OA most functionally?',
        a: 'Steady walking tolerance, chair-rise strength, manageable body-weight control when relevant, and avoiding inactivity after flare days.',
      },
      {
        q: 'Should painful days mean no movement at all?',
        a: 'Usually no. Gentle, scaled activity often helps maintain function better than complete rest.',
      },
      {
        q: 'Why does weakness matter so much in osteoarthritis?',
        a: 'Because strength supports joint loading, balance, and daily independence even when the joint itself stays sensitive.',
      },
    ],
  },
  meniscus_repair: {
    intro:
      'Meniscus repair rehab often feels slower than patients expect because the knee may need protection rules even when pain starts improving. The big goals are protecting the repair, preserving quad function, and rebuilding loaded flexion carefully.',
    symptoms: [
      'Post-surgical stiffness and swelling in the knee',
      'Difficulty with loaded bending, stairs, or longer walking',
      'Quadriceps weakness and guarded movement patterns',
      'Concern about reloading the repaired side too early',
    ],
    rehabNotes: [
      'Early rehab usually follows surgeon-specific restrictions for weight-bearing, range, or loaded flexion.',
      'Quadriceps activation, gait quality, and swelling control stay important even while the knee is protected.',
      'Later rehab should rebuild squat tolerance, single-leg control, and rotation confidence gradually.',
    ],
    nutritionNotes: [
      'Protein adequacy is essential because surgery plus reduced loading can accelerate muscle loss.',
      'Creatine is a useful option in many post-op phases when tolerated.',
      'Energy intake should stay adequate even if overall daily activity falls sharply after surgery.',
    ],
    faq: [
      {
        q: 'Why is rehab after meniscus repair slower than after a trim?',
        a: 'Because the tissue is being protected to heal, so loading and flexion progression are often more restricted at first.',
      },
      {
        q: 'What is the biggest early rehab risk?',
        a: 'Ignoring protection rules or letting quadriceps shutdown become severe while the knee is still guarded.',
      },
      {
        q: 'What should I prioritize nutritionally after surgery?',
        a: 'Enough protein, enough total calories, and hydration to support healing and reduce unnecessary muscle loss.',
      },
    ],
  },
};
