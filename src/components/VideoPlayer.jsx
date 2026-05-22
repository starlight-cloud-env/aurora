function VideoPlayer({
  modalData,
  selectedItem,
  currentShow,
  currentSeason,
  currentEpisode,
}) {
  const isMovie = modalData?.type === 'movie'

  const src = isMovie
    ? selectedItem?.id
      ? `https://vsembed.su/embed/movie/${selectedItem.id}`
      : null
    : currentShow?.id &&
      currentSeason?.season_number &&
      currentEpisode?.episode_number
      ? `https://vsembed.su/embed/tv/${currentShow.id}/${currentSeason.season_number}/${currentEpisode.episode_number}`
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