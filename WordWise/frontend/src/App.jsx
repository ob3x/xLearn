import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Main from "./components/Main"
import Login from "./components/Login"
import Register from "./components/Register"

const App = () => {

  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
