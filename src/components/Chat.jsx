import React from 'react';
import { Send } from 'lucide-react';

export default function Chat({ lang = 'en', messages = [] }) {
  const l = lang === 'ru'
    ? { title: 'Чат', placeholder: 'Напишите сообщение…', send: 'Отправить' }
    : { title: 'Chat', placeholder: 'Write a message…', send: 'Send' };

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur p-5 flex flex-col">
      <h3 className="text-white/90 font-medium mb-4">{l.title}</h3>
      <div className="flex-1 min-h-[180px] max-h-64 overflow-y-auto space-y-3 pr-1">
        {messages.length === 0 ? (
          <p className="text-white/60 text-sm">—</p>
        ) : (
          messages.map((m, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/10" />
              <div>
                <p className="text-white text-sm">{m.author}</p>
                <p className="text-white/70 text-sm">{m.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <form className="mt-4 flex items-center gap-2">
        <input
          type="text"
          placeholder={l.placeholder}
          className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-white/20"
        />
        <button type="button" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-white hover:border-white/30 transition">
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">{l.send}</span>
        </button>
      </form>
    </div>
  );
}
