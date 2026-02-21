import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { CaseStudies } from './pages/CaseStudies';
import { CaseStudyDetail } from './pages/CaseStudyDetail';
import { ServiceDetail } from './pages/Services';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Insights } from './pages/Insights';
import { InsightDetail } from './pages/InsightDetail';
import { Results } from './pages/Results';
import { Admin } from './pages/Admin';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Root,
      children: [
        { index: true, Component: Home },
        { path: 'projects', Component: CaseStudies },
        { path: 'projects/:id', Component: CaseStudyDetail },
        { path: 'case-studies', Component: CaseStudies },
        { path: 'case-studies/:id', Component: CaseStudyDetail },
        { path: 'services/:service', Component: ServiceDetail },
        { path: 'pricing', Component: PricingPage },
        { path: 'about', Component: AboutPage },
        { path: 'contact', Component: Contact },
        { path: 'faq', Component: FAQ },
        { path: 'insights', Component: Insights },
        { path: 'insights/:slug', Component: InsightDetail },
        { path: 'results', Component: Results },
      ],
    },
    { path: '/admin', Component: Admin },
  ],
  { basename: import.meta.env.BASE_URL },
);
