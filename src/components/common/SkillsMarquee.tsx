import React from 'react';
import styles from './SkillsMarquee.module.css';

const SKILLS_MARQUEE_ITEMS = [
  'React.js',
  'Next.js 14',
  'TypeScript',
  'UI/UX Architecture',
  'Three.js 3D Web',
  'Tailwind CSS',
  'Figma Systems',
  'Supabase & Firebase',
  'RESTful APIs',
  'Clean Architecture',
  'Performance Optimization',
  'Responsive Design',
];

export const SkillsMarquee: React.FC = () => {
  return (
    <div className={styles.marqueeSection} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        <div className={styles.marqueeContent}>
          {SKILLS_MARQUEE_ITEMS.map((item, idx) => (
            <span key={`a-${idx}`} className={styles.item}>
              <span className={styles.diamond}>✦</span>
              <span>{item}</span>
            </span>
          ))}
        </div>

        {/* Duplicate content for infinite seamless loop */}
        <div className={styles.marqueeContent}>
          {SKILLS_MARQUEE_ITEMS.map((item, idx) => (
            <span key={`b-${idx}`} className={styles.item}>
              <span className={styles.diamond}>✦</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
