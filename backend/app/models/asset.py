from sqlalchemy import Column, String, Integer, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from . import Base

class Asset(Base):
    __tablename__ = "assets"

    id = Column(String, primary_key=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"), nullable=True)
    name = Column(String, nullable=False)
    type = Column(String, default="video")
    size_bytes = Column(Integer, default=0)
    duration_seconds = Column(Integer, nullable=True)
    duration_formatted = Column(String, nullable=True)
    thumbnail_url = Column(String, nullable=True)
    file_url = Column(String, nullable=False)
    status = Column(String, default="analyzed")
    topics = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="assets")
