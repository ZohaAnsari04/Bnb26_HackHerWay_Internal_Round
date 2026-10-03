import asyncio
from typing import List, Dict, Any

class WhisperTranscriptionService:
    def __init__(self, api_key: str = None):
        self.api_key = api_key

    async def transcribe(self, file_path: str) -> List[Dict[str, Any]]:
        # Simulated Whisper speech-to-text pipeline
        await asyncio.sleep(0.5)
        return [
            {
                "id": "t-1",
                "start": 0,
                "end": 22,
                "startFormatted": "00:00",
                "endFormatted": "00:22",
                "speaker": "Speaker 1",
                "text": "Welcome everyone. Today we are unpacking something fundamental about how software engineering teams are evolving in 2026."
            },
            {
                "id": "t-2",
                "start": 23,
                "end": 68,
                "startFormatted": "00:23",
                "endFormatted": "01:08",
                "speaker": "Speaker 1",
                "text": "The biggest mistake developers make with AI is treating it as an autocomplete rather than an autonomous collaborator."
            },
            {
                "id": "t-3",
                "start": 69,
                "end": 114,
                "startFormatted": "01:09",
                "endFormatted": "01:54",
                "speaker": "Speaker 1",
                "text": "AI isn't replacing developers. It's replacing developers who refuse to evolve their operating loop."
            }
        ]
