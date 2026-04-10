'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Compass, Target, Brain, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function MajorFitSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden bg-nu-deep" id="major-fit">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-nu-red-500/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-nu-blue-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.div variants={itemVariants} className="badge mb-6">
              <Sparkles className="w-4 h-4" />
              <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Discover Your Path</span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="section-h1 text-gray-900 dark:text-white mb-4 uppercase" style={{ fontFamily: 'RostexDisplay, sans-serif' }}>
                Unsure which major is right for <span className="nu-header-gradient">you?</span>
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 max-w-2xl lg:max-w-xl lg:mx-0 mx-auto text-lg mb-8" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              complete our quick assessment to see what is the best match for your personality, interests, and problem-solving approach.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto lg:w-auto">
              <Link 
                href="/major-fit"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 btn-primary text-white rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                <span>Take the Assessment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto relative hidden md:block">
              {/* Central element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-slate-800 shadow-2xl flex items-center justify-center z-20 border border-slate-700">
                  <Compass className="w-12 h-12 text-nu-red-500" />
                </div>
              </div>

              {/* Orbiting elements */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-dashed border-slate-700"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-slate-800 shadow-xl flex items-center justify-center -rotate-0 border border-slate-700">
                  <Brain className="w-8 h-8 text-nu-blue-500" />
                </div>
                <div className="absolute bottom-1/4 left-0 -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-2xl bg-slate-800 shadow-xl flex items-center justify-center -rotate-[120deg] border border-slate-700">
                  <Target className="w-8 h-8 text-nu-peach-500" />
                </div>
                <div className="absolute bottom-1/4 right-0 translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-2xl bg-slate-800 shadow-xl flex items-center justify-center -rotate-[240deg] border border-slate-700">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
