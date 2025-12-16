// Navigation Bar Component
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-500">
          SteveFlix
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition"
          >
            Search
          </Link>

          <Link
            to="/watchlist"
            className="text-gray-300 hover:text-white transition"
          >
            Watchlist
          </Link>

          {/* User + Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-1.5 rounded bg-red-600 hover:bg-red-700 transition font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
