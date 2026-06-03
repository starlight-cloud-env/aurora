const BASE_URL = 'https://api.opensubtitles.com/api/v1'
const API_KEY = import.meta.env.VITE_OPENSUBTITLES_API_KEY

const get = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`)
  Object.entries(params).forEach(([key, val]) => url.searchParams.set(key, val))

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Api-Key': API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    mode: 'cors',
    credentials: 'omit',
  })

  if (!res.ok) throw new Error(`OpenSubtitles error: ${res.status}`)
  return res.json()
}

export const searchSubtitles = async ({ tmdbId, mediaType, season, episode, language = 'en' }) => {
  const params = {
    tmdb_id: tmdbId,
    type: mediaType === 'tv' ? 'episode' : 'movie',
    languages: language,
  }

  if (mediaType === 'tv' && season && episode) {
    params.season_number = season
    params.episode_number = episode
  }

  const data = await get('/subtitles', params)
  return data.data || []
}

export const getSubtitleDownloadUrl = async (fileId) => {
  const res = await fetch(`${BASE_URL}/download`, {
    method: 'POST',
    headers: {
      'Api-Key': API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    mode: 'cors',
    credentials: 'omit',
    body: JSON.stringify({ file_id: fileId }),
  })

  if (!res.ok) throw new Error(`OpenSubtitles download error: ${res.status}`)
  const data = await res.json()
  return data.link
}