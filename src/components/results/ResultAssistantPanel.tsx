import {Link} from 'react-router-dom';
import AskAboutResultChat from '../ai/AskAboutResultChat';
import ResultLeadCapture from '../forms/ResultLeadCapture';
import {navigationPaths} from '../../utils/langUrlHelper';
import {decodeMojibake} from '../../services/textEncoding';

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

function ar(text: string) {
  return decodeMojibake(text);
}

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
                : ar(`Ø­Ù„Ù„ Ù†ØªÙŠØ¬Ø© ${activeCalculator} ÙˆØ£Ø¹Ø·Ù†ÙŠ ØªÙˆØµÙŠØ© Ù‚ØµÙŠØ±Ø© ÙˆØ¹Ù…Ù„ÙŠØ© Ù„Ù„Ù…ØªØ§Ø¨Ø¹Ø© ÙÙŠ Ø§Ù„ØªØ¹Ø§ÙÙŠ Ø£Ùˆ Ø§Ù„ØªØºØ°ÙŠØ©.`),
            );
            document.getElementById('result-ai-panel')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }}
          className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800"
        >
          {lang === 'en' ? 'Analyze with AI' : ar('Ø­Ù„Ù„ Ø¨Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ')}
        </button>

        <Link
          to={navigationPaths.dashboard(lang)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:border-health-green/30"
        >
          {lang === 'en' ? 'Open tracking dashboard' : ar('Ø§ÙØªØ­ Ù„ÙˆØ­Ø© Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø©')}
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
