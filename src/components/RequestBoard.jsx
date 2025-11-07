import { useState } from 'react';

export default function RequestBoard({ requests, onCreateRequest, currentUser, onUpdateStatus }) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim() || !details.trim()) return;
    onCreateRequest({ title: title.trim(), details: details.trim() });
    setTitle('');
    setDetails('');
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow border border-white/10 text-white">
      <h2 className="text-xl font-semibold mb-4">Requests / Запросы</h2>

      {currentUser ? (
        <form onSubmit={handleCreate} className="grid gap-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title / Заголовок"
            className="px-3 py-2 rounded-xl bg-black/40 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Describe your request / Опишите запрос"
            className="px-3 py-2 rounded-xl bg-black/40 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[90px]"
          />
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20">
            Submit / Отправить
          </button>
        </form>
      ) : (
        <p className="text-sm text-white/60 mb-4">Please sign in to create requests / Войдите, чтобы создавать запросы</p>
      )}

      <ul className="grid gap-3">
        {requests.map((r) => (
          <li key={r.id} className="border border-white/10 rounded-xl p-3 bg-white/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{r.title}</h3>
                <p className="text-white/80 text-sm">{r.details}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs ${r.status === 'open' ? 'bg-yellow-500/20 text-yellow-300' : r.status === 'in_progress' ? 'bg-blue-500/20 text-blue-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                  {r.status === 'open' ? 'Open / Открыт' : r.status === 'in_progress' ? 'In progress / В работе' : 'Done / Готово'}
                </span>
                {currentUser && (
                  <select
                    value={r.status}
                    onChange={(e) => onUpdateStatus(r.id, e.target.value)}
                    className="text-sm border border-white/20 bg-black/40 text-white rounded-xl px-2 py-1"
                  >
                    <option className="text-black" value="open">Open / Открыт</option>
                    <option className="text-black" value="in_progress">In progress / В работе</option>
                    <option className="text-black" value="done">Done / Готово</option>
                  </select>
                )}
              </div>
            </div>
          </li>
        ))}
        {requests.length === 0 && (
          <li className="text-sm text-white/60">No requests yet / Пока нет запросов</li>
        )}
      </ul>
    </div>
  );
}
