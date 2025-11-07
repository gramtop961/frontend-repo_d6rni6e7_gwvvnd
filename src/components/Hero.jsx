import React, { useEffect, useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';

const SplineFallback = ({ lang }) => (
  <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-zinc-900 via-black to-black">
    <div className="text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60">
        LandJav
      </h1>
      <p className="mt-4 text-sm md:text-base text-white/70 max-w-xl mx-auto">
        {lang === 'ru'
          ? 'Лёгкая, быстрая и доступная платформа — работает везде без VPN.'
          : 'Lightweight, fast, and accessible everywhere — no VPN needed.'}
      </p>
    </div>
  </div>
);

export default function Hero({ lang = 'en' }) {
  const [canAnimate, setCanAnimate] = useState(false);
  const [splineError, setSplineError] = useState(false);

  useEffect(() => {
    try {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      setCanAnimate(!m.matches);
      const onChange = () => setCanAnimate(!m.matches);
      if (m.addEventListener) m.addEventListener('change', onChange);
      else if (m.addListener) m.addListener(onChange);
      return () => {
        if (m.removeEventListener) m.removeEventListener('change', onChange);
        else if (m.removeListener) m.removeListener(onChange);
      };
    } catch {
      setCanAnimate(true);
    }
  }, []);

  const headline = useMemo(
    () => (lang === 'ru' ? 'Добро пожаловать в LandJav' : 'Welcome to LandJav'),
    [lang]
  );
  const subline = useMemo(
    () =>
      lang === 'ru'
        ? 'Форум, запросы и чат в одном месте. Быстро. Доступно. Надёжно.'
        : 'Forum, requests, and chat in one place. Fast. Open. Reliable.',
    [lang]
  );

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden rounded-2xl border border-white/10 bg-black">
      {canAnimate && !splineError ? (
        <Spline
          scene="https://prod.spline.design/EQgEIs2r5cMbWroZ/scene.splinecode"
          onError={() => setSplineError(true)}
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <SplineFallback lang={lang} />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black" />

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-white drop-shadow-sm">
            {headline}
          </h1>
          <p className="mt-3 md:mt-4 text-white/70 max-w-2xl mx-auto">
            {subline}
          </p>
        </div>
      </div>
    </section>
  );
}
