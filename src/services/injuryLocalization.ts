import type {Language} from './translations';
import {formatBodyRegion, formatConditionName, formatMedicalCategory} from './medicalTerminology';
import {decodeMojibake} from './textEncoding';

const injuryNameMap: Record<string, {ar: string; en?: string}> = {
  // Muscle injuries
  quadriceps_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø¹Ø¶Ù„Ø© Ø§Ù„ÙØ®Ø° Ø§Ù„Ø±Ø¨Ø§Ø¹ÙŠØ©'},
  calf_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø¹Ø¶Ù„Ø§Øª Ø§Ù„Ø³Ø§Ù‚ (Ø§Ù„ÙØªÙŠÙ„ÙŠØ³ ÙˆØ§Ù„Ø³Ù…Ø§Ù†Ø©)'},
  biceps_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø§Ù„Ø¹Ø¶Ù„Ø© Ø°Ø§Øª Ø§Ù„Ø±Ø£Ø³ÙŠÙ†'},
  triceps_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø¹Ø¶Ù„Ø© Ø«Ù„Ø§Ø«ÙŠØ© Ø§Ù„Ø±Ø¤ÙˆØ³'},
  pectoral_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø¹Ø¶Ù„Ø§Øª Ø§Ù„ØµØ¯Ø±'},
  deltoid_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø¹Ø¶Ù„Ø© Ø§Ù„ÙƒØªÙ Ø§Ù„Ø¯Ø§Ù„ÙŠØ©'},
  forearm_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø¹Ø¶Ù„Ø§Øª Ø§Ù„Ø³Ø§Ø¹Ø¯ (Ø§Ù„Ù…Ø±Ù†Ø© ÙˆØ§Ù„Ø¨Ø§Ø³Ø·Ø©)'},
  glute_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø¹Ø¶Ù„Ø§Øª Ø§Ù„Ø£Ø±Ø¯Ø§Ù (Ø§Ù„Ø¹Ø±ÙŠØ¶Ø© ÙˆØ§Ù„ÙˆØ³Ø·Ù‰)'},
  oblique_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø¹Ø¶Ù„Ø§Øª Ø§Ù„Ø¨Ø·Ù† Ø§Ù„Ù…Ø§Ø¦Ù„Ø©'},
  erector_spinae_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø¹Ø¶Ù„Ø§Øª Ø§Ù„Ø¸Ù‡Ø± Ø§Ù„ÙØ§Ø±Ø¯Ø© Ù„Ù„Ø¹Ù…ÙˆØ¯ Ø§Ù„ÙÙ‚Ø±ÙŠ'},
  neck_muscle_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø¹Ø¶Ù„Ø§Øª Ø§Ù„Ø±Ù‚Ø¨Ø©'},
  adductor_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø¹Ø¶Ù„Ø§Øª Ø§Ù„ÙØ®Ø° Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ© (Ø´Ø¯ Ø§Ù„ÙØ®Ø°)'},
  tibialis_anterior_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø¹Ø¶Ù„Ø© Ø£Ù…Ø§Ù… Ø§Ù„Ø³Ø§Ù‚'},
  hamstring_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø¹Ø¶Ù„Ø§Øª Ø§Ù„ÙØ®Ø° Ø§Ù„Ø®Ù„ÙÙŠØ©'},

  // Ligament injuries
  pcl_injury: {ar: 'Ø¥ØµØ§Ø¨Ø© Ø§Ù„Ø±Ø¨Ø§Ø· Ø§Ù„ØµÙ„ÙŠØ¨ÙŠ Ø§Ù„Ø®Ù„ÙÙŠ'},
  mcl_sprain: {ar: 'Ø§Ù„ØªÙˆØ§Ø¡ Ø§Ù„Ø±Ø¨Ø§Ø· Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠ Ø§Ù„Ø¥Ù†Ø³ÙŠ Ù„Ù„Ø±ÙƒØ¨Ø©'},
  lcl_sprain: {ar: 'Ø§Ù„ØªÙˆØ§Ø¡ Ø§Ù„Ø±Ø¨Ø§Ø· Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠ Ø§Ù„ÙˆØ­Ø´ÙŠ Ù„Ù„Ø±ÙƒØ¨Ø©'},
  ucl_injury: {ar: 'Ø¥ØµØ§Ø¨Ø© Ø§Ù„Ø±Ø¨Ø§Ø· Ø§Ù„Ø²Ù†Ø¯ÙŠ Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠ (ÙƒÙˆØ¹ Ø§Ù„Ø±Ø§Ù…ÙŠ)'},
  thumb_collateral_ligament: {ar: 'Ø¥ØµØ§Ø¨Ø© Ø§Ù„Ø±Ø¨Ø§Ø· Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠ Ù„Ù„Ø¥Ø¨Ù‡Ø§Ù…'},
  ac_joint_sprain: {ar: 'Ø§Ù„ØªÙˆØ§Ø¡ Ù…ÙØµÙ„ Ø§Ù„Ø£Ø®Ø±Ù… ÙˆØ§Ù„ØªØ±Ù‚ÙˆØ©'},
  knee_multiligament_injury: {ar: 'Ø¥ØµØ§Ø¨Ø© Ù…ØªØ¹Ø¯Ø¯Ø© Ø§Ù„Ø£Ø±Ø¨Ø·Ø© ÙÙŠ Ø§Ù„Ø±ÙƒØ¨Ø©'},
  spine_ligament_strain: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ø£Ø±Ø¨Ø·Ø© Ø§Ù„Ø¹Ù…ÙˆØ¯ Ø§Ù„ÙÙ‚Ø±ÙŠ'},
  acl_injury: {ar: 'Ø¥ØµØ§Ø¨Ø© Ø§Ù„Ø±Ø¨Ø§Ø· Ø§Ù„ØµÙ„ÙŠØ¨ÙŠ Ø§Ù„Ø£Ù…Ø§Ù…ÙŠ'},

  // Tendon injuries
  achilles_tendinopathy: {ar: 'Ø§Ø¹ØªÙ„Ø§Ù„ ÙˆØªØ± Ø£Ø®ÙŠÙ„ (ÙˆØªØ± Ø§Ù„Ø¹Ø±Ù‚ÙˆØ¨)'},
  patellar_tendinopathy: {ar: 'Ø§Ø¹ØªÙ„Ø§Ù„ ÙˆØªØ± Ø§Ù„Ø±Ø¶ÙØ©'},
  biceps_tendinopathy: {ar: 'Ø§Ø¹ØªÙ„Ø§Ù„ Ø£Ùˆ ØªÙ…Ø²Ù‚ ÙˆØªØ± Ø§Ù„Ø¹Ø¶Ù„Ø© Ø°Ø§Øª Ø§Ù„Ø±Ø£Ø³ÙŠÙ†'},
  lateral_epicondylitis: {ar: 'Ø§Ù„ØªÙ‡Ø§Ø¨ Ø§Ù„Ø£ÙˆØªØ§Ø± Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠ Ù„Ù„ÙƒÙˆØ¹ (ÙƒÙˆØ¹ Ù„Ø§Ø¹Ø¨ Ø§Ù„ØªÙ†Ø³)'},
  medial_epicondylitis: {ar: 'Ø§Ù„ØªÙ‡Ø§Ø¨ Ø§Ù„Ø£ÙˆØªØ§Ø± Ø§Ù„Ø¥Ù†Ø³ÙŠ Ù„Ù„ÙƒÙˆØ¹ (ÙƒÙˆØ¹ Ù„Ø§Ø¹Ø¨ Ø§Ù„Ø¬ÙˆÙ„Ù)'},
  glute_tendinopathy: {ar: 'Ø§Ø¹ØªÙ„Ø§Ù„ Ø£ÙˆØªØ§Ø± Ø¹Ø¶Ù„Ø§Øª Ø§Ù„Ø£Ø±Ø¯Ø§Ù'},
  hip_flexor_tendinopathy: {ar: 'Ø§Ø¹ØªÙ„Ø§Ù„ Ø£ÙˆØªØ§Ø± Ø¹Ø¶Ù„Ø§Øª Ù…Ø±ÙˆÙ†Ø© Ø§Ù„ÙˆØ±Ùƒ'},
  hamstring_tendon_injury: {ar: 'ØªÙ…Ø²Ù‚ Ø£Ùˆ Ø§Ø¹ØªÙ„Ø§Ù„ Ø£ÙˆØªØ§Ø± Ø§Ù„ÙØ®Ø° Ø§Ù„Ø®Ù„ÙÙŠØ©'},
  plantar_achilles_insertion_tendinopathy: {ar: 'Ø§Ø¹ØªÙ„Ø§Ù„ ÙˆØªØ± Ø£Ø®ÙŠÙ„ ÙÙŠ Ù†Ù‚Ø·Ø© Ø§Ù„Ø§Ù„ØªÙ‚Ø§Ø¡'},
  rotator_cuff: {ar: 'Ø¥ØµØ§Ø¨Ø© Ø§Ù„ÙƒÙØ© Ø§Ù„Ù…Ø¯ÙˆØ±Ø©'},
  overhead_throwers_shoulder: {ar: 'ÙƒØªÙ Ø§Ù„Ø±Ø§Ù…ÙŠ'},
  swimmer_shoulder_impingement: {ar: 'Ø§Ù†Ø­Ø´Ø§Ø± ÙƒØªÙ Ø§Ù„Ø³Ø¨Ø§Ø­'},
  tendinosis: {ar: 'ØªÙ†ÙƒØ³ Ø§Ù„Ø£ÙˆØªØ§Ø± Ø§Ù„Ù…Ø²Ù…Ù†'},

  // Bone injuries
  bone_fracture_long_bone: {ar: 'ÙƒØ³Ø± Ø§Ù„Ø¹Ø¸Ø§Ù… Ø§Ù„Ø·ÙˆÙŠÙ„Ø©'},
  vertebral_fracture: {ar: 'ÙƒØ³Ø± Ø§Ù„ÙÙ‚Ø±Ø§Øª (Ø§Ù„Ø¶ØºØ· Ø£Ùˆ Ø§Ù„Ø§Ù†ÙØ¬Ø§Ø±)'},
  rib_fracture: {ar: 'ÙƒØ³Ø± Ø§Ù„Ø¶Ù„Ø¹'},
  scaphoid_fracture: {ar: 'ÙƒØ³Ø± Ø§Ù„Ø¹Ø¸Ù… Ø§Ù„Ø²ÙˆØ±Ù‚ÙŠ (ÙƒØ³Ø± Ø§Ù„Ø±Ø³Øº)'},
  calcaneus_fracture: {ar: 'ÙƒØ³Ø± Ø¹Ø¸Ù… Ø§Ù„Ø¹Ù‚Ø¨ (Ø§Ù„ÙƒØ¹Ø¨)'},
  patella_fracture: {ar: 'ÙƒØ³Ø± Ø¹Ø¸Ù… Ø§Ù„Ø±Ø¶ÙØ©'},
  talus_fracture: {ar: 'ÙƒØ³Ø± Ø¹Ø¸Ù… Ø§Ù„ØªØ§Ù„ÙˆØ³'},
  humeral_head_fracture: {ar: 'ÙƒØ³Ø± Ø±Ø£Ø³ Ø¹Ø¸Ù… Ø§Ù„Ø¹Ø¶Ø¯'},
  pelvic_avulsion_fracture: {ar: 'ÙƒØ³Ø± Ø§Ù„Ø­ÙˆØ¶ Ø¨Ø§Ù„Ø§Ù†ÙØµØ§Ù„'},
  stress_fracture: {ar: 'ÙƒØ³Ø± Ø§Ù„Ø¥Ø¬Ù‡Ø§Ø¯'},

  // Joint injuries
  meniscus_tear: {ar: 'ØªÙ…Ø²Ù‚ Ø§Ù„ØºØ¶Ø±ÙˆÙ Ø§Ù„Ù‡Ù„Ø§Ù„ÙŠ'},
  labrum_tear: {ar: 'ØªÙ…Ø²Ù‚ Ø§Ù„Ø´ÙØ§ Ø§Ù„Ø­Ù‚ÙŠØ©'},
  ac_joint_injury: {ar: 'Ø¥ØµØ§Ø¨Ø© Ù…ÙØµÙ„ Ø§Ù„Ø£Ø®Ø±Ù… ÙˆØ§Ù„ØªØ±Ù‚ÙˆØ©'},
  patellofemoral_pain: {ar: 'Ù…ØªÙ„Ø§Ø²Ù…Ø© Ø§Ù„Ø£Ù„Ù… Ø§Ù„Ø±Ø¶ÙÙŠ Ø§Ù„ÙØ®Ø°ÙŠ'},
  ankle_instability: {ar: 'Ø¹Ø¯Ù… Ø§Ø³ØªÙ‚Ø±Ø§Ø± Ø§Ù„ÙƒØ§Ø­Ù„'},
  osteoarthritis_flare: {ar: 'Ù‡Ø´Ø§Ø´Ø© (Ø®Ø´ÙˆÙ†Ø©) Ø§Ù„Ù…ÙØ§ØµÙ„'},
  tmj_disorder: {ar: 'Ø§Ø¶Ø·Ø±Ø§Ø¨ Ø§Ù„Ù…ÙØµÙ„ Ø§Ù„ØµØ¯ØºÙŠ Ø§Ù„ÙÙƒÙŠ'},
  elbow_instability: {ar: 'Ø¹Ø¯Ù… Ø§Ø³ØªÙ‚Ø±Ø§Ø± Ø§Ù„ÙƒÙˆØ¹ / Ø§Ù„Ø®Ù„Ø¹ Ø§Ù„Ø¬Ø²Ø¦ÙŠ'},
  shoulder_impingement: {ar: 'Ù…ØªÙ„Ø§Ø²Ù…Ø© Ø§Ù†Ø­Ø´Ø§Ø± Ø§Ù„ÙƒØªÙ'},
  glenohumeral_dislocation: {ar: 'Ø®Ù„Ø¹ Ø£Ùˆ ØªØ­Øª Ø®Ù„Ø¹ Ù…ÙØµÙ„ Ø§Ù„ÙƒØªÙ'},
  hip_dysplasia_labral_tear: {ar: 'Ø®Ù„Ù„ Ø§Ù„ØªÙ†Ø³Ø¬ Ø§Ù„ÙˆØ±ÙƒÙŠ Ø£Ùˆ ØªÙ…Ø²Ù‚ Ø§Ù„Ø´ÙØ§ Ø§Ù„Ø­Ù‚ÙŠØ©'},
  wrist_instability_tfcc: {ar: 'Ø¹Ø¯Ù… Ø§Ø³ØªÙ‚Ø±Ø§Ø± Ø§Ù„Ø±Ø³Øº / Ø¥ØµØ§Ø¨Ø© Ø§Ù„ØºØ¶Ø±ÙˆÙ Ø§Ù„Ù…Ø«Ù„Ø«'},

  // Overuse injuries
  low_back_pain: {ar: 'Ø¢Ù„Ø§Ù… Ø£Ø³ÙÙ„ Ø§Ù„Ø¸Ù‡Ø± / Ø¥Ø¬Ù‡Ø§Ø¯ */Ø§Ù„ÙÙ‚Ø±Ø§Øª Ø§Ù„Ù‚Ø·Ù†ÙŠØ©'},
  neck_pain: {ar: 'Ø¢Ù„Ø§Ù… Ø§Ù„Ø±Ù‚Ø¨Ø© / Ø§Ù„Ø¥Ø¬Ù‡Ø§Ø¯ Ø§Ù„Ø¹Ù†Ù‚ÙŠ'},
  plantar_fasciitis: {ar: 'Ø§Ù„ØªÙ‡Ø§Ø¨ Ø§Ù„Ù„ÙØ§ÙØ© Ø§Ù„Ø£Ø®Ù…ØµÙŠØ©'},
  it_band_syndrome: {ar: 'Ù…ØªÙ„Ø§Ø²Ù…Ø© Ø§Ù„Ø±Ø¨Ø§Ø· Ø§Ù„Ø­Ø±Ù‚ÙÙŠ Ø§Ù„Ø¸Ù†Ø¨ÙˆØ¨ÙŠ'},
  shin_splints: {ar: 'Ø§Ù„ØªÙ‡Ø§Ø¨ Ø¹Ø¸Ø§Ù… Ø§Ù„Ø³Ø§Ù‚ (Ù…ØªÙ„Ø§Ø²Ù…Ø© Ø§Ù„Ø¥Ø¬Ù‡Ø§Ø¯ Ø§Ù„Ø¥Ù†Ø³ÙŠ Ù„Ù„Ù‚ØµØ¨Ø©)'},
  bursitis: {ar: 'Ø§Ù„ØªÙ‡Ø§Ø¨ Ø§Ù„Ø¬Ø±Ø§Ø¨'},
};

