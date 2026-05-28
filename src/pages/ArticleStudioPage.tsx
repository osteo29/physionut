import {useEffect, useMemo, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {Clock3, FileDown, History, Save, Send} from 'lucide-react';
import usePreferredLang from './usePreferredLang';
import PageLayout from './PageLayout';
import Seo from '../components/seo/Seo';
import AdminAccessBoundary from '../components/admin/AdminAccessBoundary';
import AdminShell from '../components/admin/AdminShell';
import {navigationPaths} from '../utils/langUrlHelper';
import {
  createBlankArticle,
  deleteArticleWorkflow,
  getFallbackArticles,
  importFallbackArticlesToSupabase,
  listArticleRevisions,
  loadArticleEditorEntries,
  publishArticles,
  restoreArticleRevision,
  saveArticleDrafts,
  slugifyArticleTitle,
  type ArticleEditorEntry,
  type ArticleRevisionRow,
} from '../services/articleStudio';
import type {Language} from '../services/translations';
import useAdminAccess from '../hooks/useAdminAccess';

type EditableField = keyof Pick<
  ArticleEditorEntry,
  | 'title'
  | 'slug'
  | 'excerpt'
  | 'content'
  | 'category'
  | 'date'
  | 'icon'
  | 'image'
  | 'imageAlt'
  | 'seoTitle'
  | 'seoDescription'
  | 'ogImage'
  | 'canonicalUrl'
  | 'scheduledFor'
>;

const STATUS_LABELS: Record<ArticleEditorEntry['status'], {en: string; ar: string}> = {
  draft: {en: 'Draft', ar: 'مسودة'},
  published: {en: 'Published', ar: 'منشور'},
  scheduled: {en: 'Scheduled', ar: 'مجدول'},
};

function normalizeImportedArticle(
  lang: Language,
  item: Partial<ArticleEditorEntry>,
  fallbackId: number,
): ArticleEditorEntry {
  const title = (typeof item.title === 'string' && item.title.trim()) || (lang === 'en' ? 'Untitled article' : 'مقال بدون عنوان');
  const excerpt =
    typeof item.excerpt === 'string' && item.excerpt.trim()
      ? item.excerpt
      : lang === 'en'
        ? 'Short summary for article cards and previews.'
        : 'ملخص قصير لبطاقات المقال ومعاينات البحث.';

  return {
    id: typeof item.id === 'number' ? item.id : fallbackId,
    workflowId: typeof item.workflowId === 'string' ? item.workflowId : undefined,
    slug:
      (typeof item.slug === 'string' && item.slug.trim()) ||
      slugifyArticleTitle(title) ||
      (lang === 'en' ? `article-${fallbackId}` : `maqal-${fallbackId}`),
    title,
    excerpt,
    content: typeof item.content === 'string' ? item.content : '',
    category:
      (typeof item.category === 'string' && item.category.trim()) || (lang === 'en' ? 'General' : 'عام'),
    date: typeof item.date === 'string' && item.date ? item.date : new Date().toISOString().slice(0, 10),
    icon: (typeof item.icon === 'string' && item.icon.trim()) || 'BookOpen',
    image: typeof item.image === 'string' ? item.image : undefined,
    tags: Array.isArray(item.tags) ? item.tags.filter((tag): tag is string => typeof tag === 'string' && Boolean(tag.trim())) : [],
    imageAlt: typeof item.imageAlt === 'string' ? item.imageAlt : '',
    seoTitle: typeof item.seoTitle === 'string' && item.seoTitle.trim() ? item.seoTitle : title,
    seoDescription:
      typeof item.seoDescription === 'string' && item.seoDescription.trim() ? item.seoDescription : excerpt,
    ogImage: typeof item.ogImage === 'string' ? item.ogImage : typeof item.image === 'string' ? item.image : undefined,
    canonicalUrl: typeof item.canonicalUrl === 'string' ? item.canonicalUrl : '',
    status: item.status === 'published' || item.status === 'scheduled' ? item.status : 'draft',
    scheduledFor: typeof item.scheduledFor === 'string' ? item.scheduledFor : '',
    publishedAt: typeof item.publishedAt === 'string' ? item.publishedAt : undefined,
    lastSavedAt: typeof item.lastSavedAt === 'string' ? item.lastSavedAt : undefined,
    revisionCount: typeof item.revisionCount === 'number' ? item.revisionCount : 0,
  };
}

export default function ArticleStudioPage() {
  const uiLang = usePreferredLang();
  const access = useAdminAccess(uiLang);
  const [editorLang, setEditorLang] = useState<Language>(uiLang);
  const [articles, setArticles] = useState<ArticleEditorEntry[]>([]);
  const [otherLangArticles, setOtherLangArticles] = useState<ArticleEditorEntry[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [importText, setImportText] = useState('');
  const [notice, setNotice] = useState('');
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [savingDrafts, setSavingDrafts] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [importingLegacy, setImportingLegacy] = useState(false);
  const [loadingRevisions, setLoadingRevisions] = useState(false);
  const [revisions, setRevisions] = useState<ArticleRevisionRow[]>([]);
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  const isAr = uiLang === 'ar';
  const otherLang: Language = editorLang === 'ar' ? 'en' : 'ar';
  const user = access.user;
  const authChecked = access.authChecked;
  const isAdmin = access.canManageArticles;
  const isSupabaseConfigured = access.isSupabaseConfigured;

  useEffect(() => {
    let active = true;

    const refresh = async () => {
      setLoadingArticles(true);
      const [nextArticles, nextOtherLangArticles] = await Promise.all([
        loadArticleEditorEntries(editorLang),
        loadArticleEditorEntries(otherLang),
      ]);

      if (!active) return;

      setArticles(nextArticles);
      setOtherLangArticles(nextOtherLangArticles);
      const matchedArticle = pendingSlug ? nextArticles.find((article) => article.slug === pendingSlug) : null;
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
      [article.title, article.slug, article.category, article.status, article.tags.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [articles, search]);

  useEffect(() => {
    let active = true;

    const refreshRevisions = async () => {
      if (!selectedArticle?.slug) {
        setRevisions([]);
        return;
      }

      setLoadingRevisions(true);
      try {
        const nextRevisions = await listArticleRevisions(editorLang, selectedArticle.slug);
        if (!active) return;
        setRevisions(nextRevisions);
      } catch {
        if (!active) return;
        setRevisions([]);
      } finally {
        if (active) setLoadingRevisions(false);
      }
    };

    void refreshRevisions();
    return () => {
      active = false;
    };
  }, [editorLang, selectedArticle?.slug]);

  const updateArticles = (nextArticles: ArticleEditorEntry[], nextSelectedId?: number | null, message?: string) => {
    setArticles(nextArticles);
    setSelectedId(nextSelectedId ?? nextArticles[0]?.id ?? null);
    if (message) setNotice(message);
  };

  const handleFieldChange = (field: EditableField, value: string) => {
    if (!selectedArticle) return;

    setArticles((current) =>
      current.map((article) => (article.id === selectedArticle.id ? {...article, [field]: value} : article)),
    );
  };

  const handleTagsChange = (value: string) => {
    if (!selectedArticle) return;

    const tags = value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    setArticles((current) =>
      current.map((article) => (article.id === selectedArticle.id ? {...article, tags} : article)),
    );
  };

  const handleStatusChange = (status: ArticleEditorEntry['status']) => {
    if (!selectedArticle) return;

    setArticles((current) =>
      current.map((article) =>
        article.id === selectedArticle.id
          ? {
              ...article,
              status,
              scheduledFor: status === 'scheduled' ? article.scheduledFor || new Date().toISOString().slice(0, 16) : '',
            }
          : article,
      ),
    );
  };

  const handleSaveDrafts = async () => {
    try {
      setSavingDrafts(true);
      await saveArticleDrafts(editorLang, articles, 'Saved from article studio');
      const nextArticles = await loadArticleEditorEntries(editorLang);
      const refreshedSelection = selectedArticle?.slug
        ? nextArticles.find((article) => article.slug === selectedArticle.slug)
        : nextArticles[0];

      setArticles(nextArticles);
      setSelectedId(refreshedSelection?.id ?? nextArticles[0]?.id ?? null);
      setNotice(isAr ? 'تم حفظ المسودات بنجاح.' : 'Drafts saved successfully.');
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : isAr
            ? 'تعذر حفظ المسودات الآن.'
            : 'Could not save drafts right now.',
      );
    } finally {
      setSavingDrafts(false);
    }
  };

  const handlePublish = async () => {
    try {
      setPublishing(true);
      await publishArticles(editorLang, articles);
      const nextArticles = await loadArticleEditorEntries(editorLang);
      const refreshedSelection = selectedArticle?.slug
        ? nextArticles.find((article) => article.slug === selectedArticle.slug)
        : nextArticles[0];

      setArticles(nextArticles);
      setSelectedId(refreshedSelection?.id ?? nextArticles[0]?.id ?? null);
      setNotice(isAr ? 'تم نشر المقالات الجاهزة للزوار.' : 'Ready articles were published for visitors.');
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : isAr
            ? 'تعذر نشر المقالات الآن.'
            : 'Could not publish articles right now.',
      );
    } finally {
      setPublishing(false);
    }
  };

  const handleAdd = () => {
    const article = createBlankArticle(editorLang, articles);
    updateArticles(
      [article, ...articles],
      article.id,
      isAr ? 'تم إنشاء مقال جديد كمسودة.' : 'New article created as a draft.',
    );
  };

  const handleDelete = async () => {
    if (!selectedArticle) return;

    const confirmed = window.confirm(
      isAr ? `حذف المقال "${selectedArticle.title}" من المسودات والنشر؟` : `Delete "${selectedArticle.title}" from drafts and live content?`,
    );
    if (!confirmed) return;

    try {
      if (selectedArticle.workflowId) {
        await deleteArticleWorkflow(editorLang, selectedArticle.slug);
      }

      const nextArticles = articles.filter((article) => article.id !== selectedArticle.id);
      updateArticles(
        nextArticles,
        nextArticles[0]?.id ?? null,
        isAr ? 'تم حذف المقال.' : 'Article deleted.',
      );
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : isAr
            ? 'تعذر حذف المقال الآن.'
            : 'Could not delete the article right now.',
      );
    }
  };

  const handleDuplicate = () => {
    if (!selectedArticle) return;

    const nextId = articles.reduce((max, article) => Math.max(max, article.id), 0) + 1;
    const duplicate: ArticleEditorEntry = {
      ...selectedArticle,
      id: nextId,
      workflowId: undefined,
      slug: `${selectedArticle.slug}-copy`,
      title: `${selectedArticle.title}${editorLang === 'en' ? ' Copy' : ' نسخة'}`,
      status: 'draft',
      scheduledFor: '',
      publishedAt: undefined,
      lastSavedAt: undefined,
      revisionCount: 0,
    };

    updateArticles(
      [duplicate, ...articles],
      duplicate.id,
      isAr ? 'تم إنشاء نسخة جديدة من المقال.' : 'Article duplicated into a new draft.',
    );
  };

  const switchToOtherLanguageVersion = () => {
    if (!selectedArticle) return;
    setPendingSlug(selectedArticle.slug);
    setEditorLang(otherLang);
  };

  const handleResetLanguage = async () => {
    const fallback = (await getFallbackArticles(editorLang)).map((article, index) =>
      normalizeImportedArticle(editorLang, article, index + 1),
    );

    updateArticles(
      fallback,
      fallback[0]?.id ?? null,
      isAr ? 'تم تحميل النسخة الافتراضية. احفظها كمسودة أو انشرها.' : 'Default content loaded. Save it as drafts or publish it.',
    );
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText) as Partial<ArticleEditorEntry>[];
      if (!Array.isArray(parsed)) throw new Error('Invalid format');

      const normalized = parsed.map((item, index) => normalizeImportedArticle(editorLang, item, index + 1));
      updateArticles(
        normalized,
        normalized[0]?.id ?? null,
        isAr ? 'تم استيراد المقالات إلى المسودات الحالية.' : 'Articles imported into the current drafts.',
      );
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
      setNotice(
        isAr
          ? 'تم وضع JSON في مربع الاستيراد لأن النسخ المباشر لم ينجح.'
          : 'JSON was placed in the import box because clipboard copy failed.',
      );
    }
  };

  const handleImportLegacyArticles = async () => {
    const confirmed = window.confirm(
      uiLang === 'en'
        ? `Import legacy ${editorLang.toUpperCase()} articles to Supabase now?`
        : `استيراد مقالات ${editorLang === 'ar' ? 'العربية' : 'الإنجليزية'} القديمة إلى Supabase الآن؟`,
    );

    if (!confirmed) return;

    try {
      setImportingLegacy(true);
      const imported = await importFallbackArticlesToSupabase(editorLang);
      const nextArticles = imported.map((article, index) => normalizeImportedArticle(editorLang, article, index + 1));
      setArticles(nextArticles);
      setSelectedId(nextArticles[0]?.id ?? null);
      setNotice(
        uiLang === 'en'
          ? `Imported ${nextArticles.length} legacy ${editorLang.toUpperCase()} articles to Supabase.`
          : `تم استيراد ${nextArticles.length} من مقالات ${editorLang === 'ar' ? 'العربية' : 'الإنجليزية'} القديمة إلى Supabase.`,
      );
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : uiLang === 'en'
            ? 'Legacy article import failed.'
            : 'فشل استيراد المقالات القديمة.',
      );
    } finally {
      setImportingLegacy(false);
    }
  };

  const handleRestoreRevision = async (revisionId: string) => {
    try {
      const restoredEntry = await restoreArticleRevision(editorLang, revisionId);
      const nextArticles = await loadArticleEditorEntries(editorLang);
      const refreshedSelection = nextArticles.find((article) => article.slug === restoredEntry.slug);

      setArticles(nextArticles);
      setSelectedId(refreshedSelection?.id ?? nextArticles[0]?.id ?? null);
      setNotice(isAr ? 'تمت استعادة النسخة المحددة كمسودة جديدة.' : 'Selected revision restored as a new draft.');
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : isAr
            ? 'تعذر استعادة النسخة الآن.'
            : 'Could not restore the revision right now.',
      );
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <>
        <Seo title={uiLang === 'en' ? 'Article Studio' : 'ستوديو المقالات'} description={access.configMessage} canonicalPath="/admin/articles" noIndex />
        <PageLayout title={uiLang === 'en' ? 'Article Studio' : 'ستوديو المقالات'}>
          <p>{access.configMessage}</p>
        </PageLayout>
      </>
    );
  }

  if (!authChecked) {
    return (
      <>
        <Seo
          title={uiLang === 'en' ? 'Article Studio' : 'ستوديو المقالات'}
          description={uiLang === 'en' ? 'Checking access.' : 'جار التحقق من الصلاحية.'}
          canonicalPath="/admin/articles"
          noIndex
        />
        <PageLayout title={uiLang === 'en' ? 'Article Studio' : 'ستوديو المقالات'}>
          <p>{uiLang === 'en' ? 'Checking your access...' : 'جار التحقق من صلاحيتك...'}</p>
        </PageLayout>
      </>
    );
  }

  if (!user) {
    return <Navigate to={navigationPaths.auth(uiLang)} replace state={{from: navigationPaths.adminArticles(uiLang)}} />;
  }

  if (!isAdmin) {
    return (
      <>
        <Seo
          title={uiLang === 'en' ? 'Restricted' : 'صفحة مقفولة'}
          description={uiLang === 'en' ? 'This page is restricted.' : 'هذه الصفحة مقفولة.'}
          canonicalPath="/admin/articles"
          noIndex
        />
        <PageLayout title={uiLang === 'en' ? 'Restricted' : 'صفحة مقفولة'}>
          <p>{uiLang === 'en' ? 'This studio is restricted to article managers.' : 'هذا الاستوديو متاح فقط لمديري المقالات.'}</p>
          <p>
            {uiLang === 'en' ? 'Signed in as:' : 'أنت مسجل الدخول بالحساب:'} <strong>{user.email}</strong>
          </p>
          <p>
            {uiLang === 'en' ? 'Current role:' : 'دورك الحالي:'} <strong>{access.adminRole}</strong>
          </p>
          <p>
            <Link to={navigationPaths.home(uiLang)} className="font-semibold text-health-green hover:underline">
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
            ? 'Manage article drafts, scheduling, SEO data, and publishing from one secure admin page.'
            : 'أدر مسودات المقالات والجدولة وبيانات السيو والنشر من صفحة أدمن واحدة وآمنة.'
        }
        canonicalPath="/admin/articles"
        noIndex
      />
      <AdminAccessBoundary
        access={access}
        lang={uiLang}
        title={uiLang === 'en' ? 'Article Studio' : 'ستوديو المقالات'}
        canonicalPath="/admin/articles"
        requiredPermission="articles"
      >
        <AdminShell
          title={uiLang === 'en' ? 'Article CMS' : 'إدارة المقالات'}
          description={
            uiLang === 'en'
              ? 'Draft, review, schedule, and publish article content to Supabase from one structured admin workspace.'
              : 'حرر المقالات كمسودات، راجعها، جدولها، ثم انشرها إلى Supabase من مساحة إدارة منظمة.'
          }
          currentTab="articles"
          user={user}
          adminRole={access.adminRole}
          canManageInjuries={access.canManageInjuries}
          canManageArticles={access.canManageArticles}
          canManageSeo={access.canManageSeo}
          canManageHomepage={access.canManageHomepage}
          canManageExercises={access.canManageExercises}
          canManageUsers={access.canManageUsers}
        >
          <div className="space-y-8">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-7 text-slate-700">
              <p>
                {uiLang === 'en'
                  ? 'This screen now manages article drafts, publishing status, schedule timing, and revision history. Drafts stay internal until you publish them.'
                  : 'هذه الشاشة تدير الآن مسودات المقالات، وحالة النشر، وموعد الجدولة، وسجل المراجعات. تظل المسودات داخلية حتى تقوم بنشرها.'}
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
              <button
                type="button"
                onClick={() => void handleImportLegacyArticles()}
                disabled={importingLegacy}
                className="rounded-2xl border border-amber-300 px-4 py-2 text-sm font-bold text-amber-700 disabled:opacity-60"
              >
                <FileDown className="mr-2 inline h-4 w-4" />
                {importingLegacy
                  ? uiLang === 'en'
                    ? 'Importing...'
                    : 'جار الاستيراد...'
                  : uiLang === 'en'
                    ? `Import ${editorLang.toUpperCase()} legacy articles`
                    : `استيراد مقالات ${editorLang === 'ar' ? 'العربية' : 'الإنجليزية'} القديمة`}
              </button>
              <span className="text-sm text-slate-500">{user?.email}</span>
              {notice ? <span className="text-sm font-medium text-health-green">{notice}</span> : null}
            </div>

            <div className="grid gap-6 xl:grid-cols-[320px,minmax(0,1fr),280px]">
              <aside className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={handleAdd} className="rounded-xl bg-health-green px-4 py-2 text-sm font-bold text-white">
                    {uiLang === 'en' ? 'New article' : 'مقال جديد'}
                  </button>
                  <button type="button" onClick={handleDuplicate} disabled={!selectedArticle} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-50">
                    {uiLang === 'en' ? 'Duplicate' : 'نسخ'}
                  </button>
                  <button type="button" onClick={() => void handleDelete()} disabled={!selectedArticle} className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600 disabled:opacity-50">
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
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <span className="text-xs text-slate-400">{article.date}</span>
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                            {STATUS_LABELS[article.status][uiLang]}
                          </span>
                        </div>
                        <div className="line-clamp-2 font-bold text-slate-900">{article.title}</div>
                        <div className="mt-1 text-xs text-slate-500">{article.slug}</div>
                        <div className="mt-2 text-xs text-slate-400">
                          {article.revisionCount} {uiLang === 'en' ? 'revisions' : 'مراجعات'}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </aside>

              <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6">
                {selectedArticle ? (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <div className="space-y-1">
                        <div>
                          {matchingOtherLanguageArticle
                            ? uiLang === 'en'
                              ? `Matching ${otherLang.toUpperCase()} version found.`
                              : `نسخة ${otherLang === 'ar' ? 'عربية' : 'إنجليزية'} مرتبطة موجودة.`
                            : uiLang === 'en'
                              ? `No matching ${otherLang.toUpperCase()} version yet.`
                              : `لا توجد نسخة ${otherLang === 'ar' ? 'عربية' : 'إنجليزية'} مرتبطة حتى الآن.`}
                        </div>
                        <div className="text-xs text-slate-500">
                          {uiLang === 'en' ? 'Last saved:' : 'آخر حفظ:'} {selectedArticle.lastSavedAt || (uiLang === 'en' ? 'Not yet' : 'ليس بعد')}
                        </div>
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
                          {uiLang === 'en' ? `Open ${otherLang.toUpperCase()} editor` : `افتح محرر ${otherLang === 'ar' ? 'العربية' : 'الإنجليزية'}`}
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

                    <div className="grid gap-4 md:grid-cols-4">
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
                      <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Status' : 'الحالة'}</span>
                        <select value={selectedArticle.status} onChange={(event) => handleStatusChange(event.target.value as ArticleEditorEntry['status'])} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green">
                          <option value="draft">{STATUS_LABELS.draft[uiLang]}</option>
                          <option value="published">{STATUS_LABELS.published[uiLang]}</option>
                          <option value="scheduled">{STATUS_LABELS.scheduled[uiLang]}</option>
                        </select>
                      </label>
                    </div>

                    {selectedArticle.status === 'scheduled' ? (
                      <label className="block space-y-2">
                        <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Scheduled for' : 'موعد النشر'}</span>
                        <input
                          type="datetime-local"
                          value={selectedArticle.scheduledFor || ''}
                          onChange={(event) => handleFieldChange('scheduledFor', event.target.value)}
                          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green"
                        />
                      </label>
                    ) : null}

                    <label className="block space-y-2">
                      <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Image URL' : 'رابط الصورة'}</span>
                      <input value={selectedArticle.image || ''} onChange={(event) => handleFieldChange('image', event.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                    </label>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Image alt text' : 'النص البديل للصورة'}</span>
                        <input value={selectedArticle.imageAlt} onChange={(event) => handleFieldChange('imageAlt', event.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      </label>
                      <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Tags' : 'الوسوم'}</span>
                        <input value={selectedArticle.tags.join(', ')} onChange={(event) => handleTagsChange(event.target.value)} placeholder={uiLang === 'en' ? 'rehab, posture, recovery' : 'تأهيل، وضعية، تعافي'} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      </label>
                    </div>

                    <label className="block space-y-2">
                      <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Excerpt' : 'الملخص'}</span>
                      <textarea value={selectedArticle.excerpt} onChange={(event) => handleFieldChange('excerpt', event.target.value)} rows={4} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                    </label>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'SEO title' : 'عنوان السيو'}</span>
                        <input value={selectedArticle.seoTitle} onChange={(event) => handleFieldChange('seoTitle', event.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      </label>
                      <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Canonical URL' : 'الرابط القانوني'}</span>
                        <input value={selectedArticle.canonicalUrl || ''} onChange={(event) => handleFieldChange('canonicalUrl', event.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'SEO description' : 'وصف السيو'}</span>
                        <textarea value={selectedArticle.seoDescription} onChange={(event) => handleFieldChange('seoDescription', event.target.value)} rows={4} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      </label>
                      <label className="space-y-2">
                        <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'OG image URL' : 'رابط صورة OG'}</span>
                        <input value={selectedArticle.ogImage || ''} onChange={(event) => handleFieldChange('ogImage', event.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      </label>
                    </div>

                    <label className="block space-y-2">
                      <span className="text-sm font-bold text-slate-700">{uiLang === 'en' ? 'Content' : 'المحتوى الكامل'}</span>
                      <textarea value={selectedArticle.content} onChange={(event) => handleFieldChange('content', event.target.value)} rows={22} className="w-full rounded-3xl border border-slate-300 px-4 py-4 font-mono text-sm leading-7 outline-none focus:border-health-green" />
                    </label>

                    <div className="flex flex-wrap gap-3">
                      <button type="button" onClick={() => void handleSaveDrafts()} disabled={savingDrafts || publishing} className="rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white disabled:opacity-60">
                        <Save className="mr-2 inline h-4 w-4" />
                        {savingDrafts ? (uiLang === 'en' ? 'Saving...' : 'جار الحفظ...') : uiLang === 'en' ? 'Save drafts' : 'حفظ المسودات'}
                      </button>
                      <button type="button" onClick={() => void handlePublish()} disabled={publishing || savingDrafts} className="rounded-2xl bg-health-green px-5 py-3 font-bold text-white disabled:opacity-60">
                        <Send className="mr-2 inline h-4 w-4" />
                        {publishing ? (uiLang === 'en' ? 'Publishing...' : 'جار النشر...') : uiLang === 'en' ? 'Publish ready items' : 'نشر الجاهز للزوار'}
                      </button>
                      <button type="button" onClick={handleExport} className="rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-700">
                        {uiLang === 'en' ? 'Copy JSON' : 'نسخ JSON'}
                      </button>
                      <button type="button" onClick={() => void handleResetLanguage()} className="rounded-2xl border border-amber-300 px-5 py-3 font-bold text-amber-700">
                        {uiLang === 'en' ? 'Load defaults' : 'تحميل النسخة الافتراضية'}
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-600">{uiLang === 'en' ? 'Create your first article to begin.' : 'أنشئ أول مقال لتبدأ.'}</p>
                )}
              </section>

              <aside className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Clock3 className="h-4 w-4" />
                    {uiLang === 'en' ? 'Publishing snapshot' : 'ملخص النشر'}
                  </div>
                  {selectedArticle ? (
                    <div className="space-y-2 text-sm text-slate-600">
                      <p>
                        {uiLang === 'en' ? 'Status:' : 'الحالة:'} <strong>{STATUS_LABELS[selectedArticle.status][uiLang]}</strong>
                      </p>
                      <p>
                        {uiLang === 'en' ? 'Scheduled for:' : 'موعد النشر:'}{' '}
                        <strong>{selectedArticle.scheduledFor || (uiLang === 'en' ? 'Not scheduled' : 'غير مجدول')}</strong>
                      </p>
                      <p>
                        {uiLang === 'en' ? 'Revisions:' : 'عدد المراجعات:'} <strong>{selectedArticle.revisionCount}</strong>
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">{uiLang === 'en' ? 'Select an article first.' : 'اختر مقالًا أولًا.'}</p>
                  )}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
                    <History className="h-4 w-4" />
                    {uiLang === 'en' ? 'Revision history' : 'سجل المراجعات'}
                  </div>

                  {loadingRevisions ? (
                    <p className="text-sm text-slate-500">{uiLang === 'en' ? 'Loading revisions...' : 'جار تحميل المراجعات...'}</p>
                  ) : revisions.length ? (
                    <div className="space-y-2">
                      {revisions.map((revision) => (
                        <div key={revision.id} className="rounded-2xl border border-slate-200 p-3 text-sm text-slate-600">
                          <div className="flex items-center justify-between gap-2">
                            <strong>#{revision.revision_number}</strong>
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                              {STATUS_LABELS[revision.status][uiLang]}
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-slate-400">{revision.created_at}</div>
                          <div className="mt-2 text-xs text-slate-500">
                            {revision.change_note || (uiLang === 'en' ? 'No note provided.' : 'لا توجد ملاحظة.')}
                          </div>
                          <button type="button" onClick={() => void handleRestoreRevision(revision.id)} className="mt-3 rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700">
                            {uiLang === 'en' ? 'Restore as draft' : 'استعادة كمسودة'}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">{uiLang === 'en' ? 'No revisions recorded yet.' : 'لا توجد مراجعات مسجلة بعد.'}</p>
                  )}
                </div>
              </aside>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-3 text-xl font-bold text-slate-900">{uiLang === 'en' ? 'Import articles' : 'استيراد المقالات'}</h2>
              <p className="mb-4 text-sm leading-7 text-slate-600">
                {uiLang === 'en'
                  ? 'Paste a JSON array of article entries here if you want to replace the current language draft set in one shot.'
                  : 'الصق هنا JSON يحتوي على Array من المقالات إذا أردت استبدال مسودات هذه اللغة دفعة واحدة.'}
              </p>
              <textarea value={importText} onChange={(event) => setImportText(event.target.value)} rows={10} className="w-full rounded-3xl border border-slate-300 px-4 py-4 font-mono text-sm leading-7 outline-none focus:border-health-green" />
              <div className="mt-4">
                <button type="button" onClick={handleImport} className="rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-700">
                  {uiLang === 'en' ? 'Import JSON' : 'استيراد JSON'}
                </button>
              </div>
            </div>
          </div>
        </AdminShell>
      </AdminAccessBoundary>
    </>
  );
}
