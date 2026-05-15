function App() {
  return (
    <div className="app">
      <header className="navbar">
        <h1>StreamHub</h1>

        <nav>
          <a href="#">Home</a>
          <a href="#">Movies</a>
          <a href="#">TV</a>
          <a href="#">Anime</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h2>Watch Movies, TV, and Anime</h2>

          <p>
            Search and stream your favorite content instantly.
          </p>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a movie or show..."
            />

            <button>Search</button>
          </div>
        </section>

        <section className="content-row">
          <h3>Trending</h3>

          <div className="card-container">
            <div className="media-card">Movie 1</div>
            <div className="media-card">Movie 2</div>
            <div className="media-card">Movie 3</div>
            <div className="media-card">Movie 4</div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App