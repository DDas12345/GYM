import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Lightbulb, RotateCcw, ShieldCheck, Zap, Info } from 'lucide-react';

const FINISHES = {
  gold: {
    name: '24K Titanium Gold',
    plateColor: 0x1E2026,
    hubColor: 0xE5A93C,
    ringColor: 0xF6CE7D,
    roughness: 0.25,
    metalness: 0.9,
    lightColor: 0xE5A93C,
    specText: 'Triple-pass PVD coated titanium gold with laser-etched tolerance calibration.'
  },
  obsidian: {
    name: 'Stealth Obsidian',
    plateColor: 0x0E1015,
    hubColor: 0x2A303C,
    ringColor: 0x475569,
    roughness: 0.45,
    metalness: 0.85,
    lightColor: 0xFFFFFF,
    specText: 'Ultra-dense matte vulcanized urethane with hardened manganese phosphate hub.'
  },
  carbon: {
    name: 'Forged Carbon & Cyan',
    plateColor: 0x141822,
    hubColor: 0x00F2FE,
    ringColor: 0x38BDF8,
    roughness: 0.2,
    metalness: 0.8,
    lightColor: 0x00F2FE,
    specText: 'Multi-axial carbon fiber matrix with aerospace-grade anodized cyan center hub.'
  }
};

