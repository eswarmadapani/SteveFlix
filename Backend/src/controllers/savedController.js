// Save / Get / Delete movies
import SavedMovie from "../models/SavedMovie.js";
//this is for to save the movie to the watchlist 
export const saveToWatchlist = async (req, res) => {
    try {
        const { mediaId, mediaType, title, posterPath, releaseDate, rating } = req.body;

        if (!title) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const alreadySaved = await SavedMovie.findOne({
            user: req.user._id,
            mediaId,
            mediaType
        });
        if (alreadySaved) {
            return res.status(400).json({ message: "Movie already saved" });
        }
        const savedMovie = await SavedMovie.create({
            user: req.user._id,
            mediaId,
            mediaType,
            title,
            posterPath,
            releaseDate,
            rating
        })
        return res.status(200).json(savedMovie);
    } catch (error) {
        res.status(500).json({ message: "Failed to save the movie try again " });
    }
};
//this is for to get the watchlist movies that we saved
export const getWatchlist = async (req, res) => {
    try {
        const watchlist = await SavedMovie.find({ user: req.user._id }).sort({
            createdAt: -1
        })
        res.json(watchlist);
    
    } catch (error) {
        res.status(500).json({ message: "Failed to get the watchlist" });
    }
}
//this is for to delete the movie after the watching the movie 
export const deleteFromWatchlist = async (req, res) => {
    try {
        const movie = await SavedMovie.findOne({
            _id: req.params.id,
            user: req.user._id
        });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        await movie.deleteOne();

        res.json({ message: "Removed from watchlist" });

    } catch (error) {
        res.status(500).json({ message: "Failed to delete" });
    }
};
