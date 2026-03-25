import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Início', href: '/' },
    { name: 'A Forja', href: '/sobre' },
    { name: 'Vitrine', href: '/produtos' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] max-w-5xl"
    >
      <div className="glass px-6 md:px-8 py-3 md:py-4 rounded-3xl flex items-center justify-between border-white/5 shadow-2xl relative">
        <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group cursor-pointer z-20">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] via-[#FF8C00] to-[#00B4D8] animate-pulse group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-lg md:text-xl font-bold tracking-tighter text-white uppercase italic">Lume Art</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 z-20">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors relative group ${isActive ? 'text-[#D4AF37]' : 'text-slate-300 hover:text-[#D4AF37]'}`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-[#D4AF37] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            );
          })}
        </div>

        {/* Desktop Contato Button */}
        <button className="hidden md:block text-xs font-bold uppercase tracking-widest text-white px-5 py-2 rounded-full border border-white/10 hover:border-[#D4AF37]/50 transition-colors z-20">
          Contato
        </button>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden flex items-center justify-center p-2 text-white hover:text-[#D4AF37] transition-colors z-20"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Full Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-full rounded-2xl bg-[#080D1A] border border-[#D4AF37]/20 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)] flex flex-col z-[100]"
            >
              <div className="flex flex-col py-4 px-6 gap-4">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-bold uppercase tracking-widest py-3 border-b border-white/5 transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-slate-300 hover:text-[#D4AF37]'}`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="mt-2 text-sm font-bold uppercase tracking-widest text-[#080D1A] bg-gradient-to-r from-[#D4AF37] to-[#FF8C00] py-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  Entrar em Contato
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
