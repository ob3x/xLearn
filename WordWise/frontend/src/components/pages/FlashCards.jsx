import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useDeck from "../config/DeckHook"
import api from "../config/AxiosConfig"

const FlashCards = () => {
  const navigate = useNavigate()
  const { deckId } = useParams()
  const { deck, loading } = useDeck(deckId)

  
  
  useEffect(() => {
    const token = localStorage.getItem("token")
    api.get("http://127.0.0.1:8000/flash-cards/get-flashcard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        deck_id: deckId
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error("Error fetching flashcards:", err.response?.data || err.message);
    });
  }, [deckId]);
  
  if (loading) {
    return <div>Loading...</div>
  }
  
  
  return (
    <div>
      <h1 className='text-blue-600'>Add Flash Cards for Deck: {deck.name}</h1>
    </div>
  )
}

export default FlashCards
