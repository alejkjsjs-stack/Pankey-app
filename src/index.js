import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import reportWebVitals from './reportWebVitals';

// Red de seguridad para errores asíncronos benignos de Firebase (p.ej. permiso
// denegado cuando la sesión cambia). Evita que una promesa rechazada "suelta"
// tumbe la experiencia; los demás errores siguen su curso normal.
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (ev) => {
    try {
      const msg = String((ev && ev.reason && (ev.reason.message || ev.reason.code)) || ev.reason || '');
      if (/permission[_\s]?denied/i.test(msg)) {
        ev.preventDefault();
        console.warn('[Simu] Aviso de Firebase controlado:', msg);
      }
    } catch (_) {}
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
