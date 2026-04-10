import { useEffect, useRef, useState, useCallback } from 'react';
import { createTimeline } from 'animejs';
import logo from '../assets/logo.png';

interface Props {
  onComplete: () => void;
}

const loadingTexts = [
  'Carregando texturas...',
  'Montando cena 3D...',
  'Invocando partículas...',
  'Calibrando impressora...',
  'Level up!',
];

export default function LoadingScreen({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const exitTriggered = useRef(false);
  const [progress, setProgress] = useState(0);
  const [textIdx, setTextIdx] = useState(0);

  const triggerExit = useCallback(() => {
    if (exitTriggered.current || !containerRef.current) return;
    exitTriggered.current = true;

    const tl = createTimeline({ defaults: { ease: 'inExpo' } });
    tl.add('.loading-content', {
      scale: [1, 0.95],
      opacity: [1, 0],
      duration: 300,
    })
      .add(containerRef.current, {
        opacity: [1, 0],
        duration: 400,
      }, '-=200')
      .call(() => onComplete());
  }, [onComplete]);

  useEffect(() => {
    // Progress counter
    let p = 0;
    const interval = setInterval(() => {
      p += 2 + Math.random() * 2;
      if (p >= 100) p = 100;
      setProgress(Math.round(p));
      setTextIdx(Math.min(Math.floor(p / 20), loadingTexts.length - 1));
      if (p >= 100) clearInterval(interval);
    }, 40);

    // Entrance animation
    const tl = createTimeline({ defaults: { ease: 'outExpo' } });
    tl.add('.loading-logo', {
      scale: [0.3, 1],
      opacity: [0, 1],
      duration: 800,
    })
      .add('.loading-text-main', {
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 500,
      }, '-=400')
      .add('.loading-bar-container', {
        opacity: [0, 1],
        scaleX: [0.5, 1],
        duration: 500,
      }, '-=200');

    // Auto exit after loading
    const timer = setTimeout(() => triggerExit(), 3200);

    // Keyboard skip
    const handleKey = () => triggerExit();
    window.addEventListener('keydown', handleKey);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKey);
    };
  }, [triggerExit]);

  return (
    <div
      ref={containerRef}
      onClick={() => triggerExit()}
      className="fixed inset-0 z-[100] bg-dark flex items-center justify-center select-none"
    >
      {/* Enhanced CRT for loading */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.05) 1px, rgba(0,0,0,0.05) 3px)',
        }}
      />

      {/* Sweeping scan line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent animate-pulse" />

      <div className="loading-content relative z-10 flex flex-col items-center">
        {/* Logo */}
        <img
          src={logo}
          alt=""
          className="loading-logo w-20 h-20 sm:w-24 sm:h-24 mb-8 opacity-0"
          style={{ filter: 'drop-shadow(0 0 30px rgba(212,168,83,0.4))' }}
        />

        {/* Loading text */}
        <p className="loading-text-main font-pixel text-[8px] sm:text-[9px] text-gold/60 tracking-[0.2em] mb-6 opacity-0 h-4">
          {loadingTexts[textIdx]}
        </p>

        {/* RPG-style progress bar */}
        <div className="loading-bar-container w-56 sm:w-72 opacity-0">
          <div className="relative h-2 bg-surface/80 border border-gold/15 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-75"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #d4a853, #4da6e0, #8b5cf6)',
              }}
            />
            {/* Shine overlay */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                transform: `translateX(${progress - 100}%)`,
                transition: 'transform 0.1s',
              }}
            />
          </div>
          <div className="flex justify-between mt-2 px-1">
            <span className="font-pixel text-[7px] text-gold/25">LV.1</span>
            <span className="font-pixel text-[8px] text-gold/40">{progress}%</span>
          </div>
        </div>

        {/* Skip hint */}
        <p className="font-pixel text-[6px] sm:text-[7px] text-gray-600 mt-8 tracking-widest animate-pulse">
          CLICK TO SKIP
        </p>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-gold/15" />
      <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-gold/15" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-gold/15" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-gold/15" />
    </div>
  );
}
