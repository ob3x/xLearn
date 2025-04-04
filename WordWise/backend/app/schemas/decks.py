from pydantic import BaseModel
from datetime import datetime

class DeckBase(BaseModel):
    name : str
    description : str

class DeckCreate(DeckBase):
    pass

class Deck(DeckBase):
    id : int
    user_id : int
    created_at : datetime