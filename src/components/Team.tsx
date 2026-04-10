import { useEffect, useState, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionTitle from './SectionTitle';
import ricardo from '../assets/ricardo.webp';
import natalia from '../assets/natalia.webp';

const members = [
  {
    name: 'Ricardo Carvalho',
    role: 'Co-fundador & Dev Fullstack',
    tag: 'PLAYER 1',
    class: 'TECH MAGE',
    bio: 'Responsável pela parte tecnológica, modelagem 3D e produção. Transforma linhas de código e filamentos em realidade.',
    image: ricardo,
    stats: [
      { label: 'Código', value: 95, icon: '⚡' },
      { label: '3D Design', value: 90, icon: '🎮' },
      { label: 'Hardware', value: 85, icon: '🔧' },
      { label: 'Criatividade', value: 88, icon: '✨' },
    ],
    accent: '#4da6e0',
    level: 42,
    xp: 85,
    abilities: ['React', 'Three.js', 'Bambu Lab', 'Blender'],
  },
  {
    name: 'Natália Barreto',
    role: 'Co-fundadora & Dentista (UFBA)',
    tag: 'PLAYER 2',
    class: 'CREATIVE HEALER',
    bio: 'Responsável pela gestão, criatividade e atendimento ao cliente. O olhar artístico e estratégico por trás da marca.',
    image: natalia,
    stats: [
      { label: 'Criatividade', value: 95, icon: '🎨' },
      { label: 'Estratégia', value: 90, icon: '🧠' },
      { label: 'Comunicação', value: 92, icon: '💬' },
      { label: 'Liderança', value: 88, icon: '👑' },
    ],
    accent: '#8b5cf6',
    level: 38,
    xp: 72,
    abilities: ['Gestão', 'Criação', 'Marketing', 'Odonto'],
  },
];

const CYCLE = 6000; // Alternate highlight every 6s

/* Animated stat bar */
function StatBar({
  label,
  value,
  icon,
  color,
  active,
  delay,
}: {
  label: string;
  value: number;
  icon: string;
  color: string;
  active: boolean;
  delay: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && barRef.current) {
      animate(barRef.current, {
        width: ['0%', `${value}%`],
        duration: 1000,
        ease: 'outExpo',
        delay,
      });
    }
  }, [active, value, delay]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm w-5 shrink-0">{icon}</span>
      <span className="font-mono text-[0.875rem] text-gray-400 w-24 shrink-0 uppercase tracking-wider">
        {label}
      </span>
      <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            width: '0%',
            background: `linear-gradient(90deg, ${color}70, ${color})`,
            boxShadow: `0 0 8px ${color}30`,
          }}
        />
      </div>
      <span className="font-mono text-[0.875rem] w-8 text-right font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

