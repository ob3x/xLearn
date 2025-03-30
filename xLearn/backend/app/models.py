from sqlalchemy import Column, Integer, String, Text, CHAR, TIMESTAMP, Boolean, ForeignKey, func
from sqlalchemy.orm import relationship
from db import Base

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

class Questions(Base):
    __tablename__ = "question"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(50), nullable=False)
    question_text = Column(Text, nullable=False)
    equation = Column(String, nullable=True)

    option_a = Column(Text, nullable=False)
    option_b = Column(Text, nullable=False)
    option_c = Column(Text, nullable=False)
    option_d = Column(Text, nullable=False)

    correct_option = Column(CHAR(1), nullable=False)
    explanation = Column(Text, nullable=True)

    difficulty = Column(Integer, default=1)
    created_at = Column(TIMESTAMP, server_default=func.now())

    answers = relationship("UserAnswer", back_populates="question")
