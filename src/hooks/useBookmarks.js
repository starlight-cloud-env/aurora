import { useState, useEffect } from 'react'

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([])

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('aurora_bookmarks')
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved))
      } catch (error) {
        console.error('Error parsing bookmarks:', error)
      }
    }
  }, [])

  const toggleBookmark = (item) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id)
      const updated = exists
        ? prev.filter((b) => b.id !== item.id)
        : [...prev, item]
      localStorage.setItem('aurora_bookmarks', JSON.stringify(updated))
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
