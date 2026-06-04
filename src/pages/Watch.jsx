import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  getMovieDetails,
  getShowDetails,
  getSeasonDetails,
  getPosterUrl,
  getBackdropUrl,
} from '../api/tmdb'
import { getMovieEmbedUrl, getTVEmbedUrl } from '../api/ezvidapi'
import VideoPlayer from '../components/player/VideoPlayer.jsx'
import EpisodeSelector from '../components/player/EpisodeSelector.jsx'
import { useBookmarks } from '../hooks/useBookmarks'
import { useWatchHistory } from '../hooks/useWatchHistory'
import { useAuth } from '../context/AuthContext'
import { SkeletonWatch } from '../components/ui/Skeleton'
import './Watch.css'

import { useSubtitles } from '../hooks/useSubtitles'
import SubtitleSelector from '../components/player/SubtitleSelector.jsx'

import { checkHealth } from '../api/ezvidapi'
import { useToast } from '../context/ToastContext'

function Watch() {
  const { mediaType, id } = useParams()
  const isTV = mediaType === 'tv'

  const { user } = useAuth()
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const { addToHistory } = useWatchHistory()

  const [details, setDetails] = useState(null)
  const [selectedSeason, setSelectedSeason] = useState(1)
  const [selectedEpisode, setSelectedEpisode] = useState(1)
  const [episodes, setEpisodes] = useState([])
  const [embedUrl, setEmbedUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { addToast } = useToast()

  const {
      subtitles,
      selectedLanguage,
      setSelectedLanguage,
      selectedSubtitle,
      selectSubtitle,
      subtitleUrl,
      loading: subtitlesLoading,
      error: subtitlesError,
      languages,
    } = useSubtitles({
      tmdbId: id,
      mediaType,
      season: selectedSeason,
      episode: selectedEpisode,
    })

  // Check ezvidapi health on load
  useEffect(() => {
    const checkEzvidapi = async () => {
      const healthy = await checkHealth()
      if (!healthy) {
        addToast({
          message: 'The video provider may be experiencing issues. Playback could be affected.',
          type: 'warning',
          duration: 8000,
        })
      }
    }
    checkEzvidapi()
  }, [id])  

  // Fetch movie or show details
  useEffect(() => {
    if (!id || !mediaType) return
    const fetchDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = isTV
          ? await getShowDetails(id)
          : await getMovieDetails(id)
        setDetails(data)
        if (!isTV) {
          setEmbedUrl(getMovieEmbedUrl(id))
        }
      } catch (err) {
        console.error('Failed to fetch details:', err)
        setError('Failed to load content.')
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [id, mediaType, isTV])

  // Fetch episodes when season changes
  useEffect(() => {
    if (!isTV || !id) return
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
    if (!isTV || !id) return
    setEmbedUrl(getTVEmbedUrl(id, selectedSeason, selectedEpisode))
  }, [id, isTV, selectedSeason, selectedEpisode])

  // Log watch history
  useEffect(() => {
    if (!user || !details || !id || !mediaType) return
    addToHistory({
      id,
      mediaType,
      title: details.title || details.name || '',
      thumbnail: getPosterUrl(details.poster_path),
    })
  }, [user, details])

  if (loading) {
    return (
      <div className="watch">
        <div className="watch__content">
          <SkeletonWatch />
        </div>
      </div>
    )
  }

  if (error || !details) {
    return (
      <div className="watch">
        <div className="watch__error">{error || 'Content not found.'}</div>
      </div>
    )
  }

  const title = details.title || details.name || ''
  const overview = details.overview || ''
  const poster = getPosterUrl(details.poster_path, 'w342')
  const backdrop = getBackdropUrl(details.backdrop_path)
  const rating = details.vote_average ? details.vote_average.toFixed(1) : null
  const year = (details.release_date || details.first_air_date || '').slice(0, 4)
  const seasons = Array.isArray(details.seasons)
    ? details.seasons.filter(s => s.season_number > 0)
    : []

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

          <SubtitleSelector
            subtitles={subtitles}
            selectedSubtitle={selectedSubtitle}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            onSubtitleSelect={selectSubtitle}
            subtitleUrl={subtitleUrl}
            loading={subtitlesLoading}
            error={subtitlesError}
            languages={languages}
          />

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
                  onClick={() =>
                    isBookmarked(id)
                      ? removeBookmark(id)
                      : addBookmark({
                          id,
                          mediaType,
                          title,
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