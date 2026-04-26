# نظام إدارة البروتوكولات - Injury Management System

## 🎯 نظرة عامة

تم بناء نظام متكامل لإدارة بروتوكولات الإصابات والنوتريشن في **Supabase**، مما يسمح لك بـ:

- ✅ تعديل وإضافة وحذف الإصابات (Injuries)
- ✅ إدارة مراحل التعافي (Phases) لكل إصابة
- ✅ إضافة المكملات الغذائية (Supplements) لكل مرحلة
- ✅ إدارة خطط الوجبات (Meal Plans) المختلفة
- ✅ دعم كامل للغة العربية والإنجليزية
- ✅ تحديثات فورية على الموقع

## 📊 بنية قاعدة البيانات

### جداول Supabase الرئيسية

```
injuries
├── id (UUID)
├── injury_id_slug (TEXT UNIQUE) - مثل: "acl_injury", "hamstring_strain"
├── name_en, name_ar
├── category - Ligament, Tendon, Muscle, Bone, etc
├── body_region_en, body_region_ar
├── overview_en, overview_ar
├── rehab_summary_en, rehab_summary_ar
├── common_in (ARRAY)
├── red_flags (ARRAY)
└── related_calculators (ARRAY)

injury_phases (1-to-many: injuries → phases)
├── id (UUID)
├── injury_id (FK)
├── phase_number (1-5)
├── label_en, label_ar
├── duration_en, duration_ar
├── recovery_window
├── goals_en, goals_ar (ARRAY)
├── nutrition_focus_en, nutrition_focus_ar (ARRAY)
├── recommended_foods_en, recommended_foods_ar (ARRAY)
├── avoid_foods_en, avoid_foods_ar (ARRAY)
├── exercises_en, exercises_ar (ARRAY)
├── prohibited_movements_en, prohibited_movements_ar (ARRAY)
├── protein_min_per_kg, protein_max_per_kg
├── hydration_ml_per_kg
├── omega3_grams, creatine_grams
├── collagen_min_per_kg, collagen_max_per_kg
├── vitamin_c_mg, calcium_mg
└── updated_at

supplements (1-to-many: phases → supplements)
├── id (UUID)
├── phase_id (FK)
├── name
├── dose_en, dose_ar
├── reason_en, reason_ar
├── timing_en, timing_ar
├── caution_en, caution_ar
├── order_index
└── updated_at

meal_examples (1-to-many: phases → meals)
├── id (UUID)
├── phase_id (FK)
├── diet_style (omnivore | vegetarian)
├── breakfast_en, breakfast_ar
├── lunch_en, lunch_ar
├── dinner_en, dinner_ar
├── snack_en, snack_ar
├── shopping_list_en, shopping_list_ar (ARRAY)
└── updated_at
```

## 🛠️ كيفية الاستخدام

### 1️⃣ إعداد قاعدة البيانات

#### أ) تشغيل SQL Schema
```bash
# انتقل إلى Supabase Dashboard
# SQL Editor → New Query
# انسخ محتوى supabase/schema.sql
# اضغط Run
```

#### ب) التحقق من الجداول
```sql
-- في Supabase SQL Editor
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema='public';
```

### 2️⃣ استيراد البيانات الحالية

لديك خياران:

**الخيار A: استيراد يدوي الـ JSON**
1. انتقل إلى Supabase Dashboard
2. Table Editor → Click on `injuries`
3. اضغط `Insert` وأضف البيانات

**الخيار B: استخدام SQL script (أفضل)**

```sql
-- Insert sample injury
INSERT INTO public.injuries (
  injury_id_slug, name_en, name_ar, category, 
  body_region_en, body_region_ar, overview_en, overview_ar
) VALUES (
  'acl_injury', 
  'ACL Injury',
  'إصابة الرباط الصليبي الأمامي',
  'Ligament',
  'Knee',
  'الركبة',
  'Anterior Cruciate Ligament (ACL) tear or sprain...',
  'إصابة أو تمزق الرباط الصليبي الأمامي...'
);

-- Insert phases for that injury
INSERT INTO public.injury_phases (
  injury_id, phase_number, label_en, label_ar, 
  duration_en, duration_ar, recovery_window
) VALUES (
  (SELECT id FROM injuries WHERE injury_id_slug='acl_injury'),
  1, 'Initial Response', 'الاستجابة الأولية',
  'Days 0-7', 'أيام 0-7',
  'under_48h'
);
```

