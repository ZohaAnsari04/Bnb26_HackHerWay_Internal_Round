from sqlalchemy import Column, String, Integer, Float, DateTime, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from . import Base

class Transcript(Base):
    __tablename__ = "transcripts"

    id = Column(String, primary_key=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    language = Column(String, default="en")
    raw_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="transcripts")
    segments = relationship("TranscriptSegment", back_populates="transcript")

class TranscriptSegment(Base):
    __tablename__ = "transcript_segments"

    id = Column(String, primary_key=True, index=True)
    transcript_id = Column(String, ForeignKey("transcripts.id"), nullable=False)
    start_time = Column(Float, nullable=False)
    end_time = Column(Float, nullable=False)
    speaker = Column(String, default="Speaker 1")
    text = Column(Text, nullable=False)
    words = Column(JSON, default=list)

    transcript = relationship("Transcript", back_populates="segments")