const categoryMapWithAdditional: Record<string, {ar: string}> = {
  'Spine': {ar: 'Ø§Ù„Ø¹Ù…ÙˆØ¯ Ø§Ù„ÙÙ‚Ø±ÙŠ'},
  'Back': {ar: 'Ø§Ù„Ø¸Ù‡Ø±'},
  'Chest': {ar: 'Ø§Ù„ØµØ¯Ø±Ø©'},
  'Pelvis': {ar: 'Ø§Ù„Ø­ÙˆØ¶'},
  'Thigh': {ar: 'Ø§Ù„ÙØ®Ø°'},
};

const categoryMap: Record<string, {ar: string}> = {
  Muscle: {ar: 'Ø¹Ø¶Ù„Ø§Øª'},
  Ligament: {ar: 'Ø£Ø±Ø¨Ø·Ø©'},
  Tendon: {ar: 'Ø£ÙˆØªØ§Ø±'},
  Bone: {ar: 'Ø¹Ø¸Ø§Ù…'},
  Joint: {ar: 'Ù…ÙØ§ØµÙ„'},
  Overuse: {ar: 'Ø¥Ø¬Ù‡Ø§Ø¯ Ù…Ø²Ù…Ù†'},
  Sports: {ar: 'Ø¥ØµØ§Ø¨Ø§Øª Ø±ÙŠØ§Ø¶ÙŠØ©'},
  Pediatric: {ar: 'Ø£Ø·ÙØ§Ù„'},
  Geriatric: {ar: 'ÙƒØ¨Ø§Ø± Ø§Ù„Ø³Ù†'},
  'Post-surgery': {ar: 'Ù…Ø§ Ø¨Ø¹Ø¯ Ø§Ù„Ø¬Ø±Ø§Ø­Ø©'},
};

