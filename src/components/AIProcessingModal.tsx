'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { AICoreVisual } from './AICoreVisual';
import { Check, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function AIProcessingModal() {
  const { isAnalyzing, analysisProgress, analysisStep, analysisCurrentText } = useApp();
  const router = useRouter();

  if (!isAnalyzing) return null;

  const pipelineSteps = [
    { title: 'Upload complete', id: 0 },
    { title: 'Audio extracted', id: 1 },
    { title: 'Speech transcribed', id: 2 },
    { title: 'Detecting topics', id: 3 },
    { title: 'Finding high-potential moments', id: 4 },
    { title: 'Generating hooks', id: 5 },
    { title: 'Preparing clips', id: 6 },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#FAFAF7]/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_80px_rgba(30,30,70,0.12)] border border-[rgba(20,20,40,0.08)] p-8 overflow-hidden z-10 text-center"
        >
          {/* Subtle background ambient wash */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#635BFF]/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#EC4899]/10 rounded-full filter blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="relative z-10 max-w-md mx-auto mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#635BFF]/10 border border-[#635BFF]/20 text-[#635BFF] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Modal Content Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-[#17172A] tracking-tight">
              CreatorAI is understanding your content
            </h2>
            <p className="text-sm text-[#68697A] mt-1.5">
              We&apos;re analyzing your content for the moments worth sharing.
            </p>
          </div>

          {/* Center AICoreVisual */}
          <div className="my-2 flex justify-center">
            <AICoreVisual
              size={240}
              label={analysisCurrentText}
              sublabel="Whisper large-v3 + Semantic Opportunity Scoring"
            />
          </div>

          {/* Pipeline Step Checklist */}
          <div className="relative z-10 max-w-lg mx-auto mt-4 bg-[#F7F8FC] rounded-2xl p-4 border border-[rgba(20,20,40,0.06)] text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pipelineSteps.map((step) => {
                const isDone = analysisStep > step.id;
                const isCurrent = analysisStep === step.id;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-2.5 text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                      isCurrent
                        ? 'bg-white font-semibold text-[#635BFF] shadow-sm border border-[#635BFF]/20'
                        : isDone
                        ? 'text-[#17172A] font-medium'
                        : 'text-[#9496A8]'
                    }`}
                  >
                    <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                      {isDone ? (
                        <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                      ) : isCurrent ? (
                        <Loader2 className="w-3.5 h-3.5 text-[#635BFF] animate-spin" />
                      ) : (
                        <div className="w-2 h-2 rounded-full border border-[#9496A8]" />
                      )}
                    </div>
                    <span>{step.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Overall Progress bar */}
            <div className="mt-4 pt-3 border-t border-[rgba(20,20,40,0.06)]">
              <div className="flex justify-between text-xs text-[#68697A] mb-1.5">
                <span>Estimated time remaining</span>
                <span className="font-semibold text-[#17172A]">
                  ~{Math.max(1, Math.round((100 - analysisProgress) * 0.38))} seconds
                </span>
              </div>
              <div className="w-full h-2 bg-[#E9ECF5] rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${analysisProgress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-[#635BFF] via-[#8B5CF6] to-[#EC4899] rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
