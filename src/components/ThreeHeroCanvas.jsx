import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Sparkles } from 'lucide-react';

export default function ThreeHeroCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Keep references to scene objects for interactive controls
  const sceneElementsRef = useRef({
    outerRing: null,
    midRing: null,
    innerRing: null,
    coreIcosa: null,
    particles: null,
    materials: [],
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 600;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8.5;

    // 2. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xE5A93C,
      metalness: 0.92,
      roughness: 0.22,
      wireframe: wireframeMode,
    });

    const darkTitaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1E232E,
      metalness: 0.95,
      roughness: 0.35,
      wireframe: wireframeMode,
    });

    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x00F2FE,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x005577,
      emissiveIntensity: 0.4,
      wireframe: wireframeMode,
    });

    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xF6CE7D,
      metalness: 0.6,
      roughness: 0.2,
      emissive: 0xE5A93C,
      emissiveIntensity: 0.6,
      wireframe: true,
    });

    sceneElementsRef.current.materials = [goldMat, darkTitaniumMat, cyanMat, coreMat];

    // 4. Kinetic Rings Architecture
    const group = new THREE.Group();

    // Outer Gyroscope Ring (Gold)
    const outerGeo = new THREE.TorusGeometry(3.2, 0.08, 24, 100);
    const outerRing = new THREE.Mesh(outerGeo, goldMat);
    group.add(outerRing);

    // Mid Gyroscope Ring (Dark Titanium with notch details)
    const midGeo = new THREE.TorusGeometry(2.5, 0.09, 24, 100);
    const midRing = new THREE.Mesh(midGeo, darkTitaniumMat);
    midRing.rotation.x = Math.PI / 3;
    group.add(midRing);

    // Inner Gyroscope Ring (Cyan Glow)
    const innerGeo = new THREE.TorusGeometry(1.8, 0.07, 24, 100);
    const innerRing = new THREE.Mesh(innerGeo, cyanMat);
    innerRing.rotation.y = Math.PI / 4;
    group.add(innerRing);

    // Central Kinetic Core (Geometric faceted polyhedron)
    const coreGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const coreIcosa = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreIcosa);

    // Solid Inner Glow Sphere
    const innerCoreGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      wireframe: false,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    group.add(innerCoreMesh);

    scene.add(group);

    // 5. Floating Dust / Particle Field (1,200 points)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 22;
      particlePositions[i + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i + 2] = (Math.random() - 0.5) * 16;
      particleScales[i / 3] = Math.random();
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xE5A93C,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Store references
    sceneElementsRef.current.outerRing = outerRing;
    sceneElementsRef.current.midRing = midRing;
    sceneElementsRef.current.innerRing = innerRing;
    sceneElementsRef.current.coreIcosa = coreIcosa;
    sceneElementsRef.current.particles = particles;

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xE5A93C, 2.5);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00F2FE, 2.0);
    dirLight2.position.set(-5, -6, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xF6CE7D, 3, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 7. Mouse tracking & Drag rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = -(y / rect.height - 0.5) * 2;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        group.rotation.y += deltaX * 0.01;
        group.rotation.x += deltaY * 0.01;
      }
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousedown', handleMouseDown);

    // 8. Animation Loop with Damping
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const speed = speedMultiplier;

      // Rotations on multiple axes
      outerRing.rotation.z += 0.006 * speed;
      outerRing.rotation.x += 0.003 * speed;

      midRing.rotation.y += 0.009 * speed;
      midRing.rotation.z -= 0.005 * speed;

      innerRing.rotation.x -= 0.012 * speed;
      innerRing.rotation.y += 0.007 * speed;

      coreIcosa.rotation.x += 0.015 * speed;
      coreIcosa.rotation.y += 0.018 * speed;

      // Particle floating drift
      particles.rotation.y += 0.001 * speed;
      particles.rotation.x -= 0.0006 * speed;

      // Pulse the core light
      const time = clock.getElapsedTime();
      pointLight.intensity = 2.5 + Math.sin(time * 3) * 0.9;
      innerCoreMesh.scale.setScalar(0.9 + Math.sin(time * 4) * 0.1);

      // Smooth mouse follow parallax
      targetX += (mouseX * 0.6 - targetX) * 0.05;
      targetY += (mouseY * 0.6 - targetY) * 0.05;

      if (!isDragging) {
        group.rotation.y += (targetX * 0.8 - group.rotation.y) * 0.04;
        group.rotation.x += (-targetY * 0.8 - group.rotation.x) * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (container) {
        container.removeEventListener('mousedown', handleMouseDown);
      }
      renderer.dispose();
      outerGeo.dispose();
      midGeo.dispose();
      innerGeo.dispose();
      coreGeo.dispose();
      innerCoreGeo.dispose();
      particleGeo.dispose();
      goldMat.dispose();
      darkTitaniumMat.dispose();
      cyanMat.dispose();
      coreMat.dispose();
      particleMat.dispose();
    };
  }, [wireframeMode, speedMultiplier]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating Interactive 3D HUD Controls */}
      <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 flex items-center justify-between sm:justify-end gap-2 bg-[#090B10]/80 backdrop-blur-md border border-white/10 p-2 rounded-xl text-xs text-slate-300 z-10 shadow-2xl">
        <div className="flex items-center gap-1.5 px-2 text-[11px] text-amber-400/90 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="hidden sm:inline">3D KINETIC ENGINE:</span>
          <span>60 FPS</span>
        </div>

        <div className="h-4 w-[1px] bg-white/10" />

        {/* Speed Toggle */}
        <button
          onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 0.4 : 1))}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-slate-200 transition-colors"
          title="Toggle rotation velocity"
        >
          <RotateCw className="w-3 h-3 text-amber-400" />
          <span>{speedMultiplier === 1 ? '1x Spd' : speedMultiplier === 2 ? '2x Turbo' : '0.4x Slow'}</span>
        </button>

        {/* Wireframe Toggle */}
        <button
          onClick={() => setWireframeMode(!wireframeMode)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
            wireframeMode
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
              : 'bg-white/5 hover:bg-white/10 border-white/5 text-slate-200'
          }`}
          title="Toggle wireframe topology"
        >
          <Eye className="w-3 h-3 text-cyan-400" />
          <span>{wireframeMode ? 'Solid' : 'Mesh'}</span>
        </button>
      </div>

      {/* Hint Badge */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] text-slate-400 pointer-events-none">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>Drag to orbit • Move cursor to tilt</span>
      </div>
    </div>
  );
}
