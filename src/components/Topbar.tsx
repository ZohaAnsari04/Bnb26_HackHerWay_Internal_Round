'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Search,
  Bell,
  Sparkles,
  Command,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Topbar() {
  const pathname = usePathname();
  const { setIsCommandPaletteOpen, isDemoMode, setIsDemoMode, showToast } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  // Format breadcrumbs from pathname
  const getPageInfo = () => {
    switch (pathname) {
      case '/dashboard':
        return { title: 'Dashboard', sub: 'Overview of content assets and AI opportunities' };
      case '/library':
        return { title: 'Content Library', sub: 'All raw media assets, recordings, and scripts' };
      case '/studio':
        return { title: 'AI Studio', sub: 'Semantic transcript, key themes, and opportunity detection' };
      case '/clips':
        return { title: 'Clips', sub: 'AI-generated vertical and platform-tailored video clips' };
      case '/calendar':
        return { title: 'Content Calendar', sub: 'Editorial schedule across Instagram, YouTube, and LinkedIn' };
      case '/analytics':
        return { title: 'Analytics & Intelligence', sub: 'Real-time performance metrics and AI content insights' };
      case '/settings':
        return { title: 'Settings', sub: 'API keys, AI model preferences, and connected channels' };
      default:
        if (pathname?.startsWith('/editor')) {
          return { title: 'AI Video Editor', sub: 'Refine captions, hooks, and aspect framing' };
        }
        return { title: 'CreatorAI', sub: 'AI-Powered Creator Operating Platform' };
    }
  };

  const { title } = getPageInfo();

  return (
    <header className="h-16 px-6 bg-white/90 backdrop-blur-md border-b border-[rgba(20,20,40,0.06)] flex items-center justify-between sticky top-0 z-20">
      {/* Left: Breadcrumbs / Title */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-medium text-[#68697A]">CreatorAI</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#9496A8]" />
        <span className="font-semibold text-[#17172A] text-sm">{title}</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Search / Command palette trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[rgba(20,20,40,0.08)] bg-[#F7F8FC] hover:bg-[#F0F1F6] text-xs text-[#68697A] hover:text-[#17172A] transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search anything...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-white rounded border border-[rgba(20,20,40,0.08)] shadow-2xs">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Demo Mode Toggle Badge */}
        <button
          onClick={() => {
            const nextVal = !isDemoMode;
            setIsDemoMode(nextVal);
            showToast(nextVal ? 'Demo Mode Active (Pre-seeded dataset)' : 'Live API Mode Active', 'info');
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
            isDemoMode
              ? 'bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20'
              : 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20'
          }`}
          title="Toggle between Live API and Seeded Demo mode"
        >
          <ShieldCheck className="w-3 h-3" />
          <span className="hidden md:inline">{isDemoMode ? 'Demo Mode' : 'Live API'}</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-8 h-8 rounded-xl border border-[rgba(20,20,40,0.08)] text-[#68697A] hover:text-[#17172A] hover:bg-[#F7F8FC] flex items-center justify-center relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EC4899]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-[0_20px_50px_rgba(20,20,50,0.15)] border border-[rgba(20,20,40,0.08)] p-3 space-y-2 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(20,20,40,0.06)] px-1">
                <span className="text-xs font-semibold text-[#17172A]">Notifications</span>
                <span className="text-[10px] text-[#635BFF] font-medium cursor-pointer">Mark all read</span>
              </div>
              <div className="p-2 rounded-xl bg-[#F7F8FC] border border-[rgba(20,20,40,0.04)] text-xs">
                <p className="font-medium text-[#17172A]">Clip generated: &quot;AI Autocomplete Mistake&quot;</p>
                <p className="text-[11px] text-[#68697A] mt-0.5">Ready for review or scheduling</p>
                <span className="text-[10px] text-[#9496A8] mt-1 block">12 mins ago</span>
              </div>
              <div className="p-2 rounded-xl hover:bg-[#FAFAF7] text-xs">
                <p className="font-medium text-[#17172A]">High Opportunity Score detected</p>
                <p className="text-[11px] text-[#68697A] mt-0.5">Moment scored 92/100 potential</p>
                <span className="text-[10px] text-[#9496A8] mt-1 block">1 hour ago</span>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[rgba(20,20,40,0.08)]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#635BFF] to-[#EC4899] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            CA
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-[#17172A] leading-tight">Alex Rivera</span>
            <span className="text-[10px] text-[#68697A] leading-tight">Creator Pro</span>
          </div>
        </div>
      </div>
    </header>
  );
}
