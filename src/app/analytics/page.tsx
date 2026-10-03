'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/AppShell';
import { INITIAL_ANALYTICS } from '@/lib/mockData';
import {
  TrendingUp,
  BarChart3,
  Sparkles,
  ArrowRight,
  Eye,
  Clock,
  CheckCircle2,
  Share2,
  Flame,
  Zap,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  const { showToast } = useApp();
  const { metrics, viewsOverTime, platformDistribution, topTopics, bestPerformingHooks, aiInsights } = INITIAL_ANALYTICS;

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[rgba(20,20,40,0.06)]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-[#17172A]">Content Intelligence</h1>
              <span className="px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-bold">
                Live Pulse
              </span>
            </div>
            <p className="text-sm text-[#68697A] mt-0.5">
              Understand what your audience responds to across short-form syndication.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#68697A]">Data window:</span>
            <select className="px-3 py-1.5 rounded-xl border border-[rgba(20,20,40,0.1)] bg-white text-[#17172A] font-medium focus:outline-none">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Quarter to Date</option>
            </select>
          </div>
        </div>

        {/* 4 Core Metrics (Prompt Section 20: Views, Engagement, Average Watch Time, Completion Rate) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="card-clean p-5"
            >
              <span className="text-xs font-medium text-[#68697A]">{metric.label}</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#17172A] tracking-tight">{metric.value}</span>
                <span className="text-xs font-semibold text-[#22C55E] flex items-center">
                  <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                  {metric.change}
                </span>
              </div>
              <p className="text-[11px] text-[#9496A8] mt-1">{metric.subtext}</p>
            </motion.div>
          ))}
        </div>

        {/* AI INSIGHTS CALLOUT (Prompt Section 20: VERY IMPORTANT) */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#F7F8FC] via-white to-[#FAFAF7] border border-[rgba(20,20,40,0.08)] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#17172A]">CreatorAI Algorithmic Insights</h3>
                <p className="text-xs text-[#68697A]">Automated pattern detection from 143 syndicated videos</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#635BFF] bg-[#635BFF]/10 px-2.5 py-1 rounded-full">
              3 High-Confidence Findings
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 rounded-2xl bg-white border border-[rgba(20,20,40,0.07)] shadow-xs flex flex-col justify-between hover:border-[#635BFF]/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#635BFF]">
                      {insight.title}
                    </span>
                    <span className="text-[11px] font-bold text-[#22C55E]">
                      {insight.metricBadge}
                    </span>
                  </div>
                  <p className="text-xs text-[#17172A] leading-relaxed">
                    {insight.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[rgba(20,20,40,0.05)] flex items-center justify-between">
                  <button
                    onClick={() => showToast(`Applied recommendation: ${insight.actionText}`)}
                    className="text-xs font-semibold text-[#635BFF] hover:underline flex items-center gap-1"
                  >
                    <span>{insight.actionText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Views Over Time Chart (7 cols) */}
          <div className="lg:col-span-7 card-clean p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(20,20,40,0.06)]">
              <div>
                <h3 className="text-sm font-bold text-[#17172A]">Views Over Time</h3>
                <p className="text-xs text-[#68697A]">Daily audience reach and volume</p>
              </div>
              <span className="text-xs font-bold text-[#635BFF]">428.5K Total</span>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
              {viewsOverTime.map((item) => {
                const heightPct = (item.views / 100000) * 100;
                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[10px] font-bold text-[#68697A] opacity-0 group-hover:opacity-100 transition-opacity">
                      {(item.views / 1000).toFixed(0)}k
                    </div>
                    <div className="w-full bg-[#F0F1F6] rounded-xl h-44 relative overflow-hidden flex items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="w-full bg-gradient-to-t from-[#635BFF] to-[#8B5CF6] rounded-xl group-hover:from-[#635BFF] group-hover:to-[#EC4899] transition-all"
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#17172A]">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Engagement By Platform (5 cols) */}
          <div className="lg:col-span-5 card-clean p-6 space-y-4">
            <div className="pb-2 border-b border-[rgba(20,20,40,0.06)]">
              <h3 className="text-sm font-bold text-[#17172A]">Platform Distribution</h3>
              <p className="text-xs text-[#68697A]">Syndicated share across channels</p>
            </div>

            <div className="space-y-3.5 pt-2">
              {platformDistribution.map((item) => (
                <div key={item.platform} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#17172A]">{item.platform}</span>
                    <span className="font-bold text-[#68697A]">{item.views} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-[#F0F1F6] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Topics & Best Performing Hooks (Prompt Section 20) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Topics */}
          <div className="card-clean p-6 space-y-4">
            <div className="pb-2 border-b border-[rgba(20,20,40,0.06)]">
              <h3 className="text-sm font-bold text-[#17172A]">Top Performing Topics</h3>
              <p className="text-xs text-[#68697A]">Highest engagement by theme</p>
            </div>

            <div className="space-y-3">
              {topTopics.map((top, idx) => (
                <div
                  key={top.topic}
                  className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[rgba(20,20,40,0.05)] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#635BFF]">{idx + 1}</span>
                    <div>
                      <h4 className="text-xs font-bold text-[#17172A]">{top.topic}</h4>
                      <span className="text-[11px] text-[#68697A]">{top.count} clips produced</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-md">
                    {top.engagement} Avg Eng.
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Performing Hooks */}
          <div className="card-clean p-6 space-y-4">
            <div className="pb-2 border-b border-[rgba(20,20,40,0.06)]">
              <h3 className="text-sm font-bold text-[#17172A]">Best Performing Hooks</h3>
              <p className="text-xs text-[#68697A]">Retention leaders in first 3 seconds</p>
            </div>

            <div className="space-y-3">
              {bestPerformingHooks.map((h) => (
                <div
                  key={h.hook}
                  className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[rgba(20,20,40,0.05)] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#17172A] truncate">
                      &ldquo;{h.hook}&rdquo;
                    </p>
                    <span className="text-[11px] text-[#68697A]">
                      Hook Score: {h.score}/100
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#635BFF] bg-[#635BFF]/10 px-2 py-0.5 rounded-md shrink-0">
                    {h.retention} Retention
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
