import { useEffect, useState } from 'react'

import {
  searchMedia as searchTMDB,
  fetchHomepageMedia,
  fetchMovie,
  fetchShow,
  fetchSeason,
} from '../services/tmdb'

export default function useMedia() {
  const [search, setSearch] =
    useState('')

  const [results, setResults] =
    useState([])

  const [mediaType, setMediaType] =
    useState('movie')

  const [selectedItem, setSelectedItem] =
    useState(null)

  const [modalData, setModalData] =
    useState(null)

  const [modalView, setModalView] =
    useState('details')

  const [currentShow, setCurrentShow] =
    useState(null)

  const [
    currentSeason,
    setCurrentSeason,
  ] = useState(null)

  const [
    currentEpisode,
    setCurrentEpisode,
  ] = useState(null)

  const [episodes, setEpisodes] =
    useState([])

  const [
    trendingMovies,
    setTrendingMovies,
  ] = useState([])

  const [
    trendingShows,
    setTrendingShows,
  ] = useState([])

  const [
    popularMovies,
    setPopularMovies,
  ] = useState([])

  const [
    popularShows,
    setPopularShows,
  ] = useState([])

  const searchMedia = async () => {
    if (!search.trim()) return

    try {
      const data =
        await searchTMDB(
          search,
          mediaType
        )

      setResults(
        data.results || []
      )
    } catch (err) {
      console.error(
        'Search failed:',
        err
      )
    }
  }

  const loadHomepage =
    async () => {
      try {
        const data =
          await fetchHomepageMedia()

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
      }
    }

  const goHome = () => {
    setSearch('')
    setResults([])

    closeModal()
  }

  const openItem = async (
    item,
    forcedType = null
  ) => {
    try {
      const type =
        forcedType ||
        (item.title
          ? 'movie'
          : 'tv')

      setMediaType(type)

      setSelectedItem(item)

      setModalData(null)

      setModalView(
        'details'
      )

      setCurrentShow(null)

      setCurrentSeason(null)

      setCurrentEpisode(null)

      setEpisodes([])

      if (type === 'movie') {
        const data =
          await fetchMovie(
            item.id
          )

        setModalData({
          type: 'movie',

          title:
            data.title,

          overview:
            data.overview,

          runtime:
            data.runtime,
        })
      }

      if (type === 'tv') {
        const data =
          await fetchShow(
            item.id
          )

        setCurrentShow(data)

        setModalData({
          type: 'tv',

          name:
            data.name,

          overview:
            data.overview,

          seasons:
            data.seasons ||
            [],
        })
      }
    } catch (err) {
      console.error(
        'Open media failed:',
        err
      )
    }
  }

  const openSeason =
    async (season) => {
      if (!currentShow)
        return

      try {
        setCurrentSeason(
          season
        )

        setCurrentEpisode(
          null
        )

        setModalView(
          'episodes'
        )

        const data =
          await fetchSeason(
            currentShow.id,
            season.season_number
          )

        setEpisodes(
          data.episodes ||
            []
        )
      } catch (err) {
        console.error(
          'Season load failed:',
          err
        )
      }
    }

  const openEpisode = (
    episode
  ) => {
    setCurrentEpisode({
      ...episode,

      showId:
        currentShow?.id,

      seasonNumber:
        currentSeason?.season_number,

      episodeNumber:
        episode.episode_number,
    })

    setModalView(
      'episodeDetails'
    )
  }

  const closeModal = () => {
    setSelectedItem(null)

    setModalData(null)

    setModalView(
      'details'
    )

    setCurrentShow(null)

    setCurrentSeason(null)

    setCurrentEpisode(null)

    setEpisodes([])
  }

  useEffect(() => {
    loadHomepage()
  }, [])

  return {
    search,
    setSearch,

    results,

    mediaType,
    setMediaType,

    selectedItem,

    modalData,
    modalView,
    setModalView,

    currentShow,

    currentSeason,

    currentEpisode,

    episodes,

    trendingMovies,

    trendingShows,

    popularMovies,

    popularShows,

    searchMedia,

    goHome,

    openItem,

    openSeason,

    openEpisode,

    closeModal,
  }
}