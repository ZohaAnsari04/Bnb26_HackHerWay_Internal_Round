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
  Play
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

  const stats = [
    {
      label: 'Total Assets',
      value: '24',
      change: '+18.4%',
      trend: 'this month',
      icon: Film,
      color: '#635BFF',
      radialClass: 'surface-radial-violet',
      iconBoxClass: 'icon-box-purple',
      badgeClass: 'badge-soft-purple',
      waveColor: 'rgba(99, 91, 255, 0.07)'
    },
    {
      label: 'AI Clips Generated',
      value: '87',
      change: '+32.1%',
      trend: 'this month',
      icon: Scissors,
      color: '#EC4899',
      radialClass: 'surface-radial-pink',
      iconBoxClass: 'icon-box-pink',
      badgeClass: 'badge-soft-pink',
      waveColor: 'rgba(236, 72, 153, 0.07)'
    },
    {
      label: 'Published Content',
      value: '143',
      change: '+14.6%',
      trend: 'this month',
      icon: Share2,
      color: '#22C55E',
      radialClass: 'surface-radial-green',
      iconBoxClass: 'icon-box-green',
      badgeClass: 'badge-soft-green',
      waveColor: 'rgba(34, 197, 94, 0.07)'
    },
    {
      label: 'Content Opportunities',
      value: '12',
      change: '+8.5%',
      trend: 'detected',
      icon: Sparkles,
      color: '#06B6D4',
      radialClass: 'surface-radial-cyan',
      iconBoxClass: 'icon-box-cyan',
      badgeClass: 'badge-soft-cyan',
      waveColor: 'rgba(6, 182, 212, 0.07)'
    },
  ];

  // Specific thumbnail images for the 3 opportunities
  const opportunityThumbnails = [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=600&q=80'
  ];

  return (
    <AppShell>
      <div className="space-y-9">
        {/* Welcome Hero Greeting & Primary Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[rgba(20,20,40,0.06)]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#17172A]">
                Good morning, Creator 👋
              </h1>
            </div>
            <p className="text-sm text-[#68697A] mt-1">
              Turn one idea into a complete content package across every social platform.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2.5 rounded-xl btn-secondary text-xs flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4 text-[#68697A]" />
              <span>Upload Asset</span>
            </button>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold btn-primary-gradient flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Content</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards (Section 10: unique soft gradient tint, abstract background curve, upgraded icon containers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`card-clean ${stat.radialClass} p-5 relative overflow-hidden group`}
              >
                {/* Subtle Abstract Background Wave Curve (Section 10) */}
                <svg
                  className="absolute bottom-0 right-0 w-36 h-20 pointer-events-none opacity-40 transition-transform duration-500 group-hover:scale-110"
                  viewBox="0 0 144 80"
                  fill="none"
                >
                  <path
                    d="M0 60C30 50 60 75 90 40C120 10 135 30 144 20V80H0V60Z"
                    fill={stat.waveColor}
                  />
                </svg>

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-medium text-[#68697A]">{stat.label}</span>
                  {/* Upgraded 44px Icon Container with Soft Gradient */}
                  <div className={stat.iconBoxClass}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-3 flex items-baseline gap-2 relative z-10">
                  <span className="text-2xl font-bold text-[#17172A] tracking-tight">{stat.value}</span>
                  <span className={`text-xs font-semibold flex items-center px-2 py-0.5 rounded-full ${stat.badgeClass}`}>
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                    {stat.change}
                  </span>
                </div>

                <p className="text-[11px] text-[#9496A8] mt-1 relative z-10">{stat.trend}</p>

                {/* Micro trend indicator bar */}
                <div className="mt-3.5 w-full h-1.5 bg-[#F0F1F6] rounded-full overflow-hidden relative z-10">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${60 + idx * 10}%`,
                      backgroundColor: stat.color
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Content Opportunities Section (Section 11: Prominent thumbnail, overlapping score ring, why this works) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {/* Section Header with 32px soft gradient icon container (Section 17) */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#EC4899]/15 to-[#8B5CF6]/15 text-[#EC4899] flex items-center justify-center border border-[#EC4899]/20 shadow-2xs">
                <Flame className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-[#17172A] tracking-tight">
                AI Content Opportunities
              </h2>
            </div>
            <Link
              href="/studio"
              className="text-xs font-semibold text-[#635BFF] hover:underline flex items-center gap-1"
            >
              <span>View in AI Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {opportunities.map((opp, idx) => {
              const opportunityThumbnails = [
                'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=700&q=80',
                'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80',
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80'
              ];
              return (
              <div
                key={opp.id}
                className="card-clean card-top-edge card-sweep overflow-hidden flex flex-col justify-between group hover:border-[#635BFF]/35"
              >
                <div>
                  {/* Large Visual Area with Prominent Thumbnail (Section 11) */}
                  <div className="relative aspect-[16/9] bg-[#17172A] overflow-hidden">
                    <img
                      src={opportunityThumbnails[idx % opportunityThumbnails.length]}
                      alt={opp.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    {/* Gradient Overlay at Bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Timestamp Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-medium">
                      <Clock className="w-3 h-3 text-[#EC4899]" />
                      <span>{opp.startFormatted} → {opp.endFormatted}</span>
                    </div>

                    {/* Play Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-[#17172A] flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-[#17172A] ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Overlapping Score Ring Boundary (Section 11) */}
                  <div className="px-5 pt-3 pb-2 flex items-start justify-between gap-3 relative">
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#635BFF] bg-[#635BFF]/10 px-2 py-0.5 rounded-md border border-[#635BFF]/15">
                        High-Potential Moment
                      </span>
                      <h3 className="text-sm font-bold text-[#17172A] line-clamp-2 leading-snug group-hover:text-[#635BFF] transition-colors mt-2">
                        &ldquo;{opp.hookText || opp.title}&rdquo;
                      </h3>
                    </div>

                    {/* Upgraded Gradient Score Ring */}
                    <div className="-mt-7 shrink-0 relative z-10">
                      <ScoreRing
                        score={opp.score}
                        size={52}
                        strokeWidth={4.5}
                        onClick={() => openScoreModal(opp)}
                      />
                    </div>
                  </div>

                  {/* Why This Works Pill Checklist */}
                  <div className="px-5 pb-2">
                    <div className="p-3 rounded-xl bg-[#FAFAF7] border border-[rgba(20,20,40,0.06)] text-xs text-[#17172A] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#68697A] block mb-1">
                        Key Driver
                      </span>
                      <p className="line-clamp-2 text-xs text-[#68697A] leading-relaxed">
                        {opp.whyItWorks[0]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="px-5 py-3.5 border-t border-[rgba(20,20,40,0.06)] bg-[#FFFFFF]/70 flex items-center justify-between">
                  <span className="text-[11px] text-[#68697A] font-medium">
                    Duration: {opp.duration}s
                  </span>
                  <button
                    onClick={() => openClipModal(opp)}
                    className="px-4 py-1.5 rounded-xl text-xs font-semibold btn-primary-gradient shadow-xs"
                  >
                    Create Clip
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        </div>

        {/* Recent Projects Section (Section 18: hover background rgba(99,91,255,0.025), thumbnail zoom, 1px right shift) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#17172A] tracking-tight">
              Recent Projects
            </h2>
            <Link
              href="/library"
              className="text-xs font-semibold text-[#68697A] hover:text-[#17172A] flex items-center gap-1"
            >
              <span>All assets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="card-clean card-sweep overflow-hidden flex flex-col justify-between group hover:bg-[rgba(99,91,255,0.025)] transition-all duration-200 hover:translate-x-0.5"
              >
                <div className="relative aspect-video bg-[#17172A] overflow-hidden">
                  <img
                    src={proj.thumbnailUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-mono font-medium backdrop-blur-xs">
                    {proj.duration}
                  </span>
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[#17172A] text-[10px] font-bold uppercase tracking-wider border border-white/50 shadow-xs">
                    {proj.assetType}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#17172A] leading-snug group-hover:text-[#635BFF] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-[#68697A] mt-1 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[rgba(20,20,40,0.06)] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#68697A] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span>AI analysis complete</span>
                      </span>
                      <span className="font-bold text-[#635BFF] bg-[#635BFF]/10 px-2 py-0.5 rounded-md border border-[#635BFF]/15">
                        {proj.opportunityPotential}% potential
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-[#9496A8]">{proj.updatedAt}</span>
                      <Link
                        href="/studio"
                        onClick={() => setActiveProject(proj)}
                        className="text-xs font-semibold text-[#635BFF] hover:underline flex items-center gap-1"
                      >
                        <span>Open Studio</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel (Section 19: distinct pastel backgrounds lavender, pink, peach, cyan, mint with icon boxes) */}
        <div className="p-6 rounded-3xl bg-white border border-[rgba(99,91,255,0.08)] shadow-[0_8px_30px_rgba(45,35,100,0.04)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#68697A]">
              Quick Action Studio
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* Create Project: Lavender */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="p-4 rounded-2xl bg-gradient-to-br from-[#F8F7FF] to-[#FFFFFF] border border-[#635BFF]/15 hover:border-[#635BFF]/40 hover:shadow-md text-left transition-all group hover:-translate-y-1"
            >
              <div className="icon-box-purple mb-3">
                <Plus className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#17172A] group-hover:text-[#635BFF] transition-colors">Create Project</p>
              <p className="text-[11px] text-[#68697A] mt-0.5">Start a new content workspace</p>
            </button>

            {/* Upload Video: Pink */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF5F9] to-[#FFFFFF] border border-[#EC4899]/15 hover:border-[#EC4899]/40 hover:shadow-md text-left transition-all group hover:-translate-y-1"
            >
              <div className="icon-box-pink mb-3">
                <UploadCloud className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#17172A] group-hover:text-[#EC4899] transition-colors">Upload Video</p>
              <p className="text-[11px] text-[#68697A] mt-0.5">Analyze raw footage with AI</p>
            </button>

            {/* Generate Clips: Cyan */}
            <Link
              href="/studio"
              className="p-4 rounded-2xl bg-gradient-to-br from-[#F0FDFE] to-[#FFFFFF] border border-[#06B6D4]/15 hover:border-[#06B6D4]/40 hover:shadow-md text-left transition-all group hover:-translate-y-1"
            >
              <div className="icon-box-cyan mb-3">
                <Scissors className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#17172A] group-hover:text-[#06B6D4] transition-colors">Generate Clips</p>
              <p className="text-[11px] text-[#68697A] mt-0.5">Extract high-retention shorts</p>
            </Link>

            {/* Write Hooks: Peach/Amber */}
            <Link
              href="/studio"
              className="p-4 rounded-2xl bg-gradient-to-br from-[#FFFBF0] to-[#FFFFFF] border border-[#F59E0B]/15 hover:border-[#F59E0B]/40 hover:shadow-md text-left transition-all group hover:-translate-y-1"
            >
              <div className="icon-box-amber mb-3">
                <Wand2 className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#17172A] group-hover:text-[#F59E0B] transition-colors">Generate Hooks</p>
              <p className="text-[11px] text-[#68697A] mt-0.5">Produce viral opening scripts</p>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
