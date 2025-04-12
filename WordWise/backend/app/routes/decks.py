from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from core.db import get_db
from models.model import DeckDB, FlashcardDB
from schemas.decks import DeckCreate, Deck
from routes.auth import get_current_user

router = APIRouter(
    prefix="/decks",
    tags=["decks"]
)

@router.get("/get-deck", response_model=list[Deck])
def get_deck(db : Session = Depends(get_db), user : dict = Depends(get_current_user)):
    decks = db.query(DeckDB).filter(DeckDB.user_id == user.id).limit(30).all()

    if not decks:
        raise HTTPException(status_code=404, detail="Error, decks not found")

    return decks

@router.get("/get-deck/{deck_id}", response_model=list[Deck])
def get_deck_by_id(deck_id : int, db : Session = Depends(get_db), user : dict = Depends(get_current_user)):
    decks = db.query(DeckDB).filter(DeckDB.user_id == user.id, DeckDB.id == deck_id).limit(30).all()

    if not decks:
        raise HTTPException(status_code=404, detail="Error, decks not found")

    return decks

@router.post("/add-deck", response_model=Deck)
def add_deck(deck : DeckCreate, db : Session = Depends(get_db), user : dict = Depends(get_current_user)):
    new_deck = DeckDB(name = deck.name, description = deck.description, user_id = user.id)

    db.add(new_deck)
    db.commit()
    db.refresh(new_deck)

    return new_deck

@router.put("/edit-deck", response_model=Deck)
def edit_deck(deck_id : int, edited_deck : DeckCreate, db : Session = Depends(get_db), user : dict = Depends(get_current_user)):
    deck_to_edit = db.query(DeckDB).filter(DeckDB.id == deck_id, DeckDB.user_id == user.id).first()

    if not deck_to_edit:
        raise HTTPException(status_code=404, detail="Error, deck not found")
    
    deck_to_edit.name = edited_deck.name
    deck_to_edit.description = edited_deck.description

    db.commit()
    db.refresh(deck_to_edit)

    return deck_to_edit

@router.delete("/delete-deck")
def delete_deck(deck_id : int, db : Session = Depends(get_db), user : dict = Depends(get_current_user)):
    deck_to_delete = db.query(DeckDB).filter(DeckDB.id == deck_id, DeckDB.user_id == user.id).first()

    if not deck_to_delete:
        raise HTTPException(status_code=404, detail="Error, deck not found")
    
    db.query(FlashcardDB).filter(FlashcardDB.deck_id == deck_id).delete()

    db.delete(deck_to_delete)
    db.commit()

    return {"message": f"Deck {deck_to_delete.name} deleted successfully"}

        