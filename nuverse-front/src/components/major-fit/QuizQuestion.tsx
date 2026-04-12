'use client';

import { motion } from 'framer-motion';
import { Question } from '@/constants/major-fit';

export interface QuizQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  currentValue: number | null;
  onAnswer: (value: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function QuizQuestion({
  question,
  currentIndex,
  totalQuestions,
  currentValue,
  onAnswer,
  onNext,
  onPrev
}: QuizQuestionProps) {
  const options = [
    { value: 1, label: 'Strongly Disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly Agree' },
  ];

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto flex flex-col items-center py-6"
    >
      <div className="w-full mb-8 flex items-center justify-between text-sm font-ui font-medium text-slate-300">
        <span>Question {currentIndex + 1} of {totalQuestions}</span>
        <div className="flex-1 mx-4 h-2 rounded-full overflow-hidden bg-white/10 border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-nu-blue-400 via-nu-peach-400 to-nu-red-500"
            initial={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
            animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}%</span>
      </div>

      <div className="w-full mb-8 rounded-3xl p-8 md:p-12 border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl shadow-black/25">
        <h2 className="text-2xl md:text-3xl text-white text-center mb-12 leading-relaxed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          &quot;{question.text}&quot;
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 w-full mb-8">
          <span className="text-sm font-ui font-medium text-slate-400 hidden sm:block w-32 text-right mr-4 leading-tight">
            Strongly Disagree
          </span>

          <div className="flex justify-between w-full sm:w-auto gap-2 sm:gap-4 md:gap-6">
            {options.map((option) => {
              const isSelected = currentValue === option.value;
              return (
                <div key={option.value} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => onAnswer(option.value)}>
                  <div
                    className={`
                      w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-200
                      ${isSelected
                        ? 'bg-nu-red-600 border-nu-red-400 text-white shadow-lg shadow-nu-red-500/30 scale-110'
                        : 'bg-nu-blue-900/40 border-white/25 text-slate-200 hover:border-nu-peach-300 hover:bg-nu-red-900/30'
                      }
                    `}
                  >
                    <span className="text-lg font-ui font-semibold">{option.value}</span>
                  </div>
                  <span className={`text-xs text-center transition-colors sm:hidden font-ui ${isSelected ? 'text-nu-peach-200 font-medium' : 'text-slate-400'}`}>
                    {option.label}
                  </span>
                </div>
              );
            })}
          </div>

          <span className="text-sm font-ui font-medium text-slate-400 hidden sm:block w-32 text-left ml-4 leading-tight">
            Strongly Agree
          </span>
        </div>
      </div>

      <div className="flex justify-between w-full">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-full font-ui font-medium transition-colors ${
            currentIndex === 0
              ? 'opacity-0 cursor-default pointer-events-none'
              : 'text-white shadow-md'
          }`}
          style={
            currentIndex === 0
              ? undefined
              : { background: 'var(--nu-gradient-signature)', backgroundSize: '200% auto' }
          }
        >
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={currentValue === null}
          className={`px-8 py-3 outline-none rounded-full font-ui font-medium transition-all ${
            currentValue === null
              ? 'bg-white/10 text-slate-500 cursor-not-allowed'
              : 'text-white shadow-md transform hover:-translate-y-0.5'
          }`}
          style={
            currentValue === null
              ? undefined
              : { background: 'var(--nu-gradient-signature)', backgroundSize: '200% auto' }
          }
        >
          {currentIndex === totalQuestions - 1 ? 'See Results' : 'Next'}
        </button>
      </div>
    </motion.div>
  );
}
