import { useState } from "react";
import { searchMovies } from "../api/movieApi";
import { useAuth } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";
import PageWrapper from "../components/PageWrapper";


const Search = () => {
  const { token } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await searchMovies(query, token);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      {/* Search Header */}
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Search Movies & TV Shows</h1>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie or TV show..."
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((item) => (
            <MovieCard key={`${item.type}-${item.id}`} item={item} />
          ))}
        </div>
      )}
      </div>
    </PageWrapper>
  );
};

export default Search;
