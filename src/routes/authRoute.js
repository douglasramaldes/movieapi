const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);

module.exports = router;
