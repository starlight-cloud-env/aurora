import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const links = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/browse', label: 'Browse', icon: '🔍' },
  { to: '/bookmarks', label: 'Bookmarks', icon: '🔖' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <span className="sidebar__logo-icon">✦</span>
        <span className="sidebar__logo-text">Aurora</span>
      </div>
      <nav className="sidebar__nav">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
            }
          >
            <span className="sidebar__link-icon">{icon}</span>
            <span className="sidebar__link-label">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar