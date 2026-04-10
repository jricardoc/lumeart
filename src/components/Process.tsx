import { useEffect, useRef, useState, useCallback } from 'react';
import { animate, stagger } from 'animejs';
import { Lightbulb, Calculator, Box, Printer, Package } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionTitle from './SectionTitle';

const steps = [
  {
    icon: Lightbulb,
    title: 'Conta a Ideia',
    desc: 'Nos envie sua referência, desenho ou descrição. Quanto mais detalhes, melhor!',
    num: '01',
    sfx: 'IDEA!',
    accent: '#d4a853',
  },
  {
    icon: Calculator,
    title: 'Orçamento',
    desc: 'Avaliamos o projeto e enviamos uma proposta transparente, sem surpresas.',
    num: '02',
    sfx: 'CALC!',
    accent: '#4da6e0',
  },
  {
    icon: Box,
    title: 'Modelagem 3D',
    desc: 'Criamos ou ajustamos o modelo digital da sua peça com precisão.',
    num: '03',
    sfx: 'BUILD!',
    accent: '#8b5cf6',
  },
  {
    icon: Printer,
    title: 'Fabricação',
    desc: 'A impressora entra em ação — camada por camada, sua ideia ganha forma.',
    num: '04',
    sfx: 'PRINT!',
    accent: '#2dd4bf',
  },
  {
    icon: Package,
    title: 'Entrega',
    desc: 'Peça finalizada, com acabamento, e pronta para o mundo.',
    num: '05',
    sfx: 'DONE!',
    accent: '#e8c97a',
  },
];

