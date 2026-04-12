'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SIMULATION_CONFIGS } from '@/constants/try-the-major';
import { MajorCategory } from '@/constants/major-fit';

interface FloatingToolsBackgroundProps {
  /** Optional major category - if provided, filters to major-specific icons */
  majorKey?: MajorCategory;
  /** Density of icons - defaults to 40 */
  count?: number;
  /** Base opacity of icons - defaults to 0.04 */
  opacity?: number;
}

export function FloatingToolsBackground({ 
  majorKey, 
  count = 45, 
  opacity = 0.12 
}: FloatingToolsBackgroundProps) {
  
  const floatingIcons = useMemo(() => {
    let iconsToUse = [];

    if (majorKey && SIMULATION_CONFIGS[majorKey]) {
      const config = SIMULATION_CONFIGS[majorKey];
      iconsToUse = [config.icon, ...config.secondaryIcons];
    } else {
      // General/Mixed mode: All icons from all majors
      const allConfigs = Object.values(SIMULATION_CONFIGS);
      iconsToUse = allConfigs.flatMap(c => [c.icon, ...c.secondaryIcons]);
    }

    if (iconsToUse.length === 0) return [];

    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      Icon: iconsToUse[Math.floor(Math.random() * iconsToUse.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 40 + Math.random() * 140, // Varied sizes for depth
      baseOpacity: opacity * (0.5 + Math.random()), // Vary opacity slightly
      rotation: Math.random() * 360,
      // Animation properties
      duration: 15 + Math.random() * 25,
      delay: Math.random() * -40,
      // Drift offsets
      driftX: [
        '0px', 
        `${(Math.random() - 0.5) * 60}px`, 
        `${(Math.random() - 0.5) * 60}px`,
        '0px'
      ],
      driftY: [
        '0px', 
        `${(Math.random() - 0.5) * 80}px`, 
        `${(Math.random() - 0.5) * 80}px`,
        '0px'
      ],
    }));
  }, [majorKey, count, opacity]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* SVG Pattern Definition for Gradient Icons */}
      <svg width="0" height="0" className="absolute invisible">
        <defs>
          <linearGradient id="tool-gradient-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="40%" stopColor="#b91d2f" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
      </svg>

      {floatingIcons.map((tool) => (
        <motion.div
          key={tool.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [tool.baseOpacity * 0.7, tool.baseOpacity, tool.baseOpacity * 0.7],
            x: tool.driftX,
            y: tool.driftY,
            rotate: [tool.rotation, tool.rotation + 90, tool.rotation]
          }}
          transition={{
            duration: tool.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: tool.delay
          }}
          className="absolute translate-x-[-50%] translate-y-[-50%]"
          style={{ 
            left: `${tool.left}%`, 
            top: `${tool.top}%`,
            width: tool.size,
            height: tool.size,
          }}
        >
          <tool.Icon 
            className="w-full h-full" 
            style={{ 
              strokeWidth: 1.5,
              stroke: 'url(#tool-gradient-bg)',
              fill: 'none',
              filter: `drop-shadow(0 0 15px rgba(185, 29, 47, ${tool.baseOpacity}))`
            }} 
          />
        </motion.div>
      ))}
      
      {/* Global subtle glow layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-nu-blue-500/10 via-transparent to-nu-red-500/10 blur-3xl" />
    </div>
  );
}
