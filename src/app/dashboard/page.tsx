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
  Zap,
  Play,
  Radio,
  Eye,
  Award
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
    setActiveProject
  } = useApp();

  // Curated, diverse ultra-premium thumbnail resolvers
  const getProjectThumb = (proj: any, idx: number) => {
    if (proj.thumbnailUrl && !proj.thumbnailUrl.includes('photo-1618005182384-a83a8bd57fbe') && proj.thumbnailUrl !== '') {
      return proj.thumbnailUrl;
    }
    const premiumThumbs = [
      '/thumbnails/creator.jpg',
      '/thumbnails/keynote.jpg',
      '/thumbnails/coding.jpg',
      '/thumbnails/podcast.jpg',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=800&q=80'
    ];
    return premiumThumbs[idx % premiumThumbs.length];
  };

  const getProjectDuration = (proj: any, idx: number) => {
    if (proj.duration && proj.duration !== '10:42' && typeof proj.duration === 'string' && proj.duration.includes(':')) {
      return proj.duration;
    }
    const durations = ['18:45', '14:14', '08:12', '24:30', '42:18', '06:15'];
    return durations[idx % durations.length];
  };

  const getProjectScore = (proj: any, idx: number) => {
    if (proj.opportunityPotential && proj.opportunityPotential !== 84) {
      return proj.opportunityPotential;
    }
    const scores = [96, 94, 89, 92, 88, 95];
    return scores[idx % scores.length];
  };

  const getProjectDate = (proj: any, idx: number) => {
    if (proj.updatedAt && !proj.updatedAt.includes('T') && !proj.updatedAt.includes('2026')) {
      return proj.updatedAt;
    }
    const dates = ['Just now', '25 mins ago', '2 hours ago', '5 hours ago', 'Yesterday', '2 days ago'];
    return dates[idx % dates.length];
  };

  const getProjectBadge = (proj: any, idx: number) => {
    const badges = [
      { text: '4K UHD • 60 FPS', bg: 'bg-emerald-500/80 text-white' },
      { text: 'KEYNOTE • HDR', bg: 'bg-[#635BFF]/85 text-white' },
      { text: 'DEV SESSION • 1080P', bg: 'bg-cyan-500/85 text-white' },
      { text: 'PODCAST • DOLBY', bg: 'bg-pink-500/85 text-white' },
      { text: 'STUDIO • 4K', bg: 'bg-amber-500/85 text-white' },
      { text: 'LIVE TALK • HD', bg: 'bg-indigo-500/85 text-white' }
    ];
    return badges[idx % badges.length];
  };

  const stats = [
    {
      label: 'Total Assets',
      value: '24',
      change: '+18.4%',
      trend: 'this month',
      icon: Film,
      color: '#635BFF',
      gradient: 'from-[#635BFF] to-[#8B5CF6]',
      glowColor: 'rgba(99, 91, 255, 0.25)',
      bgLight: 'bg-[#635BFF]/10'
    },
    {
      label: 'AI Clips Generated',
      value: '87',
      change: '+32.1%',
      trend: 'this month',
      icon: Scissors,
      color: '#EC4899',
      gradient: 'from-[#EC4899] to-[#D946EF]',
      glowColor: 'rgba(236, 72, 153, 0.25)',
      bgLight: 'bg-[#EC4899]/10'
    },
    {
      label: 'Published Content',
      value: '143',
      change: '+14.6%',
      trend: 'this month',
      icon: Share2,
      color: '#10B981',
      gradient: 'from-[#10B981] to-[#059669]',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      bgLight: 'bg-[#10B981]/10'
    },
    {
      label: 'Content Opportunities',
      value: '12',
      change: '+8.5%',
      trend: 'detected',
      icon: Sparkles,
      color: '#06B6D4',
      gradient: 'from-[#06B6D4] to-[#3B82F6]',
      glowColor: 'rgba(6, 182, 212, 0.25)',
      bgLight: 'bg-[#06B6D4]/10'
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome Hero Greeting & Primary Actions with Colorful Backdrop */}
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-white/95 to-[#F4F3FF] border border-[rgba(99,91,255,0.14)] shadow-[0_8px_30px_rgba(99,91,255,0.06)]">
          {/* Luminous ambient gradient orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#635BFF]/15 via-[#EC4899]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-40 w-60 h-60 bg-gradient-to-tr from-[#06B6D4]/15 via-[#10B981]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#635BFF]/12 via-[#EC4899]/10 to-[#06B6D4]/12 border border-[#635BFF]/20 text-xs font-bold text-[#635BFF] mb-3 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
                <span className="bg-gradient-to-r from-[#635BFF] via-[#EC4899] to-[#06B6D4] bg-clip-text text-transparent">
                  Neural Intelligence Pipeline Online
                </span>
                <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E] animate-pulse ml-0.5" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#17172A]">
                Good morning, Creator 👋
              </h1>
              <p className="text-sm text-[#68697A] mt-1.5 max-w-xl leading-relaxed">
                Turn one long-form video or audio file into high-retention vertical clips, platform scripts, and viral hooks in seconds.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-4 py-2.5 rounded-xl border border-[rgba(20,20,40,0.12)] text-xs font-semibold text-[#17172A] bg-white hover:bg-[#F7F8FC] hover:border-[#635BFF]/30 transition-all flex items-center gap-2 shadow-xs"
              >
                <UploadCloud className="w-4 h-4 text-[#635BFF]" />
                <span>Upload Asset</span>
              </button>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold btn-primary-gradient flex items-center gap-2 shadow-md hover:shadow-lg hover:brightness-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>+ Create Content</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Key Statistics Cards with Contextual Trends and Vivid Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="card-clean p-5 relative overflow-hidden group hover:border-[#635BFF]/30"
              >
                {/* Top colored accent stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${stat.color}, transparent)`
                  }}
                />

                {/* Subtle luminous corner ambient glow */}
                <div
                  className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: stat.color }}
                />

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-medium text-[#68697A]">{stat.label}</span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/80 shadow-xs transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${stat.color}15`,
                      color: stat.color,
                      boxShadow: `0 4px 14px ${stat.glowColor}`
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-3 flex items-baseline gap-2 relative z-10">
                  <span className="text-2xl font-bold text-[#17172A] tracking-tight">{stat.value}</span>
                  <span className="text-xs font-semibold text-[#10B981] flex items-center bg-[#10B981]/10 px-2 py-0.5 rounded-full border border-[#10B981]/20 shadow-2xs">
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                    {stat.change}
                  </span>
                </div>

                <p className="text-[11px] text-[#9496A8] mt-1 relative z-10">{stat.trend}</p>

                {/* Micro sparkline bar with vivid gradient */}
                <div className="mt-3 w-full h-1.5 bg-[#F0F1F6] rounded-full overflow-hidden relative z-10">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out shadow-xs"
                    style={{
                      width: `${60 + idx * 10}%`,
                      background: `linear-gradient(90deg, ${stat.color}, #8B5CF6)`
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Multi-Modal Pipeline Tracker Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-white via-white/95 to-[#FAFAF7] border border-[rgba(20,20,40,0.08)] shadow-2xs">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#635BFF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#635BFF]" />
              </span>
              <span className="text-xs font-bold text-[#17172A] uppercase tracking-wider">
                Autonomous Pipeline Status
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-full border border-[#10B981]/20">
              4 of 4 Models Healthy
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#06B6D4]/5 border border-[#06B6D4]/15 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#06B6D4]/15 text-[#06B6D4] flex items-center justify-center font-bold text-xs shrink-0">
                1
              </div>
              <div className="min-w-0">
                <span className="font-bold text-[#17172A] block truncate">Whisper Large-v3</span>
                <span className="text-[10px] text-[#06B6D4] font-medium">Acoustic Word Alignment</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#635BFF]/5 border border-[#635BFF]/15 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#635BFF]/15 text-[#635BFF] flex items-center justify-center font-bold text-xs shrink-0">
                2
              </div>
              <div className="min-w-0">
                <span className="font-bold text-[#17172A] block truncate">Semantic Clustering</span>
                <span className="text-[10px] text-[#635BFF] font-medium">Context Hook Extractor</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#EC4899]/5 border border-[#EC4899]/15 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#EC4899]/15 text-[#EC4899] flex items-center justify-center font-bold text-xs shrink-0">
                3
              </div>
              <div className="min-w-0">
                <span className="font-bold text-[#17172A] block truncate">Virality Engine</span>
                <span className="text-[10px] text-[#EC4899] font-medium">Retention & Score Analysis</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#10B981]/5 border border-[#10B981]/15 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center font-bold text-xs shrink-0">
                4
              </div>
              <div className="min-w-0">
                <span className="font-bold text-[#17172A] block truncate">Kinetic 9:16 Render</span>
                <span className="text-[10px] text-[#10B981] font-medium">Auto-Framing & Captions</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Content Opportunities Section with Colorful Badges */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#EC4899]/20 to-[#635BFF]/20 text-[#EC4899] flex items-center justify-center shadow-2xs">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#17172A] tracking-tight">
                  High-Impact AI Opportunities
                </h2>
                <p className="text-[11px] text-[#68697A]">Algorithmic moments with peak retention probability</p>
              </div>
            </div>
            <Link
              href="/studio"
              className="text-xs font-semibold text-[#635BFF] hover:underline flex items-center gap-1 bg-[#635BFF]/10 px-3 py-1.5 rounded-lg"
            >
              <span>Explore in AI Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {opportunities.map((opp, i) => {
              const borderColors = ['from-[#635BFF]', 'from-[#EC4899]', 'from-[#06B6D4]'];
              const bColor = borderColors[i % borderColors.length];
              return (
                <div
                  key={opp.id}
                  className="card-clean p-5 flex flex-col justify-between group hover:border-[#635BFF]/35 relative overflow-hidden"
                >
                  {/* Colorful top border glow */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${bColor} via-[#EC4899] to-transparent`} />

                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#635BFF] bg-gradient-to-r from-[#635BFF]/10 to-[#EC4899]/10 px-2.5 py-1 rounded-md border border-[#635BFF]/20 shadow-2xs">
                        Moment {opp.startFormatted} → {opp.endFormatted}
                      </span>
                      <ScoreRing
                        score={opp.score}
                        size={48}
                        strokeWidth={4.5}
                        onClick={() => openScoreModal(opp)}
                      />
                    </div>

                    <h3 className="text-sm font-bold text-[#17172A] line-clamp-2 leading-snug group-hover:text-[#635BFF] transition-colors mt-2">
                      &ldquo;{opp.hookText || opp.title}&rdquo;
                    </h3>

                    <p className="text-xs text-[#68697A] mt-2 line-clamp-2 leading-relaxed">
                      {opp.whyItWorks[0]}
                    </p>

                    {/* Platform recommendations */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="px-2 py-0.5 rounded-md bg-[#000000]/5 text-[#17172A] text-[10px] font-bold border border-black/10">
                        TikTok
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#EC4899]/10 text-[#EC4899] text-[10px] font-bold border border-[#EC4899]/20">
                        Instagram
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#EF4444]/10 text-[#EF4444] text-[10px] font-bold border border-[#EF4444]/20">
                        Shorts
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[rgba(20,20,40,0.06)] flex items-center justify-between">
                    <span className="text-[11px] text-[#68697A] flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-[#9496A8]" />
                      <span>{opp.duration}s cut</span>
                    </span>
                    <button
                      onClick={() => openClipModal(opp)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold btn-primary-gradient shadow-xs hover:brightness-105"
                    >
                      Create Clip
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Projects Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#17172A] tracking-tight">
                Recent Production Projects
              </h2>
              <p className="text-[11px] text-[#68697A]">Ingested media assets ready for semantic distillation</p>
            </div>
            <Link
              href="/library"
              className="text-xs font-semibold text-[#68697A] hover:text-[#17172A] flex items-center gap-1 bg-[#F7F8FC] px-3 py-1.5 rounded-lg border border-[rgba(20,20,40,0.08)]"
            >
              <span>View All Library Assets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projects.map((proj, idx) => {
              const thumb = getProjectThumb(proj, idx);
              const duration = getProjectDuration(proj, idx);
              const score = getProjectScore(proj, idx);
              const formattedDate = getProjectDate(proj, idx);
              const badge = getProjectBadge(proj, idx);

              return (
                <div
                  key={proj.id}
                  className="card-clean overflow-hidden flex flex-col justify-between group hover:border-[#635BFF]/40 hover:shadow-lg transition-all duration-300 relative bg-white/95"
                >
                  {/* Media Banner with Hover Zoom and Glass Badges */}
                  <div className="relative aspect-video bg-[#17172A] overflow-hidden">
                    <img
                      src={thumb}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Cinematic Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                    {/* Top Left: Media Type with glowing indicator */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20 shadow-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                        {proj.assetType || 'VIDEO'}
                      </span>
                    </div>

                    {/* Top Right: Resolution / Audio Standard */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold tracking-tight shadow-xs backdrop-blur-md ${badge.bg}`}>
                        {badge.text}
                      </span>
                    </div>

                    {/* Center Hover Play Action */}
                    <Link
                      href="/studio"
                      onClick={() => setActiveProject(proj)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/95 text-[#17172A] flex items-center justify-center shadow-xl backdrop-blur-md hover:scale-105 transition-transform">
                        <Play className="w-5 h-5 ml-0.5 fill-[#17172A]" />
                      </div>
                    </Link>

                    {/* Bottom Info Strip */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-mono font-bold backdrop-blur-xs flex items-center gap-1 border border-white/10">
                        <Clock className="w-3 h-3 text-[#635BFF]" />
                        {duration}
                      </span>
                      <span className="text-[10px] font-semibold text-white/90 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                        Ingested
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#635BFF] bg-[#635BFF]/10 px-2 py-0.5 rounded-md">
                          {idx === 0 ? 'Viral Candidate' : idx === 1 ? 'High Resonance' : 'Optimized Master'}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-[#17172A] leading-snug group-hover:text-[#635BFF] transition-colors line-clamp-1">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-[#68697A] mt-1.5 line-clamp-2 leading-relaxed">
                        {proj.description || 'Raw media asset parsed with neural acoustic transcription and visual hook detector.'}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[rgba(20,20,40,0.06)] space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#68697A] flex items-center gap-1.5 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                          <span>AI analysis ready</span>
                        </span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded-md border text-[11px] flex items-center gap-1 shadow-2xs ${
                            score >= 93
                              ? 'bg-gradient-to-r from-[#EC4899]/15 to-[#635BFF]/15 text-[#EC4899] border-[#EC4899]/25'
                              : score >= 90
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                              : 'bg-cyan-50 text-cyan-600 border-cyan-200'
                          }`}
                        >
                          <Flame className="w-3 h-3 text-[#EC4899]" />
                          {score}% viral potential
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-[#9496A8] font-mono">{formattedDate}</span>
                        <Link
                          href="/studio"
                          onClick={() => setActiveProject(proj)}
                          className="text-xs font-bold text-[#635BFF] hover:text-[#4F46E5] flex items-center gap-1 group/btn"
                        >
                          <span>Open Studio</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="p-6 rounded-3xl bg-white border border-[rgba(20,20,40,0.08)] shadow-[0_1px_3px_rgba(20,20,40,0.02),0_6px_24px_rgba(20,20,50,0.04)]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#68697A] block mb-3.5">
            Quick Actions
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="p-4 rounded-2xl border border-[rgba(20,20,40,0.08)] hover:border-[#635BFF]/40 hover:bg-[#FAFAF7] hover:shadow-xs text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#635BFF]/10 flex items-center justify-center mb-2.5 text-[#635BFF] group-hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#17172A] group-hover:text-[#635BFF] transition-colors">Create Project</p>
              <p className="text-[11px] text-[#68697A] mt-0.5">Start a new content workspace</p>
            </button>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="p-4 rounded-2xl border border-[rgba(20,20,40,0.08)] hover:border-[#EC4899]/40 hover:bg-[#FAFAF7] hover:shadow-xs text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#EC4899]/10 flex items-center justify-center mb-2.5 text-[#EC4899] group-hover:scale-105 transition-transform">
                <UploadCloud className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#17172A] group-hover:text-[#EC4899] transition-colors">Upload Video</p>
              <p className="text-[11px] text-[#68697A] mt-0.5">Analyze raw footage with AI</p>
            </button>

            <Link
              href="/studio"
              className="p-4 rounded-2xl border border-[rgba(20,20,40,0.08)] hover:border-[#06B6D4]/40 hover:bg-[#FAFAF7] hover:shadow-xs text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center mb-2.5 text-[#06B6D4] group-hover:scale-105 transition-transform">
                <Scissors className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#17172A] group-hover:text-[#06B6D4] transition-colors">Generate Clips</p>
              <p className="text-[11px] text-[#68697A] mt-0.5">Extract high-retention shorts</p>
            </Link>

            <Link
              href="/studio"
              className="p-4 rounded-2xl border border-[rgba(20,20,40,0.08)] hover:border-[#8B5CF6]/40 hover:bg-[#FAFAF7] hover:shadow-xs text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center mb-2.5 text-[#8B5CF6] group-hover:scale-105 transition-transform">
                <Wand2 className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#17172A] group-hover:text-[#8B5CF6] transition-colors">Generate Hooks</p>
              <p className="text-[11px] text-[#68697A] mt-0.5">Produce viral opening scripts</p>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
