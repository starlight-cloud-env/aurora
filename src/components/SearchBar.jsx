export default function SearchBar({
  search,
  setSearch,
  searchMedia,
  mediaType,
}) {
  return (
    <div className="search-bar">
      <input
        value={search}
        placeholder={`Search ${mediaType}...`}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onKeyDown={(e) =>
          e.key ===
            'Enter' &&
          searchMedia()
        }
      />

      <button
        onClick={
          searchMedia
        }
      >
        Search
      </button>
    </div>
  )
}