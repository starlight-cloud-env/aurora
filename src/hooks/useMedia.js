import { useEffect, useState } from 'react'
import {
  searchMedia as searchTMDB,
  getHomepageMedia,
} from '../services/tmdb'

const useMedia = () => {
  const [mediaType, setMediaType] =
    useState('movie')

  const [search, setSearch] =
    useState('')

  const [results, setResults] =
    useState([])

  const [selectedItem, setSelectedItem] =
    useState(null)

  const [trendingMovies, setTrendingMovies] =
    useState([])

  const [trendingShows, setTrendingShows] =
    useState([])

  const [popularMovies, setPopularMovies] =
    useState([])

  const [popularShows, setPopularShows] =
    useState([])

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {
    loadHomepage()
  }, [])

  const loadHomepage = async () => {
    try {
      setLoading(true)

      const data =
        await getHomepageMedia()

      setTrendingMovies(
        data.trendingMovies
      )

      setTrendingShows(
        data.trendingShows
      )

      setPopularMovies(
        data.popularMovies
      )

      setPopularShows(
        data.popularShows
      )
    } catch (err) {
      console.error(
        'Homepage load failed:',
        err
      )
    } finally {
      setLoading(false)
    }
  }

  const searchMedia = async () => {
    if (!search.trim()) return

    try {
      setLoading(true)

      const data =
        await searchTMDB(
          search,
          mediaType
        )

      setResults(data)
    } catch (err) {
      console.error(
        'Search failed:',
        err
      )
    } finally {
      setLoading(false)
    }
  }

  const openItem = (item) =>
    setSelectedItem(item)

  const closeItem = () =>
    setSelectedItem(null)

  const goHome = () => {
    setSearch('')
    setResults([])
    setSelectedItem(null)
  }

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