const MediaCard = ({ item, onClick }) => {
  const poster = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : null

  const year = item.release_date
    ? new Date(item.release_date).getFullYear()
    : item.first_air_date
      ? new Date(item.first_air_date).getFullYear()
      : 'N/A'

  const title = item.title || item.name

  return (
    <div className="media-card" onClick={onClick}>
      {poster ? (
        <img src={poster} alt={title} className="poster-image" />
      ) : (
        <div className="no-image">No Image</div>
      )}
      <div className="media-info">
        <div className="media-year">{year}</div>
        <div className="media-title">{title}</div>
      </div>
    </div>
  )
}

export default MediaCard
