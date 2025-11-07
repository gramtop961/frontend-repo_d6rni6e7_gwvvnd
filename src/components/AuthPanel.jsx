import React, { useState } from 'react';
import { User, LogIn, LogOut, UserPlus } from 'lucide-react';

export default function AuthPanel({ lang = 'en' }) {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);

  const labels = {
    title: lang === 'ru' ? 'Аккаунт' : 'Account',
    login: lang === 'ru' ? 'Войти' : 'Login',
    register: lang === 'ru' ? 'Регистрация' : 'Register',
    email: lang === 'ru' ? 'Почта' : 'Email',
    password: lang === 'ru' ? 'Пароль' : 'Password',
    name: lang === 'ru' ? 'Имя' : 'Name',
    or: lang === 'ru' ? 'или' : 'or',
    logout: lang === 'ru' ? 'Выйти' : 'Logout',
    demoSuccess: lang === 'ru' ? 'Демо: выполнено!' : 'Demo: done!'
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(labels.demoSuccess);
    }, 600);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur p-5">
      <div className="flex items-center gap-2 text-white/90">
        <User className="w-5 h-5" />
        <h3 className="font-medium">{labels.title}</h3>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => setMode('login')}
          className={`text-sm px-3 py-1.5 rounded-lg border transition ${
            mode === 'login'
              ? 'bg-white text-black border-white'
              : 'text-white/80 border-white/20 hover:border-white/40'
          }`}
        >
          {labels.login}
        </button>
        <button
          onClick={() => setMode('register')}
          className={`text-sm px-3 py-1.5 rounded-lg border transition ${
            mode === 'register'
              ? 'bg-white text-black border-white'
              : 'text-white/80 border-white/20 hover:border-white/40'
          }`}
        >
          {labels.register}
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        {mode === 'register' && (
          <div>
            <label className="block text-xs text-white/60 mb-1">{labels.name}</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-white/20"
              placeholder={labels.name}
              required
            />
          </div>
        )}
        <div>
          <label className="block text-xs text-white/60 mb-1">{labels.email}</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-white/60 mb-1">{labels.password}</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white text-black font-medium hover:opacity-90 transition disabled:opacity-60"
        >
          {mode === 'login' ? (
            <>
              <LogIn className="w-4 h-4" /> {labels.login}
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" /> {labels.register}
            </>
          )}
        </button>
        <div className="text-center text-xs text-white/50">
          {labels.or}
        </div>
        <button
          type="button"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white hover:border-white/30 transition"
        >
          <LogOut className="w-4 h-4" /> {labels.logout}
        </button>
      </form>
    </div>
  );
}
