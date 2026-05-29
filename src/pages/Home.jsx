import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getPopularMovies,
  getTrendingMovies,
  getPopularShows,
  getTrendingShows,
  getPosterUrl,
  getBackdropUrl,
} from '../api/tmdb'
import HeroBanner from '../components/ui/HeroBanner'
import ContentRow from '../components/ui/ContentRow'
import './Home.css'

const normalizeMovie = (item) => ({
  id: item.id,
  title: item.title || item.name,
  thumbnail: getPosterUrl(item.poster_path),
  backdrop: getBackdropUrl(item.backdrop_path),
  rating: item.vote_average?.toFixed(1),
  year: (item.release_date || item.first_air_date)?.slice(0, 4),
  overview: item.overview,
  mediaType: item.title ? 'movie' : 'tv',
})

function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [popularMovies, setPopularMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [popularShows, setPopularShows] = useState([])
  const [trendingShows, setTrendingShows] = useState([])
  const [hero, setHero] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [popMovies, trendMovies, popShows, trendShows] = await Promise.all([
          getPopularMovies(),
          getTrendingMovies(),
          getPopularShows(),
          getTrendingShows(),
        ])

        const normalizedPopMovies = popMovies.results.map(normalizeMovie)
        const normalizedTrendMovies = trendMovies.results.map(normalizeMovie)
        const normalizedPopShows = popShows.results.map(normalizeMovie)
        const normalizedTrendShows = trendShows.results.map(normalizeMovie)

        setPopularMovies(normalizedPopMovies)
        setTrendingMovies(normalizedTrendMovies)
        setPopularShows(normalizedPopShows)
        setTrendingShows(normalizedTrendShows)

        // Use first trending movie as hero
        if (normalizedTrendMovies[0]) setHero(normalizedTrendMovies[0])
      } catch (err) {
        console.error('Failed to fetch content:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  const handleCardClick = (item) => {
    navigate(`/watch/${item.mediaType}/${item.id}`)
  }

  if (loading) {
    return <div className="home__loading">Loading...</div>
  }

  return (
    <div className="home">
      {hero && (
        <HeroBanner
          title={hero.title}
          overview={hero.overview}
          backdrop={hero.backdrop}
          onPlay={() => navigate(`/watch/${hero.mediaType}/${hero.id}`)}
        />
      )}

      {user && (
        <ContentRow
          title="Continue Watching"
          items={[]}
          onCardClick={handleCardClick}
        />
      )}

      <ContentRow
        title="Popular Movies"
        items={popularMovies}
        onCardClick={handleCardClick}
      />

      <ContentRow
        title="Trending Movies"
        items={trendingMovies}
        onCardClick={handleCardClick}
      />

      <ContentRow
        title="Popular Shows"
        items={popularShows}
        onCardClick={handleCardClick}
      />

      <ContentRow
        title="Trending Shows"
        items={trendingShows}
        onCardClick={handleCardClick}
      />
    </div>
  )
}

export default Home