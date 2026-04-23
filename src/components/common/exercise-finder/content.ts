import {
  EXERCISE_FINDER_STATIC_ARABIC_LABELS,
  EXERCISE_FINDER_STATIC_LABELS,
  MAIN_MUSCLE_TO_STATIC_GROUP,
  STATIC_GROUP_MUSCLES,
} from './constants';
import {decodeMojibake} from '../../../services/textEncoding';
import {EXERCISES} from './data/exercises';
import {TRAINING_SYSTEMS} from './data/training-systems';
import {WEEKLY_PLANS} from './data/weekly-plans';
import type {Exercise, StaticMuscleSlug} from './types';

type RegionContent = {
  introEn: string;
  introAr: string;
  anatomyEn: string[];
  anatomyAr: string[];
  cuesEn: string[];
  cuesAr: string[];
  keywordsEn: string[];
  keywordsAr: string[];
};

type SystemDetailContent = {
  overviewEn: string;
  overviewAr: string;
  strengthsEn: string[];
  strengthsAr: string[];
  comparisonsEn: Array<{label: string; value: string}>;
  comparisonsAr: Array<{label: string; value: string}>;
  seoSummaryEn: string;
  seoSummaryAr: string;
};

function buildRegionContent(
  introEn: string,
  introAr: string,
  anatomyEn: string[],
  anatomyAr: string[],
  cuesEn: string[],
  cuesAr: string[],
  keywordsEn: string[],
  keywordsAr: string[],
): RegionContent {
  return {
    introEn,
    introAr: decodeMojibake(introAr),
    anatomyEn,
    anatomyAr: anatomyAr.map((item) => decodeMojibake(item)),
    cuesEn,
    cuesAr: cuesAr.map((item) => decodeMojibake(item)),
    keywordsEn,
    keywordsAr: keywordsAr.map((item) => decodeMojibake(item)),
  };
}

