import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const GlassCard = ({ children, className, delay = 0 }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className={cn(
        "relative p-8 rounded-2xl glass-gold group overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#D4AF37]/5 before:to-transparent before:opacity-0 hover:before:opacity-100 transition-opacity duration-500",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00B4D8]/30 to-transparent" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
