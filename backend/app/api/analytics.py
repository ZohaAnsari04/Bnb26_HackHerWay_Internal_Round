from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/overview")
async def get_analytics_overview():
    return {
        "metrics": [
            { "label": "Total Views", "value": "428.5K", "change": "+24.8%", "isPositive": True },
            { "label": "Avg Engagement Rate", "value": "6.4%", "change": "+1.8%", "isPositive": True },
            { "label": "Avg Watch Time", "value": "38.2s", "change": "+12.4%", "isPositive": True },
            { "label": "Completion Rate", "value": "71.6%", "change": "+8.3%", "isPositive": True }
        ],
        "topTopics": [
            { "topic": "AI Agents & Automation", "engagement": "8.4%", "count": 28 },
            { "topic": "Developer Productivity", "engagement": "7.1%", "count": 19 },
            { "topic": "Software Architecture", "engagement": "6.2%", "count": 14 }
        ],
        "insights": [
            "Your AI-related content generates 34% more engagement than your average content.",
            "Hooks that start with a direct question have a 21% higher completion rate.",
            "Your strongest publishing window is between 6 PM and 9 PM."
        ]
    }
