const { User, Watchlist } = require("../models/user");
const { Movie } = require("../models/movie");

const getWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findByPk(userId, {
      include: {
        model: Movie,
        through: { where: { status: "to_watch" } },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.Movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching watchlist", error });
  }
};

const getWatchedMovies = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findByPk(userId, {
      include: {
        model: Movie,
        through: { where: { status: "watched" } },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.Movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching watched movies", error });
  }
};

const addToWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { movieId } = req.body;

    if (!userId || !movieId) {
      return res.status(400).json({ message: "Missing userId or movieId" });
    }

    const [user, movie] = await Promise.all([
      User.findByPk(userId),
      Movie.findByPk(movieId),
    ]);

    if (!user || !movie) {
      return res.status(404).json({ message: "User or movie not found" });
    }

    const existingEntry = await user.getMovies({ where: { id: movieId } });

    if (existingEntry.length > 0) {
      if (existingEntry[0].Watchlist.status === "watched") {
        return res.status(409).json({ message: "Movie already watched" });
      }
      return res.status(409).json({ message: "Movie already in watchlist" });
    }

    await user.addMovie(movie, { through: { status: "to_watch" } });

    res.status(201).json({ message: "Movie added to watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Error adding to watchlist", error });
  }
};

const markAsWatched = async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    const watchlistEntry = await Watchlist.findOne({
      where: { UserId: userId, MovieId: movieId, status: "to_watch" },
    });

    if (!watchlistEntry) {
      return res.status(404).json({ message: "Watchlist entry not found" });
    }

    watchlistEntry.status = "watched";
    watchlistEntry.statusUpdatedAt = new Date();

    await watchlistEntry.save();

    res.json({ message: "Movie marked as watched" });
  } catch (error) {
    res.status(500).json({ message: "Error marking as watched", error });
  }
};

module.exports = {
  getWatchlist,
  getWatchedMovies,
  addToWatchlist,
  markAsWatched,
};
