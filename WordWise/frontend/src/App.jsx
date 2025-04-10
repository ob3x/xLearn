import AppRoutes from "./components/routes/AppRoutes"
import { BrowserRouter as Router } from 'react-router-dom'
import { useState } from "react"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"))

  return (
    <Router>
      <AppRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </Router>
  )
}

export default App
