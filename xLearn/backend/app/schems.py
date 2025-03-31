from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    class Config:
        from_attributes = True




class QuestionBase(BaseModel):
    category: str
    question_text: str
    equation: Optional[str] = None
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_option: str
    explanation: Optional[str] = None
    difficulty: int

class QuestionCreate(QuestionBase):
    pass

class QuestionResponse(QuestionBase):
    id: int
    class Config:
        from_attributes = True



class QuizResultBase(BaseModel):
    score: int
    total_questions: int
    date: datetime

class QuizResultCreate(QuizResultBase):
    pass

class QuizResultResponse(QuizResultBase):
    id: int
    user_id: int
    class Config:
        from_attributes = True


class QuizQuestionBase(BaseModel):
    quiz_id: int
    question_id: int
    user_answer: Optional[str] = None
    is_correct: bool

class QuizQuestionCreate(QuizQuestionBase):
    pass

class QuizQuestionResponse(QuizQuestionBase):
    id: int
    class Config:
        from_attributes = True



class Token(BaseModel):
    access_token : str
    token_type : str