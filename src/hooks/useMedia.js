import { useEffect, useState } from 'react'

import {
  searchMedia as searchTMDB,
  getHomepageMedia,
  fetchShow,
  fetchSeason,
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

  const [currentShow, setCurrentShow] =
    useState(null)

  const [currentSeason, setCurrentSeason] =
    useState(null)

  const [currentEpisode, setCurrentEpisode] =
    useState(null)

  const [episodes, setEpisodes] =
    useState([])

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

      setResults(
        data.results || []
      )
    } finally {
      setLoading(false)
    }
  }

  const openItem = async (item) => {
    console.log('OPEN', item)

    setSelectedItem(item)

    if (item.name) {
      const show =
        await fetchShow(item.id)

      console.log('SHOW', show)

      setCurrentShow(show)
    }
  }

  const openSeason = async (
    season
  ) => {
    try {
      const data =
        await fetchSeason(
          currentShow.id,
          season.season_number
        )

      setCurrentSeason(season)

      setEpisodes(
        data.episodes || []
      )

      setCurrentEpisode(null)
    } catch (err) {
      console.error(err)
    }
  }

  const openEpisode = (
    episode
  ) => {
    setCurrentEpisode(
      episode
    )
  }

  const closeItem = () => {
    setSelectedItem(null)

    setCurrentShow(null)

    setCurrentSeason(null)

    setCurrentEpisode(null)

    setEpisodes([])
  }

  const goHome = () => {
    setSearch('')

    setResults([])

    closeItem()
  }

  return {
    mediaType,
    setMediaType,

    search,
    setSearch,

    results,

    selectedItem,

    currentShow,
    currentSeason,
    currentEpisode,

    episodes,

    trendingMovies,
    trendingShows,

    popularMovies,
    popularShows,

    searchMedia,

    openItem,
    openSeason,
    openEpisode,

    closeItem,

    goHome,

    loading,
  }
}

export default useMedia