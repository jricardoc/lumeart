import { animate, stagger } from 'animejs';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionTitle from './SectionTitle';

const platforms = [
  { name: 'Shopee', color: '#EE4D2D', href: '#', soon: true },
  { name: 'Mercado Livre', color: '#FFE600', href: '#', soon: true },
];

export default function Marketplaces() {
  const ref = useScrollReveal((el) => {
    animate(el.querySelectorAll('.anim'), {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(100),
      ease: 'outExpo',
    });
    animate(el.querySelectorAll('.mp-card'), {
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 700,
      delay: stagger(150, { start: 200 }),
      ease: 'outBack',
    });
  });

  return (
    <section className="relative py-20 lg:py-28">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionTitle tag="ONLINE" title="Encontre-nos Online" />

        <p className="anim text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Além do atendimento direto pelo Instagram, você encontra nossos
          produtos prontos nas maiores plataformas do Brasil.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target={p.soon ? undefined : '_blank'}
              rel={p.soon ? undefined : 'noopener noreferrer'}
              className="mp-card group flex flex-col items-center justify-center p-8 rounded-xl bg-card/50 border border-white/[0.04] opacity-0
                transition-all duration-500 hover:bg-card/80"
              style={
                {
                  '--accent': p.color,
                  '--neon-color': p.color,
                } as React.CSSProperties
              }
            >
              <ShoppingBag
                size={28}
                className="mb-3 transition-all duration-300 group-hover:scale-110"
                style={{
                  color: p.color,
                  filter: `drop-shadow(0 0 10px ${p.color}40)`,
                }}
              />
              <span
                className="font-heading text-base font-bold text-white tracking-wider transition-all duration-300"
                style={{
                  textShadow: `0 0 0px ${p.color}00`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textShadow = `0 0 20px ${p.color}60, 0 0 40px ${p.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textShadow = `0 0 0px ${p.color}00`;
                }}
              >
                {p.name}
              </span>
              {p.soon ? (
                <span className="text-[0.875rem] text-gray-500 uppercase tracking-widest mt-3 font-pixel animate-glitch">
                  Em breve
                </span>
              ) : (
                <ExternalLink
                  size={14}
                  className="mt-2 text-gray-500 group-hover:text-white transition-colors"
                />
              )}

              {/* Neon border glow on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 30px ${p.color}08, 0 0 30px ${p.color}08`,
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
