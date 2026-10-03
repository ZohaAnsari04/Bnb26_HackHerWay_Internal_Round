import { 
  Project, 
  Asset, 
  ContentOpportunity, 
  GeneratedClip, 
  TranscriptSegment, 
  CalendarEvent, 
  PlatformCopy,
  AnalyticsMetric,
  AIInsight
} from '@/types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'AI & The Future of Work',
    description: 'Executive keynote breakdown exploring agentic workflows, autonomous tooling, and how modern engineering teams 10x velocity.',
    assetType: 'video',
    duration: '14:14',
    durationSeconds: 854,
    thumbnailUrl: '/thumbnails/keynote.jpg',
    status: 'ready',
    opportunityPotential: 96,
    topics: ['Artificial Intelligence', 'Software Engineering', 'AI Agents', 'Productivity', 'Future of Work'],
    tone: 'Educational & Authoritative',
    targetAudience: 'Software Developers & Technical Founders',
    keyThemes: ['AI Operating Systems', 'Developer Productivity', 'Autonomous Agents', 'Software Architecture'],
    analysisComplete: true,
    updatedAt: 'Just now',
    createdAt: '2026-03-28T10:00:00Z',
  },
  {
    id: 'proj-2',
    title: 'Podcast Episode 12: Scaling Creator Teams',
    description: 'Deep dive conversation on building high-output media production pipelines using automated micro-content workflows.',
    assetType: 'video',
    duration: '42:18',
    durationSeconds: 2538,
    thumbnailUrl: '/thumbnails/podcast.jpg',
    status: 'editing',
    opportunityPotential: 88,
    topics: ['Creator Economy', 'Podcasting', 'Workflow Automation', 'Audience Growth'],
    tone: 'Conversational & Tactical',
    targetAudience: 'Independent Creators & Production Studios',
    keyThemes: ['Media Operations', 'Workflow Scale', 'Syndication'],
    analysisComplete: true,
    updatedAt: '3 hours ago',
    createdAt: '2026-03-27T14:30:00Z',
  },
  {
    id: 'proj-3',
    title: 'Product Launch: Next-Gen Devtools',
    description: 'Founder keynote introducing real-time developer productivity metrics, deterministic AI agent loops, and context-aware tooling.',
    assetType: 'video',
    duration: '08:12',
    durationSeconds: 492,
    thumbnailUrl: '/thumbnails/coding.jpg',
    status: 'scheduled',
    opportunityPotential: 94,
    topics: ['DevTools', 'SaaS', 'Engineering Metrics'],
    tone: 'Inspirational',
    targetAudience: 'Engineering Leaders',
    keyThemes: ['Developer Velocity', 'Context Switching'],
    analysisComplete: true,
    updatedAt: 'Yesterday',
    createdAt: '2026-03-25T09:15:00Z',
  }
];

export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'asset-1',
    projectId: 'proj-1',
    name: 'AI_Future_of_Work.mp4',
    type: 'video',
    sizeBytes: 384500000,
    durationSeconds: 642,
    durationFormatted: '10:42',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    fileUrl: '/videos/sample-keynote.mp4',
    status: 'analyzed',
    topics: ['AI', 'Engineering', 'Agents'],
    createdAt: '2026-03-28T09:40:00Z',
  },
  {
    id: 'asset-2',
    projectId: 'proj-2',
    name: 'Podcast_Episode_12.mp4',
    type: 'video',
    sizeBytes: 1240000000,
    durationSeconds: 2538,
    durationFormatted: '42:18',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    fileUrl: '',
    status: 'analyzed',
    topics: ['Podcast', 'Creator Economy', 'Production'],
    createdAt: '2026-03-27T14:15:00Z',
  },
  {
    id: 'asset-3',
    name: 'Studio_Voiceover_Broll.wav',
    type: 'audio',
    sizeBytes: 42000000,
    durationSeconds: 240,
    durationFormatted: '04:00',
    fileUrl: '',
    status: 'analyzed',
    topics: ['Voiceover', 'Sound Design'],
    createdAt: '2026-03-26T11:20:00Z',
  },
  {
    id: 'asset-4',
    name: 'Q2_Content_Script_Final.pdf',
    type: 'script',
    sizeBytes: 850000,
    fileUrl: '',
    status: 'analyzed',
    topics: ['Script', 'Hooks', 'Roadmap'],
    createdAt: '2026-03-25T16:00:00Z',
  }
];

