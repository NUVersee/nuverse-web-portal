'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SimulationConfig } from '@/constants/try-the-major';
import { RefreshCcw, ArrowLeft, Sparkles, Trophy } from 'lucide-react';

interface OutcomeScreenProps {
  enjoyed: boolean;
  config: SimulationConfig;
  onRetry: () => void;
}

export function OutcomeScreen({ enjoyed, config, onRetry }: OutcomeScreenProps) {
  const MajorIcon = config.icon;
  const BRAND_ACCENT = '#b91d2f'; // Nuverse Red

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto relative"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {/* Celebration Confetti Layer */}
      {enjoyed && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i / 40) * 360;
            const distance = 100 + Math.random() * 200;
            const velocity = 0.5 + Math.random() * 1.5;
            const colors = ['#b91d2f', '#5b5c87', '#ffc1ac', '#ffffff'];
            const color = colors[i % colors.length];

            return (
              <motion.div
                key={i}
                initial={{ 
                  x: "50%", 
                  y: "20%", 
                  scale: 0,
                  opacity: 1,
                  rotate: 0 
                }}
                animate={{ 
                  x: `calc(50% + ${Math.cos(angle) * distance}px)`,
                  y: `calc(20% + ${Math.sin(angle) * distance + 100}px)`, // add gravity
                  scale: [0, 1.2, 0.5],
                  opacity: [1, 1, 0],
                  rotate: 360 * velocity
                }}
                transition={{ 
                  duration: 2 * velocity, 
                  ease: [0.23, 1, 0.32, 1],
                  delay: Math.random() * 0.2
                }}
                className="absolute w-2 h-2 rounded-sm"
                style={{ backgroundColor: color }}
              />
            );
          })}
        </div>
      )}

      <div
        className="relative rounded-[2rem] border border-white/10 overflow-hidden backdrop-blur-md p-10 text-center"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.4) 100%)',
          boxShadow: `0 0 80px rgba(185, 29, 47, 0.15), 0 30px 60px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Top gradient border line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: 'var(--nu-gradient-signature)',
          }}
        />

        {/* Background glow blob */}
        <div
          className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[80px] pointer-events-none"
          style={{ background: BRAND_ACCENT, opacity: 0.12 }}
        />

        {/* Floating trophy icon */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="relative mx-auto mb-6 h-20 w-20 rounded-2xl flex items-center justify-center z-50"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 0 40px rgba(185, 29, 47, 0.2)',
          }}
        >
          {enjoyed ? (
            <Trophy className="h-10 w-10 text-white" />
          ) : (
            <MajorIcon className="h-10 w-10 text-white/70" />
          )}
        </motion.div>

        {/* Lab tag */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-300 mb-5"
        >
          <MajorIcon className="h-3.5 w-3.5 text-white/50" />
          <span>{config.label} Lab</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-3xl md:text-4xl font-black text-white mb-4"
        >
          {enjoyed
            ? <><span className="nu-header-gradient">Experiment</span> Complete!</>
            : 'Keep Experimenting!'}
        </motion.h2>

        {/* Feedback */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-300 text-lg leading-relaxed mb-8 max-w-md mx-auto"
        >
          {enjoyed ? config.enjoyedFeedback : config.struggledFeedback}
        </motion.p>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-white/10" />
          <Sparkles className="h-3.5 w-3.5 text-white/20" />
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={onRetry}
            className="group inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 font-bold text-white transition-all hover:-translate-y-0.5"
            style={{
              background: 'var(--nu-gradient-signature)',
              boxShadow: '0 0 24px rgba(185, 29, 47, 0.35)',
            }}
          >
            <RefreshCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>Try Again</span>
          </button>

          <Link
            href="/major-fit"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-10 py-4 font-bold text-white transition-all hover:bg-white/10 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Major Fit</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
