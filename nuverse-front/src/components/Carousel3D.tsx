"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { Rotate3D } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(Draggable);
}

type Carousel3DProps = {
    onStartTour: (indexOrUrl: number | string) => void;
};

const CARDS = [
    { title: "Main Campus", desc: "Explore the university’s main campus through an immersive 360° view.", img: "/Images/360-cards/campus.jpg", tourIndex: 0 },
    { title: "Library", desc: "Step inside the library with a 360° virtual view and discover study spaces, resources, and the academic atmosphere up close.", img: "/Images/360-cards/library.jpg", tourIndex: 1 },
    { title: "Chemistry Lab", desc: "Enter the chemistry lab in a 360° experience, and explore lab equipment", img: "/Images/360-cards/Chemistry-lab.jpg", tourIndex: 2 },
    { title: "Circuits Lab", desc: "Navigate the circuits lab in 360°, and examine electronic components,", img: "/Images/360-cards/circuits_electronics_lab.jpg", tourIndex: 3 },
];

export function Carousel3D({ onStartTour }: Carousel3DProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const proxyRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!carouselRef.current || !proxyRef.current || !viewportRef.current) return;

        const carousel = carouselRef.current;
        const proxy = proxyRef.current;
        const cards = gsap.utils.toArray(".carousel-card") as HTMLElement[];

        const numCards = cards.length;
        const cardWidth = 500;
        const gap = 120;
        const circumference = numCards * (cardWidth + gap);
        const radius = (circumference / (2 * Math.PI)) * 1.2;
        const angleStep = 360 / numCards;

        gsap.set(carousel, {
            z: -radius * 2,
            rotationX: 0
        });

        cards.forEach((card, index) => {
            const theta = index * angleStep;
            gsap.set(card, {
                rotationY: theta,
                z: radius,
                transformOrigin: `50% 50% ${-radius}px`,
                backfaceVisibility: "hidden"
            });
        });

        const updateRotation = () => {
            const xValue = gsap.getProperty(proxy, "x") as number;
            const rotationAmount = xValue * 0.2;
            gsap.set(carousel, { rotationY: rotationAmount });
        };

        const draggable = Draggable.create(proxy, {
            trigger: viewportRef.current,
            type: "x",
            inertia: true,
            allowContextMenu: true,
            onDragStart: () => setIsDragging(true),
            onDrag: updateRotation,
            onDragEnd: () => {
                setTimeout(() => setIsDragging(false), 100);
            },
            onThrowUpdate: updateRotation,
        })[0];

        const autoSpeed = 1;
        const ticker = gsap.ticker.add(() => {
            if (draggable.isPressed || draggable.isThrowing) return;

            const currentX = gsap.getProperty(proxy, "x") as number;
            gsap.set(proxy, { x: currentX + autoSpeed });
            draggable.update(true);
            updateRotation();
        });

        return () => {
            gsap.ticker.remove(ticker);
            draggable.kill();
        };
    }, []);

    return (
        <div className="relative w-full h-[80vh] min-h-[600px] overflow-hidden flex items-center justify-center perspective-[1000px]" ref={viewportRef}>

            <div ref={proxyRef} className="absolute top-0 left-0 w-full h-full opacity-0 z-10" />

            <div
                ref={carouselRef}
                className="transform-style-3d relative w-full h-full flex items-center justify-center"
            >
                {CARDS.map((card, i) => (
                    <div
                        key={i}
                        className="carousel-card absolute top-1/2 left-1/2 w-[500px] h-[650px] -ml-[250px] -mt-[325px] bg-nu-dark/80 backdrop-blur-md border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] select-none"
                    >


                        <div className="flex flex-col h-full w-full">
                            <div className="relative h-[55%] w-full">
                                <Image
                                    src={card.img}
                                    alt={card.title}
                                    fill
                                    className="object-cover pointer-events-none"
                                    sizes="(max-width: 768px) 100vw, 450px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-nu-dark/90" />
                            </div>

                            <div className="flex flex-col items-center justify-center h-[45%] w-full bg-nu-dark px-6 pb-6 pt-2 text-center text-white">
                                <h3
                                    className="text-3xl font-bold mb-3 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
                                    style={{ fontFamily: 'RostexDisplay, sans-serif' }}
                                >
                                    {card.title}
                                </h3>
                                <p
                                    className="text-gray-400 mb-6 leading-relaxed text-base max-w-sm mx-auto"
                                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                                >
                                    {card.desc}
                                </p>
                                <button
                                    onClick={(e) => {
                                        if (!isDragging) {
                                            e.stopPropagation();
                                            onStartTour(card.tourIndex);
                                        }
                                    }}
                                    className="btn-primary group flex items-center gap-2 mx-auto pointer-events-auto relative px-8 py-3 rounded-full text-sm font-bold tracking-wide uppercase hover:scale-105 transition-transform"
                                >
                                    <Rotate3D size={18} />
                                    <span>Start Tour</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm uppercase tracking-[0.2em] font-bold pointer-events-none animate-pulse">
                ← Drag to Explore →
            </div>
        </div>
    );
}
