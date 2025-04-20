import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { getDecks } from '../config/DeckDevice'
import api from "../config/AxiosConfig"
import { leftArrowImg } from '../../utils'

const Test = () => {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        getDecks()
        .then(async data => {
            setDecks(data);
            const counts = {};

            for (const deck of data) {
                try {
                    const res = await api.get("http://127.0.0.1:8000/flash-cards/get-flashcard", {
                        params: {
                            deck_id: deck.id
                        }
                    });

                } catch (err) {
                    counts[deck.id] = 0;
                }
            }

        })
        .catch(err => {
            console.log(err);
        });
    }, []);


    return (
        <section className='py-100 px-20'>
            <div className='screen-max-width'>

                <div>
                    <h1 className='font-bold text-blue-600 text-xl sm:text-3xl'>Przetestuj swoje umiejętności</h1>
                    <p className='text-blue-500 my-10 text-sm sm:text-base'>Sprawdź jak dobrze przyswoiłeś wiedzię z danego zestawu fiszek</p>
                    <Link to="/panel" className='flex items-center'>
                        <button className='text-blue-600 cursor-pointer mr-5'>Powrót</button>
                        <img src={leftArrowImg} width={20} />
                    </Link>
                </div>
                <div>
                    {decks.length > 0 ? decks.map((deck, index) => (
                        <Link to={`/tests/${deck.id}`} key={index}>
                            <div className='bg-blue-600 my-30 p-20 text-white text-2xl rounded-xl hover:bg-blue-shadow transition-color duration-300 cursor-pointer'>
                                <p className='font-bold'>{deck.name}</p>
                                <p className='text-xl'>{deck.description}</p>
                            </div>
                        </Link>
                    )) : <p className='font-bold text-2xl mt-30 text-blue-600'>Brak folderów</p>}
                </div>
            </div>
        </section>
    )
}

export default Test