"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
    visible: boolean;
}

export function ScrollIndicator({ visible }: ScrollIndicatorProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none"
        >
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2"
            >
                <ChevronDown className="text-nu-blue-400 group-hover:text-nu-peach-300 transition-colors" size={32} />
                <span className="text-sm font-medium tracking-[0.2em] text-gray-400 uppercase">
                    Scroll to Begin
                </span>
            </motion.div>
        </motion.div>
    );
}
