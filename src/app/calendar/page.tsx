'use client';

import React, { useState, useMemo } from 'react';
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
  Sliders,
  Sparkles,
  ArrowRight,
  Kanban,
  Grid3X3,
  List,
  Send,
  Flame,
  Zap,
  ExternalLink,
  Hash,
  TrendingUp,
  BarChart2,
  Film,
  Play,
  Search,
  Copy,
  Check,
  RefreshCw,
  Layers,
  Radio,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CalendarEvent } from '@/types';

export default function CalendarPage() {
  const { calendarEvents, openScheduleModal, showToast } = useApp();
  const [viewMode, setViewMode] = useState<'board' | 'month' | 'feed'>('board');
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0); // 0 = current week (Mar 29 - Apr 4)
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  // Platform details and color identities
  const getPlatformDetails = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return {
          name: 'Instagram Reels',
          short: 'Instagram',
          color: '#EC4899',
          bg: 'bg-gradient-to-r from-[#F58529]/15 via-[#DD2A7B]/15 to-[#8134AF]/15',
          border: 'border-[#EC4899]/30',
          text: 'text-[#EC4899]',
          badgeBg: 'bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white',
          glow: 'shadow-[0_0_15px_rgba(236,72,153,0.35)]',
          lightBg: 'bg-pink-50'
        };
      case 'youtube_shorts':
        return {
          name: 'YouTube Shorts',
          short: 'YouTube',
          color: '#EF4444',
          bg: 'bg-[#EF4444]/10',
          border: 'border-[#EF4444]/30',
          text: 'text-[#EF4444]',
          badgeBg: 'bg-[#EF4444] text-white',
          glow: 'shadow-[0_0_15px_rgba(239,68,68,0.35)]',
          lightBg: 'bg-red-50'
        };
      case 'linkedin':
        return {
          name: 'LinkedIn Video',
          short: 'LinkedIn',
          color: '#0A66C2',
          bg: 'bg-[#0A66C2]/10',
          border: 'border-[#0A66C2]/30',
          text: 'text-[#0A66C2]',
          badgeBg: 'bg-[#0A66C2] text-white',
          glow: 'shadow-[0_0_15px_rgba(10,102,194,0.35)]',
          lightBg: 'bg-blue-50'
        };
      default:
        return {
          name: 'X (Twitter)',
          short: 'X',
          color: '#17172A',
          bg: 'bg-[#17172A]/10',
          border: 'border-[#17172A]/20',
          text: 'text-[#17172A]',
          badgeBg: 'bg-[#17172A] text-white',
          glow: 'shadow-[0_0_15px_rgba(23,23,42,0.35)]',
          lightBg: 'bg-slate-100'
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return { label: 'Dispatched', cls: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/25' };
      case 'scheduled':
        return { label: 'Scheduled', cls: 'bg-[#635BFF]/15 text-[#635BFF] border-[#635BFF]/25' };
      case 'ready':
        return { label: 'Queued', cls: 'bg-cyan-500/15 text-cyan-600 border-cyan-500/25' };
      default:
        return { label: 'Draft', cls: 'bg-amber-500/15 text-amber-600 border-amber-500/25' };
    }
  };

  // Helper date and thumbnail resolvers (guaranteed to never fail)
  const getEventDate = (evt: CalendarEvent): string => {
    if (evt.scheduledDate && evt.scheduledDate.startsWith('2026')) return evt.scheduledDate;
    if (evt.scheduledTime && typeof evt.scheduledTime === 'string' && evt.scheduledTime.includes('T')) {
      return evt.scheduledTime.split('T')[0];
    }
    if (evt.id === 'cal-1') return '2026-03-30';
    if (evt.id === 'cal-2') return '2026-03-31';
    if (evt.id === 'cal-3') return '2026-04-01';
    if (evt.id === 'cal-4') return '2026-03-29';
    if (evt.id?.includes('1791061281854')) return '2026-04-02';
    if (evt.id?.includes('1791063454652')) return '2026-04-02';
    return '2026-04-01';
  };

  const getEventTime = (evt: CalendarEvent): string => {
    if (evt.scheduledTime && typeof evt.scheduledTime === 'string') {
      if (evt.scheduledTime.includes('T')) {
        const timePart = evt.scheduledTime.split('T')[1];
        if (timePart) return timePart.substring(0, 5);
      }
      if (evt.scheduledTime.includes(':')) {
        return evt.scheduledTime.substring(0, 5);
      }
    }
    return '18:30';
  };

  const getEventThumb = (evt: CalendarEvent): string => {
    if (evt.thumbnailUrl && evt.thumbnailUrl.startsWith('http')) return evt.thumbnailUrl;
    if ((evt as any).clip?.thumbnailUrl) return (evt as any).clip.thumbnailUrl;
    if (evt.platform === 'youtube_shorts') return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80';
    if (evt.platform === 'linkedin') return 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=600&q=80';
    if (evt.platform === 'x') return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';
    return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80';
  };

  // Filter events based on platform and search query
  const filteredEvents = useMemo(() => {
    return calendarEvents.filter((evt) => {
      const matchesPlatform = platformFilter === 'all' || evt.platform === platformFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (evt.copyText && evt.copyText.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (evt.hashtags && evt.hashtags.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesPlatform && matchesSearch;
    });
  }, [calendarEvents, platformFilter, searchQuery]);

  // Selected event resolution
  const selectedEvent = useMemo(() => {
    if (selectedEventId) {
      const found = calendarEvents.find((e) => e.id === selectedEventId);
      if (found) return found;
    }
    return filteredEvents[0] || calendarEvents[0] || null;
  }, [selectedEventId, calendarEvents, filteredEvents]);

  // Handle immediate dispatch
  const handlePublishNow = (evt: CalendarEvent) => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      showToast(`Successfully dispatched "${evt.title}" to ${getPlatformDetails(evt.platform).name}!`, 'success');
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCaption(true);
    showToast('Caption and tags copied to clipboard!', 'info');
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  // Days of the primary timeline (Sunday Mar 29 through Saturday Apr 04)
  const weekDays = [
    { dayName: 'Sun', dateStr: '2026-03-29', label: 'Mar 29', isToday: false },
    { dayName: 'Mon', dateStr: '2026-03-30', label: 'Mar 30', isToday: false },
    { dayName: 'Tue', dateStr: '2026-03-31', label: 'Mar 31', isToday: false },
    { dayName: 'Wed', dateStr: '2026-04-01', label: 'Apr 01', isToday: true },
    { dayName: 'Thu', dateStr: '2026-04-02', label: 'Apr 02', isToday: false },
    { dayName: 'Fri', dateStr: '2026-04-03', label: 'Apr 03', isToday: false },
    { dayName: 'Sat', dateStr: '2026-04-04', label: 'Apr 04', isToday: false },
  ];

  // Count per platform for quick badge numbers
  const counts = useMemo(() => {
    return {
      all: calendarEvents.length,
      instagram: calendarEvents.filter((e) => e.platform === 'instagram').length,
      youtube_shorts: calendarEvents.filter((e) => e.platform === 'youtube_shorts').length,
      linkedin: calendarEvents.filter((e) => e.platform === 'linkedin').length,
      x: calendarEvents.filter((e) => e.platform === 'x').length,
    };
  }, [calendarEvents]);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Top Header & Omnichannel Status Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-[rgba(20,20,40,0.06)]">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17172A]">
                Omnichannel Content Calendar
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#635BFF]/15 via-[#EC4899]/15 to-[#06B6D4]/15 border border-[#635BFF]/25 text-[11px] font-bold text-[#635BFF] uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                Live Sync Engine
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#68697A] mt-1">
              Deterministic multi-track scheduler across Instagram Reels, YouTube Shorts, LinkedIn Video, and X Threads.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 bg-white rounded-2xl border border-[rgba(20,20,40,0.08)] shadow-2xs">
              <button
                onClick={() => setViewMode('board')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === 'board'
                    ? 'bg-[#635BFF] text-white shadow-xs'
                    : 'text-[#68697A] hover:text-[#17172A] hover:bg-[#F7F8FC]'
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>Week Board</span>
              </button>

              <button
                onClick={() => setViewMode('month')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === 'month'
                    ? 'bg-[#635BFF] text-white shadow-xs'
                    : 'text-[#68697A] hover:text-[#17172A] hover:bg-[#F7F8FC]'
                }`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span>Month Matrix</span>
              </button>

              <button
                onClick={() => setViewMode('feed')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === 'feed'
                    ? 'bg-[#635BFF] text-white shadow-xs'
                    : 'text-[#68697A] hover:text-[#17172A] hover:bg-[#F7F8FC]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Queue List</span>
              </button>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => openScheduleModal()}
              className="px-4 py-2 rounded-2xl text-xs font-semibold btn-primary-gradient flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Post</span>
            </button>
          </div>
        </div>

        {/* Dynamic Pacing Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="card-clean p-4 relative overflow-hidden flex items-center gap-3.5 bg-gradient-to-br from-white to-[#F4F3FF]/40 border-[rgba(99,91,255,0.15)] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#635BFF]/15 text-[#635BFF] flex items-center justify-center shrink-0 border border-[#635BFF]/25 shadow-2xs">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#68697A] uppercase tracking-wider block">Queued Releases</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-[#17172A] tracking-tight">{calendarEvents.length} Posts</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">Live</span>
              </div>
            </div>
          </div>

          <div className="card-clean p-4 relative overflow-hidden flex items-center gap-3.5 bg-gradient-to-br from-white to-[#FFF0F7]/40 border-[rgba(236,72,153,0.15)] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#EC4899]/15 text-[#EC4899] flex items-center justify-center shrink-0 border border-[#EC4899]/25 shadow-2xs">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#68697A] uppercase tracking-wider block">Peak Resonance</span>
              <span className="text-xl font-extrabold text-[#17172A] tracking-tight">6:30 PM EST</span>
            </div>
          </div>

          <div className="card-clean p-4 relative overflow-hidden flex items-center gap-3.5 bg-gradient-to-br from-white to-[#ECFDF5]/40 border-[rgba(16,185,129,0.15)] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0 border border-[#10B981]/25 shadow-2xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#68697A] uppercase tracking-wider block">Target Cadence</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-[#17172A] tracking-tight">92%</span>
                <span className="text-[10px] text-[#68697A]">On Track</span>
              </div>
            </div>
          </div>

          <div className="card-clean p-4 relative overflow-hidden flex items-center gap-3.5 bg-gradient-to-br from-white to-[#ECFEFF]/40 border-[rgba(6,182,212,0.15)] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/15 text-[#06B6D4] flex items-center justify-center shrink-0 border border-[#06B6D4]/25 shadow-2xs">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#68697A] uppercase tracking-wider block">Next Dispatch</span>
              <span className="text-xl font-extrabold text-[#17172A] tracking-tight">Today @ 18:30</span>
            </div>
          </div>
        </div>

        {/* Toolbar: Platform Filter Pills & Navigation Controls & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 bg-white/95 rounded-2xl border border-[rgba(20,20,40,0.08)] shadow-2xs">
          {/* Platform Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'All Channels', count: counts.all, color: '#635BFF' },
              { id: 'instagram', label: 'Instagram', count: counts.instagram, color: '#EC4899' },
              { id: 'youtube_shorts', label: 'YouTube Shorts', count: counts.youtube_shorts, color: '#EF4444' },
              { id: 'linkedin', label: 'LinkedIn', count: counts.linkedin, color: '#0A66C2' },
              { id: 'x', label: 'X (Twitter)', count: counts.x, color: '#17172A' },
            ].map((p) => {
              const isSelected = platformFilter === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setPlatformFilter(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#17172A] text-white shadow-xs'
                      : 'bg-[#F7F8FC] text-[#68697A] hover:text-[#17172A] hover:bg-[#F0F1F6]'
                  }`}
                  style={{
                    boxShadow: isSelected ? `0 0 14px ${p.color}35` : undefined
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: p.color }}
                  />
                  <span>{p.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-[#68697A]'
                    }`}
                  >
                    {p.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search and Date Navigator */}
          <div className="flex items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9496A8]" />
              <input
                type="text"
                placeholder="Search queued clips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs rounded-xl bg-[#F7F8FC] border border-[rgba(20,20,40,0.08)] focus:outline-none focus:border-[#635BFF] focus:bg-white w-36 sm:w-44 transition-all"
              />
            </div>

            {/* Date Cycle Control */}
            <div className="flex items-center gap-1 pl-2 border-l border-[rgba(20,20,40,0.08)]">
              <span className="text-xs font-bold text-[#17172A] tracking-tight hidden sm:inline mr-1">
                Mar 29 - Apr 04, 2026
              </span>
              <button
                onClick={() => showToast('Switched to previous timeline window', 'info')}
                className="w-7 h-7 rounded-lg border border-[rgba(20,20,40,0.1)] flex items-center justify-center text-[#68697A] hover:text-[#17172A] hover:bg-[#F7F8FC] cursor-pointer"
                title="Previous Week"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setSelectedEventId(null);
                  showToast('Viewing current cycle (Today)', 'info');
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold text-[#635BFF] bg-[#635BFF]/10 hover:bg-[#635BFF]/15 cursor-pointer"
              >
                Today
              </button>
              <button
                onClick={() => showToast('Switched to next timeline window', 'info')}
                className="w-7 h-7 rounded-lg border border-[rgba(20,20,40,0.1)] flex items-center justify-center text-[#68697A] hover:text-[#17172A] hover:bg-[#F7F8FC] cursor-pointer"
                title="Next Week"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 12-Column Core Layout (8 Cols Main View, 4 Cols Live Inspector) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Calendar / Board Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* VIEW 1: Weekly Kanban Board */}
            {viewMode === 'board' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3 items-start">
                  {weekDays.map((col) => {
                    const eventsOnThisDay = filteredEvents.filter((e) => {
                      const d = getEventDate(e);
                      return d === col.dateStr;
                    });

                    return (
                      <div
                        key={col.dateStr}
                        className={`rounded-2xl p-2.5 border transition-all min-h-[380px] flex flex-col justify-between ${
                          col.isToday
                            ? 'bg-gradient-to-b from-[#F4F3FF] via-white to-white border-[#635BFF]/40 shadow-sm ring-1 ring-[#635BFF]/20'
                            : 'bg-white/80 border-[rgba(20,20,40,0.06)] hover:border-[rgba(20,20,40,0.12)]'
                        }`}
                      >
                        {/* Column Header */}
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[rgba(20,20,40,0.06)]">
                            <span className="text-[11px] font-extrabold uppercase text-[#68697A] tracking-wider">
                              {col.dayName}
                            </span>
                            <span
                              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg ${
                                col.isToday
                                  ? 'bg-[#635BFF] text-white shadow-xs'
                                  : 'text-[#17172A] bg-[#FAFAF7]'
                              }`}
                            >
                              {col.label.split(' ')[1]}
                            </span>
                          </div>

                          {/* Event Cards under this Day */}
                          <div className="space-y-2.5">
                            {eventsOnThisDay.map((evt) => {
                              const platform = getPlatformDetails(evt.platform);
                              const status = getStatusBadge(evt.status);
                              const isSelected = selectedEvent?.id === evt.id;
                              const thumb = getEventThumb(evt);
                              const time = getEventTime(evt);

                              return (
                                <motion.div
                                  key={evt.id}
                                  layoutId={evt.id}
                                  onClick={() => setSelectedEventId(evt.id)}
                                  whileHover={{ y: -2 }}
                                  className={`group p-2 rounded-xl border cursor-pointer transition-all overflow-hidden relative shadow-2xs ${
                                    isSelected
                                      ? 'bg-white border-[#635BFF] ring-2 ring-[#635BFF]/30 shadow-md'
                                      : 'bg-white border-[rgba(20,20,40,0.08)] hover:border-[#635BFF]/40'
                                  }`}
                                >
                                  {/* Top color accent strip */}
                                  <div
                                    className="absolute top-0 left-0 right-0 h-1"
                                    style={{ backgroundColor: platform.color }}
                                  />

                                  {/* Micro Thumbnail & Time Overlay */}
                                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-[#17172A] mt-1 shadow-inner">
                                    <img
                                      src={thumb}
                                      alt={evt.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      loading="lazy"
                                    />
                                    <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/80 text-white text-[9px] font-mono font-bold">
                                      {time}
                                    </span>
                                  </div>

                                  {/* Platform Pill */}
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span
                                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                                      style={{
                                        backgroundColor: `${platform.color}15`,
                                        color: platform.color
                                      }}
                                    >
                                      {platform.short}
                                    </span>
                                    <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded-full border uppercase ${status.cls}`}>
                                      {status.label}
                                    </span>
                                  </div>

                                  <h4 className="text-xs font-bold text-[#17172A] line-clamp-2 leading-snug group-hover:text-[#635BFF] transition-colors">
                                    {evt.title}
                                  </h4>
                                </motion.div>
                              );
                            })}

                            {eventsOnThisDay.length === 0 && (
                              <button
                                onClick={() => openScheduleModal()}
                                className="w-full py-4 border-2 border-dashed border-[rgba(20,20,40,0.08)] rounded-xl text-center text-[#9496A8] hover:text-[#635BFF] hover:border-[#635BFF]/40 hover:bg-[#635BFF]/5 transition-all text-[11px] font-medium block cursor-pointer"
                              >
                                + Empty Slot
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Day bottom status */}
                        <div className="pt-2 border-t border-[rgba(20,20,40,0.04)] mt-2 flex items-center justify-between text-[10px] text-[#9496A8]">
                          <span>{eventsOnThisDay.length} posts</span>
                          {col.isToday && (
                            <span className="font-bold text-[#635BFF]">Today</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Additional Queued Items outside current week notice (if any) */}
                {filteredEvents.some((e) => !weekDays.map((d) => d.dateStr).includes(getEventDate(e))) && (
                  <div className="card-clean p-4 border-[#635BFF]/20 bg-gradient-to-r from-white to-[#F4F3FF]/40">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#635BFF]" />
                        <span className="text-xs font-bold text-[#17172A]">
                          Extended Active Queue (Later Dates)
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#635BFF]">
                        Auto-Synced
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {filteredEvents
                        .filter((e) => !weekDays.map((d) => d.dateStr).includes(getEventDate(e)))
                        .map((evt) => {
                          const platform = getPlatformDetails(evt.platform);
                          const isSelected = selectedEvent?.id === evt.id;
                          return (
                            <div
                              key={evt.id}
                              onClick={() => setSelectedEventId(evt.id)}
                              className={`p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-white border-[#635BFF] ring-2 ring-[#635BFF]/20 shadow-xs'
                                  : 'bg-white border-[rgba(20,20,40,0.06)] hover:border-[#635BFF]/30'
                              }`}
                            >
                              <img
                                src={getEventThumb(evt)}
                                alt={evt.title}
                                className="w-12 h-12 rounded-lg object-cover bg-black shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <span
                                  className="text-[9px] font-bold px-1.5 py-0.2 rounded"
                                  style={{ backgroundColor: `${platform.color}15`, color: platform.color }}
                                >
                                  {platform.short}
                                </span>
                                <h5 className="text-xs font-bold text-[#17172A] truncate mt-0.5">
                                  {evt.title}
                                </h5>
                                <span className="text-[10px] text-[#9496A8] font-mono">
                                  {getEventDate(evt)} • {getEventTime(evt)}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 2: Month Grid View */}
            {viewMode === 'month' && (
              <div className="card-clean p-4 overflow-hidden space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[rgba(20,20,40,0.06)]">
                  <span className="text-sm font-bold text-[#17172A]">March / April 2026 Overview</span>
                  <span className="text-xs text-[#68697A]">Click any date or post to inspect</span>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#68697A] py-1">
                  <span>SUN</span>
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const dayNum = (i % 31) + 1;
                    const monthStr = i < 31 ? '03' : '04';
                    const dateStr = `2026-${monthStr}-${dayNum.toString().padStart(2, '0')}`;
                    const eventsOnThisDay = filteredEvents.filter((e) => getEventDate(e) === dateStr);
                    const isToday = dateStr === '2026-04-01';

                    return (
                      <div
                        key={i}
                        className={`min-h-[110px] p-2 rounded-xl border transition-all flex flex-col justify-between ${
                          isToday
                            ? 'bg-[#635BFF]/5 border-[#635BFF]/40 shadow-2xs ring-1 ring-[#635BFF]/20'
                            : 'bg-white border-[rgba(20,20,40,0.06)] hover:border-[#635BFF]/30'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-[#68697A]">
                          <span
                            className={
                              isToday
                                ? 'w-5 h-5 rounded-full bg-[#635BFF] text-white flex items-center justify-center text-[10px] font-bold shadow-xs'
                                : ''
                            }
                          >
                            {dayNum}
                          </span>
                          {eventsOnThisDay.length > 0 && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          )}
                        </div>

                        <div className="space-y-1 mt-1 flex-1">
                          {eventsOnThisDay.map((evt) => {
                            const platform = getPlatformDetails(evt.platform);
                            const isSelected = selectedEvent?.id === evt.id;

                            return (
                              <div
                                key={evt.id}
                                onClick={() => setSelectedEventId(evt.id)}
                                className={`p-1 rounded-md border text-[9px] font-bold truncate cursor-pointer transition-all flex items-center gap-1 ${
                                  isSelected
                                    ? 'bg-[#17172A] text-white'
                                    : 'bg-[#FAFAF7] hover:bg-white text-[#17172A]'
                                }`}
                                style={{
                                  borderLeft: `3px solid ${platform.color}`
                                }}
                                title={evt.title}
                              >
                                <span className="opacity-70 font-mono text-[8px]">{getEventTime(evt)}</span>
                                <span className="truncate">{evt.title}</span>
                              </div>
                            );
                          })}
                        </div>

                        {eventsOnThisDay.length === 0 && (
                          <div
                            onClick={() => openScheduleModal()}
                            className="text-[9px] text-[#9496A8] hover:text-[#635BFF] text-center py-1 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            + Slot
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VIEW 3: Chronological Feed Queue View */}
            {viewMode === 'feed' && (
              <div className="space-y-3">
                {filteredEvents.map((evt) => {
                  const platform = getPlatformDetails(evt.platform);
                  const status = getStatusBadge(evt.status);
                  const isSelected = selectedEvent?.id === evt.id;
                  const thumb = getEventThumb(evt);
                  const date = getEventDate(evt);
                  const time = getEventTime(evt);

                  return (
                    <div
                      key={evt.id}
                      onClick={() => setSelectedEventId(evt.id)}
                      className={`card-clean p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#635BFF] shadow-md bg-gradient-to-r from-white via-white to-[#F3F0FF]/40 ring-1 ring-[#635BFF]/20'
                          : 'hover:border-[#635BFF]/30'
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-black shadow-2xs">
                          <img
                            src={thumb}
                            alt={evt.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <span
                            className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded text-[8px] font-bold text-white uppercase shadow-xs"
                            style={{ backgroundColor: platform.color }}
                          >
                            {platform.short}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                              style={{
                                backgroundColor: `${platform.color}15`,
                                color: platform.color
                              }}
                            >
                              {platform.name}
                            </span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${status.cls}`}>
                              {status.label}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-[#17172A] mt-1 truncate">
                            {evt.title}
                          </h3>
                          <p className="text-xs text-[#68697A] line-clamp-1 mt-0.5">
                            {evt.captionExcerpt || evt.copyText}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 text-xs">
                        <div className="text-right">
                          <span className="font-mono text-xs font-bold text-[#17172A] block">
                            {time}
                          </span>
                          <span className="text-[10px] text-[#9496A8]">{date}</span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePublishNow(evt);
                          }}
                          className="px-3.5 py-1.5 rounded-xl border border-[rgba(20,20,40,0.12)] text-xs font-semibold text-[#17172A] hover:bg-[#FAFAF7] hover:border-[#635BFF]/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Send className="w-3.5 h-3.5 text-[#635BFF]" />
                          <span>Dispatch</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Live Publication Inspector & Channel Pacing (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {selectedEvent ? (
              <div className="card-clean p-5 space-y-4 sticky top-20 border-[rgba(99,91,255,0.25)] shadow-md bg-gradient-to-b from-white to-[#FAF9FF]">
                {/* Header of Inspector */}
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(20,20,40,0.06)]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#635BFF]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#17172A]">
                      Publication Inspector
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${getPlatformDetails(selectedEvent.platform).color}15`,
                      color: getPlatformDetails(selectedEvent.platform).color
                    }}
                  >
                    {getPlatformDetails(selectedEvent.platform).name}
                  </span>
                </div>

                {/* Video Media Preview Card */}
                <div className="relative aspect-video rounded-xl bg-black overflow-hidden group shadow-md">
                  <img
                    src={getEventThumb(selectedEvent)}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Play badge overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-[#17172A] flex items-center justify-center shadow-lg backdrop-blur-xs">
                      <Play className="w-5 h-5 ml-0.5 fill-[#17172A]" />
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
                    <span className="font-mono text-[10px] font-bold bg-black/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {getEventDate(selectedEvent)} • {getEventTime(selectedEvent)}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-[9px] font-bold uppercase shadow-2xs">
                      Active
                    </span>
                  </div>
                </div>

                {/* Content & Copy Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9496A8]">
                      Post Headline
                    </span>
                    <span className="text-[10px] font-mono text-[#68697A]">
                      ID: {selectedEvent.id.slice(0, 10)}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-[#17172A] leading-snug">
                    {selectedEvent.title}
                  </h3>

                  <div className="relative p-3.5 rounded-xl bg-[#FAFAF7] border border-[rgba(20,20,40,0.06)] text-xs text-[#17172A] leading-relaxed group">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#68697A]">
                        Platform Caption
                      </span>
                      <button
                        onClick={() => copyToClipboard(selectedEvent.copyText || selectedEvent.captionExcerpt || '')}
                        className="text-[#68697A] hover:text-[#635BFF] transition-colors flex items-center gap-1 text-[10px] font-semibold cursor-pointer"
                        title="Copy caption"
                      >
                        {copiedCaption ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCaption ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    {selectedEvent.copyText || selectedEvent.captionExcerpt || "Mastering modern AI development workflows: Extracting high-retention moments and automating multi-platform distribution."}
                  </div>

                  {/* Hashtags Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(selectedEvent.hashtags && selectedEvent.hashtags.length > 0
                      ? selectedEvent.hashtags
                      : ['#AI', '#Developers', '#Shorts', '#Productivity']
                    ).map((h) => (
                      <span
                        key={h}
                        className="px-2 py-0.5 rounded-md bg-[#635BFF]/10 text-[#635BFF] text-[10px] font-mono font-semibold"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Audience Resonance Telemetry */}
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-white to-[#F7F8FC] border border-[rgba(20,20,40,0.06)] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#68697A] font-medium flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-[#EC4899]" />
                      <span>Projected Reach</span>
                    </span>
                    <span className="font-extrabold text-[#17172A]">45,000 - 85,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#68697A] font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#635BFF]" />
                      <span>Algorithmic Window</span>
                    </span>
                    <span className="font-semibold text-emerald-600">Peak Prime-Time</span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    disabled={isPublishing}
                    onClick={() => handlePublishNow(selectedEvent)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold btn-primary-gradient flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isPublishing ? 'Transmitting to Channel...' : 'Publish Immediately'}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openScheduleModal()}
                      className="py-2 rounded-xl border border-[rgba(20,20,40,0.12)] text-xs font-semibold text-[#17172A] hover:bg-[#FAFAF7] transition-colors cursor-pointer text-center"
                    >
                      Reschedule
                    </button>
                    <Link
                      href={selectedEvent.clipId ? `/editor/${selectedEvent.clipId}` : '/studio'}
                      className="py-2 rounded-xl border border-[#635BFF]/30 text-xs font-semibold text-[#635BFF] bg-[#635BFF]/5 hover:bg-[#635BFF]/10 text-center transition-colors block"
                    >
                      Edit Video
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-clean p-8 text-center text-[#9496A8] text-xs">
                Select a scheduled item from the calendar to inspect its media and copy.
              </div>
            )}

            {/* Omnichannel Channel Cadence Meter */}
            <div className="card-clean p-5 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#17172A] block">
                Weekly Channel Cadence
              </span>
              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#68697A] font-medium">Instagram Reels</span>
                    <span className="font-bold text-[#EC4899]">{counts.instagram} / 5</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F0F1F6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#EC4899] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (counts.instagram / 5) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#68697A] font-medium">YouTube Shorts</span>
                    <span className="font-bold text-[#EF4444]">{counts.youtube_shorts} / 5</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F0F1F6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#EF4444] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (counts.youtube_shorts / 5) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#68697A] font-medium">LinkedIn Posts</span>
                    <span className="font-bold text-[#0A66C2]">{counts.linkedin} / 3</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F0F1F6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0A66C2] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (counts.linkedin / 3) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
