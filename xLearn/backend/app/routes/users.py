from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from db import get_db
from models import Users
from schems import UserCreate, UserResponse

router = APIRouter(
    prefix="/users",
    tags=["users"]
)