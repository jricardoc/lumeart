import { Mail, Globe, MessageCircle, Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative py-20 px-6 border-t border-white/5 bg-[#080D1A]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold tracking-tighter text-white mb-6 uppercase italic">Lume Art</h2>
            <p className="text-slate-400 max-w-sm mb-8">
              A convergência perfeita entre a forja ancestral e a tecnologia do futuro. 
              Criando peças únicas que desafiam a imaginação.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageCircle, Mail].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all cursor-pointer">
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Navegação</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Início</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Portfólio</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Serviços</a></li>
              <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">Sobre</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Oficina</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#D4AF37]" /> Qualidade Premium</li>
              <li>Suporte Criativo</li>
              <li>Prazos Sagrados</li>
              <li>Entrega Global</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2026 Lume Art. Todos os direitos reservados.</p>
          <p>Desenvolvido com Magia e Tecnologia.</p>
        </div>
      </div>
    </footer>
  );
};
