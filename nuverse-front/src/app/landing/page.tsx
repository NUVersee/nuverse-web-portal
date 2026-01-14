"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import CinematicLanding to avoid SSR issues with Three.js
const CinematicLanding = dynamic(
    () => import("@/components/landing").then((mod) => mod.CinematicLanding),
    {
        ssr: false,
        loading: () => (
            <div className="fixed inset-0 bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-nu-red-500/20 border-t-nu-red-500 rounded-full animate-spin" />
            </div>
        ),
    }
);

export default function LandingPage() {
    const router = useRouter();

    const handleComplete = () => {
        router.push("/");
    };

    return <CinematicLanding onComplete={handleComplete} />;
}
