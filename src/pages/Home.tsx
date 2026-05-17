import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Process from '../components/Process';
import Marketplaces from '../components/Marketplaces';
import Team from '../components/Team';
import Workshop from '../components/Workshop';

export default function Home() {
  return (
    <main>
      <Hero ready={true} />
      <About />
      <Services />
      <Process />
      <Marketplaces />
      <Team />
      <Workshop />
    </main>
  );
}
