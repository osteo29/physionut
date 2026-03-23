import {Link} from 'react-router-dom';
import AskAboutResultChat from '../ai/AskAboutResultChat';
import ResultLeadCapture from '../forms/ResultLeadCapture';
import {navigationPaths} from '../../utils/langUrlHelper';

type ResultAssistantPanelProps = {
  analysisPrompt: string | null;
  assessmentSnapshot: {
    valueLabel: string;
    valueNumeric: number | null;
    valueUnit: string | null;
  };
  activeCalculator: string;
  healthInterpretation: any;
  inputs: Record<string, unknown>;
  lang: 'en' | 'ar';
  result: any;
  setAnalysisPrompt: (value: string) => void;
};

export default function ResultAssistantPanel({
  analysisPrompt,
  assessmentSnapshot,
  activeCalculator,
  healthInterpretation,
  inputs,
  lang,
  result,
  setAnalysisPrompt,
}: ResultAssistantPanelProps) {
  return (
    <div className="mt-8">
      <div className="mb-4 flex flex-wrap gap-3">
        <button
          onClick={() => {
            setAnalysisPrompt(
              lang === 'en'
                ? `Analyze this ${activeCalculator} result and give me a short practical recommendation for rehab or nutrition follow-up.`
                : `حلل نتيجة ${activeCalculator} وأعطني توصية قصيرة وعملية للمتابعة في التعافي أو التغذية.`,
            );
            document.getElementById('result-ai-panel')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }}
          className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800"
        >
          {lang === 'en' ? 'Analyze with AI' : 'حلل بالذكاء الاصطناعي'}
        </button>

        <Link
          to={navigationPaths.dashboard(lang)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:border-health-green/30"
        >
          {lang === 'en' ? 'Open tracking dashboard' : 'افتح لوحة المتابعة'}
        </Link>
      </div>

      <ResultLeadCapture
        lang={lang}
        calculatorName={activeCalculator}
        valueLabel={assessmentSnapshot.valueLabel}
        valueNumeric={assessmentSnapshot.valueNumeric}
        valueUnit={assessmentSnapshot.valueUnit}
      />

      <div id="result-ai-panel">
        <AskAboutResultChat
          calculatorName={activeCalculator}
          lang={lang}
          autoPrompt={analysisPrompt}
          hiddenContext={JSON.stringify(
            {
              calculator: activeCalculator,
              result,
              interpretation: healthInterpretation,
              inputs,
              language: lang,
            },
            null,
            2,
          )}
        />
      </div>
    </div>
  );
}
