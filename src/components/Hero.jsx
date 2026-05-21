import SearchBar from './SearchBar'

function Hero(
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

export default Hero