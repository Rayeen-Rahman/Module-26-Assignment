import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewsCard from "../components/news/NewsCard";
import API from "../api/axios";

// Section: Hero
const Hero = () => (
  <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 px-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/10 to-transparent pointer-events-none" />
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <span className="inline-block bg-yellow-500/20 text-yellow-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
        📰 Breaking News
      </span>
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
        Stay Informed,<br />
        <span className="text-yellow-400">Stay Ahead</span>
      </h1>
      <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
        Your daily source for the latest news across technology, sports, politics, health and more.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/news" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-8 py-3.5 rounded-full transition-colors shadow-lg text-sm">
          Explore All News →
        </Link>
        <Link to="/register" className="border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm">
          Publish Your Story
        </Link>
      </div>
    </div>
  </section>
);

// Section: Categories
const categories = ["Technology", "Sports", "Politics", "Entertainment", "Business", "Health"];
const categoryIcons = { Technology: "💻", Sports: "⚽", Politics: "🏛️", Entertainment: "🎬", Business: "📈", Health: "🏥" };

const CategoriesSection = () => (
  <section className="py-12 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Browse by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/news?category=${cat}`}
            className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-xl py-4 hover:border-yellow-400 hover:shadow-sm transition-all text-center"
          >
            <span className="text-2xl">{categoryIcons[cat]}</span>
            <span className="text-xs font-semibold text-gray-700">{cat}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

// Section: Features
const features = [
  { icon: "⚡", title: "Live Updates", desc: "News updated in real-time" },
  { icon: "✍️", title: "Publish Stories", desc: "Share your own news articles" },
  { icon: "🔒", title: "Secure Account", desc: "JWT-protected authentication" },
  { icon: "📱", title: "Responsive", desc: "Works on any device" },
];

const FeaturesSection = () => (
  <section className="py-14 bg-white border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
      {features.map((f) => (
        <div key={f.title} className="text-center">
          <span className="text-3xl block mb-2">{f.icon}</span>
          <h4 className="font-bold text-gray-800 text-sm">{f.title}</h4>
          <p className="text-gray-400 text-xs mt-1">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// Newsletter Section
const NewsletterSection = () => (
  <section className="bg-yellow-500 py-14 px-4">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Stay in the Loop</h2>
      <p className="text-gray-800 mb-6 text-sm">Subscribe to get the latest news delivered to your inbox.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <input
          type="email"
          placeholder="Enter your email address"
          className="flex-1 max-w-sm px-5 py-3 rounded-full text-sm outline-none focus:ring-2 focus:ring-gray-900"
        />
        <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-full transition-colors text-sm">
          Subscribe
        </button>
      </div>
    </div>
  </section>
);

// Home Page
const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await API.get("/news");
        setNews(data.slice(0, 6)); // top 6
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div>
      <Hero />
      <CategoriesSection />
      <FeaturesSection />

      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Latest News</h2>
            <Link to="/news" className="text-sm font-semibold text-yellow-600 hover:text-yellow-800 transition-colors">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl p-4 border">
                  <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {news.map((item) => <NewsCard key={item._id} news={item} />)}
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default Home;
