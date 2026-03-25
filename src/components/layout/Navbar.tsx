import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Navbar = () => {
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
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
    >
      <div className="glass px-8 py-4 rounded-full flex items-center justify-between border-white/5 shadow-2xl">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] via-[#FF8C00] to-[#00B4D8] animate-pulse group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xl font-bold tracking-tighter text-white uppercase italic">Lume Art</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-slate-300 hover:text-[#D4AF37] transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <button className="text-xs font-bold uppercase tracking-widest text-white px-5 py-2 rounded-full border border-white/10 hover:border-[#D4AF37]/50 transition-colors">
          Contato
        </button>
      </div>
    </motion.nav>
  );
};
