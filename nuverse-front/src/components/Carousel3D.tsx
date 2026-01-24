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
    onStartTour: (image: string) => void;
};

const CARDS = [
    { title: "Main Campus", desc: "Experience the heart of our university", img: "/Images/360 images/Main Campus.jpeg", tourImage: "/Images/360 images/Main Campus.jpeg" },
    { title: "Library", desc: "Discover our knowledge center", img: "/Images/360 images/Library.jpeg", tourImage: "/Images/360 images/Library.jpeg" },
    { title: "Chemistry Lab", desc: "Explore cutting-edge research facilities", img: "/Images/360 images/Chemistry Lab.jpeg", tourImage: "/Images/360 images/Chemistry Lab.jpeg" },
    { title: "Circuits Lab", desc: "Analyze and build advanced electronics", img: "/Images/360 images/Circuits Lab.jpeg", tourImage: "/Images/360 images/Circuits Lab.jpeg" },
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
            z: -radius * 1.2,
            rotationX: -5
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
            const rotationAmount = xValue * 0.2; // Sensitivity
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

        // Auto-rotation
        const autoSpeed = -0.5;
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

            {/* Proxy for Draggable */}
            <div ref={proxyRef} className="absolute top-0 left-0 w-full h-full opacity-0 z-10" />

            {/* Carousel Container */}
            <div
                ref={carouselRef}
                className="transform-style-3d relative w-full h-full flex items-center justify-center"
            >
                {CARDS.map((card, i) => (
                    <div
                        key={i}
                        className="carousel-card absolute top-1/2 left-1/2 w-[500px] h-[650px] -ml-[250px] -mt-[325px] bg-nu-dark/80 backdrop-blur-md border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] select-none"
                    >


                        <div className="relative h-2/3 w-full">
                            <Image
                                src={card.img}
                                alt={card.title}
                                fill
                                className="object-cover pointer-events-none"
                                sizes="(max-width: 768px) 100vw, 450px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>

                        <div className="p-8 text-center absolute bottom-0 w-full bg-gradient-to-t from-nu-dark via-nu-dark/95 to-transparent">
                            <h3 className="section-h3 text-white mb-2">{card.title}</h3>
                            <p className="text-sm text-gray-400 mb-6">{card.desc}</p>
                            <button
                                onClick={(e) => {
                                    if (!isDragging) {
                                        e.stopPropagation();
                                        onStartTour(card.tourImage);
                                    }
                                }}
                                className="btn-primary group flex items-center gap-2 mx-auto pointer-events-auto z-20 relative px-8 py-3 rounded-full text-base"
                            >
                                <Rotate3D size={18} />
                                Start Tour
                            </button>
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
