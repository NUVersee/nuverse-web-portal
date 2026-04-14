'use client';

import { motion } from 'framer-motion';
import { MajorResult, MajorCategory, MAJOR_RESULTS, QUESTIONS } from '@/constants/major-fit';
import { ArrowLeft, ArrowRight, RefreshCcw, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface QuizResultProps {
  scores: Record<MajorCategory, number>;
  bestFit: MajorResult;
  onRetake: () => void;
}

const BRAND_COLORS = {
  from: 'rgba(255, 255, 255, 0.04)',
  to: 'rgba(0, 0, 0, 0.2)',
  glow: 'rgba(185, 29, 47, 0.2)', // Nuverse Red glow
  accent: '#ffffff', // Clean white for icons/text
};

export function QuizResult({ scores, bestFit, onRetake }: QuizResultProps) {
  const MAX_QUESTION_SCORE = 5;

  const maxScoresByCategory = QUESTIONS.reduce((acc, question) => {
    acc[question.category] += MAX_QUESTION_SCORE;
    return acc;
  }, {
    'Computer Science': 0,
    'Engineering': 0,
    'Biotechnology': 0,
    'Architecture': 0,
    'Business': 0,
  } as Record<MajorCategory, number>);

  const sortedScores = Object.entries(scores)
    .map(([category, score]) => ({
      category: category as MajorCategory,
      score,
      percentage: Math.round((score / maxScoresByCategory[category as MajorCategory]) * 100),
    }))
    .sort((a, b) => b.score - a.score);

  const bestFitScore = sortedScores[0];
  const otherMajors = sortedScores.filter((item) => item.category !== bestFit.category);

  const Icon = bestFit.icon;
  const colors = BRAND_COLORS;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-5xl mx-auto flex flex-col items-center py-8"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
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
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Your <span className="nu-header-gradient">Best Fit Major</span> Is...
          </h2>
        </motion.div>
      </div>

      {/* Best Fit Card */}
      <div className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm mb-12 relative">
        <div
          className="absolute top-0 right-0 w-full h-full pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.3) 100%)`,
          }}
        />
        {/* Glow blob */}
        <div
          className="absolute top-[-30%] left-[-10%] w-72 h-72 rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'var(--nu-gradient-signature)', opacity: 0.15 }}
        />

        <div className="flex flex-col md:flex-row p-8 md:p-12 gap-8 md:gap-12 relative z-10">
          <div className="flex-1 flex flex-col justify-center items-start">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg bg-black/30 border border-white/10 text-white`}
              style={{ boxShadow: `0 0 24px rgba(255, 255, 255, 0.05)` }}
            >
              <Icon className="w-10 h-10" />
            </div>

            <h3 className={`text-4xl mb-4 font-black text-white`}>
              {bestFit.title}
            </h3>

            <div className="text-6xl font-black mb-6 flex items-baseline gap-2">
              <span className="nu-header-gradient">{bestFitScore.percentage}%</span>
              <span className="text-2xl font-medium text-slate-300">Match</span>
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

          <div
            className="w-full md:w-1/3 flex flex-col gap-6 justify-center bg-black/25 p-6 rounded-2xl border border-white/10"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            <h4 className="text-white mb-2 font-bold">How You Scored</h4>

            <div className="space-y-5">
              {sortedScores.map((item, idx) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={`font-medium ${idx === 0 ? 'text-white' : 'text-slate-300'}`}>
                      {item.category}
                    </span>
                    <span className={idx === 0 ? 'font-bold text-white' : 'text-slate-300'}>
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${item.percentage}%`,
                        background: 'var(--nu-gradient-signature)',
                        opacity: idx === 0 ? 1 : 0.72,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="w-full max-w-4xl space-y-10">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href={`/try-the-major?major=${encodeURIComponent(bestFit.category)}`}
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full px-10 py-4 font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            style={{
              background: 'var(--nu-gradient-signature)',
              backgroundSize: '200% auto',
              boxShadow: '0 0 24px rgba(185,29,47,0.35)',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            <Sparkles className="h-5 w-5" />
            <span>Try the Recommended Major</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* ── Explore Other Majors ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap">
              Explore Other Majors
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherMajors.map((item, idx) => {
              const major = MAJOR_RESULTS[item.category];
              const MajorIcon = major.icon;
              const colors = BRAND_COLORS;

              return (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.08 }}
                >
                  <Link
                    href={`/try-the-major?major=${encodeURIComponent(item.category)}`}
                    className="group relative flex flex-col h-full rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.2) 100%)`,
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                    }}
                  >
                    {/* Hover glow overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)`,
                      }}
                    />
                    {/* Top accent border */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'var(--nu-gradient-signature)' }}
                    />

                    <div className="relative z-10 p-5 flex flex-col gap-3 h-full">
                      {/* Icon + score row */}
                      <div className="flex items-start justify-between">
                        <div
                          className="h-11 w-11 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/20"
                          style={{
                            boxShadow: `0 0 0 0 ${colors.glow}`,
                          }}
                        >
                          <MajorIcon
                            className="h-5 w-5 text-white group-hover:text-white/80 transition-colors duration-300"
                          />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className="text-xs font-bold tabular-nums text-white/70"
                          >
                            {item.percentage}%
                          </span>
                          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${item.percentage}%`,
                                background: 'var(--nu-gradient-signature)',
                                opacity: 0.8,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="flex-1">
                        <p className="text-sm text-white font-bold leading-snug group-hover:text-white/90 mb-1">
                          {item.category}
                        </p>
                        <p className="text-xs text-slate-500">
                          {major.quote.replace(/^"|"$/g, '')}
                        </p>
                      </div>

                      <div
                        className="flex items-center gap-1 text-xs font-semibold mt-1 text-slate-400 group-hover:text-white transition-colors duration-300"
                      >
                        <span>Try Lab</span>
                        <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Retake */}
        <motion.div
          className="flex items-center justify-center pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <button
            onClick={onRetake}
            className="flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-all text-sm font-medium group"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span className="border-b border-transparent group-hover:border-white transition-all">Retake Quiz</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
