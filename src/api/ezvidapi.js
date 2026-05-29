const BASE_URL = import.meta.env.VITE_EZVIDAPI_BASE_URL

// Get available providers
export const getProviders = async () => {
  const res = await fetch(`${BASE_URL}/list`)
  if (!res.ok) throw new Error(`ezvidapi error: ${res.status}`)
  return res.json()
}

// Embed URLs (used in an iframe for the player)
export const getMovieEmbedUrl = (tmdbId) =>
  `${BASE_URL}/embed/movie/${tmdbId}`

export const getTVEmbedUrl = (tmdbId, season, episode) =>
  `${BASE_URL}/embed/tv/${tmdbId}/${season}/${episode}`

// Direct stream URLs by provider
export const getMovieStreamUrl = (provider, tmdbId) =>
  `${BASE_URL}/movie/${provider}/${tmdbId}`

export const getTVStreamUrl = (provider, tmdbId, season, episode) =>
  `${BASE_URL}/tv/${provider}/${tmdbId}/${season}/${episode}`