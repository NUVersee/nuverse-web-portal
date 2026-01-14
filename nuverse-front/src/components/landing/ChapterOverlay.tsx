"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface ChapterOverlayProps {
    scrollProgress: MotionValue<number>;
}

const chapters = [
    {
        id: 1,
        title: "NUverse VR",
        subtitle: "Welcome to the future. Where reality transcends boundaries and imagination becomes tangible.",
        center: true,
    },
    {
        id: 2,
        title: "Innovation\nRedefined",
        subtitle: "Every curve, every detail, meticulously crafted for the ultimate immersive experience.",
        center: false,
    },
    {
        id: 3,
        title: "Precision\nEngineering",
        subtitle: "Where cutting-edge technology meets elegant design. The future sits comfortably in your hands.",
        center: false,
    },
    {
        id: 4,
        title: "The Threshold",
        subtitle: "You stand at the edge of infinite possibilities. Are you ready to step inside?",
        center: false,
    },
    {
        id: 5,
        title: "Enter The\nExperience",
        subtitle: "Close your eyes. Take a breath. When you open them, you'll be somewhere extraordinary.",
        center: true,
    },
];

function Chapter({
    chapter,
    scrollProgress,
    index,
}: {
    chapter: typeof chapters[0];
    scrollProgress: MotionValue<number>;
    index: number;
}) {
    const chapterStart = index * 0.2;
    const chapterEnd = (index + 1) * 0.2;

    const opacity = useTransform(
        scrollProgress,
        [
            chapterStart - 0.05,
            chapterStart + 0.02,
            chapterEnd - 0.05,
            chapterEnd,
        ],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollProgress,
        [chapterStart - 0.05, chapterStart + 0.02, chapterEnd - 0.05, chapterEnd],
        [30, 0, 0, -30]
    );

    return (
        <motion.div
            style={{ opacity, y }}
            className={`fixed max-w-xl pointer-events-none z-20 ${chapter.center
                ? "top-16 md:top-24 left-1/2 -translate-x-1/2 text-center"
                : "top-1/2 left-8 md:left-16 -translate-y-1/2 text-left"
                }`}
        >
            <div className="text-xs md:text-sm font-black tracking-[0.3em] text-nu-red-500 mb-4 uppercase">
                Chapter {String(chapter.id).padStart(2, "0")}
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight whitespace-pre-line text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                {chapter.title}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-lg font-medium">
                {chapter.subtitle}
            </p>
        </motion.div>
    );
}

export function ChapterOverlay({ scrollProgress }: ChapterOverlayProps) {
    return (
        <>
            {chapters.map((chapter, index) => (
                <Chapter
                    key={chapter.id}
                    chapter={chapter}
                    scrollProgress={scrollProgress}
                    index={index}
                />
            ))}
        </>
    );
}
