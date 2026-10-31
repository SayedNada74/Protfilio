import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { projects } from '../../data/projects';
import { downloadCV } from '../../utils/downloadCV';
import {
  Search,
  Compass,
  ExternalLink,
  FolderGit2,
  Copy,
  Sun,
  Moon,
  Download,
  CornerDownLeft,
  Mail,
  Phone,
  Sparkles,
  Layers,
  Code2,
  User,
} from 'lucide-react';
import styles from './CommandPalette.module.css';

interface CommandItem {
  id: string;
  group: 'Navigation' | 'Projects' | 'Actions';
  title: string;
  subtitle: string;
  badge?: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Show temporary feedback toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: -70, duration: 1.2 });
      } else {
        const yOffset = -70;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  // Keyboard shortcut (Ctrl+K / Cmd+K) and custom event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleOpenCustom = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenCustom);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenCustom);
    };
  }, [isOpen]);

  // Focus input on open & lock background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Build the list of all command items
  const allItems = useMemo<CommandItem[]>(() => {
    const navItems: CommandItem[] = [
      {
        id: 'nav-home',
        group: 'Navigation',
        title: 'Home & Hero',
        subtitle: 'Interactive 3D workstation & introduction',
        badge: 'Section',
        icon: <Compass size={16} />,
        onSelect: () => scrollToSection('home'),
      },
      {
        id: 'nav-about',
        group: 'Navigation',
        title: 'About Sayed',
        subtitle: 'Background, Sinai University, and design philosophy',
        badge: 'Section',
        icon: <User size={16} />,
        onSelect: () => scrollToSection('about'),
      },
      {
        id: 'nav-selected',
        group: 'Navigation',
        title: 'Featured Productions',
        subtitle: 'Pinned horizontal scroll showcase',
        badge: 'Showcase',
        icon: <Sparkles size={16} />,
        onSelect: () => scrollToSection('selected-work'),
      },
      {
        id: 'nav-all',
        group: 'Navigation',
        title: 'All Projects Catalog',
        subtitle: 'Complete directory of 12+ web and UI/UX works',
        badge: 'Directory',
        icon: <FolderGit2 size={16} />,
        onSelect: () => scrollToSection('all-work'),
      },
      {
        id: 'nav-services',
        group: 'Navigation',
        title: 'Core Capabilities',
        subtitle: 'Frontend, motion, performance, and cloud systems',
        badge: 'Services',
        icon: <Layers size={16} />,
        onSelect: () => scrollToSection('services'),
      },
      {
        id: 'nav-skills',
        group: 'Navigation',
        title: 'Skills & Tech Stack',
        subtitle: 'React, Next.js, TypeScript, Tailwind, Three.js',
        badge: 'Stack',
        icon: <Code2 size={16} />,
        onSelect: () => scrollToSection('skills'),
      },
      {
        id: 'nav-contact',
        group: 'Navigation',
        title: 'Connect & Contact',
        subtitle: 'Start a conversation, email, and social networks',
        badge: 'Contact',
        icon: <Mail size={16} />,
        onSelect: () => scrollToSection('contact'),
      },
    ];

    const projectItems: CommandItem[] = projects.map((p) => {
      const directUrl = p.liveUrl || p.designUrl || '#';
      const isLive = Boolean(p.liveUrl);

      return {
        id: `proj-${p.id}`,
        group: 'Projects',
        title: p.title,
        subtitle: `${p.technologies.slice(0, 3).join(', ')} • ${p.type}`,
        badge: isLive ? 'Live Demo' : 'Figma',
        icon: <ExternalLink size={16} />,
        onSelect: () => {
          setIsOpen(false);
          if (directUrl && directUrl !== '#') {
            window.open(directUrl, '_blank', 'noopener,noreferrer');
          }
        },
      };
    });

    const actionItems: CommandItem[] = [
      {
        id: 'act-cv',
        group: 'Actions',
        title: 'Download Resume (CV)',
        subtitle: 'Get the latest verified PDF directly',
        badge: 'PDF',
        icon: <Download size={16} />,
        onSelect: () => {
          downloadCV();
          showToast('Downloading CV...');
        },
      },
      {
        id: 'act-copy-email',
        group: 'Actions',
        title: 'Copy Email Address',
        subtitle: 'sayedmahmouda00@gmail.com',
        badge: 'Copy',
        icon: <Copy size={16} />,
        onSelect: () => {
          navigator.clipboard.writeText('sayedmahmouda00@gmail.com');
          showToast('Email copied!');
        },
      },
      {
        id: 'act-theme',
        group: 'Actions',
        title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
        subtitle: `Currently in ${theme} mode`,
        badge: 'Theme',
        icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
        onSelect: () => {
          toggleTheme();
          showToast(`Switched to ${theme === 'dark' ? 'light' : 'dark'} mode`);
        },
      },
      {
        id: 'act-whatsapp',
        group: 'Actions',
        title: 'Chat on WhatsApp',
        subtitle: '+20 120 662 0678',
        badge: 'Instant',
        icon: <Phone size={16} />,
        onSelect: () => {
          setIsOpen(false);
          window.open('https://wa.me/201206620678', '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'act-github',
        group: 'Actions',
        title: 'GitHub Profile',
        subtitle: 'github.com/SayedNada74',
        badge: 'Source',
        icon: <FolderGit2 size={16} />,
        onSelect: () => {
          setIsOpen(false);
          window.open('https://github.com/SayedNada74', '_blank', 'noopener,noreferrer');
        },
      },
    ];

    return [...navItems, ...projectItems, ...actionItems];
  }, [theme, location.pathname]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const clean = query.toLowerCase().trim();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(clean) ||
        item.subtitle.toLowerCase().includes(clean) ||
        item.group.toLowerCase().includes(clean) ||
        (item.badge && item.badge.toLowerCase().includes(clean))
    );
  }, [allItems, query]);

  // Keyboard navigation within list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].onSelect();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu"
    >
      <div className={styles.modal}>
        {/* Search Input Bar */}
        <div className={styles.searchHeader}>
          <Search size={18} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search projects, sections, or actions... (e.g. Next.js, CV)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
          />
          <button
            type="button"
            className={styles.escKey}
            onClick={() => setIsOpen(false)}
            aria-label="Close command palette"
          >
            ESC
          </button>

          {toastMessage && <div className={styles.toast}>{toastMessage}</div>}
        </div>

        {/* Results List */}
        <div ref={listRef} className={styles.resultsList}>
          {filteredItems.length === 0 ? (
            <div className={styles.emptyState}>
              No matching commands or projects for "{query}"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const prevItem = filteredItems[idx - 1];
              const showGroupHeader = !prevItem || prevItem.group !== item.group;

              return (
                <React.Fragment key={item.id}>
                  {showGroupHeader && (
                    <div className={styles.groupLabel}>{item.group}</div>
                  )}

                  <div
                    className={`${styles.item} ${isSelected ? styles.itemActive : ''}`}
                    onClick={() => item.onSelect()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className={styles.itemLeft}>
                      <div className={styles.itemIcon}>{item.icon}</div>
                      <div className={styles.itemMeta}>
                        <span className={styles.itemTitle}>{item.title}</span>
                        <span className={styles.itemSubtitle}>{item.subtitle}</span>
                      </div>
                    </div>

                    <div className={styles.itemRight}>
                      {item.badge && <span className={styles.itemBadge}>{item.badge}</span>}
                      <CornerDownLeft size={14} className={styles.enterIcon} />
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          )}
        </div>

        {/* Footer Keyboard Hints */}
        <div className={styles.footer}>
          <div className={styles.footerHints}>
            <span className={styles.footerHint}>
              <span className={styles.kbd}>↑</span>
              <span className={styles.kbd}>↓</span> Navigate
            </span>
            <span className={styles.footerHint}>
              <span className={styles.kbd}>↵</span> Select
            </span>
            <span className={styles.footerHint}>
              <span className={styles.kbd}>ESC</span> Close
            </span>
          </div>

          <span>Sayed Nada Portfolio</span>
        </div>
      </div>
    </div>
  );
};
