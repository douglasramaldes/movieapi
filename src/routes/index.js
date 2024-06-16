const express = require("express");
const movieRoutes = require("./movieRoute");

const router = express.Router();

router.use("/movies", movieRoutes);

module.exports = router;
