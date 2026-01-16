"use client";

import { useRef } from "react";
import { Mail, Rotate3D, Sparkles, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  /**
   * Smoothly scrolls the window to the contact section when triggered.
   */
  const handleRequestVR = () => {
    const section = document.getElementById("contact");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[90vh] flex items-center pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-nu-blue-500/10 rounded-full blur-[120px] animate-pulse"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-nu-red-500/10 rounded-full blur-[120px] animate-pulse delay-700"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          className="absolute bottom-[0%] left-[20%] w-[30%] h-[30%] bg-nu-peach-300/10 rounded-full blur-[120px] animate-pulse delay-1000"
        />

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-black/20 opacity-40 contrast-150 transition-colors"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-10"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 bg-white/10 dark:bg-nu-dark/80 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full shadow-2xl"
            >
              <div className="flex -space-x-2">
                {[
                  { bg: "bg-nu-red-500" },
                  { bg: "bg-nu-blue-400" },
                  { bg: "bg-nu-peach-300" }
                ].map((avatar, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full border-2 border-nu-dark ${avatar.bg} shadow-lg`}
                  ></div>
                ))}
              </div>
              <span className="text-sm font-black text-white/90 uppercase tracking-[0.1em] transition-colors">
                JOIN <span className="text-nu-red-500">500+</span> STUDENTS ALREADY EXPLORING
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                variants={itemVariants}
                className="section-h1 text-white"
              >
                Step Into <br />the Future of <br />
                <span className="gradient-text bg-gradient-to-r from-[#121521] via-[#38476b] via-[#b6192e] to-[#ffc1ac] bg-clip-text text-transparent">
                  Digital Reality
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-gray-400 text-xl leading-relaxed max-w-xl"
              >
                Experience Nile University through a cutting-edge 360° virtual
                lens. Explore labs, meet AI professors, and find your future
                home in VR.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
              <motion.button
                onClick={onStart360Tour}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group btn-primary flex items-center gap-3 overflow-hidden"
              >
                <span className="relative flex items-center gap-2">
                  Launch 360° Tour
                  <Rotate3D
                    size={22}
                    className="group-hover:rotate-180 transition-transform duration-700"
                  />
                </span>
              </motion.button>

              <motion.button
                onClick={handleRequestVR}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group btn-outline flex items-center gap-3 shadow-sm"
              >
                Request VR Kit
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-12 pt-4"
            >
              {[
                { label: "High-Res", value: "4K" },
                { label: "Interactive Labs", value: "12+" },
                { label: "AI Support", value: "24/7" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-3xl font-black text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-nu-blue-200">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative group perspective-1000 lg:-mt-20"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative transition-transform duration-700 group-hover:scale-[1.02]"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-nu-red-500 to-nu-blue-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

              {/* Image Card */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-white/20 dark:border-gray-700/50">
                <ImageWithFallback
                  src="/Images/VR.png"
                  alt="VR Education Experience"
                  className="w-full h-auto object-cover aspect-[4/3] scale-110"
                />
              </div>
            </motion.div>

            {/* NUVersee Title - Below Image, Smaller, Static Navy Blue */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="relative mt-6 z-20 text-center"
            >
              <h2
                className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-[#38476b]"
                style={{
                  fontFamily: 'var(--font-display)',
                }}
              >
                NUVersee
              </h2>
            </motion.div>

            {/* Floating bits */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-12 -right-8 w-24 h-24 bg-gradient-to-br from-[#b6192e] to-[#ffc1ac] rounded-3xl opacity-20 blur-xl"
            />
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-nu-blue-500 to-nu-red-500 rounded-full opacity-20 blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
