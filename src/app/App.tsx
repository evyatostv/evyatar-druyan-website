import { RouterProvider } from 'react-router';
import { Capacitor } from '@capacitor/core';
import { LanguageProvider } from './context/LanguageContext';
import { SiteContentProvider } from './context/SiteContentContext';
import { router } from './routes';
import { Admin } from './pages/Admin';

export default function App() {
  const isNativeApp = Capacitor.isNativePlatform();

  return (
    <LanguageProvider>
      <SiteContentProvider>
        {isNativeApp ? <Admin /> : <RouterProvider router={router} />}
      </SiteContentProvider>
    </LanguageProvider>
  );
}
