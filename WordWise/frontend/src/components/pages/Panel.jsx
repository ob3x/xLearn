import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { flashcardImg, examImg, learnImg } from "../../utils/index"

const panelBox = [
  {
    text : "Fiszki",
    link : "/flashcards",
    img : flashcardImg
  },
  {
    text : "Ucz się",
    link : "/learn",
    img : examImg
  },
  {
    text : "Test",
    link : "/tests",
    img : learnImg
  },
]

const Panel = () => {
  return (
    <section className='bg-blue-500 py-50'>
      <div className='screen-max-width'>
        <h1 className='font-bold text-3xl'>Panel WordWise</h1>
        <p className='py-10'>Wybierz to co chcesz dzisiaj poćwiczyć</p>
        <div className='flex justify-between pt-40'>
          {panelBox.map(element => (
            <a href={element.link} className='flex justify-center font-bold text-2xl items-center bg-blue-600 p-20 w-1/4 rounded-xl duration-150 hover:bg-blue-shadow'>
              <img src={element.img} alt={element.text} width={40} className='mr-10'/>
              <p>{element.text}</p>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Panel