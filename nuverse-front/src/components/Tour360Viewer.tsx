"use client";

import React, { Suspense, useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, Html, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Helper component to handle imperative camera updates
const CameraManager = ({ activeZoomDelta }: { activeZoomDelta: React.MutableRefObject<number> }) => {
  const { camera } = useThree();

  useFrame(() => {
    if (activeZoomDelta.current !== 0 && camera instanceof THREE.PerspectiveCamera) {
      // Apply zoom
      const newFov = Math.max(30, Math.min(100, camera.fov + activeZoomDelta.current * 0.1));
      camera.fov = THREE.MathUtils.lerp(camera.fov, newFov, 0.1);
      camera.updateProjectionMatrix();

      // Decay delta
      activeZoomDelta.current *= 0.9;
      if (Math.abs(activeZoomDelta.current) < 0.01) activeZoomDelta.current = 0;
    }
  });

  return null;
}

import {
  Plus,
  Minus,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Info,
  RotateCcw,
  Maximize2
} from "lucide-react";

type Hotspot = {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
};

type TourImage = {
  id: number;
  title: string;
  url: string;
  hotspots: Hotspot[];
};

const TOUR_IMAGES: TourImage[] = [
  {
    id: 1,
    title: "University Main Plaza",
    url: "/Images/360 images/Main Campus.jpeg",
    hotspots: [
      {
        id: "campus-center",
        position: [0, 6, -12],
        title: "Main Academic Building",
        description: "The university’s main academic hub, hosting lecture halls, labs, and faculty offices."
      },
      {
        id: "campus-left",
        position: [-14, 1.5, -14],
        title: "Campus Walkway & Pergola",
        description: "A shaded pedestrian route that connects key facilities and is used heavily by students between classes."
      },
      {
        id: "campus-right",
        position: [14, 1.6, -13],
        title: "Student Gathering Area",
        description: "Outdoor seating and shaded spaces where students meet, relax, and socialize across the day."
      }
    ]
  },

  {
    id: 2,
    title: "Campus Library",
    url: "/Images/360 images/Library.jpeg",
    hotspots: [
      {
        id: "lib-center",
        position: [0, -1.2, -15],
        title: "Quiet Study Zone",
        description: "A calm study area designed for deep focus, reading, and exam preparation."
      },
      {
        id: "lib-left",
        position: [-14, -2, -11],
        title: "Study Tables",
        description: "Comfortable workspaces for individual studying, laptops, and group assignments."
      },
      {
        id: "lib-right",
        position: [14, -1.5, -12],
        title: "Book Collections",
        description: "Library shelves containing textbooks, references, and academic resources for multiple disciplines."
      }
    ]
  },

  {
    id: 3,
    title: "Chemistry Research Lab",
    url: "/Images/360 images/Chemistry Lab.jpeg",
    hotspots: [
      {
        id: "chem-center",
        position: [0, -2, -15],
        title: "Central Experiment Bench",
        description: "The main lab island where students perform hands-on experiments using professional chemistry tools."
      },
      {
        id: "chem-left",
        position: [-14, -1, -10],
        title: "Fume Hood & Storage",
        description: "Ventilated fume hood and storage cabinets used for safe handling of chemicals and vapors."
      },
      {
        id: "chem-right",
        position: [14, 0.8, -9],
        title: "Whiteboard & Lab Notes",
        description: "Instruction area used to explain procedures, reactions, and lab safety steps during sessions."
      }
    ]
  },

  {
    id: 4,
    title: "Circuits & Electronics Lab",
    url: "/Images/360 images/Circuits Lab.jpeg",
    hotspots: [
      {
        id: "elec-center",
        position: [-2, 1.6, -15],
        title: "Teaching Whiteboard",
        description: "The explanation zone where circuit concepts, calculations, and lab tasks are taught during sessions."
      },
      {
        id: "elec-left",
        position: [-14, -2, -10],
        title: "Electronics Workbenches",
        description: "Hands-on benches for circuit building, soldering, prototyping, and embedded systems testing."
      },
      {
        id: "elec-right",
        position: [14, -1.5, -8],
        title: "Instructor & Demo Desk",
        description: "Supervisor station used for live demos, debugging guidance, and monitoring lab progress."
      }
    ]
  }
];

/**
 * Helper to force hotspots onto a fixed radius around the camera.
 * This ensures they all render at a consistent size regardless of input coordinates.
 */
function clampToRadius(pos: [number, number, number], radius = 15): [number, number, number] {
  const v = new THREE.Vector3(pos[0], pos[1], pos[2]);
  if (v.lengthSq() === 0) return [0, 0, -radius];
  v.normalize().multiplyScalar(radius);
  return [v.x, v.y, v.z];
}

/**
 * Scene Component
 * 
 * Renders the 360-degree sphere and associated hotspots in the Three.js scene.
 * 
 * @param {object} props - Component properties.
 * @param {string} props.url - URL of the 360 panorama image.
 * @param {Hotspot[]} props.hotspots - Array of hotspot data for the current scene.
 * @param {(h: Hotspot) => void} props.onHotspotClick - Callback when a hotspot is clicked.
 * @returns {JSX.Element} The Three.js mesh and HTML hotspots.
 */
function Scene({ url, hotspots, onHotspotClick, onDebugClick }: { url: string, hotspots: Hotspot[], onHotspotClick: (h: Hotspot) => void, onDebugClick?: (pos: [number, number, number]) => void }) {
  const texture = useTexture(url);

  const handleClick = (e: any) => {
    if (onDebugClick && e.point) {
      // Normalize to radius 15 for consistency
      const v = e.point.clone().normalize().multiplyScalar(15);
      onDebugClick([
        parseFloat(v.x.toFixed(2)),
        parseFloat(v.y.toFixed(2)),
        parseFloat(v.z.toFixed(2))
      ]);
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <mesh scale={[-1, 1, 1]} onClick={handleClick}>
        <sphereGeometry args={[500, 64, 32]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>

      {hotspots.map((hotspot) => (
        <Html key={hotspot.id} position={clampToRadius(hotspot.position, 15)} distanceFactor={15}>
          <button
            onClick={() => onHotspotClick(hotspot)}
            className="group relative w-16 h-16 flex items-center justify-center transition-all hover:scale-125"
          >
            <div className="absolute inset-0 bg-nu-red-500 rounded-full animate-ping opacity-25"></div>
            <div className="relative w-14 h-14 bg-black/90 backdrop-blur-md rounded-full border-2 border-white/40 shadow-2xl flex items-center justify-center text-white">
              <Info size={24} />
            </div>
          </button>
        </Html>
      ))}
    </>
  );
}

/**
 * Controls Component
 * 
 * Manages the camera controls and reports field-of-view (FOV) changes for zooming.
 * 
 * @param {object} props - Component properties.
 * @param {React.RefObject<any>} props.controlsRef - Reference to the OrbitControls instance.
 * @param {(z: number) => void} props.onZoomChange - Callback when the camera FOV changes.
 * @returns {JSX.Element} The OrbitControls component.
 */
function Controls({ controlsRef }: { controlsRef: React.RefObject<any> }) {
  const { camera } = useThree();

  /* Removed useFrame for zoom reporting to avoid re-renders */

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      rotateSpeed={-0.5}
      dampingFactor={0.05}
      minDistance={1}
      maxDistance={2}
      zoomSpeed={0.5}
    />
  );
}

/**
 * Tour360Viewer Component
 * 
 * A full-screen overlay component that provides an immersive 360-degree virtual tour experience.
 * Features interactive hotspots, navigation controls, and a scene gallery.
 * 
 * @param {object} props - Component properties.
 * @param {() => void} props.onClose - Callback to close the viewer.
 * @param {number|string} [props.initialIndex=0] - Initial scene index or URL to display.
 * @returns {JSX.Element} The 360 tour viewer interface.
 */
export function Tour360Viewer({ onClose, initialIndex = 0 }: { onClose: () => void, initialIndex?: number | string }) {


  // Resolve initial index
  const resolveIndex = () => {
    if (typeof initialIndex === 'number') return initialIndex;
    const found = TOUR_IMAGES.findIndex(img => img.url === initialIndex);
    return found !== -1 ? found : 0;
  };

  const [currentIndex, setCurrentIndex] = useState(resolveIndex());
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [debugPoint, setDebugPoint] = useState<[number, number, number] | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  /* State for FOV removed to prevent re-renders */
  const activeZoomDelta = useRef(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync index if prop changes
  useEffect(() => {
    setCurrentIndex(resolveIndex());
  }, [initialIndex]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const currentTour = TOUR_IMAGES[currentIndex];
  const [activeRotation, setActiveRotation] = useState<'up' | 'down' | 'left' | 'right' | null>(null);
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Performs continuous rotation in a specified direction.
   * 
   * @param {'up' | 'down' | 'left' | 'right'} direction - The direction to rotate.
   */
  const performRotation = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    const step = 0.05;

    // Directly manipulate the azimuthal and polar angles
    switch (direction) {
      case 'left':
        controls.setAzimuthalAngle(controls.getAzimuthalAngle() + step);
        break;
      case 'right':
        controls.setAzimuthalAngle(controls.getAzimuthalAngle() - step);
        break;
      case 'up':
        controls.setPolarAngle(Math.max(0.1, controls.getPolarAngle() - step));
        break;
      case 'down':
        controls.setPolarAngle(Math.min(Math.PI - 0.1, controls.getPolarAngle() + step));
        break;
    }

    controls.update();
  }, []);

  useEffect(() => {
    if (activeRotation) {
      rotationTimerRef.current = setInterval(() => {
        performRotation(activeRotation);
      }, 16);
    } else {
      if (rotationTimerRef.current) clearInterval(rotationTimerRef.current);
    }
    return () => {
      if (rotationTimerRef.current) clearInterval(rotationTimerRef.current);
    };
  }, [activeRotation, performRotation]);

  /**
   * Adjusts the camera field of view (zoom) imperatively.
   * 
   * @param {number} delta - The amount to change the zoom level.
   */
  const handleZoom = (delta: number) => {
    if (controlsRef.current) {
      activeZoomDelta.current = delta;
    }
  };

  /**
   * Switches the current tour scene with a transition effect.
   * 
   * @param {number} index - The index of the scene to switch to.
   */
  const handleTourChange = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  /**
   * Resets the camera orientation and zoom level to default.
   */
  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.reset();
    }
  };

  const glassClass = "dark-glass border-white/10";

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-sans overflow-hidden">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 pointer-events-none">
        <div className="bg-nu-dark/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-nu-red-500/20 flex items-center justify-center border border-nu-red-500/30">
            <Maximize2 className="text-nu-red-500" size={18} />
          </div>
          <div>
            <h2 className="text-white text-base font-black uppercase tracking-tight leading-tight">
              {currentTour.title}
            </h2>
            <p className="text-nu-peach-300 text-[10px] uppercase tracking-[0.2em] font-bold opacity-80">Virtual Campus Experience</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="bg-nu-red-500 text-white p-3.5 rounded-2xl hover:bg-nu-red-600 transition-all pointer-events-auto shadow-2xl active:scale-95 border border-white/10"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main 360 Canvas */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing relative">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 0.1]} fov={75}>
            <CameraManager activeZoomDelta={activeZoomDelta} />
          </PerspectiveCamera>
          <Suspense fallback={null}>
            <Scene
              key={currentTour.id}
              url={currentTour.url}
              hotspots={currentTour.hotspots}
              onHotspotClick={setSelectedHotspot}
              onDebugClick={showDebug ? setDebugPoint : undefined}
            />
          </Suspense>
          {/* @ts-ignore */}
          <Controls
            controlsRef={controlsRef}
          />
        </Canvas>

        {/* Scene Transition Overlay */}
        <div className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-500 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Modern Control HUD */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-10 w-full px-4 max-w-4xl">

        {/* Center Control Group */}
        <div className="flex items-center gap-6">

          {/* Zoom & Reset Side Panel */}
          <div className="flex flex-col gap-1.5 bg-nu-dark/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-2xl">
            <button
              onClick={() => handleZoom(-10)}
              className="p-2.5 text-white hover:bg-nu-red-500 rounded-xl transition-all group"
              title="Zoom In"
            >
              <Plus size={18} className="group-active:scale-125 transition-transform" />
            </button>
            <button
              onClick={resetView}
              className="p-2.5 bg-white/5 text-white hover:bg-white/20 rounded-xl transition-all"
              title="Reset View"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={() => handleZoom(10)}
              className="p-2.5 text-white hover:bg-nu-red-500 rounded-xl transition-all group"
              title="Zoom Out"
            >
              <Minus size={18} className="group-active:scale-75 transition-transform" />
            </button>
          </div>

          {/* Precision Navigation Wheel */}
          <div className="relative bg-nu-dark/80 backdrop-blur-md p-5 rounded-[2.5rem] border border-white/10 shadow-2xl flex items-center justify-center scale-90 md:scale-100">
            {/* Directional Pad */}
            <div className="grid grid-cols-3 gap-1.5">
              <div />
              <button
                onMouseDown={() => setActiveRotation('up')}
                onMouseUp={() => setActiveRotation(null)}
                onMouseLeave={() => setActiveRotation(null)}
                onTouchStart={() => setActiveRotation('up')}
                onTouchEnd={() => setActiveRotation(null)}
                className="p-3.5 text-white hover:bg-nu-blue-500 rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-95 border border-white/5"
              >
                <ArrowUp size={20} />
              </button>
              <div />

              <button
                onMouseDown={() => setActiveRotation('left')}
                onMouseUp={() => setActiveRotation(null)}
                onMouseLeave={() => setActiveRotation(null)}
                onTouchStart={() => setActiveRotation('left')}
                onTouchEnd={() => setActiveRotation(null)}
                className="p-3.5 text-white hover:bg-nu-blue-500 rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-95 border border-white/5"
              >
                <ArrowLeft size={20} />
              </button>

              {/* Central Indicator */}
              <div className="w-12 h-12 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-nu-red-500 animate-pulse shadow-[0_0_10px_rgba(182,25,46,0.5)]" />
              </div>

              <button
                onMouseDown={() => setActiveRotation('right')}
                onMouseUp={() => setActiveRotation(null)}
                onMouseLeave={() => setActiveRotation(null)}
                onTouchStart={() => setActiveRotation('right')}
                onTouchEnd={() => setActiveRotation(null)}
                className="p-3.5 text-white hover:bg-nu-blue-500 rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-95 border border-white/5"
              >
                <ArrowRight size={20} />
              </button>

              <div />
              <button
                onMouseDown={() => setActiveRotation('down')}
                onMouseUp={() => setActiveRotation(null)}
                onMouseLeave={() => setActiveRotation(null)}
                onTouchStart={() => setActiveRotation('down')}
                onTouchEnd={() => setActiveRotation(null)}
                className="p-3.5 text-white hover:bg-nu-blue-500 rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-95 border border-white/5"
              >
                <ArrowDown size={20} />
              </button>
              <div />
            </div>
          </div>

          {/* Navigation Side Panel */}
          <div className="flex flex-col gap-1.5 bg-nu-dark/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-2xl">
            <button
              onClick={() => handleTourChange((currentIndex + 1) % TOUR_IMAGES.length)}
              className="p-2.5 text-white hover:bg-nu-blue-500 rounded-xl transition-all"
              title="Next Scene"
            >
              <ChevronRight size={18} />
            </button>
            <div className="h-px bg-white/10 mx-2"></div>
            <button
              onClick={() => handleTourChange((currentIndex - 1 + TOUR_IMAGES.length) % TOUR_IMAGES.length)}
              className="p-2.5 text-white hover:bg-nu-blue-500 rounded-xl transition-all"
              title="Previous Scene"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>

        {/* Thumbnails Gallery */}
        <div className="flex gap-3 bg-nu-dark/80 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl overflow-x-auto max-w-full">
          {TOUR_IMAGES.map((tour, idx) => (
            <button
              key={tour.id}
              onClick={() => handleTourChange(idx)}
              className={`relative group flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all w-20 h-12 ${currentIndex === idx ? 'border-nu-red-500 scale-105 shadow-[0_0_15px_rgba(182,25,46,0.4)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
            >
              <Image
                src={tour.url}
                alt={tour.title}
                fill
                className="object-cover"
                sizes="80px"
              />
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-nu-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Hotspot Info Modal */}
      {selectedHotspot && (
        <div
          className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setSelectedHotspot(null)}
        >
          <div
            className="bg-nu-dark/90 backdrop-blur-xl w-full max-w-lg rounded-[2.5rem] border border-white/10 p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform animate-float"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-nu-red-500/20 p-4 rounded-2xl border border-nu-red-500/30">
                <Info className="text-nu-red-500" size={32} />
              </div>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="p-2 text-white/50 hover:text-white transition-colors"
                title="Close"
              >
                <X size={28} />
              </button>
            </div>

            <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4 leading-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{selectedHotspot.title}</h3>
            <p className="text-white/70 text-lg leading-relaxed mb-8" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {selectedHotspot.description}
            </p>

            <button
              onClick={() => setSelectedHotspot(null)}
              className="w-full bg-gradient-to-r from-[#b6192e] to-[#ff4b2b] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-nu-red-500/25 transform hover:-translate-y-1 active:scale-95"
            >
              Back to Tour
            </button>
          </div>
        </div>
      )}

      {/* Instructions Overlay */}
      <div className="absolute bottom-6 left-6 flex items-center gap-6 text-white/30 text-[10px] uppercase tracking-widest font-bold z-10 hidden lg:flex">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[1px] bg-white/20"></div>
          <span>Drag to explore</span>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
          <span>Scroll to zoom</span>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
          <span>Click hotspots</span>
        </div>

        {/* Debug Toggle */}
        <button
          onClick={() => setShowDebug(!showDebug)}
          className={`px-3 py-1 rounded-full border transition-all ${showDebug ? 'bg-nu-red-500 text-white border-nu-red-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
        >
          {showDebug ? 'Debug Mode ON' : 'Debug Mode'}
        </button>
      </div>

      {/* Debug HUD */}
      {showDebug && debugPoint && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[110] bg-nu-dark/90 backdrop-blur-xl p-6 rounded-3xl border border-nu-red-500/30 shadow-2xl flex flex-col items-center gap-4 animate-fade-in">
          <div className="text-nu-red-500 font-bold uppercase tracking-widest text-xs">New Hotspot Coordinates</div>
          <div className="flex gap-3">
            <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 font-mono text-white text-lg">
              [{debugPoint[0]}, {debugPoint[1]}, {debugPoint[2]}]
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`position: [${debugPoint[0]}, ${debugPoint[1]}, ${debugPoint[2]}]`);
              }}
              className="bg-nu-red-500 px-4 py-2 rounded-xl text-white text-xs font-bold hover:bg-nu-red-600 transition-all uppercase"
            >
              Copy
            </button>
          </div>
          <p className="text-white/40 text-[10px] text-center max-w-[200px]">Click anywhere in the scene to get new coordinates at fixed radius 15.</p>
        </div>
      )}
    </div>
  );
}




