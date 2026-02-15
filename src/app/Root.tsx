import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { BrandAtmosphere } from './components/BrandAtmosphere';

export function Root() {
  const location = useLocation();

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

  return (
    <div className="dd-site min-h-screen">
      <BrandAtmosphere />
      <Navigation />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
