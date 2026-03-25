import { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger, onScroll } from 'animejs';
import { GlowButton } from '../components/ui/GlowButton';
import { Settings, Palette } from 'lucide-react';
import { SacredGeometry } from '../components/effects/SacredGeometry';
import { ForgeCore } from '../components/effects/ForgeCore';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const alchemySteps = [
    { title: 'Concepção', desc: 'O nascimento da ideia. Rascunhos etéreos e geometrias sagradas.' },
    { title: 'Modelagem', desc: 'A escultura digital. Polígonos dançam no vazio cibernético até a forma perfeita.' },
    { title: 'Fatiamento', desc: 'A transcrição. A linguagem da forma traduzida para o código matemático das máquinas.' },
    { title: 'Forjamento', desc: 'O ritual de fogo. Camada sobre camada, o filamento arde e se solidifica em realidade.' },
  ];

  useEffect(() => {
    // Master timeline for entry animations
    const tl = createTimeline({ defaults: { ease: 'outExpo', duration: 1500 } });
    
    // Stagger the giant FORJA letters
    tl.add('.bg-letter', {
      opacity: [0, 0.1],
      y: [100, 0],
      rotate: [10, 0],
      delay: stagger(100)
    }, 0);

    // Stagger the LUME text
    tl.add('.bg-lume', {
      opacity: [0, 1],
      y: [50, 0]
    }, 500);

    // Hero elements
    tl.add('.hero-el', {
      opacity: [0, 1],
      x: [-50, 0],
      delay: stagger(200)
    }, 700);

    // Scroll synced animations
    if (containerRef.current) {
      animate('.parallax-bg', {
        y: [-100, -800], // Moves up aggressively as the user scrolls
        autoplay: onScroll({ sync: true })
      });
    }

    // Scroll triggered shards using simple intersection observers
    const shards = document.querySelectorAll('.shard-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target, {
            opacity: [0, 1],
            rotate: () => {
              // Custom extraction depending on element
              return entry.target.classList.contains('rotate-left') ? [-5, -2] : [5, 2];
            },
            x: () => {
              return entry.target.classList.contains('rotate-left') ? [-100, 0] : [100, 0];
            },
            duration: 1200,
            ease: 'outQuart'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    shards.forEach(s => observer.observe(s));
    
    // Timeline steps trigger
    const steps = document.querySelectorAll('.timeline-el');
    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target, {
            opacity: [0, 1],
            y: [50, 0],
            duration: 1000,
            ease: 'outQuart'
          });
          stepObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    steps.forEach(s => stepObserver.observe(s));

    return () => {
      observer.disconnect();
      stepObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#080D1A] min-h-[300vh] w-full overflow-hidden">
      
      {/* Immersive Background Typography with precise Anime.js targeting */}
      <div className="parallax-bg fixed top-[60%] left-1/2 -translate-x-1/2 pointer-events-none z-0 mix-blend-overlay select-none flex flex-col items-center">
        <h1 className="text-[20vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent flex">
          {"FORJA".split('').map((l, i) => <span key={i} className="bg-letter inline-block opacity-0">{l}</span>)}
        </h1>
        <h1 className="bg-lume text-[20vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-t from-[#D4AF37] to-transparent -mt-20 opacity-0 relative z-10 drop-shadow-[0_0_50px_rgba(212,175,55,0.3)]">
          LUME
        </h1>
      </div>

      {/* 1. Hero Imersivo */}
      <section className="relative z-10 min-h-screen flex items-center pt-20 px-6">
        {/* Three.js Forge Core on the left side to fill the void */}
        <div className="absolute top-0 -left-[20%] w-[80%] h-[120%] z-0 pointer-events-none opacity-50 lg:opacity-100 hidden md:block">
          <ForgeCore />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl lg:ml-auto lg:pl-20">
            <p className="hero-el text-[#D4AF37] font-serif tracking-[0.3em] uppercase mb-8 opacity-0">
              A Nova Era da Manufatura Aditiva
            </p>
            
            <h2 className="hero-el text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-12 opacity-0">
              Forjando <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FF8C00] to-[#00B4D8]">
                Realidade
              </span>
            </h2>

            <div className="hero-el flex flex-col md:flex-row md:items-center gap-8 border-l border-[#00B4D8]/30 pl-8 ml-2 opacity-0">
              <p className="text-xl md:text-2xl text-slate-400 font-light max-w-xl">
                Elevamos o filamento ao nível do divino. De protótipos enigmáticos a esculturas vitrificadas, transformamos sua visão etérea em matéria sólida.
              </p>
              <div className="hidden lg:block w-32 h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent" />
              <GlowButton onClick={() => window.location.href = '/produtos'}>Explorar Vitrine</GlowButton>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Lâminas da Alquimia (Serviços Fora da Caixa) */}
      <section className="relative z-20 py-32 overflow-hidden">
        {/* Shard 1 */}
        <div 
          className="shard-card rotate-left opacity-0 relative w-[110vw] -ml-[5vw] py-20 px-[10vw] mb-32 bg-gradient-to-r from-[#111A33]/90 to-[#080D1A]/90 backdrop-blur-xl border-t border-b border-[#D4AF37]/20 shadow-[0_0_50px_rgba(212,175,55,0.05)] transition-all duration-700 hover:z-30 hover:!rotate-0 hover:!scale-105"
          style={{ clipPath: 'polygon(0 10%, 100% 0, 100% 90%, 0 100%)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="w-32 h-32 rounded-full border border-[#D4AF37]/30 flex items-center justify-center relative shrink-0">
              <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-full blur-xl animate-pulse" />
              <Settings className="w-12 h-12 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-4xl md:text-6xl font-black font-serif text-white mb-6">Prototipagem de Vanguarda</h3>
              <p className="text-2xl text-slate-300 font-light leading-relaxed">
                Forjando conceitos complexos em filamentos de engenharia (PLA, PETG). Do digital para o tátil, camada por camada com a precisão de um átomo.
              </p>
            </div>
          </div>
        </div>

        {/* Shard 2 */}
        <div 
          className="shard-card rotate-right opacity-0 relative w-[110vw] -ml-[5vw] py-20 px-[10vw] mb-32 bg-gradient-to-l from-[#111A33]/90 to-[#080D1A]/90 backdrop-blur-xl border-t border-b border-[#00B4D8]/20 shadow-[0_0_50px_rgba(0,180,216,0.05)] transition-all duration-700 hover:z-30 hover:!rotate-0 hover:!scale-105"
          style={{ clipPath: 'polygon(0 0, 100% 10%, 100% 100%, 0 90%)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16 text-right">
            <div className="w-32 h-32 rounded-full border border-[#00B4D8]/30 flex items-center justify-center relative shrink-0">
              <div className="absolute inset-0 bg-[#00B4D8]/10 rounded-full blur-xl animate-pulse" />
              <Palette className="w-12 h-12 text-[#00B4D8]" />
            </div>
            <div>
              <h3 className="text-4xl md:text-6xl font-black font-serif text-white mb-6">Arte & Cenografia</h3>
              <p className="text-2xl text-slate-300 font-light leading-relaxed">
                Arte imersiva em filamentos especiais. Dê vida a esculturas, adereços e cenários gloriosos, dignos da prata das telas de cinema.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. A Jornada do Filamento (O Alquimista) */}
      <section className="relative z-20 py-40 px-6 max-w-7xl mx-auto">
        <SacredGeometry />

        <div className="text-center mb-32 relative z-10">
          <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#111A33] mb-8">
            O Alquimista
          </h2>
          <p className="text-2xl md:text-4xl text-[#D4AF37] font-serif italic max-w-4xl mx-auto leading-relaxed">
            "A Jornada do Filamento: Do Calor do Fogo à Precisão do Cristal."
          </p>
        </div>

        {/* The Spine Timeline */}
        <div className="relative">
          {/* Glowing Spine Line */}
          <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-1 md:-ml-[0.5px] bg-gradient-to-b from-transparent via-[#FF8C00] to-transparent opacity-50 blur-[1px]" />

          <div className="space-y-32">
            {alchemySteps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div 
                  key={step.title}
                  className={`timeline-el opacity-0 flex w-full relative ${isEven ? 'md:justify-start' : 'md:justify-end'} justify-start`}
                >
                  <div className={`md:w-5/12 ml-20 md:ml-0 relative ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                    
                    {/* The glowing node on the spine */}
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? 'left-[-4rem] md:left-auto md:-right-[2.2rem]' : 'left-[-4rem] md:-left-[2.2rem]'} w-4 h-4 rounded-full bg-[#D4AF37] shadow-[0_0_20px_#FF8C00] z-10`} />
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? 'left-[-4rem] md:left-auto md:-right-[2.2rem]' : 'left-[-4rem] md:-left-[2.2rem]'} w-12 h-12 border border-[#FF8C00]/30 rounded-full animate-ping z-0`} />

                    {/* Massive Number Overlay */}
                    <div className={`absolute top-[-40%] ${isEven ? 'right-0' : 'left-0'} text-[8rem] font-black text-white/5 select-none pointer-events-none -z-10`}>
                      0{i + 1}
                    </div>

                    <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-wider">{step.title}</h3>
                    <p className="text-xl text-slate-400 font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
