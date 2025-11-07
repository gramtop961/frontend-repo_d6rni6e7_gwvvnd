import React, { useMemo, useState } from 'react';
import Hero from './components/Hero';
import AuthPanel from './components/AuthPanel';
import Forum from './components/Forum';
import RequestBoard from './components/RequestBoard';
import Chat from './components/Chat';

export default function App() {
  const [lang, setLang] = useState('en');

  const demoThreads = useMemo(
    () => [
      { id: 't1', title: 'Welcome thread', author: 'Admin', replies: 12 },
      { id: 't2', title: 'Share your ideas', author: 'Fox', replies: 5 },
    ],
    []
  );
  const demoRequests = useMemo(
    () => [
      { id: 'r1', title: 'Add RU translation to chat', status: 'open' },
      { id: 'r2', title: 'Dark theme polish', status: 'in-progress' },
    ],
    []
  );
  const demoMessages = useMemo(
    () => [
      { author: 'Mila', text: 'Hi everyone! 👋' },
      { author: 'Ken', text: 'Loving the new hero.' },
    ],
    []
  );

  const labels = lang === 'ru'
    ? { brand: 'LandJav', desc: 'Быстро и доступно везде', switch: 'English',
        sections: { forum: 'Форум', requests: 'Запросы', chat: 'Чат' } }
    : { brand: 'LandJav', desc: 'Fast and accessible everywhere', switch: 'Русский',
        sections: { forum: 'Forum', requests: 'Requests', chat: 'Chat' } };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 backdrop-blur bg-black/50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/90 to-white/40" />
            <div>
              <div className="text-lg font-semibold">{labels.brand}</div>
              <div className="text-xs text-white/60">{labels.desc}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang((l) => (l === 'en' ? 'ru' : 'en'))}
              className="text-sm px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 transition"
            >
              {labels.switch}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <Hero lang={lang} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Forum lang={lang} threads={demoThreads} />
            <RequestBoard lang={lang} items={demoRequests} />
          </div>
          <div className="space-y-6">
            <AuthPanel lang={lang} />
            <Chat lang={lang} messages={demoMessages} />
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-4 text-sm text-white/50">
          © {new Date().getFullYear()} LandJav — All regions welcome.
        </div>
      </footer>
    </div>
  );
}
