// TMDB search logic
import axios from "axios"

export const searchMovies = async (req,res) => {
    try {
        const {query} = req.query;
        if (!query){
            return res.status(400).json({message : "Search Query is required"});
        }

        const response = await axios.get(
            "https://api.themoviedb.org/3/search/multi",
            {
                params:{
                    api_key: process.env.TMDB_API_KEY,
                    query: query,
                    include_adult :true,
                    language: "en-US",
                    page: 1
                }
            }
        );
        const results = response.data.results
        .filter(item => item.media_type === "movie" || item.media_type === "tv")
        .map(item => ({
            id: item.id,
            type: item.media_type,          // "movie" or "tv"
            title: item.title || item.name, 
            overview: item.overview,
            posterPath: item.poster_path,
            releaseDate: item.release_date || item.first_air_date,
            rating: item.vote_average
      }));
        
    res.json({
      totalResults: results.length,
      results
    });
  } catch (error) {
    res.status(500).json({ message: "TMDB API error" });
  }
};