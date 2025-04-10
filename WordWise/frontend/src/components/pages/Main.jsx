import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
  const [flipped, setFlipped] = useState(false)

  return (
    <main>
      <section className='screen-max-width py-100'>
        <div className='flex justify-between items-center'>
          <div className='text-blue-500'>
            <h1 className='text-blue-600 font-bold text-3xl'>Zacznij naukę z RocketCards</h1>
            <p className='my-20'>Załóż konto i zobacz jak twój angielski wystrzela w kosmos!</p>
            <Link to="/register" className="tracking-wider font-bold">
                <button className='button-class second-button hover:second-button_hover'>Załóż konto</button>
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
        <div>elo</div>
      </section>
    </main>
  )
}

export default Main