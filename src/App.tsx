import { useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Marketplaces from './components/Marketplaces';
import Team from './components/Team';
import Workshop from './components/Workshop';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <Header />
      <main>
        <Hero ready={!loading} />
        <About />
        <Services />
        <Process />
        <Marketplaces />
        <Team />
        <Workshop />
      </main>
      <Footer />
    </>
  );
}
