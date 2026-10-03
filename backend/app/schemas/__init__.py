from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ScoreFactors(BaseModel):
    hookStrength: int = Field(default=90, ge=0, le=100)
    infoDensity: int = Field(default=90, ge=0, le=100)
    emotionalImpact: int = Field(default=85, ge=0, le=100)
    standaloneContext: int = Field(default=90, ge=0, le=100)
    topicRelevance: int = Field(default=90, ge=0, le=100)

class OpportunityBase(BaseModel):
    title: str
    hookText: str
    startTime: float
    endTime: float
    duration: int
    score: int
    factors: ScoreFactors
    whyItWorks: List[str]
    suggestedPlatforms: List[str]

class OpportunityResponse(OpportunityBase):
    id: str
    projectId: str
    startFormatted: str
    endFormatted: str
    isGenerated: bool = False

class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None
    assetType: str = "video"

class ProjectResponse(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    assetType: str
    duration: str
    durationSeconds: int
    thumbnailUrl: Optional[str] = None
    status: str
    opportunityPotential: int
    topics: List[str]
    tone: str
    targetAudience: str
    keyThemes: List[str]
    analysisComplete: bool
    createdAt: str
    updatedAt: str

class ClipCreate(BaseModel):
    projectId: str
    opportunityId: Optional[str] = None
    title: str
    hookText: str
    duration: int
    aspectRatio: str = "9:16"
    platform: str = "instagram"
    captionStyle: Dict[str, Any] = Field(default_factory=dict)

class HookGenerationRequest(BaseModel):
    topic: str
    audience: str
    platform: str
    tone: str
    durationSeconds: int = 45

class HookGenerationResponse(BaseModel):
    hooks: List[str]
    script: str
    callToAction: str
    caption: str

class AdaptationRequest(BaseModel):
    opportunityTitle: str
    hookText: str
    context: Optional[str] = None

class PlatformCopyResponse(BaseModel):
    platform: str
    aspectRatio: str
    title: str
    caption: str
    description: str
    hashtags: List[str]
    callToAction: str
