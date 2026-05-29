import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/browse?q=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <header className="navbar">
      <form className="navbar__search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies & shows..."
          className="navbar__search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="navbar__actions">
        {user ? (
          <>
            <button
              className="navbar__icon-btn"
              title="Bookmarks"
              onClick={() => navigate('/bookmarks')}
            >
              🔖
            </button>
            <button className="navbar__btn navbar__btn--outline" onClick={signOut}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="navbar__btn" onClick={() => navigate('/signin')}>
            Sign In
          </button>
        )}
      </div>
    </header>
  )
}

export default Navbar