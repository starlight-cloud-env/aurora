export default function App() {
  const categories = ["Movies", "TV", "Anime"];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              StreamHub
            </h1>
            <p className="text-sm text-zinc-400">
              Search and watch content from legal streaming providers.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <div className="flex bg-zinc-800 rounded-2xl p-1">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    category === "Movies"
                      ? "bg-white text-black"
                      : "text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="flex items-center bg-zinc-800 rounded-2xl px-4 py-2 min-w-[320px]">
              <input
                type="text"
                placeholder="Search for a movie, show, or anime..."
                className="bg-transparent outline-none w-full text-sm placeholder:text-zinc-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[320px_1fr] gap-8">
        {/* Sidebar Results */}
        <aside>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold">Search Results</h2>
            <button className="text-sm text-zinc-400 hover:text-white transition-colors">
              Refresh
            </button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 hover:border-zinc-700 transition-colors cursor-pointer"
              >
                <div className="aspect-[2/3] rounded-2xl bg-zinc-800 mb-4"></div>

                <h3 className="font-semibold mb-1">
                  Example Title {item}
                </h3>

                <p className="text-sm text-zinc-400 mb-4">
                  2026 • Action • HD
                </p>

                <button className="w-full py-2 rounded-xl bg-white text-black text-sm font-medium hover:opacity-90 transition-opacity">
                  Watch
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* Video Player */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold">Now Playing</h2>
              <p className="text-zinc-400 text-sm mt-1">
                Select a title from the search results to begin streaming.
              </p>
            </div>
          </div>

          <div className="bg-black rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <div className="aspect-video bg-zinc-900 flex items-center justify-center">
              {/* Replace with legal embedded player source */}
              <iframe
                title="Media Player"
                src="about:blank"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Example Movie Title
                </h3>

                <p className="text-zinc-400 leading-relaxed max-w-3xl">
                  This area can display descriptions, runtime, release dates,
                  ratings, genres, cast information, and streaming provider
                  details.
                </p>
              </div>

              <div className="flex gap-3">
                <button className="px-5 py-3 rounded-2xl bg-white text-black font-medium hover:opacity-90 transition-opacity">
                  Watch Trailer
                </button>

                <button className="px-5 py-3 rounded-2xl border border-zinc-700 hover:bg-zinc-800 transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
