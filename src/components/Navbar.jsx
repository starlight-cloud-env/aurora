const Navbar = ({ mediaType, setMediaType, goHome }) => {
  return (
    <nav className="navbar">
      <div className="font-bold text-xl cursor-pointer" onClick={goHome}>
        Aurora
      </div>
      <nav>
        <button
          className={`nav-button ${mediaType === 'movie' ? 'active' : ''}`}
          onClick={() => setMediaType('movie')}
        >
          Movies
        </button>
        <button
          className={`nav-button ${mediaType === 'tv' ? 'active' : ''}`}
          onClick={() => setMediaType('tv')}
        >
          TV Shows
        </button>
      </nav>
    </nav>
  )
}

export default Navbar
