import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const HeroScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    
    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00F5D4, // accent color
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);
    
    camera.position.z = 3;
    
    // Animation loop & Optimization
    let animationFrameId: number;
    let isVisible = true;
    
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    
    observer.observe(mountRef.current);
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      if (!isVisible) return; // Throttling when offscreen
      
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      // Dispose Three.js resources
      particlesGeometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
};
