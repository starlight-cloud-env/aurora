import { useState, useEffect } from 'react'

const useMedia = () => {
  const [mediaType, setMediaType] = useState('movie')
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingShows, setTrendingShows] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [popularShows, setPopularShows] = useState([])
  const [loading, setLoading] = useState(false)

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

  // Fetch trending movies
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
        )
        const data = await response.json()
        setTrendingMovies(data.results || [])
      } catch (error) {
        console.error('Error fetching trending movies:', error)
      }
    }
    fetchTrendingMovies()
  }, [])

  // Fetch trending shows
  useEffect(() => {
    const fetchTrendingShows = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}`
        )
        const data = await response.json()
        setTrendingShows(data.results || [])
      } catch (error) {
        console.error('Error fetching trending shows:', error)
      }
    }
    fetchTrendingShows()
  }, [])

  // Fetch popular movies
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
        )
        const data = await response.json()
        setPopularMovies(data.results || [])
      } catch (error) {
        console.error('Error fetching popular movies:', error)
      }
    }
    fetchPopularMovies()
  }, [])

  // Fetch popular shows
  useEffect(() => {
    const fetchPopularShows = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`
        )
        const data = await response.json()
        setPopularShows(data.results || [])
      } catch (error) {
        console.error('Error fetching popular shows:', error)
      }
    }
    fetchPopularShows()
  }, [])

  const searchMedia = async () => {
    if (!search.trim()) return

    setLoading(true)
    try {
      const endpoint =
        mediaType === 'movie' ? 'search/movie' : 'search/tv'
      const response = await fetch(
        `${TMDB_BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          search
        )}`
      )
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Error searching media:', error)
    } finally {
      setLoading(false)
    }
  }

  const openItem = (item) => {
    setSelectedItem(item)
  }

  const closeItem = () => {
    setSelectedItem(null)
  }

  const goHome = () => {
    setSearch('')
    setResults([])
    setSelectedItem(null)
    setMediaType('movie')
  }

  console.log({
    results,
    trendingMovies,
    trendingShows,
    popularMovies,
    popularShows,
  })

  return {
    mediaType,
    setMediaType,
    search,
    setSearch,
    results,
    selectedItem,
    trendingMovies,
    trendingShows,
    popularMovies,
    popularShows,
    searchMedia,
    openItem,
    closeItem,
    goHome,
    loading,
  }
}

export default useMedia
