import React, { useEffect, useState } from 'react'
import { logoWhiteImg, plusImg, pfpImg } from '../../utils'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Nav = ({ setIsAuthenticated }) => {
  const [popupStatus, setPopupStatus] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    axios.get("http://127.0.0.1:8000/auth/profile", {headers: {
        Authorization: `Bearer ${token}`
      }})
    .then(res => {
        setUsername(res.data.username);
        setEmail(res.data.email);
    })
    .catch(err => {
        console.log(err);
    })
  }, [])


  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    navigate("/login")
  }
  
  return (
    <nav className='py-20 bg-blue-600'>
        <div className='flex justify-between screen-max-width'>

            <Link to="/panel"> 
              <img width={30} src={logoWhiteImg} alt="burger-icon" />
            </Link>


            <div className='flex items-center gap-5 relative'>
              <Link to="/decks-create">
                <button className='bg-blue-500 rounded-xl p-5 cursor-pointer hover:bg-blue-600 transition-colors duration-300'>
                  <img width={30} src={plusImg} alt="plus-icon" />
                </button> 
              </Link>

              <button onClick={() => setPopupStatus(!popupStatus)}>
                <img width={40} className="rounded-3xl ml-15 cursor-pointer" src={pfpImg} alt="profile-icon" />
              </button>

              {popupStatus &&
              <div className='absolute flex flex-col justify-center items-center top-50 right-0 py-10 px-6 border-1 border-gray-400 rounded-xl bg-blue-600 min-w-280 z-50'>
                <div className='text-center text-xs flex flex-col items-center'>
                  <img width={70} className="rounded-full" src={pfpImg} alt="profile-icon" />
                  {username ? ( 
                    <div>
                    <p className='font-bold my-5'>{username}</p>
                    <p>{email}</p>
                  </div>) : <p>Ładowanie ...</p>}
                </div>
                <div className='bg-gray-400 h-1 w-full my-10'></div>

                {["Ustawienia", "Polityka prywatności", "Regulamin"].map(element => (
                  <button className='popup-button hover:popup-button_hover'>{element}</button>
                ))}

                <div className='bg-gray-400 h-1 w-full my-10'></div>

                <button onClick={handleLogout} className='popup-button hover:popup-button_hover'>Wyloguj się</button>
                
              </div>
              }
            </div>
          </div>
        </nav>
  )
}


export default Nav