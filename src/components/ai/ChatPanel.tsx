import {type KeyboardEvent, useEffect, useMemo, useRef, useState} from 'react';
import {motion} from 'motion/react';
import {Clock3, CornerDownLeft, SendHorizonal, Sparkles} from 'lucide-react';
import {
  askGeminiText,
  buildPersonalizedAiCacheKey,
  getStoredAiContext,
  getStoredAiIdentity,
  trackAiQuestion,
} from '../../ai/gemini';
import {decodeMojibake} from '../../services/textEncoding';

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
  cached?: boolean;
};

function ar(text: string) {
  return decodeMojibake(text);
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-1">
      <div className="h-2 w-2 animate-pulse rounded-full bg-slate-300" />
      <div className="h-2 w-2 animate-pulse rounded-full bg-slate-300 [animation-delay:120ms]" />
      <div className="h-2 w-2 animate-pulse rounded-full bg-slate-300 [animation-delay:240ms]" />
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
  cacheScope = 'assistant',
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
  cacheScope?: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessage ? [{role: 'assistant', text: initialMessage}] : [],
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isAr = lang === 'ar';

  const storedContext = useMemo(() => getStoredAiContext(lang || 'en'), [lang]);
  const personalizedIdentity = useMemo(() => getStoredAiIdentity(), []);
  const mergedContext = useMemo(() => {
    return [storedContext, hiddenContext].filter(Boolean).join('\n\n');
  }, [hiddenContext, storedContext]);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const sendPrompt = async (rawPrompt?: string) => {
    const question = (rawPrompt ?? input).trim();
    if (!question || isLoading) return;

    const cacheKey = buildPersonalizedAiCacheKey({
      scope: cacheScope,
      question,
      hiddenContext: mergedContext,
      identity: personalizedIdentity,
    });
    const hadCachedResponse =
      typeof window !== 'undefined' ? Boolean(localStorage.getItem(cacheKey)) : false;

    setError(null);
    setInput('');
    setIsLoading(true);
    setMessages((prev) => [...prev, {role: 'user', text: question}]);
    trackAiQuestion(question, {
      ...(analyticsMeta || {}),
      cache_scope: cacheScope,
      ai_identity: personalizedIdentity,
    });

    try {
      const answer = await askGeminiText({
        system: systemPrompt,
        user: question,
        hiddenContext: mergedContext,
        cacheKey,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: answer || '-',
          cached: hadCachedResponse,
        },
      ]);
      setTimeout(scrollToBottom, 0);
    } catch (e: any) {
      setError(e?.message || (isAr ? ar('ØªØ¹Ø°Ø± Ø§Ù„ÙˆØµÙˆÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø¢Ù†.') : 'AI error'));
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

  useEffect(() => {
    if (!autoPrompt || isLoading) return;
    void sendPrompt(autoPrompt);
  }, [autoPrompt]);

  return (
    <div className={className || ''}>
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 bg-soft-blue px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <div className="font-black text-slate-900">{title}</div>
            <div className="mt-1 text-xs text-slate-500">
              {isAr
                ? ar('Ø¥Ø¬Ø§Ø¨Ø§Øª Ù…Ø®ØµØµØ© Ø­Ø³Ø¨ Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ø§Ù„Ø­Ø§Ù„ÙŠØ© ÙˆØ³ÙŠØ§Ù‚ Ø­Ø§Ù„ØªÙƒ')
                : 'Answers are personalized using your current profile and context'}
            </div>
          </div>
          <div className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-bold text-slate-500">
            {isLoading ? (isAr ? ar('Ø¬Ø§Ø±Ù Ø§Ù„ØªÙÙƒÙŠØ±...') : 'Thinking...') : isAr ? ar('Ø¬Ø§Ù‡Ø²') : 'Ready'}
          </div>
        </div>

        <div className="max-h-[430px] space-y-3 overflow-y-auto bg-[linear-gradient(180deg,rgba(244,239,231,0.7),rgba(255,255,255,0))] p-4 sm:p-5">
          {messages.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-white/90 p-5">
              <div className="mb-2 flex items-center gap-2 font-bold text-slate-900">
                <Sparkles className="h-4 w-4 text-health-green" />
                {isAr
                  ? ar('Ø§Ø¨Ø¯Ø£ Ø¨Ø³Ø¤Ø§Ù„ ÙˆØ§Ø¶Ø­ Ù„ØªØ­ØµÙ„ Ø¹Ù„Ù‰ ØªÙˆØµÙŠØ© Ø¹Ù…Ù„ÙŠØ©')
                  : 'Start with a clear question for a practical answer'}
              </div>
              <p className="text-sm leading-6 text-slate-500">
                {isAr
                  ? ar('ÙƒÙ„Ù…Ø§ ÙƒØ§Ù† Ø§Ù„Ø³Ø¤Ø§Ù„ Ø£Ø¯Ù‚ØŒ ÙƒØ§Ù†Øª Ø§Ù„Ø¥Ø¬Ø§Ø¨Ø© Ø£ÙˆØ¶Ø­ ÙˆØ£ÙƒØ«Ø± Ø§Ø±ØªØ¨Ø§Ø·Ù‹Ø§ Ø¨Ø¨ÙŠØ§Ù†Ø§ØªÙƒ.')
                  : 'The more specific the question, the more useful and tailored the answer will be.'}
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={`${message.role}-${index}`}
                initial={{opacity: 0, y: 6, scale: 0.98}}
                animate={{opacity: 1, y: 0, scale: 1}}
                className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[94%] rounded-2xl px-4 py-3 text-sm leading-7 sm:max-w-[88%] ${
                    message.role === 'user'
                      ? 'bg-health-green text-white'
                      : 'border border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  <div>{message.text}</div>
                  {message.role === 'assistant' && message.cached ? (
                    <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                      <Clock3 className="h-3 w-3" />
                      {isAr ? ar('Ù…Ù† Ø§Ù„Ø±Ø¯ÙˆØ¯ Ø§Ù„Ù…Ø­ÙÙˆØ¸Ø© Ù„Ø­Ø§Ù„ØªÙƒ') : 'Loaded from your personalized cache'}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ))
          )}

          {isLoading ? (
            <div className="flex w-full justify-start">
              <div className="max-w-[90%] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <LoadingDots />
              </div>
            </div>
          ) : null}

          <div ref={bottomRef} />
        </div>

        {quickActions && quickActions.length > 0 ? (
          <div className="border-t border-slate-100 px-4 py-3 sm:px-5">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {isAr ? ar('Ø§Ù‚ØªØ±Ø§Ø­Ø§Øª Ø³Ø±ÙŠØ¹Ø©') : 'Quick prompts'}
            </div>
            <div className="flex snap-x gap-2 overflow-x-auto pb-1">
              {quickActions.slice(0, 4).map((action, index) => (
                <button
                  key={`${action.label}-${index}`}
                  onClick={() => setInput(action.prompt)}
                  className="min-w-[150px] snap-start rounded-2xl border border-slate-200 bg-white px-3 py-3 text-left text-xs font-black text-slate-700 transition-all hover:bg-soft-blue sm:min-w-0"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {error ? <div className="px-4 pb-0 text-sm font-semibold text-rose-600 sm:px-5">{error}</div> : null}

        <div className="border-t border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder={isAr ? ar('Ø§ÙƒØªØ¨ Ø³Ø¤Ø§Ù„Ùƒ Ù‡Ù†Ø§...') : 'Type your question here...'}
              className="min-h-[96px] flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-health-green/30 sm:min-h-[88px]"
            />
            <button
              onClick={onSend}
              disabled={!canSend}
              className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl border transition-all sm:w-12 ${
                canSend
                  ? 'border-health-green bg-health-green text-white hover:bg-health-green-dark'
                  : 'border-slate-200 bg-slate-100 text-slate-400'
              }`}
              aria-label={isAr ? ar('Ø¥Ø±Ø³Ø§Ù„') : 'Send'}
            >
              <SendHorizonal className="h-5 w-5" />
              <span className="text-sm font-bold sm:hidden">{isAr ? ar('Ø¥Ø±Ø³Ø§Ù„') : 'Send'}</span>
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-2 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" />
              {isAr
                ? ar('Ø§Ø¶ØºØ· Enter Ù„Ù„Ø¥Ø±Ø³Ø§Ù„ Ùˆ Shift+Enter Ù„Ø³Ø·Ø± Ø¬Ø¯ÙŠØ¯')
                : 'Press Enter to send and Shift+Enter for a new line'}
            </span>
            <span>{disclaimer}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
