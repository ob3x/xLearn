import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { leftArrowImg } from "../../utils/index"
import api from "../config/AxiosConfig"
import { rightArrowImg } from '../../utils/index'

const Learn = () => {
    const [decks, setDecks] = useState([])
    const [flippedSecond, setFlippedSecond] = useState(false)
    const [flashCardNumber, setFlashCardNumber] = useState(0)

    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const decksResponse = await api.get("http://localhost:8000/decks/get-deck");
                const allFlashCards = [];
    
                for (let deck of decksResponse.data) {
                    try {
                        const flashCardsResponse = await api.get("http://127.0.0.1:8000/flash-cards/get-flashcard", {
                            params: {
                                deck_id: deck.id
                            }
                        });
                        allFlashCards.push(...flashCardsResponse.data);
                    } catch (err) {
                        console.log(err);
                    }
                }
    
                setDecks(allFlashCards);
            } catch (err) {
                console.log(err);
            }
        };
    
        fetchDecks();
    }, []);

    return (
        <section className='py-100 px-20'>
            <div className='screen-max-width'>
                <h1 className='font-bold text-blue-600 text-xl sm:text-3xl'>Zacznij naukę</h1>
                <p className='text-sm sm:text-base text-blue-500 my-10'>W zakładcę "Nauka" przerabiasz wszystkie twoje zestawy fiszek w jednym miejscu!</p>
                <Link to={`/panel`} className='flex items-center'>
                    <button className='text-blue-600 cursor-pointer mr-5'>Powrót</button>
                    <img src={leftArrowImg} width={20} />
                </Link>
                
                {decks.length > 0 ? (
                          <div className='mt-50'>
                            <div>
                                <div className={`relative w-full h-500 shadow-2xl bg-gradient-to-b from-blue-400 to-blue-600 font-bold text-xl sm:text-5xl rounded-2xl transition-transform duration-300 
                                  transform-style preserve-3d ${flippedSecond ? 'rotate-x-180' : ''}`}
                                  onClick={() => setFlippedSecond(!flippedSecond)}>
                
                                <div className='absolute w-full h-full backface-hidden flex items-center justify-center'>
                                    <p>{decks[flashCardNumber].front}</p>
                                  </div>
                
                                  <div className='absolute w-full h-full backface-hidden rotate-x-180 flex items-center justify-center'>
                                    <p>{decks[flashCardNumber].back}</p>
                                  </div>
                
                                </div>
                              <div>
                                <div className='flex items-center justify-center mt-30'>
                
                                  <button className="cursor-pointer" onClick={() => {
                                    setFlashCardNumber(prev => Math.max(prev - 1, 0));
                                    setFlippedSecond(false)
                                  }}>
                                    <img src={leftArrowImg} alt="left-arrow" width={55} className='border-3 border-blue-500 p-5 rounded-xl hover:bg-shadow transition-colors duration-300'/>
                                  </button>
                
                                  <p className='text-blue-500 mx-30 text-3xl font-bold'>{flashCardNumber + 1}/{decks.length}</p>
                
                                  <button className="cursor-pointer" onClick={() => {
                                    setFlashCardNumber(prev => Math.min(prev + 1, decks.length - 1));
                                    setFlippedSecond(false)
                                  }}>
                                    <img src={rightArrowImg} alt='right-arrow' width={55} className='border-3 border-blue-500 p-5 rounded-xl hover:bg-shadow transition-colors duration-300'/>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          ) : <p className='text-blue-600 font-bold text-2xl my-20'>Musisz dodać fiszki żeby je tutaj zobaczyć!</p>
                          }

            </div>
        </section>
    )
}

export default Learn