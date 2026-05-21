import { useState, useEffect } from 'react'

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([])

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bookmarks')
    if (saved) {
      setBookmarks(JSON.parse(saved))
    }
  }, [])

  const toggleBookmark = (item) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id)
      const updated = exists
        ? prev.filter((b) => b.id !== item.id)
        : [...prev, item]
      localStorage.setItem('bookmarks', JSON.stringify(updated))
      return updated
    })
  }

  const isBookmarked = (itemId) => {
    return bookmarks.some((b) => b.id === itemId)
  }

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
  }
}

export default useBookmarks
