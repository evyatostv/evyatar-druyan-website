import { Component, lazy, StrictMode, Suspense, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ShopifyLead } from '../src/app/pages/ShopifyLead';
import './reset.css';

const LeadAdmin = lazy(() => import('./admin-route'));

class PageErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <main dir="rtl" style={{ padding: '48px 24px', maxWidth: 640, margin: 'auto', fontFamily: 'Heebo, sans-serif' }}>
      <h1>לא הצלחנו לטעון את העמוד</h1>
      <p>בדקו את החיבור לאינטרנט ונסו לטעון שוב.</p>
      <button type="button" onClick={() => window.location.reload()} style={{ padding: '14px 24px', cursor: 'pointer' }}>טעינה מחדש</button>
    </main>;
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><PageErrorBoundary><BrowserRouter><Suspense fallback={<p dir="rtl" style={{ padding: 32 }}>טוענים…</p>}><Routes>
    <Route path="/shopify" element={<ShopifyLead />} />
    <Route path="/shopify/inbox" element={<LeadAdmin />} />
    <Route path="/shopify/:service" element={<ShopifyLead />} />
  </Routes></Suspense></BrowserRouter></PageErrorBoundary></StrictMode>,
);
