import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionTitle from './SectionTitle';
import impressora from '../assets/impressora.webp';

export default function Workshop() {
  const imgRef = useRef<HTMLDivElement>(null);

  /* Parallax effect on scroll */
  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const offset = (center - viewCenter) * 0.08;
      imgRef.current.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ref = useScrollReveal((el) => {
    animate(el.querySelectorAll('.anim'), {
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 900,
      delay: stagger(120),
      ease: 'outExpo',
    });
    animate(el.querySelectorAll('.ws-img'), {
      scale: [0.92, 1],
      opacity: [0, 1],
      duration: 1000,
      delay: 200,
      ease: 'outExpo',
    });
  });

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle tag="WORKSHOP" title="Nosso Espaço" />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Image with effects */}
          <div className="ws-img relative rounded-2xl overflow-hidden border border-gold/[0.06] opacity-0 shadow-[0_4px_60px_rgba(0,0,0,0.4)] group">
            <div ref={imgRef}>
              <img
                src={impressora}
                alt="Impressora 3D Bambu Lab no estúdio LumeArt"
                className="w-full h-auto"
              />
            </div>

            {/* Scan line effect — continuous */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"
                style={{ animation: 'scan-line 3s linear infinite' }}
              />
            </div>

            {/* Blueprint grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(#4da6e0 1px, transparent 1px), linear-gradient(90deg, #4da6e0 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />

            {/* Corner markers */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-gold/20" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-gold/20" />
          </div>

          {/* Description */}
          <div className="space-y-5 anim">
            <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
              É aqui que a mágica acontece. Nosso estúdio em{' '}
              <span className="text-gold font-semibold">Salvador</span> conta
              com equipamentos de última geração para garantir qualidade e
              precisão em cada impressão.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Cada peça é fabricada com cuidado artesanal e tecnologia de ponta,
              garantindo acabamento impecável e fidelidade ao modelo original. Do
              PLA à resina, escolhemos o material ideal para cada projeto.
            </p>

            {/* Tech specs box */}
            <div className="border border-gold/[0.06] rounded-lg p-4 bg-card/30 backdrop-blur-sm">
              <p className="font-pixel text-[8px] text-gold/30 tracking-widest mb-2">
                // SPECS
              </p>
              <div className="space-y-1 font-mono text-xs text-gray-500">
                <p>
                  <span className="text-gold/40">▸</span> Bambu Lab P1S
                </p>
                <p>
                  <span className="text-gold/40">▸</span> Precisão: 0.1mm
                </p>
                <p>
                  <span className="text-gold/40">▸</span> Materiais: PLA, PETG,
                  TPU, Resina
                </p>
              </div>
            </div>

            <p className="text-gray-500 text-sm italic">
              * Em breve adicionaremos mais fotos do nosso espaço de produção.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
