const express = require("express");
const { login, signup } = require("../controllers/authContoller");
const authRoutes = express.Router();

authRoutes.post("/signupUser", signup);
authRoutes.post("/login", login);
module.exports = authRoutes;
