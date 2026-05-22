import SeasonBrowser from './SeasonBrowser'
import VideoPlayer from './VideoPlayer'

function MediaModal({
  modalData,
  selectedItem,
  currentShow,
  currentSeason,
  currentEpisode,

  episodes,

  openSeason,
  openEpisode,

  closeItem,
}) {
  if (!selectedItem)
    return null

  const isShow =
    !!selectedItem.name

  return (
    <div
      className="modal-overlay"
      onClick={closeItem}
    >
      <div
        className="modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className="modal-header">
          <h2>
            {
              selectedItem.title ||
              selectedItem.name
            }
          </h2>
        </div>

        <div className="modal-body">

          {/* SHOW FLOW */}

          {isShow && (
            <>
              <SeasonBrowser
                currentShow={
                  currentShow
                }
                currentSeason={
                  currentSeason
                }
                currentEpisode={
                  currentEpisode
                }
                episodes={
                  episodes
                }
                openSeason={
                  openSeason
                }
                openEpisode={
                  openEpisode
                }
              />

              {currentEpisode && (
                <VideoPlayer
                  type="tv"
                  showId={
                    currentShow.id
                  }
                  season={
                    currentSeason.season_number
                  }
                  episode={
                    currentEpisode.episode_number
                  }
                />
              )}
            </>
          )}

          {/* MOVIE FLOW */}

          {!isShow && (
            <VideoPlayer
              type="movie"
              movieId={
                selectedItem.id
              }
            />
          )}
        </div>

        <div className="modal-footer">
          <button
            onClick={
              closeItem
            }
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default MediaModal