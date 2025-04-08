import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/panel")
    }
  }, [])

  const loginUser = () => {
    if (username.trim() == "" || password.trim() == "") {
      setError("Pola nie mogą być puste")
      return
    }

    axios.post("http://127.0.0.1:8000/auth/token", 
      new URLSearchParams({
      username : username,
      password : password
    }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    .then(res => {
        if (res.data.access_token) {
          localStorage.setItem("token", res.data.access_token)
          setIsLoggedIn(true)
          navigate("/panel  ")
        }
      })
      .catch(err => {
        if (err.status == 404) {
          setError("Nieprawidłowy login")
        } else if(err.status == 401) {
          setError("Nieprawidłowe hasło")
        } else {
          setError("Wystąpił błąd podczas logowania")
        }
      });
  };
  


  return (
    <section className='my-80'>
      <div className='flex flex-col justify-center items-center'>
        <form action="login" className='flex flex-col p-40 rounded-2xl border-3 border-green-500' onSubmit={e => {
          e.preventDefault()
          loginUser()
        }}>
          <h2 className='text-3xl uppercase font-bold text-green-600'>Zaloguj się</h2>
          <p className='my-15 tracking-wider text-green-500'>Zaloguj się i korzystaj z wszystkich funkcji</p>
          <input type="text"
            name="username"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nazwa użytkownika"
            required
            className="my-20 px-30 py-15 rounded-xl bg-green-500"/>
          <input type="password" 
          value={password}
          autoComplete='current-password'
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Hasło"
          name="password"
          required
          className='my-20 px-30 py-15 rounded-xl bg-green-500'/>
          <button type="submit" className='button-class second-button hover:second-button_hover mt-50'>Zaloguj</button>
          <p className='text-green-500 my-10'>{error && error}</p>
        </form>
      </div>
    </section>
  )
}

export default Login