import { useEffect, useRef, useMemo } from 'react';
import { animate, stagger, createTimeline } from 'animejs';
import { ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';
import HeroScene from './HeroScene';

interface Props {
  ready?: boolean;
}

export default function Hero({ ready = true }: Props) {
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ready || hasAnimated.current) return;
    hasAnimated.current = true;

    const timer = setTimeout(() => {
      const tl = createTimeline({ defaults: { ease: 'outExpo' } });

      /* 1) Impact flash */
      tl.add('.hero-flash', {
        opacity: [0.7, 0],
        duration: 300,
        ease: 'outQuad',
      })
        /* 2) Speed lines burst */
        .add('.speed-line', {
          scaleX: [0, 1.5],
          opacity: [0.6, 0],
          duration: 600,
          delay: stagger(25),
        }, 0)
        /* 3) Three.js scene fades in */
        .add('.hero-scene', {
          opacity: [0, 1],
          duration: 1500,
          ease: 'linear',
        }, 0)
        /* 4) Kanji impact */
        .add('.hero-kanji', {
          scale: [3.5, 1],
          opacity: [0, 0.06],
          duration: 700,
        }, '+=0')
        /* 5) Logo with overshoot */
        .add('.hero-logo', {
          scale: [0.15, 1],
          opacity: [0, 1],
          duration: 1200,
          ease: 'outBack',
        }, '-=500')
        /* 6) Title words stagger */
        .add('.hero-word', {
          translateY: [70, 0],
          opacity: [0, 1],
          duration: 800,
          delay: stagger(90),
        }, '-=700')
        /* 7) Subtitle */
        .add('.hero-sub', {
          translateY: [25, 0],
          opacity: [0, 1],
          duration: 600,
        }, '-=400')
        /* 8) CTAs with overshoot */
        .add('.hero-cta', {
          translateY: [25, 0],
          opacity: [0, 1],
          scale: [0.85, 1],
          duration: 700,
          delay: stagger(120),
          ease: 'outBack',
        }, '-=200')
        /* 9) Corners + scroll */
        .add('.hero-corner', {
          opacity: [0, 0.2],
          duration: 400,
        }, '-=400')
        .add('.hero-scroll', {
          opacity: [0, 0.5],
          translateY: [15, 0],
          duration: 500,
        }, '-=200')
        /* 10) Activate continuous glow */
        .call(() => {
          document.querySelector('.hero-logo')?.classList.add('animate-glow');
        });
    }, 200);

    /* Continuous scroll indicator bounce */
    animate('.hero-scroll', {
      translateY: [0, 12, 0],
      duration: 2200,
      loop: true,
      ease: 'inOutSine',
    });

    return () => clearTimeout(timer);
  }, [ready]);

  /* Speed lines data — 16 radial lines */
  const speedLines = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        angle: (360 / 16) * i,
        color: ['#d4a853', '#4da6e0', '#8b5cf6'][i % 3],
      })),
    [],
  );

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Impact flash */}
      <div className="hero-flash fixed inset-0 bg-white/90 z-30 pointer-events-none opacity-0" />

      {/* Three.js orbital particles background */}
      <div className="hero-scene absolute inset-0 opacity-0">
        <HeroScene />
      </div>

      {/* Speed Lines — radial burst from center */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2">
          {speedLines.map((l, i) => (
            <div
              key={i}
              className="absolute"
              style={{ transform: `rotate(${l.angle}deg)` }}
            >
              <div
                className="speed-line h-[1.5px] origin-left opacity-0"
                style={{
                  width: '120vmax',
                  background: `linear-gradient(90deg, ${l.color}50, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-[#d4a85310]" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full blur-[120px] bg-[#4da6e010]" />
      <div className="absolute top-1/2 right-[20%] w-[300px] h-[300px] rounded-full blur-[100px] bg-[#8b5cf609]" />

      {/* Corner brackets decoration */}
      <div className="hero-corner absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-gold/20 opacity-0" />
      <div className="hero-corner absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-gold/20 opacity-0" />
      <div className="hero-corner absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-gold/20 opacity-0" />
      <div className="hero-corner absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-gold/20 opacity-0" />

      {/* ── Content ── */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-20">
        {/* Kanji impact — decorative "ドン!" (manga sound effect) */}
        <span
          className="hero-kanji absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] sm:text-[14rem] md:text-[18rem] font-black text-gold select-none pointer-events-none opacity-0 whitespace-nowrap"
          style={{ fontFamily: 'serif' }}
        >
          ドン!
        </span>

        {/* Logo */}
        <img
          src={logo}
          alt="LumeArt"
          className="hero-logo mx-auto w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 mb-8 opacity-0"
          style={{ filter: 'drop-shadow(0 0 40px rgba(212,168,83,0.25))' }}
        />

        {/* Title with gradient text on keywords */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight mb-6">
          <span className="hero-word inline-block opacity-0 text-white">
            Do&nbsp;
          </span>
          <span className="hero-word inline-block opacity-0 gradient-text">
            Pixel&nbsp;
          </span>
          <span className="hero-word inline-block opacity-0 text-white">
            à&nbsp;
          </span>
          <span className="hero-word inline-block opacity-0 gradient-text">
            Realidade
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed opacity-0">
          Transformamos suas ideias geek em peças únicas com impressão 3D.
          <br className="hidden sm:block" />
          Action figures, protótipos, personalizados — se você imagina, a gente
          imprime.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.instagram.com/lume.art3d"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta group relative inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-gold-light text-dark font-heading font-bold text-sm uppercase tracking-[0.15em] rounded-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.35)] opacity-0 overflow-hidden"
          >
            <span className="relative z-10">Solicitar Orçamento</span>
            {/* Shine sweep on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a
            href="#servicos"
            className="hero-cta inline-flex items-center gap-2 px-8 py-3.5 border border-gold/25 text-gold hover:bg-gold/10 font-heading font-bold text-sm uppercase tracking-[0.15em] rounded-lg transition-all duration-300 opacity-0 hover:border-gold/50 hover:shadow-[0_0_25px_rgba(212,168,83,0.15)]"
          >
            Nossos Serviços
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll mt-14 lg:mt-20 opacity-0">
          <div className="flex flex-col items-center gap-2">
            <span className="font-pixel text-[0.875rem] text-gold/30 tracking-widest">
              SCROLL
            </span>
            <ChevronDown className="text-gold/40" size={20} />
          </div>
        </div>
      </div>
    </section>
  );
}
