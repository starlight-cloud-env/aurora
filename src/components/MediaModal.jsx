import SeasonBrowser from './SeasonBrowser'
import VideoPlayer from './VideoPlayer'

function MediaModal({
  selectedItem,
  currentShow,
  currentSeason,
  currentEpisode,

  episodes,

  openSeason,
  openEpisode,

  closeItem,
  toggleBookmark,
  isBookmarked,
}) {
  if (!selectedItem)
    return null

  const isShow =
    !!selectedItem.name

  const bookmarked = isBookmarked(selectedItem.id)

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
          <button
            className={`bookmark-btn ${bookmarked ? 'bookmarked' : ''}`}
            onClick={() =>
              toggleBookmark(selectedItem)
            }
            title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            {bookmarked ? '★' : '☆'}
          </button>
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