export const REGION_CONTENT: Record<StaticMuscleSlug, RegionContent> = {
  chest: buildRegionContent(
    'Chest training is built around horizontal and angled pressing, with the pecs working alongside the front delts and triceps.',
    'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„ØµØ¯Ø± ÙŠØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø¶ØºØ· Ø§Ù„Ø£ÙÙ‚ÙŠ ÙˆØ§Ù„Ù…Ø§Ø¦Ù„ Ù…Ø¹ Ù…Ø´Ø§Ø±ÙƒØ© Ø§Ù„ÙƒØªÙ Ø§Ù„Ø£Ù…Ø§Ù…ÙŠ ÙˆØ§Ù„ØªØ±Ø§ÙŠØ³Ø¨Ø³.',
    ['Upper chest usually responds best to low-incline pressing.', 'Flat pressing and push-up patterns drive most middle-chest work.', 'Lower chest gets more emphasis from dips and decline-style angles.'],
    ['Ø§Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø¹Ù„ÙˆÙŠ ÙŠØ³ØªØ¬ÙŠØ¨ ØºØ§Ù„Ø¨Ù‹Ø§ Ù„Ù„Ø¶ØºØ· Ø§Ù„Ù…Ø§Ø¦Ù„ Ø§Ù„Ø®ÙÙŠÙ.', 'Ø§Ù„Ø¶ØºØ· Ø§Ù„Ù…Ø³ØªÙˆÙŠ ÙˆØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø¶ØºØ· ÙŠØ®Ø¯Ù…Ø§Ù† Ø§Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø£ÙˆØ³Ø· Ø¨Ù‚ÙˆØ©.', 'Ø§Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø³ÙÙ„ÙŠ ÙŠØªØ£Ø«Ø± Ø£ÙƒØ«Ø± Ø¨Ø§Ù„Ø¯ÙŠØ¨Ø³ ÙˆØ§Ù„Ø²ÙˆØ§ÙŠØ§ Ø§Ù„Ù…Ø§Ø¦Ù„Ø© Ù„Ø£Ø³ÙÙ„.'],
    ['Set the shoulder blades before pressing.', 'Use a pain-free pressing path instead of forcing one grip.', 'Balance chest volume with enough pulling work.'],
    ['Ø«Ø¨Ù‘Øª Ù„ÙˆØ­ÙŠ Ø§Ù„ÙƒØªÙ Ù‚Ø¨Ù„ Ø§Ù„Ø¶ØºØ·.', 'Ø§Ø³ØªØ®Ø¯Ù… Ù…Ø³Ø§Ø± Ø¶ØºØ· Ù…Ø±ÙŠØ­ Ø¨Ø¯Ù„ ÙØ±Ø¶ Ù‚Ø¨Ø¶Ø© ÙˆØ§Ø­Ø¯Ø©.', 'ÙˆØ§Ø²Ù† Ø­Ø¬Ù… Ø§Ù„ØµØ¯Ø± Ù…Ø¹ Ø§Ù„Ø³Ø­Ø¨ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨.'],
    ['upper chest exercises', 'best chest exercises gym', 'dumbbell chest workout', 'lower chest exercises'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† ØµØ¯Ø± Ø¹Ù„ÙˆÙŠ', 'Ø£ÙØ¶Ù„ ØªÙ…Ø§Ø±ÙŠÙ† ØµØ¯Ø±', 'ØªÙ…Ø§Ø±ÙŠÙ† ØµØ¯Ø± Ø¨Ø§Ù„Ø¯Ù…Ø¨Ù„', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø£Ø³ÙÙ„ Ø§Ù„ØµØ¯Ø±'],
  ),
  back: buildRegionContent(
    'Back work combines width, thickness, posture, and hinge support across the lats, traps, rhomboids, and spinal erectors.',
    'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„Ø¸Ù‡Ø± ÙŠØ¬Ù…Ø¹ Ø¨ÙŠÙ† Ø§Ù„Ø¹Ø±Ø¶ ÙˆØ§Ù„Ø³Ù…Ø§ÙƒØ© ÙˆÙˆØ¶Ø¹ÙŠØ© Ø§Ù„Ø¬Ø³Ù… ÙˆØ¯Ø¹Ù… Ø§Ù„Ù‡ÙŠØ¨ Ù‡Ù†Ø¬ Ø¹Ø¨Ø± Ø§Ù„Ù„Ø§ØªØ³ ÙˆØ§Ù„ØªØ±Ø§Ø¨ÙŠØ³ ÙˆØ§Ù„Ø±ÙˆÙ…Ø¨ÙˆÙŠØ¯ ÙˆØ¹Ø¶Ù„Ø§Øª Ø§Ù„Ø¹Ù…ÙˆØ¯.',
    ['Vertical pulls usually bias the lats.', 'Rows build more mid-back density and scapular control.', 'Hinge-support work trains the erectors and trunk endurance.'],
    ['Ø§Ù„Ø³Ø­Ø¨ Ø§Ù„Ø±Ø£Ø³ÙŠ ÙŠÙ…ÙŠÙ„ Ù„Ø§Ø³ØªÙ‡Ø¯Ø§Ù Ø§Ù„Ù„Ø§ØªØ³.', 'Ø§Ù„Ø±Ùˆ ÙŠØ¨Ù†ÙŠ Ø³Ù…Ø§ÙƒØ© Ù…Ù†ØªØµÙ Ø§Ù„Ø¸Ù‡Ø± ÙˆØ§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ù„ÙˆØ­ Ø§Ù„ÙƒØªÙ.', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ù‡ÙŠØ¨ Ù‡Ù†Ø¬ ØªØ¯Ø±Ø¨ Ø§Ù„Ø¹Ø¶Ù„Ø§Øª Ø§Ù„Ø¯Ø§Ø¹Ù…Ø© Ù„Ù„Ø¹Ù…ÙˆØ¯ ÙˆØªØ­Ù…Ù„ Ø§Ù„Ø¬Ø°Ø¹.'],
    ['Match vertical pulls with horizontal rows.', 'Pause at the top instead of using momentum.', 'Train grip and upper-back control together.'],
    ['ÙˆØ§Ø²Ù† Ø¨ÙŠÙ† Ø§Ù„Ø³Ø­Ø¨ Ø§Ù„Ø±Ø£Ø³ÙŠ ÙˆØ§Ù„Ø±Ùˆ Ø§Ù„Ø£ÙÙ‚ÙŠ.', 'ØªÙˆÙ‚Ù Ù„Ø­Ø¸Ø© Ø¨Ø¯Ù„ Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ø²Ø®Ù….', 'Ø¯Ø±Ù‘Ø¨ Ø§Ù„Ù‚Ø¨Ø¶Ø© ÙˆØ§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ø£Ø¹Ù„Ù‰ Ø§Ù„Ø¸Ù‡Ø± Ù…Ø¹Ù‹Ø§.'],
    ['back exercises for lats', 'best back workout gym', 'row exercises', 'lower back exercises'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† Ø¸Ù‡Ø±', 'ØªÙ…Ø§Ø±ÙŠÙ† Ù„Ø§ØªØ³', 'Ø£ÙØ¶Ù„ ØªÙ…Ø§Ø±ÙŠÙ† Ø¸Ù‡Ø±', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø£Ø³ÙÙ„ Ø§Ù„Ø¸Ù‡Ø±'],
  ),
  shoulders: buildRegionContent(
    'Shoulder training works best when front, side, and rear delt work is balanced with good scapular control.',
    'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„ÙƒØªÙ ÙŠÙƒÙˆÙ† Ø£ÙØ¶Ù„ Ø¹Ù†Ø¯Ù…Ø§ ÙŠØªÙˆØ§Ø²Ù† Ø§Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø£Ù…Ø§Ù…ÙŠ ÙˆØ§Ù„Ø¬Ø§Ù†Ø¨ÙŠ ÙˆØ§Ù„Ø®Ù„ÙÙŠ Ù…Ø¹ Ø§Ù„ØªØ­ÙƒÙ… Ø§Ù„Ø¬ÙŠØ¯ ÙÙŠ Ù„ÙˆØ­ Ø§Ù„ÙƒØªÙ.',
    ['Front delts overlap heavily with pressing.', 'Side delts usually need direct raise volume.', 'Rear delts respond well to rows, flyes, and face pulls.'],
    ['Ø§Ù„ÙƒØªÙ Ø§Ù„Ø£Ù…Ø§Ù…ÙŠ ÙŠØªØ¯Ø§Ø®Ù„ ÙƒØ«ÙŠØ±Ù‹Ø§ Ù…Ø¹ Ø§Ù„Ø¶ØºØ·.', 'Ø§Ù„ÙƒØªÙ Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠ ÙŠØ­ØªØ§Ø¬ ØºØ§Ù„Ø¨Ù‹Ø§ Ø­Ø¬Ù…Ù‹Ø§ Ù…Ø¨Ø§Ø´Ø±Ù‹Ø§.', 'Ø§Ù„ÙƒØªÙ Ø§Ù„Ø®Ù„ÙÙŠ ÙŠØ³ØªØ¬ÙŠØ¨ Ù„Ù„Ø±Ùˆ ÙˆØ§Ù„ÙÙ„Ø§ÙŠ ÙˆØ§Ù„ÙÙŠØ³ Ø¨ÙˆÙ„.'],
    ['Do not force painful overhead ranges.', 'Keep shrugging from taking over raises.', 'Use rear-delt work to support pressing mechanics.'],
    ['Ù„Ø§ ØªÙØ±Ø¶ Ù…Ø¯Ù‰ Ø¹Ù„ÙˆÙŠÙ‹Ø§ Ù…Ø¤Ù„Ù…Ù‹Ø§.', 'Ù„Ø§ ØªØ³Ù…Ø­ Ù„Ù„ØªØ±Ø§Ø¨ÙŠØ³ Ø¨Ø§Ù„Ø³ÙŠØ·Ø±Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø±ÙØ¹Ø§Øª.', 'Ø§Ø³ØªØ®Ø¯Ù… Ø¹Ù…Ù„ Ø§Ù„ÙƒØªÙ Ø§Ù„Ø®Ù„ÙÙŠ Ù„Ø¯Ø¹Ù… Ø§Ù„Ø¶ØºØ·.'],
    ['shoulder exercises gym', 'side delt exercises', 'rear delt workout', 'shoulder workout dumbbells'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† ÙƒØªÙ', 'ØªÙ…Ø§Ø±ÙŠÙ† ÙƒØªÙ Ø¬Ø§Ù†Ø¨ÙŠ', 'ØªÙ…Ø§Ø±ÙŠÙ† ÙƒØªÙ Ø®Ù„ÙÙŠ', 'ØªÙ…Ø§Ø±ÙŠÙ† ÙƒØªÙ Ø¨Ø§Ù„Ø¯Ù…Ø¨Ù„'],
  ),
  biceps: buildRegionContent(
    'Biceps training supports both arm size and pulling strength, especially when curl choices match elbow comfort.',
    'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„Ø¨Ø§ÙŠØ³Ø¨Ø³ ÙŠØ¯Ø¹Ù… Ø­Ø¬Ù… Ø§Ù„Ø°Ø±Ø§Ø¹ ÙˆÙ‚ÙˆØ© Ø§Ù„Ø³Ø­Ø¨ Ø®ØµÙˆØµÙ‹Ø§ Ø¹Ù†Ø¯Ù…Ø§ ØªØªÙˆØ§ÙÙ‚ Ø§Ù„ØªÙ…Ø§Ø±ÙŠÙ† Ù…Ø¹ Ø±Ø§Ø­Ø© Ø§Ù„ÙƒÙˆØ¹.',
    ['Supinated curls bias the biceps more directly.', 'Neutral-grip curls often feel better on irritated elbows.', 'Pulling compounds still add meaningful biceps stimulus.'],
    ['Ø§Ù„Ù‚Ø¨Ø¶Ø© Ø§Ù„Ù…Ù‚Ù„ÙˆØ¨Ø© Ù„Ù„Ø®Ø§Ø±Ø¬ ØªØ³ØªÙ‡Ø¯Ù Ø§Ù„Ø¨Ø§ÙŠØ³Ø¨Ø³ Ù…Ø¨Ø§Ø´Ø±Ø© Ø£ÙƒØ«Ø±.', 'Ù‚Ø¨Ø¶Ø© Ø§Ù„Ù‡Ø§Ù…Ø± ØºØ§Ù„Ø¨Ù‹Ø§ Ø£Ù„Ø·Ù Ø¹Ù„Ù‰ Ø§Ù„ÙƒÙˆØ¹.', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø³Ø­Ø¨ Ø§Ù„Ù…Ø±ÙƒØ¨Ø© ØªØ¶ÙŠÙ ØªØ­ÙÙŠØ²Ù‹Ø§ Ù…Ù‡Ù…Ù‹Ø§ Ù„Ù„Ø¨Ø§ÙŠØ³Ø¨Ø³.'],
    ['Control the lowering phase.', 'Do not swing the torso for hard reps.', 'Match direct arm work to your pull volume.'],
    ['ØªØ­ÙƒÙ… ÙÙŠ Ø§Ù„Ù†Ø²ÙˆÙ„.', 'Ù„Ø§ ØªÙ‡Ø² Ø§Ù„Ø¬Ø°Ø¹ Ù„Ø¥ÙƒÙ…Ø§Ù„ Ø§Ù„Ø¹Ø¯Ø§Øª Ø§Ù„ØµØ¹Ø¨Ø©.', 'ÙˆØ§Ø²Ù† ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø°Ø±Ø§Ø¹ Ù…Ø¹ Ø­Ø¬Ù… Ø§Ù„Ø³Ø­Ø¨.'],
    ['biceps exercises', 'best curls for biceps', 'hammer curl workout', 'arm day biceps'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† Ø¨Ø§ÙŠØ³Ø¨Ø³', 'Ø£ÙØ¶Ù„ ØªÙ…Ø§Ø±ÙŠÙ† Ø¨Ø§ÙŠØ³Ø¨Ø³', 'ØªÙ…Ø§Ø±ÙŠÙ† Ù‡Ø§Ù…Ø±', 'ÙŠÙˆÙ… Ø§Ù„Ø°Ø±Ø§Ø¹'],
  ),
  triceps: buildRegionContent(
    'Triceps size and pressing performance are tightly linked, so direct triceps work often improves lockout strength too.',
    'Ø­Ø¬Ù… Ø§Ù„ØªØ±Ø§ÙŠØ³Ø¨Ø³ ÙˆØ£Ø¯Ø§Ø¡ Ø§Ù„Ø¶ØºØ· Ù…Ø±ØªØ¨Ø·Ø§Ù† Ø¬Ø¯Ù‹Ø§ØŒ Ù„Ø°Ù„Ùƒ Ø¹Ù…Ù„ Ø§Ù„ØªØ±Ø§ÙŠØ³Ø¨Ø³ Ø§Ù„Ù…Ø¨Ø§Ø´Ø± ÙŠØ­Ø³Ù† Ù‚ÙˆØ© Ø§Ù„Ù„ÙˆÙƒ Ø¢ÙˆØª Ø£ÙŠØ¶Ù‹Ø§.',
    ['Pushdowns are simple and easy to recover from.', 'Overhead extensions challenge the long head differently.', 'Pressing compounds already contribute a lot of triceps work.'],
    ['Ø§Ù„Ø¶ØºØ· Ù„Ø£Ø³ÙÙ„ Ø¨Ø³ÙŠØ· ÙˆØ³Ù‡Ù„ Ø§Ù„Ø§Ø³ØªØ´ÙØ§Ø¡.', 'Ø§Ù„ØªÙ…Ø§Ø±ÙŠÙ† ÙÙˆÙ‚ Ø§Ù„Ø±Ø£Ø³ ØªØ³ØªÙ‡Ø¯Ù Ø§Ù„Ø±Ø£Ø³ Ø§Ù„Ø·ÙˆÙŠÙ„ Ø¨Ø´ÙƒÙ„ Ù…Ø®ØªÙ„Ù.', 'Ø§Ù„Ø¶ØºØ· Ø§Ù„Ù…Ø±ÙƒØ¨ ÙŠÙ…Ù†Ø­ Ø§Ù„ØªØ±Ø§ÙŠØ³Ø¨Ø³ Ø­Ø¬Ù…Ù‹Ø§ ÙƒØ¨ÙŠØ±Ù‹Ø§ Ø£ØµÙ„Ù‹Ø§.'],
    ['Keep the elbow path stable.', 'Use full lockout without shoulder compensation.', 'Avoid stacking too much arm work over pressing fatigue.'],
    ['Ø«Ø¨Ù‘Øª Ù…Ø³Ø§Ø± Ø§Ù„ÙƒÙˆØ¹.', 'Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù…ØªØ¯Ø§Ø¯Ù‹Ø§ ÙƒØ§Ù…Ù„Ù‹Ø§ Ø¯ÙˆÙ† ØªØ¹ÙˆÙŠØ¶ Ù…Ù† Ø§Ù„ÙƒØªÙ.', 'Ù„Ø§ ØªÙƒØ¯Ù‘Ø³ Ø­Ø¬Ù… Ø°Ø±Ø§Ø¹ Ù…Ø¨Ø§Ù„ØºÙ‹Ø§ ÙÙˆÙ‚ Ø¥Ø¬Ù‡Ø§Ø¯ Ø§Ù„Ø¶ØºØ·.'],
    ['triceps exercises', 'best triceps workout', 'cable pressdown benefits', 'overhead triceps extension'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† ØªØ±Ø§ÙŠØ³Ø¨Ø³', 'Ø£ÙØ¶Ù„ ØªÙ…Ø§Ø±ÙŠÙ† ØªØ±Ø§ÙŠØ³Ø¨Ø³', 'ÙƒÙŠØ¨Ù„ ØªØ±Ø§ÙŠØ³Ø¨Ø³', 'ØªØ±Ø§ÙŠØ³Ø¨Ø³ ÙÙˆÙ‚ Ø§Ù„Ø±Ø£Ø³'],
  ),
  forearms: buildRegionContent(
    'Forearm training improves grip, wrist tolerance, and the quality of many rows, carries, and curls.',
    'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„Ø³Ø§Ø¹Ø¯ ÙŠØ­Ø³Ù† Ø§Ù„Ù‚Ø¨Ø¶Ø© ÙˆØªØ­Ù…Ù„ Ø§Ù„Ø±Ø³Øº ÙˆØ¬ÙˆØ¯Ø© ÙƒØ«ÙŠØ± Ù…Ù† ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø±Ùˆ ÙˆØ§Ù„Ø­Ù…Ù„ ÙˆØ§Ù„ÙƒÙŠØ±Ù„.',
    ['Rows and carries already train the forearms indirectly.', 'Direct wrist work fills weak points.', 'Neutral-grip patterns are often easier on wrists.'],
    ['Ø§Ù„Ø±Ùˆ ÙˆØ§Ù„Ø­Ù…Ù„ ÙŠØ¯Ø±Ø¨Ø§Ù† Ø§Ù„Ø³Ø§Ø¹Ø¯ Ø¨Ø´ÙƒÙ„ ØºÙŠØ± Ù…Ø¨Ø§Ø´Ø±.', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø±Ø³Øº Ø§Ù„Ù…Ø¨Ø§Ø´Ø±Ø© ØªØ³Ø¯ Ù†Ù‚Ø§Ø· Ø§Ù„Ø¶Ø¹Ù.', 'Ø§Ù„Ù‚Ø¨Ø¶Ø© Ø§Ù„Ù…Ø­Ø§ÙŠØ¯Ø© ØºØ§Ù„Ø¨Ù‹Ø§ Ø£Ù„Ø·Ù Ø¹Ù„Ù‰ Ø§Ù„Ø±Ø³Øº.'],
    ['Train grip through holds and carries.', 'Build tolerance gradually when elbows are sensitive.', 'Use forearm work to support bigger lifts.'],
    ['Ø¯Ø±Ù‘Ø¨ Ø§Ù„Ù‚Ø¨Ø¶Ø© Ø¹Ø¨Ø± Ø§Ù„Ø«Ø¨Ø§Øª ÙˆØ§Ù„Ø­Ù…Ù„.', 'Ø§Ø¨Ù†Ù Ø§Ù„ØªØ­Ù…Ù„ ØªØ¯Ø±ÙŠØ¬ÙŠÙ‹Ø§ Ø¹Ù†Ø¯ Ø­Ø³Ø§Ø³ÙŠØ© Ø§Ù„ÙƒÙˆØ¹.', 'Ø§Ø³ØªØ®Ø¯Ù… ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø³Ø§Ø¹Ø¯ Ù„Ø¯Ø¹Ù… Ø§Ù„ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„ÙƒØ¨Ø±Ù‰.'],
    ['forearm exercises', 'grip strength workout', 'wrist exercises gym', 'forearm dumbbell workout'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† Ø³Ø§Ø¹Ø¯', 'ØªÙ…Ø§Ø±ÙŠÙ† Ù‚Ø¨Ø¶Ø©', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø±Ø³Øº', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø³Ø§Ø¹Ø¯ Ø¨Ø§Ù„Ø¯Ù…Ø¨Ù„'],
  ),
  abs: buildRegionContent(
    'Abs work should improve trunk control and bracing, not just create fatigue.',
    'ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø¨Ø·Ù† ÙŠØ¬Ø¨ Ø£Ù† ØªØ­Ø³Ù† Ø§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ø§Ù„Ø¬Ø°Ø¹ ÙˆØ§Ù„Ø«Ø¨Ø§Øª Ù„Ø§ Ø£Ù† ØªØµÙ†Ø¹ Ø¥Ø¬Ù‡Ø§Ø¯Ù‹Ø§ ÙÙ‚Ø·.',
    ['Crunch patterns train controlled trunk flexion.', 'Reverse crunch variations add pelvic control.', 'Bracing work supports nearly every compound lift.'],
    ['Ø£Ù†Ù…Ø§Ø· Ø§Ù„ÙƒØ±Ù†Ø´ ØªØ¯Ø±Ø¨ Ø«Ù†ÙŠ Ø§Ù„Ø¬Ø°Ø¹ Ø¨Ø´ÙƒÙ„ Ù…Ø¶Ø¨ÙˆØ·.', 'Ø§Ù„Ø±ÙŠÙÙŠØ±Ø³ ÙƒØ±Ù†Ø´ ÙŠØ¶ÙŠÙ ØªØ­ÙƒÙ…Ù‹Ø§ ÙÙŠ Ø§Ù„Ø­ÙˆØ¶.', 'Ø§Ù„Ø«Ø¨Ø§Øª ÙŠØ¯Ø¹Ù… ØªÙ‚Ø±ÙŠØ¨Ù‹Ø§ ÙƒÙ„ ØªÙ…Ø±ÙŠÙ† Ù…Ø±ÙƒØ¨.'],
    ['Keep the ribs stacked.', 'Choose progressions you can control.', 'Pair direct abs work with breathing awareness.'],
    ['Ø­Ø§ÙØ¸ Ø¹Ù„Ù‰ ÙˆØ¶Ø¹ Ø§Ù„Ø£Ø¶Ù„Ø§Ø¹ Ù…ØªØ²Ù†Ù‹Ø§.', 'Ø§Ø®ØªØ± ØªØ¯Ø±Ø¬Ø§Øª ÙŠÙ…ÙƒÙ†Ùƒ Ø§Ù„ØªØ­ÙƒÙ… Ø¨Ù‡Ø§.', 'Ø§Ø±Ø¨Ø· ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø¨Ø·Ù† Ø¨Ø§Ù„ÙˆØ¹ÙŠ Ø¨Ø§Ù„ØªÙ†ÙØ³.'],
    ['abs exercises', 'core workout gym', 'best ab exercises', 'lower abs workout'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† Ø¨Ø·Ù†', 'ØªÙ…Ø§Ø±ÙŠÙ† ÙƒÙˆØ±', 'Ø£ÙØ¶Ù„ ØªÙ…Ø§Ø±ÙŠÙ† Ø¨Ø·Ù†', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø¨Ø·Ù† Ø³ÙÙ„ÙŠØ©'],
  ),
  obliques: buildRegionContent(
    'Oblique training improves rotation control, side stability, and athletic trunk transfer.',
    'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„Ø®ÙˆØ§ØµØ± ÙŠØ­Ø³Ù† Ø§Ù„ØªØ­ÙƒÙ… Ø§Ù„Ø¯ÙˆØ±Ø§Ù†ÙŠ ÙˆØ§Ù„Ø«Ø¨Ø§Øª Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠ ÙˆÙ†Ù‚Ù„ Ø§Ù„Ù‚ÙˆØ© Ø±ÙŠØ§Ø¶ÙŠÙ‹Ø§.',
    ['Anti-rotation drills are highly practical.', 'Controlled rotation matters more than speed.', 'Carry variations often train the obliques well.'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† Ù…Ù‚Ø§ÙˆÙ…Ø© Ø§Ù„Ø¯ÙˆØ±Ø§Ù† Ø¹Ù…Ù„ÙŠØ© Ø¬Ø¯Ù‹Ø§.', 'Ø§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ø§Ù„Ø¯ÙˆØ±Ø§Ù† Ø£Ù‡Ù… Ù…Ù† Ø§Ù„Ø³Ø±Ø¹Ø©.', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø­Ù…Ù„ ØªØ¯Ø±Ø¨ Ø§Ù„Ø®ÙˆØ§ØµØ± Ø¬ÙŠØ¯Ù‹Ø§.'],
    ['Keep the pelvis quiet during anti-rotation drills.', 'Breathe behind the brace.', 'Use carries, chops, and side-plank progressions strategically.'],
    ['Ø­Ø§ÙØ¸ Ø¹Ù„Ù‰ Ø«Ø¨Ø§Øª Ø§Ù„Ø­ÙˆØ¶ ÙÙŠ Ù…Ù‚Ø§ÙˆÙ…Ø© Ø§Ù„Ø¯ÙˆØ±Ø§Ù†.', 'ØªÙ†ÙØ³ Ø¯Ø§Ø®Ù„ Ø§Ù„Ø«Ø¨Ø§Øª.', 'Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„Ø­Ù…Ù„ ÙˆØ§Ù„Ù‚Ø·Ø¹ ÙˆØ§Ù„Ø³Ø§ÙŠØ¯ Ø¨Ù„Ø§Ù†Ùƒ Ø¨Ø°ÙƒØ§Ø¡.'],
    ['oblique exercises', 'side abs workout', 'anti rotation exercises', 'waist core training'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† Ø®ÙˆØ§ØµØ±', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø¨Ø·Ù† Ø¬Ø§Ù†Ø¨ÙŠ', 'ØªÙ…Ø§Ø±ÙŠÙ† Ù…Ù‚Ø§ÙˆÙ…Ø© Ø§Ù„Ø¯ÙˆØ±Ø§Ù†', 'ØªÙ…Ø§Ø±ÙŠÙ† ÙˆØ³Ø· Ø§Ù„Ø¬Ø³Ù…'],
  ),
  lower_back: buildRegionContent(
    'Lower-back work should improve endurance and hinge control more than it chases reckless fatigue.',
    'ØªØ¯Ø±ÙŠØ¨ Ø£Ø³ÙÙ„ Ø§Ù„Ø¸Ù‡Ø± ÙŠØ¬Ø¨ Ø£Ù† ÙŠØ­Ø³Ù† Ø§Ù„ØªØ­Ù…Ù„ ÙˆØ§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ø§Ù„Ù‡ÙŠØ¨ Ù‡Ù†Ø¬ Ø£ÙƒØ«Ø± Ù…Ù† Ù…Ø·Ø§Ø±Ø¯Ø© Ø§Ù„Ø¥Ø¬Ù‡Ø§Ø¯ Ø§Ù„Ø¹Ù†ÙŠÙ.',
    ['Back extensions build tolerance with a simple pattern.', 'Carries and hinges also train the lower back indirectly.', 'More range is not always better if position quality disappears.'],
    ['Ø§Ù„Ù‡Ø§ÙŠØ¨Ø± Ø¥ÙƒØ³ØªÙ†Ø´Ù† ØªØ¨Ù†ÙŠ Ø§Ù„ØªØ­Ù…Ù„ Ø¨Ù†Ù…Ø· Ø¨Ø³ÙŠØ·.', 'Ø§Ù„Ø­Ù…Ù„ ÙˆØ§Ù„Ù‡ÙŠØ¨ Ù‡Ù†Ø¬ ÙŠØ¯Ø±Ø¨Ø§Ù† Ø£Ø³ÙÙ„ Ø§Ù„Ø¸Ù‡Ø± Ø£ÙŠØ¶Ù‹Ø§ Ø¨Ø´ÙƒÙ„ ØºÙŠØ± Ù…Ø¨Ø§Ø´Ø±.', 'Ø§Ù„Ù…Ø¯Ù‰ Ø§Ù„Ø£ÙƒØ¨Ø± Ù„ÙŠØ³ Ø£ÙØ¶Ù„ Ø¥Ø°Ø§ Ø§Ø®ØªÙØª Ø§Ù„Ø¬ÙˆØ¯Ø©.'],
    ['Own the hinge before loading it hard.', 'Use tempo to build confidence.', 'Train it as part of the whole posterior chain.'],
    ['Ø£ØªÙ‚Ù† Ø§Ù„Ù‡ÙŠØ¨ Ù‡Ù†Ø¬ Ù‚Ø¨Ù„ Ø§Ù„ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù‚ÙˆÙŠ.', 'Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„Ø¥ÙŠÙ‚Ø§Ø¹ Ù„Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø«Ù‚Ø©.', 'Ø¯Ø±Ù‘Ø¨Ù‡ ÙƒØ¬Ø²Ø¡ Ù…Ù† Ø§Ù„Ø³Ù„Ø³Ù„Ø© Ø§Ù„Ø®Ù„ÙÙŠØ© ÙƒÙ„Ù‡Ø§.'],
    ['lower back exercises', 'back extension workout', 'posterior chain exercises', 'hinge exercises'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† Ø£Ø³ÙÙ„ Ø§Ù„Ø¸Ù‡Ø±', 'Ù‡Ø§ÙŠØ¨Ø± Ø¥ÙƒØ³ØªÙ†Ø´Ù†', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø³Ù„Ø³Ù„Ø© Ø§Ù„Ø®Ù„ÙÙŠØ©', 'ØªÙ…Ø§Ø±ÙŠÙ† Ù‡ÙŠØ¨ Ù‡Ù†Ø¬'],
  ),
  glutes: buildRegionContent(
    'Glute work matters for strength, sprinting, hip stability, and lower-body shape.',
    'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„Ø¬Ù„ÙˆØªØ³ Ù…Ù‡Ù… Ù„Ù„Ù‚ÙˆØ© ÙˆØ§Ù„Ø³Ø±Ø¹Ø© ÙˆØ«Ø¨Ø§Øª Ø§Ù„Ø­ÙˆØ¶ ÙˆØ´ÙƒÙ„ Ø§Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø³ÙÙ„ÙŠ.',
    ['Hip thrusts train strong lockout and hip extension.', 'Single-leg work challenges pelvic stability.', 'Squats and hinges already train the glutes, but direct work fills gaps.'],
    ['Ø§Ù„Ù‡ÙŠØ¨ Ø«Ø±Ø³Øª ÙŠØ¯Ø±Ø¨ Ù…Ø¯ Ø§Ù„Ø­ÙˆØ¶ Ø¨Ù‚ÙˆØ©.', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø±Ø¬Ù„ Ø§Ù„ÙˆØ§Ø­Ø¯Ø© ØªØªØ­Ø¯Ù‰ Ø«Ø¨Ø§Øª Ø§Ù„Ø­ÙˆØ¶.', 'Ø§Ù„Ø³ÙƒÙˆØ§Øª ÙˆØ§Ù„Ù‡ÙŠØ¨ Ù‡Ù†Ø¬ ÙŠØ¯Ø±Ø¨Ø§Ù† Ø§Ù„Ø¬Ù„ÙˆØªØ³ Ø£ØµÙ„Ù‹Ø§ Ù„ÙƒÙ† Ø§Ù„ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ù…Ø¨Ø§Ø´Ø±Ø© ØªÙƒÙ…Ù„ Ø§Ù„Ù†Ù‚Øµ.'],
    ['Finish with glute tension, not low-back extension.', 'Use unilateral work for control.', 'Match glute volume to your full lower-body week.'],
    ['Ø£Ù†Ù‡Ù Ø§Ù„Ø­Ø±ÙƒØ© Ø¨Ø§Ù†Ù‚Ø¨Ø§Ø¶ Ø§Ù„Ø¬Ù„ÙˆØªØ³ Ù„Ø§ Ø£Ø³ÙÙ„ Ø§Ù„Ø¸Ù‡Ø±.', 'Ø§Ø³ØªØ®Ø¯Ù… Ø§Ù„ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø£Ø­Ø§Ø¯ÙŠØ© Ù„Ù„ØªØ­ÙƒÙ….', 'ÙˆØ§Ø²Ù† Ø­Ø¬Ù… Ø§Ù„Ø¬Ù„ÙˆØªØ³ Ù…Ø¹ Ø£Ø³Ø¨ÙˆØ¹ Ø§Ù„Ø±Ø¬Ù„ ÙƒÙ„Ù‡.'],
    ['glute exercises', 'hip thrust workout', 'glute training gym', 'best glute exercises'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† Ø¬Ù„ÙˆØªØ³', 'Ù‡ÙŠØ¨ Ø«Ø±Ø³Øª', 'ØªÙ…Ø§Ø±ÙŠÙ† Ù…Ø¤Ø®Ø±Ø©', 'Ø£ÙØ¶Ù„ ØªÙ…Ø§Ø±ÙŠÙ† Ø¬Ù„ÙˆØªØ³'],
  ),
  quadriceps: buildRegionContent(
    'Quad training drives knee-dominant leg strength and many hypertrophy-focused lower-body sessions.',
    'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„ÙƒÙˆØ§Ø¯Ø² ÙŠÙ‚ÙˆØ¯ Ù‚ÙˆØ© Ø§Ù„Ø±Ø¬Ù„ Ø§Ù„Ø£Ù…Ø§Ù…ÙŠØ© ÙˆÙƒØ«ÙŠØ±Ù‹Ø§ Ù…Ù† Ø­ØµØµ Ø§Ù„ØªØ¶Ø®ÙŠÙ… Ù„Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø³ÙÙ„ÙŠ.',
    ['Squats and leg presses give the biggest total quad stimulus.', 'Split squats reveal side-to-side differences.', 'Tempo and Spanish squat work can load the quads without huge weights.'],
    ['Ø§Ù„Ø³ÙƒÙˆØ§Øª ÙˆØ§Ù„Ù„ÙŠØ¬ Ø¨Ø±Ø³ ÙŠÙ…Ù†Ø­Ø§Ù† Ø£ÙƒØ¨Ø± ØªØ­ÙÙŠØ² Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ù„Ù„ÙƒÙˆØ§Ø¯Ø².', 'Ø§Ù„Ø³Ø¨Ù„ÙŠØª Ø³ÙƒÙˆØ§Øª ÙŠÙƒØ´Ù Ø§Ù„ÙØ±ÙˆÙ‚ Ø¨ÙŠÙ† Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠÙ†.', 'Ø§Ù„ØªÙ…Ø¨Ùˆ ÙˆØ§Ù„Ø³Ø¨Ø§Ù†ÙŠØ´ Ø³ÙƒÙˆØ§Øª ÙŠØ­Ù…Ù‘Ù„Ø§Ù† Ø§Ù„ÙƒÙˆØ§Ø¯Ø² Ø¯ÙˆÙ† Ø£ÙˆØ²Ø§Ù† Ø¶Ø®Ù…Ø©.'],
    ['Use consistent depth.', 'Let the knee move when the exercise allows it.', 'Keep trunk and hip position stable under fatigue.'],
    ['Ø§Ø³ØªØ®Ø¯Ù… Ø¹Ù…Ù‚Ù‹Ø§ Ø«Ø§Ø¨ØªÙ‹Ø§.', 'Ø§Ø³Ù…Ø­ Ù„Ù„Ø±ÙƒØ¨Ø© Ø¨Ø§Ù„Ø­Ø±ÙƒØ© Ø­ÙŠÙ† ÙŠØ³Ù…Ø­ Ø§Ù„ØªÙ…Ø±ÙŠÙ†.', 'Ø­Ø§ÙØ¸ Ø¹Ù„Ù‰ Ø«Ø¨Ø§Øª Ø§Ù„Ø¬Ø°Ø¹ ÙˆØ§Ù„Ø­ÙˆØ¶ ØªØ­Øª Ø§Ù„ØªØ¹Ø¨.'],
    ['quad exercises', 'leg day quads', 'best quadriceps workout', 'front squat benefits'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† ÙƒÙˆØ§Ø¯Ø²', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„ÙØ®Ø° Ø§Ù„Ø£Ù…Ø§Ù…ÙŠ', 'Ø£ÙØ¶Ù„ ØªÙ…Ø§Ø±ÙŠÙ† ÙƒÙˆØ§Ø¯Ø²', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø±Ø¬Ù„ Ø£Ù…Ø§Ù…ÙŠ'],
  ),
  hamstrings: buildRegionContent(
    'Hamstrings support sprinting, hinging, knee flexion, and overall lower-body balance.',
    'Ø§Ù„Ù‡Ø§Ù…Ø³ØªØ±ÙŠÙ†Ø¬ ØªØ¯Ø¹Ù… Ø§Ù„Ø³Ø±Ø¹Ø© ÙˆØ§Ù„Ù‡ÙŠØ¨ Ù‡Ù†Ø¬ ÙˆØ«Ù†ÙŠ Ø§Ù„Ø±ÙƒØ¨Ø© ÙˆØªÙˆØ§Ø²Ù† Ø§Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø³ÙÙ„ÙŠ.',
    ['Hip-hinge work loads the hamstrings at longer lengths.', 'Curl patterns train knee-flexion strength directly.', 'Posterior-chain work supports hip and knee balance together.'],
    ['Ø§Ù„Ù‡ÙŠØ¨ Ù‡Ù†Ø¬ ÙŠØ­Ù…Ù‘Ù„ Ø§Ù„Ù‡Ø§Ù…Ø³ØªØ±ÙŠÙ†Ø¬ ÙÙŠ Ø£Ø·ÙˆØ§Ù„ Ø£ÙƒØ¨Ø±.', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„ÙƒÙŠØ±Ù„ ØªØ¯Ø±Ø¨ Ù‚ÙˆØ© Ø«Ù†ÙŠ Ø§Ù„Ø±ÙƒØ¨Ø© Ù…Ø¨Ø§Ø´Ø±Ø©.', 'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„Ø³Ù„Ø³Ù„Ø© Ø§Ù„Ø®Ù„ÙÙŠØ© ÙŠØ¯Ø¹Ù… ØªÙˆØ§Ø²Ù† Ø§Ù„Ø­ÙˆØ¶ ÙˆØ§Ù„Ø±ÙƒØ¨Ø© Ù…Ø¹Ù‹Ø§.'],
    ['Do not turn every hinge into low-back work.', 'Use slow eccentrics on curls.', 'Pair hamstrings with glute and calf support.'],
    ['Ù„Ø§ ØªØ­ÙˆÙ„ ÙƒÙ„ Ù‡ÙŠØ¨ Ù‡Ù†Ø¬ Ø¥Ù„Ù‰ Ø£Ø³ÙÙ„ Ø¸Ù‡Ø±.', 'Ø§Ø³ØªØ®Ø¯Ù… Ù†Ø²ÙˆÙ„Ù‹Ø§ Ø¨Ø·ÙŠØ¦Ù‹Ø§ ÙÙŠ ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„ÙƒÙŠØ±Ù„.', 'Ø§Ø±Ø¨Ø· Ø§Ù„Ù‡Ø§Ù…Ø³ØªØ±ÙŠÙ†Ø¬ Ø¨Ø¯Ø¹Ù… Ø§Ù„Ø¬Ù„ÙˆØªØ³ ÙˆØ§Ù„Ø³Ù…Ø§Ù†Ø©.'],
    ['hamstring exercises', 'posterior chain workout', 'RDL hamstring', 'hamstring curl workout'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† Ù‡Ø§Ù…Ø³ØªØ±ÙŠÙ†Ø¬', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø®Ù„ÙÙŠØ© Ø§Ù„Ø±Ø¬Ù„', 'ØªÙ…Ø§Ø±ÙŠÙ† RDL', 'ÙƒÙŠØ±Ù„ Ù‡Ø§Ù…Ø³ØªØ±ÙŠÙ†Ø¬'],
  ),
  calves: buildRegionContent(
    'Calf work supports ankle stiffness, running economy, and better lower-leg development.',
    'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„Ø³Ù…Ø§Ù†Ø© ÙŠØ¯Ø¹Ù… ØµÙ„Ø§Ø¨Ø© Ø§Ù„ÙƒØ§Ø­Ù„ ÙˆØ§Ù‚ØªØµØ§Ø¯ Ø§Ù„Ø¬Ø±ÙŠ ÙˆØªØ·ÙˆØ± Ø§Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø³ÙÙ„ÙŠ Ù…Ù† Ø§Ù„Ø³Ø§Ù‚.',
    ['Standing calf raises often bias the gastrocnemius.', 'Seated versions usually bias the soleus more.', 'Long pauses often make calf work more effective.'],
    ['Ø§Ù„Ø±ÙØ¹ ÙˆØ§Ù‚ÙÙ‹Ø§ ÙŠÙ…ÙŠÙ„ Ø¥Ù„Ù‰ Ø§Ø³ØªÙ‡Ø¯Ø§Ù Ø§Ù„Ø¬Ø§Ø³ØªØ±ÙˆÙƒÙ†ÙŠÙ…ÙŠÙˆØ³.', 'Ø§Ù„Ø±ÙØ¹ Ø¬Ø§Ù„Ø³Ù‹Ø§ ÙŠØ±ÙƒØ² ØºØ§Ù„Ø¨Ù‹Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø³ÙˆÙ„ÙŠÙˆØ³.', 'Ø§Ù„ØªÙˆÙ‚Ù Ø§Ù„Ø·ÙˆÙŠÙ„ ÙŠØ¬Ø¹Ù„ ØªØ¯Ø±ÙŠØ¨ Ø§Ù„Ø³Ù…Ø§Ù†Ø© Ø£ÙƒØ«Ø± ÙØ¹Ø§Ù„ÙŠØ©.'],
    ['Train the full range instead of bouncing.', 'Use enough weekly frequency.', 'Pair calf work with ankle-control drills when needed.'],
    ['Ø¯Ø±Ù‘Ø¨ Ø§Ù„Ù…Ø¯Ù‰ Ø§Ù„ÙƒØ§Ù…Ù„ Ø¨Ø¯Ù„ Ø§Ù„Ø§Ø±ØªØ¯Ø§Ø¯.', 'Ø§Ø³ØªØ®Ø¯Ù… ØªÙƒØ±Ø§Ø±Ù‹Ø§ Ø£Ø³Ø¨ÙˆØ¹ÙŠÙ‹Ø§ ÙƒØ§ÙÙŠÙ‹Ø§.', 'Ø§Ø±Ø¨Ø· ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø³Ù…Ø§Ù†Ø© Ø¨Ø§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ø§Ù„ÙƒØ§Ø­Ù„ Ø¹Ù†Ø¯ Ø§Ù„Ø­Ø§Ø¬Ø©.'],
    ['calf exercises', 'standing calf raise', 'best calf workout', 'soleus exercises'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† Ø³Ù…Ø§Ù†Ø©', 'Ø£ÙØ¶Ù„ ØªÙ…Ø§Ø±ÙŠÙ† Ø³Ù…Ø§Ù†Ø©', 'Ø±ÙØ¹ Ø³Ù…Ø§Ù†Ø© ÙˆØ§Ù‚Ù', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø³ÙˆÙ„ÙŠÙˆØ³'],
  ),
  arms: buildRegionContent(
    'Arms programming combines biceps, triceps, and forearm work so users can build size while supporting bigger push and pull days.',
    'Ø¨Ø±Ù…Ø¬Ø© Ø§Ù„Ø°Ø±Ø§Ø¹ ØªØ¬Ù…Ø¹ Ø¨ÙŠÙ† Ø§Ù„Ø¨Ø§ÙŠØ³Ø¨Ø³ ÙˆØ§Ù„ØªØ±Ø§ÙŠØ³Ø¨Ø³ ÙˆØ§Ù„Ø³Ø§Ø¹Ø¯ Ù„ÙŠØ¨Ù†ÙŠ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ø§Ù„Ø­Ø¬Ù… ÙˆÙŠØ¯Ø¹Ù… Ø£ÙŠØ§Ù… Ø§Ù„Ø³Ø­Ø¨ ÙˆØ§Ù„Ø¯ÙØ¹.',
    ['Biceps usually gain extra stimulus from pulling.', 'Triceps usually gain extra stimulus from pressing.', 'Forearms support grip and elbow tolerance across many lifts.'],
    ['Ø§Ù„Ø¨Ø§ÙŠØ³Ø¨Ø³ ØªØ­ØµÙ„ Ø¹Ù„Ù‰ ØªØ­ÙÙŠØ² Ø¥Ø¶Ø§ÙÙŠ Ù…Ù† Ø§Ù„Ø³Ø­Ø¨.', 'Ø§Ù„ØªØ±Ø§ÙŠØ³Ø¨Ø³ ØªØ­ØµÙ„ Ø¹Ù„Ù‰ ØªØ­ÙÙŠØ² Ø¥Ø¶Ø§ÙÙŠ Ù…Ù† Ø§Ù„Ø¶ØºØ·.', 'Ø§Ù„Ø³Ø§Ø¹Ø¯ ØªØ¯Ø¹Ù… Ø§Ù„Ù‚Ø¨Ø¶Ø© ÙˆØªØ­Ù…Ù„ Ø§Ù„ÙƒÙˆØ¹ ÙÙŠ ØªÙ…Ø§Ø±ÙŠÙ† ÙƒØ«ÙŠØ±Ø©.'],
    ['Do not separate arm work from push and pull volume.', 'Use a mix of supinated, neutral, and extension patterns.', 'Protect elbows by managing total load.'],
    ['Ù„Ø§ ØªÙØµÙ„ ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø°Ø±Ø§Ø¹ Ø¹Ù† Ø­Ø¬Ù… Ø§Ù„Ø³Ø­Ø¨ ÙˆØ§Ù„Ø¶ØºØ·.', 'Ø§Ø³ØªØ®Ø¯Ù… Ù…Ø²ÙŠØ¬Ù‹Ø§ Ù…Ù† Ø§Ù„Ù‚Ø¨Ø¶Ø§Øª ÙˆØ§Ù„Ø²ÙˆØ§ÙŠØ§.', 'Ø§Ø­Ù…Ù Ø§Ù„ÙƒÙˆØ¹ Ø¹Ø¨Ø± Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø­Ù…Ù„ Ø§Ù„ÙƒÙ„ÙŠ.'],
    ['arm exercises', 'arm day workout', 'biceps and triceps workout', 'forearm arm workout'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† Ø°Ø±Ø§Ø¹', 'ÙŠÙˆÙ… Ø§Ù„Ø°Ø±Ø§Ø¹', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø¨Ø§ÙŠØ³Ø¨Ø³ ÙˆØªØ±Ø§ÙŠØ³Ø¨Ø³', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø³Ø§Ø¹Ø¯'],
  ),
  core: buildRegionContent(
    'Core training ties together abs, obliques, and lower-back support to build a stronger trunk for lifting and daily movement.',
    'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„ÙƒÙˆØ± ÙŠØ¬Ù…Ø¹ Ø¨ÙŠÙ† Ø§Ù„Ø¨Ø·Ù† ÙˆØ§Ù„Ø®ÙˆØ§ØµØ± ÙˆØ¯Ø¹Ù… Ø£Ø³ÙÙ„ Ø§Ù„Ø¸Ù‡Ø± Ù„ÙŠØ¨Ù†ÙŠ Ø¬Ø°Ø¹Ù‹Ø§ Ø£Ù‚ÙˆÙ‰ Ù„Ù„Ø±ÙØ¹ ÙˆØ§Ù„Ø­Ø±ÙƒØ© Ø§Ù„ÙŠÙˆÙ…ÙŠØ©.',
    ['Abs often manage flexion and anti-extension.', 'Obliques support rotation and side stability.', 'Lower-back muscles maintain position during loaded patterns.'],
    ['Ø§Ù„Ø¨Ø·Ù† ØªØ¯ÙŠØ± Ø§Ù„Ø«Ù†ÙŠ ÙˆÙ…Ù‚Ø§ÙˆÙ…Ø© Ø§Ù„ØªÙ…Ø¯Ø¯.', 'Ø§Ù„Ø®ÙˆØ§ØµØ± ØªØ¯Ø¹Ù… Ø§Ù„Ø¯ÙˆØ±Ø§Ù† ÙˆØ§Ù„Ø«Ø¨Ø§Øª Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠ.', 'Ø£Ø³ÙÙ„ Ø§Ù„Ø¸Ù‡Ø± ÙŠØ­Ø§ÙØ¸ Ø¹Ù„Ù‰ Ø§Ù„ÙˆØ¶Ø¹ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø£Ø­Ù…Ø§Ù„.'],
    ['Use flexion, anti-extension, and anti-rotation patterns.', 'Train trunk control to support bigger lifts.', 'Choose progressions that improve position, not just soreness.'],
    ['Ø§Ø³ØªØ®Ø¯Ù… Ø£Ù†Ù…Ø§Ø· Ø§Ù„Ø«Ù†ÙŠ ÙˆÙ…Ù‚Ø§ÙˆÙ…Ø© Ø§Ù„ØªÙ…Ø¯Ø¯ ÙˆÙ…Ù‚Ø§ÙˆÙ…Ø© Ø§Ù„Ø¯ÙˆØ±Ø§Ù†.', 'Ø¯Ø±Ù‘Ø¨ ØªØ­ÙƒÙ… Ø§Ù„Ø¬Ø°Ø¹ Ù„Ø¯Ø¹Ù… Ø§Ù„ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø£ÙƒØ¨Ø±.', 'Ø§Ø®ØªØ± ØªØ¯Ø±Ø¬Ø§Øª ØªØ­Ø³Ù† Ø§Ù„ÙˆØ¶Ø¹ÙŠØ© Ù„Ø§ Ù…Ø¬Ø±Ø¯ Ø§Ù„Ø£Ù„Ù….'],
    ['core exercises', 'ab and oblique workout', 'lower back core exercises', 'gym core workout'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† ÙƒÙˆØ±', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø¨Ø·Ù† ÙˆØ®ÙˆØ§ØµØ±', 'ØªÙ…Ø§Ø±ÙŠÙ† ÙƒÙˆØ± Ù„Ù„Ø¬ÙŠÙ…', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø¬Ø°Ø¹'],
  ),
  neck: buildRegionContent(
    'Neck rehab work should improve control, posture, and shoulder-blade support rather than chasing hard fatigue.',
    'تأهيل الرقبة يجب أن يحسن التحكم والوضعية ودعم لوح الكتف بدل مطاردة الإجهاد الشديد.',
    ['Shoulder-blade control often changes how the neck feels under load.', 'Gentle pulling and rear-shoulder work usually fits better than aggressive shrugging.', 'Thoracic posture and breathing can reduce repeated neck tension.'],
    ['التحكم في لوح الكتف يغيّر كثيرًا من إحساس الرقبة تحت الحمل.', 'السحب الخفيف وتمارين الكتف الخلفي تناسب غالبًا أكثر من الشد العنيف للأعلى.', 'وضعية الصدر والتنفس قد يقللان التوتر المتكرر في الرقبة.'],
    ['Use low-irritation pulling patterns first.', 'Keep the ribs stacked and avoid jutting the chin forward.', 'Progress from control drills into tolerable shoulder strength work.'],
    ['ابدأ بأنماط سحب منخفضة التهييج.', 'حافظ على القفص الصدري متزنًا وتجنب دفع الذقن للأمام.', 'تدرج من تمارين التحكم إلى تقوية الكتف بشكل محتمل.'],
    ['neck rehab exercises', 'cervical rehab workout', 'shoulder blade exercises for neck pain', 'posture exercises for neck'],
    ['تمارين تأهيل الرقبة', 'تمارين الفقرات العنقية', 'تمارين لوح الكتف لألم الرقبة', 'تمارين وضعية الرقبة'],
  ),
  hip: buildRegionContent(
    'Hip rehab needs glute strength, hamstring support, single-leg control, and enough range to restore daily movement quality.',
    'تأهيل الورك يحتاج قوة في العضلات الخلفية والثبات الأحادي ومدى حركة كافٍ لاستعادة جودة الحركة اليومية.',
    ['Glutes often lead hip stability and pelvic control.', 'Hamstrings and split-stance work support hip extension tolerance.', 'Hip rehab usually improves faster when core and trunk control stay involved.'],
    ['الجلوتس غالبًا تقود ثبات الورك والتحكم في الحوض.', 'الهمسترينج والعمل بوضعيات منقسمة يدعمان تحمل مد الورك.', 'تأهيل الورك يتحسن أسرع حين يبقى تحكم الجذع والكور حاضرًا.'],
    ['Use unilateral work to expose side-to-side differences.', 'Own hip extension without leaning into the low back.', 'Start with control and tempo before chasing heavier load.'],
    ['استخدم تمارين أحادية الطرف لكشف الفروق بين الجانبين.', 'أتقن مد الورك دون التعويض بأسفل الظهر.', 'ابدأ بالتحكم والإيقاع قبل زيادة الحمل.'],
    ['hip rehab exercises', 'glute and hamstring rehab', 'hip stability workout', 'single-leg hip control'],
    ['تمارين تأهيل الورك', 'تأهيل الجلوتس والهمسترينج', 'تمارين ثبات الورك', 'تحكم الورك برجل واحدة'],
  ),
  'wrist-rehab': buildRegionContent(
    'Wrist rehab benefits from forearm loading, grip tolerance, and gradual return to pressure-bearing tasks.',
    'تأهيل الرسغ يستفيد من تحميل الساعد وتحمل القبضة والعودة التدريجية للمهام التي تعتمد على الضغط.',
    ['Forearm strength gives the wrist more support than isolated stretching alone.', 'Neutral-grip work is often better tolerated early.', 'Carry and hold drills can rebuild confidence without complex setup.'],
    ['قوة الساعد تمنح الرسغ دعمًا أكبر من الإطالة المعزولة وحدها.', 'القبضة المحايدة غالبًا تكون أسهل تحملاً في البداية.', 'تمارين الحمل والثبات تعيد الثقة بدون تجهيز معقد.'],
    ['Keep the wrist position clean before adding volume.', 'Progress from supported grip work into harder carries or curls.', 'Stop short of sharp wrist pain and build tolerance gradually.'],
    ['حافظ على وضع الرسغ الصحيح قبل زيادة الحجم.', 'تدرج من تمارين القبضة المدعومة إلى حمل أو كيرلز أصعب.', 'توقف قبل الألم الحاد وابنِ التحمل تدريجيًا.'],
    ['wrist rehab exercises', 'forearm rehab workout', 'grip rehab training', 'wrist stability exercises'],
    ['تمارين تأهيل الرسغ', 'تأهيل الساعد', 'تدريب القبضة العلاجي', 'تمارين ثبات الرسغ'],
  ),
  'full-body-rehab': buildRegionContent(
    'Full-body rehab works best when the week reconnects trunk control, hips, shoulders, and gait rather than overloading one area too early.',
    'تأهيل الجسم بالكامل ينجح أكثر عندما يعيد ربط التحكم في الجذع والورك والكتف والمشية بدل تحميل منطقة واحدة مبكرًا.',
    ['Simple patterns should rebuild confidence first.', 'Posterior-chain and shoulder-blade work usually give the best return early.', 'A smart return-to-training week mixes strength, control, and low-cost conditioning.'],
    ['الأنماط البسيطة يجب أن تعيد الثقة أولًا.', 'عمل السلسلة الخلفية ولوح الكتف يعطي غالبًا أفضل عائد مبكرًا.', 'أسبوع العودة الذكي يمزج بين القوة والتحكم واللياقة منخفضة التكلفة.'],
    ['Use pain-calmed movement first, then add density slowly.', 'Pick exercises that leave the next day manageable.', 'Return-to-training plans should feel repeatable, not heroic.'],
    ['ابدأ بحركة تهدئ الألم ثم زد الكثافة ببطء.', 'اختر تمارين تجعل اليوم التالي قابلًا للإدارة.', 'خطط العودة للتدريب يجب أن تكون قابلة للتكرار لا بطولية.'],
    ['full body rehab exercises', 'return to training workout', 'post rehab gym plan', 'whole body recovery workout'],
    ['تمارين تأهيل الجسم بالكامل', 'تمارين العودة للتدريب', 'خطة جيم بعد التأهيل', 'تمارين تعافي الجسم كله'],
  ),
  legs: buildRegionContent(
    'Leg training combines quads, hamstrings, glutes, and calves so users can organize complete lower-body sessions around strength and muscle gain.',
    'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„Ø±Ø¬Ù„ ÙŠØ¬Ù…Ø¹ Ø§Ù„ÙƒÙˆØ§Ø¯Ø² ÙˆØ§Ù„Ù‡Ø§Ù…Ø³ØªØ±ÙŠÙ†Ø¬ ÙˆØ§Ù„Ø¬Ù„ÙˆØªØ³ ÙˆØ§Ù„Ø³Ù…Ø§Ù†Ø© Ù„ØªÙ†Ø¸ÙŠÙ… Ø­ØµØµ ÙƒØ§Ù…Ù„Ø© Ù„Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø³ÙÙ„ÙŠ Ø­ÙˆÙ„ Ø§Ù„Ù‚ÙˆØ© ÙˆØ§Ù„Ø¹Ø¶Ù„Ø§Øª.',
    ['Quads drive squat and step patterns.', 'Hamstrings and glutes dominate hinge work.', 'Calves and ankle control matter more than many lifters expect.'],
    ['Ø§Ù„ÙƒÙˆØ§Ø¯Ø² ØªÙ‚ÙˆØ¯ Ø§Ù„Ø³ÙƒÙˆØ§Øª ÙˆØ§Ù„ØµØ¹ÙˆØ¯.', 'Ø§Ù„Ù‡Ø§Ù…Ø³ØªØ±ÙŠÙ†Ø¬ ÙˆØ§Ù„Ø¬Ù„ÙˆØªØ³ ØªØ³ÙŠØ·Ø±Ø§Ù† Ø¹Ù„Ù‰ Ø§Ù„Ù‡ÙŠØ¨ Ù‡Ù†Ø¬.', 'Ø§Ù„Ø³Ù…Ø§Ù†Ø© ÙˆØ§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ø§Ù„ÙƒØ§Ø­Ù„ Ø£Ù‡Ù… Ù…Ù…Ø§ ÙŠØªÙˆÙ‚Ø¹ ÙƒØ«ÙŠØ±ÙˆÙ†.'],
    ['Use one heavy lower-body anchor each week.', 'Add unilateral work for balance.', 'Cover knee, hip, and ankle function across the week.'],
    ['Ø§Ø³ØªØ®Ø¯Ù… ØªÙ…Ø±ÙŠÙ†Ù‹Ø§ Ø±Ø¦ÙŠØ³ÙŠÙ‹Ø§ Ø«Ù‚ÙŠÙ„Ù‹Ø§ Ø£Ø³Ø¨ÙˆØ¹ÙŠÙ‹Ø§.', 'Ø£Ø¶Ù ØªÙ…Ø§Ø±ÙŠÙ† Ø£Ø­Ø§Ø¯ÙŠØ© Ø§Ù„Ø±Ø¬Ù„ Ù„Ù„ØªÙˆØ§Ø²Ù†.', 'ØºØ·Ù‘Ù ÙˆØ¸Ø§Ø¦Ù Ø§Ù„Ø±ÙƒØ¨Ø© ÙˆØ§Ù„Ø­ÙˆØ¶ ÙˆØ§Ù„ÙƒØ§Ø­Ù„ Ø®Ù„Ø§Ù„ Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹.'],
    ['leg exercises gym', 'best leg day workout', 'glute hamstring quad workout', 'lower body exercises'],
    ['ØªÙ…Ø§Ø±ÙŠÙ† Ø±Ø¬Ù„', 'Ø£ÙØ¶Ù„ ÙŠÙˆÙ… Ø±Ø¬Ù„', 'ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø³ÙÙ„ÙŠ', 'ØªÙ…Ø§Ø±ÙŠÙ† ÙƒÙˆØ§Ø¯Ø² ÙˆØ¬Ù„ÙˆØªØ³ ÙˆÙ‡Ø§Ù…Ø³ØªØ±ÙŠÙ†Ø¬'],
  ),
};

export const SYSTEM_DETAIL_CONTENT: Record<string, SystemDetailContent> = {
  'full-body-foundation': {
    overviewEn: 'A beginner-friendly weekly structure that covers all major patterns without overwhelming recovery.',
    overviewAr: 'Ù‡ÙŠÙƒÙ„ Ø£Ø³Ø¨ÙˆØ¹ÙŠ Ù…Ù†Ø§Ø³Ø¨ Ù„Ù„Ù…Ø¨ØªØ¯Ø¦ÙŠÙ† ÙŠØºØ·ÙŠ Ø§Ù„Ø£Ù†Ù…Ø§Ø· Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ© Ø¯ÙˆÙ† Ø§Ù„Ø¶ØºØ· Ø¹Ù„Ù‰ Ø§Ù„Ø§Ø³ØªØ´ÙØ§Ø¡.',
    strengthsEn: ['Reinforces the main movement patterns every week.', 'Easy to recover from and easy to stick to.', 'Missed sessions are less disruptive than specialized splits.'],
    strengthsAr: ['ÙŠØ¹ÙŠØ¯ ØªØ«Ø¨ÙŠØª Ø§Ù„Ø£Ù†Ù…Ø§Ø· Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ© ÙƒÙ„ Ø£Ø³Ø¨ÙˆØ¹.', 'Ø³Ù‡Ù„ ÙÙŠ Ø§Ù„Ø§Ø³ØªØ´ÙØ§Ø¡ ÙˆØ§Ù„Ø§Ù„ØªØ²Ø§Ù….', 'ØªÙÙˆÙŠØª Ø­ØµØ© Ø£Ù‚Ù„ Ø¶Ø±Ø±Ù‹Ø§ Ù…Ù† Ø§Ù„ØªÙ‚Ø³ÙŠÙ…Ø§Øª Ø§Ù„Ù…ØªØ®ØµØµØ©.'],
    comparisonsEn: [{label: 'Versus Push Pull Legs', value: 'Less specialization, but simpler recovery and consistency.'}, {label: 'Versus Upper Lower', value: 'Lower schedule pressure with slightly less volume per region.'}],
    comparisonsAr: [{label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Push Pull Legs', value: 'ØªØ®ØµØµ Ø£Ù‚Ù„ Ù„ÙƒÙ† Ø§Ø³ØªØ´ÙØ§Ø¡ ÙˆØ§Ù„ØªØ²Ø§Ù… Ø£Ø³Ù‡Ù„.'}, {label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Upper Lower', value: 'Ø¶ØºØ· ØªÙ†Ø¸ÙŠÙ…ÙŠ Ø£Ù‚Ù„ Ù…Ø¹ Ø­Ø¬Ù… Ø£Ù‚Ù„ Ù‚Ù„ÙŠÙ„Ù‹Ø§ Ù„ÙƒÙ„ Ù…Ù†Ø·Ù‚Ø©.'}],
    seoSummaryEn: 'A beginner full body workout plan with weekly structure, linked exercises, and clear progression guidance.',
    seoSummaryAr: 'Ø®Ø·Ø© Ø¬Ø³Ù… ÙƒØ§Ù…Ù„ Ù„Ù„Ù…Ø¨ØªØ¯Ø¦ÙŠÙ† Ù…Ø¹ ØªÙ†Ø¸ÙŠÙ… Ø£Ø³Ø¨ÙˆØ¹ÙŠ ÙˆØ±ÙˆØ§Ø¨Ø· ØªÙ…Ø§Ø±ÙŠÙ† ÙˆØªÙˆØ¬ÙŠÙ‡ ÙˆØ§Ø¶Ø­ Ù„Ù„ØªØ¯Ø±Ø¬.',
  },
  'upper-lower-balance': {
    overviewEn: 'A four-day split that separates upper and lower fatigue for organized muscle gain.',
    overviewAr: 'ØªÙ‚Ø³ÙŠÙ… Ø£Ø±Ø¨Ø¹Ø© Ø£ÙŠØ§Ù… ÙŠÙØµÙ„ Ø¥Ø¬Ù‡Ø§Ø¯ Ø§Ù„Ø¬Ø²Ø¡ Ø§Ù„Ø¹Ù„ÙˆÙŠ ÙˆØ§Ù„Ø³ÙÙ„ÙŠ Ù„Ø²ÙŠØ§Ø¯Ø© Ø¹Ø¶Ù„ÙŠØ© Ù…Ù†Ø¸Ù…Ø©.',
    strengthsEn: ['Gives enough frequency for hypertrophy.', 'Keeps recovery windows predictable.', 'Works well for users who can reliably train four days weekly.'],
    strengthsAr: ['ÙŠØ¹Ø·ÙŠ ØªÙƒØ±Ø§Ø±Ù‹Ø§ Ù…Ù†Ø§Ø³Ø¨Ù‹Ø§ Ù„Ù„ØªØ¶Ø®ÙŠÙ….', 'ÙŠØ¨Ù‚ÙŠ Ù†ÙˆØ§ÙØ° Ø§Ù„Ø§Ø³ØªØ´ÙØ§Ø¡ ÙˆØ§Ø¶Ø­Ø©.', 'ÙŠÙ†Ø§Ø³Ø¨ Ù…Ù† ÙŠÙ„ØªØ²Ù… Ø¨Ø£Ø±Ø¨Ø¹Ø© Ø£ÙŠØ§Ù… Ø£Ø³Ø¨ÙˆØ¹ÙŠÙ‹Ø§.'],
    comparisonsEn: [{label: 'Versus Full Body', value: 'More volume per region, but less forgiving if sessions are missed.'}, {label: 'Versus Strength Triad', value: 'Better for hypertrophy volume, less focused on low-rep strength.'}],
    comparisonsAr: [{label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Full Body', value: 'Ø­Ø¬Ù… Ø£ÙƒØ¨Ø± Ù„ÙƒÙ„ Ù…Ù†Ø·Ù‚Ø© Ù„ÙƒÙ†Ù‡ Ø£Ù‚Ù„ Ù…Ø±ÙˆÙ†Ø© Ø¥Ø°Ø§ ÙØ§ØªØªÙƒ Ø­ØµØ©.'}, {label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Strength Triad', value: 'Ø£ÙØ¶Ù„ Ù„Ø­Ø¬Ù… Ø§Ù„ØªØ¶Ø®ÙŠÙ… ÙˆØ£Ù‚Ù„ ØªØ±ÙƒÙŠØ²Ù‹Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ù‚ÙˆØ© Ø§Ù„Ù‚Ù„ÙŠÙ„Ø© Ø§Ù„ØªÙƒØ±Ø§Ø±.'}],
    seoSummaryEn: 'A four-day upper lower workout split with linked weekly sessions, comparisons, and exercise recommendations.',
    seoSummaryAr: 'ØªÙ‚Ø³ÙŠÙ… Ø¹Ù„ÙˆÙŠ Ø³ÙÙ„ÙŠ Ù„Ø£Ø±Ø¨Ø¹Ø© Ø£ÙŠØ§Ù… Ù…Ø¹ Ø®Ø·Ø© Ø£Ø³Ø¨ÙˆØ¹ÙŠØ© ÙˆÙ…Ù‚Ø§Ø±Ù†Ø§Øª ÙˆØ±ÙˆØ§Ø¨Ø· ØªÙ…Ø§Ø±ÙŠÙ† Ù…ÙˆØµÙ‰ Ø¨Ù‡Ø§.',
  },
  'push-pull-legs': {
    overviewEn: 'A classic hypertrophy split for users who want focused gym days and higher exercise variety.',
    overviewAr: 'ØªÙ‚Ø³ÙŠÙ… ØªØ¶Ø®ÙŠÙ… ÙƒÙ„Ø§Ø³ÙŠÙƒÙŠ Ù„Ù…Ù† ÙŠØ±ÙŠØ¯ Ø£ÙŠØ§Ù…Ù‹Ø§ Ù…Ø±ÙƒØ²Ø© Ø¯Ø§Ø®Ù„ Ø§Ù„Ø¬ÙŠÙ… ÙˆØªÙ†ÙˆØ¹Ù‹Ø§ Ø£Ø¹Ù„Ù‰ ÙÙŠ Ø§Ù„ØªÙ…Ø§Ø±ÙŠÙ†.',
    strengthsEn: ['Each day has a clear movement theme.', 'Scales from three to six days.', 'Lets users push chest, back, and leg volume harder when recovery is good.'],
    strengthsAr: ['Ù„ÙƒÙ„ ÙŠÙˆÙ… Ù…ÙˆØ¶ÙˆØ¹ Ø­Ø±ÙƒÙŠ ÙˆØ§Ø¶Ø­.', 'ÙŠÙ…ÙƒÙ† ØªÙˆØ³ÙŠØ¹Ù‡ Ù…Ù† Ø«Ù„Ø§Ø«Ø© Ø¥Ù„Ù‰ Ø³ØªØ© Ø£ÙŠØ§Ù….', 'ÙŠØ³Ù…Ø­ Ø¨Ø±ÙØ¹ Ø­Ø¬Ù… Ø§Ù„ØµØ¯Ø± ÙˆØ§Ù„Ø¸Ù‡Ø± ÙˆØ§Ù„Ø±Ø¬Ù„ Ø¹Ù†Ø¯Ù…Ø§ ÙŠÙƒÙˆÙ† Ø§Ù„Ø§Ø³ØªØ´ÙØ§Ø¡ Ø¬ÙŠØ¯Ù‹Ø§.'],
    comparisonsEn: [{label: 'Versus Upper Lower', value: 'More specialization and variety, but harder to recover from.'}, {label: 'Versus Dumbbell Anywhere', value: 'Better for full-gym progression and machine or barbell access.'}],
    comparisonsAr: [{label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Upper Lower', value: 'ØªØ®ØµØµ ÙˆØªÙ†ÙˆØ¹ Ø£ÙƒØ¨Ø± Ù„ÙƒÙ†Ù‡ Ø£ØµØ¹Ø¨ ÙÙŠ Ø§Ù„Ø§Ø³ØªØ´ÙØ§Ø¡.'}, {label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Dumbbell Anywhere', value: 'Ø£ÙØ¶Ù„ Ù„Ù„ØªÙ‚Ø¯Ù… Ø¯Ø§Ø®Ù„ Ø¬ÙŠÙ… ÙƒØ§Ù…Ù„ ÙˆÙ…Ø¹Ø¯Ø§Øª Ø£ÙˆØ³Ø¹.'}],
    seoSummaryEn: 'A detailed push pull legs workout system with comparisons, weekly planning, and links to related exercise pages.',
    seoSummaryAr: 'Ø´Ø±Ø­ ÙƒØ§Ù…Ù„ Ù„Ù†Ø¸Ø§Ù… Push Pull Legs Ù…Ø¹ Ù…Ù‚Ø§Ø±Ù†Ø§Øª ÙˆØ®Ø·Ø© Ø£Ø³Ø¨ÙˆØ¹ÙŠØ© ÙˆØ±ÙˆØ§Ø¨Ø· Ù„ØµÙØ­Ø§Øª Ø§Ù„ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ù…Ø±ØªØ¨Ø·Ø©.',
  },
  'strength-triad': {
    overviewEn: 'A compact three-day system built around measurable strength work on the main lifts.',
    overviewAr: 'Ù†Ø¸Ø§Ù… Ù…Ø®ØªØµØ± Ù„Ø«Ù„Ø§Ø«Ø© Ø£ÙŠØ§Ù… Ù…Ø¨Ù†ÙŠ Ø­ÙˆÙ„ Ø¹Ù…Ù„ Ù‚ÙˆØ© Ù‚Ø§Ø¨Ù„ Ù„Ù„Ù‚ÙŠØ§Ø³ ÙÙŠ Ø§Ù„Ø±ÙØ¹Ø§Øª Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©.',
    strengthsEn: ['Protects recovery so heavy lifts stay high quality.', 'Keeps accessory work purposeful.', 'Fits lifters who care about performance more than pump chasing.'],
    strengthsAr: ['ÙŠØ­Ù…ÙŠ Ø§Ù„Ø§Ø³ØªØ´ÙØ§Ø¡ Ø­ØªÙ‰ ØªØ¨Ù‚Ù‰ Ø§Ù„Ø±ÙØ¹Ø§Øª Ø§Ù„Ø«Ù‚ÙŠÙ„Ø© Ø¹Ø§Ù„ÙŠØ© Ø§Ù„Ø¬ÙˆØ¯Ø©.', 'ÙŠØ¨Ù‚ÙŠ Ø§Ù„ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© Ù‡Ø§Ø¯ÙØ©.', 'ÙŠÙ†Ø§Ø³Ø¨ Ù…Ù† ÙŠÙ‡ØªÙ… Ø¨Ø§Ù„Ø£Ø¯Ø§Ø¡ Ø£ÙƒØ«Ø± Ù…Ù† Ø§Ù„Ø¶Ø® ÙÙ‚Ø·.'],
    comparisonsEn: [{label: 'Versus Upper Lower', value: 'Less hypertrophy volume, but stronger low-rep focus.'}, {label: 'Versus Return to Training', value: 'Far more demanding and not ideal while rebuilding tolerance.'}],
    comparisonsAr: [{label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Upper Lower', value: 'Ø­Ø¬Ù… ØªØ¶Ø®ÙŠÙ… Ø£Ù‚Ù„ Ù„ÙƒÙ† ØªØ±ÙƒÙŠØ² Ø£Ù‚ÙˆÙ‰ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ø¯Ø§Ø¡ Ù‚Ù„ÙŠÙ„ Ø§Ù„ØªÙƒØ±Ø§Ø±.'}, {label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Return to Training', value: 'Ø£ØµØ¹Ø¨ Ø¨ÙƒØ«ÙŠØ± ÙˆÙ„ÙŠØ³ Ù…Ø«Ø§Ù„ÙŠÙ‹Ø§ Ø£Ø«Ù†Ø§Ø¡ Ø§Ø³ØªØ¹Ø§Ø¯Ø© Ø§Ù„ØªØ­Ù…Ù„.'}],
    seoSummaryEn: 'A three-day strength workout system centered on squats, presses, rows, and hinges with linked weekly planning.',
    seoSummaryAr: 'Ù†Ø¸Ø§Ù… Ù‚ÙˆØ© Ù„Ø«Ù„Ø§Ø«Ø© Ø£ÙŠØ§Ù… ÙŠØ±ØªÙƒØ² Ø¹Ù„Ù‰ Ø§Ù„Ø³ÙƒÙˆØ§Øª ÙˆØ§Ù„Ø¶ØºØ· ÙˆØ§Ù„Ø±Ùˆ ÙˆØ§Ù„Ù‡ÙŠØ¨ Ù‡Ù†Ø¬ Ù…Ø¹ Ø±Ø¨Ø· Ø¨Ø§Ù„Ø®Ø·Ø© Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ÙŠØ©.',
  },
  'dumbbell-hotel-plan': {
    overviewEn: 'A minimal-equipment plan for home setups, travel weeks, and users limited to dumbbells and a bench.',
    overviewAr: 'Ø®Ø·Ø© Ø¨Ù…Ø¹Ø¯Ø§Øª Ù…Ø­Ø¯ÙˆØ¯Ø© Ù„Ù„Ø¨ÙŠØª Ø£Ùˆ Ø§Ù„Ø³ÙØ± Ø£Ùˆ Ù„Ù…Ù† ÙŠÙ…Ù„Ùƒ Ø¯Ù…Ø¨Ù„ ÙˆÙ…Ù‚Ø¹Ø¯Ù‹Ø§ ÙÙ‚Ø·.',
    strengthsEn: ['Reduces overthinking around limited equipment.', 'A/B structure makes progression straightforward.', 'Easy to keep running during busy or disrupted weeks.'],
    strengthsAr: ['ØªÙ‚Ù„Ù„ Ø§Ù„Ù…Ø¨Ø§Ù„ØºØ© ÙÙŠ Ø§Ù„ØªÙÙƒÙŠØ± Ø¨Ø³Ø¨Ø¨ Ù†Ù‚Øµ Ø§Ù„Ù…Ø¹Ø¯Ø§Øª.', 'Ù‡ÙŠÙƒÙ„ A/B ÙŠØ¬Ø¹Ù„ Ø§Ù„ØªØ¯Ø±Ø¬ ÙˆØ§Ø¶Ø­Ù‹Ø§.', 'Ø³Ù‡Ù„Ø© Ø§Ù„Ø§Ø³ØªÙ…Ø±Ø§Ø± Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø£Ø³Ø§Ø¨ÙŠØ¹ Ø§Ù„Ù…Ø²Ø¯Ø­Ù…Ø© Ø£Ùˆ Ø§Ù„Ù…Ø¶Ø·Ø±Ø¨Ø©.'],
    comparisonsEn: [{label: 'Versus Push Pull Legs', value: 'Much lower equipment demand, but less loading precision.'}, {label: 'Versus Bodyweight Conditioning', value: 'Better for hypertrophy because external load is easier to progress.'}],
    comparisonsAr: [{label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Push Pull Legs', value: 'ØªØ­ØªØ§Ø¬ Ù…Ø¹Ø¯Ø§Øª Ø£Ù‚Ù„ Ø¨ÙƒØ«ÙŠØ± Ù„ÙƒÙ† Ø¨Ø¯Ù‚Ø© ØªØ­Ù…ÙŠÙ„ Ø£Ù‚Ù„.'}, {label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Bodyweight Conditioning', value: 'Ø£ÙØ¶Ù„ Ù„Ù„ØªØ¶Ø®ÙŠÙ… Ù„Ø£Ù† Ø§Ù„Ø­Ù…Ù„ Ø§Ù„Ø®Ø§Ø±Ø¬ÙŠ Ø£Ø³Ù‡Ù„ ÙÙŠ Ø§Ù„ØªØ·ÙˆÙŠØ±.'}],
    seoSummaryEn: 'A dumbbell-only workout system for home or travel with weekly structure and linked exercise recommendations.',
    seoSummaryAr: 'Ù†Ø¸Ø§Ù… ØªØ¯Ø±ÙŠØ¨ Ø¨Ø§Ù„Ø¯Ù…Ø¨Ù„ ÙÙ‚Ø· Ù„Ù„Ø¨ÙŠØª Ø£Ùˆ Ø§Ù„Ø³ÙØ± Ù…Ø¹ Ù‡ÙŠÙƒÙ„ Ø£Ø³Ø¨ÙˆØ¹ÙŠ ÙˆØ±ÙˆØ§Ø¨Ø· ØªÙ…Ø§Ø±ÙŠÙ† Ù…ÙˆØµÙ‰ Ø¨Ù‡Ø§.',
  },
  'bodyweight-conditioning': {
    overviewEn: 'A repeatable bodyweight system for general fitness, endurance, and training with minimal setup.',
    overviewAr: 'Ù†Ø¸Ø§Ù… ÙˆØ²Ù† Ø¬Ø³Ù… Ù‚Ø§Ø¨Ù„ Ù„Ù„ØªÙƒØ±Ø§Ø± Ù„Ù„ÙŠØ§Ù‚Ø© Ø§Ù„Ø¹Ø§Ù…Ø© ÙˆØ§Ù„ØªØ­Ù…Ù„ ÙˆØ§Ù„ØªØ¯Ø±ÙŠØ¨ Ø¨Ø£Ù‚Ù„ ØªØ¬Ù‡ÙŠØ².',
    strengthsEn: ['Low setup friction makes consistency easier.', 'Improves conditioning and muscular endurance together.', 'Works as a bridge into more structured gym training.'],
    strengthsAr: ['Ù‚Ù„Ø© Ø§Ù„ØªØ¬Ù‡ÙŠØ² ØªØ¬Ø¹Ù„ Ø§Ù„Ø§Ù„ØªØ²Ø§Ù… Ø£Ø³Ù‡Ù„.', 'ÙŠØ­Ø³Ù† Ø§Ù„ØªØ­Ù…Ù„ ÙˆØ§Ù„Ù‚Ø¯Ø±Ø© Ø§Ù„Ø¹Ø¶Ù„ÙŠØ© Ù…Ø¹Ù‹Ø§.', 'ÙŠØ¹Ù…Ù„ ÙƒØ¬Ø³Ø± Ù†Ø­Ùˆ ØªØ¯Ø±ÙŠØ¨ Ø¬ÙŠÙ… Ø£ÙƒØ«Ø± ØªÙ†Ø¸ÙŠÙ…Ù‹Ø§.'],
    comparisonsEn: [{label: 'Versus Dumbbell Anywhere', value: 'Needs even less equipment, but progression is more limited.'}, {label: 'Versus Full Body', value: 'More conditioning-oriented and less strength-focused.'}],
    comparisonsAr: [{label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Dumbbell Anywhere', value: 'ÙŠØ­ØªØ§Ø¬ Ù…Ø¹Ø¯Ø§Øª Ø£Ù‚Ù„ Ù„ÙƒÙ† Ø§Ù„ØªØ¯Ø±Ø¬ ÙÙŠÙ‡ Ù…Ø­Ø¯ÙˆØ¯ Ø£ÙƒØ«Ø±.'}, {label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Full Body', value: 'Ø£ÙƒØ«Ø± Ù…ÙŠÙ„Ù‹Ø§ Ù„Ù„ØªØ­Ù…Ù„ ÙˆØ£Ù‚Ù„ ØªØ±ÙƒÙŠØ²Ù‹Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ù‚ÙˆØ©.'}],
    seoSummaryEn: 'A bodyweight workout system for fitness and conditioning with weekly structure and links to push, pull, core, and leg exercises.',
    seoSummaryAr: 'Ù†Ø¸Ø§Ù… ÙˆØ²Ù† Ø¬Ø³Ù… Ù„Ù„ÙŠØ§Ù‚Ø© ÙˆØ§Ù„ØªØ­Ù…Ù„ Ù…Ø¹ Ù‡ÙŠÙƒÙ„ Ø£Ø³Ø¨ÙˆØ¹ÙŠ ÙˆØ±ÙˆØ§Ø¨Ø· Ù„ØªÙ…Ø§Ø±ÙŠÙ† Ø§Ù„Ø¯ÙØ¹ ÙˆØ§Ù„Ø³Ø­Ø¨ ÙˆØ§Ù„ÙƒÙˆØ± ÙˆØ§Ù„Ø±Ø¬Ù„.',
  },
  'return-to-training': {
    overviewEn: 'A low-stress weekly template for rebuilding tolerance after layoffs, rehab phases, or fatigue spikes.',
    overviewAr: 'Ù‚Ø§Ù„Ø¨ Ø£Ø³Ø¨ÙˆØ¹ÙŠ Ù…Ù†Ø®ÙØ¶ Ø§Ù„Ø¶ØºØ· Ù„Ø¥Ø¹Ø§Ø¯Ø© Ø¨Ù†Ø§Ø¡ Ø§Ù„ØªØ­Ù…Ù„ Ø¨Ø¹Ø¯ Ø§Ù„Ø§Ù†Ù‚Ø·Ø§Ø¹ Ø£Ùˆ Ø§Ù„ØªØ£Ù‡ÙŠÙ„ Ø£Ùˆ Ø§Ø±ØªÙØ§Ø¹ Ø§Ù„Ø¥Ø¬Ù‡Ø§Ø¯.',
    strengthsEn: ['Keeps training density conservative.', 'Uses controlled, easy-to-autoregulate exercise choices.', 'Transitions smoothly into Full Body or Upper Lower later.'],
    strengthsAr: ['ÙŠØ­Ø§ÙØ¸ Ø¹Ù„Ù‰ ÙƒØ«Ø§ÙØ© ØªØ¯Ø±ÙŠØ¨ÙŠØ© Ù…Ø­Ø§ÙØ¸Ø©.', 'ÙŠØ³ØªØ®Ø¯Ù… Ø§Ø®ØªÙŠØ§Ø±Ø§Øª Ø­Ø±ÙƒØ© Ù…Ø¶Ø¨ÙˆØ·Ø© ÙˆØ³Ù‡Ù„Ø© Ø§Ù„Ø¶Ø¨Ø· Ø§Ù„Ø°Ø§ØªÙŠ.', 'ÙŠÙ†ØªÙ‚Ù„ Ø¨Ø³Ù„Ø§Ø³Ø© Ù„Ø§Ø­Ù‚Ù‹Ø§ Ø¥Ù„Ù‰ Full Body Ø£Ùˆ Upper Lower.'],
    comparisonsEn: [{label: 'Versus Full Body', value: 'Less ambitious, but often the smarter first step back.'}, {label: 'Versus Strength Triad', value: 'Far easier to tolerate and not built around heavy performance.'}],
    comparisonsAr: [{label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Full Body', value: 'Ø£Ù‚Ù„ Ø·Ù…ÙˆØ­Ù‹Ø§ Ù„ÙƒÙ†Ù‡ ØºØ§Ù„Ø¨Ù‹Ø§ Ø§Ù„Ø®Ø·ÙˆØ© Ø§Ù„Ø£Ø°ÙƒÙ‰ Ø£ÙˆÙ„Ù‹Ø§.'}, {label: 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø¨Ù€ Strength Triad', value: 'Ø£Ø³Ù‡Ù„ Ø¨ÙƒØ«ÙŠØ± ÙÙŠ Ø§Ù„ØªØ­Ù…Ù„ ÙˆÙ„ÙŠØ³ Ù…Ø¨Ù†ÙŠÙ‹Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ø¯Ø§Ø¡ Ø§Ù„Ø«Ù‚ÙŠÙ„.'}],
    seoSummaryEn: 'A low-stress return to gym workout plan with controlled weekly structure, linked exercises, and clear comparisons.',
    seoSummaryAr: 'Ø®Ø·Ø© Ø¹ÙˆØ¯Ø© Ù‡Ø§Ø¯Ø¦Ø© Ù„Ù„Ø¬ÙŠÙ… Ù…Ø¹ ØªÙ†Ø¸ÙŠÙ… Ø£Ø³Ø¨ÙˆØ¹ÙŠ Ù…Ø¶Ø¨ÙˆØ· ÙˆØ±ÙˆØ§Ø¨Ø· ØªÙ…Ø§Ø±ÙŠÙ† ÙˆÙ…Ù‚Ø§Ø±Ù†Ø§Øª ÙˆØ§Ø¶Ø­Ø©.',
  },
};

for (const content of Object.values(SYSTEM_DETAIL_CONTENT)) {
  content.overviewAr = decodeMojibake(content.overviewAr);
  content.strengthsAr = content.strengthsAr.map((item) => decodeMojibake(item));
  content.comparisonsAr = content.comparisonsAr.map((item) => ({
    label: decodeMojibake(item.label),
    value: decodeMojibake(item.value),
  }));
  content.seoSummaryAr = decodeMojibake(content.seoSummaryAr);
}

export function getExercisesForRegion(region: StaticMuscleSlug): Exercise[] {
  const allowed = new Set(STATIC_GROUP_MUSCLES[region]);
  return EXERCISES.filter((exercise) => allowed.has(exercise.mainMuscle));
}

export function getExerciseRegion(exercise: Exercise): StaticMuscleSlug {
  return MAIN_MUSCLE_TO_STATIC_GROUP[exercise.mainMuscle];
}

export function getSystemsForRegion(region: StaticMuscleSlug) {
  return TRAINING_SYSTEMS.filter((system) => system.muscleGroups.includes(region));
}

export function getSystemById(systemId: string) {
  return TRAINING_SYSTEMS.find((system) => system.id === systemId) ?? null;
}

export function getWeeklyPlanForSystem(systemId: string) {
  return WEEKLY_PLANS.find((plan) => plan.systemId === systemId) ?? null;
}

export function getRegionsForSystem(systemId: string) {
  return (getSystemById(systemId)?.muscleGroups ?? []).map((slug) => ({
    slug,
    labelEn: EXERCISE_FINDER_STATIC_LABELS[slug],
    labelAr: EXERCISE_FINDER_STATIC_ARABIC_LABELS[slug],
  }));
}

