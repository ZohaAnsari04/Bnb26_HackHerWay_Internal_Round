import asyncio
from typing import Dict, Any

class CaptionGeneratorService:
    async def generate_timed_captions(self, text: str, start_time: float, end_time: float) -> Dict[str, Any]:
        await asyncio.sleep(0.3)
        return {
            "style": "dynamic",
            "fontFamily": "Inter",
            "fontSize": 24,
            "highlightColor": "#EC4899",
            "wordCount": len(text.split()),
            "duration": end_time - start_time
        }
