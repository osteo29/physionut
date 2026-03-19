/**
 * Evidence-based medical articles for PhysioHub
 * Topics: physical therapy, rehabilitation, and nutrition
 */

import {type Language} from './translations';

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  icon: string;
  image?: string;
}

export const getArticles = (lang: Language): Article[] => {
  if (lang === 'ar') {
    return [
      {
        id: 1,
        slug: 'protein-after-acl-reconstruction',
        title: 'هل تأكل بروتين بكثرة ولا تلاحظ نمواً عضلياً؟ اعرف احتياجك الفعلي',
        excerpt:
          'كثير من الناس يأكلون بروتين كثير بدون نتيجة واضحة. الفرق الحقيقي يبدأ عندما تعرف احتياجك الفعلي حسب الوزن والنشاط والهدف.',
        content: `كثير من المهتمين بالرياضة يظنون أن مجرد زيادة البروتين تعني زيادة الكتلة العضلية مباشرة، لكن الحقيقة أن الاحتياج ليس ثابتًا للجميع. احتياجك من البروتين يعتمد على وزنك، مستوى نشاطك البدني، وهدفك سواء كان بناء عضلات أو خسارة وزن أو تعافيًا أفضل بعد التمرين.

## لماذا البروتين مهم؟
البروتين هو حجر أساس في بناء العضلات وترميم الأنسجة. ولأن الجسم لا يخزن البروتين مثل الدهون أو الكربوهيدرات، فإن تناوله بشكل يومي منظم يظل مهمًا.

## احتياجك التقريبي حسب النشاط
* نشاط منخفض: حوالي 0.8 إلى 1 جرام لكل كجم من الوزن يوميًا.
* نشاط متوسط: حوالي 1.2 إلى 1.6 جرام لكل كجم من الوزن يوميًا.
* نشاط مرتفع أو تدريب كثيف: حوالي 1.7 إلى 2.2 جرام لكل كجم من الوزن يوميًا.

مثال سريع: إذا كان وزنك 70 كجم وتتدرب بانتظام، فقد يكون نطاقك العملي حوالي 98 إلى 112 جرام بروتين يوميًا حسب شدة التمرين والسياق العام.

## كيف توزع البروتين خلال اليوم؟
الأفضل عادة أن توزع البروتين على اليوم بدل جمعه في وجبة واحدة.
* إفطار فيه بيض ومنتج لبني.
* غداء فيه دجاج أو سمك مع خضار ومصدر كربوهيدرات مناسب.
* عشاء فيه تونة أو بقوليات.
* سناك مثل الزبادي أو المكسرات إذا كنت تحتاج تكملة الرقم اليومي.

## أهم نقطة
البروتين وحده لا يبني العضلات. النتيجة الحقيقية تحتاج تدريب مقاومة، ونومًا كافيًا، واستمرارية. الأفضل أن تعمل بمنطق الدقة لا الكثرة.

لو أردت تقديرًا أقرب لوضعك، استخدم [حاسبة البروتين](/calculators) مع [حاسبة السعرات اليومية](/calculators) حتى تربط البروتين باحتياجك الكلي من الطاقة.

مرجع إرشادي: اطلع على أدبيات dietary protein intake و muscle protein synthesis و resistance training adaptation في PubMed والمراجع الرياضية المعتمدة.`,
        category: 'Sports Nutrition',
        date: '2026-03-19',
        icon: 'HeartPulse',
      },
      {
        id: 2,
        slug: 'why-tracking-measurements-matters',
        title: 'لماذا متابعة القياسات أهم من النتيجة الواحدة؟',
        excerpt:
          'القياس الواحد قد يكون مفيدًا، لكن القيمة الحقيقية تظهر عند متابعة التغير عبر الوقت داخل التأهيل أو إدارة الوزن.',
        content: `في الممارسة السريرية، لقطة واحدة لا تكفي دائمًا. قد تكون نتيجة اليوم متأثرة بالنوم، السوائل، أو النشاط السابق. لكن عند حفظ القياسات ومقارنتها عبر عدة أيام أو أسابيع، تبدأ الاتجاهات الحقيقية في الظهور.

## لماذا المتابعة أهم؟
* لأنها تكشف الاتجاه وليس الرقم فقط.
* لأنها تساعدك تفرق بين التذبذب الطبيعي والتحسن الحقيقي.
* لأنها تسهل مراجعة الخطة الغذائية أو التأهيلية في الوقت المناسب.

لوحة المتابعة تساعد المستخدم أو الأخصائي على رؤية التطور بدل الاعتماد على الانطباع. هل هناك تحسن؟ هل الهدف ثابت؟ هل الاحتياج الغذائي أو التدريبي يجب أن يُراجع؟

يمكنك استخدام [لوحة المتابعة](/dashboard) مع [حاسبات الموقع](/calculators) حتى تربط النتائج اليومية بالصورة الكاملة.

مرجع إرشادي: WHO و NIH يركزان باستمرار على أهمية المتابعة الدورية والقياسات المتكررة بدل الحكم من قراءة منفردة.`,
        category: 'Clinical Tracking',
        date: '2026-03-18',
        icon: 'ClipboardList',
      },
      {
        id: 3,
        slug: 'nutrition-after-injury-basics',
        title: 'التغذية العلاجية بعد الإصابة: ما الذي يهم فعلًا؟',
        excerpt:
          'المغذيات لا تعوض العلاج الطبيعي، لكنها قد تدعم التعافي عندما تكون الخطة متوازنة وتحفظية.',
        content: `بعد الإصابات، يميل بعض المستخدمين للتركيز على المكملات أكثر من الأساسيات. لكن الحقيقة أن أهم العوامل عادة تكون: كفاية الطاقة، توزيع البروتين، جودة النوم، شرب الماء، ثم التفاصيل الدقيقة لاحقًا.

## ما الأساسيات التي تهم؟
* سعرات كافية تمنع الهدم الزائد.
* بروتين موزع جيدًا على اليوم.
* ترطيب جيد.
* نوم واستشفاء مناسب.

النهج الآمن هو أن تُستخدم الأدوات الرقمية لتوضيح الاتجاه العام: هل يوجد نقص واضح؟ هل الاحتياج الغذائي منخفض؟ هل العجز السعري مبالغ فيه؟ بعد ذلك تأتي مراجعة الأخصائي إذا كانت هناك إصابة حقيقية أو دواء أو أعراض مستمرة.

قد تستفيد هنا من [حاسبة البروتين](/calculators) و[حاسبة الماكروز](/calculators) و[حاسبة الماء](/calculators) لتكوين صورة عملية أقرب لاحتياجك.

مرجع إرشادي: PubMed و NIH يوفران قاعدة قوية للمفاهيم المتعلقة بـ injury recovery nutrition, protein timing, and hydration.`,
        category: 'Rehab Nutrition',
        date: '2026-03-18',
        icon: 'Sparkles',
      },
      {
        id: 4,
        slug: 'supplements-that-may-support-recovery-after-injury',
        title: '5 مكملات غذائية تساعد على تسريع الاستشفاء العضلي بعد الإصابات',
        excerpt:
          'المكملات قد تساعد في الاستشفاء، لكن قيمتها الحقيقية تظهر فقط عندما تكون جزءًا من نظام غذائي وتأهيلي صحيح.',
        content: `التعافي من الإصابة لا يعتمد فقط على جلسات العلاج الطبيعي. جزء كبير من الشغل يحدث داخل الجسم، وهنا تأتي التغذية كعامل مهم في سرعة الاستشفاء. المكملات الغذائية قد تساعد، لكنها تظل عاملًا مساعدًا وليست الحل الأساسي.

## 1. الكرياتين
الكرياتين ليس فقط لزيادة القوة.
* قد يساعد على تقليل فقدان الكتلة العضلية أثناء فترات التوقف.
* يدعم إنتاج الطاقة داخل الخلايا.

هذا قد يكون مفيدًا في الفترات التي تقل فيها الحركة بسبب الإصابة.

## 2. أوميجا 3
* قد يساعد على تقليل الالتهاب.
* قد يدعم حركة المفاصل وصحة الأنسجة.

يظهر استخدامه أكثر في الحالات التي يوجد فيها تهيج أو إصابات مرتبطة بالمفاصل والأوتار.

## 3. الكولاجين مع فيتامين C
الأوتار والأربطة تعتمد على الكولاجين كجزء مهم من بنيتها.
* قد يساعد على دعم جودة الأنسجة.
* قد يساهم في دعم عملية الالتئام عند استخدامه ضمن برنامج تأهيلي مناسب.

غالبًا يُذكر تناوله قبل التمرين التأهيلي بحوالي 30 إلى 60 دقيقة في بعض البروتوكولات العملية.

## 4. الواي بروتين
أثناء الإصابة قد يزيد الهدم العضلي إذا كان إجمالي البروتين غير كافٍ.
* إذا لم توفر احتياجك اليومي فقد تخسر كتلة عضلية.
* وقد يصبح الاستشفاء أبطأ.

الواي بروتين يظل حلًا عمليًا إذا كان الأكل اليومي لا يغطي الاحتياج.

## 5. الزنك والمغنيسيوم
* الزنك مهم لالتئام الجروح وبناء الأنسجة.
* المغنيسيوم قد يساعد على تقليل التشنجات ويدعم استرخاء العضلات.

أهميتهم تزيد أكثر إذا كان لديك نقص فعلي.

## مثال عملي سريع
شخص عنده إصابة ووقف تمرين أسبوعين:
* يحافظ على البروتين يوميًا.
* قد يستخدم الكرياتين لتقليل فقدان العضل.
* قد يضيف أوميجا 3 ضمن الخطة إذا كان مناسبًا له.

هذا لا يعني أن المكملات ستعالج الإصابة وحدها، لكنه قد يساعده على العودة بشكل أفضل دون أن يبدأ من الصفر.

## أهم نقطة
المكملات لن تعالج الإصابة وحدها. الأساس دائمًا:
* أكل مضبوط.
* برنامج تأهيلي صحيح.
* راحة كافية.

قبل شراء أي مكمل، راجع احتياجك أولًا عبر [حاسبة السعرات والماكروز](/calculators) و[حاسبة البروتين](/calculators)، لأن نقص الأساسيات هو المشكلة الأكثر شيوعًا.

## الخلاصة
المكملات قد تسرّع الاستشفاء، لكن تأثيرها الحقيقي يظهر فقط عندما تكون ماشيًا على نظام غذائي وتمارين تأهيلية صحيحة. غير ذلك، غالبًا ستدفع مالًا بدون استفادة واضحة.

مرجع إرشادي: راجع الأدلة المتعلقة بـ creatine during immobilization، omega-3 and inflammation، collagen support protocols، وadequate protein intake in recovery في PubMed.`,
        category: 'Recovery Supplements',
        date: '2026-03-19',
        icon: 'Sparkles',
      },
      {
        id: 5,
        slug: 'is-physical-therapy-just-exercise',
        title: 'هل العلاج الطبيعي مجرد تمارين؟ الحقيقة التي لا ينتبه لها كثير من الناس',
        excerpt:
          'العلاج الطبيعي ليس مجرد تمارين أو مساج بعد الإصابة. هو طريقة لفهم الحركة وتصحيحها حتى يعمل الجسم بكفاءة أعلى وبألم أقل.',
        content: `كثير من الناس يظنون أن العلاج الطبيعي يعني بعض التمارين أو جلسة بعد الإصابة فقط، لكن الحقيقة أوسع من ذلك بكثير. العلاج الطبيعي في الأساس هو تقييم للحركة وتحليل لطريقة عمل الجسم ثم التدخل لتحسينها بشكل عملي.

## العلاج الطبيعي ليس علاجًا فقط بل وقاية أيضًا
أغلب الناس يلجأون إليه بعد ظهور المشكلة، بينما القيمة الكبيرة قد تبدأ قبلها.
* كشف ضعف عضلي مبكر.
* ملاحظة محدودية في حركة المفاصل.
* تعديل أخطاء في الحركة قبل أن تتحول لإصابة.

أشياء مثل ألم أسفل الظهر، التهاب الأوتار، أو بعض مشاكل الركبة قد تبدأ من أنماط حركة غير جيدة تُترك لفترة طويلة.

## الفكرة الأساسية: علاج السبب لا العرض
المسكن قد يخفف الألم مؤقتًا، لكن العلاج الطبيعي يحاول أن يصل إلى أصل المشكلة.

مثال بسيط: ألم الركبة قد لا يكون سببه الركبة نفسها فقط، بل قد يرتبط بضعف في عضلات الفخذ أو خلل في حركة الحوض. إذا تم التعامل مع الألم فقط، فقد يعود. أما إذا تم التعامل مع السبب، فغالبًا تكون النتيجة أكثر ثباتًا.

## كيف ينعكس ذلك على حياتك اليومية؟
لو عندك ألم مع الجلوس الطويل، أو صعوبة في السلم، أو شد عضلي متكرر، فليس من الحكمة اعتبار ذلك شيئًا طبيعيًا لمجرد أنك تعودت عليه.

العلاج الطبيعي قد يساعدك على:
* التحرك بسهولة أكبر.
* تقليل الألم.
* تحسين جودة النشاط اليومي والرياضي.

## العلاقة بين الحركة والتغذية
من السهل أن تكون ملتزمًا بالأكل أو السعرات، لكن إذا كانت الحركة نفسها ضعيفة أو غير فعالة، فقد يظل التقدم محدودًا.

في PhysioHub الفكرة ببساطة:
* التغذية = الوقود.
* الحركة = طريقة استخدام الوقود.

لهذا قد يفيدك أن تراجع [حاسبات الموقع](/calculators) مع [لوحة المتابعة](/dashboard) حتى تربط بين الأرقام وبين الأداء والحركة بشكل أذكى.

## لماذا التقييم مع مختص مهم؟
* لا يوجد تمرين مناسب للجميع بنفس الشكل.
* الخطأ في التمرين قد يزيد التهيج أو الإصابة.
* كل جسم له ميكانيكا وحالة مختلفة.

التقييم الجيد قد يوفر عليك وقتًا طويلًا من التخمين أو تجربة حلول غير مناسبة.

## مثال عملي سريع
شخص يتدرب باستمرار ويشعر بألم متكرر في الكتف. يستمر في التمرين، يستخدم مسكنًا، ثم يعود الألم مرة أخرى. بعد التقييم قد يتضح وجود ضعف في عضلات معينة أو خطأ في نمط الحركة. عند تعديل التمرين وتقوية النقاط الضعيفة، يصبح التحسن أكثر منطقية واستقرارًا.

## الخلاصة
العلاج الطبيعي ليس رفاهية، وليس شيئًا يُستخدم فقط بعد الإصابة. هو أداة مهمة للوقاية، وتحسين الحركة، والاستفادة الحقيقية من التمرين والتغذية.

إذا كنت تشعر بألم متكرر أو أن جسمك لا يعمل بكفاءة، فقد يكون من الأفضل أن تبدأ بتقييم الحركة بدل الانتظار حتى تكبر المشكلة.

ولو أردت فهم الصورة بشكل أوسع، يمكنك أيضًا استخدام [المساعد](/assistant) لترتيب أسئلتك قبل زيارة المختص، ثم متابعة مؤشراتك عبر [لوحة المتابعة](/dashboard).`,
        category: 'Movement & Rehab',
        date: '2026-03-19',
        icon: 'ClipboardList',
      },
      {
        id: 6,
        slug: 'calorie-deficit-without-extremes',
        title: 'عجز السعرات: الطريقة العملية للتخسيس بدون حرمان أو لف ودوران',
        excerpt:
          'فقدان الدهون يبدأ من عجز السعرات، لكن النجاح الحقيقي يحتاج عجزًا معقولًا، بروتينًا كافيًا، وخطة يمكن الاستمرار عليها.',
        content: `لو أخبرك أحد أن هناك طريقة سحرية للتخسيس بعيدًا عن عجز السعرات، فغالبًا هو يبيع لك فكرة أكثر مما يشرح لك الواقع. القاعدة الأساسية بسيطة: إذا كان جسمك يحرق طاقة أكثر مما يأخذ، يبدأ الوزن في النزول مع الوقت.

## ما معنى عجز السعرات؟
الجسم يحتاج طاقة يومية حتى يتنفس، ويحافظ على عمل الأعضاء، ويتحرك. هذه الطاقة هي السعرات الحرارية.

والاحتمالات العملية ثلاثة:
* إذا أكلت قريبًا من احتياجك فغالبًا يثبت وزنك.
* إذا أكلت أكثر من احتياجك فغالبًا يزيد وزنك.
* إذا أكلت أقل من احتياجك بشكل مناسب يبدأ الجسم في استخدام المخزون، ومنها الدهون.

## أين يخطئ كثير من الناس؟
المشكلة الشائعة ليست في فكرة العجز نفسها، بل في المبالغة. بعض الناس يطبق عجزًا كبيرًا جدًا وكأنه تجويع، فتظهر مشاكل مثل:
* تعب سريع.
* جوع شديد.
* فقدان كتلة عضلية.
* صعوبة في الاستمرار ثم استرجاع الوزن لاحقًا.

لهذا يكون العجز المعتدل غالبًا أفضل. نطاق مثل 300 إلى 500 سعر يوميًا يكون عمليًا عند كثير من الناس، وقد يدعم نزولًا تدريجيًا أكثر قابلية للاستمرار.

## هل السعرات وحدها تكفي؟
نظريًا، عجز السعرات هو الأساس. لكن عمليًا، جودة الأكل تؤثر جدًا على الشبع والشكل النهائي والقدرة على الالتزام.

لكي يكون النزول أفضل:
* بروتين كافٍ للحفاظ على العضلات.
* خضار وألياف لتحسين الشبع.
* مياه كافية لأن العطش أحيانًا يُفهم كأنه جوع.

هنا يظهر دور [حاسبة البروتين](/calculators) و[حاسبة الماكروز](/calculators) بجانب [حاسبة عجز السعرات](/calculators).

## مثال عملي بسيط
إذا كان احتياج شخص ما يقارب 2500 سعر يوميًا، فقد يكون مناسبًا له أن يبدأ حول 2000 إلى 2200 سعر بحسب حالته ومستوى نشاطه.

هذا لا يعني الحرمان، بل يعني أن يأكل بشكل طبيعي لكن داخل حدود رقم مفهوم يمكن متابعته.

## الحل العملي
بدل التخمين أو تقليل الأكل بعشوائية، ابدأ بالحساب. استخدم [حاسبات السعرات والماكروز](/calculators) في PhysioHub حتى تعرف:
* احتياجك اليومي التقريبي.
* العجز المناسب لك.
* توزيع البروتين والدهون والكربوهيدرات بشكل أقرب لوضعك.

وبعدها راقب التقدم من خلال [لوحة المتابعة](/dashboard) بدل الحكم على يوم واحد أو أسبوع متقلب.

## الخلاصة
عجز السعرات هو الأساس العملي لفقدان الدهون، لكن العجز الشديد قد يفسد الالتزام والنتيجة. كلما كانت خطتك أوضح وأكثر واقعية، كانت فرصتك أفضل في النزول مع الحفاظ على العضلات والصحة.

إذا فهمت رقمك الحقيقي ومشيت عليه باستمرار، ستتحرك في الاتجاه الصحيح بدون لف كثير ولا دايت قاسٍ لا يدوم.`,
        category: 'Fat Loss Basics',
        date: '2026-03-19',
        icon: 'Flame',
      },
      {
        id: 7,
        slug: 'low-back-pain-rest-or-move',
        title: 'ألم أسفل الظهر: تريح ولا تتحرك؟ الفهم الصحيح هو الحل',
        excerpt:
          'ألم أسفل الظهر لا يتحسن دائمًا بالراحة فقط. في كثير من الحالات، الحركة المناسبة والتقييم الصحيح هما بداية الحل الحقيقي.',
        content: `ألم أسفل الظهر من أكثر المشاكل التي تظهر في العيادات والجيم وأثناء العمل المكتبي. كثير من الناس يتعاملون معه بالطريقة نفسها: مسكن وراحة. هذا قد يهدئ الألم مؤقتًا، لكنه لا يفسر السبب في كثير من الحالات.

## ما الذي يحدث فعليًا؟
أسفل الظهر ليس عضلة واحدة، بل منطقة يدخل فيها:
* عضلات.
* مفاصل.
* أربطة.
* أعصاب.

أي خلل في هذا النظام قد يظهر على شكل ألم. وفي كثير من الحالات اليومية يرتبط ذلك بعوامل مثل:
* ضعف عضلات الجذع أو الـ Core.
* محدودية في حركة الحوض.
* تحميل غير مناسب أثناء التمرين أو الجلوس أو الرفع.

## هل الراحة هي الحل؟
في بعض الحالات الحادة قد تكون الراحة القصيرة ليوم أو يومين مقبولة. لكن الاستمرار في الراحة لفترة طويلة قد يؤدي إلى:
* ضعف إضافي في العضلات الداعمة.
* قلة في الحركة الطبيعية.
* تأخر في الاستشفاء.

لذلك تعتمد النظرة الحديثة غالبًا على العودة التدريجية للحركة بدل الاعتماد الكامل على الراحة.

## لماذا الحركة مهمة؟
الحركة المناسبة قد تساعد على:
* تنشيط الدورة الدموية.
* الحفاظ على قوة العضلات.
* إعادة الجسم تدريجيًا إلى نمط الحركة الطبيعي.

لكن النقطة المهمة أن الحركة يجب أن تكون مناسبة للحالة، لا عشوائية ولا مبنية فقط على فيديو سريع من الإنترنت.

## أين يأتي دور العلاج الطبيعي؟
العلاج الطبيعي يساعد على التمييز بين مكان الألم والسبب الحقيقي له. التقييم الجيد قد يوضح هل المشكلة مرتبطة بضعف عضلي، أو بطريقة حركة غير جيدة، أو بتحميل زائد، أو بعامل يحتاج متابعة طبية أكبر.

في كثير من الحالات يتضمن التدخل:
* تقييمًا للحركة.
* تحديد العوامل المساهمة في الألم.
* تمارين تدريجية مناسبة للحالة.
* تعديل بعض الأنشطة أو الحركات اليومية.

إذا كنت تريد تنظيم الصورة بشكل أفضل، قد يفيدك استخدام [المساعد](/assistant) لترتيب الأعراض والأسئلة، ثم متابعة التحسن عبر [لوحة المتابعة](/dashboard).

## الأخطاء الشائعة
من أكثر الأشياء التي تطيل المشكلة:
* الراحة الطويلة بدون خطة.
* الاعتماد على المسكنات فقط.
* تمارين عشوائية غير مناسبة.
* الرجوع المفاجئ لنفس شدة التمرين السابقة.

## هل التغذية لها دور؟
التغذية ليست السبب الأساسي في أغلب حالات ألم الظهر، لكنها قد تؤثر في سرعة الاستشفاء وجودة التعافي.
* البروتين يساعد في دعم إصلاح الأنسجة.
* الترطيب الجيد مهم لوظيفة العضلات والحركة.
* النظام الغذائي المتوازن يدعم التعافي العام.

لهذا قد يكون من المفيد مراجعة [حاسبة البروتين](/calculators) و[حاسبة الماء](/calculators) بجانب أي خطة تأهيلية.

## ماذا تفعل بشكل عملي؟
* خفف الأحمال إذا كان الألم شديدًا.
* لا تبق في راحة كاملة لفترة طويلة بدون سبب واضح.
* ابدأ بحركة خفيفة مناسبة إذا كانت حالتك تسمح.
* راقب ما الذي يزيد الألم وما الذي يخففه.
* اطلب تقييمًا متخصصًا إذا كنت غير متأكد من البداية الصحيحة.

## متى تحتاج مراجعة طبية أسرع؟
بعض العلامات تستحق انتباهًا أكبر، مثل:
* استمرار الألم لفترة طويلة دون تحسن.
* امتداد الألم إلى الساق.
* تنميل أو ضعف واضح.

في هذه الحالات، لا تعتمد على التوقع فقط، واطلب تقييمًا متخصصًا.

## الخلاصة
ألم أسفل الظهر ليس دائمًا مشكلة تُحل بالراحة فقط. في كثير من الحالات، يكون الفهم الصحيح للحركة، والتحميل المناسب، والتقييم الجيد، أهم من التسكين المؤقت. كلما فهمت السبب مبكرًا وتحركت بشكل أذكى، كانت فرصتك أفضل في التعافي والوقاية.`,
        category: 'Back Pain & Movement',
        date: '2026-03-19',
        icon: 'ClipboardList',
      },
      {
        id: 8,
        slug: 'diet-myths-that-waste-your-progress',
        title: '5 خرافات عن الدايت والتخسيس قد تضيع مجهودك في الجيم',
        excerpt:
          'كثير من مشاكل التخسيس لا تأتي من قلة المجهود، بل من معلومات غير دقيقة. فهم الأساس العلمي يوفر عليك وقتًا ومجهودًا كبيرين.',
        content: `كثير من الناس يتمرنون ويلتزمون بالدايت، ثم يتفاجؤون بأن النتيجة أبطأ من المتوقع أو غير واضحة. في أحيان كثيرة، المشكلة ليست في قلة الجهد، بل في الاعتماد على أفكار منتشرة لكنها غير دقيقة.

## 1. هل يجب منع الكربوهيدرات تمامًا؟
الكربوهيدرات ليست العدو. هي مصدر مهم للطاقة، وقد تساعدك على الحفاظ على جودة التمرين والأداء. المشكلة غالبًا ليست في وجود الكربوهيدرات، بل في إجمالي الأكل وعدم ضبط الكمية المناسبة.

إذا أردت رؤية أوضح، راجع [حاسبة الماكروز](/calculators) بدل الاعتماد على المنع العشوائي.

## 2. هل تمارين البطن تزيل الكرش؟
تقوية عضلات البطن شيء جيد، لكن هذا لا يعني أن الدهون في هذه المنطقة ستختفي وحدها. ما يعرف بحرق الدهون من مكان واحد ليس هو الطريقة التي يعمل بها الجسم عادة.

تقليل دهون البطن يرتبط أكثر بـ:
* عجز سعرات مناسب.
* انتظام في التمرين.
* وقت كافٍ للاستمرار.

## 3. هل الماء والليمون على الريق يحرق الدهون؟
شرب الماء عادة جيدة، لكن لا يوجد دليل قوي على أن هذا المشروب وحده يحرق الدهون بشكل مؤثر. نزول الدهون يعتمد أساسًا على ميزان الطاقة: ماذا تأكل، وماذا يحرق جسمك.

## 4. هل الأكل بالليل يسبب زيادة الدهون وحده؟
الجسم لا يتعامل مع الساعة بالطريقة الشعبية المنتشرة. العامل الأهم عادة هو إجمالي ما تأكله خلال اليوم. قد يخسر شخص وزنه رغم أنه يأكل ليلًا إذا كان داخل احتياجه المناسب، وقد يزيد آخر رغم أنه يأكل صباحًا فقط إذا كان مجموع أكله أعلى من اللازم.

## 5. هل التعرق يعني حرق دهون أكثر؟
التعرق يعني غالبًا فقدان سوائل، لا فقدان دهون مباشر. الوزن الذي ينزل بعد التمرين بسبب العرق قد يعود بعد شرب الماء. حرق الدهون يرتبط أكثر بالجهد العام، والالتزام، وعجز السعرات المناسب.

## لماذا تؤذيك هذه الخرافات؟
لأنها تدفعك إلى:
* بذل مجهود في الاتجاه الخطأ.
* توقعات غير واقعية.
* إحباط سريع.
* ترك الخطة قبل أن تعطي نتيجتها الحقيقية.

## ما المسار العملي الأفضل؟
بدل مطاردة النصائح المتناقضة:
* احسب احتياجك.
* ضع عجز سعرات معقولًا.
* اجعل أكلك متوازنًا ويمكن الاستمرار عليه.
* التزم بتمرين منتظم.

ابدأ من [حاسبة عجز السعرات](/calculators) و[حاسبة الماكروز](/calculators) وراجع تقدمك في [لوحة المتابعة](/dashboard) بدل الحكم على نفسك من يوم واحد.

## وأين تأتي الحركة الصحيحة؟
حتى مع خطة تغذية جيدة، قد يكون التمرين غير فعال إذا كانت الحركة نفسها ضعيفة أو غير مناسبة. هنا يفيدك التقييم الحركي، أو على الأقل استخدام [المساعد](/assistant) لترتيب الأسئلة والملاحظات قبل البدء أو التعديل.

## الخلاصة
لا توجد حلول سحرية. التخسيس لا يحتاج خرافات، بل يحتاج فهمًا واضحًا للأساسيات: عجز سعرات، التزام، تمرين مناسب، وصبر كافٍ لرؤية النتيجة.

كلما ابتعدت عن المبالغات واقتربت من الأرقام والسلوك اليومي الواقعي، كانت فرصتك أفضل في نزول الدهون بدون لف كثير ولا تشتيت.`,
        category: 'Diet Myths',
        date: '2026-03-19',
        icon: 'Brain',
      },
    ];
  }

  return [
    {
      id: 1,
      slug: 'protein-after-acl-reconstruction',
      title: 'Eating more protein but not seeing muscle growth? Find your real target',
      excerpt:
        'More protein does not automatically mean more muscle. Your real protein target depends on body weight, training load, and your goal.',
      content: `Many people assume that simply eating a lot of protein will automatically build more muscle. In reality, protein needs are not fixed for everyone. They depend on body weight, activity level, training intensity, and the actual goal, whether that is muscle gain, fat loss, or better recovery.

## Why does protein matter?
Protein is a core building block for muscle repair and tissue recovery, but the body does not store it the same way it stores fat or carbohydrate. That is one reason consistent daily intake matters more than occasional heavy intake.

## Practical ranges
* Low activity: around 0.8 to 1 g/kg/day.
* Moderate training: around 1.2 to 1.6 g/kg/day.
* Hard training: around 1.7 to 2.2 g/kg/day.

A 70 kg person training regularly may reasonably land around 98 to 112 grams per day depending on context.

## Better distribution
Many people do better when protein is spread across the day instead of concentrated in one large meal.
* Breakfast with eggs or dairy.
* Lunch with chicken or fish.
* Dinner with tuna, legumes, or another protein-rich option.
* Yogurt or nuts as needed.

## Key point
Protein alone does not build muscle. Resistance training, sleep, total energy intake, and consistency all matter.

If you want a more realistic target, start with the [protein calculator](/calculators) and compare it with the [daily calorie calculator](/calculators).

Reference direction: review PubMed literature on dietary protein intake, muscle protein synthesis, and resistance training adaptation.`,
      category: 'Sports Nutrition',
      date: '2026-03-19',
      icon: 'HeartPulse',
    },
    {
      id: 2,
      slug: 'why-tracking-measurements-matters',
      title: 'Why tracking measurements beats a single result',
      excerpt:
        'One result can be helpful, but the real clinical value often appears when you track change over time.',
      content: `In rehab and weight management, a single reading can be influenced by hydration, sleep, stress, and recent activity. Trends are usually more informative than isolated values.

## Why does tracking matter?
* It shows direction, not just one number.
* It helps separate noise from true progress.
* It makes changes to nutrition or rehab plans more rational.

A dashboard lets users and clinicians review whether progress is stable, whether recovery is moving in the right direction, and whether nutrition targets still fit the situation.

You can combine the [tracking dashboard](/dashboard) with the site [calculators](/calculators) for a more useful follow-up process.

Reference direction: WHO and NIH materials consistently support repeated observation and pattern-based review rather than decisions based on a single snapshot.`,
      category: 'Clinical Tracking',
      date: '2026-03-18',
      icon: 'ClipboardList',
    },
    {
      id: 3,
      slug: 'nutrition-after-injury-basics',
      title: 'What actually matters in nutrition after injury?',
      excerpt:
        'Supplements are not the foundation. Energy intake, protein distribution, hydration, and recovery habits usually matter first.',
      content: `Many users jump straight to supplements, but the stronger starting point is usually much simpler: enough total calories, enough protein across the day, consistent hydration, and sleep that supports recovery.

## The basics that matter most
* Enough energy intake.
* Sufficient protein spread through the day.
* Good hydration.
* Sleep and recovery habits.

Digital tools are most useful when they make these basics easier to understand. Is the calorie target too low? Is protein spread poorly? Is hydration inconsistent?

Useful starting points include the [protein calculator](/calculators), [macro calculator](/calculators), and [water intake calculator](/calculators).

Reference direction: PubMed and NIH provide a useful base for injury recovery nutrition, protein timing, and hydration-related guidance.`,
      category: 'Rehab Nutrition',
      date: '2026-03-18',
      icon: 'Sparkles',
    },
    {
      id: 4,
      slug: 'supplements-that-may-support-recovery-after-injury',
      title: '5 supplements that may support muscle recovery after injury',
      excerpt:
        'Supplements may help recovery, but their real value appears only when they support a sound nutrition and rehab plan.',
      content: `Recovery after injury is not only about physiotherapy sessions. A large part of the work happens inside the body, and nutrition is a major factor. Supplements may help, but they should be viewed as support rather than the main solution.

## 1. Creatine
Creatine is not only for strength.
* It may help reduce muscle loss during reduced activity.
* It supports cellular energy production.

## 2. Omega-3
* It may help reduce inflammation.
* It may support joint and tissue health.

## 3. Collagen with vitamin C
Tendons and ligaments depend heavily on collagen.
* It may help support tissue quality.
* It may fit well alongside a rehab-loading plan.

Some practical protocols place it around 30 to 60 minutes before rehab exercise.

## 4. Whey protein
If total protein intake is too low during injury:
* muscle loss becomes more likely,
* and recovery may be slower.

Whey can be a practical option when normal meals are not enough.

## 5. Zinc and magnesium
* Zinc supports tissue repair.
* Magnesium may help with cramps and muscle relaxation.

Their value is greater when there is an actual deficiency risk.

## Quick example
Someone who stops training for two weeks because of injury may benefit from:
* keeping daily protein intake adequate,
* using creatine to help preserve lean mass,
* and considering omega-3 when appropriate.

## Most important point
Supplements do not treat injuries on their own. The foundation is still:
* adequate food intake,
* a sound rehab program,
* and enough rest.

Before adding supplements, check the basics with the [calorie and macro calculators](/calculators) and the [protein calculator](/calculators).

## Conclusion
Supplements may support faster recovery, but the benefit becomes meaningful only when they are built on a correct rehab and nutrition plan.

Reference direction: review evidence on creatine during immobilization, omega-3 and inflammation, collagen support protocols, and adequate protein intake in recovery on PubMed.`,
      category: 'Recovery Supplements',
      date: '2026-03-19',
      icon: 'Sparkles',
    },
    {
      id: 5,
      slug: 'is-physical-therapy-just-exercise',
      title: 'Is physical therapy just exercise? Not quite',
      excerpt:
        'Physical therapy is not just a few exercises after injury. It is a structured way to assess movement, reduce pain, and improve function.',
      content: `Many people think physical therapy means a few exercises or a session after an injury, but the real role is broader. At its core, physical therapy evaluates movement, identifies weak points, and helps the body work more efficiently.

## It is not only treatment, it is also prevention
Many people seek help only after a problem becomes painful, but early movement assessment may help by:
* spotting weak muscle groups,
* noticing restricted joint motion,
* and correcting faulty movement patterns before they become bigger problems.

That matters because issues such as low back pain, tendon irritation, or some knee complaints may build over time from repeated movement errors.

## The main value: treating the cause, not only the symptom
Painkillers may reduce pain for a while, but physical therapy often aims to address the source.

For example, knee pain may not be only about the knee. It may relate to weak thigh muscles, poor hip control, or a faulty loading pattern. If only the pain is suppressed, the problem may return. If the cause is addressed, improvement is often more durable.

## Why does this matter in daily life?
Pain with long sitting, discomfort on stairs, or repeated muscle tightness should not always be dismissed as normal.

Physical therapy may help you:
* move with less pain,
* improve day-to-day function,
* and get more benefit from exercise.

## Movement and nutrition work together
Someone may be consistent with diet and calorie targets, but if movement quality is poor or strength deficits remain, progress may still feel limited.

Within PhysioHub, the simple idea is:
* nutrition is the fuel,
* movement is how that fuel gets used.

That is why it helps to use the site [calculators](/calculators) together with the [tracking dashboard](/dashboard) so your numbers make sense in the context of real performance.

## Why does assessment with a professional matter?
* No single exercise suits everyone.
* Poor exercise selection may increase irritation.
* Each body has different mechanics and limitations.

A good assessment may save weeks or months of trial and error.

## Quick example
Someone keeps training despite repeated shoulder pain. They use pain relief, keep going, and the pain returns. A proper movement assessment may reveal weak stabilizers or poor exercise mechanics. Once those are addressed, the improvement becomes more meaningful.

## Conclusion
Physical therapy is not a luxury, and it is not only something used after injury. It is a practical tool for prevention, better movement, and better use of training and nutrition.

If you feel repeated pain or reduced movement quality, it may be smarter to assess movement early instead of waiting. You can also use the [assistant](/assistant) to organize your questions, then follow changes through the [dashboard](/dashboard).`,
      category: 'Movement & Rehab',
      date: '2026-03-19',
      icon: 'ClipboardList',
    },
    {
      id: 6,
      slug: 'calorie-deficit-without-extremes',
      title: 'Calorie deficit: the practical way to lose fat without extremes',
      excerpt:
        'Fat loss starts with a calorie deficit, but better results usually come from a realistic deficit, enough protein, and a plan you can actually sustain.',
      content: `If someone tells you there is a fat-loss secret that does not involve a calorie deficit, they are usually selling an idea more than explaining reality. The core principle is simple: if your body uses more energy than it takes in, weight tends to move down over time.

## What is a calorie deficit?
Your body needs energy every day to breathe, maintain organ function, and move. That energy is measured as calories.

In practical terms, there are three main outcomes:
* eat close to your needs and weight often stays stable,
* eat above your needs and weight often rises,
* eat below your needs appropriately and the body starts drawing on stored energy, including fat.

## Where do people usually go wrong?
The common problem is not the idea of a deficit. It is overdoing it. Some people create such a large deficit that the plan turns into under-eating, and that often leads to:
* rapid fatigue,
* strong hunger,
* muscle loss,
* and poor long-term adherence.

That is why a moderate deficit is usually more practical. A range such as 300 to 500 calories per day often works better than aggressive restriction.

## Are calories alone enough?
In theory, the deficit is the foundation. In practice, food quality affects hunger, body composition, and sustainability.

For better results:
* keep protein high enough to protect muscle,
* use vegetables and fiber to improve fullness,
* and keep hydration adequate.

This is where the [protein calculator](/calculators), [macro calculator](/calculators), and [calorie deficit calculator](/calculators) work well together.

## A simple example
If someone needs about 2500 calories per day, a practical starting range for fat loss might be around 2000 to 2200 calories depending on context.

That does not mean starvation. It means eating normally, but within a target that makes sense.

## The practical starting point
Instead of guessing, calculate first. Use the [calorie and macro calculators](/calculators) in PhysioHub to estimate:
* daily needs,
* an appropriate deficit,
* and a more useful protein, fat, and carbohydrate split.

Then follow the trend with the [tracking dashboard](/dashboard) rather than judging progress from one random day.

## Conclusion
A calorie deficit is the practical foundation of fat loss, but an excessive deficit often damages adherence and results. The clearer and more realistic the plan is, the better the chance of losing fat while preserving muscle and health.

If you understand your real numbers and stick to them consistently, progress becomes much more predictable.`,
      category: 'Fat Loss Basics',
      date: '2026-03-19',
      icon: 'Flame',
    },
    {
      id: 7,
      slug: 'low-back-pain-rest-or-move',
      title: 'Low back pain: should you rest or move?',
      excerpt:
        'Low back pain does not always improve with rest alone. In many cases, the real solution starts with proper assessment and the right amount of movement.',
      content: `Low back pain is one of the most common problems seen in clinics, gyms, and desk-based work. Many people respond the same way: pain relief and rest. That may calm symptoms for a while, but it often does not explain or solve the underlying issue.

## What is actually involved?
The low back is not just one muscle. It is part of a wider system involving:
* muscles,
* joints,
* ligaments,
* and nerves.

Pain may appear when this system is not working well together. In many everyday cases, contributing factors include:
* weak trunk or core muscles,
* restricted pelvic movement,
* and poor loading during lifting, exercise, or long sitting.

## Is rest the answer?
In some acute situations, short rest for a day or two may be reasonable. But longer rest without a clear reason may lead to:
* more weakness in supporting muscles,
* reduced normal movement,
* and slower recovery.

That is why modern management often focuses more on graded return to movement than on prolonged rest alone.

## Why does movement matter?
Appropriate movement may help:
* improve circulation,
* maintain muscle function,
* and gradually restore more normal movement patterns.

The key is that movement should fit the condition. Random exercises are not always the same as useful rehabilitation.

## Where does physical therapy help?
Physical therapy helps separate the location of pain from the real contributors behind it. A good assessment may show whether the issue relates more to strength deficits, movement quality, loading habits, or something that needs further medical review.

In many cases, the process includes:
* movement assessment,
* identifying contributing factors,
* graded exercise,
* and adjusting daily activity or training.

If you want to organize the picture before a visit, you can use the [assistant](/assistant) to sort your questions, then follow changes through the [tracking dashboard](/dashboard).

## Common mistakes
Problems are often prolonged by:
* long rest without a plan,
* relying only on painkillers,
* random internet exercises,
* and jumping back into full training too quickly.

## Does nutrition matter?
Nutrition is usually not the primary cause of low back pain, but it may influence recovery quality.
* Protein supports tissue repair.
* Hydration supports muscle function.
* A balanced diet supports overall recovery.

Useful tools here include the [protein calculator](/calculators) and [water intake calculator](/calculators).

## What should you do practically?
* Reduce load if pain is strong.
* Avoid prolonged full rest without a reason.
* Reintroduce light movement when appropriate.
* Notice what clearly worsens or eases symptoms.
* Seek a proper assessment if you are unsure where to start.

## When should medical review happen sooner?
Some signs deserve faster attention, such as:
* pain that keeps going without improvement,
* pain spreading into the leg,
* numbness or clear weakness.

## Conclusion
Low back pain is not always something that improves with rest alone. In many cases, the best path is proper assessment, smarter movement, and a plan that addresses the cause rather than only silencing the symptom.`,
      category: 'Back Pain & Movement',
      date: '2026-03-19',
      icon: 'ClipboardList',
    },
    {
      id: 8,
      slug: 'diet-myths-that-waste-your-progress',
      title: '5 diet myths that may be wasting your progress',
      excerpt:
        'Many fat-loss problems come less from low effort and more from poor information. Understanding the basics saves time, frustration, and guesswork.',
      content: `Many people train hard and try to diet, yet still feel that progress is slower than expected. Often the real issue is not effort. It is believing common ideas that sound convincing but are not very accurate.

## 1. Do you need to cut carbohydrates completely?
Carbohydrates are not automatically the problem. They are a major source of energy and may help support training quality and performance. In many cases, the real issue is total intake, not the fact that carbohydrates exist.

If you want a clearer starting point, use the [macro calculator](/calculators) rather than relying on random restriction.

## 2. Can ab exercises remove belly fat?
Stronger abdominal muscles are useful, but that does not mean fat over the area disappears on its own. Spot reduction is not how fat loss usually works.

Reducing abdominal fat is more closely linked to:
* an appropriate calorie deficit,
* regular training,
* and enough time.

## 3. Does water with lemon on an empty stomach burn fat?
Drinking water is a good habit, but there is no strong evidence that this drink alone creates meaningful fat loss. Fat loss still depends mainly on energy balance over time.

## 4. Does eating at night automatically lead to fat gain?
The body does not respond to the clock in the simplistic way many people think. What usually matters more is total daily intake. Someone can lose fat while eating later in the day if total intake is appropriate, and someone else can gain while eating early if total intake is too high.

## 5. Does sweating more mean burning more fat?
Sweat usually reflects fluid loss, not direct fat loss. The weight lost through sweat often returns after rehydration. Fat loss depends more on total effort, consistency, and calorie balance.

## Why do these myths hurt progress?
Because they often lead to:
* effort in the wrong direction,
* unrealistic expectations,
* early frustration,
* and quitting too soon.

## What is the more practical path?
Instead of chasing conflicting advice:
* estimate your needs,
* create a reasonable calorie deficit,
* eat in a balanced way you can sustain,
* and train consistently.

Start with the [calorie deficit calculator](/calculators) and [macro calculator](/calculators), then follow progress through the [tracking dashboard](/dashboard) rather than judging your plan from one random day.

## Where does movement quality fit in?
Even with a better nutrition plan, training may be less effective if movement quality is poor. That is where movement assessment matters, or at least using the [assistant](/assistant) to organize questions and practical next steps.

## Conclusion
There are no magic shortcuts. Fat loss works better when you stop chasing myths and focus on the basics: calorie balance, consistency, suitable training, and enough patience to let the process work.`,
      category: 'Diet Myths',
      date: '2026-03-19',
      icon: 'Brain',
    },
  ];
};

export const getArticleBySlug = (lang: Language, slug: string): Article | undefined =>
  getArticles(lang).find((article) => article.slug === slug);
