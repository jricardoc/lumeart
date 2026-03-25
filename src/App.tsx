import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import { CursorParticles } from './components/effects/CursorParticles';
import { ScrollToTop } from './components/layout/ScrollToTop';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen bg-[#080D1A] font-sans text-slate-200 selection:bg-[#D4AF37] selection:text-[#080D1A]">
      <ScrollToTop />
      {/* The new Ethereal Cursor Masterpiece */}
        <CursorParticles />
        
        {/* Noise overlay for texture */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        <Navbar />
        
        <main className="relative z-10 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/produtos" element={<Products />} />
          </Routes>
        </main>

        <Footer />
      </div>
  );
}

export default App;
