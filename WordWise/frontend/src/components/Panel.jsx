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
  })

  return (
    <div className='bg-gray-700'>Panel</div>
  )
}

export default Panel