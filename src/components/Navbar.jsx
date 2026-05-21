export default function Navbar({
  mediaType,
  setMediaType,
  goHome,
}) {
  return (
    <header className="navbar">
      <h1>Aurora</h1>

      <nav>
        <button
          className="nav-button"
          onClick={goHome}
        >
          Home
        </button>

        <button
          className={`nav-button ${
            mediaType === 'movie'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setMediaType(
              'movie'
            )
          }
        >
          Movies
        </button>

        <button
          className={`nav-button ${
            mediaType === 'tv'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setMediaType(
              'tv'
            )
          }
        >
          Shows
        </button>
      </nav>
    </header>
  )
}