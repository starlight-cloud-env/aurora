const BASE_URL = 'https://api.themoviedb.org/3'
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_KEY
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

const get = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`)
  Object.entries(params).forEach(([key, val]) => url.searchParams.set(key, val))

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    }
  })

  if (!res.ok) throw new Error(`TMDB error: ${res.status}`)
  return res.json()
}

// Images
export const getPosterUrl = (path, size = 'w342') =>
  path ? `${TMDB_IMAGE_BASE}/${size}${path}` : null

export const getBackdropUrl = (path, size = 'w1280') =>
  path ? `${TMDB_IMAGE_BASE}/${size}${path}` : null

// Movies
export const getPopularMovies = (page = 1) =>
  get('/movie/popular', { page })

export const getTrendingMovies = (timeWindow = 'week') =>
  get(`/trending/movie/${timeWindow}`)

export const getMovieDetails = (id) =>
  get(`/movie/${id}`)

export const searchMovies = (query, page = 1) =>
  get('/search/movie', { query, page })

// TV Shows
export const getPopularShows = (page = 1) =>
  get('/tv/popular', { page })

export const getTrendingShows = (timeWindow = 'week') =>
  get(`/trending/tv/${timeWindow}`)

export const getShowDetails = (id) =>
  get(`/tv/${id}`)

export const getSeasonDetails = (id, season) =>
  get(`/tv/${id}/season/${season}`)

export const searchShows = (query, page = 1) =>
  get('/search/tv', { query, page })

// Combined search
export const searchMulti = (query, page = 1) =>
  get('/search/multi', { query, page })