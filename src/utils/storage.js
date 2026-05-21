const BOOKMARK_KEY =
  'auroraBookmarks'

const CONTINUE_KEY =
  'auroraContinueWatching'

function read(key) {
  try {
    return (
      JSON.parse(
        localStorage.getItem(key)
      ) || []
    )
  } catch {
    return []
  }
}

function write(
  key,
  value
) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  )
}

export function getBookmarks() {
  return read(BOOKMARK_KEY)
}

export function saveBookmarks(
  bookmarks
) {
  write(
    BOOKMARK_KEY,
    bookmarks
  )
}

export function clearBookmarks() {
  localStorage.removeItem(
    BOOKMARK_KEY
  )
}

export function getContinueWatching() {
  return read(CONTINUE_KEY)
}

export function saveContinueWatching(
  media
) {
  write(
    CONTINUE_KEY,
    media
  )
}

export function clearContinueWatching() {
  localStorage.removeItem(
    CONTINUE_KEY
  )
}