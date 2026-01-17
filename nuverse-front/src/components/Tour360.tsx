"use client";

import { Info, Maximize2, Navigation, Rotate3D, Sparkles } from "lucide-react";
import { Carousel3D } from "./Carousel3D";

type Tour360Props = {
  onStart360Tour: (indexOrUrl?: number | string) => void;
};

/**
 * Tour360 Component
 * 
 * An informational section that introduces the 360-degree virtual tour feature.
 * Features a 3D Draggable Carousel to replicate the legacy VR motion experience.
 * 
 * @param {Tour360Props} props - Component properties.
 * @param {(indexOrUrl?: number | string) => void} props.onStart360Tour - Callback to launch the 360 tour.
 * @returns {JSX.Element} The tour introduction section.
 */
export function Tour360({ onStart360Tour }: Tour360Props) {
  return (
    <section id="360-tour" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nu-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-nu-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nu-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="badge mb-6">
            <Rotate3D size={20} />
            <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>360° Virtual Experience</span>
          </div>
          <h2 className="section-h1 text-gray-900 dark:text-white mb-4 uppercase" style={{ fontFamily: 'RostexDisplay, sans-serif' }}>
            Experience in <span className="gradient-text bg-gradient-to-r from-[#121521] via-[#38476b] via-[#2d3a5a] to-[#1a2137] bg-clip-text text-transparent gap-2 flex items-center justify-center">360° Vision</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Immerse yourself in a complete virtual tour of Nile University. Drag the carousel to explore, and click to enter the 360° view.
          </p>
        </div>

        {/* 3D Carousel Section */}
        <div className="w-full relative z-20 mb-20 fade-in-up">
          <Carousel3D onStartTour={onStart360Tour} />
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="group bg-nu-dark/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-[#b6192e] to-[#ffc1ac] p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Navigation className="text-white" size={28} />
              </div>
              <div>
                <h4 className="text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Navigate Freely</h4>
                <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Move through campus at your own pace. Click and drag to look around, zoom in on details, and explore every corner.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-nu-dark/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-lg hover:shadow-nu-red-500/10 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-nu-red-500 to-nu-red-700 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Info className="text-white" size={28} />
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-tight mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Interactive Hotspots</h4>
                <p className="text-white/60 text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Click on hotspots to learn more about facilities, view additional images, and access detailed information.
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-nu-dark/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-lg hover:shadow-nu-blue-500/10 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-nu-blue-500 to-nu-blue-700 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Rotate3D className="text-white" size={28} />
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-tight mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Full 360° View</h4>
                <p className="text-white/60 text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Experience complete panoramic views of classrooms, labs, libraries, sports facilities, and outdoor spaces.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

