import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get(`/news/${id}`);
        setNews(data);
      } catch (err) {
        setError("Failed to load article.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-8" />
      <div className="h-72 bg-gray-200 rounded-2xl mb-8" />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => <div key={i} className="h-4 bg-gray-200 rounded" />)}
      </div>
    </div>
  );

  if (error) return (
    <div className="py-20 text-center text-red-500">{error}</div>
  );

  const date = new Date(news.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="bg-white min-h-screen">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/news" className="inline-flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-800 font-medium mb-8 transition-colors">
          ← Back to News
        </Link>

        {/* Category + Date */}
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">
            {news.category}
          </span>
          <span className="text-gray-400 text-xs">{date}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
          {news.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
          <div className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center text-gray-900 font-bold text-sm">
            {news.author?.name?.[0]?.toUpperCase() || "?"}
          </div>
          <span className="text-sm text-gray-600 font-medium">By {news.author?.name || "Unknown"}</span>
        </div>

        {/* Image */}
        {news.image && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-sm">
            <img
              src={news.image}
              alt={news.title}
              className="w-full max-h-96 object-cover"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-8 whitespace-pre-line">
          {news.content}
        </div>
      </article>
    </div>
  );
};

export default NewsDetails;
