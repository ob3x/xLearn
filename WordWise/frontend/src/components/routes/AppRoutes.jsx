import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from '../ProtectedRoute'
import PublicRoute from '../PublicRoute'

import PublicLayout from '../layouts/PublicLayout'
import PanelLayout from '../layouts/PanelLayout'

import Main from '../pages/Main'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Panel from '../pages/Panel'
import Decks from '../pages/Decks'
import DecksCreate from '../pages/DecksCreate'

const AppRoutes = ({ isAuthenticated, setIsAuthenticated }) => {
  
  return (
    <Routes>
    <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
      <Route element={<PublicLayout/>}>
        <Route path="/" element={<Main />}/>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated}/>} />
      </Route>
    </Route>

    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
      <Route element={<PanelLayout setIsAuthenticated={setIsAuthenticated} />}>
        <Route path="/panel" element={<Panel />} />
        <Route path="/decks" element={<Decks />} />
        <Route path="/decks-create" element={<DecksCreate />} />
      </Route>
    </Route>
  </Routes>
  )
}

export default AppRoutes
