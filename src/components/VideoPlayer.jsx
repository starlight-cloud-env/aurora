export default function VideoPlayer({
  modalData,
  selectedItem,
  currentShow,
  currentSeason,
  currentEpisode,
}) {
  const src =
    modalData.type ===
    'movie'
      ? `https://vsembed.su/embed/movie/${selectedItem.id}`
      : `https://vsembed.su/embed/tv/${currentShow.id}/${currentSeason.season_number}/${currentEpisode.episode_number}`

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