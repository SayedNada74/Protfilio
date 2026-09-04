import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import styles from './CaseStudy.module.css';

export const CaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const project = projects.find(p => p.id === slug);
  
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (project) {
      document.title = `${project.title} | Case Study`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', project.shortDescription);
      }
    }
    
    return () => {
      document.title = 'Sayed Nada | Portfolio';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Sayed Nada - Frontend Developer & UI/UX Designer. Interactive portfolio showcasing engineering, design, and shipped products.');
      }
    };
  }, [slug, project]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  // Only Tier 1 projects have full case studies
  if (project.tier !== 1 || !project.caseStudy) {
    return (
      <div className="container" style={{ paddingTop: 'var(--space-24)' }}>
        <h2>Project not available for detailed view.</h2>
        <Link to="/" className={styles.backBtn}>
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  const { caseStudy } = project;

  return (
    <article className={styles.caseStudy}>
      {/* Hero Section */}
      <header className={styles.header}>
        <div className="container">
          <Link to="/" className={styles.backBtn}>
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          
          <div className={styles.meta}>
            <span className={styles.type}>{project.type}</span>
            <span className={styles.year}>{project.year || '2026'}</span>
          </div>
          
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.description}>{project.shortDescription}</p>
          
          <div className={styles.links}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryLink}>
                Live Project <ArrowUpRight size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.secondaryLink}>
                <Github size={16} /> Source Code
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className={styles.heroImageWrapper}>
        <div className="container">
          <img src={project.featuredImage} alt={project.title} className={styles.heroImage} />
        </div>
      </div>

      {/* Content Section */}
      <div className="container">
        <div className={styles.contentGrid}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            {caseStudy.problem && (
              <section className={styles.section}>
                <h2>The Problem</h2>
                <p>{caseStudy.problem}</p>
              </section>
            )}
            
            {caseStudy.solution && (
              <section className={styles.section}>
                <h2>The Solution</h2>
                <p>{caseStudy.solution}</p>
              </section>
            )}
            
            {caseStudy.architecture && (
              <section className={styles.section}>
                <h2>Architecture & Approach</h2>
                <p>{caseStudy.architecture}</p>
                {/* Visual Architecture Diagram could go here */}
              </section>
            )}
            
            {caseStudy.challenges && caseStudy.challenges.length > 0 && (
              <section className={styles.section}>
                <h2>Technical Challenges</h2>
                <ul className={styles.challengeList}>
                  {caseStudy.challenges.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </section>
            )}
            
            {caseStudy.impact && (
              <section className={styles.section}>
                <h2>Impact & Results</h2>
                <p>{caseStudy.impact}</p>
              </section>
            )}
            
            {/* Gallery */}
            {(project.desktopImages || project.mobileImages) && (
              <section className={styles.gallery}>
                <h2>Responsive Design</h2>
                <div className={styles.galleryGrid}>
                  {project.desktopImages?.map((img, i) => (
                    <img key={`d-${i}`} src={img} alt="Desktop View" className={styles.galleryImage} />
                  ))}
                  {project.mobileImages?.map((img, i) => (
                    <img key={`m-${i}`} src={img} alt="Mobile View" className={styles.mobileGalleryImage} />
                  ))}
                </div>
              </section>
            )}
          </div>
          
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.techStack}>
              <h3>Technologies</h3>
              <ul className={styles.techList}>
                {project.technologies.map(tech => (
                  <li key={tech} className={styles.techItem}>{tech}</li>
                ))}
              </ul>
            </div>
            
            {/* Additional metadata could go here */}
          </aside>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <footer className={styles.footer}>
        <div className="container">
          <h2>Ready to explore more?</h2>
          <Link to="/" className={styles.primaryLink}>
            Return to all projects
          </Link>
        </div>
      </footer>
    </article>
  );
};
