'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import {
  X,
  Sparkles,
  Check,
  Loader2,
  Film,
  Download,
  Sliders,
  CheckCircle2,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GeneratedClip } from '@/types';

export function ClipModal() {
  const {
    isClipModalOpen,
    clipModalOpportunity,
    closeClipModal,
    isGeneratingClip,
    clipGenerationStep,
    generateClip,
    setActiveClip
  } = useApp();

  const router = useRouter();

  const [format, setFormat] = useState('Instagram Reels');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [captionsOn, setCaptionsOn] = useState(true);
  const [captionStyle, setCaptionStyle] = useState<'dynamic' | 'bold' | 'minimal'>('dynamic');
  const [hookSelection, setHookSelection] = useState('AI-generated');
  const [createdClip, setCreatedClip] = useState<GeneratedClip | null>(null);

  if (!isClipModalOpen || !clipModalOpportunity) return null;

  const handleStartGeneration = async () => {
    try {
      const clip = await generateClip(clipModalOpportunity, {
        format,
        aspectRatio,
        captionStyle
      });
      setCreatedClip(clip);

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignore in testing environments
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenEditor = () => {
    if (createdClip) {
      setActiveClip(createdClip);
      closeClipModal();
      router.push(`/editor/${createdClip.id}`);
    }
  };

  const handleDownload = () => {
    // Generate simulated clip file download
    const blob = new Blob([`CreatorAI Rendered Clip: ${createdClip?.title}`], {
      type: 'text/plain;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${createdClip?.title.replace(/\s+/g, '_')}_CreatorAI.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const steps = [
    { title: 'Selecting footage', step: 1 },
    { title: 'Cropping subject', step: 2 },
    { title: 'Generating captions', step: 3 },
    { title: 'Applying hook', step: 4 },
    { title: 'Rendering', step: 5 }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isGeneratingClip && closeClipModal()}
          className="fixed inset-0 bg-[#17172A]/30 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_25px_70px_rgba(20,20,50,0.22)] border border-[rgba(20,20,40,0.08)] overflow-hidden z-10"
        >
          {/* Top gradient edge */}
          <div className="card-top-edge" />

          {/* Header */}
          <div className="px-6 py-5 border-b border-[rgba(20,20,40,0.06)] flex items-center justify-between bg-gradient-to-r from-[#FAFAF7] to-white">
            <div className="flex items-center gap-3">
              <div className="icon-box-purple">
                <Film className="w-5 h-5 text-[#635BFF]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#17172A] tracking-tight">Create your clip</h3>
                <p className="text-xs text-[#68697A]">AI autonomous framing & formatting</p>
              </div>
            </div>
            {!isGeneratingClip && (
              <button
                onClick={closeClipModal}
                className="p-1.5 rounded-xl text-[#68697A] hover:text-[#17172A] hover:bg-black/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="p-6">
            {/* If finished rendering */}
            {createdClip ? (
              <div className="text-center py-4 space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-16 h-16 rounded-full bg-[#22C55E]/10 text-[#22C55E] mx-auto flex items-center justify-center"
                >
                  <CheckCircle2 className="w-9 h-9" />
                </motion.div>

                <div>
                  <h4 className="text-lg font-bold text-[#17172A]">Your clip is ready!</h4>
                  <p className="text-xs text-[#68697A] mt-1 max-w-sm mx-auto">
                    Rendered with {createdClip.aspectRatio} framing, synchronized {captionStyle} captions, and high-impact hook.
                  </p>
                </div>

                {/* Clip Preview Pill */}
                <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[rgba(20,20,40,0.06)] flex items-center justify-between text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-white">
                      <Play className="w-4 h-4 fill-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#17172A] truncate max-w-[200px]">
                        {createdClip.title}
                      </p>
                      <p className="text-[11px] text-[#68697A]">
                        {createdClip.durationFormatted} • {createdClip.platform.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#635BFF] px-2 py-0.5 rounded-md bg-[#635BFF]/10">
                    {createdClip.score} Score
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2.5 rounded-xl border border-[rgba(20,20,40,0.12)] text-xs font-semibold text-[#17172A] hover:bg-[#FAFAF7] transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4 text-[#68697A]" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={handleOpenEditor}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold btn-primary-gradient flex items-center gap-2"
                  >
                    <Sliders className="w-4 h-4" />
                    <span>Open Editor</span>
                  </button>
                </div>
              </div>
            ) : isGeneratingClip ? (
              /* Generating Progress State */
              <div className="py-4 space-y-5">
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#17172A]">AI is creating your clip...</p>
                  <p className="text-xs text-[#68697A] mt-0.5">
                    Synthesizing video segment {clipModalOpportunity.startFormatted} → {clipModalOpportunity.endFormatted}
                  </p>
                </div>

                <div className="space-y-3 bg-[#F7F8FC] p-4 rounded-xl border border-[rgba(20,20,40,0.06)]">
                  {steps.map((st) => {
                    const isDone = clipGenerationStep > st.step;
                    const isCurrent = clipGenerationStep === st.step;

                    return (
                      <div
                        key={st.step}
                        className={`flex items-center justify-between text-xs py-1 transition-colors ${
                          isCurrent
                            ? 'font-semibold text-[#635BFF]'
                            : isDone
                            ? 'text-[#17172A] font-medium'
                            : 'text-[#9496A8]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-[11px] opacity-70">Step {st.step}:</span>
                          <span>{st.title}</span>
                        </div>
                        <div>
                          {isDone ? (
                            <Check className="w-4 h-4 text-[#22C55E]" />
                          ) : isCurrent ? (
                            <Loader2 className="w-4 h-4 text-[#635BFF] animate-spin" />
                          ) : (
                            <div className="w-2 h-2 rounded-full border border-[#9496A8]" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Configuration View */
              <div className="space-y-4">
                {/* Moment Summary */}
                <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[rgba(20,20,40,0.06)]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#635BFF]">
                    Selected Opportunity Moment
                  </span>
                  <p className="text-xs font-semibold text-[#17172A] mt-0.5">
                    &ldquo;{clipModalOpportunity.hookText}&rdquo;
                  </p>
                  <p className="text-[11px] text-[#68697A] mt-0.5">
                    Duration: {clipModalOpportunity.duration}s ({clipModalOpportunity.startFormatted} - {clipModalOpportunity.endFormatted})
                  </p>
                </div>

                {/* Target Platform Format */}
                <div>
                  <label className="block text-xs font-semibold text-[#17172A] mb-1.5">
                    Format
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Instagram Reels', 'YouTube Shorts', 'LinkedIn', 'Custom'].map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => {
                          setFormat(fmt);
                          if (fmt === 'LinkedIn') setAspectRatio('1:1');
                          else if (fmt === 'Custom') setAspectRatio('16:9');
                          else setAspectRatio('9:16');
                        }}
                        className={`px-3 py-2 text-xs rounded-xl border font-medium text-left transition-all ${
                          format === fmt
                            ? 'border-[#635BFF] bg-[#635BFF]/5 text-[#635BFF]'
                            : 'border-[rgba(20,20,40,0.1)] hover:bg-[#FAFAF7] text-[#17172A]'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <label className="block text-xs font-semibold text-[#17172A] mb-1.5">
                    Aspect Ratio
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['9:16', '1:1', '16:9'] as const).map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setAspectRatio(ratio)}
                        className={`px-3 py-2 text-xs rounded-xl border font-medium transition-all ${
                          aspectRatio === ratio
                            ? 'border-[#635BFF] bg-[#635BFF]/5 text-[#635BFF]'
                            : 'border-[rgba(20,20,40,0.1)] hover:bg-[#FAFAF7] text-[#17172A]'
                        }`}
                      >
                        {ratio} {ratio === '9:16' ? '(Vertical)' : ratio === '1:1' ? '(Square)' : '(Landscape)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Captions Style */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-[#17172A]">
                      Captions
                    </label>
                    <button
                      type="button"
                      onClick={() => setCaptionsOn(!captionsOn)}
                      className="text-xs text-[#635BFF] font-semibold"
                    >
                      {captionsOn ? 'AI Captions ON' : 'Captions OFF'}
                    </button>
                  </div>
                  {captionsOn && (
                    <div className="grid grid-cols-3 gap-2">
                      {(['Dynamic', 'Bold', 'Minimal'] as const).map((st) => {
                        const val = st.toLowerCase() as 'dynamic' | 'bold' | 'minimal';
                        return (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setCaptionStyle(val)}
                            className={`px-3 py-2 text-xs rounded-xl border font-medium transition-all ${
                              captionStyle === val
                                ? 'border-[#635BFF] bg-[#635BFF]/5 text-[#635BFF]'
                                : 'border-[rgba(20,20,40,0.1)] hover:bg-[#FAFAF7] text-[#17172A]'
                            }`}
                          >
                            {st}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Hook Style */}
                <div>
                  <label className="block text-xs font-semibold text-[#17172A] mb-1.5">
                    Hook Display
                  </label>
                  <select
                    value={hookSelection}
                    onChange={(e) => setHookSelection(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[rgba(20,20,40,0.1)] bg-white text-[#17172A] focus:outline-none focus:border-[#635BFF]"
                  >
                    <option value="AI-generated">AI-generated Opening Hook Overlay</option>
                    <option value="Audio-only">Spoken Audio Only (No text overlay)</option>
                    <option value="Custom">Custom Headline</option>
                  </select>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleStartGeneration}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold btn-primary-gradient flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Clip</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
