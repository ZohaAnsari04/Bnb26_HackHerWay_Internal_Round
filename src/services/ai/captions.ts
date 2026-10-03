import { CaptionStyle } from '@/types';

export const CAPTION_PRESETS: Record<string, CaptionStyle> = {
  minimal: {
    id: 'minimal',
    fontFamily: 'Inter',
    fontSize: 22,
    textColor: '#FFFFFF',
    highlightColor: '#06B6D4',
    position: 'bottom',
    animation: 'none'
  },
  bold: {
    id: 'bold',
    fontFamily: 'Geist',
    fontSize: 26,
    textColor: '#17172A',
    highlightColor: '#635BFF',
    backgroundColor: '#FFFFFF',
    position: 'middle',
    animation: 'bounce'
  },
  dynamic: {
    id: 'dynamic',
    fontFamily: 'Inter',
    fontSize: 26,
    textColor: '#FFFFFF',
    highlightColor: '#EC4899',
    position: 'middle',
    animation: 'word-by-word'
  }
};

export interface TimedCaptionLine {
  text: string;
  start: number;
  end: number;
  highlightWordIndex?: number;
}

export function formatSecondsToTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function parseSecondsFromFormatted(formatted: string): number {
  const parts = formatted.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}
