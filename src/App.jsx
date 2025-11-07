import { useEffect, useMemo, useState } from 'react';
import AuthPanel from './components/AuthPanel';
import Forum from './components/Forum';
import RequestBoard from './components/RequestBoard';
import Chat from './components/Chat';
import Hero from './components/Hero';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Forum state
  const [threads, setThreads] = useState([]);

  // Requests state
  const [requests, setRequests] = useState([]);

  // Chat state
  const [channels, setChannels] = useState([{ id: 'general', name: 'general' }]);
  const [activeChannelId, setActiveChannelId] = useState('general');
  const [messages, setMessages] = useState({ general: [] });

  // Handlers: auth
  const handleRegister = ({ username, password }) => {
    setCurrentUser({ username });
  };
  const handleLogin = ({ username, password }) => {
    setCurrentUser({ username });
  };
  const handleLogout = () => setCurrentUser(null);

  // Handlers: forum
  const handleCreateThread = ({ title, content }) => {
    if (!currentUser) return;
    setThreads((prev) => [
      {
        id: crypto.randomUUID(),
        title,
        content,
        author: currentUser.username,
        created_at: Date.now(),
        replies: [],
      },
      ...prev,
    ]);
  };
  const handleAddReply = (threadId, text) => {
    if (!currentUser) return;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? { ...t, replies: [...(t.replies || []), { author: currentUser.username, text }] }
          : t
      )
    );
  };

  // Handlers: requests
  const handleCreateRequest = ({ title, details }) => {
    if (!currentUser) return;
    setRequests((prev) => [
      { id: crypto.randomUUID(), title, details, status: 'open', author: currentUser.username },
      ...prev,
    ]);
  };
  const handleUpdateStatus = (id, status) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  // Handlers: chat
  const handleCreateChannel = (name) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    if (channels.some((c) => c.id === id)) {
      setActiveChannelId(id);
      return;
    }
    setChannels((prev) => [...prev, { id, name }]);
    setMessages((prev) => ({ ...prev, [id]: [] }));
    setActiveChannelId(id);
  };
  const handleSendMessage = (channelId, text) => {
    // If called with null text, treat as channel switch
    if (text === null) {
      setActiveChannelId(channelId);
      return;
    }
    if (!currentUser || !channelId) return;
    setMessages((prev) => ({
      ...prev,
      [channelId]: [
        ...((prev[channelId] || [])),
        { text, author: currentUser.username, created_at: Date.now() },
      ],
    }));
  };

  useEffect(() => {
    setThreads([
      { id: 't1', title: 'Добро пожаловать в LandJav!', content: 'Представьтесь ниже / Introduce yourself below', author: 'system', created_at: Date.now() - 500000, replies: [] },
    ]);
    setRequests([
      { id: 'r1', title: 'Поддержка темной темы', details: 'Добавить переключатель темы', status: 'open', author: 'maria' },
    ]);
    setMessages({
      general: [
        { text: 'Всем привет! Welcome to LandJav.', author: 'system', created_at: Date.now() - 300000 },
      ],
    });
  }, []);

  const stats = useMemo(() => ({
    threads: threads.length,
    requests: requests.length,
    channels: channels.length,
  }), [threads.length, requests.length, channels.length]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <header className="sticky top-0 z-10 backdrop-blur bg-black/60 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-fuchsia-500 to-emerald-400" />
              <div>
                <div className="font-semibold tracking-tight">LandJav</div>
                <div className="text-xs text-white/60">Форум, запросы и чат • Без VPN</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 text-sm text-white/70">
              <span>Темы: {stats.threads}</span>
              <span>Запросы: {stats.requests}</span>
              <span>Каналы: {stats.channels}</span>
            </div>
          </div>
        </header>

        <Hero />

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <AuthPanel
              currentUser={currentUser}
              onRegister={handleRegister}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />

            <RequestBoard
              requests={requests}
              onCreateRequest={handleCreateRequest}
              currentUser={currentUser}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Forum
              threads={threads}
              onCreateThread={handleCreateThread}
              onAddReply={handleAddReply}
              currentUser={currentUser}
            />

            <div className="h-[520px]">
              <Chat
                channels={channels}
                activeChannelId={activeChannelId}
                onCreateChannel={handleCreateChannel}
                onSendMessage={handleSendMessage}
                messages={messages}
                currentUser={currentUser}
              />
            </div>
          </div>
        </main>

        <footer className="py-6 text-center text-sm text-white/60">
          LandJav • Надежно и быстро, без VPN
        </footer>
      </div>
    </div>
  );
}
