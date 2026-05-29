import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { searchMulti, getPopularMovies, getPopularShows, getPosterUrl } from '../api/tmdb'
import ContentCard from '../components/ui/ContentCard'
import './Browse.css'

const normalizeResult = (item) => ({
  id: item.id,
  title: item.title || item.name,
  thumbnail: getPosterUrl(item.poster_path || item.profile_path),
  rating: item.vote_average?.toFixed(1),
  year: (item.release_date || item.first_air_date)?.slice(0, 4),
  mediaType: item.media_type || (item.title ? 'movie' : 'tv'),
})

function Browse() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''

  const [results, setResults] = useState([])
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  // Fetch search results when query changes
  useEffect(() => {
    if (!query) return
    const fetchResults = async () => {
      setLoading(true)
      try {
        const data = await searchMulti(query)
        const filtered = data.results
          .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
          .map(normalizeResult)
        setResults(filtered)
      } catch (err) {
        console.error('Search failed:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [query])

  // Fetch popular content for default state
  useEffect(() => {
    if (query) return
    const fetchPopular = async () => {
      setLoading(true)
      try {
        const [movies, shows] = await Promise.all([
          getPopularMovies(),
          getPopularShows(),
        ])
        const combined = [
          ...movies.results.map(i => ({ ...normalizeResult(i), mediaType: 'movie' })),
          ...shows.results.map(i => ({ ...normalizeResult(i), mediaType: 'tv' })),
        ]
        setPopular(combined)
      } catch (err) {
        console.error('Failed to fetch popular:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPopular()
  }, [query])

  const handleCardClick = (item) => {
    navigate(`/watch/${item.mediaType}/${item.id}`)
  }

  const displayItems = query ? results : popular

  const filteredItems = activeFilter === 'all'
    ? displayItems
    : displayItems.filter(item => item.mediaType === activeFilter)

  return (
    <div className="browse">
      <div className="browse__header">