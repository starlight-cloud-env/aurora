import MediaCard from './MediaCard'

function MediaRow({
  title,
  items,
  openItem,
}) {
  if (!items?.length)
    return null

  return (
    <section className="media-row">
      <h3>{title}</h3>

      <div className="horizontal-row">
        {items.map(
          (item) => (
            <MediaCard
              key={
                item.id
              }
              item={
                item
              }
              onClick={
                openItem
              }
            />
          )
        )}
      </div>
    </section>
  )
}

export default MediaRow