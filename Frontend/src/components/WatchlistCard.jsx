import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteFromWatchlist } from "../api/watchlistApi";

const WatchlistCard = ({ item, onDelete }) => {
  const { token } = useAuth();
  const [removing, setRemoving] = useState(false);

  const handleDelete = async () => {
    setRemoving(true);
    try {
      await deleteFromWatchlist(item._id, token);
      onDelete(item._id);
    } catch (err) {
      console.error(err);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
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
          {item.mediaType.toUpperCase()} • {item.releaseDate || "N/A"}
        </p>

        <button
          onClick={handleDelete}
          disabled={removing}
          className="w-full mt-3 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition disabled:opacity-50"
        >
          {removing ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default WatchlistCard;
