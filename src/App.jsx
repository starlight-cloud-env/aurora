import { useState } from "react";

const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDg1MjQ3MjY1NGRkYzhiN2I5ZDdjZjUwNGQxMTBkYyIsIm5iZiI6MTc3ODg1NTk5Mi4yODQsInN1YiI6IjZhMDczMDM4ZTBiMTk3ZGE4YTgyNmUwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mqKMNs74XFn43bTDhDz0LQn686YCkQyElPqzGSSN4rY";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState("");

  async function searchContent() {
    if (!query) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      const filtered = data.results.filter(
        (item) =>
          item.media_type === "movie" ||
          item.media_type === "tv"
      );

      setResults(filtered);
    } catch (error) {
      console.error(error);
    }
  }

  function openPlayer(item) {
    let url = "";

    if (item.media_type === "movie") {
      url = `https://vidsrc.xyz/embed/movie?tmdb=${item.id}`;
    }

    if (item.media_type === "tv") {
      url = `https://vidsrc.xyz/embed/tv?tmdb=${item.id}&season=1&episode=1`;
    }

    setSelectedUrl(url);
  }

  return (
    <div className="app">
      <h1>Movie & Anime Search</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies, TV, anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchContent();
            }
          }}
        />

        <button onClick={searchContent}>
          Search
        </button>
      </div>

      <div className="results">
        {results.map((item) => {
          const title = item.title || item.name;

          const poster = item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "https://via.placeholder.com/300x450";

          return (
            <div
              key={item.id}
              className="card"
              onClick={() => openPlayer(item)}
            >
              <img src={poster} alt={title} />

              <h3>{title}</h3>

              <p>{item.media_type}</p>
            </div>
          );
        })}
      </div>

      {selectedUrl && (
        <div className="player-container">
          <iframe
            src={selectedUrl}
            title="Video Player"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}