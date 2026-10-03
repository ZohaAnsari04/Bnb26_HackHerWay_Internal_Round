'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Play,
  Film,
  Scissors,
  Share2,
  Calendar,
  BarChart3,
  CheckCircle2,
  Layers,
  ChevronRight,
  TrendingUp,
  Cpu,
  Zap,
  Globe,
  Upload,
  Flame,
  Check,
  FileVideo,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ScoreRing } from '@/components/ScoreRing';
import { AICoreVisual } from '@/components/AICoreVisual';
import { FloatingAppIcons } from '@/components/FloatingAppIcons';
import { ColorfulBackgroundGlow } from '@/components/ColorfulBackgroundGlow';
import { NavBar } from '@/components/ui/tubelight-navbar';

export default function LandingPage() {
  const pipelineSteps = [
    {
      num: '01',
      stage: 'INGESTION',
      title: 'Upload',
      subtitle: 'Lossless Media Intake',
      desc: 'Drop any podcast, video, or keynote. We extract studio-grade 48kHz audio and lossless 4K video in seconds.',
      icon: Upload,
      gradient: 'from-[#635BFF] via-[#7C3AED] to-[#8B5CF6]',
      glowColor: 'rgba(99, 91, 255, 0.25)',
      badgeColor: 'text-[#635BFF] bg-[#635BFF]/10 border-[#635BFF]/20',
      stat: '⚡ 4.2s Transcode',
      preview: (
        <div className="rounded-2xl bg-white/90 border border-[#635BFF]/15 p-3 shadow-xs flex flex-col justify-between h-[142px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-[#635BFF]/10 flex items-center justify-center text-[#635BFF]">
                <FileVideo className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-[#17172A] truncate max-w-[85px]">podcast_ep42.mp4</p>
                <p className="text-[9px] text-[#68697A]">4K • 60fps • 48kHz</p>
              </div>
            </div>
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
              Lossless
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-1.5 h-8 my-1 px-2 py-1 rounded-xl bg-slate-50/80">
            <span className="w-1.5 rounded-full bg-gradient-to-t from-[#635BFF] to-[#A855F7] animate-audio-bar-1" />
            <span className="w-1.5 rounded-full bg-gradient-to-t from-[#635BFF] to-[#A855F7] animate-audio-bar-2" />
            <span className="w-1.5 rounded-full bg-gradient-to-t from-[#635BFF] to-[#A855F7] animate-audio-bar-3" />
            <span className="w-1.5 rounded-full bg-gradient-to-t from-[#635BFF] to-[#A855F7] animate-audio-bar-4" />
            <span className="w-1.5 rounded-full bg-gradient-to-t from-[#635BFF] to-[#A855F7] animate-audio-bar-5" />
            <span className="w-1.5 rounded-full bg-gradient-to-t from-[#635BFF] to-[#A855F7] animate-audio-bar-6" />
            <span className="w-1.5 rounded-full bg-gradient-to-t from-[#635BFF] to-[#A855F7] animate-audio-bar-7" />
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#68697A] border-t border-slate-100 pt-1">
            <span className="flex items-center gap-1 text-[#635BFF] font-medium text-[9px]">
              <Sparkles className="w-2.5 h-2.5" /> High-Fidelity
            </span>
            <span className="font-semibold text-emerald-600 text-[9px]">Ready</span>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      stage: 'COGNITIVE',
      title: 'Understand',
      subtitle: 'Neural Speech & Topics',
      desc: 'Whisper large-v3 transcribes phonemes while deep semantic models cluster themes, tone shifts, and topic clusters.',
      icon: Cpu,
      gradient: 'from-[#06B6D4] via-[#0284C7] to-[#3B82F6]',
      glowColor: 'rgba(6, 182, 212, 0.25)',
      badgeColor: 'text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20',
      stat: '99.8% Precision',
      preview: (
        <div className="rounded-2xl bg-white/90 border border-[#06B6D4]/15 p-3 shadow-xs flex flex-col justify-between h-[142px]">
          <div className="flex flex-wrap gap-1">
            <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full bg-[#06B6D4]/10 text-[#0284C7] border border-[#06B6D4]/20">
              #AI-Scale
            </span>
            <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
              #Retention
            </span>
            <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200">
              #ViralHook
            </span>
          </div>

          <div className="my-1 p-1.5 rounded-xl bg-slate-50/80 border border-slate-100 text-left">
            <p className="text-[9px] text-[#17172A] font-medium leading-snug line-clamp-2 italic">
              &quot;...the reason 90% of creators fail isn&apos;t quality, it&apos;s pacing...&quot;
            </p>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#68697A] border-t border-slate-100 pt-1">
            <span className="flex items-center gap-1 text-[#0284C7] font-medium text-[9px]">
              <Cpu className="w-2.5 h-2.5" /> Whisper-v3
            </span>
            <span className="font-semibold text-sky-600 text-[9px]">99.8%</span>
          </div>
        </div>
      ),
    },
    {
      num: '03',
      stage: 'DIRECTOR',
      title: 'Create',
      subtitle: 'Smart Framing & Hooks',
      desc: 'Algorithms detect high-retention emotional hooks and crop subjects with intelligent responsive face framing.',
      icon: Scissors,
      gradient: 'from-[#EC4899] via-[#F43F5E] to-[#FB7185]',
      glowColor: 'rgba(236, 72, 153, 0.25)',
      badgeColor: 'text-[#EC4899] bg-[#EC4899]/10 border-[#EC4899]/20',
      stat: '94 Virality Score',
      preview: (
        <div className="rounded-2xl bg-white/90 border border-[#EC4899]/15 p-3 shadow-xs flex flex-col justify-between h-[142px]">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-1">
              <Flame className="w-2.5 h-2.5 text-rose-500 fill-rose-500" /> 94 Score
            </span>
            <span className="text-[8px] font-mono text-[#68697A]">02:14 - 02:46</span>
          </div>

          <div className="relative my-1 h-9 rounded-xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-purple-500/10 border border-rose-200/50 flex items-center justify-between px-2.5">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[9px] font-bold text-[#17172A]">9:16 Crop</span>
            </div>
            <span className="text-[8px] px-1 py-0.5 rounded bg-white font-mono text-rose-600 font-bold shadow-2xs">
              Face Centered
            </span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#68697A] border-t border-slate-100 pt-1">
            <span className="text-[#EC4899] font-medium text-[9px]">Autocut Model</span>
            <span className="font-semibold text-rose-600 text-[9px]">32s Hook</span>
          </div>
        </div>
      ),
    },
    {
      num: '04',
      stage: 'MULTI-FORMAT',
      title: 'Adapt',
      subtitle: 'Copy & Multi-Aspect',
      desc: 'One click formats dimensions, writes platform-specific copy, and generates hashtags tailored for each algorithm.',
      icon: Layers,
      gradient: 'from-[#8B5CF6] via-[#7C3AED] to-[#635BFF]',
      glowColor: 'rgba(139, 92, 246, 0.25)',
      badgeColor: 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/20',
      stat: '3 Dimensions',
      preview: (
        <div className="rounded-2xl bg-white/90 border border-[#8B5CF6]/15 p-3 shadow-xs flex flex-col justify-between h-[142px]">
          <div className="grid grid-cols-3 gap-1">
            <div className="p-1 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-center">
              <span className="text-[8px] font-bold text-[#7C3AED] block">9:16</span>
              <span className="text-[7px] text-[#68697A]">Reels</span>
            </div>
            <div className="p-1 rounded-lg bg-slate-50 border border-slate-200/60 text-center">
              <span className="text-[8px] font-semibold text-[#17172A] block">1:1</span>
              <span className="text-[7px] text-[#68697A]">Feed</span>
            </div>
            <div className="p-1 rounded-lg bg-slate-50 border border-slate-200/60 text-center">
              <span className="text-[8px] font-semibold text-[#17172A] block">16:9</span>
              <span className="text-[7px] text-[#68697A]">Web</span>
            </div>
          </div>

          <div className="p-1 rounded-lg bg-slate-50/80 border border-slate-100 text-left">
            <p className="text-[8px] text-[#68697A] truncate font-mono">
              &quot;Stop manually editing clips... 🧵👇 #ai&quot;
            </p>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#68697A] border-t border-slate-100 pt-1">
            <span className="text-[#8B5CF6] font-medium text-[9px]">#viral #creator</span>
            <span className="font-semibold text-purple-600 flex items-center gap-0.5 text-[9px]">
              <Check className="w-2.5 h-2.5" /> Synthesized
            </span>
          </div>
        </div>
      ),
    },
    {
      num: '05',
      stage: 'DISTRIBUTE',
      title: 'Publish',
      subtitle: 'Zero-Click Syndication',
      desc: 'Queue scheduled posts into an editorial calendar synced directly to TikTok, YouTube, Instagram & LinkedIn.',
      icon: Share2,
      gradient: 'from-[#10B981] via-[#059669] to-[#06B6D4]',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      badgeColor: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20',
      stat: '4 Platforms',
      preview: (
        <div className="rounded-2xl bg-white/90 border border-[#10B981]/15 p-3 shadow-xs flex flex-col justify-between h-[142px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] font-bold text-emerald-700">Auto-Queued</span>
            </div>
            <span className="text-[8px] text-[#68697A] font-medium">Tomorrow, 09:30 AM</span>
          </div>

          <div className="my-1 p-1.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
            <span className="text-[8px] font-semibold text-[#17172A]">Direct Sync</span>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-rose-500/10 text-rose-600 text-[8px] font-bold flex items-center justify-center">YT</span>
              <span className="w-4 h-4 rounded-full bg-pink-500/10 text-pink-600 text-[8px] font-bold flex items-center justify-center">IG</span>
              <span className="w-4 h-4 rounded-full bg-blue-500/10 text-blue-600 text-[8px] font-bold flex items-center justify-center">LI</span>
              <span className="w-4 h-4 rounded-full bg-slate-900/10 text-slate-900 text-[8px] font-bold flex items-center justify-center">TT</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#68697A] border-t border-slate-100 pt-1">
            <span className="flex items-center gap-1 text-emerald-600 font-medium text-[9px]">
              <CheckCircle2 className="w-2.5 h-2.5" /> Synced to Calendar
            </span>
            <span className="font-semibold text-emerald-600 text-[9px]">Active</span>
          </div>
        </div>
      ),
    },
  ];

  const navItems = [
    { name: 'How it works', url: '#how-it-works', icon: Layers },
    { name: 'AI Engine', url: '#engine', icon: Cpu },
    { name: 'Workflow', url: '#workflow', icon: Zap },
    { name: 'Intelligence', url: '/analytics', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#17172A] selection:bg-[#635BFF]/15 selection:text-[#635BFF] relative overflow-hidden">
      {/* Dynamic Colorful Aurora Mesh Glows in background */}
      <ColorfulBackgroundGlow />

      {/* Floating Social Media & Content Creation Apps in background */}
      <FloatingAppIcons />

      {/* Floating Tubelight Navigation Bar */}
      <NavBar items={navItems} />

      {/* Top Header */}
      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-40">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo-full.png"
            alt="CreatorAI Content Operations"
            width={180}
            height={46}
            className="h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Desktop spacer to balance header */}
        <div className="hidden md:block w-32" />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 text-xs font-semibold text-[#17172A] hover:bg-black/5 rounded-xl transition-colors"
          >
            Explore Demo
          </Link>
          <Link
            href="/studio"
            className="px-4 py-2 text-xs font-semibold btn-primary-gradient flex items-center gap-1.5"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        {/* Soft background ambient gradient washes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1050px] h-[580px] bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(99,91,255,0.25),rgba(236,72,153,0.2),rgba(6,182,212,0.14),transparent)] rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[rgba(20,20,40,0.08)] shadow-2xs mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#635BFF] animate-ping" />
            <span className="text-xs font-semibold text-[#17172A]">CreatorAI Operating System 2.0</span>
            <span className="text-[#68697A]">•</span>
            <span className="text-xs text-[#635BFF] font-medium">Whisper + Multi-LLM Orchestration</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#17172A] leading-[1.12]"
          >
            Turn one piece of content into an{' '}
            <span className="text-gradient-primary">entire content engine.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-[#68697A] max-w-2xl mx-auto leading-relaxed"
          >
            CreatorAI understands your long-form content, finds the moments worth sharing, creates short-form clips, writes hooks and captions, and adapts everything for every platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="px-6 py-3.5 rounded-xl btn-primary-gradient text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <span>Start Creating</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/studio"
              className="px-6 py-3.5 rounded-xl bg-white border border-[rgba(20,20,40,0.1)] text-sm font-semibold text-[#17172A] hover:bg-[#FAFAF7] transition-all shadow-xs"
            >
              Explore Demo Project
            </Link>
          </motion.div>
        </div>

        {/* Hero Interactive Visual Canvas with Floating Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 max-w-5xl mx-auto relative"
        >
          {/* Main Product Showcase Card */}
          <div className="relative rounded-3xl bg-white border border-[rgba(20,20,40,0.08)] shadow-[0_25px_80px_rgba(20,20,60,0.1)] overflow-hidden">
            {/* Window bar */}
            <div className="h-11 px-5 border-b border-[rgba(20,20,40,0.06)] bg-[#FAFAF7] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]/60" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]/60" />
                <div className="w-3 h-3 rounded-full bg-[#22C55E]/60" />
              </div>
              <div className="text-[11px] font-medium text-[#68697A] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#635BFF]" />
                <span>CreatorAI Content Studio — AI & The Future of Work</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Dashboard UI Inside */}
            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#FAFAF7]">
              {/* Left Video Player Preview */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-4 border border-[rgba(20,20,40,0.06)] shadow-xs">
                <div className="relative aspect-video rounded-xl bg-[#17172A] overflow-hidden flex items-center justify-center group">
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                    alt="Keynote preview"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Play Button Overlay */}
                  <Link
                    href="/studio"
                    className="absolute w-14 h-14 rounded-full bg-white/90 backdrop-blur-md text-[#17172A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                  >
                    <Play className="w-6 h-6 fill-[#17172A] ml-1" />
                  </Link>

                  {/* Video Subtitle Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="inline-block px-3 py-1 rounded-md bg-black/75 backdrop-blur-md text-white text-xs font-semibold">
                      &ldquo;You&apos;re probably using AI WRONG.&rdquo;
                    </span>
                  </div>
                </div>

                {/* Micro Timeline Track */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs text-[#68697A]">
                    <span className="font-medium text-[#17172A]">Keynote Segment 00:23 → 01:08</span>
                    <span>10:42 Total</span>
                  </div>
                  <div className="w-full h-2 bg-[#E9ECF5] rounded-full overflow-hidden relative">
                    <div className="absolute left-[8%] right-[70%] h-full bg-gradient-to-r from-[#635BFF] to-[#EC4899] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Right Content Intelligence Panel */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 bg-white rounded-2xl border border-[rgba(20,20,40,0.06)] shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#635BFF]">
                      Top Detected Moment
                    </span>
                    <ScoreRing score={92} size={42} strokeWidth={4} />
                  </div>
                  <h4 className="text-sm font-bold text-[#17172A]">
                    &ldquo;The biggest mistake developers make with AI&rdquo;
                  </h4>
                  <p className="text-xs text-[#68697A] mt-1 leading-relaxed">
                    Hook score 94% • High standalone density • Immediate curiosity trigger.
                  </p>
                  <div className="mt-3 pt-3 border-t border-[rgba(20,20,40,0.06)] flex items-center justify-between">
                    <span className="text-[11px] text-[#22C55E] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Reels
                    </span>
                    <Link
                      href="/studio"
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold btn-primary-gradient"
                    >
                      Generate Clip
                    </Link>
                  </div>
                </div>

                {/* Key Themes Chips */}
                <div className="p-4 bg-white rounded-2xl border border-[rgba(20,20,40,0.06)] shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#68697A] block mb-2">
                    Semantic Themes Extracted
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['AI Agents', 'Developer Superpowers', 'System Architecture', 'Productivity'].map((th) => (
                      <span
                        key={th}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#F7F8FC] border border-[rgba(20,20,40,0.06)] text-[#17172A]"
                      >
                        {th}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating UI Badges around preview */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden sm:flex absolute -top-6 -left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[rgba(20,20,40,0.08)] shadow-[0_12px_30px_rgba(20,20,60,0.12)] items-center gap-3"
          >
            <ScoreRing score={92} size={44} strokeWidth={4} />
            <div>
              <p className="text-xs font-bold text-[#17172A]">92 Opportunity Score</p>
              <p className="text-[10px] text-[#68697A]">Top 5% viral retention potential</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden sm:flex absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[rgba(20,20,40,0.08)] shadow-[0_12px_30px_rgba(20,20,60,0.12)] items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#17172A]">Instagram • YouTube • LinkedIn</p>
              <p className="text-[10px] text-[#68697A]">Auto-formatted with native copy & hashtags</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section - Redesigned Interactive Workflow Pipeline */}
      <section id="how-it-works" className="py-24 px-6 border-t border-[rgba(20,20,40,0.06)] bg-white/70 backdrop-blur-md relative overflow-hidden">
        {/* Soft background ambient glow spots */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#635BFF]/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#EC4899]/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#635BFF]/20 shadow-xs mb-4 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#635BFF] animate-ping" />
              <span className="text-xs font-bold text-[#635BFF] tracking-wider uppercase">
                Unified Creator Architecture
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#17172A] mt-2 font-serif leading-tight">
              From one asset to a{' '}
              <span className="bg-gradient-to-r from-[#635BFF] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                syndication engine
              </span>
            </h2>
            
            <p className="text-sm sm:text-base text-[#68697A] mt-4 leading-relaxed max-w-2xl mx-auto">
              No more switching between transcription software, Premiere, caption generators, and scheduling spreadsheets. One autonomous pipeline turns hours of raw content into viral multi-platform distributions.
            </p>

            {/* Pipeline Latency Ribbon */}
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#635BFF]/6 via-[#EC4899]/6 to-[#06B6D4]/6 border border-[rgba(20,20,40,0.06)] text-xs font-medium text-[#17172A] shadow-xs">
              <span className="flex items-center gap-1.5 text-[#635BFF] font-semibold">
                <Zap className="w-3.5 h-3.5 fill-[#635BFF]" /> Fully Autonomous
              </span>
              <span className="text-slate-300">•</span>
              <span>5 Core Operations</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#06B6D4] font-semibold">~42s Total Latency</span>
            </div>
          </div>

          {/* Connected Pipeline Flow Line for Desktop */}
          <div className="hidden lg:flex items-center justify-between max-w-5xl mx-auto mb-8 px-10 relative">
            <div className="absolute top-1/2 left-16 right-16 h-0.5 bg-gradient-to-r from-[#635BFF]/30 via-[#EC4899]/30 to-[#10B981]/30 -translate-y-1/2 -z-0" />
            {pipelineSteps.map((st) => (
              <div key={st.num} className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-transform duration-300 hover:scale-110 shadow-xs border bg-white ${st.badgeColor}`}>
                  {st.num}
                </div>
                <span className="text-[10px] font-bold text-[#68697A] mt-1.5 uppercase tracking-wider">
                  {st.title}
                </span>
              </div>
            ))}
          </div>

          {/* The 5 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4.5 relative">
            {pipelineSteps.map((st, index) => {
              const Icon = st.icon;
              return (
                <motion.div
                  key={st.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group relative flex flex-col justify-between rounded-3xl p-5 bg-white/90 backdrop-blur-xl border border-[rgba(20,20,40,0.08)] hover:border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(99,91,255,0.18)]"
                >
                  {/* Glowing background gradient border on hover */}
                  <div
                    className={`absolute -inset-[1.5px] rounded-3xl bg-gradient-to-b ${st.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-[0.5px]`}
                  />

                  {/* Top glowing accent line */}
                  <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${st.gradient} mb-4 group-hover:w-full transition-all duration-500`} />

                  {/* Header: Stage Pill & Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded-full border ${st.badgeColor}`}>
                      STEP {st.num}
                    </span>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${st.badgeColor} group-hover:scale-110 transition-transform duration-300 shadow-2xs`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Titles */}
                  <div className="mb-2 text-left">
                    <h3 className="text-lg font-bold text-[#17172A] tracking-tight group-hover:text-[#635BFF] transition-colors">
                      {st.title}
                    </h3>
                    <p className="text-[11px] font-medium text-[#68697A]">
                      {st.subtitle}
                    </p>
                  </div>

                  {/* Micro-UI Visual Preview */}
                  <div className="my-2 transition-transform duration-300 group-hover:scale-[1.02]">
                    {st.preview}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#68697A] mt-2 leading-relaxed text-left">
                    {st.desc}
                  </p>

                  {/* Bottom Stat Chip */}
                  <div className="mt-4 pt-3 border-t border-[rgba(20,20,40,0.06)] flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9496A8]">
                      {st.stage}
                    </span>
                    <span className="text-[11px] font-semibold text-[#17172A]">
                      {st.stat}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Content Engine Feature Deep Dive */}
      <section id="engine" className="py-20 px-6 bg-[#FAFAF7]/60 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">
                Core Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#17172A] mt-2">
                Not a generic wrapper. A content operating system.
              </h2>
              <p className="text-sm text-[#68697A] mt-3 leading-relaxed">
                Most AI video tools just add burned-in subtitles. CreatorAI analyzes semantic information density, evaluates pacing spikes, and diagnoses why an audience member stays engaged.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#17172A]">Opportunity Scoring</h4>
                    <p className="text-xs text-[#68697A]">Composite algorithm weighting hook strength, information density, and standalone context.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EC4899]/10 text-[#EC4899] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#17172A]">Autonomous Aspect Framing</h4>
                    <p className="text-xs text-[#68697A]">Crop landscape keynote presentations into vertical 9:16 reels while keeping subjects centered.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#17172A]">Platform-Specific Adaptation</h4>
                    <p className="text-xs text-[#68697A]">Generates distinct copy for LinkedIn thought leadership, YouTube Shorts descriptions, and Instagram carousels.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[rgba(20,20,40,0.08)] shadow-[0_15px_50px_rgba(20,20,50,0.06)] flex items-center justify-center">
              <AICoreVisual
                size={260}
                label="Multi-LLM Semantic Engine"
                sublabel="Whisper large-v3 + Opportunity Scoring Diagnostic"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Pipeline / Lifecycle Section */}
      <section id="workflow" className="py-20 px-6 bg-white/75 backdrop-blur-sm border-t border-[rgba(20,20,40,0.06)]">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">
            Content Pipeline
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#17172A] mt-2">
            Every asset follows a high-velocity lifecycle
          </h2>
          <p className="text-sm text-[#68697A] mt-2 max-w-xl mx-auto">
            Maintain clear clarity across team members from the initial raw recording to scheduled publication.
          </p>

          {/* Workflow Stage Bar */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { stage: 'IDEA', count: '12 Ideas', color: '#68697A' },
              { stage: 'DRAFT', count: '8 Drafts', color: '#F59E0B' },
              { stage: 'AI ANALYSIS', count: '3 Processing', color: '#635BFF' },
              { stage: 'EDITING', count: '5 In Review', color: '#EC4899' },
              { stage: 'READY', count: '7 Approved', color: '#06B6D4' },
              { stage: 'SCHEDULED', count: '9 In Queue', color: '#8B5CF6' },
              { stage: 'PUBLISHED', count: '18 Live', color: '#22C55E' },
            ].map((item, idx) => (
              <Link
                key={item.stage}
                href="/dashboard"
                className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[rgba(20,20,40,0.07)] hover:border-[#635BFF]/30 hover:bg-[#F7F8FC] transition-all text-left group"
              >
                <span className="text-[10px] font-bold tracking-wider" style={{ color: item.color }}>
                  {item.stage}
                </span>
                <p className="text-xs font-semibold text-[#17172A] mt-1 group-hover:text-[#635BFF] transition-colors">
                  {item.count}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#FAFAF7]/75 to-[#F7F8FC]/75 backdrop-blur-xs border-t border-[rgba(20,20,40,0.06)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#17172A]">
            Ready to upgrade your creator operating system?
          </h2>
          <p className="text-base text-[#68697A] mt-3 max-w-xl mx-auto">
            Experience how CreatorAI unites scripting, clipping, captioning, and multi-channel scheduling into one interface.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3.5 rounded-xl btn-primary-gradient text-sm font-semibold flex items-center gap-2 shadow-lg"
            >
              <span>Open Creator Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/studio"
              className="px-6 py-3.5 rounded-xl bg-white border border-[rgba(20,20,40,0.1)] text-sm font-semibold text-[#17172A] hover:bg-[#FAFAF7]"
            >
              Explore AI Studio
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(20,20,40,0.06)] bg-white py-8 px-6 text-center text-xs text-[#68697A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo-icon.png"
              alt="CreatorAI"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <span className="font-semibold text-[#17172A]">CreatorAI Content Operations</span>
            <span>• Hackathon Edition</span>
          </div>
          <div>
            Built with Next.js, FastAPI, Whisper, and Creator Intelligence Architecture.
          </div>
        </div>
      </footer>
    </div>
  );
}
