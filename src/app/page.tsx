'use client';

import React from 'react';
import Link from 'next/link';
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
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ScoreRing } from '@/components/ScoreRing';
import { AICoreVisual } from '@/components/AICoreVisual';
import { FloatingBubbles } from '@/components/FloatingBubbles';

export default function LandingPage() {
  const steps = [
    { num: '01', title: 'Upload', desc: 'Drop any podcast, video, or keynote. We extract studio-quality audio in seconds.' },
    { num: '02', title: 'Understand', desc: 'Whisper large-v3 transcribes phonemes while semantic models cluster themes and topics.' },
    { num: '03', title: 'Create', desc: 'Algorithms detect high-retention hooks and crop subjects with responsive framing.' },
    { num: '04', title: 'Adapt', desc: 'One click formats dimensions, writes platform-specific copy, and generates hashtags.' },
    { num: '05', title: 'Publish', desc: 'Queue scheduled posts into an editorial calendar synced to your social channels.' },
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#17172A] selection:bg-[#635BFF]/15 selection:text-[#635BFF] relative">
      <FloatingBubbles />
      {/* Top Header */}
      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#635BFF] via-[#8B5CF6] to-[#EC4899] flex items-center justify-center shadow-[0_2px_10px_rgba(99,91,255,0.3)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
              <path
                d="M12 2L13.8 8.2C14.1 9.3 14.7 9.9 15.8 10.2L22 12L15.8 13.8C14.7 14.1 14.1 14.7 13.8 15.8L12 22L10.2 15.8C9.9 14.7 9.3 14.1 8.2 13.8L2 12L8.2 10.2C9.3 9.9 9.9 9.3 10.2 8.2L12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight">CreatorAI</span>
            <span className="text-[10px] text-[#68697A] block -mt-1 font-medium">Operating Platform</span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#68697A]">
          <a href="#how-it-works" className="hover:text-[#17172A] transition-colors">How it works</a>
          <a href="#engine" className="hover:text-[#17172A] transition-colors">AI Content Engine</a>
          <a href="#workflow" className="hover:text-[#17172A] transition-colors">Workflow</a>
          <Link href="/analytics" className="hover:text-[#17172A] transition-colors">Intelligence</Link>
        </nav>

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
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#635BFF]/10 via-[#EC4899]/5 to-transparent rounded-full filter blur-3xl pointer-events-none" />

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

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 border-t border-[rgba(20,20,40,0.06)] bg-white/75 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF]">
              Unified Creator Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#17172A] mt-2">
              From one asset to a syndication engine
            </h2>
            <p className="text-sm sm:text-base text-[#68697A] mt-3">
              No more switching between transcription software, Premiere, caption generators, and scheduling spreadsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((st) => (
              <div
                key={st.num}
                className="p-5 rounded-2xl bg-[#FAFAF7] border border-[rgba(20,20,40,0.06)] hover:border-[#635BFF]/25 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-[#635BFF]/30 block mb-2 font-mono">
                    {st.num}
                  </span>
                  <h3 className="text-base font-bold text-[#17172A]">{st.title}</h3>
                  <p className="text-xs text-[#68697A] mt-2 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
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
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#635BFF] to-[#EC4899] flex items-center justify-center text-white text-[10px] font-bold">
              C
            </div>
            <span className="font-semibold text-[#17172A]">CreatorAI Platform</span>
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
