"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface ChapterOverlayProps {
    scrollProgress: MotionValue<number>;
}

// Define positioning classes for each chapter to avoid model overlap
const chapters = [
    {
        id: 1,
        title: "NUverse VR",
        subtitle: "Welcome to the future. Where reality transcends boundaries and imagination becomes tangible.",
        positionClass: "top-1/2 left-8 md:left-16 -translate-y-1/2 text-left", // Shot 1: Cam Right -> Text Left
    },
    {
        id: 2,
        title: "Innovation\nRedefined",
        subtitle: "Every curve, every detail, meticulously crafted for the ultimate immersive experience.",
        positionClass: "top-1/2 right-8 md:right-16 -translate-y-1/2 text-right", // Shot 2: Cam Left -> Text Right
    },
    {
        id: 3,
        title: "Precision\nEngineering",
        subtitle: "Where cutting-edge technology meets elegant design. The future sits comfortably in your hands.",
        positionClass: "top-32 left-8 md:left-16 text-left", // Shot 3: Cam Right/Low -> Text Top Left
    },
    {
        id: 4,
        title: "The Threshold",
        subtitle: "You stand at the edge of infinite possibilities. Are you ready to step inside?",
        positionClass: "top-1/2 left-8 md:left-16 -translate-y-1/2 text-left", // Shot 4: Cam Far Right -> Text Left (Wide)
    },
    {
        id: 5,
        title: "Enter The\nExperience",
        subtitle: "Close your eyes. Take a breath. When you open them, you'll be somewhere extraordinary.",
        positionClass: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center", // Shot 5: Dive -> Center
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
            chapterStart,
            chapterStart + 0.04,
            chapterEnd - 0.02,
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
            className={`fixed max-w-xl pointer-events-none z-20 flex flex-col ${chapter.positionClass}`}
        >
            <div className="backdrop-blur-sm bg-black/40 p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl">
                <div className="text-[10px] md:text-xs font-black tracking-[0.3em] text-nu-red-500 mb-3 uppercase">
                    Chapter {String(chapter.id).padStart(2, "0")}
                </div>
                <h2
                    className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 leading-tight whitespace-pre-line bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                    style={{ backgroundImage: 'linear-gradient(to right, #b6192e, #ffc1ac)' }}
                >
                    {chapter.title}
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-white/90 leading-relaxed max-w-lg font-medium drop-shadow-md">
                    {chapter.subtitle}
                </p>
            </div>
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
