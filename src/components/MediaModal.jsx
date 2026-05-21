import SeasonBrowser from './SeasonBrowser'
import VideoPlayer from './VideoPlayer'

export default function MediaModal(
  props
) {
  if (
    !props.selectedItem ||
    !props.modalData
  )
    return null

  return (
    <div
      className="modal-overlay"
      onClick={
        props.closeModal
      }
    >
      <div
        className="modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className="modal-header">
          <h2>
            {props
              .modalData
              .title ||
              props
                .modalData
                .name}
          </h2>

          <button
            onClick={() =>
              props.toggleBookmark(
                props.selectedItem
              )
            }
          >
            {props.isBookmarked(
              props
                .selectedItem
                .id
            )
              ? '★'
              : '☆'}
          </button>
        </div>

        <div className="modal-body">
          {props.modalView ===
            'details' &&
            props
              .modalData
              .overview}

          {props
            .modalData
            .type ===
            'tv' &&
            props.modalView ===
              'details' && (
              <SeasonBrowser
                seasons={
                  props
                    .modalData
                    .seasons
                }
                openSeason={
                  props.openSeason
                }
              />
            )}

          {props.modalView ===
            'watch' && (
            <VideoPlayer
              {...props}
            />
          )}
        </div>

        <div className="modal-footer">
          <button
            onClick={
              props.closeModal
            }
          >
            Close
          </button>

          <button
            onClick={() =>
              props.setModalView(
                'watch'
              )
            }
          >
            Watch
          </button>
        </div>
      </div>
    </div>
  )
}