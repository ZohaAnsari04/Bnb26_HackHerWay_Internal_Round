'use client';

import React from 'react';

export function ColorfulBackgroundGlow() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* 1. Hero Aurora - Top Center Electric Violet, Hot Pink & Cyan */}
      <div
        className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[850px] sm:w-[1100px] h-[600px] rounded-full animate-glow-pulse"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 30%, rgba(99, 91, 255, 0.32) 0%, rgba(236, 72, 153, 0.25) 45%, rgba(6, 182, 212, 0.18) 75%, transparent 100%)',
          filter: 'blur(85px)',
        }}
      />

      {/* 2. Top-Left Radiant Electric Indigo Orb */}
      <div
        className="absolute -top-28 -left-20 w-[550px] h-[550px] rounded-full animate-glow-drift-1"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.32) 0%, rgba(99, 91, 255, 0.2) 45%, transparent 70%)',
          filter: 'blur(85px)',
        }}
      />

      {/* 3. Top-Right Glowing Fuchsia/Magenta Orb */}
      <div
        className="absolute -top-20 -right-24 w-[580px] h-[580px] rounded-full animate-glow-drift-2"
        style={{
          background:
            'radial-gradient(circle, rgba(236, 72, 153, 0.28) 0%, rgba(244, 63, 94, 0.18) 50%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* 4. Mid-Page Left Cyber Cyan Flare */}
      <div
        className="absolute top-[36%] -left-32 w-[520px] h-[520px] rounded-full animate-glow-drift-2"
        style={{
          background:
            'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(99, 91, 255, 0.16) 50%, transparent 70%)',
          filter: 'blur(95px)',
        }}
      />

      {/* 5. Mid-Page Right Warm Purple & Rose Bloom */}
      <div
        className="absolute top-[52%] -right-28 w-[560px] h-[560px] rounded-full animate-glow-drift-1"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* 6. Lower Page / Bottom CTA Aurora Splash */}
      <div
        className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[950px] h-[480px] rounded-full animate-glow-pulse"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.24) 0%, rgba(99, 91, 255, 0.24) 45%, rgba(6, 182, 212, 0.14) 75%, transparent 100%)',
          filter: 'blur(95px)',
        }}
      />
    </div>
  );
}
