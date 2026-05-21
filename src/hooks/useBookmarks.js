import { useEffect, useState } from 'react'
import {
  getBookmarks,
  saveBookmarks,
} from '../utils/storage'

const STORAGE_KEY = 'auroraBookmarks'

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    const saved =
      JSON.parse(
        getBookmarks(STORAGE_KEY)
      ) || []

    setBookmarks(saved)
  }, [])

  const toggleBookmark = (item) => {
    const exists = bookmarks.some(
      (bookmark) => bookmark.id === item.id
    )

    let updated

    if (exists) {
      updated = bookmarks.filter(
        (bookmark) => bookmark.id !== item.id
      )
    } else {
      updated = [
        ...bookmarks,
        {
          id: item.id,
          title: item.title,
          name: item.name,
          poster_path: item.poster_path,
          release_date: item.release_date,
          first_air_date:
            item.first_air_date,
        },
      ]
    }

    setBookmarks(updated)

    saveBookmarks(
      STORAGE_KEY,
      JSON.stringify(updated)
    )
  }

  const isBookmarked = (id) =>
    bookmarks.some(
      (bookmark) => bookmark.id === id
    )

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
  }
}