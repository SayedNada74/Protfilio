import React, { useRef } from 'react';
import gsap from 'gsap';
import { Download, ArrowUpRight, GraduationCap, MapPin, Code2, Sparkles } from 'lucide-react';
import { downloadCV } from '../../utils/downloadCV';
import styles from './AboutSection.module.css';

export const AboutSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt effect on profile card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 14,
      rotateX: -y * 14,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <section id="about" className={styles.aboutSection}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}> ABOUT</span>
          <h2 className={styles.sectionTitle}>
            About <span className="gradient-text">Me</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Get to know Sayed — the frontend developer and designer behind the code.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Bio & Highlight Cards */}
          <div className={styles.contentColumn}>
            <div className={styles.bioCard}>
              <p className={styles.bioLead}>
                I'm a 22-year-old <strong>Front-End Developer</strong> and{' '}
                <strong>UI/UX Designer</strong> from Ismailia, Egypt, currently pursuing
                my degree at Sinai University, Faculty of Computers and Information (Class of 2026).
              </p>
              <p className={styles.bioBody}>
                I bridge the gap between aesthetic, user-centered design in Figma and
                high-performance, scalable code in React, Next.js, and TypeScript. I don't
                just build interfaces; I engineer memorable digital experiences that feel
                alive, accessible, and ultra-fast.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className={styles.highlightsGrid}>
              <div className={styles.highlightCard}>
                <div className={styles.iconCircle}>
                  <GraduationCap size={20} />
                </div>
                <div className={styles.highlightInfo}>
                  <h4>Education</h4>
                  <p>Sinai University</p>
                  <span>Computers & Info (2022 - 2026)</span>
                </div>
              </div>

              <div className={styles.highlightCard}>
                <div className={styles.iconCircle}>
                  <MapPin size={20} />
                </div>
                <div className={styles.highlightInfo}>
                  <h4>Location & Age</h4>
                  <p>Ismailia, Egypt</p>
                  <span>22 Years Old</span>
                </div>
              </div>

              <div className={styles.highlightCard}>
                <div className={styles.iconCircle}>
                  <Code2 size={20} />
                </div>
                <div className={styles.highlightInfo}>
                  <h4>Core Stack</h4>
                  <p>React, Next.js & TS</p>
                  <span>Tailwind, Three.js & Figma</span>
                </div>
              </div>

              <div className={styles.highlightCard}>
                <div className={styles.iconCircle}>
                  <Sparkles size={20} />
                </div>
                <div className={styles.highlightInfo}>
                  <h4>Philosophy</h4>
                  <p>Pixel-Perfect Precision</p>
                  <span>Fast, scalable & accessible</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <a
                href="/sayed-nada-cv.pdf"
                download="Sayed-Nada-CV.pdf"
                onClick={downloadCV}
                className={styles.cvBtn}
              >
                <span>Download Resume</span>
                <Download size={16} />
              </a>

              <a href="#contact" className={styles.contactBtn}>
                <span>Let's Connect</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Tilt Profile Showcase */}
          <div className={styles.visualColumn}>
            <div
              className={styles.profileCard}
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.imageContainer}>
                <div className={styles.imageWrapper}>
                  <img
                    src="/Profile.jpeg"
                    alt="Sayed Nada"
                    className={styles.profileImage}
                    loading="lazy"
                  />
                  <div className={styles.imageOverlay} />
                </div>

                {/* Floating Status Badges on Image */}
                <div className={styles.badgeTop}>
                  <span className={styles.badgeDot}></span>
                  <span>Available for work</span>
                </div>

                <div className={styles.badgeBottom}>
                  <span className={styles.badgeIcon}>⚡</span>
                  <span>Clean Code & Fast Builds</span>
                </div>
              </div>

              {/* Profile Card Footer */}
              <div className={styles.profileFooter}>
                <h3 className={styles.profileName}>Sayed Nada</h3>
                <span className={styles.profileRole}>
                  Front-End Developer & UI/UX Designer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
