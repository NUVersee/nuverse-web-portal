'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { QUESTIONS, MajorCategory, MAJOR_RESULTS } from '@/constants/major-fit';
import { QuizIntro } from './QuizIntro';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';

type QuizState = 'INTRO' | 'QUIZ' | 'RESULT';

export function QuizContainer() {
  const [quizState, setQuizState] = useState<QuizState>('INTRO');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  // Shuffle questions randomly once on mount
  const [questions] = useState(() => {
    const shuffled = [...QUESTIONS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const handleStart = () => {
    setQuizState('QUIZ');
  };

  const handleAnswer = (value: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizState('RESULT');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setQuizState('INTRO');
  };

  const calculateResults = () => {
    const scores: Record<MajorCategory, number> = {
      'Computer Science': 0,
      'Engineering': 0,
      'Biotechnology': 0,
      'Architecture': 0,
      'Business': 0
    };

    questions.forEach(q => {
      const answer = answers[q.id];
      if (answer) {
        scores[q.category] += answer;
      }
    });

    return scores;
  };

  const getBestFit = (scores: Record<MajorCategory, number>) => {
    let bestCategory: MajorCategory = 'Computer Science';
    let maxScore = -1;

    (Object.entries(scores) as [MajorCategory, number][]).forEach(([category, score]) => {
      if (score > maxScore) {
        maxScore = score;
        bestCategory = category;
      }
    });

    return MAJOR_RESULTS[bestCategory];
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-6 px-6 sm:px-10 lg:px-20 xl:px-28 w-full text-white">
      <AnimatePresence mode="wait">
        {quizState === 'INTRO' && (
          <QuizIntro key="intro" onStart={handleStart} />
        )}
        
        {quizState === 'QUIZ' && (
          <QuizQuestion 
            key={questions[currentQuestionIndex].id}
            question={questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            currentValue={answers[questions[currentQuestionIndex].id] || null}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
        
        {quizState === 'RESULT' && (() => {
          const scores = calculateResults();
          const bestFit = getBestFit(scores);
          return (
            <QuizResult 
              key="result"
              scores={scores}
              bestFit={bestFit}
              onRetake={handleRetake}
            />
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
