import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Cursor.module.css';

/**
 * Ultra-responsive 120fps Custom Cursor
 * Transforms into a circular glass lens with monospace 'VIEW' text
 * when hovering over project showcases, mockups, and galleries.
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

    // Start offscreen hidden until first mousemove
    gsap.set([cursor, ring], { x: -100, y: -100, opacity: 0 });

    // High performance quickTo functions (zero tween allocation overhead)
    const setCursorX = gsap.quickTo(cursor, 'x', { duration: 0.06, ease: 'power2.out' });
    const setCursorY = gsap.quickTo(cursor, 'y', { duration: 0.06, ease: 'power2.out' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.18, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.18, ease: 'power3.out' });

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

    // Global event delegation (Zero memory leak, instant reaction)
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'a, button, [data-cursor], input, textarea'
      ) as HTMLElement | null;
      if (!target) return;

      const cursorText = target.getAttribute('data-cursor');
      if (cursorText && text) {
        text.innerText = cursorText;
        ring.classList.add(styles.lensActive);

        // Circular glass lens expansion (Exact match to reference image)
        gsap.to(ring, {
          width: 82,
          height: 82,
          opacity: 1,
          duration: 0.28,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        gsap.to(text, {
          opacity: 1,
          scale: 1,
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(cursor, {
          opacity: 0,
          scale: 0,
          duration: 0.15,
          overwrite: 'auto',
        });
      } else {
        // Standard button / link hover
        ring.classList.remove(styles.lensActive);
        if (text) text.innerText = '';
        gsap.to(ring, {
          width: 48,
          height: 48,
          opacity: 0.85,
          duration: 0.24,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to(cursor, {
          scale: 0,
          opacity: 0,
          duration: 0.15,
          overwrite: 'auto',
        });
        gsap.to(text, {
          opacity: 0,
          duration: 0.15,
          overwrite: 'auto',
        });
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

      ring.classList.remove(styles.lensActive);
      if (text) text.innerText = '';

      gsap.to(ring, {
        width: 34,
        height: 34,
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(text, {
        opacity: 0,
        scale: 0.8,
        duration: 0.18,
        overwrite: 'auto',
      });
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        overwrite: 'auto',
      });
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

