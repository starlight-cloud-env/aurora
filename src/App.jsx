import './index.css'

import useMedia from './hooks/useMedia'
import useBookmarks from './hooks/useBookmarks'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MediaRow from './components/MediaRow'
import MediaModal from './components/MediaModal'
import BookmarkRow from './components/BookmarkRow'

function App() {
  const {
    media,
    mediaType,
    setMediaType,

    search,
    setSearch,

    results,

    selectedItem,

    currentShow,
    currentSeason,
    currentEpisode,

    episodes,

    trendingMovies,
    trendingShows,

    popularMovies,
    popularShows,

    searchMedia,

    openItem,
    openSeason,
    openEpisode,

    closeItem,

    goHome,

    loading,
  } = useMedia()

  const {
    bookmarks,
    toggleBookmark,
    isBookmarked,
  } = useBookmarks()

  return (
    <div className="app">

      <Navbar
        mediaType={media.mediaType}
        setMediaType={media.setMediaType}
        goHome={media.goHome}
      />

      <main>

        <Hero
          search={media.search}
          setSearch={media.setSearch}
          searchMedia={media.searchMedia}
          mediaType={media.mediaType}
        />

        <BookmarkRow
          items={bookmarks}
          openItem={media.openItem}
        />

        {!!media.results.length && (
          <MediaRow
            title="Results"
            items={media.results}
            openItem={media.openItem}
          />
        )}

        <MediaRow
          title="Trending Movies"
          items={media.trendingMovies}
          openItem={media.openItem}
        />

        <MediaRow
          title="Trending Shows"
          items={media.trendingShows}
          openItem={media.openItem}
        />

        <MediaRow
          title="Popular Movies"
          items={media.popularMovies}
          openItem={media.openItem}
        />

        <MediaRow
          title="Popular Shows"
          items={media.popularShows}
          openItem={media.openItem}
        />

      </main>

      <MediaModal
        selectedItem={selectedItem}
        currentShow={currentShow}
        currentSeason={currentSeason}
        currentEpisode={currentEpisode}
        episodes={episodes}
        openSeason={openSeason}
        openEpisode={openEpisode}
        closeItem={closeItem}
      />

    </div>
  )
}

export default App