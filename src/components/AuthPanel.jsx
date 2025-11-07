import { useState } from 'react';

export default function AuthPanel({ currentUser, onRegister, onLogin, onLogout }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    if (mode === 'register') {
      onRegister({ username: username.trim(), password });
    } else {
      onLogin({ username: username.trim(), password });
    }
    setPassword('');
  };

  if (currentUser) {
    return (
      <div className="w-full bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow border border-white/10 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs/5 text-white/60">Signed in as / Вошли как</p>
            <p className="font-semibold text-white">{currentUser.username}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition shadow-lg shadow-rose-500/20"
          >
            Logout / Выйти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow border border-white/10 text-white">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('login')}
          className={`px-3 py-1.5 rounded-xl text-sm transition ${mode === 'login' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
        >
          Login / Вход
        </button>
        <button
          onClick={() => setMode('register')}
          className={`px-3 py-1.5 rounded-xl text-sm transition ${mode === 'register' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
        >
          Register / Регистрация
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm text-white/70">Username / Имя пользователя</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/40 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. alex"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-white/70">Password / Пароль</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="px-3 py-2 rounded-xl bg-black/40 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </label>
        <button
          type="submit"
          className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
        >
          {mode === 'register' ? 'Create account / Создать аккаунт' : 'Sign in / Войти'}
        </button>
      </form>
    </div>
  );
}
