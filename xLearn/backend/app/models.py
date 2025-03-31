from sqlalchemy import Column, Integer, String, Text, CHAR, Boolean, ForeignKey, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship
from db import Base

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    quiz_results = relationship("QuizResult", back_populates="user")

class Questions(Base):
    __tablename__ = "questions"

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

class QuizResult(Base):
    __tablename__ = "quiz_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    score = Column(Integer, nullable=False)
    total_questions = Column(Integer, nullable=False)
    date = Column(DateTime, default=datetime.utcnow())

    user = relationship("Users", back_populates="quiz_results")

class QuizQuestions(Base):
    __tablename__ = "quiz_questions"

    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quiz_results.id"), nullable=False)
    question_id = Column(Integer, ForeignKey("questions.id"), nullable=False)
    user_answer = Column(CHAR(1), nullable=True)
    is_correct = Column(Boolean, nullable=False)
