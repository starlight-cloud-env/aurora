import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  getMovieDetails,
  getShowDetails,
  getSeasonDetails,
  getPosterUrl,
  getBackdropUrl,
} from '../api/tmdb.js'
import { getMovieEmbedUrl, getTVEmbedUrl } from '../api/ezvidapi.js'
import VideoPlayer from '../components/player/VideoPlayer.jsx'
import EpisodeSelector from '../components/player/EpisodeSelector.jsx'
import './Watch.css'

import { useBookmarks } from '../hooks/useBookmarks'
import { useWatchHistory } from '../hooks/useWatchHistory'
import { useAuth } from '../context/AuthContext'

function Watch() {
  const { mediaType, id } = useParams()
  const isTV = mediaType === 'tv'

  const [details, setDetails] = useState(null)
  const [selectedSeason, setSelectedSeason] = useState(1)
  const [selectedEpisode, setSelectedEpisode] = useState(1)
  const [episodes, setEpisodes] = useState([])
  const [embedUrl, setEmbedUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  const { user } = useAuth()
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const { addToHistory } = useWatchHistory()

  // Fetch movie or show details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true)
        const data = isTV
          ? await getShowDetails(id)
          : await getMovieDetails(id)
        setDetails(data)

        if (!isTV) {
          setEmbedUrl(getMovieEmbedUrl(id))
        }
      } catch (err) {
        console.error('Failed to fetch details:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [id, isTV])

  // Fetch episodes when season changes
  useEffect(() => {
    if (!isTV) return
    const fetchEpisodes = async () => {
      try {
        const data = await getSeasonDetails(id, selectedSeason)
        setEpisodes(data.episodes || [])
        setSelectedEpisode(1)
        setEmbedUrl(getTVEmbedUrl(id, selectedSeason, 1))
      } catch (err) {
        console.error('Failed to fetch episodes:', err)
      }
    }
    fetchEpisodes()
  }, [id, isTV, selectedSeason])

  // Update embed URL when episode changes
  useEffect(() => {
    if (!isTV) return
    setEmbedUrl(getTVEmbedUrl(id, selectedSeason, selectedEpisode))
  }, [id, isTV, selectedSeason, selectedEpisode])

  if (loading) return <div className="watch__loading">Loading...</div>
  if (!details) return <div className="watch__error">Content not found.</div>

  const title = details.title || details.name
  const overview = details.overview
  const poster = getPosterUrl(details.poster_path, 'w342')
  const backdrop = getBackdropUrl(details.backdrop_path)
  const rating = details.vote_average?.toFixed(1)
  const year = (details.release_date || details.first_air_date)?.slice(0, 4)
  const seasons = details.seasons?.filter(s => s.season_number > 0) || []

  useEffect(() => {
    if (!user || !details) return
    addToHistory({
      id,
      mediaType,
      title: details.title || details.name,
      thumbnail: getPosterUrl(details.poster_path),
    })
  }, [user, details])

  return (
    <div className="watch">
      {backdrop && (
        <div
          className="watch__backdrop"
          style={{ backgroundImage: `url(${backdrop})` }}
        />
      )}

      <div className="watch__content">
        <div className="watch__player-section">
          <VideoPlayer embedUrl={embedUrl} />

          <div className="watch__meta">
            {poster && (
              <img src={poster} alt={title} className="watch__poster" />
            )}
            <div className="watch__info">
              <h1 className="watch__title">{title}</h1>
              <div className="watch__tags">
                {rating && <span className="watch__tag">⭐ {rating}</span>}
                {year && <span className="watch__tag">{year}</span>}
                <span className="watch__tag">{isTV ? 'TV Show' : 'Movie'}</span>
              </div>

              {user && (
                <button
                  className={`watch__bookmark-btn ${isBookmarked(id) ? 'watch__bookmark-btn--active' : ''}`}
                  onClick={() => isBookmarked(id)
                    ? removeBookmark(id)
                    : addBookmark({
                        id,
                        mediaType,
                        title: details.title || details.name,
                        thumbnail: getPosterUrl(details.poster_path),
                      })
                  }
                >
                  {isBookmarked(id) ? '🔖 Bookmarked' : '+ Bookmark'}
                </button>
              )}
              <p className="watch__overview">{overview}</p>
            </div>
          </div>
        </div>

        {isTV && seasons.length > 0 && (
          <div className="watch__episodes-section">
            <h2 className="watch__episodes-title">Episodes</h2>
            <EpisodeSelector
              seasons={seasons}
              selectedSeason={selectedSeason}
              selectedEpisode={selectedEpisode}
              episodes={episodes}
              onSeasonChange={setSelectedSeason}
              onEpisodeChange={setSelectedEpisode}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Watch