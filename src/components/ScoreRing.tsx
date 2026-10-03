'use client';

import React from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  onClick?: () => void;
  showLabel?: boolean;
}

export function ScoreRing({
  score,
  size = 48,
  strokeWidth = 3.5,
  onClick,
  showLabel = true
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const strokeColor = score >= 90 ? '#635BFF' : score >= 85 ? '#8B5CF6' : '#EC4899';

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      title={onClick ? 'Click to see Opportunity Score breakdown' : undefined}
      className={`relative inline-flex items-center justify-center select-none bg-white rounded-full shadow-[0_2px_8px_rgba(30,20,80,0.08)] ${
        onClick ? 'cursor-pointer hover:scale-105 transition-transform group' : ''
      }`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(99, 91, 255, 0.12)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-800 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
          <span className="font-bold text-[14px] text-[#17172A] tracking-tight group-hover:text-[#635BFF] transition-colors">
            {score}
          </span>
        </div>
      )}
    </div>
  );
}
