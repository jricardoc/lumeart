import { useEffect, useState, useRef, useCallback } from 'react';
import { animate, stagger } from 'animejs';
import { ArrowUp, Heart, Zap, MapPin, Mail } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
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

/* Floating particles for footer ambiance */
function FooterParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const colors = ['#d4a853', '#4da6e0', '#8b5cf6'];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.globalAlpha = p.alpha * 0.3;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

/* Typing terminal */
function TerminalTyping() {
  const lines = [
    { prefix: '>', text: ' echo "Obrigado por visitar a LumeArt!"', color: '#d4a853' },
    { prefix: '$', text: ' git commit -m "feat: mais um cliente feliz"', color: '#4da6e0' },
    { prefix: '>', text: ' sudo print --material PLA --quality ultra', color: '#8b5cf6' },
    { prefix: '$', text: ' npm run create-masterpiece', color: '#2dd4bf' },
  ];

  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const line = lines[lineIdx];
    if (charIdx <= line.text.length) {
      const timer = setTimeout(() => setCharIdx(charIdx + 1), 40 + Math.random() * 30);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLineIdx((lineIdx + 1) % lines.length);
        setCharIdx(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [charIdx, lineIdx]);

  const currentLine = lines[lineIdx];

  return (
    <div className="font-mono text-sm">
      <span style={{ color: currentLine.color + '60' }}>{currentLine.prefix}</span>
      <span className="text-gray-400">
        {currentLine.text.slice(0, charIdx)}
      </span>
      <span
        className={`inline-block w-2 h-4 align-middle ml-0.5 transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: currentLine.color + '60' }}
      />
    </div>
  );
}

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Equipe', href: '#equipe' },
];

export default function Footer() {
  const [rocketActive, setRocketActive] = useState(false);
  const yearRef = useRef<HTMLSpanElement>(null);

  const ref = useScrollReveal((el) => {
    animate(el.querySelectorAll('.foot-anim'), {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(80),
      ease: 'outExpo',
    });
  });

  /* Animated year counter */
  useEffect(() => {
    if (!yearRef.current) return;
    const year = new Date().getFullYear();
    animate(yearRef.current, {
      textContent: [2020, year],
      round: 1,
      duration: 1500,
      ease: 'outExpo',
    });
  }, []);

  const scrollToTop = useCallback(() => {
    setRocketActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setRocketActive(false), 1500);
  }, []);

  return (
    <footer id="contato" className="relative bg-surface/60 scroll-mt-20 overflow-hidden">
      {/* Top gradient divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Particles */}
      <FooterParticles />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.008] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,168,83,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* ── Main grid: 3 columns ── */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 mb-14">
          {/* Col 1: Brand + terminal */}
          <div className="foot-anim">
            <a href="#inicio" className="flex items-center gap-3 group mb-5">
              <img
                src={logo}
                alt="LumeArt"
                className="h-11 w-11 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(212,168,83,0.4)]"
              />
              <div>
                <span className="font-heading text-base font-bold text-gold tracking-[0.15em] block">
                  LUMEART
                </span>
                <span className="text-[0.875rem] text-gray-600 tracking-wider font-mono">
                  Do Pixel à Realidade
                </span>
              </div>
            </a>

            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Transformando ideias em peças únicas com impressão 3D.
              De Salvador para o universo geek.
            </p>

            {/* Live terminal */}
            <div className="rounded-lg border border-white/[0.04] bg-[#0c0c1a]/60 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
                </div>
                <span className="font-mono text-[0.75rem] text-gray-700">lumeart:~$</span>
              </div>
              <TerminalTyping />
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="foot-anim">
            <h4 className="font-pixel text-[0.875rem] text-gold/40 tracking-[0.3em] uppercase mb-5">
              // NAVIGATION
            </h4>
            <nav className="space-y-3">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-3 text-gray-400 hover:text-gold transition-all duration-300"
                >
                  <span className="font-mono text-[0.875rem] text-gray-600 group-hover:text-gold/50 transition-colors w-5">
                    0{i}
                  </span>
                  <span className="w-3 h-px bg-white/[0.06] group-hover:w-6 group-hover:bg-gold/30 transition-all duration-300" />
                  <span className="text-sm uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">
                    {link.label}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3: Contact + socials */}
          <div className="foot-anim">
            <h4 className="font-pixel text-[0.875rem] text-gold/40 tracking-[0.3em] uppercase mb-5">
              // CONNECT
            </h4>

            <div className="space-y-4 mb-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/lume.art3d"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 rounded-lg border border-white/[0.04] hover:border-gold/15 bg-white/[0.01] hover:bg-gold/[0.03] transition-all duration-400"
              >
                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-all duration-400 group-hover:scale-110">
                  <InstagramIcon size={16} />
                </div>
                <div>
                  <span className="text-sm text-gray-300 group-hover:text-gold transition-colors font-medium block">
                    @lume.art3d
                  </span>
                  <span className="text-[0.875rem] text-gray-600">
                    Siga nosso trabalho
                  </span>
                </div>
                <span className="ml-auto text-gray-700 group-hover:text-gold/40 group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.04] bg-white/[0.01]">
                <div className="w-9 h-9 rounded-lg bg-purple/10 flex items-center justify-center">
                  <MapPin size={16} className="text-purple" />
                </div>
                <div>
                  <span className="text-sm text-gray-300 font-medium block">
                    Salvador, BA
                  </span>
                  <span className="text-[0.875rem] text-gray-600">
                    Brasil 🇧🇷
                  </span>
                </div>
              </div>
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/[0.04] border border-green-500/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ boxShadow: '0 0 8px #22c55e40' }} />
              <span className="font-pixel text-[0.75rem] text-green-500/60 tracking-widest uppercase">
                Aceitando Projetos
              </span>
              <Zap size={12} className="text-green-500/40 ml-auto" />
            </div>
          </div>
        </div>

        {/* ── Divider with energy line ── */}
        <div className="relative h-px mb-8">
          <div className="absolute inset-0 bg-white/[0.04]" />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, #d4a85330, #4da6e030, #8b5cf630, transparent)',
              animation: 'footer-energy 4s ease-in-out infinite',
            }}
          />
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 foot-anim">
          <p className="text-gray-600 text-sm font-mono flex items-center gap-1.5">
            <span className="text-gold/30">{'>'}</span>
            &copy; <span ref={yearRef}>2020</span> LumeArt. Todos os direitos reservados.
          </p>

          <p className="flex items-center gap-1.5 text-gray-600 text-sm">
            Feito com{' '}
            <Heart size={13} className="text-gold/50 animate-pulse" /> e{' '}
            <span className="text-gold/40 font-mono">☕</span> em Salvador-BA
          </p>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className={`group relative p-3 rounded-xl border transition-all duration-500 ${
              rocketActive
                ? 'border-gold/40 bg-gold/10 shadow-[0_0_25px_rgba(212,168,83,0.2)]'
                : 'border-white/[0.06] hover:border-gold/20 hover:bg-gold/[0.03]'
            }`}
            aria-label="Voltar ao topo"
          >
            <ArrowUp
              size={18}
              className={`transition-all duration-500 ${
                rocketActive
                  ? 'text-gold -translate-y-1.5 drop-shadow-[0_0_8px_rgba(212,168,83,0.6)]'
                  : 'text-gold/40 group-hover:text-gold group-hover:-translate-y-0.5'
              }`}
            />

            {/* Rocket trail particles */}
            {rocketActive && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
                <div className="w-1 h-4 rounded-full bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
                <div className="absolute -left-1 top-1 w-0.5 h-3 rounded-full bg-gradient-to-b from-crystal/40 to-transparent animate-pulse" style={{ animationDelay: '0.1s' }} />
                <div className="absolute left-1.5 top-0.5 w-0.5 h-3 rounded-full bg-gradient-to-b from-purple/40 to-transparent animate-pulse" style={{ animationDelay: '0.2s' }} />
              </div>
            )}

            {/* Pulse ring on click */}
            {rocketActive && (
              <div
                className="absolute inset-0 rounded-xl border border-gold/30"
                style={{ animation: 'process-impact 0.8s ease-out forwards' }}
              />
            )}
          </button>
        </div>

        {/* Signature */}
        <div className="mt-6 text-center">
          <p className="font-pixel text-[0.75rem] text-gray-800 tracking-[0.3em] uppercase">
            — System Shutdown —
          </p>
        </div>
      </div>

      {/* Custom keyframe */}
      <style>{`
        @keyframes footer-energy {
          0%, 100% { opacity: 0.3; transform: translateX(-30%); }
          50% { opacity: 1; transform: translateX(30%); }
        }
      `}</style>
    </footer>
  );
}
