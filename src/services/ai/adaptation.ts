import { PlatformCopy, PlatformType, AspectRatio } from '@/types';
import { INITIAL_PLATFORM_COPIES } from '@/lib/mockData';

export interface AdaptationService {
  adaptContent(opportunityTitle: string, hookText: string, contextText: string): Promise<PlatformCopy[]>;
}

export class MockAdaptationService implements AdaptationService {
  async adaptContent(opportunityTitle: string, hookText: string, contextText: string): Promise<PlatformCopy[]> {
    await new Promise(r => setTimeout(r, 500));
    return [
      {
        platform: 'instagram',
        aspectRatio: '9:16',
        title: hookText || 'You are probably using AI wrong',
        caption: `${hookText || "You're probably using AI wrong 👀"}\n\nMost people miss the real leverage. Instead of small tweaks, rethinking the whole workflow gives you 10x output.\n\nSave this for your next project! 💡`,
        description: 'Short-form visual takeaway for creators and builders.',
        hashtags: ['#AI', '#Productivity', '#CreatorTools', '#TechLife', '#Innovation'],
        callToAction: 'Drop your favorite AI tool in the comments!'
      },
      {
        platform: 'youtube_shorts',
        aspectRatio: '9:16',
        title: opportunityTitle || 'The Biggest Mistake With AI Today',
        caption: `Why 90% of developers get stuck. Subscribe for more weekly insights!`,
        description: 'Fast vertical breakdown for builders and software engineers.',
        hashtags: ['#Shorts', '#AI', '#Coding', '#FutureOfTech'],
        callToAction: 'Subscribe for daily creator insights'
      },
      {
        platform: 'linkedin',
        aspectRatio: '1:1',
        title: `Rethinking execution in the age of autonomous systems`,
        caption: `${hookText || "AI doesn't automatically make people more productive."}\n\nThe difference between a 10% incremental gain and a 10x architectural shift comes down to feedback loops and boundaries.\n\nWhen we transition from micro-prompting to deterministic frameworks, we unlock true autonomy.\n\nHow is your organization adapting its workflow this quarter?`,
        description: 'Thought leadership piece tailored for LinkedIn feeds.',
        hashtags: ['#EngineeringLeadership', '#ArtificialIntelligence', '#FutureOfWork', '#Productivity'],
        callToAction: 'Repost to start a discussion with your network.'
      },
      {
        platform: 'youtube',
        aspectRatio: '16:9',
        title: `${opportunityTitle} — Full Masterclass Breakdown`,
        caption: `A detailed breakdown from our latest keynote exploring systems design and autonomous tooling.`,
        description: 'Complete high-resolution video breakdown with timestamps and architecture diagrams.',
        hashtags: ['#AI', '#TechKeynote', '#SoftwareDesign'],
        callToAction: 'Check the description for templates and resources.'
      }
    ];
  }
}

export function createAdaptationService(): AdaptationService {
  return new MockAdaptationService();
}
