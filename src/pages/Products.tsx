import { useEffect, useRef } from 'react';
import { animate, createScope, stagger } from 'animejs';

const products = [
  { 
    id: 1, 
    title: 'Busto Monarca', 
    category: 'Relíquia', 
    material: 'PLA Silk', 
    price: 'R$ 850',
    desc: 'O brilho sedoso do filamento imita ouro envelhecido nesta escultura de geometria sagrada.',
    image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 2, 
    title: 'Relógio P-8', 
    category: 'Cinética', 
    material: 'PETG Fibra', 
    price: 'R$ 1.200',
    desc: 'Engrenagens matemáticas que sussurram precisão. Estudo de atrito perfeito em movimento perpétuo.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    id: 3, 
    title: 'Cocar Etéreo', 
    category: 'Cenografia', 
    material: 'TPU Translúcido', 
    price: 'R$ 2.450',
    desc: 'Material flexível com propriedades de refração celestial que capta e dispersa a luz do ambiente.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800' 
  },
  {
    id: 4,
    title: 'Matriz Paramétrica',
    category: 'Arquitetura',
    material: 'Resina ABS-Like',
    price: 'R$ 3.100',
    desc: 'Uma representação arquitetônica complexa onde curvas poligonais desafiam a gravidade.',
    image: 'https://images.unsplash.com/photo-1515036551566-bffa1e941166?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Vaso Euclidiano',
    category: 'Decor',
    material: 'PETG Reciclado',
    price: 'R$ 450',
    desc: 'Ângulos agudos e transparência sutil que dão um tom místico à flora natural inserida.',
    image: 'https://images.unsplash.com/photo-1573588546512-5eb3236e78b2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Dríade de Carbono',
    category: 'Bio-Art',
    material: 'Fibra de Carbono',
    price: 'R$ 5.800',
    desc: 'A resistência do carbono combinada com formas orgânicas de árvores distópicas.',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=800'
  }
];

const Products = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = createScope({
      defaults: { ease: 'outQuart', duration: 1200 },
    }).add(() => {
      
      // Reveal the title and subtitle elements whole to avoid background-clip bugs with CSS transforms inside
      animate('.page-title-anim', {
         y: [40, 0],
         opacity: [0, 1],
         delay: stagger(200)
      });

      // Reveal products dynamically as they enter the viewport
      const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
            if(entry.isIntersecting) {
               animate(entry.target, {
                  y: [80, 0],
                  opacity: [0, 1],
                  rotateX: [20, 0], // Subtle 3D tilt entering
                  ease: 'outExpo',
                  duration: 1000
               });
               observer.unobserve(entry.target);
            }
         });
      }, { threshold: 0.1 });

      document.querySelectorAll('.product-card').forEach(el => observer.observe(el));

      return () => observer.disconnect();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#080D1A] w-full pt-40 pb-32">
       <div className="max-w-7xl mx-auto px-6">
          <header className="mb-24">
            <h1 className="page-title-anim opacity-0 text-5xl md:text-7xl lg:text-8xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4AF37] to-[#FF8C00] tracking-tight">
               O Arsenal Sagrado
            </h1>
            <p className="page-title-anim opacity-0 mt-8 text-slate-400 font-light text-lg md:text-xl max-w-2xl border-l-2 border-[#D4AF37]/30 pl-6">
               <span className="block mb-2">Relíquias forjadas da imaginação para a matéria.</span>
               <span className="block">Explore nossas lâminas, cinéticas e artefatos de precisão absoluta.</span>
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12" style={{ perspective: '1200px' }}>
             {products.map((product) => (
                <div 
                   key={product.id}
                   className="product-card opacity-0 transform-style-3d group cursor-pointer"
                   style={{ transformOrigin: 'center bottom' }}
                >
                   {/* Card Container */}
                   <div className="relative w-full h-[550px] rounded-2xl bg-gradient-to-b from-[#111A33] to-[#080D1A] border border-[#D4AF37]/10 overflow-hidden flex flex-col transition-all duration-500 ease-out hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/50">
                      
                      {/* Image Area */}
                      <div className="relative h-[50%] w-full overflow-hidden shrink-0">
                         {/* Vignette Shadow Overlay */}
                         <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-transparent to-transparent z-10" />
                         <div className="absolute inset-0 bg-[#00B4D8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                         
                         <img 
                            src={product.image} 
                            alt={product.title} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                         />
                         
                         {/* Floating Category Badge */}
                         <div className="absolute top-5 right-5 z-20 bg-[#080D1A]/60 backdrop-blur-md border border-[#00B4D8]/30 px-4 py-1.5 rounded-sm">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-[#00B4D8] uppercase">{product.category}</span>
                         </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-8 flex-1 flex flex-col justify-between relative z-20">
                         {/* Elegant Hover Underline for the Card */}
                         <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-[#FF8C00] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                         
                         <div>
                            <h2 className="text-2xl md:text-3xl font-black font-serif text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                               {product.title}
                            </h2>
                            <p className="text-sm text-slate-400 font-light leading-relaxed line-clamp-3 group-hover:text-slate-200 transition-colors">
                               {product.desc}
                            </p>
                         </div>

                         <div className="flex flex-col gap-4 mt-6">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="w-2 h-2 rounded-full bg-[#FF8C00]/50 animate-pulse" />
                              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                                 Material: {product.material}
                              </span>
                            </div>

                            <div className="flex justify-between items-end w-full">
                               <span className="block text-white font-mono tracking-widest text-xl font-black group-hover:text-[#FF8C00] transition-colors">
                                  {product.price}
                               </span>
                               
                               <button className="px-5 py-2 border border-[#FF8C00]/30 text-[#FF8C00] text-xs font-bold uppercase tracking-[0.15em] rounded-sm transition-all duration-300 group-hover:bg-[#FF8C00] group-hover:text-black group-hover:shadow-[0_0_20px_rgba(255,140,0,0.4)]">
                                  Inspecionar
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default Products;
