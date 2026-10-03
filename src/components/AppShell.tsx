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
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAFAF8] relative">
      {/* Subtle Ambient Background Depth Blobs (Prompt Section 32: 3-5% opacity, 120-160px blur) */}
      <div className="fixed top-12 left-1/4 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/5 filter blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-1/4 w-[460px] h-[460px] rounded-full bg-[#EC4899]/4 filter blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-1/2 right-12 w-[400px] h-[400px] rounded-full bg-[#06B6D4]/4 filter blur-[140px] pointer-events-none z-0" />

      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Column */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative z-10">
        {/* Sticky Topbar */}
        <Topbar />

        {/* Scrollable Main Viewport */}
        <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-8 max-w-7xl w-full mx-auto relative z-10">
          {children}
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
