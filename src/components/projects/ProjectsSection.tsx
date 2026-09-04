import React, { useState } from 'react';
import { projects } from '../../data/projects';
import { HorizontalSelectedWork } from './HorizontalSelectedWork';
import { ProjectCard } from './ProjectCard';
import styles from './ProjectsSection.module.css';

type CategoryFilter = 'all' | 'web' | 'uiux';

export const ProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryFilter>('all');

  // The 5 flagship projects explicitly requested for the horizontal scroll showcase
  const selectedIds = [
    'aquasmart',
    'sinai-tech-portal',
    'grand-cafe',
    'ziko-portfolio',
    'buildify-website',
  ];

  const selectedProjects = selectedIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is typeof projects[0] => Boolean(p));

  // The complete list of projects for the catalog section
  const webProjects = projects.filter((p) => p.tier === 1 || p.tier === 2);
  const uiProjects = projects.filter((p) => p.tier === 3);

  const displayedProjects =
    activeTab === 'all'
      ? projects
      : activeTab === 'web'
        ? webProjects
        : uiProjects;

  return (
    <div id="projects" className={styles.projectsWrapper}>
      {/* 1. Horizontal Scroll Showcase (5 Featured Projects) */}
      <HorizontalSelectedWork projects={selectedProjects} />

      {/* 2. Complete Project Catalog & Design Prototypes (All 10 Projects) */}
      <section className={styles.catalogSection} id="all-work">
        <div className="container">
          <div className={styles.catalogHeader}>
            <div>
              <span className={styles.catalogTag}>FULL DIRECTORY</span>
              <h2 className={styles.catalogTitle}>
                All Projects & <span className="gradient-text">Design Systems</span>
              </h2>
              <p className={styles.catalogSubtitle}>
                Explore the complete collection of production websites, full-stack applications, and Figma UI/UX prototypes.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className={styles.tabsContainer}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'all' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Projects ({projects.length})
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'web' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('web')}
              >
                Websites ({webProjects.length})
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'uiux' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('uiux')}
              >
                UI/UX Design ({uiProjects.length})
              </button>
            </div>
          </div>

          {/* All Projects Grid */}
          <div className={styles.catalogGrid}>
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} layout="grid" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
