import AppRoutes from "./components/routes/AppRoutes"
import { BrowserRouter as Router } from 'react-router-dom'
import { useState } from "react"
import Footer from './components/layouts/Footer'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"))

  return (
    <Router>
      <AppRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Footer />
    </Router>
  )
}

export default App
