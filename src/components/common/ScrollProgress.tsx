import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Ultra-fluid, continuous ScrollProgress bar.
 * Uses GSAP ScrollTrigger global progress with GPU transform (scaleX)
 * to eliminate chunkiness, section jumps, and layout reflow.
 */
export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const dot = dotRef.current;
    if (!bar) return;

    // Create a master ScrollTrigger from top of document to max scroll depth
    const st = ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        const progress = self.progress; // continuous 0.0 to 1.0
        bar.style.transform = `scaleX(${progress})`;
        if (dot) {
          dot.style.left = `${progress * 100}%`;
          dot.style.opacity = progress > 0.005 ? '1' : '0';
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 10000,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {/* Hardware-accelerated continuous progress fill */}
      <div
        ref={barRef}
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: '0% 50%',
          transform: 'scaleX(0)',
          background: 'var(--gradient-main)',
          boxShadow: '0 0 10px var(--accent)',
          borderRadius: '0 2px 2px 0',
          willChange: 'transform',
        }}
      />

      {/* Glowing tip indicator that moves continuously with the scroll */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '0%',
          transform: 'translate(-50%, -50%)',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 10px var(--accent)',
          opacity: 0,
          willChange: 'left, opacity',
        }}
      />
    </div>
  );
};
