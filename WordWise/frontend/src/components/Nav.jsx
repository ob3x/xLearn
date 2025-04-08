import React, { useEffect, useState } from 'react'
import { logoImg } from '../utils'
import { burgerImg, plusImg, pfpImg } from '../utils'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const [popupStatus, setPopupStatus] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setIsLoggedIn(false)
    }

    axios.get("http://127.0.0.1:8000/auth/profile", {headers: {
        Authorization: `Bearer ${token}`
      }})
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
    })
  }, [])


  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    navigate("/login")
  }
  
  return (
    <>
      {!isLoggedIn ? (
        <nav className='p-20 bg-white'>
          <div className='flex justify-between screen-max-width items-center'>
            <a href="/" className='flex items-center'>
              <span className='text-xl text-green-500 tracking-wider font-bold'>RocketCards</span>
              <img src={logoImg} alt='logo' width={30} className='mx-10' />
            </a>
            <div>
              <a href="/login" className='tracking-wider font-bold mx-20'>
                <button className='button-class hover:button-class_hover'>zaloguj się</button>
              </a>
              <a href="/register" className='tracking-wider font-bold'>
                <button className='button-class second-button hover:second-button_hover'>stwórz konto</button>
              </a>
            </div>
          </div>
        </nav>
      ) : (
        <nav className='py-20 bg-blue-600'>
          <div className='flex justify-between screen-max-width'>


            <button className='rounded-xl p-5 cursor-pointer hover:bg-blue-500 transition .3s'>
              <img width={30} src={burgerImg} alt="burger-icon" />
            </button>


            <div className='flex items-center gap-5 relative'>

              <button className='bg-blue-500 rounded-xl p-5 cursor-pointer hover:bg-blue-600 transition .3s'>
                <img width={30} src={plusImg} alt="plus-icon" />
              </button>

              <button onClick={() => setPopupStatus(!popupStatus)}>
                <img width={40} className="rounded-3xl ml-15 cursor-pointer" src={pfpImg} alt="profile-icon" />
              </button>

              {popupStatus &&
              <div className='absolute flex flex-col justify-center items-center top-1/2 py-10 border-1 border-gray-400 rounded-xl bg-blue-600 min-w-250'>
                <div className='flex items-center text-xs'>
                  <img width={70} className="rounded-4xl" src={pfpImg} alt="profile-icon" />
                  <div className="ml-10">
                    <p className='font-bold'>Szymon Safiańczuk</p>
                    <p>safianczukszymon@gmail.com</p>
                  </div>
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
      )}
    </>
  )
}


export default Nav