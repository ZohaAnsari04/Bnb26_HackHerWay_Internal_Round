from fastapi import APIRouter
from typing import Dict, Any
from ..services.ai_analysis.opportunity_service import OpportunityScoringService
from ..services.transcription.whisper_service import WhisperTranscriptionService

router = APIRouter(prefix="/analysis", tags=["analysis"])

@router.post("/process")
async def process_content(payload: Dict[str, Any]):
    whisper_svc = WhisperTranscriptionService()
    transcript = await whisper_svc.transcribe(payload.get("filePath", ""))
    
    scoring_svc = OpportunityScoringService()
    opportunities = await scoring_svc.detect_opportunities("")
    
    return {
        "status": "complete",
        "topics": ["Artificial Intelligence", "Software Engineering", "AI Agents", "Productivity"],
        "tone": "Educational & Tactical",
        "targetAudience": "Software Developers",
        "keyThemes": ["Autonomous Workflows", "Developer Superpowers"],
        "transcript": transcript,
        "opportunities": opportunities
    }
