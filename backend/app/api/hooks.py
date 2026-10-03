from fastapi import APIRouter
from ..schemas import HookGenerationRequest, HookGenerationResponse

router = APIRouter(prefix="/hooks", tags=["hooks"])

@router.post("/generate", response_model=HookGenerationResponse)
async def generate_hooks(data: HookGenerationRequest):
    topic = data.topic or "AI Agents"
    return {
        "hooks": [
            f"AI agents aren't replacing developers. They're changing what developers actually do.",
            f"Here's what nobody tells you about building with {topic}.",
            f"You don't need another AI tool. You need this 3-step workflow.",
            f"Why 90% of engineers are using {topic} backwards."
        ],
        "script": f"[00:00 - 00:04] Hook: Most people think {topic} is just about faster typing. They are missing the bigger picture.\n\n[00:05 - 00:20] Core insight: When you move from reactive prompting to deterministic sandboxes, your engineering velocity compounds 5x.\n\n[00:21 - 00:35] Concrete tip: Always bind your agent to strict schema validation before allowing execution.\n\n[00:36 - 00:45] CTA: If you want my production template, comment TEMPLATE below and I will send the GitHub repo.",
        "callToAction": "Comment TEMPLATE below to receive our production architectural framework.",
        "caption": f"Stop prompting. Start architecting.\n\nHere is how top-tier teams build with {topic} in 2026.\n\n#{topic.replace(' ', '')} #SoftwareEngineering #Tech"
    }
