const MediaModal = ({
  selectedItem,
  closeItem,
  toggleBookmark,
  isBookmarked,
}) => {
  if (!selectedItem) {
    return null
  }

  const title = selectedItem.title || selectedItem.name
  const bookmarked = isBookmarked(selectedItem.id)

  return (
    <div className="modal-overlay" onClick={closeItem}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={closeItem}>✕</button>
        </div>

        <div className="modal-body">
          {selectedItem.overview && <p>{selectedItem.overview}</p>}

          {selectedItem.number_of_seasons && (
            <div className="mt-6">
              <h3>Seasons: {selectedItem.number_of_seasons}</h3>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            className={`modal-button ${bookmarked ? 'bookmarked' : ''}`}
            onClick={() => toggleBookmark(selectedItem)}
          >
            {bookmarked ? '★ Bookmarked' : '☆ Add Bookmark'}
          </button>
          <button onClick={closeItem}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default MediaModal
