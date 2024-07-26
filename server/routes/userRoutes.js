const express = require("express");
const authMiddleware = require("../middleware/auth");
const Authorization = require("../middleware/authrized");
const {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUser,
  deleteUserById,
} = require("../controllers/userController");
const userRoutes = express.Router();

userRoutes.get(
  "/allUsers",
  authMiddleware,
  Authorization("admin"),
  getAllUsers
);
userRoutes.post("/newUser", createNewUser);
userRoutes.get("/getUser/:id", authMiddleware, getUserById);
userRoutes.put("/updateUser/:id", authMiddleware, updateUser);
userRoutes.delete("/deleteUser/:id", authMiddleware, deleteUserById);

module.exports = userRoutes;
