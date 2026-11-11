import { Admin } from '../src/app/pages/Admin';
import { LanguageProvider } from '../src/app/context/LanguageContext';
import { SiteContentProvider } from '../src/app/context/SiteContentContext';
import '../src/styles/index.css';

export default function AdminRoute() {
  return (
    <LanguageProvider>
      <SiteContentProvider>
        <Admin />
      </SiteContentProvider>
    </LanguageProvider>
  );
}
