// eslint-disable-next-line @typescript-eslint/no-unused-expressions
`use client`;

import { ChevronLeft, ChevronRight, Home, Info, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "./ImageWithFallback";

type Hotspot = {
  x: number;
  y: number;
  title: string;
  description: string;
};

type Tour360Image = {
  id: number;
  title: string;
  image: string;
  hotspots: Hotspot[];
};

type Tour360ViewerProps = {
  onClose: () => void;
};

export function Tour360Viewer({ onClose }: Tour360ViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const tourImages: Tour360Image[] = [
    {
      id: 1,
      title: "Main Campus Entrance",
      image:
        "https://images.unsplash.com/photo-1605221011656-10dff4f1549b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwcGFub3JhbWljfGVufDF8fHx8MTc2NTIwOTczMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      hotspots: [
        { x: 25, y: 40, title: "Main Building", description: "Our iconic main building houses administrative offices and the grand auditorium." },
        { x: 60, y: 50, title: "Student Plaza", description: "Central meeting point for students with outdoor seating and WiFi." },
        { x: 80, y: 35, title: "Welcome Center", description: "Visitor information and admission office located here." },
      ],
    },
    {
      id: 2,
      title: "University Library",
      image:
        "https://images.unsplash.com/photo-1637455587265-2a3c2cbbcc84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMGludGVyaW9yfGVufDF8fHx8MTc2NTIwMTk2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      hotspots: [
        { x: 30, y: 30, title: "Reading Area", description: "Quiet study spaces with individual desks and comfortable seating." },
        { x: 55, y: 45, title: "Digital Resources", description: "Computer stations with access to online databases and research tools." },
        { x: 75, y: 40, title: "Book Collection", description: "Over 100,000 books across all academic disciplines." },
      ],
    },
    {
      id: 3,
      title: "Modern Lecture Hall",
      image:
        "https://images.unsplash.com/photo-1758413350815-7b06dbbfb9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsZWN0dXJlJTIwaGFsbHxlbnwxfHx8fDE3NjUxMzQ2ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      hotspots: [
        { x: 40, y: 25, title: "Smart Board", description: "Interactive displays with AI-powered teaching assistance." },
        { x: 50, y: 55, title: "Lecture Seating", description: "Ergonomic seating for 200+ students with built-in power outlets." },
        { x: 70, y: 40, title: "Audio System", description: "State-of-the-art sound system for crystal clear audio." },
      ],
    },
    {
      id: 4,
      title: "Science Laboratory",
      image:
        "https://images.unsplash.com/photo-1707944746620-fc0371b91906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjUyMTczNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      hotspots: [
        { x: 35, y: 50, title: "Lab Equipment", description: "Advanced microscopes, spectrometers, and analysis tools." },
        { x: 60, y: 45, title: "Safety Station", description: "Emergency eyewash, shower, and safety equipment readily available." },
        { x: 75, y: 35, title: "Work Benches", description: "Individual work stations with proper ventilation and utilities." },
      ],
    },
  ];

  const currentImage = tourImages[currentImageIndex];

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
    if (zoom <= 1.5) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      const maxX = (zoom - 1) * 400;
      const maxY = (zoom - 1) * 300;

      setPosition({
        x: Math.max(Math.min(newX, maxX), -maxX),
        y: Math.max(Math.min(newY, maxY), -maxY),
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tourImages.length);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setSelectedHotspot(null);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tourImages.length) % tourImages.length);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setSelectedHotspot(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) => (prev - 1 + tourImages.length) % tourImages.length);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
        setSelectedHotspot(null);
      }
      if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => (prev + 1) % tourImages.length);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
        setSelectedHotspot(null);
      }
      if (e.key === "ArrowUp") {
        setZoom((prev) => Math.min(prev + 0.5, 3));
      }
      if (e.key === "ArrowDown") {
        setZoom((prev) => {
          const next = Math.max(prev - 0.5, 1);
          if (next <= 1.5) {
            setPosition({ x: 0, y: 0 });
          }
          return next;
        });
      }
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, tourImages.length]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="bg-gray-900/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="text-white hover:bg-gray-800 p-2 rounded-lg transition-colors">
            <Home size={24} />
          </button>
          <div>
            <h2 className="text-white">{currentImage.title}</h2>
            <p className="text-sm text-gray-400">
              {currentImageIndex + 1} / {tourImages.length}
            </p>
          </div>
        </div>

        <button onClick={onClose} className="text-white hover:bg-gray-800 p-2 rounded-lg transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div
          ref={containerRef}
          className="w-full h-full flex items-center justify-center cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="relative transition-transform duration-200"
            style={{
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              transformOrigin: "center center",
            }}
          >
            <ImageWithFallback
              src={currentImage.image}
              alt={currentImage.title}
              className="max-w-full max-h-[85vh] object-contain select-none"
              draggable={false}
            />

            {zoom === 1 &&
              currentImage.hotspots.map((hotspot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedHotspot(hotspot)}
                  className="absolute w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg hover:scale-125 transition-transform animate-pulse"
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Info className="text-white w-4 h-4 mx-auto" />
                </button>
              ))}
          </div>
        </div>

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-800 text-white p-4 rounded-full transition-all hover:scale-110 shadow-xl"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-800 text-white p-4 rounded-full transition-all hover:scale-110 shadow-xl"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="bg-gray-900/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-t border-gray-700">
        <div className="flex items-center gap-4">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            className="text-white hover:bg-gray-800 p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ZoomOut size={24} />
          </button>
          <span className="text-white min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            className="text-white hover:bg-gray-800 p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ZoomIn size={24} />
          </button>
        </div>

        <div className="flex gap-2">
          {tourImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentImageIndex(index);
                setZoom(1);
                setPosition({ x: 0, y: 0 });
                setSelectedHotspot(null);
              }}
              className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? "bg-blue-600 w-8" : "bg-gray-600 hover:bg-gray-500"}`}
            />
          ))}
        </div>

        <div className="text-gray-400 text-sm">Use arrow keys or drag to navigate</div>
      </div>

      {selectedHotspot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedHotspot(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-gray-900 dark:text-white">{selectedHotspot.title}</h3>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedHotspot.description}</p>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

