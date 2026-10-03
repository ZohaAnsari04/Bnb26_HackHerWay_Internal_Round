import { NextResponse } from 'next/server';
import { generateAllPlatformCopies } from '@/services/ai/adaptation';
import { INITIAL_OPPORTUNITIES } from '@/lib/mockData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { opportunityId, hookText, keyTopic } = body;

    const opp = INITIAL_OPPORTUNITIES.find(o => o.id === opportunityId) || {
      id: opportunityId || 'custom',
      projectId: 'proj-1',
      title: 'Custom Viral Moment',
      hookText: hookText || 'The secret to rapid retention growth in 2026',
      startTime: 10,
      endTime: 42,
      startFormatted: '00:10',
      endFormatted: '00:42',
      duration: 32,
      score: 92,
      factors: { hookStrength: 92, infoDensity: 88, emotionalImpact: 85, standaloneContext: 90, topicRelevance: 95 },
      whyItWorks: ['Pattern interruption opening', 'Counter-intuitive thesis', 'Direct creator lesson'],
      suggestedPlatforms: ['tiktok', 'youtube_shorts', 'linkedin', 'instagram', 'x'] as any[],
    };

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content:
                  'You are a viral social media ghostwriter. Generate tailored platform-specific copy for TikTok, YouTube Shorts, LinkedIn, and X/Twitter.',
              },
              {
                role: 'user',
                content: `Topic: ${keyTopic || opp.title}\nHook: ${opp.hookText}\nReturn JSON with platform variants.`,
              },
            ],
            response_format: { type: 'json_object' },
          }),
        });

        if (response.ok) {
          const result = await response.json();
          const content = JSON.parse(result.choices[0].message.content);
          return NextResponse.json({
            success: true,
            provider: 'openai-gpt4o',
            copies: content.copies || generateAllPlatformCopies(opp),
          });
        }
      } catch (err) {
        console.warn('Real AI copy generation failed, using adaptation service:', err);
      }
    }

    // Hybrid Mode Algorithmic Adaptation Engine
    const copies = generateAllPlatformCopies(opp);

    return NextResponse.json({
      success: true,
      provider: 'hybrid-engine',
      model: 'CreatorAI Platform Adaptation Engine v1.2',
      copies,
    });
  } catch (error) {
    console.error('Adaptation error:', error);
    return NextResponse.json(
      { success: false, error: 'Platform adaptation failed' },
      { status: 500 }
    );
  }
}
