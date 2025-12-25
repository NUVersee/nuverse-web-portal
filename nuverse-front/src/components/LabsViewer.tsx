"use client";

import { useState } from "react";
import { CircuitBoard, Cpu, FlaskConical, Home, Microscope, TestTube, X, Zap, Beaker, Atom, Check, ChevronRight, Play } from "lucide-react";
import { useTheme } from "./ThemeContext";

type LabsViewerProps = {
  onClose: () => void;
};

type ExperimentStep = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  animation: string; // Description of what happens visually
};

type Experiment = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  steps: ExperimentStep[];
  color: string;
  category: 'chemistry' | 'physics';
};

const EXPERIMENTS: Experiment[] = [
  // Chemistry Experiments
  {
    id: 1,
    title: "Acid-Base Titration",
    description: "Learn to determine the concentration of an acid using a base solution",
    icon: <FlaskConical size={24} />,
    color: "from-purple-500 to-pink-500",
    category: 'chemistry',
    steps: [
      { id: 1, title: "Prepare the burette", description: "Fill the burette with NaOH solution", completed: false, animation: "burette-fill" },
      { id: 2, title: "Add indicator", description: "Add phenolphthalein to the acid solution", completed: false, animation: "add-indicator" },
      { id: 3, title: "Begin titration", description: "Slowly add base while swirling the flask", completed: false, animation: "titrate" },
      { id: 4, title: "Observe color change", description: "Stop when solution turns pink", completed: false, animation: "color-change" },
      { id: 5, title: "Record results", description: "Note the volume of base used", completed: false, animation: "record" },
    ],
  },
  {
    id: 2,
    title: "Chemical Reactions",
    description: "Observe different types of chemical reactions and their properties",
    icon: <TestTube size={24} />,
    color: "from-pink-500 to-rose-500",
    category: 'chemistry',
    steps: [
      { id: 1, title: "Prepare reactants", description: "Measure and prepare chemical solutions", completed: false, animation: "prepare-chemicals" },
      { id: 2, title: "Mix solutions", description: "Carefully combine the reactants", completed: false, animation: "mix-solutions" },
      { id: 3, title: "Observe reaction", description: "Watch for color changes and precipitate", completed: false, animation: "reaction-occur" },
      { id: 4, title: "Measure temperature", description: "Record temperature changes", completed: false, animation: "measure-temp" },
    ],
  },
  {
    id: 3,
    title: "pH Testing",
    description: "Determine the pH of various solutions using indicators",
    icon: <Beaker size={24} />,
    color: "from-violet-500 to-purple-500",
    category: 'chemistry',
    steps: [
      { id: 1, title: "Prepare samples", description: "Gather different solution samples", completed: false, animation: "prepare-samples" },
      { id: 2, title: "Add pH indicator", description: "Add universal indicator to each sample", completed: false, animation: "add-ph-indicator" },
      { id: 3, title: "Compare colors", description: "Match colors with pH scale", completed: false, animation: "compare-colors" },
      { id: 4, title: "Record pH values", description: "Document the pH of each solution", completed: false, animation: "record-ph" },
    ],
  },
  // Physics Experiments
  {
    id: 4,
    title: "Series Circuit",
    description: "Build and analyze a basic series electrical circuit",
    icon: <CircuitBoard size={24} />,
    color: "from-blue-500 to-cyan-500",
    category: 'physics',
    steps: [
      { id: 1, title: "Connect battery", description: "Place battery on the circuit board", completed: false, animation: "place-battery" },
      { id: 2, title: "Add resistors", description: "Connect resistors in series", completed: false, animation: "add-resistors" },
      { id: 3, title: "Connect LED", description: "Add LED to complete the circuit", completed: false, animation: "add-led" },
      { id: 4, title: "Measure voltage", description: "Use multimeter to measure voltage", completed: false, animation: "measure-voltage" },
      { id: 5, title: "Calculate current", description: "Apply Ohm's law to find current", completed: false, animation: "calculate-current" },
    ],
  },
  {
    id: 5,
    title: "Parallel Circuit",
    description: "Explore the properties of parallel electrical circuits",
    icon: <Zap size={24} />,
    color: "from-cyan-500 to-teal-500",
    category: 'physics',
    steps: [
      { id: 1, title: "Setup power source", description: "Connect the power supply", completed: false, animation: "setup-power" },
      { id: 2, title: "Wire parallel paths", description: "Create multiple parallel branches", completed: false, animation: "wire-parallel" },
      { id: 3, title: "Add components", description: "Place resistors in each branch", completed: false, animation: "add-components" },
      { id: 4, title: "Test circuit", description: "Verify all branches work independently", completed: false, animation: "test-circuit" },
    ],
  },
  {
    id: 6,
    title: "Ohm's Law",
    description: "Verify the relationship between voltage, current, and resistance",
    icon: <Cpu size={24} />,
    color: "from-indigo-500 to-blue-500",
    category: 'physics',
    steps: [
      { id: 1, title: "Setup circuit", description: "Build a simple circuit with variable resistor", completed: false, animation: "setup-circuit" },
      { id: 2, title: "Measure voltage", description: "Record voltage across resistor", completed: false, animation: "measure-v" },
      { id: 3, title: "Measure current", description: "Measure current through circuit", completed: false, animation: "measure-i" },
      { id: 4, title: "Calculate resistance", description: "Use V=IR to verify Ohm's law", completed: false, animation: "calculate-r" },
    ],
  },
];

