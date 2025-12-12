// eslint-disable-next-line @typescript-eslint/no-unused-expressions
`use client`;

import { Zap, Brain, FlaskConical, Globe, Smartphone, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

type AboutProps = {
  onOpenLabs?: () => void;
  onOpenAIProfessor?: () => void;
  onStart360Tour?: () => void;
};

export function About({ onOpenLabs, onOpenAIProfessor, onStart360Tour }: AboutProps) {
  const features = [
    {
      icon: Globe,
      title: "VR Campus Exploration",
      description: "Walk through every building, courtyard, and facility at your own pace. Guided or free navigation—you're in control.",
    },
    {
      icon: Brain,
      title: "AI Professor",
      description: "Meet our intelligent faculty advisors. Ask about programs, get explanations, and personalized guidance instantly.",
    },
    {
      icon: FlaskConical,
      title: "Virtual Lab Experiments",
      description: "Step into our circuits and chemistry labs. Conduct experiments safely and master techniques in a risk-free environment.",
    },
    {
      icon: Zap,
      title: "360° Web Preview",
      description: "Not ready for VR? Explore an interactive 360° campus tour directly on our website at your own pace.",
    },
    {
      icon: Smartphone,
      title: "Mobile Companion",
      description: "Faculty profiles, clubs, campus maps, event schedules, and your tour history—all in your pocket.",
    },
    {
      icon: MessageCircle,
      title: "24/7 Chatbot Assistant",
      description: "Questions about admission, programs, or facilities? Our AI admission officer is always ready to help.",
    },
  ];

  const benefits = [
    { title: "Accessibility", description: "Explore from anywhere, anytime. No passport required." },
    { title: "Informed Decisions", description: "See your future faculty before committing. Understand NU's unique environment." },
    { title: "Reduced Anxiety", description: "New and international students gain confidence before arrival." },
    { title: "Innovation Leadership", description: "Positions Nile University as a tech-forward institution." },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 dark:text-white mb-4">Step Into Your Future — Virtually</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            NUVerse is an AI-driven VR experience that transforms how students explore Nile University. Whether you're across the city or across the globe, walk through our campus, meet our AI professors, and discover your future—all from your device.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1622979135225-cc51b489b2e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsIHJlYWxpdHklMjBmdXR1cmV8ZW58MXx8fHwxNzY1Mzc3MDcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="NUVerse Vision - Futuristic VR Campus"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* What is NUVerse */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-gray-900 dark:text-white text-2xl font-semibold">What is NUVerse?</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-gray-900 dark:text-white font-semibold mb-2">The Problem We Solve</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Students can't always visit campus. Distance, schedules, mobility challenges, and time zones create barriers. Prospective students arrive unprepared. Admission teams struggle during peak seasons.
                </p>
              </div>
              
              <div>
                <h4 className="text-gray-900 dark:text-white font-semibold mb-2">Our Solution</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  NUVerse bridges the gap with an intelligent, immersive virtual campus. Explore in real-time, ask an AI professor anything, and experience Nile University before you arrive.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1592478095621-f9e8d57d5533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsIHJlYWxpdHklMjBoZWFkc2V0fGVufDF8fHx8MTc2NTM3NzAzMnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="VR Technology"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h3 className="text-gray-900 dark:text-white text-2xl font-semibold mb-4">Experience NUVerse</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore comprehensive features designed to transform your campus experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-xl w-fit mb-4 shadow-lg">
                  <Icon className="text-white" size={28} />
                </div>
                <h4 className="text-gray-900 dark:text-white font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why NUVerse Matters */}
      <div className="max-w-7xl mx-auto mb-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12">
        <h3 className="text-gray-900 dark:text-white text-2xl font-semibold mb-12 text-center">Why NUVerse Matters</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
              </div>
              <div>
                <h4 className="text-gray-900 dark:text-white font-semibold mb-2">{benefit.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How Students Use NUVerse */}
      <div className="max-w-7xl mx-auto mb-20">
        <h3 className="text-gray-900 dark:text-white text-2xl font-semibold mb-12 text-center">How Students Use NUVerse</h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-l-4 border-blue-600">
            <h4 className="text-gray-900 dark:text-white font-semibold mb-3 flex items-center gap-2">
              <span className="text-blue-600 text-xl">📚</span> Before Applying
            </h4>
            <p className="text-gray-600 dark:text-gray-400 italic mb-4">
              "I explored the campus, talked to the AI professor, and knew Engineering was my path."
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Make informed decisions before commitment</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-l-4 border-purple-600">
            <h4 className="text-gray-900 dark:text-white font-semibold mb-3 flex items-center gap-2">
              <span className="text-purple-600 text-xl">🎯</span> During Events
            </h4>
            <p className="text-gray-600 dark:text-gray-400 italic mb-4">
              "Our ambassadors brought VR tours to EduGate. No logistics needed. Pure impact."
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Scale outreach across events effortlessly</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-l-4 border-green-600">
            <h4 className="text-gray-900 dark:text-white font-semibold mb-3 flex items-center gap-2">
              <span className="text-green-600 text-xl">✨</span> After Admission
            </h4>
            <p className="text-gray-600 dark:text-gray-400 italic mb-4">
              "I walked my dorm building, found the library, and felt ready for day one."
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Start campus life with confidence</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center shadow-2xl">
          <h3 className="text-2xl font-semibold mb-4">Ready to Explore?</h3>
          <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
            Step into your future with NUVerse. Experience Nile University like never before.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={onStart360Tour}
              className="group bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start VR Tour
            </button>
            <button
              onClick={onOpenAIProfessor}
              className="group border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Meet AI Professor
            </button>
            <button
              onClick={onOpenLabs}
              className="group border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Explore Labs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
