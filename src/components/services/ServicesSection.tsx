import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Code, LayoutGrid, Workflow, Server, Gauge, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ServicesSection.module.css';

interface CapabilityItem {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'frontend',
    num: '01',
    title: 'Frontend Development',
    description:
      'Production interfaces built with React and Next.js — component architecture, state management and clean server/client boundaries.',
    icon: <Code size={18} />,
  },
  {
    id: 'responsive',
    num: '02',
    title: 'Responsive Interfaces',
    description:
      'Layouts designed per breakpoint rather than scaled down, tested from 320px through desktop.',
    icon: <LayoutGrid size={18} />,
  },
  {
    id: 'motion',
    num: '03',
    title: 'Motion & Interaction',
    description:
      'Scroll choreography, micro-interactions and transitions that guide attention instead of competing for it.',
    icon: <Workflow size={18} />,
  },
  {
    id: 'backend',
    num: '04',
    title: 'Backend & Cloud APIs',
    description:
      'Scalable REST endpoints, serverless functions, and real-time database pipelines engineered with Node.js, Supabase, and PostgreSQL.',
    icon: <Server size={18} />,
  },
  {
    id: 'performance',
    num: '05',
    title: 'Performance',
    description:
      'Server components first, optimised images, transform-only animation and a bundle that stays small.',
    icon: <Gauge size={18} />,
  },
  {
    id: 'ai',
    num: '06',
    title: 'AI-Accelerated Delivery',
    description:
      'I build with AI in the loop — scaffolding, refactors, tests and review — so features land in days rather than weeks, without loosening the standard the code is held to.',
    icon: <Sparkles size={18} />,
  },
];

