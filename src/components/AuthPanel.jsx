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
      <div className="w-full bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Signed in as / Вошли как</p>
            <p className="font-semibold">{currentUser.username}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition"
          >
            Logout / Выйти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow border border-gray-200">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('login')}
          className={`px-3 py-1.5 rounded-lg text-sm ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Login / Вход
        </button>
        <button
          onClick={() => setMode('register')}
          className={`px-3 py-1.5 rounded-lg text-sm ${mode === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Register / Регистрация
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm text-gray-600">Username / Имя пользователя</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. alex"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-gray-600">Password / Пароль</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </label>
        <button
          type="submit"
          className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {mode === 'register' ? 'Create account / Создать аккаунт' : 'Sign in / Войти'}
        </button>
      </form>
    </div>
  );
}
