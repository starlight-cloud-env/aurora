export default function SeasonBrowser({
  seasons,
  openSeason,
}) {
  return (
    <div className="season-list">
      {seasons
        ?.filter(
          (s) =>
            s.season_number >
            0
        )
        .map(
          (season) => (
            <button
              key={
                season.id
              }
              onClick={() =>
                openSeason(
                  season
                )
              }
            >
              {
                season.name
              }

              <span>
                {
                  season.episode_count
                }{' '}
                Episodes
              </span>
            </button>
          )
        )}
    </div>
  )
}