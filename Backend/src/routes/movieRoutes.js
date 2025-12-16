// /movies routes
import express from "express";
import { searchMovies } from "../controllers/movieController.js";
const router = express.Router();
//this is for to search the movies
router.get("/search", searchMovies);
export default router;
