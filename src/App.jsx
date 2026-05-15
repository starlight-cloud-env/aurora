import { useState } from 'react'

function App() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [mediaType, setMediaType] = useState('movie')
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalData, setModalData] = useState(null)

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

  const openItem = async (item) => {
    const token = import.meta.env.VITE_TMDB_API_KEY

    setSelectedItem(item)
    setModalData(null)

    try {
      // MOVIE FLOW
      if (mediaType === 'movie') {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${item.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: 'application/json',
            },
          }
        )

        const data = await res.json()

        setModalData({
          type: 'movie',
          title: data.title,
          overview: data.overview,
          runtime: data.runtime,
        })
      }

      // TV FLOW
      if (mediaType === 'tv') {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${item.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: 'application/json',
            },
          }
        )

        const data = await res.json()

        setModalData({
          type: 'tv',
          name: data.name,
          seasons: data.seasons,
        })
      }
    } catch (err) {
      console.error(err)
    }
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
            {results.map((item) => {
              const posterUrl = item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : null

              return (
                <div
                  className="media-card"
                  key={item.id}
                  onClick={() => openItem(item)}
                >
                  {posterUrl ? (
                    <img
                      src={posterUrl}
                      alt={item.title || item.name}
                      className="poster-image"
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}

                  <div className="media-info">
                    <p className="media-year">
                      {(
                        item.release_date ||
                        item.first_air_date ||
                        ''
                      ).slice(0, 4) || 'Unknown'}
                    </p>

                    <h4 className="media-title">
                      {item.title || item.name}
                    </h4>
                  </div>
                </div>
              )
            })}
          </div>

          {/* MODAL MUST BE OUTSIDE GRID */}
          {selectedItem && modalData && (
            <div
              className="modal-overlay"
              onClick={() => setSelectedItem(null)}
            >
              <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
              >
                {modalData.type === 'movie' && (
                  <div>
                    <h2>{modalData.title}</h2>

                    <p>
                      Runtime: {modalData.runtime} minutes
                    </p>

                    <p style={{ marginTop: '10px' }}>
                      {modalData.overview}
                    </p>
                  </div>
                )}

                {modalData.type === 'tv' && (
                  <div>
                    <h2>{modalData.name}</h2>

                    <h3>Seasons</h3>

                    <ul>
                      {modalData.seasons
                        .filter((s) => s.season_number > 0)
                        .map((season) => (
                          <li key={season.id}>
                            {season.name} ({season.episode_count}{' '}
                            episodes)
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => setSelectedItem(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App