'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Calendar as CalendarIcon, Clock, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlatformType } from '@/types';

export function ScheduleModal() {
  const { isScheduleModalOpen, scheduleModalClip, closeScheduleModal, addCalendarEvent } = useApp();

  const [date, setDate] = useState('2026-04-02');
  const [time, setTime] = useState('18:30');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [caption, setCaption] = useState(
    scheduleModalClip ? `You're probably using AI wrong 👀\n\nHere's what most developers miss... #AI #Tech` : ''
  );

  if (!isScheduleModalOpen) return null;

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCalendarEvent({
      clipId: scheduleModalClip?.id,
      title: scheduleModalClip?.title || 'Scheduled Clip Post',
      platform,
      scheduledDate: date,
      scheduledTime: time,
      status: 'scheduled',
      thumbnailUrl: scheduleModalClip?.thumbnailUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      captionExcerpt: caption.slice(0, 80) + '...'
    });
    closeScheduleModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeScheduleModal}
          className="fixed inset-0 bg-[#17172A]/30 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_25px_70px_rgba(20,20,50,0.22)] border border-[rgba(20,20,40,0.08)] overflow-hidden z-10"
        >
          {/* Top gradient edge */}
          <div className="card-top-edge" />

          <div className="px-6 py-5 border-b border-[rgba(20,20,40,0.06)] flex items-center justify-between bg-gradient-to-r from-[#FAFAF7] to-white">
            <div className="flex items-center gap-3">
              <div className="icon-box-purple">
                <CalendarIcon className="w-5 h-5 text-[#635BFF]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#17172A]">Schedule Publication</h3>
                <p className="text-xs text-[#68697A]">Queue to your cross-platform content calendar</p>
              </div>
            </div>
            <button
              onClick={closeScheduleModal}
              className="p-1.5 rounded-xl text-[#68697A] hover:text-[#17172A] hover:bg-black/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleScheduleSubmit} className="p-6 space-y-4">
            {scheduleModalClip && (
              <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[rgba(20,20,40,0.06)] flex items-center gap-3">
                <img
                  src={scheduleModalClip.thumbnailUrl}
                  alt={scheduleModalClip.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#17172A] truncate">
                    {scheduleModalClip.title}
                  </p>
                  <p className="text-[11px] text-[#68697A]">
                    {scheduleModalClip.durationFormatted} • {scheduleModalClip.aspectRatio}
                  </p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#17172A] mb-1.5">
                Target Platform
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'instagram', label: 'Instagram' },
                  { id: 'youtube_shorts', label: 'Shorts' },
                  { id: 'linkedin', label: 'LinkedIn' },
                  { id: 'x', label: 'X / Twitter' }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id as PlatformType)}
                    className={`px-3 py-2 text-xs rounded-xl border font-medium transition-all ${
                      platform === p.id
                        ? 'border-[#635BFF] bg-[#635BFF]/5 text-[#635BFF]'
                        : 'border-[rgba(20,20,40,0.1)] hover:bg-[#FAFAF7] text-[#17172A]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#17172A] mb-1.5 flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#68697A]" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[rgba(20,20,40,0.12)] bg-white text-[#17172A] focus:outline-none focus:border-[#635BFF]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17172A] mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#68697A]" />
                  <span>Time (Optimal: 6:00 PM)</span>
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[rgba(20,20,40,0.12)] bg-white text-[#17172A] focus:outline-none focus:border-[#635BFF]"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#17172A]">
                  Post Caption & Hashtags
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setCaption(
                      `You're probably using AI wrong 👀\n\nHere's what most developers miss about autonomous workflows...\n\n#AI #Engineering #DeveloperTips`
                    )
                  }
                  className="text-[11px] text-[#635BFF] flex items-center gap-1 font-medium"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Auto-fill AI Copy</span>
                </button>
              </div>
              <textarea
                rows={4}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write caption or use AI generated copy..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-[rgba(20,20,40,0.12)] bg-white text-[#17172A] focus:outline-none focus:border-[#635BFF]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={closeScheduleModal}
                className="px-4 py-2 text-xs font-medium text-[#68697A] hover:text-[#17172A] hover:bg-black/5 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold btn-primary-gradient flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm Schedule</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
