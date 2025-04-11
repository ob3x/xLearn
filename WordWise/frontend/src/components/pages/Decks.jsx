import React from 'react'
import { Link } from "react-router-dom"

const Decks = () => {

    return (
        <section className='py-100'>
            <div className='screen-max-width'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='font-bold text-3xl text-blue-600 mb-10'>Stwórz swój zestaw fiszek</h1>
                        <p className='text-blue-500'>Stwórz folder z fiszkami i wróć do niego w każdej chwili</p>
                    </div>
                    <Link to="/flashcards">
                        <button className='button-class second-button_hover px-90 py-20 font-bold border-3 text-2xl border-blue-600 hover:second-button'>Stwórz</button>
                    </Link>

                </div>
                <div className='flex items-center mt-100'>
                    <p className='text-blue-600 font-bold mr-10'>Foldery</p>
                    <div className='h-1 w-full bg-blue-600'></div>
                </div>
            </div>
        </section>
    )
}

export default Decks