import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useDeck from "../config/DeckHook"
import api from "../config/AxiosConfig"
import { leftArrowImg, plusImg, trashImg } from '../../utils'

const AddFlashCards = () => {
  const { deckId } = useParams()
  const { deck, loading } = useDeck(deckId)
  const [decks, setDecks] = useState([]) // tylko do wyświetlania
  const [updatedDecks, setUpdatedDecks] = useState([]) // edytowane dane
  const [error, setError] = useState({});

  useEffect(() => {
    api.get("http://127.0.0.1:8000/flash-cards/get-flashcard", {
      params: {
        deck_id: deckId
      }
    })
    .then(res => {
      setDecks(res.data)
      setUpdatedDecks(res.data)
    })
    .catch(err => {
      console.error("Error fetching flashcards:", err.response?.data || err.message);
    });
  }, [deckId]);

  if (loading) return <div>Loading...</div>

  const deleteFlashCard = (flashcardID) => {
    const toDelete = updatedDecks.find(f => f.id === flashcardID)
    
    if (toDelete?.isNew) {
      setDecks(decks.filter(f => f.id !== flashcardID))
      setUpdatedDecks(updatedDecks.filter(f => f.id !== flashcardID))
      return
    }

    api.delete("http://127.0.0.1:8000/flash-cards/delete-flashcard", {
      params: { flashcard_id: flashcardID }
    })
    .then(() => {
      setDecks(decks.filter(f => f.id !== flashcardID))
      setUpdatedDecks(updatedDecks.filter(f => f.id !== flashcardID))
    })
    .catch(err => console.log(err))
  }

  const addFlashCard = () => {
    const newFlashCard = {
      id: Date.now(), // tymczasowe ID
      front: "",
      back: "",
      deck_id: deck[0].id,
      isNew: true
    };
    setDecks([...decks, newFlashCard]);
    setUpdatedDecks([...updatedDecks, newFlashCard]);
  }

  const saveChanges = () => {
    let invalidFields = false;
    const newError = {};

    updatedDecks.forEach(flashcard => {
      if (!flashcard.front || !flashcard.back) {
        invalidFields = true;
        newError[flashcard.id] = "Uzupełnij wszystkie pola";
      }
    });

    if (invalidFields) {
      setError(newError);
      return;
    }

    updatedDecks.forEach(flashcard => {
      if (flashcard.isNew) {
        api.post("http://127.0.0.1:8000/flash-cards/add-flashcard", {
          front: flashcard.front,
          back: flashcard.back,
          deck_id: flashcard.deck_id
        })
        .then(res => console.log("Dodano:", res.data))
        .catch(err => console.log("Błąd dodawania:", err))
      } else {
        api.put("http://127.0.0.1:8000/flash-cards/edit-flashcard", {
          front: flashcard.front,
          back: flashcard.back,
          deck_id: flashcard.deck_id
        }, {
          params: { flashcard_id: flashcard.id }
        })
        .then(res => console.log("Zaktualizowano:", res.data))
        .catch(err => console.log("Błąd aktualizacji:", err))
      }
    });

    setError({})
  }

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    const updated = updatedDecks.map(flashcard =>
      flashcard.id === id ? { ...flashcard, [name]: value } : flashcard
    );
    setUpdatedDecks(updated);
  }

  return (
    <section className='py-100 px-20'>
      <div className='screen-max-width'>
        <div className='flex justify-between'>
          <div>
            <h1 className='text-blue-600 font-bold text-xl sm:text-3xl'>Dodaj lub edytuj fiszki</h1>
            <p className='text-blue-500 font-bold my-10 text-sm sm:text-base'>Zestaw: {deck[0].name}</p>
            <Link to={`/decks/${deckId}`} className='flex items-center'>
              <button className='text-blue-600 cursor-pointer mr-5'>Powrót</button>
              <img src={leftArrowImg} width={20} />
            </Link>
          </div>
          <button
            className='button-class second-button_hover px-40 sm:px-60 md:px-90 font-bold text-sm md:text-2xl  hover:bg-blue-shadow'
            onClick={saveChanges}
          >
            Zapisz
          </button>
        </div>

        <div>
          {updatedDecks.length > 0 ? updatedDecks.map((element, index) => (
            <div className='bg-blue-600 p-20 rounded-2xl my-30' key={element.id}>
              <div className='flex justify-between items-center'>
                <span className='font-bold'>{index + 1}</span>
                <img
                  src={trashImg}
                  alt='usuń'
                  width={35}
                  className='cursor-pointer p-5 rounded-xl hover:bg-blue-500 transition-colors duration-150'
                  onClick={() => deleteFlashCard(element.id)}
                />
              </div>
              <div className='h-2 w-full bg-white my-10'></div>
              <div className='flex justify-between items-center mt-50'>
                <input
                  name="back"
                  value={element.back || ""}
                  onChange={(e) => handleInputChange(e, element.id)}
                  maxLength={30}
                  className='bg-blue-500 p-15 w-7/15 rounded-xl font-bold'
                  placeholder='Pojęcie'
                />
                <input
                  name="front"
                  value={element.front || ""}
                  onChange={(e) => handleInputChange(e, element.id)}
                  maxLength={30}
                  className='bg-blue-500 p-15 w-7/15 rounded-xl font-bold'
                  placeholder='Definicja'
                />
              </div>
              {error[element.id] && (
                <p className='font-bold mt-20'>{error[element.id]}</p>
              )}
            </div>
          )) : <p>Brak fiszek</p>}

          <div
            className='flex justify-center items-center bg-blue-600 p-20 rounded-2xl my-30 transition-colors duration-200 hover:bg-blue-500 cursor-pointer'
            onClick={addFlashCard}
          >
            <img src={plusImg} width={50} alt='dodaj' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddFlashCards
