import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import RouterApp from './RouterApp';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RouterApp />
    </BrowserRouter>
  </StrictMode>,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        void registration.unregister();
      });
    });
  });
}

if ('caches' in window) {
  window.addEventListener('load', () => {
    caches.keys().then((keys) => {
      keys
        .filter((key) => key.startsWith('physiohub-'))
        .forEach((key) => {
          void caches.delete(key);
        });
    });
  });
}
