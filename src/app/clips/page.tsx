'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/AppShell';
import { ScoreRing } from '@/components/ScoreRing';
import {
  Scissors,
  Play,
  Sliders,
  Calendar,
  Download,
  Share2,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ClipsPage() {
  const { clips, setActiveClip, openScheduleModal, showToast } = useApp();
  const [platformFilter, setPlatformFilter] = useState<string>('all');

  const filteredClips = clips.filter((c) => {
    if (platformFilter === 'all') return true;
    return c.platform === platformFilter;
  });

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'Instagram Reels';
      case 'youtube_shorts':
        return 'YouTube Shorts';
      case 'linkedin':
        return 'LinkedIn';
      default:
        return platform;
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[rgba(20,20,40,0.06)]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-[#17172A]">Generated Clips</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EC4899]/10 text-[#EC4899] text-xs font-bold">
                {clips.length} Clips
              </span>
            </div>
            <p className="text-sm text-[#68697A] mt-0.5">
              High-potential short-form cuts ready for review, caption tuning, and scheduling.
            </p>
          </div>

          <Link
            href="/studio"
            className="px-4 py-2.5 rounded-xl btn-primary-gradient text-xs font-semibold flex items-center gap-2 shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate New Clip</span>
          </Link>
        </div>

        {/* Platform Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Clips' },
            { id: 'instagram', label: 'Instagram Reels (9:16)' },
            { id: 'youtube_shorts', label: 'YouTube Shorts (9:16)' },
            { id: 'linkedin', label: 'LinkedIn (1:1)' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPlatformFilter(item.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                platformFilter === item.id
                  ? 'bg-[#635BFF] text-white shadow-xs'
                  : 'bg-white border border-[rgba(20,20,40,0.08)] text-[#68697A] hover:text-[#17172A]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Clips Grid (Section 15) */}
        {filteredClips.length === 0 ? (
          <div className="card-clean card-premium surface-radial-purple card-top-edge p-12 text-center">
            <div className="icon-box-purple mx-auto mb-3 flex items-center justify-center">
              <Scissors className="w-6 h-6 text-[#635BFF]" />
            </div>
            <h3 className="text-base font-bold text-[#17172A]">No clips in this view</h3>
            <p className="text-xs text-[#68697A] mt-1">Upload a video in studio and let CreatorAI find your best moments.</p>
            <Link
              href="/studio"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold btn-primary-gradient"
            >
              Go to AI Studio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClips.map((clip) => (
              <motion.div
                key={clip.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="card-clean card-premium card-sweep overflow-hidden flex flex-col justify-between group hover:border-[rgba(99,91,255,0.24)]"
              >
                {/* Thin top gradient detail */}
                <div className="card-top-edge" />

                {/* Visual Thumbnail Frame */}
                <div
                  className={`relative bg-[#17172A] overflow-hidden ${
                    clip.aspectRatio === '9:16'
                      ? 'aspect-[9/14]'
                      : clip.aspectRatio === '1:1'
                      ? 'aspect-square'
                      : 'aspect-video'
                  }`}
                >
                  <img
                    src={clip.thumbnailUrl}
                    alt={clip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

                  {/* Top Bar inside thumbnail */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-[#17172A] shadow-xs border border-white/20">
                      {clip.aspectRatio}
                    </span>
                    <ScoreRing score={clip.score} size={42} strokeWidth={4.5} />
                  </div>

                  {/* Center Play Button Overlay */}
                  <Link
                    href={`/editor/${clip.id}`}
                    onClick={() => setActiveClip(clip)}
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <div className="w-13 h-13 rounded-full bg-white/95 backdrop-blur-md text-[#17172A] flex items-center justify-center shadow-[0_6px_25px_rgba(0,0,0,0.35)] group-hover:scale-110 group-hover:bg-[#635BFF] group-hover:text-white transition-all">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </Link>

                  {/* Bottom info on thumbnail */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <span className="text-[10px] font-bold text-white bg-black/75 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                      {clip.durationFormatted}
                    </span>
                    <p className="text-white text-xs font-bold line-clamp-1 mt-1.5 drop-shadow">
                      &ldquo;{clip.hookText}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Meta & Actions */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-semibold text-[#635BFF]">
                        {getPlatformLabel(clip.platform)}
                      </span>
                      <span className="badge-soft-green text-[10px] font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-[#22C55E]" /> Ready
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#17172A] line-clamp-1 mt-1">
                      {clip.title}
                    </h3>

                    <p className="text-xs text-[#68697A] mt-1 line-clamp-2">
                      Captions: <span className="font-medium text-[#17172A]">{clip.captionStyle.id}</span> • Optimized for {clip.platform}
                    </p>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="mt-4 pt-3 border-t border-[rgba(20,20,40,0.06)] flex items-center justify-between gap-2">
                    <button
                      onClick={() => openScheduleModal(clip)}
                      className="px-3.5 py-1.5 rounded-xl border border-[rgba(20,20,40,0.1)] text-xs font-semibold text-[#17172A] hover:bg-[#F3F4FB] hover:border-[#635BFF]/30 flex items-center gap-1.5 transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#68697A]" />
                      <span>Schedule</span>
                    </button>

                    <Link
                      href={`/editor/${clip.id}`}
                      onClick={() => setActiveClip(clip)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold btn-primary-gradient flex items-center gap-1.5 shadow-2xs"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Open Editor</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
