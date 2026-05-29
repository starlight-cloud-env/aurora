import './ContentCard.css'

function ContentCard({ title, thumbnail, rating, year, onClick }) {
  return (
    <div className="content-card" onClick={onClick}>
      <div className="content-card__thumb">
        {thumbnail
          ? <img src={thumbnail} alt={title} />
          : <div className="content-card__thumb-placeholder" />
        }
        {rating && (
          <span className="content-card__rating">⭐ {rating}</span>
        )}
      </div>
      <div className="content-card__info">
        <p className="content-card__title">{title}</p>
        {year && <span className="content-card__year">{year}</span>}
      </div>
    </div>
  )
}

export default ContentCard