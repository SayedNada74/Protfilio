import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../../data/projects';
import { ArrowUpRight, Github, ChevronRight } from 'lucide-react';
import { TechIcon } from '../common/TechIcon';
import styles from './HorizontalSelectedWork.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HorizontalSelectedWorkProps {
  projects: Project[];
}

export const HorizontalSelectedWork: React.FC<HorizontalSelectedWorkProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeScreens, setActiveScreens] = useState<Record<string, string>>({});
  const [currentSlide, setCurrentSlide] = useState(1);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      // Desktop & Large Tablets: Pinned horizontal scroll
      mm.add('(min-width: 769px)', () => {
        const getScrollAmount = () => {
          return track.scrollWidth - window.innerWidth + 120;
        };

        const tween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.8,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const slide = Math.min(
                projects.length,
                Math.max(1, Math.round(self.progress * (projects.length - 1)) + 1)
              );
              setCurrentSlide(slide);
            },
          },
        });

        return () => {
          tween.kill();
        };
      });

      // Mobile & Small Tablets: Pinned horizontal scroll
      mm.add('(max-width: 768px)', () => {
        const getScrollAmount = () => {
          return track.scrollWidth - window.innerWidth + 40;
        };

        const tween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            start: 'top top',
            end: () => `+=${getScrollAmount() * 1.15}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const slide = Math.min(
                projects.length,
                Math.max(1, Math.round(self.progress * (projects.length - 1)) + 1)
              );
              setCurrentSlide(slide);
            },
          },
        });

        return () => {
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const handleSelectThumb = (projectId: string, img: string) => {
    setActiveScreens((prev) => ({ ...prev, [projectId]: img }));
  };

  return (
    <section ref={sectionRef} className={styles.horizontalSection} id="selected-work">
      {/* Top Header */}
      <div className={styles.sectionIntro}>
        <div className="container">
          <div className={styles.headerFlex}>
            <div>
              <span className={styles.sectionTag}> SELECTED WORK</span>
              <h2 className={styles.sectionTitle}>
                Featured <span className={styles.accentText}>Productions</span>
              </h2>
            </div>
            <div className={styles.scrollHint}>
              <span>Scroll to explore projects</span>
              <ChevronRight size={16} className={styles.hintArrow} />
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Track Container */}
      <div className={styles.trackWrapper}>
        <div ref={trackRef} className={styles.track}>
          {projects.map((project, idx) => {
            const currentImage = activeScreens[project.id] || project.featuredImage;
            const directLink = project.liveUrl || project.designUrl || '#';
            const isFigma = Boolean(project.designUrl && !project.liveUrl);
            const hasGallery = Boolean(project.galleryImages && project.galleryImages.length > 1);

            return (
              <div key={project.id} className={styles.slideCard}>
                {/* Left Side: Mockup Image with Index Badge & Screenshot Switcher */}
                <div className={styles.imageColumn}>
                  <div className={styles.imageWrapper}>
                    {/* Index Badge (e.g. 01 / 05) */}
                    <div className={styles.indexPill}>
                      <span>0{idx + 1}</span>
                      <span className={styles.pillDivider}>/</span>
                      <span>0{projects.length}</span>
                    </div>

                    <a
                      href={directLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.imageAnchor}
                      aria-label={`Open ${project.title}`}
                    >
                      <img
                        src={currentImage}
                        alt={`${project.title} Preview`}
                        className={styles.projectImage}
                        loading="lazy"
                        decoding="async"
                      />
                    </a>
                  </div>

                  {/* Screenshot Switcher Thumbnails */}
                  {hasGallery && project.galleryImages && (
                    <div className={styles.thumbStrip}>
                      <span className={styles.thumbLabel}>Screens:</span>
                      <div className={styles.thumbList}>
                        {project.galleryImages.map((thumb, tIdx) => (
                          <button
                            key={tIdx}
                            type="button"
                            onClick={() => handleSelectThumb(project.id, thumb)}
                            className={`${styles.thumbBtn} ${currentImage === thumb ? styles.activeThumb : ''
                              }`}
                            aria-label={`View screenshot ${tIdx + 1}`}
                          >
                            <img
                              src={thumb}
                              alt={`${project.title} screen ${tIdx + 1}`}
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

                {/* Right Side: Project Information & Actions (Inspired by Image 1) */}
                <div className={styles.infoColumn}>
                  <div className={styles.subtitleTag}>
                    {project.type.toUpperCase()} — {project.year || '2025'}_
                  </div>

                  <h3 className={styles.projectTitle}>
                    <a
                      href={directLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.titleLink}
                    >
                      {project.title}
                    </a>
                  </h3>

                  <p className={styles.projectDescription}>
                    {project.shortDescription}
                  </p>

                  {/* Circular Tech Icons */}
                  <div className={styles.techIconsRow}>
                    {project.technologies.slice(0, 6).map((tech) => (
                      <div
                        key={tech}
                        className={styles.techCircle}
                        title={tech}
                        aria-label={tech}
                      >
                        <TechIcon name={tech} size={18} />
                      </div>
                    ))}
                  </div>

                  {/* Links Row */}
                  <div className={styles.actionsRow}>
                    <a
                      href={directLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.liveSiteLink}
                    >
                      <span>{isFigma ? 'FIGMA PROTOTYPE' : 'LIVE SITE'}</span>
                      <ArrowUpRight size={17} className={styles.linkArrow} />
                    </a>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.githubLink}
                      >
                        <Github size={16} />
                        <span>GITHUB</span>
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Track Progress Indicator */}
      <div className={styles.bottomIndicator}>
        <span className={styles.progressCounter}>
          0{currentSlide} <span className={styles.slash}>/</span> 0{projects.length}
        </span>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(currentSlide / projects.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};
