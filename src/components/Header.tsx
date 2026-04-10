import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { animate, stagger } from 'animejs';
import logo from '../assets/logo.png';

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Contato', href: '#contato' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio');

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      requestAnimationFrame(() => {
        animate('.mobile-link', {
          translateX: [-40, 0],
          opacity: [0, 1],
          delay: stagger(70),
          duration: 600,
          ease: 'outExpo',
        });
      });
    }
  };

  return (
    <>
      {/* ═══ HEADER BAR ═══ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          open
            ? 'opacity-0 pointer-events-none -translate-y-2'
            : 'opacity-100 translate-y-0'
        } ${
          scrolled
            ? 'bg-[#0a0a0fCC] backdrop-blur-xl border-b border-gold/8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-[#0a0a0f]/80 backdrop-blur-md'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute top-0 left-0 h-[2px] z-10 transition-all duration-75"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #d4a853, #4da6e0, #8b5cf6)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="LumeArt"
                className="h-9 w-9 lg:h-11 lg:w-11 transition-transform duration-300 group-hover:scale-110 animate-glow"
              />
              <span className="font-heading text-sm lg:text-base font-bold text-gold tracking-[0.15em]">
                LUMEART
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative text-sm uppercase tracking-[0.18em] font-medium transition-colors duration-300
                    after:absolute after:bottom-[-4px] after:left-0 after:h-px after:transition-all after:duration-300
                    ${
                      activeSection === l.href
                        ? 'text-gold after:w-full after:bg-gold'
                        : 'text-gray-400 hover:text-gold after:w-0 after:bg-gold hover:after:w-full'
                    }`}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/lume.art3d"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-gold transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(212,168,83,0.4)]"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <button
                className="md:hidden p-2 text-gray-400 hover:text-gold transition-colors"
                onClick={toggle}
                aria-label="Abrir menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ MOBILE FULLSCREEN MENU ═══ */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[55]">
          {/* Background */}
          <div className="absolute inset-0 bg-[#060610]/[0.97] backdrop-blur-2xl" />

          {/* Dot matrix */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #d4a853 0.8px, transparent 0.8px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Scan line */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent"
              style={{ animation: 'scan-line 3s linear infinite' }}
            />
          </div>

          {/* Crosshair decor */}
          <div className="absolute top-24 right-8 w-16 h-16 opacity-[0.06] pointer-events-none">
            <div className="w-full h-full border border-gold/30 rounded-full" style={{ animation: 'spin 12s linear infinite' }}>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gold/30" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/30" />
            </div>
          </div>

          {/* ── Top bar with close button ── */}
          <div
            className="relative flex items-center justify-between px-4 h-16"
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)', marginTop: 'env(safe-area-inset-top, 0px)' }}
          >
            {/* Logo in menu */}
            <a href="#inicio" onClick={() => setOpen(false)} className="flex items-center gap-3">
              <img src={logo} alt="LumeArt" className="h-9 w-9 animate-glow" />
              <span className="font-heading text-sm font-bold text-gold tracking-[0.15em]">
                LUMEART
              </span>
            </a>

            {/* Close button — X in the same spot as hamburger */}
            <button
              className="p-2 text-gold hover:text-gold-light transition-all duration-300 hover:rotate-90"
              onClick={toggle}
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* ── Content ── */}
          <div className="relative h-[calc(100%-5rem)] overflow-y-auto">
            {/* HUD label */}
            <div className="px-6 pb-2 pt-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-pulse" />
                <span className="font-pixel text-[0.875rem] text-gold/30 tracking-[0.4em] uppercase">
                  Navigation System
                </span>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-gold/15 to-transparent" />
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-6 pt-4 gap-1">
              {navLinks.map((l, i) => {
                const isActive = activeSection === l.href;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`mobile-link group relative flex items-center gap-4 py-3.5 px-4 rounded-lg opacity-0 transition-all duration-300
                      ${isActive
                        ? 'bg-gold/[0.07] border border-gold/15'
                        : 'border border-transparent hover:bg-white/[0.02] hover:border-gold/[0.06]'
                      }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-gold shadow-[0_0_8px_rgba(212,168,83,0.5)]" />
                    )}
                    <span className={`font-mono text-[0.875rem] w-6 shrink-0 transition-colors duration-300 ${
                      isActive ? 'text-gold/60' : 'text-gray-600 group-hover:text-gold/40'
                    }`}>
                      0{i}
                    </span>
                    <div className={`w-1 h-1 rounded-full shrink-0 transition-colors duration-300 ${
                      isActive ? 'bg-gold/50' : 'bg-gray-700 group-hover:bg-gold/30'
                    }`} />
                    <span className={`font-heading text-base uppercase tracking-[0.2em] transition-all duration-300 ${
                      isActive ? 'text-gold font-semibold' : 'text-gray-300 group-hover:text-gold font-medium'
                    }`}>
                      {l.label}
                    </span>
                    <span className={`ml-auto font-mono text-[0.875rem] transition-all duration-300 ${
                      isActive ? 'text-gold/40' : 'text-transparent group-hover:text-gold/25 -translate-x-2 group-hover:translate-x-0'
                    }`}>
                      →
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* Bottom section */}
            <div className="px-6 mt-8 pb-10">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent mb-6" />

              {/* Instagram CTA */}
              <a
                href="https://www.instagram.com/lume.art3d"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 py-3 px-4 rounded-lg border border-gold/10 bg-gold/[0.03] hover:bg-gold/[0.07] hover:border-gold/20 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                  <InstagramIcon size={16} />
                </div>
                <div>
                  <span className="text-sm text-gray-300 group-hover:text-gold transition-colors font-medium block">
                    @lume.art3d
                  </span>
                  <span className="text-[0.875rem] text-gray-600">
                    Solicitar orçamento
                  </span>
                </div>
                <span className="ml-auto text-gray-600 group-hover:text-gold/40 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </span>
              </a>

              {/* Status */}
              <div className="flex items-center justify-between mt-5">
                <span className="font-pixel text-[0.75rem] text-gray-700 tracking-widest">SYS.OK</span>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-green-500/40 animate-pulse" />
                  <span className="font-pixel text-[0.75rem] text-gray-700 tracking-widest">ONLINE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Corner brackets */}
          <div className="absolute top-20 left-4 w-5 h-5 border-l border-t border-gold/10 pointer-events-none" />
          <div className="absolute top-20 right-4 w-5 h-5 border-r border-t border-gold/10 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-l border-b border-gold/10 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-r border-b border-gold/10 pointer-events-none" />
        </div>
      )}
    </>
  );
}
