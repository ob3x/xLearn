import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useDeck from "../config/DeckHook"
import api from "../config/AxiosConfig"
import { leftArrowImg } from '../../utils'

const StartTest = () => {
  const { deckId } = useParams()
  const { deck, loading } = useDeck(deckId)
  const [decks, setDecks] = useState([])
  const [flipped, setFlipped] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    api.get("http://127.0.0.1:8000/flash-cards/get-flashcard", {
      params: {
        deck_id: deckId
      }
    })
      .then(res => setDecks(res.data))
      .catch(err => console.error("Error fetching flashcards:", err.response?.data || err.message));
  }, [deckId])

  if (loading) return <p>Loading...</p>

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1)
    if (currentCard + 1 < decks.length) {
      setCurrentCard(currentCard + 1)
      setFlipped(false)
    } else {
      setShowResult(true)
    }
  }

  const resetTest = () => {
    setScore(0)
    setCurrentCard(0)
    setShowResult(false)
    setFlipped(false)
  }

  return (
    <section className='py-100 px-20'>
      <div className='screen-max-width'>
        <h1 className='text-blue-600 font-bold text-xl sm:text-3xl'>Zestaw: {deck[0].name}</h1>
        <p className='text-blue-500 my-10 text-sm sm:text-base'>Kliknij w przycisk "Dobrze" jeśli odpowiedziałeś dobrze, a w przycisk "Źle" jeśli odpowiedziałeś źle</p>
        <Link to={`/tests`} className='flex items-center'>
          <button className='text-blue-600 cursor-pointer mr-5'>Powrót</button>
          <img src={leftArrowImg} width={20} />
        </Link>

        {decks.length > 0 ? (
          <>
            {showResult ? (
              <div className='mt-50 text-center'>
                <h2 className='text-blue-600 font-bold text-3xl mb-20'>
                  Twój wynik: {score} / {decks.length}
                </h2>
                <button
                  onClick={resetTest}
                  className='button-class second-button_hover px-90 py-20 font-bold text-xl border-3 border-blue-600 hover:second-button'
                >
                  Zakończ
                </button>
              </div>
            ) : (
              <div className='mt-50'>
                <div
                  className={`relative w-full h-500 shadow-2xl bg-gradient-to-b from-blue-400 to-blue-600 font-bold text-xl sm:text-5xl rounded-2xl transition-transform duration-300 
                  transform-style preserve-3d ${flipped ? 'rotate-x-180' : ''}`}
                  onClick={() => setFlipped(!flipped)}
                >
                  <div className='absolute w-full h-full backface-hidden flex items-center justify-center'>
                    <p>{decks[currentCard].front}</p>
                  </div>
                  <div className='absolute w-full h-full backface-hidden rotate-x-180 flex items-center justify-center'>
                    <p>{decks[currentCard].back}</p>
                  </div>
                </div>

                <div className='flex items-center justify-center mt-30 text-3xl font-bold'>
                  <button onClick={() => handleAnswer(true)} className="cursor-pointer bg-blue-600 mx-30 py-10 px-30 rounded-xl hover:bg-blue-shadow transition-colors duration-200">
                    Dobrze
                  </button>
                  <button onClick={() => handleAnswer(false)} className="cursor-pointer bg-blue-600 mx-30 py-10 px-30 rounded-xl hover:bg-blue-shadow transition-colors duration-200">
                    Źle
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            <p className='text-blue-600 font-bold text-2xl my-20'>Musisz dodać fiszki, żeby rozpocząć test!</p>
            <Link to={`/decks/add-flashcards/${deckId}`}>
              <button className='button-class second-button_hover px-90 py-20 font-bold text-xl border-3 border-blue-600 hover:second-button'>
                Dodaj
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default StartTest