const bodyRegionMap: Record<string, {ar: string}> = {
  Knee: {ar: 'Ø§Ù„Ø±ÙƒØ¨Ø©'},
  Shoulder: {ar: 'Ø§Ù„ÙƒØªÙ'},
  'Whole body': {ar: 'Ø§Ù„Ø¬Ø³Ù… Ø¨Ø§Ù„ÙƒØ§Ù…Ù„'},
  Hip: {ar: 'Ø§Ù„ÙˆØ±Ùƒ'},
  Wrist: {ar: 'Ø§Ù„Ø±Ø³Øº'},
  Jaw: {ar: 'Ø§Ù„ÙÙƒ'},
  Elbow: {ar: 'Ø§Ù„ÙƒÙˆØ¹'},
  Hand: {ar: 'Ø§Ù„ÙŠØ¯'},
  Ankle: {ar: 'Ø§Ù„ÙƒØ§Ø­Ù„'},
  Foot: {ar: 'Ø§Ù„Ù‚Ø¯Ù…'},
  Neck: {ar: 'Ø§Ù„Ø±Ù‚Ø¨Ø©'},
};

export function getLocalizedInjuryName(id: string, fallback: string, lang: Language) {
  const translated = injuryNameMap[id];
  if (translated) {
    return lang === 'ar' ? decodeMojibake(translated.ar) : translated.en || formatConditionName(fallback, 'en');
  }
  return formatConditionName(fallback, lang);
}

