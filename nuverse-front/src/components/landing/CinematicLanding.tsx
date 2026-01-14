"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import { ChapterOverlay } from "./ChapterOverlay";
import { ProgressBar } from "./ProgressBar";
import { ScrollIndicator } from "./ScrollIndicator";

// Dynamically import the 3D scene to avoid SSR issues
const VRHeadsetScene = dynamic(
    () => import("./VRHeadsetScene").then((mod) => mod.VRHeadsetScene),
    { ssr: false }
);

interface CinematicLandingProps {
    onComplete: () => void;
}

export function CinematicLanding({ onComplete }: CinematicLandingProps) {
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Use a motion value for scroll progress that we control manually
    const scrollProgress = useMotionValue(0);

    // Track if we should show scroll indicator
    const showScrollIndicator = useTransform(
        scrollProgress,
        [0, 0.05],
        [1, 0]
    );

    // Fade overlay for end transition
    const endOpacity = useTransform(scrollProgress, [0.9, 1], [0, 1]);

    // Handle start button click
    const handleStart = useCallback(() => {
        setStarted(true);
        try {
            const audio = new Audio("/sounds/intro_sound.mp3");
            audio.volume = 0.4;
            audioRef.current = audio;
            audio.play().catch(e => console.warn("Audio playback failed:", e));
        } catch (error) {
            console.error("Error initializing audio:", error);
        }
    }, []);

    // Handle scroll manually to update progress
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!started || completed) return;

        const handleScroll = () => {
            if (!containerRef.current) return;

            const scrollTop = window.scrollY;
            const scrollHeight = containerRef.current.scrollHeight - window.innerHeight;
            const progress = Math.min(scrollTop / scrollHeight, 1);

            scrollProgress.set(progress);

            // Audio Fade out near end
            if (progress > 0.8 && audioRef.current) {
                const volume = Math.max(0, 0.4 - (progress - 0.8) * 2);
                audioRef.current.volume = volume;
            }

            // Handle completion
            if (progress > 0.98 && !completed) {
                setCompleted(true);
                if (audioRef.current) {
                    audioRef.current.pause();
                }

                // Smooth scroll to top (Hero) after delay
                setTimeout(() => {
                    onComplete();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 1500);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [started, completed, scrollProgress, onComplete]);

    return (
        <>
            {/* Start Screen */}
            <AnimatePresence>
                {!started && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 z-[100] bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl md:text-6xl font-black mb-4 text-white uppercase tracking-tighter">
                                NU<span className="text-nu-red-500">verse</span> VR
                            </h1>
                            <p className="text-sm text-gray-500 tracking-[0.3em] uppercase mb-12">
                                Headphones Recommended
                            </p>
                            <motion.button
                                onClick={handleStart}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 border border-nu-red-500/30 text-white rounded-full uppercase tracking-[0.2em] text-sm font-black transition-all hover:bg-nu-red-500/10 hover:border-nu-red-500 hover:shadow-[0_0_30px_rgba(182,25,46,0.2)]"
                            >
                                Enter Experience
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Landing Experience */}
            {started && (
                <>
                    {/* Dark gradient background */}
                    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black z-0" />

                    {/* 3D Scene */}
                    <VRHeadsetScene scrollProgress={scrollProgress} />

                    {/* Progress Bar */}
                    <ProgressBar scrollProgress={scrollProgress} />

                    {/* Chapter Overlays */}
                    <ChapterOverlay scrollProgress={scrollProgress} />

                    {/* Scroll Indicator */}
                    <motion.div style={{ opacity: showScrollIndicator }}>
                        <ScrollIndicator visible={true} />
                    </motion.div>

                    {/* Scroll Container (creates scroll height) */}
                    <div ref={containerRef} className="relative z-10 h-[500vh]" />

                    {/* End Transition Overlay */}
                    <motion.div
                        style={{ opacity: endOpacity }}
                        className="fixed inset-0 z-[90] bg-black pointer-events-none flex items-center justify-center"
                    >
                        <motion.div className="text-center">
                            <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-nu-blue-500 to-nu-red-500 bg-clip-text text-transparent mb-6 uppercase">
                                Welcome to NUverse
                            </h2>
                            <div className="w-12 h-12 border-4 border-nu-red-500/20 border-t-nu-red-500 rounded-full animate-spin mx-auto" />
                        </motion.div>
                    </motion.div>
                </>
            )}
        </>
    );
}
