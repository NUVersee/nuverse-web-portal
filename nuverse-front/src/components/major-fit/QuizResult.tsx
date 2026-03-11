'use client';

import { motion } from 'framer-motion';
import { MajorResult, MajorCategory } from '@/constants/major-fit';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

interface QuizResultProps {
  scores: Record<MajorCategory, number>;
  bestFit: MajorResult;
  onRetake: () => void;
}

export function QuizResult({ scores, bestFit, onRetake }: QuizResultProps) {
  // Calculate max score dynamically based on the number of questions
  const MAX_SCORE = 30; // 6 questions * max 5
  
  // Sort categories by score descending
  const sortedScores = Object.entries(scores)
    .map(([category, score]) => ({ 
      category: category as MajorCategory, 
      score,
      percentage: Math.round((score / MAX_SCORE) * 100)
    }))
    .sort((a, b) => b.score - a.score);

  const bestFitScore = sortedScores[0];

  const Icon = bestFit.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-5xl mx-auto flex flex-col items-center py-8"
    >
      <Link
        href="/"
        className="absolute top-0 left-0 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Home</span>
      </Link>

      <div className="text-center mb-10 space-y-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-nu-red-900/50 text-nu-red-200 border border-nu-red-700/70 text-sm font-ui font-semibold tracking-wide uppercase mb-4">
            Analysis Complete
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white">
            Your Best Fit Major Is...
          </h2>
        </motion.div>
      </div>

      <div className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm mb-12 relative">
        <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${bestFit.bgGradient} opacity-35 pointer-events-none`} />

        <div className="flex flex-col md:flex-row p-8 md:p-12 gap-8 md:gap-12 relative z-10">
          <div className="flex-1 flex flex-col justify-center items-start">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg bg-black/30 border border-white/10 ${bestFit.color}`}>
              <Icon className="w-10 h-10" />
            </div>

            <h3 className={`font-display text-4xl mb-4 ${bestFit.color}`}>
              {bestFit.title}
            </h3>

            <div className="text-6xl font-black text-white mb-6 flex items-baseline gap-2">
              {bestFitScore.percentage}% <span className="text-2xl font-ui font-medium text-slate-300">Match</span>
            </div>

            <p
              className="text-xl italic font-medium text-slate-200 mb-6 border-l-4 border-white/20 pl-4 py-1"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              {bestFit.quote}
            </p>

            <p
              className="text-slate-200 leading-relaxed text-lg"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              {bestFit.description}
            </p>
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-6 justify-center bg-black/25 p-6 rounded-2xl border border-white/10">
            <h4 className="font-display text-white mb-2">How You Scored</h4>

            <div className="space-y-5">
              {sortedScores.map((item, idx) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={`font-ui font-medium ${idx === 0 ? 'text-white' : 'text-slate-300'}`}>
                      {item.category}
                    </span>
                    <span className={idx === 0 ? 'font-ui font-bold text-white' : 'font-ui text-slate-300'}>
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${idx === 0 ? 'bg-nu-red-500' : 'bg-slate-400/80'}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <button
          onClick={onRetake}
          className="flex items-center justify-center gap-2 px-8 py-4 text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-full font-ui font-medium transition-all w-full sm:w-auto"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>Retake Quiz</span>
        </button>
      </div>
    </motion.div>
  );
}
