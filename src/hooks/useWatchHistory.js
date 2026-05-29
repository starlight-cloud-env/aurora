import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useWatchHistory() {
  const { user } = useAuth()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      setHistory([])
      return
    }
    fetchHistory()
  }, [user])

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('watch_history')
        .select('*')
        .order('watched_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setHistory(data || [])
    } catch (err) {
      console.error('Failed to fetch watch history:', err)
    } finally {
      setLoading(false)
    }
  }

  const addToHistory = async (item, progressSeconds = 0) => {
    if (!user) return
    try {
      // Upsert so watching the same content updates rather than duplicates
      const { error } = await supabase
        .from('watch_history')
        .upsert({
          user_id: user.id,
          content_id: String(item.id),
          content_type: item.mediaType,
          title: item.title,
          thumbnail_url: item.thumbnail,
          progress_seconds: progressSeconds,
          watched_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id, content_id',
        })
      if (error) throw error
      await fetchHistory()
    } catch (err) {
      console.error('Failed to add to history:', err)
    }
  }

  const clearHistory = async () => {
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
  }

  return { history, loading, addToHistory, clearHistory }
}