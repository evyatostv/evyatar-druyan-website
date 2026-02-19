import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Capacitor } from '@capacitor/core';
import App from './app/App';
import { Admin } from './app/pages/Admin';
import { LanguageProvider } from './app/context/LanguageContext';
import { SiteContentProvider } from './app/context/SiteContentContext';
import './styles/index.css';

const forceNativeAdmin = import.meta.env.VITE_NATIVE_APP === 'true';
const isNativeApp =
  forceNativeAdmin ||
  Capacitor.isNativePlatform() ||
  (typeof window !== 'undefined' &&
    (Boolean((window as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.()) ||
      Boolean((window as { webkit?: { messageHandlers?: { bridge?: unknown } } }).webkit?.messageHandlers?.bridge) ||
      ['capacitor:', 'ionic:', 'file:'].includes(window.location.protocol)));

if (isNativeApp) {
  const normalizedPath = window.location.pathname.replace(/\/index\.html$/, '/') || '/';
  if (normalizedPath !== '/admin') {
    window.history.replaceState(null, '', '/admin');
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isNativeApp ? (
      <LanguageProvider>
        <SiteContentProvider>
          <Admin />
        </SiteContentProvider>
      </LanguageProvider>
    ) : (
      <App />
    )}
  </StrictMode>,
);
