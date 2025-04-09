import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from '../ProtectedRoute'
import PublicRoute from '../PublicRoute'

import PublicLayout from '../layouts/PublicLayout'
import PanelLayout from '../layouts/PanelLayout'

import Main from '../pages/Main'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Panel from '../pages/Panel'
// import PanelSettings from '../pages/PanelSettings'

const AppRoutes = () => {
  const isAuthenticated = Boolean(localStorage.getItem('token'))

  return (
    <Routes>
      {/* Publiczne strony */}
      <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      {/* Zabezpieczone strony */}
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route element={<PanelLayout />}>
          <Route path="/panel" element={<Panel />} />
          {/* <Route path="settings" element={<PanelSettings />} /> */}
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
