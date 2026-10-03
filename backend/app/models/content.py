from sqlalchemy import Column, String, Integer, DateTime, JSON, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from . import Base

class PlatformContent(Base):
    __tablename__ = "platform_content"

    id = Column(String, primary_key=True, index=True)
    clip_id = Column(String, ForeignKey("clips.id"), nullable=True)
    platform = Column(String, nullable=False)
    aspect_ratio = Column(String, default="9:16")
    title = Column(String, nullable=False)
    caption = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    hashtags = Column(JSON, default=list)
    call_to_action = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ContentSchedule(Base):
    __tablename__ = "content_schedule"

    id = Column(String, primary_key=True, index=True)
    clip_id = Column(String, ForeignKey("clips.id"), nullable=True)
    platform = Column(String, nullable=False)
    scheduled_date = Column(String, nullable=False) # YYYY-MM-DD
    scheduled_time = Column(String, nullable=False) # HH:MM
    status = Column(String, default="scheduled")
    caption_excerpt = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
