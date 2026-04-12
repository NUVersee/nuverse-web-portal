'use client';

import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUp, Compass, BookOpen, SlidersHorizontal, Sparkles, Code2, Cog, Microscope, Building2, Briefcase } from 'lucide-react';
import Link from 'next/link';

interface QuizIntroProps {
  onStart: () => void;
}

const steps = [
  { num: '01', icon: BookOpen, title: 'Read', desc: 'Read each statement and think honestly about how it applies to you.' },
  { num: '02', icon: SlidersHorizontal, title: 'Rate', desc: 'Score every statement from 1 (Strongly Disagree) to 5 (Strongly Agree).' },
  { num: '03', icon: Sparkles, title: 'Discover', desc: 'Receive your personalized major recommendation the moment you finish.' },
];

const majorChips = [
  { label: 'Computer Science', icon: Code2, posClass: 'top-0 left-1/2 -translate-x-1/2 -translate-y-[35%]', baseColor: 'bg-black/35 text-slate-300 border-white/15' },
  { label: 'Engineering', icon: Cog, posClass: 'top-[28%] right-[4%] translate-x-[8%] -translate-y-1/2', baseColor: 'bg-black/35 text-slate-300 border-white/15' },
  { label: 'Biotechnology', icon: Microscope, posClass: 'bottom-[2%] right-[16%] translate-x-[10%] translate-y-[18%]', baseColor: 'bg-black/35 text-slate-300 border-white/15' },
  { label: 'Architecture', icon: Building2, posClass: 'bottom-[2%] left-[16%] -translate-x-[10%] translate-y-[18%]', baseColor: 'bg-black/35 text-slate-300 border-white/15' },
  { label: 'Business', icon: Briefcase, posClass: 'top-[28%] left-[4%] -translate-x-[8%] -translate-y-1/2', baseColor: 'bg-black/35 text-slate-300 border-white/15' },
];

const chipAngles = [270, 342, 54, 126, 198];
const HIGHLIGHT_THRESHOLD = 18;

export function QuizIntro({ onStart }: QuizIntroProps) {
  const [activeMajorIndex, setActiveMajorIndex] = useState<number | null>(null);
  const greenOrbitRotate = useMotionValue(0);

  useEffect(() => {
    const controls = animate(greenOrbitRotate, 360, {
      duration: 26,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
    });

    const unsubscribe = greenOrbitRotate.on('change', (latest) => {
      const normalizedRotation = ((latest % 360) + 360) % 360;
      const pointerAngle = (90 + normalizedRotation) % 360;

      let closestIndex: number | null = null;
      let smallestDifference = Number.POSITIVE_INFINITY;

      chipAngles.forEach((chipAngle, index) => {
        const directDifference = Math.abs(pointerAngle - chipAngle);
        const wrappedDifference = 360 - directDifference;
        const difference = Math.min(directDifference, wrappedDifference);

        if (difference < smallestDifference) {
          smallestDifference = difference;
          closestIndex = index;
        }
      });

      setActiveMajorIndex(smallestDifference <= HIGHLIGHT_THRESHOLD ? closestIndex : null);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [greenOrbitRotate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative w-full"
    >
      <Link
        href="/"
        className="absolute top-0 left-0 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </Link>

      {/* ── How It Works ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full mb-14 pt-14"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          How It Works
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.09 }}
                className="bg-nu-dark/60 backdrop-blur-md rounded-2xl border border-white/5 p-7 flex flex-col gap-4 relative overflow-hidden"
              >
                <span className="absolute -top-3 -right-1 text-8xl font-black text-white/5 select-none leading-none" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  {step.num}
                </span>
                <div className="w-11 h-11 rounded-full bg-nu-red-900/60 border border-nu-red-700/60 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-nu-red-300" />
                </div>
                <h4 className="text-white font-black uppercase tracking-tight text-lg" style={{ fontFamily: 'RostexDisplay, sans-serif' }}>
                  {step.title}
                </h4>
                <p className="text-gray-400 text-base leading-relaxed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Hero row: left text + right decorative compass ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <h1
            className="section-h1 text-white leading-tight"
            style={{ fontFamily: 'RostexDisplay, sans-serif' }}
          >
            Discover Your <span className="nu-header-gradient">Perfect Major</span>
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed max-w-lg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Not sure which major suits you? Complete our quick assessment to discover whether{' '}
            <span className="text-white font-semibold">Computer Science</span>,{' '}
            <span className="text-white font-semibold">Engineering</span>,{' '}
            <span className="text-white font-semibold">Biotechnology</span>,{' '}
            <span className="text-white font-semibold">Architecture</span>, or{' '}
            <span className="text-white font-semibold">Business</span>{' '}
            best matches your interests and problem-solving style.
          </p>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 px-10 py-4 w-fit btn-primary text-white rounded-xl transition-all duration-500 shadow-lg hover:shadow-2xl transform font-bold text-base"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            <span>Start Assessment</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Right — animated compass ring visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="relative flex items-center justify-center h-72 lg:h-96"
        >
          {/* Outer pulse ring */}
          <div className="absolute w-64 h-64 lg:w-80 lg:h-80 rounded-full border border-white/5 animate-pulse" />
          <div className="absolute w-52 h-52 lg:w-64 lg:h-64 rounded-full border border-white/5" />

          {/* Orbiting dots */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute w-64 h-64 lg:w-80 lg:h-80 rounded-full"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-nu-blue-400 shadow-[0_0_12px_rgba(74,117,175,0.8)]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-nu-red-400 shadow-[0_0_12px_rgba(158,27,54,0.8)]" />
          </motion.div>
          <motion.div
            style={{ rotate: greenOrbitRotate }}
            className="absolute w-52 h-52 lg:w-64 lg:h-64 rounded-full"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-nu-peach-400 shadow-[0_0_10px_rgba(245,149,110,0.8)]" />
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-9 h-9 rounded-full border border-white/30 shadow-[0_0_20px_rgba(185,29,47,0.35)] flex items-center justify-center"
              style={{ background: 'var(--nu-gradient-signature)' }}
            >
              <ArrowUp className="w-4 h-4 text-white rotate-180" />
            </div>
          </motion.div>

          {/* Center icon */}
          <div className="relative z-10 w-24 h-24 rounded-full bg-nu-dark/80 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl">
            <Compass className="w-12 h-12 text-nu-red-400" />
          </div>

          {/* Floating major logos */}
          {majorChips.map((chip, i) => {
            const Icon = chip.icon;
            const isActive = activeMajorIndex === i;
            return (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  scale: isActive ? 1.08 : 1,
                  boxShadow: isActive ? '0 0 24px rgba(185, 29, 47, 0.35)' : '0 10px 24px rgba(0,0,0,0.18)',
                }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`absolute ${chip.posClass} flex items-center justify-center gap-2 text-[11px] lg:text-xs font-bold px-4 py-2.5 rounded-full border backdrop-blur-sm shadow-lg whitespace-nowrap ${isActive ? 'text-white border-white/20' : chip.baseColor}`}
                style={isActive ? { fontFamily: 'system-ui, sans-serif', background: 'var(--nu-gradient-signature)' } : { fontFamily: 'system-ui, sans-serif' }}
              >
                <Icon className="w-4 h-4" />
                {chip.label}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

    </motion.div>
  );
}
