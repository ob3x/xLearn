from pydantic import BaseModel
from datetime import datetime

class FlashCardBase(BaseModel):
    front : str
    back : str
    deck_id : int

class FlashCreate(FlashCardBase):
    pass

class Flash(FlashCardBase):
    id : int
    created_at : datetime