import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { getDecks } from '../config/DeckDevice'
import api from "../config/AxiosConfig"

const Decks = () => {
    const [decks, setDecks] = useState([]);
    const [flashcardCounts, setFlashcardCounts] = useState({});

    useEffect(() => {
        getDecks()
        .then(async data => {
            setDecks(data);

            const token = localStorage.getItem("token");
            const counts = {};

            for (const deck of data) {
                try {
                    const res = await api.get("http://127.0.0.1:8000/flash-cards/get-flashcard", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        params: {
                            deck_id: deck.id
                        }
                    });
                    counts[deck.id] = res.data.length;

                } catch (err) {
                    counts[deck.id] = 0;
                }
            }

            setFlashcardCounts(counts);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <section className='py-100'>
            <div className='screen-max-width'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='font-bold text-3xl text-blue-600 mb-10'>Stwórz swój zestaw fiszek</h1>
                        <p className='text-blue-500'>Stwórz folder z fiszkami i wróć do niego w każdej chwili</p>
                    </div>
                    <Link to="/decks-create">
                        <button className='button-class second-button_hover px-90 py-20 font-bold border-3 text-2xl border-blue-600 hover:second-button'>Stwórz</button>
                    </Link>
                </div>
                <div className='flex items-center mt-100'>
                    <p className='text-blue-600 font-bold mr-10'>Foldery</p>
                    <div className='h-1 w-full bg-blue-600'></div>
                </div>
                <div>
                    {decks.length > 0 ? decks.map((deck, index) => (
                        <Link to={`/decks/${deck.id}`} key={index}>
                            <div className='bg-blue-600 my-30 p-20 text-white text-2xl rounded-xl hover:bg-blue-shadow transition-color duration-300 cursor-pointer'>
                                <p className='text-xl'>Liczba fiszek : {flashcardCounts[deck.id] ?? '...' }</p>
                                <p className='font-bold'>{deck.name}</p>
                                <p className='text-xl'>{deck.description}</p>
                            </div>
                        </Link>
                    )) : <p className='font-bold text-2xl mt-30 text-blue-600'>Brak folderów</p>}
                </div>
            </div>
        </section>
    );
};


export default Decks;