### 3️⃣ استخدام Admin Panel

#### الوصول للمدير
```typescript
// أضف إلى App.tsx routes:
import AdminInjuryManager from './pages/AdminInjuryManager';

// في المسارات:
<Route path="/admin/injuries" element={<AdminInjuryManager />} />
```

#### الميزات
- 📝 تعديل اسم الإصابة ووصفها
- 📊 إدارة المراحل الـ 5
- 💊 إضافة/تعديل المكملات
- 🍽️ إدارة خطط الوجبات
- 🗑️ حذف العناصر غير المستخدمة

### 4️⃣ جلب البيانات من السايت

```typescript
// في Pages أو Components
import { fetchCompleteInjuryProtocol } from '../services/injurySupabaseService';

function InjuryDetailPage() {
  const [protocol, setProtocol] = useState<InjuryProtocol | null>(null);
  
  useEffect(() => {
    const loadProtocol = async () => {
      const data = await fetchCompleteInjuryProtocol('acl-injury');
      setProtocol(data);
    };
    loadProtocol();
  }, []);
  
  if (!protocol) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{protocol.name}</h1>
      {protocol.phases.map(phase => (
        <div key={phase.id}>
          <h2>{phase.label}</h2>
          {/* Render phase content */}
        </div>
      ))}
    </div>
  );
}
```

## 📱 الميزات المتقدمة

### 1. الترجمة الثنائية
كل حقل له نسخة إنجليزية وعربية:
- `name_en` / `name_ar`
- `overview_en` / `overview_ar`
- `goals_en` / `goals_ar` (ARRAY)

### 2. البيانات المعقدة
استخدام ARRAY للقوائم:
```typescript
// في TypeScript
const injury = {
  goals_en: ['Restore range of motion', 'Build strength', ...],
  goals_ar: ['استعادة مدى الحركة', 'بناء القوة', ...],
  exercises_en: ['Quadriceps sets', 'Heel slides', ...],
  exercises_ar: ['تمارين الفخذ الرباعية', 'انزلاقات الكعب', ...]
};
```

### 3. التحديثات التلقائية
- عند تعديل بيانات في Admin Panel → تُحفظ في Supabase فوراً
- الموقع يجلب البيانات الجديدة في المرة التالية

## 🚀 المراحل التالية

### من الآن إلى الأسبوع القادم:
1. **استيراد البيانات الحالية** من hardcoded data إلى Supabase
2. **تفعيل Admin Panel** في المسار `/admin/injuries`
3. **تحديث Components** لجلب البيانات من Supabase
4. **اختبار شامل** للنسختين العربية والإنجليزية

### مثال على الاستيراد:
```typescript
// إنشاء data-migration.ts
import { generatedInjuryProtocols } from './services/injuryProtocolCatalog';
import { createInjury, createPhase } from './services/injurySupabaseService';

async function migrateAllData() {
  for (const protocol of generatedInjuryProtocols) {
    const injuryData = await createInjury({
      injury_id_slug: protocol.id,
      name_en: protocol.name,
      name_ar: getArabicInjuryName(protocol.id),
      category: protocol.category,
      // ... باقي الحقول
    });
    
    for (let i = 0; i < protocol.phases.length; i++) {
      await createPhase({
        injury_id: injuryData.id,
        phase_number: i + 1,
        // ... بيانات المرحلة
      });
    }
  }
}
```

## 🔒 الأمان

### Row Level Security (RLS)
```sql
-- القراءة مسموحة للجميع
CREATE POLICY "injuries_read" ON injuries 
FOR SELECT USING (true);

-- الكتابة تحتاج auth (يمكن تفعيلها لاحقاً)
-- CREATE POLICY "injuries_write" ON injuries 
-- FOR INSERT, UPDATE, DELETE 
-- USING (auth.role() = 'authenticated');
```

## 📞 الدعم والمساعدة

### مشاكل شائعة:
1. **"Table not found"** → تأكد من تشغيل SQL schema
2. **"Permission denied"** → تحقق من RLS policies
3. **"Connection failed"** → تحقق من VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY

### مراجع:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase SQL Editor Guide](https://supabase.com/docs/guides/getting-started/quickstarts/sql)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**آخر تحديث:** 2026-03-21
**الحالة:** ✅ جاهز للاستخدام
