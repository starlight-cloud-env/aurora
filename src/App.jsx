import { useState } from 'react'

function App() {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])

  const searchMovies = async () => {
    if (!search) return

    const apiKey = import.meta.env.VITE_TMDB_API_KEY

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`

    try {
      const response = await fetch(url)
      const data = await response.json()

      setMovies(data.results || [])
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  return (
    <div className="app">
      <header className="navbar">
        <h1>Aurora</h1>

        <nav>
          <a href="#">Home</a>
          <a href="#">Movies</a>
          <a href="#">TV</a>
          <a href="#">Anime</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h2>Search Movies</h2>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={searchMovies}>
              Search
            </button>
          </div>
        </section>

        <section className="content-row">
          <h3>Results</h3>

          <div className="card-container">
            {movies.map((movie) => (
              <div className="media-card" key={movie.id}>
                <div>
                  <h4>{movie.title}</h4>

                  <p>
                    {movie.release_date
                      ? movie.release_date.slice(0, 4)
                      : 'Unknown'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App