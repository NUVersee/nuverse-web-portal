"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-50px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const services = [
    {
      icon: FlaskConical,
      title: "Virtual Labs",
      description:
        "Step into our state-of-the-art virtual laboratories. Conduct circuits and chemistry experiments safely in an interactive way.",
      detailDesc: "Explore our state-of-the-art virtual laboratories including circuits and chemistry labs. Conduct experiments safely, learn with interactive equipment, and master laboratory techniques in an immersive VR environment.",
      rightText: "You can do your experiment safely and in an interactive way.",
      image: "/Images/virtual lab.webp",
      gallery: ["/Images/virtual lab2.webp", "/Images/virtual lab3.webp"],
      features: ["Circuits Lab", "Chemistry Lab", "Interactive Simulations", "Safe Virtual Environment"],
      onClick: onOpenLabs,
      hasDetailView: false,
    },
    {
      icon: Brain,
      title: "AI Professor",
      description:
        "Get instant answers and guidance from our AI professor, available 24/7 to support your academic path.",
      detailDesc: "Our AI Professor is available 24/7 to answer your questions and guide your academic path. Get personalized guidance, ask questions in real-time, and receive expert advice tailored to your academic journey.",
      rightText: "Receive answers and explanations from an expert AI.",
      image: "/Images/AI Professor.webp",
      gallery: ["/Images/AI Professor2.webp", "/Images/AI Professor3.webp"],
      features: ["Personalized Learning", "Interactive Q&A" , "24/7 Availability"],
      onClick: onOpenAIProfessor,
      hasDetailView: false,
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
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            <Sparkles className="text-nu-peach-300" size={20} />
            <span className="ml-2">IMMERSIVE EXPERIENCES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white mb-6 leading-tight"
            style={{ fontFamily: 'RostexDisplay, sans-serif' }}
          >
            VR <span className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white mb-6 leading-tight">SERVICES</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
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
