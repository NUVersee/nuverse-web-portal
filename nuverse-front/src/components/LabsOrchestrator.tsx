"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, FlaskConical, MousePointerClick } from "lucide-react";
import Image from "next/image";
import { CircuitsLab } from "./CircuitsLab";
import { ChemistryLab } from "./ChemistryLab";

type LabsOrchestratorProps = {
    onClose: () => void;
    onRequestVRTour?: () => void;
};

type ViewState = "selection" | "circuits" | "chemistry";

export function LabsOrchestrator({ onClose, onRequestVRTour }: LabsOrchestratorProps) {
    const [view, setView] = useState<ViewState>("selection");
    const [hoveredSide, setHoveredSide] = useState<"circuits" | "chemistry" | null>(null);

    if (view === "circuits") {
        return <CircuitsLab onClose={() => setView("selection")} onRequestVRTour={onRequestVRTour || onClose} />;
    }

    if (view === "chemistry") {
        return <ChemistryLab onClose={() => setView("selection")} onRequestVRTour={onRequestVRTour || onClose} />;
    }

    return (
        <div className="fixed inset-0 z-[60] bg-black text-white overflow-hidden font-sans">
            {/* Global Close Button */}
            <button
                onClick={onClose}
                className="absolute top-8 left-8 z-50 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 text-white px-4 py-2.5 rounded-full hover:bg-white/10 transition-all font-medium text-sm group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Exit Labs</span>
            </button>

            {/* Central "Select" Badge - Hidden on small screens, animates on hover */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex flex-col items-center justify-center transition-opacity duration-300"
                style={{ opacity: hoveredSide ? 0 : 1 }}
            >
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl animate-pulse">
                    <MousePointerClick size={32} className="text-white/80" />
                </div>
                <span className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-white/50">Select Lab</span>
            </div>

            <div className="absolute inset-0 flex flex-col md:flex-row">

                {/* Left Side - Circuits */}
                <div
                    className={`relative h-1/2 md:h-full cursor-pointer group overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] border-b md:border-b-0 md:border-r border-white/10
                    ${hoveredSide === 'circuits' ? 'md:flex-[2]' : hoveredSide === 'chemistry' ? 'md:flex-[1]' : 'md:flex-1'}
                    `}
                    onMouseEnter={() => setHoveredSide("circuits")}
                    onMouseLeave={() => setHoveredSide(null)}
                    onClick={() => setView("circuits")}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 transition-transform duration-1000 md:group-hover:scale-105">
                        <Image
                            src="/Images/virtual labs/circuits-wallpaper.jpeg"
                            alt="Circuits Lab"
                            fill
                            className="object-cover opacity-60 md:group-hover:opacity-80 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-nu-blue-900/80 via-black/50 to-transparent opacity-80" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                        <motion.div
                            className="mb-8 p-6 rounded-[2rem] bg-nu-blue-500/10 border border-nu-blue-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover:scale-110 group-hover:bg-nu-blue-500/20 transition-all duration-500"
                            layout
                        >
                            <Zap size={48} className="text-nu-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                        </motion.div>

                        <div className="overflow-hidden">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-lg transform transition-transform duration-500 group-hover:-translate-y-2">
                                Circuits &<br />Electronics
                            </h2>
                        </div>

                        <p className={`max-w-md text-gray-300 text-lg transition-all duration-500 transform
                            ${hoveredSide === 'circuits' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 md:opacity-60 md:translate-y-0'}
                        `}>
                            Master the art of circuit design in our advanced digital lab.
                        </p>

                        <div className={`mt-8 overflow-hidden transition-all duration-500 ${hoveredSide === 'circuits' ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
                                Enter Lab
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Chemistry */}
                <div
                    className={`relative h-1/2 md:h-full cursor-pointer group overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                    ${hoveredSide === 'chemistry' ? 'md:flex-[2]' : hoveredSide === 'circuits' ? 'md:flex-[1]' : 'md:flex-1'}
                    `}
                    onMouseEnter={() => setHoveredSide("chemistry")}
                    onMouseLeave={() => setHoveredSide(null)}
                    onClick={() => setView("chemistry")}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 transition-transform duration-1000 md:group-hover:scale-105">
                        <Image
                            src="/Images/virtual labs/chemistry-wallpaper.jpeg"
                            alt="Chemistry Lab"
                            fill
                            className="object-cover opacity-60 md:group-hover:opacity-80 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-nu-green-900/80 via-black/50 to-transparent opacity-80" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                        <motion.div
                            className="mb-8 p-6 rounded-[2rem] bg-nu-green-500/10 border border-nu-green-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(34,197,94,0.2)] group-hover:scale-110 group-hover:bg-nu-green-500/20 transition-all duration-500"
                            layout
                        >
                            <FlaskConical size={48} className="text-nu-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                        </motion.div>

                        <div className="overflow-hidden">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-lg transform transition-transform duration-500 group-hover:-translate-y-2">
                                Advanced<br />Chemistry
                            </h2>
                        </div>

                        <p className={`max-w-md text-gray-300 text-lg transition-all duration-500 transform
                            ${hoveredSide === 'chemistry' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 md:opacity-60 md:translate-y-0'}
                        `}>
                            Explore molecular structures and chemical reactions safely.
                        </p>

                        <div className={`mt-8 overflow-hidden transition-all duration-500 ${hoveredSide === 'chemistry' ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
                                Enter Lab
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

