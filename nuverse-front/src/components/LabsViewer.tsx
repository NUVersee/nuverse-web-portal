"use client";

import { CircuitBoard, Cpu, FlaskConical, Home, Microscope, TestTube, X, Zap } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

type LabsViewerProps = {
  onClose: () => void;
};

export function LabsViewer({ onClose }: LabsViewerProps) {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
      <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
              <Home size={24} />
            </button>
            <div>
              <h1 className="text-white">Virtual Lab Experiments</h1>
              <p className="text-sm text-blue-100">Explore Circuits & Chemistry Labs</p>
            </div>
          </div>

          <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-20 animate-fade-in">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGNpcmN1aXQlMjBsYWJ8ZW58MXx8fHwxNzY1MjA4ODI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Circuits Lab"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full shadow-lg">
                <Cpu size={24} />
                <span>Circuits Laboratory</span>
              </div>

              <h2 className="text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Electronics & Circuit Design
              </h2>

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                Step into our advanced circuits laboratory where you can design, build, and test electronic circuits in a safe virtual environment. Experience hands-on learning with industry-standard equipment and real-time feedback.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <CircuitBoard className="text-blue-600 dark:text-blue-400 mb-3" size={32} />
                  <h4 className="text-gray-900 dark:text-white mb-2">Circuit Building</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Design and simulate complex circuits with virtual components</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <Zap className="text-blue-600 dark:text-blue-400 mb-3" size={32} />
                  <h4 className="text-gray-900 dark:text-white mb-2">Real-time Testing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Measure voltage, current, and resistance instantly</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h4 className="text-gray-900 dark:text-white mb-4">Key Features:</h4>
                <ul className="space-y-3">
                  {[
                    "Interactive 3D component models and placement",
                    "Advanced oscilloscope and multimeter tools",
                    "Circuit simulation with real-time analysis",
                    "Step-by-step guided experiments and tutorials",
                    "Comprehensive component library",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 mt-2"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-in">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg">
                <FlaskConical size={24} />
                <span>Chemistry Laboratory</span>
              </div>

              <h2 className="text-gray-900 dark:text-white bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Chemical Experiments & Analysis
              </h2>

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                Explore the world of chemistry in our state-of-the-art virtual laboratory. Conduct experiments, mix chemicals safely, observe reactions, and learn essential laboratory techniques without physical risks.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800">
                  <TestTube className="text-purple-600 dark:text-purple-400 mb-3" size={32} />
                  <h4 className="text-gray-900 dark:text-white mb-2">Safe Experiments</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mix chemicals and observe reactions without risk</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800">
                  <Microscope className="text-purple-600 dark:text-purple-400 mb-3" size={32} />
                  <h4 className="text-gray-900 dark:text-white mb-2">Molecular View</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Visualize molecules and chemical structures in 3D</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h4 className="text-gray-900 dark:text-white mb-4">Key Features:</h4>
                <ul className="space-y-3">
                  {[
                    "Extensive chemical compound library",
                    "Interactive molecular visualization in 3D",
                    "Reaction prediction and safety warnings",
                    "Virtual lab equipment (beakers, burners, etc.)",
                    "Detailed experiment procedures and guides",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mt-2"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative group order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1631106321638-d94d9a8f3e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaXN0cnklMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc2NTIwODgyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Chemistry Lab"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-white mb-4">Ready to Start Experimenting?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Request access to our virtual laboratories and begin your hands-on learning journey today.
            </p>
            <button
              onClick={() => {
                window.location.href =
                  "mailto:nuverse6@gmail.com?subject=Lab%20Access%20Request&body=Hi%2C%0D%0A%0D%0AI%20would%20like%20to%20request%20access%20to%20the%20virtual%20laboratories.%0D%0A%0D%0AThank%20you!";
              }}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Request Lab Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

