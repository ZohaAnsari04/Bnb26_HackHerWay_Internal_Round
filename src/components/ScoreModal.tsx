'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ScoreRing } from './ScoreRing';
import { X, Sparkles, Check, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ScoreModal() {
  const { isScoreModalOpen, scoreModalOpportunity, closeScoreModal, openClipModal } = useApp();

  if (!isScoreModalOpen || !scoreModalOpportunity) return null;

  const { title, hookText, score, factors, whyItWorks } = scoreModalOpportunity;

  const factorList = [
    { label: 'Hook strength', value: factors.hookStrength, desc: 'Calculates opening seconds retention and psychological curiosity gap' },
    { label: 'Information density', value: factors.infoDensity, desc: 'Evaluates signal-to-noise ratio and actionable takeaway velocity' },
    { label: 'Emotional impact', value: factors.emotionalImpact, desc: 'Measures vocal inflection intensity, surprise, and sentiment spikes' },
    { label: 'Standalone context', value: factors.standaloneContext, desc: 'Verifies the clip requires zero prior reference to understand' },
    { label: 'Topic relevance', value: factors.topicRelevance, desc: 'Aligns with target audience demand and current market search interest' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeScoreModal}
          className="fixed inset-0 bg-[#17172A]/30 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-[0_20px_60px_rgba(20,20,50,0.18)] border border-[rgba(20,20,40,0.08)] overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[rgba(20,20,40,0.06)] flex items-center justify-between bg-gradient-to-r from-[#FAFAF7] to-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#17172A] tracking-tight">How CreatorAI Calculated This</h3>
                <p className="text-xs text-[#68697A]">Algorithmic Opportunity Score diagnostic</p>
              </div>
            </div>
            <button
              onClick={closeScoreModal}
              className="p-1.5 rounded-lg text-[#68697A] hover:text-[#17172A] hover:bg-black/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Top Score Summary Banner */}
            <div className="flex items-center gap-5 p-4 rounded-xl bg-[#F7F8FC] border border-[rgba(20,20,40,0.06)]">
              <ScoreRing score={score} size={64} strokeWidth={5} showLabel={true} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#635BFF]">
                    AI Opportunity Score
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E] font-medium">
                    Top 5% Tier
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[#17172A] truncate mt-0.5">
                  &ldquo;{hookText || title}&rdquo;
                </h4>
                <p className="text-xs text-[#68697A] mt-0.5">
                  Duration: {scoreModalOpportunity.duration}s • Timestamps: {scoreModalOpportunity.startFormatted} → {scoreModalOpportunity.endFormatted}
                </p>
              </div>
            </div>

            {/* Score Factor Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#68697A]">
                  Diagnostic Factor Breakdown
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-[#68697A]">
                  <HelpCircle className="w-3 h-3" />
                  <span>Weighted composite</span>
                </div>
              </div>

              <div className="space-y-3.5">
                {factorList.map((factor) => (
                  <div key={factor.label} className="p-3 rounded-lg border border-[rgba(20,20,40,0.05)] hover:border-[#635BFF]/20 bg-white transition-colors">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-medium text-[#17172A]">{factor.label}</span>
                      <span className="font-bold text-[#635BFF]">{factor.value}%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-[#F0F1F6] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${factor.value}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#635BFF] to-[#8B5CF6] rounded-full"
                      />
                    </div>
                    <p className="text-[11px] text-[#68697A] mt-1.5 leading-relaxed">
                      {factor.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why This Works Section */}
            {whyItWorks && whyItWorks.length > 0 && (
              <div className="p-4 rounded-xl bg-[#FAFAF7] border border-[rgba(20,20,40,0.07)]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#17172A] mb-2.5 flex items-center gap-1.5">
                  <span className="text-[#22C55E]">✓</span> Why this works
                </h4>
                <ul className="space-y-2">
                  {whyItWorks.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#17172A] leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="px-6 py-4 border-t border-[rgba(20,20,40,0.06)] bg-[#FAFAF7] flex items-center justify-between">
            <span className="text-xs text-[#68697A]">
              CreatorAI Content Intelligence Model v2.4
            </span>
            <div className="flex items-center gap-2.5">
              <button
                onClick={closeScoreModal}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#68697A] hover:text-[#17172A] hover:bg-black/5 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  closeScoreModal();
                  openClipModal(scoreModalOpportunity);
                }}
                className="px-4 py-2 rounded-xl text-xs font-medium btn-primary-gradient"
              >
                Generate Clip Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
