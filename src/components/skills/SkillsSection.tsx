import React, { useState } from 'react';
import styles from './SkillsSection.module.css';

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'uiux' | 'tools';
  level: 'Proficient' | 'Intermediate' | 'Familiar';
  icon: string;
  invert?: boolean;
}

const ALL_SKILLS: Skill[] = [
  // Front-End & Motion
  { name: 'React.js', category: 'frontend', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js 14', category: 'frontend', level: 'Intermediate', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
  { name: 'TypeScript', category: 'frontend', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript (ES6+)', category: 'frontend', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'GSAP Motion', category: 'frontend', level: 'Proficient', icon: 'https://api.iconify.design/simple-icons:greensock.svg?color=%2388ce02' },
  { name: 'Framer Motion', category: 'frontend', level: 'Proficient', icon: 'https://api.iconify.design/simple-icons:framer.svg?color=%230055ff' },
  { name: 'State (Zustand/Redux)', category: 'frontend', level: 'Intermediate', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
  { name: 'Three.js & WebGL', category: 'frontend', level: 'Intermediate', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', invert: true },
  { name: 'HTML5 & CSS Modules', category: 'frontend', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },

  // UI/UX Design
  { name: 'Figma Prototyping', category: 'uiux', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Design Systems', category: 'uiux', level: 'Intermediate', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg' },
  { name: 'Wireframing & Flows', category: 'uiux', level: 'Proficient', icon: 'https://api.iconify.design/lucide:workflow.svg?color=%237c5cff' },
  { name: 'Data Viz (Recharts)', category: 'uiux', level: 'Intermediate', icon: 'https://api.iconify.design/lucide:bar-chart-2.svg?color=%2300f5d4' },
  { name: 'Responsive UI Design', category: 'uiux', level: 'Proficient', icon: 'https://api.iconify.design/lucide:smartphone.svg?color=%233b82f6' },

  // Back-End & Cloud
  { name: 'Node.js', category: 'backend', level: 'Intermediate', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', category: 'backend', level: 'Intermediate', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
  { name: 'RESTful APIs', category: 'backend', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg' },
  { name: 'Supabase (Realtime)', category: 'backend', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
  { name: 'Firebase', category: 'backend', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },

  // Databases
  { name: 'PostgreSQL', category: 'database', level: 'Intermediate', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Supabase DB', category: 'database', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },

  // Tools & Workflow
  { name: 'Git', category: 'tools', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub & CI/CD', category: 'tools', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
  { name: 'Vercel Deployment', category: 'tools', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', invert: true },
  { name: 'Vite Tooling', category: 'tools', level: 'Proficient', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg' },
  { name: 'AI-Assisted Dev', category: 'tools', level: 'Proficient', icon: 'https://api.iconify.design/simple-icons:anthropic.svg?color=%23d97706' },
  { name: 'React Native & Expo', category: 'tools', level: 'Familiar', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
];

type CategoryFilter = 'all' | 'frontend' | 'backend' | 'database' | 'uiux' | 'tools';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryFilter>('all');

  const filteredSkills =
    activeTab === 'all'
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}> TECH STACK</span>
          <h2 className={styles.sectionTitle}>
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            A comprehensive overview of the modern languages, frameworks, and architecture tools I use daily.
          </p>
        </div>

        {/* Category Tabs */}
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'all' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Stack ({ALL_SKILLS.length})
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'frontend' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('frontend')}
          >
            Frontend
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'backend' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('backend')}
          >
            Backend
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'database' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('database')}
          >
            Databases
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'uiux' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('uiux')}
          >
            UI/UX Design
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'tools' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('tools')}
          >
            Tools & Workflow
          </button>
        </div>

        {/* Skills Cards Grid */}
        <div className={styles.skillsGrid}>
          {filteredSkills.map((skill) => (
            <div key={skill.name} className={styles.skillCard}>
              <div className={styles.iconWrapper}>
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className={`${styles.skillIcon} ${skill.invert ? styles.invertIcon : ''}`}
                  loading="lazy"
                />
              </div>

              <div className={styles.skillDetails}>
                <h3 className={styles.skillName}>{skill.name}</h3>
                <span
                  className={`${styles.skillLevel} ${skill.level === 'Proficient'
                    ? styles.levelProficient
                    : skill.level === 'Intermediate'
                      ? styles.levelIntermediate
                      : styles.levelFamiliar
                    }`}
                >
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
