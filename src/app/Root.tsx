import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { BrandAtmosphere } from './components/BrandAtmosphere';
import { useLanguage } from './context/LanguageContext';
import { useSiteContent } from './context/SiteContentContext';

const SITE_URL = 'https://drd.co.il';

function upsertMeta(nameOrProperty: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${nameOrProperty}="${key}"]`;
  let node = document.head.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(nameOrProperty, key);
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let node = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement('link');
    node.setAttribute('rel', rel);
    document.head.appendChild(node);
  }
  node.setAttribute('href', href);
}

export function Root() {
  const location = useLocation();
  const { language } = useLanguage();
  const { content } = useSiteContent();

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const onMouseMove = (event: MouseEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        root.style.setProperty('--mouse-x', `${event.clientX}px`);
        root.style.setProperty('--mouse-y', `${event.clientY}px`);
        frame = 0;
      });
    };

    const onScroll = () => {
      root.style.setProperty('--dd-scroll', `${window.scrollY}px`);
    };

    onScroll();

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section'));

    sections.forEach((section, index) => {
      section.classList.add('dd-section');
      section.style.setProperty('--dd-order', String(index));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('dd-section-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const path = location.pathname;
    const canonicalPath = path === '/' ? '/' : path.replace(/\/+$/, '');
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const isRTL = language === 'he';
    const segments = canonicalPath.split('/').filter(Boolean);

    let title = isRTL ? 'דרוין עיצובים | עיצוב אתרים ופרסום ממוקד תוצאות' : 'Druyan Design | Web Design & Performance Marketing';
    let description = isRTL
      ? 'דרוין עיצובים בונה אתרים מהירים, עיצוב ממיר ופרסום ממוקד תוצאות לעסקים שרוצים צמיחה אמיתית.'
      : 'Druyan Design builds fast, conversion-focused websites and growth-driven digital marketing for measurable business outcomes.';
    let ogImage = `${SITE_URL}/projects/dr-amit-website.png`;

    if (segments[0] === 'projects' && segments[1]) {
      const project = content.projects.find((item) => item.id === segments[1]);
      if (project) {
        title = isRTL
          ? `${project.titleHe} | דרוין עיצובים`
          : `${project.titleEn} | Druyan Design`;
        description = isRTL ? project.descriptionHe : project.descriptionEn;
        if (project.image) {
          const imagePath = project.image.startsWith('/') ? project.image : `/${project.image}`;
          ogImage = `${SITE_URL}${imagePath}`;
        }
      }
    } else if (segments[0] === 'projects' || segments[0] === 'case-studies') {
      title = isRTL ? 'פרוייקטים מובילים | דרוין עיצובים' : 'Top Projects | Druyan Design';
      description = isRTL
        ? 'צפו בפרוייקטים המובילים שלנו עם תוצאות מדידות, אתרים חיים והשפעה עסקית אמיתית.'
        : 'Explore our top projects with measurable outcomes, live websites, and real business impact.';
    } else if (segments[0] === 'services') {
      title = isRTL ? 'שירותים | דרוין עיצובים' : 'Services | Druyan Design';
      description = isRTL
        ? 'עיצוב אתרים, פרסום ממומן וחבילות צמיחה מלאות בהתאמה לעסק שלך.'
        : 'Website design, paid advertising, and complete growth packages tailored to your business.';
    } else if (segments[0] === 'pricing') {
      title = isRTL ? 'אפשרויות עבודה | דרוין עיצובים' : 'Pricing | Druyan Design';
      description = isRTL
        ? 'מסלולי עבודה ברורים: אתר, אתר+מודעות, או ניהול צמיחה מלא.'
        : 'Clear packages: website build, website + launch ads, or full growth management.';
    } else if (segments[0] === 'contact') {
      title = isRTL ? 'יצירת קשר | דרוין עיצובים' : 'Contact | Druyan Design';
      description = isRTL
        ? 'דברו איתנו על הפרויקט שלכם וקבלו הצעה מותאמת אישית.'
        : 'Talk to us about your project and get a tailored proposal.';
    } else if (segments[0] === 'insights') {
      title = isRTL ? 'תובנות | דרוין עיצובים' : 'Insights | Druyan Design';
      description = isRTL
        ? 'תובנות פרקטיות לעיצוב, שיווק וצמיחה דיגיטלית.'
        : 'Practical insights for design, marketing, and digital growth.';
    } else if (segments[0] === 'about') {
      title = isRTL ? 'אודות | דרוין עיצובים' : 'About | Druyan Design';
      description = isRTL
        ? 'סטודיו דיגיטלי לבניית מותגים ואתרים שמניעים תוצאות.'
        : 'A digital studio building brands and websites that drive results.';
    } else if (segments[0] === 'faq') {
      title = isRTL ? 'שאלות נפוצות | דרוין עיצובים' : 'FAQ | Druyan Design';
      description = isRTL
        ? 'תשובות לשאלות נפוצות על תהליך העבודה, זמני פרויקט ותמיכה.'
        : 'Answers to common questions about process, timelines, and support.';
    }

    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    upsertMeta('name', 'theme-color', '#ffffff');
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', 'Druyan Design');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:image:alt', isRTL ? 'תצוגת פרויקט של דרוין עיצובים' : 'Druyan Design project preview');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
    upsertLink('canonical', canonicalUrl);

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Druyan Design',
      url: SITE_URL,
      image: `${SITE_URL}/projects/dr-amit-website.png`,
      telephone: '0535532893',
      email: content.siteInfo.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tel Aviv',
        addressCountry: 'IL',
      },
      sameAs: [],
      areaServed: ['IL'],
      serviceType: ['Website Design', 'Paid Advertising', 'Digital Growth'],
    };

    let ldJsonNode = document.head.querySelector<HTMLScriptElement>('script#structured-data');
    if (!ldJsonNode) {
      ldJsonNode = document.createElement('script');
      ldJsonNode.type = 'application/ld+json';
      ldJsonNode.id = 'structured-data';
      document.head.appendChild(ldJsonNode);
    }
    ldJsonNode.textContent = JSON.stringify(structuredData);
  }, [location.pathname, language, content.projects, content.siteInfo.email]);

  return (
    <div className="dd-site min-h-screen">
      <BrandAtmosphere />
      <Navigation />
      <main className="relative z-10">
        <div key={`${location.pathname}${location.search}`} className="route-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
