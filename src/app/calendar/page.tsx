'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/AppShell';
import {
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Share2,
  CheckCircle2,
  Eye,
  Sliders
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CalendarEvent } from '@/types';

export default function CalendarPage() {
  const { calendarEvents, openScheduleModal, showToast } = useApp();
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  const [currentMonth, setCurrentMonth] = useState('March 2026');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(calendarEvents[0] || null);

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return { label: 'Instagram', bg: 'bg-[#EC4899]/10', text: 'text-[#EC4899]' };
      case 'youtube_shorts':
        return { label: 'YouTube Shorts', bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]' };
      case 'linkedin':
        return { label: 'LinkedIn', bg: 'bg-[#0A66C2]/10', text: 'text-[#0A66C2]' };
      default:
        return { label: 'X / Twitter', bg: 'bg-[#17172A]/10', text: 'text-[#17172A]' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20';
      case 'scheduled':
        return 'bg-[#635BFF]/10 text-[#635BFF] border-[#635BFF]/20';
      case 'ready':
        return 'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/20';
      default:
        return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20';
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[rgba(20,20,40,0.06)]">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#17172A]">Content Calendar</h1>
            <p className="text-sm text-[#68697A] mt-0.5">
              Omnichannel editorial queue and publication pacing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-white rounded-xl border border-[rgba(20,20,40,0.08)] shadow-2xs">
              {(['month', 'week', 'list'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    viewMode === mode
                      ? 'bg-[#635BFF] text-white shadow-xs'
                      : 'text-[#68697A] hover:text-[#17172A]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <button
              onClick={() => openScheduleModal()}
              className="px-4 py-2 rounded-xl text-xs font-semibold btn-primary-gradient flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>+ Schedule Content</span>
            </button>
          </div>
        </div>

        {/* Month Navigation Bar */}
        <div className="card-clean card-premium p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-[#17172A]">{currentMonth}</span>
            <span className="badge-soft-purple text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {calendarEvents.length} posts scheduled
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Previous month')}
              className="p-1.5 rounded-xl border border-[rgba(20,20,40,0.08)] text-[#68697A] hover:text-[#17172A] hover:bg-[#F7F8FC] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => showToast('Next month')}
              className="p-1.5 rounded-xl border border-[rgba(20,20,40,0.08)] text-[#68697A] hover:text-[#17172A] hover:bg-[#F7F8FC] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Calendar View */}
        {viewMode === 'list' ? (
          /* List View */
          <div className="space-y-3">
            {calendarEvents.map((evt) => {
              const platform = getPlatformBadge(evt.platform);
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className="card-clean card-premium card-sweep p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-[rgba(99,91,255,0.25)] transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={evt.thumbnailUrl}
                      alt={evt.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-2xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${platform.bg} ${platform.text}`}>
                          {platform.label}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getStatusColor(evt.status)}`}>
                          {evt.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#17172A] mt-1">{evt.title}</h4>
                      <p className="text-xs text-[#68697A] mt-0.5 line-clamp-1">{evt.captionExcerpt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#68697A] shrink-0">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#9496A8]" />
                      <span>{evt.scheduledDate} at {evt.scheduledTime}</span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast(`Publishing immediately to ${platform.label}...`);
                      }}
                      className="px-3.5 py-1.5 rounded-xl border border-[rgba(20,20,40,0.1)] text-xs font-semibold text-[#17172A] hover:bg-[#F3F4FB] hover:border-[#635BFF]/30 transition-all"
                    >
                      Publish Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Month / Week Grid View */
          <div className="card-clean card-premium p-5 overflow-hidden">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 pb-3 border-b border-[rgba(20,20,40,0.06)] text-center text-xs font-bold text-[#68697A]">
              <span>SUN</span>
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2 pt-3">
              {Array.from({ length: 31 }, (_, i) => {
                const dayNum = i + 1;
                const dateStr = `2026-03-${dayNum.toString().padStart(2, '0')}`;
                const eventsOnThisDay = calendarEvents.filter((e) => e.scheduledDate === dateStr);

                return (
                  <div
                    key={dayNum}
                    className={`min-h-[100px] p-2.5 rounded-2xl border transition-all flex flex-col justify-between ${
                      dayNum === 28
                        ? 'bg-[#F3F0FF]/40 border-[#635BFF]/30 shadow-2xs'
                        : 'bg-white/60 border-[rgba(20,20,40,0.06)] hover:bg-[#F9FAFE] hover:border-[#635BFF]/25'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[#68697A]">
                      <span className={dayNum === 28 ? 'w-5 h-5 rounded-full bg-[#635BFF] text-white flex items-center justify-center text-[10px] font-bold shadow-xs' : ''}>
                        {dayNum}
                      </span>
                    </div>

                    <div className="space-y-1 mt-1">
                      {eventsOnThisDay.map((evt) => {
                        const platform = getPlatformBadge(evt.platform);
                        return (
                          <div
                            key={evt.id}
                            onClick={() => setSelectedEvent(evt)}
                            className="p-1.5 rounded-xl bg-white border border-[rgba(20,20,40,0.08)] shadow-2xs cursor-pointer hover:border-[#635BFF] hover:shadow-xs transition-all"
                            title={evt.title}
                          >
                            <span className={`text-[9px] font-bold block truncate ${platform.text}`}>
                              {evt.scheduledTime} • {evt.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Event Detail Modal / Drawer */}
        {selectedEvent && (
          <div className="card-clean card-premium surface-radial-purple card-top-edge p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedEvent.thumbnailUrl}
                alt={selectedEvent.title}
                className="w-16 h-16 rounded-xl object-cover shadow-xs"
              />
              <div>
                <span className="text-xs font-bold text-[#635BFF] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#635BFF]" />
                  <span>Scheduled for {selectedEvent.scheduledDate} at {selectedEvent.scheduledTime}</span>
                </span>
                <h4 className="text-sm font-bold text-[#17172A] mt-0.5">{selectedEvent.title}</h4>
                <p className="text-xs text-[#68697A] mt-1 max-w-xl">{selectedEvent.captionExcerpt}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#68697A] hover:bg-black/5 transition-colors"
              >
                Dismiss
              </button>
              <button
                onClick={() => showToast('Post published immediately!')}
                className="px-4 py-2 rounded-xl text-xs font-semibold btn-primary-gradient shadow-xs"
              >
                Publish Now
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
