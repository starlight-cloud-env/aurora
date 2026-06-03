import { useState, useEffect, useCallback } from 'react'
import { searchSubtitles, getSubtitleDownloadUrl } from '../api/opensubtitles'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'zh-cn', label: 'Chinese (Simplified)' },
  { code: 'ar', label: 'Arabic' },
]

export function useSubtitles({ tmdbId, mediaType, season, episode }) {
  const [subtitles, setSubtitles] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [selectedSubtitle, setSelectedSubtitle] = useState(null)
  const [subtitleUrl, setSubtitleUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchSubtitles = useCallback(async () => {
    if (!tmdbId) return
    setLoading(true)
    setError(null)
    setSubtitleUrl(null)
    setSelectedSubtitle(null)
    try {
      const results = await searchSubtitles({
        tmdbId,
        mediaType,
        season,
        episode,
        language: selectedLanguage,
      })
      setSubtitles(results)
    } catch (err) {
      console.error('Failed to fetch subtitles:', err)
      setError('Could not load subtitles.')
    } finally {
      setLoading(false)
    }
  }, [tmdbId, mediaType, season, episode, selectedLanguage])

  useEffect(() => {
    fetchSubtitles()
  }, [fetchSubtitles])

  const selectSubtitle = useCallback(async (subtitle) => {
    if (!subtitle) {
      setSelectedSubtitle(null)
      setSubtitleUrl(null)
      return
    }
    try {
      const fileId = subtitle.attributes?.files?.[0]?.file_id
      if (!fileId) return
      const url = await getSubtitleDownloadUrl(fileId)
      setSelectedSubtitle(subtitle)
      setSubtitleUrl(url)
    } catch (err) {
      console.error('Failed to get subtitle URL:', err)
    }
  }, [])

  return {
    subtitles,
    selectedLanguage,
    setSelectedLanguage,
    selectedSubtitle,
    selectSubtitle,
    subtitleUrl,
    loading,
    error,
    languages: LANGUAGES,
  }
}