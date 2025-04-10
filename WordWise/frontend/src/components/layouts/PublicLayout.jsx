import { Outlet } from 'react-router-dom'
import Nav from '../elements/Nav'

const PublicLayout = () => (
  <>
    <Nav/>
    <main>
      <Outlet />
    </main>
  </>
)

export default PublicLayout
