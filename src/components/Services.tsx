import { useRef, useState, useEffect, useCallback } from 'react';
import { animate, stagger } from 'animejs';
import { Gamepad2, Building2, Wrench, Gift, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionTitle from './SectionTitle';

const services = [
  {
    icon: Gamepad2,
    title: 'Action Figures & Miniaturas',
    desc: 'Seus personagens favoritos ganham vida em 3D. De animes a games, modelamos e imprimimos com riqueza de detalhes.',
    accent: '#d4a853',
    missionCode: 'AF-001',
    classification: 'PRIORITY',
    powerLevel: 95,
    status: 'ACTIVE',
    tags: ['PLA', 'Resina', 'Custom'],
  },
  {
    icon: Building2,
    title: 'Personalizados para Empresas',
    desc: 'Brindes corporativos, maquetes, protótipos. Soluções sob medida para dar um upgrade no seu negócio.',
    accent: '#4da6e0',
    missionCode: 'CE-002',
    classification: 'STANDARD',
    powerLevel: 88,
    status: 'ACTIVE',
    tags: ['B2B', 'Brindes', 'Maquetes'],
  },
  {
    icon: Wrench,
    title: 'Protótipos & Peças Técnicas',
    desc: 'Do conceito ao objeto físico. Ideal para engenheiros, designers e inventores que precisam testar suas criações.',
    accent: '#8b5cf6',
    missionCode: 'PT-003',
    classification: 'RESTRICTED',
    powerLevel: 92,
    status: 'ACTIVE',
    tags: ['PETG', 'TPU', 'Técnico'],
  },
  {
    icon: Gift,
    title: 'Presentes & Decoração Geek',
    desc: 'Luminárias, porta-canetas temáticos, bustos de personagens. O presente perfeito para quem é nerd raiz.',
    accent: '#2dd4bf',
    missionCode: 'DG-004',
    classification: 'STANDARD',
    powerLevel: 90,
    status: 'ACTIVE',
    tags: ['LED', 'Geek', 'Decor'],
  },
  {
    icon: Sparkles,
    title: 'Sob Demanda',
    desc: 'Não encontrou o que procura? Conte sua ideia e nós damos um jeito. Se é imprimível, a gente faz.',
    accent: '#e8c97a',
    missionCode: 'SD-005',
    classification: 'OPEN',
    powerLevel: 100,
    status: 'STANDBY',
    tags: ['Qualquer', 'Custom', 'Flex'],
  },
];

/* Animated power bar */
function PowerBar({ level, color, active }: { level: number; color: string; active: boolean }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && barRef.current) {
      animate(barRef.current, {
        width: ['0%', `${level}%`],
        duration: 1200,
        ease: 'outExpo',
        delay: 300,
      });
    }
  }, [active, level]);

  return (
    <div className="flex items-center gap-2 mt-3">
      <span className="font-pixel text-[0.75rem] text-gray-600 w-10 shrink-0 uppercase tracking-wider">
        PWR
      </span>
      <div className="flex-1 h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            width: '0%',
            background: `linear-gradient(90deg, ${color}90, ${color})`,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
      </div>
      <span
        className="font-mono text-[0.875rem] w-8 text-right"
        style={{ color: color + '80' }}
      >
        {level}
      </span>
    </div>
  );
}

