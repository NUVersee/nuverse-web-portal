'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { SIMULATION_CONFIGS } from '@/constants/try-the-major';
import { MajorCategory } from '@/constants/major-fit';
import {
  DragDropSorter,
  LabSelector,
  LogicBuilder,
  LabPlacer,
  ResourceBalancer,
  CubeSorter,
  FlowchartEvenOdd,
  FlaskDragDrop,
  RoomDesigner,
  TowerBuilder,
  BusinessLaunch,
  StructuralIntegrity,
  RocketLaunch,
  CircuitRepair
} from './InteractiveElements';
import { OutcomeScreen } from './OutcomeScreen';
import { FloatingToolsBackground } from './FloatingToolsBackground';

interface UnifiedExperimentProps {
  /** The major category key — a plain string so it can safely cross the server→client boundary */
  majorKey: MajorCategory;
  onRestart?: () => void;
}

export function UnifiedExperiment({ majorKey, onRestart }: UnifiedExperimentProps) {
  // Resolve the full config client-side so we never serialize React components (icons)
  const config = SIMULATION_CONFIGS[majorKey];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [showOutcome, setShowOutcome] = useState(false);

  const steps = config.experiments;
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const HeaderIcon = config.icon;


  const handleCompleteStep = useCallback((answer: unknown) => {
    if (!currentStep) return;
    setAnswers(prev => ({ ...prev, [currentStep.id]: answer }));

    if (!isLastStep) {
      setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setShowOutcome(true);
      }, 1200);
    }
  }, [currentStep, isLastStep]);

  const renderStep = useMemo(() => {
    if (!currentStep) return null;
    const props = {
      step: currentStep,
      accentColor: config.accentColor,
      onComplete: handleCompleteStep
    };

    switch (currentStep.type) {
      case 'SORT': return <DragDropSorter {...props} />;
      case 'LAB_SELECT': return <LabSelector {...props} />;
      case 'LOGIC': return <LogicBuilder {...props} />;
      case 'PLACEMENT': return <LabPlacer {...props} />;
      case 'BALANCE': return <ResourceBalancer {...props} />;
      case 'CUBE_SORT': return <CubeSorter {...props} />;
      case 'FLOWCHART_EVEN_ODD': return <FlowchartEvenOdd {...props} />;
      case 'TOWER_BUILD': return <TowerBuilder {...props} />;
      case 'BUSINESS_LAUNCH': return <BusinessLaunch {...props} />;
      case 'FLASK_DRAG_DROP': return <FlaskDragDrop {...props} />;
      case 'ROOM_DESIGN': return <RoomDesigner {...props} />;
      case 'STRUCTURAL_INTEGRITY': return <StructuralIntegrity {...props} />;
      case 'CIRCUIT_REPAIR': return <CircuitRepair {...props} />;
      case 'ROCKET_LAUNCH': return <RocketLaunch {...props} />;
      default: return <div className="text-white">Experiment content coming soon...</div>;
    }
  }, [currentStep, config.accentColor, handleCompleteStep]);

  const handleRetry = () => {
    setCurrentStepIndex(0);
    setAnswers({});
    setShowOutcome(false);
    if (onRestart) onRestart();
  };

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden text-white"
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#020617' // Deep blue background
      }}
    >
      <FloatingToolsBackground majorKey={majorKey} />

      {/* Header */}
      <div className="relative z-40 flex items-center justify-between px-6 sm:px-12 py-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href="/major-fit"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-5 py-2.5 text-sm font-medium text-slate-200 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Exit Experiment</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex flex-col items-center"
        >
          <span className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mb-1">
            Nile University Labs
          </span>
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center">
              <HeaderIcon className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-bold tracking-tight text-white/90">{config.label} Simulation</span>
          </div>
        </motion.div>

        <div className="w-32 hidden md:block" /> {/* Spacer for balance */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-6 py-8 relative z-10">
        <AnimatePresence mode="wait">
          {showOutcome ? (
            <OutcomeScreen
              key="outcome"
              enjoyed={true}
              config={config}
              onRetry={handleRetry}
            />
          ) : (
            <motion.div
              key={currentStep?.id || 'loading'}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              {/* Question Text */}
              <div className="w-full mb-12 text-center max-w-4xl">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-4xl text-white font-bold leading-tight"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  &quot;{currentStep?.question || 'Preparing Experiment...'}&quot;
                </motion.h3>
              </div>

              {/* Interactive Area */}
              <div className="w-full min-h-[450px] flex items-center justify-center px-4">
                {renderStep}
              </div>

              {/* Mobile Footer */}
              <div className="mt-12 flex items-center gap-4 text-white/20 text-[10px] font-black uppercase tracking-[0.2em] pointer-events-none sm:hidden">
                <MousePointer2 className="w-4 h-4" />
                <span>Touch to select</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Persistent Backglow */}
      <div
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] blur-[120px] rounded-full -z-10 opacity-30 pointer-events-none"
        style={{ backgroundColor: config.accentColor }}
      />
    </div>
  );
}
