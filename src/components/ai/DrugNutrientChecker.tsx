import {useMemo, useState} from 'react';
import {motion} from 'motion/react';
import {AlertOctagon, AlertTriangle, CheckCircle2, Search} from 'lucide-react';
import {askGeminiText, trackAiQuestion} from '../../ai/gemini';

type ResultCard = {
  status: 'Danger' | 'Caution' | 'Safe' | 'Unclear';
  summary: string;
  interactions: string[];
  practicalAdvice: string[];
};

function safeParseJson(text: string): any | null {
  const trimmed = text.trim();
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(trimmed.slice(start, end + 1));
  } catch {
    return null;
  }
}

export default function DrugNutrientChecker({lang}: {lang: 'en' | 'ar'}) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResultCard | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSearch = useMemo(() => query.trim().length >= 3 && !isLoading, [query, isLoading]);

  const run = async () => {
    const q = query.trim();
    if (!q || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    trackAiQuestion(q, {source: 'drug_nutrient_checker'});

    try {
      const text = await askGeminiText({
        system:
          'You are a clinical pharmacist and clinical nutritionist. Identify clinically relevant drug–nutrient and drug–food interactions. Be cautious, do not diagnose, and recommend consulting a pharmacist/doctor for decisions.',
        user: `Drug/Nutrient check for: ${q}\nReturn STRICT JSON with keys: status ("Danger"|"Caution"|"Safe"|"Unclear"), summary (string), interactions (string[]), practicalAdvice (string[]).`,
        hiddenContext: `Language: ${lang}`,
      });

      const parsed = safeParseJson(text);
      if (!parsed) {
        setResult({
          status: 'Unclear',
          summary:
            lang === 'en'
              ? 'Could not parse a structured response. Please try a different drug name.'
              : 'تعذّر استخراج نتيجة منظمة. جرّب كتابة اسم الدواء بشكل مختلف.',
          interactions: [],
          practicalAdvice: [],
        });
      } else {
        setResult({
          status: parsed.status || 'Unclear',
          summary: parsed.summary || '',
          interactions: Array.isArray(parsed.interactions) ? parsed.interactions : [],
          practicalAdvice: Array.isArray(parsed.practicalAdvice) ? parsed.practicalAdvice : [],
        });
      }
    } catch (e: any) {
      setError(e?.message || 'AI error');
    } finally {
      setIsLoading(false);
    }
  };

  const cardTone =
    result?.status === 'Danger'
      ? {bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-800', icon: AlertOctagon}
      : result?.status === 'Caution'
        ? {bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', icon: AlertTriangle}
        : result?.status === 'Safe'
          ? {bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', icon: CheckCircle2}
          : {bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', icon: AlertTriangle};

  const Icon = cardTone.icon;

  return (
    <section id="drug-nutrient-checker" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900">Drug‑Nutrient Checker</h2>
            <p className="text-slate-600 mt-2 max-w-2xl">
              {lang === 'en'
                ? 'Check common food/supplement interactions for a medication name.'
                : 'تحقق من تداخلات الطعام/المكملات الشائعة مع اسم دواء.'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  lang === 'en'
                    ? 'Example: Grapefruit and Statins • Warfarin • ACE inhibitors'
                    : 'مثال: الجريب فروت والستاتينات • وارفارين • مثبطات ACE'
                }
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-medical-blue/30"
              />
            </div>
            <button
              onClick={run}
              disabled={!canSearch}
              className={`px-6 py-4 rounded-2xl font-black transition-all ${
                canSearch ? 'bg-medical-blue text-white hover:bg-medical-blue/90' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {isLoading ? (lang === 'en' ? 'Checking…' : 'جارٍ الفحص…') : (lang === 'en' ? 'Check' : 'افحص')}
            </button>
          </div>

          <div className="mt-4 text-[11px] text-slate-500">
            {lang === 'en'
              ? 'This is for informational purposes only. Consult your pharmacist or doctor.'
              : 'للاطلاع فقط. استشر الصيدلي أو الطبيب.'}
          </div>

          {error && <div className="mt-6 text-rose-600 font-semibold text-sm">{error}</div>}

          {isLoading && (
            <div className="mt-8 animate-pulse">
              <div className="h-5 w-48 bg-slate-200 rounded mb-4" />
              <div className="h-4 w-full bg-slate-200 rounded mb-2" />
              <div className="h-4 w-5/6 bg-slate-200 rounded mb-2" />
              <div className="h-4 w-2/3 bg-slate-200 rounded" />
            </div>
          )}

          {result && (
            <motion.div
              initial={{opacity: 0, y: 10, scale: 0.98}}
              animate={{opacity: 1, y: 0, scale: 1}}
              transition={{type: 'spring', stiffness: 240, damping: 22}}
              className={`mt-8 rounded-3xl border ${cardTone.border} ${cardTone.bg} p-6`}
            >
              <div className={`flex items-start gap-3 ${cardTone.text}`}>
                <Icon className="w-6 h-6 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-black uppercase tracking-widest">
                    {result.status === 'Danger'
                      ? lang === 'en'
                        ? 'Danger'
                        : 'خطر'
                      : result.status === 'Caution'
                        ? lang === 'en'
                          ? 'Caution'
                          : 'تحذير'
                        : result.status === 'Safe'
                          ? lang === 'en'
                            ? 'Safe'
                            : 'آمن'
                          : lang === 'en'
                            ? 'Unclear'
                            : 'غير واضح'}
                  </div>
                  <div className="mt-2 text-sm text-slate-800">{result.summary}</div>
                </div>
              </div>

              {result.interactions.length > 0 && (
                <div className="mt-5">
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                    {lang === 'en' ? 'Potential interactions' : 'تداخلات محتملة'}
                  </div>
                  <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                    {result.interactions.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.practicalAdvice.length > 0 && (
                <div className="mt-5">
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                    {lang === 'en' ? 'Practical advice' : 'نصائح عملية'}
                  </div>
                  <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                    {result.practicalAdvice.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