function AnimationVisualizer({ experiment, currentStep }: { experiment: Experiment; currentStep: number }) {
  const completedSteps = experiment.steps.filter(s => s.completed).length;

  // Chemistry animations
  if (experiment.category === 'chemistry') {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Experiment visualization */}
        <div className="relative h-full flex items-center justify-center p-8">
          {completedSteps === 0 && (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 flex items-center justify-center">
                {experiment.icon}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Click on steps to begin experiment</p>
            </div>
          )}

          {/* Titration Animation */}
          {experiment.id === 1 && (
            <div className="relative w-full max-w-md">
              {/* Burette */}
              <div className="absolute top-0 right-1/4 transform translate-x-1/2">
                <div className={`w-16 h-48 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-b-lg border-4 border-gray-400 dark:border-gray-500 transition-all duration-1000 ${completedSteps >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400 to-blue-300 rounded-b transition-all duration-1000 ${completedSteps >= 1 ? 'h-3/4' : 'h-0'}`} />
                </div>
                {completedSteps >= 3 && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-24 bg-blue-400 animate-drip" />
                )}
              </div>

              {/* Flask */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className={`w-40 h-48 transition-all duration-1000 ${completedSteps >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="relative w-full h-full">
                    {/* Flask body */}
                    <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-gray-200 dark:to-gray-700 rounded-b-full border-4 border-gray-400 dark:border-gray-500">
                      {/* Solution */}
                      <div className={`absolute bottom-0 left-0 right-0 rounded-b-full transition-all duration-1000 ${completedSteps >= 4
                        ? 'bg-gradient-to-t from-pink-400 to-pink-300 h-24'
                        : completedSteps >= 2
                          ? 'bg-gradient-to-t from-red-400 to-red-300 h-20'
                          : 'bg-gradient-to-t from-red-400 to-red-300 h-16'
                        }`} />
                    </div>
                    {/* Flask neck */}
                    <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-700 border-x-4 border-gray-400 dark:border-gray-500" />
                  </div>
                </div>
              </div>

              {/* Completion checkmark */}
              {completedSteps === experiment.steps.length && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-green-500 flex items-center justify-center animate-scale-in shadow-2xl">
                  <Check size={64} className="text-white" />
                </div>
              )}
            </div>
          )}

          {/* Chemical Reaction Animation */}
          {experiment.id === 2 && (
            <div className="relative w-full max-w-md flex items-center justify-center gap-8">
              {/* Test tube 1 */}
              <div className={`w-20 h-40 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-b-2xl border-4 border-gray-400 dark:border-gray-500 transition-all duration-1000 ${completedSteps >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-blue-500 to-blue-400 rounded-b-2xl" />
              </div>

              {/* Plus sign */}
              {completedSteps >= 2 && (
                <div className="text-6xl font-bold text-gray-400 dark:text-gray-600 animate-fade-in">+</div>
              )}

              {/* Test tube 2 */}
              <div className={`w-20 h-40 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-b-2xl border-4 border-gray-400 dark:border-gray-500 transition-all duration-1000 ${completedSteps >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-b-2xl" />
              </div>

              {/* Arrow */}
              {completedSteps >= 2 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <ChevronRight size={48} className="text-gray-400 dark:text-gray-600 animate-pulse" />
                </div>
              )}

              {/* Result beaker */}
              {completedSteps >= 3 && (
                <div className="absolute bottom-0 right-0 w-32 h-48 animate-scale-in">
                  <div className="relative w-full h-full bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-b-2xl border-4 border-gray-400 dark:border-gray-500">
                    <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-green-500 to-green-400 rounded-b-2xl animate-bubble" />
                    {/* Precipitate */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-white/50 rounded-b-2xl" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* pH Testing Animation */}
          {experiment.id === 3 && (
            <div className="relative w-full max-w-lg">
              <div className="flex items-end justify-center gap-4">
                {[
                  { color: 'from-red-500 to-red-400', label: 'Acidic', show: 1 },
                  { color: 'from-yellow-500 to-yellow-400', label: 'Neutral', show: 2 },
                  { color: 'from-green-500 to-green-400', label: 'Basic', show: 3 },
                ].map((sample, idx) => (
                  <div key={idx} className={`transition-all duration-1000 ${completedSteps >= sample.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="w-24 h-32 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-2xl border-4 border-gray-400 dark:border-gray-500">
                      <div className={`absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t ${sample.color} rounded-b-2xl`} />
                    </div>
                    <p className="text-center mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{sample.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Physics animations
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Circuit visualization */}
      <div className="relative h-full flex items-center justify-center p-8">
        {completedSteps === 0 && (
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-blue-800 dark:to-cyan-800 flex items-center justify-center">
              {experiment.icon}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Click on steps to begin experiment</p>
          </div>
        )}

        {/* Series Circuit Animation */}
        {experiment.id === 4 && completedSteps > 0 && (
          <div className="relative w-full max-w-2xl h-64">
            {/* Battery */}
            <div className={`absolute left-8 top-1/2 transform -translate-y-1/2 transition-all duration-1000 ${completedSteps >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <div className="w-16 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-lg border-4 border-gray-700 flex items-center justify-center">
                <div className="text-white font-bold text-2xl">+</div>
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 dark:text-gray-300">9V</div>
            </div>

            {/* Wire from battery */}
            {completedSteps >= 1 && (
              <>
                <div className="absolute left-24 top-1/2 w-32 h-1 bg-gray-700 dark:bg-gray-400 transform -translate-y-1/2" />
                <div className="absolute left-24 bottom-1/2 w-32 h-1 bg-gray-700 dark:bg-gray-400 transform translate-y-1/2" />
              </>
            )}

            {/* Resistors */}
            {completedSteps >= 2 && (
              <>
                <div className="absolute left-56 top-1/2 transform -translate-y-1/2 animate-scale-in">
                  <div className="w-20 h-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded border-2 border-amber-800 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">100Ω</span>
                  </div>
                </div>
                <div className="absolute left-80 top-1/2 w-16 h-1 bg-gray-700 dark:bg-gray-400 transform -translate-y-1/2" />
              </>
            )}

            {/* LED */}
            {completedSteps >= 3 && (
              <>
                <div className="absolute right-32 top-1/2 transform -translate-y-1/2 animate-scale-in">
                  <div className={`w-12 h-12 rounded-full border-4 border-yellow-600 flex items-center justify-center ${completedSteps >= 3 ? 'bg-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.8)] animate-pulse' : 'bg-gray-300'}`}>
                    <div className="w-4 h-4 rounded-full bg-yellow-200" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 dark:text-gray-300">LED</div>
                </div>

                {/* Wires completing circuit */}
                <div className="absolute right-20 top-1/2 w-12 h-1 bg-gray-700 dark:bg-gray-400 transform -translate-y-1/2" />
                <div className="absolute right-8 top-1/2 w-1 h-32 bg-gray-700 dark:bg-gray-400 transform -translate-y-1/2" />
                <div className="absolute left-8 bottom-8 right-8 h-1 bg-gray-700 dark:bg-gray-400" />
                <div className="absolute left-8 bottom-8 w-1 h-16 bg-gray-700 dark:bg-gray-400" />
              </>
            )}

            {/* Multimeter */}
            {completedSteps >= 4 && (
              <div className="absolute right-8 bottom-8 animate-scale-in">
                <div className="w-32 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-4 border-gray-600 p-2">
                  <div className="w-full h-full bg-green-900 rounded flex items-center justify-center">
                    <div className="text-green-400 font-mono text-lg font-bold">9.0V</div>
                  </div>
                </div>
              </div>
            )}

            {/* Current calculation */}
            {completedSteps >= 5 && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 animate-scale-in">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-2xl border-2 border-blue-500">
                  <div className="text-center font-mono">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">I = V / R</div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">I = 90mA</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Parallel Circuit Animation */}
        {experiment.id === 5 && completedSteps > 0 && (
          <div className="relative w-full max-w-2xl h-80">
            {/* Power source */}
            <div className={`absolute left-8 top-1/2 transform -translate-y-1/2 transition-all duration-1000 ${completedSteps >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-16 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-lg border-4 border-gray-700 flex items-center justify-center">
                <div className="text-white font-bold text-2xl">+</div>
              </div>
            </div>

            {/* Main wires */}
            {completedSteps >= 2 && (
              <>
                {/* Horizontal main lines */}
                <div className="absolute left-24 top-1/2 w-16 h-1 bg-gray-700 dark:bg-gray-400 transform -translate-y-1/2" />
                <div className="absolute left-40 top-16 w-1 h-64 bg-gray-700 dark:bg-gray-400" />

                {/* Branch 1 */}
                <div className="absolute left-40 top-16 w-48 h-1 bg-gray-700 dark:bg-gray-400" />
                <div className="absolute right-40 top-16 w-1 h-64 bg-gray-700 dark:bg-gray-400" />

                {/* Branch 2 */}
                <div className="absolute left-40 top-1/2 w-48 h-1 bg-gray-700 dark:bg-gray-400 transform -translate-y-1/2" />

                {/* Branch 3 */}
                <div className="absolute left-40 bottom-16 w-48 h-1 bg-gray-700 dark:bg-gray-400" />

                {/* Return line */}
                <div className="absolute right-40 top-16 w-16 h-1 bg-gray-700 dark:bg-gray-400" />
              </>
            )}

            {/* Components in branches */}
            {completedSteps >= 3 && (
              <>
                <div className="absolute left-1/2 top-16 transform -translate-x-1/2 -translate-y-1/2 animate-scale-in">
                  <div className="w-16 h-6 bg-amber-600 rounded border-2 border-amber-800 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">R1</span>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-scale-in">
                  <div className="w-16 h-6 bg-amber-600 rounded border-2 border-amber-800 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">R2</span>
                  </div>
                </div>
                <div className="absolute left-1/2 bottom-16 transform -translate-x-1/2 translate-y-1/2 animate-scale-in">
                  <div className="w-16 h-6 bg-amber-600 rounded border-2 border-amber-800 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">R3</span>
                  </div>
                </div>
              </>
            )}

            {/* Test indicators */}
            {completedSteps >= 4 && (
              <>
                <div className="absolute right-24 top-12 animate-scale-in">
                  <div className="w-8 h-8 rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)] animate-pulse" />
                </div>
                <div className="absolute right-24 top-1/2 transform -translate-y-1/2 animate-scale-in">
                  <div className="w-8 h-8 rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)] animate-pulse" />
                </div>
                <div className="absolute right-24 bottom-12 animate-scale-in">
                  <div className="w-8 h-8 rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)] animate-pulse" />
                </div>
              </>
            )}
          </div>
        )}

        {/* Ohm's Law Animation */}
        {experiment.id === 6 && completedSteps > 0 && (
          <div className="relative w-full max-w-xl">
            {/* Simple circuit */}
            <div className="relative w-full h-64">
              {completedSteps >= 1 && (
                <>
                  {/* Battery */}
                  <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                    <div className="w-12 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded border-4 border-gray-700" />
                  </div>

                  {/* Wires */}
                  <div className="absolute left-20 top-1/2 w-24 h-1 bg-gray-700 dark:bg-gray-400 transform -translate-y-1/2" />

                  {/* Variable resistor */}
                  <div className="absolute left-44 top-1/2 transform -translate-y-1/2">
                    <div className="w-24 h-10 bg-gradient-to-r from-amber-600 to-amber-700 rounded border-2 border-amber-800 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">Variable R</span>
                    </div>
                  </div>

                  <div className="absolute left-68 top-1/2 w-24 h-1 bg-gray-700 dark:bg-gray-400 transform -translate-y-1/2" />
                  <div className="absolute right-8 top-1/2 w-1 h-32 bg-gray-700 dark:bg-gray-400 transform -translate-y-1/2" />
                  <div className="absolute left-8 bottom-8 right-8 h-1 bg-gray-700 dark:bg-gray-400" />
                  <div className="absolute left-8 bottom-8 w-1 h-16 bg-gray-700 dark:bg-gray-400" />
                </>
              )}

              {/* Voltage measurement */}
              {completedSteps >= 2 && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 animate-scale-in">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-mono font-bold shadow-lg">
                    V = 12V
                  </div>
                </div>
              )}

              {/* Current measurement */}
              {completedSteps >= 3 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-scale-in">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-mono font-bold shadow-lg">
                    I = 0.5A
                  </div>
                </div>
              )}

              {/* Calculation result */}
              {completedSteps >= 4 && (
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 animate-scale-in">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-2xl border-4 border-purple-500">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Ohm's Law</div>
                      <div className="text-lg font-mono font-bold text-purple-600 dark:text-purple-400 mb-2">V = I × R</div>
                      <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white">R = 24Ω</div>
                      <Check size={32} className="text-green-500 mx-auto mt-3" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExperimentModal({ experiment, onClose, onStepClick }: { experiment: Experiment; onClose: () => void; onStepClick: (stepId: number) => void }) {
  const { isDarkMode } = useTheme();
  const completedSteps = experiment.steps.filter(s => s.completed).length;
  const progress = (completedSteps / experiment.steps.length) * 100;
  const currentStep = completedSteps;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-7xl h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${experiment.color} p-6 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur">
                {experiment.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{experiment.title}</h2>
                <p className="text-white/80">{experiment.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/20 rounded-xl transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm mt-2 text-white/90">
            Progress: {completedSteps} / {experiment.steps.length} steps completed
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100%-180px)]">
          {/* Left: Steps */}
          <div className="w-2/5 border-r border-gray-200 dark:border-gray-800 p-6 overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Experiment Steps</h3>
            <div className="space-y-3">
              {experiment.steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => onStepClick(step.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${step.completed
                    ? `bg-gradient-to-r ${experiment.color} border-transparent text-white shadow-lg transform scale-105`
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${step.completed
                      ? 'bg-white/20'
                      : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                      {step.completed ? (
                        <Check size={18} className="text-white" />
                      ) : (
                        <span className={`text-sm font-bold ${step.completed ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold mb-1 ${step.completed ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        {step.title}
                      </div>
                      <div className={`text-sm ${step.completed ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                        {step.description}
                      </div>
                    </div>
                    {!step.completed && (
                      <Play size={20} className="flex-shrink-0 text-gray-400 dark:text-gray-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Animation */}
          <div className="flex-1 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Experiment Visualization</h3>
            <div className="h-[calc(100%-40px)]">
              <AnimationVisualizer experiment={experiment} currentStep={currentStep} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperimentCard({ experiment, onClick }: { experiment: Experiment; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative text-left w-full"
    >
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${experiment.color} rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity`}></div>

      {/* Card content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${experiment.color} text-white shadow-lg`}>
            {experiment.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{experiment.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{experiment.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            {experiment.steps.length} steps
          </span>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${experiment.color} text-white font-semibold text-sm`}>
            <span>Start Experiment</span>
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </button>
  );
}

export function LabsViewer({ onClose }: LabsViewerProps) {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'chemistry' | 'physics'>('chemistry');
  const [experiments, setExperiments] = useState(EXPERIMENTS);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);

  const handleStepClick = (experimentId: number, stepId: number) => {
    setExperiments(prev =>
      prev.map(exp =>
        exp.id === experimentId
          ? {
            ...exp,
            steps: exp.steps.map(step =>
              step.id === stepId ? { ...step, completed: !step.completed } : step
            ),
          }
          : exp
      )
    );

    // Update selected experiment
    if (selectedExperiment && selectedExperiment.id === experimentId) {
      setSelectedExperiment(prev => {
        if (!prev) return null;
        return {
          ...prev,
          steps: prev.steps.map(step =>
            step.id === stepId ? { ...step, completed: !step.completed } : step
          ),
        };
      });
    }
  };

  const currentExperiments = experiments.filter(exp => exp.category === activeTab);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-black z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Home size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Virtual Lab Experiments
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Interactive Chemistry & Physics Labs</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 pb-4">
            <button
              onClick={() => setActiveTab('chemistry')}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'chemistry'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              <FlaskConical size={20} />
              <span>Chemistry</span>
            </button>
            <button
              onClick={() => setActiveTab('physics')}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'physics'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              <Zap size={20} />
              <span>Physics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-800 mb-6">
            <Atom className="text-purple-600 dark:text-purple-400" size={24} />
            <span className="text-purple-900 dark:text-purple-300 font-semibold">
              {activeTab === 'chemistry' ? 'Chemistry Laboratory' : 'Physics Laboratory'}
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {activeTab === 'chemistry' ? 'Chemical Experiments' : 'Circuit & Physics Experiments'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {activeTab === 'chemistry'
              ? 'Click on any experiment to start. Follow the steps and watch the interactive animations.'
              : 'Build circuits, measure electrical properties, and verify fundamental physics laws with visual feedback.'}
          </p>
        </div>

        {/* Experiments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentExperiments.map(experiment => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              onClick={() => setSelectedExperiment(experiment)}
            />
          ))}
        </div>
      </div>

      {/* Experiment Modal */}
      {selectedExperiment && (
        <ExperimentModal
          experiment={selectedExperiment}
          onClose={() => setSelectedExperiment(null)}
          onStepClick={(stepId) => handleStepClick(selectedExperiment.id, stepId)}
        />
      )}

      <style jsx global>{`
        @keyframes drip {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes bubble {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-drip {
          animation: drip 2s ease-in-out infinite;
        }
        .animate-bubble {
          animation: bubble 2s ease-in-out infinite;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
