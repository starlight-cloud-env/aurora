import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__search">
        <input
          type="text"
          placeholder="Search..."
          className="navbar__search-input"
        />
      </div>
      <div className="navbar__actions">
        <button className="navbar__btn">Sign In</button>
      </div>
    </header>
  )
}

export default Navbar