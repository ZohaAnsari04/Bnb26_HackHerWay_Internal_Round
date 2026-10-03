from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .utils.config import settings

# Import API routers
from .api.projects import router as projects_router
from .api.assets import router as assets_router
from .api.analysis import router as analysis_router
from .api.clips import router as clips_router
from .api.hooks import router as hooks_router
from .api.captions import router as captions_router
from .api.adaptation import router as adaptation_router
from .api.analytics import router as analytics_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="CreatorAI — AI-Powered Creator Operating Platform API"
)

# CORS middleware for local Next.js frontend dev & production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers under prefix
app.include_router(projects_router, prefix=settings.API_PREFIX)
app.include_router(assets_router, prefix=settings.API_PREFIX)
app.include_router(analysis_router, prefix=settings.API_PREFIX)
app.include_router(clips_router, prefix=settings.API_PREFIX)
app.include_router(hooks_router, prefix=settings.API_PREFIX)
app.include_router(captions_router, prefix=settings.API_PREFIX)
app.include_router(adaptation_router, prefix=settings.API_PREFIX)
app.include_router(analytics_router, prefix=settings.API_PREFIX)

@app.get("/")
async def root():
    return {
        "platform": "CreatorAI API",
        "version": settings.VERSION,
        "status": "online",
        "demoMode": settings.DEMO_MODE,
        "docsUrl": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "CreatorAI"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
