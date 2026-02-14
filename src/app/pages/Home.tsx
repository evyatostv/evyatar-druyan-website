import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Portfolio } from '../components/Portfolio';
import { Process } from '../components/Process';
import { Pricing } from '../components/Pricing';
import { About } from '../components/About';
import { FinalCTA } from '../components/FinalCTA';
import { useSiteContent } from '../context/SiteContentContext';

export function Home() {
  const { content } = useSiteContent();

  const sections = {
    hero: <Hero key="hero" />,
    services: <Services key="services" />,
    portfolio: <Portfolio key="portfolio" />,
    process: <Process key="process" />,
    pricing: <Pricing key="pricing" />,
    about: <About key="about" />,
    finalCta: <FinalCTA key="finalCta" />,
  };

  return (
    <div className="pt-20">
      {content.homeSections.map((sectionId) => sections[sectionId])}
    </div>
  );
}
