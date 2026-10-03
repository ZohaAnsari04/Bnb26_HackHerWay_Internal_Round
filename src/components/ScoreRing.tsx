'use client';

import React, { useEffect, useState } from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  onClick?: () => void;
  showLabel?: boolean;
}

export function ScoreRing({
  score,
  size = 54,
  strokeWidth = 4.5,
  onClick,
  showLabel = true
}: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const gradId = React.useId().replace(/:/g, '');

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 80);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      title={onClick ? 'Click to view Opportunity Score diagnostic' : undefined}
      className={`relative inline-flex items-center justify-center select-none ${
        onClick ? 'cursor-pointer hover:scale-105 transition-transform group' : ''
      }`}
      style={{ width: size, height: size }}
    >
      {/* Subtle Ambient Halo Glow */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-25 pointer-events-none group-hover:opacity-45 transition-opacity"
        style={{
          background: 'radial-gradient(circle, #635BFF 0%, #EC4899 70%, transparent 100%)'
        }}
      />

      <svg width={size} height={size} className="transform -rotate-90 relative z-10 overflow-visible">
        <defs>
          <linearGradient id={`grad-${gradId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#635BFF" />
            <stop offset="60%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(20, 20, 50, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress arc with gradient */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#grad-${gradId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            filter: 'drop-shadow(0 0 3px rgba(99, 91, 255, 0.35))',
            transition: 'stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </svg>

      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center leading-none z-20">
          <span className="font-bold text-[13px] text-[#17172A] tracking-tight group-hover:text-[#635BFF] transition-colors">
            {score}
          </span>
          {size >= 52 && (
            <span className="text-[7.5px] font-bold uppercase tracking-wider text-[#9496A8] mt-0.5">
              OPP
            </span>
          )}
        </div>
      )}
    </div>
  );
}
