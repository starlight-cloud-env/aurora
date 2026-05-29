import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <span className="sidebar__logo-text">Aurora</span>
      </div>
      <nav className="sidebar__nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'}>
          Home
        </NavLink>
        <NavLink to="/browse" className={({ isActive }) => isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'}>
          Browse
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar