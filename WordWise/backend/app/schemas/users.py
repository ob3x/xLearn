from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    username : str
    email : str
    password : str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id : int
    level : int
    created_at : datetime
    is_admin : bool