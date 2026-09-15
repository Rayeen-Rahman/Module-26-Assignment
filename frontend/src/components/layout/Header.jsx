import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLink = ({ isActive }) =>
    isActive
      ? "text-yellow-300 font-semibold underline underline-offset-4"
      : "text-white hover:text-yellow-200 transition-colors font-medium";

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <span className="text-yellow-400">📰</span>
          <span>NewsPortal</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={navLink}>Home</NavLink>
          <NavLink to="/news" className={navLink}>News</NavLink>
          <NavLink to="/contact" className={navLink}>Contact</NavLink>
          {user && <NavLink to="/dashboard" className={navLink}>Dashboard</NavLink>}
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="hidden sm:block text-gray-300 text-xs">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-lg transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
