import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In a real app you could log to an external service here
    // console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReload = () => {
    if (typeof window !== 'undefined') window.location.reload();
  };

  render() {
    const { hasError } = this.state;
    const lang = this.props.lang || 'en';

    if (hasError) {
      return (
        <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-6">
          <div className="max-w-lg w-full border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur">
            <h1 className="text-2xl font-semibold mb-2">
              {lang === 'ru' ? 'Что-то пошло не так' : 'Something went wrong'}
            </h1>
            <p className="text-white/70 mb-6">
              {lang === 'ru'
                ? 'Мы уже работаем над исправлением. Попробуйте обновить страницу.'
                : 'We are working to fix this. Please try reloading the page.'}
            </p>
            <button
              onClick={this.handleReload}
              className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition"
            >
              {lang === 'ru' ? 'Перезагрузить' : 'Reload'}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
