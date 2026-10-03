from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from . import Base

class ContentOpportunity(Base):
    __tablename__ = "content_opportunities"

    id = Column(String, primary_key=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    title = Column(String, nullable=False)
    hook_text = Column(String, nullable=False)
    start_time = Column(Float, nullable=False)
    end_time = Column(Float, nullable=False)
    duration = Column(Integer, nullable=False)
    score = Column(Integer, default=90)
    factors = Column(JSON, default=dict)
    why_it_works = Column(JSON, default=list)
    suggested_platforms = Column(JSON, default=list)
    is_generated = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="opportunities")

class Clip(Base):
    __tablename__ = "clips"

    id = Column(String, primary_key=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    opportunity_id = Column(String, ForeignKey("content_opportunities.id"), nullable=True)
    title = Column(String, nullable=False)
    hook_text = Column(String, nullable=False)
    duration = Column(Integer, default=45)
    duration_formatted = Column(String, default="00:45")
    aspect_ratio = Column(String, default="9:16")
    platform = Column(String, default="instagram")
    score = Column(Integer, default=90)
    thumbnail_url = Column(String, nullable=True)
    video_url = Column(String, nullable=True)
    status = Column(String, default="ready")
    caption_style = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="clips")
