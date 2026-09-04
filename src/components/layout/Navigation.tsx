import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, ArrowUpRight } from 'lucide-react';
import { Magnetic } from '../common/Magnetic';
import styles from './Navigation.module.css';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Capabilities' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Connect' },
];

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Detect scroll state for sticky header backdrop blur
  useEffect(() => {
    const handleScrollState = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScrollState, { passive: true });
    handleScrollState();
    return () => window.removeEventListener('scroll', handleScrollState);
  }, []);

  // Real-time Scrollspy to detect currently active section accurately
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      // If reached the bottom of the page, automatically activate contact
      const isBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isBottom) {
        setActiveSection('contact');
        return;
      }

      const navOffset = 160;
      let matchedSection: string | null = null;

      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= navOffset && rect.bottom > navOffset) {
            matchedSection = item.id;
            break;
          }
        }
      }

      if (matchedSection) {
        setActiveSection(matchedSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Also sync with Lenis for real-time frame updates
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Smooth scroll handler using Lenis if available
  const handleScrollTo = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      setActiveSection(sectionId);

      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { offset: -70, duration: 1.2 });
      } else {
        const yOffset = -70;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <nav className={`container ${styles.nav}`}>
        {/* Logo: Sayed Nada .dev with Magnetic pull */}
        <div className={styles.logo}>
          <Magnetic strength={0.3}>
            <NavLink
              to="/"
              className={styles.logoLink}
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  handleScrollTo(e, 'home');
                }
              }}
            >
              <span className={styles.logoIcon}>S</span>
              <span className={styles.logoText}>Sayed Nada</span>
              <span className={styles.logoBadge}>.dev</span>
            </NavLink>
          </Magnetic>
        </div>

        {/* Mobile Backdrop Overlay */}
        <div
          className={`${styles.menuOverlay} ${isMenuOpen ? styles.menuOverlayOpen : ''}`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Navigation Links (Desktop Pill & Mobile Drawer) */}
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.menuOpen : ''}`}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <li key={item.id} className={styles.navItem}>
                <Magnetic strength={0.25}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollTo(e, item.id)}
                    className={`${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
                  >
                    <span className={styles.navLabel}>{item.label}</span>
                    {isActive && <span className={styles.activePill} />}
                    {isActive && <span className={styles.activeUnderline} />}
                  </a>
                </Magnetic>
              </li>
            );
          })}

          {/* Mobile Drawer Direct WhatsApp Action */}
          <li className={styles.mobileDrawerActions}>
            <a
              href="https://wa.me/201206620678"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileLetsTalkBtn}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Chat on WhatsApp"
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={16} />
            </a>
          </li>
        </ul>

        {/* Right Actions: Let's Talk WhatsApp Button + Theme Toggle */}
        <div className={styles.actions}>
          <Magnetic strength={0.35}>
            <a
              href="https://wa.me/201206620678"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.letsTalkBtn}
              aria-label="Chat on WhatsApp"
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={15} />
            </a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </Magnetic>

          <button
            className={styles.mobileToggle}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <div className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}>
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
};
