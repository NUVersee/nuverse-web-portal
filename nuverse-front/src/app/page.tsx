"use client";

import { useState } from "react";
import { AIProfessorViewer } from "@/components/AIProfessorViewer";
import { ChatbotButton } from "@/components/ChatbotButton";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LabsViewer } from "@/components/LabsViewer";
import { Services } from "@/components/Services";
import { Tour360 } from "@/components/Tour360";
import { Tour360Viewer } from "@/components/Tour360Viewer";
import { About } from "@/components/About";

export default function Home() {
  const [showTour360, setShowTour360] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [showLabs, setShowLabs] = useState(false);
  const [showAIProfessor, setShowAIProfessor] = useState(false);

  const startTour = (index: number = 0) => {
    setTourIndex(index);
    setShowTour360(true);
  };

  return (
    <>
      {showTour360 ? (
        <Tour360Viewer onClose={() => setShowTour360(false)} initialIndex={tourIndex} />
      ) : showLabs ? (
        <LabsViewer onClose={() => setShowLabs(false)} />
      ) : showAIProfessor ? (
        <AIProfessorViewer onClose={() => setShowAIProfessor(false)} />
      ) : (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Header />
          <Hero onStart360Tour={() => startTour(0)} />
          <About
            onStart360Tour={() => startTour(0)}
            onOpenLabs={() => setShowLabs(true)}
            onOpenAIProfessor={() => setShowAIProfessor(true)}
          />
          <Tour360 onStart360Tour={(index) => startTour(index)} />
          <Services onOpenLabs={() => setShowLabs(true)} onOpenAIProfessor={() => setShowAIProfessor(true)} />
          <Contact />
          <Footer />
          <ChatbotButton />
        </div>
      )}
    </>
  );
}
