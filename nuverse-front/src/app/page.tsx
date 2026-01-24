"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { AIProfessorViewer } from "@/components/AIProfessorViewer";
import { ChatbotButton } from "@/components/ChatbotButton";
import { Contact } from "@/components/RequestTour";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LabsViewer } from "@/components/LabsViewer";
import { Services } from "@/components/Services";
import { Tour360 } from "@/components/Tour360";
import { Tour360Viewer } from "@/components/Tour360Viewer";
import { About } from "@/components/About";

// Dynamically import CinematicLanding to avoid SSR issues
const CinematicLanding = dynamic(
  () => import("@/components/landing").then((mod) => mod.CinematicLanding),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-nu-red-500/20 border-t-nu-red-500 rounded-full animate-spin" />
      </div>
    ),
  }
);

export default function Home() {
  const [showLanding, setShowLanding] = useState(false);
  const [showTour360, setShowTour360] = useState(false);
  const [tourIndex, setTourIndex] = useState<number | string>(0);
  const [showLabs, setShowLabs] = useState(false);
  const [showAIProfessor, setShowAIProfessor] = useState(false);

  useEffect(() => {
    const hasSeenLanding = sessionStorage.getItem("nuverse-landing-seen");
    if (!hasSeenLanding) {
      setShowLanding(true);
    }
  }, []);

  const handleLandingComplete = () => {
    sessionStorage.setItem("nuverse-landing-seen", "true");
    setShowLanding(false);
  };

  const startTour = (index: number | string = 0) => {
    setTourIndex(index);
    setShowTour360(true);
  };

  // Show landing experience
  if (showLanding) {
    return <CinematicLanding onComplete={handleLandingComplete} />;
  }

  return (
    <AnimatePresence mode="wait">
      {showTour360 ? (
        <motion.div
          key="tour360"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Tour360Viewer onClose={() => setShowTour360(false)} initialIndex={tourIndex} />
        </motion.div>
      ) : showLabs ? (
        <motion.div
          key="labs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LabsViewer onClose={() => setShowLabs(false)} />
        </motion.div>
      ) : showAIProfessor ? (
        <motion.div
          key="aiprofessor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AIProfessorViewer onClose={() => setShowAIProfessor(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-nu-deep transition-colors pt-24"
        >
          <Header />
          <Hero onStart360Tour={() => startTour(0)} />
          <Tour360 onStart360Tour={(indexOrUrl) => startTour(indexOrUrl)} />
          <Services
            onOpenLabs={() => setShowLabs(true)}
            onOpenAIProfessor={() => setShowAIProfessor(true)}
            onStartTour={() => startTour(0)}
          />
          <Contact />
          <About
            onStart360Tour={() => startTour(0)}
            onOpenLabs={() => setShowLabs(true)}
            onOpenAIProfessor={() => setShowAIProfessor(true)}
          />
          <Footer />
          <ChatbotButton />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
