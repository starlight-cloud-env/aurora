import './Skeleton.css'

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-card__thumb" />
      <div className="skeleton skeleton-card__title" />
      <div className="skeleton skeleton-card__year" />
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="skeleton-row">
      <div className="skeleton skeleton-row__title" />
      <div className="skeleton-row__scroll">
        {Array.from({ length: 7 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}

export function SkeletonHero() {
  return (
    <div className="skeleton skeleton-hero" />
  )
}

export function SkeletonWatch() {
  return (
    <div className="skeleton-watch">
      <div className="skeleton skeleton-watch__player" />
      <div className="skeleton-watch__meta">
        <div className="skeleton skeleton-watch__poster" />
        <div className="skeleton-watch__info">
          <div className="skeleton skeleton-watch__title" />
          <div className="skeleton skeleton-watch__tags" />
          <div className="skeleton skeleton-watch__line" />
          <div className="skeleton skeleton-watch__line skeleton-watch__line--short" />
        </div>
      </div>
    </div>
  )
}