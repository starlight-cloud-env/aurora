import './HeroBanner.css'

function HeroBanner({ title, overview, backdrop, onPlay }) {
  return (
    <div
      className="hero"
      style={{ backgroundImage: backdrop ? `url(${backdrop})` : undefined }}
    >
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        <p className="hero__overview">{overview}</p>
        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={onPlay}>
            ▶ Play
          </button>
          <button className="hero__btn hero__btn--secondary">
            + Watchlist
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner