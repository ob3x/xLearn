import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { leftArrowImg } from '../../utils'
import api from "../config/AxiosConfig"
import { closeImg } from '../../utils'

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [secondNewPassword, setSecondNewPassword] = useState("")
  const [error, setError] = useState("")
  const [showPopup, setShowPopup] = useState(false)

  const navigate = useNavigate()

  const changePassword = () => {
    if (
      currentPassword.trim() === "" ||
      newPassword.trim() === "" ||
      secondNewPassword.trim() === ""
    ) {
      setError("Pola nie mogą być puste");
      return;

    } else if(newPassword.trim() !== secondNewPassword.trim()) {
      setError("Hasła muszą być takie same");
      return

    } else if(newPassword.trim() == currentPassword.trim()) {
      setError("Nie ustawiłeś nowego hasła")
      return

    }
    
    api.post("http://localhost:8000/auth/change-password", 
      {
        current_password: currentPassword,
        password: newPassword,
        second_password: secondNewPassword
      }
    )
    .then(res => {
      setError("Pomyślnie zmieniono hasło, za 3 sekundy nastąpi wylogowanie")
      localStorage.removeItem("token")
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    })
    .catch(err => {
      setError("Niepoprawne hasło")
      console.log(err);
    })
  }

  const deleteAccount = () => {
    api.delete("http://localhost:8000/user/delete-currentuser")
    .then(() => {
      localStorage.removeItem("token")
      navigate("/login")
    })
    .catch(err => {
      console.log(err);
    })
  }
  


  return (
      <section className='py-100 px-20'>
          <div className='screen-max-width'>
            <div>
              <h1 className='font-bold text-blue-600 text-xl sm:text-3xl'>Ustawienia</h1>
              <p className='text-blue-500 my-10 text-sm sm:text-base'>Zmień zdjęcie profilowe, hasło lub usuń konto</p>
              <Link to="/panel" className='flex items-center'>
                <button className='text-blue-600 cursor-pointer mr-5'>Powrót</button>
                <img src={leftArrowImg} width={20} />
              </Link>
            </div>
            <div className='my-50'>
              <h2 className='font-bold text-blue-600 text-xl sm:text-2xl'>Zmień hasło</h2>
              <form action="login" className='flex flex-col' onSubmit={e => {
                e.preventDefault()
                changePassword()
              }}>
                <input type="text"
                  name="password"
                  value={currentPassword}
                  autoComplete="password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Stare hasło"
                  maxLength={30}
                  className="my-20 px-30 py-15 rounded-xl bg-blue-500"/>
                <input type="text" 
                  value={newPassword}
                  autoComplete='current-password'
                  onChange={(e) => setNewPassword(e.target.value)} 
                  placeholder="Nowe hasło"
                  maxLength={30}
                  name="password"
                  className='my-20 px-30 py-15 rounded-xl bg-blue-500'/>
                <input type="text" 
                  value={secondNewPassword}
                  autoComplete='current-password'
                  onChange={(e) => setSecondNewPassword(e.target.value)} 
                  placeholder="Powtórz nowe hasło"
                  maxLength={30}
                  name="password"
                  className='my-20 px-30 py-15 rounded-xl bg-blue-500'/>
                <p className='text-blue-500 my-10 font-bold'>{error && error}</p>
                <button type="submit" className='button-class border-blue-600 font-bold second-button_hover hover:second-button mt-50'>Zmień hasło</button>
              </form>
              <h2 className='font-bold text-blue-600 text-xl sm:text-2xl mt-50'>Usuń konto</h2>
              <button className='button-class border-blue-600 font-bold second-button_hover hover:second-button mt-30' onClick={() => setShowPopup(!showPopup)}>Usuń konto</button>
            </div>
            {showPopup &&
                  <>
                    <div className='fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-blue-600 p-30 rounded-2xl z-10'>
                      <div className='flex justify-between items-start'>
                        <div className='mr-20 lg:mr-100'>
                          <h3 className='font-bold text-md md:text-2xl'>Usunąć konto?</h3>
                          <p className='my-10 text-xs md:text-base'>Jesteś pewny, że chcesz usunąć swoje konto? Ten proces jest nieodwracalny.</p>
                        </div>
                        <img src={closeImg} alt='zamknij' width={25} className='cursor-pointer' onClick={() => setShowPopup(!showPopup)}/>
                      </div>
                    <div>
                      <button className='button-class second-button px-90 py-10 md:py-20 mt-20 md:mt-50 w-full font-bold text-md md:text-xl hover:second-button_hover' onClick={deleteAccount}>Usuń</button>
                    </div>
                  </div>
                  <div className='fixed top-0 left-0 w-full h-full bg-popup-shadow z-5'></div>
              </>}
          </div>
      </section>
  )
}

export default Settings