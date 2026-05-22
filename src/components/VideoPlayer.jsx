function VideoPlayer({
  type,
  movieId,
  showId,
  season,
  episode,
}) {
  const isMovie = type === 'movie'

  const src = isMovie
    ? movieId
      ? `https://vidsrcme.ru/embed/movie/${movieId}`
      : null
    : showId &&
      season &&
      episode
      ? `https://vidsrcme.ru/embed/tv/${showId}/${season}/${episode}`
      : null

  if (!src) return null

  return (
    <div className="video-container">
      <iframe
        src={src}
        allowFullScreen
        allow="autoplay; fullscreen"
        title="Aurora Player"
      />
    </div>
  )
}

// https://vidsrc.domains/

export default VideoPlayer
