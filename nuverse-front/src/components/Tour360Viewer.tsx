"use client";

import React, { Suspense, useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, Html, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

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
    url: "/Images/360 images/image1.jpg",
    hotspots: [
      { id: "h1", position: [10, 2, -20], title: "Main Building", description: "The heart of the campus, housing central administration and historic halls." },
      { id: "h2", position: [-15, -5, 10], title: "Student Union", description: "A hub for student activities, food courts, and study spaces." },
      { id: "h3", position: [20, -2, 15], title: "Green Space", description: "Ideal for outdoor studying and campus events." }
    ]
  },
  {
    id: 2,
    title: "Campus Library",
    url: "/Images/360 images/library.webp",
    hotspots: [
      { id: "c1", position: [0, -5, -10], title: "Observation Deck", description: "Panoramic view of the entire campus from the highest point." }
    ]
  },
  {
    id: 3,
    title: "Research Laboratory",
    url: "/Images/360 images/image2.jpg", // Using image2 as placeholder for Labs if needed
    hotspots: [
      { id: "l1", position: [5, 0, -10], title: "Advanced Equipment", description: "State-of-the-art research tools for molecular analysis." }
    ]
  },
  {
    id: 4,
    title: "Sports Complex",
    url: "/Images/360 images/image3.jpg",
    hotspots: []
  },
  {
    id: 5,
    title: "Innovation Hub",
    url: "/Images/360 images/image4.jpg",
    hotspots: []
  },
  {
    id: 6,
    title: "Study Halls",
    url: "/Images/360 images/image5.jpg",
    hotspots: []
  }
];

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
function Scene({ url, hotspots, onHotspotClick }: { url: string, hotspots: Hotspot[], onHotspotClick: (h: Hotspot) => void }) {
  const texture = useTexture(url);

  return (
    <>
      <ambientLight intensity={0.5} />
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[500, 64, 32]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>

      {hotspots.map((hotspot) => (
        <Html key={hotspot.id} position={hotspot.position} distanceFactor={15}>
          <button
            onClick={() => onHotspotClick(hotspot)}
            className="group relative w-10 h-10 flex items-center justify-center transition-all hover:scale-125"
          >
            <div className="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-25"></div>
            <div className="relative w-8 h-8 bg-brand-600/80 backdrop-blur-md rounded-full border-2 border-white/50 shadow-xl flex items-center justify-center text-white">
              <Info size={16} />
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
function Controls({ controlsRef, onZoomChange }: { controlsRef: React.RefObject<any>, onZoomChange: (z: number) => void }) {
  const { camera } = useThree();

  useFrame(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      onZoomChange(camera.fov);
    }
  });

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
  const [fov, setFov] = useState(75);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
   * Adjusts the camera field of view (zoom).
   * 
   * @param {number} delta - The amount to change the zoom level.
   */
  const handleZoom = (delta: number) => {
    setFov(prev => {
      const next = Math.max(30, Math.min(100, prev + delta));
      return next;
    });
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
      setFov(75);
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
          <PerspectiveCamera makeDefault position={[0, 0, 0.1]} fov={fov} />
          <Suspense fallback={null}>
            <Scene
              key={currentTour.id}
              url={currentTour.url}
              hotspots={currentTour.hotspots}
              onHotspotClick={setSelectedHotspot}
            />
          </Suspense>
          <Controls
            controlsRef={controlsRef}
            onZoomChange={(newFov) => {
              // Only sync if the difference is significant to avoid state loops
              if (Math.abs(newFov - fov) > 0.1) {
                setFov(newFov);
              }
            }}
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
              import Image from "next/image"; // Add to imports

              // ...

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

            <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-4 leading-tight">{selectedHotspot.title}</h3>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
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
      <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white/30 text-[10px] uppercase tracking-widest font-bold z-10 hidden lg:flex">
        <div className="w-8 h-[1px] bg-white/20"></div>
        <span>Drag to explore</span>
        <div className="w-2 h-2 rounded-full bg-white/20"></div>
        <span>Scroll to zoom</span>
        <div className="w-2 h-2 rounded-full bg-white/20"></div>
        <span>Click hotspots</span>
      </div>


    </div>
  );
}




