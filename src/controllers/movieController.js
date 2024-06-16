const { Movie } = require("../models/movie");

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching movies." });
  }
};

module.exports = { getMovies };
