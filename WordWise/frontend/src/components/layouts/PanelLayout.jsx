import { Outlet } from 'react-router-dom'
import Nav from '../elements/Nav-protected'

const PanelLayout = ({ setIsAuthenticated }) => (
  <>
    <Nav setIsAuthenticated={setIsAuthenticated}/>
    <main>
      <Outlet />
    </main>
  </>
)

export default PanelLayout
