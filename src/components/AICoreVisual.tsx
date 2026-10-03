'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AICoreVisualProps {
  size?: number;
  label?: string;
  sublabel?: string;
}

export function AICoreVisual({
  size = 280,
  label = 'CreatorAI Core',
  sublabel = 'Analyzing semantic rhythm & hooks'
}: AICoreVisualProps) {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 select-none">
      {/* Outer ambient glow wash */}
      <div
        className="absolute rounded-full pointer-events-none filter blur-2xl opacity-60"
        style={{
          width: size * 1.25,
          height: size * 1.25,
          background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.12) 40%, rgba(236,72,153,0.08) 70%, transparent 100%)'
        }}
      />

      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Outer orbital rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-[#8B5CF6]/25 pointer-events-none"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full border border-[#06B6D4]/20 pointer-events-none"
        />

        {/* Floating orbital nodes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-tr from-[#635BFF] to-[#06B6D4] shadow-[0_0_12px_rgba(99,91,255,0.6)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <div className="absolute bottom-4 right-8 w-3 h-3 rounded-full bg-gradient-to-tr from-[#EC4899] to-[#8B5CF6] shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
          <div className="absolute top-1/3 left-2 w-2.5 h-2.5 rounded-full bg-[#06B6D4] shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
        </motion.div>

        {/* Central glowing gradient orb */}
        <motion.div
          animate={{
            scale: [1, 1.07, 1],
            boxShadow: [
              '0 10px 40px rgba(99, 91, 255, 0.25)',
              '0 16px 50px rgba(236, 72, 153, 0.35)',
              '0 10px 40px rgba(99, 91, 255, 0.25)'
            ]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-36 h-36 rounded-full flex items-center justify-center z-10"
          style={{
            background: 'linear-gradient(135deg, #635BFF 0%, #8B5CF6 35%, #EC4899 75%, #06B6D4 100%)'
          }}
        >
          {/* Inner glass layer */}
          <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-inner">
            {/* Sparkle Neural Node icon */}
            <div className="relative flex items-center justify-center">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" className="text-white drop-shadow-md">
                <path
                  d="M12 2L13.8 8.2C14.1 9.3 14.7 9.9 15.8 10.2L22 12L15.8 13.8C14.7 14.1 14.1 14.7 13.8 15.8L12 22L10.2 15.8C9.9 14.7 9.3 14.1 8.2 13.8L2 12L8.2 10.2C9.3 9.9 9.9 9.3 10.2 8.2L12 2Z"
                  fill="currentColor"
                />
              </svg>
              {/* Micro pulse wave */}
              <div className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-40" />
            </div>
          </div>
        </motion.div>
      </div>

      {label && (
        <div className="mt-4 text-center">
          <p className="text-sm font-semibold text-[#17172A] tracking-tight">{label}</p>
          {sublabel && (
            <p className="text-xs text-[#68697A] mt-0.5">{sublabel}</p>
          )}
        </div>
      )}
    </div>
  );
}
