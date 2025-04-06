import React, { useState } from 'react'
import axios from "axios"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [info, setInfo] = useState("")
  const [error, setError] = useState("")

  const registerUser = () => {
    axios.post("http://127.0.0.1:8000/auth/register", { username: name, email: email, password: pass })
      .then(res => {
        setError("");
        setInfo("Zarejestrowano pomyślnie");
      })
      .catch(err => {
        setError("Error")
        setInfo("")
      });
  };
  


  return (
    <section className='my-80'>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-3xl uppercase font-bold'>Załóż konto</h2>
        <p className='my-15 tracking-wider'>Załóż darmowe konto i twórz zestawy fiszek</p>
        <form action="register" className='flex flex-col bg-green-500 px-20 py-40 rounded-2xl' onSubmit={e => {
          e.preventDefault()
          registerUser()
        }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nazwa konta" className='my-20 px-30 py-10 rounded-xl bg-red-500'/>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adres email" className='my-20 px-30 py-10 rounded-xl bg-red-500'/>
          <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Hasło" className='my-20 px-30 py-10 rounded-xl bg-red-500'/>
          <button className='text-2xl my-15 bg-red-500 px-30 py-10 rounded-xl cursor-pointer'>Zarejestruj</button>
          <p>{error && error}</p>
          <p>{info && info}</p>
        </form>
      </div>
    </section>
  )
}

export default Register