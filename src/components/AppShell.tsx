'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { UploadModal } from './UploadModal';
import { AIProcessingModal } from './AIProcessingModal';
import { ClipModal } from './ClipModal';
import { ScoreModal } from './ScoreModal';
import { ScheduleModal } from './ScheduleModal';
import { CommandPalette } from './CommandPalette';
import { ToastContainer } from './ToastContainer';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#F7F8FC]">
      {/* Dynamic Vivid Colorful Ambient Lighting Orbs across all pages */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[15%] right-[5%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#635BFF]/22 via-[#EC4899]/16 to-transparent blur-[110px]" />
        <div className="absolute top-[25%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#06B6D4]/20 via-[#3B82F6]/16 to-transparent blur-[110px]" />
        <div className="absolute top-[55%] right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#EC4899]/18 via-[#8B5CF6]/15 to-transparent blur-[110px]" />
        <div className="absolute -bottom-[15%] left-[20%] w-[650px] h-[650px] rounded-full bg-gradient-to-tl from-[#10B981]/18 via-[#F59E0B]/14 to-transparent blur-[120px]" />
      </div>

      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Column */}
      <div className="relative z-10 flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Sticky Topbar */}
        <Topbar />

        {/* Scrollable Main Viewport */}
        <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-8 max-w-7xl w-full mx-auto flex flex-col justify-between">
          <div className="flex-1">
            {children}
          </div>

          {/* App Footer */}
          <footer className="mt-14 pt-6 pb-4 border-t border-[rgba(20,20,40,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#68697A]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#17172A]">CreatorAI Content Engine</span>
              <span>•</span>
              <span>Built by Team <strong className="text-[#635BFF] font-bold bg-[#635BFF]/10 px-2 py-0.5 rounded-md border border-[#635BFF]/20">:HackHerWay:</strong></span>
            </div>
            <p className="text-[11px] text-[#9496A8]">
              Autonomous Content Engine • HackHerWay 2026
            </p>
          </footer>
        </main>
      </div>

      {/* Interactive Global Modals */}
      <UploadModal />
      <AIProcessingModal />
      <ClipModal />
      <ScoreModal />
      <ScheduleModal />
      <CommandPalette />
      <ToastContainer />
    </div>
  );
}
