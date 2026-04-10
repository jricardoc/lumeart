interface Props {
  tag: string;
  title: string;
  light?: boolean;
}

export default function SectionTitle({ tag, title, light }: Props) {
  return (
    <div className="text-center mb-12 lg:mb-16 anim">
      {/* Tag with glitch animation */}
      <span className="font-pixel text-[9px] sm:text-[10px] text-gold/40 tracking-[0.3em] uppercase block mb-3 animate-glitch">
        {'// '}{tag}
      </span>

      {/* Title — gradient or white */}
      <h2
        className={`font-heading text-2xl sm:text-3xl lg:text-4xl font-bold ${
          light ? 'text-white' : 'gradient-text'
        }`}
      >
        {title}
      </h2>

      {/* Decorative diamond line */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="w-8 h-px bg-gradient-to-r from-transparent to-gold/40" />
        <div className="w-1.5 h-1.5 rotate-45 border border-gold/40" />
        <div className="w-8 h-px bg-gradient-to-l from-transparent to-gold/40" />
      </div>
    </div>
  );
}
