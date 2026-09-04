import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './MagneticCard.module.css';

interface MagneticCardProps {
  icon: string;
  name: string;
  glowColor?: string;
}

export const MagneticCard: React.FC<MagneticCardProps> = ({
  icon,
  name,
  glowColor = '#00F5D4',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Magnetic pull: offset towards mouse
    const pullX = (e.clientX - centerX) * 0.45;
    const pullY = (e.clientY - centerY) * 0.45;

    // Tilt angle based on offset
    const tiltX = (centerY - e.clientY) * 0.2;
    const tiltY = (e.clientX - centerX) * 0.2;

    gsap.to(cardRef.current, {
      x: pullX,
      y: pullY,
      rotateX: tiltX,
      rotateY: tiltY,
      scale: 1.1,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    setIsHovered(false);

    // Smooth spring back to resting position
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: 'elastic.out(1.1, 0.4)',
      overwrite: 'auto',
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: isHovered
          ? `0 14px 34px rgba(0, 0, 0, 0.55), 0 0 25px ${glowColor}55`
          : undefined,
        borderColor: isHovered ? glowColor : undefined,
      }}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{name}</span>
      {isHovered && (
        <span
          className={styles.magneticGlow}
          style={{
            background: `radial-gradient(circle, ${glowColor}33 0%, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
};
