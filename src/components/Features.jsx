import React from 'react';
import { Shield, Rocket, MessageSquare } from 'lucide-react';

const items = [
  {
    icon: Shield,
    title: { en: 'Works Everywhere', ru: 'Работает везде' },
    desc: {
      en: 'Compatible with all modern browsers and gracefully degrades on older ones.',
      ru: 'Совместимо со всеми современными браузерами и корректно работает на старых.'
    }
  },
  {
    icon: Rocket,
    title: { en: 'Fast & Optimized', ru: 'Быстро и оптимизировано' },
    desc: {
      en: 'Lazy loading, code splitting, and CDN-first assets for speed.',
      ru: 'Ленивая загрузка, разделение кода и CDN-активы для высокой скорости.'
    }
  },
  {
    icon: MessageSquare,
    title: { en: 'Global Access', ru: 'Доступ по всему миру' },
    desc: {
      en: 'CORS-friendly API and resilient network paths for worldwide reach.',
      ru: 'Дружелюбные CORS-настройки и надёжные сети для доступа по всему миру.'
    }
  }
];

function Features({ lang }) {
  return (
    <section className="py-12 md:py-16 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        {items.map(({ icon: Icon, title, desc }, idx) => (
          <div key={idx} className="rounded-2xl border border-white/10 p-6 bg-white/5">
            <Icon className="text-white mb-4" />
            <h3 className="text-lg font-semibold mb-2">{title[lang]}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{desc[lang]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
