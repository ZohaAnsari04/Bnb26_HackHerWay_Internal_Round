from sqlalchemy import Column, String, Integer, DateTime, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from . import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    asset_type = Column(String, default="video")
    duration = Column(String, default="10:42")
    duration_seconds = Column(Integer, default=642)
    thumbnail_url = Column(String, nullable=True)
    status = Column(String, default="ready")
    opportunity_potential = Column(Integer, default=84)
    topics = Column(JSON, default=list)
    tone = Column(String, default="Educational")
    target_audience = Column(String, default="Developers")
    key_themes = Column(JSON, default=list)
    analysis_complete = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    assets = relationship("Asset", back_populates="project")
    transcripts = relationship("Transcript", back_populates="project")
    opportunities = relationship("ContentOpportunity", back_populates="project")
    clips = relationship("Clip", back_populates="project")
