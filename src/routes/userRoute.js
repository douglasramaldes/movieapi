const express = require("express");
const {
  addToWatchlist,
  markAsWatched,
  getWatchlist,
  getWatchedMovies,
} = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/:userId/watchlist", authenticate, addToWatchlist);
router.put("/:userId/watchlist/:movieId", authenticate, markAsWatched);
router.get("/:userId/watchlist", authenticate, getWatchlist);
router.get("/:userId/watched", authenticate, getWatchedMovies);

module.exports = router;
