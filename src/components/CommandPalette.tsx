'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import {
  Search,
  LayoutDashboard,
  Film,
  Sparkles,
  Scissors,
  Calendar,
  BarChart3,
  Settings,
  Plus,
  Upload,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    projects,
    clips,
    setIsUploadModalOpen,
    openClipModal,
    opportunities
  } = useApp();

  const [query, setQuery] = useState('');
  const router = useRouter();

  if (!isCommandPaletteOpen) return null;

  const pages = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Content Library', path: '/library', icon: Film },
    { name: 'AI Studio', path: '/studio', icon: Sparkles },
    { name: 'Generated Clips', path: '/clips', icon: Scissors },
    { name: 'Content Calendar', path: '/calendar', icon: Calendar },
    { name: 'Content Intelligence / Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings & Integrations', path: '/settings', icon: Settings },
  ];

  const filteredPages = pages.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredClips = clips.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  const navigateTo = (path: string) => {
    setIsCommandPaletteOpen(false);
    setQuery('');
    router.push(path);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCommandPaletteOpen(false)}
          className="fixed inset-0 bg-[#17172A]/30 backdrop-blur-sm"
        />

        {/* Palette Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-[0_25px_80px_rgba(20,20,50,0.2)] border border-[rgba(20,20,40,0.1)] overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-[rgba(20,20,40,0.08)] gap-3 bg-white">
            <Search className="w-5 h-5 text-[#68697A] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, clips, actions, or jump to page..."
              className="w-full text-sm bg-transparent text-[#17172A] placeholder-[#9496A8] focus:outline-none"
            />
            <kbd className="px-2 py-0.5 text-[11px] font-medium text-[#68697A] bg-[#F7F8FC] border border-[rgba(20,20,40,0.08)] rounded-md">
              ESC
            </kbd>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-3">
            {/* Quick Actions */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9496A8] px-2.5">
                Quick Actions
              </span>
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => {
                    setIsCommandPaletteOpen(false);
                    setIsUploadModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#17172A] rounded-xl hover:bg-[#F7F8FC] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center">
                      <Upload className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">Upload Raw Content Asset</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#9496A8] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {opportunities[0] && (
                  <button
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      openClipModal(opportunities[0]);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#17172A] rounded-xl hover:bg-[#F7F8FC] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md bg-[#EC4899]/10 text-[#EC4899] flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">Generate Clip from Top Opportunity</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#9496A8] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
              </div>
            </div>

            {/* Navigation Pages */}
            {filteredPages.length > 0 && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9496A8] px-2.5">
                  Navigation
                </span>
                <div className="mt-1 space-y-0.5">
                  {filteredPages.map((page) => {
                    const Icon = page.icon;
                    return (
                      <button
                        key={page.path}
                        onClick={() => navigateTo(page.path)}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#17172A] rounded-xl hover:bg-[#F7F8FC] transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-[#68697A]" />
                          <span>{page.name}</span>
                        </div>
                        <span className="text-[11px] text-[#9496A8]">Jump</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Projects */}
            {filteredProjects.length > 0 && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9496A8] px-2.5">
                  Projects ({filteredProjects.length})
                </span>
                <div className="mt-1 space-y-0.5">
                  {filteredProjects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => navigateTo('/studio')}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#17172A] rounded-xl hover:bg-[#F7F8FC] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Film className="w-4 h-4 text-[#635BFF]" />
                        <span className="font-medium truncate max-w-[320px]">{proj.title}</span>
                      </div>
                      <span className="text-[11px] text-[#22C55E] font-medium">{proj.opportunityPotential}% Potential</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clips */}
            {filteredClips.length > 0 && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9496A8] px-2.5">
                  Clips ({filteredClips.length})
                </span>
                <div className="mt-1 space-y-0.5">
                  {filteredClips.map((clip) => (
                    <button
                      key={clip.id}
                      onClick={() => navigateTo(`/editor/${clip.id}`)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#17172A] rounded-xl hover:bg-[#F7F8FC] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Scissors className="w-4 h-4 text-[#EC4899]" />
                        <span className="font-medium truncate max-w-[320px]">{clip.title}</span>
                      </div>
                      <span className="text-[11px] text-[#635BFF] font-semibold">{clip.score} Score</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-4 py-2 border-t border-[rgba(20,20,40,0.06)] bg-[#FAFAF7] flex items-center justify-between text-[11px] text-[#9496A8]">
            <span>Navigate with arrows, Enter to select</span>
            <span>CreatorAI Command v1.0</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
