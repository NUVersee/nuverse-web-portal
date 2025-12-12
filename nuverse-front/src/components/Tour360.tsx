// eslint-disable-next-line @typescript-eslint/no-unused-expressions
`use client`;

import { Info, Maximize2, Navigation, Rotate3D, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

type Tour360Props = {
  onStart360Tour: () => void;
};

export function Tour360({ onStart360Tour }: Tour360Props) {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 transition-colors overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full mb-6 shadow-lg animate-bounce-slow">
            <Rotate3D size={20} />
            <span>360° Virtual Experience</span>
          </div>
          <h2 className="text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Explore Campus in 360°
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Immerse yourself in a complete virtual tour of Nile University. Navigate through campus, explore facilities, and experience student life from every angle.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-500">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1605221011656-10dff4f1549b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwcGFub3JhbWljfGVufDF8fHx8MTc2NTIwOTczMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="360 Campus Tour"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-full shadow-2xl transform group-hover:scale-110 transition-transform duration-500 group-hover:rotate-180">
                  <Rotate3D className="text-white" size={56} />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="animate-pulse" />
                  <p className="text-sm opacity-90">Interactive 360° Tour Available</p>
                </div>
                <h3>Nile University Campus</h3>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-xl hidden lg:block animate-float">
              <div className="flex items-center gap-3">
                <Maximize2 size={24} />
                <div>
                  <p className="text-sm">Full Screen</p>
                  <p className="text-xs opacity-90">Available</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Navigation className="text-white" size={28} />
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white mb-2">Navigate Freely</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Move through campus at your own pace. Click and drag to look around, zoom in on details, and explore every corner.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Info className="text-white" size={28} />
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white mb-2">Interactive Hotspots</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click on hotspots to learn more about facilities, view additional images, and access detailed information.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Rotate3D className="text-white" size={28} />
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white mb-2">Full 360° View</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Experience complete panoramic views of classrooms, labs, libraries, sports facilities, and outdoor spaces.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onStart360Tour}
              className="group w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              <Rotate3D size={24} className="group-hover:rotate-180 transition-transform duration-500" />
              Start 360° Tour
            </button>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            { name: "Main Campus", icon: "🏛️", gradient: "from-blue-500 to-cyan-500" },
            { name: "Library", icon: "📚", gradient: "from-purple-500 to-pink-500" },
            { name: "Labs", icon: "🔬", gradient: "from-green-500 to-emerald-500" },
            { name: "Sports Complex", icon: "⚽", gradient: "from-orange-500 to-red-500" },
          ].map((location, index) => (
            <div
              key={index}
              onClick={onStart360Tour}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-600"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">{location.icon}</div>
              <h4 className="text-gray-900 dark:text-white">{location.name}</h4>
              <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${location.gradient} rounded-full mx-auto mt-3 transition-all duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

