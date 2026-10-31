import React, { useState, useEffect } from 'react';
import { Clock, Terminal } from 'lucide-react';
import styles from './LiveStatusPill.module.css';

export const LiveStatusPill: React.FC = () => {
  const [cairoTime, setCairoTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Date().toLocaleTimeString('en-US', {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        setCairoTime(formatted);
      } catch {
        // Fallback if browser doesn't support timeZone
        const now = new Date();
        setCairoTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <div className={styles.wrapper}>
      {/* Availability Status */}
      <div className={styles.statusPill}>
        <span className={styles.pulseDot} />
        <span>AVAILABLE FOR WORK</span>
      </div>

      {/* Live Ismailia / Egypt Clock */}
      <div
        className={styles.timePill}
        title="Local time in Ismailia, Egypt (UTC+2) • Available for global remote overlap"
      >
        <Clock size={13} className={styles.timeIcon} />
        <span>
          Ismailia, EG <span className={styles.timeHighlight}>{cairoTime || '04:30 PM'}</span>{' '}
          <small>(UTC+2)</small>
        </span>
      </div>

      {/* Quick Command Palette Launcher */}
      <button
        type="button"
        className={styles.quickCommandBtn}
        onClick={openPalette}
        title="Open interactive command search (Ctrl + K)"
        aria-label="Open command palette"
      >
        <Terminal size={13} />
        <span>Commands</span>
        <span className={styles.cmdKbd}>⌘K</span>
      </button>
    </div>
  );
};

