"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

type AIProfessorViewerProps = {
  onClose: () => void;
};

export function AIProfessorViewer({ onClose }: AIProfessorViewerProps) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const title = "AI Professor";
  const detailDesc = "Inside the VR experience, you can interact with the AI Professor as if you are engaging with a real academic guide on campus. Through immersive conversation, the AI Professor introduces the fundamentals of each major, explains core subjects and practical components, and demonstrates how theoretical knowledge is applied in real-world scenarios. With unlimited interaction, it helps you explore your interests, understand the skills you will develop, and confidently choose the academic path that best suits your goals—all within a fully immersive virtual environment.";
  const gallery = [
    "/Images/AI Professor.webp",
    "/Images/AI Professor2.webp",
    "/Images/AI Professor3.webp",
  ];

  return (
    <section className="relative min-h-screen bg-nu-deep text-white overflow-hidden">
      {/* Background accents */}
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

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-8 left-8 z-50 flex items-center gap-3 bg-white/10 border border-white/20 text-white px-4 py-3 rounded-full hover:bg-white/20 transition-all"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        aria-label="Close"
      >
        <ArrowLeft size={28} />
      </button>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto flex gap-12 px-8 pt-24 pb-12">
        {/* Left - Sticky info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-[0_0_400px] min-h-[60vh] flex flex-col justify-start sticky top-24"
        >
          <h1
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent uppercase tracking-tight"
            style={{ fontFamily: "RostexDisplay, sans-serif" }}
          >
            {title}
          </h1>
          <p
            className="text-lg text-gray-300 mb-10 leading-relaxed"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            {detailDesc}
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              onClose();
              setTimeout(() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }, 300);
            }}
            className="inline-block px-10 py-4 bg-gradient-to-r from-[#b6192e] to-[#ff4b2b] text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all text-center"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Request a Virtual Reality Tour
          </button>
        </motion.div>

        {/* Right - Scrollable gallery */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 min-h-[70vh] overflow-y-auto py-4 px-1 scrollbar-hide"
        >

          <div className="space-y-12">
            {gallery.map((img, idx) => (


              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.08 }}
                className="w-full"
              >
                <Image
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto rounded-2xl shadow-2xl hover:scale-102 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

