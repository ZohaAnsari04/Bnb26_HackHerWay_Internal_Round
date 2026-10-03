'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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
  Flame,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { setIsUploadModalOpen } = useApp();

  const navItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      number: '01',
      color: '#635BFF',
      glowColor: 'rgba(99, 91, 255, 0.35)',
      badge: null
    },
    {
      label: 'Content Library',
      href: '/library',
      icon: Film,
      number: '02',
      color: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.35)',
      badge: null
    },
    {
      label: 'AI Studio',
      href: '/studio',
      icon: Sparkles,
      number: '03',
      color: '#EC4899',
      glowColor: 'rgba(236, 72, 153, 0.35)',
      badge: 'Core'
    },
    {
      label: 'Clips',
      href: '/clips',
      icon: Scissors,
      number: '04',
      color: '#06B6D4',
      glowColor: 'rgba(6, 182, 212, 0.35)',
      badge: 'AI Shorts'
    },
    {
      label: 'Content Calendar',
      href: '/calendar',
      icon: Calendar,
      number: '05',
      color: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.35)',
      badge: null
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      number: '06',
      color: '#8B5CF6',
      glowColor: 'rgba(139, 92, 246, 0.35)',
      badge: 'Live'
    },
  ];

  const bottomItems = [
    { label: 'Settings', href: '/settings', icon: Settings, color: '#68697A' },
  ];

  // Map active route to index for LineSidebar
  const currentNavIndex = navItems.findIndex(
    (item) => pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))
  );

  return (
    <aside
      className={`relative h-screen bg-white/95 backdrop-blur-xl border-r border-[rgba(20,20,40,0.08)] flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)] ${
        collapsed ? 'w-[76px]' : 'w-[272px]'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 px-5 border-b border-[rgba(20,20,40,0.06)] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden group">
            {/* Logo Mark: iridescent play button with glow */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#635BFF]/10 via-[#EC4899]/10 to-[#06B6D4]/10 flex items-center justify-center shrink-0 border border-white/60 shadow-xs">
              <Image
                src="/logo-icon.png"
                alt="CreatorAI"
                width={36}
                height={36}
                className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>

            {!collapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[16px] text-[#17172A] tracking-tight">CreatorAI</span>
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E] animate-pulse" />
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
            className={`w-full py-2.5 rounded-xl btn-primary-gradient flex items-center justify-center gap-2 text-xs font-semibold shadow-md hover:shadow-lg hover:brightness-105 transition-all ${
              collapsed ? 'px-0' : 'px-4'
            }`}
            title="Create Content Asset"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            {!collapsed && <span>+ Create Content</span>}
          </button>
        </div>

        {/* Navigation Rail */}
        <div className="px-3 py-1">
          {collapsed ? (
            /* Collapsed Icon Bar */
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center justify-center p-2.5 rounded-xl transition-all ${
                      isActive
                        ? 'shadow-xs border border-white'
                        : 'hover:bg-[#F7F8FC]'
                    }`}
                    style={{
                      background: isActive ? `linear-gradient(135deg, ${item.color}, #635BFF)` : undefined,
                      color: isActive ? '#FFFFFF' : item.color,
                      boxShadow: isActive ? `0 4px 14px ${item.glowColor}` : undefined
                    }}
                    title={item.label}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                  </Link>
                );
              })}
            </nav>
          ) : (
            /* Vibrant Color-Coded Icon Navigation */
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-white border border-[rgba(20,20,40,0.08)] shadow-[0_4px_16px_rgba(20,20,50,0.06)] text-[#17172A]'
                        : 'text-[#68697A] hover:text-[#17172A] hover:bg-white/80 hover:shadow-2xs'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebarActivePill"
                        className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full shadow-sm"
                        style={{
                          background: `linear-gradient(to bottom, ${item.color}, #635BFF)`,
                          boxShadow: `0 0 10px ${item.color}`
                        }}
                      />
                    )}

                    {/* Colorful Glowing Icon Badge */}
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105 shadow-2xs"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${item.color}, #635BFF)`
                          : `${item.color}18`,
                        color: isActive ? '#FFFFFF' : item.color,
                        boxShadow: isActive ? `0 2px 12px ${item.glowColor}` : 'none'
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Text & Index */}
                    <div className="flex-1 min-w-0 flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-colors shrink-0"
                          style={{
                            color: item.color,
                            backgroundColor: `${item.color}15`
                          }}
                        >
                          {item.number}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white shadow-xs shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${item.color}, #635BFF)`
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
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
