from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter(prefix="/captions", tags=["captions"])

@router.post("/style")
async def apply_style(payload: Dict[str, Any]):
    return {
        "status": "applied",
        "style": payload.get("style", "dynamic"),
        "fontFamily": payload.get("fontFamily", "Inter"),
        "fontSize": payload.get("fontSize", 24),
        "highlightColor": payload.get("highlightColor", "#EC4899")
    }
