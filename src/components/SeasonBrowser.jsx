function SeasonBrowser({
  currentShow,
  currentSeason,
  episodes,
  currentEpisode,
  openSeason,
  openEpisode,
}) {
  if (!currentShow)
    return null

  return (
    <div className="tv-browser">

      <div className="season-column">

        <h3>Seasons</h3>

        <div className="season-list">

          {currentShow.seasons
            ?.filter(
              s =>
                s.season_number > 0
            )
            .map(
              season => (
                <button
                  key={
                    season.id
                  }
                  className={
                    currentSeason
                      ?.id ===
                    season.id
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    openSeason(
                      season
                    )
                  }
                >
                  {season.name}

                  <span>
                    {
                      season.episode_count
                    }{' '}
                    episodes
                  </span>
                </button>
              )
            )}

        </div>
      </div>

      {!!episodes.length && (
        <div className="episode-column">

          <h3>
            Episodes
          </h3>

          <div className="episode-list">

            {episodes.map(
              ep => (
                <button
                  key={ep.id}
                  className={
                    currentEpisode
                      ?.id ===
                    ep.id
                      ? 'selected'
                      : ''
                  }
                  onClick={() =>
                    openEpisode(
                      ep
                    )
                  }
                >
                  Ep{' '}
                  {
                    ep.episode_number
                  }

                  {' — '}

                  {ep.name}
                </button>
              )
            )}

          </div>
        </div>
      )}
    </div>
  )
}

export default SeasonBrowser