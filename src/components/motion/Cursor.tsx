import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Cursor.module.css';

/**
 * Ultra-optimized 120fps Custom Cursor
 * Uses gsap.quickTo for hardware-accelerated tracking without tween allocations.
 * Uses event delegation to eliminate MutationObserver memory leaks.
 */
export const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (isTouch || mediaQuery.matches) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    if (!cursor || !ring || !text) return;

    // Start offscreen hidden until first move
    gsap.set([cursor, ring], { x: -100, y: -100, opacity: 0 });

    // High performance quickTo functions (zero tween allocation overhead)
    const setCursorX = gsap.quickTo(cursor, 'x', { duration: 0.08, ease: 'power2.out' });
    const setCursorY = gsap.quickTo(cursor, 'y', { duration: 0.08, ease: 'power2.out' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3.out' });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([cursor, ring], { opacity: 1, duration: 0.2, overwrite: 'auto' });
        isVisible = true;
      }
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    // Global event delegation (Zero memory leak, zero DOM querying)
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'a, button, [data-cursor], input, textarea'
      ) as HTMLElement | null;
      if (!target) return;

      const cursorText = target.getAttribute('data-cursor');
      if (cursorText && text) {
        text.innerText = cursorText;
        gsap.to(ring, {
          scale: 3,
          backgroundColor: 'rgba(0, 245, 212, 0.85)',
          opacity: 0.9,
          duration: 0.25,
          overwrite: 'auto',
        });
        gsap.to(text, { opacity: 1, scale: 0.33, duration: 0.25, overwrite: 'auto' });
        gsap.to(cursor, { opacity: 0, duration: 0.1, overwrite: 'auto' });
      } else {
        gsap.to(ring, {
          scale: 1.6,
          borderColor: '#00f5d4',
          opacity: 0.8,
          duration: 0.25,
          overwrite: 'auto',
        });
        gsap.to(cursor, { scale: 0, duration: 0.2, overwrite: 'auto' });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'a, button, [data-cursor], input, textarea'
      );
      if (!target) return;

      const related = (e.relatedTarget as HTMLElement)?.closest(
        'a, button, [data-cursor], input, textarea'
      );
      if (related === target) return;

      if (text) text.innerText = '';
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        opacity: 1,
        duration: 0.25,
        overwrite: 'auto',
      });
      gsap.to(text, { opacity: 0, scale: 1, duration: 0.2, overwrite: 'auto' });
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2, overwrite: 'auto' });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div ref={cursorRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring}>
        <span ref={textRef} className={styles.text} />
      </div>
    </>
  );
};
