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
  Zap
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
    { label: 'Total Assets', value: '24', change: '+18.4%', trend: 'this month', icon: Film, color: '#635BFF' },
    { label: 'AI Clips Generated', value: '87', change: '+32.1%', trend: 'this month', icon: Scissors, color: '#EC4899' },
    { label: 'Published Content', value: '143', change: '+14.6%', trend: 'this month', icon: Share2, color: '#22C55E' },
    { label: 'Content Opportunities', value: '12', change: '+8.5%', trend: 'detected', icon: Sparkles, color: '#06B6D4' },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome Hero Greeting & Primary Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[rgba(20,20,40,0.06)]">
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
              className="px-4 py-2.5 rounded-xl border border-[rgba(20,20,40,0.12)] text-xs font-semibold text-[#17172A] hover:bg-white hover:border-[#635BFF]/30 transition-all flex items-center gap-2 shadow-xs"
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

        {/* 4 Key Statistics Cards with Contextual Trends */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="card-clean p-5 relative overflow-hidden group"
              >
                {/* Subtle luminous corner ambient glow */}
                <div
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: stat.color }}
                />

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-medium text-[#68697A]">{stat.label}</span>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/60 shadow-xs"
                    style={{ backgroundColor: `${stat.color}14`, color: stat.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-3 flex items-baseline gap-2 relative z-10">
                  <span className="text-2xl font-bold text-[#17172A] tracking-tight">{stat.value}</span>
                  <span className="text-xs font-semibold text-[#22C55E] flex items-center bg-[#22C55E]/10 px-2 py-0.5 rounded-full border border-[#22C55E]/15">
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                    {stat.change}
                  </span>
                </div>

                <p className="text-[11px] text-[#9496A8] mt-1 relative z-10">{stat.trend}</p>

                {/* Micro sparkline bar */}
                <div className="mt-3 w-full h-1.5 bg-[#F0F1F6] rounded-full overflow-hidden relative z-10">
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

        {/* AI Content Opportunities Section (Section 8 requirement) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EC4899]/10 text-[#EC4899] flex items-center justify-center">
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
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="card-clean p-5 flex flex-col justify-between group hover:border-[#635BFF]/35"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#635BFF] bg-[#635BFF]/10 px-2.5 py-1 rounded-md border border-[#635BFF]/15">
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
                </div>

                <div className="mt-5 pt-3.5 border-t border-[rgba(20,20,40,0.06)] flex items-center justify-between">
                  <span className="text-[11px] text-[#68697A] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#9496A8]" />
                    <span>Duration: {opp.duration}s</span>
                  </span>
                  <button
                    onClick={() => openClipModal(opp)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold btn-primary-gradient shadow-xs"
                  >
                    Create Clip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects Section */}
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
                className="card-clean overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative aspect-video bg-[#17172A] overflow-hidden">
                  <img
                    src={proj.thumbnailUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                    <h3 className="text-sm font-bold text-[#17172A] leading-snug">
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
