import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { closeImg, DeleteWhiteImg, EditWhiteImg, LearnWhiteImg, leftArrowImg } from '../../utils'
import api from "../config/AxiosConfig"
import useDeck from "../config/DeckHook"

const DecksElement = () => {
  const navigate = useNavigate()
  const { deckId } = useParams()
  const [showPopup, setShowPopup] = useState(false)
  const { deck, loading } = useDeck(deckId)

  if (loading) {
    return <div>Loading...</div>
  }

  const deleteItem = async () => {
    await api.delete("http://127.0.0.1:8000/decks/delete-deck", {
      params: {
        deck_id : deckId
      }
    })
    .then(res => {
      navigate("/decks")
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <section className='py-100 px-20'>
      <div className='screen-max-width'>
        <h1 className='font-bold text-xl sm:text-3xl text-blue-600'>Panel</h1>
        <p className='text-blue-500 py-10 text-sm sm:text-base'>W panelu masz dostęp do wszystkich opcji zarządzania twoim zestawem, możesz go odpalić, edytować lub usunąc</p>
        <Link to={`/decks`} className='flex items-center'>
          <button className='text-blue-600 cursor-pointer mr-5'>Powrót</button>
          <img src={leftArrowImg} width={20} />
        </Link>
        <div className='flex flex-col lg:flex-row justify-between mt-50'>
          <Link to={`/decks/flashcards/${deckId}`}>
              <button className='flex justify-center lg:justify-between items-center button-class second-button_hover px-90 py-20 font-bold text-xs md:text-xl w-full lg:w-auto hover:bg-blue-shadow'>
                <img src={LearnWhiteImg} className="mr-10" width={35} alt="start"/>
                <p>Zacznij naukę</p>
              </button>
          </Link>
          <Link to={`/decks/add-flashcards/${deckId}`}>
              <button className='flex justify-center lg:justify-between items-center button-class second-button_hover px-90 py-20 font-bold text-xs md:text-xl w-full lg:w-auto hover:bg-blue-shadow'>
                <img src={EditWhiteImg} className="mr-10" width={35} alt="edit"/>
                <p>Dodaj fiszki</p>
              </button>
          </Link>
          <button className='flex justify-center lg:justify-between items-center button-class second-button_hover px-90 py-20 font-bold text-xs md:text-xl w-full lg:w-auto hover:bg-blue-shadow' onClick={() => setShowPopup(!showPopup)}>
            <img src={DeleteWhiteImg} className="mr-10" width={35} alt="delete"/>
            <p>Usuń</p>
          </button>
        </div>
      </div>
      {showPopup &&
      <>
        <div className='fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-blue-600 p-30 rounded-2xl z-10'>
          <div className='flex justify-between items-start'>
            <div className='mr-20 lg:mr-100'>
              <h3 className='font-bold text-md md:text-2xl'>Usunąć ten zestaw?</h3>
              <p className='my-10 text-xs md:text-base'>Jesteś pewny, że chcesz usunąć ten zestaw?</p>
            </div>
            <img src={closeImg} alt='zamknij' width={25} className='cursor-pointer' onClick={() => setShowPopup(!showPopup)}/>
          </div>
        <div>
          <button className='button-class second-button px-90 py-10 md:py-20 mt-20 md:mt-50 w-full font-bold text-md md:text-xl hover:second-button_hover' onClick={deleteItem}>Usuń</button>
        </div>
      </div>
      <div className='fixed top-0 left-0 w-full h-full bg-popup-shadow z-5'></div>
      </>}
    </section>
  )
}

export default DecksElement