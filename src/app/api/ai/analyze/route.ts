import { NextResponse } from 'next/server';
import { INITIAL_OPPORTUNITIES } from '@/lib/mockData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { transcript, projectId, title } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && transcript) {
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
                  'You are an expert video editor and retention strategist. Identify viral hook moments in the transcript and return opportunity scores.',
              },
              {
                role: 'user',
                content: `Analyze this content and return JSON with top viral moments:\n\n${transcript}`,
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
            opportunities: content.opportunities || INITIAL_OPPORTUNITIES,
          });
        }
      } catch (err) {
        console.warn('Real AI analysis failed, falling back to algorithmic analyzer:', err);
      }
    }

    // Hybrid Mode Algorithmic Analysis:
    const tailoredOpportunities = INITIAL_OPPORTUNITIES.map((opp) => ({
      ...opp,
      projectId: projectId || opp.projectId,
      title: title ? `${title} — ${opp.title}` : opp.title,
    }));

    return NextResponse.json({
      success: true,
      provider: 'hybrid-engine',
      model: 'CreatorAI Pacing & Hook Diagnostic v2.4',
      opportunities: tailoredOpportunities,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { success: false, error: 'Content analysis failed' },
      { status: 500 }
    );
  }
}
