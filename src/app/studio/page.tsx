'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/AppShell';
import { ScoreRing } from '@/components/ScoreRing';
import { INITIAL_TRANSCRIPT } from '@/lib/mockData';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Scissors,
  Check,
  Flame,
  Layers,
  HelpCircle,
  Wand2,
  Copy,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Send
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MockHookService } from '@/services/ai/hooks';

export default function StudioPage() {
  const {
    activeProject,
    opportunities,
    openClipModal,
    openScoreModal,
    showToast
  } = useApp();

  // Video Player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(24);
  const [duration, setDuration] = useState(activeProject?.durationSeconds || 642);
  const [isMuted, setIsMuted] = useState(false);

  // Studio tabs: "Opportunities" vs "Script & Hook Generator"
  const [activeTab, setActiveTab] = useState<'opportunities' | 'transcript' | 'generator'>('opportunities');

  // Hook Generator state (Section 22)
  const [genTopic, setGenTopic] = useState('AI Agents');
  const [genAudience, setGenAudience] = useState('Software Developers');
  const [genPlatform, setGenPlatform] = useState('LinkedIn');
  const [genTone, setGenTone] = useState('Professional');
  const [genDuration, setGenDuration] = useState(45);
  const [isGeneratingHooks, setIsGeneratingHooks] = useState(false);
  const [hookResults, setHookResults] = useState<{
    hooks: string[];
    script: string;
    callToAction: string;
    caption: string;
  } | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (!isPlaying) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setCurrentTime(seconds);
    }
  };

  const handleRunGenerator = async () => {
    setIsGeneratingHooks(true);
    const service = new MockHookService();
    const result = await service.generateHooksAndScript({
      topic: genTopic,
      audience: genAudience,
      platform: genPlatform,
      tone: genTone,
      durationSeconds: genDuration
    });
    setHookResults(result);
    setIsGeneratingHooks(false);
    showToast('Hooks and platform script generated!');
  };

  const copyText = (txt: string, label: string) => {
    navigator.clipboard.writeText(txt);
    showToast(`Copied ${label} to clipboard`);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Studio Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[rgba(20,20,40,0.06)]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-[#17172A]">AI Content Studio</h1>
              <span className="px-2 py-0.5 rounded-full bg-[#635BFF]/10 text-[#635BFF] text-[10px] font-bold uppercase tracking-wider">
                Active Project: {activeProject?.title || 'AI & The Future of Work'}
              </span>
            </div>
            <p className="text-sm text-[#68697A] mt-0.5">
              Turn long-form content into platform-ready content.
            </p>
          </div>

          {/* Studio Mode Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[rgba(20,20,40,0.08)] shadow-2xs">
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'opportunities'
                  ? 'bg-[#635BFF] text-white shadow-xs'
                  : 'text-[#68697A] hover:text-[#17172A]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Opportunities</span>
            </button>
            <button
              onClick={() => setActiveTab('transcript')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'transcript'
                  ? 'bg-[#635BFF] text-white shadow-xs'
                  : 'text-[#68697A] hover:text-[#17172A]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Transcript</span>
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'generator'
                  ? 'bg-[#635BFF] text-white shadow-xs'
                  : 'text-[#68697A] hover:text-[#17172A]'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>AI Script & Hooks</span>
            </button>
          </div>
        </div>

        {/* 2-Column Core Layout (Section 12: Left Video Preview, Right AI Analysis) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Video Preview, Timeline & Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="card-clean card-premium p-4 overflow-hidden">
              {/* Video Player */}
              <div className="relative aspect-video rounded-xl bg-black overflow-hidden group flex items-center justify-center shadow-inner">
                <video
                  ref={videoRef}
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full object-cover"
                  playsInline
                />

                {/* Subtitle Caption Overlay synced to speech */}
                <div className="absolute bottom-6 left-6 right-6 text-center pointer-events-none">
                  <span className="inline-block px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md text-white text-sm font-bold shadow-xl border border-white/10">
                    {currentTime >= 23 && currentTime <= 68
                      ? "The biggest mistake developers make with AI is treating it as an autocomplete..."
                      : currentTime >= 69 && currentTime <= 114
                      ? "AI isn't replacing developers, it's replacing developers who refuse to evolve..."
                      : "CreatorAI multi-modal semantic pipeline active."}
                  </span>
                </div>

                {/* Hover Play/Pause Overlay */}
                <button
                  onClick={togglePlay}
                  className="absolute w-14 h-14 rounded-full bg-white/95 text-[#17172A] flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.35)] group-hover:scale-110 group-hover:bg-[#635BFF] group-hover:text-white transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                  )}
                </button>
              </div>

              {/* Player Timeline & Controls */}
              <div className="mt-4 space-y-2">
                {/* Scrubbing Bar */}
                <div
                  className="relative w-full h-2.5 bg-[#E9ECF5] rounded-full cursor-pointer group"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    seekTo(pos * duration);
                  }}
                >
                  {/* Highlight Opportunity Moments on Timeline */}
                  {opportunities.map((opp) => {
                    const startPct = (opp.startTime / duration) * 100;
                    const widthPct = (opp.duration / duration) * 100;
                    return (
                      <div
                        key={opp.id}
                        title={`Opportunity: ${opp.hookText} (${opp.score} Score)`}
                        className="absolute h-full rounded-sm bg-[#635BFF]/35 hover:bg-[#635BFF]/70 transition-colors z-10"
                        style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                      />
                    );
                  })}

                  {/* Playback progress */}
                  <div
                    className="h-full bg-gradient-to-r from-[#635BFF] via-[#8B5CF6] to-[#EC4899] rounded-full relative z-20"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md border-2 border-[#635BFF]" />
                  </div>
                </div>

                {/* Control bar */}
                <div className="flex items-center justify-between text-xs text-[#68697A] pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1 text-[#17172A] hover:text-[#635BFF] transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => seekTo(0)}
                      className="p-1 hover:text-[#17172A]"
                      title="Restart"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono font-medium text-[#17172A]">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.muted = !isMuted;
                          setIsMuted(!isMuted);
                        }
                      }}
                      className="p-1 hover:text-[#17172A]"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-[#F7F8FC] border border-[rgba(20,20,40,0.06)]">
                      1080p 60fps
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Clip Marker Bar */}
            <div className="card-clean card-premium p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#17172A]">Timeline Jump Points</span>
                <p className="text-[11px] text-[#68697A]">Click any moment to immediately preview and listen</p>
              </div>
              <div className="flex items-center gap-2">
                {opportunities.map((opp, idx) => (
                  <button
                    key={opp.id}
                    onClick={() => seekTo(opp.startTime)}
                    className="px-2.5 py-1 text-xs rounded-xl border border-[rgba(20,20,40,0.1)] hover:border-[#635BFF] hover:bg-[#635BFF]/5 font-medium transition-all"
                  >
                    Moment {idx + 1} ({opp.startFormatted})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Analysis & Opportunities (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {activeTab === 'opportunities' && (
              <>
                {/* Content Summary Card (Section 12) */}
                <div className="card-clean card-premium surface-radial-purple card-top-edge p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
                      <span>Content Summary</span>
                    </span>
                    <span className="badge-soft-green text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
                      High Resonance
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 rounded-2xl bg-white/80 border border-[rgba(20,20,40,0.06)] shadow-2xs hover:border-[#635BFF]/20 transition-colors">
                      <span className="text-[10px] text-[#68697A] block font-semibold uppercase tracking-wider">Topic</span>
                      <span className="font-bold text-[#17172A] mt-1 block truncate">
                        {activeProject?.topics[0] || 'AI Development'}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/80 border border-[rgba(20,20,40,0.06)] shadow-2xs hover:border-[#635BFF]/20 transition-colors">
                      <span className="text-[10px] text-[#68697A] block font-semibold uppercase tracking-wider">Tone</span>
                      <span className="font-bold text-[#17172A] mt-1 block truncate">
                        {activeProject?.tone || 'Educational'}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/80 border border-[rgba(20,20,40,0.06)] shadow-2xs hover:border-[#635BFF]/20 transition-colors">
                      <span className="text-[10px] text-[#68697A] block font-semibold uppercase tracking-wider">Audience</span>
                      <span className="font-bold text-[#17172A] mt-1 block truncate">
                        {activeProject?.targetAudience || 'Developers'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#68697A] block mb-2">
                      Key Themes
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(activeProject?.keyThemes || ['AI', 'Productivity', 'Software Engineering']).map((theme) => (
                        <span
                          key={theme}
                          className="px-3 py-1 text-xs font-semibold rounded-xl bg-white border border-[rgba(20,20,40,0.08)] text-[#17172A] shadow-2xs hover:border-[#635BFF]/30 transition-colors"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Opportunities List (Sections 12 & 13) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#635BFF]" />
                      <h2 className="text-base font-bold text-[#17172A]">AI Opportunities</h2>
                    </div>
                    <span className="text-xs text-[#68697A] font-medium">
                      {opportunities.length} Moments Detected
                    </span>
                  </div>

                  {opportunities.map((opp) => (
                    <motion.div
                      key={opp.id}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.15 }}
                      className="card-clean card-premium card-sweep p-5 space-y-4 hover:border-[rgba(99,91,255,0.26)] transition-all"
                    >
                      {/* Top accent line */}
                      <div className="card-top-edge" />

                      {/* Top Score & Time */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#635BFF]">
                              AI Opportunity Score
                            </span>
                            <span className="text-[10px] text-[#68697A] font-mono">
                              {opp.startFormatted} → {opp.endFormatted}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-[#17172A] mt-1 leading-snug">
                            &ldquo;{opp.hookText || opp.title}&rdquo;
                          </h3>
                        </div>

                        {/* Interactive Circular Score Ring */}
                        <div className="shrink-0 text-center">
                          <ScoreRing
                            score={opp.score}
                            size={52}
                            strokeWidth={4.5}
                            onClick={() => openScoreModal(opp)}
                          />
                          <button
                            onClick={() => openScoreModal(opp)}
                            className="text-[10px] text-[#68697A] hover:text-[#635BFF] underline block mt-0.5"
                          >
                            Details
                          </button>
                        </div>
                      </div>

                      {/* "Why This Works" Section (Prompt Section 12: VERY IMPORTANT) */}
                      <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[rgba(20,20,40,0.06)] space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#17172A] flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                          <span>Why this works:</span>
                        </span>
                        <ul className="space-y-1.5">
                          {opp.whyItWorks.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-[#17172A] leading-relaxed">
                              <span className="text-[#22C55E] font-bold">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => seekTo(opp.startTime)}
                          className="text-xs font-semibold text-[#68697A] hover:text-[#17172A] flex items-center gap-1"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Preview Segment</span>
                        </button>

                        <button
                          onClick={() => openClipModal(opp)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold btn-primary-gradient flex items-center gap-1.5 shadow-xs"
                        >
                          <Scissors className="w-3.5 h-3.5" />
                          <span>Generate Clip</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {/* Transcript Tab */}
            {activeTab === 'transcript' && (
              <div className="card-clean p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(20,20,40,0.06)]">
                  <div>
                    <h3 className="text-sm font-bold text-[#17172A]">Verbatim Transcript</h3>
                    <p className="text-xs text-[#68697A]">Whisper large-v3 with word-level alignment</p>
                  </div>
                  <button
                    onClick={() => {
                      const fullText = INITIAL_TRANSCRIPT.map(t => `[${t.startFormatted}] ${t.text}`).join('\n\n');
                      copyText(fullText, 'entire transcript');
                    }}
                    className="px-3 py-1.5 rounded-lg border border-[rgba(20,20,40,0.1)] text-xs font-semibold text-[#17172A] hover:bg-[#FAFAF7] flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#68697A]" />
                    <span>Copy All</span>
                  </button>
                </div>

                <div className="space-y-3.5 max-h-[550px] overflow-y-auto pr-1">
                  {INITIAL_TRANSCRIPT.map((seg) => {
                    const isCurrent = currentTime >= seg.start && currentTime <= seg.end;
                    return (
                      <div
                        key={seg.id}
                        onClick={() => seekTo(seg.start)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isCurrent
                            ? 'bg-[#F3F0FF] border-[#635BFF]/30 shadow-xs'
                            : 'bg-white border-[rgba(20,20,40,0.06)] hover:bg-[#FAFAF7]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-semibold text-[#635BFF]">{seg.speaker}</span>
                          <span className="font-mono text-[11px] text-[#68697A]">
                            {seg.startFormatted} → {seg.endFormatted}
                          </span>
                        </div>
                        <p className="text-xs text-[#17172A] leading-relaxed">
                          {seg.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AI Script & Hook Generator Tab (Prompt Section 22) */}
            {activeTab === 'generator' && (
              <div className="card-clean p-5 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-[#17172A]">AI Script & Hook Engine</h3>
                  <p className="text-xs text-[#68697A]">Input core parameters to generate high-retention copy</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#17172A] mb-1">Topic</label>
                    <input
                      type="text"
                      value={genTopic}
                      onChange={(e) => setGenTopic(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[rgba(20,20,40,0.1)] focus:outline-none focus:border-[#635BFF]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-[#17172A] mb-1">Audience</label>
                      <input
                        type="text"
                        value={genAudience}
                        onChange={(e) => setGenAudience(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[rgba(20,20,40,0.1)] focus:outline-none focus:border-[#635BFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#17172A] mb-1">Platform</label>
                      <select
                        value={genPlatform}
                        onChange={(e) => setGenPlatform(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[rgba(20,20,40,0.1)] bg-white focus:outline-none focus:border-[#635BFF]"
                      >
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Instagram Reels">Instagram Reels</option>
                        <option value="YouTube Shorts">YouTube Shorts</option>
                        <option value="X / Twitter">X / Twitter</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-[#17172A] mb-1">Tone</label>
                      <input
                        type="text"
                        value={genTone}
                        onChange={(e) => setGenTone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[rgba(20,20,40,0.1)] focus:outline-none focus:border-[#635BFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#17172A] mb-1">Target Duration</label>
                      <select
                        value={genDuration}
                        onChange={(e) => setGenDuration(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[rgba(20,20,40,0.1)] bg-white focus:outline-none focus:border-[#635BFF]"
                      >
                        <option value={30}>30 seconds</option>
                        <option value={45}>45 seconds</option>
                        <option value={60}>60 seconds</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleRunGenerator}
                    disabled={isGeneratingHooks}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold btn-primary-gradient flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>{isGeneratingHooks ? 'Synthesizing...' : 'Generate Script, Hooks & CTA'}</span>
                  </button>
                </div>

                {/* Generated Results */}
                {hookResults && (
                  <div className="mt-4 pt-4 border-t border-[rgba(20,20,40,0.06)] space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF] block mb-2">
                        Generated Viral Hooks
                      </span>
                      <div className="space-y-2">
                        {hookResults.hooks.map((hook, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-[#FAFAF7] border border-[rgba(20,20,40,0.06)] text-xs flex items-start justify-between gap-2"
                          >
                            <span className="text-[#17172A] leading-relaxed">&ldquo;{hook}&rdquo;</span>
                            <button
                              onClick={() => copyText(hook, 'hook')}
                              className="text-[#68697A] hover:text-[#635BFF] shrink-0 p-1"
                              title="Copy hook"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#17172A]">
                          Timed Script Breakdown
                        </span>
                        <button
                          onClick={() => copyText(hookResults.script, 'script')}
                          className="text-[11px] text-[#635BFF] font-semibold"
                        >
                          Copy Script
                        </button>
                      </div>
                      <div className="p-3 bg-[#F7F8FC] rounded-xl text-xs text-[#17172A] whitespace-pre-line leading-relaxed font-mono">
                        {hookResults.script}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
