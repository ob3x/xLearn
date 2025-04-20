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
import DecksElement from '../pages/DecksElement'
import AddFlashCards from '../pages/AddFlashCards'
import FlashCards from '../pages/FlashCards'
import Settings from '../pages/Settings'
import Learn from '../pages/Learn'
import Test from '../pages/Test'
import StartTest from '../pages/StartTest'
import PrivatePolicy from '../pages/PrivatePolicy'
import Rules from '../pages/Rules'
import AboutUs from '../pages/AboutUs'

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
        <Route path="/decks/:deckId" element={<DecksElement />} />
        <Route path='/decks/flashcards/:deckId' element={<FlashCards />}/>
        <Route path="/decks/add-flashcards/:deckId" element={<AddFlashCards />} />
        <Route path='/panel/settings' element={<Settings />}/>
        <Route path="/learn" element={<Learn />}/>
        <Route path="/tests" element={<Test />}/>
        <Route path="/tests/:deckId" element={<StartTest />}/>
      </Route>
    </Route>

    <Route element={isAuthenticated ? <PanelLayout setIsAuthenticated={setIsAuthenticated} /> : <PublicLayout />}>
      <Route path="/private-policy" element={<PrivatePolicy />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Route>

  </Routes>
  )
}

export default AppRoutes
