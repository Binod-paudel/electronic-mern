import express from "express";
import {
  signup,
  login,
  logout,
  getUsers,
  getProfileUser,
  updateUserProfile,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { checkAdmin, checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", checkAuth, checkAdmin, getUsers);
router.get("/profile", checkAuth, getProfileUser);
router.put("/profile", checkAuth, updateUserProfile);
router.put("/", checkAuth, checkAdmin, updateUser);
router.delete("/", checkAuth, checkAdmin, deleteUser);

export default router;
