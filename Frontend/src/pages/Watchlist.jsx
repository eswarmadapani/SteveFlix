import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getWatchlist } from "../api/watchlistApi";
import WatchlistCard from "../components/WatchlistCard";

const Watchlist = () => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getWatchlist(token);
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [token]);

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Your Watchlist
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-400">
            Your watchlist is empty.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {items.map((item) => (
              <WatchlistCard
                key={item._id}
                item={item}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
