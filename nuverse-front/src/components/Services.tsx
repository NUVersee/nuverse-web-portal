"use client";

import { useRef } from "react";
import { Brain, FlaskConical, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { ServiceCard } from "./ServiceCard";

type ServicesProps = {
  onOpenLabs?: () => void;
  onOpenAIProfessor?: () => void;
  onStartTour?: () => void;
};

/**
 * Services Component
 *
 * Displays the VR services offered by Nile University, including virtual labs and AI professors.
 * Includes call-to-action buttons to open specific viewers or sections.
 *
 * @param {ServicesProps} props - Component properties.
 * @param {() => void} props.onOpenLabs - Callback to open the labs viewer.
 * @param {() => void} props.onOpenAIProfessor - Callback to open the AI professor viewer.
 * @param {() => void} props.onStartTour - Callback to start the 360 tour.
 * @returns {JSX.Element} The services section.
 */
export function Services({ onOpenLabs, onOpenAIProfessor, onStartTour }: ServicesProps) {
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const statsRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-50px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

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
    {
      icon: Sparkles,
      title: "360 Campus Tour",
      description:
        "Embark on a high-definition 360-degree virtual journey through Nile University. Visit our modern campus, state-of-the-art facilities, and vibrant student spaces from the comfort of your home.",
      image: "/Images/immersive vr.png",
      features: ["360° Panorama", "Guided Navigation", "Mobile Friendly", "Virtual Reality Ready"],
      onClick: onStartTour,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-nu-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-nu-red-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="badge mb-6"
          >
            <Sparkles className="text-nu-peach-300" size={20} />
            <span className="ml-2">IMMERSIVE EXPERIENCES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Our VR <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-6 leading-tight">Services</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Discover how our virtual reality platform brings Nile University closer to you with immersive, interactive experiences that redefine learning.
          </motion.p>
        </motion.div>

        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          className="flex overflow-x-auto gap-8 pb-12 px-4 snap-x snap-mandatory custom-scrollbar"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="min-w-[300px] md:min-w-[400px] snap-center"
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
