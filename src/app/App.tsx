import { RouterProvider } from 'react-router';
import { LanguageProvider } from './context/LanguageContext';
import { SiteContentProvider } from './context/SiteContentContext';
import { router } from './routes';

export default function App() {
  return (
    <LanguageProvider>
      <SiteContentProvider>
        <RouterProvider router={router} />
      </SiteContentProvider>
    </LanguageProvider>
  );
}
