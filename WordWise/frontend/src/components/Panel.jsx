import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Panel = () => {
    const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    }

    axios.get("http://127.0.0.1:8000/auth/profile", {headers: {
        Authorization: `Bearer ${token}`
      }})
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        localStorage.removeItem("token")
        navigate("/login")
    })
  }, [])

  return (
    <section className='bg-blue-500'>
      <div className='screen-max-width'>
        <h1>Fiszki angielski</h1>
        <p>Wybierz to co chcesz dzisiaj porobić</p>
        <div>
          <div><p>Fiszki</p></div>
          <div><p>Ucz się</p></div>
          <div><p>Test</p></div>
        </div>

      </div>
    </section>
  )
}

export default Panel