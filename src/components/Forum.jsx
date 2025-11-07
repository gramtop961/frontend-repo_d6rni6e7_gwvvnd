import { useState } from 'react';

export default function Forum({ threads, onCreateThread, onAddReply, currentUser }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onCreateThread({ title: title.trim(), content: content.trim() });
    setTitle('');
    setContent('');
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Forum / Форум</h2>

      {currentUser ? (
        <form onSubmit={handleCreate} className="grid gap-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Thread title / Заголовок темы"
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something... / Напишите сообщение..."
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[90px]"
          />
          <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition">
            Publish / Опубликовать
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-500 mb-4">Please sign in to post / Войдите, чтобы публиковать</p>
      )}

      <ul className="grid gap-4">
        {threads.map((t) => (
          <li key={t.id} className="border border-gray-200 rounded-lg p-3 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{t.title}</h3>
              <span className="text-xs text-gray-500">by {t.author} • {new Date(t.created_at).toLocaleString()}</span>
            </div>
            <p className="text-gray-700 mt-1 whitespace-pre-wrap">{t.content}</p>

            <div className="mt-3">
              <h4 className="text-sm font-semibold mb-2">Replies / Ответы</h4>
              <ul className="grid gap-2">
                {t.replies?.map((r, idx) => (
                  <li key={idx} className="text-sm bg-gray-50 rounded p-2 border border-gray-200">
                    <span className="font-medium">{r.author}:</span> {r.text}
                  </li>
                ))}
                {(!t.replies || t.replies.length === 0) && (
                  <li className="text-sm text-gray-500">No replies yet / Пока нет ответов</li>
                )}
              </ul>

              {currentUser && (
                <ReplyForm
                  onSubmit={(text) => onAddReply(t.id, text)}
                />
              )}
            </div>
          </li>
        ))}
        {threads.length === 0 && (
          <li className="text-sm text-gray-500">No threads yet / Пока нет тем</li>
        )}
      </ul>
    </div>
  );
}

function ReplyForm({ onSubmit }) {
  const [text, setText] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSubmit(text.trim());
        setText('');
      }}
      className="flex gap-2 mt-2"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Reply / Ответ"
        className="flex-1 px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Send / Отправить</button>
    </form>
  );
}
