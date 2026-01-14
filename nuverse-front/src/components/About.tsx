"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Rocket,
    Eye,
    User,
    Code,
    Box,
    PenTool,
    Brain,
    Laptop
} from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

type AboutProps = {
    onStart360Tour: (indexOrUrl?: number | string) => void;
    onOpenLabs: () => void;
    onOpenAIProfessor: () => void;
};

export function About({ onStart360Tour, onOpenLabs, onOpenAIProfessor }: AboutProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Mission & Vision Animation
            gsap.utils.toArray<HTMLElement>(".mv-item").forEach((item) => {
                gsap.to(item, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Team Animation
            gsap.to(".section-header", {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: ".section-header",
                    start: "top 80%"
                }
            });

            gsap.utils.toArray<HTMLElement>(".team-member").forEach((member, i) => {
                gsap.to(member, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: member,
                        start: "top 85%"
                    }
                });
            });

            // Floating shapes animation handled by CSS/global
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={containerRef} className="about-container relative overflow-hidden transition-colors">
            {/* Floating Shapes */}
            <div className="floating-shapes absolute inset-0 pointer-events-none z-0">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            {/* Mission Section */}
            <section className="mission-section relative z-10 min-h-screen flex flex-col justify-center py-20">
                <div className="container mx-auto px-6">
                    <div className="section-header text-center mb-20 opacity-0 translate-y-10">
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
                            Driven by <span className="gradient-text bg-gradient-to-r from-[#121521] via-[#38476b] via-[#b6192e] to-[#ffc1ac] bg-clip-text text-transparent">Innovation</span>
                        </h1>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16">
                        <div className="mv-item opacity-0 translate-y-10 flex flex-col items-start">
                            <div className="w-16 h-16 rounded-full bg-nu-red-500/20 flex items-center justify-center mb-6 relative group">
                                <Rocket className="w-8 h-8 text-white relative z-10" />
                                <div className="absolute inset-0 bg-nu-red-500/40 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                            </div>
                            <h2 className="section-h3 mb-4 text-nu-red-500">Our Mission</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-nu-red-500 to-transparent mb-6"></div>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-lg">
                                To revolutionize the university exploration experience by bridging the gap between
                                physical and digital reality. We aim to provide an immersive, accessible, and
                                interactive platform that empowers students to discover their future campus from anywhere in the world.
                            </p>
                        </div>

                        <div className="mv-item opacity-0 translate-y-10 flex flex-col items-start">
                            <div className="w-16 h-16 rounded-full bg-nu-blue-500/20 flex items-center justify-center mb-6 relative group">
                                <Eye className="w-8 h-8 text-white relative z-10" />
                                <div className="absolute inset-0 bg-nu-blue-500/40 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                            </div>
                            <h2 className="section-h3 mb-4 text-nu-blue-600 dark:text-nu-blue-300">Our Vision</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-nu-blue-500 to-transparent mb-6"></div>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-lg">
                                To become the leading standard for virtual academic tours, creating a global
                                educational metaverse where every student can experience, interact with, and belong
                                to their dream university environment without boundaries.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
