import asyncio
from typing import List, Dict, Any

class OpportunityScoringService:
    def __init__(self, api_key: str = None):
        self.api_key = api_key

    async def detect_opportunities(self, transcript_text: str) -> List[Dict[str, Any]]:
        await asyncio.sleep(0.4)
        return [
            {
                "id": "opp-1",
                "title": "The biggest mistake developers make with AI",
                "hookText": "You're probably using AI wrong.",
                "startTime": 23.0,
                "endTime": 68.0,
                "startFormatted": "00:23",
                "endFormatted": "01:08",
                "duration": 45,
                "score": 92,
                "factors": {
                    "hookStrength": 94,
                    "infoDensity": 91,
                    "emotionalImpact": 87,
                    "standaloneContext": 95,
                    "topicRelevance": 90
                },
                "whyItWorks": [
                    "Strong provocative opening statement that sparks curiosity",
                    "High information density with clear contrast between autocomplete vs autonomous loop",
                    "Standalone context requires zero prior knowledge to grasp"
                ],
                "suggestedPlatforms": ["instagram", "youtube_shorts", "linkedin"],
                "isGenerated": True
            },
            {
                "id": "opp-2",
                "title": "AI isn't replacing developers",
                "hookText": "AI won't replace you, but this will.",
                "startTime": 69.0,
                "endTime": 114.0,
                "startFormatted": "01:09",
                "endFormatted": "01:54",
                "duration": 45,
                "score": 89,
                "factors": {
                    "hookStrength": 92,
                    "infoDensity": 88,
                    "emotionalImpact": 91,
                    "standaloneContext": 93,
                    "topicRelevance": 89
                },
                "whyItWorks": [
                    "Directly addresses developer anxiety with high-leverage reframing",
                    "Actionable breakdown of skills that remain defensible in 2026"
                ],
                "suggestedPlatforms": ["youtube_shorts", "linkedin", "tiktok"],
                "isGenerated": True
            }
        ]
