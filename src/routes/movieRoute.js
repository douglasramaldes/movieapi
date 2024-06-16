const express = require("express");
const { getMovies } = require("../controllers/movieController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, getMovies);

module.exports = router;
