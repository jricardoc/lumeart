import { useEffect, useRef } from 'react';
import { svg, createTimeline, stagger, utils } from 'animejs';

export const SacredGeometry = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const tl = createTimeline({
      loop: true,
      defaults: {
        ease: 'inOut(4)',
        duration: 20000,
        loop: true,
      }
    });

    tl.add(svg.createDrawable('.sacred-line'), {
      draw: [
        '.5 .5',
        () => { const l = utils.random(0.05, 0.45, 2); return `${0.5 - Number(l)} ${0.5 + Number(l)}` },
        '0.5 0.5',
      ],
      stroke: '#FF8C00',
    }, stagger([0, 8000], { start: 0, from: 'first' }))
    .add(svg.createDrawable('.sacred-circle'), {
      draw: [
        () => { const v = utils.random(-1, -0.5, 2); return `${v} ${v}`},
        () => `${utils.random(0, 0.25, 2)} ${utils.random(0.5, 0.75, 2)}`,
        () => { const v = utils.random(1, 1.5, 2); return `${v} ${v}`},
      ],
      stroke: '#00B4D8',
    }, stagger([0, 8000], { start: 0 }))
    .init();

    return () => { tl.pause(); };
  }, []);

  const svgWidth = 1100;
  const svgHeight = 1100;
  const margin = 50;
  const numberOfLines = 60;
  const spacing = (svgWidth - margin * 2) / (numberOfLines - 1);

  const lines = Array.from({ length: numberOfLines }).map((_, i) => {
    const x = margin + i * spacing;
    return <line key={`line-${i}`} x1={x} y1={margin} x2={x} y2={svgHeight - margin} className="sacred-line" stroke="#FF8C00" strokeLinecap="butt" strokeLinejoin="round" strokeWidth="1" opacity="0.4" />;
  });

  const numberOfCircles = 30;
  const maxRadius = 500;
  const step = maxRadius / numberOfCircles;
  
  const circles = Array.from({ length: numberOfCircles }).map((_, i) => {
    const radius = (i + 1) * step;
    return <circle key={`circle-${i}`} className="sacred-circle" stroke="#00B4D8" strokeLinecap="butt" strokeLinejoin="round" strokeWidth="1" cx={svgWidth / 2} cy={svgHeight / 2} r={radius} opacity="0.3" />;
  });

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center overflow-hidden opacity-40 mix-blend-screen mask-radial">
      <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid slice" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[200vw] min-h-[200vh] lg:min-w-[100vw] lg:min-h-[100vh]">
        <g fill="none" fillRule="evenodd">
          {lines}
          {circles}
        </g>
      </svg>
    </div>
  );
};
