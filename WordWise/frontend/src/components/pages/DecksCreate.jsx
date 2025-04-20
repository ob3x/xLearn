import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../config/AxiosConfig"
import { Link } from 'react-router-dom'
import { leftArrowImg } from "../../utils/index"

const DecksCreate = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const createDeck = () => {
    if (title.trim() == "" || description.trim() == "") {
      setError("Pola nie mogą być puste")
      return
    }

    api.post("http://127.0.0.1:8000/decks/add-deck", {name : title, description : description})
    .then(res => {
      setError("")
      navigate("/decks")
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <section className='py-100 px-20'>
      <div className='screen-max-width'>
        <h1 className='font-bold text-blue-600 text-3xl'>Stwórz nowy zestaw fiszek</h1>
        <Link to={`/decks`} className='flex items-center my-20'>
          <button className='text-blue-600 cursor-pointer mr-5'>Powrót</button>
          <img src={leftArrowImg} width={20} />
        </Link>
        <form className='flex flex-col' onSubmit={e => {
          e.preventDefault()
          createDeck()
        }}>
          <input type="text"
                name="title"
                placeholder="Wpisz tytuł"
                value={title}
                maxLength={15}
                onChange={(e) => setTitle(e.target.value)}
                className="my-20 px-30 py-15 rounded-xl bg-blue-500"/>

          <input type="text"
                name="title"
                placeholder="Opis"
                maxLength={27}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="my-20 px-30 py-15 rounded-xl bg-blue-500"/>
          <p className='text-blue-600 font-bold'>{error}</p>
          <button type="submit" className='button-class border-blue-600 font-bold second-button_hover hover:second-button mt-50'>Stwórz</button>
        </form>
      </div>
    </section>
  )
}

export default DecksCreate