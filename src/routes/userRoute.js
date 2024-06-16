const express = require("express");
const {
  addToWatchlist,
  markAsWatched,
  getWatchlist,
  getWatchedMovies,
} = require("../controllers/userController");

const router = express.Router();

router.post("/:userId/watchlist", addToWatchlist);
router.put("/:userId/watchlist/:movieId", markAsWatched);
router.get("/:userId/watchlist", getWatchlist);
router.get("/:userId/watched", getWatchedMovies);

module.exports = router;
