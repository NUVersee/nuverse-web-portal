"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import { ChapterOverlay } from "./ChapterOverlay";
import { ProgressBar } from "./ProgressBar";

// Dynamically import the 3D scene to avoid SSR issues
const VRHeadsetScene = dynamic(
    () => import("./VRHeadsetScene").then((mod) => mod.VRHeadsetScene),
    { ssr: false }
);

interface CinematicLandingProps {
    onComplete: () => void;
}

// Duration of the auto-scroll experience in milliseconds
const EXPERIENCE_DURATION = 25000; // 25 seconds

export function CinematicLanding({ onComplete }: CinematicLandingProps) {
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    // Use a motion value for scroll progress that we control manually
    const scrollProgress = useMotionValue(0);

    // Fade overlay for end transition
    const endOpacity = useTransform(scrollProgress, [0.9, 1], [0, 1]);

    // Audio reference
    // Audio reference
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Pause control
    const isPausedRef = useRef(false);
    const pauseResumeTimeRef = useRef(0);
    const nextPauseIndex = useRef(0);
    // Stops at: 0.2 (Shot 1 end), 0.4 (Shot 2 end), 0.6 (Shot 3 end), 0.8 (Shot 4 end)
    const PAUSE_POINTS = [0.18, 0.38, 0.58, 0.78];
    const [showWelcome, setShowWelcome] = useState(false);

    // Disable scrolling when experience starts
    useEffect(() => {
        if (started && !completed) {
            // Disable scrolling
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [started, completed]);

    const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const startAutoScroll = useCallback(() => {
        let lastTime = performance.now();
        const duration = 25000;

        const animate = (currentTime: number) => {
            if (completed) return;

            if (isPausedRef.current) {
                if (currentTime >= pauseResumeTimeRef.current) {
                    isPausedRef.current = false;
                    lastTime = currentTime;
                } else {
                    animationRef.current = requestAnimationFrame(animate);
                    return;
                }
            }

            const delta = currentTime - lastTime;
            lastTime = currentTime;

            const currentProgress = scrollProgress.get();
            const increment = delta / duration;

            const nextProgress = Math.min(currentProgress + increment, 1);
            scrollProgress.set(nextProgress);

            if (nextProgress > 0.9 && audioRef.current) {
                audioRef.current.volume = Math.max(0, 0.4 * (1 - (nextProgress - 0.9) * 10));
            }

            if (nextPauseIndex.current < PAUSE_POINTS.length) {
                const target = PAUSE_POINTS[nextPauseIndex.current];
                if (currentProgress < target && nextProgress >= target) {
                    isPausedRef.current = true;
                    pauseResumeTimeRef.current = currentTime + 5000;
                    nextPauseIndex.current++;

                    scrollProgress.set(target);
                }
            }

            if (nextProgress >= 1) {
                if (!completed) {
                    setCompleted(true);
                    setShowWelcome(true);
                    if (audioRef.current) audioRef.current.pause();

                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';

                    setTimeout(() => {
                        onComplete();
                        window.scrollTo({ top: 0, behavior: 'instant' });
                    }, 3000);
                }
                return;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
    }, [completed, onComplete, scrollProgress, showWelcome]);

    const handleStart = useCallback(() => {
        setStarted(true);

        try {
            const audio = new Audio("/sounds/intro_sound.mp3");
            audio.volume = 0.4;
            audio.loop = true; // Loop audio to cover pauses
            audioRef.current = audio;
            audio.play().catch(e => console.warn("Audio playback failed:", e));
        } catch (error) {
            console.error("Error initializing audio:", error);
        }

        setTimeout(() => {
            startAutoScroll();
        }, 500);
    }, [startAutoScroll]);

    const handleSkip = useCallback(() => {
        scrollProgress.set(1);
        if (audioRef.current) {
            const fadeAudio = setInterval(() => {
                if (audioRef.current && audioRef.current.volume > 0.05) {
                    audioRef.current.volume -= 0.1;
                } else {
                    clearInterval(fadeAudio);
                    audioRef.current?.pause();
                }
            }, 50);
        }

        setCompleted(true);
        setShowWelcome(true);

        setTimeout(() => {
            onComplete();
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 1500);
    }, [scrollProgress, onComplete]);

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);



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

                    {/* Skip Button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showWelcome ? 0 : 0.7 }}
                        whileHover={{ opacity: 1, scale: 1.05 }}
                        onClick={handleSkip}
                        className="fixed bottom-8 right-8 z-50 px-6 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white/80 hover:bg-white/10 transition-all pointer-events-auto"
                    >
                        Skip Intro
                    </motion.button>

                    {/* Scroll Container (hidden, no longer needed for scroll) */}
                    <div ref={containerRef} className="fixed inset-0 z-10 pointer-events-none" />

                    {/* End Transition Overlay - Triggered explicitly by state */}
                    <AnimatePresence>
                        {showWelcome && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
                            >
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="text-center px-4"
                                >
                                    <h2
                                        className="section-h2 bg-clip-text text-transparent mb-8 tracking-widest drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                                        style={{ backgroundImage: 'linear-gradient(45deg, #38476b, #b6192e, #ffc1ac)' }}
                                    >
                                        Welcome to NUverse
                                    </h2>
                                    <div className="w-16 h-16 border-4 border-nu-red-500/30 border-t-nu-red-500 rounded-full animate-spin mx-auto shadow-[0_0_30px_rgba(182,25,46,0.3)]" />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </>
    );
}
