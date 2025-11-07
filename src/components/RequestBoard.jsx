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
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Requests / Запросы</h2>

      {currentUser ? (
        <form onSubmit={handleCreate} className="grid gap-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title / Заголовок"
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Describe your request / Опишите запрос"
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[90px]"
          />
          <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
            Submit / Отправить
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-500 mb-4">Please sign in to create requests / Войдите, чтобы создавать запросы</p>
      )}

      <ul className="grid gap-3">
        {requests.map((r) => (
          <li key={r.id} className="border border-gray-200 rounded-lg p-3 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{r.title}</h3>
                <p className="text-gray-600 text-sm">{r.details}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs ${r.status === 'open' ? 'bg-yellow-100 text-yellow-800' : r.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
                  {r.status === 'open' ? 'Open / Открыт' : r.status === 'in_progress' ? 'In progress / В работе' : 'Done / Готово'}
                </span>
                {currentUser && (
                  <select
                    value={r.status}
                    onChange={(e) => onUpdateStatus(r.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-2 py-1 bg-white"
                  >
                    <option value="open">Open / Открыт</option>
                    <option value="in_progress">In progress / В работе</option>
                    <option value="done">Done / Готово</option>
                  </select>
                )}
              </div>
            </div>
          </li>
        ))}
        {requests.length === 0 && (
          <li className="text-sm text-gray-500">No requests yet / Пока нет запросов</li>
        )}
      </ul>
    </div>
  );
}
