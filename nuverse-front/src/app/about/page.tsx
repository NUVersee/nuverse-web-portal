"use client";

import { useState } from "react";
import { AIProfessorViewer } from "@/components/AIProfessorViewer";
import { About } from "@/components/About";
import { ChatbotButton } from "@/components/ChatbotButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LabsOrchestrator } from "@/components/LabsOrchestrator";
import { Tour360Viewer } from "@/components/Tour360Viewer";

export default function AboutPage() {
  const [showTour360, setShowTour360] = useState(false);
  const [showLabs, setShowLabs] = useState(false);
  const [showAIProfessor, setShowAIProfessor] = useState(false);
  const [startTourIndex, setStartTourIndex] = useState<number | string>(0);

  return (
    <>
      {showTour360 ? (
        <Tour360Viewer onClose={() => setShowTour360(false)} initialIndex={startTourIndex} />
      ) : showLabs ? (
        <LabsOrchestrator onClose={() => setShowLabs(false)} />
      ) : showAIProfessor ? (
        <AIProfessorViewer onClose={() => setShowAIProfessor(false)} />
      ) : (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors pt-20">
          <Header />
          <About
            onStart360Tour={(index?: number | string) => {
              setStartTourIndex(index ?? 0);
              setShowTour360(true);
            }}
            onOpenLabs={() => setShowLabs(true)}
            onOpenAIProfessor={() => setShowAIProfessor(true)}
          />
          <Footer />
          <ChatbotButton />
        </div>
      )}
    </>
  );
}
