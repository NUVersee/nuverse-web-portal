// eslint-disable-next-line @typescript-eslint/no-unused-expressions
`use client`;

import { Mail, Rotate3D, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

type HeroProps = {
  onStart360Tour: () => void;
};

export function Hero({ onStart360Tour }: HeroProps) {
  const handleRequestVR = () => {
    const section = document.getElementById("contact");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
              <Sparkles size={16} />
              <span className="text-sm">Welcome to the Future of Education</span>
            </div>
            <h1 className="text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Experience Nile University in Virtual Reality
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Explore our cutting-edge labs, interact with AI professors, and get admission guidance through immersive VR technology. Step into the future of education from anywhere in the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onStart360Tour}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 hover:scale-105 transform"
              >
                View 360° Tour
                <Rotate3D size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              </button>
              <button
                onClick={handleRequestVR}
                className="group bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 px-8 py-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 flex items-center gap-2 hover:scale-105 transform"
              >
                Request VR Access
                <Mail size={20} className="group-hover:rotate-12 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Daily Tours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">4</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">VR Labs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI Support</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-delay">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1548131089-d5d36b219767?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjUxMzczNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="VR Education Experience"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20"></div>
            </div>

            <div className="absolute -top-6 -left-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-2xl animate-float hidden md:block">
              <p className="text-sm opacity-90">Immersive</p>
              <p>VR Experience</p>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-2xl animate-float-delay hidden md:block">
              <p className="text-3xl">360°</p>
              <p className="text-sm opacity-90">Campus View</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