/* Single service card */
function ServiceCard({
  service,
  revealed,
  isDragging,
}: {
  service: (typeof services)[0];
  revealed: boolean;
  isDragging: boolean;
}) {
  const { icon: Icon, title, desc, accent, missionCode, classification, powerLevel, status, tags } = service;

  return (
    <div
      className="svc-slide group relative rounded-xl overflow-hidden shrink-0 w-[320px] sm:w-[360px] lg:w-[380px]"
      style={{
        transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease',
        transform: 'scale(1)',
        pointerEvents: isDragging ? 'none' : 'auto',
      }}
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = 'scale(1.06)';
          e.currentTarget.style.zIndex = '10';
          e.currentTarget.style.boxShadow = `0 0 50px ${accent}18`;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.zIndex = '0';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Hover glow aura */}
      <div
        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none blur-xl"
        style={{
          background: `radial-gradient(circle, ${accent}15, transparent 70%)`,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Outer holographic border */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accent}30, transparent 40%, transparent 60%, ${accent}18)`,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Card inner */}
      <div
        className="relative bg-[#0c0c1a]/90 backdrop-blur-sm border border-white/[0.05] rounded-xl p-5 h-full"
        style={{
          transition: 'border-color 0.4s ease',
          borderColor: undefined,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = accent + '40';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
        }}
      >
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                backgroundColor: status === 'ACTIVE' ? '#22c55e' : accent,
                boxShadow: `0 0 6px ${status === 'ACTIVE' ? '#22c55e' : accent}60`,
              }}
            />
            <span className="font-mono text-[0.875rem] text-gray-500 tracking-wider">
              {missionCode}
            </span>
          </div>
          <span
            className="font-pixel text-[0.75rem] px-2 py-0.5 rounded border tracking-wider"
            style={{
              color: accent,
              borderColor: accent + '30',
              backgroundColor: accent + '08',
            }}
          >
            {classification}
          </span>
        </div>

        {/* ── Icon ── */}
        <div className="relative mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundColor: accent + '10',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Icon size={22} className="relative z-10" style={{ color: accent }} />
            {/* Scan line */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden"
              style={{ transition: 'opacity 0.4s ease' }}
            >
              <div
                className="absolute left-0 right-0 h-[1px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
                  animation: 'scan-line 1.5s linear infinite',
                }}
              />
            </div>
            <div
              className="absolute top-0 left-0 w-2 h-2 border-l border-t opacity-0 group-hover:opacity-40"
              style={{ borderColor: accent, transition: 'opacity 0.4s ease' }}
            />
            <div
              className="absolute bottom-0 right-0 w-2 h-2 border-r border-b opacity-0 group-hover:opacity-40"
              style={{ borderColor: accent, transition: 'opacity 0.4s ease' }}
            />
          </div>
        </div>

        {/* ── Title ── */}
        <h3
          className="font-heading text-sm lg:text-base font-semibold text-white tracking-wider mb-2"
          style={{ transition: 'color 0.4s ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = accent; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#fff'; }}
        >
          {title}
        </h3>

        {/* ── Description ── */}
        <p
          className="text-gray-500 text-sm leading-relaxed mb-3"
          style={{ transition: 'color 0.4s ease' }}
        >
          {desc}
        </p>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-1.5 mb-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[0.875rem] px-2 py-0.5 rounded bg-white/[0.03] text-gray-600 border border-white/[0.04]"
              style={{ transition: 'border-color 0.3s ease, color 0.3s ease' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── Power bar ── */}
        <PowerBar level={powerLevel} color={accent} active={revealed} />

        {/* ── Bottom status ── */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.03]">
          <span className="font-pixel text-[0.75rem] text-gray-700 tracking-widest uppercase">
            {status === 'ACTIVE' ? '● Online' : '◌ Standby'}
          </span>
          <span
            className="font-mono text-[0.875rem] opacity-0 group-hover:opacity-60"
            style={{
              color: accent,
              transform: 'translateX(-8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
            ref={(el) => {
              if (!el) return;
              const parent = el.closest('.svc-slide');
              if (!parent) return;
              parent.addEventListener('mouseenter', () => {
                el.style.opacity = '0.6';
                el.style.transform = 'translateX(0)';
              });
              parent.addEventListener('mouseleave', () => {
                el.style.opacity = '0';
                el.style.transform = 'translateX(-8px)';
              });
            }}
          >
            ACESSAR →
          </span>
        </div>

        {/* ── Lightsaber edges ── */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 origin-left scale-x-0 group-hover:scale-x-100"
          style={{
            background: `linear-gradient(90deg, ${accent}, ${accent}60, transparent)`,
            boxShadow: `0 0 15px ${accent}40, 0 0 5px ${accent}30`,
            transition: 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        <div
          className="absolute top-0 left-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-70 origin-top scale-y-0 group-hover:scale-y-100"
          style={{
            background: `linear-gradient(180deg, ${accent}, transparent 80%)`,
            boxShadow: `0 0 10px ${accent}30`,
            transition: 'opacity 0.6s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* ── Targeting reticle ── */}
        <div
          className="absolute bottom-3 right-3 w-5 h-5 opacity-0 group-hover:opacity-[0.12] group-hover:rotate-90 pointer-events-none"
          style={{ transition: 'opacity 0.5s ease, transform 0.5s ease' }}
        >
          <div className="absolute inset-0 border border-current rounded-full" style={{ color: accent }} />
          <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: accent }} />
          <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: accent }} />
          <div className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: accent }} />
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [revealed, setRevealed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0, hasMoved: false });
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);

  const ref = useScrollReveal((el) => {
    setRevealed(true);
    animate(el.querySelectorAll('.anim'), {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(80),
      ease: 'outExpo',
    });
  });

  /* 4x duplication for seamless loop */
  const loopCards = [...services, ...services, ...services, ...services];

  /* ── Auto-scroll with rAF ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.6; // px per frame
    const singleSetWidth = track.scrollWidth / 4;

    const tick = () => {
      if (!pausedRef.current && !isDraggingRef.current) {
        track.scrollLeft += speed;
        // Seamless reset
        if (track.scrollLeft >= singleSetWidth * 2) {
          track.scrollLeft -= singleSetWidth;
        }
      }
      autoScrollRef.current = requestAnimationFrame(tick);
    };

    // Start scrolled to the 2nd set so we can drag backwards
    track.scrollLeft = singleSetWidth;
    autoScrollRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(autoScrollRef.current);
  }, []);

  /* ── Seamless loop on manual scroll ── */
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const singleSetWidth = track.scrollWidth / 4;

    if (track.scrollLeft >= singleSetWidth * 3) {
      track.scrollLeft -= singleSetWidth;
    } else if (track.scrollLeft <= 0) {
      track.scrollLeft += singleSetWidth;
    }
  }, []);

  /* ── Mouse drag ── */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    dragState.current = {
      startX: e.clientX,
      scrollLeft: track.scrollLeft,
      hasMoved: false,
    };
    lastXRef.current = e.clientX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    track.style.cursor = 'grabbing';
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;

    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.hasMoved = true;

    track.scrollLeft = dragState.current.scrollLeft - dx;

    // Track velocity
    const now = Date.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      velocityRef.current = (e.clientX - lastXRef.current) / dt;
    }
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
  }, []);

  const onMouseUp = useCallback(() => {
    const track = trackRef.current;
    if (!track || !isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);
    track.style.cursor = 'grab';

    // Momentum coast
    const velocity = velocityRef.current;
    if (Math.abs(velocity) > 0.1) {
      let momentum = velocity * 300;
      const startScroll = track.scrollLeft;
      const startTime = performance.now();
      const duration = 800;

      const coast = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        track.scrollLeft = startScroll - momentum * eased;
        if (progress < 1) requestAnimationFrame(coast);
      };
      requestAnimationFrame(coast);
    }
  }, []);

  /* ── Touch drag ── */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDraggingRef.current = true;
    pausedRef.current = true;
    const touch = e.touches[0];
    dragState.current = {
      startX: touch.clientX,
      scrollLeft: track.scrollLeft,
      hasMoved: false,
    };
    lastXRef.current = touch.clientX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;

    const touch = e.touches[0];
    const dx = touch.clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.hasMoved = true;

    track.scrollLeft = dragState.current.scrollLeft - dx;

    const now = Date.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      velocityRef.current = (touch.clientX - lastXRef.current) / dt;
    }
    lastXRef.current = touch.clientX;
    lastTimeRef.current = now;
  }, []);

  const onTouchEnd = useCallback(() => {
    const track = trackRef.current;
    if (!track || !isDraggingRef.current) return;

    isDraggingRef.current = false;
    pausedRef.current = false;

    const velocity = velocityRef.current;
    if (Math.abs(velocity) > 0.1) {
      let momentum = velocity * 300;
      const startScroll = track.scrollLeft;
      const startTime = performance.now();
      const duration = 800;

      const coast = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        track.scrollLeft = startScroll - momentum * eased;
        if (progress < 1) requestAnimationFrame(coast);
      };
      requestAnimationFrame(coast);
    }
  }, []);

  return (
    <section id="servicos" className="relative py-20 lg:py-28 scroll-mt-20 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,168,83,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark" />
      </div>

      <div ref={ref} className="relative">
        {/* Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle tag="SERVICES" title="Nossos Serviços" />
          <p className="anim text-center font-pixel text-[0.875rem] text-gold/20 tracking-[0.35em] -mt-8 mb-12 uppercase">
            {'>'} Mission Briefing — Selecione seu objetivo {'<'}
          </p>
        </div>

        {/* Full-bleed interactive carousel */}
        <div
          className="relative"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => {
            pausedRef.current = false;
            if (isDraggingRef.current) {
              isDraggingRef.current = false;
              setIsDragging(false);
              if (trackRef.current) trackRef.current.style.cursor = 'grab';
            }
          }}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-r from-dark to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none bg-gradient-to-l from-dark to-transparent" />

          {/* Scrolling track */}
          <div
            ref={trackRef}
            className="flex gap-5 py-6 overflow-x-hidden select-none"
            style={{ cursor: 'grab' }}
            onScroll={handleScroll}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {loopCards.map((svc, idx) => (
              <ServiceCard
                key={`${svc.missionCode}-${idx}`}
                service={svc}
                revealed={revealed}
                isDragging={isDragging}
              />
            ))}
          </div>

          {/* Drag hint */}
          <p className="anim text-center font-pixel text-[0.75rem] text-gray-700 tracking-[0.3em] mt-2 uppercase">
            ← DRAG TO EXPLORE →
          </p>
        </div>

        {/* Footer text */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="anim mt-8 text-center">
            <p className="font-pixel text-[0.875rem] text-gray-700 tracking-[0.3em]">
              — END OF TRANSMISSION —
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
