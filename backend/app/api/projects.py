from fastapi import APIRouter, HTTPException
from typing import List
from ..schemas import ProjectCreate, ProjectResponse

router = APIRouter(prefix="/projects", tags=["projects"])

DEMO_PROJECTS = [
    {
        "id": "proj-1",
        "title": "AI & The Future of Work",
        "description": "Keynote breakdown exploring agentic workflows, autonomous tooling, and how modern software engineering teams thrive with AI.",
        "assetType": "video",
        "duration": "10:42",
        "durationSeconds": 642,
        "thumbnailUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        "status": "ready",
        "opportunityPotential": 84,
        "topics": ["Artificial Intelligence", "Software Engineering", "AI Agents", "Productivity"],
        "tone": "Educational & Authoritative",
        "targetAudience": "Software Developers & Technical Founders",
        "keyThemes": ["AI Operating Systems", "Developer Productivity", "Autonomous Agents"],
        "analysisComplete": True,
        "createdAt": "2026-03-28T10:00:00Z",
        "updatedAt": "2 hours ago"
    }
]

@router.get("", response_model=List[ProjectResponse])
async def list_projects():
    return DEMO_PROJECTS

@router.post("", response_model=ProjectResponse)
async def create_project(data: ProjectCreate):
    new_proj = {
        "id": f"proj-{len(DEMO_PROJECTS) + 1}",
        "title": data.title,
        "description": data.description or "Created in CreatorAI",
        "assetType": data.assetType,
        "duration": "08:30",
        "durationSeconds": 510,
        "thumbnailUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        "status": "ready",
        "opportunityPotential": 88,
        "topics": ["AI", "Innovation", "Productivity"],
        "tone": "Educational",
        "targetAudience": "Creators",
        "keyThemes": ["Automation", "Scale"],
        "analysisComplete": True,
        "createdAt": "2026-03-29T10:00:00Z",
        "updatedAt": "Just now"
    }
    DEMO_PROJECTS.insert(0, new_proj)
    return new_proj
