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
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAFAF7]">
      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Column */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Sticky Topbar */}
        <Topbar />

        {/* Scrollable Main Viewport */}
        <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-8 max-w-7xl w-full mx-auto">
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
