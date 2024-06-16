const express = require("express");
const authRoutes = require("./authRoute");
const movieRoutes = require("./movieRoute");
const userRoutes = require("./userRoute");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);
router.use("/user", userRoutes);

module.exports = router;
