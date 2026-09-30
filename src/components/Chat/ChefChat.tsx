import React, { useState } from 'react';
import { Send, ChefHat, Sparkles, Trash2, Bot, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChatMessage } from '../../types';

export const ChefChat: React.FC = () => {
  const { language, t } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: t.chat.welcomeMessage,
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          message: textToSend.trim(),
          history: messages.slice(-6),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          setMessages(prev => [
            ...prev,
            {
              id: `assistant-${Date.now()}`,
              role: 'assistant',
              content: data.reply,
              timestamp: Date.now(),
            }
          ]);
          setIsSending(false);
          return;
        }
      }
      throw new Error('Fallback response');
    } catch {
      // Localized smart fallback answer
      setTimeout(() => {
        let answer = '';
        if (language === 'uz') {
          answer = `Ajoyib savol! Oshxona tajribamdan kelib chiqib aytamanki: agar mahsulot o‘rnini bosuvchi kerak bo‘lsa, yog‘lilik darajasi va ta'm balansiga e'tibor qarating. Masalan, qaymoq o‘rniga smetana yoki sut va ozgina sariyog‘ aralashmasi juda yaxshi ketadi. Yana biron maslahat kerakmi?`;
        } else if (language === 'ru') {
          answer = `Отличный кулинарный вопрос! На профессиональной кухне мы всегда рекомендуем соблюдать баланс кислотности, жирности и соли. Если соус получился слишком густым — добавьте половник теплого бульона или сливок. Чем еще могу вам помочь?`;
        } else {
          answer = `Superb culinary question! In professional kitchens, balance of fat, acid, and temperature is key. If you are substituting ingredients, keep texture and moisture ratio consistent. Let me know what specific dish you are working on!`;
        }

        setMessages(prev => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: answer,
            timestamp: Date.now(),
          }
        ]);
        setIsSending(false);
      }, 700);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: t.chat.welcomeMessage,
        timestamp: Date.now(),
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1c1c1c] shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/70 text-[#FF7A45] flex items-center justify-center text-2xl shrink-0">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>{t.chat.title}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {t.chat.subtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearChat}
          className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-400 hover:text-rose-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          title={t.chat.clearChat}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FF7A45]" />
          <span>{t.chat.quickSuggestionsTitle}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {t.chat.suggestions.map((sug, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(sug)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#202020] text-neutral-700 dark:text-neutral-300 hover:border-orange-300 hover:text-[#FF7A45] transition-colors text-left"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Feed */}
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1a1a1a] shadow-xs p-4 sm:p-6 min-h-[420px] max-h-[550px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                    : 'bg-[#FF7A45] text-white shadow-sm shadow-orange-500/30'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-3xl max-w-xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  isUser
                    ? 'bg-[#FF7A45] text-white rounded-tr-xs'
                    : 'bg-neutral-100 dark:bg-[#222222] text-neutral-900 dark:text-neutral-100 rounded-tl-xs border border-neutral-200/50 dark:border-neutral-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#FF7A45] text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-[#222222] text-xs font-semibold text-neutral-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF7A45] animate-ping" />
              <span>Chef Leo is typing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.chat.placeholder}
          className="flex-1 px-5 py-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#202020] text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#FF7A45] shadow-xs"
        />
        <button
          type="submit"
          disabled={!input.trim() || isSending}
          className="p-4 rounded-2xl bg-[#FF7A45] text-white font-bold disabled:opacity-40 hover:bg-[#e86835] transition-all shadow-md shadow-orange-500/20"
          aria-label={t.chat.send}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
