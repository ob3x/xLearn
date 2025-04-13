import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { leftArrowImg } from '../../utils'
import api from "../config/AxiosConfig"

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [secondNewPassword, setSecondNewPassword] = useState("")
  const [error, setError] = useState("")

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
  
      
    const token = localStorage.getItem("token");
    
    api.post("http://localhost:8000/auth/change-password", 
      {
        current_password: currentPassword,
        password: newPassword,
        second_password: secondNewPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
  


  return (
      <section className='py-100'>
          <div className='screen-max-width'>
            <div>
              <h1 className='font-bold text-blue-600 text-3xl'>Ustawienia</h1>
              <p className='text-blue-500 my-10'>Zmień zdjęcie profilowe, hasło lub usuń konto</p>
              <Link to="/panel" className='flex items-center'>
                <button className='text-blue-600 cursor-pointer mr-5'>Powrót</button>
                <img src={leftArrowImg} width={20} />
              </Link>
            </div>
            <div className='my-50'>
              <h2 className='font-bold text-blue-600 text-2xl'>Zmień hasło</h2>
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
            </div>
          </div>
      </section>
  )
}

export default Settings