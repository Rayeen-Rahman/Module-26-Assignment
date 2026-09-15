import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NewsCard from "../components/news/NewsCard";
import API from "../api/axios";

const categories = ["All", "Technology", "Sports", "Politics", "Entertainment", "Business", "Health", "Science", "World"];

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/news");
        setNews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = news
    .filter((n) => activeCategory === "All" || n.category === activeCategory)
    .filter((n) => n.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header bar */}
      <div className="bg-gray-900 text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-2">All News</h1>
        <p className="text-gray-400 text-sm">{filtered.length} articles found</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6 relative max-w-lg">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search news by title..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchParams(cat === "All" ? {} : { category: cat })}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all
                ${activeCategory === cat
                  ? "bg-yellow-500 text-gray-900 border-yellow-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-yellow-400"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl p-4 border">
                <div className="h-44 bg-gray-200 rounded-xl mb-4" />
                <div className="h-3 bg-gray-200 rounded w-1/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-lg font-medium">No articles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((item) => <NewsCard key={item._id} news={item} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
