'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/AppShell';
import { ScoreRing } from '@/components/ScoreRing';
import {
  Sparkles,
  Plus,
  UploadCloud,
  Film,
  Scissors,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Flame,
  Layers,
  Wand2,
  Share2,
  MoreVertical,
  Type,
  Calendar,
  Send,
  Upload,
  BarChart2,
  Check,
  Radio,
  FileText,
  FileAudio,
  FolderKanban
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const {
    projects,
    opportunities,
    clips,
    setIsUploadModalOpen,
    openClipModal,
    openScoreModal,
    setActiveProject,
    showToast
  } = useApp();

  const stats = [
    {
      label: 'Total Assets',
      value: '24',
      change: '18.4%',
      period: 'this month',
      color: '#635BFF',
      icon: Film,
      bg: 'rgba(99, 91, 255, 0.1)',
      svgPath: 'M0,25 C30,22 50,12 80,18 C110,24 130,5 160,8'
    },
    {
      label: 'AI Clips Generated',
      value: '87',
      change: '32.1%',
      period: 'this month',
      color: '#EC4899',
      icon: Scissors,
      bg: 'rgba(236, 72, 153, 0.1)',
      svgPath: 'M0,28 C30,26 60,18 90,20 C120,22 135,6 160,8'
    },
    {
      label: 'Published Content',
      value: '143',
      change: '14.6%',
      period: 'this month',
      color: '#22C55E',
      icon: CheckCircle2,
      bg: 'rgba(34, 197, 94, 0.1)',
      svgPath: 'M0,26 C40,24 70,16 100,22 C130,28 140,10 160,6'
    },
    {
      label: 'Content Opportunities',
      value: '12',
      change: '8.5%',
      period: 'detected',
      color: '#06B6D4',
      icon: BarChart2,
      bg: 'rgba(6, 182, 212, 0.1)',
      svgPath: 'M0,27 C30,27 60,19 90,24 C120,29 135,12 160,10'
    },
  ];

  const recentProjectsList = [
    {
      id: 'p-1',
      title: 'AI & The Future of Work',
      duration: '10:42',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      status: 'AI analysis complete',
      statusColor: '#22C55E',
      progress: 84,
      updated: '2 hours ago'
    },
    {
      id: 'p-2',
      title: 'Startup Journey',
      duration: '24:18',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      status: 'Processing...',
      statusColor: '#635BFF',
      progress: 22,
      updated: '5 hours ago'
    },
    {
      id: 'p-3',
      title: 'Tech Talk #08',
      duration: '18:36',
      thumbnail: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      status: 'Ready for clips',
      statusColor: '#22C55E',
      progress: 100,
      updated: '1 day ago'
    },
    {
      id: 'p-4',
      title: 'Creator Interview Series',
      duration: '32:14',
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      status: 'AI analyzing...',
      statusColor: '#8B5CF6',
      progress: 37,
      updated: '2 days ago'
    }
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* TOP HERO GREETING BANNER WITH CREATOR ARTWORK */}
        <div className="card-clean p-6 md:p-8 bg-gradient-to-r from-white via-[#FAF9FE] to-[#F5F2FE] border border-[rgba(20,20,40,0.06)] relative overflow-hidden">
          {/* Subtle ambient decorative gradient wash */}
          <div className="absolute top-0 right-0 w-[450px] h-[300px] bg-gradient-to-bl from-[#EC4899]/15 via-[#8B5CF6]/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Left Greeting & Process Pills */}
            <div className="max-w-xl">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17172A] leading-tight">
                Good morning, Creator 👋
              </h1>
              <p className="text-sm text-[#6B6B7A] mt-2 font-medium">
                Turn one idea into a complete content package across every social platform.
              </p>

              {/* Process Badges Pills Row matching Reference */}
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  { label: 'Upload', icon: Upload, color: '#635BFF' },
                  { label: 'AI Analysis', icon: Wand2, color: '#EC4899' },
                  { label: 'Generate Clips', icon: Scissors, color: '#8B5CF6' },
                  { label: 'Create Hooks', icon: Sparkles, color: '#F59E0B' },
                  { label: 'Adapt for Platforms', icon: Share2, color: '#06B6D4' },
                  { label: 'Publish', icon: Send, color: '#22C55E' },
                ].map((pill) => {
                  const Icon = pill.icon;
                  return (
                    <div
                      key={pill.label}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[rgba(20,20,40,0.08)] shadow-2xs text-[11px] font-semibold text-[#17172A]"
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: pill.color }} />
                      <span>{pill.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Creator Illustration Banner with Floating Social Icons */}
            <div className="relative flex items-center justify-center shrink-0 pr-4">
              <div className="relative w-64 h-36 flex items-center justify-center">
                {/* Floating Social Icons */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-1 left-2 w-8 h-8 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-md text-xs font-bold"
                >
                  IG
                </motion.div>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-3 left-20 w-8 h-8 rounded-xl bg-[#FF0000] text-white flex items-center justify-center shadow-md text-xs font-bold"
                >
                  YT
                </motion.div>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-1 right-20 w-8 h-8 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shadow-md text-xs font-bold"
                >
                  in
                </motion.div>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-12 -right-2 w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shadow-md text-xs font-bold"
                >
                  TT
                </motion.div>

                {/* Creator Avatar Illustration Graphic */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=260&q=80"
                  alt="Creator Studio"
                  className="w-24 h-24 rounded-2xl object-cover shadow-lg border-2 border-white ring-4 ring-[#8B5CF6]/15"
                />

                {/* Handwritten Tagline Badge */}
                <div className="absolute -bottom-2 -right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[rgba(20,20,40,0.08)] shadow-xs">
                  <span className="text-[10px] font-bold text-[#635BFF] italic">
                    &ldquo;One Video Infinite Possibilities&rdquo;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 STATISTICS CARDS WITH CURVED SPARKLINE GRAPHS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((st) => {
            const Icon = st.icon;
            return (
              <div key={st.label} className="card-clean p-5 relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: st.bg, color: st.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {/* Mini Sparkline SVG */}
                  <div className="w-24 h-9">
                    <svg viewBox="0 0 160 30" className="w-full h-full overflow-visible">
                      <path
                        d={st.svgPath}
                        fill="none"
                        stroke={st.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-xs font-semibold text-[#6B6B7A] block">{st.label}</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold text-[#17172A] tracking-tight">{st.value}</span>
                    <span className="text-xs font-bold text-[#22C55E] flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                      {st.change}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#9898A7] mt-0.5 block">{st.period}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* MIDDLE SECTION: CREATE CONTENT + AI PROCESSING CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Card 1: Create Content (6 Cols) */}
          <div className="lg:col-span-6 card-clean p-6 flex flex-col justify-between border border-[rgba(20,20,40,0.06)] relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="text-sm font-bold text-[#17172A]">Create Content</h3>
              </div>

              {/* Upload Drop Area */}
              <div
                onClick={() => setIsUploadModalOpen(true)}
                className="border-2 border-dashed border-[#8B5CF6]/30 hover:border-[#635BFF] bg-[#FAFAF8] hover:bg-white rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[170px]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center mb-2">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-[#17172A]">
                  Drag & drop your video, audio, image or script
                </p>
                <span className="text-[11px] text-[#6B6B7A] mt-0.5">or</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUploadModalOpen(true);
                  }}
                  className="mt-2 px-4 py-1.5 rounded-xl btn-primary-gradient text-xs font-bold shadow-xs"
                >
                  Browse Files
                </button>
              </div>
            </div>

            <p className="text-[10px] text-[#9898A7] text-center mt-3">
              Supports MP4, MOV, WEBM, MP3, WAV, PNG, JPG, PDF, TXT
            </p>
          </div>

          {/* Card 2: AI Processing (6 Cols) */}
          <div className="lg:col-span-6 card-clean p-6 flex flex-col justify-between border border-[rgba(20,20,40,0.06)] bg-gradient-to-r from-white via-white to-[#F8F6FE] relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#EC4899]" />
                  <h3 className="text-sm font-bold text-[#17172A]">AI Processing</h3>
                </div>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  Live
                </span>
              </div>

              {/* Processing Layout: Left Checklist, Right Glowing AI Node */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mt-2">
                {/* Steps Checklist */}
                <div className="space-y-1.5 text-xs">
                  {[
                    { title: 'Upload complete', done: true },
                    { title: 'Audio extracted', done: true },
                    { title: 'Speech transcribed', done: true },
                    { title: 'Detecting topics', done: true },
                    { title: 'Finding high-potential moments', done: false },
                    { title: 'Generating hooks', done: false },
                    { title: 'Preparing clips', done: false },
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px]">
                      {step.done ? (
                        <div className="w-3.5 h-3.5 rounded-full bg-[#22C55E] text-white flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-[#9898A7] shrink-0" />
                      )}
                      <span className={step.done ? 'text-[#17172A] font-semibold' : 'text-[#9898A7]'}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Right Interactive AI Node Visual */}
                <div className="relative flex items-center justify-center h-44">
                  {/* Central Orb */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-18 h-18 rounded-full bg-gradient-to-tr from-[#635BFF] via-[#8B5CF6] to-[#EC4899] flex items-center justify-center shadow-[0_0_25px_rgba(99,91,255,0.4)]"
                  >
                    <Sparkles className="w-8 h-8 text-white drop-shadow" />
                  </motion.div>

                  {/* Orbital Nodes with labels */}
                  <div className="absolute top-1 left-2 text-[9px] font-bold text-[#635BFF] bg-white px-2 py-0.5 rounded-full shadow-xs border border-[rgba(20,20,40,0.06)]">
                    Transcript
                  </div>
                  <div className="absolute top-1 right-2 text-[9px] font-bold text-[#8B5CF6] bg-white px-2 py-0.5 rounded-full shadow-xs border border-[rgba(20,20,40,0.06)]">
                    Topics
                  </div>
                  <div className="absolute bottom-6 right-0 text-[9px] font-bold text-[#EC4899] bg-white px-2 py-0.5 rounded-full shadow-xs border border-[rgba(20,20,40,0.06)]">
                    Hooks
                  </div>
                  <div className="absolute bottom-1 right-8 text-[9px] font-bold text-[#06B6D4] bg-white px-2 py-0.5 rounded-full shadow-xs border border-[rgba(20,20,40,0.06)]">
                    Clips
                  </div>
                  <div className="absolute bottom-2 left-4 text-[9px] font-bold text-[#22C55E] bg-white px-2 py-0.5 rounded-full shadow-xs border border-[rgba(20,20,40,0.06)]">
                    Analytics
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOWER SECTION: AI OPPORTUNITIES (LEFT 8 COLS) + RECENT PROJECTS (RIGHT 4 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* AI Content Opportunities (8 Cols) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="text-sm font-bold text-[#17172A]">AI Content Opportunities</h3>
                <span className="text-[11px] text-[#6B6B7A] hidden sm:inline">• High-potential moments from your content</span>
              </div>
              <Link
                href="/studio"
                className="text-xs font-bold text-[#635BFF] hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3 Opportunities Cards matching Reference */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {[
                {
                  opp: opportunities[0],
                  title: "You're probably using AI wrong.",
                  score: 92,
                  time: "00:14:23 - 00:15:08",
                  thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
                  tag1: "🔥 High Potential",
                  tag2: "AI"
                },
                {
                  opp: opportunities[1],
                  title: "AI won't replace you, but this will.",
                  score: 89,
                  time: "00:32:10 - 00:32:52",
                  thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
                  tag1: "🎓 Educational",
                  tag2: "Productivity"
                },
                {
                  opp: opportunities[2],
                  title: "Why 90% of AI agent setups fail.",
                  score: 86,
                  time: "00:15:55 - 00:02:45",
                  thumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
                  tag1: "⚙️ Technical",
                  tag2: "AI Agents"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="card-clean overflow-hidden flex flex-col justify-between group p-3 border border-[rgba(20,20,40,0.06)]"
                >
                  {/* Thumbnail with Timestamp & Score */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Timestamp Tag */}
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-mono">
                      {item.time}
                    </span>

                    {/* Circular Score Badge at Top-Right */}
                    <div className="absolute top-2 right-2">
                      <ScoreRing
                        score={item.score}
                        size={36}
                        strokeWidth={3}
                        onClick={() => item.opp && openScoreModal(item.opp)}
                      />
                    </div>
                  </div>

                  {/* Title & Tags */}
                  <div className="py-2.5">
                    <h4 className="text-xs font-bold text-[#17172A] leading-snug line-clamp-2">
                      &ldquo;{item.title}&rdquo;
                    </h4>

                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FDF2F8] text-[#EC4899] border border-[#FCE7F3]">
                        {item.tag1}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#6B6B7A]">
                        {item.tag2}
                      </span>
                    </div>
                  </div>

                  {/* Create Clip Button */}
                  <button
                    onClick={() => item.opp && openClipModal(item.opp)}
                    className="w-full py-1.5 px-3 rounded-xl btn-primary-gradient text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Create Clip</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Projects Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#635BFF]" />
                <h3 className="text-sm font-bold text-[#17172A]">Recent Projects</h3>
              </div>
              <Link
                href="/library"
                className="text-xs font-bold text-[#635BFF] hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Project Rows */}
            <div className="card-clean p-3 space-y-2 border border-[rgba(20,20,40,0.06)]">
              {recentProjectsList.map((proj) => (
                <div
                  key={proj.id}
                  className="p-2 rounded-xl hover:bg-[#F8F8FC] transition-colors flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Thumbnail */}
                    <div className="relative w-14 h-11 rounded-lg overflow-hidden shrink-0 bg-black">
                      <img
                        src={proj.thumbnail}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded bg-black/80 text-white text-[8px] font-mono">
                        {proj.duration}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#17172A] truncate">
                        {proj.title}
                      </h4>

                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: proj.statusColor }}
                        />
                        <span className="text-[10px] text-[#6B6B7A] font-medium truncate">
                          {proj.status}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-24 h-1 bg-[#EAEAF2] rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#635BFF] to-[#EC4899] rounded-full"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-[#9898A7] block">{proj.updated}</span>
                    <button
                      onClick={() => showToast(`Project options for ${proj.title}`)}
                      className="p-1 rounded text-[#9898A7] hover:text-[#17172A]"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: QUICK ACTIONS */}
        <div className="card-clean p-4 border border-[rgba(20,20,40,0.06)]">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#635BFF]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#17172A]">
              Quick Actions
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              {
                title: 'Create Project',
                sub: 'Start a new project',
                icon: FolderKanban,
                color: '#635BFF',
                bg: 'rgba(99, 91, 255, 0.1)',
                onClick: () => setIsUploadModalOpen(true)
              },
              {
                title: 'Generate Clips',
                sub: 'Find viral moments',
                icon: Scissors,
                color: '#EC4899',
                bg: 'rgba(236, 72, 153, 0.1)',
                onClick: () => opportunities[0] && openClipModal(opportunities[0])
              },
              {
                title: 'Write Hooks',
                sub: 'Get AI suggestions',
                icon: Wand2,
                color: '#F59E0B',
                bg: 'rgba(245, 158, 11, 0.1)',
                onClick: () => showToast('AI Hook generator ready in studio')
              },
              {
                title: 'Create Captions',
                sub: 'Auto-generate captions',
                icon: Type,
                color: '#06B6D4',
                bg: 'rgba(6, 182, 212, 0.1)',
                onClick: () => showToast('Auto captions active')
              },
              {
                title: 'Schedule Content',
                sub: 'Plan your posts',
                icon: Calendar,
                color: '#22C55E',
                bg: 'rgba(34, 197, 94, 0.1)',
                onClick: () => showToast('Opening scheduler...')
              }
            ].map((qa) => {
              const Icon = qa.icon;
              return (
                <button
                  key={qa.title}
                  onClick={qa.onClick}
                  className="p-3 rounded-xl border border-[rgba(20,20,40,0.06)] hover:border-[#635BFF]/30 hover:bg-[#FAFAF8] text-left transition-all flex items-center gap-3 group"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: qa.bg, color: qa.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#17172A] group-hover:text-[#635BFF] transition-colors truncate">
                      {qa.title}
                    </p>
                    <p className="text-[10px] text-[#6B6B7A] truncate">{qa.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
