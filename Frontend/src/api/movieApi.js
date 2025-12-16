// Movie API calls
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export const searchMovies = async (query, token) => {
  const res = await api.get(`/movies/search?query=${encodeURIComponent(query)}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data.results;
};
