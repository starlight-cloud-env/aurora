import { useState } from 'react'

function App() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [mediaType, setMediaType] = useState('movie')
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalData, setModalData] = useState(null)
  const [modalView, setModalView] = useState('details')
  const [currentShow, setCurrentShow] = useState(null)
  const [currentSeason, setCurrentSeason] = useState(null)
  const [currentEpisode, setCurrentEpisode] = useState(null)
  const [episodes, setEpisodes] = useState([])

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

    setModalView('details')

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

        setCurrentShow(data)

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

  const openSeason = async (season) => {
    const token = import.meta.env.VITE_TMDB_API_KEY

    setCurrentSeason(season)
    setModalView('episodes')

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${currentShow.id}/season/${season.season_number}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }
      )

      const data = await res.json()

      setEpisodes(data.episodes || [])
    } catch (err) {
      console.error(err)
    }
  }

  const openEpisode = (episode) => {
    setCurrentEpisode({
      ...episode,
      showId: currentShow.id,
      seasonNumber: currentSeason.season_number,
      episodeNumber: episode.episode_number,
    })

    setModalView('episodeDetails')
  }

  const closeModal = () => {
    setSelectedItem(null)
    setModalData(null)

    setModalView('details')

    setCurrentShow(null)
    setCurrentSeason(null)
    setCurrentEpisode(null)

    setEpisodes([])
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
              onClick={closeModal}
            >
              <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="modal-content"
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

                      <button
                        onClick={() => setModalView('watch')}
                        style={{ marginTop: '20px' }}
                      >
                        Watch Movie
                      </button>
                    </div>
                  )}

                  {modalData.type === 'tv' && (
                    <div>
                      <h2>{modalData.name}</h2>

                      {/* LEVEL 1: SEASONS */}
                      {modalView === 'details' && (
                        <div>
                          <h3>Seasons</h3>

                          <ul>
                            {modalData.seasons
                              .filter((s) => s.season_number > 0)
                              .map((season) => (
                                <li key={season.id}>
                                  <button
                                    onClick={() => openSeason(season)}
                                  >
                                    {season.name} ({season.episode_count} episodes)
                                  </button>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {/* LEVEL 2: EPISODES */}
                      {modalView === 'episodes' && (
                        <div>
                          <h3>
                            {currentSeason?.name}
                          </h3>

                          <button
                            onClick={() => {
                              setModalView('details')
                              setCurrentSeason(null)
                              setEpisodes([])
                            }}
                          >
                            ← Back to Seasons
                          </button>

                          <ul>
                            {episodes.map((ep) => (
                              <li key={ep.id}>
                                <button onClick={() => openEpisode(ep)}>
                                  Episode {ep.episode_number}: {ep.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* LEVEL 3: EPISODE DETAIL */}
                      {modalView === 'episodeDetails' && (
                        <div>
                          <button
                            onClick={() => {
                              setModalView('episodes')
                              setCurrentEpisode(null)
                            }}
                          >
                            ← Back to Episodes
                          </button>

                          <h3>
                            Episode {currentEpisode?.episode_number}:{' '}
                            {currentEpisode?.name}
                          </h3>

                          <p style={{ marginTop: '10px' }}>
                            {currentEpisode?.overview ||
                              'No description available.'}
                          </p>

                          <button
                            onClick={() => setModalView('watch')}
                            style={{ marginTop: '20px' }}
                          >
                            Watch Episode
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <button onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {modalView === 'watch' &&
            (
              modalData.type === 'movie' ||
              (currentShow && currentSeason && currentEpisode)
            ) && (
              <div className="watch-view">
                <button
                  onClick={() => {
                    if (modalData.type === 'movie') {
                      setModalView('details')
                    } else {
                      setModalView('episodeDetails')
                    }
                  }}
                  style={{ marginBottom: '15px' }}
                >
                  ← Back
                </button>

                <a
                  href={
                    modalData.type === 'movie'
                      ? `https://vsembed.su/embed/movie/${selectedItem.id}`
                      : `https://vsembed.su/embed/tv/${currentShow.id}/${currentSeason.season_number}/${currentEpisode.episode_number}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-button"
                >
                  Watch Now
                </a>
              </div>
            )}
        </section>
      </main>
    </div>
  )
}


export default App