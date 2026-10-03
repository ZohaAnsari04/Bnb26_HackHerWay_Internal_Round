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
  size = 54,
  strokeWidth = 4.5,
  onClick,
  showLabel = true
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine accent color based on score tier
  const getColor = (s: number) => {
    if (s >= 90) return '#635BFF'; // Primary Royal Violet
    if (s >= 80) return '#8B5CF6'; // Purple
    if (s >= 70) return '#06B6D4'; // AI Cyan
    return '#F59E0B';              // Amber
  };

  const strokeColor = getColor(score);

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      title={onClick ? 'Click to see Opportunity Score breakdown' : undefined}
      className={`relative inline-flex items-center justify-center select-none ${
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
          stroke="rgba(20, 20, 40, 0.08)"
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
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
          <span className="font-bold text-[13px] text-[#17172A] tracking-tight group-hover:text-[#635BFF] transition-colors">
            {score}
          </span>
        </div>
      )}
    </div>
  );
}
