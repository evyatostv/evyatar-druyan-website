import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Portfolio } from '../components/Portfolio';
import { Process } from '../components/Process';
import { Pricing } from '../components/Pricing';
import { About } from '../components/About';
import { FinalCTA } from '../components/FinalCTA';

export function Home() {
  return (
    <div className="pt-20">
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <Pricing />
      <About />
      <FinalCTA />
    </div>
  );
}
