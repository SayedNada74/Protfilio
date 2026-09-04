import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const HeroOrb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const resize = () => {
      const size = Math.min(container.clientWidth, container.clientHeight) || 350;
      renderer.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    resize();

    // Outer wireframe icosahedron
    const geo1 = new THREE.IcosahedronGeometry(2.3, 1);
    const mat1 = new THREE.MeshBasicMaterial({
      color: 0x7c5cff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    scene.add(mesh1);

    // Inner wireframe icosahedron
    const geo2 = new THREE.IcosahedronGeometry(1.65, 2);
    const mat2 = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    scene.add(mesh2);

    // Inner glow core sphere
    const geo3 = new THREE.SphereGeometry(1.1, 24, 24);
    const mat3 = new THREE.MeshBasicMaterial({
      color: 0x7c5cff,
      transparent: true,
      opacity: 0.12,
    });
    const mesh3 = new THREE.Mesh(geo3, mat3);
    scene.add(mesh3);

    // Particle nodes on vertices
    const pointsGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const pointsMat = new THREE.PointsMaterial({
      color: 0x00f5d4,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    scene.add(pointsMesh);

    camera.position.z = 5;

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = y * 1.5;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation & visibility throttling
    let animId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mesh1.rotation.y += 0.005;
      mesh1.rotation.x += 0.002;
      mesh1.rotation.x += (mouseY * 0.4 - mesh1.rotation.x) * 0.05;
      mesh1.rotation.y += (mouseX * 0.4 - mesh1.rotation.y) * 0.05;

      pointsMesh.rotation.copy(mesh1.rotation);

      mesh2.rotation.y -= 0.004;
      mesh2.rotation.z += 0.003;
      mesh2.rotation.x -= (mouseY * 0.25 - mesh2.rotation.x) * 0.05;
      mesh2.rotation.y -= (mouseX * 0.25 - mesh2.rotation.y) * 0.05;

      mesh3.rotation.y += 0.002;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      resizeObserver.disconnect();
      renderer.dispose();
      geo1.dispose();
      mat1.dispose();
      geo2.dispose();
      mat2.dispose();
      geo3.dispose();
      mat3.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
};
