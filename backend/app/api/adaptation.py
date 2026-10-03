from fastapi import APIRouter
from typing import List
from ..schemas import AdaptationRequest, PlatformCopyResponse

router = APIRouter(prefix="/adaptation", tags=["adaptation"])

@router.post("/generate", response_model=List[PlatformCopyResponse])
async def adapt_content(payload: AdaptationRequest):
    return [
        {
            "platform": "instagram",
            "aspectRatio": "9:16",
            "title": payload.hookText,
            "caption": f"{payload.hookText} 👀\n\nMost developers miss the leverage of autonomous verification loops.\n\nSave this reel for your next architecture review! 🚀",
            "description": "Short-form visual takeaway for creators and engineers.",
            "hashtags": ["#AI", "#Developers", "#SoftwareEngineering", "#Coding"],
            "callToAction": "Drop a comment with your favorite AI tool!"
        },
        {
            "platform": "youtube_shorts",
            "aspectRatio": "9:16",
            "title": payload.opportunityTitle,
            "caption": "The difference between 10% faster and 10x leverage with AI.",
            "description": "Why autocomplete caps your engineering velocity.",
            "hashtags": ["#Shorts", "#AI", "#Coding"],
            "callToAction": "Subscribe for weekly deep dives."
        },
        {
            "platform": "linkedin",
            "aspectRatio": "1:1",
            "title": "Why autocomplete is capping engineering velocity",
            "caption": f"AI doesn't automatically make developers 10x more productive.\n\nThe real productivity gain comes from how you integrate it into your verification and architectural workflow.",
            "description": "Executive takeaway on developer velocity and agentic workflows.",
            "hashtags": ["#SoftwareArchitecture", "#EngineeringLeadership", "#AI"],
            "callToAction": "Repost to share with your engineering team."
        }
    ]
