"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface ProgressBarProps {
    scrollProgress: MotionValue<number>;
}

export function ProgressBar({ scrollProgress }: ProgressBarProps) {
    const width = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);
    const chapter = useTransform(scrollProgress, (value) =>
        Math.min(5, Math.floor(value * 5) + 1)
    );

    return (
        <>
            {/* Progress bar at top */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#121521] via-[#38476b] via-[#b6192e] to-[#ffc1ac] z-50"
                style={{ width }}
            />

            {/* Chapter indicator */}
            <motion.div className="fixed top-6 right-6 md:right-12 z-50 text-sm font-medium tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase">
                <motion.span>
                    Chapter <motion.span>{chapter}</motion.span>/5
                </motion.span>
            </motion.div>
        </>
    );
}
