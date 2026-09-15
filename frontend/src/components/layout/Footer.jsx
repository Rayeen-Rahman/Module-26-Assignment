import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">📰 NewsPortal</h3>
          <p className="text-sm leading-relaxed">
            Your daily source for the latest news across technology, sports, politics and more.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
            <li><Link to="/news" className="hover:text-yellow-400 transition-colors">All News</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            {["Technology", "Sports", "Politics", "Business", "Health"].map((cat) => (
              <li key={cat}>
                <Link to={`/news?category=${cat}`} className="hover:text-yellow-400 transition-colors">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-6 text-center text-xs">
        © 2026 NewsPortal. All rights reserved. Built with React + Express + MongoDB.
      </div>
    </footer>
  );
};

export default Footer;
