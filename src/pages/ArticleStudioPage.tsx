import {useEffect, useMemo, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';
import {
  canManageArticles,
  createBlankArticle,
  getArticleAdminIdentity,
  getFallbackArticles,
  loadPublishedArticles,
  publishArticles,
  slugifyArticleTitle,
} from '../services/articleStudio';
import type {Article} from '../services/articles';
import type {Language} from '../services/translations';
import {
  getCurrentUser,
  getSupabaseConfigurationMessage,
  isSupabaseConfigured,
  onSupabaseAuthChange,
  type User,
} from '../lib/supabase';

type EditableFields = keyof Pick<
  Article,
  'title' | 'slug' | 'excerpt' | 'content' | 'category' | 'date' | 'icon' | 'image'
>;

export default function ArticleStudioPage() {
  const uiLang = usePreferredLang();
  const [editorLang, setEditorLang] = useState<Language>(uiLang);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [importText, setImportText] = useState('');
  const [notice, setNotice] = useState('');
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);
  const [otherLangArticles, setOtherLangArticles] = useState<Article[]>([]);

  const isAr = uiLang === 'ar';
  const otherLang: Language = editorLang === 'ar' ? 'en' : 'ar';
  const adminEmail = getArticleAdminIdentity();
  const isAdmin = canManageArticles(user);

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      if (!isSupabaseConfigured) {
        setAuthChecked(true);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        if (!mounted) return;
        setUser(currentUser);
      } catch {
        if (!mounted) return;
        setUser(null);
      } finally {
        if (mounted) setAuthChecked(true);
      }
    };

    void bootstrap();

    if (!isSupabaseConfigured) return () => void 0;

    const {data} = onSupabaseAuthChange((_, session) => {
      if (!mounted) return;
      setUser(session?.user || null);
      setAuthChecked(true);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let active = true;

    const refresh = async () => {
      setLoadingArticles(true);
      const [nextArticles, nextOtherLangArticles] = await Promise.all([
        loadPublishedArticles(editorLang),
        loadPublishedArticles(otherLang),
      ]);
      if (!active) return;
      setArticles(nextArticles);
      setOtherLangArticles(nextOtherLangArticles);
      const matchedArticle = pendingSlug
        ? nextArticles.find((article) => article.slug === pendingSlug)
        : null;
      setSelectedId(matchedArticle?.id ?? nextArticles[0]?.id ?? null);
      setPendingSlug(null);
      setLoadingArticles(false);
    };

    void refresh();
    return () => {
      active = false;
    };
  }, [editorLang, otherLang, pendingSlug]);

  const selectedArticle = useMemo(
    () => articles.find((article) => article.id === selectedId) ?? articles[0] ?? null,
    [articles, selectedId],
  );
  const matchingOtherLanguageArticle = useMemo(
    () =>
      selectedArticle
        ? otherLangArticles.find((article) => article.slug === selectedArticle.slug) ?? null
        : null,
    [otherLangArticles, selectedArticle],
  );
  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return articles;
    return articles.filter((article) =>
      [article.title, article.slug, article.category].some((value) => value.toLowerCase().includes(query)),
    );
  }, [articles, search]);

  const updateArticles = (nextArticles: Article[], nextSelectedId?: number | null, message?: string) => {
    setArticles(nextArticles);
    setSelectedId(nextSelectedId ?? nextArticles[0]?.id ?? null);
    if (message) setNotice(message);
  };

  const handleFieldChange = (field: EditableFields, value: string) => {
    if (!selectedArticle) return;
    setArticles((current) =>
      current.map((article) => (article.id === selectedArticle.id ? {...article, [field]: value} : article)),
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await publishArticles(editorLang, articles);
      setNotice(isAr ? 'تم نشر المقالات بنجاح لكل الزوار.' : 'Articles were published successfully for all visitors.');
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      setNotice(
        message ||
          (isAr ? 'تعذر نشر المقالات الآن. راجع إعدادات Supabase والصلاحيات.' : 'Could not publish articles right now. Check Supabase configuration and permissions.'),
      );
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    const article = createBlankArticle(editorLang, articles);
    updateArticles([article, ...articles], article.id, isAr ? 'تم إنشاء مقال جديد.' : 'New article created.');
  };

  const handleDelete = () => {
    if (!selectedArticle) return;
    const nextArticles = articles.filter((article) => article.id !== selectedArticle.id);
    updateArticles(nextArticles, nextArticles[0]?.id ?? null, isAr ? 'تم حذف المقال من النسخة الحالية.' : 'Article removed from the current draft.');
  };

  const handleDuplicate = () => {
    if (!selectedArticle) return;
    const duplicate: Article = {
      ...selectedArticle,
      id: articles.reduce((max, article) => Math.max(max, article.id), 0) + 1,
      slug: `${selectedArticle.slug}-copy`,
      title: `${selectedArticle.title}${editorLang === 'en' ? ' Copy' : ' نسخة'}`,
    };
    updateArticles([duplicate, ...articles], duplicate.id, isAr ? 'تم إنشاء نسخة من المقال.' : 'Article duplicated.');
  };

  const switchToOtherLanguageVersion = () => {
    if (!selectedArticle) return;
    setPendingSlug(selectedArticle.slug);
    setEditorLang(otherLang);
  };

  const handleResetLanguage = () => {
    const fallback = getFallbackArticles(editorLang);
    updateArticles(
      fallback,
      fallback[0]?.id ?? null,
      isAr ? 'تم تحميل النسخة الافتراضية. اضغط حفظ لنشرها.' : 'Default articles loaded. Press save to publish them.',
    );
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText) as Article[];
      if (!Array.isArray(parsed)) throw new Error('Invalid format');
      updateArticles(parsed, parsed[0]?.id ?? null, isAr ? 'تم استيراد المقالات إلى المسودة الحالية.' : 'Articles imported into the current draft.');
      setImportText('');
    } catch {
      setNotice(isAr ? 'ملف الاستيراد غير صالح. استخدم JSON صحيح.' : 'Import data is invalid. Use valid JSON.');
    }
  };

  const handleExport = async () => {
    const payload = JSON.stringify(articles, null, 2);
    try {
      await navigator.clipboard.writeText(payload);
      setNotice(isAr ? 'تم نسخ JSON إلى الحافظة.' : 'JSON copied to clipboard.');
    } catch {
      setImportText(payload);
      setNotice(isAr ? 'تم وضع JSON في مربع الاستيراد لأن النسخ المباشر لم ينجح.' : 'JSON was placed in the import box because clipboard copy failed.');
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <>
        <Seo title={uiLang === 'en' ? 'Article Studio' : 'ستوديو المقالات'} description={getSupabaseConfigurationMessage(uiLang)} canonicalPath="/studio/articles" noIndex />
        <PageLayout title={uiLang === 'en' ? 'Article Studio' : 'ستوديو المقالات'}>
          <p>{getSupabaseConfigurationMessage(uiLang)}</p>
        </PageLayout>
      </>
    );
  }

  if (!authChecked) {
    return (
      <>
        <Seo title={uiLang === 'en' ? 'Article Studio' : 'ستوديو المقالات'} description={uiLang === 'en' ? 'Checking access.' : 'جار التحقق من الصلاحية.'} canonicalPath="/studio/articles" noIndex />
        <PageLayout title={uiLang === 'en' ? 'Article Studio' : 'ستوديو المقالات'}>
          <p>{uiLang === 'en' ? 'Checking your access...' : 'جار التحقق من صلاحيتك...'}</p>
        </PageLayout>
      </>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{from: '/studio/articles'}} />;
  }

  if (!isAdmin) {
    return (
      <>
        <Seo title={uiLang === 'en' ? 'Restricted' : 'صفحة مقفولة'} description={uiLang === 'en' ? 'This page is restricted.' : 'هذه الصفحة مقفولة.'} canonicalPath="/studio/articles" noIndex />
        <PageLayout title={uiLang === 'en' ? 'Restricted' : 'صفحة مقفولة'}>
          <p>
            {uiLang === 'en'
              ? 'This studio is restricted to the article admin account only.'
              : 'هذا الاستوديو متاح لحساب مسؤول المقالات فقط.'}
          </p>
          <p>
            {uiLang === 'en' ? 'Signed in as:' : 'أنت مسجل الدخول بالحساب:'} <strong>{user.email}</strong>
          </p>
          <p>
            {uiLang === 'en' ? 'Admin email configured:' : 'إيميل الأدمن المضبوط:'}{' '}
            <strong>{adminEmail || (uiLang === 'en' ? 'not set' : 'غير مضبوط')}</strong>
          </p>
          <p>
            <Link to="/" className="font-semibold text-health-green hover:underline">
              {uiLang === 'en' ? 'Back home' : 'العودة للرئيسية'}
            </Link>
          </p>
        </PageLayout>
      </>
    );
  }

  return (
    <>
      <Seo
        title={uiLang === 'en' ? 'Article Studio' : 'ستوديو المقالات'}
        description={
          uiLang === 'en'
            ? 'Manage and publish PhysioNutrition articles from one secure admin page.'
            : 'أدر وانشر مقالات PhysioNutrition من صفحة أدمن واحدة وآمنة.'
        }
        canonicalPath="/studio/articles"
        noIndex
      />
      <PageLayout title={uiLang === 'en' ? 'Article Studio' : 'ستوديو المقالات'}>
        <div className="space-y-8">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-7 text-slate-700">
            <p>
              {uiLang === 'en'
                ? 'Changes here are drafted locally first, then published to Supabase when you press save. Once published, the homepage, insights page, and article pages update for all visitors.'
                : 'أي تعديل هنا يجهز كمسودة أولًا، ثم يُنشر إلى Supabase عند الضغط على الحفظ. بعد النشر، تتحدث الصفحة الرئيسية وصفحة المقالات وصفحات المقال لكل الزوار.'}
            </p>
            <p>
              {uiLang === 'en'
                ? 'Formatting rules: use `##` for section headings and `*` for bullet points.'
                : 'تنسيق المقال: استخدم `##` للعناوين الفرعية و`*` للنقاط.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setPendingSlug(selectedArticle?.slug ?? null);
                setEditorLang('ar');
              }}
              className={`rounded-full px-4 py-2 text-sm font-bold ${editorLang === 'ar' ? 'bg-health-green text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => {
                setPendingSlug(selectedArticle?.slug ?? null);
                setEditorLang('en');
              }}
              className={`rounded-full px-4 py-2 text-sm font-bold ${editorLang === 'en' ? 'bg-health-green text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              English
            </button>
            <span className="text-sm text-slate-500">{user.email}</span>
            {notice ? <span className="text-sm font-medium text-health-green">{notice}</span> : null}
          </div>

          <div className="grid gap-6 lg:grid-cols-[320px,minmax(0,1fr)]">
            <aside className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={handleAdd} className="rounded-xl bg-health-green px-4 py-2 text-sm font-bold text-white">
                  {uiLang === 'en' ? 'New article' : 'مقال جديد'}
                </button>
                <button type="button" onClick={handleDuplicate} disabled={!selectedArticle} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-50">
                  {uiLang === 'en' ? 'Duplicate' : 'نسخ'}
                </button>
                <button type="button" onClick={handleDelete} disabled={!selectedArticle} className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600 disabled:opacity-50">
                  {uiLang === 'en' ? 'Delete' : 'حذف'}
                </button>
              </div>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={uiLang === 'en' ? 'Search articles...' : 'ابحث عن مقال...'}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-health-green"
              />

              <div className="space-y-2">
                {loadingArticles ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
                    {uiLang === 'en' ? 'Loading articles...' : 'جار تحميل المقالات...'}
                  </div>
                ) : (
                  filteredArticles.map((article) => (
                    <button
                      key={article.id}
                      type="button"
                      onClick={() => setSelectedId(article.id)}
                      className={`w-full rounded-2xl border p-4 text-start transition ${selectedArticle?.id === article.id ? 'border-health-green bg-white shadow-sm' : 'border-slate-200 bg-white/70 hover:border-slate-300'}`}
                    >
                      <div className="mb-1 text-xs text-slate-400">{article.date}</div>
                      <div className="line-clamp-2 font-bold text-slate-900">{article.title}</div>
                      <div className="mt-1 text-xs text-slate-500">{article.slug}</div>
                    </button>
                  ))
                )}
              </div>
            </aside>

            <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6">
              {selectedArticle ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    <div>
                      {matchingOtherLanguageArticle
                        ? uiLang === 'en'
                          ? `Matching ${otherLang.toUpperCase()} version found.`
                          : `نسخة ${otherLang === 'ar' ? 'عربية' : 'إنجليزية'} مرتبطة موجودة.`
                        : uiLang === 'en'
                          ? `No matching ${otherLang.toUpperCase()} version yet.`
                          : `لا توجد نسخة ${otherLang === 'ar' ? 'عربية' : 'إنجليزية'} مرتبطة حتى الآن.`}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`/${editorLang}/insights/${selectedArticle.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-slate-300 px-4 py-2 font-bold text-slate-700"
                      >
                        {uiLang === 'en' ? 'Preview page' : 'معاينة الصفحة'}
                      </a>
                      <button
                        type="button"
                        onClick={switchToOtherLanguageVersion}
                        className="rounded-2xl border border-slate-300 px-4 py-2 font-bold text-slate-700"
                      >
                        {uiLang === 'en'
                          ? `Open ${otherLang.toUpperCase()} editor`
                          : `افتح محرر ${otherLang === 'ar' ? 'العربية' : 'الإنجليزية'}`}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Title' : 'العنوان'}</span>
                      <input value={selectedArticle.title} onChange={(event) => handleFieldChange('title', event.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Slug' : 'الرابط المختصر'}</span>
                      <div className="flex gap-2">
                        <input value={selectedArticle.slug} onChange={(event) => handleFieldChange('slug', event.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                        <button type="button" onClick={() => handleFieldChange('slug', slugifyArticleTitle(selectedArticle.title))} className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700">
                          {uiLang === 'en' ? 'Generate' : 'توليد'}
                        </button>
                      </div>
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Category' : 'التصنيف'}</span>
                      <input value={selectedArticle.category} onChange={(event) => handleFieldChange('category', event.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Date' : 'التاريخ'}</span>
                      <input value={selectedArticle.date} onChange={(event) => handleFieldChange('date', event.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Icon' : 'الأيقونة'}</span>
                      <input value={selectedArticle.icon} onChange={(event) => handleFieldChange('icon', event.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                    </label>
                  </div>

                  <label className="block space-y-2">
                    <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Image URL' : 'رابط الصورة'}</span>
                    <input value={selectedArticle.image || ''} onChange={(event) => handleFieldChange('image', event.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Excerpt' : 'الملخص'}</span>
                    <textarea value={selectedArticle.excerpt} onChange={(event) => handleFieldChange('excerpt', event.target.value)} rows={4} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Content' : 'المحتوى الكامل'}</span>
                    <textarea value={selectedArticle.content} onChange={(event) => handleFieldChange('content', event.target.value)} rows={22} className="w-full rounded-3xl border border-slate-300 px-4 py-4 font-mono text-sm leading-7 outline-none focus:border-health-green" />
                  </label>

                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={handleSave} disabled={saving} className="rounded-2xl bg-health-green px-5 py-3 font-bold text-white disabled:opacity-60">
                      {saving ? (uiLang === 'en' ? 'Publishing...' : 'جار النشر...') : uiLang === 'en' ? 'Publish changes' : 'نشر التعديلات'}
                    </button>
                    <button type="button" onClick={handleExport} className="rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-700">
                      {uiLang === 'en' ? 'Copy JSON' : 'نسخ JSON'}
                    </button>
                    <button type="button" onClick={handleResetLanguage} className="rounded-2xl border border-amber-300 px-5 py-3 font-bold text-amber-700">
                      {uiLang === 'en' ? 'Load defaults' : 'تحميل النسخة الافتراضية'}
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-slate-600">{uiLang === 'en' ? 'Create your first article to begin.' : 'أنشئ أول مقال لتبدأ.'}</p>
              )}
            </section>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="mb-3 text-xl font-bold text-slate-900">{uiLang === 'en' ? 'Import articles' : 'استيراد المقالات'}</h2>
            <p className="mb-4 text-sm leading-7 text-slate-600">
              {uiLang === 'en'
                ? 'Paste a JSON array of articles here if you want to replace the current language in one shot.'
                : 'الصق هنا JSON يحتوي على Array من المقالات إذا أردت استبدال مقالات هذه اللغة دفعة واحدة.'}
            </p>
            <textarea value={importText} onChange={(event) => setImportText(event.target.value)} rows={10} className="w-full rounded-3xl border border-slate-300 px-4 py-4 font-mono text-sm leading-7 outline-none focus:border-health-green" />
            <div className="mt-4">
              <button type="button" onClick={handleImport} className="rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-700">
                {uiLang === 'en' ? 'Import JSON' : 'استيراد JSON'}
              </button>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
