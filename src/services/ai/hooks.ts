export interface HookGenerationInput {
  topic: string;
  audience: string;
  platform: string;
  tone: string;
  durationSeconds: number;
}

export interface GeneratedHookResult {
  hooks: string[];
  script: string;
  callToAction: string;
  caption: string;
}

export interface HookService {
  generateHooksAndScript(input: HookGenerationInput): Promise<GeneratedHookResult>;
}

export class MockHookService implements HookService {
  async generateHooksAndScript(input: HookGenerationInput): Promise<GeneratedHookResult> {
    await new Promise(r => setTimeout(r, 600));

    const topic = input.topic || 'AI Agents';

    return {
      hooks: [
        `AI agents aren't replacing developers. They're changing what developers actually do.`,
        `Here's what nobody tells you about building with ${topic}.`,
        `You don't need another AI tool. You need this 3-step workflow.`,
        `Why 90% of engineers are using ${topic} backwards.`
      ],
      script: `[00:00 - 00:04] Hook: Most people think ${topic} is just about faster typing. They are missing the bigger picture.\n\n[00:05 - 00:20] Core insight: When you move from reactive prompting to deterministic sandboxes, your engineering velocity compounds 5x.\n\n[00:21 - 00:35] Concrete tip: Always bind your agent to strict schema validation before allowing execution.\n\n[00:36 - 00:45] CTA: If you want my production template, comment TEMPLATE below and I will send the GitHub repo.`,
      callToAction: `Comment TEMPLATE below to get the production architectural framework.`,
      caption: `Stop prompting. Start architecting.\n\nHere is how top-tier teams build with ${topic} in 2026.\n\n#${topic.replace(/\s+/g, '')} #Engineering #TechTrends #SoftwareEngineering`
    };
  }
}

export class ApiHookService implements HookService {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  async generateHooksAndScript(input: HookGenerationInput): Promise<GeneratedHookResult> {
    if (!this.apiKey) {
      return new MockHookService().generateHooksAndScript(input);
    }

    try {
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
              content: `You are an elite short-form video copywriter. Generate high-retention viral hooks, a timed script, a clear CTA, and a platform-ready caption.
Output JSON format:
{
  "hooks": string[],
  "script": string,
  "callToAction": string,
  "caption": string
}`
            },
            {
              role: 'user',
              content: `Topic: ${input.topic}\nTarget Audience: ${input.audience}\nPlatform: ${input.platform}\nTone: ${input.tone}\nTarget Duration: ${input.durationSeconds}s`
            }
          ],
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) throw new Error('Hook generation failed');
      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch {
      return new MockHookService().generateHooksAndScript(input);
    }
  }
}

export function createHookService(apiKey?: string): HookService {
  return new ApiHookService(apiKey);
}
