import './EpisodeSelector.css'

function EpisodeSelector({ seasons, selectedSeason, selectedEpisode, onSeasonChange, onEpisodeChange, episodes }) {
  return (
    <div className="episode-selector">
      <div className="episode-selector__seasons">
        {seasons.map((season) => (
          <button
            key={season.season_number}
            className={`episode-selector__season-btn ${selectedSeason === season.season_number ? 'episode-selector__season-btn--active' : ''}`}
            onClick={() => onSeasonChange(season.season_number)}
          >
            Season {season.season_number}
          </button>
        ))}
      </div>

      <div className="episode-selector__episodes">
        {episodes.map((episode) => (
          <div
            key={episode.episode_number}
            className={`episode-selector__episode ${selectedEpisode === episode.episode_number ? 'episode-selector__episode--active' : ''}`}
            onClick={() => onEpisodeChange(episode.episode_number)}
          >
            <div className="episode-selector__episode-thumb">
              {episode.still_path
                ? <img src={`https://image.tmdb.org/t/p/w300${episode.still_path}`} alt={episode.name} />
                : <div className="episode-selector__episode-thumb-placeholder" />
              }
              <span className="episode-selector__episode-num">E{episode.episode_number}</span>
            </div>
            <div className="episode-selector__episode-info">
              <p className="episode-selector__episode-title">{episode.name}</p>
              <p className="episode-selector__episode-overview">{episode.overview}</p>
              {episode.runtime && (
                <span className="episode-selector__episode-runtime">{episode.runtime}m</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EpisodeSelector