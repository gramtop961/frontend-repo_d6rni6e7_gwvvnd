import React from 'react';
import { Globe, User } from 'lucide-react';

function Navbar({ lang, onToggleLang }) {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur bg-black/50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-black font-bold">LJ</span>
          <span className="font-semibold">LandJav</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLang}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <Globe size={16} />
            <span className="text-sm">{lang === 'ru' ? 'RU' : 'EN'}</span>
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition">
            <User size={16} />
            <span className="text-sm">{lang === 'ru' ? 'Войти' : 'Sign in'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
