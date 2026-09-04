import React from 'react';
import styles from './ToolsSection.module.css';

const tools = [
  { name: 'VS Code', icon: '💻' },
  { name: 'Git & GitHub', icon: '🌿' },
  { name: 'Vercel', icon: '🚀' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Claude & AI', icon: '🤖' },
  { name: 'Vite', icon: '⚡' },
  { name: 'NPM / Yarn', icon: '📦' },
  { name: 'Postman', icon: '🌐' }
];

export const ToolsSection: React.FC = () => {
  return (
    <section id="tools" className={styles.toolsSection}>
      <div className="container">
        <div className={styles.header}>
          <h2>Tools & Workflow</h2>
          <p className={styles.subtitle}>My daily drivers.</p>
        </div>

        <div className={styles.grid}>
          {tools.map((tool, index) => (
            <div key={index} className={styles.toolCard}>
              <span className={styles.icon}>{tool.icon}</span>
              <span className={styles.name}>{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