export const INITIAL_TRANSCRIPT: TranscriptSegment[] = [
  {
    id: 't-1',
    start: 0,
    end: 22,
    startFormatted: '00:00',
    endFormatted: '00:22',
    speaker: 'Speaker 1',
    text: "Welcome everyone. Today we are unpacking something fundamental about how software engineering teams are evolving in 2026. The conventional wisdom around code completion is missing the real transformation.",
    words: [
      { word: "Welcome", start: 0.1, end: 0.6 },
      { word: "everyone.", start: 0.7, end: 1.2 },
      { word: "Today", start: 1.5, end: 1.8 },
      { word: "we", start: 1.9, end: 2.1 },
      { word: "are", start: 2.2, end: 2.3 },
      { word: "unpacking", start: 2.4, end: 2.9 },
      { word: "something", start: 3.0, end: 3.4 },
      { word: "fundamental", start: 3.5, end: 4.1 },
      { word: "about", start: 4.2, end: 4.5 },
      { word: "how", start: 4.6, end: 4.8 },
      { word: "teams", start: 4.9, end: 5.3 },
      { word: "evolve.", start: 5.4, end: 6.0 }
    ]
  },
  {
    id: 't-2',
    start: 23,
    end: 68,
    startFormatted: '00:23',
    endFormatted: '01:08',
    speaker: 'Speaker 1',
    text: "The biggest mistake developers make with AI is treating it as an autocomplete rather than an autonomous collaborator. When you ask AI to write one line, you're 10% faster. When you give it clear architecture constraints and let it own the verification loop, you multiply leverage tenfold.",
    words: [
      { word: "The", start: 23.0, end: 23.2 },
      { word: "biggest", start: 23.3, end: 23.7 },
      { word: "mistake", start: 23.8, end: 24.3 },
      { word: "developers", start: 24.4, end: 25.0 },
      { word: "make", start: 25.1, end: 25.4 },
      { word: "with", start: 25.5, end: 25.7 },
      { word: "AI", start: 25.8, end: 26.3 },
      { word: "is", start: 26.4, end: 26.6 },
      { word: "treating", start: 26.7, end: 27.2 },
      { word: "it", start: 27.3, end: 27.5 },
      { word: "as", start: 27.6, end: 27.8 },
      { word: "an", start: 27.9, end: 28.1 },
      { word: "autocomplete", start: 28.2, end: 29.1 }
    ]
  },
  {
    id: 't-3',
    start: 69,
    end: 114,
    startFormatted: '01:09',
    endFormatted: '01:54',
    speaker: 'Speaker 1',
    text: "AI isn't replacing developers. It's replacing developers who refuse to evolve their operating loop. If your primary skill is typing syntax, you're vulnerable. If your skill is problem decomposition, systems design, and verification, you've never had more superpowers.",
    words: [
      { word: "AI", start: 69.0, end: 69.4 },
      { word: "isn't", start: 69.5, end: 69.8 },
      { word: "replacing", start: 69.9, end: 70.5 },
      { word: "developers.", start: 70.6, end: 71.3 },
      { word: "It's", start: 71.8, end: 72.1 },
      { word: "replacing", start: 72.2, end: 72.8 },
      { word: "developers", start: 72.9, end: 73.5 },
      { word: "who", start: 73.6, end: 73.8 },
      { word: "refuse", start: 73.9, end: 74.4 },
      { word: "to", start: 74.5, end: 74.7 },
      { word: "evolve.", start: 74.8, end: 75.4 }
    ]
  },
  {
    id: 't-4',
    start: 115,
    end: 165,
    startFormatted: '01:55',
    endFormatted: '02:45',
    speaker: 'Speaker 1',
    text: "Most people use AI agents completely wrong. They prompt with vague ambitions like 'build me an app'. High-performance teams provide bounded schemas, execution sandboxes, and automated linters. That turns hallucinations into deterministic code delivery.",
    words: [
      { word: "Most", start: 115.0, end: 115.3 },
      { word: "people", start: 115.4, end: 115.8 },
      { word: "use", start: 115.9, end: 116.2 },
      { word: "AI", start: 116.3, end: 116.7 },
      { word: "agents", start: 116.8, end: 117.3 },
      { word: "completely", start: 117.4, end: 118.0 },
      { word: "wrong.", start: 118.1, end: 118.6 }
    ]
  }
];

