import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './PagePreloader.module.css';

const LOADING_STEPS = [
  'INITIALIZING SYSTEM CORE...',
  'COMPOSING 3D GLASS SANDBOX...',
  'CALIBRATING INTERACTION ENGINE...',
  'SYNCHRONIZING PORTFOLIO ASSETS...',
  'SYSTEM READY. WELCOME.',
];

export const PagePreloader: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const preloaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    const counterObj = { value: 0 };

    // GSAP tween for the 0 to 100 count
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        const preloader = preloaderRef.current;
        const content = contentRef.current;

        if (preloader && content) {
          gsap.to(content, {
            scale: 0.92,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
          });

          gsap.to(preloader, {
            yPercent: -100,
            duration: 0.8,
            delay: 0.3,
            ease: 'power4.inOut',
            onComplete: () => {
              document.body.style.overflow = '';
              setIsDone(true);
            },
          });
        }
      },
    });

    tl.to(counterObj, {
      value: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(counterObj.value);
        setPercent(val);

        // Update status step based on progress
        const step = Math.min(
          LOADING_STEPS.length - 1,
          Math.floor((val / 100) * LOADING_STEPS.length)
        );
        setStatusIndex(step);

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${val / 100})`;
        }
      },
    });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, []);

  if (isDone) return null;

  return (
    <div ref={preloaderRef} className={styles.preloaderOverlay} aria-label="Loading portfolio">
      {/* Background Ambient Aura */}
      <div className={styles.ambientAura} />
      <div className={styles.ambientGrid} />

      <div ref={contentRef} className={styles.content}>
        {/* Monogram Badge [S] with Pulse */}
        <div className={styles.monogramWrapper}>
          <div className={styles.monogramGlowRing} />
          <div className={styles.monogramBox}>
            <span className={styles.monogramLetter}>S</span>
          </div>
        </div>

        {/* Brand & Subtitle */}
        <div className={styles.brandMeta}>
          <h2 className={styles.brandName}>Sayed Nada</h2>
          <span className={styles.brandRole}>Frontend Architect & UI/UX</span>
        </div>

        {/* Big Digital Percentage Counter */}
        <div className={styles.counterWrapper}>
          <span className={styles.counterNumber}>
            {percent < 10 ? `0${percent}` : percent}
          </span>
          <span className={styles.percentSymbol}>%</span>
        </div>

        {/* Progress Track & Fill */}
        <div className={styles.progressTrack}>
          <div ref={progressBarRef} className={styles.progressFill} />
        </div>

        {/* Real-time Status Text */}
        <div className={styles.statusRow}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>{LOADING_STEPS[statusIndex]}</span>
        </div>
      </div>
    </div>
  );
};
