// Movie Card Component
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";


const MovieCard = ({ item }) => {
  const { token } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/watchlist`,
        {
          mediaId: item.id,
          mediaType: item.type,
          title: item.title,
          posterPath: item.posterPath,
          releaseDate: item.releaseDate,
          rating: item.rating
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform">
      {item.posterPath ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
          alt={item.title}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="h-64 bg-gray-700 flex items-center justify-center">
          No Image
        </div>
      )}

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-sm text-gray-400">
          {item.type.toUpperCase()} • {item.releaseDate || "N/A"}
        </p>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full mt-3 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save to Watchlist"}
        </button>
      </div>
    </motion.div>
  );    
};

export default MovieCard;
