import React from 'react';

function Footer({ lang }) {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/60 text-sm">© {new Date().getFullYear()} LandJav. {lang === 'ru' ? 'Все права защищены.' : 'All rights reserved.'}</p>
        <nav className="flex items-center gap-4 text-sm text-white/70">
          <a href="#" className="hover:text-white transition">{lang === 'ru' ? 'Конфиденциальность' : 'Privacy'}</a>
          <a href="#" className="hover:text-white transition">{lang === 'ru' ? 'Условия' : 'Terms'}</a>
          <a href="#" className="hover:text-white transition">{lang === 'ru' ? 'Контакты' : 'Contact'}</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