export const INITIAL_OPPORTUNITIES: ContentOpportunity[] = [
  {
    id: 'opp-1',
    projectId: 'proj-1',
    title: 'The biggest mistake developers make with AI',
    hookText: "You're probably using AI wrong.",
    startTime: 23,
    endTime: 68,
    startFormatted: '00:23',
    endFormatted: '01:08',
    duration: 45,
    score: 92,
    factors: {
      hookStrength: 94,
      infoDensity: 91,
      emotionalImpact: 87,
      standaloneContext: 95,
      topicRelevance: 90
    },
    whyItWorks: [
      'Strong provocative opening statement that sparks curiosity',
      'High information density with clear contrast between autocomplete vs autonomous loop',
      'Standalone context requires zero prior knowledge to grasp',
      'Directly relevant to software engineers and tech creators'
    ],
    suggestedPlatforms: ['instagram', 'youtube_shorts', 'linkedin'],
    isGenerated: true
  },
  {
    id: 'opp-2',
    projectId: 'proj-1',
    title: "AI isn't replacing developers",
    hookText: "AI won't replace you, but this will.",
    startTime: 69,
    endTime: 114,
    startFormatted: '01:09',
    endFormatted: '01:54',
    duration: 45,
    score: 89,
    factors: {
      hookStrength: 92,
      infoDensity: 88,
      emotionalImpact: 91,
      standaloneContext: 93,
      topicRelevance: 89
    },
    whyItWorks: [
      'Addresses the primary anxiety in tech with a counter-intuitive reassuring takeaway',
      'Actionable breakdown of skills that remain defensible',
      'Punchy soundbites that translate seamlessly to vertical video'
    ],
    suggestedPlatforms: ['youtube_shorts', 'linkedin', 'tiktok'],
    isGenerated: true
  },
  {
    id: 'opp-3',
    projectId: 'proj-1',
    title: 'Most people use AI agents completely wrong',
    hookText: 'Why 90% of AI agent setups fail.',
    startTime: 115,
    endTime: 165,
    startFormatted: '01:55',
    endFormatted: '02:45',
    duration: 50,
    score: 86,
    factors: {
      hookStrength: 88,
      infoDensity: 93,
      emotionalImpact: 82,
      standaloneContext: 89,
      topicRelevance: 94
    },
    whyItWorks: [
      'Tactical advice highlighting sandbox architecture over vague prompting',
      'High save-rate potential among technical builders',
      'Concrete contrast between hobbyist and enterprise workflows'
    ],
    suggestedPlatforms: ['linkedin', 'youtube', 'x'],
    isGenerated: false
  }
];

export const INITIAL_CLIPS: GeneratedClip[] = [
  {
    id: 'clip-1',
    projectId: 'proj-1',
    opportunityId: 'opp-1',
    title: 'The AI Autocomplete Mistake',
    hookText: "You're probably using AI WRONG.",
    duration: 45,
    durationFormatted: '00:45',
    aspectRatio: '9:16',
    platform: 'instagram',
    score: 92,
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    videoUrl: '/videos/sample-clip.mp4',
    status: 'ready',
    captionStyle: {
      id: 'dynamic',
      fontFamily: 'Inter',
      fontSize: 24,
      textColor: '#FFFFFF',
      highlightColor: '#EC4899',
      position: 'middle',
      animation: 'word-by-word'
    },
    createdAt: '2026-03-28T10:15:00Z'
  },
  {
    id: 'clip-2',
    projectId: 'proj-1',
    opportunityId: 'opp-2',
    title: 'Developer Superpowers in 2026',
    hookText: 'AI won\'t replace engineers. Here is why.',
    duration: 45,
    durationFormatted: '00:45',
    aspectRatio: '9:16',
    platform: 'youtube_shorts',
    score: 89,
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    videoUrl: '/videos/sample-clip.mp4',
    status: 'ready',
    captionStyle: {
      id: 'bold',
      fontFamily: 'Geist',
      fontSize: 26,
      textColor: '#17172A',
      highlightColor: '#635BFF',
      backgroundColor: '#FFFFFF',
      position: 'bottom',
      animation: 'bounce'
    },
    createdAt: '2026-03-28T10:22:00Z'
  },
  {
    id: 'clip-3',
    projectId: 'proj-1',
    opportunityId: 'opp-3',
    title: 'Deterministic AI Agent Architecture',
    hookText: 'Stop prompting. Start architecting.',
    duration: 50,
    durationFormatted: '00:50',
    aspectRatio: '1:1',
    platform: 'linkedin',
    score: 86,
    thumbnailUrl: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=600&q=80',
    videoUrl: '/videos/sample-clip.mp4',
    status: 'ready',
    captionStyle: {
      id: 'minimal',
      fontFamily: 'Inter',
      fontSize: 20,
      textColor: '#FFFFFF',
      highlightColor: '#06B6D4',
      position: 'bottom',
      animation: 'none'
    },
    createdAt: '2026-03-28T10:35:00Z'
  }
];

