import { useState } from 'react'

const useMedia = () => {
  const [mediaType, setMediaType] = useState('movie')
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingShows, setTrendingShows] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [popularShows, setPopularShows] = useState([])

  const searchMedia = async () => {
    // Implement API call to search media
    console.log('Searching for:', search, 'Type:', mediaType)
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
  }
}

export default useMedia
