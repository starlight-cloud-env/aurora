import ContentCard from './ContentCard'
import './ContentRow.css'

function ContentRow({ title, items, onCardClick }) {
  return (
    <section className="content-row">
      <h2 className="content-row__title">{title}</h2>
      <div className="content-row__scroll">
        {items.map((item) => (
          <ContentCard
            key={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            rating={item.rating}
            year={item.year}
            onClick={() => onCardClick && onCardClick(item)}
          />
        ))}
      </div>
    </section>
  )
}

export default ContentRow