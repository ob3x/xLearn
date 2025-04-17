import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './AxiosConfig';

const useDeck = (deckId) => {
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!deckId) return;

    api.get(`http://127.0.0.1:8000/decks/get-deck/${deckId}`)
    .then(res => {
      setDeck(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Nie znaleziono decka:", err.response?.data || err.message);
      navigate("/panel");
    });
  }, [deckId, navigate]);

  return { deck, loading };
};

export default useDeck;
