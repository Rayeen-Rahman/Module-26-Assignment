import { Link } from "react-router-dom";

// NewsCard — displays a single news article in a card format
const NewsCard = ({ news }) => {
  const { _id, title, image, category, author, createdAt } = news;

  const fallbackImg = "https://placehold.co/400x220/1f2937/facc15?text=NewsPortal";
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link to={`/news/${_id}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full flex flex-col">
        {/* Image */}
        <div className="h-48 overflow-hidden bg-gray-100">
          <img
            src={image || fallbackImg}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.target.src = fallbackImg; }}
          />
        </div>

        <div className="p-4 flex flex-col flex-1">
          {/* Category badge */}
          <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full w-fit mb-2">
            {category}
          </span>

          {/* Title */}
          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 flex-1 mb-3 group-hover:text-yellow-700 transition-colors">
            {title}
          </h3>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
            <span>By {author?.name || "Unknown"}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
