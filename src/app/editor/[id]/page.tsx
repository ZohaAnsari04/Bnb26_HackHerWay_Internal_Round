'use client';

import React, { useState, useRef, useEffect, use } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/AppShell';
import {
  Scissors,
  Crop,
  Type,
  Sparkles,
  Volume2,
  Palette,
  Maximize2,
  Undo2,
  Redo2,
  Play,
  Pause,
  Download,
  Share2,
  Copy,
  Check,
  ChevronLeft,
  Sliders,
  CheckCircle2,
  Layers,
  Settings2,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AspectRatio, CaptionStyle, PlatformType } from '@/types';
import { CAPTION_PRESETS } from '@/services/ai/captions';

interface EditorPageProps {
  params: Promise<{ id: string }>;
}

export default function EditorPage({ params }: EditorPageProps) {
  const resolvedParams = use(params);
  const clipId = resolvedParams.id;

  const {
    clips,
    updateClip,
    openScheduleModal,
    platformCopies,
    showToast
  } = useApp();

  // Active clip
  const currentClip = clips.find((c) => c.id === clipId) || clips[0];

  // Tool Selection on Left Rail
  const [activeTool, setActiveTool] = useState<'captions' | 'hook' | 'format' | 'trim' | 'adapt' | 'audio'>('captions');

  // Video and Playback State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const clipDuration = currentClip?.duration || 45;

  // Editor editable properties
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(currentClip?.aspectRatio || '9:16');
  const [hookText, setHookText] = useState(currentClip?.hookText || "You're probably using AI WRONG.");
  const [hookDuration, setHookDuration] = useState(4); // seconds
  const [captionPreset, setCaptionPreset] = useState<'minimal' | 'bold' | 'dynamic'>(
    (currentClip?.captionStyle?.id as any) || 'dynamic'
  );
  const [fontSize, setFontSize] = useState(currentClip?.captionStyle?.fontSize || 24);
  const [fontFamily, setFontFamily] = useState(currentClip?.captionStyle?.fontFamily || 'Inter');
  const [captionPosition, setCaptionPosition] = useState<'top' | 'middle' | 'bottom'>(
    currentClip?.captionStyle?.position || 'middle'
  );
  const [textColor, setTextColor] = useState(currentClip?.captionStyle?.textColor || '#FFFFFF');
  const [highlightColor, setHighlightColor] = useState(currentClip?.captionStyle?.highlightColor || '#EC4899');

  // Multi-platform selected tab
  const [adaptPlatform, setAdaptPlatform] = useState<PlatformType>('instagram');

  // Playhead animation
  useEffect(() => {
    let anim: number;
    if (isPlaying) {
      anim = requestAnimationFrame(() => {
        setPlaybackTime((prev) => {
          if (prev >= clipDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.05;
        });
      });
    }
    return () => cancelAnimationFrame(anim);
  }, [isPlaying, playbackTime, clipDuration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSaveEdits = () => {
    updateClip(currentClip.id, {
      hookText,
      aspectRatio,
      captionStyle: {
        id: captionPreset,
        fontFamily,
        fontSize,
        textColor,
        highlightColor,
        position: captionPosition,
        animation: captionPreset === 'dynamic' ? 'word-by-word' : captionPreset === 'bold' ? 'bounce' : 'none'
      }
    });
    showToast('All modifications saved to clip');
  };

  const handleExport = () => {
    const filename = `${currentClip.title.replace(/\s+/g, '_')}_rendered.mp4`;
    const blob = new Blob([`CreatorAI Rendered Clip: ${currentClip.title}\nAspect: ${aspectRatio}\nCaption: ${captionPreset}`], {
      type: 'text/plain;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`Export complete: ${filename}`);
  };

  const copyPlatformCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard`);
  };

  // Synchronized Caption Words Simulation (Section 17)
  const captionWords = [
    { word: "You're", at: 0.2 },
    { word: "probably", at: 0.6 },
    { word: "using", at: 1.1 },
    { word: "AI", at: 1.5 },
    { word: "WRONG.", at: 2.0 },
    { word: "Most", at: 2.8 },
    { word: "engineers", at: 3.2 },
    { word: "treat", at: 3.7 },
    { word: "it", at: 4.1 },
    { word: "as", at: 4.4 },
    { word: "autocomplete", at: 4.8 },
    { word: "instead", at: 5.6 },
    { word: "of", at: 5.9 },
    { word: "an", at: 6.2 },
    { word: "autonomous", at: 6.6 },
    { word: "loop.", at: 7.2 }
  ];

  const currentWordIndex = captionWords.findIndex(
    (w, i) => playbackTime >= w.at && (i === captionWords.length - 1 || playbackTime < captionWords[i + 1].at)
  );

  return (
    <AppShell>
      <div className="space-y-4">
        {/* Editor Top Bar (Undo, Redo, Preview, Export) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(20,20,40,0.06)]">
          <div className="flex items-center gap-3">
            <Link
              href="/clips"
              className="p-1.5 rounded-lg border border-[rgba(20,20,40,0.1)] text-[#68697A] hover:text-[#17172A] hover:bg-[#FAFAF7] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-[#17172A] truncate max-w-sm">
                  {currentClip.title}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#635BFF]/10 text-[#635BFF] text-[10px] font-bold">
                  {aspectRatio}
                </span>
              </div>
              <span className="text-xs text-[#68697A]">AI-assisted short-form framing & styling</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Undo action')}
              className="p-2 rounded-lg border border-[rgba(20,20,40,0.1)] text-[#68697A] hover:text-[#17172A] hover:bg-[#FAFAF7]"
              title="Undo"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => showToast('Redo action')}
              className="p-2 rounded-lg border border-[rgba(20,20,40,0.1)] text-[#68697A] hover:text-[#17172A] hover:bg-[#FAFAF7]"
              title="Redo"
            >
              <Redo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleSaveEdits}
              className="px-3.5 py-2 rounded-xl border border-[rgba(20,20,40,0.12)] text-xs font-semibold text-[#17172A] hover:bg-[#FAFAF7]"
            >
              Save Edits
            </button>
            <button
              onClick={() => openScheduleModal(currentClip)}
              className="px-3.5 py-2 rounded-xl border border-[rgba(20,20,40,0.12)] text-xs font-semibold text-[#17172A] hover:bg-[#FAFAF7]"
            >
              Schedule
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 rounded-xl text-xs font-semibold btn-primary-gradient flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Clip</span>
            </button>
          </div>
        </div>

        {/* 3-Column Studio Workspace: Left Tools Rail (2 cols), Center Preview (6 cols), Right Inspector (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT TOOLS RAIL (Prompt Section 16: Trim, Crop, Captions, Hook, Audio, Brand, Format) */}
          <div className="lg:col-span-2 card-clean card-premium p-2 flex lg:flex-col gap-1 overflow-x-auto">
            {[
              { id: 'captions', label: 'Captions', icon: Type },
              { id: 'hook', label: 'Opening Hook', icon: Sparkles },
              { id: 'format', label: 'Aspect Ratio', icon: Crop },
              { id: 'adapt', label: 'Adaptations', icon: Share2 },
              { id: 'trim', label: 'Trim & Cuts', icon: Scissors },
              { id: 'audio', label: 'Audio & Mix', icon: Volume2 },
            ].map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;

              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id as any)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#F3F0FF] text-[#635BFF] shadow-2xs font-bold border border-[#635BFF]/20'
                      : 'text-[#68697A] hover:text-[#17172A] hover:bg-[#FAFAF7]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tool.label}</span>
                </button>
              );
            })}
          </div>

          {/* CENTER PREVIEW (Video Canvas + Dynamic Caption Overlay + Aspect Ratio framing) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="card-clean card-premium p-4 flex flex-col items-center justify-center bg-[#F7F8FC] min-h-[460px]">
              {/* Aspect Ratio Viewport Container */}
              <div
                className={`relative bg-[#17172A] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex items-center justify-center ${
                  aspectRatio === '9:16'
                    ? 'w-[250px] h-[440px]'
                    : aspectRatio === '1:1'
                    ? 'w-[360px] h-[360px]'
                    : 'w-full aspect-video'
                }`}
              >
                {/* Background Video Media */}
                <img
                  src={currentClip.thumbnailUrl}
                  alt="Clip preview"
                  className="w-full h-full object-cover opacity-90"
                />

                {/* Opening Hook Overlay (visible during hookDuration seconds) */}
                {playbackTime <= hookDuration && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-8 left-4 right-4 z-20 pointer-events-none"
                  >
                    <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#635BFF] to-[#EC4899] text-white text-center shadow-md">
                      <span className="text-[10px] uppercase font-bold tracking-widest block opacity-90">
                        ⚡ AI Hook
                      </span>
                      <p className="text-xs font-bold leading-tight mt-0.5">
                        &ldquo;{hookText}&rdquo;
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Live Caption Overlay (Section 17: Minimal, Bold, Dynamic with progressive highlighting) */}
                <div
                  className={`absolute left-4 right-4 z-20 text-center pointer-events-none transition-all ${
                    captionPosition === 'top'
                      ? 'top-14'
                      : captionPosition === 'bottom'
                      ? 'bottom-8'
                      : 'top-1/2 -translate-y-1/2'
                  }`}
                >
                  <div
                    className={`inline-block px-3 py-2 rounded-xl transition-all ${
                      captionPreset === 'bold'
                        ? 'bg-white text-[#17172A] shadow-md border border-black/10'
                        : captionPreset === 'dynamic'
                        ? 'bg-black/75 backdrop-blur-md text-white shadow-xl'
                        : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                    }`}
                    style={{
                      fontFamily,
                      fontSize: `${fontSize}px`,
                      color: captionPreset === 'bold' ? '#17172A' : textColor
                    }}
                  >
                    {captionWords.slice(0, 8).map((wordObj, i) => {
                      const isHighlighted = i === currentWordIndex;
                      return (
                        <span
                          key={i}
                          className={`inline-block mr-1 transition-all duration-150 ${
                            isHighlighted
                              ? 'scale-110 font-black'
                              : 'font-bold opacity-90'
                          }`}
                          style={{
                            color: isHighlighted ? highlightColor : undefined,
                            textShadow: isHighlighted ? `0 0 10px ${highlightColor}60` : undefined
                          }}
                        >
                          {wordObj.word}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Play/Pause Center Trigger */}
                <button
                  onClick={togglePlay}
                  className="absolute w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-[#17172A] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-[#17172A]" />
                  ) : (
                    <Play className="w-5 h-5 fill-[#17172A] ml-0.5" />
                  )}
                </button>
              </div>

              {/* Time progress */}
              <div className="mt-3 flex items-center gap-3 text-xs text-[#68697A]">
                <span className="font-mono text-[#17172A] font-semibold">
                  00:{Math.floor(playbackTime).toString().padStart(2, '0')} / 00:{clipDuration}
                </span>
                <span>•</span>
                <span>Aspect: {aspectRatio}</span>
                <span>•</span>
                <span>Style: {captionPreset}</span>
              </div>
            </div>

            {/* BOTTOM TIMELINE (Prompt Section 16: Video track, Caption track, Hook track, Audio waveform) */}
            <div className="card-clean card-premium p-4 space-y-2.5 bg-white">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-[rgba(20,20,40,0.06)]">
                <span className="font-bold text-[#17172A]">Multi-Track Timeline</span>
                <span className="text-[11px] text-[#68697A]">45.0s Region</span>
              </div>

              {/* Playhead bar */}
              <div
                className="relative w-full h-2 bg-[#E9ECF5] rounded-full cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  setPlaybackTime(pct * clipDuration);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-[#635BFF] to-[#EC4899] rounded-full relative"
                  style={{ width: `${(playbackTime / clipDuration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#17172A] border-2 border-white shadow-md" />
                </div>
              </div>

              {/* Track 1: Hook Track */}
              <div className="flex items-center gap-2 text-[11px]">
                <span className="w-16 font-semibold text-[#68697A] shrink-0">Hook</span>
                <div className="flex-1 h-5 rounded-md bg-[#EC4899]/15 border border-[#EC4899]/30 relative flex items-center px-2 overflow-hidden">
                  <span className="text-[10px] font-bold text-[#EC4899] truncate">
                    &ldquo;{hookText}&rdquo; (0s - {hookDuration}s)
                  </span>
                </div>
              </div>

              {/* Track 2: Captions Track */}
              <div className="flex items-center gap-2 text-[11px]">
                <span className="w-16 font-semibold text-[#68697A] shrink-0">Captions</span>
                <div className="flex-1 h-5 rounded-md bg-[#635BFF]/15 border border-[#635BFF]/30 relative flex items-center px-2 overflow-hidden">
                  <span className="text-[10px] font-bold text-[#635BFF] truncate">
                    AI Auto-Sync Captions ({captionPreset})
                  </span>
                </div>
              </div>

              {/* Track 3: Video Track */}
              <div className="flex items-center gap-2 text-[11px]">
                <span className="w-16 font-semibold text-[#68697A] shrink-0">Video</span>
                <div className="flex-1 h-5 rounded-md bg-[#06B6D4]/15 border border-[#06B6D4]/30 relative flex items-center px-2 overflow-hidden">
                  <span className="text-[10px] font-bold text-[#06B6D4] truncate">
                    Cropped Keynote Footage (1080x1920)
                  </span>
                </div>
              </div>

              {/* Track 4: Audio Track */}
              <div className="flex items-center gap-2 text-[11px]">
                <span className="w-16 font-semibold text-[#68697A] shrink-0">Audio</span>
                <div className="flex-1 h-5 rounded-md bg-[#22C55E]/15 border border-[#22C55E]/30 relative flex items-center px-2 overflow-hidden">
                  <span className="text-[10px] font-bold text-[#22C55E] truncate">
                    Denoised Speech + Low-end Polish
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PROPERTY INSPECTOR (Prompt Section 16 & 18: Caption Settings, Hook Settings, Multi-platform adaptation) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Tool: Captions Settings */}
            {activeTool === 'captions' && (
              <div className="card-clean card-premium p-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[rgba(20,20,40,0.06)]">
                  <h3 className="text-sm font-bold text-[#17172A]">Caption Styling</h3>
                  <span className="badge-soft-purple text-[11px] font-bold px-2 py-0.5 rounded-full">AI Synced</span>
                </div>

                {/* Preset Style: Minimal, Bold, Dynamic */}
                <div>
                  <label className="block text-xs font-semibold text-[#17172A] mb-1.5">
                    Style Preset
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['dynamic', 'bold', 'minimal'] as const).map((pst) => (
                      <button
                        key={pst}
                        onClick={() => {
                          setCaptionPreset(pst);
                          if (pst === 'bold') {
                            setHighlightColor('#635BFF');
                            setTextColor('#17172A');
                          } else if (pst === 'dynamic') {
                            setHighlightColor('#EC4899');
                            setTextColor('#FFFFFF');
                          } else {
                            setHighlightColor('#06B6D4');
                            setTextColor('#FFFFFF');
                          }
                        }}
                        className={`px-2.5 py-2 text-xs rounded-xl border font-bold capitalize transition-all ${
                          captionPreset === pst
                            ? 'border-[#635BFF] bg-[#635BFF]/5 text-[#635BFF]'
                            : 'border-[rgba(20,20,40,0.1)] hover:bg-[#FAFAF7] text-[#17172A]'
                        }`}
                      >
                        {pst}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size & Family */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#17172A] mb-1">
                      Font Size ({fontSize}px)
                    </label>
                    <input
                      type="range"
                      min={16}
                      max={36}
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#17172A] mb-1">
                      Typography
                    </label>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[rgba(20,20,40,0.1)] bg-white text-[#17172A]"
                    >
                      <option value="Inter">Inter (Clean)</option>
                      <option value="Geist">Geist (Modern)</option>
                      <option value="Manrope">Manrope (Geometric)</option>
                    </select>
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="block text-xs font-semibold text-[#17172A] mb-1.5">
                    Position
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['top', 'middle', 'bottom'] as const).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setCaptionPosition(pos)}
                        className={`px-2 py-1.5 text-xs rounded-xl border font-medium capitalize transition-all ${
                          captionPosition === pos
                            ? 'border-[#635BFF] bg-[#635BFF]/5 text-[#635BFF]'
                            : 'border-[rgba(20,20,40,0.1)] hover:bg-[#FAFAF7] text-[#68697A]'
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Highlight Accent Color */}
                <div>
                  <label className="block text-xs font-semibold text-[#17172A] mb-1.5">
                    Active Word Highlight
                  </label>
                  <div className="flex items-center gap-2">
                    {['#EC4899', '#635BFF', '#06B6D4', '#F59E0B', '#22C55E'].map((clr) => (
                      <button
                        key={clr}
                        onClick={() => setHighlightColor(clr)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          highlightColor === clr ? 'scale-110 border-[#17172A]' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: clr }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tool: Hook Settings */}
            {activeTool === 'hook' && (
              <div className="card-clean p-5 space-y-4">
                <div className="pb-2 border-b border-[rgba(20,20,40,0.06)]">
                  <h3 className="text-sm font-bold text-[#17172A]">Hook Settings</h3>
                  <p className="text-xs text-[#68697A]">Opening 3-second retention anchor</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17172A] mb-1">
                    Hook Text
                  </label>
                  <textarea
                    rows={3}
                    value={hookText}
                    onChange={(e) => setHookText(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[rgba(20,20,40,0.1)] focus:outline-none focus:border-[#635BFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17172A] mb-1">
                    Display Duration ({hookDuration} seconds)
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={8}
                    value={hookDuration}
                    onChange={(e) => setHookDuration(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Tool: Aspect Ratio Format */}
            {activeTool === 'format' && (
              <div className="card-clean p-5 space-y-4">
                <div className="pb-2 border-b border-[rgba(20,20,40,0.06)]">
                  <h3 className="text-sm font-bold text-[#17172A]">Aspect Ratio & Cropping</h3>
                  <p className="text-xs text-[#68697A]">Subject centering across channels</p>
                </div>

                <div className="space-y-2">
                  {[
                    { ratio: '9:16', label: '9:16 Vertical (Reels / Shorts / TikTok)' },
                    { ratio: '1:1', label: '1:1 Square (LinkedIn / Instagram Feed)' },
                    { ratio: '16:9', label: '16:9 Landscape (YouTube / Desktop)' }
                  ].map((item) => (
                    <button
                      key={item.ratio}
                      onClick={() => setAspectRatio(item.ratio as AspectRatio)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        aspectRatio === item.ratio
                          ? 'border-[#635BFF] bg-[#635BFF]/5 text-[#635BFF]'
                          : 'border-[rgba(20,20,40,0.1)] hover:bg-[#FAFAF7] text-[#17172A]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tool: Multi-Platform Adaptation (Prompt Section 18: Instagram, Shorts, LinkedIn, YouTube) */}
            {activeTool === 'adapt' && (
              <div className="card-clean p-5 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-[#17172A]">Adapt for Every Platform</h3>
                  <p className="text-xs text-[#68697A]">Tailored dimensions, captions, title, and hashtags</p>
                </div>

                {/* Platform tabs */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-[#F7F8FC] rounded-xl border border-[rgba(20,20,40,0.06)]">
                  {[
                    { id: 'instagram', label: 'Instagram' },
                    { id: 'youtube_shorts', label: 'Shorts' },
                    { id: 'linkedin', label: 'LinkedIn' },
                    { id: 'youtube', label: 'YouTube' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setAdaptPlatform(p.id as PlatformType);
                        if (p.id === 'instagram' || p.id === 'youtube_shorts') setAspectRatio('9:16');
                        else if (p.id === 'linkedin') setAspectRatio('1:1');
                        else setAspectRatio('16:9');
                      }}
                      className={`py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                        adaptPlatform === p.id
                          ? 'bg-white text-[#635BFF] shadow-2xs'
                          : 'text-[#68697A] hover:text-[#17172A]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Adapted Content Card */}
                {(() => {
                  const copies = platformCopies['opp-1'] || [];
                  const activeCopy = copies.find((c) => c.platform === adaptPlatform) || copies[0];

                  return (
                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-[#17172A]">Title</span>
                          <button
                            onClick={() => copyPlatformCopy(activeCopy.title, 'title')}
                            className="text-[11px] text-[#635BFF] font-semibold flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" /> Copy
                          </button>
                        </div>
                        <div className="p-2.5 bg-[#FAFAF7] rounded-xl border border-[rgba(20,20,40,0.06)] text-[#17172A] font-medium">
                          {activeCopy.title}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-[#17172A]">Caption</span>
                          <button
                            onClick={() => copyPlatformCopy(activeCopy.caption, 'caption')}
                            className="text-[11px] text-[#635BFF] font-semibold flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" /> Copy
                          </button>
                        </div>
                        <div className="p-2.5 bg-[#FAFAF7] rounded-xl border border-[rgba(20,20,40,0.06)] text-[#17172A] whitespace-pre-line leading-relaxed max-h-40 overflow-y-auto">
                          {activeCopy.caption}
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-[#17172A] block mb-1">Hashtags</span>
                        <div className="flex flex-wrap gap-1">
                          {activeCopy.hashtags.map((h) => (
                            <span
                              key={h}
                              className="px-2 py-0.5 rounded-md bg-[#F7F8FC] border border-[rgba(20,20,40,0.06)] text-[#635BFF] text-[10px]"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Other tools fallback info */}
            {(activeTool === 'trim' || activeTool === 'audio') && (
              <div className="card-clean p-5 space-y-3 text-xs">
                <h3 className="text-sm font-bold text-[#17172A] capitalize">{activeTool} Parameters</h3>
                <p className="text-[#68697A]">
                  AI smart cut algorithm set to remove silent gaps &gt; 400ms and level voice loudness to -14 LUFS.
                </p>
                <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[rgba(20,20,40,0.06)] space-y-1.5">
                  <div className="flex justify-between">
                    <span>Noise gate</span>
                    <span className="font-bold text-[#22C55E]">Active (-42dB)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speech isolation</span>
                    <span className="font-bold text-[#635BFF]">Studio Quality</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
