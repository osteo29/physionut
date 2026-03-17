import {memo, type ComponentType} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {Calendar, ChevronRight, GraduationCap, Info, Tag, X} from 'lucide-react';
import type {Language} from '../../services/translations';
import type {Article} from '../../services/articles';

type IconComponentType = ComponentType<{name: string; className?: string}>;

const BlogSection = memo(
  ({
    t,
    lang,
    articles,
    selectedArticle,
    setSelectedArticle,
    IconComponent,
  }: {
    t: any;
    lang: Language;
    articles: Article[];
    selectedArticle: Article | null;
    setSelectedArticle: (article: Article | null) => void;
    IconComponent: IconComponentType;
  }) => {
    return (
      <>
        <section id="blog" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {t.blog.sectionTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.length === 0 ? (
                <div className="md:col-span-2 lg:col-span-3 bg-white rounded-3xl border border-slate-100 p-10 text-center text-slate-500">
                  <div className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">
                    {lang === 'en' ? 'Coming Soon' : 'قريباً'}
                  </div>
                  <p className="max-w-2xl mx-auto">
                    {lang === 'en'
                      ? 'Evidence-based articles will be published here soon.'
                      : 'سيتم نشر مقالات مبنية على الأدلة هنا قريبًا.'}
                  </p>
                </div>
              ) : (
                articles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                  >
                    <div className="aspect-video bg-soft-blue relative overflow-hidden flex items-center justify-center">
                      <div className="p-6 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <IconComponent
                          name={article.icon}
                          className="w-12 h-12 text-health-green"
                        />
                      </div>
                      <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-health-green text-xs font-bold shadow-sm flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                        <Calendar className="w-3 h-3" /> {article.date}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-health-green transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="inline-flex items-center gap-2 text-health-green font-bold hover:underline"
                      >
                        {t.blog.readMore}{' '}
                        <ChevronRight
                          className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Article Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                onClick={() => setSelectedArticle(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{opacity: 0, scale: 0.9, y: 20}}
                animate={{opacity: 1, scale: 1, y: 0}}
                exit={{opacity: 0, scale: 0.9, y: 20}}
                className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              >
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-600 hover:text-slate-900 shadow-sm"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="overflow-y-auto">
                  <div className="aspect-video relative bg-soft-blue">
                    {selectedArticle.image ? (
                      <img
                        src={selectedArticle.image}
                        alt={selectedArticle.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="p-6 bg-white rounded-2xl shadow-sm">
                          <IconComponent
                            name={selectedArticle.icon}
                            className="w-12 h-12 text-health-green"
                          />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-6 left-8 rtl:left-auto rtl:right-8 text-white">
                      <span className="px-3 py-1 rounded-full bg-health-green text-xs font-bold mb-3 inline-block">
                        {selectedArticle.category}
                      </span>
                      <h2 className="text-3xl font-bold">{selectedArticle.title}</h2>
                    </div>
                  </div>

                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-4 text-slate-400 text-sm mb-8 pb-8 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {selectedArticle.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />{' '}
                        {lang === 'en' ? 'Verified Content' : 'محتوى موثق'}
                      </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                      <h3 className="text-lg text-slate-600 leading-relaxed mb-6 font-medium italic">
                        {selectedArticle.excerpt}
                      </h3>
                      <div className="text-slate-700 leading-loose text-lg space-y-4">
                        {selectedArticle.content}
                      </div>
                    </div>

                    <div className="mt-12 p-6 bg-soft-blue rounded-2xl border border-health-green/10">
                      <div className="flex gap-4">
                        <Info className="w-6 h-6 text-health-green shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-slate-900 mb-2">
                            {lang === 'en' ? 'Clinical Reference' : 'مرجع سريري'}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {lang === 'en'
                              ? 'This article is based on current clinical guidelines and peer-reviewed research in physical therapy.'
                              : 'تستند هذه المقالة إلى الإرشادات السريرية الحالية والأبحاث المحكمة في العلاج الطبيعي.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  },
);

BlogSection.displayName = 'BlogSection';

export default BlogSection;

