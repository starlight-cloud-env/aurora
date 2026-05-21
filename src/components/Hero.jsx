import SearchBar from './SearchBar'

export default function Hero(
  props
) {
  return (
    <section className="hero">
      <h2>
        Search{' '}
        {props.mediaType ===
        'movie'
          ? 'Movies'
          : 'Shows'}
      </h2>

      <p>
        Find your
        favorite content
        instantly.
      </p>

      <SearchBar
        {...props}
      />
    </section>
  )
}