export function getLocalizedCategory(category: string, lang: Language) {
  const direct = {...categoryMapWithAdditional, ...categoryMap}[category]?.ar;
  if (lang === 'ar') return decodeMojibake(direct || formatMedicalCategory(category, 'ar'));
  return formatMedicalCategory(category, 'en');
}

export function getLocalizedBodyRegion(bodyRegion: string, lang: Language) {
  const direct = bodyRegionMap[bodyRegion]?.ar;
  if (lang === 'ar') return decodeMojibake(direct || formatBodyRegion(bodyRegion, 'ar'));
  return formatBodyRegion(bodyRegion, 'en');
}

const activityContextMap: Record<string, string> = {
  Football: 'ÙƒØ±Ø© Ø§Ù„Ù‚Ø¯Ù…',
  Basketball: 'ÙƒØ±Ø© Ø§Ù„Ø³Ù„Ø©',
  'Pivoting sports': 'Ø§Ù„Ø±ÙŠØ§Ø¶Ø§Øª Ø§Ù„ØªÙŠ ØªØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ù„Ù ÙˆØªØºÙŠÙŠØ± Ø§Ù„Ø§ØªØ¬Ø§Ù‡',
  Running: 'Ø§Ù„Ø¬Ø±ÙŠ',
  'Daily activity': 'Ø§Ù„Ø£Ù†Ø´Ø·Ø© Ø§Ù„ÙŠÙˆÙ…ÙŠØ©',
  'Field sports': 'Ø§Ù„Ø±ÙŠØ§Ø¶Ø§Øª Ø§Ù„Ù…ÙŠØ¯Ø§Ù†ÙŠØ©',
  'Overhead sports': 'Ø§Ù„Ø±ÙŠØ§Ø¶Ø§Øª ÙÙˆÙ‚ Ø§Ù„Ø±Ø£Ø³',
  'Gym training': 'ØªØ¯Ø±ÙŠØ¨Ø§Øª Ø§Ù„Ø¬ÙŠÙ…',
  'Manual work': 'Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„ÙŠØ¯ÙˆÙŠØ©',
  Sprinting: 'Ø§Ù„Ø¹Ø¯Ùˆ Ø§Ù„Ø³Ø±ÙŠØ¹',
  Track: 'Ø£Ù„Ø¹Ø§Ø¨ Ø§Ù„Ù…Ø¶Ù…Ø§Ø±',
  Dance: 'Ø§Ù„Ø±Ù‚Øµ',
  'Rapid load spikes': 'Ø§Ù„Ø²ÙŠØ§Ø¯Ø© Ø§Ù„Ù…ÙØ§Ø¬Ø¦Ø© ÙÙŠ Ø§Ù„Ø­Ù…Ù„',
};

