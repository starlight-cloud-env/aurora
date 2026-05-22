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
        mediaType={mediaType}
        setMediaType={setMediaType}
        goHome={goHome}
      />

      <main>

        <Hero
          search={search}
          setSearch={setSearch}
          searchMedia={searchMedia}
          mediaType={mediaType}
        />

        <BookmarkRow
          items={bookmarks}
          openItem={openItem}
        />

        {!!results.length && (
          <MediaRow
            title="Results"
            items={results}
            openItem={openItem}
          />
        )}

        <MediaRow
          title="Trending Movies"
          items={trendingMovies}
          openItem={openItem}
        />

        <MediaRow
          title="Trending Shows"
          items={trendingShows}
          openItem={openItem}
        />

        <MediaRow
          title="Popular Movies"
          items={popularMovies}
          openItem={openItem}
        />

        <MediaRow
          title="Popular Shows"
          items={popularShows}
          openItem={openItem}
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
        toggleBookmark={toggleBookmark}
        isBookmarked={isBookmarked}
      />

    </div>
  )
}

export default App
