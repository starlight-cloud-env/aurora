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
      ? `https://vidsrc-embed.ru/embed/movie/${movieId}`
      : null
    : showId &&
      season &&
      episode
      ? `https://vidsrc-embed.ru/embed/tv/${showId}/${season}/${episode}`
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

export default VideoPlayer
