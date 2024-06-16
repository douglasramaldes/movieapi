const { admin } = require("../utils/firebase");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid Authorization format" });
    }

    const token = authHeader.replace("Bearer ", "");

    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken?.uid) {
      return res.status(401).json({ error: "Authorization expired" });
    }

    req.userId = decodedToken.uid;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = authenticate;
