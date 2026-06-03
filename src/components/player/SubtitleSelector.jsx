import './SubtitleSelector.css'

function SubtitleSelector({
  subtitles,
  selectedSubtitle,
  selectedLanguage,
  onLanguageChange,
  onSubtitleSelect,
  subtitleUrl,
  loading,
  error,
  languages,
}) {
  return (
    <div className="subtitle-selector">
      <div className="subtitle-selector__header">
        <h3 className="subtitle-selector__title">Closed Captions</h3>
        {subtitleUrl && (
          <span className="subtitle-selector__active">● Active</span>
        )}
      </div>

      <div className="subtitle-selector__language">
        <label className="subtitle-selector__label">Language</label>
        <select
          className="subtitle-selector__select"
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="subtitle-selector__status">Loading subtitles...</p>
      )}

      {error && (
        <p className="subtitle-selector__status subtitle-selector__status--error">
          {error}
        </p>
      )}

      {!loading && !error && subtitles.length === 0 && (
        <p className="subtitle-selector__status">
          No subtitles found for this language.
        </p>
      )}

      {!loading && subtitles.length > 0 && (
        <div className="subtitle-selector__list">
          <div
            className={`subtitle-selector__item ${!selectedSubtitle ? 'subtitle-selector__item--active' : ''}`}
            onClick={() => onSubtitleSelect(null)}
          >
            Off
          </div>
          {subtitles.slice(0, 10).map((sub) => (
            <div
              key={sub.id}
              className={`subtitle-selector__item ${selectedSubtitle?.id === sub.id ? 'subtitle-selector__item--active' : ''}`}
              onClick={() => onSubtitleSelect(sub)}
            >
              <span className="subtitle-selector__item-name">
                {sub.attributes?.release || 'Subtitle'}
              </span>
              <span className="subtitle-selector__item-meta">
                ↓ {sub.attributes?.download_count?.toLocaleString() || 0}
              </span>
            </div>
          ))}
        </div>
      )}

      {subtitleUrl && (
        <div className="subtitle-selector__download">
          <a
            href={subtitleUrl}
            target="_blank"
            rel="noreferrer"
            className="subtitle-selector__download-btn"
          >
            Download Subtitle File
          </a>
        </div>
      )}
    </div>
  )
}

export default SubtitleSelector