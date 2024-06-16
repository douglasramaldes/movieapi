const { User } = require("../models/user");
const { auth } = require("../utils/firebase");
const {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} = require("firebase/auth");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (!userCredential.user) {
      return res
        .status(400)
        .json({ message: "error when trying to register email " });
    }
    const user = userCredential.user;
    const newUser = await User.create({
      id: user.uid,
      email: user.email,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!password || password.trim() === "") {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    res.status(200).json({
      message: "Login successful",
      id: user.uid,
      accessToken: user.accessToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    await sendPasswordResetEmail(auth, email);
    res.status(200).json({ message: "Password reset link sent successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  resetPassword,
};