export const INITIAL_PLATFORM_COPIES: Record<string, PlatformCopy[]> = {
  'opp-1': [
    {
      platform: 'instagram',
      aspectRatio: '9:16',
      title: 'Stop using AI like autocomplete 👀',
      caption: `You're probably using AI wrong 👀\n\nMost engineers treat AI models like fancy tab-completion. You get a 10% speed boost and call it a day.\n\nHere's what top-tier developers do instead: they build verification harnesses and give agents bounded autonomy.\n\nSave this reel for your next sprint planning! 🚀`,
      description: 'The real mental model shift for developers using AI in 2026.',
      hashtags: ['#AI', '#Developers', '#SoftwareEngineering', '#Coding', '#FutureOfWork', '#TechReels'],
      callToAction: 'Drop a comment: How much of your day is assisted by AI?'
    },
    {
      platform: 'youtube_shorts',
      aspectRatio: '9:16',
      title: 'The Biggest AI Mistake Developers Make',
      caption: `The difference between 10% faster and 10x leverage with AI. Watch full keynote on channel!`,
      description: 'Why treating AI as autocomplete caps your productivity, and how to shift to autonomous verification loops.',
      hashtags: ['#Shorts', '#AI', '#DevOps', '#Programming', '#Tech'],
      callToAction: 'Subscribe for weekly deep dives into production AI architectures.'
    },
    {
      platform: 'linkedin',
      aspectRatio: '1:1',
      title: 'Why autocomplete is capping your team\'s engineering velocity',
      caption: `AI doesn't automatically make developers 10x more productive.\n\nThe real productivity gain comes from how you integrate it into your verification and architectural workflow.\n\nWhen developers rely on AI merely to autocomplete single lines, they introduce subtle bugs while marginally speeding up keystrokes. But when you provide deterministic boundary schemas and automated tests, you elevate engineers from line-writers to systems architects.\n\nWhat is your team's stance on autonomous coding loops?`,
      description: 'Executive takeaway on developer velocity and agentic workflows.',
      hashtags: ['#SoftwareArchitecture', '#ArtificialIntelligence', '#EngineeringLeadership', '#Productivity'],
      callToAction: 'Repost to share with your engineering team.'
    },
    {
      platform: 'youtube',
      aspectRatio: '16:9',
      title: 'The Real Reason Most Engineers Underutilize AI (And How To Fix It)',
      caption: `In this excerpt from our 2026 Future of Work keynote, we break down why standard autocomplete prompting holds teams back.`,
      description: 'Full breakdown of autonomous agent loops, verification harnesses, and cognitive offloading for software engineering.',
      hashtags: ['#AI', '#TechTalk', '#SoftwareEngineering'],
      callToAction: 'Check the links in description for the complete architecture diagram.'
    }
  ]
};

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal-1',
    clipId: 'clip-1',
    title: 'The AI Autocomplete Mistake (Reel)',
    platform: 'instagram',
    scheduledDate: '2026-03-30',
    scheduledTime: '18:30',
    status: 'scheduled',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    captionExcerpt: "You're probably using AI wrong 👀 Most engineers treat AI like fancy tab-completion..."
  },
  {
    id: 'cal-2',
    clipId: 'clip-2',
    title: 'Developer Superpowers (Short)',
    platform: 'youtube_shorts',
    scheduledDate: '2026-03-31',
    scheduledTime: '12:00',
    status: 'scheduled',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    captionExcerpt: "AI won't replace engineers. Here is why the operating loop is everything..."
  },
  {
    id: 'cal-3',
    clipId: 'clip-3',
    title: 'Deterministic AI Agents Post',
    platform: 'linkedin',
    scheduledDate: '2026-04-01',
    scheduledTime: '08:45',
    status: 'ready',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=600&q=80',
    captionExcerpt: "AI doesn't automatically make developers 10x more productive..."
  },
  {
    id: 'cal-4',
    title: 'Q2 Creator Blueprint Thread',
    platform: 'x',
    scheduledDate: '2026-03-29',
    scheduledTime: '17:00',
    status: 'published',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    captionExcerpt: "10 lessons from analyzing 500 hours of founder keynotes with AI..."
  }
];

