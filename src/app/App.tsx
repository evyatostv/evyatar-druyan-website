import { RouterProvider } from 'react-router';
import { Capacitor } from '@capacitor/core';
import { LanguageProvider } from './context/LanguageContext';
import { SiteContentProvider } from './context/SiteContentContext';
import { router } from './routes';
import { Admin } from './pages/Admin';

export default function App() {
  const forceNativeAdmin = import.meta.env.VITE_NATIVE_APP === 'true';
  const isNativeApp =
    forceNativeAdmin ||
    Capacitor.isNativePlatform() ||
    (typeof window !== 'undefined' &&
      (Boolean((window as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.()) ||
        Boolean((window as { webkit?: { messageHandlers?: { bridge?: unknown } } }).webkit?.messageHandlers?.bridge) ||
        ['capacitor:', 'ionic:', 'file:'].includes(window.location.protocol)));

  return (
    <LanguageProvider>
      <SiteContentProvider>
        {isNativeApp ? <Admin /> : <RouterProvider router={router} />}
      </SiteContentProvider>
    </LanguageProvider>
  );
}
