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
  FolderKanban,
  Palette,
  ChevronsLeft,
  ChevronsRight,
  Cloud,
  Crown,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { showToast } = useApp();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Content Library', href: '/library', icon: Film },
    { label: 'AI Studio', href: '/studio', icon: Sparkles, badge: 'Core' },
    { label: 'Clips', href: '/clips', icon: Scissors },
    { label: 'Content Calendar', href: '/calendar', icon: Calendar },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'My Projects', href: '/library', icon: FolderKanban },
    { label: 'Brand Kit', href: '/settings', icon: Palette },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`relative h-screen bg-white border-r border-[rgba(20,20,40,0.06)] flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0 z-30 ${
        collapsed ? 'w-[78px]' : 'w-[250px]'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-18 px-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 overflow-hidden group">
            {/* Logo Mark: play button + sparkle */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#635BFF] via-[#8B5CF6] to-[#EC4899] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(99,91,255,0.3)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
                <path
                  d="M12 2L13.8 8.2C14.1 9.3 14.7 9.9 15.8 10.2L22 12L15.8 13.8C14.7 14.1 14.1 14.7 13.8 15.8L12 22L10.2 15.8C9.9 14.7 9.3 14.1 8.2 13.8L2 12L8.2 10.2C9.3 9.9 9.9 9.3 10.2 8.2L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {!collapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[18px] text-[#17172A] tracking-tight">CreatorAI</span>
                </div>
                <span className="text-[11px] text-[#6B6B7A] font-medium leading-none">Content Operations</span>
              </div>
            )}
          </Link>

          {/* Collapse Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 rounded-lg hover:bg-[#F8F8FC] border border-[rgba(20,20,40,0.06)] text-[#6B6B7A] hover:text-[#17172A] flex items-center justify-center transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="px-3.5 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href) && item.label !== 'My Projects' && item.label !== 'Brand Kit');

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#F2EFFE] text-[#635BFF] shadow-2xs font-bold'
                    : 'text-[#6B6B7A] hover:text-[#17172A] hover:bg-[#F8F8FC]'
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
                    isActive ? 'text-[#635BFF]' : 'text-[#6B6B7A]'
                  }`}
                />

                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#635BFF]/15 text-[#635BFF]">
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

      {/* Bottom Sidebar: Upgrade to Pro & Storage */}
      <div className="p-3.5 space-y-3">
        {!collapsed && (
          <>
            {/* Upgrade to Pro Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF5F7] via-white to-[#F6F4FE] border border-[rgba(236,72,153,0.15)] shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#17172A] mb-1">
                <Crown className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                <span>Upgrade to Pro</span>
              </div>
              <p className="text-[11px] text-[#6B6B7A] leading-relaxed mb-3">
                Unlock more AI features, higher limits and advanced analytics.
              </p>
              <button
                onClick={() => showToast('Upgraded to CreatorAI Pro tier!', 'success')}
                className="w-full py-2 px-3 rounded-xl btn-primary-gradient text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Upgrade Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Storage Progress */}
            <div className="px-1 py-1">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#6B6B7A] font-medium flex items-center gap-1.5 text-[11px]">
                  <Cloud className="w-3.5 h-3.5 text-[#635BFF]" />
                  <span>Storage</span>
                </span>
                <span className="font-semibold text-[#17172A] text-[11px]">12.4 GB / 50 GB</span>
              </div>
              <div className="w-full h-1.5 bg-[#EAEAF2] rounded-full overflow-hidden">
                <div className="w-[25%] h-full bg-[#635BFF] rounded-full" />
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
