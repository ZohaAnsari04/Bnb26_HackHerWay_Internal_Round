'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Search,
  Bell,
  Sparkles,
  Command,
  ChevronDown,
  Plus,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Topbar() {
  const pathname = usePathname();
  const { setIsCommandPaletteOpen, isDemoMode, setIsDemoMode, showToast, setIsUploadModalOpen } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);

  return (
    <header className="h-18 px-8 bg-transparent flex items-center justify-between sticky top-0 z-20">
      {/* Search Input matching Reference Visual */}
      <div className="flex-1 max-w-md">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-4 py-2 rounded-2xl border border-[rgba(20,20,40,0.07)] bg-white/90 backdrop-blur-md hover:bg-white text-xs text-[#6B6B7A] transition-all shadow-xs group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#9898A7] group-hover:text-[#635BFF] transition-colors" />
            <span className="text-[12px] text-[#6B6B7A]">Search assets, clips, projects...</span>
          </div>
          <kbd className="flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-semibold text-[#6B6B7A] bg-[#F8F8FC] rounded-lg border border-[rgba(20,20,40,0.06)]">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center gap-3.5">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-xl bg-white border border-[rgba(20,20,40,0.07)] text-[#17172A] hover:bg-[#F8F8FC] flex items-center justify-center relative transition-colors shadow-2xs"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EC4899] ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-[0_20px_50px_rgba(20,20,50,0.15)] border border-[rgba(20,20,40,0.08)] p-3 space-y-2 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(20,20,40,0.06)] px-1">
                <span className="text-xs font-bold text-[#17172A]">Notifications</span>
                <span className="text-[10px] text-[#635BFF] font-medium cursor-pointer">Mark all read</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8F8FC] border border-[rgba(20,20,40,0.04)] text-xs">
                <p className="font-semibold text-[#17172A]">Clip generated: &ldquo;AI Autocomplete Mistake&rdquo;</p>
                <p className="text-[11px] text-[#6B6B7A] mt-0.5">Ready for review or scheduling</p>
                <span className="text-[10px] text-[#9898A7] mt-1 block">12 mins ago</span>
              </div>
            </div>
          )}
        </div>

        {/* "+ Create v" Primary Action Button */}
        <div className="relative">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2 rounded-xl btn-primary-gradient text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>

        {/* User Profile Info (Zoha Ansari - Creator Pro) */}
        <div className="flex items-center gap-2.5 pl-2">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="Zoha Ansari"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-2xs"
          />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-[#17172A] leading-tight">Zoha Ansari</span>
            <span className="text-[11px] text-[#6B6B7A] leading-tight font-medium">Creator Pro</span>
          </div>
        </div>
      </div>
    </header>
  );
}
