import React, { useState, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [lang, setLang] = useState('en');
  const toggleLang = () => setLang((l) => (l === 'en' ? 'ru' : 'en'));

  return (
    <ErrorBoundary lang={lang}>
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar lang={lang} onToggleLang={toggleLang} />
        <main className="flex-1">
          <Suspense fallback={<div className="p-8 text-white/70">Loading…</div>}>
            <Hero />
          </Suspense>
          <Features lang={lang} />
        </main>
        <Footer lang={lang} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
