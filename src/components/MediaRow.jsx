import MediaCard from './MediaCard'

const MediaRow = ({ title, items, openItem }) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="media-row">
      <h3>{title}</h3>
      <div className="horizontal-row">
        {items.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            onClick={() => openItem(item)}
          />
        ))}
      </div>
    </div>
  )
}

export default MediaRow
