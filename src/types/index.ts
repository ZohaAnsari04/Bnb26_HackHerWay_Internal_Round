export type AssetType = 'video' | 'audio' | 'image' | 'script';

export type ContentStatus = 'idea' | 'draft' | 'analyzing' | 'editing' | 'ready' | 'scheduled' | 'published';

export type PlatformType = 'instagram' | 'youtube_shorts' | 'linkedin' | 'youtube' | 'tiktok' | 'x';

export type AspectRatio = '9:16' | '1:1' | '16:9' | '4:5';

export interface ScoreFactors {
  hookStrength: number;       // 0-100
  infoDensity: number;        // 0-100
  emotionalImpact: number;    // 0-100
  standaloneContext: number;  // 0-100
  topicRelevance: number;     // 0-100
}

export interface ContentOpportunity {
  id: string;
  projectId: string;
  title: string;
  hookText: string;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  startFormatted: string; // e.g. "00:14:23"
  endFormatted: string;   // e.g. "00:15:08"
  duration: number; // in seconds
  score: number; // 0-100 Opportunity Score
  factors: ScoreFactors;
  whyItWorks: string[];
  suggestedPlatforms: PlatformType[];
  isGenerated?: boolean;
}

export interface TranscriptWord {
  word: string;
  start: number;
  end: number;
}

export interface TranscriptSegment {
  id: string;
  start: number;
  end: number;
  startFormatted: string;
  endFormatted: string;
  speaker: string;
  text: string;
  words?: TranscriptWord[];
}

export interface CaptionStyle {
  id: 'minimal' | 'bold' | 'dynamic';
  fontFamily: string;
  fontSize: number;
  textColor: string;
  highlightColor: string;
  backgroundColor?: string;
  position: 'top' | 'middle' | 'bottom';
  animation: 'none' | 'bounce' | 'glow' | 'word-by-word';
}

export interface GeneratedClip {
  id: string;
  projectId: string;
  opportunityId?: string;
  title: string;
  hookText: string;
  duration: number; // seconds
  durationFormatted: string;
  aspectRatio: AspectRatio;
  platform: PlatformType;
  score: number;
  thumbnailUrl: string;
  videoUrl: string;
  status: 'rendering' | 'ready' | 'scheduled' | 'published';
  captionStyle: CaptionStyle;
  transcriptSegmentIds?: string[];
  createdAt: string;
}

export interface Asset {
  id: string;
  projectId?: string;
  name: string;
  type: AssetType;
  sizeBytes: number;
  durationSeconds?: number;
  durationFormatted?: string;
  thumbnailUrl?: string;
  fileUrl: string;
  status: 'uploading' | 'processing' | 'analyzed' | 'failed';
  topics: string[];
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  assetType: AssetType;
  duration: string;
  durationSeconds: number;
  thumbnailUrl: string;
  status: ContentStatus;
  opportunityPotential: number; // e.g. 84%
  topics: string[];
  tone: string;
  targetAudience: string;
  keyThemes: string[];
  transcriptionProgress?: number;
  analysisComplete: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  clipId?: string;
  title: string;
  platform: PlatformType;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:mm
  status: 'draft' | 'ready' | 'scheduled' | 'published';
  thumbnailUrl: string;
  captionExcerpt: string;
}

export interface PlatformCopy {
  platform: PlatformType;
  aspectRatio: AspectRatio;
  title: string;
  caption: string;
  description: string;
  hashtags: string[];
  callToAction: string;
}

export interface AnalyticsMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
}

export interface AIInsight {
  id: string;
  type: 'growth' | 'timing' | 'content' | 'hook';
  title: string;
  description: string;
  metricBadge: string;
  actionText?: string;
}
