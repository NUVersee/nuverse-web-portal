'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface SimulationShellProps {
  totalSeconds: number;
  timeLeft: number;
  isRunning: boolean;
  accentColor: string;
  icon: LucideIcon;
  label: string;
  tagline: string;
  onBack?: () => void;
  children: React.ReactNode;
}

export function SimulationShell({
  totalSeconds,
  timeLeft,
  isRunning,
  accentColor,
  icon: Icon,
  label,
  tagline,
  onBack,
  children,
}: SimulationShellProps) {
  const progress = timeLeft / totalSeconds;
  const isWarning = timeLeft <= 20;
  const isDanger = timeLeft <= 10;

  const barColor = isDanger
    ? '#ef4444'
    : isWarning
    ? '#f59e0b'
    : accentColor;

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="try-major-theme relative min-h-screen flex flex-col overflow-hidden">
      {/* Decorative background shapes to match website exactly */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-nu-blue-400/10 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-nu-red-500/10 blur-[100px]" />
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-nu-peach-300/10 blur-[100px]" />
      </div>

      {/* Timer bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/5">
        <motion.div
          className="h-full rounded-r-full transition-colors duration-500"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: barColor,
            boxShadow: `0 0 12px ${barColor}`,
          }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: 'linear' }}
        />
      </div>

      {/* Header */}
      <div className="fixed top-2 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3">
        {/* Back button */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
          <Link
            href="/major-fit"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Close</span>
          </Link>
        </motion.div>

        {/* Centre label */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">
            Try the Major
          </span>
          <span className="text-sm text-white font-semibold flex items-center gap-2">
            <Icon className="h-4 w-4" />
            {label}
          </span>
        </motion.div>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-sm"
        >
          <Clock
            className="h-4 w-4"
            style={{ color: barColor }}
          />
          <span
            className="text-sm font-bold tabular-nums"
            style={{ color: isDanger ? '#ef4444' : isWarning ? '#f59e0b' : 'white' }}
          >
            {timeStr}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col pt-16">
        {children}
      </div>
    </div>
  );
}
