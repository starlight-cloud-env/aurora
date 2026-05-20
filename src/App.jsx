import { useEffect, useState } from 'react'

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
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingShows, setTrendingShows] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [popularShows, setPopularShows] = useState([])
  const [bookmarks, setBookmarks] = useState([])

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

  const fetchHomepageMedia = async () => {
    const token = import.meta.env.VITE_TMDB_API_KEY

    try {
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }

      const [
        trendingMovieRes,
        trendingTvRes,
        popularMovieRes,
        popularTvRes,
      ] = await Promise.all([
        fetch(
          'https://api.themoviedb.org/3/trending/movie/week',
          { headers }
        ),

        fetch(
          'https://api.themoviedb.org/3/trending/tv/week',
          { headers }
        ),

        fetch(
          'https://api.themoviedb.org/3/movie/popular',
          { headers }
        ),

        fetch(
          'https://api.themoviedb.org/3/tv/popular',
          { headers }
        ),
      ])

      const trendingMovieData =
        await trendingMovieRes.json()

      const trendingTvData =
        await trendingTvRes.json()

      const popularMovieData =
        await popularMovieRes.json()

      const popularTvData =
        await popularTvRes.json()

      setTrendingMovies(
        trendingMovieData.results || []
      )

      setTrendingShows(
        trendingTvData.results || []
      )

      setPopularMovies(
        popularMovieData.results || []
      )

      setPopularShows(
        popularTvData.results || []
      )
    } catch (err) {
      console.error(err)
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

  const toggleBookmark = (item) => {
    const exists = bookmarks.some(
      (bookmark) => bookmark.id === item.id
    )

    let updatedBookmarks

    if (exists) {
      updatedBookmarks = bookmarks.filter(
        (bookmark) => bookmark.id !== item.id
      )
    } else {
      updatedBookmarks = [
        ...bookmarks,
        {
          id: item.id,
          title: item.title,
          name: item.name,
          poster_path: item.poster_path,
          release_date: item.release_date,
          first_air_date: item.first_air_date,
        },
      ]
    }

    setBookmarks(updatedBookmarks)

    localStorage.setItem(
      'auroraBookmarks',
      JSON.stringify(updatedBookmarks)
    )
  }

  useEffect(() => {
    fetchHomepageMedia()

    const savedBookmarks =
      JSON.parse(localStorage.getItem('auroraBookmarks')) || []

    setBookmarks(savedBookmarks)
  }, [])

  const renderMediaRow = (title, items) => (
    <section className="media-row">
      <h3>{title}</h3>

      <div className="horizontal-row">
        {items.map((item) => {
          const posterUrl = item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : null

          return (
            <div
              className="media-card row-card"
              key={`${title}-${item.id}`}
              onClick={() => {
                setMediaType(
                  item.title ? 'movie' : 'tv'
                )

                openItem(item)
              }}
            >
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={item.title || item.name}
                  className="poster-image"
                />
              ) : (
                <div className="no-image">
                  No Image
                </div>
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
    </section>
  )

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

      <main className="home-layout">

        {/* TOP SECTION */}
        <section className="hero-grid">

          {/* LEFT */}
          <div className="search-panel">

            <h2>
              Search {mediaType === 'movie'
                ? 'Movies'
                : 'Shows'}
            </h2>

            <div className="search-bar">

              <input
                value={search}
                placeholder={`Search ${
                  mediaType === 'movie'
                    ? 'movies'
                    : 'shows'
                }`}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter')
                    searchMedia()
                }}
              />

              <button onClick={searchMedia}>
                Search
              </button>

            </div>

            <div className="media-switch">

              <button
                className={
                  mediaType === 'movie'
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setMediaType('movie')
                }
              >
                Movies
              </button>

              <button
                className={
                  mediaType === 'tv'
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setMediaType('tv')
                }
              >
                Shows
              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="player-panel">

            {!modalView || modalView !== 'watch' ? (
              <div className="player-placeholder">

                <h3>
                  Continue Watching
                </h3>

                <p>
                  Select something to watch
                </p>

              </div>
            ) : (
              <div className="video-container">

                <iframe
                  src={
                    modalData?.type ===
                    'movie'
                      ? `https://vsembed.su/embed/movie/${selectedItem.id}`
                      : `https://vsembed.su/embed/tv/${currentShow.id}/${currentSeason.season_number}/${currentEpisode.episode_number}`
                  }

                  allowFullScreen

                  referrerPolicy="no-referrer"

                  title="Aurora Player"
                />

              </div>
            )}

          </div>

        </section>

        {/* BOOKMARKS */}
        {renderMediaRow(
          'Bookmarks',
          bookmarks
        )}

        {/* SEARCH RESULTS */}
        {results.length > 0 &&
          renderMediaRow(
            'Results',
            results
          )}

        {/* HOME */}
        {renderMediaRow(
          'Trending Movies',
          trendingMovies
        )}

        {renderMediaRow(
          'Trending Shows',
          trendingShows
        )}

        {renderMediaRow(
          'Popular Movies',
          popularMovies
        )}

        {renderMediaRow(
          'Popular Shows',
          popularShows
        )}

      </main>
    </div>
  )
}

// https://vidsrc.io/api/ Link to VidSrc for troubleshooting

export default App