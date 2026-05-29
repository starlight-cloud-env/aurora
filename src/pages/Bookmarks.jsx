import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useBookmarks } from '../hooks/useBookmarks'
import ContentCard from '../components/ui/ContentCard'
import './Bookmarks.css'

function Bookmarks() {
  const { user } = useAuth()
  const { bookmarks, loading, removeBookmark } = useBookmarks()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="bookmarks__empty">
        <p>Please sign in to view your bookmarks.</p>
        <button
          className="bookmarks__signin-btn"
          onClick={() => navigate('/signin')}
        >
          Sign In
        </button>
      </div>
    )
  }

  if (loading) return <div className="bookmarks__empty">Loading...</div>

  return (
    <div className="bookmarks">
      <div className="bookmarks__header">
        <h1 className="bookmarks__title">Your Bookmarks</h1>
        <span className="bookmarks__count">{bookmarks.length} saved</span>
      </div>

      {bookmarks.length === 0 ? (
        <div className="bookmarks__empty">
          <p>No bookmarks yet. Start adding content you want to watch!</p>
          <button
            className="bookmarks__signin-btn"
            onClick={() => navigate('/browse')}
          >
            Browse Content
          </button>
        </div>
      ) : (
        <div className="bookmarks__grid">
          {bookmarks.map((item) => (
            <div key={item.id} className="bookmarks__item">
              <ContentCard
                title={item.title}
                thumbnail={item.thumbnail_url}
                onClick={() => navigate(`/watch/${item.content_type}/${item.content_id}`)}
              />
              <button
                className="bookmarks__remove-btn"
                onClick={() => removeBookmark(item.content_id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookmarks