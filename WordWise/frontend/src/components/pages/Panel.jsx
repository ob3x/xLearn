import { panelBox } from "../../constants"
import { useEffect, useState } from "react"
import { plusImg } from "../../utils";
import { getDecks } from "../config/DeckDevice";
import { Link } from "react-router-dom";

const Panel = () => {
  const [decks, setDecks] = useState([])

  useEffect(() => {
    getDecks()
    .then(data => {
      setDecks(data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [])



  return (
    <main>
      <section className='bg-blue-500 py-50'>
        <div className='screen-max-width'>
          <h1 className='font-bold text-3xl'>Panel WordWise</h1>
          <p className='py-10'>Wybierz to co chcesz dzisiaj poćwiczyć</p>
          <div className='flex justify-between pt-40'>
            {panelBox.map((element, index) => (
              <a href={element.link} key={index} className='flex justify-center font-bold text-2xl items-center bg-blue-600 p-20 w-xs  rounded-xl transition-colors duration-150 hover:bg-blue-shadow'>
                <img src={element.img} alt={element.text} width={40} className='mr-10'/>
                <p>{element.text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-blue-600 py-100">
        <div className="screen-max-width">
          <h2 className="font-bold text-3xl">Szybki dostęp</h2>
          <p className="py-10">Szybki dostęp do wszystkich twoich zestawów fiszek</p>
          <div className="flex flex-wrap items-center mt-50">
            {decks.length > 0 ? decks.map(deck => (
              <div key={deck.id} className="flex flex-col justify-center items-center bg-blue-500 py-200 w-xs mr-50 mb-50 rounded-2xl hover:scale-105 transition-transform duration-200 cursor-pointer">
                <p className="font-bold text-2xl">{deck.name}</p>
                <p>{deck.description}</p>
              </div>
            )) : (
              <Link to="/decks-create">
                <div className="flex flex-col justify-center items-center bg-blue-500 py-200 w-xs h-xl mr-50 mb-50 rounded-2xl hover:scale-105 transition-transform duration-200 cursor-pointer">
                  <img src={plusImg} width={40}/>
                </div> 
              </Link> )
            }
          </div>
        </div>
      </section>
    </main>
  )
}

export default Panel