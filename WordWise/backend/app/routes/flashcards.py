from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from core.db import get_db
from models.model import FlashcardDB, DeckDB
from schemas.flashcards import FlashCreate, Flash
from routes.auth import get_current_user

router = APIRouter(
    prefix="/flash-cards",
    tags=["flash-cards"]
)

@router.get("/get-flashcard")
def get_flashcard(deck_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    deck = db.query(DeckDB).filter(DeckDB.id == deck_id, DeckDB.user_id == user.id).first()

    if not deck:
        raise HTTPException(status_code=404, detail="Error, deck not found")

    flashcards = db.query(FlashcardDB).filter(FlashcardDB.deck_id == deck.id).limit(50).all()

    if not flashcards:
        raise HTTPException(status_code=404, detail="Error, flashcards not found")

    return flashcards

@router.post("/add-flashcard", response_model=Flash)
def add_flashcard(flashcard: FlashCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    deck = db.query(DeckDB).filter(DeckDB.id == flashcard.deck_id, DeckDB.user_id == user.id).first()

    if not deck:
        raise HTTPException(status_code=404, detail="Error, deck not found")

    new_flashcard = FlashcardDB(front=flashcard.front, back=flashcard.back, deck_id=deck.id)

    db.add(new_flashcard)
    db.commit()
    db.refresh(new_flashcard)

    return new_flashcard

@router.put("/edit-flashcard", response_model=Flash)
def edit_flashcard(flashcard_id: int, flashcard: FlashCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    flashcard_to_edit = (
        db.query(FlashcardDB)
        .join(DeckDB)
        .filter(FlashcardDB.id == flashcard_id, DeckDB.user_id == user.id)
        .first()
    )

    if not flashcard_to_edit:
        raise HTTPException(status_code=404, detail="Error, flashcard not found or unauthorized")

    flashcard_to_edit.front = flashcard.front
    flashcard_to_edit.back = flashcard.back

    db.commit()
    db.refresh(flashcard_to_edit)

    return flashcard_to_edit

@router.delete("/delete-flashcard")
def delete_flashcard(flashcard_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    flashcard_to_delete = (
        db.query(FlashcardDB)
        .join(DeckDB)
        .filter(FlashcardDB.id == flashcard_id, DeckDB.user_id == user.id)
        .first()
    )

    if not flashcard_to_delete:
        raise HTTPException(status_code=404, detail="Error, flashcard not found or unauthorized")

    db.delete(flashcard_to_delete)
    db.commit()

    return {"message": f"Flashcard {flashcard_to_delete.front} deleted successfully"}
