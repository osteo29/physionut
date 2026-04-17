import {useMemo, useState, type ChangeEvent} from 'react';
import {FileUp, ListChecks, UploadCloud} from 'lucide-react';
import type {User} from '@supabase/supabase-js';
import {
  parseInjuryProtocolText,
  summarizeImportedProtocols,
  type ImportedInjuryProtocol,
} from '../../services/injuryProtocolImport';
import {getInjuriesMissingImportedExerciseProtocols} from '../../services/injuryProtocolCoverage';
import {getInjuriesMissingNutritionPlans} from '../../services/injuryNutritionCoverage';
import {importExerciseProtocolsToSupabase} from '../../services/injurySupabaseService';

type ProtocolImportPanelProps = {
  lang: 'en' | 'ar';
  user: User | null;
  onNotice: (message: string) => void;
  onImported?: () => Promise<void> | void;
};

export default function ProtocolImportPanel({lang, user, onNotice, onImported}: ProtocolImportPanelProps) {
  void lang;
  const [rawText, setRawText] = useState('');
  const [parsed, setParsed] = useState<ImportedInjuryProtocol[]>([]);
  const [previewed, setPreviewed] = useState(false);
  const [importing, setImporting] = useState(false);
  const [fileName, setFileName] = useState('');

  const summary = useMemo(() => summarizeImportedProtocols(parsed), [parsed]);
  const missingInjuries = useMemo(() => getInjuriesMissingImportedExerciseProtocols(), []);
  const missingNutritionInjuries = useMemo(() => getInjuriesMissingNutritionPlans(), []);

  const handlePreview = () => {
    const nextParsed = parseInjuryProtocolText(rawText);
    setParsed(nextParsed);
    setPreviewed(true);
    onNotice(`Parsed ${nextParsed.length} injuries. Matched ${nextParsed.filter((item) => item.matchedSlug).length}.`);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setRawText(text);
    setFileName(file.name);
    setPreviewed(false);
    setParsed([]);
  };

  const handleImport = async () => {
    if (!rawText.trim()) {
      onNotice('Paste the protocol text first.');
      return;
    }

    const nextParsed = parsed.length ? parsed : parseInjuryProtocolText(rawText);
    const nextSummary = summarizeImportedProtocols(nextParsed);
    if (!nextSummary.matchedCount) {
      onNotice('No matched protocols to import.');
      return;
    }

    try {
      setImporting(true);
      await importExerciseProtocolsToSupabase({
        rawText,
        parsedInjuries: nextParsed,
        sourceName: fileName || 'Admin textarea import',
        actor: {id: user?.id || null, email: user?.email || null},
      });
      setParsed(nextParsed);
      setPreviewed(true);
      onNotice(`Imported ${nextSummary.matchedCount} protocols into Supabase.`);
      if (onImported) await onImported();
    } catch (error) {
      onNotice(error instanceof Error ? error.message : 'Import failed.');
    } finally {
      setImporting(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-health-green/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-health-green-dark">
            <UploadCloud className="h-3.5 w-3.5" />
            <span>Protocol import</span>
          </div>
          <h2 className="mt-3 text-xl font-black text-slate-900">Import exercise protocols into Supabase</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
            Paste the bulk raw text or upload a single txt file. The importer parses injuries, matches them to the site library,
            then updates Supabase injury phases without replacing nutrition content.
          </p>
        </div>

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700">
          <FileUp className="h-4 w-4" />
          <span>{fileName || 'Upload txt file'}</span>
          <input type="file" accept=".txt,.md" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      <textarea
        value={rawText}
        onChange={(event) => {
          setRawText(event.target.value);
          setPreviewed(false);
          setParsed([]);
        }}
        rows={16}
        className="mt-5 w-full rounded-3xl border border-slate-300 px-4 py-4 text-sm leading-7 outline-none focus:border-health-green"
        placeholder="Paste the raw protocol text here..."
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handlePreview}
          className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700"
        >
          Preview parse
        </button>
        <button
          type="button"
          onClick={handleImport}
          disabled={importing}
          className="rounded-2xl bg-health-green px-4 py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {importing ? 'Importing...' : 'Import into Supabase'}
        </button>
      </div>

      {previewed ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr),340px]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-900">
              <ListChecks className="h-4 w-4 text-health-green" />
              <span>Parse summary</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4"><div className="text-xs uppercase tracking-[0.14em] text-slate-400">Parsed</div><div className="mt-2 text-2xl font-black text-slate-900">{summary.parsedCount}</div></div>
              <div className="rounded-2xl bg-white p-4"><div className="text-xs uppercase tracking-[0.14em] text-slate-400">Matched</div><div className="mt-2 text-2xl font-black text-health-green-dark">{summary.matchedCount}</div></div>
              <div className="rounded-2xl bg-white p-4"><div className="text-xs uppercase tracking-[0.14em] text-slate-400">Unmatched</div><div className="mt-2 text-2xl font-black text-rose-600">{summary.unmatchedCount}</div></div>
            </div>

            {summary.unmatched.length ? (
              <div className="mt-4 rounded-2xl bg-rose-50 p-4">
                <div className="mb-2 text-sm font-bold text-rose-700">Unmatched titles</div>
                <ul className="space-y-2 text-sm text-rose-700">
                  {summary.unmatched.map((item) => (
                    <li key={item.heading} className="rounded-xl bg-white px-3 py-2">{item.heading}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-black text-slate-900">Site injuries still missing imported exercise protocols</div>
              <div className="mt-2 text-xs text-slate-500">{missingInjuries.length} injuries</div>
              <div className="mt-3 max-h-[260px] space-y-2 overflow-auto text-sm text-slate-700">
                {missingInjuries.map((injury) => (
                  <div key={injury.id} className="rounded-xl bg-white px-3 py-2">
                    <div className="font-bold text-slate-900">{injury.name}</div>
                    <div className="text-xs text-slate-500">{injury.id}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-black text-slate-900">Site injuries missing core nutrition plans</div>
              <div className="mt-2 text-xs text-slate-500">{missingNutritionInjuries.length} injuries</div>
              {missingNutritionInjuries.length ? (
                <div className="mt-3 max-h-[220px] space-y-2 overflow-auto text-sm text-slate-700">
                  {missingNutritionInjuries.map((injury) => (
                    <div key={injury.id} className="rounded-xl bg-white px-3 py-2">
                      <div className="font-bold text-slate-900">{injury.name}</div>
                      <div className="text-xs text-slate-500">{injury.id}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-3 rounded-xl bg-white px-3 py-3 text-sm text-slate-600">
                  All current site injuries already have core nutrition-plan data.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}


