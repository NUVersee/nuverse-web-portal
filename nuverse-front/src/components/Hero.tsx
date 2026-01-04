"use client";

import { Mail, Rotate3D, Sparkles, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

type HeroProps = {
  onStart360Tour: () => void;
};

/**
 * Hero Component
 * 
 * The initial landing section of the application.
 * Highlights the main value proposition, provides call-to-action buttons for the 360 tour
 * and VR kit request, and shows key platform stats.
 * 
 * @param {HeroProps} props - Component properties.
 * @param {() => void} props.onStart360Tour - Callback to trigger the 360 tour.
 * @returns {JSX.Element} The hero section.
 */
export function Hero({ onStart360Tour }: HeroProps) {
  /**
   * Smoothly scrolls the window to the contact section when triggered.
   */
  const handleRequestVR = () => {
    const section = document.getElementById("contact");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute bottom-[0%] left-[20%] w-[30%] h-[30%] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100 dark:opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/30 px-5 py-2.5 rounded-full shadow-xl">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-br from-blue-500 to-purple-500 shadow-sm"></div>
                ))}
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                JOIN 500+ STUDENTS ALREADY EXPLORING
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                Redefinition of <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Campus Learning
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed max-w-xl">
                Experience Nile University through a cutting-edge 360° virtual lens. Explore labs, meet AI professors, and find your future home in VR.
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              <button
                onClick={onStart360Tour}
                className="group relative bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:scale-110 transition-transform duration-500"></div>
                <span className="relative flex items-center gap-2">
                  Launch 360° Tour
                  <Rotate3D size={22} className="group-hover:rotate-180 transition-transform duration-700" />
                </span>
              </button>

              <button
                onClick={handleRequestVR}
                className="group px-10 py-5 rounded-2xl font-bold border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-300 flex items-center gap-3 hover:bg-white dark:hover:bg-gray-800 shadow-sm"
              >
                Request VR Kit
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-12 pt-4">
              {[
                { label: "High-Res", value: "4K" },
                { label: "Interactive Labs", value: "12+" },
                { label: "AI Support", value: "24/7" }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group perspective-1000">
            <div className="relative animate-float transition-transform duration-700 group-hover:scale-[1.02]">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-white/20 dark:border-gray-700/50">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1548131089-d5d36b219767?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjUxMzczNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="VR Education Experience"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />

                {/* Overlay card */}
                <div className="absolute bottom-6 left-6 right-6 glass dark:dark-glass p-6 rounded-2xl border border-white/20 dark:border-gray-700/30 transform transition-all duration-500 group-hover:translate-y-[-10px]">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-1">Live Beta</p>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Smart Admission Assistant</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                      <Sparkles size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating bits */}
            <div className="absolute -top-12 -right-8 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl animate-float-delay"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-full opacity-20 blur-xl animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

