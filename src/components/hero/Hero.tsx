import React, { useState, useEffect } from 'react';
import { HeroScene } from '../three/HeroScene';
import { CyberWorkstation } from './CyberWorkstation';
import { Magnetic } from '../common/Magnetic';
import { ArrowUpRight, Download, Mail } from 'lucide-react';
import { downloadCV } from '../../utils/downloadCV';
import styles from './Hero.module.css';

const ROLES = [
  'Front-End Architect',
  'UI/UX Product Designer',
  'React & Next.js Specialist',
  'Creative Web Engineer',
];

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect with clean timeout management
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;
    let pauseTimer: ReturnType<typeof setTimeout> | null = null;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        } else {
          // Pause at end of role
          pauseTimer = setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => {
      clearTimeout(timer);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section className={styles.hero} id="home">
      {/* Ambient background canvas */}
      <div className={styles.ambientCanvas}>
        <HeroScene />
      </div>

      <div className={`container ${styles.heroContainer}`}>
        {/* Left column: Content */}
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            <span>AVAILABLE FOR WORK • FRONTEND ARCHITECT</span>
          </div>

          <h1 className={styles.title}>
            <span className={styles.greeting}>Hi, I'm</span>
            <span className="gradient-text">Sayed Nada</span>
          </h1>

          <div className={styles.roleWrapper}>
            <span className={styles.rolePrefix}>Specialized in </span>
            <span className={styles.roleText}>{displayedText}</span>
            <span className={styles.cursor}>|</span>
          </div>

          <p className={styles.description}>
            Engineering <span className={styles.highlight}>production-grade web systems</span>,{' '}
            <span className={styles.highlight}>high-performance interfaces</span>, and{' '}
            <span className={styles.highlight}>fluid interactive</span> digital experiences.
          </p>

          {/* Magnetic CTA Buttons */}
          <div className={styles.ctaGroup}>
            <Magnetic strength={0.35}>
              <a href="#projects" className={styles.btnPrimary}>
                <span>View Projects</span>
                <ArrowUpRight size={18} />
              </a>
            </Magnetic>

            <Magnetic strength={0.35}>
              <a
                href="/sayed-nada-cv.pdf"
                download="Sayed-Nada-CV.pdf"
                onClick={downloadCV}
                className={styles.btnSecondary}
              >
                <span>Download CV</span>
                <Download size={16} />
              </a>
            </Magnetic>

            <Magnetic strength={0.35}>
              <a href="#contact" className={styles.btnGhost}>
                <span>Get in Touch</span>
                <Mail size={16} />
              </a>
            </Magnetic>
          </div>

          {/* Live Stats Counter */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statNumberWrapper}>
                <span className={styles.statNumber}>10</span>
                <span className={styles.statPlus}>+</span>
              </div>
              <span className={styles.statLabel}>Projects</span>
            </div>

            <div className={styles.statDivider} />

            <div className={styles.statItem}>
              <div className={styles.statNumberWrapper}>
                <span className={styles.statNumber}>15</span>
                <span className={styles.statPlus}>+</span>
              </div>
              <span className={styles.statLabel}>Technologies</span>
            </div>

            <div className={styles.statDivider} />

            <div className={styles.statItem}>
              <div className={styles.statNumberWrapper}>
                <span className={styles.statNumber}>2</span>
                <span className={styles.statPlus}>+</span>
              </div>
              <span className={styles.statLabel}>Years Study</span>
            </div>
          </div>
        </div>

        {/* Right column: Interactive 3D Cyber Workstation Sandbox */}
        <div className={styles.heroVisual}>
          <CyberWorkstation />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a href="#projects" className={styles.scrollIndicator} aria-label="Scroll Down">
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll Down</span>
      </a>
    </section>
  );
};
