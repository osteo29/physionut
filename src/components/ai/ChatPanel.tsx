import {useMemo, useRef, useState} from 'react';
import {motion} from 'motion/react';
import {SendHorizonal} from 'lucide-react';
import {askGeminiText, trackAiQuestion} from '../../ai/gemini';

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

function LoadingDots() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
      <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse [animation-delay:120ms]" />
      <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse [animation-delay:240ms]" />
    </div>
  );
}

export default function ChatPanel({
  title,
  systemPrompt,
  hiddenContext,
  disclaimer,
  className,
  initialMessage,
  analyticsMeta,
  lang,
  quickActions,
}: {
  title: string;
  systemPrompt: string;
  hiddenContext?: string;
  disclaimer: string;
  className?: string;
  initialMessage?: string;
  analyticsMeta?: Record<string, unknown>;
  lang?: 'en' | 'ar';
  quickActions?: Array<{label: string; prompt: string}>;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessage
      ? [{role: 'assistant', text: initialMessage}]
      : [],
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const onSend = async () => {
    const q = input.trim();
    if (!q || isLoading) return;

    setError(null);
    setInput('');
    setIsLoading(true);
    setMessages((prev) => [...prev, {role: 'user', text: q}]);
    trackAiQuestion(q, analyticsMeta);

    try {
      const answer = await askGeminiText({
        system: systemPrompt,
        user: q,
        hiddenContext,
      });
      setMessages((prev) => [...prev, {role: 'assistant', text: answer || '—'}]);
      setTimeout(scrollToBottom, 0);
    } catch (e: any) {
      setError(e?.message || (lang === 'ar' ? 'خطأ في الذكاء الاصطناعي' : 'AI error'));
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 0);
    }
  };

  const isAr = lang === 'ar';

  return (
    <div className={className || ''}>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-soft-blue flex items-center justify-between">
          <div className="font-black text-slate-900">{title}</div>
          <div className="text-xs font-bold text-slate-500">
            {isLoading ? (isAr ? 'جارٍ التفكير…' : 'Thinking…') : (isAr ? 'جاهز' : 'Ready')}
          </div>
        </div>

        <div className="p-5 space-y-3 max-h-[420px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-sm text-slate-500">
              {isAr
                ? 'اسأل سؤالاً للحصول على شرح سريري مبسّط.'
                : 'Ask a question to get a clinically grounded explanation.'}
            </div>
          ) : (
            messages.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{opacity: 0, y: 6, scale: 0.98}}
                animate={{opacity: 1, y: 0, scale: 1}}
                className={`w-full flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-health-green text-white'
                      : 'bg-slate-50 text-slate-800 border border-slate-200'
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))
          )}

          {isLoading && (
            <div className="w-full flex justify-start">
              <div className="max-w-[90%] rounded-2xl px-4 py-3 text-sm bg-slate-50 text-slate-700 border border-slate-200">
                <LoadingDots />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {messages.length === 0 && quickActions && quickActions.length > 0 && (
          <div className="px-5 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickActions.slice(0, 3).map((a, i) => (
                <button
                  key={i}
                  onClick={() => setInput(a.prompt)}
                  className="px-3 py-2 rounded-xl text-xs font-black border border-slate-200 bg-white hover:bg-soft-blue text-slate-700"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="px-5 pb-0 text-sm text-rose-600 font-semibold">
            {error}
          </div>
        )}

        <div className="p-5 pt-4 border-t border-slate-200 bg-white">
          <div className="flex items-end gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={2}
              placeholder={isAr ? 'اكتب سؤالك…' : 'Type your question…'}
              className="flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-health-green/30"
            />
            <button
              onClick={onSend}
              disabled={!canSend}
              className={`h-[44px] w-[44px] rounded-2xl flex items-center justify-center transition-all border ${
                canSend
                  ? 'bg-health-green text-white border-health-green hover:bg-health-green-dark'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
              aria-label={isAr ? 'إرسال' : 'Send'}
            >
              <SendHorizonal className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3 text-[11px] text-slate-500">
            {disclaimer}
          </div>
        </div>
      </div>
    </div>
  );
}

