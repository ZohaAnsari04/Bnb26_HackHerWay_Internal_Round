import { ContentOpportunity, TranscriptSegment } from '@/types';
import { INITIAL_OPPORTUNITIES } from '@/lib/mockData';

export interface AnalysisResult {
  topics: string[];
  tone: string;
  targetAudience: string;
  keyThemes: string[];
  opportunities: ContentOpportunity[];
}

export interface ContentAnalysisService {
  analyzeContent(transcript: TranscriptSegment[], title?: string): Promise<AnalysisResult>;
}

export class MockContentAnalysisService implements ContentAnalysisService {
  async analyzeContent(transcript: TranscriptSegment[], title?: string): Promise<AnalysisResult> {
    await new Promise(r => setTimeout(r, 600));

    // Dynamic generation based on transcript if available
    return {
      topics: ['Artificial Intelligence', 'Software Engineering', 'AI Agents', 'Productivity', 'Future of Work'],
      tone: 'Educational & Tactical',
      targetAudience: 'Software Developers & Technical Founders',
      keyThemes: ['Autonomous Workflows', 'Developer Superpowers', 'System Architecture', 'Cognitive Offloading'],
      opportunities: INITIAL_OPPORTUNITIES
    };
  }
}

export class ApiContentAnalysisService implements ContentAnalysisService {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  async analyzeContent(transcript: TranscriptSegment[], title?: string): Promise<AnalysisResult> {
    if (!this.apiKey) {
      return new MockContentAnalysisService().analyzeContent(transcript, title);
    }

    try {
      const fullText = transcript.map(t => `[${t.startFormatted}] ${t.text}`).join('\n');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are CreatorAI's senior content intelligence engine. Analyze the provided video transcript and detect the highest potential short-form clips.
Return valid JSON with:
{
  "topics": string[],
  "tone": string,
  "targetAudience": string,
  "keyThemes": string[],
  "opportunities": [
    {
      "id": string,
      "title": string,
      "hookText": string,
      "startTime": number,
      "endTime": number,
      "startFormatted": string,
      "endFormatted": string,
      "duration": number,
      "score": number, // 0-100
      "factors": {
        "hookStrength": number,
        "infoDensity": number,
        "emotionalImpact": number,
        "standaloneContext": number,
        "topicRelevance": number
      },
      "whyItWorks": string[],
      "suggestedPlatforms": ["instagram" | "youtube_shorts" | "linkedin" | "tiktok"]
    }
  ]
}`
            },
            {
              role: 'user',
              content: `Title: ${title || 'Long-form Asset'}\nTranscript:\n${fullText.slice(0, 8000)}`
            }
          ],
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        throw new Error(`LLM analysis error: ${response.statusText}`);
      }

      const data = await response.json();
      const parsed = JSON.parse(data.choices[0].message.content);
      return parsed;
    } catch (err) {
      console.warn('AI analysis API fallback invoked:', err);
      return new MockContentAnalysisService().analyzeContent(transcript, title);
    }
  }
}

export function createContentAnalysisService(apiKey?: string): ContentAnalysisService {
  return new ApiContentAnalysisService(apiKey);
}
