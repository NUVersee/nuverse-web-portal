"use client";

import { Zap, Brain, FlaskConical, Globe, Sparkles, Check } from "lucide-react";

type AboutProps = {
  onOpenLabs?: () => void;
  onOpenAIProfessor?: () => void;
  onStart360Tour?: () => void;
};

/**
 * About Component
 * 
 * Provides an overview of the NUVerse platform, its features, and benefits.
 * Highlights the value of immersive VR experiences for prospective and current students.
 * 
 * @param {AboutProps} props - Component properties.
 * @param {() => void} props.onOpenLabs - Callback to open the labs viewer.
 * @param {() => void} props.onOpenAIProfessor - Callback to open the AI professor viewer.
 * @param {() => void} props.onStart360Tour - Callback to start the 360 tour.
 * @returns {JSX.Element} The about section.
 */
export function About({ onOpenLabs, onOpenAIProfessor, onStart360Tour }: AboutProps) {
  const features = [
    {
      icon: Globe,
      title: "360° Campus Tour",
      description: "Explore every corner of Nile University from anywhere in the world",
    },
    {
      icon: Brain,
      title: "AI Professors",
      description: "Get instant answers and personalized guidance from AI faculty experts",
    },
    {
      icon: FlaskConical,
      title: "Virtual Labs",
      description: "Conduct safe experiments in chemistry and physics laboratories",
    },
    {
      icon: Zap,
      title: "Interactive Learning",
      description: "Engage with immersive educational experiences in VR",
    },
  ];

  const benefits = [
    "Explore from anywhere, anytime",
    "Make informed decisions before applying",
    "Reduce anxiety for new students",
    "Experience cutting-edge technology",
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800 mb-6">
            <Sparkles className="text-blue-600 dark:text-blue-400" size={20} />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              ABOUT NUVERSE
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Step Into Your <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Future</span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            NUVerse is an AI-driven VR experience that transforms how students explore Nile University.
            Walk through our campus, meet AI professors, and discover your future—all from your device.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-2xl w-fit mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 mb-20 border border-blue-100 dark:border-gray-700">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose NUVerse?
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <Check className="text-white" size={18} />
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border-l-4 border-blue-500">
                <p className="text-gray-600 dark:text-gray-400 italic mb-2">
                  "I explored the campus, talked to the AI professor, and knew Engineering was my path."
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 font-semibold">— Prospective Student</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border-l-4 border-purple-500">
                <p className="text-gray-600 dark:text-gray-400 italic mb-2">
                  "The virtual labs helped me understand complex concepts before even starting classes."
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 font-semibold">— Current Student</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Explore?</h3>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              Experience Nile University like never before with our immersive virtual platform
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={onStart360Tour}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start 360° Tour
              </button>
              <button
                onClick={onOpenAIProfessor}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Meet AI Professor
              </button>
              <button
                onClick={onOpenLabs}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Explore Labs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
