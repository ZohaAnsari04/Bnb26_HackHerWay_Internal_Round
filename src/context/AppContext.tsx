'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Project,
  Asset,
  ContentOpportunity,
  GeneratedClip,
  CalendarEvent,
  PlatformCopy
} from '@/types';
import {
  INITIAL_PROJECTS,
  INITIAL_ASSETS,
  INITIAL_OPPORTUNITIES,
  INITIAL_CLIPS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_PLATFORM_COPIES
} from '@/lib/mockData';
import { CAPTION_PRESETS } from '@/services/ai/captions';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  projects: Project[];
  activeProject: Project | null;
  setActiveProject: (project: Project) => void;
  createProject: (title: string, assetType: Project['assetType'], description?: string) => Project;

  assets: Asset[];
  addAsset: (asset: Omit<Asset, 'id' | 'createdAt'>) => Asset;

  opportunities: ContentOpportunity[];
  activeOpportunity: ContentOpportunity | null;
  setActiveOpportunity: (opp: ContentOpportunity | null) => void;

  clips: GeneratedClip[];
  activeClip: GeneratedClip | null;
  setActiveClip: (clip: GeneratedClip | null) => void;
  updateClip: (clipId: string, updates: Partial<GeneratedClip>) => void;
  addClip: (clip: GeneratedClip) => void;

  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateCalendarEvent: (id: string, updates: Partial<CalendarEvent>) => void;

  platformCopies: Record<string, PlatformCopy[]>;

  // Upload & AI Analysis Flow
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  isAnalyzing: boolean;
  analysisProgress: number;
  analysisStep: number;
  analysisCurrentText: string;
  startAnalysisFlow: (fileName: string, assetType: Project['assetType']) => Promise<void>;

  // Clip Generator Modal
  isClipModalOpen: boolean;
  clipModalOpportunity: ContentOpportunity | null;
  openClipModal: (opp: ContentOpportunity) => void;
  closeClipModal: () => void;
  isGeneratingClip: boolean;
  clipGenerationStep: number;
  generateClip: (opp: ContentOpportunity, options: { format: string; aspectRatio: any; captionStyle: string }) => Promise<GeneratedClip>;

  // Opportunity Score Breakdown Modal
  isScoreModalOpen: boolean;
  scoreModalOpportunity: ContentOpportunity | null;
  openScoreModal: (opp: ContentOpportunity) => void;
  closeScoreModal: () => void;

  // Schedule Modal
  isScheduleModalOpen: boolean;
  scheduleModalClip: GeneratedClip | null;
  openScheduleModal: (clip?: GeneratedClip | null) => void;
  closeScheduleModal: () => void;

  // Command Palette
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  // Demo Mode
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Persistence states
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeProject, setActiveProjectState] = useState<Project | null>(INITIAL_PROJECTS[0]);
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [opportunities, setOpportunities] = useState<ContentOpportunity[]>(INITIAL_OPPORTUNITIES);
  const [activeOpportunity, setActiveOpportunity] = useState<ContentOpportunity | null>(INITIAL_OPPORTUNITIES[0]);
  const [clips, setClips] = useState<GeneratedClip[]>(INITIAL_CLIPS);
  const [activeClip, setActiveClip] = useState<GeneratedClip | null>(INITIAL_CLIPS[0]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);
  const [platformCopies, setPlatformCopies] = useState<Record<string, PlatformCopy[]>>(INITIAL_PLATFORM_COPIES);

  // Modals & Flows
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisCurrentText, setAnalysisCurrentText] = useState('Initializing acoustic speech model...');

  const [isClipModalOpen, setIsClipModalOpen] = useState(false);
  const [clipModalOpportunity, setClipModalOpportunity] = useState<ContentOpportunity | null>(null);
  const [isGeneratingClip, setIsGeneratingClip] = useState(false);
  const [clipGenerationStep, setClipGenerationStep] = useState(1);

  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [scoreModalOpportunity, setScoreModalOpportunity] = useState<ContentOpportunity | null>(null);

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleModalClip, setScheduleModalClip] = useState<GeneratedClip | null>(null);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load from Backend API on mount (with localStorage fallback)
  useEffect(() => {
    // 1. Fetch from SQLite API
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.projects?.length > 0) {
          setProjects(data.projects);
          setActiveProjectState(data.projects[0]);
        }
      })
      .catch(() => {});

    fetch('/api/clips')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.clips?.length > 0) {
          setClips(data.clips);
          setActiveClip(data.clips[0]);
        }
      })
      .catch(() => {});

    fetch('/api/calendar')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.events?.length > 0) {
          setCalendarEvents(data.events);
        }
      })
      .catch(() => {});

    // 2. Load from localStorage cache
    try {
      const savedProjects = localStorage.getItem('creatorai_projects');
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        if (parsed.length > 0) {
          setProjects(parsed);
          setActiveProjectState(parsed[0]);
        }
      }
      const savedClips = localStorage.getItem('creatorai_clips');
      if (savedClips) setClips(JSON.parse(savedClips));

      const savedCalendar = localStorage.getItem('creatorai_calendar');
      if (savedCalendar) setCalendarEvents(JSON.parse(savedCalendar));
    } catch {
      // Ignore local storage error
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('creatorai_projects', JSON.stringify(projects));
      localStorage.setItem('creatorai_clips', JSON.stringify(clips));
      localStorage.setItem('creatorai_calendar', JSON.stringify(calendarEvents));
    } catch {
      // Ignore
    }
  }, [projects, clips, calendarEvents]);

  // Command K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setActiveProject = (p: Project) => {
    setActiveProjectState(p);
  };

  const createProject = (title: string, assetType: Project['assetType'], description?: string): Project => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title,
      description: description || 'New creator asset project created with CreatorAI.',
      assetType,
      duration: '08:30',
      durationSeconds: 510,
      thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      status: 'analyzing',
      opportunityPotential: 88,
      topics: ['AI', 'Content Strategy', 'Automation'],
      tone: 'Inspiring & Practical',
      targetAudience: 'Modern Creators',
      keyThemes: ['Productivity', 'Syndication'],
      analysisComplete: false,
      updatedAt: 'Just now',
      createdAt: new Date().toISOString()
    };

    // Update client UI immediately
    setProjects((prev) => [newProj, ...prev]);
    setActiveProjectState(newProj);
    showToast(`Project "${title}" created successfully`);

    // Persist to SQLite Backend
    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        assetType,
      }),
    }).catch((err) => console.warn('Backend sync error:', err));

    return newProj;
  };

  const addAsset = (assetData: Omit<Asset, 'id' | 'createdAt'>): Asset => {
    const newAsset: Asset = {
      ...assetData,
      id: `asset-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setAssets((prev) => [newAsset, ...prev]);
    return newAsset;
  };

  const updateClip = (clipId: string, updates: Partial<GeneratedClip>) => {
    setClips((prev) =>
      prev.map((c) => (c.id === clipId ? { ...c, ...updates } : c))
    );
    if (activeClip && activeClip.id === clipId) {
      setActiveClip((prev) => (prev ? { ...prev, ...updates } : null));
    }
    showToast('Clip updated successfully');
  };

  const addClip = (newClip: GeneratedClip) => {
    setClips((prev) => [newClip, ...prev]);
  };

  const addCalendarEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `cal-${Date.now()}`
    };
    setCalendarEvents((prev) => [...prev, newEvent]);
    showToast(`Scheduled for ${newEvent.scheduledDate} at ${newEvent.scheduledTime}`);

    // Persist to SQLite Backend
    fetch('/api/calendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newEvent.title,
        platform: newEvent.platform,
        scheduledTime: newEvent.scheduledDate,
        copyText: newEvent.copyText,
        hashtags: newEvent.hashtags,
        clipId: newEvent.clipId,
      }),
    }).catch((err) => console.warn('Calendar sync error:', err));
  };

  const updateCalendarEvent = (id: string, updates: Partial<CalendarEvent>) => {
    setCalendarEvents((prev) =>
      prev.map((evt) => (evt.id === id ? { ...evt, ...updates } : evt))
    );
    showToast('Calendar entry updated');
  };

  const startAnalysisFlow = async (fileName: string, assetType: Project['assetType']) => {
    setIsUploadModalOpen(false);
    setIsAnalyzing(true);
    setAnalysisProgress(10);
    setAnalysisStep(1);
    setAnalysisCurrentText('Audio extracted & speech transcription in progress...');

    await new Promise((r) => setTimeout(r, 900));
    setAnalysisProgress(30);
    setAnalysisStep(2);
    setAnalysisCurrentText('Transcribing phonemes with Whisper large-v3...');

    await new Promise((r) => setTimeout(r, 1100));
    setAnalysisProgress(55);
    setAnalysisStep(3);
    setAnalysisCurrentText('Detecting thematic clusters and topics...');

    await new Promise((r) => setTimeout(r, 1200));
    setAnalysisProgress(78);
    setAnalysisStep(4);
    setAnalysisCurrentText('Finding high-potential moments & calculating Opportunity Scores...');

    await new Promise((r) => setTimeout(r, 1000));
    setAnalysisProgress(92);
    setAnalysisStep(5);
    setAnalysisCurrentText('Generating viral hooks & platform captions...');

    await new Promise((r) => setTimeout(r, 800));
    setAnalysisProgress(100);
    setAnalysisStep(6);
    setAnalysisCurrentText('Analysis complete! Preparing AI Content Studio...');

    await new Promise((r) => setTimeout(r, 600));

    // Register project & asset
    const newProject = createProject(
      fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
      assetType,
      'Automatically analyzed with Whisper and CreatorAI content intelligence.'
    );

    newProject.analysisComplete = true;
    newProject.status = 'ready';
    setProjects((prev) =>
      prev.map((p) => (p.id === newProject.id ? { ...p, analysisComplete: true, status: 'ready' } : p))
    );
    setActiveProjectState(newProject);

    setIsAnalyzing(false);
    showToast('AI analysis complete! 3 high-potential moments identified.');
  };

  const openClipModal = (opp: ContentOpportunity) => {
    setClipModalOpportunity(opp);
    setIsClipModalOpen(true);
  };

  const closeClipModal = () => {
    setIsClipModalOpen(false);
    setClipModalOpportunity(null);
  };

  const generateClip = async (
    opp: ContentOpportunity,
    options: { format: string; aspectRatio: any; captionStyle: string }
  ): Promise<GeneratedClip> => {
    setIsGeneratingClip(true);
    setClipGenerationStep(1); // Selecting footage

    await new Promise((r) => setTimeout(r, 600));
    setClipGenerationStep(2); // Cropping subject

    await new Promise((r) => setTimeout(r, 700));
    setClipGenerationStep(3); // Generating captions

    await new Promise((r) => setTimeout(r, 800));
    setClipGenerationStep(4); // Applying hook

    await new Promise((r) => setTimeout(r, 700));
    setClipGenerationStep(5); // Rendering

    await new Promise((r) => setTimeout(r, 800));

    const selectedCaptionStyle =
      CAPTION_PRESETS[options.captionStyle] || CAPTION_PRESETS.dynamic;

    const newClip: GeneratedClip = {
      id: `clip-${Date.now()}`,
      projectId: activeProject?.id || 'proj-1',
      opportunityId: opp.id,
      title: opp.title,
      hookText: opp.hookText,
      duration: opp.duration,
      durationFormatted: `00:${opp.duration.toString().padStart(2, '0')}`,
      aspectRatio: options.aspectRatio || '9:16',
      platform: (options.format.toLowerCase().includes('instagram')
        ? 'instagram'
        : options.format.toLowerCase().includes('youtube')
        ? 'youtube_shorts'
        : 'linkedin') as any,
      score: opp.score,
      thumbnailUrl:
        activeProject?.thumbnailUrl ||
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      status: 'ready',
      captionStyle: selectedCaptionStyle,
      createdAt: new Date().toISOString()
    };

    setClips((prev) => [newClip, ...prev]);
    setActiveClip(newClip);
    setIsGeneratingClip(false);

    // Persist to SQLite Backend
    fetch('/api/clips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId: newClip.projectId,
        opportunityId: newClip.opportunityId,
        title: newClip.title,
        hookText: newClip.hookText,
        duration: newClip.duration,
        durationFormatted: newClip.durationFormatted,
        aspectRatio: newClip.aspectRatio,
        platform: newClip.platform,
        score: newClip.score,
        thumbnailUrl: newClip.thumbnailUrl,
        videoUrl: newClip.videoUrl,
        captionStyle: newClip.captionStyle,
      }),
    }).catch((err) => console.warn('Clip sync error:', err));

    // mark opportunity as generated
    setOpportunities((prev) =>
      prev.map((o) => (o.id === opp.id ? { ...o, isGenerated: true } : o))
    );

    showToast('✓ Clip generated successfully!');
    return newClip;
  };

  const openScoreModal = (opp: ContentOpportunity) => {
    setScoreModalOpportunity(opp);
    setIsScoreModalOpen(true);
  };

  const closeScoreModal = () => {
    setIsScoreModalOpen(false);
    setScoreModalOpportunity(null);
  };

  const openScheduleModal = (clip?: GeneratedClip | null) => {
    setScheduleModalClip(clip || activeClip || clips[0]);
    setIsScheduleModalOpen(true);
  };

  const closeScheduleModal = () => {
    setIsScheduleModalOpen(false);
    setScheduleModalClip(null);
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        activeProject,
        setActiveProject,
        createProject,
        assets,
        addAsset,
        opportunities,
        activeOpportunity,
        setActiveOpportunity,
        clips,
        activeClip,
        setActiveClip,
        updateClip,
        addClip,
        calendarEvents,
        addCalendarEvent,
        updateCalendarEvent,
        platformCopies,
        isUploadModalOpen,
        setIsUploadModalOpen,
        isAnalyzing,
        analysisProgress,
        analysisStep,
        analysisCurrentText,
        startAnalysisFlow,
        isClipModalOpen,
        clipModalOpportunity,
        openClipModal,
        closeClipModal,
        isGeneratingClip,
        clipGenerationStep,
        generateClip,
        isScoreModalOpen,
        scoreModalOpportunity,
        openScoreModal,
        closeScoreModal,
        isScheduleModalOpen,
        scheduleModalClip,
        openScheduleModal,
        closeScheduleModal,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isDemoMode,
        setIsDemoMode,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
