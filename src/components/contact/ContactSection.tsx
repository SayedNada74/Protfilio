import React, { useState } from 'react';
import {
  FileText,
  Github,
  Linkedin,
  Phone,
  Facebook,
  Instagram,
  ArrowUpRight,
  Copy,
  Check,
  ArrowUp,
} from 'lucide-react';
import { Magnetic } from '../common/Magnetic';
import { downloadCV } from '../../utils/downloadCV';
import styles from './ContactSection.module.css';

// Authentic WhatsApp SVG icon
const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface SocialLink {
  name: string;
  handle: string;
  url: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    handle: 'github.com/SayedNada74',
    url: 'https://github.com/SayedNada74',
    icon: <Github size={18} />,
  },
  {
    name: 'LinkedIn',
    handle: 'linkedin.com/in/sayed-nada-6852b9345',
    url: 'https://linkedin.com/in/sayed-nada-6852b9345',
    icon: <Linkedin size={18} />,
  },
  {
    name: 'Phone',
    handle: '+20 120 662 0678',
    url: 'tel:+201206620678',
    icon: <Phone size={18} />,
  },
  {
    name: 'WhatsApp',
    handle: 'wa.me/201206620678',
    url: 'https://wa.me/201206620678',
    icon: <WhatsAppIcon size={18} />,
  },
  {
    name: 'Facebook',
    handle: 'facebook.com/share/1EiVuvAo5z',
    url: 'https://www.facebook.com/share/1EiVuvAo5z/',
    icon: <Facebook size={18} />,
  },
  {
    name: 'Instagram',
    handle: 'instagram.com/sayed_nada_7',
    url: 'https://www.instagram.com/sayed_nada_7?igsi=MWI1YmpxejA5YTV2aQ==',
    icon: <Instagram size={18} />,
  },
];

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('sayedmahmouda00@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className={styles.contactSection}>
      <div className={styles.contactContainer}>
        {/* Top Status Pill */}
        <div className={styles.statusBadgeWrapper}>
          <div className={styles.statusBadge}>
            <span className={styles.statusDotPulse} />
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>
        </div>

        {/* Hero Headline (Exact match to reference Image 1) */}
        <div className={styles.headlineWrapper}>
          <h2 className={styles.headline}>
            <span className={styles.headlineTop}>Let's build something</span>
            <span className={styles.headlineBottom}>worth scrolling for.</span>
          </h2>
          {/* Subtle Green Accent Line with square mark */}
          <div className={styles.accentBarLine}>
            <span className={styles.accentBarSquare} />
            <span className={styles.accentBarTrail} />
          </div>
        </div>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Open to front-end roles with MENA and remote product teams. If you're hiring, or you have
          something worth building, my inbox is the fastest way in.
        </p>

        {/* Magnetic Action Buttons Row */}
        <div className={styles.actionPillsRow}>
          <Magnetic strength={0.35}>
            <a href="mailto:sayedmahmouda00@gmail.com" className={styles.primaryPill}>
              <span>Start a conversation</span>
              <ArrowUpRight size={18} />
            </a>
          </Magnetic>

          <Magnetic strength={0.35}>
            <button type="button" onClick={downloadCV} className={styles.secondaryPill}>
              <FileText size={16} />
              <span>View Resume</span>
            </button>
          </Magnetic>
        </div>

        {/* Center Email Capsule with Magnetic attraction */}
        <div className={styles.emailCapsuleWrapper}>
          <Magnetic strength={0.2}>
            <div className={styles.emailCapsule}>
              <a href="mailto:sayedmahmouda00@gmail.com" className={styles.emailLink}>
                <span>sayedmahmouda00@gmail.com</span>
                <ArrowUpRight size={15} className={styles.emailArrow} />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={styles.copyButton}
                title="Copy email to clipboard"
                aria-label="Copy email"
              >
                {copied ? (
                  <>
                    <Check size={15} className={styles.copiedIcon} />
                    <span className={styles.copiedBadge}>Copied!</span>
                  </>
                ) : (
                  <Copy size={15} />
                )}
              </button>
            </div>
          </Magnetic>

          {/* Glowing Green Dot */}
          <div className={styles.centerGlowDot} />
        </div>

        {/* Connect Grid (3 columns x 2 rows) */}
        <div className={styles.socialGrid}>
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCell}
            >
              <div className={styles.cellLeft}>
                <div className={styles.socialIconCircle}>{item.icon}</div>
                <div className={styles.cellInfo}>
                  <h4 className={styles.cellName}>{item.name}</h4>
                  <span className={styles.cellHandle}>{item.handle}</span>
                </div>
              </div>

              <div className={styles.cellArrow}>
                <ArrowUpRight size={16} />
              </div>
            </a>
          ))}
        </div>

        {/* Footer Bottom Bar */}
        <div className={styles.footerBottom}>
          <div className={styles.footerLeft}>
            <span>© {new Date().getFullYear()} Sayed Nada. Crafted with React, TypeScript & Passion.</span>
          </div>

          <div className={styles.footerCenter}>
            <span className={styles.footerDot} />
            <span>Cairo, Egypt • All Systems Operational</span>
          </div>

          <div className={styles.footerRight}>
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={scrollToTop}
                className={styles.scrollTopBtn}
                aria-label="Back to top"
                title="Back to top"
              >
                <ArrowUp size={16} />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
};
