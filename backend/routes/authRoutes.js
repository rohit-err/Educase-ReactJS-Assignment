const express = require("express")
const authRoutes = express.Router()
const { signup, login, logout, userProfile, checkAuth } = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/profile", verifyToken, userProfile);
authRoutes.get("/check-auth", verifyToken, checkAuth);

module.exports = authRoutes;