const CYCLE_DURATION = 10000; // 10s full cycle
const STEP_DURATION = CYCLE_DURATION / steps.length; // 2s per step

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [impactStep, setImpactStep] = useState(-1);
  const cycleRef = useRef<NodeJS.Timeout | null>(null);

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

  /* ── Continuous step cycle ── */
  useEffect(() => {
    if (!revealed) return;

    let step = 0;

    const advance = () => {
      setActiveStep(step);
      setImpactStep(step);

      // Clear impact flash after 400ms
      setTimeout(() => setImpactStep(-1), 400);

      step = (step + 1) % steps.length;
      cycleRef.current = setTimeout(advance, STEP_DURATION);
    };

    // Start after entrance animation
    const timer = setTimeout(advance, 600);

    return () => {
      clearTimeout(timer);
      if (cycleRef.current) clearTimeout(cycleRef.current);
    };
  }, [revealed]);

  /* ── Progress percentage for connector line fill ── */
  const progressPercent = ((activeStep + 1) / steps.length) * 100;

  return (
    <section
      id="processo"
      className="relative py-20 lg:py-28 scroll-mt-20 bg-surface/40 overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* Manga panel border */}
      <div className="absolute top-4 left-4 right-4 bottom-4 border border-gold/[0.03] rounded-2xl pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle tag="PROCESS" title="Como Funciona" />

        <p className="anim text-center font-pixel text-[0.875rem] text-gold/20 tracking-[0.35em] -mt-8 mb-14 uppercase">
          {'>'} Quest Progress — Acompanhe sua jornada {'<'}
        </p>

        {/* ═══════════════════════════════════════
            DESKTOP: Horizontal manga pipeline
           ═══════════════════════════════════════ */}
        <div className="hidden lg:block">
          {/* Connector rail */}
          <div className="relative mx-8 mb-8">
            {/* Background rail */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/[0.04] -translate-y-1/2 rounded-full" />

            {/* Animated energy fill */}
            <div
              className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 rounded-full"
              style={{
                width: `${progressPercent}%`,
                background: `linear-gradient(90deg, ${steps[0].accent}, ${steps[Math.min(activeStep, steps.length - 1)].accent})`,
                boxShadow: `0 0 15px ${steps[Math.min(activeStep, steps.length - 1)].accent}50`,
                transition: 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1), background 0.5s ease',
              }}
            />

            {/* Traveling energy pulse */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none"
              style={{
                left: `${progressPercent}%`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: steps[Math.min(activeStep, steps.length - 1)].accent,
                boxShadow: `0 0 20px ${steps[Math.min(activeStep, steps.length - 1)].accent}, 0 0 40px ${steps[Math.min(activeStep, steps.length - 1)].accent}60`,
                transition: 'left 0.8s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.5s',
              }}
            />

            {/* Step nodes on the rail */}
            <div className="relative flex justify-between">
              {steps.map((s, i) => {
                const isActive = i <= activeStep;
                const isCurrent = i === activeStep;
                const isImpact = i === impactStep;

                return (
                  <div key={s.num} className="flex flex-col items-center" style={{ width: '20%' }}>
                    {/* Node circle */}
                    <div className="relative">
                      {/* Impact ring burst */}
                      {isImpact && (
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            animation: 'process-impact 0.6s ease-out forwards',
                            border: `2px solid ${s.accent}`,
                          }}
                        />
                      )}

                      {/* Continuous pulse ring on current */}
                      {isCurrent && (
                        <div
                          className="absolute -inset-2 rounded-full"
                          style={{
                            border: `1px solid ${s.accent}30`,
                            animation: 'process-pulse 2s ease-in-out infinite',
                          }}
                        />
                      )}

                      {/* Speed lines on impact */}
                      {isImpact && (
                        <div className="absolute inset-0 pointer-events-none">
                          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                            <div
                              key={angle}
                              className="absolute top-1/2 left-1/2"
                              style={{
                                transform: `rotate(${angle}deg)`,
                                transformOrigin: '0 0',
                              }}
                            >
                              <div
                                className="h-[1px] origin-left"
                                style={{
                                  width: '28px',
                                  marginLeft: '22px',
                                  background: `linear-gradient(90deg, ${s.accent}60, transparent)`,
                                  animation: 'process-speedline 0.5s ease-out forwards',
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Main node */}
                      <div
                        className="relative w-14 h-14 rounded-xl flex items-center justify-center border-2 z-10"
                        style={{
                          backgroundColor: isActive ? s.accent + '18' : '#11111e',
                          borderColor: isActive ? s.accent + '50' : 'rgba(255,255,255,0.06)',
                          boxShadow: isCurrent
                            ? `0 0 25px ${s.accent}40, inset 0 0 15px ${s.accent}10`
                            : 'none',
                          transform: isImpact ? 'scale(1.15)' : 'scale(1)',
                          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        <s.icon
                          size={24}
                          style={{
                            color: isActive ? s.accent : '#4a4a5a',
                            filter: isCurrent ? `drop-shadow(0 0 8px ${s.accent})` : 'none',
                            transition: 'color 0.4s, filter 0.4s',
                          }}
                        />

                        {/* Scan line inside active node */}
                        {isCurrent && (
                          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                            <div
                              className="absolute left-0 right-0 h-[1px]"
                              style={{
                                background: `linear-gradient(90deg, transparent, ${s.accent}30, transparent)`,
                                animation: 'scan-line 2s linear infinite',
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Number badge */}
                      <div
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-md flex items-center justify-center z-20"
                        style={{
                          backgroundColor: isActive ? s.accent : '#1a1a2e',
                          color: isActive ? '#0a0a0f' : '#4a4a5a',
                          boxShadow: isActive ? `0 0 10px ${s.accent}40` : 'none',
                          transition: 'all 0.4s ease',
                        }}
                      >
                        <span className="font-heading text-[0.7rem] font-black">{s.num}</span>
                      </div>

                      {/* Manga SFX on impact */}
                      {isImpact && (
                        <span
                          className="absolute -top-6 left-1/2 -translate-x-1/2 font-heading font-black text-lg whitespace-nowrap pointer-events-none select-none"
                          style={{
                            color: s.accent,
                            animation: 'process-sfx 0.6s ease-out forwards',
                            textShadow: `0 0 15px ${s.accent}60`,
                          }}
                        >
                          {s.sfx}
                        </span>
                      )}
                    </div>

                    {/* Content below node */}
                    <div className="mt-6 text-center max-w-[180px]">
                      <h3
                        className="font-heading text-sm font-semibold tracking-wider mb-2"
                        style={{
                          color: isActive ? '#fff' : '#6a6a7a',
                          transition: 'color 0.4s',
                        }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: isActive ? '#9ca3af' : '#4a4a5a',
                          transition: 'color 0.4s',
                        }}
                      >
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress bar at bottom */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: i <= activeStep ? s.accent : 'rgba(255,255,255,0.06)',
                    boxShadow: i === activeStep ? `0 0 8px ${s.accent}60` : 'none',
                    transition: 'all 0.4s ease',
                  }}
                />
                {i < steps.length - 1 && (
                  <div
                    className="w-8 h-px"
                    style={{
                      backgroundColor: i < activeStep ? s.accent + '40' : 'rgba(255,255,255,0.04)',
                      transition: 'background-color 0.4s',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════
            MOBILE: Vertical manga pipeline
           ═══════════════════════════════════════ */}
        <div className="lg:hidden">
          {steps.map((s, i) => {
            const isActive = i <= activeStep;
            const isCurrent = i === activeStep;
            const isImpact = i === impactStep;
            const Icon = s.icon;

            return (
              <div key={s.num} className="flex gap-4 mb-2 last:mb-0">
                {/* Left rail */}
                <div className="flex flex-col items-center shrink-0">
                  {/* Node */}
                  <div className="relative">
                    {/* Impact ring */}
                    {isImpact && (
                      <div
                        className="absolute -inset-1 rounded-xl"
                        style={{
                          border: `2px solid ${s.accent}`,
                          animation: 'process-impact 0.6s ease-out forwards',
                        }}
                      />
                    )}

                    {/* Pulse ring */}
                    {isCurrent && (
                      <div
                        className="absolute -inset-2 rounded-xl"
                        style={{
                          border: `1px solid ${s.accent}20`,
                          animation: 'process-pulse 2s ease-in-out infinite',
                        }}
                      />
                    )}

                    <div
                      className="relative w-11 h-11 rounded-xl flex items-center justify-center border-2 z-10"
                      style={{
                        backgroundColor: isActive ? s.accent + '15' : '#11111e',
                        borderColor: isActive ? s.accent + '40' : 'rgba(255,255,255,0.06)',
                        boxShadow: isCurrent ? `0 0 20px ${s.accent}30` : 'none',
                        transform: isImpact ? 'scale(1.12)' : 'scale(1)',
                        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <Icon
                        size={18}
                        style={{
                          color: isActive ? s.accent : '#4a4a5a',
                          transition: 'color 0.4s',
                        }}
                      />
                    </div>

                    {/* Number */}
                    <div
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded flex items-center justify-center z-20"
                      style={{
                        backgroundColor: isActive ? s.accent : '#1a1a2e',
                        color: isActive ? '#0a0a0f' : '#4a4a5a',
                        transition: 'all 0.4s',
                      }}
                    >
                      <span className="font-heading text-[0.6rem] font-black">{s.num}</span>
                    </div>

                    {/* Mobile SFX */}
                    {isImpact && (
                      <span
                        className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full font-heading font-black text-sm whitespace-nowrap pointer-events-none select-none"
                        style={{
                          color: s.accent,
                          animation: 'process-sfx 0.6s ease-out forwards',
                          textShadow: `0 0 10px ${s.accent}60`,
                        }}
                      >
                        {s.sfx}
                      </span>
                    )}
                  </div>

                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="relative w-[2px] flex-1 min-h-[40px] mt-2 mb-2 overflow-hidden">
                      <div className="absolute inset-0 bg-white/[0.04] rounded-full" />
                      <div
                        className="absolute top-0 left-0 right-0 rounded-full"
                        style={{
                          height: i < activeStep ? '100%' : i === activeStep ? '50%' : '0%',
                          background: `linear-gradient(180deg, ${s.accent}, ${steps[i + 1].accent})`,
                          boxShadow: i <= activeStep ? `0 0 8px ${s.accent}40` : 'none',
                          transition: 'height 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      />

                      {/* Traveling energy dot */}
                      {i === activeStep && (
                        <div
                          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: s.accent,
                            boxShadow: `0 0 10px ${s.accent}`,
                            animation: 'process-traveler-v 1.5s ease-in-out infinite',
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="pb-6 pt-1">
                  <h3
                    className="font-heading text-sm font-semibold tracking-wider mb-1"
                    style={{
                      color: isActive ? '#fff' : '#6a6a7a',
                      transition: 'color 0.4s',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: isActive ? '#9ca3af' : '#4a4a5a',
                      transition: 'color 0.4s',
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ Custom keyframes ═══ */}
      <style>{`
        @keyframes process-impact {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        @keyframes process-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 0; }
        }

        @keyframes process-sfx {
          0% { transform: translate(-50%, 0) scale(0.5); opacity: 0; }
          30% { transform: translate(-50%, -4px) scale(1.2); opacity: 1; }
          100% { transform: translate(-50%, -12px) scale(1); opacity: 0; }
        }

        @keyframes process-speedline {
          0% { transform: scaleX(0); opacity: 0.8; }
          100% { transform: scaleX(1); opacity: 0; }
        }

        @keyframes process-traveler-v {
          0% { top: 0%; }
          100% { top: 90%; }
        }
      `}</style>
    </section>
  );
}
