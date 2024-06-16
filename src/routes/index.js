const express = require("express");
const authRoutes = require("./authRoute");
const movieRoutes = require("./movieRoute");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);

module.exports = router;
