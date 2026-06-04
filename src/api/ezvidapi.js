const BASE_URL = import.meta.env.VITE_EZVIDAPI_BASE_URL
const REF = window.location.hostname

// Embed URLs (used in an iframe for the player)
export const getMovieEmbedUrl = (tmdbId) =>
  `${BASE_URL}/embed/movie/${tmdbId}?ref=${REF}`

export const getTVEmbedUrl = (tmdbId, season, episode) =>
  `${BASE_URL}/embed/tv/${tmdbId}/${season}/${episode}?ref=${REF}`

// Get available providers
export const getProviders = async () => {
  const res = await fetch(`${BASE_URL}/list`)
  if (!res.ok) throw new Error(`ezvidapi error: ${res.status}`)
  return res.json()
}

// Health check — uses the providers list endpoint as a lightweight ping
export const checkHealth = async () => {
  try {
    const res = await fetch(`${BASE_URL}/list`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    })
    return res.ok
  } catch {
    return false
  }
}

// Direct stream URLs by provider
export const getMovieStreamUrl = (provider, tmdbId) =>
  `${BASE_URL}/movie/${provider}/${tmdbId}`

export const getTVStreamUrl = (provider, tmdbId, season, episode) =>
  `${BASE_URL}/tv/${provider}/${tmdbId}/${season}/${episode}`