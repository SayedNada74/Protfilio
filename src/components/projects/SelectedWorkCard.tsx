import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../../data/projects';
import { ArrowUpRight, BookOpen, Globe, Figma, Smartphone, Monitor } from 'lucide-react';
import styles from './SelectedWorkCard.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SelectedWorkCardProps {
  project: Project;
  index: number;
}

export const SelectedWorkCard: React.FC<SelectedWorkCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [activeImage, setActiveImage] = useState(project.featuredImage);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const directLink = project.liveUrl || project.designUrl || '#';
  const isFigma = Boolean(project.designUrl && !project.liveUrl);
  const hasMobile = Boolean(project.mobileImages && project.mobileImages.length > 0);
  const hasGallery = Boolean(project.galleryImages && project.galleryImages.length > 1);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      // Scroll-driven entrance & subtle parallax
      gsap.fromTo(
        cardRef.current,
        {
          y: 60,
          opacity: 0.6,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtle parallax on the screenshot inside the browser frame
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    },
    { scope: cardRef }
  );

  const handleSelectThumbnail = (imgSrc: string) => {
    setActiveImage(imgSrc);
    setViewMode('desktop');
  };

  const handleToggleMobile = () => {
    if (!hasMobile || !project.mobileImages) return;
    if (viewMode === 'desktop') {
      setActiveImage(project.mobileImages[0]);
      setViewMode('mobile');
    } else {
      setActiveImage(project.featuredImage);
      setViewMode('desktop');
    }
  };

  return (
    <article ref={cardRef} className={styles.showcaseCard}>
      {/* Top Browser Chrome Header */}
      <div className={styles.browserHeader}>
        <div className={styles.windowControls}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>

        <div className={styles.addressBar}>
          <span className={styles.lockIcon}>🔒</span>
          <span className={styles.addressUrl}>
            {project.liveUrl ? project.liveUrl.replace('https://', '') : 'figma.com/design/sayed-nada'}
          </span>
        </div>

        <div className={styles.headerMeta}>
          {hasMobile && (
            <button
              onClick={handleToggleMobile}
              className={`${styles.viewToggleBtn} ${viewMode === 'mobile' ? styles.activeView : ''}`}
              title="Toggle Mobile View"
            >
              {viewMode === 'mobile' ? <Monitor size={14} /> : <Smartphone size={14} />}
              <span>{viewMode === 'mobile' ? 'Desktop View' : 'Mobile View'}</span>
            </button>
          )}

          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            <span>{isFigma ? 'Figma Prototype' : 'Live Production'}</span>
          </div>
        </div>
      </div>

      {/* Main Showcase Body */}
      <div className={styles.showcaseBody}>
        {/* Clickable Image Viewport */}
        <div className={styles.imageViewportContainer}>
          <a
            href={directLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.imageLink}
            aria-label={`Open ${project.title} (${isFigma ? 'Figma Design' : 'Live Website'})`}
          >
            <div className={`${styles.imageFrame} ${viewMode === 'mobile' ? styles.mobileFrame : ''}`}>
              <img
                ref={imageRef}
                src={activeImage}
                alt={`${project.title} Screenshot`}
                className={styles.projectImage}
                loading="lazy"
                decoding="async"
              />

              <div className={styles.hoverOverlay}>
                <span className={styles.hoverAction}>
                  {isFigma ? <Figma size={18} /> : <Globe size={18} />}
                  <span>{isFigma ? 'Open in Figma' : 'Visit Live Platform'}</span>
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </div>
          </a>

          {/* Screenshot Thumbnails Switcher */}
          {hasGallery && project.galleryImages && (
            <div className={styles.thumbnailStrip}>
              <span className={styles.thumbnailLabel}>Screenshots:</span>
              <div className={styles.thumbnailList}>
                {project.galleryImages.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectThumbnail(thumb)}
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

        {/* Project Meta Information */}
        <div className={styles.infoPanel}>
          <div className={styles.infoTop}>
            <div className={styles.indexBadge}>
              <span>0{index + 1}</span>
              <span className={styles.slash}>/</span>
              <span>03</span>
            </div>

            <span className={styles.yearBadge}>{project.year || '2025'}</span>
          </div>

          <div className={styles.titleSection}>
            <span className={styles.projectType}>{project.type}</span>
            <h3 className={styles.projectTitle}>
              <a href={directLink} target="_blank" rel="noopener noreferrer" className={styles.titleAnchor}>
                {project.title}
              </a>
            </h3>
          </div>

          <p className={styles.projectDescription}>{project.shortDescription}</p>

          {/* Technologies Pills */}
          <div className={styles.techPills}>
            {project.technologies.map((tech) => (
              <span key={tech} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className={styles.actionsBar}>
            <a
              href={directLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnLaunch}
            >
              <span>{isFigma ? 'View in Figma' : 'Visit Live Platform'}</span>
              <ArrowUpRight size={18} />
            </a>

            <Link to={`/projects/${project.id}`} className={styles.btnCaseStudy}>
              <BookOpen size={16} />
              <span>Read Case Study</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
