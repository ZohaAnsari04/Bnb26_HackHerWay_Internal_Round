from fastapi import APIRouter, UploadFile, File
from typing import List, Dict, Any

router = APIRouter(prefix="/assets", tags=["assets"])

DEMO_ASSETS = [
    {
        "id": "asset-1",
        "name": "AI_Future_of_Work.mp4",
        "type": "video",
        "sizeBytes": 384500000,
        "durationFormatted": "10:42",
        "thumbnailUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        "status": "analyzed",
        "topics": ["AI", "Engineering", "Agents"],
        "createdAt": "2026-03-28T09:40:00Z"
    }
]

@router.get("")
async def list_assets():
    return DEMO_ASSETS

@router.post("/upload")
async def upload_asset(file: UploadFile = File(...)):
    new_asset = {
        "id": f"asset-{len(DEMO_ASSETS) + 1}",
        "name": file.filename,
        "type": "video",
        "sizeBytes": 15000000,
        "durationFormatted": "06:30",
        "thumbnailUrl": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
        "status": "analyzed",
        "topics": ["Uploaded", "Content"],
        "createdAt": "2026-03-29T11:00:00Z"
    }
    DEMO_ASSETS.insert(0, new_asset)
    return new_asset
