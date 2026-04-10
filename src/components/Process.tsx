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
  },
  {
    icon: Calculator,
    title: 'Orçamento',
    desc: 'Avaliamos o projeto e enviamos uma proposta transparente, sem surpresas.',
    num: '02',
  },
  {
    icon: Box,
    title: 'Modelagem 3D',
    desc: 'Criamos ou ajustamos o modelo digital da sua peça com precisão.',
    num: '03',
  },
  {
    icon: Printer,
    title: 'Fabricação',
    desc: 'A impressora entra em ação — camada por camada, sua ideia ganha forma.',
    num: '04',
  },
  {
    icon: Package,
    title: 'Entrega',
    desc: 'Peça finalizada, com acabamento, e pronta para o mundo.',
    num: '05',
  },
];

export default function Process() {
  const ref = useScrollReveal((el) => {
    animate(el.querySelectorAll('.anim'), {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(80),
      ease: 'outExpo',
    });
    /* Step numbers — impact entrance */
    animate(el.querySelectorAll('.step-num'), {
      scale: [2.5, 1],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(150, { start: 300 }),
      ease: 'outExpo',
    });
    /* Step content */
    animate(el.querySelectorAll('.step-content'), {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 700,
      delay: stagger(150, { start: 400 }),
      ease: 'outExpo',
    });
    /* Connecting lines */
    animate(el.querySelectorAll('.step-connector'), {
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(150, { start: 500 }),
      ease: 'outExpo',
    });
  });

  return (
    <section
      id="processo"
      className="relative py-20 lg:py-28 scroll-mt-20 bg-surface/40"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* Subtle manga-style panel border */}
      <div className="absolute top-4 left-4 right-4 bottom-4 border border-gold/[0.03] rounded-2xl pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle tag="PROCESS" title="Como Funciona" />

        {/* ── Desktop: manga strip ── */}
        <div className="hidden lg:flex items-start gap-0">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="flex items-start flex-1">
                {/* Step card */}
                <div className="relative text-center flex-1 px-2">
                  {/* Big number with impact */}
                  <div className="step-num opacity-0 mb-3">
                    <span className="font-heading text-4xl font-black text-gold/10">
                      {s.num}
                    </span>
                  </div>

                  <div className="step-content opacity-0">
                    {/* Icon box with manga border */}
                    <div className="w-14 h-14 rounded-xl bg-gold/10 border-2 border-gold/15 flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-gold/15 hover:border-gold/25 hover:shadow-[0_0_20px_rgba(212,168,83,0.15)]">
                      <Icon size={24} className="text-gold" />
                    </div>

                    <h3 className="font-heading text-[11px] font-semibold text-white tracking-wider mb-2">
                      {s.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  {/* Speed lines decoration */}
                  <div className="absolute -top-2 left-0 right-0 flex justify-center gap-1 opacity-[0.04]">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className="w-px h-8 bg-gold"
                        style={{
                          transform: `rotate(${-10 + j * 10}deg)`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Connector arrow */}
                {i < steps.length - 1 && (
                  <div className="step-connector flex items-center justify-center pt-16 px-1 opacity-0 origin-left">
                    <div className="w-8 h-px bg-gradient-to-r from-gold/30 to-gold/10" />
                    <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-t-transparent border-b-transparent border-l-gold/30" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Mobile: vertical manga panels ── */}
        <div className="lg:hidden relative">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="step-content flex gap-4 mb-8 last:mb-0 opacity-0"
              >
                {/* Left rail: number + icon + line */}
                <div className="flex flex-col items-center shrink-0">
                  <span className="step-num font-heading text-[10px] font-bold text-gold/30 mb-1 opacity-0">
                    {s.num}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-gold" />
                  </div>
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 mt-2 bg-gradient-to-b from-gold/20 to-transparent min-h-[20px]" />
                  )}
                </div>

                {/* Right content */}
                <div className="pb-1">
                  <h3 className="font-heading text-xs font-semibold text-white tracking-wider mb-1">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
