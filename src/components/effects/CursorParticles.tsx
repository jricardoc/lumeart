import { useEffect, useRef } from 'react';
import { animate, createTimeline, createTimer, stagger, utils } from 'animejs';

export const CursorParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const creatureEl = containerRef.current;
    // ensure it's clean for hot reloads
    creatureEl.innerHTML = '';
    
    // Check if SSR or no hover capability (Mobile)
    if (typeof window === 'undefined') return;
    const hasCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasCursor) return;

    const viewport = { w: window.innerWidth * 0.5, h: window.innerHeight * 0.5 };
    const cursor = { x: 0, y: 0 };
    const rows = 13;
    const grid = [rows, rows];
    const from = 'center';
    
    const scaleStagger = stagger([1, 2.5], { ease: 'inQuad', grid, from }); // Half size
    const opacityStagger = stagger([0.5, 0.05], { grid, from }); // Half opacity

    for (let i = 0; i < (rows * rows); i++) {
       const div = document.createElement('div');
       div.className = 'anime-particle';
       creatureEl.appendChild(div);
    }
    
    const particuleEls = creatureEl.querySelectorAll('.anime-particle');

    utils.set(creatureEl, {
      width: rows * 5 + 'em', // Smaller container
      height: rows * 5 + 'em',
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      pointerEvents: 'none',
      zIndex: 50,
      fontSize: '.15vh' // Smaller base font size
    });

    utils.set(particuleEls, {
      x: 0,
      y: 0,
      scale: scaleStagger,
      opacity: opacityStagger,
      background: stagger([80, 20], { 
        grid, from,
        modifier: v => `hsl(35, 70%, ${v}%)`, 
      }),
      boxShadow: stagger([4, 0.5], { // Smaller shadow
        grid, from,
        modifier: v => `0px 0px ${Math.round(Number(v))}em 0px rgba(255, 140, 0, 0.5)`, // Less intense shadow block
      }),
      zIndex: stagger([rows * rows, 1], { grid, from, modifier: v => Math.round(Number(v)).toString() }),
      transformStyle: 'preserve-3d',
      position: 'relative',
      width: '2em', // Smaller particles
      height: '2em',
      margin: '1.5em',
      borderRadius: '1em',
      willChange: 'transform',
      mixBlendMode: 'screen', // Lighter blend mode to ease opacity
    });

    const pulse = () => {
      animate(particuleEls, {
        keyframes: [
          {
            scale: 5,
            opacity: 1,
            delay: stagger(90, { start: 1650, grid, from }),
            duration: 150,
          }, {
            scale: scaleStagger,
            opacity: opacityStagger,
            ease: 'inOutQuad',
            duration: 600
          }
        ],
      });
    }

    const mainLoop = createTimer({
      frameRate: 15,
      onUpdate: () => {
        animate(particuleEls, {
          x: cursor.x,
          y: cursor.y,
          delay: stagger(40, { grid, from }),
          duration: stagger(120, { start: 750, ease: 'inQuad', grid, from }),
          ease: 'inOut',
          composition: 'blend', 
        });
      }
    });

    const autoMove = createTimeline()
    .add(cursor, {
      x: [-viewport.w * 0.45, viewport.w * 0.45],
      modifier: x => Number(x) + Math.sin(mainLoop.currentTime * 0.0007) * viewport.w * 0.5,
      duration: 3000,
      ease: 'inOutExpo',
      alternate: true,
      loop: true,
      onBegin: pulse,
      onLoop: pulse,
    }, 0)
    .add(cursor, {
      y: [-viewport.h * 0.45, viewport.h * 0.45],
      modifier: y => Number(y) + Math.cos(mainLoop.currentTime * 0.00012) * viewport.h * 0.5,
      duration: 1000,
      ease: 'inOutQuad',
      alternate: true,
      loop: true,
    }, 0);

    const manualMovementTimeout = createTimer({
      duration: 1500,
      onComplete: () => autoMove.play(),
    });

    const followPointer = (e: MouseEvent | TouchEvent) => {
      let event;
      if (window.TouchEvent && e instanceof TouchEvent) {
          event = e.touches[0];
      } else {
          event = e as MouseEvent;
      }
      cursor.x = event.pageX - viewport.w;
      // In a scrolling page, we want the particles fixed to screen or document? 
      // The user's container was absolute. We use fixed so it follows screen pointer without scroll offset issues.
      // But pageY includes scroll. So clientY is better for fixed!
      cursor.y = event.clientY - viewport.h;
      autoMove.pause();
      manualMovementTimeout.restart();
    }

    window.addEventListener('mousemove', followPointer);
    window.addEventListener('touchmove', followPointer);

    return () => {
      window.removeEventListener('mousemove', followPointer);
      window.removeEventListener('touchmove', followPointer);
      mainLoop.pause();
      autoMove.pause();
      manualMovementTimeout.pause();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex justify-center items-center mix-blend-screen">
      <div ref={containerRef} id="creature" />
    </div>
  );
};
