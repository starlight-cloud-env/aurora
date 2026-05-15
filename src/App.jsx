import { useState } from 'react'

function App() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [mediaType, setMediaType] = useState('movie')

  const searchMedia = async () => {
  if (!search) return

  const token = import.meta.env.VITE_TMDB_API_KEY

  const endpoint =
    mediaType === 'movie'
      ? 'https://api.themoviedb.org/3/search/movie'
      : 'https://api.themoviedb.org/3/search/tv'

  const url = `${endpoint}?query=${encodeURIComponent(search)}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    setResults(data.results || [])
  } catch (error) {
    console.error('Error fetching media:', error)
  }
}

  const goHome = () => {
    setResults([])
    setSearch('')
  }

  return (
    <div className="app">
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
              mediaType === 'movie' ? 'active' : ''
            }`}
            onClick={() => setMediaType('movie')}
          >
            Movies
          </button>

          <button
            className={`nav-button ${
              mediaType === 'tv' ? 'active' : ''
            }`}
            onClick={() => setMediaType('tv')}
          >
            Shows
          </button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h2>
            Search {mediaType === 'movie' ? 'Movies' : 'Shows'}
          </h2>

          <p>
            Find your favorite content instantly.
          </p>

          <div className="search-bar">
            <input
              type="text"
              placeholder={`Search ${
                mediaType === 'movie'
                  ? 'movies'
                  : 'shows'
              }...`}
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchMedia()
                }
              }}
            />

            <button onClick={searchMedia}>
              Search
            </button>
          </div>
        </section>

        <section className="content-row">
          <h3>Results</h3>

          <div className="card-container">
            {results.map((item) => (
              <div
                className="media-card"
                key={item.id}
              >
                <div>
                  <h4>
                    {item.title || item.name}
                  </h4>

                  <p>
                    {(
                      item.release_date ||
                      item.first_air_date ||
                      ''
                    ).slice(0, 4)}
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