export default function ThreeEquipmentViewer() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeFinish, setActiveFinish] = useState('gold');
  const [lightingPreset, setLightingPreset] = useState('dramatic'); // 'dramatic' | 'studio'
  const [autoRotate, setAutoRotate] = useState(true);

  // References to 3D meshes for live material updates
  const meshesRef = useRef({
    plateOuter: null,
    plateInner: null,
    hub: null,
    barbellSleeve: null,
    dirLight1: null,
    dirLight2: null,
    sceneGroup: null,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth;
    let height = container.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Main Group
    const group = new THREE.Group();
    scene.add(group);
    meshesRef.current.sceneGroup = group;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(FINISHES[activeFinish].lightColor, 3.0);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight2.position.set(-4, -3, -3);
    scene.add(dirLight2);

    meshesRef.current.dirLight1 = dirLight1;
    meshesRef.current.dirLight2 = dirLight2;

    // 1. Olympic Barbell Sleeve (Center Horizontal Shaft)
    const sleeveGeo = new THREE.CylinderGeometry(0.25, 0.25, 6, 32);
    sleeveGeo.rotateZ(Math.PI / 2);
    const sleeveMat = new THREE.MeshStandardMaterial({
      color: 0xC0C7D0,
      metalness: 0.95,
      roughness: 0.15,
    });
    const sleeveMesh = new THREE.Mesh(sleeveGeo, sleeveMat);
    group.add(sleeveMesh);
    meshesRef.current.barbellSleeve = sleeveMesh;

    // 2. Barbell Collar Flange
    const flangeGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.25, 32);
    flangeGeo.rotateZ(Math.PI / 2);
    const flangeMat = new THREE.MeshStandardMaterial({
      color: 0x7E8B9B,
      metalness: 0.9,
      roughness: 0.3,
    });
    const flangeMesh = new THREE.Mesh(flangeGeo, flangeMat);
    flangeMesh.position.x = -1.2;
    group.add(flangeMesh);

    // 3. Olympic Plate Main Outer Disc (Bumper Rim)
    const currentTheme = FINISHES[activeFinish];
    const plateOuterGeo = new THREE.CylinderGeometry(1.85, 1.85, 0.38, 48);
    plateOuterGeo.rotateZ(Math.PI / 2);
    const plateOuterMat = new THREE.MeshStandardMaterial({
      color: currentTheme.plateColor,
      metalness: currentTheme.metalness,
      roughness: currentTheme.roughness,
    });
    const plateOuter = new THREE.Mesh(plateOuterGeo, plateOuterMat);
    group.add(plateOuter);
    meshesRef.current.plateOuter = plateOuter;

    // 4. Recessed Inner Face Ring
    const plateInnerGeo = new THREE.CylinderGeometry(1.45, 1.45, 0.42, 48);
    plateInnerGeo.rotateZ(Math.PI / 2);
    const plateInnerMat = new THREE.MeshStandardMaterial({
      color: currentTheme.ringColor,
      metalness: currentTheme.metalness,
      roughness: currentTheme.roughness + 0.1,
    });
    const plateInner = new THREE.Mesh(plateInnerGeo, plateInnerMat);
    group.add(plateInner);
    meshesRef.current.plateInner = plateInner;

    // 5. Precision Center Steel Hub
    const hubGeo = new THREE.CylinderGeometry(0.58, 0.58, 0.46, 32);
    hubGeo.rotateZ(Math.PI / 2);
    const hubMat = new THREE.MeshStandardMaterial({
      color: currentTheme.hubColor,
      metalness: 0.96,
      roughness: 0.15,
    });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    group.add(hub);
    meshesRef.current.hub = hub;

    // 6. Secondary Plate behind (simulating loaded bar)
    const secondPlate = plateOuter.clone();
    secondPlate.position.x = -0.48;
    secondPlate.scale.set(0.92, 0.92, 0.92);
    group.add(secondPlate);

    // Subtle 3D ground shadow plane
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.2;
    scene.add(shadowPlane);

    // Initial slight angle
    group.rotation.x = 0.25;
    group.rotation.y = -0.6;

    // Mouse drag interaction
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouse.x;
      const deltaY = e.clientY - prevMouse.y;
      group.rotation.y += deltaX * 0.008;
      group.rotation.x += deltaY * 0.008;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      camera.position.z = Math.min(Math.max(camera.position.z + e.deltaY * 0.004, 3.5), 7.5);
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // Window resize
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Render loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (autoRotate && !isDragging) {
        group.rotation.y += 0.006;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      sleeveGeo.dispose();
      flangeGeo.dispose();
      plateOuterGeo.dispose();
      plateInnerGeo.dispose();
      hubGeo.dispose();
      shadowGeo.dispose();
    };
  }, []);

  // Update materials when finish changes
  useEffect(() => {
    const theme = FINISHES[activeFinish];
    if (meshesRef.current.plateOuter) {
      meshesRef.current.plateOuter.material.color.setHex(theme.plateColor);
      meshesRef.current.plateOuter.material.roughness = theme.roughness;
      meshesRef.current.plateOuter.material.metalness = theme.metalness;
    }
    if (meshesRef.current.plateInner) {
      meshesRef.current.plateInner.material.color.setHex(theme.ringColor);
    }
    if (meshesRef.current.hub) {
      meshesRef.current.hub.material.color.setHex(theme.hubColor);
    }
    if (meshesRef.current.dirLight1) {
      meshesRef.current.dirLight1.color.setHex(theme.lightColor);
    }
  }, [activeFinish]);

  // Update lighting preset
  useEffect(() => {
    if (meshesRef.current.dirLight1 && meshesRef.current.dirLight2) {
      if (lightingPreset === 'dramatic') {
        meshesRef.current.dirLight1.intensity = 3.5;
        meshesRef.current.dirLight2.intensity = 1.0;
      } else {
        meshesRef.current.dirLight1.intensity = 2.0;
        meshesRef.current.dirLight2.intensity = 2.5;
      }
    }
  }, [lightingPreset]);

  const resetView = () => {
    if (meshesRef.current.sceneGroup) {
      meshesRef.current.sceneGroup.rotation.set(0.25, -0.6, 0);
    }
  };

  return (
    <section id="three-studio" className="py-24 relative bg-[#090B10] border-y border-white/5 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Interactive 3D Hardware Studio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
              THE ELEIKO™ <span className="gold-gradient-text">FORGE</span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl">
              Inspect our competition-calibrated Olympic machinery in 3D. Every plate and bar in KINETIX is forged to calibrated tolerances within ±10 grams.
            </p>
          </div>

          {/* Interactive controls pill */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-xl self-start md:self-auto backdrop-blur-md">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                autoRotate ? 'bg-amber-500 text-black font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {autoRotate ? 'Auto Orbiting' : 'Paused Orbit'}
            </button>
            <button
              onClick={() => setLightingPreset((prev) => (prev === 'dramatic' ? 'studio' : 'dramatic'))}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              title="Toggle Light Preset"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>{lightingPreset === 'dramatic' ? 'Noir Light' : 'Studio'}</span>
            </button>
            <button
              onClick={resetView}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3D Canvas Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main 3D Viewport */}
          <div
            ref={containerRef}
            className="lg:col-span-8 relative h-[420px] sm:h-[500px] rounded-2xl bg-gradient-to-b from-[#10131B] to-[#0A0C11] border border-white/10 overflow-hidden shadow-2xl group cursor-grab active:cursor-grabbing select-none"
          >
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* In-Canvas Overlay Instructions */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Eleiko IWF 25KG Disc • Interactive 3D Model</span>
            </div>

            <div className="absolute bottom-4 left-4 text-[11px] text-slate-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg pointer-events-none">
              Drag to rotate 360° • Scroll to zoom
            </div>

            {/* Current Material Badge */}
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-right">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Finish Applied</p>
              <p className="text-xs font-bold text-amber-400">{FINISHES[activeFinish].name}</p>
            </div>
          </div>

          {/* Configuration & Specifications Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Finish Selectors */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Select Custom Alloy Finish
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {Object.entries(FINISHES).map(([key, finish]) => (
                  <button
                    key={key}
                    onClick={() => setActiveFinish(key)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      activeFinish === key
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-gold-glow'
                        : 'bg-[#0E1118] border-white/5 hover:border-white/15 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                        style={{
                          backgroundColor: `#${finish.hubColor.toString(16).padStart(6, '0')}`,
                        }}
                      />
                      <span className={`text-sm font-medium ${activeFinish === key ? 'text-white' : 'text-slate-300'}`}>
                        {finish.name}
                      </span>
                    </div>
                    {activeFinish === key && (
                      <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase bg-amber-400/10 px-2 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <p className="text-xs text-slate-400 mt-4 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                {FINISHES[activeFinish].specText}
              </p>
            </div>

            {/* Technical Specs Card */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Certified Calibrations</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Weight Specification</span>
                  <span className="font-semibold text-white">25.0 kg / 55.1 lbs</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Precision Tolerance</span>
                  <span className="font-semibold text-emerald-400">± 10 grams (IWF Certified)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Center Bore Diameter</span>
                  <span className="font-semibold text-white">50.4 mm Olympic Standard</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Impact Endurance</span>
                  <span className="font-semibold text-white">20,000+ Drops at Max Load</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Velocity Sensor Port</span>
                  <span className="font-semibold text-cyan-400">Integrated Vmaxpro Node</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
