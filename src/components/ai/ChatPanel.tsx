import {type KeyboardEvent, useEffect, useMemo, useRef, useState} from 'react';
import {motion} from 'motion/react';
import {CornerDownLeft, SendHorizonal, Sparkles} from 'lucide-react';
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
  autoPrompt,
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
  autoPrompt?: string | null;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessage ? [{role: 'assistant', text: initialMessage}] : [],
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading],
  );

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const sendPrompt = async (rawPrompt?: string) => {
    const q = (rawPrompt ?? input).trim();
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
      setMessages((prev) => [...prev, {role: 'assistant', text: answer || '-'}]);
      setTimeout(scrollToBottom, 0);
    } catch (e: any) {
      setError(e?.message || (lang === 'ar' ? 'خطأ في الذكاء الاصطناعي' : 'AI error'));
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 0);
    }
  };

  const onSend = async () => {
    await sendPrompt();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void onSend();
    }
  };

  const isAr = lang === 'ar';

  useEffect(() => {
    if (!autoPrompt || isLoading) return;
    void sendPrompt(autoPrompt);
  }, [autoPrompt]);

  return (
    <div className={className || ''}>
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-soft-blue flex items-center justify-between">
          <div className="font-black text-slate-900">{title}</div>
          <div className="text-xs font-bold text-slate-500">
            {isLoading
              ? isAr
                ? 'جارٍ التفكير...'
                : 'Thinking...'
              : isAr
                ? 'جاهز'
                : 'Ready'}
          </div>
        </div>

        <div className="p-5 space-y-3 max-h-[420px] overflow-y-auto bg-[linear-gradient(180deg,rgba(240,249,255,0.55),rgba(255,255,255,0))]">
          {messages.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 p-5">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-2">
                <Sparkles className="w-4 h-4 text-health-green" />
                {isAr
                  ? 'ابدأ بسؤال واضح لتحصل على إجابة عملية'
                  : 'Start with a clear question for a practical answer'}
              </div>
              <p className="text-sm text-slate-500 leading-6">
                {isAr
                  ? 'كلما كان سؤالك أكثر تحديدًا، كانت الإجابة أوضح وأسهل للتطبيق.'
                  : 'The more specific the question, the more useful and actionable the answer will be.'}
              </p>
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

        {quickActions && quickActions.length > 0 && (
          <div className="px-5 pb-2">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-2">
              {isAr ? 'اقتراحات سريعة' : 'Quick prompts'}
            </div>
            <div className="flex flex-wrap gap-2">
              {quickActions.slice(0, 3).map((a, i) => (
                <button
                  key={i}
                  onClick={() => setInput(a.prompt)}
                  className="px-3 py-2 rounded-xl text-xs font-black border border-slate-200 bg-white hover:bg-soft-blue text-slate-700 text-left"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && <div className="px-5 pb-0 text-sm text-rose-600 font-semibold">{error}</div>}

        <div className="p-5 pt-4 border-t border-slate-200 bg-white">
          <div className="flex items-end gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder={isAr ? 'اكتب سؤالك هنا...' : 'Type your question here...'}
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

          <div className="mt-3 flex flex-col gap-2 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" />
              {isAr
                ? 'اضغط Enter للإرسال و Shift+Enter لسطر جديد'
                : 'Press Enter to send and Shift+Enter for a new line'}
            </span>
            <span>{disclaimer}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
