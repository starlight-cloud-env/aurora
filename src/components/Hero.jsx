const Hero = ({ search, setSearch, searchMedia, mediaType }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    searchMedia()
  }

  return (
    <div className="hero">
      <h2>Discover {mediaType === 'movie' ? 'Movies' : 'TV Shows'}</h2>
      <p>Search and explore the best entertainment content</p>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={`Search ${mediaType === 'movie' ? 'movies' : 'shows'}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default Hero
