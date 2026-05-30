import { NavLink } from 'react-router-dom'
import './BottomNav.css'

const links = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/browse', label: 'Browse', icon: '🔍' },
  { to: '/bookmarks', label: 'Bookmarks', icon: '🔖' },
]

function BottomNav() {
  return (
    <nav className="bottom-nav">
      {links.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            isActive ? 'bottom-nav__link bottom-nav__link--active' : 'bottom-nav__link'
          }
        >
          <span className="bottom-nav__icon">{icon}</span>
          <span className="bottom-nav__label">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav