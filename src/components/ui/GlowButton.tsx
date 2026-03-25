import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'cyan' | 'copper';
  children: React.ReactNode;
}

export const GlowButton = ({ className, variant = 'gold', children, ...props }: GlowButtonProps) => {
  const variants = {
    gold: 'border-[#D4AF37] text-[#D4AF37] shadow-[#D4AF37]/20 hover:bg-[#D4AF37]/10',
    cyan: 'border-[#00B4D8] text-[#00B4D8] shadow-[#00B4D8]/20 hover:bg-[#00B4D8]/10',
    copper: 'border-[#B87333] text-[#B87333] shadow-[#B87333]/20 hover:bg-[#B87333]/10',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212,175,55,0.3)' }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-8 py-3 rounded-full border bg-transparent font-medium transition-all duration-300",
        "backdrop-blur-sm overflow-hidden group",
        variants[variant],
        className
      )}
      {...(props as any)}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.button>
  );
};
