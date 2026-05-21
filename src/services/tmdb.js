const token =
  import.meta.env.VITE_TMDB_API_KEY

const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${token}`,
}

async function fetchTMDB(path) {
  const res = await fetch(
    `https://api.themoviedb.org/3${path}`,
    {
      headers,
    }
  )

  if (!res.ok) {
    throw new Error(
      `TMDB Error ${res.status}`
    )
  }

  return res.json()
}

export async function searchMedia(
  query,
  mediaType
) {
  const endpoint =
    mediaType === 'movie'
      ? 'movie'
      : 'tv'

  return fetchTMDB(
    `/search/${endpoint}?query=${encodeURIComponent(
      query
    )}`
  )
}

export async function fetchHomepageMedia() {
  const [
    trendingMovies,
    trendingShows,
    popularMovies,
    popularShows,
  ] = await Promise.all([
    fetchTMDB(
      '/trending/movie/week'
    ),

    fetchTMDB(
      '/trending/tv/week'
    ),

    fetchTMDB(
      '/movie/popular'
    ),

    fetchTMDB(
      '/tv/popular'
    ),
  ])

  return {
    trendingMovies:
      trendingMovies.results ||
      [],

    trendingShows:
      trendingShows.results ||
      [],

    popularMovies:
      popularMovies.results ||
      [],

    popularShows:
      popularShows.results ||
      [],
  }
}

export async function fetchMovie(
  movieId
) {
  return fetchTMDB(
    `/movie/${movieId}`
  )
}

export async function fetchShow(
  showId
) {
  return fetchTMDB(
    `/tv/${showId}`
  )
}

export async function fetchSeason(
  showId,
  seasonNumber
) {
  return fetchTMDB(
    `/tv/${showId}/season/${seasonNumber}`
  )
}