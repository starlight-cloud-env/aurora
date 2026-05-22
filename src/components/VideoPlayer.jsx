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
      ? `https://vsembed.su/embed/movie/${movieId}`
      : null
    : showId &&
      season &&
      episode
      ? `https://vsembed.su/embed/tv/${showId}/${season}/${episode}`
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
