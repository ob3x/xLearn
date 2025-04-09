import { Outlet } from 'react-router-dom'
import Nav from '../elements/Nav-protected'

const PanelLayout = () => (
  <>
    <Nav />
    <main>
      <Outlet />
    </main>
  </>
)

export default PanelLayout
