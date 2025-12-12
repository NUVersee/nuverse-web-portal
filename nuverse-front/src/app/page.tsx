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

export default function Home() {
  const [showTour360, setShowTour360] = useState(false);
  const [showLabs, setShowLabs] = useState(false);
  const [showAIProfessor, setShowAIProfessor] = useState(false);

  return (
    <>
      {showTour360 ? (
        <Tour360Viewer onClose={() => setShowTour360(false)} />
      ) : showLabs ? (
        <LabsViewer onClose={() => setShowLabs(false)} />
      ) : showAIProfessor ? (
        <AIProfessorViewer onClose={() => setShowAIProfessor(false)} />
      ) : (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Header />
          <Hero onStart360Tour={() => setShowTour360(true)} />
          <Tour360 onStart360Tour={() => setShowTour360(true)} />
          <Services onOpenLabs={() => setShowLabs(true)} onOpenAIProfessor={() => setShowAIProfessor(true)} />
          <Contact />
          <Footer />
          <ChatbotButton />
        </div>
      )}
    </>
  );
}
