'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Sparkles,
  Command,
  ChevronRight,
  ShieldCheck,
  Check,
  CheckCheck,
  Trash2,
  ExternalLink,
  Film,
  Zap,
  Calendar as CalendarIcon,
  X
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  type: 'clip' | 'score' | 'schedule' | 'publish';
  link?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Clip generated: "AI Autocomplete Mistake"',
    desc: 'Ready for preview, caption refinement, and cross-platform scheduling.',
    time: '12 mins ago',
    read: false,
    type: 'clip',
    link: '/clips'
  },
  {
    id: 'notif-2',
    title: 'High Opportunity Score detected',
    desc: 'New moment from keynote scored 94/100 viral potential with strong hook density.',
    time: '45 mins ago',
    read: false,
    type: 'score',
    link: '/studio'
  },
  {
    id: 'notif-3',
    title: 'Post Scheduled on Instagram Reels',
    desc: '"The AI Autocomplete Mistake" queued for today @ 18:30 EST prime resonance window.',
    time: '2 hours ago',
    read: false,
    type: 'schedule',
    link: '/calendar'
  },
  {
    id: 'notif-4',
    title: 'YouTube Shorts Sync Complete',
    desc: 'Channel telemetry updated. 428.5K views (+24.8% velocity) synchronized.',
    time: 'Yesterday',
    read: true,
    type: 'publish',
    link: '/analytics'
  }
];

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsCommandPaletteOpen, isDemoMode, setIsDemoMode, showToast } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const notifRef = useRef<HTMLDivElement>(null);

  // Load notifications from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('creatorai_notifications');
      if (saved) {
        setNotifications(JSON.parse(saved));
      }
    } catch {
      // fallback to initial
    }
  }, []);

  // Save to localStorage whenever notifications change
  const saveNotifications = (items: NotificationItem[]) => {
    setNotifications(items);
    try {
      localStorage.setItem('creatorai_notifications', JSON.stringify(items));
    } catch {}
  };

  // Close notifications popover on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
    showToast('All notifications marked as read', 'success');
  };

  const handleMarkSingleRead = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    saveNotifications(updated);
  };

  const handleClearAll = () => {
    saveNotifications([]);
    showToast('All notifications cleared', 'info');
  };

  const handleNotificationClick = (item: NotificationItem) => {
    handleMarkSingleRead(item.id);
    if (item.link) {
      setShowNotifications(false);
      router.push(item.link);
    }
  };

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
    <header className="h-16 px-6 bg-white/90 backdrop-blur-md border-b border-[rgba(20,20,40,0.06)] flex items-center justify-between sticky top-0 z-30">
      {/* Left: Breadcrumbs / Title */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-medium text-[#68697A]">CreatorAI</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#9496A8]" />
        <span className="font-bold text-[#17172A] text-sm">{title}</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Search / Command palette trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[rgba(20,20,40,0.08)] bg-[#F7F8FC] hover:bg-[#F0F1F6] text-xs text-[#68697A] hover:text-[#17172A] transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search anything...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-white rounded border border-[rgba(20,20,40,0.08)] shadow-2xs font-mono">
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
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
            isDemoMode
              ? 'bg-[#635BFF]/10 text-[#635BFF] border border-[#635BFF]/20 shadow-2xs'
              : 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 shadow-2xs'
          }`}
          title="Toggle between Live API and Seeded Demo mode"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="hidden md:inline font-semibold">{isDemoMode ? 'Demo Mode' : 'Live API'}</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`w-8 h-8 rounded-xl border transition-all flex items-center justify-center relative cursor-pointer ${
              showNotifications
                ? 'bg-[#17172A] text-white border-[#17172A]'
                : 'border-[rgba(20,20,40,0.08)] text-[#68697A] hover:text-[#17172A] hover:bg-[#F7F8FC]'
            }`}
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#EC4899] text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2.5 w-84 sm:w-96 bg-white rounded-2xl shadow-[0_20px_50px_rgba(20,20,50,0.18)] border border-[rgba(20,20,40,0.08)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Notifications Header */}
              <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-white via-white to-[#F7F8FC] border-b border-[rgba(20,20,40,0.06)]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#17172A] tracking-tight">Notifications</span>
                  {unreadCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-[#EC4899]/15 text-[#EC4899] text-[10px] font-extrabold font-mono">
                      {unreadCount} unread
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-bold">
                      All caught up
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[11px] text-[#635BFF] hover:text-[#4F46E5] font-bold flex items-center gap-1 transition-colors cursor-pointer hover:underline"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark all read</span>
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-[#9496A8] hover:text-[#EF4444] transition-colors p-1 rounded-md hover:bg-red-50 cursor-pointer"
                      title="Clear all notifications"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-[380px] overflow-y-auto divide-y divide-[rgba(20,20,40,0.04)]">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#9496A8] space-y-1">
                    <CheckCheck className="w-8 h-8 text-[#10B981] mx-auto mb-2 opacity-80" />
                    <p className="font-bold text-[#17172A]">No notifications</p>
                    <p className="text-[11px]">You're all caught up with your content pipeline.</p>
                  </div>
                ) : (
                  notifications.map((item) => {
                    const iconMap = {
                      clip: <Film className="w-3.5 h-3.5 text-[#EC4899]" />,
                      score: <Zap className="w-3.5 h-3.5 text-[#635BFF]" />,
                      schedule: <CalendarIcon className="w-3.5 h-3.5 text-[#10B981]" />,
                      publish: <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />,
                    };

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleNotificationClick(item)}
                        className={`p-3.5 transition-all cursor-pointer flex items-start gap-3 group relative ${
                          item.read
                            ? 'bg-white hover:bg-[#FAFAF7]'
                            : 'bg-gradient-to-r from-[#F4F3FF]/70 via-white to-white hover:from-[#F4F3FF]'
                        }`}
                      >
                        {/* Type Icon */}
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                            item.read
                              ? 'bg-[#F7F8FC] border-[rgba(20,20,40,0.06)]'
                              : 'bg-white border-[#635BFF]/30 shadow-2xs'
                          }`}
                        >
                          {iconMap[item.type]}
                        </div>

                        {/* Text and Time */}
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center gap-1.5">
                            <h4
                              className={`text-xs leading-snug line-clamp-1 ${
                                item.read ? 'font-semibold text-[#17172A]' : 'font-extrabold text-[#17172A]'
                              }`}
                            >
                              {item.title}
                            </h4>
                            {!item.read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-[#68697A] mt-0.5 line-clamp-2 leading-relaxed">
                            {item.desc}
                          </p>
                          <span className="text-[10px] text-[#9496A8] mt-1.5 block font-mono">
                            {item.time}
                          </span>
                        </div>

                        {/* Individual Mark as Read Checkmark Button */}
                        {!item.read && (
                          <button
                            onClick={(e) => handleMarkSingleRead(item.id, e)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg text-[#68697A] hover:text-[#10B981] hover:bg-emerald-50 cursor-pointer absolute right-3 top-3.5"
                            title="Mark as read"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Popover Footer */}
              {notifications.length > 0 && (
                <div className="p-2.5 bg-[#FAFAF7] border-t border-[rgba(20,20,40,0.06)] text-center">
                  <span className="text-[10px] text-[#9496A8]">
                    Click any notification to navigate directly to its workspace
                  </span>
                </div>
              )}
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
