import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Optional: log to monitoring service
    // console.error('ErrorBoundary caught:', error, info);
  }

  handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    const { hasError } = this.state;
    const lang = this.props.lang || 'en';

    if (hasError) {
      const l =
        lang === 'ru'
          ? {
              title: 'Что-то пошло не так',
              desc: 'Произошла непредвиденная ошибка. Обновите страницу, чтобы продолжить.',
              reload: 'Обновить',
            }
          : {
              title: 'Something went wrong',
              desc: 'An unexpected error occurred. Reload the page to continue.',
              reload: 'Reload',
            };

      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur p-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-white/10 border border-white/10 mb-4" />
            <h2 className="text-xl font-semibold">{l.title}</h2>
            <p className="text-white/70 text-sm mt-2">{l.desc}</p>
            <button
              onClick={this.handleReload}
              className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg border border-white/20 bg-white text-black hover:opacity-90 transition"
            >
              {l.reload}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
