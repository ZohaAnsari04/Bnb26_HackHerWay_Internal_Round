'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AppShell } from '@/components/AppShell';
import {
  Film,
  FileAudio,
  FileText,
  Image as ImageIcon,
  UploadCloud,
  FolderPlus,
  Search,
  Filter,
  Play,
  MoreVertical,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LibraryPage() {
  const { assets, setIsUploadModalOpen, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'audio' | 'image' | 'script'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  const filteredAssets = assets.filter((asset) => {
    const matchesTab = activeTab === 'all' || asset.type === activeTab;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTopic = selectedTopic === 'all' || asset.topics.includes(selectedTopic);
    return matchesTab && matchesSearch && matchesTopic;
  });

  const allTopics = Array.from(new Set(assets.flatMap((a) => a.topics)));

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[rgba(20,20,40,0.06)]">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#17172A]">Content Library</h1>
            <p className="text-sm text-[#68697A] mt-0.5">Everything your content team needs, in one place.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('New folder created: "Q2 Social Series"')}
              className="px-4 py-2.5 rounded-xl border border-[rgba(20,20,40,0.12)] text-xs font-semibold text-[#17172A] hover:bg-[#FAFAF7] transition-all flex items-center gap-2"
            >
              <FolderPlus className="w-4 h-4 text-[#68697A]" />
              <span>New Folder</span>
            </button>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold btn-primary-gradient flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Asset</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[rgba(20,20,40,0.08)] shadow-2xs overflow-x-auto">
            {[
              { id: 'all', label: 'All Assets', icon: Film },
              { id: 'video', label: 'Videos', icon: Film },
              { id: 'audio', label: 'Audio', icon: FileAudio },
              { id: 'image', label: 'Images', icon: ImageIcon },
              { id: 'script', label: 'Scripts', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#635BFF] text-white shadow-xs'
                      : 'text-[#68697A] hover:text-[#17172A] hover:bg-[#FAFAF7]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Topic Filters */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9496A8]" />
              <input
                type="text"
                placeholder="Search assets or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white rounded-xl border border-[rgba(20,20,40,0.1)] text-[#17172A] placeholder-[#9496A8] focus:outline-none focus:border-[#635BFF] w-48 sm:w-60"
              />
            </div>

            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white rounded-xl border border-[rgba(20,20,40,0.1)] text-[#17172A] focus:outline-none focus:border-[#635BFF]"
            >
              <option value="all">All Topics</option>
              {allTopics.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Assets Grid */}
        {filteredAssets.length === 0 ? (
          <div className="card-clean p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#635BFF]/10 text-[#635BFF] mx-auto flex items-center justify-center mb-3">
              <Film className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#17172A]">No assets found</h3>
            <p className="text-xs text-[#68697A] mt-1 max-w-sm mx-auto">
              Your next piece of content starts here. Upload a raw recording to begin.
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold btn-primary-gradient"
            >
              Upload Asset Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAssets.map((asset) => (
              <motion.div
                key={asset.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="card-clean overflow-hidden group flex flex-col justify-between"
              >
                {/* Media Preview Box */}
                <div className="relative aspect-video bg-[#17172A] overflow-hidden">
                  {asset.thumbnailUrl ? (
                    <img
                      src={asset.thumbnailUrl}
                      alt={asset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#17172A] to-[#2D2D44] text-white">
                      {asset.type === 'audio' ? <FileAudio className="w-10 h-10 text-[#635BFF]" /> : <FileText className="w-10 h-10 text-[#EC4899]" />}
                      <span className="text-[11px] font-mono mt-2 text-[#9496A8] uppercase">{asset.type}</span>
                    </div>
                  )}

                  {/* Duration Pill */}
                  {asset.durationFormatted && (
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-mono font-medium">
                      {asset.durationFormatted}
                    </span>
                  )}

                  {/* Play Button Overlay on Hover */}
                  <Link
                    href="/studio"
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-white text-[#17172A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-[#17172A] ml-0.5" />
                    </div>
                  </Link>

                  {/* AI Analyzed Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[rgba(20,20,40,0.08)] shadow-xs">
                    <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
                    <span className="text-[10px] font-bold text-[#17172A]">AI Analyzed</span>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-[#17172A] truncate">
                        {asset.name}
                      </h3>
                      <button
                        onClick={() => showToast(`Actions for ${asset.name}`)}
                        className="text-[#9496A8] hover:text-[#17172A] p-0.5 rounded"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Topics Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {asset.topics.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F7F8FC] border border-[rgba(20,20,40,0.06)] text-[#635BFF]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="mt-4 pt-3 border-t border-[rgba(20,20,40,0.06)] flex items-center justify-between text-[11px] text-[#68697A]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#9496A8]" />
                      <span>{asset.createdAt.slice(0, 10)}</span>
                    </span>

                    <Link
                      href="/studio"
                      className="text-xs font-semibold text-[#635BFF] hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Open in Studio</span>
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
