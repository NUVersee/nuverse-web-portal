"use client";

import { Loader2 } from "lucide-react";

/**
 * Loading Skeleton Component
 * 
 * A reusable loading state component for heavy sections.
 */
export function LoadingSkeleton({
    height = "400px",
    message = "Loading..."
}: {
    height?: string;
    message?: string;
}) {
    return (
        <div
            className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-md rounded-3xl border border-white/10"
            style={{ minHeight: height }}
        >
            <Loader2 className="w-10 h-10 text-nu-peach-300 animate-spin mb-4" />
            <p className="text-gray-400 text-sm">{message}</p>
        </div>
    );
}

/**
 * 3D Viewer Loading Component
 * 
 * Specific loading state for 3D/VR components.
 */
export function Viewer3DLoading() {
    return (
        <LoadingSkeleton
            height="500px"
            message="Loading 3D experience..."
        />
    );
}

/**
 * Tour Loading Component
 */
export function TourLoading() {
    return (
        <LoadingSkeleton
            height="600px"
            message="Preparing 360° tour..."
        />
    );
}
