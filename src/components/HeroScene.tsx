import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── Scene setup ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    /* ── Color palette ── */
    const palette = [
      new THREE.Color('#d4a853'),
      new THREE.Color('#4da6e0'),
      new THREE.Color('#8b5cf6'),
    ];

    /* ── Main orbital particles ── */
    const particleCount = 250;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const ring = Math.floor(Math.random() * 3);
      const radius = 1.8 + ring * 1.0 + (Math.random() - 0.5) * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.2;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius;

      const c = palette[ring];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geom, mat);
    scene.add(points);

    /* ── Star layer — larger, sparser ── */
    const starCount = 40;
    const starPos = new Float32Array(starCount * 3);
    const starCols = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const r = 2.5 + Math.random() * 4;
      const t = Math.random() * Math.PI * 2;
      const p = (Math.random() - 0.5) * Math.PI * 0.8;

      starPos[i * 3] = Math.cos(t) * Math.cos(p) * r;
      starPos[i * 3 + 1] = Math.sin(p) * r;
      starPos[i * 3 + 2] = Math.sin(t) * Math.cos(p) * r;

      const c = palette[i % 3];
      starCols[i * 3] = c.r;
      starCols[i * 3 + 1] = c.g;
      starCols[i * 3 + 2] = c.b;
    }

    const starGeom = new THREE.BufferGeometry();
    starGeom.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    starGeom.setAttribute('color', new THREE.Float32BufferAttribute(starCols, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);

    /* ── Mouse tracking ── */
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── Render loop ── */
    let frameId: number;
    const clock = new THREE.Clock();

    const tick = () => {
      frameId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      // Orbital rotation
      points.rotation.y = t * 0.08;
      points.rotation.x = Math.sin(t * 0.04) * 0.12;

      stars.rotation.y = -t * 0.04;
      stars.rotation.z = t * 0.02;

      // Mouse influence on camera
      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 0.25 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    tick();

    /* ── Resize ── */
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geom.dispose();
      mat.dispose();
      starGeom.dispose();
      starMat.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
}
