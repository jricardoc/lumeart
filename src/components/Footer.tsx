import { useEffect, useState } from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import logo from '../assets/logo.png';

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const [showCursor, setShowCursor] = useState(true);
  const [rocketActive, setRocketActive] = useState(false);

  /* Blinking cursor */
  useEffect(() => {
    const timer = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    setRocketActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setRocketActive(false), 1500);
  };

  return (
    <footer id="contato" className="relative bg-surface/60 scroll-mt-20">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Terminal window header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
          <span className="font-mono text-[10px] text-gray-600 ml-2">
            lumeart@studio:~$
          </span>
        </div>

        {/* Main row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="LumeArt"
              className="h-10 w-10 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(212,168,83,0.3)]"
            />
            <div>
              <span className="font-heading text-sm font-bold text-gold tracking-[0.15em] block">
                LUMEART
              </span>
              <span className="text-[10px] text-gray-600 tracking-wider font-mono">
                Impressão 3D &bull; Salvador-BA
              </span>
            </div>
          </a>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/lume.art3d"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-gold transition-all duration-300 text-sm hover:drop-shadow-[0_0_8px_rgba(212,168,83,0.4)]"
            >
              <InstagramIcon size={16} />
              <span>@lume.art3d</span>
            </a>
          </div>

          {/* Rocket back to top */}
          <button
            onClick={scrollToTop}
            className={`group p-2.5 rounded-lg border border-gold/10 text-gold/40 hover:text-gold hover:border-gold/25 transition-all duration-300 ${
              rocketActive
                ? 'animate-bounce border-gold/30 text-gold'
                : ''
            }`}
            aria-label="Voltar ao topo"
          >
            <ArrowUp
              size={16}
              className={`transition-transform duration-500 ${
                rocketActive
                  ? '-translate-y-1'
                  : 'group-hover:-translate-y-0.5'
              }`}
            />
          </button>
        </div>

        {/* Bottom — Terminal style */}
        <div className="mt-10 pt-6 border-t border-white/[0.04]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs font-mono flex items-center gap-1">
              <span className="text-gold/30">{'>'}</span>
              &copy; {new Date().getFullYear()} LumeArt. Todos os direitos
              reservados.
              <span
                className={`inline-block w-1.5 h-3.5 bg-gold/40 ml-0.5 transition-opacity duration-100 ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </p>
            <p className="flex items-center gap-1 text-gray-600 text-xs">
              Feito com{' '}
              <Heart size={12} className="text-gold/50 animate-pulse" /> em
              Salvador-BA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
