import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useWatchHistory() {
  const { user } = useAuth()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchHistory = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('watch_history')
        .select('*')
        .eq('user_id', user.id)
        .order('watched_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setHistory(data || [])
    } catch (err) {
      console.error('Failed to fetch watch history:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      setHistory([])
      return
    }
    fetchHistory()
  }, [user, fetchHistory])

  const addToHistory = useCallback(async (item, progressSeconds = 0) => {
    if (!user) return
    try {
      // Check if entry already exists
      const { data: existing } = await supabase
        .from('watch_history')
        .select('id')
        .eq('user_id', user.id)
        .eq('content_id', String(item.id))
        .single()

      if (existing) {
        // Update existing entry
        const { error } = await supabase
          .from('watch_history')
          .update({
            progress_seconds: progressSeconds,
            watched_at: new Date().toISOString(),
            title: item.title,
            thumbnail_url: item.thumbnail,
          })
          .eq('id', existing.id)
        if (error) throw error
      } else {
        // Insert new entry
        const { error } = await supabase
          .from('watch_history')
          .insert({
            user_id: user.id,
            content_id: String(item.id),
            content_type: item.mediaType,
            title: item.title,
            thumbnail_url: item.thumbnail,
            progress_seconds: progressSeconds,
            watched_at: new Date().toISOString(),
          })
        if (error) throw error
      }
      await fetchHistory()
    } catch (err) {
      console.error('Failed to add to history:', err)
    }
  }, [user, fetchHistory])

  const clearHistory = useCallback(async () => {
    if (!user) return
    try {
      const { error } = await supabase
        .from('watch_history')
        .delete()
        .eq('user_id', user.id)
      if (error) throw error
      setHistory([])
    } catch (err) {
      console.error('Failed to clear history:', err)
    }
  }, [user])

  return { history, loading, addToHistory, clearHistory }
}