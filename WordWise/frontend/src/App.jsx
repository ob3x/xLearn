import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Main from "./components/Main"
import Login from "./components/Login"
import Register from "./components/Register"
import Panel from './components/Panel';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  return (
    <Router>
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn}/>}/>
        <Route path="/panel" element={<Panel isLoggedIn={isLoggedIn}/>}/>
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
