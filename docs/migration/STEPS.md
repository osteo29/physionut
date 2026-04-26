# ⚡ الخطوات السريعة جداً - QUICK STEPS

## الخطوة 1: انسخ الكود SQL

افتح الملف: `supabase/legacy/SUPABASE_SQL_CLEAN.sql`

انسخ **كل** المحتويات (Ctrl+A ثم Ctrl+C)

## الخطوة 2: امسح في Supabase

1. اذهب: https://supabase.com/dashboard
2. اختر مشروعك
3. **SQL Editor** → **New Query**
4. احذف أي كود موجود
5. **الصق** الكود الجديد (Ctrl+V)
6. اضغط **Run** (الزر الأخضر)

**انتظر الرسالة الخضراء:**
```
✓ Success - 8 statements executed
```

## الخطوة 3: تحقق من الجداول

امسح الكود وامسح هذا:

```sql
SELECT COUNT(*) as total_tables FROM information_schema.tables 
WHERE table_schema='public' AND table_name IN ('injuries', 'injury_phases', 'supplements', 'meal_examples', 'safety_notes');
```

**يجب تحصل على: 5**

## الخطوة 4: أضف المسار الإداري

افتح: `src/App.tsx` أو `src/RouterApp.tsx`

أضف هذا السطر داخل `<Routes>`:

```typescript
<Route path="/admin/injuries" element={<AdminInjuryManager />} />
```

وأضف الـ import في الأعلى:

```typescript
import { AdminInjuryManager } from './pages/AdminInjuryManager';
```

## الخطوة 5: شغّل الخادم

```bash
npm run dev
```

## الخطوة 6: اختبر

1. اذهب: http://localhost:5173/admin/injuries
2. يجب تشوف صفحة فارغة (لم يتم نقل البيانات بعد)

## الخطوة 7: انقل البيانات

في **لوحة الإدارة** (الخطوة 6)، ابحث عن زر **"Import Legacy Data"** واضغطه.

أو في **Console** (F12):

```javascript
import { migrateAllInjuriesToSupabase } from './src/utils/dataMigration.ts';
await migrateAllInjuriesToSupabase();
```

**انتظر الرسالة:**
```
✅ Migration Complete!
✅ Successful: 95
```

## الخطوة 8: انعش الصفحة

```
F5 أو Ctrl+R
```

**يجب تشوف 95 إصابة في لوحة الإدارة!**

---

## ✅ كل حاجة جاهزة!

الآن يمكنك:
- ✅ تعديل أي إصابة في لوحة الإدارة
- ✅ إضافة/حذف مكملات وجبات
- ✅ البيانات الجديدة تظهر فوراً على الموقع
- ✅ دعم عربي وإنجليزي

---

**إذا حصلت على خطأ، روح للملف `FINAL_SETUP_COMPLETE.md` للتفاصيل الكاملة**
