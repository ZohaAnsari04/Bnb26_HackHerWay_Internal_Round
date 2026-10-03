'use client';

import React from 'react';

// Static, deterministic bubbles that bob and float gently across the screen
const BOBBING_BUBBLES = [
  { id: 'bob-1', size: 95, top: '10%', left: '4%', tint: 'violet', duration: '9s', delay: '0s', wobble: '4s' },
  { id: 'bob-2', size: 55, top: '16%', left: '16%', tint: 'cyan', duration: '7s', delay: '-2s', wobble: '3.5s' },
  { id: 'bob-3', size: 120, top: '14%', right: '5%', tint: 'pink', duration: '11s', delay: '-4s', wobble: '5s' },
  { id: 'bob-4', size: 48, top: '28%', right: '14%', tint: 'default', duration: '6.5s', delay: '-1s', wobble: '3s' },
  { id: 'bob-5', size: 80, top: '42%', left: '3%', tint: 'cyan', duration: '8.5s', delay: '-3s', wobble: '4.2s' },
  { id: 'bob-6', size: 65, top: '56%', right: '6%', tint: 'violet', duration: '8s', delay: '-5s', wobble: '3.8s' },
  { id: 'bob-7', size: 110, top: '70%', left: '8%', tint: 'pink', duration: '10s', delay: '-2.5s', wobble: '4.8s' },
  { id: 'bob-8', size: 70, top: '78%', right: '12%', tint: 'cyan', duration: '9s', delay: '-6s', wobble: '4s' },
  { id: 'bob-9', size: 42, top: '86%', left: '22%', tint: 'default', duration: '6s', delay: '-1.5s', wobble: '3.2s' },
  { id: 'bob-10', size: 135, top: '48%', right: '3%', tint: 'pink', duration: '12s', delay: '-7s', wobble: '5.5s' },
  { id: 'bob-11', size: 50, top: '34%', left: '12%', tint: 'violet', duration: '7.5s', delay: '-3.5s', wobble: '3.6s' },
];

// Bubbles that rise smoothly from the bottom to beyond the top of the viewport
const RISING_BUBBLES = [
  { id: 'rise-1', size: 60, left: '10%', duration: 18, delay: -3, drift: 35, opacity: 0.85, tint: 'default' },
  { id: 'rise-2', size: 105, left: '25%', duration: 24, delay: -12, drift: -40, opacity: 0.8, tint: 'cyan' },
  { id: 'rise-3', size: 40, left: '35%', duration: 15, delay: -7, drift: 25, opacity: 0.9, tint: 'pink' },
  { id: 'rise-4', size: 85, left: '50%', duration: 21, delay: -15, drift: -30, opacity: 0.85, tint: 'violet' },
  { id: 'rise-5', size: 48, left: '68%', duration: 16, delay: -5, drift: 30, opacity: 0.9, tint: 'cyan' },
  { id: 'rise-6', size: 90, left: '82%', duration: 22, delay: -18, drift: -35, opacity: 0.8, tint: 'pink' },
  { id: 'rise-7', size: 36, left: '92%', duration: 14, delay: -9, drift: 20, opacity: 0.9, tint: 'default' },
];

export function FloatingBubbles() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-20"
      aria-hidden="true"
    >
      {/* 1. Stationary Bobbing Bubbles across the screen */}
      {BOBBING_BUBBLES.map((b) => {
        let tintClass = '';
        if (b.tint === 'violet') tintClass = 'bubble-tint-violet';
        else if (b.tint === 'cyan') tintClass = 'bubble-tint-cyan';
        else if (b.tint === 'pink') tintClass = 'bubble-tint-pink';

        const positionStyle: React.CSSProperties = {
          width: `${b.size}px`,
          height: `${b.size}px`,
          top: b.top,
          ...(b.left ? { left: b.left } : {}),
          ...(b.right ? { right: b.right } : {}),
          animation: `bubble-bob ${b.duration} ease-in-out infinite, bubble-wobble-1 ${b.wobble} ease-in-out infinite, bubble-shimmer 12s ease-in-out infinite`,
          animationDelay: `${b.delay}, 0s, 0s`,
        };

        return (
          <div
            key={b.id}
            className={`floating-glass-bubble ${tintClass}`}
            style={positionStyle}
          />
        );
      })}

      {/* 2. Rising Stream Bubbles ascending across the screen */}
      {RISING_BUBBLES.map((b) => {
        let tintClass = '';
        if (b.tint === 'violet') tintClass = 'bubble-tint-violet';
        else if (b.tint === 'cyan') tintClass = 'bubble-tint-cyan';
        else if (b.tint === 'pink') tintClass = 'bubble-tint-pink';

        const riseStyle: React.CSSProperties = {
          width: `${b.size}px`,
          height: `${b.size}px`,
          left: b.left,
          bottom: '-120px',
          animation: `bubble-rise ${b.duration}s linear infinite, bubble-wobble-1 4s ease-in-out infinite, bubble-shimmer 10s ease-in-out infinite`,
          animationDelay: `${b.delay}s, 0s, 0s`,
          // @ts-expect-error CSS custom properties
          '--bubble-drift': `${b.drift}px`,
          '--bubble-opacity': `${b.opacity}`,
        };

        return (
          <div
            key={b.id}
            className={`floating-glass-bubble ${tintClass}`}
            style={riseStyle}
          />
        );
      })}
    </div>
  );
}
