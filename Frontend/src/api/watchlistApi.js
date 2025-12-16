// Watchlist API calls
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export const getWatchlist = async (token) => {
  const res = await api.get("/watchlist", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

export const deleteFromWatchlist = async (id, token) => {
  await api.delete(`/watchlist/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
