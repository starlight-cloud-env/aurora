import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useBookmarks() {
  const { user } = useAuth()
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      setBookmarks([])
      return
    }
    fetchBookmarks()
  }, [user])

  const fetchBookmarks = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('favourites')
        .select('*')
        .order('added_at', { ascending: false })

      if (error) throw error
      setBookmarks(data || [])
    } catch (err) {
      console.error('Failed to fetch bookmarks:', err)
    } finally {
      setLoading(false)
    }
  }

  const addBookmark = async (item) => {
    if (!user) return
    try {
      const { error } = await supabase
        .from('favourites')
        .insert({
          user_id: user.id,
          content_id: String(item.id),
          content_type: item.mediaType,
          title: item.title,
          thumbnail_url: item.thumbnail,
        })
      if (error) throw error
      await fetchBookmarks()
    } catch (err) {
      console.error('Failed to add bookmark:', err)
    }
  }

  const removeBookmark = async (contentId) => {
    if (!user) return
    try {
      const { error } = await supabase
        .from('favourites')
        .delete()
        .eq('content_id', String(contentId))
        .eq('user_id', user.id)
      if (error) throw error
      await fetchBookmarks()
    } catch (err) {
      console.error('Failed to remove bookmark:', err)
    }
  }

  const isBookmarked = (contentId) =>
    bookmarks.some(b => b.content_id === String(contentId))

  return { bookmarks, loading, addBookmark, removeBookmark, isBookmarked }
}