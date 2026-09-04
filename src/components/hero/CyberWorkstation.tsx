import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { Sparkles, Terminal, Code2, Cpu, CheckCircle2 } from 'lucide-react';
import { MagneticCard } from './MagneticCard';
import styles from './CyberWorkstation.module.css';

export const CyberWorkstation: React.FC = () => {
  const workstationRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [systemState, setSystemState] = useState<'optimal' | 'turbo'>('optimal');
  const [clickCount, setClickCount] = useState(0);

  // 3D Tilt physics tracking mouse movement across the workstation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable 3D tilt on mobile/tablet to prevent layout shifting
    if (window.innerWidth < 1024) return;

    const el = workstationRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    gsap.to(el, {
      rotateX,
      rotateY,
      scale: 1.015,
      duration: 0.25,
      ease: 'power2.out',
      transformPerspective: 1000,
      overwrite: 'auto',
    });

    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 1,
        duration: 0.15,
        overwrite: 'auto',
      });
      spotlightRef.current.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(0, 245, 212, 0.14), transparent 75%)`;
    }
  };

  const handleMouseLeave = () => {
    const el = workstationRef.current;
    if (!el) return;

    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 0,
        duration: 0.3,
        overwrite: 'auto',
      });
    }
  };

  const handleToggleState = () => {
    setSystemState((prev) => (prev === 'optimal' ? 'turbo' : 'optimal'));
    setClickCount((c) => c + 1);
  };

  return (
    <div className={styles.workstationWrapper}>
      {/* 3D Floating Workstation Window */}
      <div
        ref={workstationRef}
        className={styles.workstation}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic Cursor Spotlight */}
        <div ref={spotlightRef} className={styles.spotlight} aria-hidden="true" />

        {/* Mac OS Window Header */}
        <div className={styles.windowHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.windowDots}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              <span className={`${styles.dot} ${styles.dotYellow}`} />
              <span className={`${styles.dot} ${styles.dotGreen}`} />
            </div>

            <div className={styles.fileTabs}>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`${styles.tabBtn} ${activeTab === 'preview' ? styles.activeTab : ''}`}
              >
                <Sparkles size={13} />
                <span>LiveApp.tsx</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('code')}
                className={`${styles.tabBtn} ${activeTab === 'code' ? styles.activeTab : ''}`}
              >
                <Code2 size={13} />
                <span>architect.config.ts</span>
              </button>
            </div>
          </div>

          <div className={styles.headerRight}>
            <span className={styles.fpsBadge}>
              <span className={styles.pulseDot} />
              <span>60 FPS</span>
            </span>
          </div>
        </div>

        {/* Workstation Body */}
        <div className={styles.windowBody}>
          {activeTab === 'preview' ? (
            /* Live Interactive Component Preview */
            <div className={styles.previewPanel}>
              <div className={styles.panelHeader}>
                <div className={styles.profileBadge}>
                  <div className={styles.avatarGlow}>
                    <img src="/Profile.jpeg" alt="Sayed" className={styles.avatarImg} />
                  </div>
                  <div>
                    <h4 className={styles.engineerName}>Sayed Nada</h4>
                    <span className={styles.engineerRole}>Frontend Architect & UI/UX</span>
                  </div>
                </div>

                <div className={styles.statusPill}>
                  <CheckCircle2 size={12} className={styles.checkIcon} />
                  <span>Production Ready</span>
                </div>
              </div>

              {/* Interactive Sandbox Widget */}
              <div className={styles.sandboxCard}>
                <div className={styles.sandboxTop}>
                  <span className={styles.sandboxLabel}>
                    <Cpu size={14} />
                    <span>SYSTEM CORE ENGINE</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleToggleState}
                    className={`${styles.toggleEngineBtn} ${
                      systemState === 'turbo' ? styles.turboActive : ''
                    }`}
                  >
                    <span>{systemState === 'turbo' ? 'TURBO MODE ⚡' : 'OPTIMAL 🟢'}</span>
                  </button>
                </div>

                {/* Real-time Metrics Bars */}
                <div className={styles.metricsContainer}>
                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>Lighthouse Score</span>
                    <div className={styles.metricBar}>
                      <div className={styles.metricFill} style={{ width: '100%' }} />
                    </div>
                    <span className={styles.metricVal}>100%</span>
                  </div>

                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>Interactive Velocity</span>
                    <div className={styles.metricBar}>
                      <div
                        className={styles.metricFill}
                        style={{
                          width: systemState === 'turbo' ? '98%' : '88%',
                          background: 'linear-gradient(90deg, #7C5CFF, #00F5D4)',
                        }}
                      />
                    </div>
                    <span className={styles.metricVal}>
                      {systemState === 'turbo' ? '0.4s' : '0.8s'}
                    </span>
                  </div>
                </div>

                <div className={styles.sandboxFooter}>
                  <span className={styles.clickHint}>
                    {clickCount === 0
                      ? '✦ Click TURBO button to test reactivity'
                      : `✦ Interaction registered (${clickCount} state pulses)`}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Live Syntax Highlighted TypeScript Code View */
            <div className={styles.codePanel}>
              <pre className={styles.codeBlock}>
                <code>
                  <span className={styles.cKeyword}>interface</span>{' '}
                  <span className={styles.cType}>FrontendArchitect</span> &#123;{'\n'}
                  {'  '}name: <span className={styles.cString}>"Sayed Nada"</span>;{'\n'}
                  {'  '}role: <span className={styles.cString}>"Frontend Engineer & UI/UX"</span>;{'\n'}
                  {'  '}coreStack: [
                  <span className={styles.cString}>"React"</span>,{' '}
                  <span className={styles.cString}>"Next.js"</span>,{' '}
                  <span className={styles.cString}>"TypeScript"</span>];{'\n'}
                  &#125;{'\n\n'}
                  <span className={styles.cKeyword}>export const</span>{' '}
                  <span className={styles.cFunc}>deliverProduct</span> = () =&gt; &#123;{'\n'}
                  {'  '}<span className={styles.cKeyword}>return</span> &#123; motion: <span className={styles.cNumber}>60</span>, a11y: <span className={styles.cNumber}>100</span> &#125;;{'\n'}
                  &#125;;
                </code>
              </pre>
            </div>
          )}
        </div>

        {/* Terminal Bottom Command Bar */}
        <div className={styles.commandBar}>
          <div className={styles.cmdPrompt}>
            <Terminal size={12} className={styles.termIcon} />
            <span className={styles.cmdPath}>sayed@portfolio:~$</span>
            <span className={styles.cmdText}>pnpm run build</span>
          </div>
          <span className={styles.buildSuccess}>BUILD PASS ✦ 0 ERRORS</span>
        </div>
      </div>

      {/* Outer Orbiting Magnetic Badges (Positioned Safely Outside Workstation) */}
      <div className={`${styles.floatingWrapper} ${styles.posReact}`}>
        <MagneticCard icon="⚛️" name="React" glowColor="#61DAFB" />
      </div>

      <div className={`${styles.floatingWrapper} ${styles.posNext}`}>
        <MagneticCard icon="▲" name="Next.js 14" glowColor="#FFFFFF" />
      </div>

      <div className={`${styles.floatingWrapper} ${styles.posTS}`}>
        <MagneticCard icon="🔷" name="TypeScript" glowColor="#3178C6" />
      </div>

      <div className={`${styles.floatingWrapper} ${styles.posFigma}`}>
        <MagneticCard icon="🎨" name="Figma" glowColor="#F24E1E" />
      </div>

      <div className={`${styles.floatingWrapper} ${styles.posMotion}`}>
        <MagneticCard icon="⚡" name="GSAP Motion" glowColor="#00F5D4" />
      </div>
    </div>
  );
};