/* XP bar */
function XPBar({ xp, color, active }: { xp: number; color: string; active: boolean }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && barRef.current) {
      animate(barRef.current, {
        width: ['0%', `${xp}%`],
        duration: 1400,
        ease: 'outExpo',
        delay: 600,
      });
    }
  }, [active, xp]);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-pixel text-[0.75rem] text-gray-600 tracking-widest uppercase">
          EXP
        </span>
        <span className="font-mono text-[0.875rem]" style={{ color: color + '80' }}>
          {xp}%
        </span>
      </div>
      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden relative">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            width: '0%',
            background: `linear-gradient(90deg, ${color}, ${color}CC)`,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
        {/* Shimmer */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            animation: 'xp-shimmer 3s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}

export default function Team() {
  const [revealed, setRevealed] = useState(false);
  const [highlighted, setHighlighted] = useState(0);

  const ref = useScrollReveal((el) => {
    setRevealed(true);
    animate(el.querySelectorAll('.anim'), {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(100),
      ease: 'outExpo',
    });
  });

  /* Alternate highlight */
  useEffect(() => {
    if (!revealed) return;
    const timer = setInterval(() => {
      setHighlighted((prev) => (prev + 1) % members.length);
    }, CYCLE);
    return () => clearInterval(timer);
  }, [revealed]);

  return (
    <section
      id="equipe"
      className="relative py-20 lg:py-28 scroll-mt-20 bg-surface/40 overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,168,83,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle tag="TEAM" title="Quem Está Por Trás" />

        <p className="anim text-center font-pixel text-[0.875rem] text-gold/20 tracking-widest mb-12 -mt-8 uppercase">
          — SELECT YOUR CHARACTER —
        </p>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {members.map((m, idx) => {
            const isHighlighted = idx === highlighted;

            return (
              <div
                key={m.name}
                className="group relative rounded-2xl overflow-hidden"
                style={{
                  transition: 'box-shadow 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                  boxShadow: isHighlighted
                    ? `0 0 50px ${m.accent}15, 0 0 100px ${m.accent}08`
                    : 'none',
                  transform: isHighlighted ? 'scale(1.01)' : 'scale(1)',
                }}
              >
                {/* Outer glow border */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    border: `1px solid ${isHighlighted ? m.accent + '30' : 'rgba(255,255,255,0.04)'}`,
                    transition: 'border-color 0.6s ease',
                  }}
                />

                {/* Lightsaber top edge */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] z-10 origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${m.accent}, ${m.accent}60, transparent)`,
                    boxShadow: `0 0 12px ${m.accent}40`,
                    opacity: isHighlighted ? 1 : 0,
                    transform: isHighlighted ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'opacity 0.5s, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
                  }}
                />

                <div className="bg-[#0c0c1a]/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                  {/* ── Top section: Player tag + portrait ── */}
                  <div className="relative">
                    {/* Player tag header */}
                    <div
                      className="flex items-center justify-between px-5 py-3 border-b"
                      style={{
                        borderColor: isHighlighted ? m.accent + '20' : 'rgba(255,255,255,0.03)',
                        backgroundColor: isHighlighted ? m.accent + '06' : 'transparent',
                        transition: 'all 0.5s',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: isHighlighted ? '#22c55e' : '#4a4a5a',
                            boxShadow: isHighlighted ? '0 0 8px #22c55e60' : 'none',
                            animation: isHighlighted ? 'process-pulse 2s ease-in-out infinite' : 'none',
                          }}
                        />
                        <span className="font-pixel text-[0.875rem] tracking-[0.3em] uppercase"
                          style={{ color: m.accent, transition: 'color 0.5s' }}
                        >
                          {m.tag}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-pixel text-[0.75rem] text-gray-600 tracking-widest uppercase">
                          LVL
                        </span>
                        <span
                          className="font-heading text-base font-black"
                          style={{ color: m.accent }}
                        >
                          {m.level}
                        </span>
                      </div>
                    </div>

                    {/* Portrait */}
                    <div className="relative h-72 sm:h-80 overflow-hidden bg-surface">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover object-top"
                        style={{
                          transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.5s',
                          transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                          filter: isHighlighted ? 'brightness(1.05)' : 'brightness(0.85)',
                        }}
                      />

                      {/* Scan line */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden"
                        style={{
                          opacity: isHighlighted ? 1 : 0,
                          transition: 'opacity 0.5s',
                        }}
                      >
                        <div
                          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent"
                          style={{ animation: 'scan-line 2.5s linear infinite' }}
                        />
                      </div>

                      {/* Corner HUD markers */}
                      <div
                        className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2"
                        style={{
                          borderColor: m.accent,
                          opacity: isHighlighted ? 0.5 : 0,
                          transition: 'opacity 0.5s',
                        }}
                      />
                      <div
                        className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2"
                        style={{
                          borderColor: m.accent,
                          opacity: isHighlighted ? 0.5 : 0,
                          transition: 'opacity 0.5s',
                        }}
                      />

                      {/* Class badge overlay */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5">
                        <span
                          className="font-pixel text-[0.75rem] px-2 py-1 rounded-md tracking-widest uppercase backdrop-blur-md"
                          style={{
                            backgroundColor: m.accent + '20',
                            color: m.accent,
                            border: `1px solid ${m.accent}30`,
                            opacity: isHighlighted ? 1 : 0,
                            transform: isHighlighted ? 'translateX(0)' : 'translateX(10px)',
                            transition: 'all 0.5s ease',
                          }}
                        >
                          {m.class}
                        </span>
                      </div>

                      {/* Gradient fade to bottom */}
                      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0c0c1a] via-[#0c0c1a]/80 to-transparent" />

                      {/* Name & role over gradient */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="font-heading text-lg font-bold text-white tracking-wider mb-1">
                          {m.name}
                        </h3>
                        <p
                          className="text-sm font-medium uppercase tracking-widest"
                          style={{ color: m.accent }}
                        >
                          {m.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ── Bottom section: stats & info ── */}
                  <div className="p-5">
                    {/* Bio */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">
                      {m.bio}
                    </p>

                    {/* Stats */}
                    <div className="space-y-2.5 mb-4">
                      {m.stats.map((stat, si) => (
                        <StatBar
                          key={stat.label}
                          {...stat}
                          color={m.accent}
                          active={revealed}
                          delay={200 + si * 150}
                        />
                      ))}
                    </div>

                    {/* Abilities */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {m.abilities.map((ab) => (
                        <span
                          key={ab}
                          className="font-mono text-[0.875rem] px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05]"
                          style={{
                            color: isHighlighted ? m.accent : '#6a6a7a',
                            borderColor: isHighlighted ? m.accent + '20' : 'rgba(255,255,255,0.05)',
                            transition: 'all 0.5s',
                          }}
                        >
                          {ab}
                        </span>
                      ))}
                    </div>

                    {/* XP Bar */}
                    <XPBar xp={m.xp} color={m.accent} active={revealed} />

                    {/* Bottom status */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.03]">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: '#22c55e',
                            boxShadow: '0 0 6px #22c55e60',
                          }}
                        />
                        <span className="font-pixel text-[0.75rem] text-gray-600 tracking-widest uppercase">
                          Online
                        </span>
                      </div>
                      <span className="font-pixel text-[0.75rem] tracking-widest uppercase"
                        style={{ color: m.accent + '60' }}
                      >
                        READY
                      </span>
                    </div>
                  </div>
                </div>

                {/* Highlight pulse ring (behind card) */}
                {isHighlighted && (
                  <div
                    className="absolute -inset-1 rounded-2xl pointer-events-none"
                    style={{
                      border: `1px solid ${m.accent}15`,
                      animation: 'process-pulse 3s ease-in-out infinite',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Hint text */}
        <div className="anim mt-10 text-center">
          <p className="font-pixel text-[0.875rem] text-gray-700 tracking-[0.3em] uppercase">
            — Press Start to Continue —
          </p>
        </div>
      </div>

      {/* Custom keyframes */}
      <style>{`
        @keyframes xp-shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
}
