import { useEffect, useRef, useState } from 'react';

export default function Chat({ channels, activeChannelId, onCreateChannel, onSendMessage, messages, currentUser }) {
  const [channelName, setChannelName] = useState('');
  const [text, setText] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannelId]);

  const handleCreateChannel = (e) => {
    e.preventDefault();
    if (!channelName.trim()) return;
    onCreateChannel(channelName.trim());
    setChannelName('');
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(activeChannelId, text.trim());
    setText('');
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow border border-gray-200 h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-3">Chat / Чат</h2>
      <div className="flex gap-4 flex-1 min-h-[320px]">
        <div className="w-52 shrink-0 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Channels / Каналы</span>
          </div>
          <ul className="flex-1 overflow-auto border rounded-lg bg-white">
            {channels.map((c) => (
              <li
                key={c.id}
                className={`px-3 py-2 border-b last:border-b-0 cursor-pointer ${activeChannelId === c.id ? 'bg-blue-50 font-medium' : 'hover:bg-gray-50'}`}
                onClick={() => onSendMessage(c.id, null)}
                title={`Switch to ${c.name}`}
              >
                #{c.name}
              </li>
            ))}
            {channels.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">No channels / Нет каналов</li>
            )}
          </ul>

          {currentUser && (
            <form onSubmit={handleCreateChannel} className="flex gap-2">
              <input
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="New channel / Новый канал"
                className="flex-1 px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Add</button>
            </form>
          )}
        </div>

        <div className="flex-1 flex flex-col border rounded-lg bg-white">
          <div className="px-3 py-2 border-b text-sm text-gray-600">
            {channels.find((c) => c.id === activeChannelId)?.name || 'Select a channel / Выберите канал'}
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {messages[activeChannelId]?.map((m, idx) => (
              <div key={idx} className="max-w-[75%] p-2 rounded-lg border bg-gray-50">
                <div className="text-xs text-gray-500 mb-0.5">{m.author} • {new Date(m.created_at).toLocaleTimeString()}</div>
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>
            ))}
            {(!messages[activeChannelId] || messages[activeChannelId].length === 0) && (
              <div className="text-sm text-gray-500">No messages / Нет сообщений</div>
            )}
            <div ref={endRef} />
          </div>

          {currentUser && activeChannelId && (
            <form onSubmit={handleSend} className="p-2 border-t flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Message / Сообщение"
                className="flex-1 px-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Send</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
