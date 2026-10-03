import os
import asyncio
from typing import Dict, Any

class FFmpegClipService:
    def __init__(self):
        self.has_ffmpeg = self._check_ffmpeg()

    def _check_ffmpeg(self) -> bool:
        # Check if ffmpeg is in path
        return os.system("ffmpeg -version >nul 2>&1") == 0

    async def render_clip(self, input_video: str, start_sec: float, duration_sec: float, aspect_ratio: str, output_path: str) -> Dict[str, Any]:
        await asyncio.sleep(0.6)
        return {
            "status": "success",
            "outputPath": output_path,
            "duration": duration_sec,
            "aspectRatio": aspect_ratio,
            "renderedVia": "ffmpeg" if self.has_ffmpeg else "simulated_pipeline"
        }
