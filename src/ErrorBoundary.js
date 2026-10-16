/* eslint-disable */
import React from 'react';

// Red de seguridad global: si cualquier parte de la app lanza un error de
// render, en vez de dejar la pantalla en blanco mostramos una pantalla de
// recuperación con la estética "Ascua". NO borra la sesión del usuario.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, detail: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, detail: (error && (error.message || String(error))) || '' };
  }

  componentDidCatch(error, info) {
    // Deja rastro en consola para diagnóstico (y para un futuro crash-reporting).
    try { console.error('[Simu ErrorBoundary]', error, info && info.componentStack); } catch (_) {}
  }

  handleReload = () => {
    try { window.location.reload(); } catch (_) {}
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const wrap = {
      position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '32px 24px',
      background: 'radial-gradient(circle at 50% 38%, #1a0a0c 0%, #000000 70%)',
      color: '#F6F1F2', fontFamily: "'Inter', system-ui, sans-serif",
      textAlign: 'center', zIndex: 999999,
    };
    const ember = {
      width: 72, height: 72, borderRadius: '50%', marginBottom: 28,
      background: 'radial-gradient(circle at 50% 42%, #FFCF6B 0%, #FF2E4C 55%, #7a0f1c 100%)',
      boxShadow: '0 0 48px 8px rgba(255,46,76,0.45), 0 0 120px 24px rgba(255,46,76,0.18)',
    };
    const title = {
      fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontWeight: 700,
      fontSize: 24, letterSpacing: '-0.01em', margin: '0 0 10px',
    };
    const text = {
      fontSize: 15, lineHeight: 1.55, color: '#C9BFC2', maxWidth: 340, margin: '0 0 28px',
    };
    const btn = {
      appearance: 'none', border: 'none', cursor: 'pointer',
      padding: '14px 30px', borderRadius: 14, fontSize: 15, fontWeight: 700,
      color: '#1a0a0c', fontFamily: "'Inter', sans-serif",
      background: 'linear-gradient(135deg, #FFCF6B 0%, #FF2E4C 100%)',
      boxShadow: '0 8px 24px rgba(255,46,76,0.35)',
    };

    return (
      <div style={wrap}>
        <div style={ember} />
        <h1 style={title}>El fogón se avivó de más</h1>
        <p style={text}>
          Algo se tropezó por un momento. Tu progreso está a salvo — solo toca
          reiniciar para volver al ruedo.
        </p>
        <button style={btn} onClick={this.handleReload}>Reiniciar Simu</button>
      </div>
    );
  }
}

export default ErrorBoundary;