export const ServicesSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Smoothly glide the sliding backdrop between cards, or fade out when mouse leaves
  useEffect(() => {
    const backdrop = backdropRef.current;
    if (!backdrop) return;

    if (!hoveredId) {
      // Fade out completely when mouse leaves the cards area
      gsap.to(backdrop, {
        opacity: 0,
        scale: 0.98,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      return;
    }

    const activeCard = cardRefs.current[hoveredId];
    const grid = gridRef.current;
    if (!activeCard || !grid) return;

    const targetX = activeCard.offsetLeft;
    const targetY = activeCard.offsetTop;
    const targetW = activeCard.offsetWidth;
    const targetH = activeCard.offsetHeight;

    gsap.to(backdrop, {
      x: targetX,
      y: targetY,
      width: targetW,
      height: targetH,
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, [hoveredId]);

  // Handle window resize to keep backdrop locked to active card if hovered
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        setHoveredId(null);
        return;
      }
      if (!hoveredId) return;
      const activeCard = cardRefs.current[hoveredId];
      const backdrop = backdropRef.current;
      if (!activeCard || !backdrop) return;

      gsap.set(backdrop, {
        x: activeCard.offsetLeft,
        y: activeCard.offsetTop,
        width: activeCard.offsetWidth,
        height: activeCard.offsetHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hoveredId]);

  // Interactive spotlight following cursor across the whole grid
  const handleGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && (window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches)) return;
    const grid = gridRef.current;
    const spotlight = spotlightRef.current;
    if (!grid || !spotlight) return;

    const rect = grid.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const spotColor = isLight ? 'rgba(44, 100, 121, 0.12)' : 'rgba(0, 245, 212, 0.12)';

    gsap.to(spotlight, {
      opacity: 1,
      duration: 0.2,
    });
    spotlight.style.background = `radial-gradient(circle 320px at ${x}px ${y}px, ${spotColor}, transparent 75%)`;
  };

  // When mouse leaves the entire grid area, disappear completely!
  const handleGridMouseLeave = () => {
    setHoveredId(null);
    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  // Mobile swipe active card tracker
  const handleScroll = () => {
    const container = gridRef.current;
    if (!container || (typeof window !== 'undefined' && window.innerWidth > 768)) return;

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    CAPABILITIES.forEach((cap, idx) => {
      const card = cardRefs.current[cap.id];
      if (card) {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      }
    });

    setActiveMobileIndex(closestIndex);
  };

  // Smooth scroll to card when dot or arrow is clicked
  const scrollToCard = (index: number) => {
    const container = gridRef.current;
    const targetCard = cardRefs.current[CAPABILITIES[index]?.id];
    if (!container || !targetCard) return;

    const targetScroll = targetCard.offsetLeft - (container.offsetWidth - targetCard.offsetWidth) / 2;
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    setActiveMobileIndex(index);
  };

  return (
    <section id="services" className={styles.servicesSection}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>CAPABILITIES</span>
          <h2 className={styles.title}>
            Core <span className={styles.accentText}>Capabilities</span>
          </h2>
          <p className={styles.subtitle}>
            A principled approach to building web software that feels immediate, resilient, and crafted with intention.
          </p>

          {/* Mobile Swipe Hint & Counter */}
          <div className={styles.mobileSwipeIndicator}>
            <span className={styles.swipeHintText}>Swipe to explore</span>
            <span className={styles.counterBadge}>
              0{activeMobileIndex + 1} / 0{CAPABILITIES.length}
            </span>
          </div>
        </div>

        {/* Capabilities Grid (Desktop 3x2, Mobile Swipe Carousel) */}
        <div
          ref={gridRef}
          className={styles.grid}
          onScroll={handleScroll}
          onMouseMove={handleGridMouseMove}
          onMouseLeave={handleGridMouseLeave}
        >
          {/* Ambient Interactive Spotlight (Desktop Only) */}
          <div ref={spotlightRef} className={styles.gridSpotlight} aria-hidden="true" />

          {/* Unified Sliding Card Surface & Shadow that glides between cards (Desktop Only) */}
          <div ref={backdropRef} className={styles.slidingBackdrop} aria-hidden="true">
            <div className={styles.glowingDot} />
            <div className={styles.backdropShadow} />
          </div>

          {CAPABILITIES.map((cap, idx) => {
            const isActive = hoveredId === cap.id;
            const isMobileActive = activeMobileIndex === idx;

            return (
              <div
                key={cap.id}
                ref={(el) => (cardRefs.current[cap.id] = el)}
                className={`${styles.card} ${isActive ? styles.activeCard : ''} ${
                  isMobileActive ? styles.mobileActiveCard : ''
                }`}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
                    scrollToCard(idx);
                  }
                }}
                onMouseEnter={() => {
                  if (typeof window !== 'undefined' && (window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches)) return;
                  setHoveredId(cap.id);
                }}
              >
                {/* Top Row: Circular Icon & Index */}
                <div className={styles.cardHeader}>
                  <div
                    className={`${styles.iconCircle} ${
                      isActive || isMobileActive ? styles.activeIconCircle : ''
                    }`}
                  >
                    {cap.icon}
                  </div>
                  <span
                    className={`${styles.num} ${isActive || isMobileActive ? styles.activeNum : ''}`}
                  >
                    {cap.num}
                  </span>
                </div>

                {/* Card Content */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{cap.title}</h3>
                  <p className={styles.description}>{cap.description}</p>
                </div>

                {/* Bottom Accent Bar */}
                <div className={styles.cardFooter}>
                  <div
                    className={`${styles.accentLine} ${
                      isActive || isMobileActive ? styles.activeAccentLine : ''
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Carousel Controls & Interactive Pagination Dots */}
        <div className={styles.mobileControls}>
          <button
            type="button"
            className={styles.mobileArrow}
            onClick={() => scrollToCard(Math.max(0, activeMobileIndex - 1))}
            disabled={activeMobileIndex === 0}
            aria-label="Previous capability"
          >
            <ChevronLeft size={18} />
          </button>

          <div className={styles.dotsContainer}>
            {CAPABILITIES.map((cap, idx) => (
              <button
                key={cap.id}
                type="button"
                className={`${styles.dot} ${activeMobileIndex === idx ? styles.activeDot : ''}`}
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to ${cap.title}`}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.mobileArrow}
            onClick={() => scrollToCard(Math.min(CAPABILITIES.length - 1, activeMobileIndex + 1))}
            disabled={activeMobileIndex === CAPABILITIES.length - 1}
            aria-label="Next capability"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

