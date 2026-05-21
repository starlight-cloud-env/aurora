function MediaCard({
  item,
  onClick,
}) {
  const poster =
    item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : null

  return (
    <div
      className="media-card"
      onClick={() =>
        onClick(item)
      }
    >
      {poster ? (
        <img
          src={poster}
          alt={
            item.title ||
            item.name
          }
          className="poster-image"
        />
      ) : (
        <div className="no-image">
          No Image
        </div>
      )}

      <div className="media-info">
        <p className="media-year">
          {(
            item.release_date ||
            item.first_air_date ||
            ''
          ).slice(0, 4)}
        </p>

        <h4 className="media-title">
          {item.title ||
            item.name}
        </h4>
      </div>
    </div>
  )
}

export default MediaCard