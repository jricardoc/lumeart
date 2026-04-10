import { useEffect, useState } from 'react';
import { animate, stagger } from 'animejs';
import { MapPin, Calendar, Layers } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionTitle from './SectionTitle';

const stats = [
  { icon: Calendar, label: 'Fundação', value: '2026', numericValue: 2026 },
  { icon: MapPin, label: 'Base', value: 'Salvador — BA' },
  { icon: Layers, label: 'Especialidade', value: 'Impressão 3D' },
];

function CounterCard({
  icon: Icon,
  label,
  value,
  numericValue,
  revealed,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
  numericValue?: number;
  revealed: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(
    numericValue ? '0' : value,
  );

  useEffect(() => {
    if (!revealed || !numericValue) return;

    let current = 0;
    const target = numericValue;
    const steps = 30;
    const increment = target / steps;
    const stepDuration = 1500 / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setDisplayValue(Math.round(current).toString());
    }, stepDuration);

    return () => clearInterval(timer);
  }, [revealed, numericValue]);

  return (
    <div className="group flex items-center gap-4 p-5 rounded-xl bg-card/60 border border-gold/[0.06] backdrop-blur-sm holographic-border transition-all duration-500 hover:border-gold/15">
      <div
        className="shrink-0 w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300 animate-energy-pulse"
        style={
          { '--pulse-color': 'rgba(212,168,83,0.2)' } as React.CSSProperties
        }
      >
        <Icon size={22} className="text-gold" />
      </div>
      <div>
        <p className="text-[0.875rem] text-gray-500 uppercase tracking-[0.2em] font-medium">
          {label}
        </p>
        <p className="text-white font-semibold text-lg font-heading tracking-wider">
          {numericValue ? displayValue : value}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const [revealed, setRevealed] = useState(false);

  const ref = useScrollReveal((el) => {
    setRevealed(true);
    animate(el.querySelectorAll('.anim'), {
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 900,
      delay: stagger(120),
      ease: 'outExpo',
    });
    animate(el.querySelectorAll('.stat-card'), {
      translateX: [40, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(150, { start: 300 }),
      ease: 'outExpo',
    });
  });

  return (
    <section id="sobre" className="relative py-20 lg:py-28 scroll-mt-20 bg-surface/40">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* Decorative hexagonal grid background */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 20 L55 45 L30 60 L5 45 L5 20Z' fill='none' stroke='%23d4a853' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle tag="ABOUT" title="Quem Somos" />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Text — 3 cols */}
          <div className="lg:col-span-3 space-y-5 anim">
            <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
              A{' '}
              <span className="text-gold font-semibold">LumeArt</span> nasceu em
              2026, em Salvador-BA, da paixão por tecnologia e cultura geek. Somos
              artesãos digitais que dominam a arte da impressão 3D para trazer à
              vida aquilo que antes só existia na tela.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Do design de um action figure ao protótipo de uma peça técnica, cada
              projeto passa por nossas mãos com o mesmo cuidado de um mestre
              craftando seu item lendário. Utilizamos tecnologia de ponta e
              materiais de alta qualidade para garantir que cada impressão seja uma
              obra de arte.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Nossa missão? Democratizar a impressão 3D e tornar acessível a
              materialização de ideias. Seja você um colecionador, uma empresa ou
              alguém com uma ideia incrível — estamos aqui para dar forma ao seu
              projeto.
            </p>
          </div>

          {/* Stats — 2 cols */}
          <div className="lg:col-span-2 grid gap-4">
            {stats.map((s) => (
              <div key={s.label} className="stat-card opacity-0">
                <CounterCard {...s} revealed={revealed} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
