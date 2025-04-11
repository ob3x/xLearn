import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { learnImg, leftArrowImg, rightArrowImg } from '../../utils'
import { flashCardsTest } from '../../constants'

const Main = () => {
  const [flipped, setFlipped] = useState(false)
  const [flippedSecond, setFlippedSecond] = useState(false)
  const [flashCardNumber, setFlashCardNumber] = useState(0)

  return (
    <main>
      <section className='screen-max-width pt-200 pb-100'>
        <div className='flex justify-between items-center'>
          <div className='text-blue-500'>
            <h1 className='text-blue-600 font-bold text-3xl'>Zacznij naukę z RocketCards</h1>
            <p className='my-20'>Załóż konto i zobacz jak twój angielski wystrzela w kosmos!</p>
            <Link to="/register" className="tracking-wider font-bold">
                <button className='button-class second-button_hover border-3 border-blue-600 hover:second-button'>Załóż konto</button>
            </Link>
          </div>
          <div>
          <div className="flex items-center justify-center">
            <div
              className="relative w-250 h-400 perspective flex flex-col items-center"
              onClick={() => setFlipped(!flipped)}
            >
              <div className={`transition-transform duration-500 transform-style preserve-3d w-full h-full ${flipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute w-full h-full shadow-2xl bg-gradient-to-b from-blue-400 to-blue-600 text-white rounded-xl flex items-center justify-center backface-hidden">
                  <p className="text-center text-2xl font-semibold">Rocket</p>
                </div>

                <div className="absolute w-full h-full shadow-2xl bg-gradient-to-b from-blue-400 to-blue-600 text-white rounded-xl flex items-center justify-center rotate-y-180 backface-hidden">
                  <p className="text-center text-2xl font-semibold">Rakieta</p>
                </div>
              </div>
              <div className='flex my-10'>
                <div className={`w-10 h-10 rounded-4xl bg-gray-200 mx-3 ${flipped ? "bg-gray-300" : ""}`}></div>
                <div className={`w-10 h-10 rounded-4xl bg-gray-200 mx-3 ${!flipped ? "bg-gray-300" : ""}`}></div>
              </div>
              <p className='text-gray-400'>Kliknij w fiszkę</p>
            </div>
          </div>  
          </div>
        </div>
      </section>
      <section className='bg-blue-600'>
        <div className='screen-max-width flex justify-between items-center py-100'>
        <img src={learnImg} width={200}/>
        <div>
          <h2 className='font-bold text-3xl mb-10'>Przetestuj pełne możliwości naszej aplikacji</h2>
          <p>Żeby stworzyć zestaw fiszek przejdź do zakładki załóż konto i zacznij już teraz!</p>
        </div>
        </div>
      </section>
      <section>
        <div className='screen-max-width py-100'>
          <h2 className='text-blue-600 font-bold text-3xl'>Przetestuj aplikację bez zakładania konta</h2>
          <p className='text-blue-500 mt-20 mb-50'>Już teraz możesz wypróbowac działanie naszej aplikacji w praktyce, zacznij się uczyć na naszym testowym zestawie już teraz!</p>
          <div>
            <div>
              {/* {flashCardsTest.map(element => (
                element.visibility == true ?  */}
                <div className={`relative w-full h-500 shadow-2xl bg-gradient-to-b from-blue-400 to-blue-600 font-bold text-5xl rounded-2xl transition-transform duration-700 
                  transform-style preserve-3d ${flippedSecond ? 'rotate-y-180' : ''}`}
                  onClick={() => setFlippedSecond(!flippedSecond)}>

                <div className='absolute w-full h-full backface-hidden flex items-center justify-center'>
                    <p>{flashCardsTest[flashCardNumber].front}</p>
                  </div>

                  <div className='absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center'>
                    <p>{flashCardsTest[flashCardNumber].back}</p>
                  </div>

                </div>
              {/* ))} */}
              <div>
                <div className='flex items-center justify-center mt-30'>

                  <button className="cursor-pointer" onClick={() => {
                    setFlashCardNumber(prev => Math.max(prev - 1, 0));
                    setFlippedSecond(false)
                  }}>
                    <img src={leftArrowImg} alt="left-arrow" width={55} className='border-3 border-blue-500 p-5 rounded-xl hover:bg-shadow transition-colors duration-300'/>
                  </button>

                  <p className='text-blue-500 mx-30 text-3xl font-bold'>{flashCardNumber + 1}/{flashCardsTest.length}</p>

                  <button className="cursor-pointer" onClick={() => {
                    setFlashCardNumber(prev => Math.min(prev + 1, flashCardsTest.length - 1));
                    setFlippedSecond(false)
                  }}>
                    <img src={rightArrowImg} alt='right-arrow' width={55} className='border-3 border-blue-500 p-5 rounded-xl hover:bg-shadow transition-colors duration-300'/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Main