import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function Forum({ lang = 'en', threads = [] }) {
  const l = lang === 'ru'
    ? { title: 'Форум', empty: 'Пока нет тем.', replies: 'ответов' }
    : { title: 'Forum', empty: 'No threads yet.', replies: 'replies' };

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur p-5">
      <div className="flex items-center gap-2 text-white/90 mb-4">
        <MessageSquare className="w-5 h-5" />
        <h3 className="font-medium">{l.title}</h3>
      </div>
      {threads.length === 0 ? (
        <p className="text-white/60 text-sm">{l.empty}</p>
      ) : (
        <ul className="divide-y divide-white/5">
          {threads.map((t) => (
            <li key={t.id} className="py-3 flex items-start justify-between">
              <div>
                <p className="text-white font-medium">{t.title}</p>
                <p className="text-white/60 text-xs mt-1">{t.author}</p>
              </div>
              <span className="text-white/60 text-xs">{t.replies} {l.replies}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
