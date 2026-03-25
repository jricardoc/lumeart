import { motion } from 'framer-motion';

const About = () => {
  const timeline = [
    { year: "2020", title: "A Primeira Centelha", desc: "A fascinação pelas camadas. A primeira bobina de PLA fundida na garagem modesta." },
    { year: "2023", title: "A Ascensão do Fogo", desc: "Forjamos a primeira aliança entre tecnologia estéril e a paixão artística visceral." },
    { year: "2026", title: "O Alquimista Perfeito", desc: "Lume Art atinge a maestria. Controlamos a fusão com precisão micro-milimétrica." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="pb-32 pt-32 px-6 container mx-auto max-w-6xl"
    >
      <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-serif font-black text-white leading-tight">
            A Forja <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B87333]">Lume Art</span>
          </h1>
          <p className="text-xl text-slate-300 font-light leading-relaxed">
            Há algo de profundamente sagrado no ato de transformar poeira digital em matéria tangível. Nossa fundação não se baseia apenas em máquinas, mas na antiga obsessão artesanal por esculpir a beleza através do fogo e do metal fundido—neste caso, cristalizado através do filamento ardente.
          </p>
          <div className="h-[1px] w-32 bg-gradient-to-r from-[#00B4D8] to-transparent" />
        </div>
        
        <div className="relative h-[600px] w-full glass rounded-[3rem] overflow-hidden border-[#D4AF37]/20 flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-transparent to-transparent z-10" />
          {/* Faux 3D / Image Placeholder representation */}
          <div className="absolute w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-3xl group-hover:bg-[#FF8C00]/20 transition-colors duration-1000" />
          <p className="relative z-20 text-[#D4AF37]/50 font-serif italic text-2xl rotate-90 transform origin-center opacity-30 select-none">Visão do Fogo</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-white mb-16 text-center">Linha do Tempo de Glória</h2>
        
        <div className="space-y-12">
          {timeline.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              key={item.year}
              className="flex flex-col md:flex-row gap-6 md:gap-12 group"
            >
              <div className="md:w-1/4 flex md:justify-end">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#00B4D8] to-transparent opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.year}
                </span>
              </div>
              <div className="md:w-3/4 glass p-8 rounded-2xl border-white/5 group-hover:border-[#D4AF37]/30 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full group-hover:bg-[#FF8C00]/10 transition-colors duration-500" />
                <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed font-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default About;
