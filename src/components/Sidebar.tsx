'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Film,
  Sparkles,
  Scissors,
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Layers,
  Flame
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { setIsUploadModalOpen } = useApp();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Content Library', href: '/library', icon: Film },
    { label: 'AI Studio', href: '/studio', icon: Sparkles, badge: 'Core' },
    { label: 'Clips', href: '/clips', icon: Scissors },
    { label: 'Content Calendar', href: '/calendar', icon: Calendar },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  const bottomItems = [
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`relative h-screen bg-white border-r border-[rgba(20,20,40,0.08)] flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0 z-30 ${
        collapsed ? 'w-[76px]' : 'w-[260px]'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 px-5 border-b border-[rgba(20,20,40,0.06)] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden group">
            {/* Logo Mark: play button + sparkle + neural node */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#635BFF] via-[#8B5CF6] to-[#EC4899] flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(99,91,255,0.3)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path
                  d="M12 2L13.8 8.2C14.1 9.3 14.7 9.9 15.8 10.2L22 12L15.8 13.8C14.7 14.1 14.1 14.7 13.8 15.8L12 22L10.2 15.8C9.9 14.7 9.3 14.1 8.2 13.8L2 12L8.2 10.2C9.3 9.9 9.9 9.3 10.2 8.2L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {!collapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[16px] text-[#17172A] tracking-tight">CreatorAI</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                </div>
                <span className="text-[10px] text-[#68697A] font-medium leading-none">Content Operations</span>
              </div>
            )}
          </Link>

          {/* Collapse Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-6 h-6 rounded-md hover:bg-[#F7F8FC] border border-[rgba(20,20,40,0.08)] text-[#68697A] hover:text-[#17172A] flex items-center justify-center transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="p-3">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className={`w-full py-2.5 rounded-xl btn-primary-gradient flex items-center justify-center gap-2 text-xs font-semibold shadow-sm ${
              collapsed ? 'px-0' : 'px-4'
            }`}
            title="Create Content Asset"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            {!collapsed && <span>+ Create Content</span>}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#F3F0FF] text-[#17172A] font-semibold shadow-xs'
                    : 'text-[#68697A] hover:text-[#17172A] hover:bg-[#F7F8FC]'
                }`}
                title={collapsed ? item.label : undefined}
              >
                {/* Left accent indicator */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveIndicator"
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r-md bg-[#635BFF]"
                  />
                )}

                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#635BFF]' : 'text-[#68697A]'
                  }`}
                />

                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#635BFF]/10 text-[#635BFF]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation & Workflow Status */}
      <div className="p-3 border-t border-[rgba(20,20,40,0.06)] space-y-2">
        {!collapsed && (
          <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[rgba(20,20,40,0.06)] mb-2">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-[#68697A] font-medium flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#EC4899]" />
                <span>Monthly Quota</span>
              </span>
              <span className="font-bold text-[#17172A]">87 / 150 clips</span>
            </div>
            <div className="w-full h-1.5 bg-[#E6E8F0] rounded-full overflow-hidden">
              <div className="w-[58%] h-full bg-gradient-to-r from-[#635BFF] to-[#EC4899] rounded-full" />
            </div>
          </div>
        )}

        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                isActive
                  ? 'bg-[#F3F0FF] text-[#635BFF] font-semibold'
                  : 'text-[#68697A] hover:text-[#17172A] hover:bg-[#F7F8FC]'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#68697A] hover:text-[#17172A] hover:bg-[#F7F8FC] rounded-xl transition-colors"
          title={collapsed ? 'Help & Documentation' : undefined}
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Help & Docs</span>}
        </a>
      </div>
    </aside>
  );
}
