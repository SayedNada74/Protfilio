import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { Project } from '../../data/projects';
import { ArrowUpRight, Github } from 'lucide-react';
import { TechIcon } from '../common/TechIcon';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  layout?: 'featured' | 'grid';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(project.featuredImage);

  const directLink = project.liveUrl || project.designUrl || '#';
  const isFigma = Boolean(project.designUrl && !project.liveUrl);
  const hasGallery = Boolean(project.galleryImages && project.galleryImages.length > 1);

  // 3D Tilt & Magnetic cursor reaction
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.025,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 900,
    });

    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 1,
        duration: 0.2,
      });
      spotlightRef.current.style.background = `radial-gradient(circle 260px at ${x}px ${y}px, rgba(0, 245, 212, 0.16), transparent 80%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.6)',
    });

    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  return (
    <article
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Cursor Spotlight Following Mouse */}
      <div ref={spotlightRef} className={styles.spotlight} aria-hidden="true" />

      {/* Top Image Preview Area */}
      <div className={styles.imageSection}>
        <a
          href={directLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.imageAnchor}
          aria-label={`Open ${project.title}`}
        >
          <div className={styles.imageWrapper}>
            <img
              src={activeImage}
              alt={`${project.title} Preview`}
              className={styles.projectImage}
              loading="lazy"
              decoding="async"
            />

            {/* Floating Live Site Pill at Bottom Right */}
            <div className={styles.floatingLinkPill}>
              <span>{isFigma ? 'FIGMA' : 'LIVE SITE'}</span>
              <ArrowUpRight size={13} />
            </div>
          </div>
        </a>

        {/* Screenshot Switcher Thumbnails Strip */}
        {hasGallery && project.galleryImages && (
          <div className={styles.thumbStrip}>
            <span className={styles.thumbLabel}>Screens:</span>
            <div className={styles.thumbList}>
              {project.galleryImages.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveImage(thumb);
                  }}
                  className={`${styles.thumbBtn} ${activeImage === thumb ? styles.activeThumb : ''}`}
                  aria-label={`View screenshot ${idx + 1}`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    className={styles.thumbImg}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Middle & Bottom Details */}
      <div className={styles.cardContent}>
        {/* Category Subtitle */}
        <div className={styles.categorySubtitle}>
          {project.type.toUpperCase()} - {project.year || '2025'}_
        </div>

        {/* Project Title */}
        <h3 className={styles.projectTitle}>
          <a
            href={directLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.titleAnchor}
          >
            {project.title}
          </a>
        </h3>

        {/* Description */}
        <p className={styles.projectDescription}>{project.shortDescription}</p>

        {/* Circular Tech Icons Row */}
        <div className={styles.footerRow}>
          <div className={styles.techIconsRow}>
            {project.technologies.slice(0, 5).map((tech) => (
              <div
                key={tech}
                className={styles.techCircle}
                title={tech}
                aria-label={tech}
              >
                <TechIcon name={tech} size={16} />
              </div>
            ))}
          </div>

          {/* GitHub Link */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubBtn}
              title="GitHub Repository"
              aria-label="View on GitHub"
            >
              <Github size={15} />
              <span>CODE</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