function hasArabicText(value: string) {
  return /[\u0600-\u06FF]/.test(value);
}

export function getLocalizedCommonInjuryContext(item: string, lang: Language) {
  if (lang !== 'ar') return item;
  return decodeMojibake(activityContextMap[item] || item);
}

export function getLocalizedInjuryOverview(
  injuryName: string,
  category: string,
  bodyRegion: string,
  fallback: string,
  lang: Language,
) {
  if (lang !== 'ar') return fallback;
  if (hasArabicText(fallback)) return fallback;

  const localizedCategory = getLocalizedCategory(category, 'ar');
  const localizedBodyRegion = getLocalizedBodyRegion(bodyRegion, 'ar');
  return decodeMojibake(`${injuryName} Ù…Ù† Ø¥ØµØ§Ø¨Ø§Øª ${localizedCategory} Ø§Ù„ØªÙŠ ØªØ¤Ø«Ø± Ø¹Ù„Ù‰ ${localizedBodyRegion}ØŒ ÙˆØªØ­ØªØ§Ø¬ Ø¥Ù„Ù‰ ØªØ¯Ø±Ø¬ Ø¬ÙŠØ¯ ÙÙŠ Ø§Ù„Ø¹Ù„Ø§Ø¬ ÙˆØ§Ù„ØªØºØ°ÙŠØ© ÙˆØ§Ù„Ø¹ÙˆØ¯Ø© Ù„Ù„Ù†Ø´Ø§Ø·.`);
}

export function textLooksArabic(value: string) {
  return hasArabicText(value);
}


