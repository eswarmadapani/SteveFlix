// /user/saved routes
import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  saveToWatchlist,
  getWatchlist,
  deleteFromWatchlist
} from "../controllers/savedController.js";

const router = express.Router();

router.post("/", protect, saveToWatchlist);
router.get("/", protect, getWatchlist);
router.delete("/:id", protect, deleteFromWatchlist);

export default router;
