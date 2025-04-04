from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from core.db import Base
from datetime import datetime


class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    level = Column(Integer, default=0)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    decks = relationship("DeckDB", back_populates="owner")


class DeckDB(Base):
    __tablename__ = "decks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("UserDB", back_populates="decks")
    flashcards = relationship("FlashcardDB", back_populates="deck")


class FlashcardDB(Base):
    __tablename__ = "flashcards"

    id = Column(Integer, primary_key=True, index=True)
    deck_id = Column(Integer, ForeignKey("decks.id", ondelete="CASCADE"), nullable=False)
    front = Column(String, nullable=False)
    back = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    deck = relationship("DeckDB", back_populates="flashcards")
