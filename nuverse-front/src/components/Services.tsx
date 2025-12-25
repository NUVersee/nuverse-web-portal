"use client";

import { Brain, FlaskConical, Sparkles } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

type ServicesProps = {
  onOpenLabs?: () => void;
  onOpenAIProfessor?: () => void;
};

export function Services({ onOpenLabs, onOpenAIProfessor }: ServicesProps) {
  const services = [
    {
      icon: FlaskConical,
      title: "Lab Experiments",
      description:
        "Explore our state-of-the-art virtual laboratories including circuits and chemistry labs. Conduct experiments safely, learn with interactive equipment, and master laboratory techniques in an immersive VR environment.",
      image:
        "https://images.unsplash.com/photo-1631106321638-d94d9a8f3e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaXN0cnklMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc2NTIwODgyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Circuits Lab", "Chemistry Lab", "Interactive Simulations", "Safe Virtual Environment"],
      onClick: onOpenLabs,
    },
    {
      icon: Brain,
      title: "AI Professor",
      description:
        "Meet our AI-powered virtual professors across different faculties. Get personalized guidance, ask questions in real-time, and receive expert advice tailored to your academic journey and learning style.",
      image:
        "https://images.unsplash.com/photo-1625314887424-9f190599bd56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcm9ib3R8ZW58MXx8fHwxNzY1MTY4MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["4 Faculty Experts", "Personalized Learning", "24/7 Availability", "Interactive Q&A"],
      onClick: onOpenAIProfessor,
    },
  ];

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/5 rounded-full blur-3xl animate-float-delay"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800 mb-6">
            <Sparkles className="text-blue-600 dark:text-blue-400" size={20} />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              IMMERSIVE EXPERIENCES
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Our VR <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Services</span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover how our virtual reality platform brings Nile University closer to you with immersive, interactive experiences that redefine learning.
          </p>
        </div>

        {/* Service Cards with stagger animation */}
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { value: "12+", label: "Virtual Labs" },
            { value: "4", label: "AI Professors" },
            { value: "360°", label: "Campus Tour" },
            { value: "24/7", label: "Availability" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