export const INITIAL_ANALYTICS = {
  metrics: [
    { label: 'Total Views', value: '428.5K', change: '+24.8%', isPositive: true, subtext: 'vs previous 30 days' },
    { label: 'Avg Engagement Rate', value: '6.4%', change: '+1.8%', isPositive: true, subtext: 'industry avg: 3.2%' },
    { label: 'Avg Watch Time', value: '38.2s', change: '+12.4%', isPositive: true, subtext: 'out of 45s avg clip' },
    { label: 'Completion Rate', value: '71.6%', change: '+8.3%', isPositive: true, subtext: 'high-retention tier' }
  ] as AnalyticsMetric[],
  viewsOverTime: [
    { day: 'Mon', views: 32000, clips: 4 },
    { day: 'Tue', views: 48000, clips: 6 },
    { day: 'Wed', views: 64000, clips: 8 },
    { day: 'Thu', views: 79000, clips: 7 },
    { day: 'Fri', views: 95000, clips: 10 },
    { day: 'Sat', views: 58000, clips: 5 },
    { day: 'Sun', views: 52500, clips: 3 }
  ],
  platformDistribution: [
    { platform: 'Instagram Reels', percentage: 42, views: '180K', color: '#EC4899' },
    { platform: 'YouTube Shorts', percentage: 34, views: '145K', color: '#EF4444' },
    { platform: 'LinkedIn Video', percentage: 18, views: '77K', color: '#0A66C2' },
    { platform: 'X / Twitter', percentage: 6, views: '26K', color: '#17172A' }
  ],
  topTopics: [
    { topic: 'AI Agents & Automation', engagement: '8.4%', count: 28 },
    { topic: 'Developer Productivity', engagement: '7.1%', count: 19 },
    { topic: 'Software Architecture', engagement: '6.2%', count: 14 },
    { topic: 'Future of Tech Jobs', engagement: '5.9%', count: 11 }
  ],
  bestPerformingHooks: [
    { hook: "You're probably using AI wrong.", retention: '84%', score: 94 },
    { hook: "AI won't replace you, but this will.", retention: '79%', score: 91 },
    { hook: "Why 90% of AI agent setups fail.", retention: '76%', score: 88 },
    { hook: "Stop prompting. Start architecting.", retention: '72%', score: 85 }
  ],
  aiInsights: [
    {
      id: 'ins-1',
      type: 'content',
      title: 'Topic Resonance Anomaly',
      description: 'Your AI-related content generates 34% more engagement and 2.1x more shares than your average programming tutorials.',
      metricBadge: '+34% Engagement',
      actionText: 'Generate more AI Agent clips'
    },
    {
      id: 'ins-2',
      type: 'hook',
      title: 'High-Retention Hook Pattern',
      description: 'Hooks that open with a direct contrarian challenge ("You\'re probably doing X wrong") have a 21% higher completion rate.',
      metricBadge: '+21% Completion',
      actionText: 'Apply contrarian style'
    },
    {
      id: 'ins-3',
      type: 'timing',
      title: 'Optimal Distribution Window',
      description: 'Your strongest audience engagement window across LinkedIn and Instagram is consistently between 6:00 PM and 9:00 PM EST.',
      metricBadge: '6 PM - 9 PM Peak',
      actionText: 'Auto-optimize schedule'
    }
  ] as AIInsight[]
};
