import { useCallback } from 'react';
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
    sfx: 'POW!',
  },
  {
    icon: Building2,
    title: 'Personalizados para Empresas',
    desc: 'Brindes corporativos, maquetes, protótipos. Soluções sob medida para dar um upgrade no seu negócio.',
    accent: '#4da6e0',
    sfx: 'BOOM!',
  },
  {
    icon: Wrench,
    title: 'Protótipos & Peças Técnicas',
    desc: 'Do conceito ao objeto físico. Ideal para engenheiros, designers e inventores que precisam testar suas criações.',
    accent: '#8b5cf6',
    sfx: 'ZAP!',
  },
  {
    icon: Gift,
    title: 'Presentes & Decoração Geek',
    desc: 'Luminárias, porta-canetas temáticos, bustos de personagens. O presente perfeito para quem é nerd raiz.',
    accent: '#2dd4bf',
    sfx: 'WHAM!',
  },
  {
    icon: Sparkles,
    title: 'Sob Demanda',
    desc: 'Não encontrou o que procura? Conte sua ideia e nós damos um jeito. Se é imprimível, a gente faz.',
    accent: '#e8c97a',
    sfx: 'BANG!',
  },
];

export default function Services() {
  const ref = useScrollReveal((el) => {
    animate(el.querySelectorAll('.anim'), {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(80),
      ease: 'outExpo',
    });
    animate(el.querySelectorAll('.svc-card'), {
      translateY: [80, 0],
      opacity: [0, 1],
      rotate: [3, 0],
      duration: 800,
      delay: stagger(100, { start: 200 }),
      ease: 'outExpo',
    });
  });

  /* 3D tilt effect handlers */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * 15;
      const rotateY = (x - 0.5) * 15;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    },
    [],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.transform =
        'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    },
    [],
  );

  return (
    <section id="servicos" className="relative py-20 lg:py-28 scroll-mt-20">
      {/* gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-surface/20 to-dark pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle tag="SERVICES" title="Nossos Serviços" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map(({ icon: Icon, title, desc, accent, sfx }) => (
            <div
              key={title}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="svc-card card-shine group relative p-6 rounded-xl bg-card/50 border border-white/[0.04] opacity-0 backdrop-blur-sm
                hover:border-[var(--accent)]/20 hover:bg-card/80 hover:shadow-[0_0_40px_var(--glow)]"
              style={
                {
                  '--accent': accent,
                  '--glow': accent + '15',
                  transformStyle: 'preserve-3d',
                  transition:
                    'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s, background-color 0.3s',
                } as React.CSSProperties
              }
            >
              {/* Manga onomatopeia on hover */}
              <span
                className="absolute -top-3 -right-2 font-heading font-black text-2xl opacity-0 group-hover:opacity-[0.08] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 select-none pointer-events-none"
                style={{ color: accent }}
              >
                {sfx}
              </span>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: accent + '15',
                  boxShadow: `0 0 0 0 ${accent}00`,
                  transition:
                    'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 20px ${accent}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 0 ${accent}00`;
                }}
              >
                <Icon
                  size={22}
                  style={{ color: accent }}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </div>

              <h3 className="font-heading text-[13px] lg:text-sm font-semibold text-white mb-2 tracking-wider">
                {title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>

              {/* Animated top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                style={{
                  background: `linear-gradient(90deg, ${accent}, transparent)`,
                }}
              />

              {/* Bottom pulse line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
