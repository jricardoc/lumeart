import { animate, stagger } from 'animejs';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionTitle from './SectionTitle';
import ricardo from '../assets/ricardo.webp';
import natalia from '../assets/natalia.webp';

const members = [
  {
    name: 'Ricardo Carvalho',
    role: 'Co-fundador & Dev Fullstack',
    bio: 'Responsável pela parte tecnológica, modelagem 3D e produção. Transforma linhas de código e filamentos em realidade.',
    image: ricardo,
    stats: [
      { label: 'Código', value: 95 },
      { label: '3D Design', value: 90 },
      { label: 'Hardware', value: 85 },
    ],
    accent: '#4da6e0',
  },
  {
    name: 'Natália Barreto',
    role: 'Co-fundadora & Dentista (UFBA)',
    bio: 'Responsável pela gestão, criatividade e atendimento ao cliente. O olhar artístico e estratégico por trás da marca.',
    image: natalia,
    stats: [
      { label: 'Criatividade', value: 95 },
      { label: 'Estratégia', value: 90 },
      { label: 'Comunicação', value: 92 },
    ],
    accent: '#8b5cf6',
  },
];

export default function Team() {
  const ref = useScrollReveal((el) => {
    animate(el.querySelectorAll('.anim'), {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(100),
      ease: 'outExpo',
    });
    animate(el.querySelectorAll('.team-card'), {
      translateY: [80, 0],
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 900,
      delay: stagger(200, { start: 250 }),
      ease: 'outExpo',
    });
  });

  return (
    <section
      id="equipe"
      className="relative py-20 lg:py-28 scroll-mt-20 bg-surface/40"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle tag="TEAM" title="Quem Está Por Trás" />

        {/* Character select hint */}
        <p className="text-center font-pixel text-[8px] text-gold/20 tracking-widest mb-8 -mt-8 anim">
          — SELECT YOUR CHARACTER —
        </p>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {members.map((m) => (
            <div
              key={m.name}
              className="team-card group rounded-2xl overflow-hidden bg-card/60 border border-gold/[0.06] opacity-0
                transition-all duration-500 hover:shadow-[0_0_40px_var(--glow)]"
              style={
                {
                  '--accent': m.accent,
                  '--glow': m.accent + '12',
                } as React.CSSProperties
              }
            >
              {/* Photo with effects */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-surface">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Scan line effect on hover */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    style={{ animation: 'scan-line 2.5s linear infinite' }}
                  />
                </div>

                {/* Corner brackets on hover */}
                <div
                  className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ borderColor: m.accent }}
                />
                <div
                  className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ borderColor: m.accent }}
                />

                {/* Gradient fade to card */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card to-transparent" />

                {/* Stats overlay — slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="space-y-2">
                    {m.stats.map((stat) => (
                      <div key={stat.label} className="flex items-center gap-2">
                        <span className="font-pixel text-[7px] text-white/60 w-20 text-right uppercase">
                          {stat.label}
                        </span>
                        <div className="flex-1 h-1.5 bg-dark/50 rounded-full overflow-hidden">
                          <div
                            className="stat-bar-fill h-full rounded-full"
                            style={
                              {
                                '--stat-w': `${stat.value}%`,
                                background: `linear-gradient(90deg, ${m.accent}, ${m.accent}80)`,
                                boxShadow: `0 0 8px ${m.accent}40`,
                              } as React.CSSProperties
                            }
                          />
                        </div>
                        <span
                          className="font-pixel text-[7px] w-6"
                          style={{ color: m.accent }}
                        >
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="relative p-6 -mt-8">
                <h3 className="font-heading text-sm font-bold text-white tracking-wider mb-1">
                  {m.name}
                </h3>
                <p
                  className="text-xs font-medium uppercase tracking-widest mb-3"
                  style={{ color: m.accent }}
                >
                  {m.role}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {m.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
