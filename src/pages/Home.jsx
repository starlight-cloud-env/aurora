import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import HeroBanner from '../components/ui/HeroBanner'
import ContentRow from '../components/ui/ContentRow'
import './Home.css'

// Placeholder data until APIs are wired in
const PLACEHOLDER_MOVIES = Array.from({ length: 10 }, (_, i) => ({
  id: `movie-${i + 1}`,
  title: `Movie Title ${i + 1}`,
  thumbnail: null,
  rating: (7 + Math.random() * 2).toFixed(1),
  year: 2023 + (i % 2),
}))

const PLACEHOLDER_SHOWS = Array.from({ length: 10 }, (_, i) => ({
  id: `show-${i + 1}`,
  title: `Show Title ${i + 1}`,
  thumbnail: null,
  rating: (7 + Math.random() * 2).toFixed(1),
  year: 2023 + (i % 2),
}))

const HERO_PLACEHOLDER = {
  title: 'Featured Title',
  overview: 'An epic story that will keep you on the edge of your seat. Discover the latest and greatest in entertainment, all in one place on Aurora.',
  backdrop: null,
}

function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCardClick = (item) => {
    navigate(`/watch/${item.id}`)
  }

  return (
    <div className="home">
      <HeroBanner
        title={HERO_PLACEHOLDER.title}
        overview={HERO_PLACEHOLDER.overview}
        backdrop={HERO_PLACEHOLDER.backdrop}
        onPlay={() => navigate('/watch/featured')}
      />

      {user && (
        <ContentRow
          title="Continue Watching"
          items={PLACEHOLDER_MOVIES.slice(0, 5)}
          onCardClick={handleCardClick}
        />
      )}

      <ContentRow
        title="Popular Movies"
        items={PLACEHOLDER_MOVIES}
        onCardClick={handleCardClick}
      />

      <ContentRow
        title="Trending Movies"
        items={[...PLACEHOLDER_MOVIES].reverse()}
        onCardClick={handleCardClick}
      />

      <ContentRow
        title="Popular Shows"
        items={PLACEHOLDER_SHOWS}
        onCardClick={handleCardClick}
      />

      <ContentRow
        title="Trending Shows"
        items={[...PLACEHOLDER_SHOWS].reverse()}
        onCardClick={handleCardClick}
      />
    </div>
  )
}

export default Home