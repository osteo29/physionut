#!/usr/bin/env node
/**
 * 🔍 VERIFICATION SCRIPT
 * فحص أن كل الملفات موجودة وصحيحة
 * 
 * كيفية الاستخدام:
 * node verify-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 تحقق من النظام...\n');

const requiredFiles = [
  // Code Files
  'src/services/injurySupabaseService.ts',
  'src/services/healthCheck.ts',
  'src/utils/dataMigration.ts',
  'src/pages/AdminInjuryManager.tsx',
  'src/RouterApp.tsx',
  
  // SQL Files
  'supabase/schema.sql',
  'SUPABASE_SQL_CLEAN.sql',
  'supabase/sample-data.sql',
  
  // Documentation Files
  '000_START_HERE.md',
  'README_FINAL.md',
  'STEPS.md',
  'PROGRESS_CHECKLIST.md',
  'FINAL_SETUP_COMPLETE.md',
  'FILE_CHECKLIST.md',
  'QUICK_REFERENCE.txt',
  'READY_TO_GO.md',
];

let allPresent = true;

console.log('📋 فحص الملفات:\n');

requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${file}`);
  if (!exists) allPresent = false;
});

console.log('\n' + '='.repeat(50));

if (allPresent) {
  console.log('\n✅ كل الملفات موجودة!');
  console.log('\n الآن قم بـ:');
  console.log('   1. افتح: SUPABASE_SQL_CLEAN.sql');
  console.log('   2. انسخ كل محتوياته');
  console.log('   3. اذهب Supabase → SQL Editor');
  console.log('   4. الصق الكود واضغط Run');
  console.log('   5. شغّل: npm run dev');
  console.log('   6. في Console (F12): await migrateAllInjuriesToSupabase()');
  console.log('\n🚀 الآن أنت جاهز!\n');
} else {
  console.log('\n⚠️  بعض الملفات ناقصة!');
  console.log('   تأكد من أن كل الملفات موجودة في المجلد الصحيح\n');
}

console.log('='.repeat(50) + '\n');
