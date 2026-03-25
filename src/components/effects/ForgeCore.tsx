import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ForgeCore = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Check if SSR
    if (typeof window === 'undefined') return;

    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    mountRef.current.appendChild(renderer.domElement);

    // Outer Crystal (Subtle)
    const geometry = new THREE.IcosahedronGeometry(3.5, 1); 
    const material = new THREE.MeshStandardMaterial({
      color: 0x080D1A,
      emissive: 0x00B4D8, // Use Cyan for ethereal subtlety instead of aggressive orange
      emissiveIntensity: 0.1, // Much lower
      wireframe: true,
      transparent: true,
      opacity: 0.15 // Very subtle
    });
    
    const crystal = new THREE.Mesh(geometry, material);
    scene.add(crystal);

    // Inner Core (Subtle)
    const innerGeo = new THREE.IcosahedronGeometry(2, 0);
    const innerMat = new THREE.MeshBasicMaterial({
       color: 0xD4AF37,
       wireframe: true,
       transparent: true,
       opacity: 0.2 // subtle
    });
    const innerCrystal = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerCrystal);

    // Floating Particles around the core
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i=0; i < particlesCount * 3; i++) {
       posArray[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xFF8C00,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    const pointLight = new THREE.PointLight(0xFF8C00, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 6;

    let frameId: number;
    const animateThre = () => {
      frameId = requestAnimationFrame(animateThre);
      crystal.rotation.x += 0.002;
      crystal.rotation.y += 0.004;
      
      innerCrystal.rotation.x -= 0.005;
      innerCrystal.rotation.y -= 0.008;

      particlesMesh.rotation.y -= 0.001;

      renderer.render(scene, camera);
    };
    animateThre();

    const handleResize = () => {
      if (!mountRef.current) return;
      const nw = mountRef.current.clientWidth;
      const nh = mountRef.current.clientHeight;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (mountRef.current && renderer.domElement) {
         mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full mix-blend-screen pointer-events-none" />;
};
