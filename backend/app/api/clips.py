from fastapi import APIRouter
from typing import List, Dict, Any
from ..schemas import ClipCreate

router = APIRouter(prefix="/clips", tags=["clips"])

DEMO_CLIPS = [
    {
        "id": "clip-1",
        "projectId": "proj-1",
        "opportunityId": "opp-1",
        "title": "The AI Autocomplete Mistake",
        "hookText": "You're probably using AI WRONG.",
        "duration": 45,
        "durationFormatted": "00:45",
        "aspectRatio": "9:16",
        "platform": "instagram",
        "score": 92,
        "thumbnailUrl": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        "status": "ready",
        "captionStyle": {
            "id": "dynamic",
            "fontFamily": "Inter",
            "fontSize": 24,
            "textColor": "#FFFFFF",
            "highlightColor": "#EC4899",
            "position": "middle",
            "animation": "word-by-word"
        }
    }
]

@router.get("")
async def list_clips():
    return DEMO_CLIPS

@router.post("")
async def generate_clip(data: ClipCreate):
    new_clip = {
        "id": f"clip-{len(DEMO_CLIPS) + 1}",
        "projectId": data.projectId,
        "opportunityId": data.opportunityId,
        "title": data.title,
        "hookText": data.hookText,
        "duration": data.duration,
        "durationFormatted": f"00:{data.duration}",
        "aspectRatio": data.aspectRatio,
        "platform": data.platform,
        "score": 92,
        "thumbnailUrl": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        "status": "ready",
        "captionStyle": data.captionStyle or {
            "id": "dynamic",
            "fontFamily": "Inter",
            "fontSize": 24,
            "textColor": "#FFFFFF",
            "highlightColor": "#EC4899",
            "position": "middle",
            "animation": "word-by-word"
        }
    }
    DEMO_CLIPS.insert(0, new_clip)
    return new_clip
