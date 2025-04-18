import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Register = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  
  const navigate = useNavigate()

  const registerUser = () => {
    if (username.trim() == "" || email.trim() == "" || password.trim() == "") {
      setError("Pola nie mogą być puste")
      return
    }

    axios.post("http://127.0.0.1:8000/auth/register", { username: username, email: email, password: password })
      .then(res => {
        axios.post("http://127.0.0.1:8000/auth/token", 
          new URLSearchParams({
            username : username,
            password : password
          }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
          .then(res => {
            if (res.data.access_token) {
              localStorage.setItem("token", res.data.access_token)
              setIsAuthenticated(true)
              navigate("/panel")
            }
          })
          .catch (err => {
            setError("Coś poszło nie tak podczas rejestracji")
          })
      })
      .catch(err => {
        setError("Konto już istnieje")
      });
  };
  


  return (
    <section className='pt-200 pb-100'>
      <div className='flex flex-col justify-center items-center'>
        <form action="register" className='flex flex-col p-40 rounded-2xl border-3 sm:border-blue-600' onSubmit={e => {
          e.preventDefault()
          registerUser()
        }}>
          <h2 className='text-3xl uppercase font-bold text-blue-600 text-center'>Załóż konto</h2>
          <p className='my-15 tracking-wider text-blue-500 text-center'>Załóż darmowe konto i twórz zestawy fiszek</p>
          <input type="text" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nazwa użytkownika" className='my-20 px-30 py-15 rounded-xl bg-blue-500'/>
          <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adres email" className='my-20 px-30 py-15 rounded-xl bg-blue-500'/>
          <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Hasło" className='my-20 px-30 py-15 rounded-xl bg-blue-500'/>
          <p className='text-blue-500 my-10 font-bold'>{error && error}</p>
          <button type="submit" className='button-class border-3 border-blue-600 font-bold second-button_hover hover:second-button mt-50'>Zarejestruj</button>
        </form>
      </div>
    </section>
  )
}

export default Register