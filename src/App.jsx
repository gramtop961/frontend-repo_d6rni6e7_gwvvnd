import { useEffect, useMemo, useState } from 'react';
import AuthPanel from './components/AuthPanel';
import Forum from './components/Forum';
import RequestBoard from './components/RequestBoard';
import Chat from './components/Chat';

// In this first iteration, we use local state to demonstrate the UI and flows
// The backend endpoints can be connected later using VITE_BACKEND_URL

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
    // Basic local registration (demo). Replace with backend call later.
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

  // Example demo content to avoid empty state
  useEffect(() => {
    setThreads([
      { id: 't1', title: 'Welcome! / Добро пожаловать!', content: 'Introduce yourself below', author: 'system', created_at: Date.now() - 500000, replies: [] },
    ]);
    setRequests([
      { id: 'r1', title: 'Dark mode', details: 'Add a toggle for dark mode', status: 'open', author: 'maria' },
    ]);
    setMessages({
      general: [
        { text: 'Hello everyone! / Всем привет!', author: 'system', created_at: Date.now() - 300000 },
      ],
    });
  }, []);

  const stats = useMemo(() => ({
    threads: threads.length,
    requests: requests.length,
    channels: channels.length,
  }), [threads.length, requests.length, channels.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-violet-50 text-gray-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600" />
            <div>
              <div className="font-semibold">Open Forum & Chat / Форум и Чат</div>
              <div className="text-xs text-gray-500">Fast, reliable, VPN-free / Быстро и надежно</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Threads: {stats.threads}</span>
            <span>Requests: {stats.requests}</span>
            <span>Channels: {stats.channels}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
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

          <div className="h-[480px]">
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

      <footer className="py-6 text-center text-sm text-gray-500">
        Built for reliability: no VPN required / Без VPN, стабильно и быстро
      </footer>
    </div>
  );
}
