# Rehab SQL Import Dropzone

ضع هنا ملفات SQL الجاهزة للاستيراد إلى Supabase الخاصة ببروتوكولات التأهيل.

الترتيب المقترح للملفات:

1. `supabase_schema.sql`
2. `protocol_index.json` (اختياري للفهرسة فقط)
3. `rehab_data.sql`
4. `rehab_data_batch2.sql`
5. `rehab_data_batch3.sql`
6. ...
7. `rehab_data_batch14_final.sql`

ملاحظات:

- لا تضع هذه الملفات في `supabase/migrations` حالياً حتى لا تختلط مع migrations التطبيق.
- لو عندك دفعات أكثر من 14، ضعها كلها هنا بنفس الترتيب.
- سنستخدم هذا المجلد كمنطقة تجميع قبل المراجعة والرفع إلى Supabase.
